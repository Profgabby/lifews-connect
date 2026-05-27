"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "garden-explorers",
    emoji: "🌱",
    name: "Garden Explorers",
    color: "#2D6A2D",
    bg: "#f0f7ec",
    border: "#b8dba8",
    desc: "Discover seeds, plants, and the magic of growing things.",
    games: [
      { id: "meet-the-seed",       name: "Meet the Seed",            emoji: "🌰", difficulty: "Easy",   pts: 50,  desc: "Learn to identify seeds and how they grow.", locked: false },
      { id: "seed-to-plant",       name: "Seed to Plant Story Line", emoji: "🌿", difficulty: "Easy",   pts: 50,  desc: "Put the plant growth stages in the right order.", locked: false },
      { id: "water-the-garden",    name: "Water the Garden",         emoji: "💧", difficulty: "Medium", pts: 100, desc: "Tap to water the right plants before they dry out!", locked: false },
      { id: "colour-the-garden",   name: "Colour the Garden",        emoji: "🎨", difficulty: "Easy",   pts: 50,  desc: "Colour plants, flowers, and vegetables correctly.", locked: true },
      { id: "who-lives-in-garden", name: "Who Lives in the Garden?", emoji: "🐛", difficulty: "Hard",   pts: 200, desc: "Match garden animals to where they live.", locked: true },
    ],
  },
  {
    id: "nature-friends",
    emoji: "🦋",
    name: "Nature Friends",
    color: "#185FA5",
    bg: "#e6f1fb",
    border: "#b5d4f4",
    desc: "Explore the natural world — big, small, sunny, and rainy.",
    games: [
      { id: "big-or-small",    name: "Big or Small?",          emoji: "🌳", difficulty: "Easy",   pts: 50,  desc: "Sort trees, seeds, and leaves by size.", locked: false },
      { id: "sunny-or-rainy",  name: "Sunny or Rainy?",        emoji: "☀️", difficulty: "Easy",   pts: 50,  desc: "Sort weather pictures into sunny and rainy groups.", locked: false },
      { id: "find-the-leaf",   name: "Find the Leaf",          emoji: "🍃", difficulty: "Medium", pts: 100, desc: "Match leaf shapes to the right trees.", locked: false },
      { id: "count-flowers",   name: "Count the Flowers",      emoji: "🌸", difficulty: "Easy",   pts: 50,  desc: "Count flowers from 1 to 5 and tap the right number.", locked: true },
      { id: "nature-sounds",   name: "What Sound Does Nature Make?", emoji: "🎵", difficulty: "Hard", pts: 200, desc: "Listen and match nature sounds — birds, rain, wind.", locked: true },
    ],
  },
  {
    id: "food-and-eating",
    emoji: "🍎",
    name: "Food & Eating",
    color: "#854F0B",
    bg: "#faeeda",
    border: "#fac775",
    desc: "Learn where food comes from and what makes us healthy.",
    games: [
      { id: "name-that-fruit",   name: "Name That Fruit",         emoji: "🍌", difficulty: "Easy",   pts: 50,  desc: "Identify fruits from pictures and tap the right name.", locked: false },
      { id: "pick-the-vegetable",name: "Pick the Vegetable",      emoji: "🥕", difficulty: "Easy",   pts: 50,  desc: "Drag vegetables into the basket before time runs out.", locked: false },
      { id: "where-food-comes",  name: "Where Does Food Come From?", emoji: "🚜", difficulty: "Medium", pts: 100, desc: "Match food to where it grows — farm, sea, or garden.", locked: false },
      { id: "yummy-or-yucky",    name: "Yummy or Yucky?",         emoji: "😋", difficulty: "Easy",   pts: 50,  desc: "Sort healthy foods from unhealthy ones.", locked: true },
      { id: "grow-your-plate",   name: "Grow Your Plate",         emoji: "🥗", difficulty: "Hard",   pts: 200, desc: "Arrange a healthy balanced meal on your plate.", locked: true },
    ],
  },
  {
    id: "earth-and-water",
    emoji: "💧",
    name: "Earth & Water",
    color: "#534AB7",
    bg: "#eeedfe",
    border: "#cecbf6",
    desc: "Learn to love the Earth — save water, clean up, and use sun power.",
    games: [
      { id: "save-the-drop",    name: "Save the Drop",          emoji: "💧", difficulty: "Easy",   pts: 50,  desc: "Tap to collect raindrops and don't let them go to waste!", locked: false },
      { id: "clean-or-dirty",   name: "Clean or Dirty?",        emoji: "🗑️", difficulty: "Easy",   pts: 50,  desc: "Sort rubbish and clean items into the right bins.", locked: false },
      { id: "where-water-comes",name: "Where Does Water Come From?", emoji: "🌊", difficulty: "Medium", pts: 100, desc: "Trace the simple water cycle from rain to river.", locked: false },
      { id: "help-the-fish",    name: "Help the Fish",          emoji: "🐟", difficulty: "Medium", pts: 100, desc: "Remove litter from the river to save the fish.", locked: true },
      { id: "sun-power",        name: "Sun Power",              emoji: "☀️", difficulty: "Hard",   pts: 200, desc: "Match solar-powered items to the sun that powers them.", locked: true },
    ],
  },
  {
    id: "french-garden",
    emoji: "🇫🇷",
    name: "French Garden",
    color: "#8B1A1A",
    bg: "#fdf0f0",
    border: "#f5b8b8",
    desc: "Learn garden, nature, and food words in French!",
    games: [
      { id: "les-legumes",      name: "Les Légumes",            emoji: "🥦", difficulty: "Easy",   pts: 50,  desc: "Name vegetables in French — carotte, tomate, haricot!", locked: false },
      { id: "couleurs-jardin",  name: "Les Couleurs du Jardin", emoji: "🌈", difficulty: "Easy",   pts: 50,  desc: "Colour the garden and label colours in French.", locked: false },
      { id: "soleil-pluie",     name: "Le Soleil et la Pluie",  emoji: "🌦️", difficulty: "Medium", pts: 100, desc: "Say sun or rain in French — le soleil ou la pluie?", locked: false },
      { id: "compte-graines",   name: "Compte les Graines",     emoji: "🔢", difficulty: "Easy",   pts: 50,  desc: "Count seeds from 1 to 5 in French — un, deux, trois…", locked: true },
      { id: "mon-jardin",       name: "Mon Jardin",             emoji: "🏡", difficulty: "Hard",   pts: 200, desc: "Build your garden and label everything in French.", locked: true },
    ],
  },
];

const DIFF_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Easy:   { bg: "#f0f7ec", color: "#2D6A2D", border: "#b8dba8" },
  Medium: { bg: "#faeeda", color: "#854F0B", border: "#fac775" },
  Hard:   { bg: "#eeedfe", color: "#534AB7", border: "#cecbf6" },
};

export default function SeedlingsPlayZonePage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeGame, setActiveGame]         = useState<string | null>(null);
  const [gameStep, setGameStep]             = useState(1);
  const [score, setScore]                   = useState(0);
  const [selected, setSelected]             = useState<string | null>(null);
  const [feedback, setFeedback]             = useState<"correct" | "wrong" | null>(null);
  const [gameComplete, setGameComplete]     = useState(false);

  const currentCat = CATEGORIES.find(c => c.id === activeCategory)!;

  // ── SEED TO PLANT GAME DATA ──────────────────────────────────────
  const SEED_STEPS = [
    {
      step: 1, title: "Meet the Seed 🌰",
      question: "Is a seed big or small?",
      options: ["Big", "Small"],
      correct: "Small",
      hint: "Look at a tiny seed in your hand!",
      image: "🌰",
    },
    {
      step: 2, title: "What Comes Next? 🌿",
      question: "Can a seed jump straight to a big plant?",
      options: ["Yes", "No"],
      correct: "No",
      hint: "Plants need time to grow step by step.",
      image: "🌰 → ❓ → 🌳",
    },
    {
      step: 3, title: "Sprout Appears! 🌱",
      question: "Which comes after a seed?",
      options: ["🌳 Big plant", "🌱 Sprout", "🍎 Fruit"],
      correct: "🌱 Sprout",
      hint: "A tiny green shoot pokes out of the soil first.",
      image: "🌱",
    },
    {
      step: 4, title: "Why Does It Grow? ☀️",
      question: "Which TWO things help a seed grow?",
      options: ["☀️ Sun", "💧 Water", "🪨 Stone"],
      correct: "☀️ Sun",
      hint: "Plants need sunlight and water to grow!",
      image: "☀️ + 💧",
    },
    {
      step: 5, title: "The Right Order! 🌻",
      question: "What is the correct order?",
      options: ["🌳 → 🌱 → 🌰", "🌰 → 🌱 → 🌳", "🌱 → 🌳 → 🌰"],
      correct: "🌰 → 🌱 → 🌳",
      hint: "Start with the smallest and end with the biggest!",
      image: "🌰 🌱 🌳",
    },
  ];

  // ── SAVE THE DROP GAME DATA ──────────────────────────────────────
  const WATER_STEPS = [
    { step: 1, title: "The Leaky Tap 🚿", question: "Is leaving a tap running wasteful?", options: ["Yes", "No"], correct: "Yes", image: "🚿", hint: "Wasted water cannot be used again easily." },
    { step: 2, title: "Rain is a Gift 🌧️", question: "Where does rain water go?", options: ["Into the sky", "Into the ground & rivers", "Disappears"], correct: "Into the ground & rivers", image: "🌧️", hint: "Rain fills our rivers and underground water." },
    { step: 3, title: "Save the Drop 💧", question: "Which saves more water?", options: ["A long shower", "A quick shower", "A bath"], correct: "A quick shower", image: "🚿", hint: "Shorter showers save lots of water!" },
    { step: 4, title: "Plants Need Water 🌱", question: "When is the best time to water plants?", options: ["Midday sun", "Morning or evening", "Never"], correct: "Morning or evening", image: "🌱", hint: "Less water evaporates in the morning and evening." },
    { step: 5, title: "Water Hero! 🏆", question: "What can you collect rainwater in?", options: ["A paper bag", "A bucket", "A shoe"], correct: "A bucket", image: "🪣", hint: "A bucket collects rainwater for watering plants!" },
  ];

  // ── FRENCH GAME DATA ──────────────────────────────────────────────
  const FRENCH_STEPS = [
    { step: 1, title: "La Carotte 🥕", question: "How do you say 'carrot' in French?", options: ["Le chou", "La carotte", "Le maïs"], correct: "La carotte", image: "🥕", hint: "Ca-rotte! Like 'carrot' but French!" },
    { step: 2, title: "La Tomate 🍅", question: "How do you say 'tomato' in French?", options: ["La tomate", "La pomme", "Le haricot"], correct: "La tomate", image: "🍅", hint: "La tomate — almost the same as English!" },
    { step: 3, title: "Le Soleil ☀️", question: "What does 'le soleil' mean?", options: ["The rain", "The wind", "The sun"], correct: "The sun", image: "☀️", hint: "Le so-leil — it's the bright thing in the sky!" },
    { step: 4, title: "Un, Deux, Trois 🔢", question: "What is 'three' in French?", options: ["Un", "Deux", "Trois"], correct: "Trois", image: "3️⃣", hint: "Un = 1, Deux = 2, Trois = 3!" },
    { step: 5, title: "L'Eau 💧", question: "What does 'l'eau' mean?", options: ["Fire", "Water", "Earth"], correct: "Water", image: "💧", hint: "L'eau — we need it to grow all our plants!" },
  ];

  function getGameSteps(gameId: string) {
    if (gameId === "seed-to-plant") return SEED_STEPS;
    if (gameId === "save-the-drop") return WATER_STEPS;
    if (gameId === "les-legumes")   return FRENCH_STEPS;
    return SEED_STEPS;
  }

  function handleAnswer(option: string, correct: string) {
    setSelected(option);
    if (option === correct) {
      setFeedback("correct");
      setScore(s => s + 20);
      setTimeout(() => {
        setFeedback(null); setSelected(null);
        if (gameStep >= 5) setGameComplete(true);
        else setGameStep(s => s + 1);
      }, 1200);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setFeedback(null); setSelected(null); }, 1200);
    }
  }

  function startGame(gameId: string) {
    setActiveGame(gameId);
    setGameStep(1);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setGameComplete(false);
  }

  function exitGame() {
    setActiveGame(null);
    setGameStep(1);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setGameComplete(false);
  }

  const playableGames = ["seed-to-plant", "save-the-drop", "les-legumes"];
  const steps = activeGame ? getGameSteps(activeGame) : [];
  const currentStep = steps[gameStep - 1];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F5F5E8; }
        .nav { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .nav-mark { width: 30px; height: 30px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #163816; }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .back-btn { font-size: 13px; color: #2D6A2D; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 4px; }
        .hero { background: linear-gradient(135deg, #f0f7ec, #e8f5e0); padding: 48px 24px 36px; text-align: center; border-bottom: 1px solid #d0e8c0; }
        .hero-emoji { font-size: 64px; margin-bottom: 12px; display: block; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 40px; color: #163816; margin-bottom: 8px; }
        .hero-sub { font-size: 15px; color: #555; font-weight: 300; margin-bottom: 20px; }
        .hero-badges { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .hero-badge { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .content { max-width: 1100px; margin: 0 auto; padding: 36px 24px; }
        .cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .cat-tab { padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid transparent; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .game-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 18px; padding: 22px; transition: all 0.2s; cursor: pointer; position: relative; }
        .game-card:hover:not(.locked-card) { border-color: #2D6A2D; box-shadow: 0 6px 20px rgba(45,106,45,0.12); transform: translateY(-2px); }
        .locked-card { opacity: 0.55; cursor: not-allowed; }
        .game-emoji { font-size: 36px; margin-bottom: 12px; display: block; }
        .game-name { font-size: 15px; font-weight: 600; color: #163816; margin-bottom: 6px; }
        .game-desc { font-size: 13px; color: #666; line-height: 1.5; margin-bottom: 14px; }
        .game-footer { display: flex; align-items: center; justify-content: space-between; }
        .diff-badge { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 6px; border: 1px solid; }
        .pts-badge { font-size: 12px; font-weight: 700; color: #2D6A2D; }
        .play-btn { background: #2D6A2D; color: #fff; border: none; border-radius: 8px; padding: 7px 16px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .locked-overlay { position: absolute; top: 12px; right: 12px; font-size: 18px; }

        /* GAME PLAYER */
        .game-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .game-modal { background: #fff; border-radius: 24px; width: 100%; max-width: 520px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.2); }
        .game-header { background: #2D6A2D; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; }
        .game-header-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; }
        .game-progress { display: flex; gap: 6px; }
        .progress-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        .progress-dot.done { background: #7ec850; }
        .progress-dot.active { background: #fff; }
        .game-body { padding: 28px 24px; }
        .step-title { font-size: 13px; font-weight: 600; color: #2D6A2D; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .step-question { font-family: 'DM Serif Display', serif; font-size: 22px; color: #163816; margin-bottom: 8px; line-height: 1.3; }
        .step-image { font-size: 52px; text-align: center; margin: 16px 0; }
        .step-hint { font-size: 13px; color: #888; background: #f5f5e8; border-radius: 8px; padding: 8px 12px; margin-bottom: 18px; }
        .options { display: flex; flex-direction: column; gap: 10px; }
        .option-btn { padding: 13px 18px; border-radius: 12px; border: 2px solid #e8e0cc; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #333; cursor: pointer; text-align: left; transition: all 0.15s; }
        .option-btn:hover { border-color: #2D6A2D; background: #f0f7ec; }
        .option-btn.correct { border-color: #2D6A2D; background: #f0f7ec; color: #2D6A2D; font-weight: 600; }
        .option-btn.wrong { border-color: #ef4444; background: #fff0f0; color: #ef4444; }
        .feedback-bar { padding: 12px 24px; text-align: center; font-weight: 600; font-size: 15px; }
        .feedback-bar.correct { background: #f0f7ec; color: #2D6A2D; }
        .feedback-bar.wrong { background: #fff0f0; color: #ef4444; }
        .game-footer-bar { padding: 16px 24px; border-top: 1px solid #f0ece0; display: flex; align-items: center; justify-content: space-between; }
        .score-display { font-size: 13px; font-weight: 600; color: #2D6A2D; }
        .exit-btn { background: none; border: none; color: #aaa; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

        /* COMPLETE SCREEN */
        .complete-body { padding: 40px 28px; text-align: center; }
        .complete-emoji { font-size: 64px; margin-bottom: 16px; display: block; }
        .complete-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #163816; margin-bottom: 8px; }
        .complete-sub { font-size: 14px; color: #666; margin-bottom: 24px; }
        .complete-pts { font-family: 'DM Serif Display', serif; font-size: 40px; color: #2D6A2D; margin-bottom: 4px; }
        .complete-pts-label { font-size: 12px; color: #888; margin-bottom: 28px; }
        .complete-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .btn-green { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-block; }
        .btn-outline { background: transparent; color: #2D6A2D; border: 1.5px solid #2D6A2D; border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F5F5E8", minHeight: "100vh" }}>

        {/* Nav */}
        <nav className="nav">
          <Link href="/" className="nav-logo">
            <div className="nav-mark">🌱</div>
            <span className="nav-name">LIFEWS Connect</span>
          </Link>
          <div className="nav-right">
            <Link href="/playzone" className="back-btn">← PlayZone</Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="hero">
          <span className="hero-emoji">🌱</span>
          <h1 className="hero-title">Seedlings PlayZone</h1>
          <p className="hero-sub">Fun games for ages 3–5 · Nursery level · Learn about gardens, nature, food & water</p>
          <div className="hero-badges">
            {[
              { label: "Ages 3–5", bg: "#f0f7ec", color: "#2D6A2D" },
              { label: "Nursery", bg: "#e6f1fb", color: "#185FA5" },
              { label: "5 Categories", bg: "#faeeda", color: "#854F0B" },
              { label: "25 Games", bg: "#eeedfe", color: "#534AB7" },
              { label: "Easy–Hard", bg: "#fdf0f0", color: "#8B1A1A" },
            ].map(b => (
              <span key={b.label} className="hero-badge" style={{ background: b.bg, color: b.color }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Category tabs + games */}
        <div className="content">
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className="cat-tab"
                style={{
                  background: activeCategory === c.id ? c.color : "#fff",
                  color: activeCategory === c.id ? "#fff" : c.color,
                  borderColor: c.color,
                }}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>

          {/* Category description */}
          <div style={{ background: "#fff", border: `1px solid ${currentCat.border}`, borderRadius: 16, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{currentCat.emoji}</span>
            <div>
              <div style={{ fontWeight: 600, color: currentCat.color, marginBottom: 2 }}>{currentCat.name}</div>
              <div style={{ fontSize: 13, color: "#666" }}>{currentCat.desc}</div>
            </div>
          </div>

          <div className="games-grid">
            {currentCat.games.map(game => {
              const diff = DIFF_COLORS[game.difficulty];
              const isPlayable = playableGames.includes(game.id);
              return (
                <div key={game.id} className={`game-card ${game.locked ? "locked-card" : ""}`}>
                  {game.locked && <div className="locked-overlay">🔒</div>}
                  <span className="game-emoji">{game.emoji}</span>
                  <div className="game-name">{game.name}</div>
                  <p className="game-desc">{game.desc}</p>
                  <div className="game-footer">
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span className="diff-badge" style={{ background: diff.bg, color: diff.color, borderColor: diff.border }}>{game.difficulty}</span>
                      <span className="pts-badge">+{game.pts} pts</span>
                    </div>
                    {!game.locked && (
                      <button className="play-btn" onClick={() => isPlayable ? startGame(game.id) : alert("Full game coming soon! Register to be notified.")}>
                        {isPlayable ? "▶ Play" : "Coming Soon"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Points info */}
          <div style={{ marginTop: 40, background: "#2D6A2D", borderRadius: 20, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>LIFEWS Points</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff", marginBottom: 4 }}>Complete all 25 games to earn 1,000+ points!</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Points unlock badges, books, garden kits, and real prizes 🎁</div>
            </div>
            <Link href="/auth" style={{ background: "#7ec850", color: "#163816", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              Register to Save Progress →
            </Link>
          </div>

          {/* Other levels */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 16 }}>Explore other PlayZone levels</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { id: "sprouts",   emoji: "🌿", name: "Sprouts",   age: "Ages 6–10" },
                { id: "growers",   emoji: "🌳", name: "Growers",   age: "Ages 11–13" },
                { id: "pioneers",  emoji: "🚀", name: "Pioneers",  age: "Ages 14–18" },
                { id: "champions", emoji: "🏆", name: "Champions", age: "18+" },
              ].map(l => (
                <Link key={l.id} href={`/playzone/${l.id}` as any}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, textDecoration: "none", fontSize: 13, color: "#555", fontWeight: 500 }}>
                  <span style={{ fontSize: 20 }}>{l.emoji}</span>
                  <div>
                    <div style={{ color: "#163816", fontWeight: 600 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{l.age}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* GAME PLAYER MODAL */}
        {activeGame && currentStep && (
          <div className="game-overlay">
            <div className="game-modal">
              {!gameComplete ? (
                <>
                  <div className="game-header">
                    <div className="game-header-title">
                      {currentCat.games.find(g => g.id === activeGame)?.name}
                    </div>
                    <div className="game-progress">
                      {[1,2,3,4,5].map(n => (
                        <div key={n} className={`progress-dot ${n < gameStep ? "done" : n === gameStep ? "active" : ""}`} />
                      ))}
                    </div>
                  </div>
                  <div className="game-body">
                    <div className="step-title">Step {gameStep} of 5 — {currentStep.title}</div>
                    <div className="step-question">{currentStep.question}</div>
                    <div className="step-image">{currentStep.image}</div>
                    <div className="step-hint">💡 {currentStep.hint}</div>
                    <div className="options">
                      {currentStep.options.map(opt => (
                        <button key={opt} className={`option-btn ${selected === opt ? (feedback === "correct" ? "correct" : "wrong") : ""}`}
                          onClick={() => !selected && handleAnswer(opt, currentStep.correct)}
                          disabled={!!selected}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {feedback && (
                    <div className={`feedback-bar ${feedback}`}>
                      {feedback === "correct" ? "✅ Correct! Well done!" : "❌ Try again next time!"}
                    </div>
                  )}
                  <div className="game-footer-bar">
                    <div className="score-display">⭐ Score: {score} / 100</div>
                    <button className="exit-btn" onClick={exitGame}>✕ Exit game</button>
                  </div>
                </>
              ) : (
                <div className="complete-body">
                  <span className="complete-emoji">🎉</span>
                  <div className="complete-title">Amazing work!</div>
                  <p className="complete-sub">You completed the game! Here are your LIFEWS Points:</p>
                  <div className="complete-pts">+{score} pts</div>
                  <div className="complete-pts-label">LIFEWS Points earned</div>
                  <div className="complete-btns">
                    <Link href="/auth" className="btn-green">Save My Points 🌱</Link>
                    <button className="btn-outline" onClick={exitGame}>Play Another Game</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

