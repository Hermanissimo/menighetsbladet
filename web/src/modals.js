import { setHasUserCommittedEdits, setShowSaveChanges, debugSaveChangesLog, validateRequiredFields, validateFieldFormats, canEditCurrentData, syncCurrentDataFromJson, loadUserGuideText, saveChangesToSource, promptForDataFile, getRequiredFields, render, refreshUnsavedChangesFromData, scheduleAutosave } from "./main.js";
import { t } from "./i18n.js";
import { currentData, editState, deleteState, batchStatusState, batchRouteState, editFieldsByTable, addFieldsByTable, tableTitleKeys, tableTitleSingleKeys, fieldLabelKeyByTable } from "./state.js";
import { statusEl, fileInput, editModal, editModalTitle, editModalClose, editModalCancel, editModalForm, editModalFields, editModalError, addDriverBtn, addDistributorBtn, addAddressBtn, addRouteBtn, loadResultModal, loadResultTitle, loadResultMessage, openUserGuideBtn, floatingGuideBtn, userGuideModal, userGuideContent, closeGuardModal, closeGuardSaveBtn, closeGuardContinueBtn, closeGuardCloseBtn, sourceMissingModal, openDataFolderBtn } from "./dom.js";
import { normalizeRouteIdentifier, recomputeMetricsFromCurrentData, normalizeRecords, normalizeAddressRow, normalizeRouteValues, getDistributorRoutes, normalizeDistributorRow, recalculateRoutesFromCurrentData, recalculatePaperCounts } from "./calculations.js";

import { renderAllTables, getSelectedIndexes, clearBatchSelection, buildDeleteSummaryHtml, statusOptionsForTable } from "./tables.js";

export function clearModalError() {
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


export function setModalError(message) {
  if (editModalError) {
    editModalError.textContent = message;
    if (message) {
      editModalError.removeAttribute("hidden");
    } else {
      editModalError.setAttribute("hidden", "");
    }
  }
}

export function setFieldError(fieldName, message, containerId) {
  var container = containerId ? document.getElementById(containerId) : editModalFields;
  if (!container) return;
  var control = container.querySelector('[data-field="' + fieldName + '"]');
  if (!control) return;
  var label = control.closest('label');
  if (!label) return;
  var errDiv = label.querySelector('.field-error-message');
  if (errDiv) {
    errDiv.textContent = message || "";
    errDiv.hidden = !message;
  }
}


export function buildModalFields(tableName, row, fields) {
    editModalFields.innerHTML = "";
    fields.forEach(function (fieldName) {
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
        statusOptionsForTable(tableName).forEach(function (opt) {
          var option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          if ((row[fieldName] || "").toLowerCase() === opt.value) {
            option.selected = true;
          }
          control.appendChild(option);
        });
      } else if ((tableName === "distributors" && fieldName === "driverName") || (tableName === "routes" && fieldName === "driver")) {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        var foundDriver = false;
        currentData.drivers.forEach(function (drv) {
          var option = document.createElement("option");
          option.value = drv.name;
          option.textContent = drv.name;
          if (row[fieldName] === drv.name) {
            option.selected = true;
            foundDriver = true;
          }
          control.appendChild(option);
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
        currentData.distributors.forEach(function (dist) {
          var option = document.createElement("option");
          option.value = dist.name;
          option.textContent = dist.name;
          if (row[fieldName] === dist.name) {
            option.selected = true;
            foundDist = true;
          }
          control.appendChild(option);
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
        currentData.routes.forEach(function (rt) {
          var option = document.createElement("option");
          option.value = rt.routeId;
          if (assignedRoutes.indexOf(rt.routeId) !== -1) {
            option.selected = true;
          }
          var text = rt.routeId;
          if (rt.distributor && rt.distributor !== row.name) {
            text += " (" + rt.distributor + ")";
          }
          option.textContent = text;
          control.appendChild(option);
        });
      } else if (tableName === "addresses" && fieldName === "route") {
        control = document.createElement("select");
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "\u2014";
        control.appendChild(emptyOpt);
        
        var existingRoutes = currentData.routes.map(function(r) { return r.routeId; }).filter(Boolean).sort(function(a, b) {
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        var found = false;
        existingRoutes.forEach(function (routeId) {
          var option = document.createElement("option");
          option.value = routeId;
          option.textContent = routeId;
          if (row[fieldName] === routeId) {
            option.selected = true;
            found = true;
          }
          control.appendChild(option);
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
          control.value = Array.isArray(row[fieldName]) ? row[fieldName].join(", ") : (row[fieldName] || "");
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
      var reqDistCheckbox = editModalFields.querySelector('[data-field="requiresDistributor"]');
      var distControl = editModalFields.querySelector('[data-field="distributor"]');
      var distLabel = distControl ? distControl.closest('label') : null;
      var driverControl = editModalFields.querySelector('[data-field="driver"]');
      var driverLabel = driverControl ? driverControl.closest('label') : null;

      function toggleRouteDropdowns() {
        if (reqDistCheckbox && reqDistCheckbox.checked) {
          if (distLabel) distLabel.style.display = "";
          if (driverLabel) driverLabel.style.display = "none";
        } else {
          if (distLabel) distLabel.style.display = "none";
          if (driverLabel) driverLabel.style.display = "";
        }
      }
      
      if (reqDistCheckbox) {
        reqDistCheckbox.addEventListener('change', toggleRouteDropdowns);
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
  
        fetch("https://ws.geonorge.no/adresser/v1/sok?sok=" + encodeURIComponent(address))
          .then(function(res) {
            if (!res.ok) throw new Error("API Error");
            return res.json();
          })
          .then(function(data) {
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
              setTimeout(function() { hhInput.style.backgroundColor = ""; }, 1500);
            }
          })
          .catch(function(err) {
            geonorgeBtn.disabled = false;
            geonorgeBtn.textContent = originalText;
          errorEl.textContent = t("geonorgeError") || "Failed to connect to Geonorge API.";
            errorEl.removeAttribute("hidden");
          });
      });
      editModalFields.appendChild(geonorgeBtn);
    }
  }


export function closeEditModal() {
    editState.tableName = null;
    editState.rowIndex = -1;
    editState.mode = "edit";
    editState.originalRouteId = null;
    editState.originalName = null;
    editModal.setAttribute("hidden", "");
    editModalFields.innerHTML = "";
    clearModalError();
  }


export function openEditModal(tableName, rowIndex) {
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
    editState.originalRouteId = (tableName === "routes") ? row.routeId : null;
    editState.originalName = (tableName === "distributors" || tableName === "drivers") ? row.name : null;
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


export function openAddModal(tableName) {
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


export function initEditModal() {
    editModalClose.addEventListener("click", closeEditModal);
    editModalCancel.addEventListener("click", closeEditModal);
    editModal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute("data-modal-close") === "1") {
        closeEditModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !editModal.hasAttribute("hidden")) {
        closeEditModal();
      }
    });

    editModalForm.addEventListener("submit", function (event) {
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

      var oldRoutes = (editState.tableName === "distributors" && editState.mode === "edit") 
        ? (row.routes || []).slice() : [];

      editModalFields.querySelectorAll("[data-field]").forEach(function (el) {
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

      var activeFields = editState.mode === "add"
        ? (addFieldsByTable[editState.tableName] || [])
        : (editFieldsByTable[editState.tableName] || []);
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
          setFieldError(fieldName, t(errorKey) || (fieldName + " must be unique"));
          hasErrors = true;
        }
      };

      if (editState.tableName === "routes") {
        var trimmedRouteId = String(row.routeId || "").trim();
        if (!trimmedRouteId) {
          setFieldError("routeId", t("routeEmptyError") || "Rute-ID kan ikke være tom.");
          hasErrors = true;
        } else {
          checkUniqueness("routeId", currentData.routes, function(s) { return normalizeRouteIdentifier(s); }, "routeDuplicateError");
        }
      } else if (editState.tableName === "drivers") {
        checkUniqueness("name", currentData.drivers, function(s) { return s.trim().toLowerCase(); }, "duplicateErrorDriver");
      } else if (editState.tableName === "distributors") {
        checkUniqueness("name", currentData.distributors, function(s) { return s.trim().toLowerCase(); }, "duplicateErrorDistributor");
      } else if (editState.tableName === "addresses") {
        checkUniqueness("address", currentData.addresses, function(s) { return s.trim().toLowerCase(); }, "duplicateErrorAddress");
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
          currentData.distributors.forEach(function (dist) {
            if (dist.driverName === oldDriverName) {
              dist.driverName = newDriverName;
            }
          });
          currentData.routes.forEach(function (rt) {
            if (rt.driver === oldDriverName) {
              rt.driver = newDriverName;
            }
          });
        }
      } else if (editState.tableName === "distributors") {
        normalizeDistributorRow(row);
        if (row.driverName) {
          var matchedDriver = currentData.drivers.find(function(d) { return d.name === row.driverName; });
          if (matchedDriver) row.driverNr = matchedDriver.driverNr;
        }
        var oldDistName = editState.originalName;
        var newDistName = row.name;
        if (editState.mode === "edit" && oldDistName && oldDistName !== newDistName) {
          currentData.routes.forEach(function (rt) {
            if (rt.distributor === oldDistName) {
              rt.distributor = newDistName;
            }
          });
        }

        var newRoutes = row.routes || [];
        // Remove assigned routes from other distributors
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
            // Update route record in memory
            var matchedRoute = currentData.routes.find(function(rt) { return rt.routeId === rId; });
            if (matchedRoute) {
              matchedRoute.distributor = row.name;
              var driverObj = currentData.drivers.find(function(d) { return d.name === row.driverName; });
              matchedRoute.driver = row.driverName || (driverObj ? driverObj.name : "");
            }
          }
        });
        
        // Clear routes that were unassigned
        oldRoutes.forEach(function(rId) {
          if (newRoutes.indexOf(rId) === -1) {
            var matchedRoute = currentData.routes.find(function(rt) { return rt.routeId === rId; });
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
          currentData.distributors.forEach(function (dist) {
            var routes = getDistributorRoutes(dist);
            var updatedRoutes = routes.map(function (routeId) {
              return normalizeRouteIdentifier(routeId) === oldRouteIdJson ? newRouteIdJson : routeId;
            }).filter(Boolean);
            if (updatedRoutes.length) {
              dist.routes = updatedRoutes;
            } else {
              dist.routes = [];
            }
            delete dist.route;
          });
          currentData.addresses.forEach(function (addr) {
            if (normalizeRouteIdentifier(addr.route || "") === oldRouteIdJson) {
              addr.route = newRouteIdJson;
            }
          });
        }
        
        var assignedDistributor = (row.requiresDistributor !== false) ? (row.distributor || "") : "";
        currentData.distributors.forEach(function (dist) {
          var routes = getDistributorRoutes(dist);
          var normalizedRoutes = routes.map(function(r) { return normalizeRouteIdentifier(r); });
          var hasRoute = normalizedRoutes.indexOf(newRouteIdJson) !== -1;
          
          if (dist.name === assignedDistributor) {
            if (!hasRoute) {
              routes.push(newRouteIdJson);
              dist.routes = routes;
              dist.routes.sort(function(a,b) { return a.localeCompare(b, undefined, {numeric: true}); });
            }
          } else {
            if (hasRoute) {
              dist.routes = routes.filter(function(rId) { return normalizeRouteIdentifier(rId) !== newRouteIdJson; });
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


export function initAddButtons() {
    addDriverBtn.addEventListener("click", function () {
      openAddModal("drivers");
    });
    addDistributorBtn.addEventListener("click", function () {
      openAddModal("distributors");
    });
    addAddressBtn.addEventListener("click", function () {
      openAddModal("addresses");
    });
    if (addRouteBtn) {
      addRouteBtn.addEventListener("click", function () {
        openAddModal("routes");
      });
    }
  }


export function populateDeleteTransferOptions(tableName, selectedIndexes, transferSelect) {
    var selectedMap = {};
    selectedIndexes.forEach(function (idx) { selectedMap[idx] = true; });
    transferSelect.innerHTML = "";
    if (tableName === "addresses") {
      return;
    }
    currentData[tableName].forEach(function (row, index) {
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


export function openDeleteDialog(tableName, rowIndexes, mode) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var rows = rowIndexes.map(function (idx) { return currentData[tableName] && currentData[tableName][idx]; }).filter(Boolean);
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
    titleEl.textContent = deleteState.mode === "batch"
      ? t("batchDeleteTitle", { table: t(tableTitleKeys[tableName] || "routesTitle") })
      : t("deleteRowTitle", { table: t(tableTitleKeys[tableName] || "routesTitle") });
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
        var affectedCount = currentData.distributors.filter(function (d) { return d.driverNr === driverNr; }).length;
        msgEl.textContent = t("deleteDriverMessage", { name: row.name, count: affectedCount });
      } else if (tableName === "distributors") {
        var distName = row.name;
        var sheetCount = currentData.addresses.filter(function (a) {
          return (a.distributor || "") === distName;
        }).length;
        msgEl.textContent = t("deleteDistributorMessage", { name: row.name, count: sheetCount });
      } else if (tableName === "routes") {
        var routeId = row.routeId;
        var addrCount = currentData.addresses.filter(function (a) {
          return normalizeRouteIdentifier(a.route || "") === routeId;
        }).length;
        msgEl.textContent = t("deleteRouteMessage", { routeId: routeId, count: addrCount });
      } else {
        msgEl.textContent = t("deleteAddressMessage", { address: row.address || "" });
      }
    }

    populateDeleteTransferOptions(tableName, rowIndexes, transferSelect);
    transferWrap.hidden = (tableName === "addresses");
    document.getElementById("delete-modal").removeAttribute("hidden");
    if (!transferWrap.hidden && transferSelect.options.length > 0) {
      transferSelect.focus();
    }
  }


export function openDeleteModal(tableName, rowIndex) {
    openDeleteDialog(tableName, [rowIndex], "single");
  }


export function openBatchDeleteModal(tableName) {
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    openDeleteDialog(tableName, selectedIndexes, "batch");
  }


export function getBatchStatusOptions(tableName) {
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


export function openBatchStatusModal(tableName) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    var rows = selectedIndexes.map(function (idx) { return currentData[tableName][idx]; }).filter(Boolean);
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
    getBatchStatusOptions(tableName).forEach(function (optDef) {
      var opt = document.createElement("option");
      opt.value = optDef.value;
      opt.textContent = optDef.label;
      selectEl.appendChild(opt);
    });
    document.getElementById("batch-status-modal").removeAttribute("hidden");
    selectEl.focus();
  }


export function closeBatchStatusModal() {
    batchStatusState.tableName = null;
    batchStatusState.rowIndexes = [];
    var errEl = document.getElementById("batch-status-error");
    errEl.hidden = true;
    errEl.textContent = "";
    document.getElementById("batch-status-modal").setAttribute("hidden", "");
  }


export function executeBatchStatusUpdate() {
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
    indexes.forEach(function (idx) { selectedMap[idx] = true; });

    if (tableName === "routes") {
      var routeMap = {};
      currentData.routes.forEach(function (row, idx) {
        if (selectedMap[idx]) {
          row.status = statusValue;
          routeMap[normalizeRouteIdentifier(row.routeId || "")] = true;
        }
      });
      currentData.distributors.forEach(function (dist) {
        var routes = getDistributorRoutes(dist);
        if (routes.some(function (routeId) {
          return !!routeMap[normalizeRouteIdentifier(routeId)];
        })) {
          dist.status = statusValue;
        }
      });
    } else if (tableName === "addresses") {
      currentData.addresses.forEach(function (row, idx) {
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
      currentData[tableName].forEach(function (row, idx) {
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


export function openBatchRouteModal(tableName) {
    if (!canEditCurrentData()) {
      statusEl.textContent = t("statusReadOnlySnapshot");
      return;
    }
    var selectedIndexes = getSelectedIndexes(tableName);
    if (!selectedIndexes.length) {
      return;
    }
    var rows = selectedIndexes.map(function (idx) { return currentData[tableName][idx]; }).filter(Boolean);
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
    
    var existingRoutes = currentData.routes.map(function(r) { return r.routeId; }).filter(Boolean).sort(function(a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
    existingRoutes.forEach(function (routeId) {
      var opt = document.createElement("option");
      opt.value = routeId;
      opt.textContent = routeId;
      selectEl.appendChild(opt);
    });
    
    document.getElementById("batch-route-modal").removeAttribute("hidden");
    selectEl.focus();
}


export function closeBatchRouteModal() {
    batchRouteState.tableName = null;
    batchRouteState.rowIndexes = [];
    var errEl = document.getElementById("batch-route-error");
    errEl.hidden = true;
    errEl.textContent = "";
    document.getElementById("batch-route-modal").setAttribute("hidden", "");
}


export function executeBatchRouteUpdate() {
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
    indexes.forEach(function (idx) { selectedMap[idx] = true; });
    var routeNormalized = normalizeRouteIdentifier(routeValue);

    currentData.addresses.forEach(function (row, idx) {
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


export function initBatchRouteModal() {
    var closeBtns = document.querySelectorAll("#batch-route-close, #batch-route-cancel, [data-batch-route-close]");
    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeBatchRouteModal();
      });
    });

    var applyBtn = document.getElementById("batch-route-apply");
    if (applyBtn) {
      applyBtn.addEventListener("click", function () {
        executeBatchRouteUpdate();
      });
    }
}


export function closeDeleteModal() {
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


export function executeDelete() {
    var tableName = deleteState.tableName;
    var indexes = deleteState.mode === "batch"
      ? deleteState.rowIndexes.slice()
      : [deleteState.rowIndex];
    indexes = indexes.filter(function (idx) { return Number.isFinite(idx) && idx >= 0; });
    if (!tableName || !indexes.length) {
      return;
    }
    var rows = indexes.map(function (idx) { return currentData[tableName][idx]; }).filter(Boolean);
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
      rows.forEach(function (r) {
        if (r.driverNr) deletedDriverNrMap[String(r.driverNr)] = true;
        if (r.name) deletedDriverNameMap[r.name] = true;
      });
      currentData.distributors.forEach(function (dist) {
        if ((dist.driverNr && deletedDriverNrMap[String(dist.driverNr)]) || deletedDriverNameMap[dist.driverName]) {
          dist.driverNr = targetDriverJson.driverNr || "";
          dist.driverName = targetDriverJson.name || "";
        }
      });
      currentData.routes.forEach(function (route) {
        if ((route.driverNr && deletedDriverNrMap[String(route.driverNr)]) || deletedDriverNameMap[route.driver] || deletedDriverNameMap[route.driverName]) {
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
      rows.forEach(function (r) {
        deletedDistNameMap[String(r.name || "")] = true;
      });

      // Transfer routes from deleted distributors to target distributor
      var targetRoutes = getDistributorRoutes(targetDistJson).slice();
      rows.forEach(function (r) {
        var rts = getDistributorRoutes(r);
        rts.forEach(function (rId) {
          if (targetRoutes.indexOf(rId) === -1) {
            targetRoutes.push(rId);
          }
        });
      });
      targetDistJson.routes = targetRoutes;
      delete targetDistJson.route;

      // Update owning route records
      currentData.routes.forEach(function (rt) {
        if (deletedDistNameMap[rt.distributor]) {
          rt.distributor = targetDistJson.name;
          rt.driver = targetDistJson.driverName || "";
        }
      });

      // Normalize all addresses without re-introducing legacy fields
      currentData.addresses.forEach(function (addr) {
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
      rows.forEach(function (r) {
        deletedRouteIdMap[normalizeRouteIdentifier(r.routeId || "")] = true;
      });
      currentData.distributors.forEach(function (dist) {
        var routes = getDistributorRoutes(dist);
        var updatedRoutes = [];
        routes.forEach(function (routeId) {
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
      currentData.addresses.forEach(function (addr) {
        if (deletedRouteIdMap[normalizeRouteIdentifier(addr.route || "")]) {
          addr.route = targetRouteIdJson;
        }
        normalizeAddressRow(addr);
      });
    };

    var indexMap = {};
    indexes.forEach(function (idx) { indexMap[idx] = true; });
    currentData[tableName] = currentData[tableName].filter(function (_, idx) {
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


export function initDeleteModal() {
    var deleteModal = document.getElementById("delete-modal");
    document.getElementById("delete-modal-close").addEventListener("click", closeDeleteModal);
    document.getElementById("delete-modal-cancel").addEventListener("click", closeDeleteModal);
    document.getElementById("delete-modal-confirm").addEventListener("click", executeDelete);
    deleteModal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute("data-delete-modal-close") === "1") {
        closeDeleteModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !deleteModal.hasAttribute("hidden")) {
        closeDeleteModal();
      }
    });
  }


export function initBatchStatusModal() {
    var modal = document.getElementById("batch-status-modal");
    document.getElementById("batch-status-close").addEventListener("click", closeBatchStatusModal);
    document.getElementById("batch-status-cancel").addEventListener("click", closeBatchStatusModal);
    document.getElementById("batch-status-apply").addEventListener("click", executeBatchStatusUpdate);
    modal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute("data-batch-status-close") === "1") {
        closeBatchStatusModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeBatchStatusModal();
      }
    });
  }


export function openLoadResultModal(ok, message) {
    if (!loadResultModal) {
      return;
    }
    if (loadResultTitle) {
      loadResultTitle.textContent = ok ? t("loadResultTitleSuccess") : t("loadResultTitleFail");
    }
    if (loadResultMessage) {
      loadResultMessage.textContent = String(message || "");
    }
    loadResultModal.removeAttribute("hidden");
  }


export function closeLoadResultModal() {
    if (!loadResultModal) {
      return;
    }
    loadResultModal.setAttribute("hidden", "");
  }


export function initLoadResultModal() {
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
    loadResultModal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute("data-load-result-close") === "1") {
        closeLoadResultModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !loadResultModal.hasAttribute("hidden")) {
        closeLoadResultModal();
      }
    });
  }


export function openSourceMissingModal() {
    if (!sourceMissingModal) {
      return;
    }
    sourceMissingModal.removeAttribute("hidden");
    if (openDataFolderBtn) {
      openDataFolderBtn.focus();
    }
  }


export function closeSourceMissingModal() {
    if (!sourceMissingModal) {
      return;
    }
    sourceMissingModal.setAttribute("hidden", "");
  }


export function initSourceMissingModal() {
    if (!sourceMissingModal || !openDataFolderBtn) {
      return;
    }
    openDataFolderBtn.addEventListener("click", function () {
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


export function openUserGuideModal() {
    if (!userGuideModal || !userGuideContent) {
      return;
    }
    userGuideContent.textContent = t("userGuideLoading");
    userGuideModal.removeAttribute("hidden");
    loadUserGuideText()
      .then(function (text) {
        var loaded = stripSetupInfo(String(text || "").trim());
        userGuideContent.textContent = loaded || t("userGuideFallback");
      })
      .catch(function () {
        userGuideContent.textContent = t("userGuideFallback");
      });
  }


export function closeUserGuideModal() {
    if (!userGuideModal) {
      return;
    }
    userGuideModal.setAttribute("hidden", "");
  }


export function initUserGuideModal() {
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
    userGuideModal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute("data-user-guide-close") === "1") {
        closeUserGuideModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !userGuideModal.hasAttribute("hidden")) {
        closeUserGuideModal();
      }
    });
  }


export function openCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    closeGuardPending = false;
    closeGuardModal.removeAttribute("hidden");
    if (closeGuardSaveBtn) {
      closeGuardSaveBtn.focus();
    }
  }


export function closeCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    closeGuardPending = false;
    closeGuardModal.setAttribute("hidden", "");
  }


export function initCloseGuardModal() {
    if (!closeGuardModal) {
      return;
    }
    if (closeGuardSaveBtn) {
      closeGuardSaveBtn.addEventListener("click", function () {
        saveChangesToSource();
        closeCloseGuardModal();
        attemptClosePage();
      });
    }
    if (closeGuardContinueBtn) {
      closeGuardContinueBtn.addEventListener("click", function () {
        closeGuardBypass = false;
        closeCloseGuardModal();
      });
    }
    if (closeGuardCloseBtn) {
      closeGuardCloseBtn.addEventListener("click", function () {
        closeCloseGuardModal();
        attemptClosePage();
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !closeGuardModal.hasAttribute("hidden")) {
        closeGuardBypass = false;
        closeCloseGuardModal();
      }
    });
  }


export function attemptClosePage() {
    closeGuardBypass = true;
    try {
      window.close();
    } catch (e) {
      // Ignore close errors.
    }
    setTimeout(function () {
      if (!document.hidden) {
        window.location.href = "about:blank";
      }
    }, 10);
  }


export function defaultRowForTable(tableName) {
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

  export function openDataFolder() {
    promptForDataFile();
  }


export function initMergeRoutesModal() {
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

  var routesToMerge = selectedIndexes.map(function(idx) { return currentData.routes[idx]; }).filter(Boolean);
  var routeIds = routesToMerge.map(function(r) { return r.routeId; });
  
  var msgEl = document.getElementById("merge-routes-message");
  if (msgEl) {
    msgEl.innerHTML = t("mergeRoutesMessage") + "<br><br><strong>Routes to merge:</strong> " + routeIds.join(", ");
  }
  
  var modalFields = document.getElementById("merge-routes-fields");
  modalFields.innerHTML = "";
  
  // Create Route ID field
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

  // Create Requires Distributor checkbox
  var reqDistLabel = document.createElement("label");
  reqDistLabel.className = "checkbox-label";
  var reqDistInput = document.createElement("input");
  reqDistInput.type = "checkbox";
  reqDistInput.checked = true; // default
  reqDistInput.setAttribute("data-field", "requiresDistributor");
  reqDistLabel.appendChild(reqDistInput);
  var reqDistSpan = document.createElement("span");
  reqDistSpan.textContent = t("routeColRequiresDistributor");
  reqDistLabel.appendChild(reqDistSpan);
  modalFields.appendChild(reqDistLabel);

  // Create Distributor dropdown
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
  var sortedDists = (currentData.distributors || []).slice().sort(function(a,b) { return a.name.localeCompare(b.name); });
  sortedDists.forEach(function(d) {
    var opt = document.createElement("option");
    opt.value = d.name;
    opt.textContent = d.name;
    distSelect.appendChild(opt);
  });
  distLabel.appendChild(distSelect);
  modalFields.appendChild(distLabel);

  // Create Driver dropdown
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
  var sortedDrvs = (currentData.drivers || []).slice().sort(function(a,b) { return a.name.localeCompare(b.name); });
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
  var routesToMerge = selectedIndexes.map(function(idx) { return currentData.routes[idx]; }).filter(Boolean);
  var oldRouteIds = routesToMerge.map(function(r) { return r.routeId; });

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
  var idErr = modalFields.querySelector('.field-error-message');
  if (idErr) {
    idErr.textContent = "";
    idErr.hidden = true;
  }

  if (!newId) {
    setFieldError("routeId", t("routeEmptyError") || t("modalErrorMissing") || "Rute-ID kan ikke være tom.", "merge-routes-fields");
    errEl.textContent = t("modalFixErrorsBelow") || "Vennligst rett opp feilene nedenfor.";
    errEl.removeAttribute("hidden");
    return;
  }

  // Enforce unique route ID (unless it's one of the merged ones)
  var existsOutsideMerge = currentData.routes.some(function(r) {
    return normalizeRouteIdentifier(r.routeId || "") === normalizeRouteIdentifier(newId) && 
           oldRouteIds.map(function(id){return normalizeRouteIdentifier(id||"");}).indexOf(normalizeRouteIdentifier(newId)) === -1;
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

  var normalizedOldIds = oldRouteIds.map(function(id) { return normalizeRouteIdentifier(id); });

  // Update Addresses
  if (currentData.addresses) {
    currentData.addresses.forEach(function(addr) {
      if (normalizedOldIds.indexOf(normalizeRouteIdentifier(addr.route || "")) !== -1) {
        addr.route = newRoute.routeId;
        normalizeAddressRow(addr);
      }
    });
  }

  // Update Distributors
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
      
      if (reqDist && d.name === dist && d.routes.map(function(r){return normalizeRouteIdentifier(r);}).indexOf(normalizeRouteIdentifier(newId)) === -1) {
        d.routes.push(newId);
        d.routes.sort(function(a,b) { return a.localeCompare(b, undefined, {numeric: true}); });
      }
    });
  }

  // Delete old routes and add new one
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
