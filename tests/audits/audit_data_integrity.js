const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const sourceFile = path.join(rootDir, 'data', 'source.json');

console.log('=== DATA INTEGRITY & CANONICAL SCHEMA AUDIT ===');
console.log(`Checking dataset: ${sourceFile}`);

if (!fs.existsSync(sourceFile)) {
  console.error(`❌ ERROR: source.json not found at ${sourceFile}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
} catch (e) {
  console.error('❌ ERROR: Failed to parse data/source.json as valid JSON:', e.message);
  process.exit(1);
}

const errors = [];
const warnings = [];

// 1. Required Collections
['addresses', 'distributors', 'drivers', 'routes'].forEach(col => {
  if (!Array.isArray(data[col])) {
    errors.push(`Missing or invalid collection: "${col}" is not an array.`);
  }
});

if (errors.length > 0) {
  console.error('Fatal collection errors:', errors);
  process.exit(1);
}

const addresses = data.addresses;
const distributors = data.distributors;
const drivers = data.drivers;
const routes = data.routes;

console.log(`Found: ${addresses.length} addresses, ${distributors.length} distributors, ${drivers.length} drivers, ${routes.length} routes.`);

// Helper for route normalization matching calculations.js
function normalizeRoute(raw) {
  let val = String(raw || '').trim();
  if (!val) return '';
  val = val.replace(/\s+/g, ' ').replace(/\s*\(\s*/g, '(').replace(/\s*\)\s*/g, ')');
  const m = val.match(/^([a-z]+)\s*(\d+)(.*)$/i);
  if (!m) return val.toUpperCase();
  return (m[1].toUpperCase() + ' ' + m[2] + (m[3] || '').replace(/\s+/g, '').toLowerCase());
}

// 2. Uniqueness Checks
const routeIdSet = new Set();
routes.forEach((r, idx) => {
  const normId = normalizeRoute(r.routeId);
  if (!normId) {
    errors.push(`Route at index ${idx} has empty routeId.`);
  } else if (routeIdSet.has(normId)) {
    errors.push(`Duplicate routeId found: "${normId}" (index ${idx}).`);
  } else {
    routeIdSet.add(normId);
  }
});

const distNameSet = new Set();
distributors.forEach((d, idx) => {
  const name = String(d.name || '').trim();
  if (!name) {
    errors.push(`Distributor at index ${idx} has empty name.`);
  } else if (distNameSet.has(name.toLowerCase())) {
    errors.push(`Duplicate distributor name found: "${name}" (index ${idx}).`);
  } else {
    distNameSet.add(name.toLowerCase());
  }
});

const driverNameSet = new Set();
drivers.forEach((d, idx) => {
  const name = String(d.name || d.driverName || '').trim();
  if (!name) {
    errors.push(`Driver at index ${idx} has empty name.`);
  } else if (driverNameSet.has(name.toLowerCase())) {
    errors.push(`Duplicate driver name found: "${name}" (index ${idx}).`);
  } else {
    driverNameSet.add(name.toLowerCase());
  }
});

// 3. Legacy Keys & Data Sanity on Addresses
const legacyKeys = ['status', 'street', 'houseNo', 'extraPapers', 'distributor', 'driverName'];
let legacyKeyHits = 0;

addresses.forEach((addr, idx) => {
  legacyKeys.forEach(k => {
    if (k in addr) {
      legacyKeyHits++;
      if (legacyKeyHits <= 5) {
        errors.push(`Address #${idx} ("${addr.address}") contains legacy key "${k}".`);
      }
    }
  });

  const normRoute = normalizeRoute(addr.route);
  if (normRoute && !routeIdSet.has(normRoute)) {
    errors.push(`Address #${idx} ("${addr.address}") references non-existent route: "${addr.route}" (normalized: "${normRoute}").`);
  }

  const hh = Number(addr.numberOfHouseholds);
  const ex = Number(addr.numberOfExcludedHouseholds);
  if (Number.isNaN(hh) || hh < 1) {
    errors.push(`Address #${idx} ("${addr.address}") has invalid numberOfHouseholds: ${addr.numberOfHouseholds}`);
  }
  if (Number.isNaN(ex) || ex < 0) {
    errors.push(`Address #${idx} ("${addr.address}") has negative numberOfExcludedHouseholds: ${addr.numberOfExcludedHouseholds}`);
  }
  if (ex > hh) {
    errors.push(`Address #${idx} ("${addr.address}") has numberOfExcludedHouseholds (${ex}) > numberOfHouseholds (${hh}).`);
  }

  if (addr.lat != null || addr.lon != null) {
    const lat = Number(addr.lat);
    const lon = Number(addr.lon);
    if (Number.isNaN(lat) || lat < 57 || lat > 72) {
      warnings.push(`Address #${idx} ("${addr.address}") latitude (${addr.lat}) is outside standard Norway bounds (57-72).`);
    }
    if (Number.isNaN(lon) || lon < 4 || lon > 32) {
      warnings.push(`Address #${idx} ("${addr.address}") longitude (${addr.lon}) is outside standard Norway bounds (4-32).`);
    }
  }
});

// 4. Distributor Route References
distributors.forEach((dist) => {
  const distRoutes = Array.isArray(dist.routes) ? dist.routes : (dist.routes ? [dist.routes] : []);
  distRoutes.forEach(r => {
    const norm = normalizeRoute(r);
    if (norm && !routeIdSet.has(norm)) {
      errors.push(`Distributor "${dist.name}" references non-existent route "${r}" (normalized: "${norm}").`);
    }
  });
});

console.log('\n--- Audit Results ---');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} warning(s):`);
  warnings.slice(0, 5).forEach(w => console.log('   - ' + w));
  if (warnings.length > 5) console.log(`   ... and ${warnings.length - 5} more.`);
}

if (errors.length > 0) {
  console.error(`❌ ${errors.length} integrity error(s) detected:`);
  errors.slice(0, 20).forEach(e => console.error('   - ' + e));
  if (errors.length > 20) console.error(`   ... and ${errors.length - 20} more errors.`);
  process.exit(1);
}

console.log('✅ ZERO legacy keys found.');
console.log('✅ All routes and personnel references are coherent.');
console.log('✅ All addresses pass household and route sanity checks.');
console.log('🎉 CANONICAL DATASET INTEGRITY VERIFIED!\n');

