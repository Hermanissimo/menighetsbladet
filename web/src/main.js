import { saveTextDownload } from "./utils.js";
import { currentLang, setLang, detectInitialLanguage, t } from "./i18n.js";
import { currentData, filterState, editState, paginationState, tableTitleKeys, fieldLabelKeyByTable, requiredFieldsByMode } from "./state.js";
import { statusEl, fileInput, chooseFileLabel, saveGroup, saveChangesBtn, saveAsCopyBtn, saveDropdownToggle, saveDropdownMenu, languageSelect, settingsToggle, settingsPanel, editModalTitle } from "./dom.js";
import { normalizeRouteIdentifier, recomputeMetricsFromCurrentData, normalizeRecords, normalizeAddressRow, getDistributorRoutes, normalizeDistributorRow, recalculateRoutesFromCurrentData, recalculatePaperCounts } from "./calculations.js";
import { getIndexedDb, idbGetValue, idbSetValue, idbGetAll, withoutStoreId, cleanRecordForStore, IDB_JSON_CACHE_KEY } from "./api.js";
import { initEditModal, initAddButtons, initDeleteModal, initBatchStatusModal, initMergeRoutesModal, initBatchRouteModal, initLoadResultModal, openSourceMissingModal, closeSourceMissingModal, initSourceMissingModal, initUserGuideModal, openCloseGuardModal, initCloseGuardModal } from "./modals.js";
import { renderDrivingListsHtml, renderRouteReportsHtml } from "./reports.js";
import { renderRoutesTable, renderAllTables, updateSortHeaderIndicators, initSortableColumns, initResizableColumns, getFilteredSortedRows, flushPendingFilters, clearAllBatchSelections, updateBatchControls, initTableFilters, initPaginationControls, initCellLinks, initRowActionMenus, initBatchSelectionControls } from "./tables.js";
import { initMap, invalidateMapSize, initMapAddressModal, initReassignRouteModal, initDeleteAddressMapModal } from "./map.js";






var JSON_CACHE_KEY = "source-json-cache";
var JSON_CACHE_LABEL_KEY = "source-json-cache-label";
var COL_WIDTHS_KEY = "table-column-widths";
var currentDataFormat = "none";
var hasUnsavedChanges = false;



var currentDataSource = { source: "none", label: "" };
var closeGuardBypass = false;
var closeGuardPending = false;
var lastCommittedDataText = "";
var hasLoadedEditableSource = false;
var hasUserCommittedEdits = false;
var showSaveChanges = false;
export var currentFileHandle = null;

export function setHasUserCommittedEdits(val) { hasUserCommittedEdits = val; }
export function setShowSaveChanges(val) { showSaveChanges = val; }
var DEBUG_SAVE_CHANGES = true;



function getDataSourceText(source, label) {
  if (source === "default") {
    return t("dataSourceDefault", { label: label || "data/source.json" });
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
  setText("open-user-guide", t("userGuideAction"));
  setText("choose-file-label", t("chooseFile"));
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
  ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
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

  document.querySelectorAll(".clear-filter-btn").forEach(function (btn) {
    btn.textContent = "×";
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

  setText("export-dashboard", t("exportAction") + " ▾");
  setText("export-drivers", t("exportAction") + " ▾");
  setText("export-distributors", t("exportAction") + " ▾");
  setText("export-addresses", t("exportAction") + " ▾");
  setText("export-routes", t("exportAction") + " ▾");
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
  ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
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
    editModalTitle.textContent = editState.mode === "add"
      ? t("addRowTitle", { table: t(tableTitleKeys[editState.tableName]) })
      : t("editRowTitle", { table: t(tableTitleKeys[editState.tableName]) });
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
  ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
    var selectAll = document.getElementById("select-all-" + tableName);
    if (selectAll) {
      selectAll.setAttribute("aria-label", t("selectCol"));
    }
    updateBatchControls(tableName);
  });
}

export function setText(id, value) {
  var el = document.getElementById(id);
  if (!el) {
    return;
  }
  el.textContent = String(value);
}

export function setHtml(id, value) {
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
  // Only show placeholder when the filter has no value.
  // For simple inputs, check el.value. For multi-select filter components,
  // also check the filterState for existing selections.
  try {
    var show = true;
    var cur = String(el.value || "").trim();
    if (cur) { show = false; }
    else {
      // id format: filter-<table>-<field>
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



export function render(metrics) {
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

export function recalculateAndRenderDashboard() {
  recalculatePaperCounts();
  render(recomputeMetricsFromCurrentData());
}

export function getStatusLabel(value) {
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


export function setBodyRows(bodyId, rowsHtml) {
  var body = document.getElementById(bodyId);
  body.innerHTML = rowsHtml;
}


export var fieldFormatValidators = {
  email: {
    test: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()); },
    i18nKey: "validEmail"
  },
  phone: {
    test: function (v) { return !v || /^[+0-9()\s\-]{5,30}$/.test(v); },
    i18nKey: "validPhone"
  },
  postnr: {
    test: function (v) { return !v || /^\d{4}$/.test(v); },
    i18nKey: "validPostnr"
  },
  houseNo: {
    test: function (v) { return !v || /^\d+[A-Za-z]?$/.test(v); },
    i18nKey: "validHouseNo"
  },
  numberOfHouseholds: {
    test: function (v) { return !v || /^(?:[1-9]\d*)$/.test(v); },
    i18nKey: "validHouseholdCount"
  },
  numberOfExcludedHouseholds: {
    test: function (v) { return !v || /^(?:0|[1-9]\d*)$/.test(v); },
    i18nKey: "validExcludedHouseholdCount"
  },
  extraPapers: {
    test: function (v) { return !v || /^-?(?:0|[1-9]\d*)$/.test(v); },
    i18nKey: "validExtraPapersCount"
  },
  driverNr: {
    test: function (v) { return !v || /^[\w\-/]+$/.test(v); },
    i18nKey: "validDriverNr"
  }
};

export function getRequiredFields(tableName) {
  var modeMap = requiredFieldsByMode[editState.mode] || requiredFieldsByMode.edit;
  return modeMap[tableName] || [];
}

function getFieldLabel(tableName, fieldName) {
  var labelKey = (fieldLabelKeyByTable[tableName] || {})[fieldName] || fieldName;
  return t(labelKey);
}

export function validateRequiredFields(tableName, row) {
  var requiredFields = getRequiredFields(tableName);
  var missing = [];
  requiredFields.forEach(function (fieldName) {
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

export function validateFieldFormats(tableName, row, fieldNames) {
  var errors = [];
  fieldNames.forEach(function (fieldName) {
    var validator = fieldFormatValidators[fieldName];
    if (!validator) {
      return;
    }
    var value = String(row[fieldName] == null ? "" : row[fieldName]).trim();
    if (!validator.test(value)) {
      var msg = t(validator.i18nKey);
      var label = getFieldLabel(tableName, fieldName);
      errors.push({
        fieldName: fieldName,
        message: msg,
        text: label + ": " + msg
      });
    }
  });
  return errors;
}


export function asComparable(value) {
  if (Array.isArray(value)) {
    return { type: "str", value: value.map(function (item) { return String(item == null ? "" : item).trim().toLowerCase(); }).filter(Boolean).join(",") };
  }
  var v = (value == null ? "" : String(value)).trim();
  var num = Number(v.replace(/\s+/g, "").replace(",", "."));
  if (!Number.isNaN(num) && /^-?\d+(?:[.,]\d+)?$/.test(v.replace(/\s+/g, ""))) {
    return { type: "num", value: num };
  }
  return { type: "str", value: v.toLowerCase() };
}
























export function canEditCurrentData() {
  return currentDataFormat === "json";
}









export function syncCurrentDataFromJson() {
  currentData.addresses = normalizeRecords(currentData.addresses).map(function (row) {
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

function saveBlobDownload(fileName, blob) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function makeBackupTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
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
    exportedAt: new Date().toISOString(),
    schemaVersion: 1,
    drivers: stripDerivedForDrivers(currentData.drivers),
    distributors: stripDerivedForDistributors(currentData.distributors),
    addresses: stripDerivedForAddresses(currentData.addresses),
    routes: stripDerivedForRoutes(currentData.routes)
  };
}



export function debugSaveChangesLog(eventName, extra) {
  if (!DEBUG_SAVE_CHANGES) {
    return;
  }
  var state = {
    event: eventName,
    showSaveChanges: showSaveChanges,
    hasLoadedEditableSource: hasLoadedEditableSource,
    hasUnsavedChanges: hasUnsavedChanges,
    hasUserCommittedEdits: hasUserCommittedEdits,
    currentDataFormat: currentDataFormat
  };

  if (extra && typeof extra === "object") {
    Object.keys(extra).forEach(function (k) {
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
    if (saveGroup) saveGroup.hidden = false;
    debugSaveChangesLog("updateUnsavedChangesUi:show");
  } else {
    saveChangesBtn.setAttribute("hidden", "");
    saveChangesBtn.hidden = true;
    if (saveGroup) saveGroup.hidden = true;
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

export function refreshUnsavedChangesFromData() {
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

export async function saveChangesToSource() {
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

export async function saveChangesToSourceCopy() {
  if (currentDataFormat !== "json" || !hasLoadedEditableSource) {
    debugSaveChangesLog("saveChangesToSourceCopy:blocked-not-editable");
    return false;
  }
  var jsonText = JSON.stringify(serializeCurrentJsonData(), null, 2);
  
  try {
    if (window.showSaveFilePicker) {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'source-copy.json',
        types: [{
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonText);
      await writable.close();
      statusEl.dataset.loaded = "1";
      statusEl.textContent = t("statusSavedCopyNow") || "Copy saved.";
    } else {
      saveTextDownload("source-copy.json", jsonText, "application/json;charset=utf-8");
      statusEl.dataset.loaded = "1";
      statusEl.textContent = t("statusSavedCopyNow") || "Copy downloaded.";
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error("Failed to save copy via file handle", err);
      saveTextDownload("source-copy.json", jsonText, "application/json;charset=utf-8");
      statusEl.dataset.loaded = "1";
      statusEl.textContent = t("statusSavedCopyNow") || "Copy downloaded.";
    }
  }
}

function persistEditedXmlNow(reason) {
  saveChangesToSource();
}

export function scheduleAutosave() {
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
    return "\"" + text.replace(/"/g, "\"\"") + "\"";
  }
  return text;
}

function toCsvText(headers, rows) {
  var lines = [];
  lines.push(headers.map(csvEscape).join(","));
  rows.forEach(function (row) {
    lines.push(headers.map(function (h) { return csvEscape(row[h]); }).join(","));
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

  var rowArrays = rowObjects.map(function (r) {
    return headers.map(function (h) {
      return r[h] !== undefined ? r[h] : "";
    });
  });

  return {
    headers: headers,
    rowObjects: rowObjects,
    rowArrays: rowArrays
  };
}

function exportDashboardCsv() {
  var data = getDashboardExportData();
  saveTextDownload("dashboard.csv", "\ufeff" + toCsvText(data.headers, data.rowObjects), "text/csv;charset=utf-8");
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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

  saveTextDownload(tableName + ".csv", "\ufeff" + toCsvText(headers, mappedRows), "text/csv;charset=utf-8");
  statusEl.dataset.loaded = "1";
  statusEl.textContent = t("statusCsvExported", { label: t(tableTitleKeys[tableName]), count: mappedRows.length });
}

function exportTableXlsx(tableName) {
  if (typeof XLSX === 'undefined') {
    statusEl.textContent = 'XLSX export not available (library missing)';
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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
    mappedRows = rows.map(function (r) {
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

  // Build array-of-arrays and write workbook
  var aoa = [headers];
  mappedRows.forEach(function (row) {
    aoa.push(headers.map(function (h) { return row[h] || ""; }));
  });
  var ws = XLSX.utils.aoa_to_sheet(aoa);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, tableName);
  XLSX.writeFile(wb, tableName + ".xlsx");
  statusEl.dataset.loaded = "1";
  statusEl.textContent = t("statusCsvExported", { label: t(tableTitleKeys[tableName]), count: mappedRows.length });
}

// Export distributors assigned to a single driver (CSV)
export function exportDriverDistributorsCsv(driverRow) {
  if (!driverRow) return;
  var rows = (currentData.distributors || []).filter(function (d) {
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
  var mapped = rows.map(function (r) {
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
  saveTextDownload("drivers-" + safeName + "-distributors.csv", "\ufeff" + toCsvText(headers, mapped), "text/csv;charset=utf-8");
  statusEl.dataset.loaded = "1";
  statusEl.textContent = t("statusCsvExported", { label: (driverRow.name || t("driversTitle")) + " - " + t("totalsDistributors"), count: mapped.length });
}

// Export distributors assigned to a single driver (XLSX)
export function exportDriverDistributorsXlsx(driverRow) {
  if (typeof XLSX === 'undefined') {
    statusEl.textContent = 'XLSX export not available (library missing)';
    return;
  }
  if (!driverRow) return;
  var rows = (currentData.distributors || []).filter(function (d) {
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
  var mapped = rows.map(function (r) {
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
  mapped.forEach(function (row) { aoa.push(headers.map(function (h) { return row[h] || ""; })); });
  var ws = XLSX.utils.aoa_to_sheet(aoa);
  var wb = XLSX.utils.book_new();
  var safeName = (driverRow.name || "driver").replace(/[^a-z0-9\-_. ]/gi, "_");
  XLSX.utils.book_append_sheet(wb, ws, safeName);
  XLSX.writeFile(wb, "drivers-" + safeName + "-distributors.xlsx");
  statusEl.dataset.loaded = "1";
  statusEl.textContent = t("statusCsvExported", { label: (driverRow.name || t("driversTitle")) + " - " + t("totalsDistributors"), count: mapped.length });
}

function exportDashboardXlsx() {
  if (typeof XLSX === 'undefined') {
    statusEl.textContent = 'XLSX export not available (library missing)';
    return;
  }
  var data = getDashboardExportData();
  var aoa = [data.headers].concat(data.rowArrays);
  var ws = XLSX.utils.aoa_to_sheet(aoa);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
  XLSX.writeFile(wb, 'dashboard.xlsx');
  statusEl.dataset.loaded = "1";
  statusEl.textContent = t("statusCsvExported", { label: t("dashboardTitle"), count: data.rowObjects.length });
}

function initExportButtons() {
  // Toggle menus
  document.querySelectorAll('.export-dropdown').forEach(function (wrap) {
    var btn = wrap.querySelector('button');
    var menu = wrap.querySelector('.export-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isHidden = menu.hasAttribute('hidden');
      document.querySelectorAll('.export-dropdown .export-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
      if (isHidden) {
        menu.removeAttribute('hidden');
      } else {
        menu.setAttribute('hidden', '');
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.export-dropdown .export-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
  });

  // Action handlers
  document.querySelectorAll('.export-action').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      var fmt = el.getAttribute('data-format');
      var target = el.getAttribute('data-target');
      // close the menu
      var menu = el.closest('.export-menu');
      if (menu) menu.setAttribute('hidden', '');
      if (target === 'dashboard') {
        if (fmt === 'csv') exportDashboardCsv(); else exportDashboardXlsx();
      } else {
        flushPendingFilters(target);
        if (fmt === 'print') {
          if (target === 'drivers') {
            var filteredDrivers = getFilteredSortedRows('drivers').filter(function (d) { return (d.status || 'active').toLowerCase() === 'active'; });
            openReportModal(filteredDrivers);
          } else if (target === 'routes') {
            var filteredRoutes = getFilteredSortedRows('routes').filter(function (r) { return r.status !== 'inactive'; });
            openRouteReportModal(filteredRoutes);
          }
        } else if (fmt === 'csv') {
          exportTableCsv(target);
        } else {
          exportTableXlsx(target);
        }
      }
    });
  });
}

export function openReportModal(driversToPrint) {
  if (!driversToPrint || driversToPrint.length === 0) return;
  import("./dom.js").then(dom => {
    var html = renderDrivingListsHtml(driversToPrint);
    dom.reportModalContent.innerHTML = html;
    dom.reportModal.removeAttribute('hidden');
  });
}

export function openRouteReportModal(routesToPrint) {
  if (!routesToPrint || routesToPrint.length === 0) return;
  import("./dom.js").then(dom => {
    var html = renderRouteReportsHtml(routesToPrint);
    dom.routeReportModalContent.innerHTML = html;
    dom.routeReportModal.removeAttribute('hidden');
  });
}





















function refreshRoutesFromStore() {
  idbGetAll("routes").then(function (rows) {
    if (!rows || !rows.length) {
      return;
    }
    currentData.routes = rows.map(function (row) {
      var out = {};
      Object.keys(row || {}).forEach(function (key) {
        if (key !== "_id") {
          out[key] = row[key];
        }
      });
      return out;
    });
    renderRoutesTable(currentData.routes);
    updateSortHeaderIndicators("routes");
  });
}


function tryLoadRecordSnapshot() {
  return Promise.all([
    idbGetAll("drivers"),
    idbGetAll("distributors"),
    idbGetAll("addresses"),
    idbGetAll("routes")
  ]).then(function (allRows) {
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
    createdAt: new Date().toISOString(),
    key: backupKey,
    counts: {
      drivers: (currentData.drivers || []).length,
      distributors: (currentData.distributors || []).length,
      addresses: (currentData.addresses || []).length,
      routes: (currentData.routes || []).length
    },
    jsonText: jsonText
  };

  var writePromise = idbSetValue(backupKey, payload).then(function () {
    return idbSetValue("addresses-reset-backup-latest", payload);
  });

  return writePromise.then(function () {
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

  return backupPromise.then(function (backupResult) {
    if (backupResult && backupResult.ok === false) {
      return backupResult;
    }

    var removedAddresses = (currentData.addresses || []).length;
    currentData.addresses = [];
    syncCurrentDataFromJson();

    // Persist immediately so cached data and snapshots cannot rehydrate removed addresses.
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
      removedAddresses: removedAddresses,
      removedStreets: 0,
      backup: backupResult && backupResult.ok ? backupResult : null
    };
  });
}



function persistRecordSnapshot(dataByTable) {
  getIndexedDb().then(function (db) {
    if (!db) {
      return;
    }
    try {
      var tx = db.transaction(IDB_RECORD_STORES, "readwrite");
      IDB_RECORD_STORES.forEach(function (tableName) {
        var store = tx.objectStore(tableName);
        store.clear();
        (dataByTable[tableName] || []).forEach(function (row) {
          store.put(cleanRecordForStore(row));
        });
      });
    } catch (e) {
      // Ignore snapshot failures; XML cache remains source of truth.
    }
  });
}

function saveJsonCache(jsonText, label) {
  try {
    localStorage.setItem(JSON_CACHE_KEY, jsonText);
    localStorage.setItem(JSON_CACHE_LABEL_KEY, label || "JSON");
  } catch (e) {
    // Ignore storage failures (quota/private mode).
  }
  idbSetValue(IDB_JSON_CACHE_KEY, {
    jsonText: jsonText,
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
  currentData.distributors = normalizeRecords(data.distributors || []).map(function (row) {
    return normalizeDistributorRow(row);
  });
  currentData.routes = normalizeRecords(data.routes || []).map(function (row) {
    row.routeId = normalizeRouteIdentifier(row.routeId || "");
    row.active = row.active !== false;
    return row;
  });
  currentData.addresses = normalizeRecords(data.addresses || []).map(function (row) {
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
  return idbGetValue(IDB_JSON_CACHE_KEY).then(function (cached) {
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
  statusEl.textContent = t("statusLoaded", { label: label });
}

function tryLoadDefaultSource() {
  if (window.location && window.location.protocol === "file:") {
    return Promise.reject(new Error(t("errFileProtocolBlocked")));
  }
  var defaultCandidates = [
    { path: "data/source.json", type: "json" },
    { path: "../data/source.json", type: "json" },
    { path: "/data/source.json", type: "json" }
  ];

  function tryFetch(index) {
    if (index >= defaultCandidates.length) {
      throw new Error(t("errLoadDefault"));
    }
    var candidate = defaultCandidates[index];
    return fetch(candidate.path, { cache: "no-cache" })
      .then(function (response) {
        if (!response.ok) {
          return tryFetch(index + 1);
        }
        return response.text().then(function (dataText) {
          return { dataText: dataText, path: candidate.path, type: candidate.type };
        });
      })
      .catch(function () {
        return tryFetch(index + 1);
      });
  }

  return tryFetch(0)
    .then(function (result) {
      loadFromJsonText(result.dataText, result.path, "default");
      return result;
    });
}

function loadDefaultJson(options) {
  var opts = options || {};
  var allowFallback = opts.allowFallback !== false;
  return tryLoadDefaultSource()
    .then(function (result) {
      return {
        ok: true,
        source: "default",
        label: result.path || "data/source.json"
      };
    })
    .catch(function (err) {
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
      return tryLoadIndexedDbCachedJson().then(function (loadedJsonFromIdb) {
        if (loadedJsonFromIdb) {
          return { ok: true, source: "idb-cache", label: "cached" };
        }
        if (tryLoadCachedJson()) {
          return { ok: true, source: "local-cache", label: "cached" };
        }
        return tryLoadRecordSnapshot().then(function (loadedSnapshot) {
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
  // Always load canonical source file on startup.
  loadDefaultJson({ allowFallback: false }).then(function (result) {
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









export function loadUserGuideText() {
  var lang = (currentLang || "en");
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
    return fetch(candidates[index], { cache: "no-cache" })
      .then(function (resp) {
        if (!resp.ok) {
          return tryFetch(index + 1);
        }
        return resp.text();
      })
      .catch(function () {
        return tryFetch(index + 1);
      });
  }
  return tryFetch(0);
}







export function setActiveTab(tabName) {
  var tabButtons = document.querySelectorAll(".tab-btn");
  var panels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (btn) {
    var isActive = btn.getAttribute("data-tab") === tabName;
    btn.classList.toggle("active", isActive);
  });

  panels.forEach(function (panel) {
    var panelName = panel.id.replace("panel-", "");
    if (panelName === tabName) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "");
    }
  });
}



languageSelect.addEventListener("change", function () {
  applyLanguage(languageSelect.value);
});



document.querySelectorAll(".tab-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var tabName = btn.getAttribute("data-tab");
    setActiveTab(tabName);
    if (tabName === "map") {
      initMap("map-container");
      invalidateMapSize();
    }
  });
});

settingsToggle.addEventListener("click", function () {
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
  saveChangesBtn.addEventListener("click", function () {
    debugSaveChangesLog("saveChangesBtn:click");
    saveChangesToSource();
  });
}

if (saveAsCopyBtn) {
  saveAsCopyBtn.addEventListener("click", function () {
    debugSaveChangesLog("save-as-copy:click");
    saveChangesToSourceCopy();
  });
}

if (saveDropdownToggle && saveDropdownMenu) {
  saveDropdownToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const expanded = saveDropdownToggle.getAttribute("aria-expanded") === "true";
    saveDropdownToggle.setAttribute("aria-expanded", !expanded);
    if (!expanded) {
      saveDropdownMenu.style.display = "block";
    } else {
      saveDropdownMenu.style.display = "none";
    }
  });

  document.addEventListener("click", function () {
    saveDropdownToggle.setAttribute("aria-expanded", "false");
    saveDropdownMenu.style.display = "none";
  });
}

if (chooseFileLabel) {
  chooseFileLabel.addEventListener("click", function (e) {
    promptForDataFile();
  });
}

export async function promptForDataFile() {
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] }
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
      if (e.name !== 'AbortError') {
        console.error("showOpenFilePicker error", e);
        // Fallback on error
        if (fileInput) fileInput.click();
      }
    }
  } else {
    if (fileInput) fileInput.click();
  }
}

fileInput.addEventListener("change", function (event) {
  var file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }
  if (!/\.json$/i.test(file.name || "")) {
    statusEl.textContent = t("errInvalidXml");
    return;
  }
  var reader = new FileReader();
  reader.onerror = function () {
    statusEl.textContent = t("errReadSelected");
  };
  reader.onload = function () {
    try {
      currentFileHandle = null;
      loadFromJsonText(String(reader.result || ""), file.name);
    } catch (error) {
      statusEl.textContent = t("errParseSelected") + " " + error.message;
    }
  };
  reader.readAsText(file);
});

window.addEventListener("beforeunload", function (event) {
  debugSaveChangesLog("beforeunload:check");
  if (closeGuardBypass || !hasLoadedEditableSource || !showSaveChanges) {
    debugSaveChangesLog("beforeunload:allow");
    return;
  }
  event.preventDefault();
  event.returnValue = "";
  debugSaveChangesLog("beforeunload:block-open-guard");
  closeGuardPending = true;
  setTimeout(function () {
    if (closeGuardPending && !document.hidden) {
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

import("./dom.js").then(dom => {
  if (dom.reportModalClose) {
    dom.reportModalClose.addEventListener('click', function () {
      dom.reportModal.setAttribute('hidden', '');
    });
  }
  if (dom.reportModalPrint) {
    dom.reportModalPrint.addEventListener('click', function () {
      window.print();
    });
  }
  if (dom.routeReportModalClose) {
    dom.routeReportModalClose.addEventListener('click', function () {
      dom.routeReportModal.setAttribute('hidden', '');
    });
  }
  if (dom.routeReportModalPrint) {
    dom.routeReportModalPrint.addEventListener('click', function () {
      window.print();
    });
  }
  // Also close modal when clicking the backdrop
  document.addEventListener('click', function (e) {
    if (e.target.matches('[data-report-modal-close="1"]')) {
      dom.reportModal.setAttribute('hidden', '');
    }
    if (e.target.matches('[data-route-report-modal-close="1"]')) {
      dom.routeReportModal.setAttribute('hidden', '');
    }
  });
});

initCellLinks();
window.createAddressesResetBackup = createAddressesResetBackup;
window.resetAddressesDatabase = resetAddressesDatabase;
setActiveTab("dashboard");
loadInitialData();
