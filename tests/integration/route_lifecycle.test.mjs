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

describe('Integration Test: Complete Route & Personnel Lifecycle', () => {
  beforeEach(() => {
    currentData.drivers = [];
    currentData.distributors = [];
    currentData.routes = [];
    currentData.addresses = [];
  });

  test('End-to-End Operational Lifecycle: Driver -> Distributor -> Route -> Addresses -> Cascade -> Inactivate -> Merge', () => {
    // -------------------------------------------------------------------------
    // Phase 1: Onboard Driver
    // -------------------------------------------------------------------------
    console.log('Phase 1: Onboard Driver "Knut Sjåfør"...');
    currentData.drivers.push({
      name: 'Knut Sjåfør',
      status: 'active',
      driverNr: '1',
      phone: '99887766',
      email: 'knut@example.com',
      address: 'Kjøreveien 1',
      postnr: '1150',
      routes: [],
      extraPapers: 5
    });

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    let m = recomputeMetricsFromCurrentData();
    assert.equal(m.drvActive, 1);
    assert.equal(m.drvTotal, 1);
    assert.equal(m.extraPapersTotal, 5);
    assert.equal(m.papersToOrder, 5);

    // -------------------------------------------------------------------------
    // Phase 2: Onboard Distributor and link to Driver
    // -------------------------------------------------------------------------
    console.log('Phase 2: Onboard Distributor "Berit Bærer" linked to "Knut Sjåfør"...');
    currentData.distributors.push({
      name: 'Berit Bærer',
      status: 'active',
      driverName: 'Knut Sjåfør',
      driverNr: '1',
      phone: '98765432',
      email: 'berit@example.com',
      address: 'Bærestien 2',
      postnr: '1150',
      routes: [],
      extraPapers: 2
    });

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    m = recomputeMetricsFromCurrentData();
    assert.equal(m.distActive, 1);
    assert.equal(m.distActiveNoDriver, 0); // Has driver, no warning
    assert.equal(m.extraPapersTotal, 7); // 5 (driver) + 2 (dist)
    assert.equal(m.papersToOrder, 7);

    // -------------------------------------------------------------------------
    // Phase 3: Create Route and assign to Distributor
    // -------------------------------------------------------------------------
    console.log('Phase 3: Create Route "R 100" and assign to "Berit Bærer"...');
    currentData.routes.push({
      routeId: 'R 100',
      status: 'active',
      requiresDistributor: true,
      distributor: 'Berit Bærer',
      driver: '',
      extraPapers: 3,
      notes: 'Test rute'
    });
    // Add route to distributor
    currentData.distributors[0].routes = ['R 100'];

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    m = recomputeMetricsFromCurrentData();
    assert.equal(m.routesTotal, 1);
    assert.equal(m.routesActive, 1);
    assert.equal(m.routesAssigned, 1);
    assert.equal(m.routesUnassigned, 0);
    assert.equal(m.extraPapersTotal, 10); // 5 + 2 + 3
    assert.equal(m.papersToOrder, 10);

    // -------------------------------------------------------------------------
    // Phase 4: Populate Delivery Addresses on Route
    // -------------------------------------------------------------------------
    console.log('Phase 4: Populate delivery addresses with households and exclusions...');
    const addr1 = { address: 'Nordstrandveien 1', route: 'R 100', postnr: '1150', numberOfHouseholds: 2, numberOfExcludedHouseholds: 0 };
    const addr2 = { address: 'Nordstrandveien 3', route: 'R 100', postnr: '1150', numberOfHouseholds: 6, numberOfExcludedHouseholds: 2 };
    const addr3 = { address: 'Nordstrandveien 5', route: 'R 100', postnr: '1150', numberOfHouseholds: 1, numberOfExcludedHouseholds: 1 }; // 100% excluded

    [addr1, addr2, addr3].forEach(a => {
      normalizeAddressRow(a);
      currentData.addresses.push(a);
    });

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    m = recomputeMetricsFromCurrentData();

    // Verify Address normalization dynamically resolved distributor and driver!
    assert.equal(addr1.distributor, 'Berit Bærer');
    assert.equal(addr1.driverName, 'Knut Sjåfør');
    assert.equal(addr2.distributor, 'Berit Bærer');
    assert.equal(addr2.driverName, 'Knut Sjåfør');

    // Metrics verification:
    // addr1: 2 hh, 0 ex -> 2 included
    // addr2: 6 hh, 2 ex -> 4 included
    // addr3: 1 hh, 1 ex -> 0 included, 1 excluded
    // householdsIncluded = 2 + 4 = 6
    // householdsExcluded = 2 + 1 = 3
    // papersToOrder = 6 (hh) + 10 (extra) = 16
    assert.equal(m.addrTotal, 3);
    assert.equal(m.addrIncluded, 2);
    assert.equal(m.addrExcluded, 1);
    assert.equal(m.householdsTotal, 9);
    assert.equal(m.householdsIncluded, 6);
    assert.equal(m.householdsExcluded, 3);
    assert.equal(m.papersToOrder, 16);

    // Entity-level paper counts:
    const r100 = currentData.routes.find(r => r.routeId === 'R 100');
    assert.equal(r100.includedAddresses, 2); // addr1 and addr2
    assert.equal(r100.paperCount, '9'); // 6 hh + 3 route extra

    const berit = currentData.distributors.find(d => d.name === 'Berit Bærer');
    assert.equal(berit.paperCount, '11'); // 9 route papers + 2 dist extra

    const knut = currentData.drivers.find(d => d.name === 'Knut Sjåfør');
    assert.equal(knut.paperCount, '14'); // 9 route papers + 5 driver extra

    // -------------------------------------------------------------------------
    // Phase 5: Reassign Distributor to New Driver -> Verify Automatic Propagation
    // -------------------------------------------------------------------------
    console.log('Phase 5: Reassign "Berit Bærer" to new driver "Lars Ny"...');
    currentData.drivers.push({
      name: 'Lars Ny',
      status: 'active',
      driverNr: '2',
      extraPapers: 0
    });
    berit.driverName = 'Lars Ny';
    berit.driverNr = '2';

    currentData.addresses.forEach(normalizeAddressRow);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();

    // Verify address driverName updated dynamically without manual address editing!
    assert.equal(addr1.driverName, 'Lars Ny');
    assert.equal(addr2.driverName, 'Lars Ny');

    // -------------------------------------------------------------------------
    // Phase 6: Switch Route to Direct Driver Delivery (requiresDistributor: false)
    // -------------------------------------------------------------------------
    console.log('Phase 6: Convert route to direct driver delivery...');
    const activeR100 = currentData.routes.find(r => r.routeId === 'R 100');
    activeR100.requiresDistributor = false;
    activeR100.distributor = '';
    activeR100.driver = 'Knut Sjåfør';
    berit.routes = [];

    currentData.addresses.forEach(normalizeAddressRow);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();

    // Verify addresses now reflect direct driver and no distributor
    assert.equal(addr1.distributor, '');
    assert.equal(addr1.driverName, 'Knut Sjåfør');

    // -------------------------------------------------------------------------
    // Phase 7: Inactivate Route -> Verify Complete Exclusion
    // -------------------------------------------------------------------------
    console.log('Phase 7: Inactivate route and verify metric exclusions...');
    activeR100.status = 'inactive';

    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    m = recomputeMetricsFromCurrentData();

    assert.equal(m.routesActive, 0);
    assert.equal(m.routesInactive, 1);
    assert.equal(m.householdsIncluded, 0); // Inactive route addresses are omitted
    // Only active driver buffer papers (5 Knut + 0 Lars + 2 Berit = 7)
    assert.equal(m.extraPapersTotal, 7);
    assert.equal(m.papersToOrder, 7);

    // -------------------------------------------------------------------------
    // Phase 8: Reactivate and Merge Route R 100 into R 200
    // -------------------------------------------------------------------------
    console.log('Phase 8: Create Route R 200 and merge R 100 into R 200...');
    currentData.routes.push({
      routeId: 'R 200',
      status: 'active',
      requiresDistributor: true,
      distributor: 'Berit Bærer',
      driver: '',
      extraPapers: 1
    });
    berit.routes = ['R 200'];

    // Merge: reassign all addresses from R 100 to R 200, delete R 100
    currentData.addresses.forEach(addr => {
      if (normalizeRouteIdentifier(addr.route) === 'R 100') {
        addr.route = 'R 200';
      }
    });
    currentData.routes = currentData.routes.filter(r => r.routeId !== 'R 100');

    currentData.addresses.forEach(normalizeAddressRow);
    recalculateRoutesFromCurrentData();
    recalculatePaperCounts();
    m = recomputeMetricsFromCurrentData();

    assert.equal(m.routesTotal, 1);
    assert.equal(m.routesActive, 1);
    assert.equal(m.routesInactive, 0);
    assert.equal(currentData.routes[0].routeId, 'R 200');

    // Addresses now belong to R 200 and are linked to Berit Bærer and Lars Ny
    assert.equal(addr1.route, 'R 200');
    assert.equal(addr1.distributor, 'Berit Bærer');
    assert.equal(addr1.driverName, 'Lars Ny');

    // Order papers: 6 hh + (5 Knut + 0 Lars + 2 Berit + 1 R 200) = 6 + 8 = 14
    assert.equal(m.householdsIncluded, 6);
    assert.equal(m.extraPapersTotal, 8);
    assert.equal(m.papersToOrder, 14);

    console.log('✔ Complete lifecycle integration verified successfully!');
  });
});

