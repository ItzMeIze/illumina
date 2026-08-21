// Wallet — credentials as elegant cards

function Wallet({ go }) {
  const [filter, setFilter] = React.useState('All');

  const creds = [
    {
      type: 'Diploma', title: 'Ontario Secondary School Diploma (in progress)',
      issuer: 'Etobicoke Collegiate Institute', date: 'Expected Jun 2027',
      verified: true, glyph: 'ON', bg: 'var(--teal)',
      detail: 'OSSD · 18/30 credits earned',
    },
    {
      type: 'Transcript', title: 'Fall 2026 Mid-term Transcript',
      issuer: 'TDSB · Etobicoke CI', date: 'Updated Nov 14',
      verified: true, glyph: 'TR', bg: 'var(--ink)',
      detail: '6 courses · GPA 3.61',
    },
    {
      type: 'License', title: 'G1 Driver\'s License',
      issuer: 'Service Ontario', date: 'Issued Aug 3, 2025',
      verified: true, glyph: 'G1', bg: '#1F4A7A',
      detail: 'Class G1 · Restricted',
    },
    {
      type: 'Certificate', title: 'Standard First Aid + CPR-C',
      issuer: 'Canadian Red Cross', date: 'Valid until Aug 2027',
      verified: true, glyph: 'FA', bg: '#9F2F2F',
      detail: '16h course · Score 94%',
    },
    {
      type: 'Income', title: 'Part-time employment',
      issuer: 'Tim Hortons · Bloor & Royal York', date: 'May 2025 — present',
      verified: true, glyph: 'TH', bg: '#7A1F2A',
      detail: '$450/month avg · 12h/wk',
    },
    {
      type: 'Application', title: 'Shopify Summer 2027 Internship',
      issuer: 'Shopify Inc.', date: 'Draft · 2 days ago',
      verified: false, glyph: 'Sh', bg: '#1F5C3D',
      detail: 'Frontend · résumé in review',
    },
  ];

  const tabs = ['All', 'Education', 'Income', 'Career'];
  const filtered = filter === 'All' ? creds
    : filter === 'Education' ? creds.filter(c => ['Diploma','Transcript','Certificate','License'].includes(c.type))
    : filter === 'Income' ? creds.filter(c => c.type === 'Income')
    : creds.filter(c => c.type === 'Application');

  return (
    <div className="app-surface">
      <div className="a-header">
        <div>
          <div className="greeting">6 credentials · all sovereign</div>
          <div className="title">Wallet</div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--card)', border: '1px solid var(--hairline)',
          color: 'var(--ink-2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon.plus/></button>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '14px 20px 4px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '7px 14px', borderRadius: 999, flexShrink: 0,
            fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            background: filter === t ? 'var(--ink)' : 'transparent',
            color: filter === t ? 'white' : 'var(--ink-2)',
            border: '1px solid ' + (filter === t ? 'var(--ink)' : 'var(--hairline-strong)'),
          }}>{t}</button>
        ))}
      </div>

      <div className="scroll-y" style={{ padding: '12px 16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((c, i) => <CredCard key={i} c={c} onClick={() => {}}/>)}
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: 20, padding: 16,
          background: 'var(--teal-bg)', borderRadius: 14,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{ color: 'var(--teal)' }}><Icon.shield/></div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--teal)', marginBottom: 2 }}>Sovereign by design</div>
            <div style={{ fontSize: 12, color: 'var(--teal)', lineHeight: 1.5, opacity: 0.85 }}>
              Every credential is signed by its issuer and held by you. Verifiers check the signature, not us.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CredCard({ c }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 16,
      border: '1px solid var(--hairline)',
      padding: 16,
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Glyph bg={c.bg}>{c.glyph}</Glyph>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 3 }}>{c.type}</div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: 2 }}>{c.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{c.issuer}</div>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 10, borderTop: '1px dashed var(--hairline)',
      }}>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.detail}</div>
        {c.verified ? (
          <Pill tone="verified" icon={<Icon.check/>}>Verified · {c.date.split(' ').slice(-2).join(' ')}</Pill>
        ) : (
          <Pill tone="pending">Draft</Pill>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Wallet });
