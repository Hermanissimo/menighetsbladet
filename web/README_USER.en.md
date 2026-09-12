# User Guide - Menighetsbladet

### 1. Navigation & Tabs
- **Dashboard**: Overview of totals, magazine order requirements, and delivery progress.
- **Drivers**: Manage drivers, view assigned routes/papers, and preview or print run sheets (kjørelister).
- **Distributors (Bladbærere)**: Manage distributors and routes. Highlights any active distributor missing an assigned driver.
- **Addresses**: Address registry with household counts and exclusions.
- **Routes**: Route definitions with assigned distributor, driver, and paper counts.
- **Map**: Interactive map to inspect address pins, add addresses, and reassign routes.

### 2. Editing & Saving
1. Search, filter, or sort in any table or on the map.
2. Edit, add, or delete rows as needed.
3. Verify totals and route assignments.
4. Click **Save Changes** (top-right next to title) to export your updates to `data/source.json`.
*Note: Changes are safely stored in browser storage (IndexedDB) until exported.*

### 3. Magazine Calculation Logic
- `Included Households = Households - Excluded Households`
- `Magazines to Order = Included Households + Extra Papers`

### 4. Export & Run Sheets
- **CSV & Excel (XLSX)**: Export any table or dashboard summary using the export buttons.
- **Run Sheets (Kjøreliste)**: Select "Preview & Print Kjøreliste" under driver actions for a printer-friendly route summary.