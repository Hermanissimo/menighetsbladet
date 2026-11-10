const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..', '..');

console.log('=== STANDALONE PACKAGE & USER GUIDE PARITY AUDIT ===');

function getHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

const filePairs = [
  { from: 'web/index.html', to: 'standalonePS/web/index.html' },
  { from: 'web/styles.css', to: 'standalonePS/web/styles.css' },
  { from: 'web/src/report_styles.css', to: 'standalonePS/web/src/report_styles.css' },
  { from: 'web/dist/app.bundle.js', to: 'standalonePS/web/dist/app.bundle.js' },
  { from: 'web/dist/app.bundle.js.map', to: 'standalonePS/web/dist/app.bundle.js.map' },
  { from: 'data/source.json', to: 'standalonePS/data/source.json' }
];

let errors = [];

// 1. Check mirrored assets and data
filePairs.forEach(({ from, to }) => {
  const srcPath = path.join(rootDir, from);
  const dstPath = path.join(rootDir, to);

  const srcHash = getHash(srcPath);
  const dstHash = getHash(dstPath);

  if (!srcHash) {
    errors.push(`Source file does not exist: ${from}`);
  } else if (!dstHash) {
    errors.push(`Standalone mirrored file missing: ${to}`);
  } else if (srcHash !== dstHash) {
    errors.push(`Hash mismatch between ${from} and ${to}! Did you forget to run "npm run build"?`);
  } else {
    console.log(`  ✓ Parity verified: ${from} === ${to}`);
  }
});

// 2. Check User Guides across all 4 locations
const userGuideFiles = ['README_USER.md', 'README_USER.en.md', 'README_USER.nb.md', 'README_USER.nn.md', 'README_USER.sv.md'];
userGuideFiles.forEach(file => {
  const rootPath = path.join(rootDir, file);
  const rootHash = getHash(rootPath);

  if (!rootHash) {
    errors.push(`Root User Guide file missing: ${file}`);
    return;
  }

  const targets = [
    path.join('web', file),
    path.join('standalonePS', file),
    path.join('standalonePS', 'web', file)
  ];

  targets.forEach(rel => {
    const targetPath = path.join(rootDir, rel);
    const targetHash = getHash(targetPath);
    if (!targetHash) {
      errors.push(`Synced user guide missing at: ${rel}`);
    } else if (targetHash !== rootHash) {
      errors.push(`User guide content mismatch at ${rel}!`);
    }
  });
  console.log(`  ✓ User Guide synced in all locations: ${file}`);
});

if (errors.length > 0) {
  console.error('\n❌ Standalone package synchronization failed:');
  errors.forEach(e => console.error('   - ' + e));
  console.error('\nRun "npm run build" to synchronize all files.\n');
  process.exit(1);
}

console.log('\n🎉 ALL STANDALONE ASSETS AND USER GUIDES ARE IN SYNC!\n');

