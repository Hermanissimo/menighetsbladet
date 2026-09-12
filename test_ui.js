const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = 'C:\\Users\\Herman\\.gemini\\antigravity-ide\\brain\\43519e89-31d8-4ed3-bcaa-424e1dbd4c20\\mobile_ui_tests';

(async () => {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test Portrait (Mobile)
  console.log('Testing Portrait (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:8080/web/index.html', { waitUntil: 'networkidle' });
  
  // Wait for initial load
  await page.waitForTimeout(1000);
  
  // Take screenshot of Dashboard (which might show Source missing modal)
  await page.screenshot({ path: path.join(OUT_DIR, 'portrait_01_dashboard.png'), fullPage: true });

  // If there's a modal, close it or dismiss it to continue clicking tabs
  const sourceMissingModal = await page.$('#source-missing-modal');
  if (sourceMissingModal && await sourceMissingModal.isVisible()) {
    console.log('Source missing modal visible, clicking Open Data Folder or closing...');
    await page.click('#open-data-folder'); 
    await page.waitForTimeout(500);
  }
  
  // Check settings panel
  await page.click('#settings-toggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'portrait_02_settings.png'), fullPage: true });
  await page.click('#settings-toggle'); // close
  await page.waitForTimeout(500);

  // Click Drivers tab
  await page.click('#tab-drivers');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'portrait_03_drivers.png'), fullPage: true });

  // Open Add Driver modal
  await page.click('#add-driver');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'portrait_04_add_driver_modal.png') });
  await page.click('#edit-modal-close');
  await page.waitForTimeout(500);

  // Click Routes tab
  await page.click('#tab-routes');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'portrait_05_routes.png'), fullPage: true });

  // Test Landscape
  console.log('Testing Landscape (844x390)...');
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(500);
  
  // Click Dashboard
  await page.click('#tab-dashboard');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'landscape_01_dashboard.png'), fullPage: true });

  // Click Addresses
  await page.click('#tab-addresses');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'landscape_02_addresses.png'), fullPage: true });

  await browser.close();
  console.log('UI Testing complete. Screenshots saved to ' + OUT_DIR);
})();
