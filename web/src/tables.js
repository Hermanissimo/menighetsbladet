import { getStatusLabel, setText, exportDriverDistributorsCsv, setActiveTab, exportDriverDistributorsXlsx, setBodyRows, asComparable, recalculateAndRenderDashboard, openReportModal, openRouteReportModal } from "./main.js";
import { toInt, escapeHtml, debounce } from "./utils.js";
import { t } from "./i18n.js";
import { currentData, emptyFilterCriteria, filterState, filterComponents, batchSelectionState, sortState, paginationState, sortConfig, filterFieldMap } from "./state.js";
import { normalizeRouteIdentifier, getDistributorRoutes } from "./calculations.js";

import { openEditModal, openDeleteModal, openBatchDeleteModal, openBatchStatusModal, openBatchRouteModal } from "./modals.js";
import { updateMapData, initMap, invalidateMapSize, selectAddressOnMap } from "./map.js";

export function renderDriversTable(rows) {
    var filteredRows = applyFilter("drivers", rows);
    var sortedRows = applySort("drivers", filteredRows);
    var pageData = paginateRows("drivers", sortedRows);
    var html = pageData.rows.map(function (r) {
      return "<tr>" +
        "<td>" + escapeHtml(r.name) + "</td>" +
        "<td>" + escapeHtml(getStatusLabel(r.status)) + "</td>" +
        "<td>" + escapeHtml(r.driverNr) + "</td>" +
        "<td>" + escapeHtml(r.phone) + "</td>" +
        "<td>" + (r.email ? "<a href=\"mailto:" + escapeHtml(r.email) + "\" class=\"cell-link mailto-link\" title=\"" + escapeHtml(t("sendEmailTitle") || "Send e-post") + "\">" + escapeHtml(r.email) + "</a>" : "") + "</td>" +
        "<td>" + escapeHtml(r.address) + "</td>" +
        "<td>" + escapeHtml(r.postnr) + "</td>" +
        "<td>" + buildNavCell(r.routeCount, "routes", "driverName", r.name) + "</td>" +
        "<td>" + buildNavCell(r.paperCount, "addresses", "driverName", r.name) + "</td>" +
        "<td>" + buildRowActionSelect("drivers", r) + "</td>" +
        "</tr>";
    }).join("");
    setBodyRows("drivers-body", html);
    var routeTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.routeCount); }, 0);
    var paperTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.paperCount); }, 0);
    setTotals("drivers", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsRoutes") + "=" + routeTotal + " | " + t("totalsPapers") + "=" + paperTotal);
    setPagerState("drivers", pageData.page, pageData.totalPages);
  }


export function renderDistributorsTable(rows) {
    var filteredRows = applyFilter("distributors", rows);
    var sortedRows = applySort("distributors", filteredRows);
    var pageData = paginateRows("distributors", sortedRows);
    var html = pageData.rows.map(function (r) {
      var isActive = (r.status || "active").toLowerCase() === "active";
      var hasDriver = !!(r.driverName && String(r.driverName).trim()) || !!(r.driverNr && String(r.driverNr).trim());
      var isWarning = isActive && !hasDriver;
      var driverCellContent = "";
      if (hasDriver) {
        driverCellContent = buildNavCell(r.driverName, "drivers", "driverName", r.driverName);
      } else if (isActive) {
        driverCellContent = "<span class=\"warning-badge\" title=\"" + escapeHtml(t("warningDistributorNoDriver") || "Aktiv bladbærer mangler sjåfør") + "\">⚠️ " + escapeHtml(t("warningNoDriver") || "Mangler sjåfør") + "</span>";
      } else {
        driverCellContent = escapeHtml(r.driverName || "");
      }
      return "<tr" + (isWarning ? " class=\"warning-row unassigned-row\"" : "") + ">" +
        "<td>" + escapeHtml(r.name) + "</td>" +
        "<td>" + escapeHtml(getStatusLabel(r.status)) + "</td>" +
        "<td>" + (getDistributorRoutes(r).map(function (routeId) { return buildNavCell(routeId, "routes", "route", routeId); }).join("<br>")) + "</td>" +
        "<td>" + driverCellContent + "</td>" +
        "<td>" + escapeHtml(r.phone) + "</td>" +
        "<td>" + (r.email ? "<a href=\"mailto:" + escapeHtml(r.email) + "\" class=\"cell-link mailto-link\" title=\"" + escapeHtml(t("sendEmailTitle") || "Send e-post") + "\">" + escapeHtml(r.email) + "</a>" : "") + "</td>" +
        "<td>" + escapeHtml(r.address) + "</td>" +
        "<td>" + escapeHtml(r.postnr) + "</td>" +
        "<td>" + escapeHtml(r.extraPapers || 0) + "</td>" +
        "<td>" + buildNavCell(r.paperCount, "addresses", "distributorName", r.name) + "</td>" +
        "<td>" + buildRowActionSelect("distributors", r) + "</td>" +
        "</tr>";
    }).join("");
    setBodyRows("distributors-body", html);
    var paperTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.paperCount); }, 0);
    var activeNoDriverCount = filteredRows.filter(function (r) {
      var isActive = (r.status || "active").toLowerCase() === "active";
      var hasDriver = !!(r.driverName && String(r.driverName).trim()) || !!(r.driverNr && String(r.driverNr).trim());
      return isActive && !hasDriver;
    }).length;
    var warningText = activeNoDriverCount > 0 ? " | ⚠️ " + (t("warningDistributorsMissingDriver", { count: activeNoDriverCount }) || ("Mangler sjåfør: " + activeNoDriverCount)) : "";
    setTotals("distributors", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsPapers") + "=" + paperTotal + warningText);
    setPagerState("distributors", pageData.page, pageData.totalPages);
  }


export function renderRoutesTable(rows) {
    var filteredRows = applyFilter("routes", rows);
    var sortedRows = applySort("routes", filteredRows);
    var pageData = paginateRows("routes", sortedRows);
    var html = pageData.rows.map(function (r) {
      var isUnassigned = !r.distributor || r.distributor.trim() === "" || r.distributor.toLowerCase() === "unassigned";
      var distArr = String(r.distributorNames || "").split(/,\s*/).filter(function (x) { return x; });
      var distCell = distArr.map(function (n) {
        return "<button type=\"button\" class=\"cell-link\" data-nav-tab=\"distributors\" data-nav-key=\"distributorName\" data-nav-val=\"" + escapeHtml(n) + "\">" + escapeHtml(n) + "</button>";
      }).join("<br>");
      return "<tr" + (isUnassigned ? " class=\"unassigned-row\"" : "") + ">" +
        buildRowSelectCell("routes", r) +
        "<td><span class=\"route-id-cell-wrap\">" + escapeHtml(r.routeId) + " <button type=\"button\" class=\"cell-link map-icon-btn\" data-nav-tab=\"map\" data-nav-key=\"route\" data-nav-val=\"" + escapeHtml(r.routeId) + "\" title=\"" + escapeHtml(t("showOnMapTitle") || "Show on map") + "\">🗺️</button></span></td>" +
        "<td>" + escapeHtml(getStatusLabel(r.status)) + "</td>" +
        "<td>" + distCell + "</td>" +
        "<td>" + buildNavCell(r.driver, "drivers", "driverName", r.driver) + "</td>" +
        "<td>" + buildNavCell(r.includedAddresses, "addresses", "route", r.routeId) + "</td>" +
        "<td>" + escapeHtml(r.extraPapers || 0) + "</td>" +
        "<td>" + escapeHtml(r.paperCount) + "</td>" +
        "<td>" + (r.addressRanges ? "<ul class=\"desc-list\"><li>" + escapeHtml(r.addressRanges).split("\n").join("</li><li>") + "</li></ul>" : "") + "</td>" +
        "<td>" + escapeHtml(r.notes) + "</td>" +
        "<td>" + buildRowActionSelect("routes", r) + "</td>" +
        "</tr>";
    }).join("");
    setBodyRows("routes-body", html);
    updateBatchControls("routes");
    var distTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.distributorCount); }, 0);
    var addrTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.includedAddresses); }, 0);
    var paperTotal = filteredRows.reduce(function (acc, r) { return acc + toInt(r.paperCount); }, 0);
    setTotals("routes", t("totalsLabel") + ": " + t("totalsRecords") + "=" + filteredRows.length + " | " + t("totalsDistributors") + "=" + distTotal + " | " + t("totalsAddresses") + "=" + addrTotal + " | " + t("totalsPapers") + "=" + paperTotal);
    setPagerState("routes", pageData.page, pageData.totalPages);
  }


export function renderAddressesTable(rows) {
    var filteredRows = applyFilter("addresses", rows);
    var sortedRows = applySort("addresses", filteredRows);
    var pageData = paginateRows("addresses", sortedRows);
    var html = pageData.rows.map(function (r) {
      var isUnassigned = !r.route || r.route.trim() === "" || r.route.toLowerCase() === "unassigned";
      return "<tr" + (isUnassigned ? " class=\"unassigned-row\"" : "") + ">" +
        buildRowSelectCell("addresses", r) +
        "<td><span class=\"route-id-cell-wrap\">" + escapeHtml(r.address) + " <button type=\"button\" class=\"cell-link map-icon-btn\" data-nav-tab=\"map\" data-nav-key=\"address\" data-nav-val=\"" + escapeHtml(r.address) + "\" data-nav-route=\"" + escapeHtml(r.route || "") + "\" title=\"" + escapeHtml(t("showOnMapTitle") || "Show on map") + "\">🗺️</button></span></td>" +
        "<td>" + buildNavCell(r.route, "routes", "route", r.route) + "</td>" +
        "<td>" + buildNavCell(r.distributor, "distributors", "distributorName", r.distributor) + "</td>" +
        "<td>" + escapeHtml(r.numberOfHouseholds) + "</td>" +
        "<td>" + escapeHtml(r.numberOfExcludedHouseholds) + "</td>" +
        "<td>" + escapeHtml(r.postnr) + "</td>" +
        "<td>" + escapeHtml(r.note) + "</td>" +
        "<td>" + buildRowActionSelect("addresses", r) + "</td>" +
        "</tr>";
    }).join("");
    setBodyRows("addresses-body", html);
    updateBatchControls("addresses");
    var included = 0;
    var excluded = 0;
    var includedHouseholds = 0;
    var excludedHouseholds = 0;
    filteredRows.forEach(function (r) {
      var hh = Math.max(1, toInt(r.numberOfHouseholds));
      var ex = Math.max(0, toInt(r.numberOfExcludedHouseholds));
      ex = Math.min(ex, hh);
      includedHouseholds += (hh - ex);
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


export function renderAllTables() {
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


export function buildEditButton(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return "";
    }
    return "<button class=\"btn tertiary edit-row-btn\" type=\"button\" data-table=\"" + tableName + "\" data-index=\"" + rowIndex + "\">" +
      escapeHtml(t("editAction")) + "</button>";
  }


export function buildDeleteButton(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return "";
    }
    return "<button class=\"btn tertiary delete-row-btn\" type=\"button\" data-table=\"" + tableName + "\" data-index=\"" + rowIndex + "\">" +
      escapeHtml(t("deleteAction")) + "</button>";
  }


export function buildRowActionSelect(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return "";
    }
    var html = "<select class=\"row-action-select\" data-index=\"" + rowIndex + "\" aria-label=\"" + escapeHtml(t("actionsCol")) + "\">" +
      "<option value=\"\" selected disabled hidden>" + escapeHtml(t("actionsCol")) + "</option>" +
      "<option value=\"edit\">" + escapeHtml(t("editAction")) + "</option>" +
      "<option value=\"delete\">" + escapeHtml(t("deleteAction")) + "</option>";
    // Add driver-specific export actions
    if (tableName === "drivers") {
      html += "<option value=\"export-distributors-csv\">" + escapeHtml(t("exportDriverDistributorsCsvAction")) + "</option>" +
              "<option value=\"export-distributors-xlsx\">" + escapeHtml(t("exportDriverDistributorsXlsxAction")) + "</option>" +
              "<option value=\"print-run-sheet\">" + escapeHtml(t("printRunSheetAction") || "Preview & Print Kjøreliste") + "</option>";
    }
    if (tableName === "routes") {
      html += "<option value=\"view-route-report\">" + escapeHtml(t("viewRouteReportAction") || "View route report") + "</option>";
    }
    html += "</select>";
    return html;
  }


export function buildRowSelectCell(tableName, row) {
    var rowIndex = currentData[tableName].indexOf(row);
    if (rowIndex < 0) {
      return "<td class=\"row-select-cell\"></td>";
    }
    var checked = !!batchSelectionState[tableName][rowIndex];
    return "<td class=\"row-select-cell\">" +
      "<input type=\"checkbox\" class=\"row-select-checkbox\" data-table=\"" + escapeHtml(tableName) + "\" data-index=\"" + rowIndex + "\" aria-label=\"" + escapeHtml(t("rowSelectLabel")) + "\" " + (checked ? "checked" : "") + " />" +
      "</td>";
  }


export function buildNavCell(text, targetTab, criterionKey, criterionVal) {
    var display = escapeHtml(String(text));
    if (!display || !criterionVal) { return display; }
    return "<button type=\"button\" class=\"cell-link\" " +
      "data-nav-tab=\"" + escapeHtml(targetTab) + "\" " +
      "data-nav-key=\"" + escapeHtml(criterionKey) + "\" " +
      "data-nav-val=\"" + escapeHtml(String(criterionVal)) + "\">" +
      display + "</button>";
  }


export function updateSortHeaderIndicators(tableName) {
    var cfg = sortConfig[tableName];
    if (!cfg) {
      return;
    }
    var headers = document.querySelectorAll("#" + cfg.panelId + " thead th");
    var state = sortState[tableName];
    headers.forEach(function (th, idx) {
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

export function initSortableColumns() {
    Object.keys(sortConfig).forEach(function (tableName) {
      var cfg = sortConfig[tableName];
      var headers = document.querySelectorAll("#" + cfg.panelId + " thead th");
      headers.forEach(function (th, idx) {
        var key = cfg.keys[idx];
        if (!key) {
          return;
        }
        th.classList.add("sortable");
        th.setAttribute("aria-sort", "none");
        th.addEventListener("click", function () {
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


export function initResizableColumns() {
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
        // Ignore storage failures.
      }
    }

    function restoreTableWidths(table, headers) {
      var allWidths = readAllWidths();
      var tableKey = getTableStorageKey(table);
      var tableWidths = allWidths[tableKey];
      if (!tableWidths) {
        return;
      }
      headers.forEach(function (th, idx) {
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
      headers.forEach(function (th, idx) {
        var headerKey = getHeaderStorageKey(th, idx);
        var width = parseInt(th.style.width, 10);
        if (Number.isFinite(width) && width >= 70) {
          allWidths[tableKey][headerKey] = width;
        }
      });
      writeAllWidths(allWidths);
    }

    var tables = document.querySelectorAll(".dash-table, .data-table");
    tables.forEach(function (table) {
      if (table.dataset.resizeReady === "1") {
        return;
      }
      table.classList.add("resizable");
      var headers = table.querySelectorAll("thead th");
      restoreTableWidths(table, headers);
      headers.forEach(function (th) {
        if (th.querySelector(".col-resize-handle")) {
          return;
        }
        var handle = document.createElement("span");
        handle.className = "col-resize-handle";
        handle.setAttribute("aria-hidden", "true");
        th.appendChild(handle);

        handle.addEventListener("mousedown", function (event) {
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


export function applySort(tableName, rows) {
    var state = sortState[tableName];
    if (!state || !state.key) {
      return rows.slice();
    }
    var dir = state.dir;
    var key = state.key;
    
    var mapped = rows.map(function(row) {
      return { row: row, val: asComparable(row[key]) };
    });
    
    mapped.sort(function (a, b) {
      var av = a.val;
      var bv = b.val;
      if (av.type === "num" && bv.type === "num") {
        return (av.value - bv.value) * dir;
      }
      if (av.type === "str" && bv.type === "str") {
        return av.value.localeCompare(bv.value, undefined, { numeric: true, sensitivity: 'base' }) * dir;
      }
      if (av.value < bv.value) {
        return -1 * dir;
      }
      if (av.value > bv.value) {
        return 1 * dir;
      }
      return 0;
    });
    
    return mapped.map(function(el) { return el.row; });
  }


export function applyFilter(tableName, rows) {
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
    
    return rows.filter(function (row) {
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


export function paginateRows(tableName, rows) {
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
      totalRows: totalRows,
      page: state.page,
      totalPages: totalPages
    };
  }


export function setPagerState(tableName, page, totalPages) {
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


export function setTotals(tableName, text) {
    setText(tableName + "-totals", text);
  }


export function getFilteredSortedRows(tableName) {
    var rows = currentData[tableName] || [];
    return applySort(tableName, applyFilter(tableName, rows));
  }


export function setRowSelected(tableName, rowIndex, selected) {
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


export function getSelectedIndexes(tableName) {
    var map = batchSelectionState[tableName] || {};
    return Object.keys(map).map(function (key) {
      return parseInt(key, 10);
    }).filter(function (idx) {
      return Number.isFinite(idx) && idx >= 0 && idx < (currentData[tableName] || []).length;
    }).sort(function (a, b) { return a - b; });
  }


export function clearBatchSelection(tableName) {
    batchSelectionState[tableName] = {};
  }


export function clearAllBatchSelections() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
      clearBatchSelection(tableName);
      updateBatchControls(tableName);
    });
  }


export function updateBatchControls(tableName) {
    var selectedCount = getSelectedIndexes(tableName).length;
    var btn = document.getElementById("batch-delete-" + tableName);
    var statusBtn = document.getElementById("batch-status-" + tableName);
    var routeBtn = document.getElementById("batch-route-" + tableName);
    var chip = document.getElementById("selected-chip-" + tableName);
    var selectAll = document.getElementById("select-all-" + tableName);
    var body = document.getElementById(tableName + "-body");
    if (btn) {
      btn.disabled = selectedCount === 0;
      btn.textContent = selectedCount > 0
        ? t("batchDeleteWithCount", { count: selectedCount })
        : t("batchDeleteAction");
    }
    if (statusBtn) {
      statusBtn.disabled = selectedCount === 0;
      statusBtn.textContent = selectedCount > 0
        ? t("batchStatusWithCount", { count: selectedCount })
        : t("batchStatusAction");
    }
    if (routeBtn) {
      routeBtn.disabled = selectedCount === 0;
      routeBtn.textContent = selectedCount > 0
        ? t("batchRouteWithCount", { count: selectedCount })
        : t("batchRouteAction");
    }
    
    if (tableName === "routes") {
      var mergeBtn = document.getElementById("merge-routes-btn");
      if (mergeBtn) {
        mergeBtn.disabled = selectedCount < 2;
        mergeBtn.textContent = selectedCount >= 2 
          ? t("btnMergeRoutes") + " (" + selectedCount + ")" 
          : t("btnMergeRoutes");
      }
    }

    if (chip) {
      chip.textContent = t("selectedChip", { count: selectedCount });
      chip.classList.toggle("is-empty", selectedCount === 0);
      chip.classList.toggle("is-active", selectedCount > 0);
    }
    if (selectAll && body) {
      var visibleChecks = Array.prototype.slice.call(body.querySelectorAll(".row-select-checkbox"));
      var checkedVisible = visibleChecks.filter(function (cb) { return cb.checked; }).length;
      var allChecked = visibleChecks.length > 0 && checkedVisible === visibleChecks.length;
      var noneChecked = checkedVisible === 0;
      selectAll.checked = allChecked;
      selectAll.indeterminate = !allChecked && !noneChecked;
    }
  }


export function initTableFilters() {
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
      var rows = currentData[tableName] || [];
      var fieldsForCriterion = (filterFieldMap[tableName] || {})[criterionKey] || [];
      var out = [];
      var seen = {};
      rows.forEach(function (row) {
        fieldsForCriterion.forEach(function (fieldName) {
          var raw = row[fieldName];
          if (raw == null) {
            return;
          }
          String(raw).split(",").forEach(function (part) {
            var value = String(part || "").trim();
            if (!value) {
              return;
            }
            var low = value.toLowerCase();
            if (seen[low]) {
              return;
            }
            seen[low] = true;
            out.push(value);
          });
        });
      });
      return out.sort(function (a, b) {
        return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
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
      var current = (filterState[tableName][criterionKey] || []).filter(function (v) {
        return normalized(v) !== low;
      });
      setFilterSelection(tableName, criterionKey, current);
      paginationState[tableName].page = 1;
      refreshFilterComponents(tableName);
      renderAllTables();
    }

    function clearTableFilters(tableName) {
      filterState[tableName] = emptyFilterCriteria();
      fields.forEach(function (field) {
        var input = document.getElementById("filter-" + tableName + "-" + field);
        if (input) {
          input.value = "";
        }
      });
      if (tableName === "addresses") {
        var addressInput = document.getElementById("filter-addresses-address");
        if (addressInput) {
          addressInput.value = "";
        }
        var chkOnlyExcluded = document.getElementById("filter-addresses-only-excluded");
        if (chkOnlyExcluded) {
          chkOnlyExcluded.checked = false;
        }
        var chkWithExcluded = document.getElementById("filter-addresses-with-excluded");
        if (chkWithExcluded) {
          chkWithExcluded.checked = false;
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
      clearBtn.textContent = "×";
      clearBtn.setAttribute("aria-label", t("clearFilter"));
      clearBtn.title = t("clearFilter");
      clearBtn.addEventListener("click", function () {
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
        selected.forEach(function (value) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "multi-filter-chip";
          chip.textContent = value + " ×";
          chip.addEventListener("click", function () {
            removeSelection(tableName, criterionKey, value);
          });
          chipsEl.appendChild(chip);
        });

        var search = normalized(inputEl.value);
        var options = optionsForFilter(tableName, criterionKey).filter(function (value) {
          var low = normalized(value);
          if (!low) {
            return false;
          }
          if ((filterState[tableName][criterionKey] || []).some(function (v) { return normalized(v) === low; })) {
            return false;
          }
          return !search || low.indexOf(search) !== -1;
        }).slice(0, 60);

        menuEl.innerHTML = "";
        if (isOpen && options.length) {
          options.forEach(function (value) {
            var optionBtn = document.createElement("button");
            optionBtn.type = "button";
            optionBtn.className = "multi-filter-option";
            optionBtn.textContent = value;
            optionBtn.addEventListener("mousedown", function (event) {
              event.preventDefault();
            });
            optionBtn.addEventListener("click", function () {
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
        // Update placeholder: hide when there is a selection or input value
        try {
          var show = true;
          if (String(inputEl.value || "").trim()) { show = false; }
          if (selected && selected.length) { show = false; }
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
          // ignore
        }
      }

      inputEl.addEventListener("change", function () {
        var val = String(inputEl.value || "").trim();
        if (val) {
          addSelection(tableName, criterionKey, val);
          inputEl.value = "";
          renderComponent();
        }
      });
      inputEl.addEventListener("focus", function () {
        isOpen = true;
        renderComponent();
      });
      inputEl.addEventListener("blur", function () {
        setTimeout(function () {
          isOpen = false;
          renderComponent();
        }, 120);
      });
      inputEl.addEventListener("input", debounce(function () {
        isOpen = true;
        renderComponent();
      }, 150));
      inputEl.addEventListener("keydown", function (event) {
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

    ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
      fields.forEach(function (field) {
        var input = document.getElementById("filter-" + tableName + "-" + field);
        if (!input) {
          return;
        }
        buildMultiSelect(tableName, field, input);
      });

      var resetBtn = document.getElementById("reset-filters-" + tableName);
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          clearTableFilters(tableName);
          paginationState[tableName].page = 1;
        });
      }
    });

    var addressInput = document.getElementById("filter-addresses-address");
    if (addressInput) {
      addressInput.addEventListener("input", debounce(function () {
        var searchText = String(addressInput.value || "").trim();
        filterState.addresses.address = searchText ? [searchText] : [];
        paginationState.addresses.page = 1;
        renderAllTables();
      }, 250));
    }

    var chkOnlyExcluded = document.getElementById("filter-addresses-only-excluded");
    if (chkOnlyExcluded) {
      chkOnlyExcluded.addEventListener("change", function () {
        filterState.addresses.onlyExcludedAddresses = chkOnlyExcluded.checked;
        paginationState.addresses.page = 1;
        renderAllTables();
      });
    }

    var chkWithExcluded = document.getElementById("filter-addresses-with-excluded");
    if (chkWithExcluded) {
      chkWithExcluded.addEventListener("change", function () {
        filterState.addresses.onlyWithExcludedHouseholds = chkWithExcluded.checked;
        paginationState.addresses.page = 1;
        renderAllTables();
      });
    }
  }


export function initPaginationControls() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
      var sizeEl = document.getElementById("page-size-" + tableName);
      var prevEl = document.getElementById("page-prev-" + tableName);
      var nextEl = document.getElementById("page-next-" + tableName);
      if (sizeEl) {
        sizeEl.value = String(paginationState[tableName].pageSize);
        sizeEl.addEventListener("change", function () {
          var v = parseInt(sizeEl.value, 10);
          paginationState[tableName].pageSize = Number.isFinite(v) ? v : 25;
          paginationState[tableName].page = 1;
          renderAllTables();
        });
      }
      if (prevEl) {
        prevEl.addEventListener("click", function () {
          paginationState[tableName].page = Math.max(1, paginationState[tableName].page - 1);
          renderAllTables();
        });
      }
      if (nextEl) {
        nextEl.addEventListener("click", function () {
          paginationState[tableName].page += 1;
          renderAllTables();
        });
      }
    });
  }


export function initCellLinks() {
    document.addEventListener("click", function (event) {
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


export function initRowActionMenus() {
    ["drivers", "distributors", "routes", "addresses"].forEach(function (tableName) {
      var body = document.getElementById(tableName + "-body");
      if (!body) {
        return;
      }
      body.addEventListener("change", function (event) {
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
      body.addEventListener("change", function (event) {
        var target = event.target;
        if (!target || !target.classList || !target.classList.contains("row-select-checkbox")) {
          return;
        }
        var idx = parseInt(target.getAttribute("data-index"), 10);
        setRowSelected(tableName, idx, !!target.checked);
      });
    });
  }


export function initBatchSelectionControls() {
    ["drivers", "distributors", "addresses", "routes"].forEach(function (tableName) {
      var selectAll = document.getElementById("select-all-" + tableName);
      var batchDeleteBtn = document.getElementById("batch-delete-" + tableName);
      var batchStatusBtn = document.getElementById("batch-status-" + tableName);
      var batchRouteBtn = document.getElementById("batch-route-" + tableName);
      if (selectAll) {
        selectAll.addEventListener("change", function () {
          var body = document.getElementById(tableName + "-body");
          if (!body) {
            return;
          }
          var shouldSelect = !!selectAll.checked;
          Array.prototype.slice.call(body.querySelectorAll(".row-select-checkbox")).forEach(function (cb) {
            var idx = parseInt(cb.getAttribute("data-index"), 10);
            cb.checked = shouldSelect;
            setRowSelected(tableName, idx, shouldSelect);
          });
          updateBatchControls(tableName);
        });
      }
      if (batchDeleteBtn) {
        batchDeleteBtn.addEventListener("click", function () {
          openBatchDeleteModal(tableName);
        });
      }
      if (batchStatusBtn) {
        batchStatusBtn.addEventListener("click", function () {
          openBatchStatusModal(tableName);
        });
      }
      if (batchRouteBtn) {
        batchRouteBtn.addEventListener("click", function () {
          openBatchRouteModal(tableName);
        });
      }
      updateBatchControls(tableName);
    });
  }


export function buildDeleteSummaryHtml(tableName, rows) {
    var lines = [];
    lines.push(t("batchSummarySelected", { count: rows.length }));
    if (tableName === "drivers") {
      var driverNrs = {};
      rows.forEach(function (r) { driverNrs[String(r.driverNr || "")] = true; });
      var affectedDists = currentData.distributors.filter(function (d) {
        return !!driverNrs[String(d.driverNr || "")];
      }).length;
      var affectedRoutes = currentData.routes.filter(function (r) {
        return !!driverNrs[String(r.driverNr || "")];
      }).length;
      lines.push(t("batchSummaryAffectedDistributors", { count: affectedDists }));
      lines.push(t("batchSummaryAffectedRoutes", { count: affectedRoutes }));
    } else if (tableName === "distributors") {
      var distNames = {};
      rows.forEach(function (r) { distNames[String(r.name || "")] = true; });
      var affectedAddresses = currentData.addresses.filter(function (a) {
        return !!distNames[String(a.distributor || "")];
      }).length;
      lines.push(t("batchSummaryAffectedAddresses", { count: affectedAddresses }));
    } else if (tableName === "routes") {
      var routeIds = {};
      rows.forEach(function (r) { routeIds[normalizeRouteIdentifier(r.routeId || "")] = true; });
      var affectedDistributors = currentData.distributors.filter(function (d) {
        var routes = getDistributorRoutes(d);
        return routes.some(function (routeId) {
          return !!routeIds[normalizeRouteIdentifier(routeId)];
        });
      }).length;
      var affectedAddressesForRoutes = currentData.addresses.filter(function (a) {
        return !!routeIds[normalizeRouteIdentifier(a.route || "")];
      }).length;
      lines.push(t("batchSummaryAffectedDistributors", { count: affectedDistributors }));
      lines.push(t("batchSummaryAffectedAddresses", { count: affectedAddressesForRoutes }));
    } else if (tableName === "addresses") {
      var included = 0;
      var excluded = 0;
      var includedHouseholds = 0;
      var excludedHouseholds = 0;
      rows.forEach(function (r) {
        var hh = Math.max(1, toInt(r.numberOfHouseholds));
        var ex = Math.max(0, toInt(r.numberOfExcludedHouseholds));
        ex = Math.min(ex, hh);
        includedHouseholds += (hh - ex);
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
    return lines.map(function (line) {
      return "<div>" + escapeHtml(line) + "</div>";
    }).join("");
  }


export function statusOptionsForTable(tableName) {
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


export function setFilterSelection(tableName, criterionKey, values) {
    var dedup = [];
    var seen = {};
    (values || []).forEach(function (v) {
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


export function clearFilterSelection(tableName, criterionKey) {
    filterState[tableName][criterionKey] = [];
  }


export function refreshFilterComponents(tableName) {
    var tableComps = filterComponents[tableName] || {};
    Object.keys(tableComps).forEach(function (field) {
      var comp = tableComps[field];
      if (comp && typeof comp.render === "function") {
        comp.render();
      }
    });
  }


export function navigateToTable(targetTab, criterionKey, criterionVal) {
    var criterionToField = {
      route: "route",
      status: "status",
      distributorName: "distributor",
      driverName: "driver",
      postnr: "postnr",
    };
    filterState[targetTab] = emptyFilterCriteria();
    ["route", "status", "distributor", "driver", "postnr"].forEach(function (f) {
      var el = document.getElementById("filter-" + targetTab + "-" + f);
      if (el) { el.value = ""; }
    });
    if (criterionKey && criterionVal) {
      setFilterSelection(targetTab, criterionKey, [criterionVal]);
      var suffix = criterionToField[criterionKey];
      if (suffix) {
        var targetInput = document.getElementById("filter-" + targetTab + "-" + suffix);
        if (targetInput) { targetInput.value = ""; }
      }
    }
    paginationState[targetTab].page = 1;
    refreshFilterComponents(targetTab);
    renderAllTables();
    setActiveTab(targetTab);
  }


export function rowMatchesAnyField(row, fieldKeys, needles) {
    if (!needles || !needles.length) {
      return true;
    }

    function valueMatchesNeedle(rawValue, needle) {
      if (Array.isArray(rawValue)) {
        for (var a = 0; a < rawValue.length; a += 1) {
          if (valueMatchesNeedle(rawValue[a], needle)) {
            return true;
          }
        }
        return false;
      }
      var value = String(rawValue == null ? "" : rawValue).trim().toLowerCase();
      if (!value) {
        return false;
      }
      if (value === needle) {
        return true;
      }
      var tokens = value.split(",").map(function (part) {
        return String(part || "").trim();
      }).filter(Boolean);
      for (var t = 0; t < tokens.length; t += 1) {
        if (tokens[t] === needle) {
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


export function addressMatchesSubstring(row, fieldKeys, searchText) {
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


export function rowMatchesAllCriteria(row, map, normalizedCriteria) {
    return rowMatchesAnyField(row, map.route || [], normalizedCriteria.route) &&
      rowMatchesAnyField(row, map.status || [], normalizedCriteria.status) &&
      rowMatchesAnyField(row, map.distributorName || [], normalizedCriteria.distributorName) &&
      rowMatchesAnyField(row, map.driverName || [], normalizedCriteria.driverName) &&
      rowMatchesAnyField(row, map.postnr || [], normalizedCriteria.postnr) &&
      rowMatchesAnyField(row, map.active || [], normalizedCriteria.active) &&
      addressMatchesSubstring(row, map.address || [], normalizedCriteria.addressText);
  }


export function normalizeFilterValues(values) {
    var out = [];
    var seen = {};
    (Array.isArray(values) ? values : []).forEach(function (value) {
      var v = String(value || "").toLowerCase().trim();
      if (!v || seen[v]) {
        return;
      }
      seen[v] = true;
      out.push(v);
    });
    return out;
  }

export function flushPendingFilters(tableName) {
  var container = document.getElementById("panel-" + tableName);
  if (!container) return;
  container.querySelectorAll(".multi-filter-control input").forEach(function (inputEl) {
    var val = String(inputEl.value || "").trim();
    if (val) {
      inputEl.dispatchEvent(new Event("change"));
    }
  });
}
