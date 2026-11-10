const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const e2eDir = path.join(__dirname, 'e2e');
const specFiles = fs.readdirSync(e2eDir).filter(f => f.endsWith('.spec.js'));

console.log(`\n========================================`);
console.log(` Running ${specFiles.length} Playwright E2E Test Specs`);
console.log(`========================================\n`);

let failed = false;

for (const file of specFiles) {
  const filePath = path.join('tests', 'e2e', file);
  console.log(`▶ Running ${filePath}...`);
  try {
    execSync(`node ${filePath}`, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log(`✔ Passed ${filePath}\n`);
  } catch (err) {
    console.error(`✖ Failed ${filePath}\n`);
    failed = true;
    break;
  }
}

if (failed) {
  console.error('❌ One or more E2E specs failed!');
  process.exit(1);
} else {
  console.log('🎉 ALL PLAYWRIGHT E2E SPECS PASSED SUCCESSFULLY!\n');
}

