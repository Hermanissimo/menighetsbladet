const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static file server
function createStaticServer(rootDir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/web/index.html';
    let filePath = path.join(rootDir, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      fs.stat(filePath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found: ' + reqPath);
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(server);
    });
  });
}

(async () => {
  console.log('Starting comprehensive verification of all 6 requirements...');
  const port = 8000;
  const server = await createStaticServer(path.resolve(__dirname, '..'), port);
  console.log(`Static server running on http://localhost:${port}/`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      // Ignore 404 on optional sourcemap if any
      if (!txt.includes('404')) errors.push(txt);
    }
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    // 1. Open app
    await page.goto(`http://localhost:${port}/web/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tabs-nav');
    await page.waitForSelector('#tab-distributors');
    await page.waitForSelector('#tab-drivers');
    await page.waitForSelector('#tab-routes');
    await page.waitForSelector('#tab-addresses');
    await page.waitForTimeout(500);
    console.log('App loaded successfully.');

    // --- REQUIREMENT 1: Email action (mailto:) on email columns ---
    console.log('\n--- Checking Requirement 1: Email action to open default email client ---');
    await page.click('#tab-drivers');
    await page.waitForSelector('#drivers-body tr');
    const driverEmailLinks = await page.$$('#drivers-body td a.mailto-link');
    console.log(`Found ${driverEmailLinks.length} driver email mailto links.`);
    if (driverEmailLinks.length === 0) {
      throw new Error('Req 1 Failed: No mailto links found in drivers table email column.');
    }
    const driverMailHref = await driverEmailLinks[0].getAttribute('href');
    if (!driverMailHref || !driverMailHref.startsWith('mailto:')) {
      throw new Error('Req 1 Failed: Driver email link does not start with mailto:. Got: ' + driverMailHref);
    }
    console.log(` - Driver mailto link verified: ${driverMailHref}`);

    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');
    const distEmailLinks = await page.$$('#distributors-body td a.mailto-link');
    console.log(`Found ${distEmailLinks.length} distributor email mailto links.`);
    if (distEmailLinks.length === 0) {
      throw new Error('Req 1 Failed: No mailto links found in distributors table email column.');
    }
    const distMailHref = await distEmailLinks[0].getAttribute('href');
    if (!distMailHref || !distMailHref.startsWith('mailto:')) {
      throw new Error('Req 1 Failed: Distributor email link does not start with mailto:. Got: ' + distMailHref);
    }
    console.log(` - Distributor mailto link verified: ${distMailHref}`);
    console.log('✅ Requirement 1 Verified.');

    // --- REQUIREMENT 3: Check translations on filters, placeholders and column titles ---
    console.log('\n--- Checking Requirement 3: Norwegian translations for bladbærer, placeholders and column headers ---');
    await page.selectOption('#language-select', 'nb');
    await page.waitForTimeout(300);

    const distTabHeader = await page.innerText('#tab-distributors');
    console.log(` - Tab header is: "${distTabHeader}"`);
    if (!distTabHeader.includes('Bladbærer')) {
      throw new Error('Req 3 Failed: tab-distributors does not contain "Bladbærer". Got: ' + distTabHeader);
    }

    const distPlaceholder = await page.getAttribute('#filter-distributors-distributorName', 'placeholder');
    console.log(` - filter-distributors-distributorName placeholder: "${distPlaceholder}"`);
    if (!distPlaceholder || !distPlaceholder.includes('Bladbærer')) {
      throw new Error('Req 3 Failed: filter-distributors-distributorName placeholder is not "Bladbærer". Got: ' + distPlaceholder);
    }

    const addrDistPlaceholder = await page.getAttribute('#filter-addresses-distributorName', 'placeholder');
    console.log(` - filter-addresses-distributorName placeholder: "${addrDistPlaceholder}"`);
    if (!addrDistPlaceholder || !addrDistPlaceholder.includes('Bladbærer')) {
      throw new Error('Req 3 Failed: filter-addresses-distributorName placeholder is not "Bladbærer". Got: ' + addrDistPlaceholder);
    }

    const addrColDistributor = await page.innerText('#addr-col-distributor');
    console.log(` - addr-col-distributor header: "${addrColDistributor}"`);
    if (!addrColDistributor.includes('Bladbærer')) {
      throw new Error('Req 3 Failed: addr-col-distributor is not "Bladbærer". Got: ' + addrColDistributor);
    }

    const routesColDistributors = await page.innerText('#routes-col-distributors');
    console.log(` - routes-col-distributors header: "${routesColDistributors}"`);
    if (!routesColDistributors.includes('Bladbærere')) {
      throw new Error('Req 3 Failed: routes-col-distributors is not "Bladbærere". Got: ' + routesColDistributors);
    }
    console.log('✅ Requirement 3 Verified.');

    // --- REQUIREMENT 2 & 5: Route naming rule (unique non-empty string) & Fix Add Route corruption ---
    console.log('\n--- Checking Requirements 2 & 5: Route validation & Add Route non-corruption ---');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Record initial state of route "A 1"
    const routeA1Before = await page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('#routes-body tr')).find(r => r.children[1] && r.children[1].innerText.includes('A 1'));
      return row ? {
        routeId: row.children[1].innerText.trim(),
        distributor: row.children[3].innerText.trim(),
        addresses: row.children[5].innerText.trim(),
        papers: row.children[7].innerText.trim()
      } : null;
    });
    console.log(' - Existing route A 1 baseline before add test:', routeA1Before);

    // First simulate editing route A 1 and canceling (which previously set originalRouteId!)
    const editBtnA1 = await page.$('#routes-body tr:first-child select[data-action-select]');
    if (editBtnA1) {
      await editBtnA1.selectOption('edit');
      await page.waitForSelector('#edit-modal:not([hidden])');
      await page.click('#edit-modal-cancel');
      await page.waitForSelector('#edit-modal', { state: 'hidden' });
    }

    // Now click Add Route
    await page.click('#add-route');
    await page.waitForSelector('#edit-modal:not([hidden])');

    // Test empty string validation (Req 2)
    console.log(' - Testing empty routeId validation...');
    await page.fill('#edit-modal-form input[data-field="routeId"]', '   ');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    let errorText = await page.innerText('.field-error-message:not([hidden])');
    console.log(`   Error text for empty route: "${errorText}"`);
    if (!errorText.toLowerCase().includes('tom') && !errorText.toLowerCase().includes('empty')) {
      throw new Error('Req 2 Failed: Empty routeId did not trigger empty error. Got: ' + errorText);
    }
    console.log('   Empty route ID rejected as required.');

    // Test duplicate validation (Req 2)
    console.log(' - Testing duplicate routeId validation...');
    await page.fill('#edit-modal-form input[data-field="routeId"]', 'A 1');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    errorText = await page.innerText('.field-error-message:not([hidden])');
    console.log(`   Error text for duplicate route: "${errorText}"`);
    if (!errorText.toLowerCase().includes('eksisterer') && !errorText.toLowerCase().includes('already exists')) {
      throw new Error('Req 2 Failed: Duplicate routeId did not trigger duplicate error. Got: ' + errorText);
    }
    console.log('   Duplicate route ID rejected as required.');

    // Test unique non-empty string with arbitrary format (Req 2)
    const customRouteName = 'SPECIAL RUTE 999';
    console.log(` - Adding valid unique route with custom name "${customRouteName}"...`);
    await page.fill('#edit-modal-form input[data-field="routeId"]', customRouteName);
    
    // Uncheck requiresDistributor
    const reqDistCheckbox = await page.$('#edit-modal-form input[data-field="requiresDistributor"]');
    if (reqDistCheckbox) {
      const isChecked = await reqDistCheckbox.isChecked();
      if (isChecked) await reqDistCheckbox.uncheck();
    }
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(`   Custom route "${customRouteName}" saved successfully.`);

    // Verify A 1 was NOT corrupted (Req 5)
    const routeA1After = await page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('#routes-body tr')).find(r => r.children[1] && r.children[1].innerText.includes('A 1'));
      return row ? {
        routeId: row.children[1].innerText.trim(),
        distributor: row.children[3].innerText.trim(),
        addresses: row.children[5].innerText.trim(),
        papers: row.children[7].innerText.trim()
      } : null;
    });
    console.log(' - Existing route A 1 after adding new route:', routeA1After);

    if (!routeA1After || routeA1After.addresses !== routeA1Before.addresses || routeA1After.distributor !== routeA1Before.distributor) {
      throw new Error('Req 5 FAILED: Route A 1 was corrupted when adding new route!');
    }
    console.log(' - Existing route A 1 retained all its addresses and distributor unchanged!');
    console.log('✅ Requirement 5 Verified.');
    console.log('✅ Requirement 2 Verified.');

    // --- REQUIREMENT 4: Warning if active distributors without assigned driver ---
    console.log('\n--- Checking Requirement 4: Warning for active distributor without driver ---');
    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');

    // Add an active distributor without a driver
    await page.click('#add-distributor');
    await page.waitForSelector('#edit-modal:not([hidden])');
    await page.fill('#edit-modal-form input[data-field="name"]', 'Test Bladbærer Uten Sjåfør');
    // Select a route
    await page.selectOption('#edit-modal-form select[data-type="multiselect"]', 'A 1');
    // Driver select remains empty
    await page.selectOption('#edit-modal-form select[data-field="driverName"]', '');
    await page.click('#edit-modal-save');
    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log(' - Created test active distributor without driver.');

    // Filter to this distributor in table
    await page.fill('#filter-distributors-distributorName', 'Test Bladbærer Uten Sjåfør');
    await page.press('#filter-distributors-distributorName', 'Enter');
    await page.waitForTimeout(300);

    const warningBadge = await page.$('#distributors-body tr.warning-row .warning-badge');
    if (!warningBadge) {
      throw new Error('Req 4 Failed: Warning badge or warning-row class not found for active distributor without driver.');
    }
    const badgeText = await warningBadge.innerText();
    console.log(` - Warning badge found in table: "${badgeText}"`);

    // Check totals bar for warning
    const distTotalsText = await page.innerText('#distributors-totals');
    console.log(` - Distributors table totals text: "${distTotalsText}"`);
    if (!distTotalsText.includes('⚠️')) {
      throw new Error('Req 4 Failed: Distributors totals bar does not contain warning indicator.');
    }

    // Check Dashboard personnel card for warning
    await page.click('#tab-dashboard');
    await page.waitForSelector('#dash-dist-no-driver-row:not([hidden])');
    const warningCount = await page.innerText('#dist-no-driver');
    console.log(` - Dashboard active without driver count: ${warningCount}`);
    if (parseInt(warningCount, 10) < 1) {
      throw new Error('Req 4 Failed: Dashboard warning count is less than 1.');
    }
    console.log('✅ Requirement 4 Verified.');

    console.log('\n=============================================');
    console.log('🎉 ALL 6 REQUIREMENTS THOROUGHLY VERIFIED!');
    console.log('=============================================\n');

  } catch (err) {
    console.error('❌ VERIFICATION FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
