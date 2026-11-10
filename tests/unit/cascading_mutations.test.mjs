import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { currentData } from '../../web/src/state.js';
import {
  normalizeRouteIdentifier,
  normalizeAddressRow,
  recalculateRoutesFromCurrentData,
  recalculatePaperCounts,
  recomputeMetricsFromCurrentData,
  getDistributorRoutes
} from '../../web/src/calculations.js';

describe('Data Flow & Cascading Mutations', () => {
  beforeEach(() => {
    currentData.drivers = [
      { name: 'Knut Sjåfør', status: 'active', driverNr: '1', extraPapers: 5 },
      { name: 'Ola Sjåfør', status: 'active', driverNr: '2', extraPapers: 0 }
    ];
    currentData.distributors = [
      { name: 'Berit Bærer', status: 'active', driverName: 'Knut Sjåfør', driverNr: '1', routes: ['A 1', 'A 2'], extraPapers: 2 },
      { name: 'Kari Bærer', status: 'active', driverName: 'Ola Sjåfør', driverNr: '2', routes: ['B 1'], extraPapers: 0 }
    ];
    currentData.routes = [
      { routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Berit Bærer', driver: '', extraPapers: 1 },
      { routeId: 'A 2', status: 'active', requiresDistributor: true, distributor: 'Berit Bærer', driver: '', extraPapers: 0 },
      { routeId: 'B 1', status: 'active', requiresDistributor: false, distributor: '', driver: 'Ola Sjåfør', extraPapers: 2 }
    ];
    currentData.addresses = [
      { address: 'Veiveien 1', route: 'A 1', numberOfHouseholds: 2, numberOfExcludedHouseholds: 0 },
      { address: 'Veiveien 2', route: 'A 1', numberOfHouseholds: 3, numberOfExcludedHouseholds: 1 },
      { address: 'Skogsveien 5', route: 'A 2', numberOfHouseholds: 1, numberOfExcludedHouseholds: 0 },
      { address: 'Fjellveien 10', route: 'B 1', numberOfHouseholds: 5, numberOfExcludedHouseholds: 0 }
    ];
  });

  test('Route Rename Flow: renaming route propagates to addresses and distributors', () => {
    const oldRouteId = 'A 1';
    const newRouteId = 'A 10';

    // 1. Rename route record
    const targetRoute = currentData.routes.find(r => r.routeId === oldRouteId);
    targetRoute.routeId = newRouteId;

    // 2. Cascade to distributors
    currentData.distributors.forEach(dist => {
      const routes = getDistributorRoutes(dist);
      dist.routes = routes.map(rId => normalizeRouteIdentifier(rId) === oldRouteId ? newRouteId : rId);
    });

    // 3. Cascade to addresses
    currentData.addresses.forEach(addr => {
      if (normalizeRouteIdentifier(addr.route) === oldRouteId) {
        addr.route = newRouteId;
      }
      normalizeAddressRow(addr);
    });

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();

    // Verification
    const berit = currentData.distributors.find(d => d.name === 'Berit Bærer');
    assert.deepEqual(berit.routes, ['A 10', 'A 2']);

    const renamedAddresses = currentData.addresses.filter(a => a.route === 'A 10');
    assert.equal(renamedAddresses.length, 2);
    assert.equal(currentData.addresses.some(a => a.route === 'A 1'), false);
    assert.equal(renamedAddresses[0].distributor, 'Berit Bærer');
  });

  test('Delivery Mode Toggle: switching requiresDistributor false -> true and true -> false', () => {
    const routeB1 = currentData.routes.find(r => r.routeId === 'B 1');
    assert.equal(routeB1.requiresDistributor, false);

    // Toggle to requiresDistributor: true, assign to Kari Bærer
    routeB1.requiresDistributor = true;
    routeB1.distributor = 'Kari Bærer';
    routeB1.driver = '';

    const kari = currentData.distributors.find(d => d.name === 'Kari Bærer');
    if (!kari.routes.includes('B 1')) kari.routes.push('B 1');

    recalculateRoutesFromCurrentData();
    currentData.addresses.forEach(normalizeAddressRow);

    const addrB1 = currentData.addresses.find(a => a.route === 'B 1');
    assert.equal(addrB1.distributor, 'Kari Bærer');
    assert.equal(addrB1.driverName, 'Ola Sjåfør'); // Derived from Kari's driver

    // Toggle back to requiresDistributor: false, assign directly to Knut Sjåfør
    const activeRouteB1 = currentData.routes.find(r => r.routeId === 'B 1');
    activeRouteB1.requiresDistributor = false;
    activeRouteB1.distributor = '';
    activeRouteB1.driver = 'Knut Sjåfør';
    kari.routes = kari.routes.filter(r => r !== 'B 1');

    currentData.addresses.forEach(normalizeAddressRow);
    recalculateRoutesFromCurrentData();

    assert.equal(addrB1.distributor, '');
    assert.equal(addrB1.driverName, 'Knut Sjåfør');
  });

  test('Merge Routes Flow: merging A 2 into A 1 consolidates addresses and updates routes', () => {
    const sourceRouteId = 'A 2';
    const targetRouteId = 'A 1';

    // Reassign all addresses from A 2 to A 1
    currentData.addresses.forEach(addr => {
      if (addr.route === sourceRouteId) {
        addr.route = targetRouteId;
      }
    });

    // Remove source route from distributors
    currentData.distributors.forEach(dist => {
      dist.routes = dist.routes.filter(r => r !== sourceRouteId);
    });

    // Remove source route from routes
    currentData.routes = currentData.routes.filter(r => r.routeId !== sourceRouteId);

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();

    const targetRouteObj = currentData.routes.find(r => r.routeId === targetRouteId);
    assert.equal(targetRouteObj.includedAddresses, 3); // 2 original + 1 from A 2

    const berit = currentData.distributors.find(d => d.name === 'Berit Bærer');
    assert.deepEqual(berit.routes, ['A 1']);
  });

  test('Delete Route with Transfer vs. without Transfer', () => {
    // Case 1: Transfer addresses on A 1 to A 2
    const deletedRouteId = 'A 1';
    const transferTargetId = 'A 2';

    currentData.addresses.forEach(addr => {
      if (addr.route === deletedRouteId) {
        addr.route = transferTargetId;
      }
    });
    currentData.distributors.forEach(dist => {
      dist.routes = dist.routes.filter(r => r !== deletedRouteId);
    });
    currentData.routes = currentData.routes.filter(r => r.routeId !== deletedRouteId);

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();

    const a2Addresses = currentData.addresses.filter(a => a.route === 'A 2');
    assert.equal(a2Addresses.length, 3);

    // Case 2: Delete A 2 without transfer
    currentData.addresses.forEach(addr => {
      if (addr.route === 'A 2') {
        addr.route = '';
      }
    });
    currentData.routes = currentData.routes.filter(r => r.routeId !== 'A 2');

    recalculateRoutesFromCurrentData();
    const metrics = recomputeMetricsFromCurrentData();
    assert.equal(metrics.addrUnassigned, 3);
  });

  test('Batch Status Change: deactivating route immediately updates paper totals', () => {
    recalculateRoutesFromCurrentData();
    const initialMetrics = recomputeMetricsFromCurrentData();
    const initialPapers = initialMetrics.papersToOrder;

    // Deactivate route B 1 (5 households, 2 extra papers)
    const routeB1 = currentData.routes.find(r => r.routeId === 'B 1');
    routeB1.status = 'inactive';
    recalculateRoutesFromCurrentData();

    const newMetrics = recomputeMetricsFromCurrentData();
    // B 1 contributed 5 households + 2 extra papers = 7 papers
    assert.equal(newMetrics.papersToOrder, initialPapers - 7);
    assert.equal(newMetrics.routesActive, 2);
    assert.equal(newMetrics.routesInactive, 1);
  });
});
