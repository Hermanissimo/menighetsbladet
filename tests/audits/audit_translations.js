const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const i18nContent = fs.readFileSync(path.join(rootDir, 'web', 'src', 'i18n.js'), 'utf8');
const fn = new Function(i18nContent.replace(/export\s+(const|let|var|function)/g, '$1') + '; return I18N;');
const I18N = fn();
const langs = Object.keys(I18N);

const srcDir = path.join(rootDir, 'web', 'src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));
const usedKeys = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const regex = /\bt\(\s*["']([a-zA-Z0-9_-]+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    usedKeys.add(match[1]);
  }
});

console.log('=== TRANSLATION AUDIT ===');
console.log('Total unique t() translation keys used in source:', usedKeys.size);

const missing = {};
let hasMissing = false;

langs.forEach(lang => {
  missing[lang] = [];
  usedKeys.forEach(key => {
    if (!I18N[lang] || !(key in I18N[lang])) {
      missing[lang].push(key);
      hasMissing = true;
    }
  });
  if (missing[lang].length === 0) {
    console.log(`  ✓ Locale "${lang}": All ${usedKeys.size} keys present.`);
  } else {
    console.error(`  ❌ Locale "${lang}": Missing ${missing[lang].length} keys:`, missing[lang]);
  }
});

if (hasMissing) {
  console.error('\n❌ Missing translation keys detected!');
  process.exit(1);
}

console.log('🎉 ALL TRANSLATION KEYS EXIST ACROSS ALL LOCALES!\n');

