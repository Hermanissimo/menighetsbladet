import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeRouteIdentifier,
  getRouteLetterGroup,
  normalizeRouteValues,
  getDistributorRoutes,
  getAddressPaperCount,
  normalizeAddressRow,
  recomputeMetricsFromCurrentData,
  recalculateRoutesFromCurrentData,
  recalculatePaperCounts
} from '../../web/src/calculations.js';
import { currentData } from '../../web/src/state.js';

describe('calculations.js: Route Normalization & Grouping', () => {
  test('normalizeRouteIdentifier formats spacing, casing, and suffixes correctly', () => {
    assert.equal(normalizeRouteIdentifier('a1'), 'A 1');
    assert.equal(normalizeRouteIdentifier('a 1'), 'A 1');
    assert.equal(normalizeRouteIdentifier('  b   5  '), 'B 5');
    assert.equal(normalizeRouteIdentifier('B 3 (øst)'), 'B 3(øst)');
    assert.equal(normalizeRouteIdentifier('b3(vest)'), 'B 3(vest)');
    assert.equal(normalizeRouteIdentifier('rute 12a'), 'RUTE 12a');
  });

  test('normalizeRouteIdentifier handles custom and non-standard route names', () => {
    assert.equal(normalizeRouteIdentifier('special rute 999'), 'SPECIAL RUTE 999');
    assert.equal(normalizeRouteIdentifier('RUTE UTEN TALL'), 'RUTE UTEN TALL');
  });

  test('normalizeRouteIdentifier handles empty and null inputs', () => {
    assert.equal(normalizeRouteIdentifier(''), '');
    assert.equal(normalizeRouteIdentifier(null), '');
    assert.equal(normalizeRouteIdentifier(undefined), '');
    assert.equal(normalizeRouteIdentifier('   '), '');
  });

  test('getRouteLetterGroup extracts prefix or returns dash', () => {
    assert.equal(getRouteLetterGroup('A 1'), 'A');
    assert.equal(getRouteLetterGroup('BC 10'), 'BC');
    assert.equal(getRouteLetterGroup('123'), '\u2013');
    assert.equal(getRouteLetterGroup(''), '\u2013');
    assert.equal(getRouteLetterGroup(null), '\u2013');
  });

  test('normalizeRouteValues splits, deduplicates, and normalizes', () => {
    const raw = ['A 1', 'a1', 'B 2; B 3', 'b 2'];
    const result = normalizeRouteValues(raw);
    assert.deepEqual(result, ['A 1', 'B 2', 'B 3']);
  });
});

describe('calculations.js: Address normalization & paper count', () => {
  beforeEach(() => {
    currentData.drivers = [];
    currentData.distributors = [];
    currentData.routes = [];
    currentData.addresses = [];
  });

  test('getAddressPaperCount computes max(0, households - excluded)', () => {
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 1, numberOfExcludedHouseholds: 0 }), 1);
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 5, numberOfExcludedHouseholds: 2 }), 3);
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 2, numberOfExcludedHouseholds: 2 }), 0);
    // Clamping edge cases
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 0, numberOfExcludedHouseholds: 0 }), 1); // min households is 1
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 2, numberOfExcludedHouseholds: 5 }), 0); // excluded cannot exceed households
    assert.equal(getAddressPaperCount({ numberOfHouseholds: 3, numberOfExcludedHouseholds: -1 }), 3); // negative excluded treated as 0
  });

  test('normalizeAddressRow deletes legacy keys and clamps values', () => {
    const row = {
      address: 'Testveien 1',
      route: 'a 1',
      status: 'active', // legacy
      street: 'Testveien', // legacy
      houseNo: '1', // legacy
      numberOfHouseholds: 0,
      numberOfExcludedHouseholds: -2
    };

    const normalized = normalizeAddressRow(row);
    assert.equal(normalized.route, 'A 1');
    assert.equal('status' in normalized, false);
    assert.equal('street' in normalized, false);
    assert.equal('houseNo' in normalized, false);
    assert.equal(normalized.numberOfHouseholds, 1);
    assert.equal(normalized.numberOfExcludedHouseholds, 0);
  });
});

describe('calculations.js: recomputeMetricsFromCurrentData', () => {
  beforeEach(() => {
    currentData.drivers = [
      { name: 'Knut Sjåfør', status: 'active', driverNr: '1', extraPapers: 5 },
      { name: 'Inaktiv Kjører', status: 'inactive', driverNr: '9', extraPapers: 10 }
    ];
    currentData.distributors = [
      { name: 'Berit Bærer', status: 'active', driverName: 'Knut Sjåfør', routes: ['A 1'], extraPapers: 2 },
      { name: 'Uten Sjåfør', status: 'active', driverName: '', driverNr: '', routes: ['A 2'], extraPapers: 0 },
      { name: 'Inaktiv Bærer', status: 'inactive', driverName: 'Knut Sjåfør', routes: [], extraPapers: 4 }
    ];
    currentData.routes = [
      { routeId: 'A 1', status: 'active', requiresDistributor: true, distributor: 'Berit Bærer', driver: '', extraPapers: 1 },
      { routeId: 'A 2', status: 'active', requiresDistributor: true, distributor: 'Uten Sjåfør', driver: '', extraPapers: 0 },
      { routeId: 'B 1', status: 'active', requiresDistributor: false, distributor: '', driver: 'Knut Sjåfør', extraPapers: 2 },
      { routeId: 'C 1', status: 'inactive', requiresDistributor: true, distributor: '', driver: '', extraPapers: 3 }
    ];
    currentData.addresses = [
      { address: 'Testveien 1', route: 'A 1', numberOfHouseholds: 1, numberOfExcludedHouseholds: 0 },
      { address: 'Testveien 3', route: 'A 1', numberOfHouseholds: 4, numberOfExcludedHouseholds: 1 },
      { address: 'Testveien 5', route: 'A 1', numberOfHouseholds: 2, numberOfExcludedHouseholds: 2 },
      { address: 'Bakkestien 2', route: 'A 2', numberOfHouseholds: 3, numberOfExcludedHouseholds: 0 },
      { address: 'Langgata 10', route: 'B 1', numberOfHouseholds: 10, numberOfExcludedHouseholds: 2 },
      { address: 'Gamleveien 99', route: 'C 1', numberOfHouseholds: 2, numberOfExcludedHouseholds: 0 }, // Inactive route
      { address: 'Villaveien 7', route: '', numberOfHouseholds: 1, numberOfExcludedHouseholds: 0 } // Unassigned
    ];
  });

  test('computes active/inactive counts for drivers, distributors, and routes', () => {
    recalculateRoutesFromCurrentData();
    const metrics = recomputeMetricsFromCurrentData();

    assert.equal(metrics.drvActive, 1);
    assert.equal(metrics.drvInactive, 1);
    assert.equal(metrics.drvTotal, 2);

    assert.equal(metrics.distActive, 2);
    assert.equal(metrics.distInactive, 1);
    assert.equal(metrics.distTotal, 3);
    assert.equal(metrics.distActiveNoDriver, 1); // "Uten Sjåfør" is active without driver

    assert.equal(metrics.routesActive, 3);
    assert.equal(metrics.routesInactive, 1);
    assert.equal(metrics.routesAssigned, 3);
  });

  test('computes paper ordering formula excluding inactive buffer papers and inactive routes', () => {
    recalculateRoutesFromCurrentData();
    const metrics = recomputeMetricsFromCurrentData();

    // Extra papers:
    // Active driver "Knut Sjåfør": 5 (Inactive driver "Inaktiv Kjører" 10 is EXCLUDED)
    // Active dist "Berit Bærer": 2 (Inactive dist 4 is EXCLUDED)
    // Active dist "Uten Sjåfør": 0
    // Active route "A 1": 1
    // Active route "A 2": 0
    // Active route "B 1": 2
    // Inactive route "C 1": 3 (EXCLUDED)
    // Total extra papers = 5 + 2 + 0 + 1 + 0 + 2 = 10
    assert.equal(metrics.extraPapersTotal, 10);

    // Included households from active assigned routes:
    // Testveien 1 (A 1): 1 - 0 = 1
    // Testveien 3 (A 1): 4 - 1 = 3
    // Testveien 5 (A 1): 2 - 2 = 0
    // Bakkestien 2 (A 2): 3 - 0 = 3
    // Langgata 10 (B 1): 10 - 2 = 8
    // Total included = 1 + 3 + 0 + 3 + 8 = 15
    assert.equal(metrics.householdsIncluded, 15);

    // Excluded households from active assigned routes:
    // Testveien 3: 1
    // Testveien 5: 2
    // Langgata 10: 2
    // Total excluded = 1 + 2 + 2 = 5
    assert.equal(metrics.householdsExcluded, 5);

    // Unassigned households:
    // Villaveien 7 (no route): 1
    assert.equal(metrics.householdsUnassigned, 1);

    // Total papers to order = householdsIncluded + extraPapersTotal = 15 + 10 = 25
    assert.equal(metrics.papersToOrder, 25);
  });
});
