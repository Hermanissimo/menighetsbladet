const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: CRUD Modals, Validation, Warning Badges & Geonorge ===');
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', 'test_source.json');
  const server = await createTestServer({ customDataPath: fixturePath });
  console.log(`Test server running on ${server.url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('404')) {
      errors.push(msg.text());
    }
  });

  try {
    await setupNetworkMocks(page);
    await page.goto(server.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tabs-nav');

    // 1. Warning badge for active distributor without driver
    console.log('1. Checking warning badge for active distributor without driver...');
    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');

    const warningBadge = await page.$('#distributors-body tr.warning-row .warning-badge');
    assert.ok(warningBadge, 'Warning badge should be visible on distributor without driver');
    const badgeText = await warningBadge.innerText();
    console.log(` - Found warning badge: "${badgeText}"`);

    // Verify warning in Distributors totals bar
    const distTotalsText = await page.innerText('#distributors-totals');
    assert.equal(distTotalsText.includes('⚠️'), true, 'Totals bar should contain warning indicator');
    console.log(` - Distributors totals text contains warning: "${distTotalsText}"`);

    // Verify dashboard warning row
    await page.click('#tab-dashboard');
    await page.waitForSelector('#dash-dist-no-driver-row:not([hidden])');
    const warningCount = await page.innerText('#dist-no-driver');
    console.log(` - Dashboard warning count: ${warningCount}`);
    assert.equal(parseInt(warningCount, 10) >= 1, true);

    // 2. Route Validation & Add Route Non-corruption
    console.log('2. Testing Route validation & Add Route non-corruption...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Snapshot route A 1 before adding new route
    const routeA1Before = await page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('#routes-body tr')).find(r => r.children[1] && r.children[1].innerText.includes('A 1'));
      return row ? {
        routeId: row.children[1].innerText.trim(),
        distributor: row.children[3].innerText.trim(),
        addresses: row.children[5].innerText.trim()
      } : null;
    });
    console.log(' - Baseline Route A 1 before add:', routeA1Before);
    assert.ok(routeA1Before, 'Route A 1 must exist');

    // Click Add Route
    await page.click('#add-route');
    await page.waitForSelector('#edit-modal:not([hidden])');

    // Empty routeId validation
    await page.fill('#edit-modal-form input[data-field="routeId"]', '   ');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    let errorText = await page.innerText('.field-error-message:not([hidden])');
    assert.equal(errorText.length > 0, true, 'Empty routeId must show validation error');
    console.log(` - Empty route validation error: "${errorText}"`);

    // Duplicate routeId validation
    await page.fill('#edit-modal-form input[data-field="routeId"]', 'A 1');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    errorText = await page.innerText('.field-error-message:not([hidden])');
    assert.equal(errorText.length > 0, true, 'Duplicate routeId must show validation error');
    console.log(` - Duplicate route validation error: "${errorText}"`);

    // Add unique custom route
    const customRoute = 'SPECIAL RUTE 999';
    await page.fill('#edit-modal-form input[data-field="routeId"]', customRoute);
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(` - Successfully saved custom route "${customRoute}"`);

    // Verify Route A 1 was NOT corrupted
    const routeA1After = await page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('#routes-body tr')).find(r => r.children[1] && r.children[1].innerText.includes('A 1'));
      return row ? {
        routeId: row.children[1].innerText.trim(),
        distributor: row.children[3].innerText.trim(),
        addresses: row.children[5].innerText.trim()
      } : null;
    });
    console.log(' - Route A 1 after add:', routeA1After);
    assert.equal(routeA1After.addresses, routeA1Before.addresses);
    assert.equal(routeA1After.distributor, routeA1Before.distributor);

    // 3. Geonorge Address API Lookup
    console.log('3. Testing Geonorge API address auto-fill in modal...');
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');

    await page.click('#add-address');
    await page.waitForSelector('#edit-modal:not([hidden])');

    await page.fill('#edit-modal-form input[data-field="address"]', 'Testveien 1');

    // Click Geonorge update button
    const geonorgeBtn = await page.$('#edit-modal-form button.btn.secondary');
    assert.ok(geonorgeBtn, 'Geonorge lookup button exists');
    await geonorgeBtn.click();
    await page.waitForTimeout(200);

    const hhVal = await page.inputValue('#edit-modal-form input[data-field="numberOfHouseholds"]');
    console.log(` - Auto-filled households from Geonorge: households=${hhVal}`);
    assert.equal(hhVal, '3');

    // Cancel modal
    await page.click('#edit-modal-cancel');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 CRUD Modals & Validation E2E tests passed successfully!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
