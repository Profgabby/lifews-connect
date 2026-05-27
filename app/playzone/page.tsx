import Link from "next/link";

const AGE_GROUPS = [
  {
    id: "seedlings",
    emoji: "🌱",
    name: "Seedlings",
    age: "Ages 3–5",
    level: "Nursery",
    color: "#2D6A2D",
    bg: "#f0f7ec",
    border: "#b8dba8",
    desc: "Simple, fun, visual games for the youngest learners — seeds, gardens, colours, and nature.",
    games: 25,
    categories: ["Garden Explorers", "Nature Friends", "Food & Eating", "Earth & Water", "French Garden"],
  },
  {
    id: "sprouts",
    emoji: "🌿",
    name: "Sprouts",
    age: "Ages 6–10",
    level: "Lower Primary",
    color: "#185FA5",
    bg: "#e6f1fb",
    border: "#b5d4f4",
    desc: "Interactive quizzes, sorting games, and garden simulations for growing minds.",
    games: 25,
    categories: ["Garden Science", "Climate & Weather", "Food & Nutrition", "Environment Heroes", "French Garden"],
  },
  {
    id: "growers",
    emoji: "🌳",
    name: "Growers",
    age: "Ages 11–13",
    level: "Upper Primary / JSS",
    color: "#854F0B",
    bg: "#faeeda",
    border: "#fac775",
    desc: "Deeper challenges — crop rotation, carbon footprints, food systems, and eco-design.",
    games: 25,
    categories: ["Agri-Science", "Climate Literacy", "Food Systems", "Community & Environment", "French STEM"],
  },
  {
    id: "pioneers",
    emoji: "🚀",
    name: "Pioneers",
    age: "Ages 14–18",
    level: "Junior & Senior Secondary",
    color: "#534AB7",
    bg: "#eeedfe",
    border: "#cecbf6",
    desc: "Advanced simulations — agribusiness, climate policy, AgriTech innovation, and leadership.",
    games: 25,
    categories: ["Advanced Agribusiness", "Climate Action", "Innovation & Tech", "Leadership", "French Advanced"],
  },
  {
    id: "champions",
    emoji: "🏆",
    name: "Champions",
    age: "18+",
    level: "Teachers, Parents & Community",
    color: "#8B1A1A",
    bg: "#fdf0f0",
    border: "#f5b8b8",
    desc: "Professional challenges for teachers, family sustainability games, and community programs.",
    games: 25,
    categories: ["Teacher Edition", "Parent & Family", "Community Edition", "Climate Literacy Pro", "French Champions"],
  },
];

const REWARDS = [
  { pts: "500",    icon: "🏅", label: "Learning Badge",              color: "#2D6A2D" },
  { pts: "1,000",  icon: "🎮", label: "Unlock Premium Game",         color: "#185FA5" },
  { pts: "2,500",  icon: "📚", label: "Free LIFEWSBooks Chapter",    color: "#854F0B" },
  { pts: "5,000",  icon: "⭐", label: "1 Month Premium Access",      color: "#534AB7" },
  { pts: "10,000", icon: "🌱", label: "School Garden Seed Kit",      color: "#2D6A2D" },
  { pts: "25,000", icon: "🎓", label: "Free LIFEWSAcademy Course",   color: "#185FA5" },
  { pts: "50,000", icon: "💰", label: "Cash Prize (₦5,000)",         color: "#854F0B" },
  { pts: "100,000",icon: "🏡", label: "Garden Hub Starter Kit",      color: "#534AB7" },
];

const BADGES = [
  { icon: "🌱", name: "Seedling",       desc: "First game completed" },
  { icon: "🌿", name: "Grower",         desc: "10 games completed" },
  { icon: "🌳", name: "Forest Champion",desc: "50 games completed" },
  { icon: "🌍", name: "Climate Hero",   desc: "All climate games done" },
  { icon: "🏆", name: "LIFEWS Legend",  desc: "100,000 points earned" },
  { icon: "🇫🇷", name: "French Expert", desc: "All French categories" },
  { icon: "🏫", name: "School Champion",desc: "Top school in region" },
  { icon: "👨‍👩‍👧", name: "Green Family",  desc: "Family challenges done" },
  { icon: "⚡", name: "Energy Saver",   desc: "All energy games done" },
  { icon: "💧", name: "Water Guardian", desc: "All water games done" },
];

const CATEGORIES_PREVIEW = [
  { icon: "🌱", name: "Garden & Nature",    desc: "Seeds, plants, soil, garden trackers, and growing food" },
  { icon: "🌍", name: "Climate & Energy",   desc: "Carbon footprint, renewable energy, climate literacy" },
  { icon: "🍎", name: "Food Systems",       desc: "Farm to fork, nutrition, food security, markets" },
  { icon: "🔬", name: "Science & Tech",     desc: "AgriTech, precision farming, innovation challenges" },
  { icon: "🇫🇷", name: "French Language",   desc: "Garden, nature, climate, and food — all in French" },
];

export default function PlayZonePage() {
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
        .nav-link.active { color: #2D6A2D; font-weight: 600; }
        .nav-cta { background: #2D6A2D; color: #fff; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 500; text-decoration: none; }
        @media (max-width: 640px) { .nav-links { display: none; } }

        /* HERO */
        .hero { background: linear-gradient(135deg, #0a2e0a, #163816, #1a4a1a); padding: 80px 24px 64px; text-align: center; position: relative; overflow: hidden; }
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
        .hero-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 6px 16px; font-size: 12px; color: #7ec850; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 24px; text-transform: uppercase; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 56px; color: #fff; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; }
        .hero-title span { color: #7ec850; }
        .hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.75; font-weight: 300; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
        .hero-stats { display: flex; gap: 40px; justify-content: center; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; }
        .hero-stat-num { font-family: 'DM Serif Display', serif; font-size: 32px; color: #7ec850; }
        .hero-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 2px; }
        @media (max-width: 640px) { .hero { padding: 56px 20px 48px; } .hero-title { font-size: 36px; } .hero-sub { font-size: 14px; } .hero-stats { gap: 24px; } }

        .btn-green { background: #7ec850; color: #163816; border: none; border-radius: 12px; padding: 13px 28px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-green:hover { background: #92d864; }
        .btn-ghost-white { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.3); border-radius: 12px; padding: 13px 28px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-ghost-white:hover { border-color: rgba(255,255,255,0.6); }
        .btn-primary { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: #1a4a1a; }
        .btn-outline { background: transparent; color: #2D6A2D; border: 1.5px solid #2D6A2D; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; }

        /* SECTIONS */
        .section { max-width: 1100px; margin: 0 auto; padding: 64px 24px; }
        .sec-tag { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #2D6A2D; margin-bottom: 12px; display: block; }
        .sec-title { font-family: 'DM Serif Display', serif; font-size: 34px; color: #163816; margin-bottom: 14px; letter-spacing: -0.5px; }
        .sec-sub { font-size: 15px; color: #666; font-weight: 300; line-height: 1.7; max-width: 540px; }
        @media (max-width: 640px) { .section { padding: 44px 20px; } .sec-title { font-size: 26px; } }

        /* AGE GROUPS */
        .age-groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
        .age-card { border-radius: 20px; padding: 28px; border: 1px solid transparent; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; text-decoration: none; display: block; }
        .age-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .age-emoji { font-size: 40px; margin-bottom: 14px; display: block; }
        .age-name { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 4px; }
        .age-level { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; opacity: 0.7; }
        .age-desc { font-size: 13px; color: #555; line-height: 1.6; margin-bottom: 16px; }
        .age-cats { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }
        .age-cat { font-size: 10px; padding: 3px 8px; border-radius: 5px; font-weight: 500; }
        .age-footer { display: flex; align-items: center; justify-content: space-between; }
        .age-games { font-size: 12px; font-weight: 600; }
        .age-btn { font-size: 12px; font-weight: 600; text-decoration: none; }

        /* CATEGORIES PREVIEW */
        .cats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 36px; }
        .cat-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 16px; padding: 20px; text-align: center; transition: all 0.2s; }
        .cat-card:hover { border-color: #2D6A2D; box-shadow: 0 4px 16px rgba(45,106,45,0.1); }
        .cat-icon { font-size: 32px; margin-bottom: 10px; display: block; }
        .cat-name { font-size: 14px; font-weight: 600; color: #163816; margin-bottom: 6px; }
        .cat-desc { font-size: 12px; color: #777; line-height: 1.5; }

        /* HOW IT WORKS */
        .how-section { background: #fff; padding: 64px 24px; }
        .how-inner { max-width: 1100px; margin: 0 auto; }
        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 40px; }
        .how-step { text-align: center; padding: 24px; }
        .how-num { width: 48px; height: 48px; border-radius: 50%; background: #2D6A2D; color: #fff; font-family: 'DM Serif Display', serif; font-size: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .how-title { font-size: 15px; font-weight: 600; color: #163816; margin-bottom: 8px; }
        .how-desc { font-size: 13px; color: #666; line-height: 1.6; }

        /* REWARDS */
        .rewards-section { background: #163816; padding: 64px 24px; }
        .rewards-inner { max-width: 1100px; margin: 0 auto; }
        .rewards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 40px; }
        .reward-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; text-align: center; transition: background 0.2s; }
        .reward-card:hover { background: rgba(255,255,255,0.12); }
        .reward-icon { font-size: 32px; margin-bottom: 10px; display: block; }
        .reward-pts { font-family: 'DM Serif Display', serif; font-size: 20px; color: #7ec850; margin-bottom: 4px; }
        .reward-label { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.4; }

        /* BADGES */
        .badges-section { background: #F5F5E8; padding: 64px 24px; }
        .badges-inner { max-width: 1100px; margin: 0 auto; }
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 36px; }
        .badge-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 14px; padding: 16px; text-align: center; }
        .badge-icon { font-size: 28px; margin-bottom: 8px; display: block; }
        .badge-name { font-size: 13px; font-weight: 600; color: #163816; margin-bottom: 4px; }
        .badge-desc { font-size: 11px; color: #888; }

        /* LEADERBOARD PREVIEW */
        .lb-section { background: #2D6A2D; padding: 64px 24px; }
        .lb-inner { max-width: 1100px; margin: 0 auto; }
        .lb-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .lb-tab { padding: "7px 16px"; border-radius: 20px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; text-decoration: none; }
        .lb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .lb-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 20px; }
        .lb-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 16px; }
        .lb-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .lb-row:last-child { border-bottom: none; }
        .lb-rank { font-family: 'DM Serif Display', serif; font-size: 18px; color: #7ec850; width: 28px; flex-shrink: 0; }
        .lb-name { flex: 1; font-size: 13px; color: #fff; }
        .lb-pts { font-size: 12px; color: #7ec850; font-weight: 600; }
        @media (max-width: 640px) { .lb-grid { grid-template-columns: 1fr; } }

        /* SUBSCRIPTION */
        .sub-section { background: #fff; padding: 64px 24px; }
        .sub-inner { max-width: 1100px; margin: 0 auto; }
        .sub-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 40px; }
        .sub-card { border-radius: 20px; padding: 28px; border: 1px solid #e8e0cc; }
        .sub-card.featured { background: #2D6A2D; border-color: #2D6A2D; }
        .sub-name { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .sub-price { font-family: 'DM Serif Display', serif; font-size: 32px; color: #163816; margin-bottom: 4px; }
        .sub-card.featured .sub-price { color: #fff; }
        .sub-card.featured .sub-name { color: rgba(255,255,255,0.7); }
        .sub-period { font-size: 12px; color: #888; margin-bottom: 20px; }
        .sub-card.featured .sub-period { color: rgba(255,255,255,0.5); }
        .sub-features { list-style: none; space-y: 8px; }
        .sub-feature { font-size: 13px; color: #555; padding: 5px 0; display: flex; align-items: center; gap: 8px; }
        .sub-card.featured .sub-feature { color: rgba(255,255,255,0.8); }
        .sub-feature::before { content: "✓"; color: #2D6A2D; font-weight: 700; }
        .sub-card.featured .sub-feature::before { color: #7ec850; }

        /* CTA */
        .cta-section { background: #F5F5E8; padding: 80px 24px; text-align: center; }
        .cta-title { font-family: 'DM Serif Display', serif; font-size: 40px; color: #163816; margin-bottom: 16px; letter-spacing: -0.5px; }
        .cta-sub { font-size: 15px; color: #666; font-weight: 300; margin-bottom: 32px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* FOOTER */
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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/#pillars" className="nav-link">Pillars</Link>
            <Link href="/playzone" className="nav-link active">PlayZone</Link>
            <Link href="/platforms" className="nav-link">Platforms</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/auth" className="nav-link">Sign in</Link>
          </div>
          <Link href="/auth" className="nav-cta">Play Free</Link>
        </nav>

        {/* Hero */}
        <div className="hero">
          <div className="hero-glow" style={{ width: 600, height: 600, background: "#7ec850", top: -200, left: "20%" }} />
          <div className="hero-glow" style={{ width: 400, height: 400, background: "#185FA5", bottom: -100, right: "10%" }} />
          <div className="hero-inner">
            <div className="hero-badge">🎮 LIFEWS PlayZone — Now Live</div>
            <h1 className="hero-title">
              Learn. Play.<br /><span>Win Rewards.</span>
            </h1>
            <p className="hero-sub">
              Play sustainability games, complete eco-challenges, earn LIFEWS Points, and win real prizes — garden kits, courses, cash, and more. Built for nursery to university, teachers and parents too.
            </p>
            <div className="hero-btns">
              <Link href="/auth" className="btn-green">🎮 Start Playing Free</Link>
              <a href="#age-groups" className="btn-ghost-white">Choose Your Level →</a>
            </div>
            <div className="hero-stats">
              {[
                ["100+", "Games available"],
                ["5", "Age groups"],
                ["5", "Categories each"],
                ["3", "Difficulty levels"],
                ["∞", "Prizes to win"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Categories Preview */}
        <div style={{ background: "#fff" }}>
          <div className="section">
            <span className="sec-tag">Game Categories</span>
            <h2 className="sec-title">5 themed categories for every level</h2>
            <p className="sec-sub">Every age group plays through the same 5 themed categories — at the right depth for their level. Plus French language versions throughout.</p>
            <div className="cats-grid">
              {CATEGORIES_PREVIEW.map(c => (
                <div key={c.name} className="cat-card">
                  <span className="cat-icon">{c.icon}</span>
                  <div className="cat-name">{c.name}</div>
                  <p className="cat-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Age Groups */}
        <div id="age-groups" style={{ background: "#F5F5E8" }}>
          <div className="section">
            <span className="sec-tag">Choose Your Level</span>
            <h2 className="sec-title">Games for every age and every role</h2>
            <p className="sec-sub">From nursery to university, teachers to parents — everyone has their own PlayZone with age-appropriate challenges.</p>
            <div className="age-groups">
              {AGE_GROUPS.map(g => (
                <Link key={g.id} href={'/playzone/' + g.id as any} className="age-card" style={{ background: g.bg, borderColor: g.border }}>
                  <span className="age-emoji">{g.emoji}</span>
                  <div className="age-name" style={{ color: g.color }}>{g.name}</div>
                  <div className="age-level" style={{ color: g.color }}>{g.age} · {g.level}</div>
                  <p className="age-desc">{g.desc}</p>
                  <div className="age-cats">
                    {g.categories.map(c => (
                      <span key={c} className="age-cat" style={{ background: `${g.color}18`, color: g.color }}>{c}</span>
                    ))}
                  </div>
                  <div className="age-footer">
                    <span className="age-games" style={{ color: g.color }}>{g.games} games</span>
                    <span className="age-btn" style={{ color: g.color }}>Play now →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="how-section">
          <div className="how-inner">
            <span className="sec-tag">How It Works</span>
            <h2 className="sec-title">Play, earn, and win</h2>
            <div className="how-grid">
              {[
                { n: "1", title: "Choose your level", desc: "Select your age group — Seedlings, Sprouts, Growers, Pioneers, or Champions." },
                { n: "2", title: "Pick a category", desc: "Choose from Garden & Nature, Climate, Food Systems, Science & Tech, or French." },
                { n: "3", title: "Play games", desc: "Easy, Medium, and Hard levels. Complete steps and answer challenges to earn points." },
                { n: "4", title: "Earn LIFEWS Points", desc: "Every game, quiz, and challenge earns you LIFEWS Points automatically." },
                { n: "5", title: "Win real prizes", desc: "Redeem points for garden kits, courses, cash prizes, badges, and certificates." },
              ].map(s => (
                <div key={s.n} className="how-step">
                  <div className="how-num">{s.n}</div>
                  <div className="how-title">{s.title}</div>
                  <p className="how-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="rewards-section">
          <div className="rewards-inner">
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#7ec850", marginBottom: 12, display: "block" }}>LIFEWS Points Rewards</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, color: "#fff", marginBottom: 14 }}>Real rewards for real learning</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: 540, marginBottom: 0 }}>
              Every point you earn brings you closer to something real — from digital badges to garden kits and cash prizes.
            </p>
            <div className="rewards-grid" style={{ marginTop: 40 }}>
              {REWARDS.map(r => (
                <div key={r.pts} className="reward-card">
                  <span className="reward-icon">{r.icon}</span>
                  <div className="reward-pts">{r.pts} pts</div>
                  <div className="reward-label">{r.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <Link href="/auth" className="btn-green">Start Earning Points →</Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="badges-section">
          <div className="badges-inner">
            <span className="sec-tag">Achievements</span>
            <h2 className="sec-title">Collect badges & certificates</h2>
            <p className="sec-sub">Earn badges as you complete challenges. Show them off on your profile. Certificates are available for premium subscribers.</p>
            <div className="badges-grid">
              {BADGES.map(b => (
                <div key={b.name} className="badge-card">
                  <span className="badge-icon">{b.icon}</span>
                  <div className="badge-name">{b.name}</div>
                  <div className="badge-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="lb-section">
          <div className="lb-inner">
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#7ec850", marginBottom: 12, display: "block" }}>Leaderboards</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, color: "#fff", marginBottom: 14 }}>Compete with schools worldwide</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>
              100 schools can play simultaneously. Individual scores combine into school rankings. Weekly and monthly winners get special prizes.
            </p>
            <div className="lb-grid">
              <div className="lb-card">
                <div className="lb-title">🏆 Top Students This Week</div>
                {[
                  ["1", "Amara O.", "12,450 pts"],
                  ["2", "Kofi M.", "11,200 pts"],
                  ["3", "Fatima A.", "10,800 pts"],
                  ["4", "Emeka J.", "9,650 pts"],
                  ["5", "Zara L.", "9,100 pts"],
                ].map(([rank, name, pts]) => (
                  <div key={rank} className="lb-row">
                    <div className="lb-rank">{rank}</div>
                    <div className="lb-name">{name}</div>
                    <div className="lb-pts">{pts}</div>
                  </div>
                ))}
              </div>
              <div className="lb-card">
                <div className="lb-title">🏫 Top Schools This Month</div>
                {[
                  ["1", "Greenfield Primary, Lagos", "245,000 pts"],
                  ["2", "Unity Academy, Abuja", "231,500 pts"],
                  ["3", "Eden School, Accra", "218,200 pts"],
                  ["4", "Sunrise College, Nairobi", "204,700 pts"],
                  ["5", "Forest Intl, Cape Town", "198,300 pts"],
                ].map(([rank, name, pts]) => (
                  <div key={rank} className="lb-row">
                    <div className="lb-rank">{rank}</div>
                    <div className="lb-name">{name}</div>
                    <div className="lb-pts">{pts}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="sub-section">
          <div className="sub-inner">
            <span className="sec-tag">Subscription Plans</span>
            <h2 className="sec-title">Free to start. More when you&apos;re ready.</h2>
            <p className="sec-sub">Play for free with selected games, or unlock the full LIFEWS PlayZone experience with premium access.</p>
            <div className="sub-grid">
              {[
                {
                  name: "Free", price: "₦0", period: "Always free", featured: false,
                  features: ["2 games per category", "Basic LIFEWS Points", "Public leaderboard", "Community badges", "Selected challenges"],
                },
                {
                  name: "Premium", price: "₦1,500", period: "per month", featured: true,
                  features: ["All 100+ games", "Full LIFEWS Points rewards", "Advanced leaderboard", "Certificates", "Premium tournaments", "Priority prize access"],
                },
                {
                  name: "School", price: "₦15,000", period: "per term", featured: false,
                  features: ["Whole school access", "Teacher dashboard", "Class & school rankings", "Inter-school competitions", "Analytics & reports", "Custom challenges"],
                },
                {
                  name: "Family", price: "₦3,000", period: "per month", featured: false,
                  features: ["2 parents + 3 children", "Shared family points", "Family leaderboard", "Home garden challenges", "Green Family badge", "Family certificates"],
                },
              ].map(p => (
                <div key={p.name} className={`sub-card ${p.featured ? "featured" : ""}`}>
                  <div className="sub-name" style={{ color: p.featured ? "rgba(255,255,255,0.7)" : "#888" }}>{p.name}</div>
                  <div className="sub-price" style={{ color: p.featured ? "#fff" : "#163816" }}>{p.price}</div>
                  <div className="sub-period" style={{ color: p.featured ? "rgba(255,255,255,0.5)" : "#888" }}>{p.period}</div>
                  <ul className="sub-features">
                    {p.features.map(f => (
                      <li key={f} className="sub-feature" style={{ color: p.featured ? "rgba(255,255,255,0.85)" : "#555" }}>
                        <span style={{ color: p.featured ? "#7ec850" : "#2D6A2D", fontWeight: 700 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth" style={{ display: "block", textAlign: "center", marginTop: 20, padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none", background: p.featured ? "#7ec850" : "transparent", color: p.featured ? "#163816" : "#2D6A2D", border: p.featured ? "none" : "1.5px solid #2D6A2D" }}>
                    {p.featured ? "Get Premium →" : "Get Started →"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to play and win?</h2>
          <p className="cta-sub">Join thousands of students, teachers, and families playing LIFEWS games — and earning real rewards while learning about sustainability.</p>
          <div className="cta-btns">
            <Link href="/auth" className="btn-primary">🎮 Start Playing Free</Link>
            <a href="#age-groups" className="btn-outline">Choose Your Level</a>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">LIFEWS Connect™</div>
          <div className="footer-links">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/playzone" className="footer-link">PlayZone</Link>
            <Link href="/platforms" className="footer-link">Platforms</Link>
            <Link href="/auth" className="footer-link">Sign in</Link>
          </div>
          <div className="footer-copy">© 2026 LIFEWS Connect · PlayZone™ · AgriShine™ AgriAble™ AgriNext™ AgriRoots™</div>
        </footer>

      </div>
    </>
  );
}

