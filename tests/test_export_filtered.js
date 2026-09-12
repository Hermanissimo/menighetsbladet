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
  const port = 8007;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Testing exports with filtered data...');
    await page.goto(`http://localhost:${port}/web/`);
    await page.waitForSelector('.dashboard-grid');

    // 1. Addresses table: Filter to only excluded (17 addresses)
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');
    await page.check('#filter-addresses-only-excluded');
    await page.waitForTimeout(300);

    const [addrDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-addresses').then(() => page.click('#panel-addresses .export-action[data-format="csv"]'))
    ]);
    const addrCsvPath = await addrDownload.path();
    const addrLines = fs.readFileSync(addrCsvPath, 'utf8').trim().split('\n');
    console.log(`Addresses CSV exported lines (including header): ${addrLines.length}`);
    if (addrLines.length !== 18) { // 1 header + 17 data rows
      console.warn(`WARNING: Expected 18 lines (1 header + 17 rows), got ${addrLines.length}`);
    }

    // 2. Drivers Print: Filter drivers by selecting inactive or a specific driver
    await page.click('#tab-drivers');
    await page.waitForSelector('#drivers-body tr');

    // Filter drivers by typing in name filter or clicking a filter
    const [driverDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#export-drivers').then(() => page.click('#panel-drivers .export-action[data-format="csv"]'))
    ]);
    const driverCsvPath = await driverDownload.path();
    const driverLines = fs.readFileSync(driverCsvPath, 'utf8').trim().split('\n');
    console.log(`Drivers unfiltered CSV exported lines: ${driverLines.length}`);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
    server.close();
  }
})();
