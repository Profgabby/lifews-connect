import Link from "next/link";

const PILLARS = [
  { name: "AgriShine™", color: "#2D6A2D", bg: "#f0f7ec", border: "#b8dba8", desc: "School gardens, agrivoltaics, and FEW systems learning for classrooms and teachers.", tags: ["Schools", "Teachers", "Garden tracker", "Lessons"], emoji: "🌱" },
  { name: "AgriAble™", color: "#854F0B", bg: "#faeeda", border: "#fac775", desc: "Inclusion, special-needs support, home gardens, and adaptive learning for families.", tags: ["Parents", "Home gardens", "Adaptive learning"], emoji: "🤝" },
  { name: "AgriNext™", color: "#185FA5", bg: "#e6f1fb", border: "#b5d4f4", desc: "STEM innovation, digital agriculture, green jobs and youth future skills.", tags: ["Youth", "STEM", "Green jobs", "Learn-to-earn"], emoji: "🚀" },
  { name: "AgriRoots™", color: "#534AB7", bg: "#eeedfe", border: "#cecbf6", desc: "Culture, language, local knowledge, artisan networks and food heritage.", tags: ["Artisans", "Languages", "Community", "Heritage"], emoji: "🌍" },
];

const WHO = [
  { emoji: "🏫", name: "Schools & admins", desc: "Manage gardens, teachers, students, and school-wide sustainability programs." },
  { emoji: "📚", name: "Teachers", desc: "Access lesson plans, track participation, and grow your agri-teaching career." },
  { emoji: "👨‍👩‍👧", name: "Parents & families", desc: "Grow home gardens, support children's learning, and join the community." },
  { emoji: "⚡", name: "Youth", desc: "Build green skills, earn certificates, and access learn-to-earn opportunities." },
  { emoji: "🛠", name: "Artisans & vendors", desc: "Find contracts, sell agri-products, and connect with installation projects." },
  { emoji: "🏢", name: "NGOs & partners", desc: "Coordinate programs, measure impact, and reach communities at scale." },
];

const CROPS = [
  { name: "Tomatoes", pct: 78, color: "#2D6A2D" },
  { name: "Spinach", pct: 45, color: "#854F0B" },
  { name: "Peppers", pct: 62, color: "#185FA5" },
  { name: "Cassava", pct: 90, color: "#534AB7" },
];

export default function LandingPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F5F5E8; }

        /* NAV */
        .nav { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 8px; }
        .nav-mark { width: 30px; height: 30px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #163816; }
        .nav-links { display: flex; align-items: center; gap: 20px; }
        .nav-link { font-size: 13px; color: #555; text-decoration: none; }
        .nav-cta { background: #2D6A2D; color: #fff; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 500; text-decoration: none; white-space: nowrap; }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-name { font-size: 13px; }
          .nav-cta { padding: 6px 12px; font-size: 11px; }
        }

        /* HERO */
        .hero-wrap { max-width: 1100px; margin: 0 auto; padding: 60px 24px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .hero-tag { display: inline-flex; align-items: center; gap: 6px; background: #f0f7ec; border: 1px solid #b8dba8; border-radius: 20px; padding: 5px 12px; font-size: 11px; font-weight: 500; color: #2D6A2D; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
        .hero-h1 { font-family: 'DM Serif Display', serif; font-size: 44px; color: #163816; line-height: 1.1; letter-spacing: -1px; margin-bottom: 16px; }
        .hero-sub { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 28px; font-weight: 300; }
        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 28px; margin-top: 36px; padding-top: 28px; border-top: 1px solid #e0d8c8; }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 26px; color: #163816; }
        .stat-label { font-size: 11px; color: #888; margin-top: 2px; }
        .hero-visual { background: #fff; border: 1px solid #e0d8c8; border-radius: 16px; padding: 20px; }
        @media (max-width: 768px) {
          .hero-wrap { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 36px; }
          .hero-h1 { font-size: 32px; }
          .hero-sub { font-size: 14px; }
          .hero-stats { gap: 20px; }
          .stat-num { font-size: 22px; }
        }

        /* BUTTONS */
        .btn-primary { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-ghost { background: transparent; color: #2D6A2D; border: 1.5px solid #2D6A2D; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }

        /* SECTIONS */
        .section { max-width: 1100px; margin: 0 auto; padding: 56px 24px; }
        .sec-tag { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.7px; color: #2D6A2D; margin-bottom: 10px; display: block; }
        .sec-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #163816; margin-bottom: 12px; letter-spacing: -0.5px; }
        .sec-sub { font-size: 14px; color: #666; font-weight: 300; line-height: 1.7; max-width: 520px; }
        @media (max-width: 640px) {
          .section { padding: 40px 20px; }
          .sec-title { font-size: 26px; }
        }

        /* PILLARS */
        .pillars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 36px; }
        .pillar-card { border-radius: 14px; padding: 20px; border: 1px solid transparent; }
        .pillar-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .pillar-tag { font-size: 10px; padding: 3px 8px; border-radius: 5px; font-weight: 500; }
        @media (max-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr; }
        }

        /* WHO */
        .who-section { background: #2D6A2D; padding: 56px 24px; }
        .who-inner { max-width: 1100px; margin: 0 auto; }
        .who-title { font-family: 'DM Serif Display', serif; font-size: 30px; color: #fff; margin-bottom: 8px; }
        .who-sub { font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 32px; font-weight: 300; }
        .who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .who-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 16px; }
        .who-emoji { font-size: 22px; margin-bottom: 8px; display: block; }
        .who-name { font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 4px; }
        .who-desc { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.5; }
        @media (max-width: 640px) {
          .who-grid { grid-template-columns: 1fr 1fr; }
          .who-title { font-size: 24px; }
        }
        @media (max-width: 400px) {
          .who-grid { grid-template-columns: 1fr; }
        }

        /* AGRISHINE HIGHLIGHT */
        .agrishine-inner { background: #fff; border-radius: 16px; padding: 36px; border: 1px solid #e8e0cc; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .agrishine-visual { background: #f0f7ec; border-radius: 14px; padding: 28px; text-align: center; }
        .agrishine-icons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .agrishine-icon { background: #fff; border-radius: 10px; padding: 10px; font-size: 12px; color: #444; }
        @media (max-width: 768px) {
          .agrishine-inner { grid-template-columns: 1fr; gap: 28px; padding: 24px; }
        }

        /* CTA */
        .cta-section { padding: 64px 24px; text-align: center; }
        .cta-title { font-family: 'DM Serif Display', serif; font-size: 34px; color: #163816; margin-bottom: 14px; letter-spacing: -0.5px; }
        .cta-sub { font-size: 14px; color: #666; font-weight: 300; margin-bottom: 28px; line-height: 1.7; max-width: 480px; margin-left: auto; margin-right: auto; }
        .cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .cta-title { font-size: 26px; }
          .cta-btns { flex-direction: column; align-items: center; }
        }

        /* FOOTER */
        .footer { background: #fff; border-top: 1px solid #e8e0cc; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        .footer-logo { font-family: 'DM Serif Display', serif; font-size: 14px; color: #2D6A2D; }
        .footer-copy { font-size: 11px; color: #aaa; }
        @media (max-width: 640px) {
          .footer { flex-direction: column; text-align: center; }
          .footer-copy { font-size: 10px; }
        }

        /* HERO VISUAL */
        .hv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .hv-title { font-size: 12px; font-weight: 500; color: #163816; }
        .hv-badge { font-size: 10px; background: #f0f7ec; color: #2D6A2D; border: 1px solid #b8dba8; border-radius: 6px; padding: 3px 8px; }
        .hv-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid #f5f0e8; }
        .hv-minis { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
        .hv-mini { background: #F5F5E8; border-radius: 8px; padding: 10px; text-align: center; }
        .hv-mini-num { font-family: 'DM Serif Display', serif; font-size: 18px; color: #163816; }
        .hv-mini-lbl { font-size: 10px; color: #888; }

        /* CHECK ITEMS */
        .check-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
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
            <a href="/auth" className="nav-link">Sign in</a>
          </div>
          <Link href="/auth" className="nav-cta">Get started free</Link>
        </nav>

        {/* Hero */}
        <div style={{ background: "#F5F5E8" }}>
          <div className="hero-wrap">
            <div>
              <div className="hero-tag">🌿 MVP v0.1 — Now live</div>
              <h1 className="hero-h1">Growing knowledge, gardens & communities.</h1>
              <p className="hero-sub">LIFEWS Connect links schools, teachers, parents, students, and community partners through food, energy, and water education — one garden at a time.</p>
              <div className="hero-btns">
                <Link href="/auth" className="btn-primary">Join as a school</Link>
                <a href="#pillars" className="btn-ghost">Explore pillars</a>
              </div>
              <div className="hero-stats">
                {[["4", "Learning pillars"], ["6+", "Languages supported"], ["∞", "Impact potential"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="stat-num">{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hv-header">
                <span className="hv-title">Garden tracker — Greenfield Primary</span>
                <span className="hv-badge">● Live</span>
              </div>
              {CROPS.map(c => (
                <div key={c.name} className="hv-row">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "#444", width: 65, flexShrink: 0 }}>{c.name}</span>
                  <div style={{ flex: 1, height: 6, background: "#f0ece0", borderRadius: 3 }}>
                    <div style={{ width: `${c.pct}%`, height: 6, borderRadius: 3, background: c.color }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: c.color, width: 30, textAlign: "right" }}>{c.pct}%</span>
                </div>
              ))}
              <div className="hv-minis">
                {[["12", "Students active"], ["3", "Harvests this week"], ["5", "Lessons done"], ["2", "Badges earned"]].map(([n, l]) => (
                  <div key={l} className="hv-mini">
                    <div className="hv-mini-num">{n}</div>
                    <div className="hv-mini-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div id="pillars">
          <div className="section">
            <span className="sec-tag">Four pillars</span>
            <h2 className="sec-title">One ecosystem, four pathways</h2>
            <p className="sec-sub">Every user finds their place — whether you&apos;re a school admin, a teacher, a parent growing food at home, or a youth building green skills.</p>
            <div className="pillars-grid">
              {PILLARS.map(p => (
                <div key={p.name} className="pillar-card" style={{ background: p.bg, borderColor: p.border }}>
                  <span style={{ fontSize: 26, marginBottom: 10, display: "block" }}>{p.emoji}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8, color: p.color }}>{p.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: p.color, marginBottom: 10 }}>{p.desc}</p>
                  <div className="pillar-tags">
                    {p.tags.map(t => (
                      <span key={t} className="pillar-tag" style={{ background: `${p.color}18`, color: p.color }}>{t}</span>
                    ))}
                  </div>
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

        {/* AgriShine highlight */}
        <div className="section">
          <div className="agrishine-inner">
            <div>
              <span className="sec-tag">Featured pillar</span>
              <h2 className="sec-title" style={{ fontSize: 26 }}>Start with AgriShine™</h2>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>
                AgriShine is our flagship pillar — connecting schools and teachers through hands-on food, energy, and water education. Register your school today and get access to:
              </p>
              {["School garden tracker", "AgriShine lesson plans", "Student participation tracking", "Teacher tools and badges", "Community garden network"].map(item => (
                <div key={item} className="check-item">
                  <div className="check-icon">✓</div>
                  <span style={{ fontSize: 13, color: "#444" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 24 }}>
                <Link href="/auth" className="btn-primary">Register your school →</Link>
              </div>
            </div>
            <div className="agrishine-visual">
              <div style={{ fontSize: 56, marginBottom: 12 }}>🌱</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#163816", marginBottom: 6 }}>AgriShine™</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>School gardens & FEW systems learning</div>
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
          <h2 className="cta-title">Ready to grow your community?</h2>
          <p className="cta-sub">Join the LIFEWS Connect ecosystem today — free to start, built to scale with your school, family, or organisation.</p>
          <div className="cta-btns">
            <Link href="/auth" className="btn-primary">Get started free</Link>
            <Link href="/auth" className="btn-ghost">Sign in</Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">LIFEWS Connect™</div>
          <div className="footer-copy">MVP v0.1 · Growing knowledge, gardens & communities · AgriShine™ AgriAble™ AgriNext™ AgriRoots™</div>
        </footer>

      </div>
    </>
  );
}
