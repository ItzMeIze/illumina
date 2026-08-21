// Report — the generated pathways report. The marquee artifact of the new workflow.

function Report({ go }) {
  const [pathFocus, setPathFocus] = React.useState(0);

  return (
    <div className="app-surface">
      {/* Top bar */}
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
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Report · v1 · Nov 18</div>
          <div className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.025em' }}>Pathways</div>
        </div>
        <button style={{
          padding: '7px 12px', borderRadius: 8, background: 'var(--ink)', color: 'white',
          border: 0, fontSize: 12, fontWeight: 500, cursor: 'pointer',
        }}>Share</button>
      </div>

      <div className="scroll-y">

        {/* Sun cover */}
        <div className="sun-hero" style={{ padding: '32px 22px 28px', borderRadius: 0 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginBottom: 12 }}>For Maya Okonkwo · Grade 11 · Etobicoke CI</div>
            <h1 className="display" style={{
              fontSize: 30, fontWeight: 600, color: 'white',
              letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
              textWrap: 'pretty',
            }}>
              Four ways forward.<br/>
              <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>One is closer than you think.</span>
            </h1>
            <div style={{ marginTop: 16, fontSize: 13.5, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, maxWidth: 320, textWrap: 'pretty' }}>
              Built from your transcripts, your context, and 4,200 programs we know about. Updated every term.
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.22)' }}>
              {[
                { n: '4',  l: 'pathways' },
                { n: '11', l: 'scholarships' },
                { n: '18', l: 'resources' },
                { n: '6',  l: 'next steps' },
              ].map(m => (
                <div key={m.l}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>{m.n}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Where you stand now */}
        <Section kicker="01 · Where you stand">
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 14px' }}>The shape of your file.</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, margin: '0 0 18px', textWrap: 'pretty' }}>
            You are a <strong style={{ color: 'var(--ink)' }}>strong CS-and-humanities student</strong> with a recent Functions dip. Your work history and Stripe + Next.js project already put you above the median Grade 11 applicant for tech roles. The math gap matters — but it's fixable this term.
          </p>

          {/* Mini strength grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <StatBlock label="CS coursework"   value="96"     tone="up"   note="ICS3U1 · top quartile"/>
            <StatBlock label="Functions"       value="64"     tone="down" note="MCR3U1 · attention"/>
            <StatBlock label="Project portfolio" value="2 shipped" tone="up"   note="Stripe-processed $4.2k"/>
            <StatBlock label="Income context"  value="$58–72k" tone="flat" note="Unlocks 11 scholarships"/>
          </div>

          <Callout tone="warn">
            <strong>Math gap is the single biggest lever.</strong> Trig-ratios specifically. Pulling MCR3U1 back to 80+ widens eligibility from <strong>2</strong> of your pathways to all <strong>4</strong>.
          </Callout>
        </Section>

        {/* Pathways */}
        <Section kicker="02 · Pathways" hairline>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 6px' }}>Where you could go.</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5, margin: '0 0 16px' }}>
            Ranked by fit, weighted equally on cost, distance, and how much you've already done.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PATHWAYS.map((p, i) => (
              <PathwayCard key={p.title} p={p} idx={i} open={pathFocus === i} onToggle={() => setPathFocus(pathFocus === i ? -1 : i)}/>
            ))}
          </div>
        </Section>

        {/* Resources */}
        <Section kicker="03 · Resources" hairline>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 14px' }}>Who can help.</h2>

          <Subhead>Within 90 minutes of you</Subhead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {[
              { name: 'Hackergal · Etobicoke chapter', kind: 'Program', dist: '4 km', detail: 'Weekly Friday CS meetups, free.' },
              { name: 'TPL · Albion Library — STEM Mentors', kind: 'Drop-in', dist: '6 km', detail: 'Free 1:1 tutoring Sat afternoons.' },
              { name: 'Ontario Tech Future Scholars', kind: 'Scholarship', dist: '52 km', detail: '$5,000 · first-gen track.' },
              { name: 'Sheridan College · Sat. Design Studio', kind: 'Open day', dist: '14 km', detail: 'High-school portfolio reviews.' },
            ].map((r, i) => <ResourceRow key={i} r={r}/>)}
          </div>

          <Subhead>Open to anyone, anywhere</Subhead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Schoolhouse.world · Trig small-groups',  kind: 'Free tutoring', dist: 'Online', detail: 'Saturdays · 11am ET.' },
              { name: 'MIT OpenCourseWare · 18.01 Single Var.', kind: 'Course',        dist: 'Online', detail: 'Pre-calc bridge.' },
              { name: 'TKS · The Knowledge Society',            kind: 'Fellowship',    dist: 'Toronto + online', detail: 'Applications open Jan.' },
              { name: 'edX MicroBachelors · CS Fundamentals',   kind: 'Credit',        dist: 'Online', detail: 'Transfers to UofT.' },
            ].map((r, i) => <ResourceRow key={i} r={r}/>)}
          </div>
        </Section>

        {/* Action plan */}
        <Section kicker="04 · This term">
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 14px' }}>Six steps, by Friday.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { p: 'P0', t: 'Schoolhouse trig session · Sat 11am',           who: 'You',         when: 'This week' },
              { p: 'P0', t: 'Visit Ms. Lavoie · Wed 3:15 office hours',      who: 'You',         when: 'This week' },
              { p: 'P1', t: 'Submit Shopify summer intern résumé',           who: 'You + agent', when: 'By Dec 1' },
              { p: 'P1', t: 'Apply: Future Launch Scholar (RBC)',            who: 'You',         when: 'By Nov 30' },
              { p: 'P2', t: 'Book Sheridan portfolio open day',              who: 'Counselor',   when: 'Dec' },
              { p: 'P2', t: 'Pause Cursor or Copilot (overlap)',             who: 'You',         when: 'Anytime' },
            ].map((a, i) => (
              <div key={i} style={{
                padding: '12px 14px', background: 'var(--card)', borderRadius: 12,
                border: '1px solid var(--hairline)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span className="mono" style={{
                  fontSize: 10, fontWeight: 600, color: a.p === 'P0' ? 'var(--sun-deep)' : a.p === 'P1' ? 'var(--ink)' : 'var(--ink-3)',
                  background: a.p === 'P0' ? 'var(--sun-bg)' : 'var(--bg-soft)',
                  padding: '3px 7px', borderRadius: 4, letterSpacing: 0.04,
                }}>{a.p}</span>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500, textWrap: 'pretty' }}>{a.t}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{a.who}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-4)' }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Counselor next */}
        <div style={{ padding: '8px 16px 30px' }}>
          <div style={{ padding: 18, background: 'var(--ink)', color: 'white', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,194,7,0.4), transparent 65%)' }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: 8 }}>What happens next</div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 8px', textWrap: 'pretty' }}>
                A copy is on its way to <span style={{ color: 'var(--sun-yellow)' }}>Ms. Diallo</span>.
              </h3>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 16 }}>
                Your guidance counselor reviews it, suggests edits, then you meet. We re-run this whole thing automatically at the end of each term.
              </div>
              <button style={{
                padding: '10px 16px', borderRadius: 10,
                background: 'var(--sun-grad)', color: 'white', border: 0, cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--display-stack)',
                boxShadow: 'var(--shadow-sun)',
              }}>
                Book a meeting with Ms. Diallo <Icon.arrow/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pathways data ────────────────────────────────────────────

const PATHWAYS = [
  {
    title: 'University of Waterloo · Software Engineering',
    type: 'University · co-op',
    fit: 82,
    distance: '102 km',
    cost: '$17.4k/yr after Waterloo Promise + entrance scholarship',
    why: 'Your CS grade and shipped projects (Stripe, Discord bot, 80+ users) clear the bar. Waterloo Promise covers the income-gap differential. The 5-year co-op pays you to learn — and your job history reads as ready.',
    gaps: 'MCR3U1 needs 80+ for the SE program specifically. Recommend Calculus AYC4U for senior year.',
    next: ['Lift Functions to 80+ this term', 'Apply early-round in October Grade 12', 'AIF essay draft by Sept'],
    badges: ['Co-op pays', 'First-gen support', 'In Canada'],
    tone: 'sun',
  },
  {
    title: 'Sheridan College · Bachelor of Interaction Design',
    type: 'Hybrid degree · 4 yr',
    fit: 78,
    distance: '14 km',
    cost: '$8.2k/yr · Pell-equivalent + OSAP grant',
    why: 'Closest, cheapest, and your design instinct (catering site, brand work) is exactly the portfolio they want. Hybrid degree means you keep the Tim Hortons job if you want.',
    gaps: 'Need a 6-piece design portfolio by March. We can help shape it from your current projects.',
    next: ['Open day Dec 7', 'Portfolio review with Allumino · Dec', 'Apply by Feb 1'],
    badges: ['Stay home', 'Lowest cost', 'Portfolio path'],
    tone: 'teal',
  },
  {
    title: 'MIT · CS & EECS (international)',
    type: 'University · 4 yr',
    fit: 64,
    distance: '755 km',
    cost: '$0 — MIT need-blind covers full ride at your bracket',
    why: 'Lower fit on raw stats, but your project velocity is rare and they read for it. Need-blind admissions means cost is genuinely zero at your income.',
    gaps: 'SAT or ACT this spring. Two letters from teachers who know the project work, not just grades. MCR3U1 to 90+.',
    next: ['SAT registration · March 14', 'Talk to Ms. Lavoie about a letter', 'Common App opens Aug'],
    badges: ['Need-blind', 'Stretch', 'International'],
    tone: 'navy',
  },
  {
    title: 'Industry year · Shopify Dev Degree',
    type: 'Paid 4-yr degree · Carleton',
    fit: 75,
    distance: '450 km · Ottawa',
    cost: '$0 — Shopify pays tuition + $50k salary',
    why: 'Wild card, very strong fit. You\'re already applying for the summer intern role — this is the 4-year version. Dev Degree pays you and gives you the credential.',
    gaps: 'Need the summer internship offer first. Functions grade is a footnote, the work matters more.',
    next: ['Submit summer intern app · Dec 1', 'Whiteboard prep · Jan', 'Apply Dev Degree · Mar'],
    badges: ['Paid degree', 'Industry first', 'Wild card'],
    tone: 'green',
  },
];

function PathwayCard({ p, idx, open, onToggle }) {
  const toneStyles = {
    sun:   { bg: 'var(--sun-grad)', fg: 'white', stripeBg: 'rgba(255,255,255,0.18)' },
    teal:  { bg: 'var(--teal)',     fg: 'white', stripeBg: 'rgba(255,255,255,0.12)' },
    navy:  { bg: '#1A2F4A',         fg: 'white', stripeBg: 'rgba(255,255,255,0.12)' },
    green: { bg: '#1F5C3D',         fg: 'white', stripeBg: 'rgba(255,255,255,0.12)' },
  };
  const s = toneStyles[p.tone];
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 16,
      border: '1px solid var(--hairline)', overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        background: s.bg, color: s.fg, border: 0,
        padding: '16px 16px 14px', position: 'relative', overflow: 'hidden',
      }}>
        {p.tone === 'sun' && (
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 65%)' }}/>
        )}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.78 }}>0{idx + 1} · {p.type}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: s.stripeBg }}>Fit {p.fit}</span>
          </div>
          <div className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8, textWrap: 'pretty' }}>
            {p.title}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.badges.map(b => (
              <span key={b} style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 999, background: s.stripeBg, letterSpacing: 0.02 }}>{b}</span>
            ))}
          </div>
        </div>
      </button>

      {/* Meta line */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: open ? '1px solid var(--hairline)' : 'none' }}>
        <div style={{ padding: '10px 14px', borderRight: '1px solid var(--hairline)' }}>
          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Distance</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{p.distance}</div>
        </div>
        <div style={{ padding: '10px 14px' }}>
          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Your cost</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2, textWrap: 'pretty' }}>{p.cost}</div>
        </div>
      </div>

      {open && (
        <div style={{ padding: '14px 16px 16px' }} className="fade-in">
          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Why we matched you</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: '0 0 12px', color: 'var(--ink-2)', textWrap: 'pretty' }}>{p.why}</p>

          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Gaps to close</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: '0 0 12px', color: 'var(--ink-2)', textWrap: 'pretty' }}>{p.gaps}</p>

          <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Next steps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {p.next.map((n, i) => (
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

// ─── Smaller pieces ───────────────────────────────────────────

function Section({ kicker, children, hairline }) {
  return (
    <div style={{
      padding: '24px 22px 8px',
      borderTop: hairline ? '1px solid var(--hairline)' : 'none',
      marginTop: hairline ? 8 : 0,
    }}>
      {kicker && <div style={{ fontSize: 11, color: 'var(--sun-deep)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>{kicker}</div>}
      {children}
    </div>
  );
}

function Subhead({ children }) {
  return (
    <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>{children}</div>
  );
}

function StatBlock({ label, value, tone, note }) {
  const color = tone === 'up' ? 'var(--green)' : tone === 'down' ? 'var(--sun-deep)' : 'var(--ink)';
  return (
    <div style={{
      padding: 14, background: 'var(--card)', borderRadius: 12,
      border: '1px solid var(--hairline)',
    }}>
      <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 2 }}>{label}</div>
      <div className="display" style={{ fontSize: 24, fontWeight: 600, color, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{note}</div>
    </div>
  );
}

function Callout({ tone = 'warn', children }) {
  const styles = {
    warn: { bg: 'var(--sun-bg)', fg: 'var(--sun-deep)', border: 'rgba(240,138,0,0.25)' },
    info: { bg: 'var(--teal-bg)', fg: 'var(--teal)', border: 'rgba(31,74,74,0.18)' },
  };
  const s = styles[tone];
  return (
    <div style={{
      padding: 14, background: s.bg, borderRadius: 12,
      border: `1px solid ${s.border}`,
      fontSize: 13, lineHeight: 1.5, color: s.fg, textWrap: 'pretty',
    }}>{children}</div>
  );
}

function ResourceRow({ r }) {
  return (
    <div style={{
      padding: 12, background: 'var(--card)', borderRadius: 12,
      border: '1px solid var(--hairline)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, textWrap: 'pretty' }}>{r.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 1 }}>{r.detail}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <Pill tone={r.kind === 'Scholarship' ? 'pending' : 'neutral'}>{r.kind}</Pill>
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 4 }}>{r.dist}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Report, PATHWAYS });
