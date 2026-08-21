// Netlify Function — production home of POST /api/trajectory (redirected via
// netlify.toml). Thin HTTP wrapper around the shared lib/trajectory.js logic.

const { generateTrajectory } = require('../../lib/trajectory');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const data = await generateTrajectory(payload);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('[trajectory] error:', err);
    return {
      statusCode: err.status || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Failed to generate trajectory.' }),
    };
  }
};
