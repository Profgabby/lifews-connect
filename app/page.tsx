import Link from "next/link";

const PILLARS = [
  {
    name: "AgriShine™",
    color: "#2D6A2D",
    bg: "#f0f7ec",
    border: "#b8dba8",
    desc: "School gardens, agrivoltaics, and FEW systems learning for classrooms and teachers.",
    tags: ["Schools", "Teachers", "Garden tracker", "Lessons"],
    emoji: "🌱",
  },
  {
    name: "AgriAble™",
    color: "#854F0B",
    bg: "#faeeda",
    border: "#fac775",
    desc: "Inclusion, special-needs support, home gardens, and adaptive learning for families.",
    tags: ["Parents", "Home gardens", "Adaptive learning"],
    emoji: "🤝",
  },
  {
    name: "AgriNext™",
    color: "#185FA5",
    bg: "#e6f1fb",
    border: "#b5d4f4",
    desc: "STEM innovation, digital agriculture, green jobs and youth future skills.",
    tags: ["Youth", "STEM", "Green jobs", "Learn-to-earn"],
    emoji: "🚀",
  },
  {
    name: "AgriRoots™",
    color: "#534AB7",
    bg: "#eeedfe",
    border: "#cecbf6",
    desc: "Culture, language, local knowledge, artisan networks and food heritage.",
    tags: ["Artisans", "Languages", "Community", "Heritage"],
    emoji: "🌍",
  },
];

const WHO = [
  { emoji: "🏫", name: "Schools & admins",    desc: "Manage gardens, teachers, students, and school-wide sustainability programs." },
  { emoji: "📚", name: "Teachers",             desc: "Access lesson plans, track participation, and grow your agri-teaching career." },
  { emoji: "👨‍👩‍👧", name: "Parents & families",  desc: "Grow home gardens, support children's learning, and join the community." },
  { emoji: "⚡", name: "Youth",                desc: "Build green skills, earn certificates, and access learn-to-earn opportunities." },
  { emoji: "🛠",  name: "Artisans & vendors",  desc: "Find contracts, sell agri-products, and connect with installation projects." },
  { emoji: "🏢", name: "NGOs & partners",      desc: "Coordinate programs, measure impact, and reach communities at scale." },
];

const STATS = [
  { num: "4",   label: "Learning pillars" },
  { num: "6+",  label: "Languages supported" },
  { num: "∞",   label: "Impact potential" },
];

const G: Record<string, React.CSSProperties> = {
  page:       { fontFamily: "'DM Sans', sans-serif", background: "#F5F5E8", margin: 0 },
  // Nav
  nav:        { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const, top: 0, zIndex: 100 },
  navLogo:    { display: "flex", alignItems: "center", gap: 10 },
  navMark:    { width: 34, height: 34, background: "#2D6A2D", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  navName:    { fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#163816", letterSpacing: -0.2 },
  navLinks:   { display: "flex", alignItems: "center", gap: 28 },
  navLink:    { fontSize: 13, color: "#555", textDecoration: "none" },
  navCta:     { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-block" },
  // Hero
  heroWrap:   { maxWidth: 1100, margin: "0 auto", padding: "80px 40px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" },
  heroTag:    { display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 500, color: "#2D6A2D", marginBottom: 20, textTransform: "uppercase" as const, letterSpacing: 0.5 },
  h1:         { fontFamily: "'DM Serif Display', serif", fontSize: 52, color: "#163816", lineHeight: 1.1, letterSpacing: -1, marginBottom: 18, marginTop: 0 },
  heroSub:    { fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 32, fontWeight: 300, marginTop: 0 },
  heroStats:  { display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid #e0d8c8" },
  statNum:    { fontFamily: "'DM Serif Display', serif", fontSize: 30, color: "#163816" },
  statLabel:  { fontSize: 11, color: "#888", marginTop: 2 },
  // Hero visual
  heroVisual: { background: "#fff", border: "1px solid #e0d8c8", borderRadius: 20, padding: 24 },
  hvHeader:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  hvTitle:    { fontSize: 13, fontWeight: 500, color: "#163816" },
  hvBadge:    { fontSize: 10, background: "#f0f7ec", color: "#2D6A2D", border: "1px solid #b8dba8", borderRadius: 6, padding: "3px 8px" },
  hvRow:      { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f5f0e8" },
  hvBar:      { height: 6, borderRadius: 3, flex: 1 },
  hvMinis:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 },
  hvMini:     { background: "#F5F5E8", borderRadius: 8, padding: 10, textAlign: "center" as const },
  hvMiniNum:  { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#163816" },
  hvMiniLbl:  { fontSize: 10, color: "#888" },
  // Buttons
  btnPrimary: { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-block" },
  btnGhost:   { background: "transparent", color: "#2D6A2D", border: "1.5px solid #2D6A2D", borderRadius: 10, padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-block", marginLeft: 12 },
  // Sections
  section:    { maxWidth: 1100, margin: "0 auto", padding: "60px 40px" },
  secTag:     { fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.7, color: "#2D6A2D", marginBottom: 10, display: "block" },
  secTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#163816", marginBottom: 12, letterSpacing: -0.5, marginTop: 0 },
  secSub:     { fontSize: 15, color: "#666", fontWeight: 300, lineHeight: 1.7, maxWidth: 540, marginTop: 0 },
  // Pillars
  pillarsGrid:{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 },
  pillarCard: { borderRadius: 16, padding: 24, border: "1px solid transparent", cursor: "pointer" },
  pillarIcon: { fontSize: 28, marginBottom: 12, display: "block" },
  pillarName: { fontSize: 16, fontWeight: 500, marginBottom: 8, marginTop: 0 },
  pillarDesc: { fontSize: 13, lineHeight: 1.6, marginTop: 0, marginBottom: 12 },
  pillarTags: { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  pillarTag:  { fontSize: 10, padding: "3px 8px", borderRadius: 5, fontWeight: 500 },
  // Who
  whoSection: { background: "#2D6A2D", padding: "60px 40px" },
  whoInner:   { maxWidth: 1100, margin: "0 auto" },
  whoTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 34, color: "#fff", marginBottom: 8, marginTop: 0 },
  whoSub:     { fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 36, fontWeight: 300, marginTop: 0 },
  whoGrid:    { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  whoCard:    { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: 18 },
  whoEmoji:   { fontSize: 24, marginBottom: 10, display: "block" },
  whoName:    { fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4, marginTop: 0 },
  whoDesc:    { fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginTop: 0 },
  // CTA
  ctaSection: { padding: "70px 40px", textAlign: "center" as const },
  ctaTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 38, color: "#163816", marginBottom: 14, letterSpacing: -0.5, marginTop: 0 },
  ctaSub:     { fontSize: 15, color: "#666", fontWeight: 300, marginBottom: 32, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" },
  // Footer
  footer:     { background: "#fff", borderTop: "1px solid #e8e0cc", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 14, color: "#2D6A2D" },
  footerCopy: { fontSize: 12, color: "#aaa" },
};

const CROPS = [
  { name: "Tomatoes", pct: 78, color: "#2D6A2D" },
  { name: "Spinach",  pct: 45, color: "#854F0B" },
  { name: "Peppers",  pct: 62, color: "#185FA5" },
  { name: "Cassava",  pct: 90, color: "#534AB7" },
];

export default function LandingPage() {
  return (
    <div style={G.page}>
      {/* Nav */}
      <nav style={G.nav}>
        <div style={G.navLogo}>
          <div style={G.navMark}>🌱</div>
          <span style={G.navName}>LIFEWS Connect</span>
        </div>
        <div style={G.navLinks}>
          <a href="#pillars" style={G.navLink}>Pillars</a>
          <a href="#who" style={G.navLink}>Who it's for</a>
          <a href="/auth" style={G.navLink}>Sign in</a>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/auth" style={G.navCta}>Get started free</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#F5F5E8" }}>
        <div style={G.heroWrap}>
          <div>
            <div style={G.heroTag}>🌿 MVP v0.1 — Now live</div>
            <h1 style={G.h1}>Growing knowledge,<br />gardens &<br />communities.</h1>
            <p style={G.heroSub}>
              LIFEWS Connect links schools, teachers, parents, students, and community partners
              through food, energy, and water education — one garden at a time.
            </p>
            <div>
              <Link href="/auth" style={G.btnPrimary}>Join as a school</Link>
              <a href="#pillars" style={G.btnGhost}>Explore pillars</a>
            </div>
            <div style={G.heroStats}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={G.statNum}>{s.num}</div>
                  <div style={G.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={G.heroVisual}>
            <div style={G.hvHeader}>
              <span style={G.hvTitle}>Garden tracker — Greenfield Primary</span>
              <span style={G.hvBadge}>● Live</span>
            </div>
            {CROPS.map(c => (
              <div key={c.name} style={G.hvRow}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#444", width: 70 }}>{c.name}</span>
                <div style={{ flex: 1, height: 6, background: "#f0ece0", borderRadius: 3 }}>
                  <div style={{ ...G.hvBar, width: `${c.pct}%`, background: c.color }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: c.color, width: 32, textAlign: "right" }}>{c.pct}%</span>
              </div>
            ))}
            <div style={G.hvMinis}>
              {[["12", "Students active"], ["3", "Harvests this week"], ["5", "Lessons done"], ["2", "Badges earned"]].map(([n, l]) => (
                <div key={l} style={G.hvMini}>
                  <div style={G.hvMiniNum}>{n}</div>
                  <div style={G.hvMiniLbl}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div id="pillars">
        <div style={G.section}>
          <span style={G.secTag}>Four pillars</span>
          <h2 style={G.secTitle}>One ecosystem,<br />four pathways</h2>
          <p style={G.secSub}>Every user finds their place — whether you're a school admin, a teacher, a parent growing food at home, or a youth building green skills.</p>
          <div style={G.pillarsGrid}>
            {PILLARS.map(p => (
              <div key={p.name} style={{ ...G.pillarCard, background: p.bg, borderColor: p.border }}>
                <span style={G.pillarIcon}>{p.emoji}</span>
                <h3 style={{ ...G.pillarName, color: p.color }}>{p.name}</h3>
                <p style={{ ...G.pillarDesc, color: p.color }}>{p.desc}</p>
                <div style={G.pillarTags}>
                  {p.tags.map(t => (
                    <span key={t} style={{ ...G.pillarTag, background: `${p.color}18`, color: p.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who */}
      <div id="who" style={G.whoSection}>
        <div style={G.whoInner}>
          <h2 style={G.whoTitle}>Built for everyone in the ecosystem</h2>
          <p style={G.whoSub}>One platform, many doors — each role gets a personalised experience</p>
          <div style={G.whoGrid}>
            {WHO.map(w => (
              <div key={w.name} style={G.whoCard}>
                <span style={G.whoEmoji}>{w.emoji}</span>
                <h3 style={G.whoName}>{w.name}</h3>
                <p style={G.whoDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AgriShine highlight */}
      <div style={G.section}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 48, border: "1px solid #e8e0cc", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span style={G.secTag}>Featured pillar</span>
            <h2 style={{ ...G.secTitle, fontSize: 28 }}>Start with AgriShine™</h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
              AgriShine is our flagship pillar — connecting schools and teachers through hands-on food, energy, and water education. Register your school today and get access to:
            </p>
            {["School garden tracker", "AgriShine lesson plans", "Student participation tracking", "Teacher tools and badges", "Community garden network"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#f0f7ec", border: "1px solid #b8dba8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#2D6A2D", flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 14, color: "#444" }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <Link href="/auth" style={G.btnPrimary}>Register your school →</Link>
            </div>
          </div>
          <div style={{ background: "#f0f7ec", borderRadius: 16, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌱</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 8 }}>AgriShine™</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>School gardens & FEW systems learning</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              {[["🏫", "Schools"], ["📚", "Teachers"], ["👩‍🎓", "Students"], ["👨‍👩‍👧", "Parents"]].map(([e, l]) => (
                <div key={l} style={{ background: "#fff", borderRadius: 10, padding: 12, fontSize: 12, color: "#444" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{e}</div>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={G.ctaSection}>
        <h2 style={G.ctaTitle}>Ready to grow<br />your community?</h2>
        <p style={G.ctaSub}>Join the LIFEWS Connect ecosystem today — free to start, built to scale with your school, family, or organisation.</p>
        <div>
          <Link href="/auth" style={G.btnPrimary}>Get started free</Link>
          <Link href="/auth" style={G.btnGhost}>Sign in</Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={G.footer}>
        <div style={G.footerLogo}>LIFEWS Connect™</div>
        <div style={G.footerCopy}>MVP v0.1 · Growing knowledge, gardens & communities · AgriShine™ AgriAble™ AgriNext™ AgriRoots™</div>
      </footer>
    </div>
  );
}
