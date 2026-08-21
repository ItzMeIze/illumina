// Dashboard — home screen with GPA trend, financial snapshot, agent suggestions

function Dashboard({ go }) {
  return (
    <div className="app-surface">
      <div className="a-header">
        <div>
          <div className="greeting">Tuesday · Nov 18</div>
          <div className="title">Good afternoon, Maya</div>
        </div>
        <div className="a-avatar">MO</div>
      </div>

      <div className="scroll-y" style={{ paddingBottom: 12 }}>

        {/* Trajectory — new marquee, live-generated */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={() => go('trajectory')} className="sun-hero fade-in" style={{
            width: '100%', textAlign: 'left',
            borderRadius: 18, padding: 18, border: 0, cursor: 'pointer',
            boxShadow: 'var(--shadow-sun)', overflow: 'hidden',
            color: 'white',
            fontFamily: 'inherit',
          }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <AlluminoMark size={36} fill="white" style={{ flexShrink: 0, marginTop: 2 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div className="pulse-dot"/>
                  <span style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.88)', fontWeight: 600 }}>Your trajectory · live</span>
                </div>
                <div className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: 6, textWrap: 'pretty' }}>
                  Your path forward, mapped. <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>Closer than you think.</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span>Similar-interest peers</span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>parallel pathways</span>
                  <Icon.arrow style={{ marginLeft: 'auto' }}/>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Agent-detected alert — math drop */}
        <div style={{ padding: '10px 16px 0' }}>
          <button onClick={() => go('grades')} className="fade-in" style={{
            width: '100%', textAlign: 'left',
            background: 'var(--ink)', color: 'white',
            borderRadius: 18, padding: 16, border: 0, cursor: 'pointer',
            boxShadow: 'var(--shadow-lift)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(224,122,77,0.35), transparent 70%)',
            }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' }}>
              <div className="pulse-dot"/>
              <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Academic counselor</span>
            </div>
            <div className="serif" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 6, position: 'relative' }}>
              I noticed your <span style={{ color: 'var(--terra-2)' }}>MCR3U1 Functions</span> grade has dropped three units in a row. Want to look at it together?
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
              94 → 82 → 64 over six weeks <Icon.arrow style={{ color: 'var(--terra-2)' }}/>
            </div>
          </button>
        </div>

        {/* GPA + finance row */}
        <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={() => go('grades')} style={{
            padding: 14, background: 'var(--card)', borderRadius: 14,
            border: '1px solid var(--hairline)', textAlign: 'left', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Term GPA</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>
              3.61<span style={{ fontSize: 16, color: 'var(--ink-4)' }}>/4.0</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
              <Icon.trend_down/> 0.18 from last term
            </div>
          </button>
          <button onClick={() => go('finance')} style={{
            padding: 14, background: 'var(--card)', borderRadius: 14,
            border: '1px solid var(--hairline)', textAlign: 'left', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>This month</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>
              $182<span style={{ fontSize: 16, color: 'var(--ink-4)' }}>/450</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
              <Icon.trend_up style={{ transform: 'rotate(180deg)' }}/> $84 saved
            </div>
          </button>
        </div>

        {/* Mini grade sparkline */}
        <div style={{ padding: '10px 16px 0' }}>
          <MiniSpark go={go}/>
        </div>

        {/* Suggestions feed */}
        <SectionHead kicker="From your counselors" title="Suggested next steps" action="See all"/>

        <div style={{ padding: '4px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SuggestionRow
            agent="Academic"
            tone="terra"
            title="Talk to Ms. Lavoie about Functions"
            body="Office hours Wednesday 3:15. I can draft what to say."
            onClick={() => go('chat')}
          />
          <SuggestionRow
            agent="Career"
            tone="teal"
            title="Tailor your résumé for the Shopify summer role"
            body="Your wallet has 3 credentials that fit. I see 11 lines I'd rewrite."
            onClick={() => go('resume')}
          />
          <SuggestionRow
            agent="Financial"
            tone="ink"
            title="SaaS spending up 38% this month"
            body="Notion, Linear, Cursor, ChatGPT, GitHub. Want to pause any?"
            onClick={() => go('finance')}
          />
        </div>

        {/* Active job applications */}
        <SectionHead kicker="Career" title="Active applications"/>
        <div style={{ padding: '4px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { co: 'Shopify',  role: 'Summer intern · Frontend', stage: 'Résumé tailoring', step: 1, tone: 'pending' },
            { co: 'RBC',      role: 'Future Launch Scholar',   stage: 'Submitted',         step: 3, tone: 'verified' },
            { co: 'Let\'s Talk Science', role: 'Outreach volunteer', stage: 'Drafting essay', step: 2, tone: 'pending' },
          ].map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, background: 'var(--card)', borderRadius: 14,
              border: '1px solid var(--hairline)',
            }}>
              <Glyph bg={i === 0 ? '#1F5C3D' : i === 1 ? '#003A6B' : 'var(--terra)'}>{a.co[0]}</Glyph>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.co}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{a.role}</div>
              </div>
              <Pill tone={a.tone}>{a.stage}</Pill>
            </div>
          ))}
        </div>

        <div style={{ height: 24 }}/>
      </div>
    </div>
  );
}

// Mini sparkline
function MiniSpark({ go }) {
  // points 0..5 — Functions grade trend
  const pts = [94, 91, 87, 82, 74, 64];
  const max = 100, min = 50;
  const w = 320, h = 70;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(p => h - ((p - min) / (max - min)) * h);
  const path = pts.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <button onClick={() => go('grades')} style={{
      width: '100%', padding: 14, background: 'var(--card)', borderRadius: 14,
      border: '1px solid var(--hairline)', textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>MCR3U1 · Functions</div>
        <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
          64<span style={{ fontSize: 14, color: 'var(--ink-4)' }}>%</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--terra)', marginTop: 2 }}>30 pts in 6 weeks</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="160" height="56" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="ms" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C85A2E" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#C85A2E" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ms)"/>
        <path d={path} fill="none" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p, i) => (
          <circle key={i} cx={xs[i]} cy={ys[i]} r={i === pts.length - 1 ? 3 : 1.8}
                  fill={i === pts.length - 1 ? 'var(--terra)' : 'white'}
                  stroke="var(--terra)" strokeWidth="1.5"/>
        ))}
      </svg>
    </button>
  );
}

function SuggestionRow({ agent, tone, title, body, onClick }) {
  const dotColor = tone === 'terra' ? 'var(--terra)' : tone === 'teal' ? 'var(--teal)' : 'var(--ink)';
  return (
    <button onClick={onClick} style={{
      display: 'block', width: '100%', textAlign: 'left',
      background: 'var(--card)', borderRadius: 14, padding: 14,
      border: '1px solid var(--hairline)', cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor }}/>
        <span style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{agent} counselor</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35, marginBottom: 4, textWrap: 'pretty' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.4 }}>{body}</div>
    </button>
  );
}

Object.assign(window, { Dashboard });
