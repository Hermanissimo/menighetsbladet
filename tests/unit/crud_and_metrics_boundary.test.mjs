import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { currentData } from '../../web/src/state.js';
import {
  normalizeRouteIdentifier,
  normalizeAddressRow,
  recalculateRoutesFromCurrentData,
  recalculatePaperCounts,
  recomputeMetricsFromCurrentData,
  getDistributorRoutes,
  getAddressPaperCount
} from '../../web/src/calculations.js';

describe('CRUD Operations & Connected Metrics Verification', () => {
  beforeEach(() => {
    currentData.drivers = [];
    currentData.distributors = [];
    currentData.routes = [];
    currentData.addresses = [];
  });

  describe('1. Address CRUD & Full Metric Connectivity', () => {
    test('Create Address updates addr, household, route, dist, drv and papersToOrder metrics', () => {
      // Setup driver, distributor, and route
      currentData.drivers.push({ name: 'Sjåfør 1', status: 'active', driverNr: '1', extraPapers: 0 });
      currentData.distributors.push({ name: 'Bærer 1', status: 'active', driverName: 'Sjåfør 1', driverNr: '1', routes: ['A 1'], extraPapers: 0 });
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Bærer 1', driver: '', extraPapers: 0 });

      // CREATE address: 5 households, 1 excluded
      const newAddr = {
        address: 'Storgata 1',
        route: 'A 1',
        postnr: '1150',
        numberOfHouseholds: 5,
        numberOfExcludedHouseholds: 1
      };
      normalizeAddressRow(newAddr);
      currentData.addresses.push(newAddr);

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      // Check all connected metrics
      assert.equal(m.addrTotal, 1);
      assert.equal(m.addrIncluded, 1);
      assert.equal(m.addrExcluded, 0);
      assert.equal(m.addrUnassigned, 0);

      assert.equal(m.householdsTotal, 5);
      assert.equal(m.householdsIncluded, 4); // 5 - 1 = 4
      assert.equal(m.householdsExcluded, 1);
      assert.equal(m.householdsUnassigned, 0);

      assert.equal(m.papersToOrder, 4);

      // Check route-level metrics
      const rt = currentData.routes.find(r => r.routeId === 'A 1');
      assert.equal(rt.includedAddresses, 1);
      assert.equal(rt.paperCount, '4');

      // Check distributor-level metrics
      const dist = currentData.distributors.find(d => d.name === 'Bærer 1');
      assert.equal(dist.paperCount, '4');

      // Check driver-level metrics
      const drv = currentData.drivers.find(d => d.name === 'Sjåfør 1');
      assert.equal(drv.paperCount, '4');
    });

    test('Update Address: household increase and 100% exclusion transitions', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Bærer 1', driver: '', extraPapers: 0 });
      currentData.distributors.push({ name: 'Bærer 1', status: 'active', routes: ['A 1'], extraPapers: 0 });
      const addr = { address: 'Storgata 1', route: 'A 1', numberOfHouseholds: 5, numberOfExcludedHouseholds: 1 };
      normalizeAddressRow(addr);
      currentData.addresses.push(addr);

      // 1. UPDATE: Increase households from 5 to 10
      addr.numberOfHouseholds = 10;
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      let m = recomputeMetricsFromCurrentData();

      assert.equal(m.householdsIncluded, 9); // 10 - 1
      assert.equal(m.papersToOrder, 9);

      // 2. UPDATE: Exclude all households (10 of 10)
      addr.numberOfExcludedHouseholds = 10;
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      m = recomputeMetricsFromCurrentData();

      assert.equal(m.addrIncluded, 0);
      assert.equal(m.addrExcluded, 1);
      assert.equal(m.householdsIncluded, 0);
      assert.equal(m.householdsExcluded, 10);
      assert.equal(m.papersToOrder, 0);

      // Route included addresses only counts addresses where included papers > 0
      const rt = currentData.routes.find(r => r.routeId === 'A 1');
      assert.equal(rt.includedAddresses, 0);
      assert.equal(rt.paperCount, '0');
    });

    test('Update Address (Reassign Route) shifts paper counts between routes and distributors', () => {
      currentData.routes.push(
        { routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Bærer A', extraPapers: 0 },
        { routeId: 'B 1', status: 'active', requiresDistributor: true, distributor: 'Bærer B', extraPapers: 0 }
      );
      currentData.distributors.push(
        { name: 'Bærer A', status: 'active', routes: ['A 1'], extraPapers: 0 },
        { name: 'Bærer B', status: 'active', routes: ['B 1'], extraPapers: 0 }
      );
      const addr = { address: 'Flytteveien 1', route: 'A 1', numberOfHouseholds: 8, numberOfExcludedHouseholds: 0 };
      normalizeAddressRow(addr);
      currentData.addresses.push(addr);

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      assert.equal(currentData.distributors.find(d => d.name === 'Bærer A').paperCount, '8');
      assert.equal(currentData.distributors.find(d => d.name === 'Bærer B').paperCount, '0');

      // Reassign to B 1
      addr.route = 'B 1';
      normalizeAddressRow(addr);
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();

      assert.equal(currentData.distributors.find(d => d.name === 'Bærer A').paperCount, '0');
      assert.equal(currentData.distributors.find(d => d.name === 'Bærer B').paperCount, '8');
      assert.equal(currentData.routes.find(r => r.routeId === 'A 1').paperCount, '0');
      assert.equal(currentData.routes.find(r => r.routeId === 'B 1').paperCount, '8');
    });

    test('Delete Address decrements addrTotal, households, and papers', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Bærer 1', extraPapers: 5 });
      currentData.distributors.push({ name: 'Bærer 1', status: 'active', routes: ['A 1'], extraPapers: 0 });
      currentData.addresses.push({ address: 'Sletteveien 1', route: 'A 1', numberOfHouseholds: 4, numberOfExcludedHouseholds: 0 });

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      assert.equal(recomputeMetricsFromCurrentData().papersToOrder, 9); // 4 hh + 5 extra

      // DELETE address
      currentData.addresses = [];
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.addrTotal, 0);
      assert.equal(m.householdsTotal, 0);
      assert.equal(m.papersToOrder, 5); // Only 5 buffer papers left
    });
  });

  describe('2. Route CRUD & Status Metrics Connectivity', () => {
    test('Create Route assigns or unassigns according to requiresDistributor', () => {
      // 1. Route requiring distributor without distributor -> unassigned
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: '', driver: '', extraPapers: 0 });
      recalculateRoutesFromCurrentData();
      let m = recomputeMetricsFromCurrentData();
      assert.equal(m.routesTotal, 1);
      assert.equal(m.routesUnassigned, 1);
      assert.equal(m.routesAssigned, 0);

      // 2. Assign distributor -> assigned
      currentData.distributors.push({ name: 'Bærer 1', status: 'active', routes: ['A 1'] });
      currentData.routes[0].distributor = 'Bærer 1';
      recalculateRoutesFromCurrentData();
      m = recomputeMetricsFromCurrentData();
      assert.equal(m.routesUnassigned, 0);
      assert.equal(m.routesAssigned, 1);

      // 3. Route directly delivered by driver (requiresDistributor: false)
      currentData.routes.push({ routeId: 'B 1', status: 'active', requiresDistributor: false, distributor: '', driver: 'Sjåfør 1', extraPapers: 0 });
      recalculateRoutesFromCurrentData();
      m = recomputeMetricsFromCurrentData();
      assert.equal(m.routesTotal, 2);
      assert.equal(m.routesAssigned, 2);
    });

    test('Update Route extraPapers dynamically adjusts extraPapersTotal and papersToOrder 1:1', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: false, driver: 'Sjåfør 1', extraPapers: 0 });
      recalculateRoutesFromCurrentData();
      assert.equal(recomputeMetricsFromCurrentData().papersToOrder, 0);

      // Add 25 extra papers
      currentData.routes[0].extraPapers = 25;
      recalculateRoutesFromCurrentData();
      const m = recomputeMetricsFromCurrentData();
      assert.equal(m.extraPapersTotal, 25);
      assert.equal(m.papersToOrder, 25);
    });

    test('Deactivate Route excludes extraPapers and route addresses from order totals', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: false, driver: 'Sjåfør 1', extraPapers: 10 });
      currentData.addresses.push({ address: 'Gata 1', route: 'A 1', numberOfHouseholds: 6, numberOfExcludedHouseholds: 0 });
      recalculateRoutesFromCurrentData();
      assert.equal(recomputeMetricsFromCurrentData().papersToOrder, 16); // 6 + 10

      // INACTIVATE route
      currentData.routes[0].status = 'inactive';
      recalculateRoutesFromCurrentData();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.routesActive, 0);
      assert.equal(m.routesInactive, 1);
      assert.equal(m.extraPapersTotal, 0);
      assert.equal(m.householdsIncluded, 0);
      assert.equal(m.papersToOrder, 0);
    });
  });

  describe('3. Distributor CRUD & Warning Badges Connectivity', () => {
    test('Create active distributor without driver immediately increments distActiveNoDriver warning count', () => {
      currentData.distributors.push({ name: 'Ensom Bærer', status: 'active', driverName: '', driverNr: '', routes: [] });
      recalculateRoutesFromCurrentData();
      const m = recomputeMetricsFromCurrentData();
      assert.equal(m.distActive, 1);
      assert.equal(m.distActiveNoDriver, 1); // Triggers warning badge!

      // Assign driver -> warning clears
      currentData.distributors[0].driverName = 'Per Sjåfør';
      recalculateRoutesFromCurrentData();
      const m2 = recomputeMetricsFromCurrentData();
      assert.equal(m2.distActiveNoDriver, 0);
    });

    test('Inactive distributor does not trigger warning count even without driver and buffer papers are excluded', () => {
      currentData.distributors.push({ name: 'Inaktiv Bærer', status: 'inactive', driverName: '', driverNr: '', routes: [], extraPapers: 12 });
      recalculateRoutesFromCurrentData();
      const m = recomputeMetricsFromCurrentData();
      assert.equal(m.distActive, 0);
      assert.equal(m.distInactive, 1);
      assert.equal(m.distActiveNoDriver, 0); // No warning for inactive
      assert.equal(m.extraPapersTotal, 0); // Buffer excluded
    });
  });

  describe('4. Driver CRUD & Distributor Linking', () => {
    test('Driver status active/inactive and extraPapers flow', () => {
      currentData.drivers.push({ name: 'Knut Kjører', status: 'active', driverNr: '1', extraPapers: 15 });
      recalculateRoutesFromCurrentData();
      let m = recomputeMetricsFromCurrentData();
      assert.equal(m.drvActive, 1);
      assert.equal(m.drvInactive, 0);
      assert.equal(m.papersToOrder, 15);

      // Inactivate driver
      currentData.drivers[0].status = 'inactive';
      recalculateRoutesFromCurrentData();
      m = recomputeMetricsFromCurrentData();
      assert.equal(m.drvActive, 0);
      assert.equal(m.drvInactive, 1);
      assert.equal(m.papersToOrder, 0);
    });
  });

  describe('5. Border & Extreme Cases', () => {
    test('Completely empty database produces all zeros without error or NaN', () => {
      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.addrTotal, 0);
      assert.equal(m.householdsTotal, 0);
      assert.equal(m.papersToOrder, 0);
      assert.equal(m.routesTotal, 0);
      assert.equal(m.drvTotal, 0);
      assert.equal(m.distTotal, 0);

      // Verify no NaN in any field
      Object.keys(m).forEach(k => {
        assert.equal(Number.isNaN(m[k]), false, `Metric ${k} must not be NaN`);
      });
    });

    test('Address clamping on negative, zero, and overflowing household numbers', () => {
      // 0 households clamped to 1
      assert.equal(getAddressPaperCount({ numberOfHouseholds: 0, numberOfExcludedHouseholds: 0 }), 1);
      // Negative households clamped to 1
      assert.equal(getAddressPaperCount({ numberOfHouseholds: -10, numberOfExcludedHouseholds: 0 }), 1);
      // Negative excluded clamped to 0
      assert.equal(getAddressPaperCount({ numberOfHouseholds: 5, numberOfExcludedHouseholds: -3 }), 5);
      // Excluded exceeding households clamped to households
      assert.equal(getAddressPaperCount({ numberOfHouseholds: 3, numberOfExcludedHouseholds: 99 }), 0);
    });

    test('Non-numeric and string numeric coercion in extraPapers and households', () => {
      currentData.routes.push({
        routeId: 'A 1',
        status: 'active',
        requiresDistributor: false,
        driver: 'Knut',
        extraPapers: '20' // String number
      });
      currentData.addresses.push({
        address: 'Tallgata 1',
        route: 'A 1',
        numberOfHouseholds: '15', // String number
        numberOfExcludedHouseholds: '5' // String number
      });

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.householdsIncluded, 10);
      assert.equal(m.extraPapersTotal, 20);
      assert.equal(m.papersToOrder, 30);
    });

    test('All addresses 100% excluded on a route', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: false, driver: 'Knut', extraPapers: 5 });
      currentData.addresses.push(
        { address: 'A 1', route: 'A 1', numberOfHouseholds: 2, numberOfExcludedHouseholds: 2 },
        { address: 'A 2', route: 'A 1', numberOfHouseholds: 3, numberOfExcludedHouseholds: 3 }
      );

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.addrTotal, 2);
      assert.equal(m.addrIncluded, 0);
      assert.equal(m.addrExcluded, 2);
      assert.equal(m.householdsIncluded, 0);
      assert.equal(m.householdsExcluded, 5);
      // Only buffer papers are ordered
      assert.equal(m.papersToOrder, 5);
    });

    test('Route with zero addresses', () => {
      currentData.routes.push({ routeId: 'TOM RUTE', status: 'active', requiresDistributor: false, driver: 'Knut', extraPapers: 10 });

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.routesTotal, 1);
      assert.equal(m.routesAssigned, 1);
      assert.equal(m.addrTotal, 0);
      assert.equal(m.papersToOrder, 10); // Only route extraPapers
    });

    test('Address assigned to non-existent route is flagged as unassigned', () => {
      currentData.addresses.push({ address: 'Spøkelsesgata 1', route: 'FINNES_IKKE_99', numberOfHouseholds: 3, numberOfExcludedHouseholds: 0 });

      recalculateRoutesFromCurrentData();
      recalculatePaperCounts();
      const m = recomputeMetricsFromCurrentData();

      assert.equal(m.addrUnassigned, 1);
      assert.equal(m.householdsUnassigned, 3);
      assert.equal(m.householdsIncluded, 0);
      assert.equal(m.papersToOrder, 0); // Unassigned addresses do NOT get ordered!
    });

    test('Route ID normalization with complex symbols, hyphens, and whitespace', () => {
      assert.equal(normalizeRouteIdentifier('   rute   a-10/12  (øst)  '), 'RUTE A-10/12(ØST)');
      assert.equal(normalizeRouteIdentifier('SØNDRE-NORDSTRAND 99'), 'SØNDRE-NORDSTRAND 99');
    });

    test('Math.max(0, ...) protects papersToOrder from going negative even if corrupt negative extraPapers exist', () => {
      currentData.routes.push({ routeId: 'A 1', status: 'active', requiresDistributor: false, driver: 'Knut', extraPapers: -50 });
      recalculateRoutesFromCurrentData();
      const m = recomputeMetricsFromCurrentData();
      assert.equal(m.papersToOrder, 0); // Never negative!
    });
  });
});
