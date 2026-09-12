const { chromium } = require('playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');

function startServer(port) {
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
    let filePath = path.join(path.resolve(__dirname, '..'), reqPath);

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      fs.stat(filePath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
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
    server.listen(port, () => resolve(server));
  });
}

(async () => {
  console.log('Starting extensive UX tests...');
  const port = 8000;
  const server = await startServer(port);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = `http://localhost:${port}/web/`;
  let errors = [];

  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      if (!txt.includes('404') && !txt.includes('source.json')) {
        errors.push(`Console error: "${txt}"`);
      }
    }
  });

  try {
    console.log('1. Navigating to Dashboard...');
    await page.goto(baseUrl);
    await page.waitForSelector('.dashboard-grid');
    
    // Ensure directories exist
    if (!fs.existsSync('tests/screenshots')) {
      fs.mkdirSync('tests/screenshots', { recursive: true });
    }
    await page.screenshot({ path: 'tests/screenshots/1_dashboard.png' });
    console.log(' - Dashboard loaded successfully.');

    console.log('2. Testing Tabs Navigation...');
    const tabs = ['tab-drivers', 'tab-distributors', 'tab-routes', 'tab-addresses'];
    for (const tabId of tabs) {
      await page.click(`#${tabId}`);
      await page.waitForTimeout(200); // Wait for transition
      
      const tableName = tabId.replace('tab-', '');
      await page.waitForSelector(`#${tableName}-table`);
      console.log(` - ${tableName} tab loaded.`);
    }
    await page.screenshot({ path: 'tests/screenshots/2_tabs_nav.png' });

    console.log('3. Testing Route Validation (Format & Duplicate)...');
    await page.click('#tab-routes');
    await page.waitForSelector('#add-route');
    await page.click('#add-route');
    
    await page.waitForSelector('#edit-modal:not([hidden])');
    
    // Test empty validation
    console.log(' - Testing empty routeId validation...');
    await page.fill('#edit-modal-form input[data-field="routeId"]', '   ');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    
    let errorText = await page.innerText('.field-error-message:not([hidden])');
    if (!errorText.toLowerCase().includes('empty') && !errorText.toLowerCase().includes('tom')) {
      throw new Error('Empty validation error not displayed correctly. Got: ' + errorText);
    }
    console.log('   - Empty validation passed.');

    // Test duplicate validation
    console.log(' - Testing duplicate validation...');
    await page.fill('#edit-modal-form input[data-field="routeId"]', 'A 10');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(100);
    
    errorText = await page.innerText('.field-error-message:not([hidden])');
    if (!errorText.toLowerCase().includes('already exists') && !errorText.toLowerCase().includes('eksisterer allerede')) {
      throw new Error('Duplicate validation error not displayed correctly. Got: ' + errorText);
    }
    console.log('   - Duplicate validation passed.');
    
    await page.click('#edit-modal-cancel'); // Close modal
    
    console.log('4. Testing Filtering...');
    await page.click('#tab-addresses');
    await page.fill('#filter-addresses-route', 'A 1');
    await page.press('#filter-addresses-route', 'Enter');
    await page.waitForTimeout(300); // wait for debounce
    const rows = await page.locator('#addresses-body tr').count();
    console.log(` - Filtered addresses table. Visible rows: ${rows}`);
    await page.screenshot({ path: 'tests/screenshots/3_filtering.png' });

    console.log('=============================================');
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
    
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  } finally {
    if (errors.length > 0) {
      console.log('--- Page Errors Logged ---');
      errors.forEach(e => console.log(e));
    }
    await browser.close();
    server.close();
  }
})();
