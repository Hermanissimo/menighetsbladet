const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: Dashboard & Navigation ===');
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
    await page.waitForSelector('.dashboard-grid');

    // 1. Dashboard Metrics Verification against fixture
    console.log('1. Verifying Dashboard metrics values...');
    const totalPapers = await page.innerText('#papers-to-order');
    console.log(` - Total papers to order: ${totalPapers}`);
    assert.equal(parseInt(totalPapers, 10) > 0, true);

    const activeDrivers = await page.innerText('#drv-active');
    console.log(` - Active drivers: ${activeDrivers}`);
    assert.equal(activeDrivers.trim(), '1');

    const activeDistributors = await page.innerText('#dist-active');
    console.log(` - Active distributors: ${activeDistributors}`);
    assert.equal(activeDistributors.trim(), '2');

    // 2. Cell link navigation: Driver -> Routes
    console.log('2. Testing cell link navigation from Drivers tab to Routes tab...');
    await page.click('#tab-drivers');
    await page.waitForSelector('#drivers-body tr');

    // Click on Knut Sjåfør's route count cell link
    await page.locator('#drivers-body tr:first-child button[data-nav-tab="routes"]').click();

    // Verify switched to Routes tab and filter applied
    await page.waitForSelector('#panel-routes:not([hidden])');
    const routeRowsCount = await page.$$eval('#routes-body tr', rows => rows.length);
    console.log(` - Filtered routes rows count: ${routeRowsCount}`);
    assert.equal(routeRowsCount > 0, true);

    // 3. Cell link navigation: Routes -> Addresses
    console.log('3. Testing cell link navigation from Routes tab to Addresses tab...');
    await page.locator('#routes-body tr:first-child button[data-nav-tab="addresses"]').click();

    // Verify switched to Addresses tab with route filter
    await page.waitForSelector('#panel-addresses:not([hidden])');
    const addrRowsCount = await page.$$eval('#addresses-body tr', rows => rows.length);
    console.log(` - Filtered address rows count: ${addrRowsCount}`);
    assert.equal(addrRowsCount > 0, true);

    // 4. Map Icon navigation: Address -> Map tab
    console.log('4. Testing map icon navigation from Addresses tab to Map tab...');
    await page.locator('#addresses-body tr:first-child button.map-icon-btn').click();

    await page.waitForSelector('#map-container');
    console.log(' - Successfully navigated to Map view.');

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 Dashboard & Navigation E2E tests passed successfully!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
