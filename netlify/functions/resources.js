// Netlify Function — production home of GET /api/resources (redirected via
// netlify.toml). Thin HTTP wrapper around the shared lib/db.js lookup.

const { findResources, regions, DEFAULT_REGION } = require('../../lib/db');

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const region = q.region || DEFAULT_REGION;
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      region,
      coverage: regions(),
      resources: findResources(region, {
        kinds: q.kind ? q.kind.split(',') : undefined,
        tags: q.tag ? q.tag.split(',') : undefined,
        limit: q.limit ? Number(q.limit) : undefined,
      }),
    }),
  };
};
