// Onboarding — anchored to the new workflow:
// Welcome → socio-economic intake → upload artifacts → generating → enter app

function Onboarding({ onFinish, onReport }) {
  const [step, setStep] = React.useState(0);

  // 0 welcome / 1-3 intake / 4 upload / 5 generating / 6 ready
  const total = 7;

  // intake state
  const [intake, setIntake] = React.useState({
    name: 'Maya Okonkwo',
    grade: 'Grade 11',
    school: 'Etobicoke Collegiate Institute',
    region: 'Toronto, ON · Canada',
    household: '$58k – $72k',
    firstGen: true,
    languages: ['English', 'Yoruba'],
    interests: ['Computer science', 'Design'],
    constraints: ['Part-time job (12 hrs/wk)', 'Commute under 1 hr'],
    aspirations: 'I want to build things people use. A university with real co-op would matter, but I\'m also open to a serious gap year if it gets me into a great lab.',
  });
  const [uploads, setUploads] = React.useState([
    { name: 'Fall 2026 mid-term transcript.pdf', size: '241 KB', kind: 'transcript', done: true },
    { name: 'Standard First Aid (Red Cross).pdf', size: '88 KB', kind: 'certificate', done: true },
  ]);

  const next = () => {
    if (step === 4) {
      setStep(5);
      setTimeout(() => setStep(6), 2800);
      return;
    }
    if (step >= total - 1) { onFinish(); return; }
    setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);

  const stepLabel =
    step === 0 ? '' :
    step <= 3 ? `Intake · ${step}/3` :
    step === 4 ? 'Documents · 1/1' :
    step === 5 ? 'Building your report…' :
    'Report ready';

  return (
    <div className="app-surface" style={{ position: 'relative' }}>
      {/* progress + step label */}
      {step > 0 && step < 6 && (
        <div style={{ padding: '54px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{stepLabel}</div>
            <button onClick={back} style={{ background: 'transparent', border: 0, color: 'var(--ink-3)', fontSize: 12, cursor: 'pointer' }}>← Back</button>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = (step === 1 && i < 1) || (step === 2 && i < 2) || (step === 3 && i < 3) || (step === 4 && i < 4) || (step === 5 && i < 5);
              return (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: filled ? 'var(--sun-orange)' : 'rgba(26,26,26,0.1)',
                  transition: 'background .3s',
                }}/>
              );
            })}
          </div>
        </div>
      )}

      <div className="scroll-y" style={{ padding: step === 0 ? '0' : (step === 5 || step === 6 ? '0' : '24px 24px 24px') }}>
        {step === 0 && <OnbWelcome onStart={next}/>}
        {step === 1 && <OnbWho intake={intake} setIntake={setIntake}/>}
        {step === 2 && <OnbContext intake={intake} setIntake={setIntake}/>}
        {step === 3 && <OnbAspire intake={intake} setIntake={setIntake}/>}
        {step === 4 && <OnbUpload uploads={uploads} setUploads={setUploads}/>}
        {step === 5 && <OnbGenerating/>}
        {step === 6 && <OnbReady onReport={onReport} onFinish={onFinish}/>}
      </div>

      {/* CTA bar */}
      {step > 0 && step < 5 && (
        <div style={{ padding: '12px 20px 32px', background: 'var(--bg)', borderTop: '1px solid var(--hairline)' }}>
          <button onClick={next} style={{
            width: '100%', height: 52,
            background: 'var(--sun-grad)', color: 'white',
            border: 0, borderRadius: 14,
            fontSize: 15, fontWeight: 600, letterSpacing: -0.1,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'var(--shadow-sun)',
            fontFamily: 'var(--display-stack)',
          }}>
            {step === 4 ? 'Build my report' : 'Continue'}
            <Icon.arrow/>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Welcome ──────────────────────────────────────────────────

function OnbWelcome({ onStart }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top sun panel */}
      <div className="sun-hero" style={{
        height: 440, padding: '60px 28px 40px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AlluminoMark size={56} fill="white" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}/>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>Allumino · v0.4</div>
          <h1 className="display" style={{
            fontSize: 42, fontWeight: 600, lineHeight: 1.0,
            letterSpacing: '-0.035em', margin: 0, color: 'white',
          }}>
            Your future,<br/>
            <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>illuminated.</span>
          </h1>
        </div>
      </div>

      {/* Below sun: copy + start */}
      <div style={{ padding: '28px 24px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', margin: '0 0 22px', textWrap: 'pretty' }}>
          Tell us a little about where you are. Add your transcripts and certificates. We'll find the paths worth your time — and the resources to walk them.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            { n: 1, t: 'A few questions',        d: 'About school, money, who\'s nearby — 3 minutes.' },
            { n: 2, t: 'Drop in your documents', d: 'Transcripts, certificates, anything official.' },
            { n: 3, t: 'Read your report',       d: 'Pathways, local + global resources, your shortlist.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--sun-bg)', color: 'var(--sun-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontFamily: 'var(--display-stack)', fontSize: 13, fontWeight: 600,
              }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--display-stack)', letterSpacing: '-0.015em' }}>{s.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onStart} style={{
          width: '100%', height: 54,
          background: 'var(--sun-grad)', color: 'white',
          border: 0, borderRadius: 14,
          fontSize: 16, fontWeight: 600, letterSpacing: -0.1,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: 'var(--shadow-sun)',
          fontFamily: 'var(--display-stack)',
        }}>
          Begin <Icon.arrow/>
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <Icon.shield/> Your answers stay on your device until you choose to share.
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 — who & where ─────────────────────────────────────

function OnbWho({ intake, setIntake }) {
  return (
    <div className="fade-in">
      <h2 className="display" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.03em' }}>Who are you?</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '0 0 28px', lineHeight: 1.45 }}>
        Basics first. Nothing here is shared without your consent.
      </p>

      <Field label="Full name"   value={intake.name}   onChange={v => setIntake({ ...intake, name: v })}/>
      <Field label="School year" value={intake.grade}  onChange={v => setIntake({ ...intake, grade: v })}
        options={['Grade 9','Grade 10','Grade 11','Grade 12','University Year 1','University Year 2']}/>
      <Field label="School"      value={intake.school} onChange={v => setIntake({ ...intake, school: v })}/>
      <Field label="Where you live" value={intake.region} onChange={v => setIntake({ ...intake, region: v })}/>

      <div style={{ marginTop: 18, padding: 14, background: 'var(--sun-bg)', borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ color: 'var(--sun-deep)', marginTop: 1 }}><Icon.shield/></div>
        <div style={{ fontSize: 12, color: 'var(--sun-deep)', lineHeight: 1.5 }}>
          Region matters because the best path can be a college 20 minutes from your house — we'll surface those, not just the obvious schools.
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 — socio-economic context ──────────────────────────

function OnbContext({ intake, setIntake }) {
  const HouseholdSlider = () => {
    const buckets = ['Under $35k', '$35k – $55k', '$55k – $72k', '$58k – $72k', '$72k – $110k', '$110k+', 'Prefer not to say'];
    return (
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>Household income (approx.)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {buckets.map(b => (
            <button key={b} onClick={() => setIntake({ ...intake, household: b })} style={{
              padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: intake.household === b ? 'var(--ink)' : 'white',
              color: intake.household === b ? 'white' : 'var(--ink-2)',
              border: '1px solid ' + (intake.household === b ? 'var(--ink)' : 'var(--hairline-strong)'),
              cursor: 'pointer',
            }}>{b}</button>
          ))}
        </div>
      </div>
    );
  };

  const Multi = ({ label, options, value, onChange }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map(o => {
          const on = value.includes(o);
          return (
            <button key={o} onClick={() => onChange(on ? value.filter(v => v !== o) : [...value, o])} style={{
              padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: on ? 'var(--sun-bg)' : 'white',
              color: on ? 'var(--sun-deep)' : 'var(--ink-2)',
              border: '1px solid ' + (on ? 'var(--sun-orange)' : 'var(--hairline-strong)'),
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              {on && <Icon.check/>} {o}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <h2 className="display" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.03em' }}>Where you stand.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '0 0 22px', lineHeight: 1.45, textWrap: 'pretty' }}>
        Be honest. The right pathway changes a lot based on what's around you and what you'd be paying.
      </p>

      <HouseholdSlider/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--card)', borderRadius: 12, border: '1px solid var(--hairline)', marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>First in your family to attend post-secondary?</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>Unlocks first-gen scholarships and prep programs.</div>
        </div>
        <button onClick={() => setIntake({ ...intake, firstGen: !intake.firstGen })} style={{
          width: 44, height: 26, borderRadius: 999,
          background: intake.firstGen ? 'var(--sun-orange)' : 'var(--ink-4)',
          border: 0, cursor: 'pointer', position: 'relative', transition: 'background .2s',
        }}>
          <div style={{
            position: 'absolute', top: 3, left: intake.firstGen ? 21 : 3,
            width: 20, height: 20, borderRadius: '50%', background: 'var(--card)',
            transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}/>
        </button>
      </div>

      <Multi label="Languages spoken at home"
        options={['English','French','Yoruba','Mandarin','Cantonese','Spanish','Tagalog','Punjabi','Arabic','Hindi','Other']}
        value={intake.languages}
        onChange={v => setIntake({ ...intake, languages: v })}/>

      <Multi label="Things to consider"
        options={['Part-time job (12 hrs/wk)','Caregiving at home','Commute under 1 hr','Need housing','International student','Disability accommodations']}
        value={intake.constraints}
        onChange={v => setIntake({ ...intake, constraints: v })}/>
    </div>
  );
}

// ─── Step 3 — aspirations ─────────────────────────────────────

function OnbAspire({ intake, setIntake }) {
  const interests = ['Computer science', 'Design', 'Biology', 'Business', 'Engineering', 'Education', 'Law', 'Trades', 'Media', 'Healthcare', 'Public policy', 'Music & arts'];
  return (
    <div className="fade-in">
      <h2 className="display" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.03em' }}>What pulls you?</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '0 0 22px', lineHeight: 1.45 }}>
        Pick anything that genuinely interests you, even if you've never tried it.
      </p>

      <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>Fields you're curious about</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {interests.map(o => {
          const on = intake.interests.includes(o);
          return (
            <button key={o} onClick={() => setIntake({
              ...intake,
              interests: on ? intake.interests.filter(v => v !== o) : [...intake.interests, o],
            })} style={{
              padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: on ? 'var(--sun-bg)' : 'white',
              color: on ? 'var(--sun-deep)' : 'var(--ink-2)',
              border: '1px solid ' + (on ? 'var(--sun-orange)' : 'var(--hairline-strong)'),
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              {on && <Icon.check/>} {o}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>In your own words</div>
      <textarea
        value={intake.aspirations}
        onChange={e => setIntake({ ...intake, aspirations: e.target.value })}
        placeholder="What do you want from the next 5 years? It's OK if it's fuzzy."
        style={{
          width: '100%', minHeight: 110, padding: 14,
          border: '1px solid var(--hairline-strong)', borderRadius: 12,
          background: 'var(--card)', fontSize: 14, fontFamily: 'var(--body-stack)',
          color: 'var(--ink)', outline: 'none', resize: 'vertical', lineHeight: 1.5,
        }}/>
      <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 6, textAlign: 'right' }}>{intake.aspirations.length} / 600</div>
    </div>
  );
}

// ─── Step 4 — upload ──────────────────────────────────────────

function OnbUpload({ uploads, setUploads }) {
  const [dragOver, setDragOver] = React.useState(false);
  const add = () => setUploads([...uploads, { name: 'Robotics competition certificate.pdf', size: '156 KB', kind: 'certificate', done: false, uploading: true }]);
  React.useEffect(() => {
    const pending = uploads.find(u => u.uploading);
    if (pending) {
      const t = setTimeout(() => {
        setUploads(uploads.map(u => u.uploading ? { ...u, done: true, uploading: false } : u));
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [uploads]);

  return (
    <div className="fade-in">
      <h2 className="display" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.03em' }}>Your evidence.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '0 0 20px', lineHeight: 1.45, textWrap: 'pretty' }}>
        Transcripts, certificates, awards — drop in anything official. We'll read them so you don't have to type any of it.
      </p>

      {/* Dropzone */}
      <button
        onClick={add}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); add(); }}
        style={{
          width: '100%', padding: '28px 16px', borderRadius: 16,
          background: dragOver ? 'var(--sun-bg)' : 'rgba(255,255,255,0.6)',
          border: '2px dashed ' + (dragOver ? 'var(--sun-orange)' : 'var(--hairline-strong)'),
          cursor: 'pointer', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          transition: 'all .15s',
        }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: 'var(--sun-grad)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sun)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--display-stack)', letterSpacing: '-0.015em' }}>Drop PDFs, images, or screenshots</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Or tap to browse · up to 25 MB each</div>
      </button>

      <div style={{ marginTop: 18, fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Uploaded · {uploads.length}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {uploads.map((u, i) => (
          <div key={i} style={{
            padding: 12, background: 'var(--card)', borderRadius: 12,
            border: '1px solid var(--hairline)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 44, borderRadius: 5,
              background: u.kind === 'transcript' ? 'var(--ink)' : '#9F2F2F',
              color: 'white', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
              fontFamily: 'var(--display-stack)',
            }}>PDF</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{u.size} · {u.kind}</div>
            </div>
            {u.uploading ? (
              <div className="shimmer" style={{ width: 70, height: 22, borderRadius: 999, background: 'var(--bg-soft)' }}/>
            ) : (
              <Pill tone="verified" icon={<Icon.check/>}>Parsed</Pill>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 5 — generating ──────────────────────────────────────

function OnbGenerating() {
  const lines = [
    'Reading Fall 2026 transcript…',
    'Cross-referencing Ontario college + university programs…',
    'Mapping income context to scholarship pools…',
    'Scoring fit against your stated interests…',
    'Building your shortlist…',
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => Math.min(v + 1, lines.length)), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="sun-hero" style={{
      height: '100%', minHeight: 600,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '80px 28px',
    }}>
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          animation: 'breath 2.4s ease-in-out infinite',
        }}>
          <AlluminoMark size={56} fill="white"/>
        </div>
        <style>{`@keyframes breath { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.06); opacity: 0.9 } }`}</style>
        <h2 className="display" style={{ fontSize: 28, fontWeight: 600, color: 'white', letterSpacing: '-0.03em', margin: '0 0 30px', textWrap: 'pretty' }}>
          Building <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>Maya's</span> report.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280, margin: '0 auto', textAlign: 'left' }}>
          {lines.map((l, idx) => (
            <div key={idx} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              opacity: idx < i ? 1 : idx === i ? 0.85 : 0.3,
              transition: 'opacity .3s',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: idx < i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {idx < i ? (
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="var(--sun-orange)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : idx === i ? (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--card)' }}/>
                ) : null}
              </div>
              <span style={{ fontSize: 13, color: 'white' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 6 — ready ───────────────────────────────────────────

function OnbReady({ onReport, onFinish }) {
  return (
    <div style={{ padding: '50px 24px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="fade-in" style={{ flex: 1 }}>
        <div style={{
          padding: 22, background: 'var(--sun-grad)', color: 'white',
          borderRadius: 20, position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--shadow-sun)', marginBottom: 22,
        }}>
          <div style={{
            position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 65%)',
          }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 8, fontWeight: 600 }}>Your report is ready</div>
            <h2 className="display" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15, margin: '0 0 8px', letterSpacing: '-0.025em', textWrap: 'pretty' }}>
              We found <span style={{ fontFamily: 'var(--editorial-stack)', fontStyle: 'italic', fontWeight: 400 }}>4 strong pathways</span> for you, Maya.
            </h2>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>
              Three are within 90 min of you. Two have full scholarship matches at your income bracket.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { stat: '4',  label: 'Career pathways' },
            { stat: '11', label: 'Scholarship matches' },
            { stat: '18', label: 'Local resources' },
            { stat: '6',  label: 'Action items this term' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '14px 16px', background: 'var(--card)', borderRadius: 12,
              border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'baseline', gap: 12,
            }}>
              <div className="display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--sun-deep)', letterSpacing: '-0.02em', minWidth: 32 }}>{m.stat}</div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        <button onClick={onReport} style={{
          width: '100%', height: 52,
          background: 'var(--ink)', color: 'white',
          border: 0, borderRadius: 14,
          fontSize: 15, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'var(--display-stack)',
        }}>
          Read the full report <Icon.arrow/>
        </button>
        <button onClick={onFinish} style={{
          width: '100%', height: 44,
          background: 'transparent', color: 'var(--ink-3)',
          border: '1px solid var(--hairline-strong)', borderRadius: 12,
          fontSize: 13, cursor: 'pointer',
        }}>Skip to dashboard</button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, options, disabled }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      {options ? (
        <select value={value} onChange={e => onChange?.(e.target.value)} style={inputStyle}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input value={value} onChange={e => onChange?.(e.target.value)} disabled={disabled} style={{ ...inputStyle, color: disabled ? 'var(--ink-3)' : 'var(--ink)' }} />
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', height: 50, padding: '0 14px',
  border: '1px solid var(--hairline-strong)',
  borderRadius: 12, background: 'var(--card)',
  fontSize: 15, color: 'var(--ink)', fontFamily: 'var(--body-stack)',
  outline: 'none', appearance: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
};

Object.assign(window, { Onboarding });
