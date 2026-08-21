// Allumino MVP server — local dev entry point.
// Serves the prototype UI (./Allumino) and proxies trajectory generation to
// the Claude API. The actual generation logic lives in lib/trajectory.js so
// it's shared with the Netlify Function used in production.

require('dotenv').config();

const path = require('path');
const express = require('express');
const { generateTrajectory } = require('./lib/trajectory');
const { findResources, regions, DEFAULT_REGION } = require('./lib/db');

const app = express();
app.use(express.json({ limit: '2mb' }));

app.post('/api/trajectory', async (req, res) => {
  try {
    const data = await generateTrajectory(req.body || {});
    res.json(data);
  } catch (err) {
    console.error('[trajectory] error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to generate trajectory.' });
  }
});

app.get('/api/resources', (req, res) => {
  const region = req.query.region || DEFAULT_REGION;
  res.json({
    region,
    coverage: regions(),
    resources: findResources(region, {
      kinds: req.query.kind ? String(req.query.kind).split(',') : undefined,
      tags: req.query.tag ? String(req.query.tag).split(',') : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    }),
  });
});

app.use(express.static(path.join(__dirname, 'Allumino')));

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Allumino running at http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('[warn] ANTHROPIC_API_KEY is not set — /api/trajectory will fail until it is.');
  }
});
