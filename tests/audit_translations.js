const fs = require('fs');
const path = require('path');

const i18nContent = fs.readFileSync(path.join(__dirname, '..', 'web', 'src', 'i18n.js'), 'utf8');
const fn = new Function(i18nContent.replace(/export\s+(const|let|var|function)/g, '$1') + '; return I18N;');
const I18N = fn();
const langs = Object.keys(I18N);

const srcDir = path.join(__dirname, '..', 'web', 'src');
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

console.log('Total unique t() keys found:', usedKeys.size);

const missing = {};
langs.forEach(lang => {
  missing[lang] = [];
  usedKeys.forEach(key => {
    if (!I18N[lang] || !(key in I18N[lang])) {
      missing[lang].push(key);
    }
  });
});

console.log('Missing translation keys:', JSON.stringify(missing, null, 2));

// Also check index.html for static texts without translation bindings
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'web', 'index.html'), 'utf8');
const mainJs = fs.readFileSync(path.join(srcDir, 'main.js'), 'utf8');

// Find all element IDs in index.html
const idRegex = /id="([a-zA-Z0-9_-]+)"/g;
let idMatch;
const allIds = [];
while ((idMatch = idRegex.exec(indexHtml)) !== null) {
  allIds.push(idMatch[1]);
}

// Find IDs referenced in setText or setHtml in main.js
const translatedIds = [];
const setRegex = /set(?:Text|Html)\(\s*["']([a-zA-Z0-9_-]+)["']/g;
let setMatch;
while ((setMatch = setRegex.exec(mainJs)) !== null) {
  translatedIds.push(setMatch[1]);
}

console.log('Index.html buttons:');
const btnRegex = /<button[^>]*id="([a-zA-Z0-9_-]+)"[^>]*>([^<]+)<\/button>/g;
let bMatch;
while ((bMatch = btnRegex.exec(indexHtml)) !== null) {
  const bId = bMatch[1];
  const bText = bMatch[2].trim();
  const isTranslated = translatedIds.includes(bId);
  console.log(`- id="${bId}": "${bText}" -> ${isTranslated ? 'BOUND in main.js' : 'NOT BOUND in main.js'}`);
}
