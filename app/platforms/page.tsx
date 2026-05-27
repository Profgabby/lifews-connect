import Link from "next/link";

const PLATFORMS = [
  {
    name: "LIFEWSBooks",
    emoji: "📚",
    color: "#2D6A2D",
    bg: "#f0f7ec",
    border: "#b8dba8",
    tagline: "Learn through LIFEWS stories and resources",
    desc: "Access LIFEWS books, storybooks, workbooks, teaching materials, and downloadable educational resources for schools, families, and learners across Africa and beyond.",
    features: ["LIFEWS storybooks & workbooks", "Downloadable teaching materials", "Multilingual learning resources", "School curriculum support packs", "Digital & print editions"],
    btn: "Visit LIFEWSBooks",
    href: "https://lifewsbooks.com",
    for: ["Schools", "Teachers", "Parents", "Students"],
  },
  {
    name: "LIFEWSAcademy",
    emoji: "🎓",
    color: "#185FA5",
    bg: "#e6f1fb",
    border: "#b5d4f4",
    tagline: "Online learning for green skills and sustainability",
    desc: "Register for online courses, training programs, certifications, and green skills learning. LIFEWSAcademy connects learners to structured education pathways in agriculture, sustainability, and community development.",
    features: ["Online courses & certifications", "Green skills training", "Climate-smart agriculture modules", "Youth innovation programs", "Professional development tracks"],
    btn: "Visit LIFEWSAcademy",
    href: "https://lifewsacademy.com",
    for: ["Youth", "Teachers", "Community partners", "Researchers"],
  },
  {
    name: "GrowHubSystems",
    emoji: "🌿",
    color: "#854F0B",
    bg: "#faeeda",
    border: "#fac775",
    tagline: "Garden systems for homes, schools & communities",
    desc: "Order home gardens, school gardens, mini agrivoltaic hubs, raised beds, irrigation kits, and climate-smart garden systems. GrowHubSystems brings food production closer to every household and school.",
    features: ["Home garden starter kits", "School garden systems", "Raised beds & planters", "Drip irrigation kits", "Mini agrivoltaic garden hubs"],
    btn: "Visit GrowHubSystems",
    href: "https://growhubsystems.com",
    for: ["Families", "Schools", "Community partners", "NGOs"],
  },
  {
    name: "LIFEWSWorks",
    emoji: "💼",
    color: "#534AB7",
    bg: "#eeedfe",
    border: "#cecbf6",
    tagline: "Jobs, gigs and green career pathways",
    desc: "Find jobs, gigs, green skills opportunities, service providers, and career pathways. LIFEWSWorks connects vetted artisans, professionals, and service providers with clients across Africa.",
    features: ["Job listings & gig opportunities", "Vetted service providers", "Green career pathways", "Skills-based matching", "Milestone-based payments"],
    btn: "Visit LIFEWSWorks",
    href: "https://lifewsworks.com",
    for: ["Youth", "Artisans", "Professionals", "Community partners"],
  },
];

export default function PlatformsPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F5F5E8; }
        .nav { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .nav-mark { width: 30px; height: 30px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #163816; }
        .nav-links { display: flex; align-items: center; gap: 20px; }
        .nav-link { font-size: 13px; color: #555; text-decoration: none; }
        .nav-link:hover { color: #2D6A2D; }
        .nav-cta { background: #2D6A2D; color: #fff; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 500; text-decoration: none; }
        @media (max-width: 640px) { .nav-links { display: none; } }

        .hero { background: #163816; padding: 64px 24px; text-align: center; }
        .hero-inner { max-width: 700px; margin: 0 auto; }
        .hero-tag { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #7ec850; margin-bottom: 16px; display: block; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 42px; color: #fff; line-height: 1.1; letter-spacing: -1px; margin-bottom: 16px; }
        .hero-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; font-weight: 300; margin-bottom: 32px; }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 640px) { .hero { padding: 48px 20px; } .hero-title { font-size: 30px; } }

        .btn-white { background: #fff; color: #163816; border: none; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-ghost-white { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }

        .section { max-width: 1100px; margin: 0 auto; padding: 64px 24px; }
        @media (max-width: 640px) { .section { padding: 44px 20px; } }

        .platform-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 20px; padding: 36px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .platform-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .platform-visual { border-radius: 16px; padding: 32px; text-align: center; }
        .platform-emoji-big { font-size: 52px; margin-bottom: 16px; display: block; }
        .platform-name-big { font-family: 'DM Serif Display', serif; font-size: 24px; margin-bottom: 8px; }
        .platform-tagline { font-size: 13px; line-height: 1.6; margin-bottom: 20px; }
        .for-tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
        .for-tag { font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }
        .feature-list { list-style: none; }
        .feature-list li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f0e8; font-size: 14px; color: #444; }
        .feature-list li:last-child { border-bottom: none; }
        .check { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
        .visit-btn { display: inline-block; padding: 12px 24px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; text-decoration: none; margin-top: 24px; }
        @media (max-width: 768px) { .platform-card { grid-template-columns: 1fr; gap: 24px; padding: 24px; } }

        .bottom-cta { background: #2D6A2D; padding: 64px 24px; text-align: center; }
        .bottom-cta-inner { max-width: 600px; margin: 0 auto; }
        .bottom-title { font-family: 'DM Serif Display', serif; font-size: 34px; color: #fff; margin-bottom: 14px; }
        .bottom-sub { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 28px; line-height: 1.7; }

        .footer { background: #fff; border-top: 1px solid #e8e0cc; padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'DM Serif Display', serif; font-size: 14px; color: #2D6A2D; }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-size: 12px; color: #888; text-decoration: none; }
        .footer-link:hover { color: #2D6A2D; }
        .footer-copy { font-size: 11px; color: #bbb; }
        @media (max-width: 640px) { .footer { flex-direction: column; text-align: center; } .footer-links { justify-content: center; } }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F5F5E8" }}>

        {/* Nav */}
        <nav className="nav">
          <Link href="/" className="nav-logo">
            <div className="nav-mark">🌱</div>
            <span className="nav-name">LIFEWS Connect</span>
          </Link>
          <div className="nav-links">
            <Link href="/#pillars" className="nav-link">Pillars</Link>
            <Link href="/platforms" className="nav-link" style={{ color: "#2D6A2D", fontWeight: 500 }}>Platforms</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/auth" className="nav-link">Sign in</Link>
          </div>
          <Link href="/auth" className="nav-cta">Get started free</Link>
        </nav>

        {/* Hero */}
        <div className="hero">
          <div className="hero-inner">
            <span className="hero-tag">LIFEWS Ecosystem Platforms</span>
            <h1 className="hero-title">Move from connection to action</h1>
            <p className="hero-sub">
              LIFEWSConnect links you to four powerful platforms — books, academy, garden systems, and work opportunities. Each platform is built to help schools, families, communities, and youth take real action.
            </p>
            <div className="hero-btns">
              <Link href="/auth" className="btn-white">Join LIFEWSConnect</Link>
              <Link href="/" className="btn-ghost-white">← Back to Home</Link>
            </div>
          </div>
        </div>

        {/* Platform cards */}
        <div className="section">
          {PLATFORMS.map((p, i) => (
            <div key={p.name} className="platform-card">
              {/* Visual side — alternates left/right */}
              {i % 2 === 0 ? (
                <>
                  <div className="platform-visual" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                    <span className="platform-emoji-big">{p.emoji}</span>
                    <div className="platform-name-big" style={{ color: p.color }}>{p.name}</div>
                    <div className="platform-tagline" style={{ color: p.color }}>{p.tagline}</div>
                    <div className="for-tags">
                      {p.for.map(f => (
                        <span key={f} className="for-tag" style={{ background: `${p.color}18`, color: p.color }}>For {f}</span>
                      ))}
                    </div>
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      className="visit-btn" style={{ background: p.color, color: "#fff" }}>
                      {p.btn} →
                    </a>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: p.color, marginBottom: 12 }}>Platform Overview</div>
                    <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#888", marginBottom: 12 }}>What you get</div>
                    <ul className="feature-list">
                      {p.features.map(f => (
                        <li key={f}>
                          <div className="check" style={{ background: `${p.color}18`, color: p.color }}>✓</div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: p.color, marginBottom: 12 }}>Platform Overview</div>
                    <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#888", marginBottom: 12 }}>What you get</div>
                    <ul className="feature-list">
                      {p.features.map(f => (
                        <li key={f}>
                          <div className="check" style={{ background: `${p.color}18`, color: p.color }}>✓</div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="platform-visual" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                    <span className="platform-emoji-big">{p.emoji}</span>
                    <div className="platform-name-big" style={{ color: p.color }}>{p.name}</div>
                    <div className="platform-tagline" style={{ color: p.color }}>{p.tagline}</div>
                    <div className="for-tags">
                      {p.for.map(f => (
                        <span key={f} className="for-tag" style={{ background: `${p.color}18`, color: p.color }}>For {f}</span>
                      ))}
                    </div>
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      className="visit-btn" style={{ background: p.color, color: "#fff" }}>
                      {p.btn} →
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="bottom-cta-inner">
            <h2 className="bottom-title">Ready to explore the LIFEWS ecosystem?</h2>
            <p className="bottom-sub">Join LIFEWSConnect for free and get access to all four LIFEWS platforms — books, academy, garden systems, and work opportunities.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
              <Link href="/auth" className="btn-white">Join LIFEWSConnect</Link>
              <Link href="/" className="btn-ghost-white">← Back to Home</Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">LIFEWS Connect™</div>
          <div className="footer-links">
            <Link href="/#pillars" className="footer-link">Pillars</Link>
            <Link href="/platforms" className="footer-link">Platforms</Link>
            <Link href="/pricing" className="footer-link">Pricing</Link>
            <Link href="/auth" className="footer-link">Sign in</Link>
          </div>
          <div className="footer-copy">© 2026 LIFEWS Connect · AgriShine™ AgriAble™ AgriNext™ AgriRoots™</div>
        </footer>

      </div>
    </>
  );
}

