// Profile / Me — minimal, settings & identity

function Profile({ go, onReset, onSwitchView, onSwitchRole }) {
  return (
    <div className="app-surface">
      <div className="a-header">
        <div>
          <div className="greeting">Identity & settings</div>
          <div className="title">Profile</div>
        </div>
      </div>

      <div className="scroll-y" style={{ padding: '12px 16px 20px' }}>
        {/* Identity card */}
        <div style={{
          padding: 18, background: 'var(--card)', borderRadius: 18,
          border: '1px solid var(--hairline)',
          display: 'flex', gap: 14, alignItems: 'center',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #D9C5A7, #B89070)',
            color: 'white', fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>MO</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="serif" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>Maya Okonkwo</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Grade 11 · Etobicoke CI</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 4 }}>0x7a3f…b21c</div>
          </div>
          <Pill tone="verified" icon={<Icon.shield/>}>Sovereign</Pill>
        </div>

        {/* Display / view toggle */}
        <SectionHead kicker="Display" title="View mode"/>
        <div style={{
          background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--hairline)', overflow: 'hidden',
        }}>
          <div style={{ padding: '12px 14px 4px', fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.5, textWrap: 'pretty' }}>
            Same wallet, same agents — choose the layout that suits where you are.
          </div>
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{
              padding: 10, borderRadius: 10,
              background: 'var(--ink)', color: 'white',
              display: 'flex', flexDirection: 'column', gap: 6,
              border: '1px solid var(--ink)',
            }}>
              <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                <rect x="14" y="2" width="12" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.1)"/>
                <line x1="14" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="20" cy="22" r="0.6" fill="currentColor"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>Phone</div>
                <Pill tone="verified" icon={<Icon.check/>}>Active</Pill>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>Pocket-sized · on the go</div>
            </div>
            <button onClick={onSwitchView} style={{
              padding: 10, borderRadius: 10,
              background: 'var(--bg-soft)', color: 'var(--ink)',
              border: '1px solid var(--hairline-strong)',
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: 6,
              transition: 'all .15s',
            }}>
              <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                <rect x="2" y="3" width="36" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" fill="white"/>
                <line x1="2" y1="8" x2="38" y2="8" stroke="currentColor" strokeWidth="0.6"/>
                <circle cx="4.5" cy="5.5" r="0.7" fill="currentColor" opacity="0.4"/>
                <circle cx="7" cy="5.5" r="0.7" fill="currentColor" opacity="0.4"/>
                <circle cx="9.5" cy="5.5" r="0.7" fill="currentColor" opacity="0.4"/>
                <rect x="4" y="11" width="9" height="11" fill="currentColor" opacity="0.1"/>
                <rect x="15" y="11" width="10" height="5" fill="currentColor" opacity="0.15"/>
                <rect x="27" y="11" width="9" height="5" fill="currentColor" opacity="0.1"/>
                <rect x="15" y="18" width="21" height="4" fill="currentColor" opacity="0.08"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>Desktop</div>
                <span style={{ fontSize: 11, color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 500 }}>
                  Switch <Icon.arrow/>
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4 }}>Wide multi-column view</div>
            </button>
          </div>
          <div style={{
            padding: '10px 14px', background: 'var(--teal-bg)',
            borderTop: '1px solid var(--hairline)',
            fontSize: 11, color: 'var(--teal)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon.shield/> Your identity travels with you — no re-login on the desktop.
          </div>
        </div>

        <SectionHead kicker="Role" title="Counselor mode"/>
        <button onClick={onSwitchRole} style={{
          width: '100%',
          padding: 14, background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--hairline)',
          display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #4A6B5D, #2F4A40)',
            color: 'white', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Switch to administrator</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1, textWrap: 'pretty' }}>See what Ms. Diallo sees — the counselor portal for the whole caseload.</div>
          </div>
          <Icon.arrow style={{ color: 'var(--ink-3)' }}/>
        </button>

        <SectionHead kicker="Your agents" title="Counselors"/>
        <div style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--hairline)', overflow: 'hidden' }}>
          {[
            { glyph: 'Ac', name: 'Academic Counselor',  meta: 'Watching 6 courses',     bg: 'var(--ink)' },
            { glyph: 'Ca', name: 'Career Counselor',    meta: '3 active applications',  bg: 'var(--teal)' },
            { glyph: 'Fi', name: 'Financial Counselor', meta: 'November · on track',    bg: 'var(--terra)' },
          ].map((a, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: a.bg, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 500,
              }}>{a.glyph}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{a.meta}</div>
              </div>
              <div style={{
                width: 28, height: 18, borderRadius: 999,
                background: 'var(--green)', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 2, left: 12, width: 14, height: 14, borderRadius: '50%', background: 'var(--card)' }}/>
              </div>
            </div>
          ))}
        </div>

        <SectionHead kicker="What can see what" title="Permissions"/>
        <div style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--hairline)' }}>
          {[
            { t: 'Etobicoke Collegiate',  s: 'Reading · transcripts, grades' },
            { t: 'TD Student Banking',    s: 'Reading · transactions' },
            { t: 'Shopify recruiter',     s: 'One-time · résumé + projects' },
            { t: 'Schoolhouse.world',     s: 'One-time · first name, grade' },
          ].map((p, i, arr) => (
            <div key={i} style={{
              padding: '13px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
              display: 'flex', alignItems: 'center',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 1 }}>{p.s}</div>
              </div>
              <button style={{
                fontSize: 11.5, color: 'var(--ink-3)',
                background: 'transparent', border: 0, cursor: 'pointer',
              }}>Revoke</button>
            </div>
          ))}
        </div>

        <button onClick={onReset} style={{
          marginTop: 20, width: '100%', height: 44, borderRadius: 12,
          background: 'transparent', color: 'var(--ink-3)',
          border: '1px solid var(--hairline-strong)', cursor: 'pointer',
          fontSize: 13,
        }}>Restart demo · re-do onboarding</button>
      </div>
    </div>
  );
}

Object.assign(window, { Profile });
