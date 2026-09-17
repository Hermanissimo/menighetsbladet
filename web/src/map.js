import { t } from "./i18n.js";
import { escapeHtml } from "./utils.js";
import { renderAllTables, initTableFilters } from "./tables.js";
import { idbSetValue } from "./api.js";
import { currentData } from "./state.js";
import { normalizeAddressRow, recalculateRoutesFromCurrentData, recalculatePaperCounts } from "./calculations.js";
import { setHasUserCommittedEdits, setShowSaveChanges, debugSaveChangesLog, refreshUnsavedChangesFromData, scheduleAutosave } from "./main.js";

let mapInstance = null;
let markerClusterGroup = null;
let tempMarkersGroup = null;
let lastAddresses = [];
let lastRoutes = [];
let currentFoundAddresses = [];
let reassignAddresses = [];
let pendingFetches = 0;
let isCtrlDown = false;
let addressMarkerCache = new Map();

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
  // Multiply by the golden angle to spread out sequentially adjacent strings
  let hue = Math.floor(Math.abs(hash * 137.508) % 360);
  // Use a different multiplier for the border so it's uncorrelated and highly distinct
  let borderHue = Math.floor(Math.abs(hash * 231.124) % 360);
  return {
    fill: `hsl(${hue}, 70%, 40%)`,
    border: `hsl(${borderHue}, 100%, 40%)`
  };
}

const ESRI_TOPO = {
  name: 'ESRI Topo',
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  probeUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/0/0/0',
  options: {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
    crossOrigin: true
  }
};

const KARTVERKET_TOPO = {
  name: 'Kartverket Topo',
  url: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png',
  probeUrl: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/0/0/0.png',
  options: {
    attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    maxZoom: 18,
    crossOrigin: true
  }
};

const OPENSTREETMAP = {
  name: 'OpenStreetMap',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  probeUrl: 'https://a.tile.openstreetmap.org/0/0/0.png',
  options: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    crossOrigin: true
  }
};

const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const TILE_PROVIDERS = isLocalhost ? 
  [ESRI_TOPO, KARTVERKET_TOPO, OPENSTREETMAP] : 
  [OPENSTREETMAP, ESRI_TOPO, KARTVERKET_TOPO];

export async function probeTileAccess(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    });
    if (!res.ok || res.status === 403 || res.status === 429) {
      return false;
    }
    return true;
  } catch (_) {
    return new Promise(resolve => {
      if (typeof Image === 'undefined') {
        return resolve(true);
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const timer = setTimeout(() => {
        resolve(false);
      }, 3000);
      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(false);
      };
      img.src = url;
    });
  }
}

export async function checkBlockedTiles(testUrl) {
  const probeUrl = testUrl || TILE_PROVIDERS[0].probeUrl;
  const accessible = await probeTileAccess(probeUrl);
  return !accessible;
}

function isBlockedHazardTile(img) {
  try {
    if (!img || !img.naturalWidth) return false;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 32, 32);
    const data = ctx.getImageData(0, 0, 32, 32).data;
    let yellowHazard = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 220 && g > 220 && b < 40) {
        yellowHazard++;
      }
    }
    return yellowHazard > 40;
  } catch (_) {
    return false;
  }
}

export function setupResilientTileLayer(map, containerEl, options = {}) {
  let currentProviderIdx = 0;
  let errorCount = 0;
  let bannerEl = null;

  function showBlockedBanner() {
    if (containerEl && !bannerEl) {
      bannerEl = document.createElement('div');
      bannerEl.className = 'map-tiles-blocked-banner';
      bannerEl.innerHTML = '<span>⚠️ ' + escapeHtml(t('mapTilesBlocked') || 'Kartfliser er blokkert eller utilgjengelig (sjekk annonseblokkering/nettverk).') + '</span>';
      containerEl.style.position = 'relative';
      containerEl.appendChild(bannerEl);
    }
    if (options.statusElId) {
      const statusEl = document.getElementById(options.statusElId);
      if (statusEl) {
        statusEl.textContent = '⚠️ ' + (t('mapTilesBlockedShort') || 'Kartfliser blokkert');
        statusEl.style.color = '#d93025';
      }
    }
    if (typeof options.onBlocked === 'function') {
      options.onBlocked();
    }
  }

  function hideBlockedBanner() {
    if (bannerEl && bannerEl.parentNode) {
      bannerEl.parentNode.removeChild(bannerEl);
      bannerEl = null;
    }
  }

  const initialProvider = TILE_PROVIDERS[0];
  const tileLayer = L.tileLayer(initialProvider.url, Object.assign({}, initialProvider.options, options.tileOptions || {}, {
    maxZoom: 19,
    crossOrigin: true
  }));

  function switchToNextProvider() {
    currentProviderIdx++;
    if (currentProviderIdx < TILE_PROVIDERS.length) {
      const nextProvider = TILE_PROVIDERS[currentProviderIdx];
      console.warn(`Tile load failed or blocked, switching to fallback: ${nextProvider.name}`);
      tileLayer.setUrl(nextProvider.url);
      errorCount = 0;
    } else {
      console.warn('All tile providers failed or were blocked.');
      showBlockedBanner();
    }
  }

  tileLayer.on('tileerror', function () {
    errorCount++;
    if (errorCount >= 2) {
      switchToNextProvider();
    }
  });

  tileLayer.on('tileload', function (e) {
    if (e.tile && isBlockedHazardTile(e.tile)) {
      console.warn('Detected OSM 403 blocked tile graphic, switching provider immediately.');
      switchToNextProvider();
      return;
    }
    hideBlockedBanner();
  });

  tileLayer.addTo(map);

  // Proactive probe: check providers sequentially and switch immediately if primary fails
  (async function checkProvidersProactively() {
    for (let i = currentProviderIdx; i < TILE_PROVIDERS.length; i++) {
      const p = TILE_PROVIDERS[i];
      const ok = await probeTileAccess(p.probeUrl);
      if (ok) {
        if (i !== currentProviderIdx) {
          console.warn(`Proactive check: Provider ${TILE_PROVIDERS[currentProviderIdx].name} failed, switching to ${p.name}`);
          currentProviderIdx = i;
          tileLayer.setUrl(p.url);
        }
        return;
      }
    }
    showBlockedBanner();
  })();

  return tileLayer;
}

export function initMap(containerId) {
  if (mapInstance) return;
  // Nordstrand Kirke
  mapInstance = L.map(containerId).setView([59.8624, 10.7960], 14);

  const containerEl = document.getElementById(containerId);
  const osmLayer = setupResilientTileLayer(mapInstance, containerEl, {
    statusElId: 'map-status'
  });

  const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
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

  document.getElementById('map-status').textContent = t('mapStatusLoading');
  document.getElementById('map-status').style.color = 'orange';

  tempMarkersGroup = L.layerGroup().addTo(mapInstance);

  document.addEventListener('keydown', e => {
    if (e.key === 'Control') isCtrlDown = true;
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Control') {
      isCtrlDown = false;
      checkAndOpenModal();
    }
  });

  setTimeout(() => { mapInstance.invalidateSize(); }, 500);

  // If we already have data, update the map immediately upon initialization
  if (lastAddresses.length > 0) {
    updateMapData(lastAddresses, lastRoutes);
  }

  // Handle map click for adding an address
  mapInstance.on('click', function(e) {
    handleMapClick(e.latlng.lat, e.latlng.lng);
  });

  const routeFilterSelect = document.getElementById('map-route-filter');
  if (routeFilterSelect) {
    routeFilterSelect.addEventListener('change', () => {
      updateMapData(lastAddresses, lastRoutes);
    });
  }

  const mapContainer = document.getElementById('map-view');
  if (mapContainer) {
    mapContainer.addEventListener('mouseleave', () => {
      mapInstance.scrollWheelZoom.disable();
    });
  }
}

export function invalidateMapSize() {
  if (mapInstance) {
    setTimeout(() => { mapInstance.invalidateSize(); }, 100);
  }
}

export async function updateMapData(addresses, routes) {
  lastAddresses = addresses || [];
  lastRoutes = routes || [];
  
  const statusEl = document.getElementById('map-status');
  if (statusEl) {
    statusEl.textContent = t('mapStatusLoaded', { routes: lastRoutes.length, addresses: lastAddresses.length });
  }

  if (!mapInstance || !markerClusterGroup) return;

  const routeFilterSelect = document.getElementById('map-route-filter');
  const currentFilter = routeFilterSelect ? routeFilterSelect.value : '';

  if (routeFilterSelect) {
    const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, 'no', { numeric: true }));
    routeFilterSelect.innerHTML = `<option value="">${t('mapRouteFilterAll')}</option>`;
    sortedRoutes.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.routeId;
      opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : '');
      if (r.routeId === currentFilter) {
        opt.selected = true;
      }
      routeFilterSelect.appendChild(opt);
    });
  }

  const routeDistributorMap = {};
  lastRoutes.forEach(r => {
    routeDistributorMap[r.routeId] = r.distributor || '';
  });

  const currentAddressSet = new Set(lastAddresses.map(a => a.address));
  
  // Remove markers that are no longer in the dataset
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

  lastAddresses.forEach(addr => {
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
        direction: 'top',
        offset: [0, -10]
      });

      marker.addressData = addr;

      marker.on('click', function(e) {
        const currentAddr = marker.addressData;
        if (isCtrlDown) {
          L.DomEvent.stopPropagation(e);
          const addressString = currentAddr.address;
          const exists = reassignAddresses.some(a => a.address === addressString);
          if (!exists) {
            reassignAddresses.push(currentAddr);
            marker.setStyle({ color: '#ff0000', weight: 3 });
          }
        } else {
          const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, 'no', { numeric: true }));
          const optionsHtml = sortedRoutes.map(r => 
            `<option value="${r.routeId}" ${r.routeId === currentAddr.route ? 'selected' : ''}>${r.routeId}${r.distributor ? ` (${r.distributor})` : ''}</option>`
          ).join('');

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
              <button class="btn secondary" onclick="window.handlePopupReassign(this, '${escapeHtml(currentAddr.address).replace(/'/g, "\\'")}')" style="flex: 1;">${t('mapBtnReassign')}</button>
              <button class="btn danger" onclick="window.handlePopupDelete('${escapeHtml(currentAddr.address).replace(/'/g, "\\'")}')" style="flex: 1;">${t('mapBtnDelete')}</button>
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
      // Update existing marker
      marker.addressData = addr;
      marker.setLatLng([coords.lat, coords.lon]);
      marker.setStyle({
        fillColor: colorObj.fill,
        color: colorObj.border
      });
      marker.options.addressStr = addr.address;
      marker.options.routeId = addr.route;
      marker.setTooltipContent(`<b>${escapeHtml(addr.address)}</b><br>${t("addrColRoute")}: ${escapeHtml(addr.route)}`);
      
      // Update cluster inclusion based on filter
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

  // Attach global window handlers for popup buttons
  window.handlePopupReassign = async (btnEl, addressString) => {
    // The select element is the previous sibling of the flex container div
    const selectEl = btnEl.parentElement.previousElementSibling;
    const newRoute = selectEl.value;
    const targetAddr = lastAddresses.find(a => a.address === addressString);
    if (targetAddr && newRoute !== targetAddr.route) {
      await executeReassign([targetAddr], newRoute);
      mapInstance.closePopup();
    }
  };

  window.handlePopupDelete = (addressString) => {
    const targetAddr = lastAddresses.find(a => a.address === addressString);
    if (targetAddr) {
      openDeleteAddressMapModal(targetAddr);
      mapInstance.closePopup();
    }
  };
}

// Map Address Addition Logic

let miniMapInstance = null;

function initMiniMap(lat, lon, routes) {
  const containerId = 'add-address-minimap';
  const containerEl = document.getElementById(containerId);
  if (!miniMapInstance) {
    miniMapInstance = L.map(containerId).setView([lat, lon], 16);
    setupResilientTileLayer(miniMapInstance, containerEl, {
      tileOptions: { attribution: '&copy; OSM' }
    });
  } else {
    miniMapInstance.setView([lat, lon], 16);
  }
  
  miniMapInstance.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      miniMapInstance.removeLayer(layer);
    }
  });

  L.circleMarker([lat, lon], {
    radius: 8,
    fillColor: '#ff0000',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  }).addTo(miniMapInstance).bindPopup(`<b>${t("mapNewAddress")}</b>`).openPopup();

  lastAddresses.forEach(addr => {
    if (!addr.route) return;
    if (addr.lat && addr.lon) {
      const icon = L.divIcon({
        className: 'route-label-icon',
        html: `<div style="background: white; border: 1px solid black; border-radius: 3px; padding: 1px 3px; font-size: 10px; font-weight: bold; white-space: nowrap;">${addr.route}</div>`,
        iconSize: null,
        iconAnchor: [10, 10]
      });
      L.marker([addr.lat, addr.lon], { icon: icon }).addTo(miniMapInstance);
    }
  });

  setTimeout(() => miniMapInstance.invalidateSize(), 100);
}

function closeMapModal() {
  document.getElementById('add-address-map-modal').hidden = true;
  currentFoundAddresses = [];
  if (tempMarkersGroup) tempMarkersGroup.clearLayers();
}

function openMapModalForAddresses() {
  const modal = document.getElementById('add-address-map-modal');
  const msgEl = document.getElementById('add-address-map-message');
  const routeContainer = document.getElementById('add-address-route-container');
  const confirmBtn = document.getElementById('add-address-map-btn-confirm');
  const kirkenValContainer = document.getElementById('add-address-kirken-validation');
  
  modal.hidden = false;
  routeContainer.hidden = false;
  confirmBtn.hidden = false;

  if (kirkenValContainer) {
    if (currentFoundAddresses.length > 0) {
      kirkenValContainer.hidden = false;
      const linksContainer = document.getElementById('add-address-kirken-links-container');
      if (linksContainer) {
        linksContainer.innerHTML = '';
        const uniqueAddresses = new Map();
        
        currentFoundAddresses.forEach(a => {
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
          const btn = document.createElement('a');
          btn.href = url;
          btn.target = "_blank";
          btn.className = "btn secondary";
          btn.style.display = "inline-block";
          btn.style.marginBottom = "10px";
          btn.style.marginRight = "10px";
          btn.style.textDecoration = "none";
          btn.textContent = `🔍 ${t("mapCheckKirken", { address: baseAddress })}`;
          linksContainer.appendChild(btn);
        });
      }
    } else {
      kirkenValContainer.hidden = true;
    }
  }
  
  const count = currentFoundAddresses.length;
  const listHtml = currentFoundAddresses.map(a => `<li>${escapeHtml(a.address)}</li>`).join('');
  msgEl.innerHTML = `${t("mapAddingCountAddresses", { count: count })}:<br><ul style="max-height: 150px; overflow-y: auto; text-align: left; background: #eee; padding: 10px 10px 10px 30px; border-radius: 4px; margin-top: 10px;">${listHtml}</ul>`;
  
  const routeSelect = document.getElementById('add-address-map-route');
  routeSelect.innerHTML = '';
  const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, 'no', { numeric: true }));
  sortedRoutes.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.routeId;
    opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : '');
    routeSelect.appendChild(opt);
  });

  // Prefill with closest existing route
  if (currentFoundAddresses.length > 0 && lastAddresses.length > 0) {
    const target = currentFoundAddresses[0];
    let closestRoute = null;
    let minDiff = Infinity;
    for (const a of lastAddresses) {
      if (a.lat && a.lon && a.route) {
        // Approximate distance comparison using squared Euclidean distance (safe for local clustering)
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

export async function handleMapClick(lat, lon) {
  pendingFetches++;

  try {
    const res = await fetch(`https://ws.geonorge.no/adresser/v1/punktsok?radius=20&lat=${lat}&lon=${lon}&treffPerSide=1`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    
    if (!data.adresser || data.adresser.length === 0) {
      return; // Ignore if no address found
    }

    const firstAdr = data.adresser[0];
    const streetname = firstAdr.adressenavn;
    const queryStreetNumber = firstAdr.nummer;
    
    // Fetch ALL addresses for this street and number to ensure we get all households/letters for the building
    const sokRes = await fetch(`https://ws.geonorge.no/adresser/v1/sok?adressenavn=${encodeURIComponent(streetname)}&nummer=${queryStreetNumber}&kommunenummer=0301&treffPerSide=100`);
    if (!sokRes.ok) throw new Error("Network response was not ok");
    const sokData = await sokRes.json();
    
    const addressesToAdd = (sokData.adresser && sokData.adresser.length > 0) ? sokData.adresser : [firstAdr];

    addressesToAdd.forEach(adr => {
      const addressString = adr.adressetekstutenadressetilleggsnavn || adr.adressetekst;
      const postnr = adr.postnummer;
      let households = 1;
      if (adr.bruksenhetsnummer && adr.bruksenhetsnummer.length > 0) {
        households = adr.bruksenhetsnummer.length;
      }
      
      const newAddress = {
        address: addressString,
        postnr: postnr,
        numberOfHouseholds: households,
        numberOfExcludedHouseholds: 0,
        note: "",
        lat: adr.representasjonspunkt ? adr.representasjonspunkt.lat : lat,
        lon: adr.representasjonspunkt ? adr.representasjonspunkt.lon : lon
      };

      const existsInDb = lastAddresses.some(a => a.address.toLowerCase() === addressString.toLowerCase());
      if (existsInDb) return;

      const existsInQueue = currentFoundAddresses.some(a => a.address.toLowerCase() === addressString.toLowerCase());
      if (existsInQueue) return;

      currentFoundAddresses.push(newAddress);

      L.circleMarker([newAddress.lat, newAddress.lon], {
        radius: 8,
        fillColor: '#ff0000',
        color: '#000',
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

export function initMapAddressModal() {
  const closeBtn1 = document.getElementById('add-address-map-close');
  const closeBtn2 = document.getElementById('add-address-map-btn-close');
  const backdrop = document.querySelector('[data-add-map-close="1"]');
  const confirmBtn = document.getElementById('add-address-map-btn-confirm');
  
  if (closeBtn1) closeBtn1.addEventListener('click', closeMapModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeMapModal);
  if (backdrop) backdrop.addEventListener('click', closeMapModal);
  
  if (confirmBtn) confirmBtn.addEventListener('click', async () => {
    if (currentFoundAddresses.length === 0) return;
    const routeId = document.getElementById('add-address-map-route').value;
    if (!routeId) return;

    if (currentData && currentData.addresses) {
      currentFoundAddresses.forEach(addr => {
        addr.route = routeId;
        const normalizedAddress = normalizeAddressRow(Object.assign({}, addr));
        currentData.addresses.push(normalizedAddress);
      });
      
      const addressesToSave = currentData.addresses.map(a => {
        const copy = Object.assign({}, a);
        delete copy.distributor;
        delete copy.driverName;
        return copy;
      });
      await idbSetValue('addresses', addressesToSave);
      
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
  document.getElementById('reassign-route-modal').hidden = true;
  reassignAddresses = [];
  updateMapData(lastAddresses, lastRoutes); // Reset marker styles
}

function openReassignModal() {
  const modal = document.getElementById('reassign-route-modal');
  const msgEl = document.getElementById('reassign-route-message');
  
  modal.hidden = false;
  
  const count = reassignAddresses.length;
  const listHtml = reassignAddresses.map(a => `<li>${escapeHtml(a.address)} (${escapeHtml(a.route)})</li>`).join('');
  msgEl.innerHTML = `${t("mapReassigningCountAddresses", { count: count })}:<br><ul style="max-height: 150px; overflow-y: auto; text-align: left; background: #eee; padding: 10px 10px 10px 30px; border-radius: 4px; margin-top: 10px;">${listHtml}</ul>`;
  
  const routeSelect = document.getElementById('reassign-route-select');
  routeSelect.innerHTML = '';
  const sortedRoutes = lastRoutes.slice().sort((a, b) => a.routeId.localeCompare(b.routeId, 'no', { numeric: true }));
  sortedRoutes.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.routeId;
    opt.textContent = r.routeId + (r.distributor ? ` (${r.distributor})` : '');
    routeSelect.appendChild(opt);
  });
}

async function executeReassign(addressObjects, newRoute) {
  if (currentData && currentData.addresses) {
    let changed = false;
    addressObjects.forEach(targetAddr => {
      const dbAddr = currentData.addresses.find(a => a.address === targetAddr.address);
      if (dbAddr && dbAddr.route !== newRoute) {
        dbAddr.route = newRoute;
        changed = true;
      }
    });
    
    if (changed) {
      const addressesToSave = currentData.addresses.map(a => {
        const copy = Object.assign({}, a);
        delete copy.distributor;
        delete copy.driverName;
        return copy;
      });
      await idbSetValue('addresses', addressesToSave);
      
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

export function initReassignRouteModal() {
  const closeBtn1 = document.getElementById('reassign-route-close');
  const closeBtn2 = document.getElementById('reassign-route-btn-close');
  const backdrop = document.querySelector('[data-reassign-route-close="1"]');
  const confirmBtn = document.getElementById('reassign-route-btn-confirm');
  
  if (closeBtn1) closeBtn1.addEventListener('click', closeReassignModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeReassignModal);
  if (backdrop) backdrop.addEventListener('click', closeReassignModal);
  
  if (confirmBtn) confirmBtn.addEventListener('click', async () => {
    if (reassignAddresses.length === 0) return;
    const routeId = document.getElementById('reassign-route-select').value;
    if (!routeId) return;

    await executeReassign(reassignAddresses, routeId);
    closeReassignModal();
  });
}

let deleteAddressMapTarget = null;

export function initDeleteAddressMapModal() {
  const modal = document.getElementById('delete-address-map-modal');
  if (!modal) return;
  const closeBtn1 = document.getElementById('delete-address-map-close');
  const closeBtn2 = document.getElementById('delete-address-map-btn-cancel');
  const backdrop = document.querySelector('[data-delete-address-map-close="1"]');
  const confirmBtn = document.getElementById('delete-address-map-btn-confirm');
  
  const closeModal = () => { modal.hidden = true; deleteAddressMapTarget = null; };

  if (closeBtn1) closeBtn1.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  
  if (confirmBtn) confirmBtn.addEventListener('click', async () => {
    if (!deleteAddressMapTarget) return;
    
    if (currentData && currentData.addresses) {
      const idx = currentData.addresses.findIndex(a => a.address === deleteAddressMapTarget.address);
      if (idx !== -1) {
        currentData.addresses.splice(idx, 1);
        
        const addressesToSave = currentData.addresses.map(a => {
          const copy = Object.assign({}, a);
          delete copy.distributor;
          delete copy.driverName;
          return copy;
        });
        await idbSetValue('addresses', addressesToSave);
        
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
  const nameEl = document.getElementById('delete-address-map-address-name');
  if (nameEl) nameEl.textContent = addr.address;
  const modal = document.getElementById('delete-address-map-modal');
  if (modal) modal.hidden = false;
}

export function selectAddressOnMap(addressStr, routeId) {
  const routeFilterSelect = document.getElementById('map-route-filter');
  if (routeFilterSelect) {
    routeFilterSelect.value = '';
  }
  updateMapData(lastAddresses, lastRoutes).then(() => {
    let targetMarker = null;
    const bounds = L.latLngBounds();
    
    markerClusterGroup.getLayers().forEach(layer => {
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
        targetMarker.fire('click');
      }, 300);
    }
  });
}
