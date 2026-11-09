const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('--- 1. Building web bundle via esbuild ---');
execSync('npx esbuild web/src/main.js --bundle --outfile=web/dist/app.bundle.js --sourcemap', {
  cwd: rootDir,
  stdio: 'inherit'
});

console.log('\n--- 2. Synchronizing User Guides across web/ and standalonePS/ ---');
const userGuideFiles = ['README_USER.md', 'README_USER.en.md', 'README_USER.nb.md', 'README_USER.nn.md', 'README_USER.sv.md'];
userGuideFiles.forEach(file => {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    // Sync to web/
    fs.copyFileSync(src, path.join(rootDir, 'web', file));
    // Sync to standalonePS/
    fs.copyFileSync(src, path.join(rootDir, 'standalonePS', file));
    // Sync to standalonePS/web/
    fs.copyFileSync(src, path.join(rootDir, 'standalonePS', 'web', file));
    console.log(`  ✓ Synced ${file}`);
  }
});

console.log('\n--- 3. Synchronizing assets to standalonePS/web/ ---');
const assetsToSync = [
  { from: 'web/index.html', to: 'standalonePS/web/index.html' },
  { from: 'web/styles.css', to: 'standalonePS/web/styles.css' },
  { from: 'web/src/report_styles.css', to: 'standalonePS/web/src/report_styles.css' },
  { from: 'web/dist/app.bundle.js', to: 'standalonePS/web/dist/app.bundle.js' },
  { from: 'web/dist/app.bundle.js.map', to: 'standalonePS/web/dist/app.bundle.js.map' }
];

assetsToSync.forEach(({ from, to }) => {
  const src = path.join(rootDir, from);
  const dst = path.join(rootDir, to);
  const dstDir = path.dirname(dst);
  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir, { recursive: true });
  }
  fs.copyFileSync(src, dst);
  console.log(`  ✓ Synced ${from} -> ${to}`);
});

console.log('\n--- 4. Synchronizing canonical dataset to standalonePS/data/source.json ---');
const canonicalData = path.join(rootDir, 'data', 'source.json');
const standaloneData = path.join(rootDir, 'standalonePS', 'data', 'source.json');
if (fs.existsSync(canonicalData)) {
  fs.copyFileSync(canonicalData, standaloneData);
  console.log('  ✓ Synced data/source.json -> standalonePS/data/source.json');
}

console.log('\n✅ Build & standalone package synchronization completed successfully!\n');
