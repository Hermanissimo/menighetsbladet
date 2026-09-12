# Menighetsbladet Distribution Project

Local data pipeline and dashboard for maintaining distribution data (drivers, distributors, routes, and addresses) for Menighetsbladet.

## Project Layout

- `data/`: source inputs and final output dataset (`source.json`, `source.xml`).
- `misc/`: intermediate/generated pipeline artifacts.
- `scripts/`: Python and PowerShell maintenance scripts.
- `web/`: static dashboard app (`index.html`, `app.js`, `styles.css`).

## Canonical JSON Workflow

Run from project root: `C:\Work\Projects\Menighetsbladet`

1. `python scripts/extract_data.py`
2. `python scripts/kartverket_fetch.py`
3. `python scripts/extract_streets.py`
4. `python scripts/extract_pdf_route_lists.py`
5. `python scripts/map_routes.py`  
   Optional strict variant: `python scripts/map_routes_strict.py`
6. `python scripts/build_xml.py`

Artifacts:

- Intermediate files are written to `misc/`:
  - `misc/extracted_data.json`
  - `misc/kartverket_addresses.json`
  - `misc/route_streets.json`
  - `misc/route_pdf_lists.json`
  - `misc/route_map.json`
- Final XML output is written to `data/source.xml`.
- Main editable application data is `data/source.json`.

## Validation Helpers

- `python scripts/verify_xml.py`
- `python scripts/spot_check_xml.py`
- `python scripts/find_missing_letter_variants.py`
- `powershell -ExecutionPolicy Bypass -File scripts/check_state.ps1`

## Web Dashboard (JSON Only)

The dashboard reads JSON data only.

1. Open `web/index.html` through a local web server (recommended), or load a JSON file manually from the Settings panel.
3. Edits are cached in the browser and persisted via the "Save Changes" button as a `source.json` export.
