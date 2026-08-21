// Central resource database — the one place that knows what help exists where.
//
// Regions are slash paths (COUNTRY/STATE-OR-PROVINCE/METRO), most specific last.
// A student's region matches a record's region if the record's path is a prefix
// of theirs, so a Toronto student sees CA/ON/Toronto + CA/ON + CA + online, and
// a Brooklyn student sees US/NY/New York City + US + online. Opening a new
// market means adding rows to data/resources.json — no code changes.

const db = require('../data/resources.json');

const DEFAULT_REGION = 'CA/ON/Toronto';

function covers(recordRegion, studentRegion) {
  if (!recordRegion) return true; // online / open to anyone
  return studentRegion === recordRegion || studentRegion.startsWith(recordRegion + '/');
}

// Number of path segments — used to rank local results above national ones.
function specificity(region) {
  return region ? region.split('/').length : 0;
}

function findResources(region = DEFAULT_REGION, { kinds, tags, limit = 24 } = {}) {
  const kindSet = kinds && new Set(kinds.map((k) => k.toLowerCase()));
  const tagSet = tags && new Set(tags.map((t) => t.toLowerCase()));

  return db.resources
    .filter((r) => covers(r.region, region))
    .filter((r) => !kindSet || kindSet.has(r.kind.toLowerCase()))
    .filter((r) => !tagSet || (r.tags || []).some((t) => tagSet.has(t.toLowerCase())))
    .sort((a, b) => specificity(b.region) - specificity(a.region))
    .slice(0, limit);
}

// Which markets are live, and how deep each one is — the coverage view.
function regions() {
  return db.regions.map((r) => ({
    ...r,
    count: db.resources.filter((x) => x.region === r.path).length,
  }));
}

module.exports = { findResources, regions, DEFAULT_REGION };
