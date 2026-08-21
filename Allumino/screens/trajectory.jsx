// Trajectory — the front-page marquee experience. Takes the student's basic
// info + socioeconomic context, connects it to similar-interest peers ("nodes"),
// and asks Claude to generate parallel pathways + sources of help.
// This is the only screen wired to a real backend (POST /api/trajectory),
// which calls the Claude API server-side.

const COURSE_INTEREST_MAP = [
  [/^ICS/, 'Computer Science'],
  [/^(MCV|MHF|MCR|MDM|MPM)/, 'Math'],
  [/^(SPH|SCH|SBI|SNC)/, 'Science'],
  [/^ENG/, 'English / Writing'],
  [/^(CHC|CHW|CHV)/, 'History & Civics'],
  [/^(AVI|ADA)/, 'Arts'],
  [/^(FSF)/, 'French'],
  [/^GPP/, 'Leadership'],
];

function initialsFromName(name) {
  if (!name) return null;
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function courseToInterest(code) {
  const hit = COURSE_INTEREST_MAP.find(([re]) => re.test(code));
  return hit ? hit[1] : null;
}

function buildMeProfile(wallet) {
  const owner = wallet.owner;
  const academic = wallet.academic_credentials;
  const gpa = academic.gpa_velocity;
  const diag = academic.diagnostic_summary;
  const fin = wallet.financial_ledger;
  const wellness = wallet.mental_health_and_wellness;
  const prof = wallet.professional_credentials;

  const strengthInterests = (diag.strength_courses || [])
    .map(courseToInterest)
    .filter(Boolean);
  const projectStacks = (prof.projects || []).flatMap(p => p.stack || []);
  const strengths = Array.from(new Set([...strengthInterests, ...projectStacks]));

  return {
    name: owner.full_name,
    alias: owner.alias,
    region: owner.region || 'CA/ON/Toronto', // drives the central resource DB lookup
    grade_level: owner.grade_level,
    program: academic.program,
    school: academic.institution,
    strengths,
    at_risk_courses: diag.at_risk_courses || [],
    gpa_trend: {
      current_avg: gpa.grade_12_s1_avg,
      trend: gpa.trend,
      trajectory_label: gpa.trajectory_label,
      scholarship_threshold: gpa.scholarship_threshold,
      gap_to_threshold: gpa.gap_to_threshold,
    },
    extracurriculars: owner.extracurriculars || [],
    projects: (prof.projects || []).map(p => ({ name: p.name, stack: p.stack })),
    financial: {
      resp_balance: (fin.assets || []).find(a => a.type === 'RESP')?.balance ?? null,
      monthly_net_savings: fin.budget?.monthly_net_savings ?? null,
      projected_tuition: fin.projected_tuition,
    },
    wellness: {
      stress_level: wellness.self_reported_stress_level,
      triggers: wellness.stress_triggers || [],
      supports_in_place: wellness.supports_in_place || [],
    },
  };
}

function scorePeer(me, peer) {
  let score = 0;
  const reasons = [];
  const myStrengths = new Set(me.strengths.map(s => s.toLowerCase()));
  const overlap = (peer.strengths || []).filter(s => myStrengths.has(s.toLowerCase()));
  if (overlap.length) { score += overlap.length * 2; reasons.push(`shares ${overlap.join(', ')}`); }
  if (peer.program === me.program) { score += 3; reasons.push(`same program (${peer.program})`); }
  const gradeGap = Math.abs(peer.grade_level - me.grade_level);
  score += Math.max(0, 2 - gradeGap);
  if (gradeGap === 0) reasons.push('same grade');
  return { ...peer, score, reason: reasons.join(' · ') || 'nearby profile' };
}

function buildCandidatePeers(wallet, me) {
  return (wallet.student_dataset || [])
    .map(p => scorePeer(me, p))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(p => ({
      alias: p.alias,
      full_name: p.full_name,
      grade_level: p.grade_level,
      program: p.program,
      strengths: p.strengths,
      flags: p.flags,
      reason: p.reason,
    }));
}

const FALLBACK_NOTE = 'Preview content — connect an ANTHROPIC_API_KEY on the server for a live, generated trajectory.';

function fallbackTrajectory(me, peers) {
  return {
    headline: `${(me.name || 'Your').split(' ')[0]}'s trajectory has more than one good ending.`,
    subheadline: 'Four ways forward, built from your transcript, your context, and who else is figuring out something similar.',
    snapshot: {
      strength_summary: `Strong in ${me.strengths.slice(0, 2).join(' and ') || 'your core subjects'}, with real shipped work behind it.`,
      watch_area: me.at_risk_courses.length ? `${me.at_risk_courses.join(', ')} is worth a closer look this term.` : 'Nothing urgent — keep the momentum going.',
      financial_note: me.financial.projected_tuition ? `Tuition + living runs about $${(me.financial.projected_tuition.total_annual_cost || 0).toLocaleString()}/yr; a co-op or scholarship changes that math.` : 'Financial picture not available.',
      socioeconomic_note: 'Your income context unlocks specific scholarships and grants worth checking before you rule anything out on cost.',
    },
    similar_nodes: peers.slice(0, 5).map(p => ({ alias: p.alias, label: `Grade ${p.grade_level} · ${p.program}`, connection: p.reason })),
    pathways: [
      {
        title: 'Direct entry program', type: 'University · co-op', fit_rationale: 'Your strongest subjects line up with the program requirements.',
        why_connected_to_peers: 'Several similar peers are already on this track.', gaps: 'One or two prerequisite grades to firm up.',
        next_steps: ['Talk to a counselor about the requirements', 'Shortlist 2-3 programs'],
      },
      {
        title: 'Local college + portfolio path', type: 'Hybrid degree', fit_rationale: 'Lower cost, closer to home, portfolio-driven admission.',
        why_connected_to_peers: 'Peers with creative/technical overlap have used this route.', gaps: 'Needs a small portfolio.',
        next_steps: ['Book an open house', 'Start a portfolio folder'],
      },
      {
        title: 'Paid co-op / industry track', type: 'Industry program', fit_rationale: 'Your project history reads as ready for applied work.',
        why_connected_to_peers: 'This is the path several project-strong peers are pursuing.', gaps: 'Needs a clean, simple resume.',
        next_steps: ['Apply to one co-op posting this month'],
      },
    ],
    resources: [
      { name: 'School guidance counselor', kind: 'Counselor', detail: 'Your first stop for anything on this screen.', how_it_helps: 'Can validate program requirements and help with applications.' },
      { name: 'Free peer tutoring', kind: 'Free tutoring', detail: 'Ask your school if a peer-tutoring block exists for your weak spot.', how_it_helps: 'Closes small gaps fast, at no cost.' },
      { name: 'Wellness check-in', kind: 'Wellness support', detail: 'Use the supports you already have in place — don’t wait for a crisis.', how_it_helps: 'Keeps stress from compounding into the academic dip.' },
    ],
  };
}

function Trajectory({ go }) {
  const [me, setMe] = React.useState(null);
  const [peers, setPeers] = React.useState([]);
  const [trajectory, setTrajectory] = React.useState(null);
  const [status, setStatus] = React.useState('loading'); // loading | ready | error
  const [errorMsg, setErrorMsg] = React.useState('');
  const [pathFocus, setPathFocus] = React.useState(0);
  const [selectedNode, setSelectedNode] = React.useState(null);

  const generate = React.useCallback(async (meProfile, peerList) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/trajectory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ me: meProfile, similarPeers: peerList }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server responded ${res.status}`);
      }
      const data = await res.json();
      setTrajectory(data);
      setStatus('ready');
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
      setTrajectory(fallbackTrajectory(meProfile, peerList));
      setStatus('error');
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    fetch('data/wallet.json')
      .then(r => r.json())
      .then(wallet => {
        if (cancelled) return;
        const meProfile = buildMeProfile(wallet);
        const peerList = buildCandidatePeers(wallet, meProfile);
        setMe(meProfile);
        setPeers(peerList);
        generate(meProfile, peerList);
      })
      .catch(err => {
        if (cancelled) return;
        setErrorMsg('Could not load wallet data: ' + err.message);
        setStatus('error');
      });
    return () => { cancelled = true; };
  }, [generate]);

  const nodePeers = (trajectory?.similar_nodes || []).slice(0, 6).map(n => {
    const match = peers.find(p => p.alias === n.alias);
    return { ...n, initials: initialsFromName(match?.full_name) || n.alias?.slice(-2) || '?' };
  });
  const nodePathways = trajectory?.pathways || [];

  return (
    <div className="app-surface">
      <div style={{
        padding: '52px 16px 12px', display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--bg-blur)', backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 5, borderBottom: '1px solid var(--hairline)',
      }}>
        <button onClick={() => go('home')} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--card)', border: '1px solid var(--hairline)',
          color: 'var(--ink-2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Trajectory · live</div>
          <div className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.025em' }}>Your roadmap</div>
        </div>
        <button
          onClick={() => me && generate(me, peers)}
          disabled={status === 'loading'}
          style={{
            padding: '7px 12px', borderRadius: 8, background: 'var(--ink)', color: 'white',
            border: 0, fontSize: 12, fontWeight: 500, cursor: status === 'loading' ? 'default' : 'pointer',
            opacity: status === 'loading' ? 0.6 : 1,
          }}>Regenerate</button>
      </div>

      <div className="scroll-y">
        {/* Hero */}
        <div className="sun-hero" style={{ padding: '32px 22px 28px', borderRadius: 0 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div className="pulse-dot"/>
              <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                {status === 'loading' ? 'Generating from your wallet…' : 'Built for ' + (me?.name || 'you')}
              </span>
            </div>
            <h1 className="display" style={{
              fontSize: 26, fontWeight: 600, color: 'white',
              letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0,
              textWrap: 'pretty', minHeight: 66,
            }}>
              {trajectory?.headline || 'Mapping where you could go next…'}
            </h1>
            <div style={{ marginTop: 14, fontSize: 13.5, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, textWrap: 'pretty' }}>
              {trajectory?.subheadline || 'Connecting your profile to similar interests and parallel pathways.'}
            </div>
          </div>
        </div>

        {status === 'error' && (
          <div style={{ margin: '12px 16px 0', padding: 12, background: 'var(--sun-bg)', color: 'var(--sun-deep)', borderRadius: 12, fontSize: 12.5, lineHeight: 1.5 }}>
            {errorMsg ? `${errorMsg} — ${FALLBACK_NOTE}` : FALLBACK_NOTE}
          </div>
        )}

        {/* Snapshot */}
        {trajectory && (
          <div style={{ padding: '18px 16px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--sun-deep)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Where you stand</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <SnapshotCard label="Strength" text={trajectory.snapshot.strength_summary} tone="up"/>
              <SnapshotCard label="Watch area" text={trajectory.snapshot.watch_area} tone="warn"/>
              <SnapshotCard label="Financial picture" text={trajectory.snapshot.financial_note} tone="flat"/>
              <SnapshotCard label="Context" text={trajectory.snapshot.socioeconomic_note} tone="flat"/>
            </div>
          </div>
        )}

        {/* Node graph */}
        <div style={{ padding: '22px 16px 0' }}>
          <div style={{ fontSize: 11, color: 'var(--sun-deep)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>How it connects</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 12 }}>
            You, in the middle. Peers with similar interests one ring out. Parallel pathways one ring further.
          </div>
          <TrajectoryGraph
            me={me}
            peers={nodePeers}
            pathways={nodePathways}
            selected={selectedNode}
            onSelect={setSelectedNode}
          />
          {selectedNode && (
            <NodeDetail node={selectedNode} onClose={() => setSelectedNode(null)}/>
          )}
        </div>

        {/* Pathways */}
        {nodePathways.length > 0 && (
          <div style={{ padding: '22px 16px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--sun-deep)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Parallel pathways</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {nodePathways.map((p, i) => (
                <PathwayNodeCard key={p.title} p={p} idx={i} open={pathFocus === i} onToggle={() => setPathFocus(pathFocus === i ? -1 : i)}/>
              ))}
            </div>
          </div>
        )}

        {/* Resources / help */}
        <div style={{ padding: '22px 16px 30px' }}>
          <div style={{ fontSize: 11, color: 'var(--sun-deep)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Possible sources for help</div>

          {me?.wellness?.supports_in_place?.length > 0 && (
            <div style={{ marginBottom: 12, padding: 12, background: 'var(--teal-bg)', borderRadius: 12, border: '1px solid rgba(31,74,74,0.16)' }}>
              <div style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Already in place</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {me.wellness.supports_in_place.map((s, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: 'var(--ink-2)', display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--teal)' }}>•</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(trajectory?.resources || []).map((r, i) => (
              <div key={i} style={{ padding: 12, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--hairline)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</div>
                  <Pill tone="neutral">{r.kind}</Pill>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 2 }}>{r.detail}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{r.how_it_helps}</div>
              </div>
            ))}
            {status === 'loading' && (
              <div style={{ fontSize: 12.5, color: 'var(--ink-4)', padding: 12 }}>Looking for resources that fit your context…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SnapshotCard({ label, text, tone }) {
  const color = tone === 'up' ? 'var(--green)' : tone === 'warn' ? 'var(--sun-deep)' : 'var(--ink-2)';
  return (
    <div style={{ padding: 12, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--hairline)' }}>
      <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12.5, color, lineHeight: 1.45, textWrap: 'pretty' }}>{text}</div>
    </div>
  );
}

// ─── Node graph (SVG) ──────────────────────────────────────────

function TrajectoryGraph({ me, peers, pathways, selected, onSelect }) {
  const size = 320;
  const cx = size / 2, cy = size / 2;
  const rPeers = 82;
  const rPaths = 142;

  const peerPos = peers.map((p, i) => {
    const angle = (i / Math.max(peers.length, 1)) * Math.PI * 2 - Math.PI / 2;
    return { ...p, x: cx + rPeers * Math.cos(angle), y: cy + rPeers * Math.sin(angle) };
  });
  const pathPos = pathways.map((p, i) => {
    const angle = (i / Math.max(pathways.length, 1)) * Math.PI * 2 - Math.PI / 2 + Math.PI / (pathways.length || 1);
    return { ...p, x: cx + rPaths * Math.cos(angle), y: cy + rPaths * Math.sin(angle) };
  });

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 8, display: 'flex', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* rings */}
        <circle cx={cx} cy={cy} r={rPeers} fill="none" stroke="var(--hairline)" strokeDasharray="3 5"/>
        <circle cx={cx} cy={cy} r={rPaths} fill="none" stroke="var(--hairline)" strokeDasharray="3 5"/>

        {/* spokes to peers */}
        {peerPos.map((p, i) => (
          <line key={'pl' + i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--teal)" strokeOpacity="0.35" strokeWidth="1.4"/>
        ))}
        {/* spokes to pathways */}
        {pathPos.map((p, i) => (
          <line key={'wl' + i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--sun-orange)" strokeOpacity="0.5" strokeWidth="1.8"/>
        ))}

        {/* center node */}
        <g>
          <circle cx={cx} cy={cy} r={26} fill="var(--sun-grad, var(--sun-orange))"/>
          <circle cx={cx} cy={cy} r={26} fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="var(--display-stack)">
            {(me?.name || 'You').split(' ')[0].slice(0, 8)}
          </text>
        </g>

        {/* peer nodes */}
        {peerPos.map((p, i) => (
          <g key={'pn' + i} style={{ cursor: 'pointer' }} onClick={() => onSelect({ kind: 'peer', ...p })}>
            <circle cx={p.x} cy={p.y} r={17} fill="var(--teal-bg)" stroke="var(--teal)" strokeWidth={selected?.alias === p.alias ? 2.5 : 1.2}/>
            <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--teal)" fontFamily="var(--display-stack)">
              {p.initials}
            </text>
          </g>
        ))}

        {/* pathway nodes */}
        {pathPos.map((p, i) => (
          <g key={'wn' + i} style={{ cursor: 'pointer' }} onClick={() => onSelect({ kind: 'pathway', ...p })}>
            <circle cx={p.x} cy={p.y} r={20} fill="var(--sun-bg)" stroke="var(--sun-deep)" strokeWidth={selected?.title === p.title ? 2.5 : 1.2}/>
            <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--sun-deep)" fontFamily="var(--display-stack)">
              {String(i + 1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function NodeDetail({ node, onClose }) {
  const isPeer = node.kind === 'peer';
  return (
    <div className="fade-in" style={{
      marginTop: 10, padding: 12, borderRadius: 12,
      background: isPeer ? 'var(--teal-bg)' : 'var(--sun-bg)',
      border: `1px solid ${isPeer ? 'rgba(31,74,74,0.18)' : 'rgba(240,138,0,0.22)'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: isPeer ? 'var(--teal)' : 'var(--sun-deep)' }}>
          {isPeer ? node.label : node.title}
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--ink-3)', fontSize: 12 }}>Close</button>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
        {isPeer ? node.connection : node.fit_rationale}
      </div>
    </div>
  );
}

function PathwayNodeCard({ p, idx, open, onToggle }) {
  return (
    <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--hairline)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
      <button onClick={onToggle} style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        background: 'transparent', border: 0, padding: '14px 14px 10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%', background: 'var(--sun-bg)', color: 'var(--sun-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flexShrink: 0,
          }}>{idx + 1}</div>
          <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>{p.type}</span>
        </div>
        <div className="display" style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25, textWrap: 'pretty' }}>{p.title}</div>
      </button>
      {open && (
        <div className="fade-in" style={{ padding: '0 14px 14px' }}>
          <FieldBlock label="Why it fits" text={p.fit_rationale}/>
          <FieldBlock label="Connects to" text={p.why_connected_to_peers}/>
          <FieldBlock label="Gaps to close" text={p.gaps}/>
          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Next steps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(p.next_steps || []).map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--ink-2)' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--sun-bg)', color: 'var(--sun-deep)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600 }}>{i + 1}</div>
                {n}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FieldBlock({ label, text }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5, textWrap: 'pretty' }}>{text}</div>
    </div>
  );
}

Object.assign(window, { Trajectory });
