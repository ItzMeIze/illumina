// Grade analysis — editorial line chart with agent annotations

function Grades({ go }) {
  const courses = [
    { code: 'MCR3U1', name: 'Functions', avg: 64, trend: -30, status: 'attention' },
    { code: 'ICS3U1', name: 'Intro to Computer Science', avg: 96, trend: +4, status: 'strong' },
    { code: 'ENG3U1', name: 'English', avg: 88, trend: +2, status: 'good' },
    { code: 'CHV2O1', name: 'Civics & Citizenship', avg: 91, trend: 0, status: 'good' },
    { code: 'BBI2O1', name: 'Intro to Business', avg: 85, trend: -1, status: 'good' },
    { code: 'FSF3U1', name: 'Core French',  avg: 79, trend: -3, status: 'good' },
  ];

  return (
    <div className="app-surface">
      {/* Back header */}
      <div style={{ padding: '52px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => go('home')} style={backBtn}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>MCR3U1</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em' }}>Functions</div>
        </div>
        <Pill tone="pending" icon={<Icon.trend_down/>}>Attention</Pill>
      </div>

      <div className="scroll-y" style={{ padding: '4px 16px 24px' }}>

        {/* Big number */}
        <div style={{ padding: '8px 4px 16px' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Current average</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div className="serif" style={{ fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--terra)' }}>64<span style={{ fontSize: 28, color: 'var(--ink-4)' }}>%</span></div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
              <div style={{ color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon.trend_down/> −30 over 6 wks</div>
              <div style={{ marginTop: 2, color: 'var(--ink-4)' }}>vs class median 78</div>
            </div>
          </div>
        </div>

        {/* Editorial chart */}
        <ChartEditorial/>

        {/* Diagnosis */}
        <div style={{
          marginTop: 16, padding: 16,
          background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--hairline)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'var(--ink)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fraunces, serif', fontSize: 10,
            }}>Ac</div>
            <span style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Counselor note</span>
          </div>
          <div className="serif" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: 10, textWrap: 'pretty' }}>
            The drop is almost entirely <span style={{ color: 'var(--terra)' }}>Trigonometric Ratios</span> — units 1 and 2 were fine.
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
            Two missed homeworks (Oct 28, Nov 4) and the Nov 11 test had pages 4 and 5 blank — likely you ran out of time on the proofs section. Trig builds on itself, so without intervention this likely continues into Vectors.
          </div>
          <button onClick={() => go('chat')} style={{
            marginTop: 14, width: '100%', height: 44, borderRadius: 12,
            background: 'var(--ink)', color: 'white', border: 0,
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Talk to my counselor <Icon.arrow/>
          </button>
        </div>

        {/* Other courses */}
        <SectionHead kicker="Fall term 2026" title="All courses"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {courses.map((c, i) => (
            <div key={i} style={{
              padding: '12px 14px', background: 'var(--card)', borderRadius: 12,
              border: '1px solid ' + (c.status === 'attention' ? 'var(--terra-bg)' : 'var(--hairline)'),
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)' }}>{c.code}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11.5, color: c.trend < 0 ? 'var(--terra)' : c.trend > 0 ? 'var(--green)' : 'var(--ink-3)', marginTop: 3 }}>
                  {c.trend > 0 ? '↑' : c.trend < 0 ? '↓' : '—'} {Math.abs(c.trend)} {c.trend === 0 ? 'flat' : 'pts this term'}
                </div>
              </div>
              <div className="serif" style={{
                fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em',
                color: c.status === 'attention' ? 'var(--terra)' : 'var(--ink)',
                minWidth: 40, textAlign: 'right',
              }}>{c.avg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartEditorial() {
  const data = [
    { x: 'Sep 16', g: 94, label: 'Unit 1' },
    { x: 'Sep 30', g: 91, label: 'HW 2' },
    { x: 'Oct 14', g: 87, label: 'Unit 2' },
    { x: 'Oct 28', g: 82, label: 'HW 3' },
    { x: 'Nov 11', g: 74, label: 'Quiz' },
    { x: 'Nov 18', g: 64, label: 'Unit 3' },
  ];
  const median = [78, 78, 79, 79, 78, 78];

  const W = 340, H = 220, P = { l: 28, r: 16, t: 24, b: 36 };
  const innerW = W - P.l - P.r;
  const innerH = H - P.t - P.b;
  const max = 100, min = 50;
  const xs = data.map((_, i) => P.l + (i / (data.length - 1)) * innerW);
  const y = v => P.t + innerH - ((v - min) / (max - min)) * innerH;

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${y(d.g).toFixed(1)}`).join(' ');
  const area = `${path} L ${xs[data.length-1]} ${P.t+innerH} L ${xs[0]} ${P.t+innerH} Z`;
  const medianPath = median.map((m, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${y(m).toFixed(1)}`).join(' ');

  return (
    <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--hairline)', padding: '14px 8px 8px', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ padding: '0 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Six-week trend</div>
        <div style={{ display: 'flex', gap: 12, fontSize: 10.5, color: 'var(--ink-3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 2, background: 'var(--terra)', borderRadius: 1 }}/> You
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 2, background: 'var(--ink-4)', borderRadius: 1, borderStyle: 'dashed' }}/> Class median
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="grade-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C85A2E" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="#C85A2E" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* y grid */}
        {[60, 70, 80, 90, 100].map(v => (
          <g key={v}>
            <line x1={P.l} x2={W-P.r} y1={y(v)} y2={y(v)} stroke="var(--hairline)" strokeWidth="0.5"/>
            <text x={P.l - 6} y={y(v) + 3} fontSize="9" fill="var(--ink-4)" textAnchor="end" fontFamily="Geist Mono, monospace">{v}</text>
          </g>
        ))}

        {/* median dashed */}
        <path d={medianPath} fill="none" stroke="var(--ink-4)" strokeWidth="1" strokeDasharray="3 3"/>

        {/* area */}
        <path d={area} fill="url(#grade-area)"/>

        {/* main line */}
        <path d={path} fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={xs[i]} cy={y(d.g)} r={i === data.length - 1 ? 5 : 3} fill="white" stroke="var(--terra)" strokeWidth={i === data.length - 1 ? 2.5 : 1.5}/>
            {(i === 0 || i === 2 || i === data.length - 1) && (
              <text x={xs[i]} y={y(d.g) - 10} fontSize="11" fill="var(--ink)" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="500">{d.g}</text>
            )}
            <text x={xs[i]} y={H - 20} fontSize="9" fill="var(--ink-4)" textAnchor="middle" fontFamily="Geist Mono, monospace">{d.x}</text>
            <text x={xs[i]} y={H - 8} fontSize="8.5" fill="var(--ink-3)" textAnchor="middle" fontFamily="Geist, sans-serif">{d.label}</text>
          </g>
        ))}

        {/* Annotation callout — pointing at Nov 11 drop */}
        <g>
          <line x1={xs[4]} x2={xs[4] - 30} y1={y(74) + 6} y2={y(74) + 30} stroke="var(--ink-3)" strokeWidth="0.8"/>
          <rect x={xs[4] - 130} y={y(74) + 30} width="100" height="36" rx="6" fill="var(--ink)" />
          <text x={xs[4] - 80} y={y(74) + 45} fontSize="9.5" fill="white" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="500">Trig unit begins</text>
          <text x={xs[4] - 80} y={y(74) + 58} fontSize="9" fill="rgba(255,255,255,0.65)" textAnchor="middle" fontFamily="Geist, sans-serif">drop accelerates</text>
        </g>

        {/* End-point pulse */}
        <circle cx={xs[5]} cy={y(64)} r={10} fill="none" stroke="var(--terra)" strokeOpacity="0.3" strokeWidth="1">
          <animate attributeName="r" values="5;14;5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
}

const backBtn = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'var(--card)', border: '1px solid var(--hairline)',
  color: 'var(--ink-2)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

Object.assign(window, { Grades, backBtn });
