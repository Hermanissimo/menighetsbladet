const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');
const { createTestServer } = require('../helpers/test_server.js');
const { setupNetworkMocks } = require('../helpers/network_mocks.js');

(async () => {
  console.log('=== E2E: Deep Dive on All Modals, State Leakage & Dismissals ===');
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
    if (msg.type() === 'error' && !msg.text().includes('404') && !msg.text().includes('_leaflet_pos') && !msg.text().includes('ERR_NAME_NOT_RESOLVED')) {
      errors.push(msg.text());
    }
  });

  try {
    await setupNetworkMocks(page);
    await page.goto(server.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tabs-nav');

    // ========================================================
    // 1. DISMISSAL VECTORS & STATE CLEANUP (X, Cancel, Backdrop, Escape)
    // ========================================================
    console.log('1. Testing Modal Dismissal Vectors (Escape, Backdrop, Cancel, X button)...');
    await page.click('#tab-drivers');
    await page.waitForSelector('#add-driver');

    // 1a. Open and close via Escape
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.keyboard.press('Escape');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(' - Dismissed via Escape key.');

    // 1b. Open and close via Backdrop click
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    // Click on modal backdrop element
    await page.click('#edit-modal .modal-backdrop', { position: { x: 10, y: 10 } });
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(' - Dismissed via Backdrop click.');

    // 1c. Open and close via 'X' button
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.click('#edit-modal-close');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(' - Dismissed via X button.');

    // 1d. Open, trigger an error, close via Cancel, reopen and verify error is CLEARED (no state leakage)
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.fill('#edit-modal-form input[data-field="name"]', ''); // Empty name triggers required error
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    const errorShown = await page.$('.field-error-message:not([hidden])');
    assert.ok(errorShown, 'Validation error should be displayed');

    // Cancel modal
    await page.click('#edit-modal-cancel');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });

    // Reopen modal: verify error div is HIDDEN and field is clean
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    const fieldErrorHidden = await page.$eval('.field-error-message', el => el.hidden);
    assert.equal(fieldErrorHidden, true, 'Reopened modal must not leak previous error state');
    await page.click('#edit-modal-cancel');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(' - Verified state reset: errors do not leak between modal openings.');

    // ========================================================
    // 2. EDIT MODAL ACROSS ALL 4 ENTITY TYPES
    // ========================================================
    console.log('2. Testing Edit Modal on Driver, Distributor, Route, Address...');

    // 2a. Edit Driver
    console.log(' - Testing Edit Driver...');
    await page.selectOption('#drivers-body tr:first-child select.row-action-select', 'edit');
    await page.waitForSelector('#edit-modal:not([hidden])');
    const driverPhoneInput = await page.$('#edit-modal-form input[data-field="phone"]');
    assert.ok(driverPhoneInput, 'Phone input should exist on driver edit modal');
    await driverPhoneInput.fill('88887777');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    await page.waitForSelector('#drivers-body td:has-text("88887777")');
    console.log('   ✓ Driver updated successfully in table.');

    // 2b. Edit Distributor (change assigned driver)
    console.log(' - Testing Edit Distributor...');
    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');
    await page.selectOption('#distributors-body tr:first-child select.row-action-select', 'edit');
    await page.waitForSelector('#edit-modal:not([hidden])');
    // Select different driver in dropdown
    await page.selectOption('#edit-modal-form select[data-field="driverName"]', 'Inaktiv Kjører');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    await page.waitForSelector('#distributors-body td:has-text("Inaktiv Kjører")');
    console.log('   ✓ Distributor driver updated successfully in table.');

    // 2c. Edit Route with dynamic dropdown toggle
    console.log(' - Testing Edit Route dynamic dropdown toggling...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');
    await page.selectOption('#routes-body tr:first-child select.row-action-select', 'edit');
    await page.waitForSelector('#edit-modal:not([hidden])');

    const reqDistCheckbox = await page.$('#edit-modal-form input[data-field="requiresDistributor"]');
    assert.ok(reqDistCheckbox, 'requiresDistributor checkbox exists');

    // When requiresDistributor is checked, distributor label is visible, driver label is hidden
    const distControl = await page.$('#edit-modal-form select[data-field="distributor"]');
    const driverControl = await page.$('#edit-modal-form select[data-field="driver"]');
    assert.equal(await distControl.isVisible(), true, 'Distributor dropdown visible when checked');
    assert.equal(await driverControl.isVisible(), false, 'Driver dropdown hidden when checked');

    // Uncheck requiresDistributor
    await reqDistCheckbox.uncheck();
    assert.equal(await distControl.isVisible(), false, 'Distributor dropdown hidden when unchecked');
    assert.equal(await driverControl.isVisible(), true, 'Driver dropdown visible when unchecked');

    // Recheck and update note
    await reqDistCheckbox.check();
    await page.fill('#edit-modal-form input[data-field="notes"]', 'MODAL TEST NOTAT');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    await page.waitForSelector('#routes-body td:has-text("MODAL TEST NOTAT")');
    console.log('   ✓ Route updated successfully with verified dynamic field toggling.');

    // 2d. Edit Address
    console.log(' - Testing Edit Address...');
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');
    await page.selectOption('#addresses-body tr:first-child select.row-action-select', 'edit');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.fill('#edit-modal-form input[data-field="numberOfHouseholds"]', '7');
    await page.fill('#edit-modal-form input[data-field="note"]', 'Dørtelefon 701');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    await page.waitForSelector('#addresses-body td:has-text("Dørtelefon 701")');
    console.log('   ✓ Address updated successfully in table.');

    // ========================================================
    // 3. DELETE MODAL & TRANSFER TARGET DROPDOWN
    // ========================================================
    console.log('3. Testing Delete Modal with transfer dropdown...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Find route B 1 action select and choose delete
    const routeB1Select = await page.evaluateHandle(() => {
      const rows = Array.from(document.querySelectorAll('#routes-body tr'));
      const row = rows.find(r => r.innerText.includes('B 1'));
      return row ? row.querySelector('select.row-action-select') : null;
    });
    assert.ok(routeB1Select, 'Route B 1 action select must exist');
    await routeB1Select.selectOption('delete');

    await page.waitForSelector('#delete-modal:not([hidden])');
    const transferWrap = await page.$('#delete-modal-transfer-wrap');
    assert.equal(await transferWrap.isVisible(), true, 'Transfer wrap must be visible for routes delete');

    // Transfer dropdown should list remaining routes
    const transferOptions = await page.$$eval('#delete-modal-transfer option', opts => opts.map(o => o.textContent.trim()));
    console.log(' - Delete transfer options available:', transferOptions.filter(Boolean));
    assert.equal(transferOptions.includes('A 1'), true, 'Should include A 1 in transfer options');
    assert.equal(transferOptions.includes('B 1'), false, 'Should NOT include the route being deleted');

    // Test Cancel button on delete modal
    await page.click('#delete-modal-cancel');
    await page.waitForSelector('#delete-modal', { state: 'hidden' });
    console.log(' - Delete modal canceled: record preserved.');

    // ========================================================
    // 4. BATCH STATUS MODAL
    // ========================================================
    console.log('4. Testing Batch Status Modal...');
    // Select first two route checkboxes
    const routeCheckboxes = await page.$$('#routes-body tr input.row-select-checkbox');
    assert.equal(routeCheckboxes.length >= 2, true);
    await routeCheckboxes[0].check();
    await routeCheckboxes[1].check();
    await page.waitForTimeout(100);

    const batchStatusBtn = await page.$('#batch-status-routes');
    await batchStatusBtn.click();
    await page.waitForSelector('#batch-status-modal:not([hidden])');

    // Select "inactive" status
    await page.selectOption('#batch-status-select', 'inactive');
    await page.click('#batch-status-apply');
    await page.waitForSelector('#batch-status-modal', { state: 'hidden' });
    console.log(' - Batch status applied successfully.');

    // Verify selection chip is cleared
    const chipTextAfter = await page.innerText('#selected-chip-routes');
    assert.equal(chipTextAfter.includes('Selected: 0') || chipTextAfter.trim() === '', true);
    console.log(' - Batch selection cleared after apply.');

    // ========================================================
    // 5. BATCH ROUTE MODAL (Addresses)
    // ========================================================
    console.log('5. Testing Batch Route Modal on Addresses...');
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');

    await page.locator('#addresses-body tr:nth-child(1) input.row-select-checkbox').check();
    await page.locator('#addresses-body tr:nth-child(2) input.row-select-checkbox').check();
    await page.waitForTimeout(100);

    const batchRouteBtn = await page.$('#batch-route-addresses');
    await batchRouteBtn.click();
    await page.waitForSelector('#batch-route-modal:not([hidden])');

    // Select route A 2
    await page.selectOption('#batch-route-select', 'A 2');
    await page.click('#batch-route-apply');
    await page.waitForSelector('#batch-route-modal', { state: 'hidden' });
    console.log(' - Batch route reassignment applied to A 2.');

    // ========================================================
    // 6. MERGE ROUTES MODAL
    // ========================================================
    console.log('6. Testing Merge Routes Modal...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Select 2 routes
    await page.locator('#routes-body tr:nth-child(1) input.row-select-checkbox').check();
    await page.locator('#routes-body tr:nth-child(2) input.row-select-checkbox').check();
    await page.waitForTimeout(100);

    const mergeBtn = await page.$('#merge-routes-btn');
    assert.equal(await mergeBtn.isDisabled(), false, 'Merge routes button should be enabled with 2+ routes');
    await mergeBtn.click();
    await page.waitForSelector('#merge-routes-modal:not([hidden])');

    // Enter merged route ID
    const mergedRouteName = 'M 100';
    await page.fill('#merge-routes-fields input[data-field="routeId"]', mergedRouteName);
    await page.click('#merge-routes-apply');
    await page.waitForSelector('#merge-routes-modal', { state: 'hidden' });

    // Verify merged route in table
    await page.waitForSelector('#routes-body td:has-text("M 100")');
    console.log(' - Successfully merged routes into M 100.');

    // ========================================================
    // 7. CLOSE GUARD MODAL
    // ========================================================
    console.log('7. Testing Close Guard Modal for unsaved changes...');
    // Open close guard modal directly to test user interaction choices
    await page.evaluate(() => {
      window.openCloseGuardModal ? window.openCloseGuardModal() : document.getElementById('close-guard-modal').removeAttribute('hidden');
    });
    await page.waitForSelector('#close-guard-modal:not([hidden])');

    // Test "Continue work" dismisses modal
    await page.click('#close-guard-continue');
    await page.waitForSelector('#close-guard-modal', { state: 'hidden' });
    console.log(' - Close guard modal dismissed via "Continue work".');

    if (errors.length > 0) {
      throw new Error(`Browser console/page errors detected: ${JSON.stringify(errors)}`);
    }

    console.log('🎉 ALL MODALS, DISMISSAL VECTORS & VALIDATIONS PASSED CLEANLY!\n');
  } finally {
    await browser.close();
    await server.close();
  }
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
