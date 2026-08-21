// Desktop view — full Mac-style window dashboard for Allumino
// Wider, multi-column. Self-contained — does not depend on mobile screens.

function DesktopApp({ onPhone }) {
  const [section, setSection] = React.useState('home');

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: 'var(--bg)',
      fontFamily: 'Geist, system-ui, sans-serif',
      color: 'var(--ink)',
    }}>
      <DesktopSidebar section={section} setSection={setSection} onPhone={onPhone}/>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <DesktopTopbar section={section}/>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {section === 'home'    && <DesktopHome   go={setSection}/>}
          {section === 'wallet'  && <DesktopWallet/>}
          {section === 'chat'    && <DesktopChat/>}
          {section === 'money'   && <DesktopMoney/>}
          {section === 'career'  && <DesktopCareer/>}
          {section === 'profile' && <DesktopProfile onPhone={onPhone}/>}
        </div>
      </div>
    </div>
  );
}

// ───── Sidebar ──────────────────────────────────────────────

function DesktopSidebar({ section, setSection, onPhone }) {
  const main = [
    { id: 'home',   label: 'Today',         hint: '⌘1' },
    { id: 'wallet', label: 'Wallet',        hint: '⌘2', count: 6 },
    { id: 'chat',   label: 'Agents',        hint: '⌘3', dot: true },
    { id: 'money',  label: 'Money',         hint: '⌘4' },
    { id: 'career', label: 'Career',        hint: '⌘5' },
  ];
  return (
    <div style={{
      width: 230, flexShrink: 0, padding: '14px 12px 18px',
      background: 'var(--bg-tint)',
      borderRight: '1px solid var(--hairline)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      {/* Brand */}
      <div style={{ padding: '6px 8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlluminoMark size={22} fill="var(--sun-orange)"/>
        <span className="display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.025em' }}>allumino</span>
        <div style={{ flex: 1 }}/>
        <button style={{
          width: 22, height: 22, borderRadius: 6,
          background: 'rgba(26,26,26,0.06)', border: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink-3)',
        }}><Icon.plus/></button>
      </div>

      {/* Search-ish */}
      <div style={{
        margin: '0 4px 8px', padding: '7px 10px',
        borderRadius: 8, background: 'rgba(255,255,255,0.6)',
        border: '0.5px solid var(--hairline)',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, color: 'var(--ink-4)',
      }}>
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M8.5 8.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Search…
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ink-4)' }} className="mono">⌘K</span>
      </div>

      {/* Main nav */}
      <div style={{ padding: '0 2px' }}>
        {main.map(it => (
          <SBItem key={it.id} {...it} active={section === it.id} onClick={() => setSection(it.id)}/>
        ))}
      </div>

      {/* Agents header */}
      <div style={{ padding: '14px 10px 6px', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Counselors</div>
      <div style={{ padding: '0 2px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { glyph: 'Ac', name: 'Academic',  meta: '1 alert',  bg: 'var(--ink)' },
          { glyph: 'Ca', name: 'Career',    meta: '3 active', bg: 'var(--teal)' },
          { glyph: 'Fi', name: 'Financial', meta: 'On track', bg: 'var(--terra)' },
        ].map((a, i) => (
          <button key={i} onClick={() => setSection('chat')} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 10px', border: 0, background: 'transparent',
            borderRadius: 7, cursor: 'pointer', textAlign: 'left', width: '100%',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              background: a.bg, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fraunces, serif', fontSize: 10, fontWeight: 500,
              flexShrink: 0,
            }}>{a.glyph}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{a.name}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-4)' }}>{a.meta}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      {/* User chip + view toggle */}
      <button onClick={() => setSection('profile')} style={{
        margin: '0 2px', padding: '8px 10px',
        background: section === 'profile' ? 'rgba(26,26,26,0.06)' : 'transparent', border: 0, borderRadius: 8,
        display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'linear-gradient(135deg, #D9C5A7, #B89070)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 600,
        }}>MO</div>
        <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Maya Okonkwo</div>
          <div style={{ fontSize: 10, color: 'var(--ink-4)' }}>Grade 11 · ECI</div>
        </div>
      </button>

      <button onClick={onPhone} style={{
        margin: '6px 2px 0', padding: '8px 10px',
        background: 'rgba(26,26,26,0.05)', border: '0.5px solid var(--hairline)',
        borderRadius: 8, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11.5, color: 'var(--ink-2)',
      }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="2" width="6" height="12" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
          <circle cx="8" cy="12" r="0.6" fill="currentColor"/>
        </svg>
        Switch to phone
      </button>
    </div>
  );
}

function SBItem({ label, hint, count, dot, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 8,
      padding: '7px 10px', border: 0, borderRadius: 7,
      background: active ? 'rgba(26,26,26,0.08)' : 'transparent',
      cursor: 'pointer', textAlign: 'left',
      fontFamily: 'inherit',
      transition: 'background .12s',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: dot ? 'var(--terra)' : 'transparent',
        flexShrink: 0,
      }}/>
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: active ? 500 : 400, color: 'var(--ink)' }}>{label}</span>
      {count !== undefined && <span style={{ fontSize: 10, color: 'var(--ink-4)' }}>{count}</span>}
      <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>{hint}</span>
    </button>
  );
}

// ───── Topbar ──────────────────────────────────────────────

function DesktopTopbar({ section }) {
  const titles = {
    home: 'Today',
    wallet: 'Credential Wallet',
    chat: 'Agents',
    money: 'Money',
    career: 'Career',
    profile: 'Profile',
  };
  return (
    <div style={{
      height: 44, padding: '0 18px',
      borderBottom: '1px solid var(--hairline)',
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'var(--bg-blur)', backdropFilter: 'blur(12px)',
    }}>
      <div className="serif" style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>{titles[section]}</div>
      <div style={{ width: 1, height: 16, background: 'var(--hairline)' }}/>
      <div style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>Tuesday · November 18, 2026</div>
      <div style={{ flex: 1 }}/>
      <button style={{
        height: 24, padding: '0 10px', borderRadius: 6,
        border: '0.5px solid var(--hairline-strong)', background: 'var(--card)',
        cursor: 'pointer', fontSize: 11, color: 'var(--ink-2)',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <Icon.shield/> Sovereign · synced
      </button>
    </div>
  );
}

// ───── HOME (multi-column dashboard) ────────────────────────

function DesktopHome({ go }) {
  return (
    <div style={{ padding: 22 }}>
      {/* Greeting */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Tuesday afternoon</div>
          <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
            Good afternoon, Maya<span style={{ color: 'var(--terra)' }}>.</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill tone="neutral">3 agents online</Pill>
          <Pill tone="verified" icon={<Icon.check/>}>Wallet synced 2m ago</Pill>
        </div>
      </div>

      {/* HERO alert — the math drop */}
      <button onClick={() => go('chat')} style={{
        width: '100%', textAlign: 'left',
        background: 'var(--ink)', color: 'white',
        borderRadius: 18, padding: '22px 26px', border: 0, cursor: 'pointer',
        boxShadow: 'var(--shadow-lift)', position: 'relative', overflow: 'hidden',
        marginBottom: 18,
        display: 'flex', alignItems: 'center', gap: 28,
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,122,77,0.3), transparent 65%)',
        }}/>
        <div style={{ flex: 1, position: 'relative', maxWidth: 540 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div className="pulse-dot"/>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Academic counselor · just now</span>
          </div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 8 }}>
            I noticed your <span style={{ color: 'var(--terra-2)' }}>MCR3U1 Functions</span> grade has dropped three units in a row. Want to look at it together?
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            94 → 82 → 64 over six weeks. The drop concentrates in the Trig Ratios unit.
          </div>
        </div>
        <div style={{
          position: 'relative', width: 200, height: 80,
          flexShrink: 0,
        }}>
          <DeskSpark/>
        </div>
        <div style={{
          position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, alignSelf: 'flex-end',
        }}>
          <span style={{
            padding: '8px 14px', borderRadius: 8,
            background: 'var(--terra)', color: 'white',
            fontSize: 12, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>Open analysis <Icon.arrow/></span>
        </div>
      </button>

      {/* 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14, marginBottom: 14 }}>

        {/* Grade chart big */}
        <DeskCard title="Functions · 6-week trend" kicker="MCR3U1" right={<Pill tone="pending"><Icon.trend_down/> −30 pts</Pill>}>
          <DeskGradeChart/>
        </DeskCard>

        {/* GPA card */}
        <DeskCard title="Term GPA" kicker="Fall 2026">
          <div style={{ padding: '8px 4px 0' }}>
            <div className="serif" style={{ fontSize: 48, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
              3.61<span style={{ fontSize: 22, color: 'var(--ink-4)' }}>/4.0</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--terra)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon.trend_down/> 0.18 from last term
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { c: 'ICS3U1', n: 'CS',         g: 96, hi: true },
                { c: 'CHV2O1', n: 'Civics',     g: 91 },
                { c: 'ENG3U1', n: 'English',    g: 88 },
                { c: 'BBI2O1', n: 'Business',   g: 85 },
                { c: 'FSF3U1', n: 'French',     g: 79 },
                { c: 'MCR3U1', n: 'Functions',  g: 64, low: true },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
                  <span className="mono" style={{ width: 50, color: 'var(--ink-4)' }}>{x.c}</span>
                  <span style={{ flex: 1, color: 'var(--ink-2)' }}>{x.n}</span>
                  <span style={{
                    color: x.low ? 'var(--terra)' : x.hi ? 'var(--green)' : 'var(--ink)',
                    fontWeight: 500, fontVariantNumeric: 'tabular-nums',
                  }}>{x.g}</span>
                </div>
              ))}
            </div>
          </div>
        </DeskCard>

        {/* Finance */}
        <DeskCard title="November spend" kicker="$182 saved" right={<Pill tone="warn"><Icon.warn/> SaaS ↑38%</Pill>}>
          <div style={{ padding: '8px 4px 0' }}>
            <div className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1 }}>
              $268<span style={{ fontSize: 18, color: 'var(--ink-4)' }}>/450</span>
            </div>
            <div style={{
              marginTop: 12, height: 8, borderRadius: 4, overflow: 'hidden',
              display: 'flex', background: 'var(--hairline)',
            }}>
              {[
                { p: 31, c: '#C85A2E' },
                { p: 23, c: '#1F4A4A' },
                { p: 18, c: '#B89070' },
                { p: 13, c: '#3D3D3A' },
                { p: 8,  c: '#7A4A20' },
                { p: 6,  c: '#9C9C92' },
              ].map((x, i) => <div key={i} style={{ width: `${x.p}%`, background: x.c }}/>)}
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {[
                ['SaaS & tools', 84, '#C85A2E', '↑38%', 'var(--terra)'],
                ['Hardware',     62, '#1F4A4A', '1 buy', 'var(--ink-3)'],
                ['Food & coffee',48, '#B89070', '↓12%', 'var(--green)'],
                ['Transit',      36, '#3D3D3A', '', ''],
              ].map(([n, a, c, d, dc], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c }}/>
                  <span style={{ flex: 1, color: 'var(--ink-2)' }}>{n}</span>
                  <span style={{ color: dc || 'var(--ink-4)', fontSize: 10 }}>{d}</span>
                  <span style={{ color: 'var(--ink)', fontWeight: 500, minWidth: 30, textAlign: 'right' }}>${a}</span>
                </div>
              ))}
            </div>
          </div>
        </DeskCard>
      </div>

      {/* Suggestions row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 500 }}>From your counselors</div>
          <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Suggested next steps</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { agent: 'Academic',  tone: 'var(--terra)',
            title: 'Talk to Ms. Lavoie about Functions',
            body:  'Office hours Wednesday 3:15. I can draft what to say.',
            cta: 'Draft message' },
          { agent: 'Career',    tone: 'var(--teal)',
            title: 'Tailor résumé for Shopify summer role',
            body:  'Your wallet has 3 credentials that fit. I see 11 lines I\'d rewrite.',
            cta: 'Review changes' },
          { agent: 'Financial', tone: 'var(--ink)',
            title: 'Two SaaS subs overlap',
            body:  'Cursor + Copilot together = $32/mo. Pause one to save $384/year.',
            cta: 'Choose which to pause' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 16, background: 'var(--card)', borderRadius: 14,
            border: '1px solid var(--hairline)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.tone }}/>
              <span style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{s.agent} counselor</span>
            </div>
            <div className="serif" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.005em', textWrap: 'pretty' }}>{s.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5, flex: 1 }}>{s.body}</div>
            <button style={{
              alignSelf: 'flex-start', marginTop: 4,
              padding: '6px 12px', borderRadius: 7,
              background: 'rgba(26,26,26,0.05)', border: '0.5px solid var(--hairline)',
              fontSize: 11.5, fontWeight: 500, cursor: 'pointer', color: 'var(--ink)',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>{s.cta} <Icon.arrow/></button>
          </div>
        ))}
      </div>

      {/* Applications */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 500 }}>Career</div>
          <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Active applications</div>
        </div>
        <button style={{ background: 'transparent', border: 0, color: 'var(--ink-3)', fontSize: 12, cursor: 'pointer' }}>See all 7 →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { co: 'Shopify', role: 'Summer intern · Frontend', stage: 'Résumé tailoring', tone: 'pending', date: 'Due Dec 1', bg: '#1F5C3D' },
          { co: 'RBC',     role: 'Future Launch Scholar',    stage: 'Submitted',        tone: 'verified', date: 'Nov 9',    bg: '#003A6B' },
          { co: "Let's Talk Science", role: 'Outreach volunteer', stage: 'Drafting essay', tone: 'pending', date: 'Due Nov 28', bg: 'var(--terra)' },
        ].map((a, i) => (
          <div key={i} style={{
            padding: 14, background: 'var(--card)', borderRadius: 12,
            border: '1px solid var(--hairline)',
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <Glyph bg={a.bg}>{a.co[0]}</Glyph>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{a.co}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{a.role}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 3 }}>{a.date}</div>
            </div>
            <Pill tone={a.tone}>{a.stage}</Pill>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }}/>
    </div>
  );
}

// ───── shared desk card ─────────────────────────────────────

function DeskCard({ title, kicker, right, children, padded = true }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 14,
      border: '1px solid var(--hairline)',
      padding: padded ? 16 : 0, boxShadow: 'var(--shadow-card)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, padding: padded ? 0 : 16 }}>
        <div>
          {kicker && <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 500 }}>{kicker}</div>}
          <div className="serif" style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>{title}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

// inline sparkline for hero
function DeskSpark() {
  const pts = [94, 91, 87, 82, 74, 64];
  const w = 200, h = 80, max = 100, min = 55;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(p => h - 8 - ((p - min) / (max - min)) * (h - 16));
  const path = pts.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="200" height="80">
      <defs>
        <linearGradient id="ds-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E07A4D" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#E07A4D" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ds-spark)"/>
      <path d={path} fill="none" stroke="#E07A4D" strokeWidth="2" strokeLinecap="round"/>
      {pts.map((p, i) => (
        <circle key={i} cx={xs[i]} cy={ys[i]} r={i === pts.length - 1 ? 4 : 2}
                fill={i === pts.length - 1 ? '#E07A4D' : 'rgba(255,255,255,0.95)'}
                stroke="#E07A4D" strokeWidth="1.5"/>
      ))}
      <text x={xs[0]} y={ys[0] - 8} fontSize="11" fill="rgba(255,255,255,0.85)" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="500">94</text>
      <text x={xs[5]} y={ys[5] + 16} fontSize="11" fill="#E07A4D" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="500">64</text>
    </svg>
  );
}

// editorial chart, sized for desk card
function DeskGradeChart() {
  const data = [
    { x: 'Sep 16', g: 94, label: 'U1' },
    { x: 'Sep 30', g: 91, label: 'HW' },
    { x: 'Oct 14', g: 87, label: 'U2' },
    { x: 'Oct 28', g: 82, label: 'HW' },
    { x: 'Nov 11', g: 74, label: 'Quiz' },
    { x: 'Nov 18', g: 64, label: 'U3' },
  ];
  const median = [78, 78, 79, 79, 78, 78];
  const W = 380, H = 180, P = { l: 28, r: 12, t: 16, b: 32 };
  const inW = W - P.l - P.r, inH = H - P.t - P.b;
  const max = 100, min = 55;
  const xs = data.map((_, i) => P.l + (i / (data.length - 1)) * inW);
  const y = v => P.t + inH - ((v - min) / (max - min)) * inH;
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs[i]} ${y(d.g)}`).join(' ');
  const area = `${path} L ${xs[5]} ${P.t+inH} L ${xs[0]} ${P.t+inH} Z`;
  const mp = median.map((m, i) => `${i === 0 ? 'M' : 'L'} ${xs[i]} ${y(m)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="dgc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C85A2E" stopOpacity="0.16"/>
          <stop offset="100%" stopColor="#C85A2E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[60, 70, 80, 90, 100].map(v => (
        <g key={v}>
          <line x1={P.l} x2={W-P.r} y1={y(v)} y2={y(v)} stroke="var(--hairline)" strokeWidth="0.5"/>
          <text x={P.l - 5} y={y(v) + 3} fontSize="9" fill="var(--ink-4)" textAnchor="end" fontFamily="Geist Mono">{v}</text>
        </g>
      ))}
      <path d={mp} fill="none" stroke="var(--ink-4)" strokeWidth="1" strokeDasharray="3 3"/>
      <path d={area} fill="url(#dgc)"/>
      <path d={path} fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xs[i]} cy={y(d.g)} r={i === 5 ? 4 : 2.5} fill="white" stroke="var(--terra)" strokeWidth={i === 5 ? 2 : 1.4}/>
          <text x={xs[i]} y={H - 14} fontSize="9" fill="var(--ink-4)" textAnchor="middle" fontFamily="Geist Mono">{d.x.split(' ')[1]}</text>
        </g>
      ))}
      {/* annotation */}
      <line x1={xs[5]} x2={xs[5]+10} y1={y(64)} y2={y(64)+24} stroke="var(--ink-3)" strokeWidth="0.6"/>
      <text x={xs[5]+12} y={y(64)+28} fontSize="9" fill="var(--ink-3)" fontFamily="Geist, sans-serif">trig unit</text>
      <text x={xs[0]+4} y={y(94)-5} fontSize="10" fill="var(--ink)" fontFamily="Fraunces, serif" fontWeight="500">94</text>
    </svg>
  );
}

// ───── WALLET (desktop) ─────────────────────────────────────

function DesktopWallet() {
  const creds = [
    { type: 'Diploma', title: 'Ontario Secondary School Diploma',  issuer: 'Etobicoke CI',     glyph: 'ON', bg: 'var(--teal)', detail: '18/30 credits', date: 'In progress' },
    { type: 'Transcript', title: 'Fall 2026 Mid-term',             issuer: 'TDSB',             glyph: 'TR', bg: 'var(--ink)',  detail: '6 courses · GPA 3.61', date: 'Nov 14' },
    { type: 'License', title: 'G1 Driver\'s License',              issuer: 'Service Ontario',  glyph: 'G1', bg: '#1F4A7A',     detail: 'Restricted',     date: 'Aug 2025' },
    { type: 'Certificate', title: 'Std First Aid + CPR-C',         issuer: 'Canadian Red Cross', glyph: 'FA', bg: '#9F2F2F',  detail: '16h · 94%',      date: 'Aug 2027' },
    { type: 'Income', title: 'Tim Hortons employment',             issuer: 'Tim Hortons',      glyph: 'TH', bg: '#7A1F2A',    detail: '$450/mo · 12h/wk', date: 'May 2025' },
    { type: 'Application', title: 'Shopify Summer 2027',           issuer: 'Shopify Inc.',     glyph: 'Sh', bg: '#1F5C3D',    detail: 'Frontend',        date: 'Draft', draft: true },
  ];
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>6 credentials · sovereign</div>
          <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Wallet</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--card)', border: '0.5px solid var(--hairline-strong)', fontSize: 12, cursor: 'pointer' }}>Import</button>
          <button style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--ink)', color: 'white', border: 0, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.plus/> Add credential
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {creds.map((c, i) => (
          <div key={i} style={{
            background: 'var(--card)', borderRadius: 14,
            border: '1px solid var(--hairline)', padding: 16,
            boxShadow: 'var(--shadow-card)',
            display: 'flex', flexDirection: 'column', gap: 12,
            minHeight: 160,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Glyph bg={c.bg}>{c.glyph}</Glyph>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3, fontWeight: 500 }}>{c.type}</div>
                <div className="serif" style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.005em', textWrap: 'balance' }}>{c.title}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>{c.issuer}</div>
              </div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed var(--hairline)', fontSize: 11.5, color: 'var(--ink-3)' }}>
              <span>{c.detail}</span>
              {c.draft
                ? <Pill tone="pending">Draft</Pill>
                : <Pill tone="verified" icon={<Icon.check/>}>{c.date}</Pill>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───── MONEY (desktop) ──────────────────────────────────────

function DesktopMoney() {
  const cats = [
    { name: 'SaaS & tools',    amt: 84,  pct: 31, color: '#C85A2E', items: ['Cursor Pro $20','Notion $8','Linear $8','Copilot $10','ChatGPT Plus $20'], note: '↑ 38%' },
    { name: 'Hardware',         amt: 62,  pct: 23, color: '#1F4A4A', items: ['Used mech keyboard'] },
    { name: 'Food & coffee',    amt: 48,  pct: 18, color: '#B89070', items: ['Lunches · 14','Starbucks · 6'] },
    { name: 'Transit',          amt: 36,  pct: 13, color: '#3D3D3A', items: ['TTC monthly'] },
    { name: 'Books & learning', amt: 22,  pct: 8,  color: '#7A4A20', items: ['SAT prep workbook','Anatomy'] },
    { name: 'Other',            amt: 16,  pct: 6,  color: '#9C9C92', items: ['Birthday gift'] },
  ];
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>November 2026</div>
          <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Money</h1>
        </div>
        <Pill tone="teal">Healthy</Pill>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14 }}>
        <DeskCard title="This month" kicker="Spent · saved">
          <div className="serif" style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.025em' }}>
            $268<span style={{ fontSize: 18, color: 'var(--ink-4)' }}>.40</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 12 }}>of $450 income · <span style={{ color: 'var(--green)' }}>$182 saved</span></div>
          <div style={{ height: 12, borderRadius: 6, overflow: 'hidden', display: 'flex', background: 'var(--hairline)', border: '1px solid var(--hairline)' }}>
            {cats.map((c, i) => <div key={i} style={{ width: `${c.pct}%`, background: c.color }}/>)}
          </div>
          <div style={{ marginTop: 18, padding: 14, background: 'var(--ink)', color: 'white', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,122,77,0.3), transparent 70%)' }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, position: 'relative' }}>
              <div className="pulse-dot"/>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Financial counselor</span>
            </div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35, position: 'relative', textWrap: 'pretty' }}>
              Cursor + Copilot overlap. ChatGPT unused 11 days. Pausing those two saves <span style={{ color: 'var(--terra-2)' }}>$32/mo</span>.
            </div>
          </div>
        </DeskCard>

        <DeskCard title="Breakdown" kicker="By category">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {cats.map((c, i) => (
              <div key={i} style={{
                padding: '10px 0', borderBottom: i < cats.length - 1 ? '1px solid var(--hairline)' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{c.items.slice(0, 3).join(' · ')}{c.items.length > 3 ? '…' : ''}</div>
                </div>
                {c.note && <Pill tone="warn"><Icon.warn/> {c.note}</Pill>}
                <div className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em', minWidth: 56, textAlign: 'right' }}>${c.amt}</div>
              </div>
            ))}
          </div>
        </DeskCard>
      </div>
    </div>
  );
}

// ───── CAREER (desktop, résumé diff) ────────────────────────

function DesktopCareer() {
  const sections = [
    { heading: 'Summary',
      before: 'Grade 11 student at Etobicoke CI interested in coding and design. Eager to learn and contribute.',
      after:  'Grade 11 CS student at Etobicoke CI shipping web apps in TypeScript and React. Curious about commerce infrastructure and seeking a high-leverage frontend internship.',
      edits: 2 },
    { heading: 'Experience',
      before: 'Tim Hortons — Crew Member\n· Take orders and make coffee\n· Help customers',
      after:  'Tim Hortons — Crew Member\n· Run register through ~120 transactions/shift; handle ~$1,400 cash daily\n· Trained 2 new crew on POS — cut onboarding time by half',
      edits: 2 },
    { heading: 'Projects',
      before: 'Built a Discord bot for my robotics team.\nMade a website for my mom\'s catering business.',
      after:  'Discord bot for FRC team 6135 (Python, deployed to 80 members)\nCatering site for Okonkwo Kitchen — Next.js + Stripe Checkout, processed $4,200 in first 90 days',
      edits: 2 },
    { heading: 'Skills',
      before: 'HTML, CSS, JavaScript, Python, hard worker, team player',
      after:  'TypeScript · React · Next.js · Python · Liquid (learning) · Stripe API · Git',
      edits: 2 },
  ];
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Résumé · Shopify Summer 2027</div>
          <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Tailored draft</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill tone="teal">11 edits</Pill>
          <button style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--ink)', color: 'white', border: 0, fontSize: 12, cursor: 'pointer' }}>Save to wallet</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--hairline)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{s.heading}</div>
              <div style={{ fontSize: 10.5, color: 'var(--terra)', fontWeight: 500 }}>{s.edits} edits</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--hairline)' }}>
              <div style={{ padding: 14, whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.5, color: 'var(--ink-3)', background: 'rgba(179,58,46,0.03)', borderRight: '1px dashed var(--hairline)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, color: 'var(--red)', letterSpacing: '0.08em', background: 'var(--card)', padding: '1px 5px', borderRadius: 3, border: '0.5px solid rgba(179,58,46,0.2)' }}>BEFORE</span>
                <div style={{ textDecoration: 'line-through', textDecorationColor: 'rgba(179,58,46,0.4)' }}>{s.before}</div>
              </div>
              <div style={{ padding: 14, whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.5, color: 'var(--ink)', background: 'rgba(46,125,91,0.04)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, color: 'var(--green)', letterSpacing: '0.08em', background: 'var(--card)', padding: '1px 5px', borderRadius: 3, border: '0.5px solid rgba(46,125,91,0.2)' }}>TAILORED</span>
                {s.after}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───── CHAT (desktop, two-pane) ─────────────────────────────

function DesktopChat() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* threads list */}
      <div style={{ width: 260, borderRight: '1px solid var(--hairline)', background: 'var(--bg-tint)', padding: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, padding: '0 8px', fontWeight: 500 }}>Conversations</div>
        {[
          { glyph: 'Ac', name: 'Academic Counselor', last: 'Want to look at it together?', time: '3:42p', unread: 2, bg: 'var(--ink)', active: true },
          { glyph: 'Ca', name: 'Career Counselor',   last: 'I rewrote 11 lines of your résumé.', time: '1:08p', bg: 'var(--teal)' },
          { glyph: 'Fi', name: 'Financial Counselor',last: 'SaaS spend up 38% this month.',     time: 'Mon',  bg: 'var(--terra)' },
        ].map((t, i) => (
          <button key={i} style={{
            width: '100%', textAlign: 'left', border: 0, background: t.active ? 'rgba(26,26,26,0.06)' : 'transparent',
            padding: 10, borderRadius: 8, cursor: 'pointer', marginBottom: 2,
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: t.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{t.glyph}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                <span style={{ fontSize: 10, color: 'var(--ink-4)' }}>{t.time}</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.last}</div>
            </div>
            {t.unread && <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--terra)', color: 'white', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.unread}</div>}
          </button>
        ))}
      </div>

      {/* main thread */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-soft)' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--hairline)', background: 'var(--bg-blur)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 12, fontWeight: 500 }}>Ac</div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>Academic Counselor</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }}/>Reading your grades · online
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '18px 24px' }}>
          <DChat from="agent" text="Hi Maya — I'm your Academic Counselor. I keep an eye on patterns in your courses and help you make calls about them. You're always the one who decides." />
          <DChat from="agent" text="One thing I want to flag from today: your Functions grade has gone 94 → 82 → 64 over the last three units." />
          <DChatCard/>
          <DChat from="agent" text="Want me to diagnose what's happening?"/>
          <div style={{ marginLeft: 36, marginBottom: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Yes, diagnose', 'Show the grades first', 'Not now'].map(o => (
              <button key={o} style={{ padding: '7px 12px', borderRadius: 999, background: 'var(--card)', color: 'var(--terra)', border: '0.5px solid var(--terra-bg)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{o}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 18px 18px', background: 'var(--bg)', borderTop: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {[['/diagnose','find a trend'], ['/optimize_job','tailor résumé'], ['/budget','review spending'], ['/draft_email','write a teacher']].map(([cmd, hint]) => (
              <span key={cmd} style={{ padding: '5px 10px', borderRadius: 999, background: 'var(--card)', border: '0.5px solid var(--hairline-strong)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--terra)' }}>{cmd}</span>
                <span style={{ fontSize: 10.5, color: 'var(--ink-4)' }}>{hint}</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--card)', borderRadius: 10, padding: '4px 4px 4px 14px', border: '0.5px solid var(--hairline-strong)' }}>
            <input placeholder="Message your counselor…" style={{ flex: 1, border: 0, outline: 0, fontSize: 13, fontFamily: 'inherit', padding: '8px 0', background: 'transparent' }}/>
            <button style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--terra)', color: 'white', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.send/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DChat({ from, text }) {
  if (from === 'me') return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
      <div style={{ maxWidth: '60%', background: 'var(--ink)', color: 'white', padding: '9px 14px', borderRadius: '14px 14px 4px 14px', fontSize: 13, lineHeight: 1.45 }}>{text}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-end' }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 10, flexShrink: 0 }}>Ac</div>
      <div style={{ maxWidth: '70%', background: 'var(--card)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.5, border: '1px solid var(--hairline)', textWrap: 'pretty' }}>{text}</div>
    </div>
  );
}

function DChatCard() {
  return (
    <div style={{ marginLeft: 36, marginBottom: 12, maxWidth: 380 }}>
      <div style={{ background: 'var(--card)', borderRadius: 14, padding: 14, border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>MCR3U1 · Functions</div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>Three-unit drop detected</div>
          </div>
          <Pill tone="pending" icon={<Icon.trend_down/>}>−30 pts</Pill>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[{u:'Unit 1', g:94}, {u:'Unit 2', g:82}, {u:'Unit 3', g:64}].map((x, i) => (
            <div key={i} style={{ padding: '8px 10px', borderRadius: 8, background: i === 2 ? 'var(--terra-bg)' : 'var(--bg-soft)', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 2 }}>{x.u}</div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: i === 2 ? 'var(--terra)' : 'var(--ink)' }}>{x.g}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───── PROFILE (desktop, with view toggle) ──────────────────

function DesktopProfile({ onPhone }) {
  return (
    <div style={{ padding: 22, maxWidth: 780 }}>
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 18px' }}>Profile</h1>

      <DeskCard title="Identity" kicker="Sovereign · ERC-8004">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #D9C5A7, #B89070)', color: 'white', fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MO</div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>Maya Okonkwo</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Grade 11 · Etobicoke Collegiate Institute</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 4 }}>allumino:8004/maya.okonkwo · 0x7a3f…b21c</div>
          </div>
          <Pill tone="verified" icon={<Icon.shield/>}>Sovereign</Pill>
        </div>
      </DeskCard>

      <div style={{ height: 14 }}/>

      {/* Display section — view toggle */}
      <DeskCard title="Display" kicker="How Allumino looks">
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginBottom: 14, lineHeight: 1.5, textWrap: 'pretty' }}>
          You're on the wide desktop view. Switch to the phone version when you're on the go — it's the same wallet, same agents.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <DeviceTile selected label="Desktop" sub="Wide multi-column view" icon={
            <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
              <rect x="2" y="2" width="56" height="34" rx="3" stroke="currentColor" strokeWidth="1.5" fill="white"/>
              <line x1="2" y1="10" x2="58" y2="10" stroke="currentColor" strokeWidth="1"/>
              <circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="10" cy="6" r="1" fill="currentColor"/><circle cx="14" cy="6" r="1" fill="currentColor"/>
              <rect x="6" y="14" width="14" height="18" fill="currentColor" opacity="0.1"/>
              <rect x="22" y="14" width="32" height="8" fill="currentColor" opacity="0.15"/>
              <rect x="22" y="24" width="14" height="8" fill="currentColor" opacity="0.1"/>
              <rect x="40" y="24" width="14" height="8" fill="currentColor" opacity="0.1"/>
              <path d="M22 38h16M24 41h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          }/>
          <DeviceTile label="Phone" sub="Pocket-sized · same data" onClick={onPhone} icon={
            <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
              <rect x="22" y="2" width="16" height="38" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="white"/>
              <line x1="22" y1="8" x2="38" y2="8" stroke="currentColor" strokeWidth="1"/>
              <line x1="22" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="1"/>
              <rect x="24" y="10" width="12" height="6" fill="currentColor" opacity="0.15"/>
              <rect x="24" y="18" width="12" height="4" fill="currentColor" opacity="0.1"/>
              <rect x="24" y="24" width="12" height="8" fill="currentColor" opacity="0.1"/>
              <circle cx="30" cy="37" r="0.8" fill="currentColor"/>
            </svg>
          }/>
        </div>
      </DeskCard>

      <div style={{ height: 14 }}/>

      <DeskCard title="Counselors" kicker="Your agents">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { glyph: 'Ac', name: 'Academic Counselor',  meta: 'Watching 6 courses · 1 alert',      bg: 'var(--ink)' },
            { glyph: 'Ca', name: 'Career Counselor',    meta: '3 active applications',             bg: 'var(--teal)' },
            { glyph: 'Fi', name: 'Financial Counselor', meta: 'November tracking · on budget',     bg: 'var(--terra)' },
          ].map((a, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: a.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 12, fontWeight: 500 }}>{a.glyph}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{a.meta}</div>
              </div>
              <div style={{ width: 28, height: 18, borderRadius: 999, background: 'var(--green)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 2, left: 12, width: 14, height: 14, borderRadius: '50%', background: 'var(--card)' }}/>
              </div>
            </div>
          ))}
        </div>
      </DeskCard>
    </div>
  );
}

function DeviceTile({ label, sub, icon, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: 14, borderRadius: 12,
      background: selected ? 'var(--ink)' : 'white',
      border: '1px solid ' + (selected ? 'var(--ink)' : 'var(--hairline-strong)'),
      color: selected ? 'white' : 'var(--ink)',
      cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ color: selected ? 'rgba(255,255,255,0.85)' : 'var(--ink-2)' }}>{icon}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 11.5, color: selected ? 'rgba(255,255,255,0.65)' : 'var(--ink-3)', marginTop: 2 }}>{sub}</div>
        </div>
        {selected && <Pill tone="verified" icon={<Icon.check/>}>Active</Pill>}
      </div>
    </button>
  );
}

Object.assign(window, { DesktopApp });
