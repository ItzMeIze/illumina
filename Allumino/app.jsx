// Allumino — root app
// State: stage (onboarding | app), role (student | admin), screen, view (phone | desktop)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "view": "phone",
  "role": "student",
  "theme": "light",
  "accent": "#F08A00",
  "headlineFont": "Sora"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [stage, setStage] = React.useState('onboarding'); // onboarding | app
  const [screen, setScreen] = React.useState('home');
  const [animating, setAnimating] = React.useState(false);

  // Apply tweaks → CSS vars on documentElement
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme || 'light');
    if (t.theme !== 'dark') {
      document.documentElement.style.setProperty('--terra', t.accent);
    } else {
      // dark mode owns --terra (purple)
      document.documentElement.style.removeProperty('--terra');
    }
    const fontMap = {
      'Sora':             "'Sora', system-ui, -apple-system, sans-serif",
      'Fraunces':         "'Fraunces', Georgia, serif",
      'Instrument Serif': "'Instrument Serif', Georgia, serif",
      'Geist':            "'Geist', system-ui, sans-serif",
    };
    document.documentElement.style.setProperty('--display-stack', fontMap[t.headlineFont] || fontMap['Sora']);
    document.documentElement.style.setProperty('--serif-stack',   fontMap[t.headlineFont] || fontMap['Sora']);
    if (t.headlineFont === 'Instrument Serif' && !document.getElementById('instrument-font')) {
      const link = document.createElement('link');
      link.id = 'instrument-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
  }, [t.accent, t.headlineFont, t.theme]);

  const TABS = ['home','wallet','chat','me'];
  const go = (s) => { setStage('app'); setScreen(s); };
  const tab = TABS.includes(screen) ? screen : null;

  const switchView = (next) => {
    if (animating) return;
    setAnimating(true);
    setTweak('view', next);
    setTimeout(() => setAnimating(false), 500);
  };

  const switchRole = (next) => {
    setTweak('role', next);
    if (next === 'admin') { setStage('app'); setScreen('home'); }
  };

  const isAdmin   = t.role === 'admin' && stage === 'app';
  const isDesktop = t.view === 'desktop' && stage === 'app';
  const isDark    = t.theme === 'dark';

  // ─ STUDENT phone content ─
  let content;
  if (stage === 'onboarding') {
    content = <Onboarding
      onFinish={() => go('home')}
      onReport={() => go('report')}/>;
  } else if (isAdmin && !isDesktop) {
    content = <AdminPhone go={go} onExitRole={() => switchRole('student')}/>;
  } else {
    switch (screen) {
      case 'home':    content = <Dashboard go={go}/>;     break;
      case 'wallet':  content = <Wallet go={go}/>;        break;
      case 'chat':    content = <Chat go={go}/>;          break;
      case 'me':      content = <Profile go={go}
                                  onReset={() => { setStage('onboarding'); setScreen('home'); }}
                                  onSwitchView={() => switchView('desktop')}
                                  onSwitchRole={() => switchRole('admin')}/>; break;
      case 'grades':  content = <Grades go={go}/>;        break;
      case 'resume':  content = <Resume go={go}/>;        break;
      case 'finance': content = <Finance go={go}/>;       break;
      case 'report':  content = <Report go={go}/>;        break;
      case 'trajectory': content = <Trajectory go={go}/>; break;
      default:        content = <Dashboard go={go}/>;
    }
  }

  return (
    <div className="stage" data-view={t.view}>
      <div className="stage-inner" style={{ flexDirection: isDesktop ? 'column' : 'row', gap: isDesktop ? 24 : 60 }}>
        {/* Brand rail */}
        {!isDesktop && (
          <div className="brand-rail">
            <div className="mark">
              <AlluminoMark size={56} fill="var(--sun-orange)"/>
              <span className="word">allumino</span>
            </div>
            <p className="tag">A career-pathway compass — built from your transcripts, your context, and what's actually around you.</p>
            <div className="meta">
              <div><span className="k">Workflow</span> Intake → PDFs → Report → Counselor → Periodic re-run</div>
              <div style={{marginTop: 4}}><span className="k">Prototype</span> Maya Okonkwo · Grade 11</div>
            </div>
            <div className="nav-hint">
              {[
                { id: 'onb',    l: 'Welcome' },
                { id: 'home',   l: 'Dashboard' },
                { id: 'trajectory', l: 'Trajectory' },
                { id: 'report', l: 'Pathways report' },
                { id: 'chat',   l: 'Counselor chat' },
                { id: 'grades', l: 'Grade analysis' },
                { id: 'resume', l: 'Résumé tailor' },
                { id: 'finance',l: 'Finance' },
                { id: 'wallet', l: 'Wallet' },
                { id: 'me',     l: 'Profile' },
                { id: 'admin',  l: 'Admin view' },
              ].map(b => (
                <button key={b.id}
                  className={
                    (b.id === 'onb' && stage === 'onboarding') ||
                    (b.id === 'admin' && isAdmin) ||
                    (b.id !== 'onb' && b.id !== 'admin' && stage === 'app' && !isAdmin && screen === b.id)
                      ? 'active' : ''
                  }
                  onClick={() => {
                    if (b.id === 'onb')   { setTweak('role','student'); setStage('onboarding'); setScreen('home'); return; }
                    if (b.id === 'admin') { switchRole('admin'); return; }
                    if (isAdmin) setTweak('role','student');
                    go(b.id);
                  }}>
                  {b.l}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 24, fontSize: 11, color: 'var(--ink-4)', lineHeight: 1.6 }}>
              Open <button onClick={() => go('me')} style={{ background:'transparent', border:0, padding:0, cursor:'pointer', color:'var(--sun-deep)', textDecoration:'underline', font:'inherit' }}>Profile</button> to switch to the desktop view or counselor portal.
            </div>
          </div>
        )}

        {/* Device */}
        <div className={`device-stage ${animating ? 'switching' : ''}`}>
          {isDesktop ? (
            <DesktopShell title={isAdmin ? 'allumino · counselor portal' : 'allumino — maya.okonkwo'} dark={isDark} key="desktop">
              {isAdmin
                ? <AdminDesktop onExitRole={() => switchRole('student')}/>
                : <DesktopApp onPhone={() => switchView('phone')}/>}
            </DesktopShell>
          ) : (
            <IOSDevice width={390} height={830} title={undefined} dark={isDark} key="phone">
              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>{content}</div>
                {stage === 'app' && tab && !isAdmin && <BottomNav tab={tab} onTab={go}/>}
                <div style={{ height: 16, background: stage === 'app' && tab && !isAdmin ? 'rgba(251,248,239,0.92)' : 'var(--bg)' }}/>
              </div>
            </IOSDevice>
          )}
        </div>

        {/* Footer in desktop mode (since brand rail is hidden) */}
        {isDesktop && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            fontSize: 11, color: 'var(--ink-4)',
          }}>
            <AlluminoLockup markSize={18} wordSize={14}/>
            <span>·</span>
            <span>{isAdmin ? 'Counselor portal' : 'Student dashboard'} · desktop</span>
            <span>·</span>
            <button onClick={() => switchView('phone')} style={{ background: 'transparent', border: 0, color: 'var(--sun-deep)', fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>Back to phone</button>
          </div>
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood"/>
        <TweakRadio label="Theme" value={t.theme || 'light'}
          options={['light','dark']}
          onChange={(v) => setTweak('theme', v)}/>
        <TweakSection label="Role"/>
        <TweakRadio label="Viewing as" value={t.role}
          options={['student','admin']}
          onChange={(v) => switchRole(v)}/>
        <TweakSection label="View"/>
        <TweakRadio label="Device" value={t.view}
          options={['phone','desktop']}
          onChange={(v) => switchView(v)}/>
        <TweakSection label="Theme accents"/>
        <TweakColor label="Accent" value={t.accent}
          options={['#F08A00','#FFC107','#1F4A4A','#7A2E5C','#A78BFA']}
          onChange={(v) => setTweak('accent', v)}/>
        <TweakRadio label="Headline" value={t.headlineFont}
          options={['Sora','Fraunces','Instrument Serif']}
          onChange={(v) => setTweak('headlineFont', v)}/>
      </TweaksPanel>
    </div>
  );
}

// macOS-style window shell
function DesktopShell({ title, dark, children }) {
  return (
    <div style={{
      width: 1180, height: 740,
      borderRadius: 14, overflow: 'hidden',
      background: dark ? '#1A1B38' : 'white',
      boxShadow: dark
        ? '0 0 0 0.5px rgba(255,255,255,0.12), 0 24px 60px rgba(0,0,0,0.55), 0 6px 18px rgba(0,0,0,0.4)'
        : '0 0 0 0.5px rgba(0,0,0,0.18), 0 24px 60px rgba(26,26,26,0.22), 0 6px 18px rgba(26,26,26,0.08)',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      <div className="mac-titlebar" style={{
        height: 38, flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 14px',
        background: dark
          ? 'linear-gradient(to bottom, #1E1B3F, #181534)'
          : 'linear-gradient(to bottom, #EDEAE0, #E4E1D6)',
        borderBottom: dark ? '0.5px solid rgba(255,255,255,0.08)' : '0.5px solid rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[{ c: '#FF5F57' }, { c: '#FEBC2E' }, { c: '#28C840' }].map((d, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: d.c, border: '0.5px solid rgba(0,0,0,0.08)' }}/>
          ))}
        </div>
        <div className="mac-title" style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: '-apple-system, "SF Pro", system-ui',
          fontSize: 12.5, fontWeight: 600,
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.7)',
          letterSpacing: 0.1,
        }}>{title}</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
