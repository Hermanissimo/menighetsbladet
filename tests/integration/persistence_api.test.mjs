import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { withoutStoreId, cleanRecordForStore, looksLikeJsonText } from '../../web/src/api.js';

describe('Integration Test: Persistence & Serialization API Helpers', () => {
  test('withoutStoreId strips internal IndexedDB _id key while preserving all operational fields', () => {
    const input = {
      _id: 42,
      address: 'Testveien 1',
      route: 'A 1',
      numberOfHouseholds: 2,
      numberOfExcludedHouseholds: 0
    };

    const result = withoutStoreId(input);
    assert.equal('_id' in result, false);
    assert.equal(result.address, 'Testveien 1');
    assert.equal(result.route, 'A 1');
    assert.equal(result.numberOfHouseholds, 2);
  });

  test('cleanRecordForStore strips transient UI metadata keys prefixed with __', () => {
    const input = {
      address: 'Testveien 1',
      route: 'A 1',
      __selected: true,
      __highlighted: false,
      __rowIndex: 3,
      note: 'Leveres på trappen'
    };

    const cleaned = cleanRecordForStore(input);
    assert.equal('__selected' in cleaned, false);
    assert.equal('__highlighted' in cleaned, false);
    assert.equal('__rowIndex' in cleaned, false);
    assert.equal(cleaned.address, 'Testveien 1');
    assert.equal(cleaned.route, 'A 1');
    assert.equal(cleaned.note, 'Leveres på trappen');
  });

  test('looksLikeJsonText detects JSON objects and arrays with whitespace tolerance', () => {
    assert.equal(looksLikeJsonText('{"routes": []}'), true);
    assert.equal(looksLikeJsonText('   [{"address": "A"}]   '), true);
    assert.equal(looksLikeJsonText('plain text string'), false);
    assert.equal(looksLikeJsonText(''), false);
    assert.equal(looksLikeJsonText(null), false);
    assert.equal(looksLikeJsonText(undefined), false);
  });

  test('Full serialization/deserialization cycle preserves dataset integrity', () => {
    const original = {
      drivers: [{ name: 'Knut', extraPapers: 5 }],
      distributors: [{ name: 'Berit', routes: ['A 1'] }],
      routes: [{ routeId: 'A 1', requiresDistributor: true }],
      addresses: [{ address: 'Test 1', route: 'A 1', numberOfHouseholds: 1, numberOfExcludedHouseholds: 0 }]
    };

    const json = JSON.stringify(original, null, 2);
    assert.equal(looksLikeJsonText(json), true);

    const parsed = JSON.parse(json);
    assert.deepEqual(parsed, original);
  });
});

