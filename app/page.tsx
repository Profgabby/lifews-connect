import Link from "next/link";

const PILLARS = [
  { name: "AgriShine™", color: "#2D6A2D", bg: "#f0f7ec", border: "#b8dba8", desc: "For schools, teachers, pupils, school gardens, educational materials, and sustainability clubs.", tags: ["Schools", "Teachers", "Garden tracker", "Lessons"], emoji: "🌱", btn: "Explore School Programs", href: "/pillars/agrishine" },
  { name: "AgriAble™", color: "#854F0B", bg: "#faeeda", border: "#fac775", desc: "For families, parents, home gardens, household food security, and practical sustainability.", tags: ["Parents", "Home gardens", "Families", "Adaptive learning"], emoji: "🤝", btn: "Explore Home Solutions", href: "/pillars/agriable" },
  { name: "AgriNext™", color: "#185FA5", bg: "#e6f1fb", border: "#b5d4f4", desc: "For youth innovation, green skills, digital agriculture, climate-smart learning, and entrepreneurship.", tags: ["Youth", "STEM", "Green jobs", "Learn-to-earn"], emoji: "🚀", btn: "Explore Youth Opportunities", href: "/pillars/agrinext" },
  { name: "AgriRoots™", color: "#534AB7", bg: "#eeedfe", border: "#cecbf6", desc: "For communities, food security projects, grassroots partnerships, local agriculture, and sustainability action.", tags: ["Languages", "Community", "Heritage", "Local agriculture"], emoji: "🌍", btn: "Explore Community Programs", href: "/pillars/agriroots" },
];

const WHO = [
  { emoji: "🏫", name: "Schools & admins", desc: "Manage gardens, teachers, students, and school-wide sustainability programs." },
  { emoji: "📚", name: "Teachers", desc: "Access lesson plans, track participation, and grow your agri-teaching career." },
  { emoji: "👨‍👩‍👧", name: "Parents & families", desc: "Grow home gardens, support children's learning, and join the community." },
  { emoji: "⚡", name: "Youth", desc: "Build green skills, earn certificates, and access learn-to-earn opportunities." },
  { emoji: "🌱", name: "Community partners", desc: "Coordinate programs, measure impact, and reach communities at scale." },
  { emoji: "🏢", name: "NGOs & organizations", desc: "Partner with LIFEWS to drive sustainable change at scale." },
];

const PLATFORMS = [
  { name: "LIFEWSBooks", emoji: "📚", desc: "Access LIFEWS books, storybooks, workbooks, teaching materials, and downloadable educational resources.", btn: "Visit LIFEWSBooks", href: "https://lifewsbooks.com" },
  { name: "LIFEWSAcademy", emoji: "🎓", desc: "Register for online courses, training programs, certifications, and green skills learning.", btn: "Visit LIFEWSAcademy", href: "https://lifewsacademy.com" },
  { name: "GrowHubSystems", emoji: "🌿", desc: "Order home gardens, school gardens, raised beds, irrigation kits, and climate-smart garden systems.", btn: "Visit GrowHubSystems", href: "https://growhubsystems.com" },
  { name: "LIFEWSWorks", emoji: "💼", desc: "Find jobs, gigs, green skills opportunities, service providers, and career pathways.", btn: "Visit LIFEWSWorks", href: "https://lifewsworks.com" },
];

export default function LandingPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F5F5E8; }
        .nav { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 8px; }
        .nav-mark { width: 30px; height: 30px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #163816; }
        .nav-links { display: flex; align-items: center; gap: 20px; }
        .nav-link { font-size: 13px; color: #555; text-decoration: none; }
        .nav-link:hover { color: #2D6A2D; }
        .nav-cta { background: #2D6A2D; color: #fff; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 500; text-decoration: none; white-space: nowrap; }
        @media (max-width: 640px) { .nav-links { display: none; } .nav-cta { padding: 6px 12px; font-size: 11px; } }
        .hero-wrap { max-width: 1100px; margin: 0 auto; padding: 80px 24px 64px; text-align: center; }
        .hero-h1 { font-family: 'DM Serif Display', serif; font-size: 52px; color: #163816; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 20px; }
        .hero-h1 span { color: #2D6A2D; }
        .hero-sub { font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 36px; font-weight: 300; max-width: 620px; margin-left: auto; margin-right: auto; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 64px; }
        .hero-stats { display: flex; gap: 48px; justify-content: center; padding-top: 40px; border-top: 1px solid #e0d8c8; }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 28px; color: #163816; }
        .stat-label { font-size: 11px; color: #888; margin-top: 2px; }
        @media (max-width: 640px) { .hero-wrap { padding: 48px 20px 40px; } .hero-h1 { font-size: 34px; } .hero-sub { font-size: 14px; } .hero-stats { gap: 20px; } .stat-num { font-size: 22px; } }
        .btn-primary { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: #1a4a1a; }
        .btn-ghost { background: transparent; color: #2D6A2D; border: 1.5px solid #2D6A2D; border-radius: 10px; padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-ghost:hover { background: #f0f7ec; }
        .btn-outline { background: transparent; color: #163816; border: 1.5px solid #e0d8c8; border-radius: 10px; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-outline:hover { border-color: #2D6A2D; color: #2D6A2D; }
        .section { max-width: 1100px; margin: 0 auto; padding: 64px 24px; }
        .sec-tag { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #2D6A2D; margin-bottom: 12px; display: block; }
        .sec-title { font-family: 'DM Serif Display', serif; font-size: 34px; color: #163816; margin-bottom: 14px; letter-spacing: -0.5px; }
        .sec-sub { font-size: 15px; color: #666; font-weight: 300; line-height: 1.7; max-width: 540px; }
        @media (max-width: 640px) { .section { padding: 44px 20px; } .sec-title { font-size: 26px; } }
        .pillars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 40px; }
        .pillar-card { border-radius: 16px; padding: 24px; border: 1px solid transparent; transition: transform 0.2s, box-shadow 0.2s; }
        .pillar-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .pillar-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 16px; }
        .pillar-tag { font-size: 10px; padding: 3px 9px; border-radius: 6px; font-weight: 500; }
        @media (max-width: 640px) { .pillars-grid { grid-template-columns: 1fr; } }
        .who-section { background: #2D6A2D; padding: 64px 24px; }
        .who-inner { max-width: 1100px; margin: 0 auto; }
        .who-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #fff; margin-bottom: 10px; }
        .who-sub { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 36px; font-weight: 300; }
        .who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .who-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 20px; }
        .who-emoji { font-size: 24px; margin-bottom: 10px; display: block; }
        .who-name { font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 6px; }
        .who-desc { font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.6; }
        @media (max-width: 640px) { .who-grid { grid-template-columns: 1fr 1fr; } .who-title { font-size: 26px; } }
        .platforms-section { background: #163816; padding: 64px 24px; }
        .platforms-inner { max-width: 1100px; margin: 0 auto; }
        .platforms-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #fff; margin-bottom: 10px; }
        .platforms-sub { font-size: 15px; color: rgba(255,255,255,0.6); margin-bottom: 40px; font-weight: 300; max-width: 540px; }
        .platforms-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .platform-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px; }
        .platform-card:hover { background: rgba(255,255,255,0.1); }
        .platform-emoji { font-size: 28px; margin-bottom: 12px; display: block; }
        .platform-name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .platform-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 16px; }
        .platform-btn { font-size: 12px; font-weight: 500; color: #7ec850; text-decoration: none; }
        .platform-btn:hover { color: #a8e878; }
        @media (max-width: 640px) { .platforms-grid { grid-template-columns: 1fr; } .platforms-title { font-size: 26px; } }
        .agrishine-inner { background: #fff; border-radius: 20px; padding: 40px; border: 1px solid #e8e0cc; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .agrishine-visual { background: #f0f7ec; border-radius: 16px; padding: 32px; text-align: center; }
        .agrishine-icons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .agrishine-icon { background: #fff; border-radius: 10px; padding: 12px; font-size: 12px; color: #444; }
        @media (max-width: 768px) { .agrishine-inner { grid-template-columns: 1fr; gap: 28px; padding: 24px; } }
        .cta-section { padding: 80px 24px; text-align: center; background: #F5F5E8; }
        .cta-title { font-family: 'DM Serif Display', serif; font-size: 38px; color: #163816; margin-bottom: 16px; letter-spacing: -0.5px; }
        .cta-sub { font-size: 15px; color: #666; font-weight: 300; margin-bottom: 32px; line-height: 1.7; max-width: 480px; margin-left: auto; margin-right: auto; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 640px) { .cta-title { font-size: 28px; } .cta-btns { flex-direction: column; align-items: center; } }
        .footer { background: #fff; border-top: 1px solid #e8e0cc; padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'DM Serif Display', serif; font-size: 14px; color: #2D6A2D; }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-size: 12px; color: #888; text-decoration: none; }
        .footer-link:hover { color: #2D6A2D; }
        .footer-copy { font-size: 11px; color: #bbb; }
        @media (max-width: 640px) { .footer { flex-direction: column; text-align: center; } .footer-links { justify-content: center; } }
        .check-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .check-icon { width: 20px; height: 20px; border-radius: 50%; background: #f0f7ec; border: 1px solid #b8dba8; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #2D6A2D; flex-shrink: 0; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F5F5E8" }}>

        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-mark">🌱</div>
            <span className="nav-name">LIFEWS Connect</span>
          </div>
          <div className="nav-links">
            <a href="#pillars" className="nav-link">Pillars</a>
            <a href="#who" className="nav-link">Who it&apos;s for</a>
            <a href="/playzone" className="nav-link">PlayZone 🎮</a>
            <a href="/platforms" className="nav-link">Platforms</a>
            <a href="/pricing" className="nav-link">Pricing</a>
            <a href="/auth" className="nav-link">Sign in</a>
          </div>
          <Link href="/auth" className="nav-cta">Get started free</Link>
        </nav>

        {/* Hero */}
        <div style={{ background: "#F5F5E8" }}>
          <div className="hero-wrap">
            <h1 className="hero-h1">
              Connecting people to <span>food, learning</span> & sustainability.
            </h1>
            <p className="hero-sub">
              LIFEWSConnect is the digital gateway linking schools, families, communities, learners, and partners to LIFEWS programs, gardens, training, and opportunity platforms.
            </p>
            <div className="hero-btns">
              <Link href="/auth" className="btn-primary">Join LIFEWSConnect</Link>
              <a href="/platforms" className="btn-ghost">Explore LIFEWS Platforms</a>
            </div>
            <div className="hero-stats">
              {[["4", "LIFEWS Pillars"], ["6+", "Languages supported"], ["4", "Connected platforms"], ["∞", "Impact potential"]].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div id="pillars" style={{ background: "#fff" }}>
          <div className="section">
            <span className="sec-tag">Four LIFEWS Pillars</span>
            <h2 className="sec-title">One ecosystem, four pathways</h2>
            <p className="sec-sub">Every user finds their place — whether you&apos;re a school, a family, a youth innovator, or a community partner.</p>
            <div className="pillars-grid">
              {PILLARS.map(p => (
                <div key={p.name} className="pillar-card" style={{ background: p.bg, borderColor: p.border }}>
                  <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{p.emoji}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: p.color }}>{p.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "#555", marginBottom: 4 }}>{p.desc}</p>
                  <div className="pillar-tags">
                    {p.tags.map(t => (
                      <span key={t} className="pillar-tag" style={{ background: `${p.color}18`, color: p.color }}>{t}</span>
                    ))}
                  </div>
                  <a href={p.href} style={{ fontSize: 12, fontWeight: 500, color: p.color, textDecoration: "none" }}>{p.btn} →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who */}
        <div id="who" className="who-section">
          <div className="who-inner">
            <h2 className="who-title">Built for everyone in the ecosystem</h2>
            <p className="who-sub">One platform, many doors — each role gets a personalised experience</p>
            <div className="who-grid">
              {WHO.map(w => (
                <div key={w.name} className="who-card">
                  <span className="who-emoji">{w.emoji}</span>
                  <h3 className="who-name">{w.name}</h3>
                  <p className="who-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Platforms */}
        <div className="platforms-section">
          <div className="platforms-inner">
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#7ec850", marginBottom: 12, display: "block" }}>Connected LIFEWS Platforms</span>
            <h2 className="platforms-title">Move from connection to action</h2>
            <p className="platforms-sub">Access the full LIFEWS ecosystem — books, academy, garden systems, and work opportunities.</p>
            <div className="platforms-grid">
              {PLATFORMS.map(p => (
                <div key={p.name} className="platform-card">
                  <span className="platform-emoji">{p.emoji}</span>
                  <div className="platform-name">{p.name}</div>
                  <p className="platform-desc">{p.desc}</p>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="platform-btn">{p.btn} →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AgriShine highlight */}
        <div className="section">
          <div className="agrishine-inner">
            <div>
              <span className="sec-tag">Featured Pillar</span>
              <h2 className="sec-title" style={{ fontSize: 28 }}>Start with AgriShine™</h2>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>
                AgriShine is our flagship pillar — connecting schools and teachers through hands-on food, energy, and water education. Register today and get access to:
              </p>
              {["School garden tracker", "AgriShine lesson plans", "Student participation tracking", "Teacher tools and badges", "Community garden network"].map(item => (
                <div key={item} className="check-item">
                  <div className="check-icon">✓</div>
                  <span style={{ fontSize: 13, color: "#444" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                <Link href="/auth" className="btn-primary">Register →</Link>
                <a href="/pillars" className="btn-outline">Learn more</a>
              </div>
            </div>
            <div className="agrishine-visual">
              <div style={{ fontSize: 56, marginBottom: 12 }}>🌱</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#163816", marginBottom: 6 }}>AgriShine™</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>School gardens & FEW systems learning</div>
              <div className="agrishine-icons">
                {[["🏫", "Schools"], ["📚", "Teachers"], ["👩‍🎓", "Students"], ["👨‍👩‍👧", "Parents"]].map(([e, l]) => (
                  <div key={l} className="agrishine-icon">
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{e}</div>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to join the LIFEWS ecosystem?</h2>
          <p className="cta-sub">LIFEWSConnect is free to start — built for schools, families, communities, and partners across Africa and beyond.</p>
          <div className="cta-btns">
            <Link href="/auth" className="btn-primary">Join LIFEWSConnect</Link>
            <a href="/platforms" className="btn-ghost">Explore Platforms</a>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">LIFEWS Connect™</div>
          <div className="footer-links">
            <a href="#pillars" className="footer-link">Pillars</a>
            <a href="/platforms" className="footer-link">Platforms</a>
            <a href="/pricing" className="footer-link">Pricing</a>
            <a href="/auth" className="footer-link">Sign in</a>
          </div>
          <div className="footer-copy">© 2026 LIFEWS Connect · AgriShine™ AgriAble™ AgriNext™ AgriRoots™</div>
        </footer>

      </div>
    </>
  );
}

