// Resume optimizer — side-by-side diff: Before vs AI-tailored for Shopify role

function Resume({ go }) {
  const [view, setView] = React.useState('diff'); // diff | before | after

  const sections = [
    {
      heading: 'Summary',
      before: 'Grade 11 student at Etobicoke CI interested in coding and design. Eager to learn and contribute.',
      after:  'Grade 11 CS student at Etobicoke CI shipping web apps in TypeScript and React. Curious about commerce infrastructure and seeking a high-leverage frontend internship.',
      changes: [
        { k: 'rewrite', t: 'Replaced generic "eager to learn" with specific tech stack', from: 'interested in coding and design', to: 'shipping web apps in TypeScript and React' },
        { k: 'add',     t: 'Added Shopify-relevant framing', to: 'commerce infrastructure' },
      ],
    },
    {
      heading: 'Experience',
      before: 'Tim Hortons — Crew Member (May 2025 – present)\n· Take orders and make coffee\n· Help customers',
      after:  'Tim Hortons — Crew Member (May 2025 – present)\n· Run register through ~120 transactions/shift; handle ~$1,400 cash daily\n· Trained 2 new crew on POS — cut onboarding time by half',
      changes: [
        { k: 'rewrite', t: 'Quantified scope (120 transactions, $1,400 cash)', from: 'Take orders and make coffee' },
        { k: 'rewrite', t: 'Surfaced leadership impact', to: 'Trained 2 new crew · cut onboarding by half' },
      ],
    },
    {
      heading: 'Projects',
      before: 'Built a Discord bot for my robotics team.\nMade a website for my mom\'s catering business.',
      after:  'Discord bot for FRC team 6135 (Python, deployed to 80 members)\nCatering site for Okonkwo Kitchen — Next.js + Stripe Checkout, processed $4,200 in first 90 days',
      changes: [
        { k: 'add',     t: 'Added scale figures (80 members, $4,200 processed)' },
        { k: 'add',     t: 'Surfaced Stripe — directly relevant to Shopify' },
      ],
    },
    {
      heading: 'Skills',
      before: 'HTML, CSS, JavaScript, Python, hard worker, team player',
      after:  'TypeScript · React · Next.js · Python · Liquid (learning) · Stripe API · Git',
      changes: [
        { k: 'remove',  t: 'Removed soft-skill filler', from: 'hard worker, team player' },
        { k: 'add',     t: 'Added Liquid (Shopify\'s templating language)' },
      ],
    },
  ];

  return (
    <div className="app-surface">
      <div style={{ padding: '52px 16px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => go('home')} style={backBtn}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Résumé · Shopify Summer 2027</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em' }}>Tailored draft</div>
        </div>
      </div>

      {/* Job context strip */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div style={{
          padding: 12, background: 'var(--card)', borderRadius: 12,
          border: '1px solid var(--hairline)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Glyph bg="#1F5C3D">Sh</Glyph>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Frontend Intern · Summer 2027</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Shopify · Remote · 16-week placement</div>
          </div>
          <Pill tone="teal">11 edits</Pill>
        </div>
      </div>

      {/* Toggle */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 4, background: 'transparent' }}>
        <div style={{
          display: 'flex', background: 'var(--bg-soft)', padding: 3,
          borderRadius: 999, width: '100%',
        }}>
          {['before','diff','after'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, height: 30, borderRadius: 999, border: 0,
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
              background: view === v ? 'white' : 'transparent',
              color: view === v ? 'var(--ink)' : 'var(--ink-3)',
              boxShadow: view === v ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              textTransform: 'capitalize',
              transition: 'all .15s',
            }}>{v === 'after' ? 'AI-tailored' : v}</button>
          ))}
        </div>
      </div>

      <div className="scroll-y" style={{ padding: '0 16px 24px' }}>
        {sections.map((s, i) => <DiffBlock key={i} s={s} view={view}/>)}

        {/* Counsel note */}
        <div style={{
          marginTop: 12, padding: 14,
          background: 'var(--teal)',  color: 'white',
          borderRadius: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fraunces, serif', fontSize: 10,
            }}>Ca</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Career counselor</span>
          </div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.35, marginBottom: 4, letterSpacing: '-0.01em' }}>
            This version is calibrated to Shopify's intern bar.
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.78)' }}>
            They favor numbers over adjectives. The Stripe + Next.js project will catch a recruiter's eye — you already cleared their tech bar with that one alone.
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <button style={{
            height: 46, borderRadius: 12, border: '1px solid var(--hairline-strong)',
            background: 'var(--card)', color: 'var(--ink-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>Edit manually</button>
          <button style={{
            height: 46, borderRadius: 12, border: 0,
            background: 'var(--ink)', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            Save to wallet <Icon.arrow/>
          </button>
        </div>
      </div>
    </div>
  );
}

function DiffBlock({ s, view }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 14,
      border: '1px solid var(--hairline)', marginBottom: 10, overflow: 'hidden',
    }}>
      <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{s.heading}</div>
        <div style={{ fontSize: 10.5, color: 'var(--terra)', fontWeight: 500 }}>{s.changes.length} edits</div>
      </div>

      {view === 'before' && (
        <div style={{ padding: '0 14px 14px', whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{s.before}</div>
      )}
      {view === 'after' && (
        <div style={{ padding: '0 14px 14px', whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{s.after}</div>
      )}
      {view === 'diff' && (
        <div>
          <div style={{
            padding: '8px 14px', whiteSpace: 'pre-wrap',
            fontSize: 13, lineHeight: 1.5, color: 'var(--ink-3)',
            background: 'rgba(179,58,46,0.04)',
            borderTop: '1px solid var(--hairline)',
            borderBottom: '1px dashed var(--hairline)',
            position: 'relative', textDecoration: 'line-through', textDecorationColor: 'rgba(179,58,46,0.4)',
          }}>
            <span style={{
              position: 'absolute', top: 4, right: 6, fontSize: 9,
              color: 'var(--red)', letterSpacing: '0.08em',
              background: 'var(--card)', padding: '1px 5px', borderRadius: 3,
              border: '1px solid rgba(179,58,46,0.2)',
            }}>BEFORE</span>
            {s.before}
          </div>
          <div style={{
            padding: '10px 14px 12px', whiteSpace: 'pre-wrap',
            fontSize: 13, lineHeight: 1.5, color: 'var(--ink)',
            background: 'rgba(46,125,91,0.05)',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: 4, right: 6, fontSize: 9,
              color: 'var(--green)', letterSpacing: '0.08em',
              background: 'var(--card)', padding: '1px 5px', borderRadius: 3,
              border: '1px solid rgba(46,125,91,0.2)',
            }}>TAILORED</span>
            {s.after}
          </div>

          {/* Reasoning */}
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--hairline)' }}>
            {s.changes.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: i > 0 ? 6 : 0 }}>
                <div style={{
                  fontSize: 9, color: c.k === 'add' ? 'var(--green)' : c.k === 'remove' ? 'var(--red)' : 'var(--terra)',
                  textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
                  minWidth: 50, marginTop: 2,
                }}>{c.k}</div>
                <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4 }}>{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Resume });
