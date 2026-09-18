import { currentData } from "./state.js";
import { toInt } from "./utils.js";

export function normalizeRouteIdentifier(raw) {
    var value = String(raw || "").trim();
    if (!value) {
      return "";
    }
    value = value
      .replace(/\s+/g, " ")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")");
    var m = value.match(/^([a-z]+)\s*(\d+)(.*)$/i);
    if (!m) {
      return value.toUpperCase();
    }
    var prefix = m[1].toUpperCase();
    var number = m[2];
    var suffix = (m[3] || "").replace(/\s+/g, "").toLowerCase();
    return prefix + " " + number + suffix;
  }

export function getRouteLetterGroup(routeId) {
    var m = String(routeId || "").match(/^([A-Za-z]+)/);
    return m ? m[1].toUpperCase() : "\u2013";
  }

export let currentDataVersion = 0;
let _cachedMetricsVersion = -1;
let _cachedMetrics = null;

export function recomputeMetricsFromCurrentData() {
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

    (currentData.routes || []).forEach(function (row) {
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

    (currentData.routes || []).forEach(function (rt) {
      routeActiveMap[normalizeRouteIdentifier(rt.routeId)] = rt.status !== "inactive";
    });

    currentData.addresses.forEach(function (row) {
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
      var households = toInt(row.numberOfHouseholds);
      if (households < 1) {
        households = 1;
      }
      var excludedHouseholds = toInt(row.numberOfExcludedHouseholds);
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
        householdsIncluded += (households - excludedHouseholds);

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
    currentData.drivers.forEach(function (row) {
      if ((row.status || "").toLowerCase() === "active") {
        drvActive += 1;
      } else {
        drvInactive += 1;
      }
    });

    var distActive = 0;
    var distInactive = 0;
    var distActiveNoDriver = 0;
    currentData.distributors.forEach(function (row) {
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

    // Route metrics are computed at the top

    // Sum extra papers from drivers, distributors, and routes
    (currentData.drivers || []).forEach(function (row) {
      var e = toInt(row.extraPapers);
      extraPapersTotal += e;
    });
    (currentData.distributors || []).forEach(function (row) {
      var e = toInt(row.extraPapers);
      extraPapersTotal += e;
    });
    (currentData.routes || []).forEach(function (row) {
      if (row.active === false) return;
      var e = toInt(row.extraPapers);
      extraPapersTotal += e;
    });

    var papersToOrder = Math.max(0, householdsIncluded + extraPapersTotal);

    _cachedMetrics = {
      addrIncluded: addrIncluded,
      addrExcluded: addrExcluded,
      addrUnassigned: addrUnassigned,
      addrTotal: currentData.addresses.length,
      householdsIncluded: householdsIncluded,
      householdsExcluded: householdsExcluded,
      householdsUnassigned: householdsUnassigned,
      householdsTotal: householdsIncluded + householdsExcluded + householdsUnassigned,
      extraPapersTotal: extraPapersTotal,
      routesAssigned: routesAssigned,
      routesUnassigned: routesUnassigned,
      routesTotal: routesAssigned + routesUnassigned,
      routesActive: routesActive,
      routesInactive: routesInactive,
      drvActive: drvActive,
      drvInactive: drvInactive,
      drvTotal: currentData.drivers.length,
      distActive: distActive,
      distInactive: distInactive,
      distActiveNoDriver: distActiveNoDriver,
      distTotal: currentData.distributors.length,
      papersToOrder: papersToOrder
    };
    _cachedMetricsVersion = currentDataVersion;
    return _cachedMetrics;
  }

export function normalizeRecords(rows) {
    return (rows || []).map(function (row) {
      var out = {};
      Object.keys(row || {}).forEach(function (key) {
        if (key.indexOf("__") === 0) {
          return;
        }
        out[key] = row[key];
      });
      return out;
    });
  }

export function normalizeAddressRow(row) {
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
    row.numberOfHouseholds = toInt(row.numberOfHouseholds);
    if (row.numberOfHouseholds < 1) {
      row.numberOfHouseholds = 1;
    }
    row.numberOfExcludedHouseholds = toInt(row.numberOfExcludedHouseholds);
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
      row.distributor = rt ? (rt.distributor || "") : "";
      row.driverName = rt ? (rt.driver || rt.driverName || "") : "";
    }
    return row;
  }

export function getAddressPaperCount(row) {
    var households = toInt(row.numberOfHouseholds);
    if (households < 1) {
      households = 1;
    }
    var excluded = toInt(row.numberOfExcludedHouseholds);
    if (excluded < 0) {
      excluded = 0;
    }
    if (excluded > households) {
      excluded = households;
    }
    return (households - excluded);
  }

export function normalizeRouteValues(rawValue) {
    var out = [];
    var seen = {};
    function addValue(value) {
      var text = String(value == null ? "" : value).trim();
      if (!text) {
        return;
      }
      var parts = text.split(/[;,]/).map(function (part) {
        return normalizeRouteIdentifier(String(part || "").trim());
      }).filter(Boolean);
      parts.forEach(function (part) {
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

export function getDistributorRoutes(row) {
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

export function normalizeDistributorRow(row) {
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
  if (!nums || nums.length === 0) return '';
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
    var prev = s[i-1];
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
      return first + '-' + suffix;
    }
    return first + '-' + last;
  });

  return formattedGroups.join(', ');
}

function parseAddressForRange(addrStr) {
  var match = String(addrStr || '').trim().match(/^([^\d]+)\s+(\d.*)$/);
  if (match) {
    return { street: match[1].trim(), num: match[2].trim() };
  }
  return { street: String(addrStr || '').trim(), num: '' };
}

export function recalculateRoutesFromCurrentData() {
    currentDataVersion++;
    var routeMap = {};
    
    var distributorByName = {};
    (currentData.distributors || []).forEach(function (dist) {
      if (dist.name) {
        distributorByName[dist.name] = dist;
      }
    });

    var driverByName = {};
    var driverByNr = {};
    (currentData.drivers || []).forEach(function (drv) {
      if (drv.name) driverByName[String(drv.name).trim()] = drv;
      if (drv.driverNr) driverByNr[String(drv.driverNr).trim()] = drv;
    });

    (currentData.routes || []).forEach(function (routeRow) {
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
        routeId: routeId,
        letterGroup: getRouteLetterGroup(routeId),
        distributor: distName,
        requiresDistributor: routeRow.requiresDistributor !== false,
        driverNr: driverNr,
        driver: driverName,
        status: routeRow.status || "active",
        distributorCount: 0,
        distributorNames: "",
        includedAddresses: 0,
        extraPapers: toInt(routeRow.extraPapers) || 0,
        paperCount: 0,
        postnrs: "",
        addressRanges: routeRow.addressRanges || "",
        notes: routeRow.notes || ""
      };
    });

    (currentData.distributors || []).forEach(function (dist) {
      var routes = getDistributorRoutes(dist);
      routes.forEach(function (routeId) {
        if (!routeId) {
          return;
        }
        if (!routeMap[routeId]) {
          routeMap[routeId] = {
            routeId: routeId,
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

    Object.keys(routeMap).forEach(function (routeId) {
      routeStatusSets[routeId] = {};
      routeDistributorSets[routeId] = {};
      routePostnrSets[routeId] = {};
      routeAddresses[routeId] = {};
    });

    (currentData.distributors || []).forEach(function (dist) {
      var routes = getDistributorRoutes(dist);
      routes.forEach(function (routeId) {
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

    (currentData.addresses || []).forEach(function (addr) {
      var routeId = normalizeRouteIdentifier(addr.route || "");
      if (!routeId || !routeMap[routeId]) {
        return;
      }
            if (getAddressPaperCount(addr) > 0) {
        routeMap[routeId].includedAddresses += 1;
        var parsed = parseAddressForRange(addr.address);
        if (!routeAddresses[routeId][parsed.street]) {
          routeAddresses[routeId][parsed.street] = {};
        }
        if (parsed.num) {
          routeAddresses[routeId][parsed.street][parsed.num] = true;
        }
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
        
        streetLines.push((street + ' ' + parts.join(' og ')).trim());
      });
      generatedRanges[routeId] = streetLines.join('\n');
    });

    currentData.routes = Object.keys(routeMap).sort().map(function (routeId) {
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

let _cachedPaperCountsVersion = -1;

export function recalculatePaperCounts() {
    if (_cachedPaperCountsVersion === currentDataVersion) {
        return;
    }
    var addresses = currentData.addresses || [];
    var distributors = currentData.distributors || [];
    var drivers = currentData.drivers || [];
    var routes = currentData.routes || [];

    var driverByNr = {};
    var driverByName = {};
    drivers.forEach(function (driver) {
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
    distributors.forEach(function (dist) {
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
    routes.forEach(function (rt) {
      routeActiveMap[normalizeRouteIdentifier(rt.routeId)] = rt.status !== "inactive";
    });

    addresses.forEach(function (addr) {
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
    distributors.forEach(function (dist) {
      var routeIds = getDistributorRoutes(dist);
      var driverNr = String(dist.driverNr || "").trim();
      var driverName = String(dist.driverName || "").trim();
      var distName = String(dist.name || "").trim();

      if (driverNr) {
        if (!driverRouteSetsByNr[driverNr]) {
          driverRouteSetsByNr[driverNr] = {};
          driverDistributorSetsByNr[driverNr] = {};
        }
        routeIds.forEach(function (routeId) {
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
        routeIds.forEach(function (routeId) {
          if (routeId) {
            driverRouteSetsByName[driverName][routeId] = true;
          }
        });
        if (distName) {
          driverDistributorSetsByName[driverName][distName] = true;
        }
      }
    });

    // Also include routes without distributors that are directly assigned to drivers
    routes.forEach(function (route) {
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
    routes.forEach(function (route) {
      var routeId = normalizeRouteIdentifier(route.routeId || "");
      var count = route.status !== "inactive" ? Math.max(0, (routePaperCounts[routeId] || 0) + toInt(route.extraPapers)) : 0;
      finalRoutePaperCounts[routeId] = count;
      route.paperCount = String(count);
    });

    drivers.forEach(function (driver) {
      var nr = String(driver.driverNr || "").trim();
      var name = String(driver.name || "").trim();

      var routeSet = nr ? (driverRouteSetsByNr[nr] || {}) : (driverRouteSetsByName[name] || {});
      if ((!routeSet || !Object.keys(routeSet).length) && name) {
        routeSet = driverRouteSetsByName[name] || {};
      }

      var paper = 0;
      Object.keys(routeSet).forEach(function(routeId) {
        paper += (finalRoutePaperCounts[normalizeRouteIdentifier(routeId)] || 0);
      });
      paper += toInt(driver.extraPapers);

      var distributorSet = nr ? (driverDistributorSetsByNr[nr] || {}) : (driverDistributorSetsByName[name] || {});
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

    distributors.forEach(function (dist) {
      var routeIds = getDistributorRoutes(dist);
      var base = 0;
      routeIds.forEach(function(routeId) {
        base += (finalRoutePaperCounts[normalizeRouteIdentifier(routeId)] || 0);
      });
      base += toInt(dist.extraPapers);
      dist.paperCount = String(base);
    });
    
    _cachedPaperCountsVersion = currentDataVersion;
  }
