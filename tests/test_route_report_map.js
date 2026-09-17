const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

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
  console.log('Testing Route Report Map feature...');
  const port = 8124;
  const server = await createStaticServer(path.resolve(__dirname, '..'), port);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    await page.goto(`http://localhost:${port}/web/index.html`);
    await page.waitForLoadState('networkidle');

    // Wait for data to load
    await page.waitForTimeout(1000);

    // Click Routes tab
    console.log('Switching to Routes tab...');
    await page.click('#tab-routes');
    await page.waitForSelector('#routes-body tr');

    // Check if table has rows
    const actionSelects = page.locator('#routes-body select.row-action-select');
    const count = await actionSelects.count();
    console.log(`Found ${count} routes in table.`);
    if (count === 0) throw new Error('No routes found in table');

    // Open route report for first route
    console.log('Opening Route Report for first route...');
    await actionSelects.first().selectOption('view-route-report');
    await page.waitForTimeout(1000);

    // Check modal visibility
    const modal = page.locator('#route-report-modal');
    const isHidden = await modal.getAttribute('hidden');
    if (isHidden !== null) throw new Error('Route report modal is still hidden');
    console.log('✓ Route report modal opened.');

    // Check map toggle checkbox
    const mapToggle = page.locator('#route-report-include-map');
    const isChecked = await mapToggle.isChecked();
    console.log(`✓ Map toggle is present and checked: ${isChecked}`);
    if (!isChecked) throw new Error('Map toggle should be checked by default');

    // Check text report page
    const reportPages = page.locator('#route-report-modal-content .route-report-page');
    const pageCount = await reportPages.count();
    console.log(`✓ Found ${pageCount} report page(s).`);
    if (pageCount < 2) throw new Error(`Expected at least 2 pages (report + map), found ${pageCount}`);

    // Check map page specifically
    const mapPage = page.locator('#route-report-modal-content .route-report-map-page');
    const hasMapPage = await mapPage.count();
    if (hasMapPage === 0) throw new Error('No .route-report-map-page found in modal content');
    console.log('✓ Found .route-report-map-page element.');

    // Check title on map page contains route ID
    const mapTitle = await mapPage.locator('h2.print-title').innerText();
    console.log(`✓ Map page title: "${mapTitle}"`);
    if (!mapTitle.includes('kart') && !mapTitle.includes('map')) {
      throw new Error(`Map title "${mapTitle}" does not contain expected heading`);
    }

    // Check map container and leaflet map
    const mapContainer = mapPage.locator('.route-report-map-container');
    const mapId = await mapContainer.getAttribute('id');
    console.log(`✓ Map container ID: ${mapId}`);

    // Wait for Leaflet to initialize
    await page.waitForTimeout(1500);

    // Verify leaflet pane exists
    const leafletPane = mapContainer.locator('.leaflet-pane');
    const paneCount = await leafletPane.count();
    console.log(`✓ Leaflet pane count: ${paneCount}`);
    if (paneCount === 0) throw new Error('Leaflet map was not initialized inside container');

    // Verify markers exist
    const markers = mapContainer.locator('.route-map-badge');
    const markerCount = await markers.count();
    console.log(`✓ Placed ${markerCount} address badge markers on the route map.`);
    if (markerCount === 0) throw new Error('No address markers were added to the route map');

    // Verify legend exists
    const legend = mapPage.locator('.route-report-map-legend');
    const legendText = await legend.innerText();
    console.log(`✓ Legend text: "${legendText}"`);

    // Screenshot the modal showing the map page
    const screenshotPath = path.resolve(__dirname, '..', 'scratch', 'route_report_map_test.png');
    await mapPage.scrollIntoViewIfNeeded();
    await page.screenshot({ path: screenshotPath });
    console.log(`✓ Screenshot saved to ${screenshotPath}`);

    // Test unchecking the map toggle
    console.log('Testing unchecking map toggle...');
    await mapToggle.uncheck();
    await page.waitForTimeout(500);

    const mapPageAfterUncheck = await page.locator('#route-report-modal-content .route-report-map-page').count();
    console.log(`✓ Map page count after uncheck: ${mapPageAfterUncheck}`);
    if (mapPageAfterUncheck !== 0) throw new Error('Map page should be removed when unchecked');

    // Test re-checking the map toggle
    console.log('Testing re-checking map toggle...');
    await mapToggle.check();
    await page.waitForTimeout(1000);

    const mapPageAfterRecheck = await page.locator('#route-report-modal-content .route-report-map-page').count();
    console.log(`✓ Map page count after recheck: ${mapPageAfterRecheck}`);
    if (mapPageAfterRecheck === 0) throw new Error('Map page should be restored when checked');

    const markersAfterRecheck = await page.locator('#route-report-modal-content .route-map-badge').count();
    console.log(`✓ Markers after recheck: ${markersAfterRecheck}`);
    if (markersAfterRecheck === 0) throw new Error('Markers should be re-rendered');

    console.log('\n========================================');
    console.log('ALL ROUTE REPORT MAP TESTS PASSED SUCCESSFULLY!');
    console.log('========================================\n');
  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
})();
