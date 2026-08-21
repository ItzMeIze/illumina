// Allumino logomark — diamond with sunrise arch cutout (matches uploaded brand)
function AlluminoMark({ size = 32, fill = 'currentColor', style = {} }) {
  const uid = React.useId().replace(/:/g, '');
  const maskId = `alm-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style}>
      <defs>
        <mask id={maskId}>
          <rect width="64" height="64" fill="white"/>
          {/* Sunrise arch — half-circle dome */}
          <path d="M32 24 C22.5 24 16 30 16 39 L16 44 L48 44 L48 39 C48 30 41.5 24 32 24 Z" fill="black"/>
          {/* Horizon slot below the arch */}
          <rect x="20" y="47.5" width="24" height="3.5" rx="1.2" fill="black"/>
        </mask>
      </defs>
      <path d="M32 4 L60 32 L32 60 L4 32 Z" fill={fill} mask={`url(#${maskId})`}/>
    </svg>
  );
}

// Wordmark "allumino" with diamond dot on the i
function AlluminoWordmark({ size = 28, color = 'var(--ink)', gradient = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'var(--display-stack)',
      fontWeight: 600, fontSize: size, letterSpacing: '-0.035em',
      color: gradient ? 'transparent' : color,
      background: gradient ? 'var(--sun-grad)' : 'transparent',
      WebkitBackgroundClip: gradient ? 'text' : 'border-box',
      backgroundClip: gradient ? 'text' : 'border-box',
      lineHeight: 1, display: 'inline-flex', alignItems: 'baseline',
      ...style,
    }}>
      allumino
    </span>
  );
}

// Compact lockup — mark + wordmark
function AlluminoLockup({ markSize = 28, wordSize = 22, gradientWord = false, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: Math.round(markSize * 0.35),
      ...style,
    }}>
      <AlluminoMark size={markSize} fill="var(--sun-orange)"/>
      <AlluminoWordmark size={wordSize} gradient={gradientWord}/>
    </span>
  );
}

const Icon = {
  home: (a={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...a}><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-8.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  wallet: (a={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...a}><rect x="3" y="6" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3 10h18M16 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  chat: (a={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...a}><path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v8c0 1.38-1.12 2.5-2.5 2.5H10l-4.5 3.5V17a2.5 2.5 0 01-1.5-2.5v-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  user: (a={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...a}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  spark: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M8 1.5l1.6 4.4L14 7.5l-4.4 1.6L8 13.5 6.4 9.1 2 7.5l4.4-1.6L8 1.5z" fill="currentColor"/></svg>,
  check: (a={}) => <svg width="12" height="12" viewBox="0 0 16 16" fill="none" {...a}><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrow: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  warn: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M8 2l6.5 11.5h-13L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 7v3M8 12v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  shield: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M8 1.5L2.5 4v4.5c0 3 2.5 5.5 5.5 6.5 3-1 5.5-3.5 5.5-6.5V4L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  plus: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  send: (a={}) => <svg width="18" height="18" viewBox="0 0 20 20" fill="none" {...a}><path d="M2.5 10L17.5 3l-4 14-3.5-5.5L2.5 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  more: (a={}) => <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor" {...a}><circle cx="2" cy="2" r="1.6"/><circle cx="9" cy="2" r="1.6"/><circle cx="16" cy="2" r="1.6"/></svg>,
  trend_down: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M2 3l5 5 3-3 4 6m0 0V7m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trend_up: (a={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...a}><path d="M2 13l5-5 3 3 4-6m0 0V9m0-4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// Bottom nav
function BottomNav({ tab, onTab }) {
  const tabs = [
    { id: 'home',   label: 'Home',   icon: Icon.home   },
    { id: 'wallet', label: 'Wallet', icon: Icon.wallet },
    { id: 'chat',   label: 'Agents', icon: Icon.chat   },
    { id: 'me',     label: 'Profile',icon: Icon.user   },
  ];
  return (
    <div className="a-nav">
      {tabs.map(t => (
        <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => onTab(t.id)}>
          {t.icon()}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// Reusable section header
function SectionHead({ kicker, title, action, onAction }) {
  return (
    <div style={{ padding: '20px 20px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        {kicker && <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4, fontWeight: 500 }}>{kicker}</div>}
        <div className="serif" style={{ fontSize: 19, fontWeight: 500, color: 'var(--ink)' }}>{title}</div>
      </div>
      {action && (
        <button onClick={onAction} style={{ background: 'transparent', border: 0, color: 'var(--ink-3)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
          {action} <Icon.arrow />
        </button>
      )}
    </div>
  );
}

// Inline glyph badge for credential cards
function Glyph({ children, bg = 'var(--ink)', fg = 'white' }) {
  return (
    <div style={{
      width: 38, height: 48, borderRadius: 4,
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500,
      letterSpacing: '-0.02em',
      flexShrink: 0,
      boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)',
    }}>{children}</div>
  );
}

// Status pill
function Pill({ tone = 'neutral', children, icon }) {
  const tones = {
    neutral: { bg: 'rgba(26,26,26,0.05)', fg: 'var(--ink-2)' },
    verified:{ bg: 'var(--green-bg)',     fg: 'var(--green)' },
    pending: { bg: 'var(--terra-bg)',     fg: 'var(--terra)' },
    teal:    { bg: 'var(--teal-bg)',      fg: 'var(--teal)' },
    warn:    { bg: '#FBEEDC',             fg: 'var(--amber)' },
  };
  const s = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: s.bg, color: s.fg,
      padding: '3px 9px', borderRadius: 999,
      fontSize: 11, fontWeight: 500, letterSpacing: 0.01,
    }}>
      {icon}{children}
    </span>
  );
}

Object.assign(window, { Icon, BottomNav, SectionHead, Glyph, Pill, AlluminoMark, AlluminoWordmark, AlluminoLockup });
