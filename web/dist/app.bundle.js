(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // web/src/dom.js
  var dom_exports = {};
  __export(dom_exports, {
    addAddressBtn: () => addAddressBtn,
    addDistributorBtn: () => addDistributorBtn,
    addDriverBtn: () => addDriverBtn,
    addRouteBtn: () => addRouteBtn,
    chooseFileLabel: () => chooseFileLabel,
    closeGuardCloseBtn: () => closeGuardCloseBtn,
    closeGuardContinueBtn: () => closeGuardContinueBtn,
    closeGuardMessage: () => closeGuardMessage,
    closeGuardModal: () => closeGuardModal,
    closeGuardSaveBtn: () => closeGuardSaveBtn,
    closeGuardTitle: () => closeGuardTitle,
    editModal: () => editModal,
    editModalCancel: () => editModalCancel,
    editModalClose: () => editModalClose,
    editModalError: () => editModalError,
    editModalFields: () => editModalFields,
    editModalForm: () => editModalForm,
    editModalTitle: () => editModalTitle,
    fileInput: () => fileInput,
    floatingGuideBtn: () => floatingGuideBtn,
    languageSelect: () => languageSelect,
    loadResultMessage: () => loadResultMessage,
    loadResultModal: () => loadResultModal,
    loadResultTitle: () => loadResultTitle,
    openDataFolderBtn: () => openDataFolderBtn,
    openUserGuideBtn: () => openUserGuideBtn,
    reportModal: () => reportModal,
    reportModalClose: () => reportModalClose,
    reportModalContent: () => reportModalContent,
    reportModalPrint: () => reportModalPrint,
    routeReportModal: () => routeReportModal,
    routeReportModalClose: () => routeReportModalClose,
    routeReportModalContent: () => routeReportModalContent,
    routeReportModalPrint: () => routeReportModalPrint,
    saveAsCopyBtn: () => saveAsCopyBtn,
    saveChangesBtn: () => saveChangesBtn,
    saveDropdownMenu: () => saveDropdownMenu,
    saveDropdownToggle: () => saveDropdownToggle,
    saveGroup: () => saveGroup,
    settingsPanel: () => settingsPanel,
    settingsToggle: () => settingsToggle,
    sourceMissingMessage: () => sourceMissingMessage,
    sourceMissingModal: () => sourceMissingModal,
    sourceMissingTitle: () => sourceMissingTitle,
    statusEl: () => statusEl,
    userGuideContent: () => userGuideContent,
    userGuideModal: () => userGuideModal,
    userGuideTitle: () => userGuideTitle
  });
  var statusEl, fileInput, chooseFileLabel, saveGroup, saveChangesBtn, saveAsCopyBtn, saveDropdownToggle, saveDropdownMenu, languageSelect, settingsToggle, settingsPanel, editModal, editModalTitle, editModalClose, editModalCancel, editModalForm, editModalFields, editModalError, addDriverBtn, addDistributorBtn, addAddressBtn, addRouteBtn, loadResultModal, loadResultTitle, loadResultMessage, openUserGuideBtn, floatingGuideBtn, userGuideModal, userGuideTitle, userGuideContent, closeGuardModal, closeGuardTitle, closeGuardMessage, closeGuardSaveBtn, closeGuardContinueBtn, closeGuardCloseBtn, sourceMissingModal, sourceMissingTitle, sourceMissingMessage, openDataFolderBtn, reportModal, reportModalClose, reportModalPrint, reportModalContent, routeReportModal, routeReportModalClose, routeReportModalPrint, routeReportModalContent;
  var init_dom = __esm({
    "web/src/dom.js"() {
      statusEl = document.getElementById("status");
      fileInput = document.getElementById("xml-file");
      chooseFileLabel = document.getElementById("choose-file-label");
      saveGroup = document.getElementById("save-group");
      saveChangesBtn = document.getElementById("save-changes");
      saveAsCopyBtn = document.getElementById("save-as-copy");
      saveDropdownToggle = document.getElementById("save-dropdown-toggle");
      saveDropdownMenu = document.getElementById("save-dropdown-menu");
      languageSelect = document.getElementById("language-select");
      settingsToggle = document.getElementById("settings-toggle");
      settingsPanel = document.getElementById("settings-panel");
      editModal = document.getElementById("edit-modal");
      editModalTitle = document.getElementById("edit-modal-title");
      editModalClose = document.getElementById("edit-modal-close");
      editModalCancel = document.getElementById("edit-modal-cancel");
      editModalForm = document.getElementById("edit-modal-form");
      editModalFields = document.getElementById("edit-modal-fields");
      editModalError = document.getElementById("edit-modal-error");
      addDriverBtn = document.getElementById("add-driver");
      addDistributorBtn = document.getElementById("add-distributor");
      addAddressBtn = document.getElementById("add-address");
      addRouteBtn = document.getElementById("add-route");
      loadResultModal = document.getElementById("load-result-modal");
      loadResultTitle = document.getElementById("load-result-title");
      loadResultMessage = document.getElementById("load-result-message");
      openUserGuideBtn = document.getElementById("open-user-guide");
      floatingGuideBtn = document.getElementById("floating-guide-btn");
      userGuideModal = document.getElementById("user-guide-modal");
      userGuideTitle = document.getElementById("user-guide-title");
      userGuideContent = document.getElementById("user-guide-content");
      closeGuardModal = document.getElementById("close-guard-modal");
      closeGuardTitle = document.getElementById("close-guard-title");
      closeGuardMessage = document.getElementById("close-guard-message");
      closeGuardSaveBtn = document.getElementById("close-guard-save");
      closeGuardContinueBtn = document.getElementById("close-guard-continue");
      closeGuardCloseBtn = document.getElementById("close-guard-close");
      sourceMissingModal = document.getElementById("source-missing-modal");
      sourceMissingTitle = document.getElementById("source-missing-title");
      sourceMissingMessage = document.getElementById("source-missing-message");
      openDataFolderBtn = document.getElementById("open-data-folder");
      reportModal = document.getElementById("report-modal");
      reportModalClose = document.getElementById("report-modal-close");
      reportModalPrint = document.getElementById("report-modal-print");
      reportModalContent = document.getElementById("report-modal-content");
      routeReportModal = document.getElementById("route-report-modal");
      routeReportModalClose = document.getElementById("route-report-modal-close");
      routeReportModalPrint = document.getElementById("route-report-modal-print");
      routeReportModalContent = document.getElementById("route-report-modal-content");
    }
  });

  // web/src/utils.js
  function toInt2(value) {
    var v = parseInt(value, 10);
    return Number.isFinite(v) ? v : 0;
  }
  function escapeHtml(value) {
    if (value == null) return "";
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function saveTextDownload(fileName, text, mimeType) {
    var blob = new Blob([text], { type: mimeType || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 100);
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
  function parseMarkdown(text) {
    if (!text) return "";
    let html = text;
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/^### ([^\n\r]+)/gim, "<h3>$1</h3>");
    html = html.replace(/^## ([^\n\r]+)/gim, "<h2>$1</h2>");
    html = html.replace(/^# ([^\n\r]+)/gim, "<h1>$1</h1>");
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/`(.*?)`/gim, "<code>$1</code>");
    html = html.replace(/^---$/gim, "<hr>");
    html = html.replace(/^- ([^\n\r]+)/gim, "<li>$1</li>");
    let paragraphs = html.split(/\n\n+/);
    html = paragraphs.map((p) => {
      if (p.startsWith("<h") || p.startsWith("<hr>")) return p;
      if (p.includes("<li>")) {
        return `<ul>${p}</ul>`;
      }
      return `<p>${p.replace(/\n/g, "<br>")}</p>`;
    }).join("\n");
    return html;
  }

  // web/src/i18n.js
  var I18N = {
    en: {
      infoBatchStatus: "<h4>Update Status</h4><p>Use this tool to change the status of multiple records at once.</p><ul><li>Select the new status from the dropdown.</li><li>This will overwrite the status for all selected rows.</li><li>Changes are saved automatically when you click Apply.</li></ul>",
      infoBatchRoute: "<h4>Update Route</h4><p>Use this tool to reassign multiple addresses to a new route.</p><ul><li>Select the destination route from the dropdown.</li><li>All selected addresses will be instantly moved to the chosen route.</li><li>The dashboard and magazine counts will recalculate automatically.</li></ul>",
      infoReportModal: "<h4>Driving Lists (Kj\xF8relister)</h4><p>This is a printable preview of the driving lists for the selected distributors.</p><ul><li>Only active routes are included by default.</li><li>Use your browser's Print feature (Ctrl+P) after clicking Print.</li><li>Adjust margins in your print settings for best results.</li></ul>",
      infoRouteReportModal: "<h4>Route Reports</h4><p>This provides a detailed summary of addresses for the selected routes.</p><ul><li>Useful for verifying correct street assignments.</li><li>Includes total household counts and extra magazines.</li></ul>",
      infoAddAddressMap: "<h4>Add Address via Map</h4><p>You have selected a location on the map.</p><ul><li>Verify the address details fetched from Kartverket.</li><li>Select a route to assign this new address to.</li><li>Once confirmed, the address is added to the database.</li></ul>",
      infoReassignRoute: "<h4>Reassign Addresses via Map</h4><p>You are moving selected map markers to a different route.</p><ul><li>This applies to all markers you have selected (Control-clicked).</li><li>Once confirmed, the map will update their colors instantly.</li></ul>",
      infoEditDrivers: "<h4>Edit Driver</h4><p>Modify driver details here.</p><ul><li><strong>Email:</strong> valid format (or empty).</li><li><strong>Phone:</strong> numbers, +, -, () (or empty).</li><li><strong>Driver Nr:</strong> letters, numbers, -, / (or empty).</li><li><strong>Extra magazines:</strong> integer (or empty).</li><li><strong>Required fields:</strong> Driver Name.</li></ul>",
      infoEditDistributors: "<h4>Edit Distributor</h4><p>Modify distributor details here.</p><ul><li><strong>Email:</strong> valid format (or empty).</li><li><strong>Phone:</strong> numbers, +, -, () (or empty).</li><li><strong>Driver linkage</strong> is automatically resolved.</li><li><strong>Required fields:</strong> Distributor Name, Routes.</li></ul>",
      infoEditAddresses: "<h4>Edit Address</h4><p>Modify a single address record.</p><ul><li><strong>Households:</strong> positive integer (> 0).</li><li><strong>Excluded:</strong> zero or positive integer (>= 0).</li><li><strong>Postnr:</strong> exactly 4 digits (or empty).</li><li><strong>Required fields:</strong> Address, Route.</li></ul>",
      infoEditRoutes: "<h4>Edit Route</h4><p>Modify route metadata.</p><ul><li><strong>Route ID:</strong> Unique non-empty route identifier.</li><li><strong>Requires Distributor:</strong> If checked, you must assign a distributor.</li><li><strong>Extra magazines:</strong> integer (or empty).</li><li><strong>Required fields:</strong> Route ID.</li></ul>",
      mapInfoFilter: '<strong>Filter:</strong> Use the "Filter by Route" dropdown above the map to only show addresses assigned to a specific route.',
      mapTooltipRoute: "Route",
      mapUnassignedDistributor: "Unassigned",
      mapNewAddress: "New Address",
      mapAddingCountAddresses: "Adding <b>{count}</b> addresses",
      mapReassigningCountAddresses: "Reassigning <b>{count}</b> addresses",
      mapDeleteConfirmPrompt: "Are you sure you want to delete",
      mapDeleteConfirmSuffix: "from the database?",
      openDataFolder: "Choose Data File",
      mapInfoTitle: "Map Guide",
      mapInfoSingle: "Single Address Operations",
      mapInfoAdd: "<strong>Add an Address:</strong> Click anywhere on the map to search for a building. If an address is found, you will immediately be prompted to assign it to a route.",
      mapInfoReassign: "<strong>Reassign an Address:</strong> Click on any existing colored address marker to view its details and instantly reassign its route using the popup menu.",
      mapInfoBatch: "Batch Operations (using Ctrl)",
      mapInfoAddMultiple: "<strong>Add Multiple Addresses:</strong> Hold <strong>Ctrl</strong> and click on the map multiple times to queue up several new buildings. Release Ctrl when you are done to assign all of them to a route at once.",
      mapInfoReassignMultiple: "<strong>Reassign Multiple Addresses:</strong> Hold <strong>Ctrl</strong> and click on existing colored address markers to select them. Selected markers will turn red. Release Ctrl when you are done to reassign all selected addresses to a new route.",
      mapInfoOther: "Other Features",
      mapInfoOk: "Got it",
      tabMap: "Map",
      mapRouteFilterLabel: "Filter by Route:",
      mapRouteFilterAll: "All Routes",
      mapStatusLoading: "Loading geodata...",
      mapGuideAddMultiple: "Add Multiple Addresses: Hold Ctrl and click on the map multiple times to queue up several new buildings. Release Ctrl when you are done to assign all of them to a route at once.",
      mapGuideFilterHelp: "Filter: Use the 'Filter by Route' dropdown above the map to only show addresses assigned to a specific route.",
      mapGuideGotIt: "Got it",
      mapStatusLoaded: "Loaded {routes} routes and {addresses} addresses.",
      rowPersonnel: "Personnel",
      routesColDescription: "Addresses summary",
      routesColNotes: "Notes",
      editModalTitle: "Edit row",
      batchRouteLabel: "Route",
      btnCancel: "Cancel",
      btnUpdateGeonorge: "Update from Geonorge",
      btnMergeRoutes: "Merge routes",
      mergeRoutesTitle: "Merge Routes",
      mergeRoutesMessage: "Merging the following routes will reassign all their addresses to the new route below, and delete the old routes.",
      mergeRoutesApply: "Merge",
      geonorgeNotFound: "Address not found on Geonorge. Consider deleting this address.",
      geonorgeError: "Failed to connect to Geonorge API.",
      batchRouteApply: "Apply route",
      deleteModalTitle: "Delete",
      deleteModalTransferLabel: "Transfer to:",
      reportModalTitle: "Kj\xF8relister (Preview)",
      routeReportModalTitle: "Route Report (Preview)",
      reportModalPrint: "Print",
      selectedChipEmpty: "Selected: 0",
      pageInfoEmpty: "Page 1 / 1",
      totalsEmpty: "Totals",
      rowUnassignedRoutes: "Unassigned Routes",
      dashAssigned: "Assigned:",
      dashUnassigned: "Unassigned:",
      dashActive: "Active:",
      dashInactive: "Inactive:",
      dashAddressesAffected: "addresses affected",
      dashHouseholdsAffected: "households affected",
      dashIncluded: "Included:",
      dashExcluded: "Excluded:",
      dashPersonnelActive: "active",
      dashPersonnelInactive: "inactive",
      exportAction: "Export",
      mapGuideTitle: "Map Guide",
      mapGuideSingle: "Single Address Operations",
      mapGuideAdd: "Add an Address: Click anywhere on the map to search for a building.",
      mapGuideReassign: "Reassign an Address: Click on any existing colored address marker to view its details and instantly reassign its route using the popup menu.",
      mapGuideBatch: "Batch Address Operations",
      mapGuideCtrl: "Hold Ctrl and click on multiple existing address markers to queue them up.",
      mapGuideReassignBatch: "Reassign: Once you have queued multiple addresses, click Reassign to move all of them to a single route at once.",
      mapGuideClear: "Clear: To clear the selection, click anywhere on the map background, or click the Clear button.",
      mapAddAddressTitle: "Add address?",
      mapFetchingData: "Fetching data...",
      mapAddingAddresses: "Adding <b>{count}</b> addresses:<br>",
      mapSelectRoute: "Select Route:",
      mapCheckKirken: "\u{1F50D} Check {address} on kirken.no",
      mapBtnClose: "Close",
      mapBtnConfirm: "Confirm",
      mapBtnCancel: "Cancel",
      mapBtnDelete: "Delete",
      mapBtnReassign: "Reassign",
      mapReassignTitle: "Reassign Selected Addresses",
      mapReassignMsg: "You have selected {count} addresses. Choose a new route to reassign them to:",
      mapReassignBtnSelect: "Reassign Selected Addresses",
      mapDeleteTitle: "Delete Address",
      mapDeleteMsg: "Are you sure you want to delete <strong>{address}</strong> from the database?",
      mapPopupRoute: "Route",
      mapPopupDistributor: "Distributor",
      mapPopupHouseholds: "Households",
      mapUnassigned: "Unassigned",
      mapAddAddressLink: "\u{1F50D} Check if this address belongs to the Nordstrand parish on kirken.no",
      kjoerelisteTitle: "Driving list for parish magazine",
      kjoererLabel: "Driver:",
      kjoererNrLabel: "Driver no.",
      printColRute: "Route",
      printColBladbaerer: "Distributor",
      printColAntall: "Number of magazines",
      printTotalLabel: "Total",
      noDistributor: "(No distributor)",
      extraDriverPapers: "Extra magazines (driver)",
      moreAddresses: "more",
      printNoDrivers: "No drivers found to print.",
      printRunSheetAction: "Preview & Print Kj\xF8reliste",
      printAllAction: "Run sheets (Print all)",
      viewRouteReportAction: "View route report",
      routeReportTitle: "Route Report (Preview)",
      routeReportHeading: "Route {route} report",
      routeReportPrintAll: "Route Reports (Print All)",
      routeReportDeliverTo: "Deliver to",
      routeReportDoNotDeliver: "Do not deliver",
      routeReportHousehold: "household",
      routeReportHouseholds: "households",
      routeReportExcluded: "excluded",
      routeReportIncludedAddresses: "Included addresses",
      routeReportExcludedAddresses: "Excluded addresses",
      routeReportTotalPapers: "Total magazines",
      routeReportExtraPapers: "Extra magazines",
      routeReportNote: "Note",
      clickToAddNote: "Click to add note",
      routeReportNoRoutes: "No routes found to print.",
      routeReportEven: "Even",
      routeReportOdd: "Odd",
      routeReportDistributor: "Distributor",
      routeReportPhone: "Phone",
      routeReportEmail: "Email",
      routeReportDriver: "Driver",
      routeReportIncludedHouseholds: "Households (delivery)",
      routeReportExcludedHouseholds: "Excluded households",
      routeColRequiresDistributor: "Requires Distributor",
      filterActiveLabel: "Active",
      filterActivePlaceholder: "Active",
      routeColActive: "Active",
      langLabel: "Language",
      title: "Distribution Control Panel",
      subtitle: "Driver-, distributor- and address counts from source data.",
      loadDefault: "Load source.json",
      sourceMissingTitle: "Source file not loaded",
      sourceMissingMessage: "Start by loading your source.json file. Click 'Choose Data File' to select your source.json dataset.",
      openDataFolderAction: "Choose Data File",
      userGuideAction: "User guide",
      userGuideTitle: "User guide",
      userGuideLoading: "Loading...",
      userGuideFallback: "User Guide - Menighetsbladet\n\n1. Navigation & Tabs:\n- Dashboard: Key totals, magazine order requirement, and delivery overview.\n- Drivers: Manage drivers, view assigned routes/papers, preview and print run sheets (kj\xF8relister).\n- Distributors (Bladb\xE6rere): Manage distributors and assigned routes. Highlights active distributors missing a driver.\n- Addresses: Address registry with household counts and exclusions.\n- Routes: Route definitions with assigned distributor, driver, and paper counts.\n- Map: Interactive map to inspect address pins, add addresses, and reassign routes.\n\n2. Editing & Saving:\n- Search, filter, or sort directly in any table or on the map.\n- Edit, add, or delete rows as needed.\n- Click 'Save Changes' (top-right) to export updates to source.json.\n\n3. Magazine Calculation Logic:\n- Included Households = Households - Excluded Households\n- Magazines to Order = Included Households + Extra Papers\n\n4. Export & Run Sheets:\n- CSV & Excel (XLSX): Export tables or summaries with the export buttons.\n- Run Sheets: Select 'Preview & Print Kj\xF8reliste' in driver actions for a printer-friendly sheet.\n\n5. Glossary / Terms Used:\n- Route (Rute): Geographical sector for distribution.\n- Distributor (Bladb\xE6rer): Volunteer delivering magazines to mailboxes.\n- Driver (Kj\xF8rer): Volunteer transporting bundles to distributors.\n- Households: Total living units at an address.\n- Excluded Households: Households opted out of unaddressed mail.\n- Included Households: Net households to receive a magazine.\n- Extra Magazines: Buffer copies for a route, distributor, or driver.\n- Unassigned Route: A route lacking a distributor or driver.",
      chooseFile: "Choose Data File",
      settings: "Settings",
      tabDashboard: "Dashboard",
      tabDrivers: "Drivers",
      tabDistributors: "Distributors",
      tabAddresses: "Addresses",
      statusReady: "Ready. Load data to populate dashboard.",
      derivedValuesNote: "Dashboard, magazine and route count are calculated dynamically and are not stored in source.json.",
      dashboardTitle: "Dashboard",
      driversTitle: "Drivers",
      distributorsTitle: "Distributors",
      addressesTitle: "Addresses",
      driverTitle: "Driver",
      distributorTitle: "Distributor",
      addressTitle: "Address",
      routeTitle: "Route",
      colMetric: "Metric",
      colActive: "Active / Included",
      colInactive: "Inactive / Excluded",
      colTotal: "Total",
      statusActive: "Active",
      statusInactive: "Inactive",
      statusIncluded: "Included",
      statusExcluded: "Excluded",
      statusAssigned: "Assigned",
      statusUnassigned: "Unassigned",
      rowAddresses: "Addresses",
      rowRoutes: "Routes",
      rowDrivers: "Drivers",
      rowDistributors: "Distributors",
      rowHouseholds: "Households",
      rowExtraPapers: "Extra magazines",
      rowPapers: "Magazines to order",
      filterLabel: "Search",
      filterAddressLabel: "Address",
      filterAddressesOnlyExcluded: "Show only excluded addresses",
      filterAddressesWithExcluded: "Show only addresses with excluded households",
      filterRouteLabel: "Route",
      filterStatusLabel: "Status",
      filterDistributorNameLabel: "Distributor name",
      filterDriverNameLabel: "Driver name",
      filterPostnrLabel: "Postnr",
      filterAddressPlaceholder: "Address",
      filterRoutePlaceholder: "Route",
      filterStatusPlaceholder: "Status",
      filterDistributorNamePlaceholder: "Distributor name",
      filterDriverNamePlaceholder: "Driver name",
      filterPostnrPlaceholder: "Postnr",
      resetFilters: "Reset filters",
      clearFilter: "Clear",
      filterDriversPlaceholder: "Type to filter drivers...",
      filterDistributorsPlaceholder: "Type to filter distributors...",
      filterAddressesPlaceholder: "Type to filter addresses...",
      actionsCol: "Actions",
      editAction: "Edit",
      addAction: "Add record",
      modalCancel: "Cancel",
      modalSave: "Save",
      editRowTitle: "Edit {table}",
      addRowTitle: "Add {table}",
      statusSavedNow: "Saved updated source file.",
      statusChangesPending: "Changes stored in IndexedDB. Click 'Save Changes' to update source.json.",
      statusAutosaveScheduled: "Changes pending. Autosave in {seconds}s of inactivity.",
      statusAutosavedIdle: "Autosaved source file after inactivity.",
      statusSavedOnClose: "Saved source file on page close.",
      saveChangesAction: "Save Changes",
      saveAsCopyAction: "Save as copy",
      saveMoreOptions: "Save options",
      statusSavedCopyNow: "Copy saved.",
      modalErrorMissing: "This field is required.",
      closeGuardTitle: "Unsaved changes",
      closeGuardMessage: "You have unsaved changes in IndexedDB. Choose what to do before leaving.",
      closeGuardSave: "Save Changes",
      closeGuardContinue: "Continue work",
      closeGuardClose: "Close page",
      inactivityLabel: "Autosave after inactivity (seconds)",
      modalRequiredError: "Fill required fields: {fields}.",
      modalFixErrorsBelow: "Please fix the errors below.",
      duplicateErrorDriver: "A driver with this name already exists.",
      duplicateErrorDistributor: "A distributor with this name already exists.",
      duplicateErrorAddress: "This address already exists.",
      routeDuplicateError: "A route with this ID already exists.",
      routeEmptyError: "Route ID cannot be empty.",
      warningNoDriver: "No driver",
      warningDistributorNoDriver: "Active distributor lacks assigned driver",
      warningDistributorsMissingDriver: "{count} missing driver",
      dashDistNoDriverLabel: "Active without driver:",
      sendEmailTitle: "Send email",
      routeFormatError: "Route ID must include a letter and a number (e.g. 'A 10').",
      validEmail: "Invalid email address.",
      validPhone: "Invalid phone number.",
      validPostnr: "Must be a 4-digit postal code.",
      validHouseNo: "Format: number with optional letter (e.g. 12A).",
      validHouseholdCount: "Must be a whole number >= 1.",
      validExcludedHouseholdCount: "Must be a whole number >= 0.",
      validDriverNr: "Must be alphanumeric.",
      driversColName: "Name",
      driversColStatus: "Status",
      driversColDriverNo: "Driver no.",
      driversColPhone: "Phone",
      driversColEmail: "Email",
      driversColAddress: "Address",
      driversColPostnr: "Postnr",
      driversColRouteCount: "Route count",
      driversColPaperCount: "Magazine count",
      distColName: "Name",
      distColStatus: "Status",
      distColRoute: "Route",
      distColDriverNo: "Driver",
      distColPhone: "Phone",
      distColEmail: "Email",
      distColAddress: "Address",
      distColPostnr: "Postnr",
      distColPaperCount: "Magazines total",
      addrColAddress: "Address",
      addrColStatus: "Status",
      addrColRoute: "Route",
      addrColDistributor: "Distributor",
      addrColStreet: "Street",
      addrColHouseNo: "House no.",
      addrColHouseholds: "Households",
      addrColExcludedHouseholds: "Excluded households",
      addrColPostnr: "Postnr",
      addrColNote: "Note",
      statusLoaded: "Loaded {label} successfully.",
      tabRoutes: "Routes",
      routesTitle: "Routes",
      filterRoutesPlaceholder: "Type to filter routes...",
      routeColId: "Route ID",
      showOnMapTitle: "Show on map",
      routeColLetterGroup: "Group",
      routeColDriverNr: "Driver",
      routeColDriverName: "Driver",
      routeColDistributor: "Distributor",
      routeColDriver: "Driver",
      routeColAddressRanges: "Address Ranges",
      routeColNotes: "Notes",
      routeColDistributors: "Distributors",
      routeColAddresses: "Addresses",
      routeColPapers: "Magazines total",
      pagerRows: "Rows",
      pagerPrev: "Prev",
      pagerNext: "Next",
      pagerPage: "Page {current} / {total}",
      totalsLabel: "Totals",
      totalsRecords: "Records",
      totalsRoutes: "Routes",
      totalsPapers: "Magazines",
      totalsDistributors: "Distributors",
      totalsAddresses: "Addresses",
      totalsIncluded: "Included",
      totalsExcluded: "Excluded",
      dataSourceLabel: "Data source:",
      dataSourceNone: "Not loaded",
      dataSourceDefault: "Default file ({label})",
      dataSourceFile: "Selected file ({label})",
      dataSourceIdbCache: "IndexedDB cache ({label})",
      dataSourceLocalCache: "Local cache ({label})",
      dataSourceSnapshot: "Record snapshot fallback",
      dataSourceUnknown: "Unknown ({label})",
      statusLoadedCache: "Loaded cached data ({label}).",
      errInvalidXml: "Invalid JSON file.",
      errLoadDefault: "Could not load default source file.",
      errFileProtocolBlocked: "Blocked by browser security on file://. Use 'Choose Data File' or run a local server.",
      errDefaultFailed: "Default load failed. If opened as file://, use 'Choose Data File' or run a local server.",
      errParseSelected: "Could not parse selected file:",
      errReadSelected: "Could not read selected file.",
      statusReadOnlySnapshot: "Loaded local snapshot in read-only mode. Load a source file to edit.",
      deleteAction: "Delete",
      deleteRowTitle: "Delete {table}",
      deleteDriverMessage: "Deleting '{name}' will reassign {count} distributor(s). Select a driver to transfer them to:",
      deleteDistributorMessage: "Deleting '{name}' will reassign {count} route sheet(s). Select a distributor to transfer them to:",
      deleteRouteMessage: "Deleting route '{routeId}' will reassign {count} address(es). Select a route to transfer them to:",
      deleteAddressMessage: "Are you sure you want to delete address '{address}'?",
      deleteTransferLabel: "Transfer to:",
      deleteConfirm: "Confirm Delete",
      deleteNoTarget: "Please select a transfer target.",
      deleteNoTransferTarget: "Cannot delete: no other option available.",
      selectCol: "Select",
      batchDeleteAction: "Delete selected",
      batchDeleteWithCount: "Delete selected ({count})",
      batchDeleteTitle: "Delete selected {table}",
      batchSummarySelected: "Selected records: {count}",
      batchSummaryAffectedDistributors: "Affected distributors: {count}",
      batchSummaryAffectedRoutes: "Affected routes: {count}",
      batchSummaryAffectedAddresses: "Affected addresses: {count}",
      batchDeleteDriverMessage: "Deleting {count} driver(s) will reassign related distributors and routes. Select a target driver:",
      batchDeleteDistributorMessage: "Deleting {count} distributor(s) will reassign related addresses. Select a target distributor:",
      batchDeleteRouteMessage: "Deleting {count} route(s) will reassign related distributors and addresses. Select a target route:",
      batchDeleteAddressMessage: "Delete {count} address record(s)?",
      rowSelectLabel: "Select row",
      selectedChip: "Selected: {count}",
      batchStatusAction: "Update status",
      batchStatusWithCount: "Update status ({count})",
      batchStatusTitle: "Update status for selected {table}",
      batchStatusMessage: "Set status for {count} selected record(s).",
      batchStatusLabel: "Status",
      batchStatusApply: "Apply status",
      batchStatusNoSelection: "Select at least one record.",
      batchStatusNoValue: "Please choose a status.",
      batchRouteAction: "Update route",
      batchRouteWithCount: "Update route ({count})",
      batchRouteTitle: "Update route",
      batchRouteMessage: "Select a new route for {count} selected addresses.",
      selectRoutePlaceholder: "Select route...",
      batchRouteNoValue: "Please select a route.",
      exportCsvAction: "Export CSV",
      statusCsvExported: "Exported {label} to CSV ({count} rows).",
      exportDriverDistributorsCsvAction: "Export this driver's assigned distributors (CSV)",
      exportDriverDistributorsXlsxAction: "Export this driver's assigned distributors (XLSX)",
      statusDriverDistributorsExported: "Exported this driver's assigned distributors for {label} ({count} rows).",
      loadResultTitle: "Load Result",
      loadResultTitleSuccess: "Load Successful",
      loadResultTitleFail: "Load Failed",
      loadResultOk: "OK",
      loadResultDefaultSuccess: "Loaded default file successfully: {label}",
      loadResultDefaultFail: "Could not load default file. {reason}",
      ariaLanguageSelect: "Language selector",
      ariaDataViews: "Data views",
      ariaDashboardTable: "Distribution dashboard",
      ariaDriversTable: "Drivers table",
      ariaDistributorsTable: "Distributors table",
      ariaAddressesTable: "Addresses table",
      ariaRoutesTable: "Routes table",
      ariaClose: "Close"
    },
    nb: {
      infoBatchStatus: "<h4>Oppdater status</h4><p>Bruk dette verkt\xF8yet for \xE5 endre status p\xE5 flere rader samtidig.</p><ul><li>Velg ny status fra nedtrekksmenyen.</li><li>Dette vil overskrive statusen for alle valgte rader.</li><li>Endringer lagres automatisk n\xE5r du klikker p\xE5 Bruk.</li></ul>",
      infoBatchRoute: "<h4>Oppdater rute</h4><p>Bruk dette verkt\xF8yet for \xE5 flytte flere adresser til en ny rute.</p><ul><li>Velg destinasjonsruten fra nedtrekksmenyen.</li><li>Alle valgte adresser flyttes umiddelbart til den valgte ruten.</li><li>Totaler og antall blad oppdateres automatisk.</li></ul>",
      infoReportModal: "<h4>Kj\xF8relister</h4><p>Dette er en utskriftsvennlig forh\xE5ndsvisning av kj\xF8relistene.</p><ul><li>Kun aktive ruter er inkludert som standard.</li><li>Bruk nettleserens utskriftsfunksjon (Ctrl+P) etter \xE5 ha klikket p\xE5 Skriv ut.</li><li>Juster margene i utskriftsinnstillingene for best resultat.</li></ul>",
      infoRouteReportModal: "<h4>Ruterapporter</h4><p>Dette gir en detaljert oversikt over adressene for de valgte rutene.</p><ul><li>Nyttig for \xE5 verifisere at gater er riktig tildelt.</li><li>Inkluderer totalt antall husstander og ekstra blad.</li></ul>",
      infoAddAddressMap: "<h4>Legg til adresse fra kart</h4><p>Du har valgt et sted p\xE5 kartet.</p><ul><li>Sjekk adressedetaljene hentet fra Kartverket.</li><li>Velg hvilken rute du vil legge adressen til i.</li><li>N\xE5r du bekrefter, lagres adressen i databasen.</li></ul>",
      infoReassignRoute: "<h4>Tildel ruter via kart</h4><p>Du flytter valgte kartn\xE5ler til en annen rute.</p><ul><li>Dette gjelder alle n\xE5ler du har valgt (Control-klikk).</li><li>Kartet oppdateres umiddelbart.</li></ul>",
      infoEditDrivers: "<h4>Rediger sj\xE5f\xF8r</h4><p>Endre sj\xE5f\xF8rdetaljer.</p><ul><li><strong>E-post:</strong> gyldig format (eller tomt).</li><li><strong>Telefon:</strong> tall, +, -, () (eller tomt).</li><li><strong>Sj\xE5f\xF8rnr:</strong> bokstaver, tall, -, / (eller tomt).</li><li><strong>Ekstra blader:</strong> heltall (eller tomt).</li><li><strong>P\xE5krevde felt:</strong> Sj\xE5f\xF8rnavn.</li></ul>",
      infoEditDistributors: "<h4>Rediger bladb\xE6rer</h4><p>Endre bladb\xE6rerdetaljer.</p><ul><li><strong>E-post:</strong> gyldig format (eller tomt).</li><li><strong>Telefon:</strong> tall, +, -, () (eller tomt).</li><li><strong>Sj\xE5f\xF8rkobling</strong> l\xF8ses automatisk.</li><li><strong>P\xE5krevde felt:</strong> Bladb\xE6rernavn, Ruter.</li></ul>",
      infoEditAddresses: "<h4>Rediger adresse</h4><p>Endre en enkelt adresse.</p><ul><li><strong>Husstander:</strong> positivt heltall (> 0).</li><li><strong>Ekskluderte:</strong> null eller positivt heltall (>= 0).</li><li><strong>Postnr:</strong> n\xF8yaktig 4 siffer (eller tomt).</li><li><strong>P\xE5krevde felt:</strong> Adresse, Rute.</li></ul>",
      infoEditRoutes: "<h4>Rediger rute</h4><p>Endre rutedata.</p><ul><li><strong>Rute-ID:</strong> M\xE5 v\xE6re en unik, ikke-tom tekst.</li><li><strong>Krever bladb\xE6rer:</strong> Hvis krysset av, m\xE5 du tilordne en bladb\xE6rer.</li><li><strong>Ekstra blader:</strong> heltall (eller tomt).</li><li><strong>P\xE5krevde felt:</strong> Rute-ID.</li></ul>",
      mapInfoFilter: '<strong>Filtrer:</strong> Bruk "Filtrer etter rute"-nedtrekksmenyen over kartet for \xE5 bare vise adresser tildelt en bestemt rute.',
      mapTooltipRoute: "Rute",
      mapUnassignedDistributor: "Ikke tildelt",
      mapNewAddress: "Ny adresse",
      mapAddingCountAddresses: "Legger til <b>{count}</b> adresser",
      mapReassigningCountAddresses: "Tildeler <b>{count}</b> adresser p\xE5 nytt",
      mapDeleteConfirmPrompt: "Er du sikker p\xE5 at du vil slette",
      mapDeleteConfirmSuffix: "fra databasen?",
      openDataFolder: "Velg datafil",
      mapInfoTitle: "Kartveileder",
      mapInfoSingle: "Operasjoner for enkel adresser",
      mapInfoAdd: "<strong>Legg til adresse:</strong> Klikk hvor som helst p\xE5 kartet for \xE5 s\xF8ke etter en bygning. Hvis en adresse blir funnet, vil du umiddelbart bli bedt om \xE5 tildele den til en rute.",
      mapInfoReassign: "<strong>Tildel p\xE5 nytt:</strong> Klikk p\xE5 en eksisterende farget adressemark\xF8r for \xE5 se detaljer og umiddelbart tildele ny rute ved hjelp av popup-menyen.",
      mapInfoBatch: "Gruppeoperasjoner (ved hjelp av Ctrl)",
      mapInfoAddMultiple: "<strong>Legg til flere adresser:</strong> Hold <strong>Ctrl</strong> og klikk p\xE5 kartet flere ganger for \xE5 legge til flere nye bygninger i k\xF8en. Slipp Ctrl n\xE5r du er ferdig for \xE5 tildele dem til en rute samtidig.",
      mapInfoReassignMultiple: "<strong>Tildel flere p\xE5 nytt:</strong> Hold <strong>Ctrl</strong> og klikk p\xE5 fargede adressemark\xF8rer for \xE5 velge dem. Valgte mark\xF8rer blir r\xF8de. Slipp Ctrl n\xE5r du er ferdig for \xE5 tildele alle valgte adresser til en ny rute.",
      mapInfoOther: "Andre funksjoner",
      mapInfoOk: "Skj\xF8nner",
      tabMap: "Kart",
      mapRouteFilterLabel: "Filtrer etter rute:",
      mapRouteFilterAll: "Alle ruter",
      mapStatusLoading: "Laster geodata...",
      mapGuideAddMultiple: "Legg til flere adresser: Hold Ctrl og klikk p\xE5 kartet flere ganger for \xE5 legge til flere nye bygninger i k\xF8en. Slipp Ctrl n\xE5r du er ferdig for \xE5 tildele dem til en rute samtidig.",
      mapGuideFilterHelp: "Filtrer: Bruk 'Filtrer etter rute'-nedtrekksmenyen over kartet for \xE5 bare vise adresser tildelt en bestemt rute.",
      mapGuideGotIt: "Skj\xF8nner",
      mapStatusLoaded: "Lastet {routes} ruter og {addresses} adresser.",
      batchRouteTitle: "Oppdater rute",
      batchRouteAction: "Oppdater rute",
      rowUnassignedRoutes: "Ikke-tildelte ruter",
      rowRoutes: "Ruter",
      dashAssigned: "Tildelt:",
      dashUnassigned: "Ikke tildelt:",
      dashActive: "Aktiv:",
      dashInactive: "Inaktiv:",
      dashAddressesAffected: "adresser ber\xF8rt",
      dashHouseholdsAffected: "husstander ber\xF8rt",
      dashIncluded: "Inkludert:",
      dashExcluded: "Ekskludert:",
      dashPersonnelActive: "aktiv",
      dashPersonnelInactive: "inaktiv",
      exportAction: "Eksporter",
      mapGuideTitle: "Kartguide",
      mapGuideSingle: "Enkeladresseoperasjoner",
      mapGuideAdd: "Legg til adresse: Klikk hvor som helst p\xE5 kartet for \xE5 s\xF8ke etter en bygning.",
      mapGuideReassign: "Tildel adresse p\xE5 nytt: Klikk p\xE5 en farget adressemark\xF8r for \xE5 se detaljer og tildele ruten p\xE5 nytt i popup-menyen.",
      mapGuideBatch: "Grupereoperasjoner for adresser",
      mapGuideCtrl: "Hold Ctrl og klikk p\xE5 flere adressemark\xF8rer for \xE5 velge dem.",
      mapGuideReassignBatch: "Tildel p\xE5 nytt: N\xE5r du har valgt flere adresser, klikk Tildel p\xE5 nytt for \xE5 flytte alle til \xE9n rute.",
      mapGuideClear: "T\xF8m: For \xE5 fjerne utvalget, klikk hvor som helst p\xE5 kartbakgrunnen.",
      mapAddAddressTitle: "Legg til adresse?",
      mapFetchingData: "Henter data...",
      mapAddingAddresses: "Legger til <b>{count}</b> adresser:<br>",
      mapSelectRoute: "Velg rute:",
      mapCheckKirken: "\u{1F50D} Sjekk {address} p\xE5 kirken.no",
      mapBtnClose: "Lukk",
      mapBtnConfirm: "Bekreft",
      mapBtnCancel: "Avbryt",
      mapBtnDelete: "Slett",
      mapBtnReassign: "Tildel p\xE5 nytt",
      mapReassignTitle: "Tildel valgte adresser p\xE5 nytt",
      mapReassignMsg: "Du har valgt {count} adresser. Velg en ny rute for \xE5 tildele dem til:",
      mapReassignBtnSelect: "Tildel valgte adresser p\xE5 nytt",
      mapDeleteTitle: "Slett adresse",
      mapDeleteMsg: "Er du sikker p\xE5 at du vil slette <strong>{address}</strong> fra databasen?",
      mapPopupRoute: "Rute",
      mapPopupDistributor: "Bladb\xE6rer",
      mapPopupHouseholds: "Husstander",
      mapUnassigned: "Ikke tildelt",
      mapAddAddressLink: "\u{1F50D} Sjekk om denne adressen tilh\xF8rer Nordstrand menighet p\xE5 kirken.no",
      reportModalTitle: "Kj\xF8relister (Forh\xE5ndsvisning)",
      routeReportModalTitle: "Ruterapport (Forh\xE5ndsvisning)",
      reportModalPrint: "Skriv ut",
      kjoerelisteTitle: "Kj\xF8reliste for menighetsbladet",
      kjoererLabel: "Kj\xF8rer:",
      kjoererNrLabel: "Kj\xF8rer nr.",
      printColRute: "Rute",
      printColBladbaerer: "Bladb\xE6rer",
      printColAntall: "Antall blad",
      printTotalLabel: "Total",
      noDistributor: "(Ingen bladb\xE6rer)",
      extraDriverPapers: "Ekstra blad (kj\xF8rer)",
      moreAddresses: "flere",
      printNoDrivers: "Ingen kj\xF8rere funnet.",
      printRunSheetAction: "Forh\xE5ndsvis og skriv ut kj\xF8reliste",
      printAllAction: "Kj\xF8relister (Skriv ut alle)",
      viewRouteReportAction: "Vis ruterapport",
      routeReportTitle: "Ruterapport (forh\xE5ndsvisning)",
      routeReportHeading: "Rute {route} rapport",
      routeReportPrintAll: "Ruterapporter (Skriv ut alle)",
      routeReportDeliverTo: "Leveres til",
      routeReportDoNotDeliver: "Leveres ikke",
      routeReportHousehold: "husstand",
      routeReportHouseholds: "husstander",
      routeReportExcluded: "ekskludert",
      routeReportIncludedAddresses: "Inkluderte adresser",
      routeReportExcludedAddresses: "Ekskluderte adresser",
      routeReportTotalPapers: "Totalt blad",
      routeReportExtraPapers: "Ekstra blad",
      routeReportNote: "Merknad",
      clickToAddNote: "Klikk for \xE5 legge til merknad",
      routeReportNoRoutes: "Ingen ruter funnet.",
      routeReportEven: "Partall",
      routeReportOdd: "Oddetall",
      routeReportDistributor: "Bladb\xE6rer",
      routeReportPhone: "Telefon",
      routeReportEmail: "E-post",
      routeReportDriver: "Kj\xF8rer",
      routeReportIncludedHouseholds: "Husstander (levering)",
      routeReportExcludedHouseholds: "Ekskluderte husstander",
      langLabel: "Spr\xE5k",
      title: "Distribusjonskontroll",
      subtitle: "Summer av kj\xF8rere, bladb\xE6rere og adresser fra kildedata.",
      loadDefault: "Last source.json",
      sourceMissingTitle: "Kildefil ikke lastet",
      sourceMissingMessage: "Start med \xE5 laste inn din source.json-fil. Klikk 'Velg datafil' for \xE5 velge ditt source.json-datasett.",
      openDataFolderAction: "Velg datafil",
      userGuideAction: "Brukerveiledning",
      userGuideTitle: "Brukerveiledning",
      userGuideLoading: "Laster...",
      userGuideLoadError: "Kunne ikke laste README_USER.md. \xC5pne den fra prosjektroten.",
      userGuideFallback: "Brukerveiledning - Menighetsbladet\n\n1. Navigasjon og faner:\n- Dashbord: N\xF8kkeltall, bladbestilling og distribusjonsoversikt.\n- Kj\xF8rer: Administrer sj\xE5f\xF8rer og ruter, og forh\xE5ndsvis/skriv ut kj\xF8relister.\n- Bladb\xE6rer: Administrer bladb\xE6rere og ruter. Varsler dersom en aktiv bladb\xE6rer mangler sj\xE5f\xF8r.\n- Adresser: Adresseoversikt med antall husstander og ekskluderinger.\n- Ruter: Ruteoversikt med bladb\xE6rer, sj\xE5f\xF8r og antall blad.\n- Kart: Interaktivt kart for \xE5 inspisere adresser, legge til adresser og flytte adresser mellom ruter.\n\n2. Redigering og lagring:\n- S\xF8k, filtrer eller sorter i tabellene eller via kartet.\n- Rediger, legg til eller slett rader ved behov.\n- Klikk 'Lagre endringer' (oppe til h\xF8yre) for \xE5 eksportere oppdateringer til source.json.\n\n3. Bladberegning:\n- Inkluderte husstander = Husstander - Ekskluderte husstander\n- Blad som skal bestilles = Inkluderte husstander + Ekstra blad\n\n4. Eksport og kj\xF8relister:\n- CSV og Excel (XLSX): Eksporter tabeller eller sammendrag ved hjelp av eksportknappene.\n- Kj\xF8reliste: Velg 'Forh\xE5ndsvis og skriv ut kj\xF8reliste' i Kj\xF8rer-tabellens handlingsmeny.\n\n5. Ordliste / Begreper:\n- Rute: Geografisk omr\xE5de for distribusjon.\n- Bladb\xE6rer (Distribut\xF8r): Frivillig som leverer i postkasser.\n- Kj\xF8rer (Sj\xE5f\xF8r): Frivillig som transporterer bunter til bladb\xE6rere.\n- Husstander: Totalt antall boenheter.\n- Ekskluderte husstander: Husstander reservert mot uadressert post.\n- Inkluderte husstander: Netto husstander som skal motta blad.\n- Ekstra blader: Bufferkopier for rute, bladb\xE6rer eller kj\xF8rer.\n- Ufordelt rute: Rute uten tildelt bladb\xE6rer eller kj\xF8rer.",
      chooseFile: "Velg datafil",
      settings: "Innstillinger",
      tabDashboard: "Dashbord",
      tabDrivers: "Kj\xF8rer",
      tabDistributors: "Bladb\xE6rer",
      tabAddresses: "Adresser",
      statusReady: "Klar. Last inn data for \xE5 fylle dashbordet.",
      derivedValuesNote: "Dashbord, antall blad og ruter beregnes dynamisk og lagres ikke i source.json.",
      dashboardTitle: "Dashbord",
      driversTitle: "Kj\xF8rer",
      distributorsTitle: "Bladb\xE6rer",
      addressesTitle: "Adresser",
      driverTitle: "Sj\xE5f\xF8r",
      distributorTitle: "Bladb\xE6rer",
      addressTitle: "Adresse",
      routeTitle: "Rute",
      colMetric: "Metrikk",
      colActive: "Aktiv / Inkludert",
      colInactive: "Inaktiv / Ekskludert",
      colTotal: "Totalt",
      statusActive: "Aktiv",
      statusInactive: "Inaktiv",
      statusIncluded: "Inkludert",
      statusExcluded: "Ekskludert",
      statusAssigned: "Tildelt",
      statusUnassigned: "Ikke tildelt",
      rowAddresses: "Adresser",
      rowDrivers: "Kj\xF8rer",
      rowDistributors: "Bladb\xE6rer",
      rowHouseholds: "Husstander",
      rowExtraPapers: "Ekstra blad",
      rowPapers: "Blad som skal bestilles",
      filterLabel: "Sok",
      filterAddressLabel: "Adresse",
      filterAddressesOnlyExcluded: "Vis kun ekskluderte adresser",
      filterAddressesWithExcluded: "Vis kun adresser med ekskluderte husstander",
      filterRouteLabel: "Rute",
      filterStatusLabel: "Status",
      filterDistributorNameLabel: "Bladb\xE6rer",
      filterDriverNameLabel: "Kj\xF8rer",
      filterPostnrLabel: "Postnr",
      filterAddressPlaceholder: "Adresse",
      filterRoutePlaceholder: "Rute",
      filterStatusPlaceholder: "Status",
      filterDistributorNamePlaceholder: "Bladb\xE6rer",
      filterDriverNamePlaceholder: "Kj\xF8rer",
      filterPostnrPlaceholder: "Postnr",
      resetFilters: "Nullstill filtre",
      clearFilter: "Fjern",
      filterDriversPlaceholder: "Skriv for a filtrere kj\xF8rere...",
      filterDistributorsPlaceholder: "Skriv for a filtrere bladb\xE6rere...",
      filterAddressesPlaceholder: "Skriv for a filtrere adresser...",
      actionsCol: "Handlinger",
      editAction: "Rediger",
      addAction: "Legg til rad",
      modalCancel: "Avbryt",
      modalSave: "Lagre",
      editRowTitle: "Rediger {table}",
      addRowTitle: "Legg til i {table}",
      statusSavedNow: "Lagret oppdatert kildefil.",
      statusChangesPending: "Endringer er lagret i IndexedDB. Klikk 'Lagre endringer' for a oppdatere source.json.",
      statusAutosaveScheduled: "Endringer venter. Autosave etter {seconds}s inaktivitet.",
      statusAutosavedIdle: "Lagret kildefil etter inaktivitet.",
      statusSavedOnClose: "Lagret kildefil ved lukking av side.",
      saveChangesAction: "Lagre endringer",
      saveAsCopyAction: "Lagre som kopi",
      saveMoreOptions: "Lagringsalternativer",
      statusSavedCopyNow: "Kopi lagret.",
      modalErrorMissing: "Dette feltet er obligatorisk.",
      rowPersonnel: "Personell",
      routesColDescription: "Adresseoppsummering",
      routesColNotes: "Notater",
      editModalTitle: "Rediger rad",
      batchRouteLabel: "Rute",
      btnCancel: "Avbryt",
      btnUpdateGeonorge: "Oppdater fra Geonorge",
      btnMergeRoutes: "Sl\xE5 sammen ruter",
      mergeRoutesTitle: "Sl\xE5 sammen ruter",
      mergeRoutesMessage: "Sammensl\xE5ing av f\xF8lgende ruter vil overf\xF8re alle adressene til den nye ruten nedenfor, og slette de gamle rutene.",
      mergeRoutesApply: "Sl\xE5 sammen",
      geonorgeNotFound: "Fant ikke adressen p\xE5 Geonorge. Vurder \xE5 slette denne adressen.",
      geonorgeError: "Kunne ikke koble til Geonorge API.",
      batchRouteApply: "Tildel rute",
      deleteModalTitle: "Slett",
      deleteModalTransferLabel: "Overf\xF8r til:",
      selectedChipEmpty: "Valgt: 0",
      pageInfoEmpty: "Side 1 / 1",
      totalsEmpty: "Summer",
      filterActiveLabel: "Aktiv",
      filterActivePlaceholder: "Aktiv",
      batchRouteMessage: "Velg en ny rute for {count} valgte adresser.",
      selectRoutePlaceholder: "Velg rute...",
      batchRouteNoValue: "Vennligst velg en rute.",
      batchRouteWithCount: "Oppdater rute ({count})",
      closeGuardTitle: "Ulagrede endringer",
      closeGuardMessage: "Du har ulagrede endringer i IndexedDB. Velg hva du vil gjore for du lukker siden.",
      closeGuardSave: "Lagre endringer",
      closeGuardContinue: "Fortsett a jobbe",
      closeGuardClose: "Lukk side",
      inactivityLabel: "Autolagring etter inaktivitet (sekunder)",
      modalRequiredError: "Fyll ut obligatoriske felt: {fields}.",
      modalFixErrorsBelow: "Vennligst rett opp feilene nedenfor.",
      duplicateErrorDriver: "En kj\xF8rer med dette navnet eksisterer allerede.",
      duplicateErrorDistributor: "En bladb\xE6rer med dette navnet eksisterer allerede.",
      duplicateErrorAddress: "Denne adressen eksisterer allerede.",
      routeDuplicateError: "En rute med denne ID-en eksisterer allerede.",
      routeEmptyError: "Rute-ID kan ikke v\xE6re tom.",
      warningNoDriver: "Mangler sj\xE5f\xF8r",
      warningDistributorNoDriver: "Aktiv bladb\xE6rer mangler sj\xE5f\xF8r",
      warningDistributorsMissingDriver: "{count} mangler sj\xE5f\xF8r",
      dashDistNoDriverLabel: "Aktive uten sj\xE5f\xF8r:",
      sendEmailTitle: "Send e-post",
      routeFormatError: "Rute-ID m\xE5 inkludere en bokstav og et tall (f.eks. 'A 10').",
      validEmail: "Ugyldig e-postadresse.",
      validPhone: "Ugyldig telefonnummer.",
      validPostnr: "Postnr ma vare 4 sifre.",
      validHouseNo: "Format: tall med valgfri bokstav (f.eks. 12A).",
      validHouseholdCount: "Ma vare et heltall >= 1.",
      validExcludedHouseholdCount: "Ma vare et heltall >= 0.",
      validDriverNr: "Ma vare alfanumerisk.",
      driversColName: "Navn",
      driversColStatus: "Status",
      driversColDriverNo: "Kj\xF8rer nr.",
      driversColPhone: "Telefon",
      driversColEmail: "E-post",
      driversColAddress: "Adresse",
      driversColPostnr: "Postnr",
      driversColRouteCount: "Antall ruter",
      driversColPaperCount: "Antall blad",
      distColName: "Navn",
      distColStatus: "Status",
      distColRoute: "Rute",
      distColDriverNo: "Kj\xF8rer nr.",
      distColPhone: "Telefon",
      distColEmail: "E-post",
      distColAddress: "Adresse",
      distColPostnr: "Postnr",
      distColPaperCount: "Totalt blad",
      addrColAddress: "Adresse",
      addrColStatus: "Status",
      addrColRoute: "Rute",
      addrColDistributor: "Bladb\xE6rer",
      addrColStreet: "Gate",
      addrColHouseNo: "Husnr.",
      addrColHouseholds: "Husstandar",
      addrColExcludedHouseholds: "Ekskluderte husstander",
      addrColPostnr: "Postnr",
      addrColNote: "Notat",
      statusLoaded: "Lastet {label} uten feil.",
      tabRoutes: "Ruter",
      routesTitle: "Ruter",
      filterRoutesPlaceholder: "Skriv for a filtrere ruter...",
      routeColId: "Rute-ID",
      showOnMapTitle: "Vis p\xE5 kart",
      routeColLetterGroup: "Gruppe",
      routeColDriverNr: "Kj\xF8rer nr.",
      routeColDriverName: "Kj\xF8rer",
      routeColDistributor: "Bladb\xE6rer",
      routeColDriver: "Kj\xF8rer",
      routeColNotes: "Merknad",
      routeColRequiresDistributor: "Krever bladb\xE6rer",
      routeColDistributors: "Bladb\xE6rere",
      routeColAddresses: "Adresser",
      routeColPapers: "Totalt blad",
      pagerRows: "Rader",
      pagerPrev: "Forrige",
      pagerNext: "Neste",
      pagerPage: "Side {current} / {total}",
      totalsLabel: "Summer",
      totalsRecords: "Rader",
      totalsRoutes: "Ruter",
      totalsPapers: "Blad",
      totalsDistributors: "Bladb\xE6rere",
      totalsAddresses: "Adresser",
      totalsIncluded: "Inkludert",
      totalsExcluded: "Ekskludert",
      dataSourceLabel: "Datakilde:",
      dataSourceNone: "Ikke lastet",
      dataSourceDefault: "Standardfil ({label})",
      dataSourceFile: "Valgt fil ({label})",
      dataSourceIdbCache: "IndexedDB-cache ({label})",
      dataSourceLocalCache: "Lokal cache ({label})",
      dataSourceSnapshot: "Fallback fra records-snapshot",
      dataSourceUnknown: "Ukjent ({label})",
      statusLoadedCache: "Lastet data fra lokal cache ({label}).",
      errInvalidXml: "Ugyldig JSON-fil.",
      errLoadDefault: "Kunne ikke laste standard kildefil.",
      errFileProtocolBlocked: "Blokkert av nettlesersikkerhet pa file://. Bruk 'Velg datafil' eller start lokal server.",
      errDefaultFailed: "Standardlasting feilet. Hvis siden er apnet via file://, bruk 'Velg datafil' eller start lokal server.",
      errParseSelected: "Kunne ikke tolke valgt fil:",
      errReadSelected: "Kunne ikke lese valgt fil.",
      statusReadOnlySnapshot: "Lastet lokal snapshot i lesemodus. Last inn en kildefil for redigering.",
      deleteAction: "Slett",
      deleteRowTitle: "Slett {table}",
      deleteDriverMessage: "Sletting av '{name}' vil flytte {count} bladb\xE6rer(e). Velg en kj\xF8rer \xE5 overf\xF8re dem til:",
      deleteDistributorMessage: "Sletting av '{name}' vil flytte {count} ruteark. Velg en bladb\xE6rer \xE5 overf\xF8re dem til:",
      deleteRouteMessage: "Sletting av rute '{routeId}' vil flytte {count} adresse(r). Velg en rute \xE5 overf\xF8re dem til:",
      deleteAddressMessage: "Er du sikker p\xE5 at du vil slette adressen '{address}'?",
      deleteTransferLabel: "Overf\xF8r til:",
      deleteConfirm: "Bekreft sletting",
      deleteNoTarget: "Velg et m\xE5l \xE5 overf\xF8re til.",
      deleteNoTransferTarget: "Kan ikke slette: ingen andre alternativer tilgjengelig.",
      selectCol: "Velg",
      batchDeleteAction: "Slett valgte",
      batchDeleteWithCount: "Slett valgte ({count})",
      batchDeleteTitle: "Slett valgte {table}",
      batchSummarySelected: "Valgte rader: {count}",
      batchSummaryAffectedDistributors: "Ber\xF8rte bladb\xE6rere: {count}",
      batchSummaryAffectedRoutes: "Ber\xF8rte ruter: {count}",
      batchSummaryAffectedAddresses: "Ber\xF8rte adresser: {count}",
      batchDeleteDriverMessage: "Sletting av {count} kj\xF8rer(e) flytter relaterte bladb\xE6rere og ruter. Velg m\xE5lkj\xF8rer:",
      batchDeleteDistributorMessage: "Sletting av {count} bladb\xE6rer(e) flytter relaterte adresser. Velg m\xE5lbladb\xE6rer:",
      batchDeleteRouteMessage: "Sletting av {count} rute(r) flytter relaterte bladb\xE6rere og adresser. Velg m\xE5lrute:",
      batchDeleteAddressMessage: "Slette {count} adresser?",
      rowSelectLabel: "Velg rad",
      selectedChip: "Valgt: {count}",
      batchStatusAction: "Oppdater status",
      batchStatusWithCount: "Oppdater status ({count})",
      batchStatusTitle: "Oppdater status for valgte {table}",
      batchStatusMessage: "Sett status for {count} valgte rader.",
      batchStatusLabel: "Status",
      batchStatusApply: "Bruk status",
      batchStatusNoSelection: "Velg minst en rad.",
      batchStatusNoValue: "Velg en status.",
      exportCsvAction: "Eksporter CSV",
      statusCsvExported: "Eksporterte {label} til CSV ({count} rader).",
      exportDriverDistributorsCsvAction: "Eksporter denne kj\xF8rerens tilordna bladb\xE6rere (CSV)",
      exportDriverDistributorsXlsxAction: "Eksporter denne kj\xF8rerens tilordna bladb\xE6rere (XLSX)",
      statusDriverDistributorsExported: "Eksporterte denne kj\xF8rerens tilordna bladb\xE6rere for {label} ({count} rader).",
      loadResultTitle: "Lasteresultat",
      loadResultTitleSuccess: "Lasting vellykket",
      loadResultTitleFail: "Lasting feilet",
      loadResultOk: "OK",
      loadResultDefaultSuccess: "Lastet standardfilen uten feil: {label}",
      loadResultDefaultFail: "Kunne ikke laste standardfilen. {reason}",
      ariaLanguageSelect: "Spr\xE5kvelger",
      ariaDataViews: "Datavisninger",
      ariaDashboardTable: "Distribusjonsdashboard",
      ariaDriversTable: "Kj\xF8rertabell",
      ariaDistributorsTable: "Bladb\xE6rertabell",
      ariaAddressesTable: "Adressetabell",
      ariaRoutesTable: "Rutetabell",
      ariaClose: "Lukk"
    },
    nn: {
      infoBatchStatus: "<h4>Oppdater status</h4><p>Bruk dette verkt\xF8yet for \xE5 endre status p\xE5 fleire rader samstundes.</p><ul><li>Vel ny status fr\xE5 nedtrekksmenyen.</li><li>Dette vil overskrive statusen for alle valde rader.</li><li>Endringar blir lagra automatisk n\xE5r du klikkar p\xE5 Bruk.</li></ul>",
      infoBatchRoute: "<h4>Oppdater rute</h4><p>Bruk dette verkt\xF8yet for \xE5 flytte fleire adresser til ei ny rute.</p><ul><li>Vel destinasjonsruta fr\xE5 nedtrekksmenyen.</li><li>Alle valde adresser blir umiddelbart flytta til den valde ruta.</li><li>Totalar og tal p\xE5 blad blir oppdatert automatisk.</li></ul>",
      infoReportModal: "<h4>Kj\xF8relister</h4><p>Dette er ei utskriftsvennleg f\xF8rehandsvising av k\xF8yresistene.</p><ul><li>Berre aktive ruter er med som standard.</li><li>Bruk nettlesaren sin utskriftsfunksjon (Ctrl+P) etter \xE5 ha klikka p\xE5 Skriv ut.</li><li>Juster margane i utskriftsinnstillingane for best resultat.</li></ul>",
      infoRouteReportModal: "<h4>Ruterapportar</h4><p>Dette gir ei detaljert oversikt over adressene for dei valde rutene.</p><ul><li>Nyttig for \xE5 verifisere at gater er rett tildelt.</li><li>Inkluderer totalt tal p\xE5 husstandar og ekstrablad.</li></ul>",
      infoAddAddressMap: "<h4>Legg til adresse fr\xE5 kart</h4><p>Du har valt ein stad p\xE5 kartet.</p><ul><li>Sjekk adressedetaljane henta fr\xE5 Kartverket.</li><li>Vel kva rute du vil leggje adressa til i.</li><li>N\xE5r du stadfestar, blir adressa lagra i databasen.</li></ul>",
      infoReassignRoute: "<h4>Tildel ruter via kart</h4><p>Du flyttar valde kartn\xE5ler til ei anna rute.</p><ul><li>Dette gjeld alle n\xE5ler du har valt (Control-klikk).</li><li>Kartet oppdaterast umiddelbart.</li></ul>",
      infoEditDrivers: "<h4>Rediger sj\xE5f\xF8r</h4><p>Endre sj\xE5f\xF8rdetaljar.</p><ul><li><strong>E-post:</strong> gyldig format (eller tomt).</li><li><strong>Telefon:</strong> tal, +, -, () (eller tomt).</li><li><strong>Sj\xE5f\xF8rnr:</strong> bokstavar, tal, -, / (eller tomt).</li><li><strong>Ekstra blad:</strong> heiltal (eller tomt).</li><li><strong>Kravde felt:</strong> Sj\xE5f\xF8rnamn.</li></ul>",
      infoEditDistributors: "<h4>Rediger bladberar</h4><p>Endre bladberardetaljar.</p><ul><li><strong>E-post:</strong> gyldig format (eller tomt).</li><li><strong>Telefon:</strong> tal, +, -, () (eller tomt).</li><li><strong>Sj\xE5f\xF8rkopling</strong> vert l\xF8yst automatisk.</li><li><strong>Kravde felt:</strong> Bladberarnamn, Ruter.</li></ul>",
      infoEditAddresses: "<h4>Rediger adresse</h4><p>Endre ei enkelt adresse.</p><ul><li><strong>Husstandar:</strong> positivt heiltal (> 0).</li><li><strong>Ekskluderte:</strong> null eller positivt heiltal (>= 0).</li><li><strong>Postnr:</strong> n\xF8yaktig 4 siffer (eller tomt).</li><li><strong>Kravde felt:</strong> Adresse, Rute.</li></ul>",
      infoEditRoutes: "<h4>Rediger rute</h4><p>Endre rutedata.</p><ul><li><strong>Rute-ID:</strong> M\xE5 vere ein unik, ikkje-tom tekst.</li><li><strong>Krev bladberar:</strong> Om kryssa av, m\xE5 du tilordne ein bladberar.</li><li><strong>Ekstra blad:</strong> heiltal (eller tomt).</li><li><strong>Kravde felt:</strong> Rute-ID.</li></ul>",
      mapInfoFilter: '<strong>Filtrer:</strong> Bruk "Filtrer etter rute"-nedtrekksmenyen over kartet for \xE5 berre vise adresser tildelt ei bestemt rute.',
      mapTooltipRoute: "Rute",
      mapUnassignedDistributor: "Ikkje tildelt",
      mapNewAddress: "Ny adresse",
      mapAddingCountAddresses: "Legg til <b>{count}</b> adresser",
      mapReassigningCountAddresses: "Tildeler <b>{count}</b> adresser p\xE5 nytt",
      mapDeleteConfirmPrompt: "Er du sikker p\xE5 at du vil slette",
      mapDeleteConfirmSuffix: "fr\xE5 databasen?",
      openDataFolder: "Vel datafil",
      mapInfoTitle: "Kartrettleiing",
      mapInfoSingle: "Operasjonar for enkel adresser",
      mapInfoAdd: "<strong>Legg til adresse:</strong> Klikk kvar som helst p\xE5 kartet for \xE5 s\xF8kje etter ein bygning. Viss ei adresse blir funnen, vil du umiddelbart bli beden om \xE5 tildele henne til ei rute.",
      mapInfoReassign: "<strong>Tildel p\xE5 nytt:</strong> Klikk p\xE5 ein eksisterande farga adressemark\xF8r for \xE5 sj\xE5 detaljar og umiddelbart tildele ny rute ved hjelp av popup-menyen.",
      mapInfoBatch: "Gruppeoperasjonar (ved hjelp av Ctrl)",
      mapInfoAddMultiple: "<strong>Legg til fleire adresser:</strong> Hald <strong>Ctrl</strong> og klikk p\xE5 kartet fleire gonger for \xE5 leggje til fleire nye bygningar i k\xF8en. Slepp Ctrl n\xE5r du er ferdig for \xE5 tildele dei til ei rute samstundes.",
      mapInfoReassignMultiple: "<strong>Tildel fleire p\xE5 nytt:</strong> Hald <strong>Ctrl</strong> og klikk p\xE5 farga adressemark\xF8rar for \xE5 velje dei. Valde mark\xF8rar blir raude. Slepp Ctrl n\xE5r du er ferdig for \xE5 tildele alle valde adresser til ei ny rute.",
      mapInfoOther: "Andre funksjonar",
      mapInfoOk: "Skj\xF8nar",
      tabMap: "Kart",
      mapRouteFilterLabel: "Filtrer etter rute:",
      mapRouteFilterAll: "Alle ruter",
      mapStatusLoading: "Lastar geodata...",
      mapGuideAddMultiple: "Legg til fleire adresser: Hald Ctrl og klikk p\xE5 kartet fleire gonger for \xE5 leggje til fleire nye bygningar i k\xF8en. Slepp Ctrl n\xE5r du er ferdig for \xE5 tildele dei til ei rute samstundes.",
      mapGuideFilterHelp: "Filtrer: Bruk 'Filtrer etter rute'-nedtrekksmenyen over kartet for \xE5 berre vise adresser tildelt ei bestemt rute.",
      mapGuideGotIt: "Skj\xF8nar",
      mapStatusLoaded: "Lastet {routes} ruter og {addresses} adresser.",
      batchRouteTitle: "Oppdater rute",
      batchRouteAction: "Oppdater rute",
      rowUnassignedRoutes: "Ikkje-tildelte ruter",
      rowRoutes: "Ruter",
      dashAssigned: "Tildelt:",
      dashUnassigned: "Ikkje tildelt:",
      dashActive: "Aktiv:",
      dashInactive: "Inaktiv:",
      dashAddressesAffected: "adresser ramma",
      dashHouseholdsAffected: "husstandar ramma",
      dashIncluded: "Inkludert:",
      dashExcluded: "Ekskludert:",
      dashPersonnelActive: "aktiv",
      dashPersonnelInactive: "inaktiv",
      exportAction: "Eksporter",
      mapGuideTitle: "Kartguide",
      mapGuideSingle: "Enkeltadresseoperasjonar",
      mapGuideAdd: "Legg til adresse: Klikk kvar som helst p\xE5 kartet for \xE5 s\xF8ke etter ein bygning.",
      mapGuideReassign: "Tildel adresse p\xE5 nytt: Klikk p\xE5 ein farga adressemark\xF8r for \xE5 sj\xE5 detaljar og tildele ruta p\xE5 nytt i popup-menyen.",
      mapGuideBatch: "Grupperte adresseoperasjonar",
      mapGuideCtrl: "Hald Ctrl og klikk p\xE5 fleire adressemark\xF8rar for \xE5 velje dei.",
      mapGuideReassignBatch: "Tildel p\xE5 nytt: N\xE5r du har valt fleire adresser, klikk Tildel p\xE5 nytt for \xE5 flytte alle til \xE9i rute.",
      mapGuideClear: "T\xF8m: For \xE5 fjerne utvalet, klikk kvar som helst p\xE5 kartbakgrunnen.",
      mapAddAddressTitle: "Legg til adresse?",
      mapFetchingData: "Hentar data...",
      mapAddingAddresses: "Legg til <b>{count}</b> adresser:<br>",
      mapSelectRoute: "Vel rute:",
      mapCheckKirken: "\u{1F50D} Sjekk {address} p\xE5 kirken.no",
      mapBtnClose: "Lukk",
      mapBtnConfirm: "Stadfest",
      mapBtnCancel: "Avbryt",
      mapBtnDelete: "Slett",
      mapBtnReassign: "Tildel p\xE5 nytt",
      mapReassignTitle: "Tildel valde adresser p\xE5 nytt",
      mapReassignMsg: "Du har valt {count} adresser. Vel ei ny rute for \xE5 tildele dei til:",
      mapReassignBtnSelect: "Tildel valde adresser p\xE5 nytt",
      mapDeleteTitle: "Slett adresse",
      mapDeleteMsg: "Er du sikker p\xE5 at du vil slette <strong>{address}</strong> fr\xE5 databasen?",
      mapPopupRoute: "Rute",
      mapPopupDistributor: "Bladberar",
      mapPopupHouseholds: "Husstandar",
      mapUnassigned: "Ikkje tildelt",
      mapAddAddressLink: "\u{1F50D} Sjekk om denne adressa h\xF8yrer til Nordstrand sokn p\xE5 kirken.no",
      reportModalTitle: "K\xF8yrelister (F\xF8rehandsvising)",
      routeReportModalTitle: "Ruterapport (F\xF8rehandsvising)",
      reportModalPrint: "Skriv ut",
      kjoerelisteTitle: "K\xF8yreliste for kyrkjebladet",
      kjoererLabel: "K\xF8yrar:",
      kjoererNrLabel: "K\xF8yrar nr.",
      printColRute: "Rute",
      printColBladbaerer: "Bladberar",
      printColAntall: "Tal blad",
      printTotalLabel: "Totalt",
      noDistributor: "(Ingen bladb\xE6rar)",
      extraDriverPapers: "Ekstra blad (k\xF8yrar)",
      moreAddresses: "fleire",
      printNoDrivers: "Ingen k\xF8yrarar funne.",
      printRunSheetAction: "F\xF8rehandsvis og skriv ut k\xF8yreliste",
      printAllAction: "K\xF8yreliste (Skriv ut alle)",
      viewRouteReportAction: "Vis ruterapport",
      routeReportTitle: "Ruterapport (f\xF8rehandsvisning)",
      routeReportHeading: "Rute {route} rapport",
      routeReportPrintAll: "Ruterapportar (Skriv ut alle)",
      routeReportDeliverTo: "Leverast til",
      routeReportDoNotDeliver: "Leverast ikkje",
      routeReportHousehold: "husstand",
      routeReportHouseholds: "husstandar",
      routeReportExcluded: "ekskludert",
      routeReportIncludedAddresses: "Inkluderte adresser",
      routeReportExcludedAddresses: "Ekskluderte adresser",
      routeReportTotalPapers: "Totalt blad",
      routeReportExtraPapers: "Ekstra blad",
      routeReportNote: "Merknad",
      clickToAddNote: "Klikk for \xE5 leggje til merknad",
      routeReportNoRoutes: "Ingen ruter funne.",
      routeReportEven: "Partal",
      routeReportOdd: "Oddetal",
      routeReportDistributor: "Bladberar",
      routeReportPhone: "Telefon",
      routeReportEmail: "E-post",
      routeReportDriver: "K\xF8yrar",
      routeReportIncludedHouseholds: "Husstandar (levering)",
      routeReportExcludedHouseholds: "Ekskluderte husstandar",
      langLabel: "Spr\xE5k",
      title: "Distribusjonskontroll",
      subtitle: "Oppsummering av kj\xF8rere, bladb\xE6rere og adresser fra kjelda.",
      loadDefault: "Last source.json",
      sourceMissingTitle: "Kjeldefil ikkje lasta",
      sourceMissingMessage: "Start med \xE5 laste inn di source.json-fil. Klikk 'Vel datafil' for \xE5 velje ditt source.json-datasett.",
      openDataFolderAction: "Vel datafil",
      userGuideAction: "Brukarrettleiing",
      userGuideTitle: "Brukarrettleiing",
      userGuideLoading: "Lastar...",
      userGuideLoadError: "Klarte ikkje \xE5 laste README_USER.md. Opne fila fr\xE5 prosjektrota.",
      userGuideFallback: "Brukarrettleiing - Menighetsbladet\n\n1. Navigasjon og faner:\n- Dashbord: N\xF8kkeltal, bladbestilling og distribusjonsoversyn.\n- Kj\xF8rer: Administrer sj\xE5f\xF8rar og ruter, og f\xF8rehandsvis/skriv ut k\xF8yrelister.\n- Bladberar: Administrer bladberarar og ruter. Varslar dersom ein aktiv bladberar manglar sj\xE5f\xF8r.\n- Adresser: Adresseoversikt med tal p\xE5 husstandar og ekskluderingar.\n- Ruter: Ruteoversikt med bladberar, sj\xE5f\xF8r og tal p\xE5 blad.\n- Kart: Interaktivt kart for \xE5 inspisere adresser, leggje til adresser og flytte adresser mellom ruter.\n\n2. Redigering og lagring:\n- S\xF8k, filtrer eller sorter i tabellane eller via kartet.\n- Rediger, legg til eller slett rader ved behov.\n- Klikk 'Lagre endringar' (oppe til h\xF8gre) for \xE5 eksportere oppdateringar til source.json.\n\n3. Bladrekning:\n- Inkluderte husstandar = Husstandar - Ekskluderte husstandar\n- Blad som skal bestillast = Inkluderte husstandar + Ekstra blad\n\n4. Eksport og k\xF8yrelister:\n- CSV og Excel (XLSX): Eksporter tabellar eller samandrag ved hjelp av eksportknappane.\n- K\xF8yreliste: Vel 'F\xF8rehandsvis og skriv ut k\xF8yreliste' i Kj\xF8rer-tabellen.\n\n5. Ordliste / Omgrep:\n- Rute: Geografisk omr\xE5de for distribusjon.\n- Bladberar (Distribut\xF8r): Frivillig som leverer i postkassar.\n- Kj\xF8rer (Sj\xE5f\xF8r): Frivillig som transporterer buntar til bladberarar.\n- Husstandar: Totalt tal p\xE5 bueiningar.\n- Ekskluderte husstandar: Husstandar reservert mot uadressert post.\n- Inkluderte husstandar: Netto husstandar som skal f\xE5 blad.\n- Ekstra blad: Bufferkopiar for rute, bladberar eller kj\xF8rer.\n- Ufordelt rute: Rute utan tildelt bladberar eller kj\xF8rer.",
      chooseFile: "Vel datafil",
      settings: "Innstillingar",
      tabDashboard: "Oversyn",
      tabDrivers: "Kj\xF8rer",
      tabDistributors: "Bladb\xE6rer",
      tabAddresses: "Adresser",
      statusReady: "Klar. Last inn data for \xE5 fylle kontrollpanelet.",
      derivedValuesNote: "Oversyn, tal p\xE5 blad og ruter blir rekna ut dynamisk og blir ikkje lagra i source.json.",
      dashboardTitle: "Oversyn",
      driversTitle: "Kj\xF8rer",
      distributorsTitle: "Bladb\xE6rer",
      addressesTitle: "Adresser",
      driverTitle: "Sj\xE5f\xF8r",
      distributorTitle: "Bladberar",
      addressTitle: "Adresse",
      routeTitle: "Rute",
      colMetric: "Metrikk",
      colActive: "Aktiv / Inkludert",
      colInactive: "Inaktiv / Ekskludert",
      colTotal: "Totalt",
      statusActive: "Aktiv",
      statusInactive: "Inaktiv",
      statusIncluded: "Inkludert",
      statusExcluded: "Ekskludert",
      statusAssigned: "Tildelt",
      statusUnassigned: "Ikkje tildelt",
      rowAddresses: "Adresser",
      rowDrivers: "Kj\xF8rer",
      rowDistributors: "Bladb\xE6rer",
      rowHouseholds: "Husstandar",
      rowExtraPapers: "Ekstra blad",
      rowPapers: "Blad som skal bestillast",
      filterLabel: "Sok",
      filterAddressLabel: "Adresse",
      filterAddressesOnlyExcluded: "Vis berre ekskluderte adresser",
      filterAddressesWithExcluded: "Vis berre adresser med ekskluderte husstandar",
      filterRouteLabel: "Rute",
      filterStatusLabel: "Status",
      filterDistributorNameLabel: "Bladb\xE6rer",
      filterDriverNameLabel: "Kj\xF8rer",
      filterPostnrLabel: "Postnr",
      filterAddressPlaceholder: "Adresse",
      filterRoutePlaceholder: "Rute",
      filterStatusPlaceholder: "Status",
      filterDistributorNamePlaceholder: "Bladb\xE6rer",
      filterDriverNamePlaceholder: "Kj\xF8rer",
      filterPostnrPlaceholder: "Postnr",
      resetFilters: "Nullstill filter",
      clearFilter: "Fjern",
      filterDriversPlaceholder: "Skriv for a filtrere kj\xF8rere...",
      filterDistributorsPlaceholder: "Skriv for a filtrere bladb\xE6rere...",
      filterAddressesPlaceholder: "Skriv for a filtrere adresser...",
      actionsCol: "Handlingar",
      editAction: "Rediger",
      addAction: "Legg til rad",
      modalCancel: "Avbryt",
      modalSave: "Lagre",
      editRowTitle: "Rediger {table}",
      addRowTitle: "Legg til i {table}",
      statusSavedNow: "Lagra oppdatert kjeldefil.",
      statusChangesPending: "Endringar er lagra i IndexedDB. Klikk 'Lagre endringar' for a oppdatere source.json.",
      statusAutosaveScheduled: "Endringar ventar. Autolagring etter {seconds}s inaktivitet.",
      statusAutosavedIdle: "Lagra kjeldefil etter inaktivitet.",
      statusSavedOnClose: "Lagra kjeldefil ved lukking av side.",
      saveChangesAction: "Lagre endringar",
      saveAsCopyAction: "Lagre som kopi",
      saveMoreOptions: "Lagringsalternativ",
      statusSavedCopyNow: "Kopi lagra.",
      modalErrorMissing: "Dette feltet er obligatorisk.",
      rowPersonnel: "Personell",
      routesColDescription: "Adresseoppsummering",
      routesColNotes: "Notat",
      editModalTitle: "Rediger rad",
      batchRouteLabel: "Rute",
      btnCancel: "Avbryt",
      btnUpdateGeonorge: "Oppdater fr\xE5 Geonorge",
      btnMergeRoutes: "Sl\xE5 saman ruter",
      mergeRoutesTitle: "Sl\xE5 saman ruter",
      mergeRoutesMessage: "Samansl\xE5ing av f\xF8lgjande ruter vil overf\xF8re alle adressene til den nye ruta nedanfor, og slette dei gamle rutene.",
      mergeRoutesApply: "Sl\xE5 saman",
      geonorgeNotFound: "Fann ikkje adressa p\xE5 Geonorge. Vurder \xE5 slette denne adressa.",
      geonorgeError: "Kunne ikkje kople til Geonorge API.",
      batchRouteApply: "Tildel rute",
      deleteModalTitle: "Slett",
      deleteModalTransferLabel: "Overf\xF8r til:",
      selectedChipEmpty: "Vald: 0",
      pageInfoEmpty: "Side 1 / 1",
      totalsEmpty: "Summer",
      filterActiveLabel: "Aktiv",
      filterActivePlaceholder: "Aktiv",
      batchRouteMessage: "Vel ei ny rute for {count} valde adresser.",
      selectRoutePlaceholder: "Vel rute...",
      batchRouteNoValue: "Ver vennleg og vel ei rute.",
      batchRouteWithCount: "Oppdater rute ({count})",
      closeGuardTitle: "Ulagra endringar",
      closeGuardMessage: "Du har ulagra endringar i IndexedDB. Vel kva du vil gjere for du lukkar sida.",
      closeGuardSave: "Lagre endringar",
      closeGuardContinue: "Hald fram med arbeid",
      closeGuardClose: "Lukk sida",
      inactivityLabel: "Autolagring etter inaktivitet (sekund)",
      modalRequiredError: "Fyll ut obligatoriske felt: {fields}.",
      modalFixErrorsBelow: "Vennligst rett opp feilane nedanfor.",
      duplicateErrorDriver: "Ein k\xF8yrar med dette namnet eksisterer allereie.",
      duplicateErrorDistributor: "Ein bladberar med dette namnet eksisterer allereie.",
      duplicateErrorAddress: "Denne adressa eksisterer allereie.",
      routeDuplicateError: "Ei rute med denne ID-en eksisterer allereie.",
      routeEmptyError: "Rute-ID kan ikkje vere tom.",
      warningNoDriver: "Manglar sj\xE5f\xF8r",
      warningDistributorNoDriver: "Aktiv bladberar manglar sj\xE5f\xF8r",
      warningDistributorsMissingDriver: "{count} manglar sj\xE5f\xF8r",
      dashDistNoDriverLabel: "Aktive utan sj\xE5f\xF8r:",
      sendEmailTitle: "Send e-post",
      routeFormatError: "Rute-ID m\xE5 inkludere ein bokstav og eit tal (f.eks. 'A 10').",
      validEmail: "Ugyldig e-postadresse.",
      validPhone: "Ugyldig telefonnummer.",
      validPostnr: "Postnr ma vere 4 sifre.",
      validHouseNo: "Format: tal med valfri bokstav (t.d. 12A).",
      validHouseholdCount: "Ma vere eit heiltal >= 1.",
      validExcludedHouseholdCount: "Ma vere eit heiltal >= 0.",
      validDriverNr: "Ma vere alfanumerisk.",
      driversColName: "Namn",
      driversColStatus: "Status",
      driversColDriverNo: "Kj\xF8rer nr.",
      driversColPhone: "Telefon",
      driversColEmail: "E-post",
      driversColAddress: "Adresse",
      driversColPostnr: "Postnr",
      driversColRouteCount: "Tal ruter",
      driversColPaperCount: "Tal blad",
      distColName: "Namn",
      distColStatus: "Status",
      distColRoute: "Rute",
      distColDriverNo: "Kj\xF8rer nr.",
      distColPhone: "Telefon",
      distColEmail: "E-post",
      distColAddress: "Adresse",
      distColPostnr: "Postnr",
      distColPaperCount: "Totalt blad",
      addrColAddress: "Adresse",
      addrColStatus: "Status",
      addrColRoute: "Rute",
      addrColDistributor: "Bladberar",
      addrColStreet: "Gate",
      addrColHouseNo: "Husnr.",
      addrColHouseholds: "Husstandar",
      addrColExcludedHouseholds: "Ekskluderte husstandar",
      addrColPostnr: "Postnr",
      addrColNote: "Merknad",
      statusLoaded: "Lasta {label} utan feil.",
      tabRoutes: "Ruter",
      routesTitle: "Ruter",
      filterRoutesPlaceholder: "Skriv for a filtrere ruter...",
      routeColId: "Rute-ID",
      showOnMapTitle: "Vis p\xE5 kart",
      routeColLetterGroup: "Gruppe",
      routeColDriverNr: "Kj\xF8rer nr.",
      routeColDriverName: "Kj\xF8rer",
      routeColDistributor: "Bladberar",
      routeColDriver: "K\xF8yrar",
      routeColNotes: "Merknad",
      routeColRequiresDistributor: "Krev bladberar",
      routeColDistributors: "Bladberarar",
      routeColAddresses: "Adresser",
      routeColPapers: "Totalt blad",
      pagerRows: "Rader",
      pagerPrev: "Forrige",
      pagerNext: "Neste",
      pagerPage: "Side {current} / {total}",
      totalsLabel: "Summer",
      totalsRecords: "Rader",
      totalsRoutes: "Ruter",
      totalsPapers: "Blad",
      totalsDistributors: "Bladb\xE6rere",
      totalsAddresses: "Adresser",
      totalsIncluded: "Inkludert",
      totalsExcluded: "Ekskludert",
      dataSourceLabel: "Datakjelde:",
      dataSourceNone: "Ikkje lasta",
      dataSourceDefault: "Standardfil ({label})",
      dataSourceFile: "Vald fil ({label})",
      dataSourceIdbCache: "IndexedDB-cache ({label})",
      dataSourceLocalCache: "Lokal cache ({label})",
      dataSourceSnapshot: "Fallback fra records-snapshot",
      dataSourceUnknown: "Ukjend ({label})",
      statusLoadedCache: "Lasta data fra lokal cache ({label}).",
      errInvalidXml: "Ugyldig JSON-fil.",
      errLoadDefault: "Klarte ikkje a laste standard kjeldefil.",
      errFileProtocolBlocked: "Blokkert av nettlesartryggleik pa file://. Bruk 'Vel datafil' eller start lokal server.",
      errDefaultFailed: "Standardlasting feila. Om sida er opna via file://, bruk 'Vel datafil' eller start lokal server.",
      errParseSelected: "Klarte ikkje a tolke vald fil:",
      errReadSelected: "Klarte ikkje a lese vald fil.",
      statusReadOnlySnapshot: "Lasta lokal snapshot i lesemodus. Last inn ei kjeldefil for redigering.",
      deleteAction: "Slett",
      deleteRowTitle: "Slett {table}",
      deleteDriverMessage: "Sletting av '{name}' vil flytte {count} bladb\xE6rar(ar). Vel ein kj\xF8rer \xE5 overf\xF8re dei til:",
      deleteDistributorMessage: "Sletting av '{name}' vil flytte {count} ruteark. Vel ein bladb\xE6rar \xE5 overf\xF8re dei til:",
      deleteRouteMessage: "Sletting av rute '{routeId}' vil flytte {count} adresse(r). Vel ein rute \xE5 overf\xF8re dei til:",
      deleteAddressMessage: "Er du sikker p\xE5 at du vil slette adressa '{address}'?",
      deleteTransferLabel: "Overf\xF8r til:",
      deleteConfirm: "Stadfest sletting",
      deleteNoTarget: "Vel eit m\xE5l \xE5 overf\xF8re til.",
      deleteNoTransferTarget: "Kan ikkje slette: ingen andre alternativ tilgjengelege.",
      selectCol: "Vel",
      batchDeleteAction: "Slett valde",
      batchDeleteWithCount: "Slett valde ({count})",
      batchDeleteTitle: "Slett valde {table}",
      batchSummarySelected: "Valde rader: {count}",
      batchSummaryAffectedDistributors: "Ramma bladb\xE6rarar: {count}",
      batchSummaryAffectedRoutes: "Ramma ruter: {count}",
      batchSummaryAffectedAddresses: "Ramma adresser: {count}",
      batchDeleteDriverMessage: "Sletting av {count} k\xF8yrarar flyttar relaterte bladb\xE6rarar og ruter. Vel m\xE5lk\xF8yrar:",
      batchDeleteDistributorMessage: "Sletting av {count} bladb\xE6rarar flyttar relaterte adresser. Vel m\xE5lbladb\xE6rar:",
      batchDeleteRouteMessage: "Sletting av {count} ruter flyttar relaterte bladb\xE6rarar og adresser. Vel m\xE5lrute:",
      batchDeleteAddressMessage: "Slette {count} adresser?",
      rowSelectLabel: "Vel rad",
      selectedChip: "Valde: {count}",
      batchStatusAction: "Oppdater status",
      batchStatusWithCount: "Oppdater status ({count})",
      batchStatusTitle: "Oppdater status for valde {table}",
      batchStatusMessage: "Set status for {count} valde rader.",
      batchStatusLabel: "Status",
      batchStatusApply: "Bruk status",
      batchStatusNoSelection: "Vel minst ei rad.",
      batchStatusNoValue: "Vel ein status.",
      exportCsvAction: "Eksporter CSV",
      statusCsvExported: "Eksporterte {label} til CSV ({count} rader).",
      exportDriverDistributorsCsvAction: "Eksporter denne k\xF8yrarens tilordna bladb\xE6rarar (CSV)",
      exportDriverDistributorsXlsxAction: "Eksporter denne k\xF8yrarens tilordna bladb\xE6rarar (XLSX)",
      statusDriverDistributorsExported: "Eksporterte denne k\xF8yrarens tilordna bladb\xE6rarar for {label} ({count} rader).",
      loadResultTitle: "Lasteresultat",
      loadResultTitleSuccess: "Innlasting vellukka",
      loadResultTitleFail: "Innlasting feila",
      loadResultOk: "OK",
      loadResultDefaultSuccess: "Lasta standardfila utan feil: {label}",
      loadResultDefaultFail: "Klarte ikkje laste standardfila. {reason}",
      ariaLanguageSelect: "Spr\xE5kveljar",
      ariaDataViews: "Datavisningar",
      ariaDashboardTable: "Distribusjonsoversyn",
      ariaDriversTable: "K\xF8yraretabell",
      ariaDistributorsTable: "Bladb\xE6rartabell",
      ariaAddressesTable: "Adressetabell",
      ariaRoutesTable: "Rutetabell",
      ariaClose: "Lukk"
    },
    sv: {
      infoBatchStatus: "<h4>Uppdatera status</h4><p>Anv\xE4nd detta verktyg f\xF6r att \xE4ndra status p\xE5 flera rader samtidigt.</p><ul><li>V\xE4lj ny status fr\xE5n rullgardinsmenyn.</li><li>Detta kommer att skriva \xF6ver statusen f\xF6r alla valda rader.</li><li>\xC4ndringar sparas automatiskt n\xE4r du klickar p\xE5 Verkst\xE4ll.</li></ul>",
      infoBatchRoute: "<h4>Uppdatera rutt</h4><p>Anv\xE4nd detta verktyg f\xF6r att flytta flera adresser till en ny rutt.</p><ul><li>V\xE4lj destinationsrutt fr\xE5n rullgardinsmenyn.</li><li>Alla valda adresser flyttas omedelbart till den valda rutten.</li><li>Totaler och antal blad uppdateras automatiskt.</li></ul>",
      infoReportModal: "<h4>K\xF6rlistor</h4><p>Detta \xE4r en utskriftsv\xE4nlig f\xF6rhandsgranskning av k\xF6rlistorna.</p><ul><li>Endast aktiva rutter inkluderas som standard.</li><li>Anv\xE4nd webbl\xE4sarens utskriftsfunktion (Ctrl+P) efter att ha klickat p\xE5 Skriv ut.</li><li>Justera marginalerna i utskriftsinst\xE4llningarna f\xF6r b\xE4sta resultat.</li></ul>",
      infoRouteReportModal: "<h4>Ruttrapporter</h4><p>Detta ger en detaljerad \xF6versikt \xF6ver adresserna f\xF6r de valda rutterna.</p><ul><li>Anv\xE4ndbart f\xF6r att verifiera att gator \xE4r korrekt tilldelade.</li><li>Inkluderar totalt antal hush\xE5ll och extrablad.</li></ul>",
      infoAddAddressMap: "<h4>L\xE4gg till adress fr\xE5n karta</h4><p>Du har valt en plats p\xE5 kartan.</p><ul><li>Kontrollera adressuppgifterna h\xE4mtade fr\xE5n Kartverket.</li><li>V\xE4lj vilken rutt du vill tilldela adressen till.</li><li>N\xE4r du bekr\xE4ftar sparas adressen i databasen.</li></ul>",
      infoReassignRoute: "<h4>Tilldela rutter via karta</h4><p>Du flyttar valda kartn\xE5lar till en annan rutt.</p><ul><li>Detta g\xE4ller alla n\xE5lar du har valt (Control-klick).</li><li>Kartan uppdateras direkt.</li></ul>",
      infoEditDrivers: "<h4>Redigera f\xF6rare</h4><p>\xC4ndra f\xF6rardetaljer.</p><ul><li><strong>E-post:</strong> giltigt format (eller tomt).</li><li><strong>Telefon:</strong> siffror, +, -, () (eller tomt).</li><li><strong>F\xF6rarnr:</strong> bokst\xE4ver, siffror, -, / (eller tomt).</li><li><strong>Extra blad:</strong> heltal (eller tomt).</li><li><strong>Kr\xE4vda f\xE4lt:</strong> F\xF6rarnamn.</li></ul>",
      infoEditDistributors: "<h4>Redigera distribut\xF6r</h4><p>\xC4ndra distribut\xF6rsdetaljer.</p><ul><li><strong>E-post:</strong> giltigt format (eller tomt).</li><li><strong>Telefon:</strong> siffror, +, -, () (eller tomt).</li><li><strong>F\xF6rarkoppling</strong> l\xF6ses automatiskt.</li><li><strong>Kr\xE4vda f\xE4lt:</strong> Distribut\xF6rsnamn, Rutter.</li></ul>",
      infoEditAddresses: "<h4>Redigera adress</h4><p>\xC4ndra en enskild adress.</p><ul><li><strong>Hush\xE5ll:</strong> positivt heltal (> 0).</li><li><strong>Exkluderade:</strong> noll eller positivt heltal (>= 0).</li><li><strong>Postnr:</strong> exakt 4 siffror (eller tomt).</li><li><strong>Kr\xE4vda f\xE4lt:</strong> Adress, Rutt.</li></ul>",
      infoEditRoutes: "<h4>Redigera rutt</h4><p>\xC4ndra ruttdata.</p><ul><li><strong>Rutt-ID:</strong> Kom ih\xE5g mellanslag (t.ex. A 10).</li><li><strong>Kr\xE4ver distribut\xF6r:</strong> Om ikryssad m\xE5ste du tilldela en distribut\xF6r.</li><li><strong>Extra blad:</strong> heltal (eller tomt).</li><li><strong>Kr\xE4vda f\xE4lt:</strong> Rutt-ID.</li></ul>",
      mapInfoFilter: '<strong>Filtrera:</strong> Anv\xE4nd "Filtrera efter rutt"-rullgardinsmenyn ovanf\xF6r kartan f\xF6r att endast visa adresser tilldelade en specifik rutt.',
      mapTooltipRoute: "Rutt",
      mapUnassignedDistributor: "Otilldelad",
      mapNewAddress: "Ny adress",
      mapAddingCountAddresses: "L\xE4gger till <b>{count}</b> adresser",
      mapReassigningCountAddresses: "Tilldelar <b>{count}</b> adresser p\xE5 nytt",
      mapDeleteConfirmPrompt: "\xC4r du s\xE4ker p\xE5 att du vill ta bort",
      mapDeleteConfirmSuffix: "fr\xE5n databasen?",
      openDataFolder: "V\xE4lj datafil",
      openDataFolderAction: "V\xE4lj datafil",
      loadDefault: "Ladda source.json",
      sourceMissingTitle: "K\xE4llfil ej laddad",
      sourceMissingMessage: "B\xF6rja med att ladda din source.json-fil. Klicka p\xE5 'V\xE4lj datafil' f\xF6r att v\xE4lja ditt source.json-dataset.",
      mapInfoTitle: "Kartguide",
      mapInfoSingle: "Enskilda adressoperationer",
      mapInfoAdd: "<strong>L\xE4gg till adress:</strong> Klicka var som helst p\xE5 kartan f\xF6r att s\xF6ka efter en byggnad. Om en adress hittas kommer du omedelbart att uppmanas att tilldela den till en rutt.",
      mapInfoReassign: "<strong>Tilldela om:</strong> Klicka p\xE5 en befintlig f\xE4rgad adressmark\xF6r f\xF6r att se detaljer och omedelbart tilldela ny rutt med hj\xE4lp av popup-menyn.",
      mapInfoBatch: "Gruppoperationer (med Ctrl)",
      mapInfoAddMultiple: "<strong>L\xE4gg till flera adresser:</strong> H\xE5ll in <strong>Ctrl</strong> och klicka p\xE5 kartan flera g\xE5nger f\xF6r att st\xE4lla flera nya byggnader i k\xF6. Sl\xE4pp Ctrl n\xE4r du \xE4r klar f\xF6r att tilldela dem till en rutt samtidigt.",
      mapInfoReassignMultiple: "<strong>Tilldela om flera:</strong> H\xE5ll in <strong>Ctrl</strong> och klicka p\xE5 f\xE4rgade adressmark\xF6rer f\xF6r att v\xE4lja dem. Valda mark\xF6rer blir r\xF6da. Sl\xE4pp Ctrl n\xE4r du \xE4r klar f\xF6r att tilldela alla valda adresser till en ny rutt.",
      mapInfoOther: "Andra funktioner",
      mapInfoOk: "F\xF6rst\xE5tt",
      tabMap: "Karta",
      mapRouteFilterLabel: "Filtrera efter rutt:",
      mapRouteFilterAll: "Alla rutter",
      mapStatusLoading: "Laddar geodata...",
      mapGuideAddMultiple: "L\xE4gg till flera adresser: H\xE5ll in Ctrl och klicka p\xE5 kartan flera g\xE5nger f\xF6r att st\xE4lla flera nya byggnader i k\xF6. Sl\xE4pp Ctrl n\xE4r du \xE4r klar f\xF6r att tilldela dem till en rutt samtidigt.",
      mapGuideFilterHelp: "Filtrera: Anv\xE4nd rullgardinsmenyn 'Filtrera efter rutt' ovanf\xF6r kartan f\xF6r att endast visa adresser tilldelade en specifik rutt.",
      mapGuideGotIt: "F\xF6rst\xE5tt",
      mapStatusLoaded: "Laddade {routes} rutter och {addresses} adresser.",
      batchRouteTitle: "Uppdatera rutt",
      batchRouteAction: "Uppdatera rutt",
      rowUnassignedRoutes: "Otilldelade rutter",
      dashAssigned: "Tilldelad:",
      dashUnassigned: "Otilldelad:",
      dashActive: "Aktiv:",
      dashInactive: "Inaktiv:",
      dashAddressesAffected: "adresser p\xE5verkade",
      dashHouseholdsAffected: "hush\xE5ll p\xE5verkade",
      dashIncluded: "Inkluderad:",
      dashExcluded: "Exkluderad:",
      dashPersonnelActive: "aktiv",
      dashPersonnelInactive: "inaktiv",
      exportAction: "Exportera",
      mapGuideTitle: "Kartguide",
      mapGuideSingle: "Enskilda adressoperationer",
      mapGuideAdd: "L\xE4gg till adress: Klicka var som helst p\xE5 kartan f\xF6r att s\xF6ka efter en byggnad.",
      mapGuideReassign: "Tilldela om adress: Klicka p\xE5 en f\xE4rgad adressmark\xF6r f\xF6r att se detaljer och tilldela om rutten i popup-menyn.",
      mapGuideBatch: "Gruppoperationer f\xF6r adresser",
      mapGuideCtrl: "H\xE5ll Ctrl och klicka p\xE5 flera adressmark\xF6rer f\xF6r att v\xE4lja dem.",
      mapGuideReassignBatch: "Tilldela om: N\xE4r du har valt flera adresser, klicka Tilldela om f\xF6r att flytta alla till en rutt.",
      mapGuideClear: "Rensa: F\xF6r att rensa urvalet, klicka var som helst p\xE5 kartbakgrunden.",
      mapAddAddressTitle: "L\xE4gg till adress?",
      mapFetchingData: "H\xE4mtar data...",
      mapAddingAddresses: "L\xE4gger till <b>{count}</b> adresser:<br>",
      mapSelectRoute: "V\xE4lj rutt:",
      mapCheckKirken: "\u{1F50D} Kolla {address} p\xE5 kirken.no",
      mapBtnClose: "St\xE4ng",
      mapBtnConfirm: "Bekr\xE4fta",
      mapBtnCancel: "Avbryt",
      mapBtnDelete: "Radera",
      mapBtnReassign: "Tilldela om",
      mapReassignTitle: "Tilldela om valda adresser",
      mapReassignMsg: "Du har valt {count} adresser. V\xE4lj en ny rutt f\xF6r att tilldela om dem till:",
      mapReassignBtnSelect: "Tilldela om valda adresser",
      mapDeleteTitle: "Radera adress",
      mapDeleteMsg: "\xC4r du s\xE4ker p\xE5 att du vill radera <strong>{address}</strong> fr\xE5n databasen?",
      mapPopupRoute: "Rutt",
      mapPopupDistributor: "Distribut\xF6r",
      mapPopupHouseholds: "Hush\xE5ll",
      mapUnassigned: "Otilldelad",
      mapAddAddressLink: "\u{1F50D} Kolla om denna adress tillh\xF6r Nordstrands f\xF6rsamling p\xE5 kirken.no",
      reportModalTitle: "K\xF6rlistor (F\xF6rhandsgranskning)",
      routeReportModalTitle: "Ruttrapport (F\xF6rhandsgranskning)",
      reportModalPrint: "Skriv ut",
      kjoerelisteTitle: "K\xF6rlista f\xF6r f\xF6rsamlingsbladet",
      kjoererLabel: "F\xF6rare:",
      kjoererNrLabel: "F\xF6rare nr.",
      printColRute: "Rutt",
      printColBladbaerer: "Distribut\xF6r",
      printColAntall: "Antal blad",
      printTotalLabel: "Totalt",
      noDistributor: "(Ingen distribut\xF6r)",
      extraDriverPapers: "Extra tidningar (f\xF6rare)",
      moreAddresses: "fler",
      printNoDrivers: "Inga f\xF6rare hittades.",
      printRunSheetAction: "F\xF6rhandsgranska och skriv ut k\xF6rlista",
      printAllAction: "K\xF6rlistor (Skriv ut alla)",
      viewRouteReportAction: "Visa ruttrapport",
      routeReportTitle: "Ruttrapport (f\xF6rhandsgranskning)",
      routeReportHeading: "Rutt {route} rapport",
      routeReportPrintAll: "Ruttrapporter (Skriv ut alla)",
      routeReportDeliverTo: "Levereras till",
      routeReportDoNotDeliver: "Levereras inte",
      routeReportHousehold: "hush\xE5ll",
      routeReportHouseholds: "hush\xE5ll",
      routeReportExcluded: "exkluderat",
      routeReportIncludedAddresses: "Inkluderade adresser",
      routeReportExcludedAddresses: "Exkluderade adresser",
      routeReportTotalPapers: "Totalt blad",
      routeReportExtraPapers: "Extra blad",
      routeReportNote: "Anteckning",
      clickToAddNote: "Klicka f\xF6r att l\xE4gga till anteckning",
      routeReportNoRoutes: "Inga rutter hittades.",
      routeReportEven: "J\xE4mna",
      routeReportOdd: "Udda",
      routeReportDistributor: "Distribut\xF6r",
      routeReportPhone: "Telefon",
      routeReportEmail: "E-post",
      routeReportDriver: "F\xF6rare",
      routeReportIncludedHouseholds: "Hush\xE5ll (leverans)",
      tabDashboard: "Instrumentpanelen",
      tabDrivers: "Forare",
      tabDistributors: "Distributorer",
      tabAddresses: "Adresser",
      dashboardTitle: "Instrumentpanelen",
      driversTitle: "Forare",
      distributorsTitle: "Distributorer",
      addressesTitle: "Adresser",
      driverTitle: "Chauff\xF6r",
      distributorTitle: "Bud",
      addressTitle: "Adress",
      routeTitle: "Rutt",
      colMetric: "Matrik",
      colActive: "Aktiv / Inkluderad",
      colInactive: "Inaktiv / Exkluderad",
      colTotal: "Totalt",
      statusActive: "Aktiv",
      statusInactive: "Inaktiv",
      statusIncluded: "Inkluderad",
      statusExcluded: "Exkluderad",
      statusAssigned: "Tilldelad",
      statusUnassigned: "Otilldelad",
      rowAddresses: "Adresser",
      rowRoutes: "Rutter",
      rowDrivers: "Forare",
      rowDistributors: "Distributorer",
      rowHouseholds: "Hushall",
      rowExtraPapers: "Extra blad",
      rowPapers: "Blad att best\xE4lla",
      filterLabel: "Sok",
      filterAddressLabel: "Adress",
      filterAddressesOnlyExcluded: "Visa endast exkluderade adresser",
      filterAddressesWithExcluded: "Visa endast adresser med exkluderade hush\xE5ll",
      filterRouteLabel: "Rutt",
      filterStatusLabel: "Status",
      filterDistributorNameLabel: "Distributor",
      filterDriverNameLabel: "Forare",
      filterPostnrLabel: "Postnr",
      filterAddressPlaceholder: "Adress",
      filterRoutePlaceholder: "Rutt",
      filterStatusPlaceholder: "Status",
      filterDistributorNamePlaceholder: "Distributor",
      filterDriverNamePlaceholder: "Forare",
      filterPostnrPlaceholder: "Postnr",
      resetFilters: "Aterstall filter",
      clearFilter: "Rensa",
      filterDriversPlaceholder: "Skriv for att filtrera forare...",
      filterDistributorsPlaceholder: "Skriv for att filtrera distributorer...",
      filterAddressesPlaceholder: "Skriv for att filtrera adresser...",
      userGuideAction: "Anv\xE4ndarguide",
      userGuideTitle: "Anv\xE4ndarguide",
      userGuideLoading: "Laddar...",
      userGuideFallback: "Anv\xE4ndarguide - Menighetsbladet\n\n1. Navigering och flikar:\n- Dashboard: Totaler, tidningsbest\xE4llning och distributions\xF6versikt.\n- Kj\xF6rere (F\xF6rare): Hantera f\xF6rare och rutter, f\xF6rhandsgranska och skriv ut k\xF6rlistor.\n- Bladb\xE6rere (Utdelare): Hantera utdelare och rutter. Varnar om en aktiv utdelare saknar f\xF6rare.\n- Adresser: Adress\xF6versikt med antal hush\xE5ll och undantag.\n- Rutter: Rutt\xF6versikt med utdelare, f\xF6rare och tidningsantal.\n- Karta: Interaktiv karta f\xF6r att inspektera adresser, l\xE4gga till adresser och flytta adresser mellan rutter.\n\n2. Redigering och sparande:\n- S\xF6k, filtrera eller sortera i tabellerna eller via kartan.\n- Redigera, l\xE4gg till eller ta bort rader vid behov.\n- Klicka p\xE5 'Spara \xE4ndringar' (uppe till h\xF6ger) f\xF6r att exportera uppdateringar till source.json.\n\n3. Tidningsber\xE4kning:\n- Inkluderade hush\xE5ll = Hush\xE5ll - Exkluderade hush\xE5ll\n- Tidningar att best\xE4lla = Inkluderade hush\xE5ll + Extra tidningar\n\n4. Export och k\xF6rlistor:\n- CSV och Excel (XLSX): Exportera tabeller eller sammanfattningar via exportknapparna.\n- K\xF6rlista: V\xE4lj 'F\xF6rhandsgranska och skriv ut k\xF6rlista' i f\xF6rartabellens \xE5tg\xE4rdsmeny.\n\n5. Ordlista / Begrepp:\n- Rutt (Rute): Geografiskt omr\xE5de f\xF6r utdelning.\n- Utdelare (Bladb\xE6rer): Frivillig som delar ut tidningar i brevl\xE5dor.\n- F\xF6rare (Kj\xF8rer): Frivillig som transporterer buntar till utdelare.\n- Hush\xE5ll: Totalt antal boendeenheter.\n- Exkluderade hush\xE5ll: Hush\xE5ll som avb\xF6jt reklam/oadresserad post.\n- Inkluderade hush\xE5ll: Nettoantal hush\xE5ll som ska f\xE5 tidning.\n- Extra tidningar: Buffertkopior f\xF6r rutt, utdelare eller f\xF6rare.\n- Otilldelad rutt: Rutt utan utdelare eller f\xF6rare.",
      actionsCol: "Atgarder",
      editAction: "Redigera",
      addAction: "Lagg till rad",
      modalCancel: "Avbryt",
      modalSave: "Spara",
      editRowTitle: "Redigera {table}",
      addRowTitle: "Lagg till i {table}",
      statusSavedNow: "Sparade uppdaterad kallfil.",
      statusChangesPending: "Andringar ar sparade i IndexedDB. Klicka 'Spara andringar' for att uppdatera source.json.",
      statusAutosaveScheduled: "Andringar vantar. Autosave efter {seconds}s inaktivitet.",
      statusAutosavedIdle: "Sparade kallfil efter inaktivitet.",
      statusSavedOnClose: "Sparade kallfil vid stangning.",
      saveChangesAction: "Spara andringar",
      saveAsCopyAction: "Spara som kopia",
      saveMoreOptions: "Sparaalternativ",
      statusSavedCopyNow: "Kopia sparad.",
      modalErrorMissing: "Detta f\xE4lt \xE4r obligatoriskt.",
      title: "Menighetsbladet",
      langLabel: "Spr\xE5k",
      subtitle: "F\xF6rar-, distribut\xF6rs- och adressantal fr\xE5n k\xE4lldata.",
      chooseFile: "V\xE4lj datafil",
      derivedValuesNote: "Instrumentpanel, tidnings- och ruttantal ber\xE4knas dynamiskt och sparas inte i source.json.",
      settings: "Inst\xE4llningar",
      statusReady: "Klar. Ladda data f\xF6r att fylla instrumentpanelen.",
      rowPersonnel: "Personal",
      routesColDescription: "Adress\xF6versikt",
      routesColNotes: "Anteckningar",
      editModalTitle: "Redigera rad",
      batchRouteLabel: "Rutt",
      btnCancel: "Avbryt",
      btnUpdateGeonorge: "Uppdatera fr\xE5n Geonorge",
      btnMergeRoutes: "Sl\xE5 ihop rutter",
      mergeRoutesTitle: "Sl\xE5 ihop rutter",
      mergeRoutesMessage: "Sammanslagning av f\xF6ljande rutter kommer att flytta alla deras adresser till den nya rutten nedan, och ta bort de gamla rutterna.",
      mergeRoutesApply: "Sl\xE5 ihop",
      geonorgeNotFound: "Adressen hittades inte p\xE5 Geonorge. \xD6verv\xE4g att ta bort adressen.",
      geonorgeError: "Kunde inte ansluta till Geonorge API.",
      batchRouteApply: "Tilldela rutt",
      deleteModalTitle: "Ta bort",
      deleteModalTransferLabel: "\xD6verf\xF6r till:",
      selectedChipEmpty: "Valda: 0",
      pageInfoEmpty: "Sida 1 / 1",
      totalsEmpty: "Totalt",
      filterActiveLabel: "Aktiv",
      filterActivePlaceholder: "Aktiv",
      batchRouteMessage: "V\xE4lj en ny rutt f\xF6r {count} valda adresser.",
      selectRoutePlaceholder: "V\xE4lj rutt...",
      batchRouteNoValue: "V\xE4nligen v\xE4lj en rutt.",
      batchRouteWithCount: "Uppdatera rutt ({count})",
      routeReportExcludedHouseholds: "Exkluderade hush\xE5ll",
      closeGuardTitle: "Osparade andringar",
      closeGuardMessage: "Du har osparade andringar i IndexedDB. Valj vad du vill gora innan du stanger sidan.",
      closeGuardSave: "Spara andringar",
      closeGuardContinue: "Fortsatt arbeta",
      closeGuardClose: "Stang sida",
      inactivityLabel: "Autospara efter inaktivitet (sekunder)",
      modalRequiredError: "Fyll i obligatoriska falt: {fields}.",
      modalFixErrorsBelow: "V\xE4nligen \xE5tg\xE4rda felen nedan.",
      duplicateErrorDriver: "En chauff\xF6r med detta namn existerar redan.",
      duplicateErrorDistributor: "En distribut\xF6r med detta namn existerar redan.",
      duplicateErrorAddress: "Denna adress existerar redan.",
      routeDuplicateError: "En rutt med detta ID existerar redan.",
      routeEmptyError: "Rutt-ID kan inte vara tomt.",
      warningNoDriver: "Saknar f\xF6rare",
      warningDistributorNoDriver: "Aktiv distribut\xF6r saknar f\xF6rare",
      warningDistributorsMissingDriver: "{count} saknar f\xF6rare",
      dashDistNoDriverLabel: "Aktiva utan f\xF6rare:",
      sendEmailTitle: "Skicka e-post",
      routeFormatError: "Rutt-ID m\xE5ste inneh\xE5lla en bokstav och en siffra (t.ex. 'A 10').",
      validEmail: "Ogiltig e-postadress.",
      validPhone: "Ogiltigt telefonnummer.",
      validPostnr: "Postnr maste vara 4 siffror.",
      validHouseNo: "Format: siffror med valfri bokstav (t.ex. 12A).",
      validHouseholdCount: "Maste vara ett heltal >= 1.",
      validExcludedHouseholdCount: "Maste vara ett heltal >= 0.",
      validDriverNr: "Maste vara alfanumeriskt.",
      driversColName: "Namn",
      driversColStatus: "Status",
      driversColDriverNo: "Forarnr.",
      driversColPhone: "Telefon",
      driversColEmail: "E-post",
      driversColAddress: "Adress",
      driversColPostnr: "Postnr",
      driversColRouteCount: "Antal rutter",
      driversColPaperCount: "Antal blad",
      distColName: "Namn",
      distColStatus: "Status",
      distColRoute: "Rutt",
      distColDriverNo: "Forare",
      distColPhone: "Telefon",
      distColEmail: "E-post",
      distColAddress: "Adress",
      distColPostnr: "Postnr",
      distColPaperCount: "Totalt blad",
      addrColAddress: "Adress",
      addrColStatus: "Status",
      addrColRoute: "Rutt",
      addrColDistributor: "Distributer",
      addrColStreet: "Gata",
      addrColHouseNo: "Husnr.",
      addrColHouseholds: "Hushall",
      addrColExcludedHouseholds: "Exkluderade hushall",
      addrColPostnr: "Postnr",
      addrColNote: "Notering",
      statusLoaded: "{label} laddades utan fel.",
      tabRoutes: "Rutter",
      routesTitle: "Rutter",
      filterRoutesPlaceholder: "Skriv for att filtrera rutter...",
      routeColId: "Rutt-ID",
      showOnMapTitle: "Visa p\xE5 karta",
      routeColLetterGroup: "Grupp",
      routeColDriverNr: "F\xF6rare",
      routeColDriverName: "F\xF6rare",
      routeColDistributor: "Distribut\xF6r",
      routeColRequiresDistributor: "Kr\xE4ver distribut\xF6r",
      routeColDriver: "F\xF6rare",
      routeColAddressRanges: "Adressintervall",
      routeColNotes: "Anteckningar",
      routeColDistributors: "Distributorer",
      routeColAddresses: "Adresser",
      routeColPapers: "Totalt blad",
      pagerRows: "Rader",
      pagerPrev: "Forra",
      pagerNext: "Nasta",
      pagerPage: "Sida {current} / {total}",
      totalsLabel: "Summering",
      totalsRecords: "Rader",
      totalsRoutes: "Rutter",
      totalsPapers: "Blad",
      totalsDistributors: "Distributorer",
      totalsAddresses: "Adresser",
      totalsIncluded: "Inkluderade",
      totalsExcluded: "Exkluderade",
      dataSourceLabel: "Datakalla:",
      dataSourceNone: "Inte laddad",
      dataSourceDefault: "Standardfil ({label})",
      dataSourceFile: "Vald fil ({label})",
      dataSourceIdbCache: "IndexedDB-cache ({label})",
      dataSourceLocalCache: "Lokal cache ({label})",
      dataSourceSnapshot: "Fallback fra records-snapshot",
      dataSourceUnknown: "Okand ({label})",
      statusLoadedCache: "Laddade cachad data ({label}).",
      errInvalidXml: "Ogiltig JSON-fil.",
      errLoadDefault: "Kunde inte ladda standard kallfil.",
      errFileProtocolBlocked: "Blockerat av webblasarsakerhet pa file://. Anvand 'Valj datafil' eller kor lokal server.",
      errDefaultFailed: "Standardinlasning misslyckades. Om sidan ar oppnad via file://, anvand 'Valj datafil' eller kor lokal server.",
      errParseSelected: "Kunde inte tolka vald fil:",
      errReadSelected: "Kunde inte lasa vald fil.",
      statusReadOnlySnapshot: "Laddade lokal snapshot i skrivskyddat lage. Ladda en kallfil for redigering.",
      deleteAction: "Radera",
      deleteRowTitle: "Radera {table}",
      deleteDriverMessage: "Borttagning av '{name}' omtilldelar {count} distributorer. V\xE4lj en forare att \xF6verf\xF6ra dem till:",
      deleteDistributorMessage: "Borttagning av '{name}' omtilldelar {count} ruteark. V\xE4lj en distributor att \xF6verf\xF6ra dem till:",
      deleteRouteMessage: "Borttagning av rutt '{routeId}' omtilldelar {count} adress(er). V\xE4lj en rutt att \xF6verf\xF6ra dem till:",
      deleteAddressMessage: "Vill du verkligen ta bort adressen '{address}'?",
      deleteTransferLabel: "\xD6verf\xF6r till:",
      deleteConfirm: "Bekr\xE4fta borttagning",
      deleteNoTarget: "V\xE4lj ett \xF6verf\xF6ringsm\xE5l.",
      deleteNoTransferTarget: "Kan inte radera: inget annat alternativ tillg\xE4ngligt.",
      selectCol: "V\xE4lj",
      batchDeleteAction: "Radera valda",
      batchDeleteWithCount: "Radera valda ({count})",
      batchDeleteTitle: "Radera valda {table}",
      batchSummarySelected: "Valda rader: {count}",
      batchSummaryAffectedDistributors: "P\xE5verkade distributorer: {count}",
      batchSummaryAffectedRoutes: "P\xE5verkade rutter: {count}",
      batchSummaryAffectedAddresses: "P\xE5verkade adresser: {count}",
      batchDeleteDriverMessage: "Radering av {count} f\xF6rare omf\xF6rdelar relaterade distributorer och rutter. V\xE4lj m\xE5lf\xF6rare:",
      batchDeleteDistributorMessage: "Radering av {count} distributorer omf\xF6rdelar relaterade adresser. V\xE4lj m\xE5ldistributor:",
      batchDeleteRouteMessage: "Radering av {count} rutter omf\xF6rdelar relaterade distributorer och adresser. V\xE4lj m\xE5lrutt:",
      batchDeleteAddressMessage: "Radera {count} adressposter?",
      rowSelectLabel: "V\xE4lj rad",
      selectedChip: "Valda: {count}",
      batchStatusAction: "Uppdatera status",
      batchStatusWithCount: "Uppdatera status ({count})",
      batchStatusTitle: "Uppdatera status f\xF6r valda {table}",
      batchStatusMessage: "S\xE4tt status f\xF6r {count} valda rader.",
      batchStatusLabel: "Status",
      batchStatusApply: "Anv\xE4nd status",
      batchStatusNoSelection: "V\xE4lj minst en rad.",
      batchStatusNoValue: "V\xE4lj en status.",
      exportCsvAction: "Exportera CSV",
      statusCsvExported: "Exporterade {label} till CSV ({count} rader).",
      exportDriverDistributorsCsvAction: "Exportera denna f\xF6rarens tilldelade distribut\xF6rer (CSV)",
      exportDriverDistributorsXlsxAction: "Exportera denna f\xF6rarens tilldelade distribut\xF6rer (XLSX)",
      statusDriverDistributorsExported: "Exporterade denna f\xF6rarens tilldelade distribut\xF6rer f\xF6r {label} ({count} rader).",
      loadResultTitle: "Laddningsresultat",
      loadResultTitleSuccess: "Inl\xE4sning lyckades",
      loadResultTitleFail: "Inl\xE4sning misslyckades",
      loadResultOk: "OK",
      loadResultDefaultSuccess: "Laddade standardfilen utan fel: {label}",
      loadResultDefaultFail: "Kunde inte ladda standardfilen. {reason}",
      ariaLanguageSelect: "Spr\xE5kv\xE4ljare",
      ariaDataViews: "Datavyer",
      ariaDashboardTable: "Distributions\xF6versikt",
      ariaDriversTable: "F\xF6rartabell",
      ariaDistributorsTable: "Distribut\xF6rstabell",
      ariaAddressesTable: "Adresstabell",
      ariaRoutesTable: "Ruttabell",
      ariaClose: "St\xE4ng"
    }
  };
  var currentLang = "nb";
  function setLang(lang) {
    currentLang = I18N[lang] ? lang : "nb";
    return currentLang;
  }
  function detectInitialLanguage() {
    var saved = localStorage.getItem("ui-lang");
    if (saved === "no") {
      saved = "nb";
    }
    if (saved && I18N[saved]) {
      return saved;
    }
    var browserLang = (navigator.language || "nb").toLowerCase();
    if (browserLang.indexOf("nn") === 0) {
      return "nn";
    }
    if (browserLang.indexOf("en") === 0) {
      return "en";
    }
    if (browserLang.indexOf("sv") === 0) {
      return "sv";
    }
    return "nb";
  }
  function t(key, vars) {
    var langMap = I18N[currentLang] || I18N.nb || I18N.en;
    var text = langMap[key] || I18N.nb && I18N.nb[key] || I18N.en && I18N.en[key] || key;
    if (!vars) {
      return text;
    }
    return text.replace(/\{(\w+)\}/g, function(_, name) {
      return vars[name] != null ? String(vars[name]) : "";
    });
  }

  // web/src/state.js
  var currentData = {
    drivers: [],
    distributors: [],
    addresses: [],
    routes: []
  };
  function emptyFilterCriteria() {
    return {
      route: [],
      status: [],
      distributorName: [],
      driverName: [],
      postnr: [],
      active: [],
      address: [],
      onlyExcludedAddresses: false,
      onlyWithExcludedHouseholds: false
    };
  }
  var filterState = {
    drivers: emptyFilterCriteria(),
    distributors: emptyFilterCriteria(),
    addresses: emptyFilterCriteria(),
    routes: emptyFilterCriteria()
  };
  var filterComponents = {
    drivers: {},
    distributors: {},
    addresses: {},
    routes: {}
  };
  var editState = {
    mode: "edit",
    tableName: null,
    rowIndex: -1
  };
  var deleteState = {
    mode: "single",
    tableName: null,
    rowIndex: -1,
    rowIndexes: []
  };
  var batchStatusState = {
    tableName: null,
    rowIndexes: []
  };
  var batchRouteState = {
    tableName: null,
    rowIndexes: []
  };
  var batchSelectionState = {
    drivers: {},
    distributors: {},
    addresses: {},
    routes: {}
  };
  var sortState = {
    drivers: { key: "name", dir: 1 },
    distributors: { key: "name", dir: 1 },
    addresses: { key: "address", dir: 1 },
    routes: { key: "routeId", dir: 1 }
  };
  var paginationState = {
    drivers: { page: 1, pageSize: 25 },
    distributors: { page: 1, pageSize: 25 },
    addresses: { page: 1, pageSize: 25 },
    routes: { page: 1, pageSize: 25 }
  };
  var sortConfig = {
    drivers: {
      panelId: "panel-drivers",
      keys: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "routeCount", "paperCount", null]
    },
    distributors: {
      panelId: "panel-distributors",
      keys: ["name", "status", "routes", "driverNr", "phone", "email", "address", "postnr", "extraPapers", "paperCount", null]
    },
    addresses: {
      panelId: "panel-addresses",
      keys: [null, "address", "route", "distributor", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note", null]
    },
    routes: {
      panelId: "panel-routes",
      keys: [null, "routeId", "status", "distributorNames", "driver", "includedAddresses", "extraPapers", "paperCount", "addressRanges", "notes", null]
    }
  };
  var editFieldsByTable = {
    drivers: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "extraPapers"],
    distributors: ["name", "status", "driverName", "routes", "phone", "email", "address", "postnr", "extraPapers"],
    addresses: ["address", "route", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note"],
    routes: ["routeId", "status", "requiresDistributor", "distributor", "driver", "extraPapers", "notes"]
  };
  var addFieldsByTable = {
    drivers: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "extraPapers"],
    distributors: ["name", "status", "driverName", "routes", "phone", "email", "address", "postnr", "extraPapers"],
    addresses: ["address", "route", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note"],
    routes: ["routeId", "status", "requiresDistributor", "distributor", "driver", "extraPapers", "notes"]
  };
  var tableTitleKeys = {
    drivers: "driversTitle",
    distributors: "distributorsTitle",
    addresses: "addressesTitle",
    routes: "routesTitle"
  };
  var tableTitleSingleKeys = {
    drivers: "driverTitle",
    distributors: "distributorTitle",
    addresses: "addressTitle",
    routes: "routeTitle"
  };
  var fieldLabelKeyByTable = {
    drivers: {
      name: "driversColName",
      status: "driversColStatus",
      driverNr: "driversColDriverNo",
      phone: "driversColPhone",
      email: "driversColEmail",
      address: "driversColAddress",
      postnr: "driversColPostnr",
      routeCount: "driversColRouteCount",
      paperCount: "driversColPaperCount",
      extraPapers: "rowExtraPapers"
    },
    distributors: {
      name: "distColName",
      status: "distColStatus",
      routes: "distColRoute",
      driverNr: "distColDriverNo",
      driverName: "distColDriverNo",
      phone: "distColPhone",
      email: "distColEmail",
      address: "distColAddress",
      postnr: "distColPostnr",
      paperCount: "distColPaperCount",
      extraPapers: "rowExtraPapers"
    },
    addresses: {
      address: "addrColAddress",
      route: "addrColRoute",
      distributor: "addrColDistributor",
      numberOfHouseholds: "addrColHouseholds",
      numberOfExcludedHouseholds: "addrColExcludedHouseholds",
      postnr: "addrColPostnr",
      note: "addrColNote"
    },
    routes: {
      routeId: "routeColId",
      driverNr: "routeColDriverNr",
      driverName: "routeColDriverName",
      distributor: "routeColDistributor",
      driver: "routeColDriver",
      status: "distColStatus",
      requiresDistributor: "routeColRequiresDistributor",
      extraPapers: "rowExtraPapers",
      notes: "routeColNotes"
    }
  };
  var requiredFieldsByMode = {
    edit: {
      drivers: ["name"],
      distributors: ["name"],
      addresses: ["address"],
      routes: ["routeId"]
    },
    add: {
      drivers: ["name"],
      distributors: ["name"],
      addresses: ["address", "route"],
      routes: ["routeId"]
    }
  };
  var filterFieldMap = {
    drivers: {
      route: ["routes"],
      status: ["status"],
      distributorName: ["distributorName"],
      driverName: ["name", "driverName"],
      postnr: ["postnr"]
    },
    distributors: {
      route: ["routes"],
      status: ["status"],
      distributorName: ["name", "distributorName"],
      driverName: ["driverName"],
      postnr: ["postnr"]
    },
    addresses: {
      address: ["address", "note"],
      route: ["route"],
      distributorName: ["distributor"],
      postnr: ["postnr"]
    },
    routes: {
      route: ["routeId"],
      status: ["status"],
      distributorName: ["distributorNames", "distributor"],
      driverName: ["driver", "driverName"],
      postnr: ["postnrs"]
    }
  };

  // web/src/main.js
  init_dom();

  // web/src/calculations.js
  function normalizeRouteIdentifier(raw) {
    var value = String(raw || "").trim();
    if (!value) {
      return "";
    }
    value = value.replace(/\s+/g, " ").replace(/\s*\(\s*/g, "(").replace(/\s*\)\s*/g, ")");
    var m = value.match(/^([a-z]+)\s*(\d+)(.*)$/i);
    if (!m) {
      return value.toUpperCase();
    }
    var prefix = m[1].toUpperCase();
    var number = m[2];
    var suffix = (m[3] || "").replace(/\s+/g, "").toLowerCase();
    return prefix + " " + number + suffix;
  }
  function getRouteLetterGroup(routeId) {
    var m = String(routeId || "").match(/^([A-Za-z]+)/);
    return m ? m[1].toUpperCase() : "\u2013";
  }
  var currentDataVersion = 0;
  var _cachedMetricsVersion = -1;
  var _cachedMetrics = null;
  function recomputeMetricsFromCurrentData() {
    if (_cachedMetricsVersion === currentDataVersion && _cachedMetrics) {
      return _cachedMetrics;
    }
    var addrIncluded = 0;
    var addrExcluded = 0;
    var addrUnassigned = 0;
    var householdsIncluded = 0;
    var householdsExcluded = 0;
    var householdsUnassigned = 0;
    var extraPapersTotal = 0;
    var routesAssigned = 0;
    var routesUnassigned = 0;
    var routesActive = 0;
    var routesInactive = 0;
    var routeIsAssigned = {};
    var routeRequiresDistributor = {};
    var routeActiveMap = {};
    (currentData.routes || []).forEach(function(row) {
      var rId = normalizeRouteIdentifier(row.routeId || "");
      if (row.active === false) {
        routesInactive += 1;
        return;
      }
      routesActive += 1;
      routeRequiresDistributor[rId] = row.requiresDistributor !== false;
      if (row.requiresDistributor === false) {
        if (!row.driver || String(row.driver).trim() === "") {
          routesUnassigned += 1;
        } else {
          routesAssigned += 1;
          routeIsAssigned[rId] = true;
        }
      } else if (!row.distributor || String(row.distributor).trim() === "") {
        routesUnassigned += 1;
      } else {
        routesAssigned += 1;
        routeIsAssigned[rId] = true;
      }
    });
    (currentData.routes || []).forEach(function(rt) {
      routeActiveMap[normalizeRouteIdentifier(rt.routeId)] = rt.status !== "inactive";
    });
    currentData.addresses.forEach(function(row) {
      var routeId = normalizeRouteIdentifier(row.route || "");
      if (routeActiveMap[routeId] === false) return;
      var isUnassigned = false;
      if (!routeId) {
        isUnassigned = true;
      } else {
        isUnassigned = !routeIsAssigned[routeId];
      }
      if (isUnassigned) {
        addrUnassigned += 1;
      }
      var households = toInt2(row.numberOfHouseholds);
      if (households < 1) {
        households = 1;
      }
      var excludedHouseholds = toInt2(row.numberOfExcludedHouseholds);
      if (excludedHouseholds < 0) {
        excludedHouseholds = 0;
      }
      if (excludedHouseholds > households) {
        excludedHouseholds = households;
      }
      if (isUnassigned) {
        householdsUnassigned += households;
      } else {
        householdsExcluded += excludedHouseholds;
        householdsIncluded += households - excludedHouseholds;
        if (excludedHouseholds === households) {
          addrExcluded += 1;
        } else {
          addrIncluded += 1;
        }
      }
      extraPapersTotal += 0;
    });
    var drvActive = 0;
    var drvInactive = 0;
    currentData.drivers.forEach(function(row) {
      if ((row.status || "").toLowerCase() === "active") {
        drvActive += 1;
      } else {
        drvInactive += 1;
      }
    });
    var distActive = 0;
    var distInactive = 0;
    var distActiveNoDriver = 0;
    currentData.distributors.forEach(function(row) {
      var isActive = (row.status || "").toLowerCase() === "active";
      if (isActive) {
        distActive += 1;
        var hasDriver = !!(row.driverName && String(row.driverName).trim()) || !!(row.driverNr && String(row.driverNr).trim());
        if (!hasDriver) {
          distActiveNoDriver += 1;
        }
      } else {
        distInactive += 1;
      }
    });
    (currentData.drivers || []).forEach(function(row) {
      var e = toInt2(row.extraPapers);
      extraPapersTotal += e;
    });
    (currentData.distributors || []).forEach(function(row) {
      var e = toInt2(row.extraPapers);
      extraPapersTotal += e;
    });
    (currentData.routes || []).forEach(function(row) {
      if (row.active === false) return;
      var e = toInt2(row.extraPapers);
      extraPapersTotal += e;
    });
    var papersToOrder = Math.max(0, householdsIncluded + extraPapersTotal);
    _cachedMetrics = {
      addrIncluded,
      addrExcluded,
      addrUnassigned,
      addrTotal: currentData.addresses.length,
      householdsIncluded,
      householdsExcluded,
      householdsUnassigned,
      householdsTotal: householdsIncluded + householdsExcluded + householdsUnassigned,
      extraPapersTotal,
      routesAssigned,
      routesUnassigned,
      routesTotal: routesAssigned + routesUnassigned,
      routesActive,
      routesInactive,
      drvActive,
      drvInactive,
      drvTotal: currentData.drivers.length,
      distActive,
      distInactive,
      distActiveNoDriver,
      distTotal: currentData.distributors.length,
      papersToOrder
    };
    _cachedMetricsVersion = currentDataVersion;
    return _cachedMetrics;
  }
  function normalizeRecords(rows) {
    return (rows || []).map(function(row) {
      var out = {};
      Object.keys(row || {}).forEach(function(key) {
        if (key.indexOf("__") === 0) {
          return;
        }
        out[key] = row[key];
      });
      return out;
    });
  }
  function normalizeAddressRow(row) {
    row.route = normalizeRouteIdentifier(row.route || "");
    if (Object.prototype.hasOwnProperty.call(row, "status")) {
      delete row.status;
    }
    if (Object.prototype.hasOwnProperty.call(row, "street")) {
      delete row.street;
    }
    if (Object.prototype.hasOwnProperty.call(row, "houseNo")) {
      delete row.houseNo;
    }
    row.address = row.address || "";
    row.postnr = row.postnr || "";
    row.note = row.note || "";
    row.numberOfHouseholds = toInt2(row.numberOfHouseholds);
    if (row.numberOfHouseholds < 1) {
      row.numberOfHouseholds = 1;
    }
    row.numberOfExcludedHouseholds = toInt2(row.numberOfExcludedHouseholds);
    if (row.numberOfExcludedHouseholds < 0) {
      row.numberOfExcludedHouseholds = 0;
    }
    var dist = null;
    if (currentData.distributors && currentData.distributors.length) {
      for (var i = 0; i < currentData.distributors.length; i += 1) {
        var d = currentData.distributors[i];
        var rts = getDistributorRoutes(d);
        var hasRoute = false;
        for (var j = 0; j < rts.length; j += 1) {
          if (normalizeRouteIdentifier(rts[j]) === row.route) {
            hasRoute = true;
            break;
          }
        }
        if (hasRoute) {
          dist = d;
          break;
        }
      }
    }
    if (dist) {
      row.distributor = dist.name || "";
      row.driverName = dist.driverName || "";
    } else {
      var rt = null;
      if (currentData.routes && currentData.routes.length) {
        for (var k = 0; k < currentData.routes.length; k += 1) {
          if (normalizeRouteIdentifier(currentData.routes[k].routeId) === row.route) {
            rt = currentData.routes[k];
            break;
          }
        }
      }
      row.distributor = rt ? rt.distributor || "" : "";
      row.driverName = rt ? rt.driver || rt.driverName || "" : "";
    }
    return row;
  }
  function getAddressPaperCount(row) {
    var households = toInt2(row.numberOfHouseholds);
    if (households < 1) {
      households = 1;
    }
    var excluded = toInt2(row.numberOfExcludedHouseholds);
    if (excluded < 0) {
      excluded = 0;
    }
    if (excluded > households) {
      excluded = households;
    }
    return households - excluded;
  }
  function normalizeRouteValues(rawValue) {
    var out = [];
    var seen = {};
    function addValue(value) {
      var text = String(value == null ? "" : value).trim();
      if (!text) {
        return;
      }
      var parts = text.split(/[;,]/).map(function(part) {
        return normalizeRouteIdentifier(String(part || "").trim());
      }).filter(Boolean);
      parts.forEach(function(part) {
        if (!seen[part]) {
          seen[part] = true;
          out.push(part);
        }
      });
    }
    if (Array.isArray(rawValue)) {
      rawValue.forEach(addValue);
    } else {
      addValue(rawValue);
    }
    return out;
  }
  function getDistributorRoutes(row) {
    if (!row) {
      return [];
    }
    if (Array.isArray(row.routes)) {
      return normalizeRouteValues(row.routes);
    }
    if (row.routes) {
      return normalizeRouteValues(row.routes);
    }
    if (row.route) {
      return normalizeRouteValues(row.route);
    }
    return [];
  }
  function normalizeDistributorRow(row) {
    row.status = row.status || "active";
    row.name = row.name || "";
    row.driverNr = row.driverNr || "";
    row.routes = getDistributorRoutes(row);
    delete row.route;
    if (row.driverNr) {
      var i;
      for (i = 0; i < currentData.drivers.length; i += 1) {
        if ((currentData.drivers[i].driverNr || "") === row.driverNr) {
          row.driverName = currentData.drivers[i].name || "";
          break;
        }
      }
    }
    return row;
  }
  function parseNum(numStr) {
    var m = String(numStr).match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }
  function formatRange(nums) {
    if (!nums || nums.length === 0) return "";
    if (nums.length === 1) return nums[0];
    var s = nums.slice().sort(function(a, b) {
      var diff = parseNum(a) - parseNum(b);
      if (diff === 0) {
        return a.localeCompare(b);
      }
      return diff;
    });
    var groups = [];
    var currentGroup = [s[0]];
    for (var i = 1; i < s.length; i++) {
      var prev = s[i - 1];
      var curr = s[i];
      var gap = parseNum(curr) - parseNum(prev);
      if (gap > 2) {
        groups.push(currentGroup);
        currentGroup = [curr];
      } else {
        currentGroup.push(curr);
      }
    }
    groups.push(currentGroup);
    var formattedGroups = groups.map(function(g) {
      if (g.length === 1) return g[0];
      var first = g[0];
      var last = g[g.length - 1];
      if (first === last) return first;
      var num1 = parseNum(first);
      var num2 = parseNum(last);
      if (num1 === num2 && num1 > 0) {
        var suffix = last.substring(String(num2).length);
        return first + "-" + suffix;
      }
      return first + "-" + last;
    });
    return formattedGroups.join(", ");
  }
  function parseAddressForRange(addrStr) {
    var match = String(addrStr || "").trim().match(/^([^\d]+)\s+(\d.*)$/);
    if (match) {
      return { street: match[1].trim(), num: match[2].trim() };
    }
    return { street: String(addrStr || "").trim(), num: "" };
  }
  function recalculateRoutesFromCurrentData() {
    currentDataVersion++;
    var routeMap = {};
    var distributorByName = {};
    (currentData.distributors || []).forEach(function(dist) {
      if (dist.name) {
        distributorByName[dist.name] = dist;
      }
    });
    var driverByName = {};
    var driverByNr = {};
    (currentData.drivers || []).forEach(function(drv) {
      if (drv.name) driverByName[String(drv.name).trim()] = drv;
      if (drv.driverNr) driverByNr[String(drv.driverNr).trim()] = drv;
    });
    (currentData.routes || []).forEach(function(routeRow) {
      var routeId = normalizeRouteIdentifier(routeRow.routeId || "");
      if (!routeId) {
        return;
      }
      var distName = routeRow.distributor || "";
      var distObj = distributorByName[distName] || {};
      var driverName = distObj.driverName || routeRow.driver || routeRow.driverName || "";
      var driverNr = distObj.driverNr || routeRow.driverNr || "";
      if (!driverNr && driverName && driverByName[driverName]) {
        driverNr = driverByName[driverName].driverNr || "";
      }
      if (!driverName && driverNr && driverByNr[driverNr]) {
        driverName = driverByNr[driverNr].name || "";
      }
      routeMap[routeId] = {
        routeId,
        letterGroup: getRouteLetterGroup(routeId),
        distributor: distName,
        requiresDistributor: routeRow.requiresDistributor !== false,
        driverNr,
        driver: driverName,
        status: routeRow.status || "active",
        distributorCount: 0,
        distributorNames: "",
        includedAddresses: 0,
        extraPapers: toInt2(routeRow.extraPapers) || 0,
        paperCount: 0,
        postnrs: "",
        addressRanges: routeRow.addressRanges || "",
        notes: routeRow.notes || ""
      };
    });
    (currentData.distributors || []).forEach(function(dist) {
      var routes = getDistributorRoutes(dist);
      routes.forEach(function(routeId) {
        if (!routeId) {
          return;
        }
        if (!routeMap[routeId]) {
          routeMap[routeId] = {
            routeId,
            letterGroup: getRouteLetterGroup(routeId),
            distributor: dist.name || "",
            requiresDistributor: true,
            active: true,
            driverNr: dist.driverNr || "",
            driver: dist.driverName || "",
            status: "",
            distributorCount: 0,
            distributorNames: "",
            includedAddresses: 0,
            extraPapers: 0,
            paperCount: 0,
            postnrs: "",
            notes: ""
          };
        }
        if (!routeMap[routeId].driverNr) {
          routeMap[routeId].driverNr = dist.driverNr || "";
        }
        if (!routeMap[routeId].driver) {
          routeMap[routeId].driver = dist.driverName || "";
        }
      });
    });
    var routeStatusSets = {};
    var routeDistributorSets = {};
    var routePostnrSets = {};
    var routeAddresses = {};
    Object.keys(routeMap).forEach(function(routeId) {
      routeStatusSets[routeId] = {};
      routeDistributorSets[routeId] = {};
      routePostnrSets[routeId] = {};
      routeAddresses[routeId] = {};
    });
    (currentData.distributors || []).forEach(function(dist) {
      var routes = getDistributorRoutes(dist);
      routes.forEach(function(routeId) {
        if (!routeId || !routeMap[routeId]) {
          return;
        }
        routeMap[routeId].distributorCount += 1;
        if (dist.name) {
          routeDistributorSets[routeId][dist.name] = true;
        }
        var st = (dist.status || "").toLowerCase();
        if (st) {
          routeStatusSets[routeId][st] = true;
        }
      });
    });
    (currentData.addresses || []).forEach(function(addr) {
      var routeId = normalizeRouteIdentifier(addr.route || "");
      if (!routeId || !routeMap[routeId]) {
        return;
      }
      var parsed = parseAddressForRange(addr.address);
      if (!routeAddresses[routeId][parsed.street]) {
        routeAddresses[routeId][parsed.street] = {};
      }
      if (parsed.num) {
        routeAddresses[routeId][parsed.street][parsed.num] = true;
      }
      if (getAddressPaperCount(addr) > 0) {
        routeMap[routeId].includedAddresses += 1;
      }
      if (addr.postnr) {
        routePostnrSets[routeId][addr.postnr] = true;
      }
      if (addr.distributor) {
        routeDistributorSets[routeId][addr.distributor] = true;
      }
    });
    var generatedRanges = {};
    Object.keys(routeAddresses).forEach(function(routeId) {
      var streets = routeAddresses[routeId];
      var streetLines = [];
      Object.keys(streets).sort().forEach(function(street) {
        var nums = Object.keys(streets[street]);
        if (nums.length === 0) {
          streetLines.push(street);
          return;
        }
        var evens = [];
        var odds = [];
        nums.forEach(function(n) {
          if (parseNum(n) % 2 === 0) {
            evens.push(n);
          } else {
            odds.push(n);
          }
        });
        var parts = [];
        if (evens.length > 0) parts.push(formatRange(evens));
        if (odds.length > 0) parts.push(formatRange(odds));
        streetLines.push((street + " " + parts.join(" og ")).trim());
      });
      generatedRanges[routeId] = streetLines.join("\n");
    });
    currentData.routes = Object.keys(routeMap).sort().map(function(routeId) {
      var routeRow = routeMap[routeId];
      routeRow.status = routeRow.status || "";
      routeRow.active = routeRow.status !== "inactive";
      routeRow.distributorNames = Object.keys(routeDistributorSets[routeId] || {}).sort().join(", ");
      routeRow.postnrs = Object.keys(routePostnrSets[routeId] || {}).sort().join(", ");
      routeRow.paperCount = routeRow.status !== "inactive" ? Math.max(0, routeRow.includedAddresses + (routeRow.extraPapers || 0)) : 0;
      routeRow.notes = routeRow.notes || "";
      routeRow.addressRanges = generatedRanges[routeId] || "";
      return routeRow;
    });
  }
  var _cachedPaperCountsVersion = -1;
  function recalculatePaperCounts() {
    if (_cachedPaperCountsVersion === currentDataVersion) {
      return;
    }
    var addresses = currentData.addresses || [];
    var distributors = currentData.distributors || [];
    var drivers = currentData.drivers || [];
    var routes = currentData.routes || [];
    var driverByNr = {};
    var driverByName = {};
    drivers.forEach(function(driver) {
      var nr = String(driver.driverNr || "").trim();
      if (nr) {
        driverByNr[nr] = driver;
      }
      var name = String(driver.name || driver.driverName || "").trim();
      if (name) {
        driverByName[name] = driver;
      }
    });
    var distributorByName = {};
    distributors.forEach(function(dist) {
      var name = String(dist.name || "").trim();
      if (name) {
        distributorByName[name] = dist;
      }
      var driverNr = String(dist.driverNr || "").trim();
      if (driverNr && driverByNr[driverNr]) {
        dist.driverName = driverByNr[driverNr].name || "";
      }
    });
    var driverPaperByNr = {};
    var driverPaperByName = {};
    var distPaperCounts = {};
    var routePaperCounts = {};
    var routeActiveMap = {};
    routes.forEach(function(rt) {
      routeActiveMap[normalizeRouteIdentifier(rt.routeId)] = rt.status !== "inactive";
    });
    addresses.forEach(function(addr) {
      var routeId = normalizeRouteIdentifier(addr.route || "");
      if (routeActiveMap[routeId] === false) return;
      var paperForAddress = getAddressPaperCount(addr);
      if (paperForAddress <= 0) {
        return;
      }
      var distName = String(addr.distributor || "").trim();
      if (distName) {
        distPaperCounts[distName] = (distPaperCounts[distName] || 0) + paperForAddress;
      }
      if (routeId) {
        routePaperCounts[routeId] = (routePaperCounts[routeId] || 0) + paperForAddress;
      }
    });
    var driverRouteSetsByNr = {};
    var driverRouteSetsByName = {};
    var driverDistributorSetsByNr = {};
    var driverDistributorSetsByName = {};
    distributors.forEach(function(dist) {
      var routeIds = getDistributorRoutes(dist);
      var driverNr = String(dist.driverNr || "").trim();
      var driverName = String(dist.driverName || "").trim();
      var distName = String(dist.name || "").trim();
      if (driverNr) {
        if (!driverRouteSetsByNr[driverNr]) {
          driverRouteSetsByNr[driverNr] = {};
          driverDistributorSetsByNr[driverNr] = {};
        }
        routeIds.forEach(function(routeId) {
          if (routeId) {
            driverRouteSetsByNr[driverNr][routeId] = true;
          }
        });
        if (distName) {
          driverDistributorSetsByNr[driverNr][distName] = true;
        }
      }
      if (driverName) {
        if (!driverRouteSetsByName[driverName]) {
          driverRouteSetsByName[driverName] = {};
          driverDistributorSetsByName[driverName] = {};
        }
        routeIds.forEach(function(routeId) {
          if (routeId) {
            driverRouteSetsByName[driverName][routeId] = true;
          }
        });
        if (distName) {
          driverDistributorSetsByName[driverName][distName] = true;
        }
      }
    });
    routes.forEach(function(route) {
      var routeId = normalizeRouteIdentifier(route.routeId || "");
      if (!routeId) return;
      var distName = String(route.distributor || "").trim();
      if (!distName) {
        var driverName = String(route.driver || route.driverName || "").trim();
        var driverNr = String(route.driverNr || "").trim();
        if (!driverNr && driverName && driverByName[driverName]) {
          driverNr = String(driverByName[driverName].driverNr || "").trim();
        }
        if (!driverName && driverNr && driverByNr[driverNr]) {
          driverName = String(driverByNr[driverNr].name || "").trim();
        }
        if (driverNr) {
          if (!driverRouteSetsByNr[driverNr]) {
            driverRouteSetsByNr[driverNr] = {};
            driverDistributorSetsByNr[driverNr] = {};
          }
          driverRouteSetsByNr[driverNr][routeId] = true;
        }
        if (driverName) {
          if (!driverRouteSetsByName[driverName]) {
            driverRouteSetsByName[driverName] = {};
            driverDistributorSetsByName[driverName] = {};
          }
          driverRouteSetsByName[driverName][routeId] = true;
        }
      }
    });
    var finalRoutePaperCounts = {};
    routes.forEach(function(route) {
      var routeId = normalizeRouteIdentifier(route.routeId || "");
      var count = route.status !== "inactive" ? Math.max(0, (routePaperCounts[routeId] || 0) + toInt2(route.extraPapers)) : 0;
      finalRoutePaperCounts[routeId] = count;
      route.paperCount = String(count);
    });
    drivers.forEach(function(driver) {
      var nr = String(driver.driverNr || "").trim();
      var name = String(driver.name || "").trim();
      var routeSet = nr ? driverRouteSetsByNr[nr] || {} : driverRouteSetsByName[name] || {};
      if ((!routeSet || !Object.keys(routeSet).length) && name) {
        routeSet = driverRouteSetsByName[name] || {};
      }
      var paper = 0;
      Object.keys(routeSet).forEach(function(routeId) {
        paper += finalRoutePaperCounts[normalizeRouteIdentifier(routeId)] || 0;
      });
      paper += toInt2(driver.extraPapers);
      var distributorSet = nr ? driverDistributorSetsByNr[nr] || {} : driverDistributorSetsByName[name] || {};
      if ((!distributorSet || !Object.keys(distributorSet).length) && name) {
        distributorSet = driverDistributorSetsByName[name] || {};
      }
      var routesList = Object.keys(routeSet).sort();
      var distributorList = Object.keys(distributorSet).sort();
      driver.routeCount = String(routesList.length);
      driver.paperCount = String(paper);
      driver.routes = routesList.join(", ");
      driver.distributorName = distributorList.join(", ");
    });
    distributors.forEach(function(dist) {
      var routeIds = getDistributorRoutes(dist);
      var base = 0;
      routeIds.forEach(function(routeId) {
        base += finalRoutePaperCounts[normalizeRouteIdentifier(routeId)] || 0;
      });
      base += toInt2(dist.extraPapers);
      dist.paperCount = String(base);
    });
    _cachedPaperCountsVersion = currentDataVersion;
  }

  // web/src/api.js
  var IDB_DB_NAME = "menighetsbladet-local";
  var IDB_STORE_NAME = "kv";
  var IDB_JSON_CACHE_KEY = "source-json-cache";
  var IDB_RECORD_STORES2 = ["drivers", "distributors", "addresses", "routes"];
  var idbDbPromise = null;
  function getIndexedDb() {
    if (!window.indexedDB) {
      return Promise.resolve(null);
    }
    if (idbDbPromise) {
      return idbDbPromise;
    }
    idbDbPromise = new Promise(function(resolve) {
      try {
        var req = window.indexedDB.open(IDB_DB_NAME, 2);
        req.onupgradeneeded = function(event) {
          var db = event.target.result;
          if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
            db.createObjectStore(IDB_STORE_NAME);
          }
          IDB_RECORD_STORES2.forEach(function(storeName) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: "_id", autoIncrement: true });
            }
          });
        };
        req.onsuccess = function(event) {
          resolve(event.target.result);
        };
        req.onerror = function() {
          resolve(null);
        };
      } catch (e) {
        resolve(null);
      }
    });
    return idbDbPromise;
  }
  function idbGetValue(key) {
    return getIndexedDb().then(function(db) {
      if (!db) {
        return null;
      }
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(IDB_STORE_NAME, "readonly");
          var store = tx.objectStore(IDB_STORE_NAME);
          var req = store.get(key);
          req.onsuccess = function(event) {
            resolve(event.target.result || null);
          };
          req.onerror = function() {
            resolve(null);
          };
        } catch (e) {
          resolve(null);
        }
      });
    });
  }
  function idbSetValue(key, value) {
    return getIndexedDb().then(function(db) {
      if (!db) {
        return false;
      }
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(IDB_STORE_NAME, "readwrite");
          var store = tx.objectStore(IDB_STORE_NAME);
          var req = store.put(value, key);
          req.onsuccess = function() {
            resolve(true);
          };
          req.onerror = function() {
            resolve(false);
          };
        } catch (e) {
          resolve(false);
        }
      });
    });
  }
  function idbGetAll(storeName) {
    return getIndexedDb().then(function(db) {
      if (!db) {
        return [];
      }
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(storeName, "readonly");
          var store = tx.objectStore(storeName);
          var req = store.getAll();
          req.onsuccess = function(event) {
            resolve(event.target.result || []);
          };
          req.onerror = function() {
            resolve([]);
          };
        } catch (e) {
          resolve([]);
        }
      });
    });
  }
  function withoutStoreId(row) {
    var out = {};
    Object.keys(row || {}).forEach(function(key) {
      if (key !== "_id") {
        out[key] = row[key];
      }
    });
    return out;
  }
  function cleanRecordForStore(row) {
    var out = {};
    for (var key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        if (!key.startsWith("__")) {
          out[key] = row[key];
        }
      }
    }
    return out;
  }

  // web/src/modals.js
  init_dom();

  // web/src/map.js
  var mapInstance = null;
  var markerClusterGroup = null;
  var tempMarkersGroup = null;
  var lastAddresses = [];
  var lastRoutes = [];
  var currentFoundAddresses = [];
  var reassignAddresses = [];
  var pendingFetches = 0;
  var isCtrlDown = false;
  var addressMarkerCache = /* @__PURE__ */ new Map();
  function checkAndOpenModal() {
    if (!isCtrlDown && pendingFetches === 0 && currentFoundAddresses.length > 0) {
      openMapModalForAddresses();
    }
    if (!isCtrlDown && reassignAddresses.length > 0) {
      openReassignModal();
    }
  }
  function buildKirkenUrl(addressStr, postnr) {
    let streetname = String(addressStr || "").trim();
    let streetnumber = "";
    let code = postnr || "";
    const match = streetname.match(/^(.*?)\s+(\d+).*$/);
    if (match) {
      streetname = match[1];
      streetnumber = match[2];
    }
    return `https://www.kirken.no/nb-NO/sokeside-kirken.no?streetsearch=true&congregationsearch=true&parishname=&streetname=${encodeURIComponent(streetname)}&streetnumber=${encodeURIComponent(streetnumber)}&code=${encodeURIComponent(code)}`;
  }
  function getRouteColor(routeId) {
    let hash = 0;
    for (let i = 0; i < routeId.length; i++) {
      hash = routeId.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hue = Math.floor(Math.abs(hash * 137.508) % 360);
    let borderHue = Math.floor(Math.abs(hash * 231.124) % 360);
    return {
      fill: `hsl(${hue}, 70%, 40%)`,
      border: `hsl(${borderHue}, 100%, 40%)`
    };
  }
  function initMap(containerId) {
    if (mapInstance) return;
    mapInstance = L.map(containerId).setView([59.8624, 10.796], 14);
    const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const cartoUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    const osmLayer = L.tileLayer(osmUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });
    osmLayer.on("tileerror", function(e) {
      if (this._url !== cartoUrl) {
        console.warn("OSM tile load failed, falling back to CartoDB Voyager");
        this.setUrl(cartoUrl);
      }
    });
    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      maxZoom: 19
    });
    osmLayer.addTo(mapInstance);
    const baseMaps = {
      "Map": osmLayer,
      "Satellite": satLayer
    };
    L.control.layers(baseMaps).addTo(mapInstance);
    markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      disableClusteringAtZoom: 16
    });
    mapInstance.addLayer(markerClusterGroup);
    document.getElementById("map-status").textContent = t("mapStatusLoading");
    document.getElementById("map-status").style.color = "orange";
    tempMarkersGroup = L.layerGroup().addTo(mapInstance);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Control") isCtrlDown = true;
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Control") {
        isCtrlDown = false;
        checkAndOpenModal();
      }
    });
    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 500);
    if (lastAddresses.length > 0) {
      updateMapData(lastAddresses, lastRoutes);
    }
    mapInstance.on("click", function(e) {
      handleMapClick(e.latlng.lat, e.latlng.lng);
    });
    const routeFilterSelect = document.getElementById("map-route-filter");
    if (routeFilterSelect) {
      routeFilterSelect.addEventListener("change", () => {
        updateMapData(lastAddresses, lastRoutes);
      });
    }
    const mapContainer = document.getElementById("map-view");
    if (mapContainer) {
      mapContainer.addEventListener("mouseleave", () => {
        mapInstance.scrollWheelZoom.disable();
      });
    }
  }
  function invalidateMapSize() {
    if (mapInstance) {
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }
  }
  async function updateMapData(addresses, routes) {
    lastAddresses = addresses || [];
    lastRoutes = routes || [];
    const statusEl2 = document.getElementById("map-status");
    if (statusEl2) {
      statusEl2.textContent = t("mapStatusLoaded", { routes: lastRoutes.length, addresses: lastAddresses.length });
    }
    if (!mapInstance || !markerClusterGroup) return;
    const routeFilterSelect = document.getElementById("map-route-filter");
    const currentFilter = routeFilterSelect ? routeFilterSelect.value : "";
    if (routeFilterSelect) {
      const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, "no", { numeric: true }));
      routeFilterSelect.innerHTML = `<option value="">${t("mapRouteFilterAll")}</option>`;
      sortedRoutes.forEach((r) => {
        const opt = document.createElement("option");
        opt.value = r.routeId;
        opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : "");
        if (r.routeId === currentFilter) {
          opt.selected = true;
        }
        routeFilterSelect.appendChild(opt);
      });
    }
    const routeDistributorMap = {};
    lastRoutes.forEach((r) => {
      routeDistributorMap[r.routeId] = r.distributor || "";
    });
    const currentAddressSet = new Set(lastAddresses.map((a) => a.address));
    const cacheMarkersToRemove = [];
    for (const [address, marker] of addressMarkerCache.entries()) {
      if (!currentAddressSet.has(address)) {
        cacheMarkersToRemove.push(marker);
        addressMarkerCache.delete(address);
      }
    }
    if (cacheMarkersToRemove.length > 0) {
      markerClusterGroup.removeLayers(cacheMarkersToRemove);
    }
    const markersToAdd = [];
    const markersToRemove = [];
    lastAddresses.forEach((addr) => {
      if (!addr.route || !addr.lat || !addr.lon) return;
      const coords = { lat: addr.lat, lon: addr.lon };
      const colorObj = getRouteColor(addr.route);
      const distName = routeDistributorMap[addr.route] || t("mapUnassignedDistributor");
      let marker = addressMarkerCache.get(addr.address);
      const matchesFilter = !(currentFilter && addr.route !== currentFilter);
      if (!marker) {
        marker = L.circleMarker([coords.lat, coords.lon], {
          radius: 6,
          fillColor: colorObj.fill,
          color: colorObj.border,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
          addressStr: addr.address,
          routeId: addr.route
        }).bindTooltip(`<b>${escapeHtml(addr.address)}</b><br>${t("addrColRoute")}: ${escapeHtml(addr.route)}`, {
          direction: "top",
          offset: [0, -10]
        });
        marker.addressData = addr;
        marker.on("click", function(e) {
          const currentAddr = marker.addressData;
          if (isCtrlDown) {
            L.DomEvent.stopPropagation(e);
            const addressString = currentAddr.address;
            const exists = reassignAddresses.some((a) => a.address === addressString);
            if (!exists) {
              reassignAddresses.push(currentAddr);
              marker.setStyle({ color: "#ff0000", weight: 3 });
            }
          } else {
            const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, "no", { numeric: true }));
            const optionsHtml = sortedRoutes.map(
              (r) => `<option value="${r.routeId}" ${r.routeId === currentAddr.route ? "selected" : ""}>${r.routeId}${r.distributor ? ` (${r.distributor})` : ""}</option>`
            ).join("");
            const kirkenUrl = buildKirkenUrl(currentAddr.address, currentAddr.postnr);
            const checkKirkenLabel = t("mapCheckKirken", { address: currentAddr.address });
            const popupContent = `
            <strong>${escapeHtml(currentAddr.address)}</strong><br>
            ${t("addrColRoute")}: ${escapeHtml(currentAddr.route)}<br>
            ${t("addrColDistributor")}: ${escapeHtml(routeDistributorMap[currentAddr.route] || t("mapUnassignedDistributor"))}<br>
            ${t("addrColHouseholds")}: ${currentAddr.numberOfHouseholds || 1}
            <hr style="margin: 5px 0;">
            <select class="popup-route-select" style="width: 100%; margin-bottom: 5px;">${optionsHtml}</select>
            <div style="display: flex; gap: 5px; margin-bottom: 6px;">
              <button class="btn secondary" onclick="window.handlePopupReassign(this, '${escapeHtml(currentAddr.address).replace(/'/g, "\\'")}')" style="flex: 1;">${t("mapBtnReassign")}</button>
              <button class="btn danger" onclick="window.handlePopupDelete('${escapeHtml(currentAddr.address).replace(/'/g, "\\'")}')" style="flex: 1;">${t("mapBtnDelete")}</button>
            </div>
            <div>
              <a href="${kirkenUrl}" target="_blank" rel="noopener noreferrer" class="btn tertiary" style="display: block; text-align: center; text-decoration: none; font-size: 0.82rem; padding: 4px 6px;">${escapeHtml(checkKirkenLabel)}</a>
            </div>
          `;
            marker.bindPopup(popupContent, { minWidth: 350 }).openPopup();
          }
        });
        addressMarkerCache.set(addr.address, marker);
        if (matchesFilter) {
          markersToAdd.push(marker);
        }
      } else {
        marker.addressData = addr;
        marker.setLatLng([coords.lat, coords.lon]);
        marker.setStyle({
          fillColor: colorObj.fill,
          color: colorObj.border
        });
        marker.options.addressStr = addr.address;
        marker.options.routeId = addr.route;
        marker.setTooltipContent(`<b>${escapeHtml(addr.address)}</b><br>${t("addrColRoute")}: ${escapeHtml(addr.route)}`);
        const currentlyVisible = markerClusterGroup.hasLayer(marker);
        if (matchesFilter && !currentlyVisible) {
          markersToAdd.push(marker);
        } else if (!matchesFilter && currentlyVisible) {
          markersToRemove.push(marker);
        }
      }
    });
    if (markersToAdd.length > 0) markerClusterGroup.addLayers(markersToAdd);
    if (markersToRemove.length > 0) markerClusterGroup.removeLayers(markersToRemove);
    if (currentFilter && markerClusterGroup.getLayers().length > 0) {
      mapInstance.fitBounds(markerClusterGroup.getBounds(), { padding: [20, 20] });
    }
    window.handlePopupReassign = async (btnEl, addressString) => {
      const selectEl = btnEl.parentElement.previousElementSibling;
      const newRoute = selectEl.value;
      const targetAddr = lastAddresses.find((a) => a.address === addressString);
      if (targetAddr && newRoute !== targetAddr.route) {
        await executeReassign([targetAddr], newRoute);
        mapInstance.closePopup();
      }
    };
    window.handlePopupDelete = (addressString) => {
      const targetAddr = lastAddresses.find((a) => a.address === addressString);
      if (targetAddr) {
        openDeleteAddressMapModal(targetAddr);
        mapInstance.closePopup();
      }
    };
  }
  var miniMapInstance = null;
  function initMiniMap(lat, lon, routes) {
    const containerId = "add-address-minimap";
    if (!miniMapInstance) {
      miniMapInstance = L.map(containerId).setView([lat, lon], 16);
      const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const cartoUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      const miniLayer = L.tileLayer(osmUrl, {
        attribution: "&copy; OSM",
        maxZoom: 19
      });
      miniLayer.on("tileerror", function(e) {
        if (this._url !== cartoUrl) {
          this.setUrl(cartoUrl);
        }
      });
      miniLayer.addTo(miniMapInstance);
    } else {
      miniMapInstance.setView([lat, lon], 16);
    }
    miniMapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        miniMapInstance.removeLayer(layer);
      }
    });
    L.circleMarker([lat, lon], {
      radius: 8,
      fillColor: "#ff0000",
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    }).addTo(miniMapInstance).bindPopup(`<b>${t("mapNewAddress")}</b>`).openPopup();
    lastAddresses.forEach((addr) => {
      if (!addr.route) return;
      if (addr.lat && addr.lon) {
        const icon = L.divIcon({
          className: "route-label-icon",
          html: `<div style="background: white; border: 1px solid black; border-radius: 3px; padding: 1px 3px; font-size: 10px; font-weight: bold; white-space: nowrap;">${addr.route}</div>`,
          iconSize: null,
          iconAnchor: [10, 10]
        });
        L.marker([addr.lat, addr.lon], { icon }).addTo(miniMapInstance);
      }
    });
    setTimeout(() => miniMapInstance.invalidateSize(), 100);
  }
  function closeMapModal() {
    document.getElementById("add-address-map-modal").hidden = true;
    currentFoundAddresses = [];
    if (tempMarkersGroup) tempMarkersGroup.clearLayers();
  }
  function openMapModalForAddresses() {
    const modal = document.getElementById("add-address-map-modal");
    const msgEl = document.getElementById("add-address-map-message");
    const routeContainer = document.getElementById("add-address-route-container");
    const confirmBtn = document.getElementById("add-address-map-btn-confirm");
    const kirkenValContainer = document.getElementById("add-address-kirken-validation");
    modal.hidden = false;
    routeContainer.hidden = false;
    confirmBtn.hidden = false;
    if (kirkenValContainer) {
      if (currentFoundAddresses.length > 0) {
        kirkenValContainer.hidden = false;
        const linksContainer = document.getElementById("add-address-kirken-links-container");
        if (linksContainer) {
          linksContainer.innerHTML = "";
          const uniqueAddresses = /* @__PURE__ */ new Map();
          currentFoundAddresses.forEach((a) => {
            let streetname = a.address;
            let streetnumber = "";
            let code = a.postnr || "";
            const match = a.address.match(/^(.*?)\s+(\d+).*$/);
            if (match) {
              streetname = match[1];
              streetnumber = match[2];
            }
            const baseAddress = streetnumber ? `${streetname} ${streetnumber}` : streetname;
            const url = `https://www.kirken.no/nb-NO/sokeside-kirken.no?streetsearch=true&congregationsearch=true&parishname=&streetname=${encodeURIComponent(streetname)}&streetnumber=${encodeURIComponent(streetnumber)}&code=${encodeURIComponent(code)}`;
            uniqueAddresses.set(baseAddress, url);
          });
          uniqueAddresses.forEach((url, baseAddress) => {
            const btn = document.createElement("a");
            btn.href = url;
            btn.target = "_blank";
            btn.className = "btn secondary";
            btn.style.display = "inline-block";
            btn.style.marginBottom = "10px";
            btn.style.marginRight = "10px";
            btn.style.textDecoration = "none";
            btn.textContent = `\u{1F50D} ${t("mapCheckKirken", { address: baseAddress })}`;
            linksContainer.appendChild(btn);
          });
        }
      } else {
        kirkenValContainer.hidden = true;
      }
    }
    const count = currentFoundAddresses.length;
    const listHtml = currentFoundAddresses.map((a) => `<li>${escapeHtml(a.address)}</li>`).join("");
    msgEl.innerHTML = `${t("mapAddingCountAddresses", { count })}:<br><ul style="max-height: 150px; overflow-y: auto; text-align: left; background: #eee; padding: 10px 10px 10px 30px; border-radius: 4px; margin-top: 10px;">${listHtml}</ul>`;
    const routeSelect = document.getElementById("add-address-map-route");
    routeSelect.innerHTML = "";
    const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, "no", { numeric: true }));
    sortedRoutes.forEach((r) => {
      const opt = document.createElement("option");
      opt.value = r.routeId;
      opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : "");
      routeSelect.appendChild(opt);
    });
    if (currentFoundAddresses.length > 0 && lastAddresses.length > 0) {
      const target = currentFoundAddresses[0];
      let closestRoute = null;
      let minDiff = Infinity;
      for (const a of lastAddresses) {
        if (a.lat && a.lon && a.route) {
          const diff = Math.pow(a.lat - target.lat, 2) + Math.pow(a.lon - target.lon, 2);
          if (diff < minDiff) {
            minDiff = diff;
            closestRoute = a.route;
          }
        }
      }
      if (closestRoute) {
        routeSelect.value = closestRoute;
      }
    }
    const lastAddr = currentFoundAddresses[currentFoundAddresses.length - 1];
    initMiniMap(lastAddr.lat, lastAddr.lon);
  }
  async function handleMapClick(lat, lon) {
    pendingFetches++;
    try {
      const res = await fetch(`https://ws.geonorge.no/adresser/v1/punktsok?radius=20&lat=${lat}&lon=${lon}&treffPerSide=1`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (!data.adresser || data.adresser.length === 0) {
        return;
      }
      const firstAdr = data.adresser[0];
      const streetname = firstAdr.adressenavn;
      const queryStreetNumber = firstAdr.nummer;
      const sokRes = await fetch(`https://ws.geonorge.no/adresser/v1/sok?adressenavn=${encodeURIComponent(streetname)}&nummer=${queryStreetNumber}&kommunenummer=0301&treffPerSide=100`);
      if (!sokRes.ok) throw new Error("Network response was not ok");
      const sokData = await sokRes.json();
      const addressesToAdd = sokData.adresser && sokData.adresser.length > 0 ? sokData.adresser : [firstAdr];
      addressesToAdd.forEach((adr) => {
        const addressString = adr.adressetekstutenadressetilleggsnavn || adr.adressetekst;
        const postnr = adr.postnummer;
        let households = 1;
        if (adr.bruksenhetsnummer && adr.bruksenhetsnummer.length > 0) {
          households = adr.bruksenhetsnummer.length;
        }
        const newAddress = {
          address: addressString,
          postnr,
          numberOfHouseholds: households,
          numberOfExcludedHouseholds: 0,
          note: "",
          lat: adr.representasjonspunkt ? adr.representasjonspunkt.lat : lat,
          lon: adr.representasjonspunkt ? adr.representasjonspunkt.lon : lon
        };
        const existsInDb = lastAddresses.some((a) => a.address.toLowerCase() === addressString.toLowerCase());
        if (existsInDb) return;
        const existsInQueue = currentFoundAddresses.some((a) => a.address.toLowerCase() === addressString.toLowerCase());
        if (existsInQueue) return;
        currentFoundAddresses.push(newAddress);
        L.circleMarker([newAddress.lat, newAddress.lon], {
          radius: 8,
          fillColor: "#ff0000",
          color: "#000",
          weight: 2,
          opacity: 1,
          fillOpacity: 1
        }).addTo(tempMarkersGroup).bindPopup(addressString);
      });
    } catch (err) {
      console.error(err);
    } finally {
      pendingFetches--;
      checkAndOpenModal();
    }
  }
  function initMapAddressModal() {
    const closeBtn1 = document.getElementById("add-address-map-close");
    const closeBtn2 = document.getElementById("add-address-map-btn-close");
    const backdrop = document.querySelector('[data-add-map-close="1"]');
    const confirmBtn = document.getElementById("add-address-map-btn-confirm");
    if (closeBtn1) closeBtn1.addEventListener("click", closeMapModal);
    if (closeBtn2) closeBtn2.addEventListener("click", closeMapModal);
    if (backdrop) backdrop.addEventListener("click", closeMapModal);
    if (confirmBtn) confirmBtn.addEventListener("click", async () => {
      if (currentFoundAddresses.length === 0) return;
      const routeId = document.getElementById("add-address-map-route").value;
      if (!routeId) return;
      if (currentData && currentData.addresses) {
        currentFoundAddresses.forEach((addr) => {
          addr.route = routeId;
          const normalizedAddress = normalizeAddressRow(Object.assign({}, addr));
          currentData.addresses.push(normalizedAddress);
        });
        const addressesToSave = currentData.addresses.map((a) => {
          const copy = Object.assign({}, a);
          delete copy.distributor;
          delete copy.driverName;
          return copy;
        });
        await idbSetValue("addresses", addressesToSave);
        recalculateRoutesFromCurrentData();
        recalculatePaperCounts();
        initTableFilters();
        renderAllTables();
        setHasUserCommittedEdits(true);
        setShowSaveChanges(true);
        debugSaveChangesLog("map:add-address", { table: "addresses" });
        refreshUnsavedChangesFromData();
        scheduleAutosave();
      }
      closeMapModal();
    });
  }
  function closeReassignModal() {
    document.getElementById("reassign-route-modal").hidden = true;
    reassignAddresses = [];
    updateMapData(lastAddresses, lastRoutes);
  }
  function openReassignModal() {
    const modal = document.getElementById("reassign-route-modal");
    const msgEl = document.getElementById("reassign-route-message");
    modal.hidden = false;
    const count = reassignAddresses.length;
    const listHtml = reassignAddresses.map((a) => `<li>${escapeHtml(a.address)} (${escapeHtml(a.route)})</li>`).join("");
    msgEl.innerHTML = `${t("mapReassigningCountAddresses", { count })}:<br><ul style="max-height: 150px; overflow-y: auto; text-align: left; background: #eee; padding: 10px 10px 10px 30px; border-radius: 4px; margin-top: 10px;">${listHtml}</ul>`;
    const routeSelect = document.getElementById("reassign-route-select");
    routeSelect.innerHTML = "";
    const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, "no", { numeric: true }));
    sortedRoutes.forEach((r) => {
      const opt = document.createElement("option");
      opt.value = r.routeId;
      opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : "");
      routeSelect.appendChild(opt);
    });
  }
  async function executeReassign(addressObjects, newRoute) {
    if (currentData && currentData.addresses) {
      let changed = false;
      addressObjects.forEach((targetAddr) => {
        const dbAddr = currentData.addresses.find((a) => a.address === targetAddr.address);
        if (dbAddr && dbAddr.route !== newRoute) {
          dbAddr.route = newRoute;
          changed = true;
        }
      });
      if (changed) {
        const addressesToSave = currentData.addresses.map((a) => {
          const copy = Object.assign({}, a);
          delete copy.distributor;
          delete copy.driverName;
          return copy;
        });
        await idbSetValue("addresses", addressesToSave);
        recalculateRoutesFromCurrentData();
        recalculatePaperCounts();
        initTableFilters();
        renderAllTables();
        setHasUserCommittedEdits(true);
        setShowSaveChanges(true);
        debugSaveChangesLog("map:reassign-route", { table: "addresses" });
        refreshUnsavedChangesFromData();
        scheduleAutosave();
        updateMapData(currentData.addresses, currentData.routes);
      }
    }
  }
  function initReassignRouteModal() {
    const closeBtn1 = document.getElementById("reassign-route-close");
    const closeBtn2 = document.getElementById("reassign-route-btn-close");
    const backdrop = document.querySelector('[data-reassign-route-close="1"]');
    const confirmBtn = document.getElementById("reassign-route-btn-confirm");
    if (closeBtn1) closeBtn1.addEventListener("click", closeReassignModal);
    if (closeBtn2) closeBtn2.addEventListener("click", closeReassignModal);
    if (backdrop) backdrop.addEventListener("click", closeReassignModal);
    if (confirmBtn) confirmBtn.addEventListener("click", async () => {
      if (reassignAddresses.length === 0) return;
      const routeId = document.getElementById("reassign-route-select").value;
      if (!routeId) return;
      await executeReassign(reassignAddresses, routeId);
      closeReassignModal();
    });
  }
  var deleteAddressMapTarget = null;
  function initDeleteAddressMapModal() {
    const modal = document.getElementById("delete-address-map-modal");
    if (!modal) return;
    const closeBtn1 = document.getElementById("delete-address-map-close");
    const closeBtn2 = document.getElementById("delete-address-map-btn-cancel");
    const backdrop = document.querySelector('[data-delete-address-map-close="1"]');
    const confirmBtn = document.getElementById("delete-address-map-btn-confirm");
    const closeModal = () => {
      modal.hidden = true;
      deleteAddressMapTarget = null;
    };
    if (closeBtn1) closeBtn1.addEventListener("click", closeModal);
    if (closeBtn2) closeBtn2.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (confirmBtn) confirmBtn.addEventListener("click", async () => {
      if (!deleteAddressMapTarget) return;
      if (currentData && currentData.addresses) {
        const idx = currentData.addresses.findIndex((a) => a.address === deleteAddressMapTarget.address);
        if (idx !== -1) {
          currentData.addresses.splice(idx, 1);
          const addressesToSave = currentData.addresses.map((a) => {
            const copy = Object.assign({}, a);
            delete copy.distributor;
            delete copy.driverName;
            return copy;
          });
          await idbSetValue("addresses", addressesToSave);
          recalculateRoutesFromCurrentData();
          recalculatePaperCounts();
          initTableFilters();
          renderAllTables();
          setHasUserCommittedEdits(true);
          setShowSaveChanges(true);
          debugSaveChangesLog("map:delete-address", { table: "addresses" });
          refreshUnsavedChangesFromData();
          scheduleAutosave();
          updateMapData(currentData.addresses, currentData.routes);
        }
      }
      closeModal();
    });
  }
  function openDeleteAddressMapModal(addr) {
    deleteAddressMapTarget = addr;
    const nameEl = document.getElementById("delete-address-map-address-name");
    if (nameEl) nameEl.textContent = addr.address;
    const modal = document.getElementById("delete-address-map-modal");
    if (modal) modal.hidden = false;
  }
  function selectAddressOnMap(addressStr, routeId) {
    const routeFilterSelect = document.getElementById("map-route-filter");
    if (routeFilterSelect) {
      routeFilterSelect.value = "";
    }
    updateMapData(lastAddresses, lastRoutes).then(() => {
      let targetMarker = null;
      const bounds = L.latLngBounds();
      markerClusterGroup.getLayers().forEach((layer) => {
        if (layer.options.routeId === routeId) {
          bounds.extend(layer.getLatLng());
        }
        if (layer.options.addressStr === addressStr) {
          targetMarker = layer;
        }
      });
      if (bounds.isValid()) {
        mapInstance.fitBounds(bounds, { padding: [20, 20] });
      }
      if (targetMarker) {
        setTimeout(() => {
          targetMarker.fire("click");
        }, 300);
      }
    });
  }

  // web/src/tables.js
  function renderDriversTable(rows) {
    var filteredRows = applyFilter("drivers", rows);
    var sortedRows = applySort("drivers", filteredRows);
    var pageData = paginateRows("drivers", sortedRows);
    var html = pageData.rows.map(function(r) {
      return "<tr><td>" + escapeHtml(r.name) + "</td><td>" + escapeHtml(getStatusLabel(r.status)) + "</td><td>" + escapeHtml(r.driverNr) + "</td><td>" + escapeHtml(r.phone) + "</td><td>" + (r.email ? '<a href="mailto:' + escapeHtml(r.email) + '" class="cell-link mailto-link" title="' + escapeHtml(t("sendEmailTitle") || "Send e-post") + '">' + escapeHtml(r.email) + "</a>" : "") + "</td><td>" + escapeHtml(r.address) + "</td><td>" + escapeHtml(r.postnr) + "</td><td>" + buildNavCell(r.routeCount, "routes", "driverName", r.name) + "</td><td>" + buildNavCell(r.paperCount, "addresses", "driverName", r.name) + "</td><td>" + buildRowActionSelect("drivers", r) + "</td></tr>";
    }).join("");
    setBodyRows("drivers-body", html);
    var routeTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.routeCount);
    }, 0);
    var paperTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.paperCount);
    }, 0);
    setTotals("drivers", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsRoutes") + "=" + routeTotal + " | " + t("totalsPapers") + "=" + paperTotal);
    setPagerState("drivers", pageData.page, pageData.totalPages);
  }
  function renderDistributorsTable(rows) {
    var filteredRows = applyFilter("distributors", rows);
    var sortedRows = applySort("distributors", filteredRows);
    var pageData = paginateRows("distributors", sortedRows);
    var html = pageData.rows.map(function(r) {
      var isActive = (r.status || "active").toLowerCase() === "active";
      var hasDriver = !!(r.driverName && String(r.driverName).trim()) || !!(r.driverNr && String(r.driverNr).trim());
      var isWarning = isActive && !hasDriver;
      var driverCellContent = "";
      if (hasDriver) {
        driverCellContent = buildNavCell(r.driverName, "drivers", "driverName", r.driverName);
      } else if (isActive) {
        driverCellContent = '<span class="warning-badge" title="' + escapeHtml(t("warningDistributorNoDriver") || "Aktiv bladb\xE6rer mangler sj\xE5f\xF8r") + '">\u26A0\uFE0F ' + escapeHtml(t("warningNoDriver") || "Mangler sj\xE5f\xF8r") + "</span>";
      } else {
        driverCellContent = escapeHtml(r.driverName || "");
      }
      return "<tr" + (isWarning ? ' class="warning-row unassigned-row"' : "") + "><td>" + escapeHtml(r.name) + "</td><td>" + escapeHtml(getStatusLabel(r.status)) + "</td><td>" + getDistributorRoutes(r).map(function(routeId) {
        return buildNavCell(routeId, "routes", "route", routeId);
      }).join("<br>") + "</td><td>" + driverCellContent + "</td><td>" + escapeHtml(r.phone) + "</td><td>" + (r.email ? '<a href="mailto:' + escapeHtml(r.email) + '" class="cell-link mailto-link" title="' + escapeHtml(t("sendEmailTitle") || "Send e-post") + '">' + escapeHtml(r.email) + "</a>" : "") + "</td><td>" + escapeHtml(r.address) + "</td><td>" + escapeHtml(r.postnr) + "</td><td>" + escapeHtml(r.extraPapers || 0) + "</td><td>" + buildNavCell(r.paperCount, "addresses", "distributorName", r.name) + "</td><td>" + buildRowActionSelect("distributors", r) + "</td></tr>";
    }).join("");
    setBodyRows("distributors-body", html);
    var paperTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.paperCount);
    }, 0);
    var activeNoDriverCount = filteredRows.filter(function(r) {
      var isActive = (r.status || "active").toLowerCase() === "active";
      var hasDriver = !!(r.driverName && String(r.driverName).trim()) || !!(r.driverNr && String(r.driverNr).trim());
      return isActive && !hasDriver;
    }).length;
    var warningText = activeNoDriverCount > 0 ? " | \u26A0\uFE0F " + (t("warningDistributorsMissingDriver", { count: activeNoDriverCount }) || "Mangler sj\xE5f\xF8r: " + activeNoDriverCount) : "";
    setTotals("distributors", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsPapers") + "=" + paperTotal + warningText);
    setPagerState("distributors", pageData.page, pageData.totalPages);
  }
  function renderRoutesTable(rows) {
    var filteredRows = applyFilter("routes", rows);
    var sortedRows = applySort("routes", filteredRows);
    var pageData = paginateRows("routes", sortedRows);
    var html = pageData.rows.map(function(r) {
      var isUnassigned = !r.distributor || r.distributor.trim() === "" || r.distributor.toLowerCase() === "unassigned";
      var distArr = String(r.distributorNames || "").split(/,\s*/).filter(function(x) {
        return x;
      });
      var distCell = distArr.map(function(n) {
        return '<button type="button" class="cell-link" data-nav-tab="distributors" data-nav-key="distributorName" data-nav-val="' + escapeHtml(n) + '">' + escapeHtml(n) + "</button>";
      }).join("<br>");
      return "<tr" + (isUnassigned ? ' class="unassigned-row"' : "") + ">" + buildRowSelectCell("routes", r) + '<td><span class="route-id-cell-wrap">' + escapeHtml(r.routeId) + ' <button type="button" class="cell-link map-icon-btn" data-nav-tab="map" data-nav-key="route" data-nav-val="' + escapeHtml(r.routeId) + '" title="' + escapeHtml(t("showOnMapTitle") || "Show on map") + '">\u{1F5FA}\uFE0F</button></span></td><td>' + escapeHtml(getStatusLabel(r.status)) + "</td><td>" + distCell + "</td><td>" + buildNavCell(r.driver, "drivers", "driverName", r.driver) + "</td><td>" + buildNavCell(r.includedAddresses, "addresses", "route", r.routeId) + "</td><td>" + escapeHtml(r.extraPapers || 0) + "</td><td>" + escapeHtml(r.paperCount) + "</td><td>" + (r.addressRanges ? '<ul class="desc-list"><li>' + escapeHtml(r.addressRanges).split("\n").join("</li><li>") + "</li></ul>" : "") + "</td><td>" + escapeHtml(r.notes) + "</td><td>" + buildRowActionSelect("routes", r) + "</td></tr>";
    }).join("");
    setBodyRows("routes-body", html);
    updateBatchControls("routes");
    var distTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.distributorCount);
    }, 0);
    var addrTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.includedAddresses);
    }, 0);
    var paperTotal = filteredRows.reduce(function(acc, r) {
      return acc + toInt2(r.paperCount);
    }, 0);
    setTotals("routes", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsDistributors") + "=" + distTotal + " | " + t("totalsAddresses") + "=" + addrTotal + " | " + t("totalsPapers") + "=" + paperTotal);
    setPagerState("routes", pageData.page, pageData.totalPages);
  }
  function renderAddressesTable(rows) {
    var filteredRows = applyFilter("addresses", rows);
    var sortedRows = applySort("addresses", filteredRows);
    var pageData = paginateRows("addresses", sortedRows);
    var html = pageData.rows.map(function(r) {
      var isUnassigned = !r.route || r.route.trim() === "" || r.route.toLowerCase() === "unassigned";
      return "<tr" + (isUnassigned ? ' class="unassigned-row"' : "") + ">" + buildRowSelectCell("addresses", r) + '<td><span class="route-id-cell-wrap">' + escapeHtml(r.address) + ' <button type="button" class="cell-link map-icon-btn" data-nav-tab="map" data-nav-key="address" data-nav-val="' + escapeHtml(r.address) + '" data-nav-route="' + escapeHtml(r.route || "") + '" title="' + escapeHtml(t("showOnMapTitle") || "Show on map") + '">\u{1F5FA}\uFE0F</button></span></td><td>' + buildNavCell(r.route, "routes", "route", r.route) + "</td><td>" + buildNavCell(r.distributor, "distributors", "distributorName", r.distributor) + "</td><td>" + escapeHtml(r.numberOfHouseholds) + "</td><td>" + escapeHtml(r.numberOfExcludedHouseholds) + "</td><td>" + escapeHtml(r.postnr) + "</td><td>" + escapeHtml(r.note) + "</td><td>" + buildRowActionSelect("addresses", r) + "</td></tr>";
    }).join("");
    setBodyRows("addresses-body", html);
    updateBatchControls("addresses");
    var included = 0;
    var excluded = 0;
    var includedHouseholds = 0;
    var excludedHouseholds = 0;
    filteredRows.forEach(function(r) {
      var hh = Math.max(1, toInt2(r.numberOfHouseholds));
      var ex = Math.max(0, toInt2(r.numberOfExcludedHouseholds));
      ex = Math.min(ex, hh);
      includedHouseholds += hh - ex;
      excludedHouseholds += ex;
      if (ex > 0) {
        excluded += 1;
      } else {
        included += 1;
      }
    });
    setTotals("addresses", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsIncluded") + "=" + included + " | " + t("totalsExcluded") + "=" + excluded + " | " + t("rowHouseholds") + "=" + includedHouseholds + "/" + excludedHouseholds);
    setPagerState("addresses", pageData.page, pageData.totalPages);
  }
  function refreshAllFilterComponents() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      refreshFilterComponents(tableName);
    });
  }
  function renderAllTables() {
    refreshAllFilterComponents();
    requestAnimationFrame(() => {
      recalculateAndRenderDashboard();
      requestAnimationFrame(() => {
        renderDriversTable(currentData.drivers);
        updateSortHeaderIndicators("drivers");
        requestAnimationFrame(() => {
          renderDistributorsTable(currentData.distributors);
          updateSortHeaderIndicators("distributors");
          requestAnimationFrame(() => {
            renderAddressesTable(currentData.addresses);
            updateSortHeaderIndicators("addresses");
            requestAnimationFrame(() => {
              renderRoutesTable(currentData.routes);
              updateSortHeaderIndicators("routes");
              requestAnimationFrame(() => {
                updateMapData(currentData.addresses, currentData.routes);
              });
            });
          });
        });
      });
    });
  }
  function buildRowActionSelect(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return "";
    }
    var html = '<select class="row-action-select" data-index="' + rowIndex + '" aria-label="' + escapeHtml(t("actionsCol")) + '"><option value="" selected disabled hidden>' + escapeHtml(t("actionsCol")) + '</option><option value="edit">' + escapeHtml(t("editAction")) + '</option><option value="delete">' + escapeHtml(t("deleteAction")) + "</option>";
    if (tableName === "drivers") {
      html += '<option value="export-distributors-csv">' + escapeHtml(t("exportDriverDistributorsCsvAction")) + '</option><option value="export-distributors-xlsx">' + escapeHtml(t("exportDriverDistributorsXlsxAction")) + '</option><option value="print-run-sheet">' + escapeHtml(t("printRunSheetAction") || "Preview & Print Kj\xF8reliste") + "</option>";
    }
    if (tableName === "routes") {
      html += '<option value="view-route-report">' + escapeHtml(t("viewRouteReportAction") || "View route report") + "</option>";
    }
    html += "</select>";
    return html;
  }
  function buildRowSelectCell(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return '<td class="row-select-cell"></td>';
    }
    var checked = !!batchSelectionState[tableName][rowIndex];
    return '<td class="row-select-cell"><input type="checkbox" class="row-select-checkbox" data-table="' + escapeHtml(tableName) + '" data-index="' + rowIndex + '" aria-label="' + escapeHtml(t("rowSelectLabel")) + '" ' + (checked ? "checked" : "") + " /></td>";
  }
  function buildNavCell(text, targetTab, criterionKey, criterionVal) {
    var display = escapeHtml(String(text));
    if (!display || !criterionVal) {
      return display;
    }
    return '<button type="button" class="cell-link" data-nav-tab="' + escapeHtml(targetTab) + '" data-nav-key="' + escapeHtml(criterionKey) + '" data-nav-val="' + escapeHtml(String(criterionVal)) + '">' + display + "</button>";
  }
  function updateSortHeaderIndicators(tableName) {
    var cfg = sortConfig[tableName];
    if (!cfg) {
      return;
    }
    var headers = document.querySelectorAll("#" + cfg.panelId + " thead th");
    var state = sortState[tableName];
    headers.forEach(function(th, idx) {
      var key = cfg.keys[idx];
      if (!key) {
        th.classList.remove("sortable");
        th.removeAttribute("aria-sort");
        return;
      }
      th.classList.add("sortable");
      if (state.key === key) {
        th.setAttribute("aria-sort", state.dir === 1 ? "ascending" : "descending");
      } else {
        th.setAttribute("aria-sort", "none");
      }
    });
  }
  var suppressSortClickUntil = 0;
  function initSortableColumns() {
    Object.keys(sortConfig).forEach(function(tableName) {
      var cfg = sortConfig[tableName];
      var headers = document.querySelectorAll("#" + cfg.panelId + " thead th");
      headers.forEach(function(th, idx) {
        var key = cfg.keys[idx];
        if (!key) {
          return;
        }
        th.classList.add("sortable");
        th.setAttribute("aria-sort", "none");
        th.addEventListener("click", function() {
          if (Date.now() < suppressSortClickUntil) {
            return;
          }
          var state = sortState[tableName];
          if (state.key === key) {
            state.dir = state.dir * -1;
          } else {
            state.key = key;
            state.dir = 1;
          }
          renderAllTables();
          updateSortHeaderIndicators(tableName);
        });
      });
    });
  }
  function initResizableColumns() {
    function getTableStorageKey(table) {
      var panel = table.closest(".tab-panel");
      var panelId = panel ? panel.id : "root";
      var label = table.getAttribute("aria-label") || table.className || "table";
      return panelId + "|" + label;
    }
    function getHeaderStorageKey(th, idx) {
      return th.id || "col-" + idx;
    }
    function readAllWidths() {
      try {
        var raw = localStorage.getItem(COL_WIDTHS_KEY);
        if (!raw) {
          return {};
        }
        var parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch (e) {
        return {};
      }
    }
    function writeAllWidths(widths) {
      try {
        localStorage.setItem(COL_WIDTHS_KEY, JSON.stringify(widths));
      } catch (e) {
      }
    }
    function restoreTableWidths(table, headers) {
      var allWidths = readAllWidths();
      var tableKey = getTableStorageKey(table);
      var tableWidths = allWidths[tableKey];
      if (!tableWidths) {
        return;
      }
      headers.forEach(function(th, idx) {
        var headerKey = getHeaderStorageKey(th, idx);
        var value = tableWidths[headerKey];
        if (!value) {
          return;
        }
        var n = parseInt(String(value), 10);
        if (Number.isFinite(n) && n >= 70) {
          th.style.width = n + "px";
        }
      });
    }
    function saveTableWidths(table, headers) {
      var allWidths = readAllWidths();
      var tableKey = getTableStorageKey(table);
      if (!allWidths[tableKey]) {
        allWidths[tableKey] = {};
      }
      headers.forEach(function(th, idx) {
        var headerKey = getHeaderStorageKey(th, idx);
        var width = parseInt(th.style.width, 10);
        if (Number.isFinite(width) && width >= 70) {
          allWidths[tableKey][headerKey] = width;
        }
      });
      writeAllWidths(allWidths);
    }
    var tables = document.querySelectorAll(".dash-table, .data-table");
    tables.forEach(function(table) {
      if (table.dataset.resizeReady === "1") {
        return;
      }
      table.classList.add("resizable");
      var headers = table.querySelectorAll("thead th");
      restoreTableWidths(table, headers);
      headers.forEach(function(th) {
        if (th.querySelector(".col-resize-handle")) {
          return;
        }
        var handle = document.createElement("span");
        handle.className = "col-resize-handle";
        handle.setAttribute("aria-hidden", "true");
        th.appendChild(handle);
        handle.addEventListener("mousedown", function(event) {
          event.preventDefault();
          event.stopPropagation();
          suppressSortClickUntil = Date.now() + 250;
          var startX = event.clientX;
          var startWidth = th.getBoundingClientRect().width;
          function onMove(moveEvent) {
            var delta = moveEvent.clientX - startX;
            var nextWidth = Math.max(70, Math.round(startWidth + delta));
            th.style.width = nextWidth + "px";
          }
          function onUp() {
            suppressSortClickUntil = Date.now() + 250;
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            saveTableWidths(table, headers);
          }
          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        });
      });
      table.dataset.resizeReady = "1";
    });
  }
  function applySort(tableName, rows) {
    var state = sortState[tableName];
    if (!state || !state.key) {
      return rows.slice();
    }
    var dir = state.dir;
    var key = state.key;
    var mapped = rows.map(function(row) {
      return { row, val: asComparable(row[key]) };
    });
    mapped.sort(function(a, b) {
      var av = a.val;
      var bv = b.val;
      if (av.type === "num" && bv.type === "num") {
        return (av.value - bv.value) * dir;
      }
      if (av.type === "str" && bv.type === "str") {
        return av.value.localeCompare(bv.value, void 0, { numeric: true, sensitivity: "base" }) * dir;
      }
      if (av.value < bv.value) {
        return -1 * dir;
      }
      if (av.value > bv.value) {
        return 1 * dir;
      }
      return 0;
    });
    return mapped.map(function(el) {
      return el.row;
    });
  }
  function applyFilter(tableName, rows) {
    var criteria = filterState[tableName] || emptyFilterCriteria();
    var map = filterFieldMap[tableName] || {};
    var normalizedCriteria = {
      route: normalizeFilterValues(criteria.route),
      status: normalizeFilterValues(criteria.status),
      distributorName: normalizeFilterValues(criteria.distributorName),
      driverName: normalizeFilterValues(criteria.driverName),
      postnr: normalizeFilterValues(criteria.postnr),
      active: normalizeFilterValues(criteria.active),
      addressText: criteria.address && criteria.address.length ? criteria.address[0] : "",
      onlyExcludedAddresses: !!criteria.onlyExcludedAddresses,
      onlyWithExcludedHouseholds: !!criteria.onlyWithExcludedHouseholds
    };
    return rows.filter(function(row) {
      if (tableName === "addresses") {
        var h = Number(row.numberOfHouseholds != null ? row.numberOfHouseholds : 1);
        if (Number.isNaN(h)) h = 1;
        var exh = Number(row.numberOfExcludedHouseholds != null ? row.numberOfExcludedHouseholds : 0);
        if (Number.isNaN(exh)) exh = 0;
        var inc = Math.max(0, h - exh);
        if (normalizedCriteria.onlyExcludedAddresses) {
          if (row.status !== "excluded" && inc > 0) {
            return false;
          }
        }
        if (normalizedCriteria.onlyWithExcludedHouseholds) {
          if (exh <= 0) {
            return false;
          }
        }
      }
      return rowMatchesAllCriteria(row, map, normalizedCriteria);
    });
  }
  function paginateRows(tableName, rows) {
    var state = paginationState[tableName];
    if (!state) {
      return { rows: rows.slice(), totalRows: rows.length, page: 1, totalPages: 1 };
    }
    var totalRows = rows.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    state.page = Math.max(1, Math.min(state.page, totalPages));
    var start = (state.page - 1) * state.pageSize;
    return {
      rows: rows.slice(start, start + state.pageSize),
      totalRows,
      page: state.page,
      totalPages
    };
  }
  function setPagerState(tableName, page, totalPages) {
    setText("page-info-" + tableName, t("pagerPage", { current: page, total: totalPages }));
    var prevBtn = document.getElementById("page-prev-" + tableName);
    var nextBtn = document.getElementById("page-next-" + tableName);
    if (prevBtn) {
      prevBtn.disabled = page <= 1;
    }
    if (nextBtn) {
      nextBtn.disabled = page >= totalPages;
    }
  }
  function setTotals(tableName, text) {
    setText(tableName + "-totals", text);
  }
  function getFilteredSortedRows(tableName) {
    var rows = currentData[tableName] || [];
    return applySort(tableName, applyFilter(tableName, rows));
  }
  function setRowSelected(tableName, rowIndex, selected) {
    if (!Number.isFinite(rowIndex) || rowIndex < 0) {
      return;
    }
    if (selected) {
      batchSelectionState[tableName][rowIndex] = true;
    } else {
      delete batchSelectionState[tableName][rowIndex];
    }
    updateBatchControls(tableName);
  }
  function getSelectedIndexes(tableName) {
    var map = batchSelectionState[tableName] || {};
    return Object.keys(map).map(function(key) {
      return parseInt(key, 10);
    }).filter(function(idx) {
      return Number.isFinite(idx) && idx >= 0 && idx < (currentData[tableName] || []).length;
    }).sort(function(a, b) {
      return a - b;
    });
  }
  function clearBatchSelection(tableName) {
    batchSelectionState[tableName] = {};
  }
  function clearAllBatchSelections() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      clearBatchSelection(tableName);
      updateBatchControls(tableName);
    });
  }
  function updateBatchControls(tableName) {
    var selectedCount = getSelectedIndexes(tableName).length;
    var btn = document.getElementById("batch-delete-" + tableName);
    var statusBtn = document.getElementById("batch-status-" + tableName);
    var routeBtn = document.getElementById("batch-route-" + tableName);
    var chip = document.getElementById("selected-chip-" + tableName);
    var selectAll = document.getElementById("select-all-" + tableName);
    var body = document.getElementById(tableName + "-body");
    if (btn) {
      btn.disabled = selectedCount === 0;
      btn.textContent = selectedCount > 0 ? t("batchDeleteWithCount", { count: selectedCount }) : t("batchDeleteAction");
    }
    if (statusBtn) {
      statusBtn.disabled = selectedCount === 0;
      statusBtn.textContent = selectedCount > 0 ? t("batchStatusWithCount", { count: selectedCount }) : t("batchStatusAction");
    }
    if (routeBtn) {
      routeBtn.disabled = selectedCount === 0;
      routeBtn.textContent = selectedCount > 0 ? t("batchRouteWithCount", { count: selectedCount }) : t("batchRouteAction");
    }
    if (tableName === "routes") {
      var mergeBtn = document.getElementById("merge-routes-btn");
      if (mergeBtn) {
        mergeBtn.disabled = selectedCount < 2;
        mergeBtn.textContent = selectedCount >= 2 ? t("btnMergeRoutes") + " (" + selectedCount + ")" : t("btnMergeRoutes");
      }
    }
    if (chip) {
      chip.textContent = t("selectedChip", { count: selectedCount });
      chip.classList.toggle("is-empty", selectedCount === 0);
      chip.classList.toggle("is-active", selectedCount > 0);
    }
    if (selectAll && body) {
      var visibleChecks = Array.prototype.slice.call(body.querySelectorAll(".row-select-checkbox"));
      var checkedVisible = visibleChecks.filter(function(cb) {
        return cb.checked;
      }).length;
      var allChecked = visibleChecks.length > 0 && checkedVisible === visibleChecks.length;
      var noneChecked = checkedVisible === 0;
      selectAll.checked = allChecked;
      selectAll.indeterminate = !allChecked && !noneChecked;
    }
  }
  function initTableFilters() {
    var fields = ["route", "status", "distributorName", "driverName", "postnr"];
    var keyMap = {
      route: "route",
      status: "status",
      distributorName: "distributorName",
      driverName: "driverName",
      postnr: "postnr"
    };
    function normalized(value) {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function optionsForFilter(tableName, criterionKey) {
      var out = [];
      var seen = {};
      function addOption(raw) {
        if (raw == null) return;
        String(raw).split(",").forEach(function(part) {
          var value = String(part || "").trim();
          if (!value) return;
          var low = value.toLowerCase();
          if (seen[low]) return;
          seen[low] = true;
          out.push(value);
        });
      }
      if (criterionKey === "route") {
        (currentData.routes || []).forEach(function(r) {
          if (r && r.routeId) addOption(r.routeId);
        });
      } else if (criterionKey === "distributorName") {
        (currentData.distributors || []).forEach(function(d) {
          if (d && d.name) addOption(d.name);
          if (d && d.distributorName) addOption(d.distributorName);
        });
        (currentData.routes || []).forEach(function(r) {
          if (r && r.distributor) addOption(r.distributor);
        });
      } else if (criterionKey === "driverName") {
        (currentData.drivers || []).forEach(function(drv) {
          if (drv && drv.name) addOption(drv.name);
          if (drv && drv.driverName) addOption(drv.driverName);
        });
        (currentData.distributors || []).forEach(function(d) {
          if (d && d.driverName) addOption(d.driverName);
        });
        (currentData.routes || []).forEach(function(r) {
          if (r && r.driver) addOption(r.driver);
          if (r && r.driverName) addOption(r.driverName);
        });
      }
      var rows = currentData[tableName] || [];
      var fieldsForCriterion = (filterFieldMap[tableName] || {})[criterionKey] || [];
      rows.forEach(function(row) {
        fieldsForCriterion.forEach(function(fieldName) {
          addOption(row[fieldName]);
        });
      });
      return out.sort(function(a, b) {
        return String(a).localeCompare(String(b), void 0, { numeric: true, sensitivity: "base" });
      });
    }
    function addSelection(tableName, criterionKey, value) {
      var current = (filterState[tableName][criterionKey] || []).slice();
      current.push(value);
      setFilterSelection(tableName, criterionKey, current);
      paginationState[tableName].page = 1;
      refreshFilterComponents(tableName);
      renderAllTables();
    }
    function removeSelection(tableName, criterionKey, value) {
      var low = normalized(value);
      var current = (filterState[tableName][criterionKey] || []).filter(function(v) {
        return normalized(v) !== low;
      });
      setFilterSelection(tableName, criterionKey, current);
      paginationState[tableName].page = 1;
      refreshFilterComponents(tableName);
      renderAllTables();
    }
    function clearTableFilters(tableName) {
      filterState[tableName] = emptyFilterCriteria();
      fields.forEach(function(field) {
        var input = document.getElementById("filter-" + tableName + "-" + field);
        if (input) {
          input.value = "";
        }
      });
      if (tableName === "addresses") {
        var addressInput2 = document.getElementById("filter-addresses-address");
        if (addressInput2) {
          addressInput2.value = "";
        }
        var chkOnlyExcluded2 = document.getElementById("filter-addresses-only-excluded");
        if (chkOnlyExcluded2) {
          chkOnlyExcluded2.checked = false;
        }
        var chkWithExcluded2 = document.getElementById("filter-addresses-with-excluded");
        if (chkWithExcluded2) {
          chkWithExcluded2.checked = false;
        }
      }
      refreshFilterComponents(tableName);
      renderAllTables();
    }
    function buildMultiSelect(tableName, field, inputEl) {
      if (!inputEl || inputEl.dataset.multiReady === "1") {
        return;
      }
      var criterionKey = keyMap[field];
      var host = document.createElement("div");
      host.className = "multi-filter";
      inputEl.parentNode.insertBefore(host, inputEl);
      var controlEl = document.createElement("div");
      controlEl.className = "multi-filter-control";
      host.appendChild(controlEl);
      var chipsEl = document.createElement("div");
      chipsEl.className = "multi-filter-chips";
      controlEl.appendChild(chipsEl);
      controlEl.appendChild(inputEl);
      var clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "clear-filter-btn";
      clearBtn.textContent = "\xD7";
      clearBtn.setAttribute("aria-label", t("clearFilter"));
      clearBtn.title = t("clearFilter");
      clearBtn.addEventListener("click", function() {
        clearFilterSelection(tableName, criterionKey);
        inputEl.value = "";
        paginationState[tableName].page = 1;
        refreshFilterComponents(tableName);
        renderAllTables();
        inputEl.focus();
      });
      controlEl.appendChild(clearBtn);
      var menuEl = document.createElement("div");
      menuEl.className = "multi-filter-menu";
      host.appendChild(menuEl);
      var isOpen = false;
      function renderComponent() {
        var selected = filterState[tableName][criterionKey] || [];
        chipsEl.innerHTML = "";
        selected.forEach(function(value) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "multi-filter-chip";
          chip.textContent = value + " \xD7";
          chip.addEventListener("click", function() {
            removeSelection(tableName, criterionKey, value);
          });
          chipsEl.appendChild(chip);
        });
        var search = normalized(inputEl.value);
        var options = optionsForFilter(tableName, criterionKey).filter(function(value) {
          var low = normalized(value);
          if (!low) {
            return false;
          }
          if ((filterState[tableName][criterionKey] || []).some(function(v) {
            return normalized(v) === low;
          })) {
            return false;
          }
          return !search || low.indexOf(search) !== -1;
        }).slice(0, 500);
        menuEl.innerHTML = "";
        if (isOpen && options.length) {
          options.forEach(function(value) {
            var optionBtn = document.createElement("button");
            optionBtn.type = "button";
            optionBtn.className = "multi-filter-option";
            optionBtn.textContent = value;
            optionBtn.addEventListener("mousedown", function(event) {
              event.preventDefault();
            });
            optionBtn.addEventListener("click", function() {
              addSelection(tableName, criterionKey, value);
              inputEl.value = "";
              isOpen = true;
              renderComponent();
              inputEl.focus();
            });
            menuEl.appendChild(optionBtn);
          });
          menuEl.removeAttribute("hidden");
        } else {
          menuEl.setAttribute("hidden", "");
        }
        try {
          var show = true;
          if (String(inputEl.value || "").trim()) {
            show = false;
          }
          if (selected && selected.length) {
            show = false;
          }
          var placeholderKeyMap = {
            route: "filterRoutePlaceholder",
            status: "filterStatusPlaceholder",
            distributorName: "filterDistributorNamePlaceholder",
            driverName: "filterDriverNamePlaceholder",
            postnr: "filterPostnrPlaceholder"
          };
          var phKey = placeholderKeyMap[field] || "filterLabel";
          inputEl.placeholder = show ? t(phKey) : "";
        } catch (e) {
        }
      }
      inputEl.addEventListener("change", function() {
        var val = String(inputEl.value || "").trim();
        if (val) {
          addSelection(tableName, criterionKey, val);
          inputEl.value = "";
          renderComponent();
        }
      });
      inputEl.addEventListener("focus", function() {
        isOpen = true;
        renderComponent();
      });
      inputEl.addEventListener("blur", function() {
        setTimeout(function() {
          isOpen = false;
          renderComponent();
        }, 120);
      });
      inputEl.addEventListener("input", debounce(function() {
        isOpen = true;
        renderComponent();
      }, 150));
      inputEl.addEventListener("keydown", function(event) {
        if ((event.key === "Enter" || event.key === ",") && normalized(inputEl.value)) {
          event.preventDefault();
          addSelection(tableName, criterionKey, inputEl.value);
          inputEl.value = "";
          isOpen = true;
          renderComponent();
          return;
        }
        if (event.key === "Backspace" && !normalized(inputEl.value)) {
          var selected = filterState[tableName][criterionKey] || [];
          if (selected.length) {
            removeSelection(tableName, criterionKey, selected[selected.length - 1]);
          }
        }
      });
      inputEl.dataset.multiReady = "1";
      filterComponents[tableName][field] = {
        render: renderComponent,
        input: inputEl
      };
      renderComponent();
    }
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      fields.forEach(function(field) {
        var input = document.getElementById("filter-" + tableName + "-" + field);
        if (!input) {
          return;
        }
        buildMultiSelect(tableName, field, input);
      });
      var resetBtn = document.getElementById("reset-filters-" + tableName);
      if (resetBtn) {
        resetBtn.addEventListener("click", function() {
          clearTableFilters(tableName);
          paginationState[tableName].page = 1;
        });
      }
    });
    var addressInput = document.getElementById("filter-addresses-address");
    if (addressInput) {
      addressInput.addEventListener("input", debounce(function() {
        var searchText = String(addressInput.value || "").trim();
        filterState.addresses.address = searchText ? [searchText] : [];
        paginationState.addresses.page = 1;
        renderAllTables();
      }, 250));
    }
    var chkOnlyExcluded = document.getElementById("filter-addresses-only-excluded");
    if (chkOnlyExcluded) {
      chkOnlyExcluded.addEventListener("change", function() {
        filterState.addresses.onlyExcludedAddresses = chkOnlyExcluded.checked;
        paginationState.addresses.page = 1;
        renderAllTables();
      });
    }
    var chkWithExcluded = document.getElementById("filter-addresses-with-excluded");
    if (chkWithExcluded) {
      chkWithExcluded.addEventListener("change", function() {
        filterState.addresses.onlyWithExcludedHouseholds = chkWithExcluded.checked;
        paginationState.addresses.page = 1;
        renderAllTables();
      });
    }
  }
  function initPaginationControls() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      var sizeEl = document.getElementById("page-size-" + tableName);
      var prevEl = document.getElementById("page-prev-" + tableName);
      var nextEl = document.getElementById("page-next-" + tableName);
      if (sizeEl) {
        sizeEl.value = String(paginationState[tableName].pageSize);
        sizeEl.addEventListener("change", function() {
          var v = parseInt(sizeEl.value, 10);
          paginationState[tableName].pageSize = Number.isFinite(v) ? v : 25;
          paginationState[tableName].page = 1;
          renderAllTables();
        });
      }
      if (prevEl) {
        prevEl.addEventListener("click", function() {
          paginationState[tableName].page = Math.max(1, paginationState[tableName].page - 1);
          renderAllTables();
        });
      }
      if (nextEl) {
        nextEl.addEventListener("click", function() {
          paginationState[tableName].page += 1;
          renderAllTables();
        });
      }
    });
  }
  function initCellLinks() {
    document.addEventListener("click", function(event) {
      var target = event.target;
      if (!target || !target.classList || !target.classList.contains("cell-link")) {
        return;
      }
      var targetTab = target.getAttribute("data-nav-tab");
      var criterionKey = target.getAttribute("data-nav-key");
      var criterionVal = target.getAttribute("data-nav-val");
      if (targetTab === "map") {
        setActiveTab("map");
        initMap("map-container");
        invalidateMapSize();
        var routeFilter = document.getElementById("map-route-filter");
        if (criterionKey === "address" && target.hasAttribute("data-nav-route")) {
          selectAddressOnMap(criterionVal, target.getAttribute("data-nav-route"));
        } else if (routeFilter && criterionKey === "route") {
          routeFilter.value = criterionVal;
          routeFilter.dispatchEvent(new Event("change"));
        }
      } else if (targetTab) {
        navigateToTable(targetTab, criterionKey, criterionVal);
      }
    });
  }
  function initRowActionMenus() {
    ["drivers", "distributors", "routes", "addresses"].forEach(function(tableName) {
      var body = document.getElementById(tableName + "-body");
      if (!body) {
        return;
      }
      body.addEventListener("change", function(event) {
        var target = event.target;
        if (!target || !target.classList || !target.classList.contains("row-action-select")) {
          return;
        }
        var action = target.value;
        var rowIndex = parseInt(target.getAttribute("data-index"), 10);
        target.value = "";
        if (!Number.isFinite(rowIndex) || !action) {
          return;
        }
        if (action === "edit") {
          openEditModal(tableName, rowIndex);
          return;
        }
        if (action === "delete") {
          openDeleteModal(tableName, rowIndex);
        }
        if (tableName === "drivers" && action === "export-distributors-csv") {
          var drv = currentData.drivers[rowIndex];
          if (drv) exportDriverDistributorsCsv(drv);
        }
        if (tableName === "drivers" && action === "export-distributors-xlsx") {
          var drv2 = currentData.drivers[rowIndex];
          if (drv2) exportDriverDistributorsXlsx(drv2);
        }
        if (tableName === "drivers" && action === "print-run-sheet") {
          var drv3 = currentData.drivers[rowIndex];
          if (drv3) openReportModal([drv3]);
        }
        if (tableName === "routes" && action === "view-route-report") {
          var rt = currentData.routes[rowIndex];
          if (rt) openRouteReportModal([rt]);
        }
      });
      body.addEventListener("change", function(event) {
        var target = event.target;
        if (!target || !target.classList || !target.classList.contains("row-select-checkbox")) {
          return;
        }
        var idx = parseInt(target.getAttribute("data-index"), 10);
        setRowSelected(tableName, idx, !!target.checked);
      });
    });
  }
  function initBatchSelectionControls() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      var selectAll = document.getElementById("select-all-" + tableName);
      var batchDeleteBtn = document.getElementById("batch-delete-" + tableName);
      var batchStatusBtn = document.getElementById("batch-status-" + tableName);
      var batchRouteBtn = document.getElementById("batch-route-" + tableName);
      if (selectAll) {
        selectAll.addEventListener("change", function() {
          var body = document.getElementById(tableName + "-body");
          if (!body) {
            return;
          }
          var shouldSelect = !!selectAll.checked;
          Array.prototype.slice.call(body.querySelectorAll(".row-select-checkbox")).forEach(function(cb) {
            var idx = parseInt(cb.getAttribute("data-index"), 10);
            cb.checked = shouldSelect;
            setRowSelected(tableName, idx, shouldSelect);
          });
          updateBatchControls(tableName);
        });
      }
      if (batchDeleteBtn) {
        batchDeleteBtn.addEventListener("click", function() {
          openBatchDeleteModal(tableName);
        });
      }
      if (batchStatusBtn) {
        batchStatusBtn.addEventListener("click", function() {
          openBatchStatusModal(tableName);
        });
      }
      if (batchRouteBtn) {
        batchRouteBtn.addEventListener("click", function() {
          openBatchRouteModal(tableName);
        });
      }
      updateBatchControls(tableName);
    });
  }
  function buildDeleteSummaryHtml(tableName, rows) {
    var lines = [];
    lines.push(t("batchSummarySelected", { count: rows.length }));
    if (tableName === "drivers") {
      var driverNrs = {};
      rows.forEach(function(r) {
        driverNrs[String(r.driverNr || "")] = true;
      });
      var affectedDists = currentData.distributors.filter(function(d) {
        return !!driverNrs[String(d.driverNr || "")];
      }).length;
      var affectedRoutes = currentData.routes.filter(function(r) {
        return !!driverNrs[String(r.driverNr || "")];
      }).length;
      lines.push(t("batchSummaryAffectedDistributors", { count: affectedDists }));
      lines.push(t("batchSummaryAffectedRoutes", { count: affectedRoutes }));
    } else if (tableName === "distributors") {
      var distNames = {};
      rows.forEach(function(r) {
        distNames[String(r.name || "")] = true;
      });
      var affectedAddresses = currentData.addresses.filter(function(a) {
        return !!distNames[String(a.distributor || "")];
      }).length;
      lines.push(t("batchSummaryAffectedAddresses", { count: affectedAddresses }));
    } else if (tableName === "routes") {
      var routeIds = {};
      rows.forEach(function(r) {
        routeIds[normalizeRouteIdentifier(r.routeId || "")] = true;
      });
      var affectedDistributors = currentData.distributors.filter(function(d) {
        var routes = getDistributorRoutes(d);
        return routes.some(function(routeId) {
          return !!routeIds[normalizeRouteIdentifier(routeId)];
        });
      }).length;
      var affectedAddressesForRoutes = currentData.addresses.filter(function(a) {
        return !!routeIds[normalizeRouteIdentifier(a.route || "")];
      }).length;
      lines.push(t("batchSummaryAffectedDistributors", { count: affectedDistributors }));
      lines.push(t("batchSummaryAffectedAddresses", { count: affectedAddressesForRoutes }));
    } else if (tableName === "addresses") {
      var included = 0;
      var excluded = 0;
      var includedHouseholds = 0;
      var excludedHouseholds = 0;
      rows.forEach(function(r) {
        var hh = Math.max(1, toInt2(r.numberOfHouseholds));
        var ex = Math.max(0, toInt2(r.numberOfExcludedHouseholds));
        ex = Math.min(ex, hh);
        includedHouseholds += hh - ex;
        excludedHouseholds += ex;
        if (ex > 0) {
          excluded += 1;
        } else {
          included += 1;
        }
      });
      lines.push(t("totalsIncluded") + ": " + included);
      lines.push(t("totalsExcluded") + ": " + excluded);
      lines.push(t("rowHouseholds") + ": " + includedHouseholds + "/" + excludedHouseholds);
    }
    return lines.map(function(line) {
      return "<div>" + escapeHtml(line) + "</div>";
    }).join("");
  }
  function statusOptionsForTable(tableName) {
    if (tableName === "addresses") {
      return [
        { value: "included", label: t("statusIncluded") },
        { value: "excluded", label: t("statusExcluded") }
      ];
    }
    return [
      { value: "active", label: t("statusActive") },
      { value: "inactive", label: t("statusInactive") }
    ];
  }
  function setFilterSelection(tableName, criterionKey, values) {
    var dedup = [];
    var seen = {};
    (values || []).forEach(function(v) {
      var val = String(v || "").trim();
      if (!val) {
        return;
      }
      var low = val.toLowerCase();
      if (seen[low]) {
        return;
      }
      seen[low] = true;
      dedup.push(val);
    });
    filterState[tableName][criterionKey] = dedup;
  }
  function clearFilterSelection(tableName, criterionKey) {
    filterState[tableName][criterionKey] = [];
  }
  function refreshFilterComponents(tableName) {
    var tableComps = filterComponents[tableName] || {};
    Object.keys(tableComps).forEach(function(field) {
      var comp = tableComps[field];
      if (comp && typeof comp.render === "function") {
        comp.render();
      }
    });
  }
  function navigateToTable(targetTab, criterionKey, criterionVal) {
    var criterionToField = {
      route: "route",
      status: "status",
      distributorName: "distributor",
      driverName: "driver",
      postnr: "postnr"
    };
    filterState[targetTab] = emptyFilterCriteria();
    ["route", "status", "distributor", "driver", "postnr"].forEach(function(f) {
      var el = document.getElementById("filter-" + targetTab + "-" + f);
      if (el) {
        el.value = "";
      }
    });
    if (criterionKey && criterionVal) {
      setFilterSelection(targetTab, criterionKey, [criterionVal]);
      var suffix = criterionToField[criterionKey];
      if (suffix) {
        var targetInput = document.getElementById("filter-" + targetTab + "-" + suffix);
        if (targetInput) {
          targetInput.value = "";
        }
      }
    }
    paginationState[targetTab].page = 1;
    refreshFilterComponents(targetTab);
    renderAllTables();
    setActiveTab(targetTab);
  }
  function rowMatchesAnyField(row, fieldKeys, needles) {
    if (!needles || !needles.length) {
      return true;
    }
    function valueMatchesNeedle(rawValue, needle2) {
      if (Array.isArray(rawValue)) {
        for (var a = 0; a < rawValue.length; a += 1) {
          if (valueMatchesNeedle(rawValue[a], needle2)) {
            return true;
          }
        }
        return false;
      }
      var value2 = String(rawValue == null ? "" : rawValue).trim().toLowerCase();
      if (!value2) {
        return false;
      }
      if (value2 === needle2) {
        return true;
      }
      var tokens = value2.split(",").map(function(part) {
        return String(part || "").trim();
      }).filter(Boolean);
      for (var t2 = 0; t2 < tokens.length; t2 += 1) {
        if (tokens[t2] === needle2) {
          return true;
        }
      }
      return false;
    }
    for (var n = 0; n < needles.length; n += 1) {
      var needle = needles[n];
      for (var i = 0; i < fieldKeys.length; i += 1) {
        var value = row[fieldKeys[i]];
        if (valueMatchesNeedle(value, needle)) {
          return true;
        }
      }
    }
    return false;
  }
  function addressMatchesSubstring(row, fieldKeys, searchText) {
    if (!searchText || !searchText.trim()) {
      return true;
    }
    var needle = String(searchText).trim().toLowerCase();
    for (var i = 0; i < fieldKeys.length; i += 1) {
      var value = String(row[fieldKeys[i]] == null ? "" : row[fieldKeys[i]]).trim().toLowerCase();
      if (value.indexOf(needle) !== -1) {
        return true;
      }
    }
    return false;
  }
  function rowMatchesAllCriteria(row, map, normalizedCriteria) {
    return rowMatchesAnyField(row, map.route || [], normalizedCriteria.route) && rowMatchesAnyField(row, map.status || [], normalizedCriteria.status) && rowMatchesAnyField(row, map.distributorName || [], normalizedCriteria.distributorName) && rowMatchesAnyField(row, map.driverName || [], normalizedCriteria.driverName) && rowMatchesAnyField(row, map.postnr || [], normalizedCriteria.postnr) && rowMatchesAnyField(row, map.active || [], normalizedCriteria.active) && addressMatchesSubstring(row, map.address || [], normalizedCriteria.addressText);
  }
  function normalizeFilterValues(values) {
    var out = [];
    var seen = {};
    (Array.isArray(values) ? values : []).forEach(function(value) {
      var v = String(value || "").toLowerCase().trim();
      if (!v || seen[v]) {
        return;
      }
      seen[v] = true;
      out.push(v);
    });
    return out;
  }
  function flushPendingFilters(tableName) {
    var container = document.getElementById("panel-" + tableName);
    if (!container) return;
    container.querySelectorAll(".multi-filter-control input").forEach(function(inputEl) {
      var val = String(inputEl.value || "").trim();
      if (val) {
        inputEl.dispatchEvent(new Event("change"));
      }
    });
  }

  // web/src/modals.js
  function clearModalError() {
    if (editModalError) {
      editModalError.textContent = "";
      editModalError.setAttribute("hidden", "");
    }
    if (editModalFields) {
      editModalFields.querySelectorAll(".field-error-message").forEach(function(el) {
        el.textContent = "";
        el.hidden = true;
      });
    }
  }
  function setModalError(message) {
    if (editModalError) {
      editModalError.textContent = message;
      if (message) {
        editModalError.removeAttribute("hidden");
      } else {
        editModalError.setAttribute("hidden", "");
      }
    }
  }
  function setFieldError(fieldName, message, containerId) {
    var container = containerId ? document.getElementById(containerId) : editModalFields;
    if (!container) return;
    var control = container.querySelector('[data-field="' + fieldName + '"]');
    if (!control) return;
    var label = control.closest("label");
    if (!label) return;
    var errDiv = label.querySelector(".field-error-message");
    if (errDiv) {
      errDiv.textContent = message || "";
      errDiv.hidden = !message;
    }
  }
  function buildModalFields(tableName, row, fields) {
    editModalFields.innerHTML = "";
    fields.forEach(function(fieldName) {
      var label = document.createElement("label");
      label.className = "modal-field";
      label.dataset.fieldName = fieldName;
      var span = document.createElement("span");
      var labelKey = (fieldLabelKeyByTable[tableName] || {})[fieldName] || fieldName;
      span.textContent = t(labelKey);
      label.appendChild(span);
      var control;
      if (fieldName === "active" || fieldName === "requiresDistributor") {
        control = document.createElement("input");
        control.type = "checkbox";
        control.checked = row[fieldName] !== false;
      } else if (fieldName === "status") {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        statusOptionsForTable(tableName).forEach(function(opt) {
          var option2 = document.createElement("option");
          option2.value = opt.value;
          option2.textContent = opt.label;
          if ((row[fieldName] || "").toLowerCase() === opt.value) {
            option2.selected = true;
          }
          control.appendChild(option2);
        });
      } else if (tableName === "distributors" && fieldName === "driverName" || tableName === "routes" && fieldName === "driver") {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        var foundDriver = false;
        currentData.drivers.forEach(function(drv) {
          var option2 = document.createElement("option");
          option2.value = drv.name;
          option2.textContent = drv.name;
          if (row[fieldName] === drv.name) {
            option2.selected = true;
            foundDriver = true;
          }
          control.appendChild(option2);
        });
        if (row[fieldName] && !foundDriver) {
          var option = document.createElement("option");
          option.value = row[fieldName];
          option.textContent = row[fieldName] + " (Unknown)";
          option.selected = true;
          control.appendChild(option);
        }
      } else if (tableName === "routes" && fieldName === "distributor") {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        var foundDist = false;
        currentData.distributors.forEach(function(dist) {
          var option2 = document.createElement("option");
          option2.value = dist.name;
          option2.textContent = dist.name;
          if (row[fieldName] === dist.name) {
            option2.selected = true;
            foundDist = true;
          }
          control.appendChild(option2);
        });
        if (row[fieldName] && !foundDist) {
          var option = document.createElement("option");
          option.value = row[fieldName];
          option.textContent = row[fieldName] + " (Unknown)";
          option.selected = true;
          control.appendChild(option);
        }
      } else if (tableName === "distributors" && fieldName === "routes") {
        control = document.createElement("select");
        control.multiple = true;
        control.size = 10;
        control.setAttribute("data-type", "multiselect");
        var assignedRoutes = Array.isArray(row[fieldName]) ? row[fieldName] : [];
        currentData.routes.forEach(function(rt) {
          var option2 = document.createElement("option");
          option2.value = rt.routeId;
          if (assignedRoutes.indexOf(rt.routeId) !== -1) {
            option2.selected = true;
          }
          var text = rt.routeId;
          if (rt.distributor && rt.distributor !== row.name) {
            text += " (" + rt.distributor + ")";
          }
          option2.textContent = text;
          control.appendChild(option2);
        });
      } else if (tableName === "addresses" && fieldName === "route") {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        var existingRoutes = currentData.routes.map(function(r) {
          return r.routeId;
        }).filter(Boolean).sort(function(a, b) {
          return a.localeCompare(b, void 0, { numeric: true, sensitivity: "base" });
        });
        var found = false;
        existingRoutes.forEach(function(routeId) {
          var option2 = document.createElement("option");
          option2.value = routeId;
          option2.textContent = routeId;
          if (row[fieldName] === routeId) {
            option2.selected = true;
            found = true;
          }
          control.appendChild(option2);
        });
        if (row[fieldName] && !found) {
          var option = document.createElement("option");
          option.value = row[fieldName];
          option.textContent = row[fieldName] + " (Unknown)";
          option.selected = true;
          control.appendChild(option);
        }
      } else {
        control = document.createElement("input");
        control.type = "text";
        if (fieldName === "routes") {
          control.value = Array.isArray(row[fieldName]) ? row[fieldName].join(", ") : row[fieldName] || "";
        } else {
          control.value = row[fieldName] || "";
        }
      }
      control.required = getRequiredFields(tableName).indexOf(fieldName) !== -1;
      control.setAttribute("data-field", fieldName);
      label.appendChild(control);
      var errorDiv = document.createElement("div");
      errorDiv.className = "field-error-message";
      errorDiv.style.color = "var(--error-color, red)";
      errorDiv.style.fontSize = "0.85em";
      errorDiv.style.marginTop = "4px";
      errorDiv.hidden = true;
      label.appendChild(errorDiv);
      editModalFields.appendChild(label);
    });
    if (tableName === "routes") {
      let toggleRouteDropdowns = function() {
        if (reqDistCheckbox && reqDistCheckbox.checked) {
          if (distLabel) distLabel.style.display = "";
          if (driverLabel) driverLabel.style.display = "none";
        } else {
          if (distLabel) distLabel.style.display = "none";
          if (driverLabel) driverLabel.style.display = "";
        }
      };
      var reqDistCheckbox = editModalFields.querySelector('[data-field="requiresDistributor"]');
      var distControl = editModalFields.querySelector('[data-field="distributor"]');
      var distLabel = distControl ? distControl.closest("label") : null;
      var driverControl = editModalFields.querySelector('[data-field="driver"]');
      var driverLabel = driverControl ? driverControl.closest("label") : null;
      if (reqDistCheckbox) {
        reqDistCheckbox.addEventListener("change", toggleRouteDropdowns);
        toggleRouteDropdowns();
      }
    }
    if (tableName === "addresses") {
      var geonorgeBtn = document.createElement("button");
      geonorgeBtn.type = "button";
      geonorgeBtn.className = "btn secondary";
      geonorgeBtn.textContent = t("btnUpdateGeonorge") || "Update from Geonorge";
      geonorgeBtn.style.marginTop = "1rem";
      geonorgeBtn.style.width = "100%";
      geonorgeBtn.addEventListener("click", function() {
        var addressInput = editModalFields.querySelector('[data-field="address"]');
        var hhInput = editModalFields.querySelector('[data-field="numberOfHouseholds"]');
        var errorEl = document.getElementById("edit-modal-error");
        if (!addressInput || !hhInput) return;
        var address = addressInput.value.trim();
        if (!address) return;
        geonorgeBtn.disabled = true;
        var originalText = geonorgeBtn.textContent;
        geonorgeBtn.textContent = "...";
        fetch("https://ws.geonorge.no/adresser/v1/sok?sok=" + encodeURIComponent(address)).then(function(res) {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        }).then(function(data) {
          geonorgeBtn.disabled = false;
          geonorgeBtn.textContent = originalText;
          if (!data.adresser || data.adresser.length === 0) {
            errorEl.textContent = t("geonorgeNotFound") || "Address not found on Geonorge. Consider deleting this address.";
            errorEl.removeAttribute("hidden");
          } else {
            var match = data.adresser[0];
            var units = match.bruksenhetsnummer ? match.bruksenhetsnummer.length : 0;
            var hhCount = Math.max(1, units);
            hhInput.value = hhCount;
            errorEl.setAttribute("hidden", "");
            hhInput.style.backgroundColor = "#e6ffe6";
            setTimeout(function() {
              hhInput.style.backgroundColor = "";
            }, 1500);
          }
        }).catch(function(err) {
          geonorgeBtn.disabled = false;
          geonorgeBtn.textContent = originalText;
          errorEl.textContent = t("geonorgeError") || "Failed to connect to Geonorge API.";
          errorEl.removeAttribute("hidden");
        });
      });
      editModalFields.appendChild(geonorgeBtn);
    }
  }
  function closeEditModal() {
    editState.tableName = null;
    editState.rowIndex = -1;
    editState.mode = "edit";
    editState.originalRouteId = null;
    editState.originalName = null;
    editModal.setAttribute("hidden", "");
    editModalFields.innerHTML = "";
    clearModalError();
  }
  function openEditModal(tableName, rowIndex) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var row = currentData[tableName] && currentData[tableName][rowIndex];
    if (!row) {
      return;
    }
    clearModalError();
    editState.mode = "edit";
    editState.tableName = tableName;
    editState.rowIndex = rowIndex;
    editState.originalRouteId = tableName === "routes" ? row.routeId : null;
    editState.originalName = tableName === "distributors" || tableName === "drivers" ? row.name : null;
    editModalTitle.textContent = t("editRowTitle", { table: t(tableTitleSingleKeys[tableName]) });
    var infoKey = "infoEdit" + tableName.charAt(0).toUpperCase() + tableName.slice(1);
    var infoEl = document.getElementById("edit-modal-info");
    if (infoEl) infoEl.innerHTML = t(infoKey);
    buildModalFields(tableName, row, editFieldsByTable[tableName] || []);
    editModal.removeAttribute("hidden");
    var firstControl = editModalFields.querySelector("input, select");
    if (firstControl) {
      firstControl.focus();
    }
  }
  function openAddModal(tableName) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    clearModalError();
    editState.mode = "add";
    editState.tableName = tableName;
    editState.rowIndex = -1;
    editState.originalRouteId = null;
    editState.originalName = null;
    var row = defaultRowForTable(tableName);
    editModalTitle.textContent = t("addRowTitle", { table: t(tableTitleSingleKeys[tableName]) });
    var infoKey = "infoEdit" + tableName.charAt(0).toUpperCase() + tableName.slice(1);
    var infoEl = document.getElementById("edit-modal-info");
    if (infoEl) infoEl.innerHTML = t(infoKey);
    buildModalFields(tableName, row, addFieldsByTable[tableName] || []);
    editModal.removeAttribute("hidden");
    var firstControl = editModalFields.querySelector("input, select");
    if (firstControl) {
      firstControl.focus();
    }
  }
  function initEditModal() {
    editModalClose.addEventListener("click", closeEditModal);
    editModalCancel.addEventListener("click", closeEditModal);
    editModal.addEventListener("click", function(event) {
      var target = event.target;
      if (target && target.getAttribute("data-modal-close") === "1") {
        closeEditModal();
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !editModal.hasAttribute("hidden")) {
        closeEditModal();
      }
    });
    editModalForm.addEventListener("submit", function(event) {
      event.preventDefault();
      clearModalError();
      if (!editState.tableName) {
        closeEditModal();
        return;
      }
      var targetRow = null;
      var row = null;
      if (editState.mode === "add") {
        row = defaultRowForTable(editState.tableName);
      } else {
        if (editState.rowIndex < 0) {
          closeEditModal();
          return;
        }
        targetRow = currentData[editState.tableName][editState.rowIndex];
        if (!targetRow) {
          closeEditModal();
          return;
        }
        row = Object.assign({}, targetRow);
        if (Array.isArray(targetRow.routes)) {
          row.routes = targetRow.routes.slice();
        }
      }
      var oldRoutes = editState.tableName === "distributors" && editState.mode === "edit" ? (row.routes || []).slice() : [];
      editModalFields.querySelectorAll("[data-field]").forEach(function(el) {
        if (el.disabled) {
          return;
        }
        var fieldName = el.getAttribute("data-field");
        if (!fieldName) {
          return;
        }
        if (el.type === "checkbox") {
          row[fieldName] = el.checked;
        } else if (el.getAttribute("data-type") === "multiselect") {
          var selected = [];
          for (var i = 0; i < el.options.length; i++) {
            if (el.options[i].selected) {
              selected.push(el.options[i].value);
            }
          }
          row[fieldName] = selected;
        } else if (fieldName === "routes") {
          row[fieldName] = normalizeRouteValues(el.value);
        } else {
          row[fieldName] = String(el.value || "").trim();
          if (fieldName === "route" || fieldName === "routeId") {
            row[fieldName] = normalizeRouteIdentifier(row[fieldName]);
          }
        }
      });
      var activeFields = editState.mode === "add" ? addFieldsByTable[editState.tableName] || [] : editFieldsByTable[editState.tableName] || [];
      var missing = validateRequiredFields(editState.tableName, row);
      var formatErrors = validateFieldFormats(editState.tableName, row, activeFields);
      var hasErrors = false;
      var topErrors = [];
      if (missing.length) {
        missing.forEach(function(f) {
          setFieldError(f, t("modalRequiredError", { fields: f }));
          hasErrors = true;
        });
      }
      if (formatErrors.length) {
        formatErrors.forEach(function(err) {
          if (typeof err === "object" && err.fieldName) {
            setFieldError(err.fieldName, err.message);
            topErrors.push(err.text);
          } else {
            topErrors.push(String(err));
          }
        });
        hasErrors = true;
      }
      var checkUniqueness = function(fieldName, items, extractKeyFn, errorKey) {
        var proposed = extractKeyFn(row[fieldName] || "");
        var isDuplicate = items.some(function(item, idx) {
          if (editState.mode === "edit" && idx === editState.rowIndex) return false;
          return extractKeyFn(item[fieldName] || "") === proposed;
        });
        if (isDuplicate) {
          setFieldError(fieldName, t(errorKey) || fieldName + " must be unique");
          hasErrors = true;
        }
      };
      if (editState.tableName === "routes") {
        var trimmedRouteId = String(row.routeId || "").trim();
        if (!trimmedRouteId) {
          setFieldError("routeId", t("routeEmptyError") || "Rute-ID kan ikke v\xE6re tom.");
          hasErrors = true;
        } else {
          checkUniqueness("routeId", currentData.routes, function(s) {
            return normalizeRouteIdentifier(s);
          }, "routeDuplicateError");
        }
      } else if (editState.tableName === "drivers") {
        checkUniqueness("name", currentData.drivers, function(s) {
          return s.trim().toLowerCase();
        }, "duplicateErrorDriver");
      } else if (editState.tableName === "distributors") {
        checkUniqueness("name", currentData.distributors, function(s) {
          return s.trim().toLowerCase();
        }, "duplicateErrorDistributor");
      } else if (editState.tableName === "addresses") {
        checkUniqueness("address", currentData.addresses, function(s) {
          return s.trim().toLowerCase();
        }, "duplicateErrorAddress");
      }
      if (hasErrors) {
        if (topErrors.length) {
          setModalError(topErrors.join(" "));
        } else {
          setModalError(t("modalFixErrorsBelow") || "Vennligst rett opp feilene nedenfor.");
        }
        return;
      }
      if (editState.tableName === "addresses") {
        normalizeAddressRow(row);
      } else if (editState.tableName === "drivers") {
        var oldDriverName = editState.originalName;
        var newDriverName = row.name;
        if (editState.mode === "edit" && oldDriverName && oldDriverName !== newDriverName) {
          currentData.distributors.forEach(function(dist) {
            if (dist.driverName === oldDriverName) {
              dist.driverName = newDriverName;
            }
          });
          currentData.routes.forEach(function(rt) {
            if (rt.driver === oldDriverName) {
              rt.driver = newDriverName;
            }
          });
        }
      } else if (editState.tableName === "distributors") {
        normalizeDistributorRow(row);
        if (row.driverName) {
          var matchedDriver = currentData.drivers.find(function(d) {
            return d.name === row.driverName;
          });
          if (matchedDriver) row.driverNr = matchedDriver.driverNr;
        }
        var oldDistName = editState.originalName;
        var newDistName = row.name;
        if (editState.mode === "edit" && oldDistName && oldDistName !== newDistName) {
          currentData.routes.forEach(function(rt) {
            if (rt.distributor === oldDistName) {
              rt.distributor = newDistName;
            }
          });
        }
        var newRoutes = row.routes || [];
        newRoutes.forEach(function(rId) {
          if (oldRoutes.indexOf(rId) === -1) {
            currentData.distributors.forEach(function(otherDist) {
              if (otherDist !== targetRow) {
                var idx = (otherDist.routes || []).indexOf(rId);
                if (idx !== -1) {
                  otherDist.routes.splice(idx, 1);
                }
              }
            });
            var matchedRoute = currentData.routes.find(function(rt) {
              return rt.routeId === rId;
            });
            if (matchedRoute) {
              matchedRoute.distributor = row.name;
              var driverObj = currentData.drivers.find(function(d) {
                return d.name === row.driverName;
              });
              matchedRoute.driver = row.driverName || (driverObj ? driverObj.name : "");
            }
          }
        });
        oldRoutes.forEach(function(rId) {
          if (newRoutes.indexOf(rId) === -1) {
            var matchedRoute = currentData.routes.find(function(rt) {
              return rt.routeId === rId;
            });
            if (matchedRoute && matchedRoute.distributor === row.name) {
              matchedRoute.distributor = "";
              matchedRoute.driver = "";
            }
          }
        });
      } else if (editState.tableName === "routes") {
        var oldRouteIdJson = editState.originalRouteId;
        var newRouteIdJson = normalizeRouteIdentifier(row.routeId) || row.routeId;
        row.routeId = newRouteIdJson;
        if (editState.mode === "edit" && oldRouteIdJson && oldRouteIdJson !== newRouteIdJson) {
          currentData.distributors.forEach(function(dist) {
            var routes = getDistributorRoutes(dist);
            var updatedRoutes = routes.map(function(routeId) {
              return normalizeRouteIdentifier(routeId) === oldRouteIdJson ? newRouteIdJson : routeId;
            }).filter(Boolean);
            if (updatedRoutes.length) {
              dist.routes = updatedRoutes;
            } else {
              dist.routes = [];
            }
            delete dist.route;
          });
          currentData.addresses.forEach(function(addr) {
            if (normalizeRouteIdentifier(addr.route || "") === oldRouteIdJson) {
              addr.route = newRouteIdJson;
            }
          });
        }
        var assignedDistributor = row.requiresDistributor !== false ? row.distributor || "" : "";
        currentData.distributors.forEach(function(dist) {
          var routes = getDistributorRoutes(dist);
          var normalizedRoutes = routes.map(function(r) {
            return normalizeRouteIdentifier(r);
          });
          var hasRoute = normalizedRoutes.indexOf(newRouteIdJson) !== -1;
          if (dist.name === assignedDistributor) {
            if (!hasRoute) {
              routes.push(newRouteIdJson);
              dist.routes = routes;
              dist.routes.sort(function(a, b) {
                return a.localeCompare(b, void 0, { numeric: true });
              });
            }
          } else {
            if (hasRoute) {
              dist.routes = routes.filter(function(rId) {
                return normalizeRouteIdentifier(rId) !== newRouteIdJson;
              });
            }
          }
          delete dist.route;
        });
      }
      if (editState.mode === "edit" && targetRow) {
        Object.assign(targetRow, row);
      } else if (editState.mode === "add") {
        currentData[editState.tableName].push(normalizeRecords([row])[0]);
      }
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      syncCurrentDataFromJson();
      render(recomputeMetricsFromCurrentData());
      renderAllTables();
      setHasUserCommittedEdits(true);
      setShowSaveChanges(true);
      debugSaveChangesLog("editModal:commit-set-true", { table: editState.tableName, mode: editState.mode });
      refreshUnsavedChangesFromData();
      scheduleAutosave();
      closeEditModal();
    });
  }
  function initAddButtons() {
    addDriverBtn.addEventListener("click", function() {
      openAddModal("drivers");
    });
    addDistributorBtn.addEventListener("click", function() {
      openAddModal("distributors");
    });
    addAddressBtn.addEventListener("click", function() {
      openAddModal("addresses");
    });
    if (addRouteBtn) {
      addRouteBtn.addEventListener("click", function() {
        openAddModal("routes");
      });
    }
  }
  function populateDeleteTransferOptions(tableName, selectedIndexes, transferSelect) {
    var selectedMap = {};
    selectedIndexes.forEach(function(idx) {
      selectedMap[idx] = true;
    });
    transferSelect.innerHTML = "";
    if (tableName === "addresses") {
      return;
    }
    currentData[tableName].forEach(function(row, index) {
      if (selectedMap[index]) {
        return;
      }
      var opt = document.createElement("option");
      opt.value = String(index);
      if (tableName === "drivers") {
        opt.textContent = row.name + (row.driverNr ? " (" + row.driverNr + ")" : "");
      } else if (tableName === "distributors") {
        opt.textContent = row.name + (getDistributorRoutes(row).length ? " (" + getDistributorRoutes(row).join(", ") + ")" : "");
      } else {
        opt.textContent = row.routeId;
      }
      transferSelect.appendChild(opt);
    });
  }
  function openDeleteDialog(tableName, rowIndexes, mode) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var rows = rowIndexes.map(function(idx) {
      return currentData[tableName] && currentData[tableName][idx];
    }).filter(Boolean);
    if (!rows.length) {
      return;
    }
    deleteState.mode = mode || "single";
    deleteState.tableName = tableName;
    deleteState.rowIndex = rowIndexes[0];
    deleteState.rowIndexes = rowIndexes.slice();
    var msgEl = document.getElementById("delete-modal-message");
    var summaryEl = document.getElementById("delete-modal-summary");
    var transferSelect = document.getElementById("delete-modal-transfer");
    var transferLabel = document.getElementById("delete-modal-transfer-label");
    var errEl = document.getElementById("delete-modal-error");
    var titleEl = document.getElementById("delete-modal-title");
    var transferWrap = document.getElementById("delete-modal-transfer-wrap");
    errEl.hidden = true;
    errEl.textContent = "";
    transferLabel.textContent = t("deleteTransferLabel");
    titleEl.textContent = deleteState.mode === "batch" ? t("batchDeleteTitle", { table: t(tableTitleKeys[tableName] || "routesTitle") }) : t("deleteRowTitle", { table: t(tableTitleKeys[tableName] || "routesTitle") });
    summaryEl.innerHTML = buildDeleteSummaryHtml(tableName, rows);
    if (deleteState.mode === "batch") {
      if (tableName === "drivers") {
        msgEl.textContent = t("batchDeleteDriverMessage", { count: rows.length });
      } else if (tableName === "distributors") {
        msgEl.textContent = t("batchDeleteDistributorMessage", { count: rows.length });
      } else if (tableName === "routes") {
        msgEl.textContent = t("batchDeleteRouteMessage", { count: rows.length });
      } else {
        msgEl.textContent = t("batchDeleteAddressMessage", { count: rows.length });
      }
    } else {
      var row = rows[0];
      if (tableName === "drivers") {
        var driverNr = row.driverNr;
        var affectedCount = currentData.distributors.filter(function(d) {
          return d.driverNr === driverNr;
        }).length;
        msgEl.textContent = t("deleteDriverMessage", { name: row.name, count: affectedCount });
      } else if (tableName === "distributors") {
        var distName = row.name;
        var sheetCount = currentData.addresses.filter(function(a) {
          return (a.distributor || "") === distName;
        }).length;
        msgEl.textContent = t("deleteDistributorMessage", { name: row.name, count: sheetCount });
      } else if (tableName === "routes") {
        var routeId = row.routeId;
        var addrCount = currentData.addresses.filter(function(a) {
          return normalizeRouteIdentifier(a.route || "") === routeId;
        }).length;
        msgEl.textContent = t("deleteRouteMessage", { routeId, count: addrCount });
      } else {
        msgEl.textContent = t("deleteAddressMessage", { address: row.address || "" });
      }
    }
    populateDeleteTransferOptions(tableName, rowIndexes, transferSelect);
    transferWrap.hidden = tableName === "addresses";
    document.getElementById("delete-modal").removeAttribute("hidden");
    if (!transferWrap.hidden && transferSelect.options.length > 0) {
      transferSelect.focus();
    }
  }
  function openDeleteModal(tableName, rowIndex) {
    openDeleteDialog(tableName, [rowIndex], "single");
  }
  function openBatchDeleteModal(tableName) {
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    openDeleteDialog(tableName, selectedIndexes, "batch");
  }
  function getBatchStatusOptions(tableName) {
    if (tableName === "addresses") {
      return [
        { value: "included", label: t("statusIncluded") },
        { value: "excluded", label: t("statusExcluded") }
      ];
    }
    return [
      { value: "active", label: t("statusActive") },
      { value: "inactive", label: t("statusInactive") }
    ];
  }
  function openBatchStatusModal(tableName) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    var rows = selectedIndexes.map(function(idx) {
      return currentData[tableName][idx];
    }).filter(Boolean);
    if (!rows.length) {
      return;
    }
    batchStatusState.tableName = tableName;
    batchStatusState.rowIndexes = selectedIndexes.slice();
    var titleEl = document.getElementById("batch-status-title");
    var msgEl = document.getElementById("batch-status-message");
    var summaryEl = document.getElementById("batch-status-summary");
    var selectEl = document.getElementById("batch-status-select");
    var errEl = document.getElementById("batch-status-error");
    titleEl.textContent = t("batchStatusTitle", { table: t(tableTitleKeys[tableName] || "routesTitle") });
    msgEl.textContent = t("batchStatusMessage", { count: rows.length });
    summaryEl.innerHTML = buildDeleteSummaryHtml(tableName, rows);
    errEl.hidden = true;
    errEl.textContent = "";
    selectEl.innerHTML = "";
    getBatchStatusOptions(tableName).forEach(function(optDef) {
      var opt = document.createElement("option");
      opt.value = optDef.value;
      opt.textContent = optDef.label;
      selectEl.appendChild(opt);
    });
    document.getElementById("batch-status-modal").removeAttribute("hidden");
    selectEl.focus();
  }
  function closeBatchStatusModal() {
    batchStatusState.tableName = null;
    batchStatusState.rowIndexes = [];
    var errEl = document.getElementById("batch-status-error");
    errEl.hidden = true;
    errEl.textContent = "";
    document.getElementById("batch-status-modal").setAttribute("hidden", "");
  }
  function executeBatchStatusUpdate() {
    var tableName = batchStatusState.tableName;
    var indexes = batchStatusState.rowIndexes.slice();
    if (!tableName || !indexes.length) {
      return;
    }
    var statusValue = String(document.getElementById("batch-status-select").value || "").trim();
    var errEl = document.getElementById("batch-status-error");
    if (!statusValue) {
      errEl.textContent = t("batchStatusNoValue");
      errEl.hidden = false;
      return;
    }
    var selectedMap = {};
    indexes.forEach(function(idx) {
      selectedMap[idx] = true;
    });
    if (tableName === "routes") {
      var routeMap = {};
      currentData.routes.forEach(function(row, idx) {
        if (selectedMap[idx]) {
          row.status = statusValue;
          routeMap[normalizeRouteIdentifier(row.routeId || "")] = true;
        }
      });
      currentData.distributors.forEach(function(dist) {
        var routes = getDistributorRoutes(dist);
        if (routes.some(function(routeId) {
          return !!routeMap[normalizeRouteIdentifier(routeId)];
        })) {
          dist.status = statusValue;
        }
      });
    } else if (tableName === "addresses") {
      currentData.addresses.forEach(function(row, idx) {
        if (selectedMap[idx]) {
          if (statusValue === "excluded") {
            row.numberOfExcludedHouseholds = toInt(row.numberOfHouseholds) || 1;
          } else {
            row.numberOfExcludedHouseholds = 0;
          }
          normalizeAddressRow(row);
        }
      });
    } else {
      currentData[tableName].forEach(function(row, idx) {
        if (selectedMap[idx]) {
          row.status = statusValue;
        }
      });
    }
    clearBatchSelection(tableName);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    syncCurrentDataFromJson();
    render(recomputeMetricsFromCurrentData());
    renderAllTables();
    setHasUserCommittedEdits(true);
    setShowSaveChanges(true);
    debugSaveChangesLog("batchStatus:commit-set-true", { table: tableName, count: indexes.length });
    refreshUnsavedChangesFromData();
    scheduleAutosave();
    closeBatchStatusModal();
  }
  function openBatchRouteModal(tableName) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    var rows = selectedIndexes.map(function(idx) {
      return currentData[tableName][idx];
    }).filter(Boolean);
    if (!rows.length) {
      return;
    }
    batchRouteState.tableName = tableName;
    batchRouteState.rowIndexes = selectedIndexes.slice();
    var titleEl = document.getElementById("batch-route-title");
    var msgEl = document.getElementById("batch-route-message");
    var selectEl = document.getElementById("batch-route-select");
    var errEl = document.getElementById("batch-route-error");
    titleEl.textContent = t("batchRouteTitle") || "Update route";
    msgEl.textContent = t("batchRouteMessage", { count: rows.length }) || "Update route for " + rows.length + " selected addresses.";
    errEl.hidden = true;
    errEl.textContent = "";
    selectEl.innerHTML = "";
    var emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = t("selectRoutePlaceholder") || "Select route...";
    emptyOpt.disabled = true;
    emptyOpt.selected = true;
    emptyOpt.hidden = true;
    selectEl.appendChild(emptyOpt);
    var existingRoutes = currentData.routes.map(function(r) {
      return r.routeId;
    }).filter(Boolean).sort(function(a, b) {
      return a.localeCompare(b, void 0, { numeric: true, sensitivity: "base" });
    });
    existingRoutes.forEach(function(routeId) {
      var opt = document.createElement("option");
      opt.value = routeId;
      opt.textContent = routeId;
      selectEl.appendChild(opt);
    });
    document.getElementById("batch-route-modal").removeAttribute("hidden");
    selectEl.focus();
  }
  function closeBatchRouteModal() {
    batchRouteState.tableName = null;
    batchRouteState.rowIndexes = [];
    var errEl = document.getElementById("batch-route-error");
    errEl.hidden = true;
    errEl.textContent = "";
    document.getElementById("batch-route-modal").setAttribute("hidden", "");
  }
  function executeBatchRouteUpdate() {
    var tableName = batchRouteState.tableName;
    var indexes = batchRouteState.rowIndexes.slice();
    if (tableName !== "addresses" || !indexes.length) {
      return;
    }
    var routeValue = String(document.getElementById("batch-route-select").value || "").trim();
    var errEl = document.getElementById("batch-route-error");
    if (!routeValue) {
      errEl.textContent = t("batchRouteNoValue") || "Please select a route.";
      errEl.hidden = false;
      return;
    }
    var selectedMap = {};
    indexes.forEach(function(idx) {
      selectedMap[idx] = true;
    });
    var routeNormalized = normalizeRouteIdentifier(routeValue);
    currentData.addresses.forEach(function(row, idx) {
      if (selectedMap[idx]) {
        row.route = routeNormalized;
        normalizeAddressRow(row);
      }
    });
    clearBatchSelection(tableName);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    syncCurrentDataFromJson();
    render(recomputeMetricsFromCurrentData());
    renderAllTables();
    setHasUserCommittedEdits(true);
    setShowSaveChanges(true);
    debugSaveChangesLog("batchRoute:commit-set-true", { table: tableName, count: indexes.length });
    refreshUnsavedChangesFromData();
    scheduleAutosave();
    closeBatchRouteModal();
  }
  function initBatchRouteModal() {
    var closeBtns = document.querySelectorAll("#batch-route-close, #batch-route-cancel, [data-batch-route-close]");
    closeBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        closeBatchRouteModal();
      });
    });
    var applyBtn = document.getElementById("batch-route-apply");
    if (applyBtn) {
      applyBtn.addEventListener("click", function() {
        executeBatchRouteUpdate();
      });
    }
  }
  function closeDeleteModal() {
    deleteState.mode = "single";
    deleteState.tableName = null;
    deleteState.rowIndex = -1;
    deleteState.rowIndexes = [];
    var summaryEl = document.getElementById("delete-modal-summary");
    if (summaryEl) {
      summaryEl.innerHTML = "";
    }
    document.getElementById("delete-modal").setAttribute("hidden", "");
  }
  function executeDelete() {
    var tableName = deleteState.tableName;
    var indexes = deleteState.mode === "batch" ? deleteState.rowIndexes.slice() : [deleteState.rowIndex];
    indexes = indexes.filter(function(idx) {
      return Number.isFinite(idx) && idx >= 0;
    });
    if (!tableName || !indexes.length) {
      return;
    }
    var rows = indexes.map(function(idx) {
      return currentData[tableName][idx];
    }).filter(Boolean);
    if (!rows.length) {
      return;
    }
    var transferSelect = document.getElementById("delete-modal-transfer");
    var errEl = document.getElementById("delete-modal-error");
    if (transferSelect.options.length === 0 && tableName !== "addresses") {
      errEl.textContent = t("deleteNoTransferTarget");
      errEl.hidden = false;
      return;
    }
    var targetIndex = parseInt(transferSelect.value, 10);
    if (tableName !== "addresses" && (isNaN(targetIndex) || targetIndex < 0)) {
      errEl.textContent = t("deleteNoTarget");
      errEl.hidden = false;
      return;
    }
    if (tableName === "drivers") {
      var targetDriverJson = currentData.drivers[targetIndex];
      if (!targetDriverJson) {
        errEl.textContent = t("deleteNoTarget");
        errEl.hidden = false;
        return;
      }
      var deletedDriverNrMap = {};
      var deletedDriverNameMap = {};
      rows.forEach(function(r) {
        if (r.driverNr) deletedDriverNrMap[String(r.driverNr)] = true;
        if (r.name) deletedDriverNameMap[r.name] = true;
      });
      currentData.distributors.forEach(function(dist) {
        if (dist.driverNr && deletedDriverNrMap[String(dist.driverNr)] || deletedDriverNameMap[dist.driverName]) {
          dist.driverNr = targetDriverJson.driverNr || "";
          dist.driverName = targetDriverJson.name || "";
        }
      });
      currentData.routes.forEach(function(route) {
        if (route.driverNr && deletedDriverNrMap[String(route.driverNr)] || deletedDriverNameMap[route.driver] || deletedDriverNameMap[route.driverName]) {
          route.driverNr = targetDriverJson.driverNr || "";
          route.driver = targetDriverJson.name || "";
          route.driverName = targetDriverJson.name || "";
        }
      });
    } else if (tableName === "distributors") {
      var targetDistJson = currentData.distributors[targetIndex];
      if (!targetDistJson) {
        errEl.textContent = t("deleteNoTarget");
        errEl.hidden = false;
        return;
      }
      var deletedDistNameMap = {};
      rows.forEach(function(r) {
        deletedDistNameMap[String(r.name || "")] = true;
      });
      var targetRoutes = getDistributorRoutes(targetDistJson).slice();
      rows.forEach(function(r) {
        var rts = getDistributorRoutes(r);
        rts.forEach(function(rId) {
          if (targetRoutes.indexOf(rId) === -1) {
            targetRoutes.push(rId);
          }
        });
      });
      targetDistJson.routes = targetRoutes;
      delete targetDistJson.route;
      currentData.routes.forEach(function(rt) {
        if (deletedDistNameMap[rt.distributor]) {
          rt.distributor = targetDistJson.name;
          rt.driver = targetDistJson.driverName || "";
        }
      });
      currentData.addresses.forEach(function(addr) {
        normalizeAddressRow(addr);
      });
    } else if (tableName === "routes") {
      var targetRouteJson = currentData.routes[targetIndex];
      if (!targetRouteJson) {
        errEl.textContent = t("deleteNoTarget");
        errEl.hidden = false;
        return;
      }
      var targetRouteIdJson = targetRouteJson.routeId;
      var deletedRouteIdMap = {};
      rows.forEach(function(r) {
        deletedRouteIdMap[normalizeRouteIdentifier(r.routeId || "")] = true;
      });
      currentData.distributors.forEach(function(dist) {
        var routes = getDistributorRoutes(dist);
        var updatedRoutes = [];
        routes.forEach(function(routeId) {
          var normId = normalizeRouteIdentifier(routeId);
          if (deletedRouteIdMap[normId]) {
            if (targetRouteIdJson && updatedRoutes.indexOf(normalizeRouteIdentifier(targetRouteIdJson)) === -1) {
              updatedRoutes.push(normalizeRouteIdentifier(targetRouteIdJson));
            }
          } else {
            if (updatedRoutes.indexOf(normId) === -1) {
              updatedRoutes.push(routeId);
            }
          }
        });
        if (updatedRoutes.length) {
          dist.routes = updatedRoutes;
        } else if (targetRouteIdJson) {
          dist.routes = [normalizeRouteIdentifier(targetRouteIdJson)];
        } else {
          dist.routes = [];
        }
        delete dist.route;
      });
      currentData.addresses.forEach(function(addr) {
        if (deletedRouteIdMap[normalizeRouteIdentifier(addr.route || "")]) {
          addr.route = targetRouteIdJson;
        }
        normalizeAddressRow(addr);
      });
    }
    ;
    var indexMap = {};
    indexes.forEach(function(idx) {
      indexMap[idx] = true;
    });
    currentData[tableName] = currentData[tableName].filter(function(_, idx) {
      return !indexMap[idx];
    });
    clearBatchSelection(tableName);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    syncCurrentDataFromJson();
    render(recomputeMetricsFromCurrentData());
    renderAllTables();
    setHasUserCommittedEdits(true);
    setShowSaveChanges(true);
    debugSaveChangesLog("delete:commit-set-true", { table: tableName, count: indexes.length });
    refreshUnsavedChangesFromData();
    scheduleAutosave();
    closeDeleteModal();
  }
  function initDeleteModal() {
    var deleteModal = document.getElementById("delete-modal");
    document.getElementById("delete-modal-close").addEventListener("click", closeDeleteModal);
    document.getElementById("delete-modal-cancel").addEventListener("click", closeDeleteModal);
    document.getElementById("delete-modal-confirm").addEventListener("click", executeDelete);
    deleteModal.addEventListener("click", function(event) {
      var target = event.target;
      if (target && target.getAttribute("data-delete-modal-close") === "1") {
        closeDeleteModal();
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !deleteModal.hasAttribute("hidden")) {
        closeDeleteModal();
      }
    });
  }
  function initBatchStatusModal() {
    var modal = document.getElementById("batch-status-modal");
    document.getElementById("batch-status-close").addEventListener("click", closeBatchStatusModal);
    document.getElementById("batch-status-cancel").addEventListener("click", closeBatchStatusModal);
    document.getElementById("batch-status-apply").addEventListener("click", executeBatchStatusUpdate);
    modal.addEventListener("click", function(event) {
      var target = event.target;
      if (target && target.getAttribute("data-batch-status-close") === "1") {
        closeBatchStatusModal();
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeBatchStatusModal();
      }
    });
  }
  function closeLoadResultModal() {
    if (!loadResultModal) {
      return;
    }
    loadResultModal.setAttribute("hidden", "");
  }
  function initLoadResultModal() {
    if (!loadResultModal) {
      return;
    }
    var closeBtn = document.getElementById("load-result-close");
    var okBtn = document.getElementById("load-result-ok");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeLoadResultModal);
    }
    if (okBtn) {
      okBtn.addEventListener("click", closeLoadResultModal);
    }
    loadResultModal.addEventListener("click", function(event) {
      var target = event.target;
      if (target && target.getAttribute("data-load-result-close") === "1") {
        closeLoadResultModal();
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !loadResultModal.hasAttribute("hidden")) {
        closeLoadResultModal();
      }
    });
  }
  function openSourceMissingModal() {
    if (!sourceMissingModal) {
      return;
    }
    sourceMissingModal.removeAttribute("hidden");
    if (openDataFolderBtn) {
      openDataFolderBtn.focus();
    }
  }
  function closeSourceMissingModal() {
    if (!sourceMissingModal) {
      return;
    }
    sourceMissingModal.setAttribute("hidden", "");
  }
  function initSourceMissingModal() {
    if (!sourceMissingModal || !openDataFolderBtn) {
      return;
    }
    openDataFolderBtn.addEventListener("click", function() {
      openDataFolder();
    });
  }
  function stripSetupInfo(text) {
    if (!text) return "";
    var cleaned = String(text).trim();
    if (/##\s*[1-4]\.\s*(Start|Lasting|Settings|Data source|Oppstart)/i.test(cleaned)) {
      cleaned = cleaned.replace(/##\s*[1-4]\.[^#]+(?=##\s*[5-9]|$)/gi, "");
      cleaned = cleaned.replace(/##\s*11\.[^#]+/gi, "");
      cleaned = cleaned.replace(/```[\s\S]*?```/gi, "");
    }
    return cleaned.trim();
  }
  function openUserGuideModal() {
    if (!userGuideModal || !userGuideContent) {
      return;
    }
    userGuideContent.textContent = t("userGuideLoading");
    userGuideModal.removeAttribute("hidden");
    loadUserGuideText().then(function(text) {
      var loaded = stripSetupInfo(String(text || "").trim());
      userGuideContent.innerHTML = parseMarkdown(loaded || t("userGuideFallback"));
    }).catch(function() {
      userGuideContent.innerHTML = parseMarkdown(t("userGuideFallback"));
    });
  }
  function closeUserGuideModal() {
    if (!userGuideModal) {
      return;
    }
    userGuideModal.setAttribute("hidden", "");
  }
  function initUserGuideModal() {
    if (!userGuideModal) {
      return;
    }
    var closeBtn = document.getElementById("user-guide-close");
    var okBtn = document.getElementById("user-guide-ok");
    if (openUserGuideBtn) {
      openUserGuideBtn.addEventListener("click", openUserGuideModal);
    }
    if (floatingGuideBtn) {
      floatingGuideBtn.addEventListener("click", openUserGuideModal);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeUserGuideModal);
    }
    if (okBtn) {
      okBtn.addEventListener("click", closeUserGuideModal);
    }
    userGuideModal.addEventListener("click", function(event) {
      var target = event.target;
      if (target && target.getAttribute("data-user-guide-close") === "1") {
        closeUserGuideModal();
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !userGuideModal.hasAttribute("hidden")) {
        closeUserGuideModal();
      }
    });
  }
  function openCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    closeGuardPending = false;
    closeGuardModal.removeAttribute("hidden");
    if (closeGuardSaveBtn) {
      closeGuardSaveBtn.focus();
    }
  }
  function closeCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    closeGuardPending = false;
    closeGuardModal.setAttribute("hidden", "");
  }
  function initCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    if (closeGuardSaveBtn) {
      closeGuardSaveBtn.addEventListener("click", function() {
        saveChangesToSource();
        closeCloseGuardModal();
        attemptClosePage();
      });
    }
    if (closeGuardContinueBtn) {
      closeGuardContinueBtn.addEventListener("click", function() {
        closeGuardBypass = false;
        closeCloseGuardModal();
      });
    }
    if (closeGuardCloseBtn) {
      closeGuardCloseBtn.addEventListener("click", function() {
        closeCloseGuardModal();
        attemptClosePage();
      });
    }
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && !closeGuardModal.hasAttribute("hidden")) {
        closeGuardBypass = false;
        closeCloseGuardModal();
      }
    });
  }
  function attemptClosePage() {
    closeGuardBypass = true;
    try {
      window.close();
    } catch (e) {
    }
    setTimeout(function() {
      if (!document.hidden) {
        window.location.href = "about:blank";
      }
    }, 10);
  }
  function defaultRowForTable(tableName) {
    if (tableName === "drivers") {
      return {
        name: "",
        status: "active",
        driverNr: "",
        phone: "",
        email: "",
        address: "",
        postnr: "",
        extraPapers: 0
      };
    }
    if (tableName === "distributors") {
      return {
        name: "",
        status: "active",
        routes: [],
        driverNr: "",
        phone: "",
        email: "",
        address: "",
        postnr: "",
        extraPapers: 0
      };
    }
    if (tableName === "routes") {
      return {
        routeId: "",
        distributor: "",
        driver: "",
        requiresDistributor: true,
        active: true,
        notes: "",
        extraPapers: 0
      };
    }
    return {
      address: "",
      route: "",
      distributor: "",
      postnr: "",
      note: "",
      numberOfHouseholds: 1,
      numberOfExcludedHouseholds: 0
    };
  }
  function openDataFolder() {
    promptForDataFile();
  }
  function initMergeRoutesModal() {
    var mergeBtn = document.getElementById("merge-routes-btn");
    if (mergeBtn) mergeBtn.addEventListener("click", openMergeRoutesModal);
    document.getElementById("merge-routes-close").addEventListener("click", closeMergeRoutesModal);
    document.getElementById("merge-routes-cancel").addEventListener("click", closeMergeRoutesModal);
    document.getElementById("merge-routes-form").addEventListener("submit", function(e) {
      e.preventDefault();
      executeMergeRoutes();
    });
    document.addEventListener("click", function(e) {
      var target = e.target;
      if (target && target.getAttribute("data-merge-routes-close") === "1") {
        closeMergeRoutesModal();
      }
    });
  }
  function openMergeRoutesModal() {
    var selectedIndexes = getSelectedIndexes("routes");
    if (selectedIndexes.length < 2) return;
    var routesToMerge = selectedIndexes.map(function(idx) {
      return currentData.routes[idx];
    }).filter(Boolean);
    var routeIds = routesToMerge.map(function(r) {
      return r.routeId;
    });
    var msgEl = document.getElementById("merge-routes-message");
    if (msgEl) {
      msgEl.innerHTML = t("mergeRoutesMessage") + "<br><br><strong>Routes to merge:</strong> " + routeIds.join(", ");
    }
    var modalFields = document.getElementById("merge-routes-fields");
    modalFields.innerHTML = "";
    var idLabel = document.createElement("label");
    var idSpan = document.createElement("span");
    idSpan.textContent = t("routeColId");
    idLabel.appendChild(idSpan);
    var idInput = document.createElement("input");
    idInput.type = "text";
    idInput.required = true;
    idInput.setAttribute("data-field", "routeId");
    idLabel.appendChild(idInput);
    var idErrorDiv = document.createElement("div");
    idErrorDiv.className = "field-error-message";
    idErrorDiv.style.color = "var(--error-color, red)";
    idErrorDiv.style.fontSize = "0.85em";
    idErrorDiv.style.marginTop = "4px";
    idErrorDiv.hidden = true;
    idLabel.appendChild(idErrorDiv);
    modalFields.appendChild(idLabel);
    var reqDistLabel = document.createElement("label");
    reqDistLabel.className = "checkbox-label";
    var reqDistInput = document.createElement("input");
    reqDistInput.type = "checkbox";
    reqDistInput.checked = true;
    reqDistInput.setAttribute("data-field", "requiresDistributor");
    reqDistLabel.appendChild(reqDistInput);
    var reqDistSpan = document.createElement("span");
    reqDistSpan.textContent = t("routeColRequiresDistributor");
    reqDistLabel.appendChild(reqDistSpan);
    modalFields.appendChild(reqDistLabel);
    var distLabel = document.createElement("label");
    var distSpan = document.createElement("span");
    distSpan.textContent = t("routeColDistributor");
    distLabel.appendChild(distSpan);
    var distSelect = document.createElement("select");
    distSelect.setAttribute("data-field", "distributor");
    var emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "\u2014";
    distSelect.appendChild(emptyOpt);
    var sortedDists = (currentData.distributors || []).slice().sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    sortedDists.forEach(function(d) {
      var opt = document.createElement("option");
      opt.value = d.name;
      opt.textContent = d.name;
      distSelect.appendChild(opt);
    });
    distLabel.appendChild(distSelect);
    modalFields.appendChild(distLabel);
    var drvLabel = document.createElement("label");
    var drvSpan = document.createElement("span");
    drvSpan.textContent = t("routeColDriver");
    drvLabel.appendChild(drvSpan);
    var drvSelect = document.createElement("select");
    drvSelect.setAttribute("data-field", "driver");
    var drvEmptyOpt = document.createElement("option");
    drvEmptyOpt.value = "";
    drvEmptyOpt.textContent = "\u2014";
    drvSelect.appendChild(drvEmptyOpt);
    var sortedDrvs = (currentData.drivers || []).slice().sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    sortedDrvs.forEach(function(d) {
      var opt = document.createElement("option");
      opt.value = d.name;
      opt.textContent = d.name;
      drvSelect.appendChild(opt);
    });
    drvLabel.appendChild(drvSelect);
    modalFields.appendChild(drvLabel);
    function toggleRouteDropdowns() {
      if (reqDistInput.checked) {
        distLabel.style.display = "";
        drvLabel.style.display = "none";
      } else {
        distLabel.style.display = "none";
        drvLabel.style.display = "";
      }
    }
    reqDistInput.addEventListener("change", toggleRouteDropdowns);
    toggleRouteDropdowns();
    document.getElementById("merge-routes-error").setAttribute("hidden", "");
    document.getElementById("merge-routes-modal").removeAttribute("hidden");
    idInput.focus();
  }
  function closeMergeRoutesModal() {
    document.getElementById("merge-routes-modal").setAttribute("hidden", "");
    document.getElementById("merge-routes-fields").innerHTML = "";
    document.getElementById("merge-routes-error").setAttribute("hidden", "");
  }
  function executeMergeRoutes() {
    var selectedIndexes = getSelectedIndexes("routes");
    if (selectedIndexes.length < 2) return;
    var routesToMerge = selectedIndexes.map(function(idx) {
      return currentData.routes[idx];
    }).filter(Boolean);
    var oldRouteIds = routesToMerge.map(function(r) {
      return r.routeId;
    });
    var modalFields = document.getElementById("merge-routes-fields");
    var newId = (modalFields.querySelector('[data-field="routeId"]').value || "").trim();
    var reqDist = modalFields.querySelector('[data-field="requiresDistributor"]').checked;
    var dist = (modalFields.querySelector('[data-field="distributor"]').value || "").trim();
    var drv = (modalFields.querySelector('[data-field="driver"]').value || "").trim();
    var errEl = document.getElementById("merge-routes-error");
    if (errEl) {
      errEl.textContent = "";
      errEl.hidden = true;
    }
    var idErr = modalFields.querySelector(".field-error-message");
    if (idErr) {
      idErr.textContent = "";
      idErr.hidden = true;
    }
    if (!newId) {
      setFieldError("routeId", t("routeEmptyError") || t("modalErrorMissing") || "Rute-ID kan ikke v\xE6re tom.", "merge-routes-fields");
      errEl.textContent = t("modalFixErrorsBelow") || "Vennligst rett opp feilene nedenfor.";
      errEl.removeAttribute("hidden");
      return;
    }
    var existsOutsideMerge = currentData.routes.some(function(r) {
      return normalizeRouteIdentifier(r.routeId || "") === normalizeRouteIdentifier(newId) && oldRouteIds.map(function(id) {
        return normalizeRouteIdentifier(id || "");
      }).indexOf(normalizeRouteIdentifier(newId)) === -1;
    });
    if (existsOutsideMerge) {
      setFieldError("routeId", t("routeDuplicateError") || "Route ID already exists.", "merge-routes-fields");
      errEl.textContent = t("modalFixErrorsBelow") || "Vennligst rett opp feilene nedenfor.";
      errEl.removeAttribute("hidden");
      return;
    }
    var newRoute = {
      routeId: normalizeRouteIdentifier(newId) || newId,
      requiresDistributor: reqDist,
      distributor: reqDist ? dist : "",
      driver: reqDist ? "" : drv,
      extraPapers: 0,
      notes: ""
    };
    var normalizedOldIds = oldRouteIds.map(function(id) {
      return normalizeRouteIdentifier(id);
    });
    if (currentData.addresses) {
      currentData.addresses.forEach(function(addr) {
        if (normalizedOldIds.indexOf(normalizeRouteIdentifier(addr.route || "")) !== -1) {
          addr.route = newRoute.routeId;
          normalizeAddressRow(addr);
        }
      });
    }
    if (currentData.distributors) {
      currentData.distributors.forEach(function(d) {
        var currentRoutes = getDistributorRoutes(d);
        var newRoutes = [];
        currentRoutes.forEach(function(rId) {
          var normRId = normalizeRouteIdentifier(rId);
          if (normalizedOldIds.indexOf(normRId) === -1 && newRoutes.indexOf(normRId) === -1) {
            newRoutes.push(rId);
          }
        });
        d.routes = newRoutes;
        if (reqDist && d.name === dist && d.routes.map(function(r) {
          return normalizeRouteIdentifier(r);
        }).indexOf(normalizeRouteIdentifier(newId)) === -1) {
          d.routes.push(newId);
          d.routes.sort(function(a, b) {
            return a.localeCompare(b, void 0, { numeric: true });
          });
        }
      });
    }
    currentData.routes = currentData.routes.filter(function(r) {
      return normalizedOldIds.indexOf(normalizeRouteIdentifier(r.routeId || "")) === -1;
    });
    currentData.routes.push(newRoute);
    closeMergeRoutesModal();
    clearBatchSelection("routes");
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    syncCurrentDataFromJson();
    render(recomputeMetricsFromCurrentData());
    renderAllTables();
    setHasUserCommittedEdits(true);
    setShowSaveChanges(true);
    debugSaveChangesLog("mergeRoutes:commit-set-true", { table: "routes", count: selectedIndexes.length });
    refreshUnsavedChangesFromData();
    scheduleAutosave();
  }

  // web/src/reports.js
  function getRouteData(routeId) {
    var normalized = normalizeRouteIdentifier(routeId);
    var found = null;
    currentData.routes.forEach(function(r) {
      if (normalizeRouteIdentifier(r.routeId) === normalized) {
        found = r;
      }
    });
    return found || {};
  }
  function renderDrivingListsHtml(drivers) {
    var html = "";
    drivers.forEach(function(driver, driverIdx) {
      html += '<div class="print-page">';
      html += '<div class="print-header">';
      html += '  <div class="header-left">';
      html += '    <h2 class="print-title"><u class="solid-underline">' + escapeHtml(t("kjoerelisteTitle") || "Kj\xF8reliste for menighetsbladet") + "</u></h2>";
      html += "    <p><strong>" + escapeHtml(t("kjoererLabel") || "Kj\xF8rer:") + " " + escapeHtml(driver.name || "") + "</strong><br>";
      html += "    <strong>" + escapeHtml(driver.address || "") + "</strong><br>";
      html += "    <strong>" + escapeHtml(driver.postnr || "") + "</strong></p>";
      html += "  </div>";
      html += '  <div class="header-right">';
      html += '    <h2 class="print-driver-nr">' + escapeHtml(t("kjoererNrLabel") || "Kj\xF8rer nr.") + " " + escapeHtml(driver.driverNr || "") + "</h2>";
      html += "    <p><strong>" + escapeHtml(driver.phone || "") + "</strong><br>";
      html += '    <a class="print-link" href="mailto:' + escapeHtml(driver.email || "") + '">' + escapeHtml(driver.email || "") + "</a></p>";
      html += "  </div>";
      html += "</div>";
      var driverDistributors = currentData.distributors.filter(function(dist) {
        return dist.driverName === driver.name || dist.driverNr === driver.driverNr;
      });
      html += '<table class="print-table">';
      html += "<thead><tr>";
      html += '<th class="col-rute"><u class="solid-underline">' + escapeHtml(t("printColRute") || "Rute") + "</u></th>";
      html += '<th class="col-bladbaerer" colspan="3"><u class="solid-underline">' + escapeHtml(t("printColBladbaerer") || "Bladb\xE6rer") + "</u></th>";
      html += '<th class="col-antall text-center"><u class="solid-underline">' + escapeHtml(t("printColAntall") || "Antall blad") + "</u></th>";
      html += "</tr></thead>";
      html += "<tbody>";
      var totalDriverPapers = 0;
      var renderedRouteIds = {};
      driverDistributors.forEach(function(dist) {
        var routes = Array.isArray(dist.routes) ? dist.routes : dist.routes ? [dist.routes] : [];
        routes.forEach(function(routeId) {
          renderedRouteIds[normalizeRouteIdentifier(routeId)] = true;
          var routeObj = getRouteData(routeId);
          var paperCountStr = routeObj.paperCount !== void 0 ? routeObj.paperCount : routeObj.includedAddresses || 0;
          var paperCount = parseInt(paperCountStr, 10) || 0;
          totalDriverPapers += paperCount;
          html += '<tr class="route-row">';
          html += '  <td class="col-rute route-id-cell">' + escapeHtml(routeId) + "</td>";
          html += '  <td class="col-dist-name">' + escapeHtml(dist.name || "") + '<br><a class="print-link" href="mailto:' + escapeHtml(dist.email || "") + '">' + escapeHtml(dist.email || "") + "</a></td>";
          html += '  <td class="col-dist-addr">' + escapeHtml(dist.address || "") + "<br>" + escapeHtml(dist.postnr || "") + "</td>";
          html += '  <td class="col-dist-phone">' + escapeHtml(dist.phone || "") + "</td>";
          html += '  <td class="col-antall text-center">' + paperCount + "</td>";
          html += "</tr>";
          var notes = (routeObj.notes || "").trim();
          var isEmptyNote = !notes;
          html += '<tr class="notes-row' + (isEmptyNote ? " is-empty" : "") + '">';
          html += "  <td></td>";
          html += '  <td colspan="4"><div class="report-note-editable" contenteditable="true" spellcheck="false" data-placeholder="' + escapeHtml(t("clickToAddNote") || "Click to add note") + '">' + escapeHtml(notes) + "</div></td>";
          html += "</tr>";
        });
      });
      var dName = String(driver.name || driver.driverName || "").trim().toLowerCase();
      var dNr = String(driver.driverNr || "").trim();
      var driverRoutesWithoutDist = (currentData.routes || []).filter(function(r) {
        var normId = normalizeRouteIdentifier(r.routeId || "");
        if (!normId || renderedRouteIds[normId]) return false;
        var rDriver = String(r.driver || r.driverName || "").trim().toLowerCase();
        var rDriverNr = String(r.driverNr || "").trim();
        var matches = rDriver && dName && rDriver === dName || rDriverNr && dNr && rDriverNr === dNr;
        return matches;
      });
      driverRoutesWithoutDist.sort(function(a, b) {
        return (a.routeId || "").localeCompare(b.routeId || "", void 0, { numeric: true, sensitivity: "base" });
      });
      driverRoutesWithoutDist.forEach(function(routeObj) {
        var routeId = routeObj.routeId;
        var paperCountStr = routeObj.paperCount !== void 0 ? routeObj.paperCount : routeObj.includedAddresses || 0;
        var paperCount = parseInt(paperCountStr, 10) || 0;
        totalDriverPapers += paperCount;
        var addrText = routeObj.addressRanges ? escapeHtml(routeObj.addressRanges).split("\n").join("<br>") : "";
        if (!addrText) {
          var addrs = (currentData.addresses || []).filter(function(a) {
            return normalizeRouteIdentifier(a.route || "") === normalizeRouteIdentifier(routeId);
          });
          if (addrs.length > 0) {
            addrText = addrs.map(function(a) {
              return escapeHtml(a.address + (a.postnr ? " " + a.postnr : ""));
            }).slice(0, 3).join("<br>");
            if (addrs.length > 3) {
              addrText += "<br><em>(" + (addrs.length - 3) + " " + (t("moreAddresses") || "flere") + ")</em>";
            }
          }
        }
        html += '<tr class="route-row">';
        html += '  <td class="col-rute route-id-cell">' + escapeHtml(routeId) + "</td>";
        html += '  <td class="col-dist-name"><em>' + escapeHtml(t("noDistributor") || "(Ingen bladb\xE6rer)") + "</em></td>";
        html += '  <td class="col-dist-addr">' + addrText + "</td>";
        html += '  <td class="col-dist-phone"></td>';
        html += '  <td class="col-antall text-center">' + paperCount + "</td>";
        html += "</tr>";
        var notes = (routeObj.notes || "").trim();
        var isEmptyNote = !notes;
        html += '<tr class="notes-row' + (isEmptyNote ? " is-empty" : "") + '">';
        html += "  <td></td>";
        html += '  <td colspan="4"><div class="report-note-editable" contenteditable="true" spellcheck="false" data-placeholder="' + escapeHtml(t("clickToAddNote") || "Click to add note") + '">' + escapeHtml(notes) + "</div></td>";
        html += "</tr>";
      });
      var driverExtra = toInt2(driver.extraPapers) || 0;
      if (driverExtra > 0) {
        totalDriverPapers += driverExtra;
        html += '<tr class="route-row">';
        html += '  <td class="col-rute route-id-cell"><em>' + escapeHtml(t("extraDriverPapers") || "Ekstra blad (kj\xF8rer)") + "</em></td>";
        html += '  <td class="col-dist-name" colspan="3"></td>';
        html += '  <td class="col-antall text-center">' + driverExtra + "</td>";
        html += "</tr>";
      }
      html += "</tbody>";
      html += "<tfoot>";
      html += "<tr>";
      html += '  <td colspan="4" class="text-right"></td>';
      html += '  <td class="col-antall text-center"><strong><u class="double-underline">' + totalDriverPapers + "</u></strong></td>";
      html += "</tr>";
      html += "</tfoot>";
      html += "</table>";
      html += "</div>";
    });
    if (drivers.length === 0) {
      html = '<p class="print-empty">' + escapeHtml(t("printNoDrivers") || "No drivers found to print.") + "</p>";
    }
    return html;
  }
  function parseAddressParts(addrStr) {
    var match = String(addrStr || "").trim().match(/^([^\d]+)\s+(\d.*)$/);
    if (match) {
      return { street: match[1].trim(), num: match[2].trim() };
    }
    return { street: String(addrStr || "").trim(), num: "" };
  }
  function parseNum2(numStr) {
    var m = String(numStr).match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }
  function sortAddressItems(items) {
    return items.slice().sort(function(a, b) {
      var numA = parseNum2(a.num);
      var numB = parseNum2(b.num);
      if (numA !== numB) {
        return numA - numB;
      }
      return String(a.num).localeCompare(String(b.num));
    });
  }
  function renderRouteReportsHtml(routes) {
    var html = "";
    var distByName = {};
    (currentData.distributors || []).forEach(function(d) {
      if (d.name) {
        distByName[d.name] = d;
      }
    });
    var drvByNr = {};
    var drvByName = {};
    (currentData.drivers || []).forEach(function(d) {
      if (d.driverNr) drvByNr[String(d.driverNr).trim()] = d;
      if (d.name) drvByName[String(d.name).trim()] = d;
    });
    routes.forEach(function(routeRow, rIdx) {
      var routeId = normalizeRouteIdentifier(routeRow.routeId || "");
      var pageStyle = rIdx > 0 ? "page-break-before: always;" : "";
      var distName = routeRow.distributor || routeRow.distributorNames || "";
      if (distName.indexOf(",") >= 0) {
        distName = distName.split(",")[0].trim();
      }
      var dist = distByName[distName] || {};
      var driverName = routeRow.driver || dist.driverName || "";
      var driverNr = dist.driverNr || "";
      if (!driverNr && driverName && drvByName[driverName]) {
        driverNr = drvByName[driverName].driverNr || "";
      }
      if (!driverName && driverNr && drvByNr[driverNr]) {
        driverName = drvByNr[driverNr].name || "";
      }
      var phone = dist.phone || "";
      var email = dist.email || "";
      var routeNotes = routeRow.notes || "";
      var routeAddresses = (currentData.addresses || []).filter(function(addr) {
        return normalizeRouteIdentifier(addr.route || "") === routeId;
      });
      var streetMap = {};
      var includedAddressesCount = 0;
      var excludedAddressesCount = 0;
      var includedHouseholds = 0;
      var excludedHouseholds = 0;
      routeAddresses.forEach(function(addr) {
        var parsed = parseAddressParts(addr.address);
        var street = parsed.street || "Uspesifisert gate";
        if (!streetMap[street]) {
          streetMap[street] = {
            street,
            even: [],
            odd: [],
            excluded: []
          };
        }
        var hh = Math.max(1, toInt2(addr.numberOfHouseholds));
        var ex = Math.max(0, toInt2(addr.numberOfExcludedHouseholds));
        if (ex > hh) ex = hh;
        var inc = hh - ex;
        includedHouseholds += inc;
        excludedHouseholds += ex;
        if (inc > 0) {
          includedAddressesCount += 1;
          var item = {
            num: parsed.num,
            hh,
            inc,
            ex,
            raw: addr
          };
          var n = parseNum2(parsed.num);
          if (n % 2 === 0) {
            streetMap[street].even.push(item);
          } else {
            streetMap[street].odd.push(item);
          }
        }
        if (ex > 0) {
          if (inc === 0) {
            excludedAddressesCount += 1;
          }
          streetMap[street].excluded.push({
            num: parsed.num,
            address: addr.address,
            hh,
            ex,
            note: (addr.note || "").trim(),
            raw: addr
          });
        }
      });
      var extraPapers = toInt2(routeRow.extraPapers) || 0;
      var totalPapers = Math.max(0, includedHouseholds + extraPapers);
      html += '<div class="print-page route-report-page">';
      html += '<div class="route-report-header">';
      html += '  <h2 class="print-title"><u class="solid-underline">' + escapeHtml(t("routeReportHeading", { route: routeId }) || "Rute " + routeId + " rapport") + "</u></h2>";
      html += '  <div class="route-report-meta">';
      html += "    <p><strong>" + escapeHtml(t("routeReportDistributor") || "Bladb\xE6rer") + ":</strong> " + escapeHtml(distName || "-") + "</p>";
      if (phone) {
        html += "    <p><strong>" + escapeHtml(t("routeReportPhone") || "Telefon") + ":</strong> " + escapeHtml(phone) + "</p>";
      }
      if (email) {
        html += "    <p><strong>" + escapeHtml(t("routeReportEmail") || "E-post") + ':</strong> <a class="print-link" href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + "</a></p>";
      }
      html += "    <p><strong>" + escapeHtml(t("routeReportDriver") || "Kj\xF8rer") + ":</strong> " + escapeHtml(driverName || "-") + (driverNr ? " (" + escapeHtml(t("kjoererNrLabel") || "Nr.") + " " + escapeHtml(driverNr) + ")" : "") + "</p>";
      html += '    <div class="route-report-notes-field"><strong>' + escapeHtml(t("routeReportNote") || "Merknad") + ':</strong> <span class="report-note-editable" contenteditable="true" spellcheck="false" data-placeholder="' + escapeHtml(t("clickToAddNote") || "Click to add note") + '">' + escapeHtml(routeNotes) + "</span></div>";
      html += "  </div>";
      html += "</div>";
      html += '<hr class="route-report-divider" />';
      html += '<div class="route-report-body">';
      var streetNames = Object.keys(streetMap).sort();
      if (streetNames.length === 0) {
        html += '<p class="route-report-empty-street">' + escapeHtml(t("printNoDrivers") ? "Ingen adresser funnet for denne ruten." : "No addresses found for this route.") + "</p>";
      }
      streetNames.forEach(function(street) {
        var grp = streetMap[street];
        var sortedEven = sortAddressItems(grp.even);
        var sortedOdd = sortAddressItems(grp.odd);
        var sortedExcluded = sortAddressItems(grp.excluded);
        html += '<div class="route-street-block">';
        html += '  <h3 class="route-street-title">' + escapeHtml(street) + "</h3>";
        if (sortedEven.length > 0) {
          var evenStr = sortedEven.map(function(it) {
            return it.inc > 1 ? it.num + " (" + it.inc + ")" : it.num;
          }).join(", ");
          html += '  <div class="route-street-row"><span class="route-num-label"><strong>' + escapeHtml(t("routeReportEven") || "Partall") + ":</strong></span> " + escapeHtml(evenStr) + "</div>";
        }
        if (sortedOdd.length > 0) {
          var oddStr = sortedOdd.map(function(it) {
            return it.inc > 1 ? it.num + " (" + it.inc + ")" : it.num;
          }).join(", ");
          html += '  <div class="route-street-row"><span class="route-num-label"><strong>' + escapeHtml(t("routeReportOdd") || "Oddetall") + ":</strong></span> " + escapeHtml(oddStr) + "</div>";
        }
        if (sortedExcluded.length > 0) {
          html += '  <div class="route-street-excluded-list">';
          sortedExcluded.forEach(function(exItem) {
            var exCountText = exItem.ex > 1 ? " (" + exItem.ex + " " + (t("routeReportHouseholds") || "husstander") + " " + (t("routeReportExcluded") || "ekskludert") + ")" : "";
            var noteSuffix = exItem.note ? ' \u2014 "' + escapeHtml(exItem.note) + '"' : "";
            html += '    <div class="route-excluded-row"><span class="excluded-badge">\u26D4</span> <strong>' + escapeHtml(exItem.num || exItem.address) + "</strong>" + escapeHtml(exCountText) + noteSuffix + "</div>";
          });
          html += "  </div>";
        }
        html += "</div>";
      });
      html += "</div>";
      html += '<hr class="route-report-divider" />';
      html += '<div class="route-report-summary-box">';
      html += '  <table class="route-summary-table">';
      html += "    <tr>";
      html += '      <td class="col-summary-left"><strong>' + escapeHtml(t("routeReportIncludedAddresses") || "Inkluderte adresser") + ":</strong> " + includedAddressesCount + "</td>";
      html += '      <td class="col-summary-right"><strong>' + escapeHtml(t("routeReportExcludedAddresses") || "Ekskluderte adresser") + ":</strong> " + excludedAddressesCount + "</td>";
      html += "    </tr>";
      html += "    <tr>";
      html += '      <td class="col-summary-left"><strong>' + escapeHtml(t("routeReportIncludedHouseholds") || "Husstander (levering)") + ":</strong> " + includedHouseholds + "</td>";
      html += '      <td class="col-summary-right"><strong>' + escapeHtml(t("routeReportExcludedHouseholds") || "Ekskluderte husstander") + ":</strong> " + excludedHouseholds + "</td>";
      html += "    </tr>";
      html += "    <tr>";
      html += '      <td class="col-summary-left"><strong>' + escapeHtml(t("routeReportExtraPapers") || "Ekstra blad") + ":</strong> " + extraPapers + "</td>";
      html += '      <td class="col-summary-right"><strong>' + escapeHtml(t("routeReportTotalPapers") || "Totalt blad") + ':</strong> <u class="double-underline">' + totalPapers + "</u></td>";
      html += "    </tr>";
      html += "  </table>";
      html += "</div>";
      html += "</div>";
    });
    if (routes.length === 0) {
      html = '<p class="print-empty">' + escapeHtml(t("routeReportNoRoutes") || "No routes found to print.") + "</p>";
    }
    return html;
  }

  // web/src/main.js
  var JSON_CACHE_KEY = "source-json-cache";
  var JSON_CACHE_LABEL_KEY = "source-json-cache-label";
  var currentDataFormat = "none";
  var hasUnsavedChanges = false;
  var currentDataSource = { source: "none", label: "" };
  var closeGuardBypass2 = false;
  var closeGuardPending2 = false;
  var lastCommittedDataText = "";
  var hasLoadedEditableSource = false;
  var hasUserCommittedEdits = false;
  var showSaveChanges = false;
  var currentFileHandle = null;
  function setHasUserCommittedEdits(val) {
    hasUserCommittedEdits = val;
  }
  function setShowSaveChanges(val) {
    showSaveChanges = val;
  }
  var DEBUG_SAVE_CHANGES = true;
  function getDataSourceText(source, label) {
    if (source === "default") {
      return t("dataSourceDefault", { label: label || "source.json" });
    }
    if (source === "file") {
      return t("dataSourceFile", { label: label || "file" });
    }
    if (source === "idb-cache") {
      return t("dataSourceIdbCache", { label: label || "cached" });
    }
    if (source === "local-cache") {
      return t("dataSourceLocalCache", { label: label || "cached" });
    }
    if (source === "snapshot") {
      return t("dataSourceSnapshot");
    }
    if (source === "none") {
      return t("dataSourceNone");
    }
    return t("dataSourceUnknown", { label: label || source || "-" });
  }
  function renderDataSourceIndicator() {
    setText("data-source-label", t("dataSourceLabel"));
    setText("data-source-value", getDataSourceText(currentDataSource.source, currentDataSource.label));
  }
  function setDataSource(source, label) {
    currentDataSource = {
      source: source || "none",
      label: label || ""
    };
    renderDataSourceIndicator();
  }
  function applyLanguage(lang) {
    var newLang = setLang(lang);
    localStorage.setItem("ui-lang", newLang);
    document.documentElement.lang = newLang;
    document.title = t("title");
    setText("lang-label", t("langLabel"));
    setText("title", t("title"));
    setText("subtitle", t("subtitle"));
    renderDataSourceIndicator();
    setText("save-changes", t("saveChangesAction"));
    setText("save-as-copy", t("saveAsCopyAction"));
    setAttr("save-dropdown-toggle", "aria-label", t("saveMoreOptions"));
    setText("open-user-guide", t("userGuideAction"));
    setText("choose-file-label", t("chooseFile"));
    setAttr("floating-guide-btn", "title", t("userGuideAction"));
    setAttr("floating-guide-btn", "aria-label", t("userGuideAction"));
    setText("derived-note", t("derivedValuesNote"));
    setText("settings-label", t("settings"));
    setAttr("language-select", "aria-label", t("ariaLanguageSelect"));
    setAttr("tabs-nav", "aria-label", t("ariaDataViews"));
    setAttr("dash-table", "aria-label", t("ariaDashboardTable"));
    setAttr("drivers-table", "aria-label", t("ariaDriversTable"));
    setAttr("distributors-table", "aria-label", t("ariaDistributorsTable"));
    setAttr("addresses-table", "aria-label", t("ariaAddressesTable"));
    setText("map-info-single", t("mapInfoSingle"));
    setHtml("map-info-add", t("mapInfoAdd"));
    setHtml("map-info-reassign", t("mapInfoReassign"));
    setText("map-info-batch", t("mapInfoBatch"));
    setHtml("map-info-add-multiple", t("mapInfoAddMultiple"));
    setHtml("map-info-reassign-multiple", t("mapInfoReassignMultiple"));
    setText("map-info-other", t("mapInfoOther"));
    setHtml("map-info-filter", t("mapInfoFilter"));
    setText("add-address-map-title", t("mapAddAddressTitle"));
    setText("add-address-map-route-label", t("mapSelectRoute"));
    setText("add-address-map-btn-close", t("mapBtnClose"));
    setText("add-address-map-btn-confirm", t("mapBtnConfirm"));
    setHtml("batch-status-info", t("infoBatchStatus"));
    setHtml("batch-route-info", t("infoBatchRoute"));
    setHtml("report-modal-info", t("infoReportModal"));
    setHtml("route-report-modal-info", t("infoRouteReportModal"));
    setHtml("add-address-map-info", t("infoAddAddressMap"));
    setHtml("reassign-route-info", t("infoReassignRoute"));
    setText("reassign-route-title", t("mapReassignTitle"));
    setText("reassign-route-label", t("mapSelectRoute"));
    setText("reassign-route-btn-close", t("mapBtnClose"));
    setText("reassign-route-btn-confirm", t("mapReassignBtnSelect"));
    setText("delete-address-map-title", t("mapDeleteTitle"));
    setText("delete-address-map-btn-cancel", t("mapBtnCancel"));
    setText("delete-address-map-btn-confirm", t("mapBtnDelete"));
    setText("map-title-text", t("tabMap"));
    setText("delete-address-map-confirm-prompt", t("mapDeleteConfirmPrompt"));
    setText("delete-address-map-confirm-suffix", t("mapDeleteConfirmSuffix"));
    setText("source-missing-title", t("sourceMissingTitle"));
    setText("source-missing-message", t("sourceMissingMessage"));
    setText("open-data-folder", t("openDataFolder"));
    setAttr("routes-table", "aria-label", t("ariaRoutesTable"));
    setAttr("edit-modal-close", "aria-label", t("ariaClose"));
    setAttr("batch-status-close", "aria-label", t("ariaClose"));
    setAttr("delete-modal-close", "aria-label", t("ariaClose"));
    setAttr("load-result-close", "aria-label", t("ariaClose"));
    setAttr("user-guide-close", "aria-label", t("ariaClose"));
    setText("tab-dashboard", t("tabDashboard"));
    setText("tab-drivers", t("tabDrivers"));
    setText("tab-distributors", t("tabDistributors"));
    setText("tab-addresses", t("tabAddresses"));
    setText("tab-routes", t("tabRoutes"));
    setText("tab-map", t("tabMap"));
    setText("map-title-text", t("tabMap"));
    setText("map-route-filter-label", t("mapRouteFilterLabel"));
    setText("map-info-add-multiple", t("mapGuideAddMultiple"));
    setText("map-info-filter", t("mapGuideFilterHelp"));
    setText("dashboard-title", t("dashboardTitle"));
    setText("drivers-title", t("driversTitle"));
    setText("distributors-title", t("distributorsTitle"));
    setText("addresses-title", t("addressesTitle"));
    setText("col-metric", t("colMetric"));
    setText("col-active", t("colActive"));
    setText("col-inactive", t("colInactive"));
    setText("col-total", t("colTotal"));
    setText("row-addresses", t("rowAddresses"));
    setText("row-households", t("rowHouseholds"));
    setText("row-extra-papers", t("rowExtraPapers"));
    setText("row-drivers", t("rowDrivers"));
    setText("row-distributors", t("rowDistributors"));
    setText("row-papers", t("rowPapers"));
    setText("dash-dist-no-driver-label", t("dashDistNoDriverLabel"));
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      setText("filter-route-label-" + tableName, t("filterRouteLabel"));
      setText("filter-status-label-" + tableName, t("filterStatusLabel"));
      setText("filter-distributor-label-" + tableName, t("filterDistributorNameLabel"));
      setText("filter-driver-label-" + tableName, t("filterDriverNameLabel"));
      setText("filter-postnr-label-" + tableName, t("filterPostnrLabel"));
      setText("filter-active-label-" + tableName, t("filterActiveLabel"));
      setText("reset-filters-" + tableName, t("resetFilters"));
      setPlaceholder("filter-" + tableName + "-route", t("filterRoutePlaceholder"));
      setPlaceholder("filter-" + tableName + "-status", t("filterStatusPlaceholder"));
      setPlaceholder("filter-" + tableName + "-distributor", t("filterDistributorNamePlaceholder"));
      setPlaceholder("filter-" + tableName + "-distributorName", t("filterDistributorNamePlaceholder"));
      setPlaceholder("filter-" + tableName + "-driver", t("filterDriverNamePlaceholder"));
      setPlaceholder("filter-" + tableName + "-driverName", t("filterDriverNamePlaceholder"));
      setPlaceholder("filter-" + tableName + "-postnr", t("filterPostnrPlaceholder"));
      setPlaceholder("filter-" + tableName + "-active", t("filterActivePlaceholder"));
      setText("pager-per-page-label-" + tableName, t("pagerRows"));
      setText("page-prev-" + tableName, t("pagerPrev"));
      setText("page-next-" + tableName, t("pagerNext"));
    });
    setText("filter-address-label-addresses", t("filterAddressLabel"));
    setPlaceholder("filter-addresses-address", t("filterAddressPlaceholder"));
    setText("filter-addresses-only-excluded-label", t("filterAddressesOnlyExcluded"));
    setText("filter-addresses-with-excluded-label", t("filterAddressesWithExcluded"));
    document.querySelectorAll(".clear-filter-btn").forEach(function(btn) {
      btn.textContent = "\xD7";
      btn.setAttribute("aria-label", t("clearFilter"));
      btn.title = t("clearFilter");
    });
    setText("drivers-col-name", t("driversColName"));
    setText("drivers-col-status", t("driversColStatus"));
    setText("drivers-col-drivernr", t("driversColDriverNo"));
    setText("drivers-col-phone", t("driversColPhone"));
    setText("drivers-col-email", t("driversColEmail"));
    setText("drivers-col-address", t("driversColAddress"));
    setText("drivers-col-postnr", t("driversColPostnr"));
    setText("drivers-col-routecount", t("driversColRouteCount"));
    setText("drivers-col-papercount", t("driversColPaperCount"));
    setText("drivers-col-actions", t("actionsCol"));
    setText("batch-status-drivers", t("batchStatusAction"));
    setText("batch-delete-drivers", t("batchDeleteAction"));
    setText("add-driver", t("addAction"));
    setText("dist-col-name", t("distColName"));
    setText("dist-col-status", t("distColStatus"));
    setText("dist-col-route", t("distColRoute"));
    setText("dist-col-drivernr", t("routeColDriverName"));
    setText("dist-col-phone", t("distColPhone"));
    setText("dist-col-email", t("distColEmail"));
    setText("dist-col-address", t("distColAddress"));
    setText("dist-col-postnr", t("distColPostnr"));
    setText("dist-col-extrapapers", t("rowExtraPapers"));
    setText("dist-col-papercount", t("distColPaperCount"));
    setText("dist-col-actions", t("actionsCol"));
    setText("batch-status-distributors", t("batchStatusAction"));
    setText("batch-delete-distributors", t("batchDeleteAction"));
    setText("add-distributor", t("addAction"));
    setText("addr-col-address", t("addrColAddress"));
    setText("addr-col-route", t("addrColRoute"));
    setText("addr-col-distributor", t("addrColDistributor"));
    setText("addr-col-households", t("addrColHouseholds"));
    setText("addr-col-excluded-households", t("addrColExcludedHouseholds"));
    setText("addr-col-postnr", t("addrColPostnr"));
    setText("addr-col-note", t("addrColNote"));
    setText("addr-col-actions", t("actionsCol"));
    setText("batch-delete-addresses", t("batchDeleteAction"));
    setText("add-address", t("addAction"));
    setText("routes-title", t("routesTitle"));
    setText("routes-col-id", t("routeColId"));
    setText("routes-col-lettergroup", t("routeColLetterGroup"));
    setText("routes-col-status", t("distColStatus"));
    setText("routes-col-drivernr", t("routeColDriverName"));
    setText("routes-col-distributors", t("routeColDistributors"));
    setText("routes-col-addresses", t("routeColAddresses"));
    setText("routes-col-extrapapers", t("rowExtraPapers"));
    setText("routes-col-papers", t("routeColPapers"));
    setText("routes-col-actions", t("actionsCol"));
    setText("print-all-drivers", t("printAllAction"));
    setText("print-all-routes", t("routeReportPrintAll"));
    setText("batch-status-routes", t("batchStatusAction"));
    setText("batch-delete-routes", t("batchDeleteAction"));
    setText("add-route", t("addAction"));
    setText("row-unassigned", t("rowUnassignedRoutes"));
    setText("row-routes", t("rowRoutes"));
    setText("dash-addr-affected-label", t("dashAddressesAffected"));
    setText("dash-hh-affected-label", t("dashHouseholdsAffected"));
    setText("dash-addr-inc-label", t("dashIncluded"));
    setText("dash-addr-exc-label", t("dashExcluded"));
    setText("dash-hh-inc-label", t("dashIncluded"));
    setText("dash-hh-exc-label", t("dashExcluded"));
    setText("dash-hh-un-label", t("dashUnassigned"));
    setText("dash-routes-ass-label", t("dashAssigned"));
    setText("dash-routes-un-label", t("dashUnassigned"));
    setText("dash-routes-act-label", t("dashActive"));
    setText("dash-routes-ina-label", t("dashInactive"));
    setText("dash-drv-act-label", t("dashPersonnelActive"));
    setText("dash-drv-ina-label", t("dashPersonnelInactive"));
    setText("dash-dist-act-label", t("dashPersonnelActive"));
    setText("dash-dist-ina-label", t("dashPersonnelInactive"));
    setText("export-dashboard", t("exportAction") + " \u25BE");
    setText("export-drivers", t("exportAction") + " \u25BE");
    setText("export-distributors", t("exportAction") + " \u25BE");
    setText("export-addresses", t("exportAction") + " \u25BE");
    setText("export-routes", t("exportAction") + " \u25BE");
    setText("status", t("statusReady"));
    setText("row-personnel", t("rowPersonnel"));
    setText("routes-col-description", t("routesColDescription"));
    setText("routes-col-notes", t("routesColNotes"));
    setText("edit-modal-title", t("editModalTitle"));
    setText("batch-status-title", t("batchStatusTitle"));
    setText("batch-route-title", t("batchRouteTitle"));
    setText("batch-route-label", t("batchRouteLabel"));
    setText("batch-route-cancel", t("btnCancel"));
    setText("batch-route-apply", t("batchRouteApply"));
    setText("delete-modal-title", t("deleteModalTitle"));
    setText("delete-modal-transfer-label", t("deleteModalTransferLabel"));
    setText("user-guide-content", t("userGuideLoading"));
    setText("report-modal-title", t("reportModalTitle"));
    setText("report-modal-print", t("reportModalPrint"));
    setText("route-report-modal-title", t("routeReportModalTitle"));
    setText("route-report-modal-print", t("reportModalPrint"));
    setText("batch-route-addresses", t("batchRouteAction"));
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      setText("selected-chip-" + tableName, t("selectedChipEmpty"));
      setText("page-info-" + tableName, t("pageInfoEmpty"));
      setText(tableName + "-totals", t("totalsEmpty"));
    });
    setText("batch-status-label", t("batchStatusLabel"));
    setText("batch-status-cancel", t("modalCancel"));
    setText("batch-status-apply", t("batchStatusApply"));
    setText("merge-routes-title", t("mergeRoutesTitle"));
    setText("merge-routes-message", t("mergeRoutesMessage"));
    setText("merge-routes-cancel", t("modalCancel"));
    setText("merge-routes-apply", t("mergeRoutesApply"));
    setText("merge-routes-btn", t("btnMergeRoutes"));
    setText("edit-modal-cancel", t("modalCancel"));
    setText("edit-modal-save", t("modalSave"));
    setText("delete-modal-cancel", t("modalCancel"));
    setText("delete-modal-confirm", t("deleteConfirm"));
    setText("load-result-title", t("loadResultTitle"));
    setText("load-result-ok", t("loadResultOk"));
    setText("user-guide-title", t("userGuideTitle"));
    setText("user-guide-ok", t("loadResultOk"));
    setText("close-guard-title", t("closeGuardTitle"));
    setText("close-guard-message", t("closeGuardMessage"));
    setText("close-guard-save", t("closeGuardSave"));
    setText("close-guard-continue", t("closeGuardContinue"));
    setText("close-guard-close", t("closeGuardClose"));
    setText("source-missing-title", t("sourceMissingTitle"));
    setText("source-missing-message", t("sourceMissingMessage"));
    setText("open-data-folder", t("openDataFolderAction"));
    if (editState.tableName) {
      editModalTitle.textContent = editState.mode === "add" ? t("addRowTitle", { table: t(tableTitleKeys[editState.tableName]) }) : t("editRowTitle", { table: t(tableTitleKeys[editState.tableName]) });
    } else {
      editModalTitle.textContent = t("editRowTitle", { table: "" }).trim();
    }
    if (!statusEl.dataset.loaded) {
      statusEl.textContent = t("statusReady");
    }
    if (languageSelect.value !== currentLang) {
      languageSelect.value = currentLang;
    }
    if (statusEl.dataset.loaded) {
      renderAllTables();
    }
    updateUnsavedChangesUi();
    ["drivers", "distributors", "addresses", "routes"].forEach(function(tableName) {
      var selectAll = document.getElementById("select-all-" + tableName);
      if (selectAll) {
        selectAll.setAttribute("aria-label", t("selectCol"));
      }
      updateBatchControls(tableName);
    });
  }
  function setText(id, value) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.textContent = String(value);
  }
  function setHtml(id, value) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.innerHTML = String(value);
  }
  function setPlaceholder(id, value) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    try {
      var show = true;
      var cur = String(el.value || "").trim();
      if (cur) {
        show = false;
      } else {
        var parts = id.split("-");
        if (parts.length >= 3) {
          var table = parts[1];
          var field = parts.slice(2).join("-");
          if (filterState && filterState[table] && Array.isArray(filterState[table][field]) && filterState[table][field].length) {
            show = false;
          }
        }
      }
      el.placeholder = show ? String(value) : "";
    } catch (e) {
      el.placeholder = String(value);
    }
  }
  function setAttr(id, name, value) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.setAttribute(name, String(value));
  }
  function render(metrics) {
    setText("addr-included", metrics.addrIncluded);
    setText("addr-excluded", metrics.addrExcluded);
    setText("addr-total", metrics.addrTotal);
    setText("addr-unassigned", metrics.addrUnassigned);
    setText("hh-unassigned-main", metrics.householdsUnassigned);
    setText("hh-included", metrics.householdsIncluded);
    setText("hh-excluded", metrics.householdsExcluded);
    setText("hh-unassigned", metrics.householdsUnassigned);
    setText("hh-total", metrics.householdsTotal);
    setText("extra-papers", metrics.extraPapersTotal);
    setText("routes-assigned", metrics.routesAssigned);
    setText("routes-unassigned", metrics.routesUnassigned);
    setText("routes-unassigned-main", metrics.routesUnassigned);
    setText("routes-total", metrics.routesTotal);
    setText("routes-active", metrics.routesActive);
    setText("routes-inactive", metrics.routesInactive);
    setText("drv-active", metrics.drvActive);
    setText("drv-inactive", metrics.drvInactive);
    setText("drv-total", metrics.drvTotal);
    setText("dist-active", metrics.distActive);
    setText("dist-inactive", metrics.distInactive);
    setText("dist-total", metrics.distTotal);
    var noDriverRow = document.getElementById("dash-dist-no-driver-row");
    if (noDriverRow) {
      if (metrics.distActiveNoDriver > 0) {
        noDriverRow.removeAttribute("hidden");
        setText("dist-no-driver", metrics.distActiveNoDriver);
      } else {
        noDriverRow.setAttribute("hidden", "");
      }
    }
    setText("papers-to-order", metrics.papersToOrder);
  }
  function recalculateAndRenderDashboard() {
    recalculatePaperCounts();
    render(recomputeMetricsFromCurrentData());
  }
  function getStatusLabel(value) {
    var v = (value || "").toLowerCase();
    if (v === "active") {
      return t("statusActive");
    }
    if (v === "inactive") {
      return t("statusInactive");
    }
    if (v === "included") {
      return t("statusIncluded");
    }
    if (v === "excluded") {
      return t("statusExcluded");
    }
    return value || "";
  }
  function setBodyRows(bodyId, rowsHtml) {
    var body = document.getElementById(bodyId);
    body.innerHTML = rowsHtml;
  }
  var fieldFormatValidators = {
    email: {
      test: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
      },
      i18nKey: "validEmail"
    },
    phone: {
      test: function(v) {
        return !v || /^[+0-9()\s\-]{5,30}$/.test(v);
      },
      i18nKey: "validPhone"
    },
    postnr: {
      test: function(v) {
        return !v || /^\d{4}$/.test(v);
      },
      i18nKey: "validPostnr"
    },
    houseNo: {
      test: function(v) {
        return !v || /^\d+[A-Za-z]?$/.test(v);
      },
      i18nKey: "validHouseNo"
    },
    numberOfHouseholds: {
      test: function(v) {
        return !v || /^(?:[1-9]\d*)$/.test(v);
      },
      i18nKey: "validHouseholdCount"
    },
    numberOfExcludedHouseholds: {
      test: function(v) {
        return !v || /^(?:0|[1-9]\d*)$/.test(v);
      },
      i18nKey: "validExcludedHouseholdCount"
    },
    extraPapers: {
      test: function(v) {
        return !v || /^-?(?:0|[1-9]\d*)$/.test(v);
      },
      i18nKey: "validExtraPapersCount"
    },
    driverNr: {
      test: function(v) {
        return !v || /^[\w\-/]+$/.test(v);
      },
      i18nKey: "validDriverNr"
    }
  };
  function getRequiredFields(tableName) {
    var modeMap = requiredFieldsByMode[editState.mode] || requiredFieldsByMode.edit;
    return modeMap[tableName] || [];
  }
  function getFieldLabel(tableName, fieldName) {
    var labelKey = (fieldLabelKeyByTable[tableName] || {})[fieldName] || fieldName;
    return t(labelKey);
  }
  function validateRequiredFields(tableName, row) {
    var requiredFields = getRequiredFields(tableName);
    var missing = [];
    requiredFields.forEach(function(fieldName) {
      var value = row[fieldName];
      if (Array.isArray(value)) {
        if (!value.length) {
          missing.push(getFieldLabel(tableName, fieldName));
        }
      } else if (String(value == null ? "" : value).trim() === "") {
        missing.push(getFieldLabel(tableName, fieldName));
      }
    });
    return missing;
  }
  function validateFieldFormats(tableName, row, fieldNames) {
    var errors = [];
    fieldNames.forEach(function(fieldName) {
      var validator = fieldFormatValidators[fieldName];
      if (!validator) {
        return;
      }
      var value = String(row[fieldName] == null ? "" : row[fieldName]).trim();
      if (!validator.test(value)) {
        var msg = t(validator.i18nKey);
        var label = getFieldLabel(tableName, fieldName);
        errors.push({
          fieldName,
          message: msg,
          text: label + ": " + msg
        });
      }
    });
    return errors;
  }
  function asComparable(value) {
    if (Array.isArray(value)) {
      return { type: "str", value: value.map(function(item) {
        return String(item == null ? "" : item).trim().toLowerCase();
      }).filter(Boolean).join(",") };
    }
    var v = (value == null ? "" : String(value)).trim();
    var num = Number(v.replace(/\s+/g, "").replace(",", "."));
    if (!Number.isNaN(num) && /^-?\d+(?:[.,]\d+)?$/.test(v.replace(/\s+/g, ""))) {
      return { type: "num", value: num };
    }
    return { type: "str", value: v.toLowerCase() };
  }
  function canEditCurrentData() {
    return currentDataFormat === "json";
  }
  function syncCurrentDataFromJson() {
    currentData.addresses = normalizeRecords(currentData.addresses).map(function(row) {
      return normalizeAddressRow(row);
    });
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    clearAllBatchSelections();
    persistRecordSnapshot({
      drivers: currentData.drivers,
      distributors: currentData.distributors,
      addresses: currentData.addresses,
      routes: currentData.routes
    });
  }
  function makeBackupTimestamp() {
    return (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
  }
  function serializeCurrentJsonData() {
    function stripDerivedForDrivers(rows) {
      if (!rows) return [];
      var result = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var out = {};
        for (var key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            if (!key.startsWith("__") && key !== "routeCount" && key !== "paperCount" && key !== "routes" && key !== "distributorName") {
              out[key] = row[key];
            }
          }
        }
        result[i] = out;
      }
      return result;
    }
    function stripDerivedForDistributors(rows) {
      if (!rows) return [];
      var result = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var out = {};
        for (var key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            if (!key.startsWith("__") && key !== "paperCount") {
              out[key] = row[key];
            }
          }
        }
        result[i] = out;
      }
      return result;
    }
    function stripDerivedForRoutes(rows) {
      if (!rows) return [];
      var result = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var out = {};
        for (var key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            if (!key.startsWith("__") && key !== "paperCount" && key !== "includedAddresses" && key !== "distributorCount" && key !== "distributorNames" && key !== "postnrs" && key !== "letterGroup" && key !== "driverNr") {
              if (key === "driver" && row.requiresDistributor !== false) {
                continue;
              }
              out[key] = row[key];
            }
          }
        }
        result[i] = out;
      }
      return result;
    }
    function stripDerivedForAddresses(rows) {
      if (!rows) return [];
      var result = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var out = {};
        for (var key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            if (!key.startsWith("__") && key !== "status" && key !== "street" && key !== "houseNo" && key !== "extraPapers" && key !== "distributor" && key !== "driverName") {
              out[key] = row[key];
            }
          }
        }
        result[i] = out;
      }
      return result;
    }
    return {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      schemaVersion: 1,
      drivers: stripDerivedForDrivers(currentData.drivers),
      distributors: stripDerivedForDistributors(currentData.distributors),
      addresses: stripDerivedForAddresses(currentData.addresses),
      routes: stripDerivedForRoutes(currentData.routes)
    };
  }
  function debugSaveChangesLog(eventName, extra) {
    if (!DEBUG_SAVE_CHANGES) {
      return;
    }
    var state = {
      event: eventName,
      showSaveChanges,
      hasLoadedEditableSource,
      hasUnsavedChanges,
      hasUserCommittedEdits,
      currentDataFormat
    };
    if (extra && typeof extra === "object") {
      Object.keys(extra).forEach(function(k) {
        state[k] = extra[k];
      });
    }
    console.log("[save-changes-debug]", state);
  }
  function updateUnsavedChangesUi() {
    if (!saveChangesBtn) {
      debugSaveChangesLog("updateUnsavedChangesUi:no-button");
      return;
    }
    if (hasLoadedEditableSource && currentDataFormat === "json" && showSaveChanges) {
      saveChangesBtn.removeAttribute("hidden");
      saveChangesBtn.hidden = false;
      if (saveGroup) {
        saveGroup.removeAttribute("hidden");
        saveGroup.hidden = false;
      }
      debugSaveChangesLog("updateUnsavedChangesUi:show");
    } else {
      saveChangesBtn.setAttribute("hidden", "");
      saveChangesBtn.hidden = true;
      if (saveGroup) {
        saveGroup.setAttribute("hidden", "");
        saveGroup.hidden = true;
      }
      if (saveDropdownMenu) {
        saveDropdownMenu.style.display = "none";
      }
      if (saveDropdownToggle) {
        saveDropdownToggle.setAttribute("aria-expanded", "false");
      }
      debugSaveChangesLog("updateUnsavedChangesUi:hide");
    }
  }
  function getComparableDataText() {
    var data = serializeCurrentJsonData();
    if (data && Object.prototype.hasOwnProperty.call(data, "exportedAt")) {
      delete data.exportedAt;
    }
    return JSON.stringify(data);
  }
  function refreshUnsavedChangesFromData() {
    if (currentDataFormat !== "json" || !hasLoadedEditableSource) {
      hasUnsavedChanges = false;
      showSaveChanges = false;
      debugSaveChangesLog("refreshUnsavedChangesFromData:reset-not-editable");
      updateUnsavedChangesUi();
      return;
    }
    hasUnsavedChanges = showSaveChanges;
    debugSaveChangesLog("refreshUnsavedChangesFromData:set-from-flag");
    updateUnsavedChangesUi();
  }
  async function saveChangesToSource() {
    if (currentDataFormat !== "json" || !hasLoadedEditableSource) {
      debugSaveChangesLog("saveChangesToSource:blocked-not-editable");
      return false;
    }
    updateUnsavedChangesUi();
    if (!showSaveChanges) {
      debugSaveChangesLog("saveChangesToSource:blocked-flag-false");
      return false;
    }
    var jsonText = JSON.stringify(serializeCurrentJsonData(), null, 2);
    saveJsonCache(jsonText, "source.json (edited)");
    if (currentFileHandle && currentFileHandle.createWritable) {
      try {
        const writable = await currentFileHandle.createWritable();
        await writable.write(jsonText);
        await writable.close();
      } catch (e) {
        console.error("Failed to quick save via file handle", e);
        saveTextDownload("source.json", jsonText, "application/json;charset=utf-8");
      }
    } else {
      saveTextDownload("source.json", jsonText, "application/json;charset=utf-8");
    }
    lastCommittedDataText = getComparableDataText();
    hasUnsavedChanges = false;
    hasUserCommittedEdits = false;
    showSaveChanges = false;
    debugSaveChangesLog("saveChangesToSource:saved-and-reset");
    updateUnsavedChangesUi();
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusSavedNow");
    return true;
  }
  async function saveChangesToSourceCopy() {
    if (currentDataFormat !== "json" || !hasLoadedEditableSource) {
      debugSaveChangesLog("saveChangesToSourceCopy:blocked-not-editable");
      return false;
    }
    var jsonText = JSON.stringify(serializeCurrentJsonData(), null, 2);
    const now = /* @__PURE__ */ new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const yyyy = now.getFullYear();
    const mmm = monthNames[now.getMonth()];
    const dd = String(now.getDate()).padStart(2, "0");
    const suggestedName = `source_${dd}_${mmm}_${yyyy}.json`;
    let saved = false;
    try {
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{
            description: "JSON Files",
            accept: { "application/json": [".json"] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(jsonText);
        await writable.close();
        saved = true;
        statusEl.dataset.loaded = "1";
        statusEl.textContent = t("statusSavedCopyNow") || "Copy saved.";
      } else {
        saveTextDownload(suggestedName, jsonText, "application/json;charset=utf-8");
        saved = true;
        statusEl.dataset.loaded = "1";
        statusEl.textContent = t("statusSavedCopyNow") || "Copy downloaded.";
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to save copy via file handle", err);
        saveTextDownload(suggestedName, jsonText, "application/json;charset=utf-8");
        saved = true;
        statusEl.dataset.loaded = "1";
        statusEl.textContent = t("statusSavedCopyNow") || "Copy downloaded.";
      }
    }
    if (saved) {
      saveJsonCache(jsonText, suggestedName);
      lastCommittedDataText = getComparableDataText();
      hasUnsavedChanges = false;
      hasUserCommittedEdits = false;
      showSaveChanges = false;
      debugSaveChangesLog("saveChangesToSourceCopy:saved-and-reset");
      updateUnsavedChangesUi();
      return true;
    }
    return false;
  }
  function scheduleAutosave() {
    if (!showSaveChanges) {
      hasUnsavedChanges = false;
      debugSaveChangesLog("scheduleAutosave:no-pending");
      updateUnsavedChangesUi();
      return;
    }
    hasUnsavedChanges = true;
    debugSaveChangesLog("scheduleAutosave:pending");
    updateUnsavedChangesUi();
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusChangesPending");
  }
  function csvEscape(value) {
    var text = String(value == null ? "" : value);
    if (/[",\r\n]/.test(text)) {
      return '"' + text.replace(/"/g, '""') + '"';
    }
    return text;
  }
  function toCsvText(headers, rows) {
    var lines = [];
    lines.push(headers.map(csvEscape).join(","));
    rows.forEach(function(row) {
      lines.push(headers.map(function(h) {
        return csvEscape(row[h]);
      }).join(","));
    });
    return lines.join("\r\n");
  }
  function getDashboardExportData() {
    recalculateAndRenderDashboard();
    var metrics = recomputeMetricsFromCurrentData();
    var metricLabel = t("colMetric");
    var totalLabel = t("colTotal");
    var includedLabel = t("statusIncluded");
    var excludedLabel = t("statusExcluded");
    var unassignedLabel = t("statusUnassigned");
    var assignedLabel = t("statusAssigned");
    var activeLabel = t("statusActive");
    var inactiveLabel = t("statusInactive");
    var extraLabel = t("rowExtraPapers");
    var headers = [metricLabel, totalLabel, includedLabel, excludedLabel, unassignedLabel, assignedLabel, activeLabel, inactiveLabel, extraLabel];
    var rowObjects = [
      {
        [metricLabel]: t("rowAddresses"),
        [totalLabel]: metrics.addrTotal,
        [includedLabel]: metrics.addrIncluded,
        [excludedLabel]: metrics.addrExcluded,
        [unassignedLabel]: metrics.addrUnassigned,
        [assignedLabel]: metrics.addrIncluded + metrics.addrExcluded,
        [activeLabel]: "",
        [inactiveLabel]: "",
        [extraLabel]: ""
      },
      {
        [metricLabel]: t("rowHouseholds"),
        [totalLabel]: metrics.householdsTotal,
        [includedLabel]: metrics.householdsIncluded,
        [excludedLabel]: metrics.householdsExcluded,
        [unassignedLabel]: metrics.householdsUnassigned,
        [assignedLabel]: metrics.householdsIncluded + metrics.householdsExcluded,
        [activeLabel]: "",
        [inactiveLabel]: "",
        [extraLabel]: ""
      },
      {
        [metricLabel]: t("rowRoutes"),
        [totalLabel]: metrics.routesTotal,
        [includedLabel]: "",
        [excludedLabel]: "",
        [unassignedLabel]: metrics.routesUnassigned,
        [assignedLabel]: metrics.routesAssigned,
        [activeLabel]: metrics.routesActive,
        [inactiveLabel]: metrics.routesInactive,
        [extraLabel]: ""
      },
      {
        [metricLabel]: t("rowPapers"),
        [totalLabel]: metrics.papersToOrder,
        [includedLabel]: metrics.householdsIncluded,
        [excludedLabel]: "",
        [unassignedLabel]: "",
        [assignedLabel]: "",
        [activeLabel]: "",
        [inactiveLabel]: "",
        [extraLabel]: metrics.extraPapersTotal
      },
      {
        [metricLabel]: t("rowDrivers"),
        [totalLabel]: metrics.drvTotal,
        [includedLabel]: "",
        [excludedLabel]: "",
        [unassignedLabel]: "",
        [assignedLabel]: "",
        [activeLabel]: metrics.drvActive,
        [inactiveLabel]: metrics.drvInactive,
        [extraLabel]: ""
      },
      {
        [metricLabel]: t("rowDistributors"),
        [totalLabel]: metrics.distTotal,
        [includedLabel]: "",
        [excludedLabel]: "",
        [unassignedLabel]: "",
        [assignedLabel]: "",
        [activeLabel]: metrics.distActive,
        [inactiveLabel]: metrics.distInactive,
        [extraLabel]: ""
      },
      {
        [metricLabel]: t("rowUnassignedRoutes"),
        [totalLabel]: metrics.routesUnassigned,
        [includedLabel]: "",
        [excludedLabel]: "",
        [unassignedLabel]: metrics.addrUnassigned,
        [assignedLabel]: "",
        [activeLabel]: "",
        [inactiveLabel]: "",
        [extraLabel]: ""
      }
    ];
    var rowArrays = rowObjects.map(function(r) {
      return headers.map(function(h) {
        return r[h] !== void 0 ? r[h] : "";
      });
    });
    return {
      headers,
      rowObjects,
      rowArrays
    };
  }
  function exportDashboardCsv() {
    var data = getDashboardExportData();
    saveTextDownload("dashboard.csv", "\uFEFF" + toCsvText(data.headers, data.rowObjects), "text/csv;charset=utf-8");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: t("dashboardTitle"), count: data.rowObjects.length });
  }
  function exportTableCsv(tableName) {
    recalculateAndRenderDashboard();
    var rows = getFilteredSortedRows(tableName);
    var headers = [];
    var mappedRows = [];
    if (tableName === "drivers") {
      var dName = t("driversColName");
      var dStatus = t("driversColStatus");
      var dDriverNo = t("driversColDriverNo");
      var dPhone = t("driversColPhone");
      var dEmail = t("driversColEmail");
      var dAddress = t("driversColAddress");
      var dPostnr = t("driversColPostnr");
      var dRouteCount = t("driversColRouteCount");
      var dPaperCount = t("driversColPaperCount");
      var dRoutes = t("totalsRoutes");
      var dDistributors = t("totalsDistributors");
      headers = [dName, dStatus, dDriverNo, dPhone, dEmail, dAddress, dPostnr, dRouteCount, dPaperCount, dRoutes, dDistributors];
      mappedRows = rows.map(function(r) {
        return {
          [dName]: r.name || "",
          [dStatus]: r.status || "",
          [dDriverNo]: r.driverNr || "",
          [dPhone]: r.phone || "",
          [dEmail]: r.email || "",
          [dAddress]: r.address || "",
          [dPostnr]: r.postnr || "",
          [dRouteCount]: r.routeCount || "",
          [dPaperCount]: r.paperCount || "",
          [dRoutes]: r.routes || "",
          [dDistributors]: r.distributorName || ""
        };
      });
    } else if (tableName === "distributors") {
      var dsName = t("distColName");
      var dsStatus = t("distColStatus");
      var dsRoute = t("distColRoute");
      var dsDriverNo = t("driversColDriverNo");
      var dsDriver = t("routeColDriverName");
      var dsPhone = t("distColPhone");
      var dsEmail = t("distColEmail");
      var dsAddress = t("distColAddress");
      var dsPostnr = t("distColPostnr");
      var dsPaperCount = t("distColPaperCount");
      headers = [dsName, dsStatus, dsRoute, dsDriverNo, dsDriver, dsPhone, dsEmail, dsAddress, dsPostnr, dsPaperCount];
      mappedRows = rows.map(function(r) {
        return {
          [dsName]: r.name || "",
          [dsStatus]: r.status || "",
          [dsRoute]: getDistributorRoutes(r).join(", "),
          [dsDriverNo]: r.driverNr || "",
          [dsDriver]: r.driverName || "",
          [dsPhone]: r.phone || "",
          [dsEmail]: r.email || "",
          [dsAddress]: r.address || "",
          [dsPostnr]: r.postnr || "",
          [dsPaperCount]: r.paperCount || ""
        };
      });
    } else if (tableName === "addresses") {
      var aAddress = t("addrColAddress");
      var aRoute = t("addrColRoute");
      var aDistributor = t("addrColDistributor");
      var aHouseholds = t("addrColHouseholds");
      var aExcludedHouseholds = t("addrColExcludedHouseholds");
      var aPostnr = t("addrColPostnr");
      var aDriver = t("routeColDriverName");
      var aNote = t("addrColNote");
      headers = [aAddress, aRoute, aDistributor, aHouseholds, aExcludedHouseholds, aPostnr, aDriver, aNote];
      mappedRows = rows.map(function(r) {
        return {
          [aAddress]: r.address || "",
          [aRoute]: r.route || "",
          [aDistributor]: r.distributor || "",
          [aHouseholds]: r.numberOfHouseholds || "",
          [aExcludedHouseholds]: r.numberOfExcludedHouseholds || "",
          [aPostnr]: r.postnr || "",
          [aDriver]: r.driverName || "",
          [aNote]: r.note || ""
        };
      });
    } else if (tableName === "routes") {
      var rRouteId = t("routeColId");
      var rGroup = t("routeColLetterGroup");
      var rStatus = t("distColStatus");
      var rDriverNo = t("driversColDriverNo");
      var rDriver = t("routeColDriverName");
      var rDistributors = t("routeColDistributors");
      var rDistributorNames = t("filterDistributorsPlaceholder");
      var rIncludedAddresses = t("routeColAddresses");
      var rPapers = t("routeColPapers");
      var rPostnrs = t("filterPostnrLabel");
      headers = [rRouteId, rGroup, rStatus, rDriverNo, rDriver, rDistributors, rDistributorNames, rIncludedAddresses, rPapers, rPostnrs];
      mappedRows = rows.map(function(r) {
        return {
          [rRouteId]: r.routeId || "",
          [rGroup]: r.letterGroup || "",
          [rStatus]: r.status || "",
          [rDriverNo]: r.driverNr || "",
          [rDriver]: r.driver || r.driverName || "",
          [rDistributors]: r.distributorCount || "",
          [rDistributorNames]: r.distributorNames || "",
          [rIncludedAddresses]: r.includedAddresses || "",
          [rPapers]: r.paperCount || "",
          [rPostnrs]: r.postnrs || ""
        };
      });
    } else {
      return;
    }
    saveTextDownload(tableName + ".csv", "\uFEFF" + toCsvText(headers, mappedRows), "text/csv;charset=utf-8");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: t(tableTitleKeys[tableName]), count: mappedRows.length });
  }
  function exportTableXlsx(tableName) {
    if (typeof XLSX === "undefined") {
      statusEl.textContent = "XLSX export not available (library missing)";
      return;
    }
    recalculateAndRenderDashboard();
    var rows = getFilteredSortedRows(tableName);
    var headers = [];
    var mappedRows = [];
    if (tableName === "drivers") {
      var dName = t("driversColName");
      var dStatus = t("driversColStatus");
      var dDriverNo = t("driversColDriverNo");
      var dPhone = t("driversColPhone");
      var dEmail = t("driversColEmail");
      var dAddress = t("driversColAddress");
      var dPostnr = t("driversColPostnr");
      var dRouteCount = t("driversColRouteCount");
      var dPaperCount = t("driversColPaperCount");
      var dRoutes = t("totalsRoutes");
      var dDistributors = t("totalsDistributors");
      headers = [dName, dStatus, dDriverNo, dPhone, dEmail, dAddress, dPostnr, dRouteCount, dPaperCount, dRoutes, dDistributors];
      mappedRows = rows.map(function(r) {
        return {
          [dName]: r.name || "",
          [dStatus]: r.status || "",
          [dDriverNo]: r.driverNr || "",
          [dPhone]: r.phone || "",
          [dEmail]: r.email || "",
          [dAddress]: r.address || "",
          [dPostnr]: r.postnr || "",
          [dRouteCount]: r.routeCount || "",
          [dPaperCount]: r.paperCount || "",
          [dRoutes]: r.routes || "",
          [dDistributors]: r.distributorName || ""
        };
      });
    } else if (tableName === "distributors") {
      var dsName = t("distColName");
      var dsStatus = t("distColStatus");
      var dsRoute = t("distColRoute");
      var dsDriverNo = t("driversColDriverNo");
      var dsDriver = t("routeColDriverName");
      var dsPhone = t("distColPhone");
      var dsEmail = t("distColEmail");
      var dsAddress = t("distColAddress");
      var dsPostnr = t("distColPostnr");
      var dsPaperCount = t("distColPaperCount");
      headers = [dsName, dsStatus, dsRoute, dsDriverNo, dsDriver, dsPhone, dsEmail, dsAddress, dsPostnr, dsPaperCount];
      mappedRows = rows.map(function(r) {
        return {
          [dsName]: r.name || "",
          [dsStatus]: r.status || "",
          [dsRoute]: getDistributorRoutes(r).join(", "),
          [dsDriverNo]: r.driverNr || "",
          [dsDriver]: r.driverName || "",
          [dsPhone]: r.phone || "",
          [dsEmail]: r.email || "",
          [dsAddress]: r.address || "",
          [dsPostnr]: r.postnr || "",
          [dsPaperCount]: r.paperCount || ""
        };
      });
    } else if (tableName === "addresses") {
      var aAddress = t("addrColAddress");
      var aRoute = t("addrColRoute");
      var aDistributor = t("addrColDistributor");
      var aHouseholds = t("addrColHouseholds");
      var aExcludedHouseholds = t("addrColExcludedHouseholds");
      var aPostnr = t("addrColPostnr");
      var aDriver = t("routeColDriverName");
      var aNote = t("addrColNote");
      headers = [aAddress, aRoute, aDistributor, aHouseholds, aExcludedHouseholds, aPostnr, aDriver, aNote];
      mappedRows = rows.map(function(r) {
        return {
          [aAddress]: r.address || "",
          [aRoute]: r.route || "",
          [aDistributor]: r.distributor || "",
          [aHouseholds]: r.numberOfHouseholds || "",
          [aExcludedHouseholds]: r.numberOfExcludedHouseholds || "",
          [aPostnr]: r.postnr || "",
          [aDriver]: r.driverName || "",
          [aNote]: r.note || ""
        };
      });
    } else if (tableName === "routes") {
      var rRouteId = t("routeColId");
      var rGroup = t("routeColLetterGroup");
      var rStatus = t("distColStatus");
      var rDriverNo = t("driversColDriverNo");
      var rDriver = t("routeColDriverName");
      var rDistributors = t("routeColDistributors");
      var rDistributorNames = t("filterDistributorsPlaceholder");
      var rIncludedAddresses = t("routeColAddresses");
      var rPapers = t("routeColPapers");
      var rPostnrs = t("filterPostnrLabel");
      headers = [rRouteId, rGroup, rStatus, rDriverNo, rDriver, rDistributors, rDistributorNames, rIncludedAddresses, rPapers, rPostnrs];
      mappedRows = rows.map(function(r) {
        return {
          [rRouteId]: r.routeId || "",
          [rGroup]: r.letterGroup || "",
          [rStatus]: r.status || "",
          [rDriverNo]: r.driverNr || "",
          [rDriver]: r.driver || r.driverName || "",
          [rDistributors]: r.distributorCount || "",
          [rDistributorNames]: r.distributorNames || "",
          [rIncludedAddresses]: r.includedAddresses || "",
          [rPapers]: r.paperCount || "",
          [rPostnrs]: r.postnrs || ""
        };
      });
    } else {
      return;
    }
    var aoa = [headers];
    mappedRows.forEach(function(row) {
      aoa.push(headers.map(function(h) {
        return row[h] || "";
      }));
    });
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tableName);
    XLSX.writeFile(wb, tableName + ".xlsx");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: t(tableTitleKeys[tableName]), count: mappedRows.length });
  }
  function exportDriverDistributorsCsv(driverRow) {
    if (!driverRow) return;
    var rows = (currentData.distributors || []).filter(function(d) {
      if (driverRow.driverNr && d.driverNr) {
        return d.driverNr === driverRow.driverNr;
      }
      return (d.driverName || "") === (driverRow.name || "");
    });
    var dsName = t("distColName");
    var dsStatus = t("distColStatus");
    var dsRoute = t("distColRoute");
    var dsDriverNo = t("driversColDriverNo");
    var dsDriver = t("routeColDriverName");
    var dsPhone = t("distColPhone");
    var dsEmail = t("distColEmail");
    var dsAddress = t("distColAddress");
    var dsPostnr = t("distColPostnr");
    var dsPaperCount = t("distColPaperCount");
    var headers = [dsName, dsStatus, dsRoute, dsDriverNo, dsDriver, dsPhone, dsEmail, dsAddress, dsPostnr, dsPaperCount];
    var mapped = rows.map(function(r) {
      return {
        [dsName]: r.name || "",
        [dsStatus]: r.status || "",
        [dsRoute]: getDistributorRoutes(r).join(", "),
        [dsDriverNo]: r.driverNr || "",
        [dsDriver]: r.driverName || "",
        [dsPhone]: r.phone || "",
        [dsEmail]: r.email || "",
        [dsAddress]: r.address || "",
        [dsPostnr]: r.postnr || "",
        [dsPaperCount]: r.paperCount || ""
      };
    });
    var safeName = (driverRow.name || "driver").replace(/[^a-z0-9\-_. ]/gi, "_");
    saveTextDownload("drivers-" + safeName + "-distributors.csv", "\uFEFF" + toCsvText(headers, mapped), "text/csv;charset=utf-8");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: (driverRow.name || t("driversTitle")) + " - " + t("totalsDistributors"), count: mapped.length });
  }
  function exportDriverDistributorsXlsx(driverRow) {
    if (typeof XLSX === "undefined") {
      statusEl.textContent = "XLSX export not available (library missing)";
      return;
    }
    if (!driverRow) return;
    var rows = (currentData.distributors || []).filter(function(d) {
      if (driverRow.driverNr && d.driverNr) {
        return d.driverNr === driverRow.driverNr;
      }
      return (d.driverName || "") === (driverRow.name || "");
    });
    var dsName = t("distColName");
    var dsStatus = t("distColStatus");
    var dsRoute = t("distColRoute");
    var dsDriverNo = t("driversColDriverNo");
    var dsDriver = t("routeColDriverName");
    var dsPhone = t("distColPhone");
    var dsEmail = t("distColEmail");
    var dsAddress = t("distColAddress");
    var dsPostnr = t("distColPostnr");
    var dsPaperCount = t("distColPaperCount");
    var headers = [dsName, dsStatus, dsRoute, dsDriverNo, dsDriver, dsPhone, dsEmail, dsAddress, dsPostnr, dsPaperCount];
    var mapped = rows.map(function(r) {
      return {
        [dsName]: r.name || "",
        [dsStatus]: r.status || "",
        [dsRoute]: getDistributorRoutes(r).join(", "),
        [dsDriverNo]: r.driverNr || "",
        [dsDriver]: r.driverName || "",
        [dsPhone]: r.phone || "",
        [dsEmail]: r.email || "",
        [dsAddress]: r.address || "",
        [dsPostnr]: r.postnr || "",
        [dsPaperCount]: r.paperCount || ""
      };
    });
    var aoa = [headers];
    mapped.forEach(function(row) {
      aoa.push(headers.map(function(h) {
        return row[h] || "";
      }));
    });
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    var safeName = (driverRow.name || "driver").replace(/[^a-z0-9\-_. ]/gi, "_");
    XLSX.utils.book_append_sheet(wb, ws, safeName);
    XLSX.writeFile(wb, "drivers-" + safeName + "-distributors.xlsx");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: (driverRow.name || t("driversTitle")) + " - " + t("totalsDistributors"), count: mapped.length });
  }
  function exportDashboardXlsx() {
    if (typeof XLSX === "undefined") {
      statusEl.textContent = "XLSX export not available (library missing)";
      return;
    }
    var data = getDashboardExportData();
    var aoa = [data.headers].concat(data.rowArrays);
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dashboard");
    XLSX.writeFile(wb, "dashboard.xlsx");
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusCsvExported", { label: t("dashboardTitle"), count: data.rowObjects.length });
  }
  function initExportButtons() {
    document.querySelectorAll(".export-dropdown").forEach(function(wrap) {
      var btn = wrap.querySelector("button");
      var menu = wrap.querySelector(".export-menu");
      if (!btn || !menu) return;
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var isHidden = menu.hasAttribute("hidden");
        document.querySelectorAll(".export-dropdown .export-menu").forEach(function(m) {
          m.setAttribute("hidden", "");
        });
        if (isHidden) {
          menu.removeAttribute("hidden");
        } else {
          menu.setAttribute("hidden", "");
        }
      });
    });
    document.addEventListener("click", function() {
      document.querySelectorAll(".export-dropdown .export-menu").forEach(function(m) {
        m.setAttribute("hidden", "");
      });
    });
    document.querySelectorAll(".export-action").forEach(function(el) {
      el.addEventListener("click", function(e) {
        e.stopPropagation();
        var fmt = el.getAttribute("data-format");
        var target = el.getAttribute("data-target");
        var menu = el.closest(".export-menu");
        if (menu) menu.setAttribute("hidden", "");
        if (target === "dashboard") {
          if (fmt === "csv") exportDashboardCsv();
          else exportDashboardXlsx();
        } else {
          flushPendingFilters(target);
          if (fmt === "print") {
            if (target === "drivers") {
              var filteredDrivers = getFilteredSortedRows("drivers").filter(function(d) {
                return (d.status || "active").toLowerCase() === "active";
              });
              openReportModal(filteredDrivers);
            } else if (target === "routes") {
              var filteredRoutes = getFilteredSortedRows("routes").filter(function(r) {
                return r.status !== "inactive";
              });
              openRouteReportModal(filteredRoutes);
            }
          } else if (fmt === "csv") {
            exportTableCsv(target);
          } else {
            exportTableXlsx(target);
          }
        }
      });
    });
  }
  function openReportModal(driversToPrint) {
    if (!driversToPrint || driversToPrint.length === 0) return;
    Promise.resolve().then(() => (init_dom(), dom_exports)).then((dom) => {
      var html = renderDrivingListsHtml(driversToPrint);
      dom.reportModalContent.innerHTML = html;
      dom.reportModal.removeAttribute("hidden");
    });
  }
  function openRouteReportModal(routesToPrint) {
    if (!routesToPrint || routesToPrint.length === 0) return;
    Promise.resolve().then(() => (init_dom(), dom_exports)).then((dom) => {
      var html = renderRouteReportsHtml(routesToPrint);
      dom.routeReportModalContent.innerHTML = html;
      dom.routeReportModal.removeAttribute("hidden");
    });
  }
  function tryLoadRecordSnapshot() {
    return Promise.all([
      idbGetAll("drivers"),
      idbGetAll("distributors"),
      idbGetAll("addresses"),
      idbGetAll("routes")
    ]).then(function(allRows) {
      var drivers = allRows[0] || [];
      var distributors = allRows[1] || [];
      var addresses = allRows[2] || [];
      var routes = allRows[3] || [];
      if (!drivers.length && !distributors.length && !addresses.length && !routes.length) {
        return false;
      }
      currentDataFormat = "snapshot";
      hasLoadedEditableSource = false;
      lastCommittedDataText = "";
      hasUnsavedChanges = false;
      hasUserCommittedEdits = false;
      showSaveChanges = false;
      debugSaveChangesLog("tryLoadRecordSnapshot:reset-flags");
      updateUnsavedChangesUi();
      currentData.drivers = drivers.map(withoutStoreId);
      currentData.distributors = distributors.map(withoutStoreId);
      currentData.addresses = addresses.map(withoutStoreId);
      currentData.routes = routes.map(withoutStoreId);
      recalculatePaperCounts();
      render(recomputeMetricsFromCurrentData());
      renderAllTables();
      setDataSource("snapshot", "snapshot");
      statusEl.dataset.loaded = "1";
      statusEl.textContent = t("statusReadOnlySnapshot");
      return true;
    });
  }
  function createAddressesResetBackup(options) {
    var opts = options || {};
    if (currentDataFormat !== "json") {
      return Promise.resolve({ ok: false, error: "No editable JSON source is loaded." });
    }
    var timestamp = makeBackupTimestamp();
    var backupKey = "addresses-reset-backup-" + Date.now();
    var jsonText = JSON.stringify(serializeCurrentJsonData(), null, 2);
    var payload = {
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      key: backupKey,
      counts: {
        drivers: (currentData.drivers || []).length,
        distributors: (currentData.distributors || []).length,
        addresses: (currentData.addresses || []).length,
        routes: (currentData.routes || []).length
      },
      jsonText
    };
    var writePromise = idbSetValue(backupKey, payload).then(function() {
      return idbSetValue("addresses-reset-backup-latest", payload);
    });
    return writePromise.then(function() {
      if (opts.download !== false) {
        saveTextDownload(
          "addresses-backup-" + timestamp + ".json",
          jsonText,
          "application/json;charset=utf-8"
        );
      }
      return {
        ok: true,
        key: backupKey,
        createdAt: payload.createdAt,
        addressCount: payload.counts.addresses
      };
    });
  }
  function resetAddressesDatabase(options) {
    var opts = options || {};
    if (currentDataFormat !== "json") {
      statusEl.dataset.loaded = "1";
      statusEl.textContent = "Cannot reset addresses: editable JSON source is not loaded.";
      return Promise.resolve({ ok: false, error: "No editable JSON source is loaded." });
    }
    if (opts.force !== true) {
      statusEl.dataset.loaded = "1";
      statusEl.textContent = "Reset blocked. Call resetAddressesDatabase({ force: true }).";
      return Promise.resolve({ ok: false, error: "force flag is required" });
    }
    var doBackup = opts.backup !== false;
    var backupPromise = doBackup ? createAddressesResetBackup({ download: opts.downloadBackup }) : Promise.resolve(null);
    return backupPromise.then(function(backupResult) {
      if (backupResult && backupResult.ok === false) {
        return backupResult;
      }
      var removedAddresses = (currentData.addresses || []).length;
      currentData.addresses = [];
      syncCurrentDataFromJson();
      var jsonText = JSON.stringify(serializeCurrentJsonData(), null, 2);
      saveJsonCache(jsonText, "source.json (addresses reset)");
      lastCommittedDataText = getComparableDataText();
      hasUnsavedChanges = false;
      hasUserCommittedEdits = false;
      showSaveChanges = false;
      debugSaveChangesLog("resetAddressesDatabase:reset-flags");
      updateUnsavedChangesUi();
      paginationState.addresses.page = 1;
      render(recomputeMetricsFromCurrentData());
      renderAllTables();
      var backupLabel = backupResult && backupResult.key ? " Backup key: " + backupResult.key + "." : "";
      statusEl.dataset.loaded = "1";
      statusEl.textContent = "Addresses reset complete. Removed " + removedAddresses + " addresses." + backupLabel;
      return {
        ok: true,
        removedAddresses,
        removedStreets: 0,
        backup: backupResult && backupResult.ok ? backupResult : null
      };
    });
  }
  function persistRecordSnapshot(dataByTable) {
    getIndexedDb().then(function(db) {
      if (!db) {
        return;
      }
      try {
        var tx = db.transaction(IDB_RECORD_STORES, "readwrite");
        IDB_RECORD_STORES.forEach(function(tableName) {
          var store = tx.objectStore(tableName);
          store.clear();
          (dataByTable[tableName] || []).forEach(function(row) {
            store.put(cleanRecordForStore(row));
          });
        });
      } catch (e) {
      }
    });
  }
  function saveJsonCache(jsonText, label) {
    try {
      localStorage.setItem(JSON_CACHE_KEY, jsonText);
      localStorage.setItem(JSON_CACHE_LABEL_KEY, label || "JSON");
    } catch (e) {
    }
    idbSetValue(IDB_JSON_CACHE_KEY, {
      jsonText,
      label: label || "JSON",
      savedAt: Date.now()
    });
  }
  function hydrateFromJsonData(payload, label) {
    var data = payload || {};
    currentDataFormat = "json";
    hasLoadedEditableSource = true;
    hasUnsavedChanges = false;
    hasUserCommittedEdits = false;
    showSaveChanges = false;
    debugSaveChangesLog("hydrateFromJsonData:loaded-reset-flags", { label: label || "JSON" });
    currentData.drivers = normalizeRecords(data.drivers || []);
    currentData.distributors = normalizeRecords(data.distributors || []).map(function(row) {
      return normalizeDistributorRow(row);
    });
    currentData.routes = normalizeRecords(data.routes || []).map(function(row) {
      row.routeId = normalizeRouteIdentifier(row.routeId || "");
      row.active = row.active !== false;
      return row;
    });
    currentData.addresses = normalizeRecords(data.addresses || []).map(function(row) {
      return normalizeAddressRow(row);
    });
    syncCurrentDataFromJson();
    lastCommittedDataText = getComparableDataText();
    refreshUnsavedChangesFromData();
    render(recomputeMetricsFromCurrentData());
    renderAllTables();
    statusEl.dataset.loaded = "1";
    statusEl.textContent = t("statusLoaded", { label: label || "JSON" });
  }
  function tryLoadCachedJson() {
    try {
      var cachedJson = localStorage.getItem(JSON_CACHE_KEY);
      if (!cachedJson) {
        return false;
      }
      var cachedLabel = localStorage.getItem(JSON_CACHE_LABEL_KEY) || "cached";
      hydrateFromJsonData(JSON.parse(cachedJson), cachedLabel);
      setDataSource("local-cache", cachedLabel);
      statusEl.textContent = t("statusLoadedCache", { label: cachedLabel });
      return true;
    } catch (e) {
      return false;
    }
  }
  function tryLoadIndexedDbCachedJson() {
    return idbGetValue(IDB_JSON_CACHE_KEY).then(function(cached) {
      try {
        if (!cached || !cached.jsonText) {
          return false;
        }
        hydrateFromJsonData(JSON.parse(cached.jsonText), cached.label || "cached");
        setDataSource("idb-cache", cached.label || "cached");
        statusEl.textContent = t("statusLoadedCache", { label: cached.label || "cached" });
        return true;
      } catch (e) {
        return false;
      }
    });
  }
  function loadFromJsonText(jsonText, label, sourceType) {
    var payload = JSON.parse(String(jsonText || "{}"));
    hydrateFromJsonData(payload, label);
    closeSourceMissingModal();
    setDataSource(sourceType || "file", label || "");
    saveJsonCache(JSON.stringify(payload, null, 2), label);
    statusEl.textContent = t("statusLoaded", { label });
  }
  function tryLoadDefaultSource() {
    if (window.location && window.location.protocol === "file:") {
      return Promise.reject(new Error(t("errFileProtocolBlocked")));
    }
    var defaultCandidates = [
      { path: "source.json", type: "json" },
      { path: "data/source.json", type: "json" },
      { path: "../data/source.json", type: "json" },
      { path: "/data/source.json", type: "json" }
    ];
    function tryFetch(index) {
      if (index >= defaultCandidates.length) {
        throw new Error(t("errLoadDefault"));
      }
      var candidate = defaultCandidates[index];
      return fetch(candidate.path, { cache: "no-cache" }).then(function(response) {
        if (!response.ok) {
          return tryFetch(index + 1);
        }
        return response.text().then(function(dataText) {
          return { dataText, path: candidate.path, type: candidate.type };
        });
      }).catch(function() {
        return tryFetch(index + 1);
      });
    }
    return tryFetch(0).then(function(result) {
      loadFromJsonText(result.dataText, result.path, "default");
      return result;
    });
  }
  function loadDefaultJson(options) {
    var opts = options || {};
    var allowFallback = opts.allowFallback !== false;
    return tryLoadDefaultSource().then(function(result) {
      return {
        ok: true,
        source: "default",
        label: result.path || "source.json"
      };
    }).catch(function(err) {
      if (!allowFallback) {
        hasLoadedEditableSource = false;
        hasUnsavedChanges = false;
        hasUserCommittedEdits = false;
        showSaveChanges = false;
        debugSaveChangesLog("loadDefaultJson:failed-no-fallback");
        updateUnsavedChangesUi();
        statusEl.textContent = t("errDefaultFailed") + " " + (err && err.message ? err.message : "");
        return {
          ok: false,
          source: "default",
          error: err && err.message ? err.message : t("errLoadDefault")
        };
      }
      return tryLoadIndexedDbCachedJson().then(function(loadedJsonFromIdb) {
        if (loadedJsonFromIdb) {
          return { ok: true, source: "idb-cache", label: "cached" };
        }
        if (tryLoadCachedJson()) {
          return { ok: true, source: "local-cache", label: "cached" };
        }
        return tryLoadRecordSnapshot().then(function(loadedSnapshot) {
          if (loadedSnapshot) {
            return { ok: true, source: "snapshot", label: "snapshot" };
          }
          statusEl.textContent = t("errDefaultFailed") + " " + (err && err.message ? err.message : "");
          return {
            ok: false,
            source: "none",
            error: err && err.message ? err.message : t("errLoadDefault")
          };
        });
      });
    });
  }
  function loadInitialData() {
    loadDefaultJson({ allowFallback: false }).then(function(result) {
      if (!result || !result.ok) {
        hasLoadedEditableSource = false;
        hasUnsavedChanges = false;
        hasUserCommittedEdits = false;
        showSaveChanges = false;
        debugSaveChangesLog("loadInitialData:failed-reset-flags");
        updateUnsavedChangesUi();
        setDataSource("none", "");
        openSourceMissingModal();
      }
    });
  }
  function loadUserGuideText() {
    var lang = currentLang || "en";
    var localizedName = "README_USER." + lang + ".md";
    var candidates = [
      "../" + localizedName,
      localizedName,
      "/" + localizedName,
      "../README_USER.md",
      "README_USER.md",
      "/README_USER.md"
    ];
    function tryFetch(index) {
      if (index >= candidates.length) {
        throw new Error("no-guide");
      }
      return fetch(candidates[index], { cache: "no-cache" }).then(function(resp) {
        if (!resp.ok) {
          return tryFetch(index + 1);
        }
        return resp.text();
      }).catch(function() {
        return tryFetch(index + 1);
      });
    }
    return tryFetch(0);
  }
  function setActiveTab(tabName) {
    var tabButtons = document.querySelectorAll(".tab-btn");
    var panels = document.querySelectorAll(".tab-panel");
    tabButtons.forEach(function(btn) {
      var isActive = btn.getAttribute("data-tab") === tabName;
      btn.classList.toggle("active", isActive);
    });
    panels.forEach(function(panel) {
      var panelName = panel.id.replace("panel-", "");
      if (panelName === tabName) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  }
  languageSelect.addEventListener("change", function() {
    applyLanguage(languageSelect.value);
  });
  document.querySelectorAll(".tab-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var tabName = btn.getAttribute("data-tab");
      setActiveTab(tabName);
      if (tabName === "map") {
        initMap("map-container");
        invalidateMapSize();
      } else {
        refreshFilterComponents(tabName);
      }
    });
  });
  settingsToggle.addEventListener("click", function() {
    var isHidden = settingsPanel.hasAttribute("hidden");
    if (isHidden) {
      settingsPanel.removeAttribute("hidden");
      settingsToggle.setAttribute("aria-expanded", "true");
    } else {
      settingsPanel.setAttribute("hidden", "");
      settingsToggle.setAttribute("aria-expanded", "false");
    }
  });
  if (saveChangesBtn) {
    saveChangesBtn.addEventListener("click", function() {
      debugSaveChangesLog("saveChangesBtn:click");
      saveChangesToSource();
    });
  }
  if (saveAsCopyBtn) {
    saveAsCopyBtn.addEventListener("click", function() {
      debugSaveChangesLog("save-as-copy:click");
      if (saveDropdownMenu) {
        saveDropdownMenu.style.display = "none";
      }
      if (saveDropdownToggle) {
        saveDropdownToggle.setAttribute("aria-expanded", "false");
      }
      saveChangesToSourceCopy();
    });
  }
  if (saveDropdownToggle && saveDropdownMenu) {
    saveDropdownToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      const expanded = saveDropdownToggle.getAttribute("aria-expanded") === "true";
      saveDropdownToggle.setAttribute("aria-expanded", !expanded);
      if (!expanded) {
        saveDropdownMenu.style.display = "block";
      } else {
        saveDropdownMenu.style.display = "none";
      }
    });
    document.addEventListener("click", function() {
      saveDropdownToggle.setAttribute("aria-expanded", "false");
      saveDropdownMenu.style.display = "none";
    });
  }
  if (chooseFileLabel) {
    chooseFileLabel.addEventListener("click", function(e) {
      promptForDataFile();
    });
  }
  async function promptForDataFile() {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{
            description: "JSON Files",
            accept: { "application/json": [".json"] }
          }],
          multiple: false
        });
        currentFileHandle = handle;
        const file = await handle.getFile();
        const text = await file.text();
        try {
          loadFromJsonText(text, file.name);
        } catch (error) {
          statusEl.textContent = t("errParseSelected") + " " + error.message;
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("showOpenFilePicker error", e);
          if (fileInput) fileInput.click();
        }
      }
    } else {
      if (fileInput) fileInput.click();
    }
  }
  fileInput.addEventListener("change", function(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    if (!/\.json$/i.test(file.name || "")) {
      statusEl.textContent = t("errInvalidXml");
      return;
    }
    var reader = new FileReader();
    reader.onerror = function() {
      statusEl.textContent = t("errReadSelected");
    };
    reader.onload = function() {
      try {
        currentFileHandle = null;
        loadFromJsonText(String(reader.result || ""), file.name);
      } catch (error) {
        statusEl.textContent = t("errParseSelected") + " " + error.message;
      }
    };
    reader.readAsText(file);
  });
  window.addEventListener("beforeunload", function(event) {
    debugSaveChangesLog("beforeunload:check");
    if (closeGuardBypass2 || !hasLoadedEditableSource || !showSaveChanges) {
      debugSaveChangesLog("beforeunload:allow");
      return;
    }
    event.preventDefault();
    event.returnValue = "";
    debugSaveChangesLog("beforeunload:block-open-guard");
    closeGuardPending2 = true;
    setTimeout(function() {
      if (closeGuardPending2 && !document.hidden) {
        openCloseGuardModal();
      }
    }, 0);
  });
  applyLanguage(detectInitialLanguage());
  initSortableColumns();
  initResizableColumns();
  initTableFilters();
  initPaginationControls();
  initEditModal();
  initAddButtons();
  initDeleteModal();
  initBatchStatusModal();
  initMergeRoutesModal();
  initBatchRouteModal();
  initLoadResultModal();
  initSourceMissingModal();
  initUserGuideModal();
  initCloseGuardModal();
  initMapAddressModal();
  initReassignRouteModal();
  initDeleteAddressMapModal();
  initRowActionMenus();
  initBatchSelectionControls();
  initExportButtons();
  Promise.resolve().then(() => (init_dom(), dom_exports)).then((dom) => {
    if (dom.reportModalClose) {
      dom.reportModalClose.addEventListener("click", function() {
        dom.reportModal.setAttribute("hidden", "");
      });
    }
    if (dom.reportModalPrint) {
      dom.reportModalPrint.addEventListener("click", function() {
        window.print();
      });
    }
    if (dom.routeReportModalClose) {
      dom.routeReportModalClose.addEventListener("click", function() {
        dom.routeReportModal.setAttribute("hidden", "");
      });
    }
    if (dom.routeReportModalPrint) {
      dom.routeReportModalPrint.addEventListener("click", function() {
        window.print();
      });
    }
    document.addEventListener("click", function(e) {
      if (e.target.matches('[data-report-modal-close="1"]')) {
        dom.reportModal.setAttribute("hidden", "");
      }
      if (e.target.matches('[data-route-report-modal-close="1"]')) {
        dom.routeReportModal.setAttribute("hidden", "");
      }
    });
  });
  initCellLinks();
  window.createAddressesResetBackup = createAddressesResetBackup;
  window.resetAddressesDatabase = resetAddressesDatabase;
  setActiveTab("dashboard");
  loadInitialData();
})();
//# sourceMappingURL=app.bundle.js.map
