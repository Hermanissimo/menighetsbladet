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
  const port = 8003;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Testing User Guide modal...');
    await page.goto(`http://localhost:${port}/web/`);
    await page.waitForSelector('#settings-toggle');
    await page.click('#settings-toggle');
    await page.waitForSelector('#open-user-guide', { state: 'visible' });

    // Click user guide button
    await page.click('#open-user-guide');
    await page.waitForSelector('#user-guide-modal:not([hidden])');
    await page.waitForTimeout(300);

    const guideText = await page.innerText('#user-guide-content');
    console.log('--- User Guide Text Preview ---');
    console.log(guideText.substring(0, 300) + '...\n');

    // Assertions
    if (guideText.includes('python -m http.server') || guideText.includes('Start the app') || guideText.includes('Start appen') || guideText.includes('powershell')) {
      throw new Error('User Guide still contains setup CLI / server instructions!');
    }

    if (!guideText.includes('Brukerveiledning') && !guideText.includes('User Guide') && !guideText.includes('Brukarrettleiing')) {
      throw new Error('User Guide title / header missing.');
    }

    if (!guideText.includes('Dashboard') && !guideText.includes('Dashbord') && !guideText.includes('Oversyn')) {
      throw new Error('Navigation information missing in user guide.');
    }

    console.log('✅ User Guide verified: shows concise guide without setup instructions!');

    // Close user guide
    await page.click('#user-guide-ok');
    await page.waitForSelector('#user-guide-modal', { state: 'hidden' });
    console.log('✅ User guide closed properly.');

  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
