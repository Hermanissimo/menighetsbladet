import { currentData } from "./state.js";
import { escapeHtml, toInt } from "./utils.js";
import { t } from "./i18n.js";
import { normalizeRouteIdentifier } from "./calculations.js";

// Helper to find a route's data
function getRouteData(routeId) {
  var normalized = normalizeRouteIdentifier(routeId);
  var found = null;
  currentData.routes.forEach(function (r) {
    if (normalizeRouteIdentifier(r.routeId) === normalized) {
      found = r;
    }
  });
  return found || {};
}

// Generate HTML for one or more drivers
export function renderDrivingListsHtml(drivers) {
  var html = "";

  drivers.forEach(function (driver, driverIdx) {
    html += "<div class=\"print-page\">";
    
    // Header
    html += "<div class=\"print-header\">";
    html += "  <div class=\"header-left\">";
    html += "    <h2 class=\"print-title\"><u class=\"solid-underline\">" + escapeHtml(t("kjoerelisteTitle") || "Kjøreliste for menighetsbladet") + "</u></h2>";
    html += "    <p><strong>" + escapeHtml(t("kjoererLabel") || "Kjører:") + " " + escapeHtml(driver.name || "") + "</strong><br>";
    html += "    <strong>" + escapeHtml(driver.address || "") + "</strong><br>";
    html += "    <strong>" + escapeHtml(driver.postnr || "") + "</strong></p>";
    html += "  </div>";
    
    html += "  <div class=\"header-right\">";
    html += "    <h2 class=\"print-driver-nr\">" + escapeHtml(t("kjoererNrLabel") || "Kjører nr.") + " " + escapeHtml(driver.driverNr || "") + "</h2>";
    html += "    <p><strong>" + escapeHtml(driver.phone || "") + "</strong><br>";
    html += "    <a class=\"print-link\" href=\"mailto:" + escapeHtml(driver.email || "") + "\">" + escapeHtml(driver.email || "") + "</a></p>";
    html += "  </div>";
    html += "</div>";

    // Find distributors for this driver
    var driverDistributors = currentData.distributors.filter(function (dist) {
      return dist.driverName === driver.name || dist.driverNr === driver.driverNr;
    });

    // Table
    html += "<table class=\"print-table\">";
    html += "<thead><tr>";
    html += "<th class=\"col-rute\"><u class=\"solid-underline\">" + escapeHtml(t("printColRute") || "Rute") + "</u></th>";
    html += "<th class=\"col-bladbaerer\" colspan=\"3\"><u class=\"solid-underline\">" + escapeHtml(t("printColBladbaerer") || "Bladbærer") + "</u></th>";
    html += "<th class=\"col-antall text-center\"><u class=\"solid-underline\">" + escapeHtml(t("printColAntall") || "Antall blad") + "</u></th>";
    html += "</tr></thead>";
    html += "<tbody>";

    var totalDriverPapers = 0;
    var renderedRouteIds = {};

    driverDistributors.forEach(function (dist) {
      var routes = Array.isArray(dist.routes) ? dist.routes : (dist.routes ? [dist.routes] : []);
      routes.forEach(function (routeId) {
        renderedRouteIds[normalizeRouteIdentifier(routeId)] = true;
        var routeObj = getRouteData(routeId);
        var paperCountStr = routeObj.paperCount !== undefined ? routeObj.paperCount : (routeObj.includedAddresses || 0); 
        var paperCount = parseInt(paperCountStr, 10) || 0;
        totalDriverPapers += paperCount;

        html += "<tr class=\"route-row\">";
        html += "  <td class=\"col-rute route-id-cell\">" + escapeHtml(routeId) + "</td>";
        html += "  <td class=\"col-dist-name\">" + escapeHtml(dist.name || "") + "<br><a class=\"print-link\" href=\"mailto:" + escapeHtml(dist.email || "") + "\">" + escapeHtml(dist.email || "") + "</a></td>";
        html += "  <td class=\"col-dist-addr\">" + escapeHtml(dist.address || "") + "<br>" + escapeHtml(dist.postnr || "") + "</td>";
        html += "  <td class=\"col-dist-phone\">" + escapeHtml(dist.phone || "") + "</td>";
        html += "  <td class=\"col-antall text-center\">" + paperCount + "</td>";
        html += "</tr>";

        // Route Notes (Editable)
        var notes = (routeObj.notes || "").trim();
        var isEmptyNote = !notes;
        html += "<tr class=\"notes-row" + (isEmptyNote ? " is-empty" : "") + "\">";
        html += "  <td></td>";
        html += "  <td colspan=\"4\"><div class=\"report-note-editable\" contenteditable=\"true\" spellcheck=\"false\" data-placeholder=\"" + escapeHtml(t("clickToAddNote") || "Click to add note") + "\">" + escapeHtml(notes) + "</div></td>";
        html += "</tr>";
      });
    });

    // Also include routes without distributors assigned to this driver
    var dName = String(driver.name || driver.driverName || "").trim().toLowerCase();
    var dNr = String(driver.driverNr || "").trim();

    var driverRoutesWithoutDist = (currentData.routes || []).filter(function (r) {
      var normId = normalizeRouteIdentifier(r.routeId || "");
      if (!normId || renderedRouteIds[normId]) return false;
      var rDriver = String(r.driver || r.driverName || "").trim().toLowerCase();
      var rDriverNr = String(r.driverNr || "").trim();
      var matches = (rDriver && dName && rDriver === dName) ||
                    (rDriverNr && dNr && rDriverNr === dNr);
      return matches;
    });

    driverRoutesWithoutDist.sort(function (a, b) {
      return (a.routeId || "").localeCompare(b.routeId || "", undefined, { numeric: true, sensitivity: "base" });
    });

    driverRoutesWithoutDist.forEach(function (routeObj) {
      var routeId = routeObj.routeId;
      var paperCountStr = routeObj.paperCount !== undefined ? routeObj.paperCount : (routeObj.includedAddresses || 0);
      var paperCount = parseInt(paperCountStr, 10) || 0;
      totalDriverPapers += paperCount;

      var addrText = routeObj.addressRanges ? escapeHtml(routeObj.addressRanges).split("\n").join("<br>") : "";
      if (!addrText) {
        var addrs = (currentData.addresses || []).filter(function (a) {
          return normalizeRouteIdentifier(a.route || "") === normalizeRouteIdentifier(routeId);
        });
        if (addrs.length > 0) {
          addrText = addrs.map(function (a) { return escapeHtml(a.address + (a.postnr ? " " + a.postnr : "")); }).slice(0, 3).join("<br>");
          if (addrs.length > 3) {
            addrText += "<br><em>(" + (addrs.length - 3) + " " + (t("moreAddresses") || "flere") + ")</em>";
          }
        }
      }

      html += "<tr class=\"route-row\">";
      html += "  <td class=\"col-rute route-id-cell\">" + escapeHtml(routeId) + "</td>";
      html += "  <td class=\"col-dist-name\"><em>" + escapeHtml(t("noDistributor") || "(Ingen bladbærer)") + "</em></td>";
      html += "  <td class=\"col-dist-addr\">" + addrText + "</td>";
      html += "  <td class=\"col-dist-phone\"></td>";
      html += "  <td class=\"col-antall text-center\">" + paperCount + "</td>";
      html += "</tr>";

      // Route Notes (Editable)
      var notes = (routeObj.notes || "").trim();
      var isEmptyNote = !notes;
      html += "<tr class=\"notes-row" + (isEmptyNote ? " is-empty" : "") + "\">";
      html += "  <td></td>";
      html += "  <td colspan=\"4\"><div class=\"report-note-editable\" contenteditable=\"true\" spellcheck=\"false\" data-placeholder=\"" + escapeHtml(t("clickToAddNote") || "Click to add note") + "\">" + escapeHtml(notes) + "</div></td>";
      html += "</tr>";
    });

    var driverExtra = toInt(driver.extraPapers) || 0;
    if (driverExtra > 0) {
      totalDriverPapers += driverExtra;
      html += "<tr class=\"route-row\">";
      html += "  <td class=\"col-rute route-id-cell\"><em>" + escapeHtml(t("extraDriverPapers") || "Ekstra blad (kjører)") + "</em></td>";
      html += "  <td class=\"col-dist-name\" colspan=\"3\"></td>";
      html += "  <td class=\"col-antall text-center\">" + driverExtra + "</td>";
      html += "</tr>";
    }

    html += "</tbody>";
    
    html += "<tfoot>";
    html += "<tr>";
    html += "  <td colspan=\"4\" class=\"text-right\"></td>";
    html += "  <td class=\"col-antall text-center\"><strong><u class=\"double-underline\">" + totalDriverPapers + "</u></strong></td>";
    html += "</tr>";
    html += "</tfoot>";
    
    html += "</table>";
    html += "</div>";
  });

  if (drivers.length === 0) {
    html = "<p class=\"print-empty\">" + escapeHtml(t("printNoDrivers") || "No drivers found to print.") + "</p>";
  }

  return html;
}

// Helpers for Address Parsing and Sorting in Route Reports
function parseAddressParts(addrStr) {
  var match = String(addrStr || "").trim().match(/^([^\d]+)\s+(\d.*)$/);
  if (match) {
    return { street: match[1].trim(), num: match[2].trim() };
  }
  return { street: String(addrStr || "").trim(), num: "" };
}

function parseNum(numStr) {
  var m = String(numStr).match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function sortAddressItems(items) {
  return items.slice().sort(function (a, b) {
    var numA = parseNum(a.num);
    var numB = parseNum(b.num);
    if (numA !== numB) {
      return numA - numB;
    }
    return String(a.num).localeCompare(String(b.num));
  });
}

// Generate HTML for one or more route reports
export function renderRouteReportsHtml(routes) {
  var html = "";

  var distByName = {};
  (currentData.distributors || []).forEach(function (d) {
    if (d.name) {
      distByName[d.name] = d;
    }
  });

  var drvByNr = {};
  var drvByName = {};
  (currentData.drivers || []).forEach(function (d) {
    if (d.driverNr) drvByNr[String(d.driverNr).trim()] = d;
    if (d.name) drvByName[String(d.name).trim()] = d;
  });

  routes.forEach(function (routeRow, rIdx) {
    var routeId = normalizeRouteIdentifier(routeRow.routeId || "");
    var pageStyle = rIdx > 0 ? "page-break-before: always;" : "";

    // Resolve distributor
    var distName = routeRow.distributor || routeRow.distributorNames || "";
    if (distName.indexOf(",") >= 0) {
      distName = distName.split(",")[0].trim();
    }
    var dist = distByName[distName] || {};

    // Resolve driver
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

    // Collect addresses for this route
    var routeAddresses = (currentData.addresses || []).filter(function (addr) {
      return normalizeRouteIdentifier(addr.route || "") === routeId;
    });

    // Group addresses by street
    var streetMap = {};
    var includedAddressesCount = 0;
    var excludedAddressesCount = 0;
    var includedHouseholds = 0;
    var excludedHouseholds = 0;

    routeAddresses.forEach(function (addr) {
      var parsed = parseAddressParts(addr.address);
      var street = parsed.street || "Uspesifisert gate";
      if (!streetMap[street]) {
        streetMap[street] = {
          street: street,
          even: [],
          odd: [],
          excluded: []
        };
      }

      var hh = Math.max(1, toInt(addr.numberOfHouseholds));
      var ex = Math.max(0, toInt(addr.numberOfExcludedHouseholds));
      if (ex > hh) ex = hh;
      var inc = hh - ex;

      includedHouseholds += inc;
      excludedHouseholds += ex;

      if (inc > 0) {
        includedAddressesCount += 1;
        var item = {
          num: parsed.num,
          hh: hh,
          inc: inc,
          ex: ex,
          raw: addr
        };
        var n = parseNum(parsed.num);
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
          hh: hh,
          ex: ex,
          note: (addr.note || "").trim(),
          raw: addr
        });
      }
    });

    var extraPapers = toInt(routeRow.extraPapers) || 0;
    var totalPapers = Math.max(0, includedHouseholds + extraPapers);

    // Start print-page
    html += "<div class=\"print-page route-report-page\">";

    // Stacked Header
    html += "<div class=\"route-report-header\">";
    html += "  <h2 class=\"print-title\"><u class=\"solid-underline\">" + escapeHtml(t("routeReportHeading", { route: routeId }) || ("Rute " + routeId + " rapport")) + "</u></h2>";
    
    html += "  <div class=\"route-report-meta\">";
    html += "    <p><strong>" + escapeHtml(t("routeReportDistributor") || "Bladbærer") + ":</strong> " + escapeHtml(distName || "-") + "</p>";
    if (phone) {
      html += "    <p><strong>" + escapeHtml(t("routeReportPhone") || "Telefon") + ":</strong> " + escapeHtml(phone) + "</p>";
    }
    if (email) {
      html += "    <p><strong>" + escapeHtml(t("routeReportEmail") || "E-post") + ":</strong> <a class=\"print-link\" href=\"mailto:" + escapeHtml(email) + "\">" + escapeHtml(email) + "</a></p>";
    }
    html += "    <p><strong>" + escapeHtml(t("routeReportDriver") || "Kjører") + ":</strong> " + escapeHtml(driverName || "-") + (driverNr ? " (" + escapeHtml(t("kjoererNrLabel") || "Nr.") + " " + escapeHtml(driverNr) + ")" : "") + "</p>";
    html += "    <div class=\"route-report-notes-field\"><strong>" + escapeHtml(t("routeReportNote") || "Merknad") + ":</strong> <span class=\"report-note-editable\" contenteditable=\"true\" spellcheck=\"false\" data-placeholder=\"" + escapeHtml(t("clickToAddNote") || "Click to add note") + "\">" + escapeHtml(routeNotes) + "</span></div>";
    html += "  </div>";
    html += "</div>";

    html += "<hr class=\"route-report-divider\" />";

    // Body: Street Groups
    html += "<div class=\"route-report-body\">";
    var streetNames = Object.keys(streetMap).sort();

    if (streetNames.length === 0) {
      html += "<p class=\"route-report-empty-street\">" + escapeHtml(t("printNoDrivers") ? "Ingen adresser funnet for denne ruten." : "No addresses found for this route.") + "</p>";
    }

    streetNames.forEach(function (street) {
      var grp = streetMap[street];
      var sortedEven = sortAddressItems(grp.even);
      var sortedOdd = sortAddressItems(grp.odd);
      var sortedExcluded = sortAddressItems(grp.excluded);

      html += "<div class=\"route-street-block\">";
      html += "  <h3 class=\"route-street-title\">" + escapeHtml(street) + "</h3>";

      // Even / Odd lines
      if (sortedEven.length > 0) {
        var evenStr = sortedEven.map(function (it) {
          return it.inc > 1 ? it.num + " (" + it.inc + ")" : it.num;
        }).join(", ");
        html += "  <div class=\"route-street-row\"><span class=\"route-num-label\"><strong>" + escapeHtml(t("routeReportEven") || "Partall") + ":</strong></span> " + escapeHtml(evenStr) + "</div>";
      }

      if (sortedOdd.length > 0) {
        var oddStr = sortedOdd.map(function (it) {
          return it.inc > 1 ? it.num + " (" + it.inc + ")" : it.num;
        }).join(", ");
        html += "  <div class=\"route-street-row\"><span class=\"route-num-label\"><strong>" + escapeHtml(t("routeReportOdd") || "Oddetall") + ":</strong></span> " + escapeHtml(oddStr) + "</div>";
      }

      // Excluded items - each on its own row
      if (sortedExcluded.length > 0) {
        html += "  <div class=\"route-street-excluded-list\">";
        sortedExcluded.forEach(function (exItem) {
          var exCountText = exItem.ex > 1 ? " (" + exItem.ex + " " + (t("routeReportHouseholds") || "husstander") + " " + (t("routeReportExcluded") || "ekskludert") + ")" : "";
          var noteSuffix = exItem.note ? " — \"" + escapeHtml(exItem.note) + "\"" : "";
          html += "    <div class=\"route-excluded-row\"><span class=\"excluded-badge\">⛔</span> <strong>" + escapeHtml(exItem.num || exItem.address) + "</strong>" + escapeHtml(exCountText) + noteSuffix + "</div>";
        });
        html += "  </div>";
      }

      html += "</div>";
    });

    html += "</div>"; // End route-report-body

    // Summary Footer with divider above
    html += "<hr class=\"route-report-divider\" />";
    html += "<div class=\"route-report-summary-box\">";
    html += "  <table class=\"route-summary-table\">";
    html += "    <tr>";
    html += "      <td class=\"col-summary-left\"><strong>" + escapeHtml(t("routeReportIncludedAddresses") || "Inkluderte adresser") + ":</strong> " + includedAddressesCount + "</td>";
    html += "      <td class=\"col-summary-right\"><strong>" + escapeHtml(t("routeReportExcludedAddresses") || "Ekskluderte adresser") + ":</strong> " + excludedAddressesCount + "</td>";
    html += "    </tr>";
    html += "    <tr>";
    html += "      <td class=\"col-summary-left\"><strong>" + escapeHtml(t("routeReportIncludedHouseholds") || "Husstander (levering)") + ":</strong> " + includedHouseholds + "</td>";
    html += "      <td class=\"col-summary-right\"><strong>" + escapeHtml(t("routeReportExcludedHouseholds") || "Ekskluderte husstander") + ":</strong> " + excludedHouseholds + "</td>";
    html += "    </tr>";
    html += "    <tr>";
    html += "      <td class=\"col-summary-left\"><strong>" + escapeHtml(t("routeReportExtraPapers") || "Ekstra blad") + ":</strong> " + extraPapers + "</td>";
    html += "      <td class=\"col-summary-right\"><strong>" + escapeHtml(t("routeReportTotalPapers") || "Totalt blad") + ":</strong> <u class=\"double-underline\">" + totalPapers + "</u></td>";
    html += "    </tr>";
    html += "  </table>";
    html += "</div>";

    html += "</div>"; // End print-page
  });

  if (routes.length === 0) {
    html = "<p class=\"print-empty\">" + escapeHtml(t("routeReportNoRoutes") || "No routes found to print.") + "</p>";
  }

  return html;
}
