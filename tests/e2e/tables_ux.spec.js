const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: Tables UX (Filter, Sort, Pager, Batch, Mailto) ===');
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

    // 1. Mailto Link Check on Drivers and Distributors
    console.log('1. Checking mailto links on Drivers and Distributors tables...');
    await page.click('#tab-drivers');
    await page.waitForSelector('#drivers-body tr');
    const driverMailto = await page.$eval('#drivers-body td a.mailto-link', el => el.getAttribute('href'));
    assert.equal(driverMailto.startsWith('mailto:'), true);
    console.log(` - Driver mailto link: ${driverMailto}`);

    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');
    const distMailto = await page.$eval('#distributors-body td a.mailto-link', el => el.getAttribute('href'));
    assert.equal(distMailto.startsWith('mailto:'), true);
    console.log(` - Distributor mailto link: ${distMailto}`);

    // 2. Multi-criterion filtering and Reset
    console.log('2. Testing filter input and reset...');
    await page.click('#filter-distributors-distributorName');
    await page.fill('#filter-distributors-distributorName', 'Berit Bærer');
    // Click option from multi-filter menu if present, or press Enter / trigger change
    const optionBtn = await page.$('.multi-filter-menu .multi-filter-option');
    if (optionBtn) {
      await optionBtn.click();
    } else {
      await page.press('#filter-distributors-distributorName', 'Enter');
      await page.evaluate(() => document.getElementById('filter-distributors-distributorName').dispatchEvent(new Event('change')));
    }
    await page.waitForTimeout(150);

    let rowsCount = await page.$$eval('#distributors-body tr', rows => rows.length);
    console.log(` - Filtered rows count: ${rowsCount}`);
    assert.equal(rowsCount, 1);

    // Click reset filters
    await page.click('#reset-filters-distributors');
    await page.waitForTimeout(150);
    rowsCount = await page.$$eval('#distributors-body tr', rows => rows.length);
    assert.equal(rowsCount >= 2, true);
    console.log(` - After reset, rows count: ${rowsCount}`);

    // 3. Excluded address filters
    console.log('3. Testing excluded address checkboxes...');
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');

    const totalAddresses = await page.$$eval('#addresses-body tr', rows => rows.length);
    console.log(` - Total address rows: ${totalAddresses}`);

    // Check "Only with excluded households"
    await page.check('#filter-addresses-with-excluded');
    await page.waitForTimeout(100);
    const withExcludedCount = await page.$$eval('#addresses-body tr', rows => rows.length);
    console.log(` - Addresses with excluded households: ${withExcludedCount}`);
    assert.equal(withExcludedCount < totalAddresses, true);
    assert.equal(withExcludedCount > 0, true);

    // Uncheck
    await page.uncheck('#filter-addresses-with-excluded');
    await page.waitForTimeout(100);

    // 4. Sorting
    console.log('4. Testing column sorting...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    const routeHeader = await page.$('#routes-col-id');
    await routeHeader.click();
    await page.waitForTimeout(100);
    let sortState = await routeHeader.getAttribute('aria-sort');
    assert.equal(sortState === 'ascending' || sortState === 'descending', true);
    console.log(` - Column sort toggled to: ${sortState}`);

    // 5. Batch selection controls
    console.log('5. Testing batch row selection...');
    const firstCheckbox = await page.$('#routes-body tr:first-child input.row-select-checkbox');
    assert.ok(firstCheckbox, 'First row checkbox exists');
    await firstCheckbox.check();
    await page.waitForTimeout(100);

    const chipText = await page.innerText('#selected-chip-routes');
    console.log(` - Batch selection chip text: "${chipText}"`);
    assert.equal(chipText.includes('1'), true);

    // Verify batch action buttons are enabled
    const batchStatusBtn = await page.$('#batch-status-routes');
    const isStatusDisabled = await batchStatusBtn.isDisabled();
    assert.equal(isStatusDisabled, false);

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 Tables UX E2E tests passed successfully!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
