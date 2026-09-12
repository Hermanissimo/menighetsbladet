from __future__ import annotations

import importlib.util
import json
import re
import time
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path
from typing import Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent
SOURCE_PATH = ROOT / 'data' / 'source.json'
KV_PATH = ROOT / 'misc' / 'kartverket_addresses.json'
API_BASE = 'https://ws.geonorge.no/adresser/v1/sok'
KOMMUNENUMMER = '0301'


def load_requested() -> dict:
    spec = importlib.util.spec_from_file_location('audit_missing_routes', ROOT / 'misc' / 'audit_missing_routes.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.requested


def parse_house_no(house_no: str) -> Optional[Tuple[int, str]]:
    m = re.match(r'^\s*(\d+)\s*([A-Za-z]?)\s*$', str(house_no or ''))
    if not m:
        return None
    return int(m.group(1)), (m.group(2) or '').upper()


def normalize_text(v: str) -> str:
    return ' '.join(str(v or '').strip().lower().split())


def split_address(address: str) -> Tuple[str, str]:
    match = re.match(r'^(?P<street>.*?)(?P<houseno>\d+[A-Za-z]?)\s*$', str(address or '').strip())
    if not match:
        raise ValueError(f'Could not parse address: {address!r}')
    street = match.group('street').strip()
    house_no = match.group('houseno').strip()
    return street, house_no


def fetch_json(url: str, timeout: float = 20.0, retries: int = 3) -> dict:
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, headers={'Accept': 'application/json'})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read().decode('utf-8'))
        except Exception as e:
            last_error = e
            if attempt < retries:
                time.sleep(0.4 * attempt)
    raise RuntimeError(f'Failed after {retries} attempts: {last_error}')


def match_exact_candidate(candidates: List[dict], street: str, number: int, letter: str, postnr: str) -> Optional[dict]:
    street_norm = normalize_text(street)
    letter_up = (letter or '').upper()
    postnr_txt = str(postnr or '').strip()
    number_txt = str(number)

    exact: List[dict] = []
    for c in candidates:
        c_street = normalize_text(c.get('adressenavn', ''))
        c_num = str(c.get('nummer', '')).strip()
        c_letter = str(c.get('bokstav', '') or '').strip().upper()
        c_postnr = str(c.get('postnummer', '')).strip()
        if c_street == street_norm and c_num == number_txt and c_letter == letter_up and c_postnr == postnr_txt:
            exact.append(c)

    if exact:
        return exact[0]
    if len(candidates) == 1:
        return candidates[0]
    return None


def query_households(street: str, house_no: str, postnr: str) -> Tuple[int, List[str], str]:
    parsed = parse_house_no(house_no)
    if not parsed:
        return 1, [], 'unparsed-houseNo'
    number, letter = parsed

    params = {
        'adressenavn': street,
        'nummer': number,
        'bokstav': letter,
        'postnummer': postnr,
        'kommunenummer': KOMMUNENUMMER,
        'treffPerSide': 10,
        'side': 0,
    }
    url = API_BASE + '?' + urllib.parse.urlencode(params)
    data = fetch_json(url)
    candidates = data.get('adresser', []) or []
    if not candidates:
        return 1, [], 'no-match'

    matched = match_exact_candidate(candidates, street, number, letter, postnr)
    if not matched:
        return 1, [], 'ambiguous'

    units_raw = matched.get('bruksenhetsnummer') or []
    units = sorted({str(x).strip() for x in units_raw if str(x).strip()})
    households = max(1, len(units))
    return households, units, 'matched'


def main() -> int:
    requested = load_requested()
    with SOURCE_PATH.open('r', encoding='utf-8-sig') as f:
        source = json.load(f)

    kv = json.load(KV_PATH.open('r', encoding='utf-8'))
    kv_lookup = {row.get('fullText'): row.get('postnr') for row in kv if row.get('fullText')}

    addresses = source['addresses']
    current_names = {row.get('address') for row in addresses if row.get('address')}
    route_distributor = {}
    route_driver = {
        row.get('routeId'): row.get('driverName')
        for row in source['routes']
        if row.get('routeId')
    }

    for row in addresses:
        route = str(row.get('route') or '').strip()
        if not route:
            continue
        route_distributor.setdefault(route, Counter())
        route_distributor[route][str(row.get('distributor') or '').strip()] += 1

    added = []
    for route_name, values in requested.items():
        for address_text in values:
            if address_text in current_names:
                continue
            postnr = kv_lookup.get(address_text)
            if not postnr:
                continue
            street, house_no = split_address(address_text)
            households, _, status = query_households(street, house_no, postnr)
            if status != 'matched':
                continue
            distr_counter = route_distributor.get(route_name, Counter())
            distributor = distr_counter.most_common(1)[0][0] if distr_counter else 'Unknown'
            driver_name = route_driver.get(route_name, '')

            new_row = {
                'address': address_text,
                'route': route_name,
                'distributor': distributor,
                'postnr': postnr,
                'driverName': driver_name,
                'numberOfHouseholds': households,
                'numberOfExcludedHouseholds': 0,
                'note': '',
            }
            addresses.append(new_row)
            current_names.add(address_text)
            added.append(address_text)

    if added:
        source['addresses'] = addresses
        with SOURCE_PATH.open('w', encoding='utf-8', newline='\n') as f:
            json.dump(source, f, ensure_ascii=False, indent=4)
            f.write('\n')

    print('added_rows', len(added))
    if added:
        print('sample:', added[:15])
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
