# Agent Guide

This repository is a static, browser-based route and distribution management app. The core objective is to maintain a canonical, human-editable source dataset in JSON while providing a friendly UI for route assignment, distributor/driver management, dashboard summaries, and export workflows.

The app is designed around a single source of truth:
- `source.json` for editable operational data
- `web/app.js` for rendering, normalization, filters, derived calculations, and exports
- `web/index.html` / `web/styles.css` for the UI shell

## Project Goal

The product helps plan parish magazine (menighetsblad) delivery routes by tracking:
- addresses
- distributors
- drivers
- route definitions
- per-route and per-driver assignments

The main operational expectation is that route, distributor, and driver metadata stay synchronized. When a route is reassigned, the associated address rows and the resolved distributor/driver linkage must remain coherent.

## Repository Layout

- `web/`: browser UI assets
  - `index.html`: main UI structure
  - `app.js`: all app logic, normalization, rendering, filtering, and export behavior
  - `styles.css`: layout and styling
- `data/`: canonical dataset and local source snapshots
  - `source.json`: current editable source of truth
  - `source.xml`: XML snapshot/export format
  - `source.backup-*`: backup copies
- `scripts/`: maintenance and migration utilities
  - route normalization and migration scripts
  - duplicate resolution utilities
  - geocoding and projection helpers
- `misc/`: cached/reference datasets used for enrichment and diagnosis
  - Kartverket lookup caches
  - route maps and extracted data

## Current Data Model

The canonical data lives under the top-level collections in `source.json`:
- `addresses`
- `distributors`
- `drivers`
- `routes`

### Address records

Address rows are stored under `addresses` and should describe one physical address row with the following semantic fields:
- `address`
- `route`
- `postnr`
- `note`
- `numberOfHouseholds` (default `1`)
- `numberOfExcludedHouseholds` (default `0`)

Address records should not carry legacy presentation/supply fields or redundant denormalized fields such as:
- `status`
- `street`
- `houseNo`
- `extraPapers`
- `distributor` (now derived dynamically from `route`)
- `driverName` (now derived dynamically from `route`)

If any of those legacy keys appear, normalize them away or remove them in app logic and writes.

### Distributor records

Distributor rows should be normalized to the modern model where route membership is stored as a list in `routes`, not a single string `route` field.

Required/expected fields include:
- `name`
- `status`
- `driverNr`
- `driverName`
- `phone`
- `email`
- `address`
- `postnr`
- `routes`: array of route identifiers
- `extraPapers` (supported for distributors)

### Driver records

Driver rows are also route-aware and may carry:
- `driverNr`
- `driverName`
- `phone`
- `email`
- `address`
- `postnr`
- `routes`
- `extraPapers`

### Route records

The `routes` collection stores route metadata entries keyed by `routeId`, typically with:
- `routeId`
- `distributor` (The assigned distributor's name)
- `requiresDistributor`

These route records now derive their driver linkage dynamically via the assigned `distributor`. The `app.js` table logic resolves the `driverNr` and `driverName` by checking the matching entry in the `distributors` collection.

## Route Normalization and Compatibility Rules

The codebase now expects canonical route identifiers to be normalized through the same helper paths in both the browser app and migration scripts.

Key normalization behaviors:
- trim whitespace
- collapse repeated spaces
- preserve mixed-case route identifiers in normalized form
- ensure a space between the letter prefix and the numbers, e.g., `A 5-6`, `A 10`, `A 11/12/13`, `B 3-6`, etc.
- deduplicate route IDs when a row contains multiple route labels

Important implementation knowledge:
- `normalizeRouteIdentifier()` in `web/app.js` is the browser-side canonicalization helper.
- `normalize_route_identifier()` in `scripts/migrate_distributor_routes.py` mirrors the same intent in Python.
- `getDistributorRoutes(row)` is the compatibility layer that supports both old and new distributor route shapes.

In practice:
- older data may still expose `route`
- modern data should store `routes` as an array
- any migration must rewrite route values into a deduplicated array form and remove the legacy single-field storage

## Dashboard and Derived Calculation Rules

Dashboard calculations are implemented in `web/app.js` and must stay consistent across the UI, any export, and any recalculation paths.

Use this formula:
- `includedHouseholds = max(0, numberOfHouseholds - numberOfExcludedHouseholds)`
- `magazinesToOrder = includedHouseholds + extraPapers`

This logic is expected to stay identical across:
- dashboard rendering
- CSV/XLSX export
- magazine/paper-count recalculation

## UI and Table Conventions

General UI expectations:
- addresses table does not use a status filter or status column
- addresses table includes numeric fields for `numberOfHouseholds` and `numberOfExcludedHouseholds`
- add/edit forms must support these numeric fields
- CSV export labels should use translated strings via `t(...)`
- export actions must describe the exact output type clearly

Current export strategy:
- `CSV` and `XLSX` for table exports
- driver-distributor export path for selected driver rows
- exports should avoid duplicated columns and should use the same normalized route display logic as the tables

## Known Migration and Cleanup Know-How

This repo has already gone through a structural normalization pass that should be preserved.

### Completed model move

Distributor route storage was migrated away from the legacy single `route` string into normalized `routes` arrays.

### Duplicate-merge policy

Duplicate distributor names must be merged into a single canonical record, preserving the metadata most likely to be used by the UI:
- `driverNr`
- `driverName`
- `phone`
- `email`
- `address`
- `postnr`
- `routes`

Route lists should be deduplicated and stable.

### Route-transfer consistency

When a route transfer occurs, all of the following must stay in sync:
- address `route` values
- the owning `routes` collection metadata (now storing `distributor`)
- distributor `routes` arrays

*(Note: addresses no longer store `distributor` and `driverName` directly; they are derived dynamically from the route.)*

This matters because route ownership is not just a display label; it feeds export output and downstream route assignment calculations. Linkages now flow primarily from `route` -> `distributor` -> `driver`.

## Safe Change Workflow

When editing the live data or logic, always verify in this order:

1. Edit the relevant JS/data source.
2. Validate JS parse:
   - `node -e "const fs=require('fs'); new Function(fs.readFileSync('web/app.js','utf8')); console.log('ok');"`
3. Validate JSON parse:
   - `python -c "import json; json.load(open('source.json',encoding='utf-8')); print('ok')"`
4. If changing address schema, verify no legacy keys remain in addresses:
   - `python -c "import json; d=json.load(open('source.json',encoding='utf-8')); a=d['addresses']; print(sum(1 for r in a if 'status' in r or 'street' in r or 'houseNo' in r))"`
5. If changing the routes model, verify route references are coherent:
   - route IDs in address records resolve to known route entries
   - distributor `routes` arrays resolve to known route entries
   - route-to-driver linkage in address rows matches the matched route record

## Verification Checklist for Common Tasks

Use these checks when making structural changes:

- JS parse check
- JSON parse check
- legacy key audit
- route reference audit
- duplicate distributor name audit
- route-to-driver consistency audit

These are the most important guardrails because the app relies on the canonical JSON being both human-readable and machine-coherent.

## External Data Source

Kartverket/Geonorge address household enrichment is used for enrichment and household estimation:
- Base endpoint: `https://ws.geonorge.no/adresser/v1/sok`
- Household proxy: `len(bruksenhetsnummer)` per exact address match, with a minimum of `1`

When running live API checks, prefer cached lookups to avoid unnecessary repeated requests.

## Working Notes for Future Agents

- Treat `source.json` as the source of truth for edits.
- Keep the app’s normalization helper behavior consistent with the Python migration scripts.
- Do not reintroduce legacy or redundant address fields (like `distributor` or `driverName`) into base rows.
- Keep route ownership, distributor assignment, and driver assignment in sync.
- When a route is moved, update the affected address rows and the related distributor/driver metadata in the same pass. (Note: addresses only store the `route`, not the `distributor` or `driverName`).
