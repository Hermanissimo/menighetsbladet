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
  const port = 8004;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('CONSOLE ERROR:', msg.text());
  });

  try {
    console.log('Testing Email validation in modals...');
    await page.goto(`http://localhost:${port}/web/`);
    await page.waitForSelector('.dashboard-grid');

    // Go to drivers tab
    await page.click('#tab-drivers');
    await page.waitForSelector('#add-driver');

    // 1. Open Add Driver modal
    await page.click('#add-driver');
    await page.waitForSelector('#edit-modal:not([hidden])');
    console.log(' - Opened Add Driver modal.');

    // 2. Test invalid email format: 'notanemail'
    console.log(' - Testing invalid email: "notanemail"...');
    await page.fill('#edit-modal-form input[data-field="name"]', 'Test Sjåfør Epost');
    await page.fill('#edit-modal-form input[data-field="email"]', 'notanemail');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(200);

    const emailError = await page.innerText('.modal-field input[data-field="email"] ~ .field-error-message:not([hidden])');
    console.log(`   - Inline error under email field: "${emailError}"`);
    if (!emailError) {
      throw new Error('Expected inline field error under email input for invalid email!');
    }

    const topBannerError = await page.innerText('#edit-modal-error:not([hidden])');
    console.log(`   - Top modal error banner: "${topBannerError}"`);
    if (!topBannerError.toLowerCase().includes('post') && !topBannerError.toLowerCase().includes('email')) {
      throw new Error('Expected top error banner to mention email error!');
    }

    // 3. Test valid email containing the letter 's' (which previously misfired!)
    await page.fill('#edit-modal-form input[data-field="email"]', 'famwestern@gmail.com');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(500);

    const isVisible = await page.$eval('#edit-modal', el => !el.hidden && !el.hasAttribute('hidden'));
    if (isVisible) {
      const topErr = await page.innerText('#edit-modal-error');
      const inlineErrs = await page.$$eval('.field-error-message:not([hidden])', els => els.map(e => e.innerText));
      console.log('Modal still open! Errors:', { topErr, inlineErrs });
    }

    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log('   - Successfully saved driver with email containing letter "s"!');

    // 4. Test in Distributors modal: open edit modal on first distributor
    await page.click('#tab-distributors');
    await page.waitForSelector('#distributors-body tr');

    const firstSelect = await page.$('#distributors-body tr .row-action-select');
    await firstSelect.selectOption('edit');
    await page.waitForSelector('#edit-modal:not([hidden])');
    console.log(' - Opened Edit Distributor modal.');

    // Test another valid email with multiple 's' letters and dots
    await page.fill('#edit-modal-form input[data-field="email"]', 'lars.simensen@kirken.oslo.no');
    await page.click('#edit-modal-save');
    await page.waitForTimeout(500);

    const isDistModalVisible = await page.$eval('#edit-modal', el => !el.hidden && !el.hasAttribute('hidden'));
    if (isDistModalVisible) {
      const topErr = await page.innerText('#edit-modal-error');
      const inlineErrs = await page.$$eval('.field-error-message:not([hidden])', els => els.map(e => e.innerText));
      console.log('Distributor modal still open! Errors:', { topErr, inlineErrs });
    }

    await page.waitForSelector('#edit-modal', { state: 'hidden' });
    console.log('   - Successfully saved distributor with email "lars.simensen@kirken.oslo.no"!');

    console.log('=============================================');
    console.log('🎉 ALL EMAIL VALIDATION TESTS PASSED!');
    console.log('=============================================');

  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
