// Administrator dashboard — Ms. Diallo's view of her caseload + meetings + report reviews.
// Built for desktop. Phone version is a simplified list.

function AdminDesktop({ onExitRole }) {
  const [studentIdx, setStudentIdx] = React.useState(0);
  const student = STUDENTS[studentIdx];

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: 'var(--bg)',
      fontFamily: 'var(--body-stack)',
      color: 'var(--ink)',
    }}>
      {/* Sidebar — caseload */}
      <div style={{
        width: 280, flexShrink: 0, padding: '14px 0',
        background: 'var(--bg-tint)',
        borderRight: '1px solid var(--hairline)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '4px 16px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--hairline)' }}>
          <AlluminoMark size={26} fill="var(--sun-orange)"/>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>allumino</div>
            <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>Counselor portal</div>
          </div>
        </div>

        {/* Counselor identity */}
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--hairline)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4A6B5D, #2F4A40)',
            color: 'white', fontWeight: 600, fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--display-stack)',
          }}>SD</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Ms. Sarah Diallo</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Guidance · Etobicoke CI</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '14px 16px 8px', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Caseload · {STUDENTS.length}</div>

        <div style={{ padding: '0 12px 4px', display: 'flex', gap: 4, marginBottom: 6 }}>
          {['All', 'Action', 'Pending', 'Quiet'].map((t, i) => (
            <button key={t} style={{
              flex: 1, padding: '5px 8px', fontSize: 11, borderRadius: 6,
              border: 0, background: i === 1 ? 'var(--ink)' : 'transparent',
              color: i === 1 ? 'white' : 'var(--ink-3)', cursor: 'pointer',
              fontWeight: 500,
            }}>{t}</button>
          ))}
        </div>

        {/* Student list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          {STUDENTS.map((s, i) => (
            <button key={s.id} onClick={() => setStudentIdx(i)} style={{
              width: '100%', textAlign: 'left',
              padding: '10px 10px', margin: '0 0 2px', borderRadius: 8,
              background: i === studentIdx ? 'rgba(240,138,0,0.10)' : 'transparent',
              border: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: s.avatarBg, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, flexShrink: 0,
                fontFamily: 'var(--display-stack)',
              }}>{s.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <span style={{ fontSize: 12.5, fontWeight: i === studentIdx ? 600 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                  {s.flag === 'action' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sun-orange)', flexShrink: 0 }}/>}
                  {s.flag === 'pending' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ink-4)', flexShrink: 0 }}/>}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.grade} · {s.flagReason}</div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={onExitRole} style={{
          margin: '8px 12px 0', padding: '8px 10px',
          background: 'rgba(26,26,26,0.05)', border: '0.5px solid var(--hairline-strong)',
          borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11.5, color: 'var(--ink-2)',
        }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M11 1H4a1 1 0 00-1 1v12a1 1 0 001 1h7M7 8h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Exit counselor mode
        </button>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AdminTopbar/>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <StudentDetail s={student}/>
        </div>
      </div>

      {/* Right rail — today's meetings */}
      <AdminRightRail/>
    </div>
  );
}

function AdminTopbar() {
  return (
    <div style={{
      height: 44, padding: '0 18px',
      borderBottom: '1px solid var(--hairline)',
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'var(--bg-blur)', backdropFilter: 'blur(12px)',
    }}>
      <div className="display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>Caseload</div>
      <div style={{ width: 1, height: 16, background: 'var(--hairline)' }}/>
      <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Tuesday · November 18, 2026</div>
      <div style={{ flex: 1 }}/>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 10px', borderRadius: 999,
        background: 'var(--sun-bg)', color: 'var(--sun-deep)',
        fontSize: 11, fontWeight: 500,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sun-orange)' }}/>
        3 reports awaiting review
      </span>
    </div>
  );
}

function StudentDetail({ s }) {
  return (
    <div style={{ padding: 22 }}>
      {/* Student header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: s.avatarBg, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 600, fontFamily: 'var(--display-stack)',
          letterSpacing: '-0.02em',
        }}>{s.initials}</div>
        <div style={{ flex: 1 }}>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.025em', margin: 0 }}>{s.name}</h1>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{s.grade} · {s.cohort} · enrolled {s.enrolled}</div>
        </div>
        <button style={{
          padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
          background: 'var(--card)', border: '0.5px solid var(--hairline-strong)',
          color: 'var(--ink)', cursor: 'pointer',
          fontFamily: 'var(--display-stack)',
        }}>Message family</button>
        <button style={{
          padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
          background: 'var(--sun-grad)', color: 'white', border: 0, cursor: 'pointer',
          boxShadow: 'var(--shadow-sun)',
          fontFamily: 'var(--display-stack)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          Book meeting <Icon.arrow/>
        </button>
      </div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 18 }}>
        {s.stats.map((m, i) => (
          <div key={i} style={{
            padding: 14, background: 'var(--card)', borderRadius: 12,
            border: '1px solid var(--hairline)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>{m.l}</div>
            <div className="display" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: m.tone === 'down' ? 'var(--sun-deep)' : m.tone === 'up' ? 'var(--green)' : 'var(--ink)' }}>{m.v}</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 2 }}>{m.n}</div>
          </div>
        ))}
      </div>

      {/* Two-col: report summary + intervention plan */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 18 }}>

        {/* Report */}
        <div style={{
          background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--hairline)', overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div className="sun-hero" style={{ padding: '16px 18px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Report v{s.reportVersion} · {s.reportDate}</div>
              <div className="display" style={{ fontSize: 18, fontWeight: 600, color: 'white', letterSpacing: '-0.02em', textWrap: 'pretty' }}>{s.reportHeadline}</div>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Allumino's matched pathways</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {s.pathways.map((p, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: 9,
                  background: i === 0 ? 'var(--sun-bg)' : 'var(--bg-soft)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span className="display" style={{ fontSize: 12, fontWeight: 600, color: 'var(--sun-deep)', minWidth: 28 }}>0{i+1}</span>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 500 }}>{p.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Fit {p.fit}</span>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-4)' }}>{p.cost}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Counselor decisions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {s.decisions.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--ink-2)' }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                    background: d.state === 'accepted' ? 'var(--green-bg)' : d.state === 'edited' ? 'var(--sun-bg)' : 'var(--bg-soft)',
                    color: d.state === 'accepted' ? 'var(--green)' : d.state === 'edited' ? 'var(--sun-deep)' : 'var(--ink-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {d.state === 'accepted' && <Icon.check/>}
                    {d.state === 'edited' && <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M1 12L12 1l3 3L4 15H1v-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ flex: 1 }}>{d.t}</span>
                  <Pill tone={d.state === 'accepted' ? 'verified' : d.state === 'edited' ? 'pending' : 'neutral'}>{d.state}</Pill>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--hairline)' }}>
              <button style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--ink)', color: 'white', border: 0, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--display-stack)' }}>Open full report</button>
              <button style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--card)', color: 'var(--ink-2)', border: '0.5px solid var(--hairline-strong)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>Edit and re-run</button>
              <div style={{ flex: 1 }}/>
              <span style={{ fontSize: 11, color: 'var(--ink-4)', alignSelf: 'center' }}>Next review {s.nextReview}</span>
            </div>
          </div>
        </div>

        {/* Counselor notes */}
        <div style={{
          background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--hairline)', padding: 16,
          display: 'flex', flexDirection: 'column',
        }}>
          <div className="display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>Your notes</div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 12 }}>Private · only visible to counselors</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {s.notes.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-4)', minWidth: 38, paddingTop: 2 }} className="mono">{n.date}</div>
                <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>{n.body}</div>
              </div>
            ))}
          </div>

          <button style={{
            marginTop: 12, padding: '10px 12px', borderRadius: 10,
            border: '1px dashed var(--hairline-strong)', background: 'var(--bg-soft)',
            fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer', textAlign: 'left',
          }}>+ Add a note about this meeting</button>
        </div>
      </div>

      {/* Term timeline */}
      <div style={{
        background: 'var(--card)', borderRadius: 14,
        border: '1px solid var(--hairline)', padding: 16, marginBottom: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 2 }}>Periodic review</div>
            <div className="display" style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em' }}>The year so far</div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Auto re-runs each report at term-end</span>
        </div>
        <ReviewTimeline s={s}/>
      </div>
    </div>
  );
}

function ReviewTimeline({ s }) {
  const events = s.timeline;
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', position: 'relative', minHeight: 100, padding: '8px 4px 0' }}>
      <div style={{ position: 'absolute', top: 24, left: 12, right: 12, height: 2, background: 'var(--hairline)' }}/>
      <div style={{ position: 'absolute', top: 24, left: 12, width: `calc(${(s.progress) * 100}% - 12px)`, height: 2, background: 'var(--sun-grad)' }}/>
      {events.map((e, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            background: e.state === 'done' ? 'var(--sun-orange)' : e.state === 'now' ? 'white' : 'var(--bg)',
            border: e.state === 'now' ? '2px solid var(--sun-orange)' : '2px solid ' + (e.state === 'done' ? 'var(--sun-orange)' : 'var(--hairline-strong)'),
            zIndex: 1, marginTop: 16, marginBottom: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {e.state === 'done' && <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            {e.state === 'now' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sun-orange)' }}/>}
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: e.state === 'now' ? 'var(--sun-deep)' : 'var(--ink-2)', textAlign: 'center' }}>{e.label}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-4)', textAlign: 'center', marginTop: 2 }} className="mono">{e.date}</div>
          {e.note && <div style={{ fontSize: 10.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 4, maxWidth: 110, lineHeight: 1.35 }}>{e.note}</div>}
        </div>
      ))}
    </div>
  );
}

function AdminRightRail() {
  return (
    <div style={{
      width: 280, flexShrink: 0,
      borderLeft: '1px solid var(--hairline)',
      background: 'var(--bg-tint)',
      padding: '18px 16px',
      display: 'flex', flexDirection: 'column', gap: 16,
      overflowY: 'auto',
    }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 10 }}>Today · Nov 18</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { t: '1:30 PM', who: 'Maya Okonkwo',  kind: 'Pathways review', tone: 'sun', dur: '30m' },
            { t: '2:15 PM', who: 'Liam Chen',     kind: 'Drop-in',          tone: 'neutral', dur: '15m' },
            { t: '3:00 PM', who: 'Aisha Patel',   kind: 'Re-run review',    tone: 'teal', dur: '30m' },
            { t: '4:00 PM', who: 'Parent — Owusu',kind: 'Family meeting',   tone: 'neutral', dur: '45m' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: 10,
              background: i === 0 ? 'white' : 'transparent',
              border: i === 0 ? '1px solid var(--sun-orange)' : '1px solid transparent',
              boxShadow: i === 0 ? '0 2px 8px rgba(240,138,0,0.18)' : 'none',
              display: 'flex', gap: 10,
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', minWidth: 52, paddingTop: 2 }}>{m.t}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{m.who}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 1 }}>{m.kind} · {m.dur}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 10 }}>Awaiting your review</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { n: 'Liam Chen',   r: 'New report · arts pivot' },
            { n: 'Aisha Patel', r: 'Term-end re-run' },
            { n: 'David Owusu', r: 'Scholarship match alert' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '9px 10px', borderRadius: 8, background: 'var(--card)',
              border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 11.5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sun-orange)' }}/>
              <span style={{ flex: 1, fontWeight: 500 }}>{r.n}</span>
              <span style={{ color: 'var(--ink-3)', fontSize: 10.5 }}>{r.r}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 10 }}>Caseload pulse</div>
        <div style={{
          padding: 14, background: 'var(--card)', borderRadius: 12,
          border: '1px solid var(--hairline)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>On track</span>
            <span className="display" style={{ fontSize: 13, fontWeight: 600 }}>62%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-soft)', overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ width: '62%', height: '100%', background: 'var(--green)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Needs touch this week</span>
            <span className="display" style={{ fontSize: 13, fontWeight: 600 }}>11</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Awaiting re-run</span>
            <span className="display" style={{ fontSize: 13, fontWeight: 600 }}>4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phone version — simpler caseload view ────────────────────

function AdminPhone({ go, onExitRole }) {
  return (
    <div className="app-surface">
      <div className="a-header">
        <div>
          <div className="greeting">Counselor portal · 24 students</div>
          <div className="title">Ms. Diallo</div>
        </div>
        <button onClick={onExitRole} style={{
          padding: '6px 10px', borderRadius: 8,
          background: 'var(--card)', border: '1px solid var(--hairline)',
          fontSize: 11, color: 'var(--ink-3)', cursor: 'pointer',
        }}>Exit</button>
      </div>

      <div className="scroll-y" style={{ padding: '8px 16px 20px' }}>

        {/* Today block */}
        <div className="sun-hero" style={{ padding: 16, borderRadius: 16, marginBottom: 14 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginBottom: 6 }}>Today · 4 meetings</div>
            <div className="display" style={{ fontSize: 22, fontWeight: 600, color: 'white', letterSpacing: '-0.025em', textWrap: 'pretty' }}>
              Up next: Maya Okonkwo, <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>1:30 PM</span>.
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>Pathways review · 30 min · Grade 11</div>
          </div>
        </div>

        <SectionHead kicker="3 reports" title="Awaiting your review"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {STUDENTS.filter(s => s.flag === 'action').map((s, i) => (
            <div key={i} style={{
              padding: 14, background: 'var(--card)', borderRadius: 14,
              border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: s.avatarBg, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, fontFamily: 'var(--display-stack)',
                flexShrink: 0,
              }}>{s.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>{s.reportHeadline}</div>
              </div>
              <Pill tone="pending">Review</Pill>
            </div>
          ))}
        </div>

        <SectionHead kicker="Caseload" title="All students"/>
        <div style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--hairline)', overflow: 'hidden' }}>
          {STUDENTS.map((s, i, arr) => (
            <div key={i} style={{
              padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: s.avatarBg, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, fontFamily: 'var(--display-stack)',
                flexShrink: 0,
              }}>{s.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.grade} · {s.flagReason}</div>
              </div>
              {s.flag === 'action'  && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sun-orange)' }}/>}
              {s.flag === 'pending' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ink-4)' }}/>}
              {s.flag === 'ok'      && <Icon.check style={{ color: 'var(--green)' }}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sample student data ──────────────────────────────────────

const STUDENTS = [
  {
    id: 'maya',
    name: 'Maya Okonkwo', initials: 'MO', avatarBg: 'linear-gradient(135deg, #FFC107, #F08A00)',
    grade: 'Grade 11', cohort: 'Class of 2027', enrolled: 'Sep 2026',
    flag: 'action', flagReason: 'Functions drop · review',
    reportVersion: 3, reportDate: 'Nov 18, 2026',
    reportHeadline: 'Four strong pathways. Math gap is the lever.',
    pathways: [
      { title: 'UWaterloo · Software Eng (co-op)', fit: 82, cost: '$17.4k/yr' },
      { title: 'Sheridan · BA Interaction Design',  fit: 78, cost: '$8.2k/yr' },
      { title: 'Shopify Dev Degree (Carleton)',     fit: 75, cost: 'Paid' },
      { title: 'MIT · CS & EECS (intl)',            fit: 64, cost: '$0 need-blind' },
    ],
    decisions: [
      { state: 'accepted', t: 'Endorse UWaterloo as primary target' },
      { state: 'edited',   t: 'Demote MIT — re-evaluate after SAT' },
      { state: 'pending',  t: 'Reach out to Shopify recruiter network' },
    ],
    nextReview: 'Term-end · Feb 1',
    stats: [
      { l: 'Term GPA',      v: '3.61', n: '−0.18 since Sept',  tone: 'down' },
      { l: 'Functions',     v: '64',   n: '−30 in 6 weeks',    tone: 'down' },
      { l: 'CS',            v: '96',   n: 'top quartile',      tone: 'up' },
      { l: 'Income bracket',v: 'B',    n: '$58–72k household', tone: 'flat' },
      { l: 'Scholarships',  v: '11',   n: 'matches at her bracket', tone: 'up' },
    ],
    notes: [
      { date: 'Nov 14', body: 'Followed up on Functions drop. Maya is aware. Will check in after Schoolhouse session.' },
      { date: 'Oct 22', body: 'Excited about Shopify summer role. Strong fit IMO. Sent her email intro to a recruiter contact.' },
      { date: 'Sep 30', body: 'First intake. Family supportive but worried about cost. Foreground Waterloo Promise + RBC scholar.' },
    ],
    timeline: [
      { label: 'Intake',           date: 'Sep 8',  state: 'done' },
      { label: 'Initial report',   date: 'Sep 14', state: 'done', note: 'v1' },
      { label: '1st meeting',      date: 'Sep 30', state: 'done' },
      { label: 'Mid-term re-run',  date: 'Nov 18', state: 'now',  note: 'v3 — you are here' },
      { label: 'Term-end re-run',  date: 'Feb 1',  state: 'soon' },
      { label: 'Summer scholar app',date:'May',    state: 'soon' },
    ],
    progress: 0.55,
  },
  {
    id: 'liam',  name: 'Liam Chen',    initials: 'LC', avatarBg: 'linear-gradient(135deg, #4A6B5D, #2F4A40)',
    grade: 'Grade 12', cohort: '2026', enrolled: 'Sep 2025',
    flag: 'action', flagReason: 'New report · arts pivot',
    reportVersion: 1, reportDate: 'Nov 17',
    reportHeadline: 'Late arts pivot — 3 pathways still on the table.',
    pathways: [
      { title: 'OCAD · Illustration',  fit: 84, cost: '$9.8k/yr' },
      { title: 'York · Visual Arts',   fit: 71, cost: '$8.6k/yr' },
      { title: 'Gap year + portfolio', fit: 68, cost: '$0' },
    ],
    decisions: [
      { state: 'pending', t: 'Read full report and sign off' },
      { state: 'pending', t: 'Discuss gap-year framing with family' },
    ],
    nextReview: 'Application deadlines',
    stats: [
      { l: 'Term GPA', v: '3.84', n: '+0.06', tone: 'up' },
      { l: 'Art portfolio', v: '11pcs', n: 'strong', tone: 'up' },
      { l: 'Math', v: '74', n: 'flat', tone: 'flat' },
      { l: 'Income bracket', v: 'C', n: '$95k+', tone: 'flat' },
      { l: 'Scholarships', v: '4', n: 'merit-based', tone: 'up' },
    ],
    notes: [{ date: 'Nov 17', body: 'First intake post-pivot. Strong portfolio. Parents skeptical.' }],
    timeline: [
      { label: 'Intake', date: 'Nov 17', state: 'done' },
      { label: 'Report v1', date: 'Nov 17', state: 'now', note: 'awaiting you' },
      { label: 'First meeting', date: 'Nov 25', state: 'soon' },
      { label: 'OCAD deadline', date: 'Feb 1', state: 'soon' },
    ],
    progress: 0.25,
  },
  { id: 'aisha', name: 'Aisha Patel',   initials: 'AP', avatarBg: 'linear-gradient(135deg, #7A2E5C, #B33A8A)', grade: 'Grade 10', flag: 'action', flagReason: 'Term re-run ready' },
  { id: 'david', name: 'David Owusu',   initials: 'DO', avatarBg: 'linear-gradient(135deg, #1A2F4A, #2F4A6B)', grade: 'Grade 12', flag: 'pending', flagReason: 'Scholarship matches' },
  { id: 'sara',  name: 'Sara Hosseini', initials: 'SH', avatarBg: 'linear-gradient(135deg, #C66800, #F08A00)', grade: 'Grade 11', flag: 'ok', flagReason: 'On track · Engineering' },
  { id: 'noah',  name: 'Noah Williams', initials: 'NW', avatarBg: 'linear-gradient(135deg, #4A5A6B, #6B7A8C)', grade: 'Grade 9',  flag: 'pending', flagReason: 'Intake started' },
  { id: 'priya', name: 'Priya Singh',   initials: 'PS', avatarBg: 'linear-gradient(135deg, #B33A2E, #E07A4D)', grade: 'Grade 12', flag: 'ok', flagReason: 'On track · Pre-med' },
  { id: 'kofi',  name: 'Kofi Asante',   initials: 'KA', avatarBg: 'linear-gradient(135deg, #2F6B6B, #4A8C8C)', grade: 'Grade 11', flag: 'ok', flagReason: 'On track · Trades' },
];

// fill missing reportData on minor students
STUDENTS.forEach(s => {
  if (!s.cohort) s.cohort = 'Class of 2027';
  if (!s.enrolled) s.enrolled = 'Sep 2026';
  if (!s.reportVersion) s.reportVersion = 1;
  if (!s.reportDate) s.reportDate = 'Nov 18';
  if (!s.reportHeadline) s.reportHeadline = 'Pathways being mapped.';
  if (!s.pathways) s.pathways = [{ title: 'Pending', fit: 0, cost: '—' }];
  if (!s.decisions) s.decisions = [{ state: 'pending', t: 'Initial review' }];
  if (!s.nextReview) s.nextReview = 'TBD';
  if (!s.stats) s.stats = [
    { l: 'GPA',           v: '—',    n: 'pending',      tone: 'flat' },
    { l: 'Focus subject', v: '—',    n: 'pending',      tone: 'flat' },
    { l: 'Concern',       v: 'none', n: '',             tone: 'flat' },
    { l: 'Income tier',   v: '—',    n: '',             tone: 'flat' },
    { l: 'Scholarships',  v: '0',    n: 'check back',   tone: 'flat' },
  ];
  if (!s.notes) s.notes = [{ date: 'New', body: 'Intake pending.' }];
  if (!s.timeline) s.timeline = [
    { label: 'Intake', date: 'Soon', state: 'soon' },
    { label: 'Report', date: 'Soon', state: 'soon' },
  ];
  if (!s.progress) s.progress = 0.1;
});

Object.assign(window, { AdminDesktop, AdminPhone });
