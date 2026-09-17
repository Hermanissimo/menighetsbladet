const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, '..', 'web', reqPath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(8081, async () => {
  console.log('Server started on http://localhost:8081');
  const browser = await chromium.launch();
  
  try {
    // Test 1: Full HD 1920x1080
    const page1920 = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page1920.goto('http://localhost:8081');
    await page1920.waitForSelector('.page');

    const pageWidth1920 = await page1920.$eval('.page', el => el.getBoundingClientRect().width);
    console.log(`Page width at 1920 viewport: ${pageWidth1920}px`);

    const dashGridCols1920 = await page1920.$eval('.dashboard-grid', el => {
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    console.log(`Dashboard grid column count at 1920: ${dashGridCols1920}`);

    if (pageWidth1920 > 1750 && dashGridCols1920 === 6) {
      console.log('✅ 1920x1080 widescreen layout verified successfully!');
    } else {
      console.error('❌ Failed 1920x1080 verification: width = ' + pageWidth1920 + ', cols = ' + dashGridCols1920);
    }

    // Test 2: QHD / 2560x1440
    const page2560 = await browser.newPage({ viewport: { width: 2560, height: 1440 } });
    await page2560.goto('http://localhost:8081');
    await page2560.waitForSelector('.page');

    const pageWidth2560 = await page2560.$eval('.page', el => el.getBoundingClientRect().width);
    console.log(`Page width at 2560 viewport: ${pageWidth2560}px`);

    if (pageWidth2560 > 2300) {
      console.log('✅ 2560x1440 widescreen layout verified successfully!');
    } else {
      console.error('❌ Failed 2560x1440 verification: width = ' + pageWidth2560);
    }

    // Take screenshot of 1920x1080 dashboard
    await page1920.screenshot({ path: path.join(__dirname, 'widescreen_1920.png'), fullPage: false });
    console.log('Screenshot saved to tests/widescreen_1920.png');

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
