# Agent Guide

This repository is a static, browser-based route and distribution management app for parish magazine delivery (*Menighetsbladet*). The core objective is to maintain a canonical, human-editable source dataset in JSON while providing a friendly, responsive UI for route assignment, distributor/driver management, dashboard summaries, map visualization, and export workflows.

The app is designed around a single source of truth:
- `data/source.json` for editable operational data
- `web/src/` modular ES modules compiled into `web/dist/app.bundle.js` via `esbuild`
- `web/index.html` / `web/styles.css` for the UI shell
- `standalonePS/` for portable Windows PowerShell local offline serving and `/api/save` direct file persistence

## Project Goal

The product helps plan parish magazine delivery routes by tracking:
- addresses (including household and exclusion counts, notes, and geographic coordinates)
- distributors (*bladbærere*)
- drivers (*kjørerister*)
- route definitions (*ruter*)
- per-route, per-distributor, and per-driver assignments

The main operational expectation is that route, distributor, and driver metadata stay synchronized. When a route is reassigned or modified, the associated address rows and the resolved distributor/driver linkage must remain coherent.

## Repository Layout

- `web/`: browser UI assets
  - `index.html`: main UI structure and layout shell
  - `styles.css`: app styling and table layouts
  - `src/`: modular ES6+ source code
    - `main.js`: application bootstrap, language initialization, and global event wiring
    - `state.js`: centralized state (records, filters, pagination, sort, edit/modal state, close guard)
    - `calculations.js`: route normalization, paper counts, and metrics calculations
    - `tables.js`: table rendering, sorting, pagination, multi-select filters, and column resizing
    - `modals.js`: modal forms (add, edit, delete, batch route/status, merge routes, close guard)
    - `map.js`: Leaflet interactive map, marker clusters, convex hulls, and map edit actions
    - `reports.js`: print/PDF run-sheets (*kjørelister*) and street reports (*gatelister*)
    - `api.js`: IndexedDB cache/snapshot storage and Kartverket/Geonorge API
    - `dom.js`: shared DOM element references
    - `utils.js`: pure utility helpers (toInt, escapeHtml, parseMarkdown, debounce, saveTextDownload)
    - `i18n.js`: localized translation dictionaries (`nb`, `nn`, `en`, `sv`)
    - `report_styles.css`: print report typography and layout styles
  - `dist/`: compiled bundle (`app.bundle.js` and `app.bundle.js.map`)
- `data/`: canonical dataset
  - `source.json`: current editable source of truth
- `scripts/`: automation and build tools
  - `build.js`: unified build script (`npm run build`) that bundles `web/src/`, syncs User Guides, compiles assets to `standalonePS/web/`, and mirrors `data/source.json` to `standalonePS/data/source.json`
- `standalonePS/`: portable offline distribution for Windows PowerShell
  - `START.bat` / `STOPP.bat`: one-click batch starters
  - `server.ps1`: lightweight local HTTP server with automatic `/api/save` timestamped backups
  - `data/`: portable local dataset
  - `web/`: portable mirror of the web UI assets
- `tests/`: automated testing and quality assurance
  - `audit_translations.js`: validates that all translation keys exist across all 4 locales
  - `test_user_guide.js`: validates that the in-app User Guide renders clean markdown
  - `test_all_6_requirements.js`: Playwright E2E test verifying mailto links, route validation, Norwegian translations, driver-distributor warning badges, and add-route non-corruption

## Current Data Model

The canonical data lives under the top-level collections in `data/source.json`:
- `addresses`
- `distributors`
- `drivers`
- `routes`

### Address records

Address rows are stored under `addresses` and describe one physical delivery location with the following semantic fields:
- `address`: street name and house number (e.g., `"Storgata 12"`)
- `route`: canonical route identifier (e.g., `"A 1"`, `"B 4"`)
- `postnr`: 4-digit postal code
- `numberOfHouseholds`: household count (integer, default `1`)
- `numberOfExcludedHouseholds`: excluded/reserved households (integer, default `0`)
- `note`: optional delivery instruction or note
- `lat`: optional geographic latitude
- `lon`: optional geographic longitude

Address records should **not** carry legacy presentation/supply fields or redundant denormalized fields such as:
- `status`
- `street`
- `houseNo`
- `extraPapers`
- `distributor` (derived dynamically from `route`)
- `driverName` (derived dynamically from `route`)

If any of those legacy keys appear, normalize them away or remove them in app logic and writes.

### Distributor records

Distributor rows store route membership as an array in `routes`:
- `name`: distributor's full name
- `status`: `"active"` or `"inactive"`
- `driverNr`: optional driver reference number
- `driverName`: assigned driver's full name
- `phone`: contact phone number
- `email`: contact email address
- `address`: home address
- `postnr`: postal code
- `routes`: array of route identifiers (e.g., `["A 1", "A 2"]`)
- `extraPapers`: optional extra buffer magazines for this distributor

### Driver records

Driver rows represent logistics drivers delivering bundles to distributors:
- `name` / `driverName`: driver's full name
- `status`: `"active"` or `"inactive"`
- `driverNr`: driver reference number
- `phone`: contact phone number
- `email`: contact email address
- `address`: home address
- `postnr`: postal code
- `routes`: array of route identifiers
- `extraPapers`: optional extra buffer magazines for this driver

### Route records

The `routes` collection stores route metadata entries keyed by `routeId`:
- `routeId`: canonical route identifier (e.g., `"A 1"`)
- `distributor`: assigned distributor's name
- `status`: `"active"` or `"inactive"`
- `requiresDistributor`: boolean (`true` if delivered by a distributor; `false` if delivered directly by driver)
- `driver`: assigned driver's name (used when `requiresDistributor === false`)
- `extraPapers`: extra buffer magazines for this route
- `notes`: route notes
- `addressRanges`: generated address summary ranges

Route records derive their driver linkage dynamically via the assigned `distributor` (or via `driver` if `requiresDistributor === false`).

## Route Normalization Rules

The codebase expects canonical route identifiers to be normalized through `normalizeRouteIdentifier()`:
- trim leading/trailing whitespace
- collapse repeated internal spaces
- ensure a space between the letter prefix and numbers (e.g., `"A 5-6"`, `"A 10"`, `"B 3"`)
- deduplicate route IDs when an array contains multiple route labels

Important implementation helper:
- `normalizeRouteIdentifier()` in `web/src/calculations.js` is the canonicalization helper.

## Dashboard and Derived Calculation Rules

Calculations in `web/src/calculations.js` must stay consistent across the UI, CSV/XLSX exports, and recalculation paths:

Use this formula:
- `includedHouseholds = max(0, numberOfHouseholds - numberOfExcludedHouseholds)`
- `magazinesToOrder = sum(includedHouseholds) + sum(extraPapers)`

Extra buffer magazines are summed from active routes, active distributors, and active drivers:
- Inactive routes (`status === "inactive" || active === false`) are excluded.
- Inactive distributors (`status === "inactive"`) and drivers (`status === "inactive"`) do not add extra papers.

## Safe Change Workflow

When editing code, data, or tests, always follow this workflow:

1. Edit the relevant JS/CSS/JSON source files in `web/src/` or `data/`.
2. Rebuild and synchronize the application:
   - `npm run build`
3. Run the automated test suite:
   - `npm test`
4. Validate JSON integrity of `data/source.json`:
   - `python -c "import json; d=json.load(open('data/source.json', encoding='utf-8')); print('Addresses:', len(d['addresses']), 'Routes:', len(d['routes']))"`
5. Verify no legacy keys remain in addresses:
   - `python -c "import json; d=json.load(open('data/source.json', encoding='utf-8')); a=d['addresses']; print('Legacy keys count:', sum(1 for r in a if 'status' in r or 'street' in r or 'houseNo' in r or 'distributor' in r or 'driverName' in r))"`

## Verification Checklist for Common Tasks

- [ ] Build clean check (`npm run build`)
- [ ] Translation key audit (`node tests/audit_translations.js`)
- [ ] Requirements verification (`node tests/test_all_6_requirements.js`)
- [ ] Legacy key audit (zero legacy keys on address records)
- [ ] Route reference audit (all address routes resolve to existing routes in `routes`)
- [ ] Duplicate distributor name audit (distributors uniquely identified by name)
- [ ] Standalone package sync check (files in `standalonePS/web/` match `web/`)
