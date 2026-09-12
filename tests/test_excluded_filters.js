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
  const port = 8005;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  try {
    console.log('Testing Excluded Checkbox Filters on Addresses table...');
    await page.goto(`http://localhost:${port}/web/`);
    await page.waitForSelector('.dashboard-grid');

    // Go to Addresses tab
    await page.click('#tab-addresses');
    await page.waitForSelector('#addresses-body tr');

    const totalInitialText = await page.innerText('#addresses-totals');
    console.log(' - Baseline addresses totals:', totalInitialText);

    const chkOnlyExcluded = '#filter-addresses-only-excluded';
    const chkWithExcluded = '#filter-addresses-with-excluded';

    // 1. Check "Show only excluded addresses"
    console.log(' - Checking "Show only excluded addresses"...');
    await page.check(chkOnlyExcluded);
    await page.waitForTimeout(300);

    let totalsOnlyExcluded = await page.innerText('#addresses-totals');
    console.log('   Totals after "Show only excluded addresses":', totalsOnlyExcluded);

    // Verify visible rows
    let rowsData = await page.$$eval('#addresses-body tr', rows => rows.map(r => {
      const cols = r.querySelectorAll('td');
      return {
        address: cols[1] ? cols[1].innerText.trim() : '',
        households: cols[4] ? parseInt(cols[4].innerText.trim(), 10) : 0,
        excluded: cols[5] ? parseInt(cols[5].innerText.trim(), 10) : 0
      };
    }));

    if (rowsData.length === 0) {
      throw new Error('Expected at least one excluded address in dataset');
    }

    for (const r of rowsData) {
      if (r.households - r.excluded > 0) {
        throw new Error(`Row ${r.address} has included households (${r.households} - ${r.excluded} = ${r.households - r.excluded}) but only excluded filter was active!`);
      }
    }
    console.log(`   ✅ Verified ${rowsData.length} visible rows on page: all have 0 included households!`);

    // 2. Uncheck "Show only excluded", check "Show only with excluded households"
    console.log(' - Checking "Show only addresses with excluded households"...');
    await page.uncheck(chkOnlyExcluded);
    await page.check(chkWithExcluded);
    await page.waitForTimeout(300);

    let totalsWithExcluded = await page.innerText('#addresses-totals');
    console.log('   Totals after "Show only addresses with excluded households":', totalsWithExcluded);

    rowsData = await page.$$eval('#addresses-body tr', rows => rows.map(r => {
      const cols = r.querySelectorAll('td');
      return {
        address: cols[1] ? cols[1].innerText.trim() : '',
        households: cols[4] ? parseInt(cols[4].innerText.trim(), 10) : 0,
        excluded: cols[5] ? parseInt(cols[5].innerText.trim(), 10) : 0
      };
    }));

    for (const r of rowsData) {
      if (r.excluded <= 0) {
        throw new Error(`Row ${r.address} has excluded count ${r.excluded} <= 0 but with-excluded filter was active!`);
      }
    }
    console.log(`   ✅ Verified ${rowsData.length} visible rows on page: all have excluded households > 0!`);

    // 3. Test Reset Filters button
    console.log(' - Testing "Reset filters" button...');
    await page.click('#reset-filters-addresses');
    await page.waitForTimeout(300);

    const isOnlyChecked = await page.isChecked(chkOnlyExcluded);
    const isWithChecked = await page.isChecked(chkWithExcluded);
    if (isOnlyChecked || isWithChecked) {
      throw new Error('Reset filters failed to uncheck the checkbox filters!');
    }

    const resetTotals = await page.innerText('#addresses-totals');
    if (resetTotals !== totalInitialText) {
      throw new Error(`Reset filters did not restore totals: expected "${totalInitialText}", got "${resetTotals}"`);
    }
    console.log('   ✅ Reset filters successfully unchecked checkboxes and restored table!');

    // 4. Test Translations
    console.log(' - Testing Norwegian translations of labels...');
    await page.selectOption('#language-select', 'nb');
    await page.waitForTimeout(200);

    const labelOnlyNb = await page.innerText('#filter-addresses-only-excluded-label');
    const labelWithNb = await page.innerText('#filter-addresses-with-excluded-label');
    console.log(`   - NB label 1: "${labelOnlyNb}"`);
    console.log(`   - NB label 2: "${labelWithNb}"`);

    if (labelOnlyNb !== 'Vis kun ekskluderte adresser' || labelWithNb !== 'Vis kun adresser med ekskluderte husstander') {
      throw new Error(`Unexpected Norwegian labels: "${labelOnlyNb}", "${labelWithNb}"`);
    }

    console.log('======================================================');
    console.log('🎉 ALL EXCLUDED CHECKBOX FILTER TESTS PASSED!');
    console.log('======================================================');

  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
