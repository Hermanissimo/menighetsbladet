const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: Map UX & Resilient Tiles ===');
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', 'test_source.json');
  const server = await createTestServer({ customDataPath: fixturePath });
  console.log(`Test server running on ${server.url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => {
    if (!err.message.includes('_leaflet_pos')) errors.push(err.message);
  });
  page.on('console', msg => {
    const txt = msg.text();
    if (msg.type() === 'error' && !txt.includes('404') && !txt.includes('_leaflet_pos') && !txt.includes('ERR_NAME_NOT_RESOLVED')) {
      errors.push(txt);
    }
  });

  try {
    await setupNetworkMocks(page);
    await page.goto(server.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tabs-nav');

    // 1. Map Tab Navigation
    console.log('1. Navigating to Map tab...');
    await page.click('#tab-map');
    await page.waitForSelector('#map-container');
    console.log(' - Map container rendered.');

    // 2. Route filter on map
    console.log('2. Testing route filter dropdown on Map...');
    const routeFilter = await page.$('#map-route-filter');
    assert.ok(routeFilter, 'Map route filter dropdown should exist');

    await page.selectOption('#map-route-filter', 'A 1');
    await page.waitForTimeout(200);
    console.log(' - Selected route "A 1" on map filter.');

    // Reset to all routes
    await page.selectOption('#map-route-filter', '');
    await page.waitForTimeout(200);
    console.log(' - Reset map filter to all routes.');

    // 3. Resilient Tile Layer Blocked Detection
    console.log('3. Testing checkBlockedTiles function...');
    const hasFn = await page.evaluate(() => typeof window.checkBlockedTiles === 'function');
    assert.equal(hasFn, true, 'window.checkBlockedTiles must be exposed');

    const isBlocked = await page.evaluate(async () => {
      return await window.checkBlockedTiles('https://invalid-non-existent-probe-12345.org/tile.png');
    });
    assert.equal(isBlocked, true, 'checkBlockedTiles must return true for unreachable URL');
    console.log(' - checkBlockedTiles correctly returned true for blocked probe URL.');

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 Map UX E2E tests passed successfully!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
