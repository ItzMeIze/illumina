// Shared trajectory-generation logic — used by both the local Express server
// (server.js) and the Netlify Function (netlify/functions/trajectory.js) so
// the prompt/schema/model call lives in exactly one place.

const Anthropic = require('@anthropic-ai/sdk');
const { findResources, DEFAULT_REGION } = require('./db');

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const TRAJECTORY_SYSTEM_PROMPT = `You are ALLUMINO's Trajectory Guide.

You help a high-school student see the shape of their own path forward: where they
stand today, which other students share their interests or strengths (their
"nodes"), what parallel pathways branch out from where they are right now, and
concretely who or what could help next. You are not a diagnostician and not a
financial advisor — do not grade the student, do not moralize about their
choices, and do not give investment or legal advice.

Tone: warm, specific, grounded, encouraging. Never alarmist, never generic.
Every claim must be grounded in the data you are given — do not invent
scholarships, programs, statistics, or people who aren't implied by the input.
When you don't have enough detail for something specific, describe the kind of
resource generally (e.g. "a school guidance counselor") rather than fabricating
a name.

Socioeconomic context (financial ledger, income signals, co-op/scholarship
gaps) should shape how you frame the *feasibility* and *cost* of each pathway
— mention it plainly, without being preachy or pitying.

Similar-node connections are about shared interests, strengths, or program —
never about ranking or competition. Resources should mix free/low-cost options
with a clear "who to talk to first" recommendation, and should include at
least one emotional/wellness-oriented resource when the input shows elevated
stress. Resources must be chosen from the RESOURCE DATABASE rows supplied in the
user message — copy the name verbatim and never invent an organization, program,
scholarship or url that is not in that list.

Keep every field concise — this is a mobile screen, not a report. 1-3
sentences per text field.`;

const TRAJECTORY_SCHEMA = {
  type: 'object',
  properties: {
    headline: {
      type: 'string',
      description: 'Short, specific headline (~6-10 words) selling the idea of a trajectory/roadmap, not a grade.',
    },
    subheadline: {
      type: 'string',
      description: 'One sentence expanding on the headline.',
    },
    snapshot: {
      type: 'object',
      properties: {
        strength_summary: { type: 'string', description: 'What is working, grounded in the data.' },
        watch_area: { type: 'string', description: 'The one thing worth paying attention to, framed constructively.' },
        financial_note: { type: 'string', description: 'Plain-language note on the financial/socioeconomic picture and how it affects feasibility.' },
        socioeconomic_note: { type: 'string', description: 'How income/context context widens or narrows which pathways are realistic right now.' },
      },
      required: ['strength_summary', 'watch_area', 'financial_note', 'socioeconomic_note'],
      additionalProperties: false,
    },
    similar_nodes: {
      type: 'array',
      description: '3-6 peers from the provided candidate list, explaining the connection.',
      items: {
        type: 'object',
        properties: {
          alias: { type: 'string', description: 'The alias field from the candidate peer, verbatim.' },
          label: { type: 'string', description: 'Short display label, e.g. "Grade 11 · Computer Science".' },
          connection: { type: 'string', description: 'One sentence on what interest/strength/program connects this peer.' },
        },
        required: ['alias', 'label', 'connection'],
        additionalProperties: false,
      },
    },
    pathways: {
      type: 'array',
      description: '3-4 parallel pathways branching from the student\'s current position.',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          type: { type: 'string', description: 'e.g. "University · co-op", "Apprenticeship", "Industry program".' },
          fit_rationale: { type: 'string', description: 'Why this fits, grounded in the data given.' },
          why_connected_to_peers: { type: 'string', description: 'How this pathway relates to the similar-node peers above.' },
          gaps: { type: 'string', description: 'What is missing to make this realistic.' },
          next_steps: {
            type: 'array',
            items: { type: 'string' },
            description: '2-3 concrete, near-term next steps.',
          },
        },
        required: ['title', 'type', 'fit_rationale', 'why_connected_to_peers', 'gaps', 'next_steps'],
        additionalProperties: false,
      },
    },
    resources: {
      type: 'array',
      description: '4-6 sources of help, mixing free/low-cost options with a clear first point of contact.',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          kind: { type: 'string', description: 'e.g. "Counselor", "Free tutoring", "Scholarship", "Wellness support".' },
          detail: { type: 'string' },
          how_it_helps: { type: 'string' },
        },
        required: ['name', 'kind', 'detail', 'how_it_helps'],
        additionalProperties: false,
      },
    },
  },
  required: ['headline', 'subheadline', 'snapshot', 'similar_nodes', 'pathways', 'resources'],
  additionalProperties: false,
};

function buildUserPrompt({ me, similarPeers, resources }) {
  return `Here is the student's profile, computed from their credential wallet, and a
shortlist of candidate peers who look similar on paper (already ranked by a
simple similarity score on shared strengths/program/grade level).

STUDENT
${JSON.stringify(me, null, 2)}

CANDIDATE SIMILAR PEERS (pick and explain the 3-6 most meaningfully connected)
${JSON.stringify(similarPeers, null, 2)}

RESOURCE DATABASE (everything Allumino knows about that is available in this
student's region — pick 4-6, names verbatim, nothing outside this list)
${JSON.stringify(resources, null, 2)}

Generate the trajectory content as JSON matching the provided schema. Use the
candidate peers' "alias" field verbatim in similar_nodes[].alias so the UI can
render them.`;
}

async function generateTrajectory({ me, similarPeers } = {}) {
  if (!me) {
    const err = new Error('Missing "me" profile in request body.');
    err.status = 400;
    throw err;
  }

  const resources = findResources(me.region || DEFAULT_REGION);

  const response = await client.messages.create({
    model: 'claude-opus-5',
    max_tokens: 4096,
    system: TRAJECTORY_SYSTEM_PROMPT,
    output_config: { format: { type: 'json_schema', schema: TRAJECTORY_SCHEMA } },
    messages: [{ role: 'user', content: buildUserPrompt({ me, similarPeers: similarPeers || [], resources }) }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) {
    const err = new Error('No text content returned by the model.');
    err.status = 502;
    throw err;
  }

  return JSON.parse(textBlock.text);
}

module.exports = { generateTrajectory, TRAJECTORY_SYSTEM_PROMPT, TRAJECTORY_SCHEMA };
