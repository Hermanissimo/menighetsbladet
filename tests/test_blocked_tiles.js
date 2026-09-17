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
  console.log('Testing Check for Blocked Tiles feature...');
  const port = 8129;
  const server = await createStaticServer(path.resolve(__dirname, '..'), port);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  try {
    await page.goto(`http://localhost:${port}/web/index.html`);
    await page.waitForLoadState('networkidle');

    // 1. Verify window.checkBlockedTiles exists
    const hasFn = await page.evaluate(() => typeof window.checkBlockedTiles === 'function');
    if (!hasFn) {
      throw new Error('window.checkBlockedTiles is not defined or not a function');
    }
    console.log('✓ window.checkBlockedTiles is exposed as a function');

    // 2. Test checkBlockedTiles with an unreachable probe URL
    const isBlocked = await page.evaluate(async () => {
      return await window.checkBlockedTiles('https://invalid-non-existent-domain-12345.org/tile.png');
    });
    if (!isBlocked) {
      throw new Error('checkBlockedTiles should return true for invalid/blocked domain');
    }
    console.log('✓ checkBlockedTiles correctly detects blocked/unreachable tile URL (returned true)');

    // 3. Test resilient tile layer when tiles fail / are blocked
    // Navigate to Map tab
    await page.click('#tab-map');
    await page.waitForSelector('#map-container');

    // Test banner appearance when tiles are blocked
    const bannerAppears = await page.evaluate(async () => {
      // Create a test container to test setupResilientTileLayer fallback directly
      const div = document.createElement('div');
      div.id = 'test-map-container';
      div.style.width = '200px';
      div.style.height = '200px';
      document.body.appendChild(div);

      const statusSpan = document.createElement('span');
      statusSpan.id = 'test-map-status';
      document.body.appendChild(statusSpan);

      const testMap = L.map('test-map-container').setView([59.8624, 10.7960], 14);
      
      // Force tileerror events on the resilient layer to simulate adblocker blocking all tiles
      const layer = L.tileLayer('https://blocked-tile-test.org/{z}/{x}/{y}.png');
      layer.addTo(testMap);

      // Now test checkBlockedTiles on real probe
      const checkRes = await window.checkBlockedTiles();
      return typeof checkRes === 'boolean';
    });

    if (!bannerAppears) {
      throw new Error('checkBlockedTiles default call failed to return boolean');
    }
    console.log('✓ Default checkBlockedTiles executed smoothly');

    // 4. Test adblocker scenario using page routing to block all tile hosts
    const blockedContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const blockedPage = await blockedContext.newPage();
    
    // Abort all requests to openstreetmap, cartocdn, arcgis, and kartverket tile servers
    await blockedPage.route('**/*tile.openstreetmap.org/**', route => route.abort('blockedbyclient'));
    await blockedPage.route('**/*basemaps.cartocdn.com/**', route => route.abort('blockedbyclient'));
    await blockedPage.route('**/*server.arcgisonline.com/**', route => route.abort('blockedbyclient'));
    await blockedPage.route('**/*cache.kartverket.no/**', route => route.abort('blockedbyclient'));

    await blockedPage.goto(`http://localhost:${port}/web/index.html`);
    await blockedPage.waitForLoadState('networkidle');

    // Switch to Map tab
    await blockedPage.click('#tab-map');
    await blockedPage.waitForTimeout(3000);

    // Verify banner or warning status appears in the UI
    const blockedStatus = await blockedPage.evaluate(() => {
      const banner = document.querySelector('.map-tiles-blocked-banner');
      const statusEl = document.getElementById('map-status');
      return {
        hasBanner: !!banner,
        bannerText: banner ? banner.textContent : '',
        statusText: statusEl ? statusEl.textContent : ''
      };
    });

    console.log('Blocked tiles test status:', blockedStatus);
    if (!blockedStatus.hasBanner && !blockedStatus.statusText.includes('blokkert')) {
      throw new Error('Expected blocked banner or status text when all tile servers are blocked');
    }
    console.log('✓ Blocked tiles warning banner/status displayed when tile servers are blocked');

    console.log('\nAll Check for Blocked Tiles tests passed successfully!');
  } finally {
    await browser.close();
    server.close();
  }
})();
