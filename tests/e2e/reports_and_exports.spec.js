const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: Reports (Kjørelister, Gatelister), User Guide & Save ===');
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', 'test_source.json');
  let savedDataPayload = null;

  const server = await createTestServer({
    customDataPath: fixturePath,
    onSave: (body) => {
      savedDataPayload = body;
    }
  });
  console.log(`Test server running on ${server.url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => {
    if (!err.message.includes('_leaflet_pos')) errors.push(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('404') && !msg.text().includes('_leaflet_pos')) {
      errors.push(msg.text());
    }
  });

  try {
    await setupNetworkMocks(page);
    await page.goto(server.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tabs-nav');

    // 1. Kjøreliste (Driver Run-Sheet Preview Modal)
    console.log('1. Testing Kjøreliste preview modal...');
    await page.click('#tab-drivers');
    await page.click('#export-drivers');
    await page.waitForSelector('#print-all-drivers', { state: 'visible' });
    await page.click('#print-all-drivers');

    await page.waitForSelector('#report-modal:not([hidden])');
    const reportHtml = await page.innerHTML('#report-modal-content');
    assert.equal(reportHtml.includes('print-page'), true);
    assert.equal(reportHtml.includes('print-table'), true);
    assert.equal(reportHtml.includes('report-note-editable'), true);
    console.log(' - Kjøreliste rendered pages, tables, and editable notes.');

    // Close modal
    await page.click('#report-modal-close');
    await page.waitForSelector('#report-modal', { state: 'hidden' });
    console.log(' - Closed Kjøreliste modal.');

    // 2. Route Reports (Gateliste Preview Modal)
    console.log('2. Testing Route Report (Gateliste) preview modal...');
    await page.click('#tab-routes');
    await page.click('#export-routes');
    await page.waitForSelector('#print-all-routes', { state: 'visible' });
    await page.click('#print-all-routes');

    await page.waitForSelector('#route-report-modal:not([hidden])');
    const routeReportHtml = await page.innerHTML('#route-report-modal-content');
    assert.equal(routeReportHtml.includes('route-report-page') || routeReportHtml.includes('route-header'), true);
    console.log(' - Gateliste preview rendered.');

    // Toggle include map checkbox
    const mapToggle = await page.$('#route-report-include-map');
    assert.ok(mapToggle, 'Include map checkbox should exist');
    await mapToggle.uncheck();
    await page.waitForTimeout(100);
    await mapToggle.check();
    await page.waitForTimeout(100);

    // Close modal
    await page.click('#route-report-modal-close');
    await page.waitForSelector('#route-report-modal', { state: 'hidden' });
    console.log(' - Closed Gateliste modal.');

    // 3. User Guide Modal
    console.log('3. Testing User Guide modal...');
    await page.click('#settings-toggle');
    await page.waitForSelector('#open-user-guide', { state: 'visible' });
    await page.click('#open-user-guide');
    await page.waitForSelector('#user-guide-modal:not([hidden])');
    await page.waitForTimeout(200);

    const guideText = await page.innerText('#user-guide-content');
    assert.equal(guideText.length > 50, true);
    assert.equal(guideText.includes('python -m http.server'), false, 'Should not contain CLI instructions');
    console.log(' - User Guide renders clean markdown.');

    await page.click('#user-guide-ok');
    await page.waitForSelector('#user-guide-modal', { state: 'hidden' });
    console.log(' - Closed User Guide modal.');

    // 4. Persistence via /api/save
    console.log('4. Testing /api/save trigger...');
    // Make a quick edit to trigger save button visibility
    await page.click('#tab-routes');
    await page.click('#add-route');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.fill('#edit-modal-form input[data-field="routeId"]', 'SAVE-TEST-ROUTE');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });

    // Verify Save Changes button is visible
    await page.waitForSelector('#save-changes', { state: 'visible' });
    await page.click('#save-changes');
    await page.waitForTimeout(300);

    assert.ok(savedDataPayload, 'Server should have received /api/save POST request');
    const parsedPayload = JSON.parse(savedDataPayload);
    assert.equal(parsedPayload.routes.some(r => r.routeId === 'SAVE-TEST-ROUTE'), true);
    console.log(' - /api/save successfully triggered and payload validated.');

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 Reports, User Guide & Save E2E tests passed successfully!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
