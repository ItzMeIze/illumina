// Chat — Telegram-style with the Academic Counselor, includes approval card

function Chat({ go }) {
  const [messages, setMessages] = React.useState(() => initialMessages());
  const [input, setInput] = React.useState('');
  const [showApproval, setShowApproval] = React.useState(false);
  const [approvalState, setApprovalState] = React.useState('idle'); // idle | approved | aborted
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  function send(text) {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'me', text, time: 'now' }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      if (text.toLowerCase().startsWith('/diagnose') || text.toLowerCase().includes('math') || text.toLowerCase().includes('functions')) {
        setMessages(m => [...m,
          { from: 'agent', text: "I pulled the last six Functions assignments. The drop is concentrated in unit 3 — Trigonometric Ratios. Two missed homeworks (Oct 28, Nov 4) and a test where the back two pages were blank.", time: 'now' },
          { from: 'agent', kind: 'card-chart' },
          { from: 'agent', text: "Three things worth trying. I'd start with the first — Ms. Lavoie holds office hours Wednesday after school.", time: 'now' },
          { from: 'agent', kind: 'actions' },
        ]);
      } else if (text.toLowerCase().includes('tutor') || text.toLowerCase().includes('book')) {
        setMessages(m => [...m,
          { from: 'agent', text: "Schoolhouse.world has a free trig small-group session this Saturday, 11am. The tutor (Anika, university junior) gets 4.9★. Want me to reserve it?", time: 'now' },
          { from: 'agent', kind: 'approval' },
        ]);
        setTimeout(() => setShowApproval(true), 600);
      } else {
        setMessages(m => [...m, { from: 'agent', text: "Got it. Anything else you'd like me to look into?", time: 'now' }]);
      }
    }, 1100);
  }

  const slashes = [
    { cmd: '/diagnose',     hint: 'find a grade trend' },
    { cmd: '/optimize_job', hint: 'tailor résumé' },
    { cmd: '/budget',       hint: 'review spending' },
    { cmd: '/draft_email',  hint: 'write to a teacher' },
  ];

  return (
    <div className="app-surface" style={{ background: 'var(--bg-soft)' }}>
      {/* Chat header */}
      <div style={{
        padding: '54px 16px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--bg-blur)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--hairline)',
        position: 'relative', zIndex: 5,
      }}>
        <button onClick={() => go('home')} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'transparent', border: 0, cursor: 'pointer',
          color: 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--ink)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 500,
        }}>Ac</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.1 }}>Academic Counselor</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}/>
            Online · reading your grades
          </div>
        </div>
        <button style={{
          width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: 0,
          color: 'var(--ink-3)', cursor: 'pointer',
        }}><Icon.more/></button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scroll-y" style={{ padding: '16px 14px 8px' }}>
        <div style={{
          textAlign: 'center', fontSize: 11, color: 'var(--ink-4)',
          letterSpacing: '0.05em', marginBottom: 14,
        }}>Today · 3:42 PM</div>

        {messages.map((m, i) => <Bubble key={i} m={m} go={go} onSelect={(cmd) => send(cmd)}/>)}

        {typing && <Typing/>}
      </div>

      {/* Quick slash commands */}
      <div style={{
        padding: '8px 12px 4px', display: 'flex', gap: 6, overflowX: 'auto',
        background: 'var(--bg-blur)', backdropFilter: 'blur(10px)',
      }}>
        {slashes.map(s => (
          <button key={s.cmd} onClick={() => setInput(s.cmd + ' ')} style={{
            padding: '7px 12px', borderRadius: 999,
            background: 'var(--card)', border: '1px solid var(--hairline-strong)',
            display: 'flex', alignItems: 'center', gap: 5,
            flexShrink: 0, cursor: 'pointer',
          }}>
            <span className="mono" style={{ fontSize: 11.5, color: 'var(--terra)' }}>{s.cmd}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>{s.hint}</span>
          </button>
        ))}
      </div>

      {/* Composer */}
      <div style={{
        padding: '8px 12px 22px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--hairline)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          background: 'var(--card)', borderRadius: 22,
          padding: '4px 4px 4px 14px',
          border: '1px solid var(--hairline-strong)',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Message your counselor…"
            style={{
              flex: 1, border: 0, outline: 0, background: 'transparent',
              fontSize: 14, fontFamily: 'Geist, system-ui', padding: '8px 4px',
              color: 'var(--ink)',
            }}/>
          <button onClick={() => send(input)} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: input.trim() ? 'var(--terra)' : 'var(--ink-4)',
            color: 'white', border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s',
          }}><Icon.send/></button>
        </div>
      </div>

      {/* Approval overlay */}
      {showApproval && (
        <ApprovalSheet
          state={approvalState}
          onApprove={() => {
            setApprovalState('approved');
            setTimeout(() => {
              setShowApproval(false);
              setApprovalState('idle');
              setMessages(m => [...m, { from: 'agent', text: "Booked. Anika will message you Friday with the join link. Saturday 11am, in your calendar.", time: 'now' }, { from: 'agent', kind: 'booking' }]);
            }, 1500);
          }}
          onAbort={() => { setShowApproval(false); setApprovalState('idle'); }}
        />
      )}
    </div>
  );
}

function initialMessages() {
  return [
    { from: 'agent', text: "Hi Maya — I'm your Academic Counselor. I keep an eye on patterns in your courses and help you make calls about them. You're always the one who decides.", time: '3:42 PM' },
    { from: 'agent', text: "One thing I want to flag from today: your Functions grade has gone 94 → 82 → 64 over the last three units.", time: '3:42 PM' },
    { from: 'agent', kind: 'card-summary' },
    { from: 'agent', text: "Want me to diagnose what's happening?", time: '3:43 PM' },
    { from: 'agent', kind: 'quick-replies' },
  ];
}

function Bubble({ m, go, onSelect }) {
  if (m.from === 'me') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <div style={{
          maxWidth: '75%', background: 'var(--ink)', color: 'white',
          padding: '10px 14px', borderRadius: '18px 18px 4px 18px',
          fontSize: 14, lineHeight: 1.4, textWrap: 'pretty',
        }}>{m.text}</div>
      </div>
    );
  }
  // Agent
  if (m.kind === 'card-summary') return <SummaryCard go={go}/>;
  if (m.kind === 'card-chart')   return <InlineChart go={go}/>;
  if (m.kind === 'quick-replies') return <QuickReplies onSelect={onSelect}/>;
  if (m.kind === 'actions')      return <ActionList go={go} onSelect={onSelect}/>;
  if (m.kind === 'approval')     return <ApprovalCardInline/>;
  if (m.kind === 'booking')      return <BookingCard/>;

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'var(--ink)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Fraunces, serif', fontSize: 10, flexShrink: 0,
        marginBottom: 2,
      }}>Ac</div>
      <div style={{
        maxWidth: '78%', background: 'var(--card)',
        padding: '10px 14px', borderRadius: '18px 18px 18px 4px',
        fontSize: 14, lineHeight: 1.45, color: 'var(--ink)',
        border: '1px solid var(--hairline)',
        textWrap: 'pretty',
      }}>{m.text}</div>
    </div>
  );
}

function Typing() {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'var(--ink)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Fraunces, serif', fontSize: 10,
      }}>Ac</div>
      <div style={{
        padding: '12px 14px', background: 'var(--card)',
        borderRadius: '18px 18px 18px 4px',
        border: '1px solid var(--hairline)',
        display: 'flex', gap: 4,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ink-4)',
            animation: `typing 1.2s ${i*0.15}s infinite`,
          }}/>
        ))}
      </div>
      <style>{`@keyframes typing { 0%,60%,100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }`}</style>
    </div>
  );
}

function SummaryCard({ go }) {
  return (
    <div style={{ marginBottom: 10, marginLeft: 32 }}>
      <button onClick={() => go('grades')} style={{
        width: '100%', textAlign: 'left',
        background: 'var(--card)', borderRadius: 16,
        padding: 14, border: '1px solid var(--hairline)',
        cursor: 'pointer', boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>MCR3U1 · Functions</div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>Three-unit drop detected</div>
          </div>
          <Pill tone="pending" icon={<Icon.trend_down/>}>−30 pts</Pill>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 4 }}>
          {[{u:'Unit 1', g:94}, {u:'Unit 2', g:82}, {u:'Unit 3', g:64}].map((x, i) => (
            <div key={i} style={{
              padding: '8px 10px', borderRadius: 8,
              background: i === 2 ? 'var(--terra-bg)' : 'var(--bg-soft)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 2 }}>{x.u}</div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: i === 2 ? 'var(--terra)' : 'var(--ink)' }}>{x.g}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 4 }}>
          Open full analysis <Icon.arrow/>
        </div>
      </button>
    </div>
  );
}

function InlineChart({ go }) {
  const pts = [94, 91, 87, 82, 74, 64];
  const w = 280, h = 90, max = 100, min = 50;
  const xs = pts.map((_, i) => 16 + (i / (pts.length - 1)) * (w - 32));
  const ys = pts.map(p => h - 10 - ((p - min) / (max - min)) * (h - 24));
  const path = pts.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i]} ${ys[i]}`).join(' ');
  return (
    <div style={{ marginBottom: 10, marginLeft: 32 }}>
      <div style={{
        background: 'var(--card)', borderRadius: 16, padding: 14,
        border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Trig ratios concentration</div>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
          <line x1="16" x2={w-16} y1={h-10} y2={h-10} stroke="var(--hairline)" strokeWidth="1"/>
          <path d={path} fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={xs[i]} cy={ys[i]} r={3} fill="white" stroke="var(--terra)" strokeWidth="1.6"/>
              {(i === 0 || i === pts.length - 1) && (
                <text x={xs[i]} y={ys[i] - 10} fontSize="10" fill="var(--ink-2)" textAnchor="middle" fontFamily="Geist, sans-serif">{p}</text>
              )}
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.4 }}>
          Missed: Oct 28 HW · Nov 4 HW · Nov 11 test (pp. 4–5 blank).
        </div>
      </div>
    </div>
  );
}

function QuickReplies({ onSelect }) {
  const opts = ['Yes, diagnose', 'Show the grades first', 'Not now'];
  return (
    <div style={{ marginLeft: 32, marginBottom: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {opts.map(o => (
        <button key={o} onClick={() => onSelect(o)} style={{
          padding: '8px 14px', borderRadius: 999,
          background: 'var(--card)', color: 'var(--terra)',
          border: '1px solid var(--terra-bg)',
          fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
        }}>{o}</button>
      ))}
    </div>
  );
}

function ActionList({ go, onSelect }) {
  const actions = [
    { i: 1, t: 'Visit Ms. Lavoie\'s office hours Wed 3:15', tag: 'No cost · 1 hour' },
    { i: 2, t: 'Book a Schoolhouse trig session', tag: 'Free · Sat 11am', cta: true },
    { i: 3, t: 'Re-do practice from chapter 3 (worksheet)', tag: '30 min · solo' },
  ];
  return (
    <div style={{ marginLeft: 32, marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {actions.map(a => (
        <button key={a.i} onClick={() => a.cta && onSelect('Book the tutoring session')} style={{
          textAlign: 'left', background: 'var(--card)',
          padding: 12, borderRadius: 12,
          border: '1px solid ' + (a.cta ? 'var(--terra)' : 'var(--hairline)'),
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: a.cta ? 'var(--terra)' : 'var(--bg-soft)',
            color: a.cta ? 'white' : 'var(--ink-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, flexShrink: 0,
          }}>{a.i}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{a.t}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{a.tag}</div>
          </div>
          {a.cta && <Icon.arrow style={{ color: 'var(--terra)' }}/>}
        </button>
      ))}
    </div>
  );
}

function ApprovalCardInline() {
  return (
    <div style={{ marginLeft: 32, marginBottom: 10 }}>
      <div style={{
        padding: 12, background: 'var(--bg-soft)',
        borderRadius: 12, fontSize: 11.5, color: 'var(--ink-3)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon.shield style={{ color: 'var(--teal)' }}/> Approval request opening…
      </div>
    </div>
  );
}

function BookingCard() {
  return (
    <div style={{ marginLeft: 32, marginBottom: 10 }}>
      <div style={{
        background: 'var(--green-bg)', borderRadius: 14, padding: 14,
        border: '1px solid rgba(46,125,91,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: 'var(--green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.check/></div>
          <span style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Booked</span>
        </div>
        <div className="serif" style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>Trig Small Group · Sat Nov 22, 11am</div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>Anika R. · Schoolhouse.world · ★ 4.9</div>
      </div>
    </div>
  );
}

// ─── APPROVAL SHEET ─────────────────────────────────────────────

function ApprovalSheet({ state, onApprove, onAbort }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      background: 'rgba(20,20,18,0.45)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'fadeIn .2s',
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp2 { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      <div style={{
        width: '100%', background: 'var(--bg)',
        borderRadius: '24px 24px 0 0', padding: '8px 18px 30px',
        animation: 'slideUp2 .3s cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ width: 38, height: 4, background: 'var(--ink-4)', borderRadius: 2, margin: '8px auto 18px' }}/>

        {state === 'approved' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--green-bg)', color: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 18px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Approved</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Signed with your wallet. Booking now…</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon.shield style={{ color: 'var(--teal)' }}/>
              <span style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Approval requested</span>
            </div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 6 }}>
              Reserve Schoolhouse trig session
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 18 }}>
              Your Academic Counselor is asking to book a free session on your behalf and add it to your calendar.
            </div>

            {/* Receipt-style detail */}
            <div style={{
              background: 'var(--card)', borderRadius: 14, padding: 14,
              border: '1px solid var(--hairline)', marginBottom: 14,
            }}>
              {[
                ['Provider', 'Schoolhouse.world'],
                ['Session',  'Trigonometric Ratios (small group)'],
                ['When',     'Sat Nov 22 · 11:00 AM ET'],
                ['Tutor',    'Anika R. · ★ 4.9 · 142 sessions'],
                ['Cost',     <span style={{color:'var(--green)'}}>Free</span>],
                ['Payment',  'x402 · no transfer'],
              ].map(([k,v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < arr.length - 1 ? '1px dashed var(--hairline)' : 'none',
                  fontSize: 13,
                }}>
                  <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                  <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* What will happen */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>This will</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'Share your first name and grade level',
                  'Create a calendar event in your wallet',
                  'Notify you 1 hour before the session',
                ].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--ink-2)' }}>
                    <div style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }}><Icon.check/></div>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8 }}>
              <button onClick={onAbort} style={{
                height: 52, border: '1px solid var(--hairline-strong)',
                background: 'var(--card)', color: 'var(--ink-2)',
                borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>Abort</button>
              <button onClick={onApprove} style={{
                height: 52, border: 0,
                background: 'var(--green)', color: 'white',
                borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 6px 18px rgba(46,125,91,0.32)',
              }}>
                <Icon.check/> Approve & sign
              </button>
            </div>

            <div style={{ fontSize: 11, color: 'var(--ink-4)', textAlign: 'center', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <Icon.shield/> Signed with your wallet · revocable any time
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Chat });
