// Financial counselor — spending breakdown + agent note about SaaS/hardware velocity

function Finance({ go }) {
  const total = 268;       // spent this month
  const income = 450;
  const cats = [
    { name: 'SaaS & tools',     amt: 84,  pct: 31, color: '#C85A2E', note: '↑ 38%', tone: 'warn',    items: ['Cursor Pro', 'Notion', 'Linear', 'GitHub Copilot', 'ChatGPT Plus'] },
    { name: 'Hardware',          amt: 62,  pct: 23, color: '#1F4A4A', note: '1 purchase', items: ['Used mech keyboard'] },
    { name: 'Food & coffee',     amt: 48,  pct: 18, color: '#B89070', note: '↓ 12%', items: ['Lunches · 14', 'Starbucks · 6'] },
    { name: 'Transit',           amt: 36,  pct: 13, color: '#3D3D3A', note: 'PRESTO', items: ['TTC monthly'] },
    { name: 'Books & learning',  amt: 22,  pct: 8,  color: '#7A4A20', note: 'OK', items: ['SAT prep workbook', 'Hum. anatomy'] },
    { name: 'Other',             amt: 16,  pct: 6,  color: '#9C9C92', note: '', items: ['Birthday gift'] },
  ];

  return (
    <div className="app-surface">
      <div style={{ padding: '52px 16px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => go('home')} style={backBtn}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>November 2026</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em' }}>Money</div>
        </div>
        <Pill tone="teal">Healthy</Pill>
      </div>

      <div className="scroll-y" style={{ padding: '4px 16px 24px' }}>

        {/* Hero number */}
        <div style={{ padding: '12px 4px 18px' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Spent this month</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <div className="serif" style={{ fontSize: 52, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1 }}>
              ${total}<span style={{ fontSize: 22, color: 'var(--ink-4)' }}>.40</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>of <span style={{ color: 'var(--ink)' }}>${income}</span><br/><span style={{ color: 'var(--ink-4)' }}>income</span></div>
          </div>

          {/* Stacked bar */}
          <div style={{
            height: 12, borderRadius: 6, overflow: 'hidden',
            display: 'flex', background: 'var(--hairline)',
            border: '1px solid var(--hairline)',
          }}>
            {cats.map((c, i) => (
              <div key={i} style={{ width: `${(c.amt / total) * 100}%`, background: c.color }}/>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10.5, color: 'var(--ink-4)' }}>
            <span>0</span>
            <span style={{ color: 'var(--green)' }}>$182 saved</span>
            <span>${income}</span>
          </div>
        </div>

        {/* Agent note — SaaS velocity */}
        <div style={{
          padding: 16, background: 'var(--ink)', color: 'white',
          borderRadius: 16, position: 'relative', overflow: 'hidden',
          marginBottom: 14,
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,122,77,0.3), transparent 70%)',
          }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fraunces, serif', fontSize: 10,
            }}>Fi</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Financial counselor</span>
          </div>
          <div className="serif" style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.01em', position: 'relative', textWrap: 'pretty' }}>
            Your SaaS spend is moving fast — five subscriptions in five weeks, now <span style={{ color: 'var(--terra-2)' }}>31% of your spend</span>.
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, position: 'relative' }}>
            Cursor + Copilot overlap. ChatGPT Plus is unused 11 days. Pausing those two saves $32/month — a year of <span style={{ color: 'white' }}>SAT prep books</span>.
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, position: 'relative' }}>
            <button onClick={() => go('chat')} style={{
              flex: 1, height: 38, borderRadius: 10, border: 0,
              background: 'var(--terra)', color: 'white',
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}>Show me which to pause</button>
            <button style={{
              height: 38, padding: '0 14px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: 'white',
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}>Not now</button>
          </div>
        </div>

        {/* Categories */}
        <SectionHead kicker="Breakdown" title="Where it went"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cats.map((c, i) => <CatRow key={i} c={c} total={total}/>)}
        </div>

        {/* Income + recurring */}
        <SectionHead kicker="Verified income" title="Sources"/>
        <div style={{ padding: 14, background: 'var(--card)', borderRadius: 14, border: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph bg="#7A1F2A">TH</Glyph>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Tim Hortons</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>~12 hrs/week · biweekly</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="serif" style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em' }}>$450</div>
              <div style={{ fontSize: 10.5, color: 'var(--green)' }}>verified</div>
            </div>
          </div>
        </div>

        <div style={{ height: 12 }}/>
      </div>
    </div>
  );
}

function CatRow({ c, total }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 12,
      border: '1px solid var(--hairline)',
      overflow: 'hidden',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'transparent', border: 0, cursor: 'pointer',
        padding: '12px 14px', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</span>
            {c.tone === 'warn' && <Pill tone="warn"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Icon.warn/> {c.note}</span></Pill>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{c.pct}% of spend</div>
        </div>
        <div className="serif" style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em' }}>${c.amt}</div>
      </button>
      {open && (
        <div style={{ padding: '4px 14px 12px', borderTop: '1px dashed var(--hairline)' }}>
          {c.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, color: 'var(--ink-2)' }}>
              <span>{it}</span>
              <span className="mono" style={{ color: 'var(--ink-4)' }}>—</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Finance });
