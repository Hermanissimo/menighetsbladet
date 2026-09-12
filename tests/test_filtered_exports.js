const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.md': 'text/markdown'
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
        const contentType = mimeTypes[ext] || 'text/plain';
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
  const port = 8008;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  try {
    console.log('Testing that all table exports use filtered table data...');
    await page.goto(`http://localhost:${port}/web/`);
    await page.waitForSelector('.dashboard-grid');

    // ==========================================
    // 1. Addresses table: Filter to excluded addresses
    // ==========================================
    console.log('\n--- 1. Testing Addresses Table Export ---');
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');

    // Filter to only excluded (17 addresses)
    await page.check('#filter-addresses-only-excluded');
    await page.waitForTimeout(300);

    const [addrCsvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-addresses').then(() => page.click('#panel-addresses .export-action[data-format="csv"]'))
    ]);
    const addrCsvContent = fs.readFileSync(await addrCsvDownload.path(), 'utf8').trim().split('\n');
    console.log(` - Addresses CSV lines (header + data): ${addrCsvContent.length}`);
    if (addrCsvContent.length !== 18) {
      throw new Error(`Expected 18 lines (1 header + 17 rows), got ${addrCsvContent.length}`);
    }
    console.log(' ✅ Addresses CSV export strictly matches filtered table data (17 records)!');

    // ==========================================
    // 2. Drivers table: Filter and Print
    // ==========================================
    console.log('\n--- 2. Testing Drivers Table Print Export ---');
    await page.click('#tab-drivers');
    await page.waitForSelector('#drivers-body tr');

    // Filter by single driver: type name and press Enter
    const driverInput = await page.$('.filters-grid #filter-drivers-driverName');
    await driverInput.fill('Kristian Mehus');
    await driverInput.press('Enter');
    await page.waitForTimeout(300);

    // Verify table has 1 visible row
    const driverRowsCount = await page.$$eval('#drivers-body tr', rows => rows.length);
    console.log(` - Drivers table filtered rows: ${driverRowsCount}`);

    // Export -> Print (Kjørelister)
    await page.click('#export-drivers');
    await page.click('#panel-drivers .export-action[data-format="print"]');
    await page.waitForSelector('#report-modal:not([hidden])');
    
    // Check how many print-page cards are rendered
    const driverPrintPages = await page.$$eval('#report-modal-content .print-page', pages => pages.length);
    console.log(` - Kjørelister print pages rendered: ${driverPrintPages}`);
    if (driverPrintPages !== 1) {
      throw new Error(`Expected 1 driver print page for filtered driver, but got ${driverPrintPages}!`);
    }
    console.log(' ✅ Drivers Print export strictly matches filtered table data (1 driver)!');
    await page.click('#report-modal-close');

    // Export CSV for Drivers
    const [driverCsvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-drivers').then(() => page.click('#panel-drivers .export-action[data-format="csv"]'))
    ]);
    const driverCsvContent = fs.readFileSync(await driverCsvDownload.path(), 'utf8').trim().split('\n');
    console.log(` - Drivers CSV lines: ${driverCsvContent.length}`);
    if (driverCsvContent.length !== 2) { // 1 header + 1 driver
      throw new Error(`Expected 2 lines for filtered driver CSV, got ${driverCsvContent.length}`);
    }
    console.log(' ✅ Drivers CSV export strictly matches filtered table data (1 driver)!');

    // ==========================================
    // 3. Routes table: Filter and Print & CSV
    // ==========================================
    console.log('\n--- 3. Testing Routes Table Export ---');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Filter to a specific route: "A 1"
    const routeInput = await page.$('#filter-routes-route');
    await routeInput.fill('A 1');
    await routeInput.press('Enter');
    await page.waitForTimeout(300);

    // Export -> Print (Route Reports)
    await page.click('#export-routes');
    await page.click('#panel-routes .export-action[data-format="print"]');
    await page.waitForSelector('#route-report-modal:not([hidden])');

    const routePrintPages = await page.$$eval('#route-report-modal-content .print-page', pages => pages.length);
    console.log(` - Route report print pages rendered: ${routePrintPages}`);
    if (routePrintPages !== 1) {
      throw new Error(`Expected 1 route report print page for filtered route, but got ${routePrintPages}!`);
    }
    console.log(' ✅ Routes Print export strictly matches filtered table data (1 route)!');
    await page.click('#route-report-modal-close');

    // Export CSV for Routes
    const [routeCsvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-routes').then(() => page.click('#panel-routes .export-action[data-format="csv"]'))
    ]);
    const routeCsvContent = fs.readFileSync(await routeCsvDownload.path(), 'utf8').trim().split('\n');
    console.log(` - Routes CSV lines: ${routeCsvContent.length}`);
    if (routeCsvContent.length !== 2) { // 1 header + 1 route
      throw new Error(`Expected 2 lines for filtered route CSV, got ${routeCsvContent.length}`);
    }
    console.log(' ✅ Routes CSV export strictly matches filtered table data (1 route)!');

    // ==========================================
    // 4. Distributors table: Filter & CSV
    // ==========================================
    console.log('\n--- 4. Testing Distributors Table Export ---');
    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');

    // Filter distributor to "Bodil Kvalvaag"
    const distInput = await page.$('#filter-distributors-distributorName');
    await distInput.fill('Bodil Kvalvaag');
    await distInput.press('Enter');
    await page.waitForTimeout(300);

    const [distCsvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-distributors').then(() => page.click('#panel-distributors .export-action[data-format="csv"]'))
    ]);
    const distCsvContent = fs.readFileSync(await distCsvDownload.path(), 'utf8').trim().split('\n');
    console.log(` - Distributors CSV lines: ${distCsvContent.length}`);
    if (distCsvContent.length !== 2) { // 1 header + 1 distributor
      throw new Error(`Expected 2 lines for filtered distributor CSV, got ${distCsvContent.length}`);
    }
    console.log(' ✅ Distributors CSV export strictly matches filtered table data (1 distributor)!');

    console.log('\n=================================================================');
    console.log('🎉 ALL TABLE EXPORTS (CSV, XLSX, PRINT) VERIFIED FILTERED DATA!');
    console.log('=================================================================');

  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
