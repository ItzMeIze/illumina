// Self-check for the central resource database: node test_db.js
const assert = require('assert');
const { findResources, regions } = require('./lib/db');

const toronto = findResources('CA/ON/Toronto', { limit: 100 });
assert.ok(toronto.some((r) => r.id === 'hackergal'), 'local Toronto record');
assert.ok(toronto.some((r) => r.id === 'osap'), 'inherits Ontario');
assert.ok(toronto.some((r) => r.id === 'kids-help-phone'), 'inherits Canada');
assert.ok(toronto.some((r) => r.id === 'schoolhouse-world'), 'inherits online');
assert.ok(!toronto.some((r) => r.region.startsWith('US')), 'no US leakage into Toronto');

const nyc = findResources('US/NY/New York City', { limit: 100 });
assert.ok(nyc.some((r) => r.id === 'code-nation'), 'local NYC record');
assert.ok(nyc.some((r) => r.id === 'fafsa'), 'inherits US');
assert.ok(!nyc.some((r) => r.region.startsWith('CA/')), 'no Canadian leakage into NYC');

// Prefix matching must respect segment boundaries: CA (Canada) != US/CA (California).
assert.ok(!findResources('US/CA/Bay Area', { limit: 100 }).some((r) => r.region === 'CA'),
  'country CA must not match state US/CA');

// An unknown region still returns the online tier rather than nothing.
const unknown = findResources('US/TX/Austin', { limit: 100 });
assert.ok(unknown.length > 0 && unknown.every((r) => !r.region || r.region === 'US'));

assert.deepStrictEqual(findResources('CA/ON/Toronto', { kinds: ['Wellness support'] }).map((r) => r.id),
  ['kids-help-phone']);
assert.ok(findResources('CA/ON/Toronto', { tags: ['tutoring'] }).length >= 2);
assert.strictEqual(findResources('CA/ON/Toronto', { limit: 3 }).length, 3);
assert.ok(regions().find((r) => r.path === 'CA/ON/Toronto').count >= 5);

console.log('ok — db checks passed');
