# User Guide - Menighetsbladet Distribution Control Panel

Welcome to the distribution management application for Menighetsbladet. This guide provides comprehensive documentation of each feature, screen, calculation formula, and operational workflow.

---

## 1. Interface Layout & Navigation

### Top Header & Controls
- **Language Selector**: Switch between Norwegian Bokmål (`nb`), Norwegian Nynorsk (`nn`), English (`en`), and Swedish (`sv`). All labels, error messages, and table column names update immediately.
- **Settings (⚙)**: Opens the configuration panel to inspect the active data source file, load a different JSON dataset via **Choose Data File**, or open this user guide.
- **Save Changes Button**: Visible whenever you have unsaved modifications in the local database. In standalone mode, clicking this updates `data/source.json` on disk and automatically generates a timestamped backup. In standard browser mode, it downloads an updated `source.json` file for your `data/` folder.
- **Close Guard Protection**: If you attempt to close or refresh your browser tab while unsaved edits exist, an alert modal prompts you to save your changes, continue working, or safely discard them.

### Navigation Tabs
1. **Dashboard**: High-level metrics, unassigned route alerts, magazine order totals, and personnel readiness.
2. **Drivers**: Driver roster, contact details, assigned routes, and run-sheet printing (*kjørelister*).
3. **Distributors**: Distributor roster (*bladbærere*), route assignments, and driver-linkage warnings.
4. **Addresses**: Master address registry, household counts, exclusion tracking, and batch reassignment.
5. **Routes**: Sector definitions, assigned personnel, extra buffer magazines, route merging, and street reports (*gatelister*).
6. **Map**: Interactive map with route color coding, single & batch address assignment, and satellite view.

---

## 2. Core Calculation Rules

The system maintains consistency across all views, exports, and print reports using these rules:

1. **Included Households**:
   $$\text{Included Households} = \max(0, \text{Households} - \text{Excluded Households})$$
   Addresses where all households are excluded are treated as excluded delivery stops.

2. **Magazines to Order**:
   $$\text{Magazines to Order} = \sum \text{Included Households} + \sum \text{Extra Buffer Magazines}$$
   Extra magazines can be specified on drivers, distributors, and individual routes.

3. **Route Linkage & Personnel Hierarchy**:
   - Addresses belong to **Routes**.
   - Routes are assigned to **Distributors**.
   - Distributors are assigned to **Drivers**.
   - Drivers deliver bundles to distributors, who in turn deliver individual copies to households.

---

## 3. Detailed Tab Documentation

### 1. Dashboard Tab
The Dashboard provides an instant status overview before ordering magazines and organizing delivery:
- **Unassigned Routes Card**: Highlights active routes lacking an assigned distributor or driver, showing exactly how many addresses and households are currently unserved.
- **Addresses Card**: Total addresses, broken down into included (active delivery stops) and excluded (all households opted out).
- **Households Card**: Total households, included households, excluded households (*"Nei takk til uadressert post"*), and unassigned households.
- **Routes Card**: Total routes, assigned routes, unassigned routes, active routes, and inactive routes.
- **Magazines to Order Card**: The exact number of magazines required from the printer, including extra buffer copies.
- **Personnel Card**: Roster breakdown of active and inactive drivers and distributors. If an active distributor lacks an assigned driver, a prominent warning indicator is displayed (⚠️).
- **Export Actions**: Export summary tables to **CSV** or **Excel (XLSX)** via the Export dropdown.

---

### 2. Drivers Tab (*Kjørere*)
Manages drivers responsible for transporting magazine bundles:
- **Search & Filters**:
  - Filter by **Driver Name**, **Status** (*Active / Inactive*), **Postnr**, or **Route**.
  - Click **Reset filters** to clear all search inputs.
- **Table Columns**:
  - **Name**: Driver full name.
  - **Status**: Active or Inactive.
  - **Driver no.**: Numerical driver identifier.
  - **Phone & Email**: Contact details with direct `mailto:` links.
  - **Address & Postnr**: Physical address.
  - **Route count**: Number of routes handled. Clicking this number navigates directly to the Routes tab filtered to this driver.
  - **Magazine count**: Total magazines transported. Clicking this number navigates to the Addresses tab filtered to this driver.
  - **Actions Dropdown**:
    - **Edit**: Modify contact information, driver number, active status, or extra papers.
    - **Delete**: Remove driver with an option to transfer assigned routes to another driver or leave them unassigned.
    - **Export Distributors (CSV / XLSX)**: Export a dedicated distributor contact sheet for this driver.
    - **Preview & Print Kjøreliste**: Opens a print-formatted run sheet listing all distributors, routes, magazine counts, and notes for this driver.
- **Header Actions**:
  - **Add record**: Register a new driver.
  - **Export ▾**: Export driver list to CSV, XLSX, or select **Kjørelister (Print All)** to preview and print run sheets for every active driver in one batch.

---

### 3. Distributors Tab (*Bladbærere*)
Manages local distributors delivering magazines door-to-door:
- **Missing Driver Alert (⚠️)**: Active distributors without an assigned driver are highlighted in red with a warning badge to prevent delivery gaps.
- **Search & Filters**: Filter by **Distributor Name**, **Status**, **Route**, **Driver Name**, and **Postnr**.
- **Table Columns**: Name, Status, Route IDs (clickable links to Routes tab), Driver name/number (clickable link to Drivers tab), Phone, Email, Address, Postnr, Extra magazines, Total magazines, and Actions.
- **Actions Dropdown**:
  - **Edit**: Update distributor info, assigned driver, routes, and extra buffer copies.
  - **Delete**: Remove distributor, safely unlinking associated routes.
- **Header Actions**:
  - **Add record**: Create a new distributor profile.
  - **Export ▾**: Export distributors to CSV or XLSX.

---

### 4. Addresses Tab (*Adresser*)
The master database of all delivery addresses:
- **Search & Filters**:
  - Text search by **Address**, **Route**, **Distributor Name**, or **Postnr**.
  - **Show only excluded addresses**: Filter to addresses where 100% of households are excluded.
  - **Show only addresses with excluded households**: Filter to addresses where at least one household opts out.
- **Batch Selection & Operations**:
  - Select individual rows using checkboxes, or check the header checkbox to select all visible rows on the current page.
  - **Update route**: Assign all selected addresses to a new route in a single operation.
  - **Delete selected**: Delete multiple selected addresses at once with confirmation.
- **Table Columns**: Checkbox, Address, Route, Distributor (dynamically resolved), Households, Excluded households, Postnr, Notes, and Actions (Edit / Delete).
- **Header Actions**:
  - **Add record**: Manually register an address with street, route, postnr, household counts, and notes.
  - **Export ▾**: Export filtered address records to CSV or XLSX.

---

### 5. Routes Tab (*Ruter*)
Defines geographical delivery sectors:
- **Map Shortcut (🗺️)**: Clicking the map icon next to any Route ID immediately opens the interactive Map tab filtered to that route.
- **Search & Filters**: Filter by **Route ID**, **Distributor Name**, **Driver Name**, **Postnr**, and **Status**.
- **Batch Selection & Actions**:
  - Select multiple routes via checkboxes.
  - **Update status**: Set selected routes to Active or Inactive in bulk.
  - **Merge routes**: Merges two or more routes into a single destination route, automatically migrating all associated addresses and updating distributor assignments.
- **Table Columns**:
  - **Route ID**: Canonical route name.
  - **Status**: Active or Inactive.
  - **Distributors**: Assigned distributor(s) with clickable filter links.
  - **Driver**: Assigned driver with clickable filter link.
  - **Addresses**: Count of included delivery stops.
  - **Extra magazines**: Route-specific buffer magazines.
  - **Magazines total**: Combined magazines required for this route.
  - **Addresses summary**: Overview of streets and house number spans in this route.
  - **Notes**: Route logistics instructions.
  - **Actions**: Edit route, Delete route, or **View route report**.
- **Header Actions**:
  - **Add record**: Create a new route.
  - **Export ▾**: Export routes to CSV, XLSX, or select **Route Reports (Print All)** to generate print-ready street delivery guides (*gatelister*) for distributors.

---

### 6. Map Tab (*Kart*)
Interactive visual map powered by Leaflet and Kartverket/Geonorge address services:
- **Layer Switcher**: Toggle between standard street map (**Map**) and high-resolution aerial imagery (**Satellite**).
- **Route Filter**: Use the top dropdown to view addresses for a single route or display all routes simultaneously.
- **Color Coding**: Each route is rendered in a distinct, stable color hue. Pins cluster dynamically at higher zoom levels.
- **Single Address Operations**:
  - **Inspect & Reassign**: Click any colored address pin to view its address, current route, household count, and notes. Select a new route from the dropdown to instantly reassign it.
  - **Delete Address**: Click the trash icon in the popup to remove an address.
  - **Add Address via Map Click**: Click any building or point on the map. The system reverse-geocodes the location using official Kartverket APIs. A modal appears showing:
    - Street address and postal code.
    - Direct **Kirken.no congregation lookup links** to verify parish boundaries.
    - Route selection dropdown with an interactive minimap showing nearby route context.
- **Batch Operations (Holding Ctrl)**:
  - **Add Multiple Addresses**: Hold the `Ctrl` key and click multiple buildings on the map. Red temporary markers queue up. Release `Ctrl` to open the batch assignment dialog and assign all queued addresses to a route at once.
  - **Reassign Multiple Addresses**: Hold the `Ctrl` key and click existing colored address pins. Selected pins turn red. Release `Ctrl` to open the reassignment dialog and move all selected addresses to a new route in one step.

---

## 4. Step-by-Step User Workflows

### Workflow 1: Preparing a Magazine Distribution Round
1. Open the **Dashboard** tab and review the top metrics.
2. Check the **Unassigned Routes** card:
   - If any routes are unassigned, click on the card or navigate to the **Routes** tab.
   - Filter by status or distributor to locate the unassigned routes and assign an active distributor.
3. Review the **Personnel** card:
   - If the active-distributor-without-driver warning appears (⚠️), navigate to **Distributors**, locate the flagged rows, and assign an appropriate driver.
4. Verify the **Magazines to order** total.
5. Export the dashboard summary to Excel (XLSX) or CSV for your printer order documentation.

### Workflow 2: Generating & Printing Delivery Materials
1. **Driver Run Sheets (*Kjørelister*)**:
   - Go to the **Drivers** tab.
   - To print for all active drivers, click **Export ▾** -> **Kjørelister (Print All)**.
   - To print for a single driver, click **Actions** -> **Preview & Print Kjøreliste** on that driver's row.
   - Review the driver contact info, assigned routes, distributor pickup points, and magazine counts.
   - You can edit route notes directly inside the preview before printing.
   - Click **Print** (optimized for clean A4 printing).
2. **Distributor Route Reports (*Gatelister*)**:
   - Go to the **Routes** tab.
   - Click **Export ▾** -> **Route Reports (Print All)** or choose **View route report** on an individual route.
   - Reports organize addresses logically by street name, divided into even and odd house numbers, clearly noting excluded households.
   - Click **Print** to produce physical delivery sheets for distributors.

### Workflow 3: Adding New Buildings or Adjusting Route Boundaries
1. Open the **Map** tab.
2. Select the route you wish to audit in the **Filter by Route** dropdown.
3. To add a newly constructed home:
   - Locate the building on the map and click it.
   - Check the Kirken.no link to ensure the property belongs to this parish.
   - Confirm the route assignment and click **Confirm**.
4. To rebalance boundaries between two adjacent routes:
   - Hold `Ctrl` and click the pins along the boundary that should be transferred.
   - Release `Ctrl`.
   - Select the target route in the popup modal and click **Reassign Selected Addresses**.
   - Totals and address counts update automatically.

### Workflow 4: Managing Address Exclusions
1. When a household requests to opt out of delivery (*"Nei takk"*):
   - Go to the **Addresses** tab.
   - Search for the address in the search box.
   - Click **Actions** -> **Edit**.
   - Increment the **Excluded households** count (e.g., from `0` to `1`).
   - Add a brief note if relevant (e.g. `"Leilighet H0201 ønsker ikke blad"`).
   - Click **Save**.
2. Notice that the total magazines to order on the Dashboard immediately decrements by 1.

### Workflow 5: Merging Redundant Routes
1. Navigate to the **Routes** tab.
2. Select the checkboxes next to the routes you wish to combine (e.g. `B 3` and `B 4`).
3. Click the **Merge routes (2)** button above the table.
4. In the dialog:
   - Select an existing route as the destination or specify a new Route ID.
   - Choose the distributor and driver who will manage the merged route.
   - Review the summary of addresses and paper counts being consolidated.
5. Click **Merge**. The old routes are removed, addresses are reassigned, and distributor lists are updated seamlessly.

### Workflow 6: Saving and Backing Up Your Work
1. When you make additions or changes, the **Save Changes** button appears in the top-right header with an indicator of unsaved changes.
2. Click **Save Changes**.
3. In standalone mode:
   - The app saves directly to `data/source.json`.
   - An automatic backup file (e.g. `data/source.backup-20260912-203000.json`) is created in the `data/` directory.
4. In standard browser mode:
   - A download of the updated `source.json` file begins. Replace the existing file in your `data/` folder with this download.