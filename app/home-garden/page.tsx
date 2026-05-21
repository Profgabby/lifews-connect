"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const GARDEN_TYPES = [
  { value: "backyard",   label: "Backyard garden",   label_fr: "Jardin de cour",        emoji: "🏡" },
  { value: "container",  label: "Container garden",  label_fr: "Jardin en pot",          emoji: "🪴" },
  { value: "balcony",    label: "Balcony garden",    label_fr: "Jardin de balcon",       emoji: "🌿" },
  { value: "rooftop",    label: "Rooftop garden",    label_fr: "Jardin de toit",         emoji: "🏙️" },
  { value: "indoor",     label: "Indoor garden",     label_fr: "Jardin d'intérieur",     emoji: "🪟" },
  { value: "community",  label: "Community plot",    label_fr: "Parcelle communautaire", emoji: "👥" },
];

const GARDEN_SIZES = [
  { value: "tiny",   label: "Tiny (under 5m²)",   label_fr: "Minuscule (moins de 5m²)" },
  { value: "small",  label: "Small (5–20m²)",      label_fr: "Petit (5–20m²)" },
  { value: "medium", label: "Medium (20–50m²)",    label_fr: "Moyen (20–50m²)" },
  { value: "large",  label: "Large (50m²+)",       label_fr: "Grand (50m²+)" },
];

const CROPS = [
  { en: "Tomatoes",   fr: "Tomates" },
  { en: "Spinach",    fr: "Épinards" },
  { en: "Peppers",    fr: "Poivrons" },
  { en: "Lettuce",    fr: "Laitue" },
  { en: "Carrots",    fr: "Carottes" },
  { en: "Beans",      fr: "Haricots" },
  { en: "Okra",       fr: "Gombo" },
  { en: "Pumpkin",    fr: "Citrouille" },
  { en: "Cassava",    fr: "Manioc" },
  { en: "Maize",      fr: "Maïs" },
  { en: "Cucumber",   fr: "Concombre" },
  { en: "Herbs",      fr: "Herbes aromatiques" },
];

const GROWING_GUIDES = [
  { crop: "Tomatoes", crop_fr: "Tomates", days: 75, tip: "Plant in full sun. Water deeply twice a week.", tip_fr: "Planter en plein soleil. Arroser abondamment deux fois par semaine.", emoji: "🍅" },
  { crop: "Spinach",  crop_fr: "Épinards", days: 40, tip: "Grows well in shade. Harvest outer leaves first.", tip_fr: "Pousse bien à l'ombre. Récolter d'abord les feuilles extérieures.", emoji: "🥬" },
  { crop: "Peppers",  crop_fr: "Poivrons", days: 90, tip: "Needs warm weather and consistent watering.", tip_fr: "Nécessite un temps chaud et un arrosage régulier.", emoji: "🫑" },
  { crop: "Beans",    crop_fr: "Haricots", days: 55, tip: "Great for beginners. Fix nitrogen in the soil.", tip_fr: "Idéal pour les débutants. Fixent l'azote dans le sol.", emoji: "🫘" },
];

type HomeGarden = {
  id: string;
  name: string;
  garden_type: string;
  size: string;
  city: string;
  country: string;
  has_children: boolean;
  child_school: string;
  language: string;
};

type HomeCrop = {
  id: string;
  garden_id: string;
  crop: string;
  crop_fr: string;
  planted_date: string;
  expected_harvest: string;
  status: string;
  notes: string;
};

const G: Record<string, React.CSSProperties> = {
  page:       { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:     { background: "#854F0B", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" },
  topLogo:    { fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#fff", letterSpacing: -0.3 },
  topTag:     { fontSize: 11, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.2)" },
  backBtn:    { fontSize: 12, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  langToggle: { display: "flex", background: "rgba(255,255,255,0.12)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" },
  langBtn:    { padding: "6px 14px", border: "none", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  langBtnOn:  { padding: "6px 14px", border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  banner:     { background: "#854F0B", padding: "28px 40px 32px", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  bannerTitle:{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#fff", marginBottom: 6, marginTop: 0 },
  bannerSub:  { fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 0, marginBottom: 16 },
  bannerPills:{ display: "flex", gap: 8, flexWrap: "wrap" as const },
  pill:       { fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" },
  tabBar:     { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 40px", display: "flex" },
  tabOn:      { padding: "16px 20px", color: "#854F0B", fontSize: 14, fontWeight: 500, cursor: "pointer", background: "none", border: "none", borderBottom: "2px solid #854F0B", fontFamily: "'DM Sans', sans-serif" },
  tabOff:     { padding: "16px 20px", color: "#888", fontSize: 14, cursor: "pointer", background: "none", border: "none", borderBottom: "2px solid transparent", fontFamily: "'DM Sans', sans-serif" },
  content:    { maxWidth: 1000, margin: "0 auto", padding: "32px 40px" },
  card:       { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 24, marginBottom: 16 },
  cardTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816", marginBottom: 4, marginTop: 0 },
  cardSub:    { fontSize: 13, color: "#888", marginBottom: 20, marginTop: 0 },
  grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  grid3:      { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
  lbl:        { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#854F0B", marginBottom: 6 },
  inp:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  textarea:   { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const, resize: "vertical" as const, minHeight: 80 },
  btn:        { background: "#854F0B", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnGhost:   { background: "transparent", color: "#854F0B", border: "1.5px solid #854F0B", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", marginRight: 10 },
  btnSm:      { background: "#854F0B", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer" },
  ok:         { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#faeeda", border: "1px solid #fac775", color: "#633806" },
  err:        { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  // Garden type grid
  typeGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 },
  typeCard:   { border: "1.5px solid #d4cbb8", borderRadius: 10, padding: "14px 12px", textAlign: "center" as const, cursor: "pointer", background: "#fff", transition: "all 0.15s" },
  typeCardOn: { border: "1.5px solid #854F0B", borderRadius: 10, padding: "14px 12px", textAlign: "center" as const, cursor: "pointer", background: "#faeeda" },
  typeEmoji:  { fontSize: 24, marginBottom: 6, display: "block" },
  typeLbl:    { fontSize: 12, fontWeight: 500, color: "#555" },
  typeLblOn:  { fontSize: 12, fontWeight: 500, color: "#633806" },
  // Garden card
  gardenCard: { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 20, marginBottom: 12 },
  gardenName: { fontSize: 16, fontWeight: 500, color: "#163816", marginBottom: 4 },
  gardenMeta: { fontSize: 13, color: "#888" },
  // Crop cards
  cropGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 },
  cropCard:   { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: 16 },
  cropName:   { fontSize: 14, fontWeight: 500, color: "#163816", marginBottom: 4 },
  cropMeta:   { fontSize: 12, color: "#888" },
  cropBadge:  { display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 500, marginTop: 8 },
  // Guide cards
  guideCard:  { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: 20, marginBottom: 12, display: "flex", gap: 16, alignItems: "flex-start" },
  guideEmoji: { fontSize: 32, flexShrink: 0 },
  guideName:  { fontSize: 15, fontWeight: 500, color: "#163816", marginBottom: 4, marginTop: 0 },
  guideTip:   { fontSize: 13, color: "#555", lineHeight: 1.6, marginTop: 0 },
  guideDays:  { fontSize: 11, color: "#854F0B", fontWeight: 500, marginTop: 6, display: "block" },
  // Stats
  statsRow:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 },
  statCard:   { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: "16px 20px" },
  statNum:    { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#854F0B" },
  statLbl:    { fontSize: 12, color: "#888", marginTop: 2 },
  empty:      { textAlign: "center" as const, padding: "50px 20px" },
  emptyIcon:  { fontSize: 48, marginBottom: 14, display: "block" },
  emptyText:  { fontSize: 14, color: "#888", marginBottom: 20 },
  // School link banner
  schoolLink: { background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" },
};

export default function HomeGardenPage() {
  const router = useRouter();
  const [lang, setLang]           = useState<"en" | "fr">("en");
  const [tab, setTab]             = useState<"my-garden" | "crops" | "guides" | "connect">("my-garden");
  const [garden, setGarden]       = useState<HomeGarden | null>(null);
  const [crops, setCrops]         = useState<HomeCrop[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [message, setMessage]     = useState<string | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [showGardenForm, setShowGardenForm] = useState(false);
  const [showCropForm, setShowCropForm]     = useState(false);

  // Garden form
  const [gardenName, setGardenName]       = useState("");
  const [gardenType, setGardenType]       = useState("backyard");
  const [gardenSize, setGardenSize]       = useState("small");
  const [gardenCity, setGardenCity]       = useState("");
  const [gardenCountry, setGardenCountry] = useState("Nigeria");
  const [hasChildren, setHasChildren]     = useState(false);
  const [childSchool, setChildSchool]     = useState("");

  // Crop form
  const [cropName, setCropName]           = useState(CROPS[0].en);
  const [cropPlanted, setCropPlanted]     = useState("");
  const [cropHarvest, setCropHarvest]     = useState("");
  const [cropNotes, setCropNotes]         = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: g } = await supabase.from("home_gardens").select("*").eq("user_id", user.id).maybeSingle();
    if (g) {
      setGarden(g);
      const { data: c } = await supabase.from("home_garden_crops").select("*").eq("garden_id", g.id).order("created_at", { ascending: false });
      setCrops(c || []);
    } else {
      setShowGardenForm(true);
    }
    setLoading(false);
  }

  async function handleCreateGarden(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in."); setSaving(false); return; }

    const { data, error } = await supabase.from("home_gardens").insert({
      user_id: user.id,
      name: gardenName,
      garden_type: gardenType,
      size: gardenSize,
      city: gardenCity,
      country: gardenCountry,
      has_children: hasChildren,
      child_school: childSchool || null,
      language: lang === "fr" ? "french" : "english",
    }).select().single();

    if (error) { setError(error.message); setSaving(false); return; }
    setGarden(data);
    setShowGardenForm(false);
    setMessage(lang === "fr" ? "Jardin créé avec succès!" : "Garden created successfully!");
    setSaving(false);
  }

  async function handleAddCrop(e: FormEvent) {
    e.preventDefault();
    if (!garden) return;
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in."); setSaving(false); return; }

    const cropObj = CROPS.find(c => c.en === cropName);
    const { error } = await supabase.from("home_garden_crops").insert({
      garden_id: garden.id,
      user_id: user.id,
      crop: cropName,
      crop_fr: cropObj?.fr || cropName,
      planted_date: cropPlanted || null,
      expected_harvest: cropHarvest || null,
      status: "growing",
      notes: cropNotes,
    });

    if (error) { setError(error.message); setSaving(false); return; }
    setSaving(false);
    setShowCropForm(false);
    setCropName(CROPS[0].en); setCropPlanted(""); setCropHarvest(""); setCropNotes("");
    setMessage(lang === "fr" ? "Culture ajoutée!" : "Crop added!");
    loadData();
  }

  const growing   = crops.filter(c => c.status === "growing").length;
  const harvested = crops.filter(c => c.status === "harvested").length;

  const t = (en: string, fr: string) => lang === "fr" ? fr : en;

  if (loading) return (
    <div style={{ ...G.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: "#888" }}>{t("Loading your garden...", "Chargement de votre jardin...")}</div>
    </div>
  );

  return (
    <div style={G.page}>
      {/* Topbar */}
      <div style={G.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={G.backBtn} onClick={() => router.push("/dashboard")}>← {t("Dashboard", "Tableau de bord")}</button>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={G.topLogo}>AgriAble Home™</span>
          <span style={G.topTag}>AgriAble™</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={G.langToggle}>
            <button style={lang === "en" ? G.langBtnOn : G.langBtn} onClick={() => setLang("en")}>EN</button>
            <button style={lang === "fr" ? G.langBtnOn : G.langBtn} onClick={() => setLang("fr")}>FR</button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={G.banner}>
        <h1 style={G.bannerTitle}>
          {garden ? `🏡 ${garden.name}` : t("My home garden", "Mon jardin à la maison")}
        </h1>
        <p style={G.bannerSub}>
          {t(
            "Grow food at home, connect your garden to your child's school, and share your harvest.",
            "Cultivez des aliments à la maison, connectez votre jardin à l'école de votre enfant et partagez votre récolte."
          )}
        </p>
        {garden && (
          <div style={G.bannerPills}>
            <span style={G.pill}>{GARDEN_TYPES.find(g => g.value === garden.garden_type)?.emoji} {lang === "fr" ? GARDEN_TYPES.find(g => g.value === garden.garden_type)?.label_fr : GARDEN_TYPES.find(g => g.value === garden.garden_type)?.label}</span>
            <span style={G.pill}>📍 {garden.city}{garden.city ? ", " : ""}{garden.country}</span>
            {garden.has_children && <span style={G.pill}>🏫 {t("Connected to school", "Connecté à l'école")}</span>}
            <span style={G.pill}>🌱 {crops.length} {t("crops", "cultures")}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      {garden && (
        <div style={G.tabBar}>
          <button style={tab === "my-garden" ? G.tabOn : G.tabOff} onClick={() => setTab("my-garden")}>🏡 {t("My garden", "Mon jardin")}</button>
          <button style={tab === "crops" ? G.tabOn : G.tabOff} onClick={() => setTab("crops")}>🌿 {t("My crops", "Mes cultures")}</button>
          <button style={tab === "guides" ? G.tabOn : G.tabOff} onClick={() => setTab("guides")}>📖 {t("Growing guides", "Guides de culture")}</button>
          <button style={tab === "connect" ? G.tabOn : G.tabOff} onClick={() => setTab("connect")}>🏫 {t("School connect", "Connexion école")}</button>
        </div>
      )}

      <div style={G.content}>
        {message && <div style={G.ok}>{message}</div>}
        {error   && <div style={G.err}>{error}</div>}

        {/* ── GARDEN SETUP FORM ── */}
        {showGardenForm && (
          <form onSubmit={handleCreateGarden}>
            <div style={G.card}>
              <h2 style={G.cardTitle}>{t("Set up your home garden", "Configurez votre jardin à la maison")}</h2>
              <p style={G.cardSub}>{t("Tell us about your garden space", "Parlez-nous de votre espace de jardinage")}</p>

              <label style={G.lbl}>{t("Garden name", "Nom du jardin")}</label>
              <input style={G.inp} placeholder={t("e.g. Our backyard garden", "ex. Notre jardin de cour")} value={gardenName} onChange={e => setGardenName(e.target.value)} required />

              <label style={G.lbl}>{t("Garden type", "Type de jardin")}</label>
              <div style={G.typeGrid}>
                {GARDEN_TYPES.map(gt => (
                  <div key={gt.value} style={gardenType === gt.value ? G.typeCardOn : G.typeCard} onClick={() => setGardenType(gt.value)}>
                    <span style={G.typeEmoji}>{gt.emoji}</span>
                    <div style={gardenType === gt.value ? G.typeLblOn : G.typeLbl}>{lang === "fr" ? gt.label_fr : gt.label}</div>
                  </div>
                ))}
              </div>

              <label style={G.lbl}>{t("Garden size", "Taille du jardin")}</label>
              <select style={G.sel} value={gardenSize} onChange={e => setGardenSize(e.target.value)}>
                {GARDEN_SIZES.map(s => <option key={s.value} value={s.value}>{lang === "fr" ? s.label_fr : s.label}</option>)}
              </select>

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>{t("City", "Ville")}</label>
                  <input style={G.inp} placeholder={t("Your city", "Votre ville")} value={gardenCity} onChange={e => setGardenCity(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>{t("Country", "Pays")}</label>
                  <input style={G.inp} placeholder={t("Your country", "Votre pays")} value={gardenCountry} onChange={e => setGardenCountry(e.target.value)} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <input type="checkbox" id="hasChildren" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} style={{ accentColor: "#854F0B", width: 16, height: 16 }} />
                <label htmlFor="hasChildren" style={{ fontSize: 13, color: "#444", cursor: "pointer" }}>
                  {t("My child attends a LIFEWS partner school", "Mon enfant fréquente une école partenaire LIFEWS")}
                </label>
              </div>

              {hasChildren && (
                <>
                  <label style={G.lbl}>{t("Child's school name", "Nom de l'école de votre enfant")}</label>
                  <input style={G.inp} placeholder={t("School name", "Nom de l'école")} value={childSchool} onChange={e => setChildSchool(e.target.value)} />
                </>
              )}
            </div>
            <button style={G.btn} type="submit" disabled={saving}>
              {saving ? t("Creating garden...", "Création du jardin...") : t("Create my garden →", "Créer mon jardin →")}
            </button>
          </form>
        )}

        {/* ── MY GARDEN TAB ── */}
        {garden && tab === "my-garden" && (
          <>
            <div style={G.statsRow}>
              <div style={G.statCard}>
                <div style={G.statNum}>{crops.length}</div>
                <div style={G.statLbl}>{t("Total crops", "Total des cultures")}</div>
              </div>
              <div style={G.statCard}>
                <div style={G.statNum}>{growing}</div>
                <div style={G.statLbl}>{t("Currently growing", "En cours de croissance")}</div>
              </div>
              <div style={G.statCard}>
                <div style={G.statNum}>{harvested}</div>
                <div style={G.statLbl}>{t("Harvested", "Récoltés")}</div>
              </div>
            </div>

            <div style={G.gardenCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={G.gardenName}>{garden.name}</div>
                  <div style={G.gardenMeta}>
                    {GARDEN_TYPES.find(g => g.value === garden.garden_type)?.emoji}{" "}
                    {lang === "fr" ? GARDEN_TYPES.find(g => g.value === garden.garden_type)?.label_fr : GARDEN_TYPES.find(g => g.value === garden.garden_type)?.label}
                    {" · "}{GARDEN_SIZES.find(s => s.value === garden.size)?.[lang === "fr" ? "label_fr" : "label"]}
                    {garden.city ? ` · ${garden.city}, ${garden.country}` : ` · ${garden.country}`}
                  </div>
                </div>
                <button style={G.btnSm} onClick={() => setTab("crops")}>
                  {t("Add crop →", "Ajouter culture →")}
                </button>
              </div>
            </div>

            {/* Quick crops preview */}
            {crops.length > 0 && (
              <div style={G.card}>
                <h3 style={{ ...G.cardTitle, fontSize: 16 }}>{t("What's growing", "Ce qui pousse")}</h3>
                <div style={G.cropGrid}>
                  {crops.slice(0, 6).map(c => (
                    <div key={c.id} style={G.cropCard}>
                      <div style={G.cropName}>{lang === "fr" && c.crop_fr ? c.crop_fr : c.crop}</div>
                      {c.planted_date && <div style={G.cropMeta}>{t("Planted:", "Planté:")} {new Date(c.planted_date).toLocaleDateString()}</div>}
                      {c.expected_harvest && <div style={G.cropMeta}>{t("Harvest:", "Récolte:")} {new Date(c.expected_harvest).toLocaleDateString()}</div>}
                      <span style={{ ...G.cropBadge, background: c.status === "growing" ? "#faeeda" : "#f0f7ec", color: c.status === "growing" ? "#854F0B" : "#2D6A2D" }}>
                        {c.status === "growing" ? t("Growing", "En croissance") : t("Harvested", "Récolté")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── CROPS TAB ── */}
        {garden && tab === "crops" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", margin: 0 }}>
                {t("My crops", "Mes cultures")}
              </h2>
              <button style={G.btn} onClick={() => setShowCropForm(!showCropForm)}>
                {showCropForm ? t("Cancel", "Annuler") : t("+ Add crop", "+ Ajouter une culture")}
              </button>
            </div>

            {showCropForm && (
              <form onSubmit={handleAddCrop}>
                <div style={G.card}>
                  <h3 style={{ ...G.cardTitle, fontSize: 16 }}>{t("Add a crop", "Ajouter une culture")}</h3>
                  <label style={G.lbl}>{t("Crop", "Culture")}</label>
                  <select style={G.sel} value={cropName} onChange={e => setCropName(e.target.value)}>
                    {CROPS.map(c => <option key={c.en} value={c.en}>{lang === "fr" ? c.fr : c.en}</option>)}
                  </select>
                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>{t("Date planted", "Date de plantation")}</label>
                      <input style={G.inp} type="date" value={cropPlanted} onChange={e => setCropPlanted(e.target.value)} />
                    </div>
                    <div>
                      <label style={G.lbl}>{t("Expected harvest", "Récolte prévue")}</label>
                      <input style={G.inp} type="date" value={cropHarvest} onChange={e => setCropHarvest(e.target.value)} />
                    </div>
                  </div>
                  <label style={G.lbl}>{t("Notes", "Notes")}</label>
                  <textarea style={G.textarea} placeholder={t("Any notes about this crop...", "Notes sur cette culture...")} value={cropNotes} onChange={e => setCropNotes(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" style={G.btnGhost} onClick={() => setShowCropForm(false)}>{t("Cancel", "Annuler")}</button>
                  <button type="submit" style={G.btn} disabled={saving}>{saving ? t("Saving...", "Enregistrement...") : t("Add crop", "Ajouter")}</button>
                </div>
              </form>
            )}

            {crops.length === 0 && !showCropForm && (
              <div style={G.empty}>
                <span style={G.emptyIcon}>🌱</span>
                <div style={G.emptyText}>{t("No crops yet. Add your first crop!", "Aucune culture. Ajoutez votre première culture!")}</div>
                <button style={G.btn} onClick={() => setShowCropForm(true)}>{t("+ Add first crop", "+ Ajouter une culture")}</button>
              </div>
            )}

            <div style={G.cropGrid}>
              {crops.map(c => (
                <div key={c.id} style={G.cropCard}>
                  <div style={G.cropName}>{lang === "fr" && c.crop_fr ? c.crop_fr : c.crop}</div>
                  {lang === "fr" && c.crop_fr && <div style={{ fontSize: 11, color: "#aaa" }}>{c.crop}</div>}
                  {c.planted_date && <div style={G.cropMeta}>{t("Planted:", "Planté:")} {new Date(c.planted_date).toLocaleDateString()}</div>}
                  {c.expected_harvest && <div style={G.cropMeta}>{t("Harvest:", "Récolte:")} {new Date(c.expected_harvest).toLocaleDateString()}</div>}
                  {c.notes && <div style={{ ...G.cropMeta, marginTop: 4, fontStyle: "italic" }}>{c.notes}</div>}
                  <span style={{ ...G.cropBadge, background: "#faeeda", color: "#854F0B" }}>{t("Growing", "En croissance")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GROWING GUIDES TAB ── */}
        {garden && tab === "guides" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 6, marginTop: 0 }}>
                {t("Bilingual growing guides", "Guides de culture bilingues")}
              </h2>
              <p style={{ fontSize: 14, color: "#666", marginTop: 0 }}>
                {t("Tips for growing food at home in English and French.", "Conseils pour cultiver des aliments à la maison en anglais et en français.")}
              </p>
            </div>
            {GROWING_GUIDES.map(g => (
              <div key={g.crop} style={G.guideCard}>
                <span style={G.guideEmoji}>{g.emoji}</span>
                <div>
                  <h3 style={G.guideName}>{lang === "fr" ? g.crop_fr : g.crop}</h3>
                  <p style={G.guideTip}>{lang === "fr" ? g.tip_fr : g.tip}</p>
                  <span style={G.guideDays}>⏱ {t(`Ready in ~${g.days} days`, `Prêt en ~${g.days} jours`)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SCHOOL CONNECT TAB ── */}
        {garden && tab === "connect" && (
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 6, marginTop: 0 }}>
              {t("Connect to your child's school", "Connectez-vous à l'école de votre enfant")}
            </h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
              {t("Link your home garden to your child's AgriShine school garden.", "Reliez votre jardin maison au jardin scolaire AgriShine de votre enfant.")}
            </p>
            <div style={G.schoolLink}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#163816" }}>
                  {garden.has_children && garden.child_school
                    ? `🏫 ${garden.child_school}`
                    : t("No school linked yet", "Aucune école liée pour l'instant")}
                </div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                  {t("Linking lets teachers see your home garden progress.", "La liaison permet aux enseignants de voir vos progrès au jardin.")}
                </div>
              </div>
              <button style={G.btn}>{t("Link school →", "Lier l'école →")}</button>
            </div>

            <div style={G.card}>
              <h3 style={{ ...G.cardTitle, fontSize: 16 }}>{t("What school connection unlocks", "Ce que la connexion école débloque")}</h3>
              {[
                [t("Share harvest photos", "Partager des photos de récolte"), t("Send photos to your child's teacher", "Envoyer des photos à l'enseignant de votre enfant")],
                [t("See school lessons", "Voir les leçons de l'école"), t("Access the AgriShine curriculum your child follows", "Accéder au programme AgriShine de votre enfant")],
                [t("Compare crops", "Comparer les cultures"), t("See what's growing at school vs at home", "Voir ce qui pousse à l'école vs à la maison")],
                [t("Parent badges", "Badges parents"), t("Earn AgriAble badges for home growing", "Gagner des badges AgriAble pour le jardinage à domicile")],
              ].map(([title, desc]) => (
                <div key={title as string} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#faeeda", border: "1px solid #fac775", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#854F0B", flexShrink: 0, marginTop: 1 }}>✓</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
