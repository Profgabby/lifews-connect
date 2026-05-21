"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// ─── Taxonomy ────────────────────────────────────────────────────────────────

const GRADES = {
  "Nursery":  ["Nursery 1", "Nursery 2", "Nursery 3"],
  "Primary":  ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
  "Junior":   ["JSS 1", "JSS 2", "JSS 3"],
  "Senior":   ["SSS 1", "SSS 2", "SSS 3"],
};

const TRACKS = [
  { id: "garden-soil",    label: "Garden & Soil",     emoji: "🌱" },
  { id: "water-systems",  label: "Water Systems",      emoji: "💧" },
  { id: "energy-solar",   label: "Energy & Solar",     emoji: "☀️" },
  { id: "food-heritage",  label: "Food Heritage",      emoji: "🌍" },
  { id: "stem-agric",     label: "STEM Agriculture",   emoji: "🔬" },
  { id: "home-growing",   label: "Home Growing",       emoji: "🏡" },
];

const GARDEN_TYPES = {
  "Shape gardens": [
    "Alphabet garden", "Number garden", "Animal garden",
    "Fruit garden", "Solid shape garden",
  ],
  "Structure": [
    "Raised bed", "Ground bed", "Pet bottle garden",
    "Hydroponic", "Rooftop garden", "Balcony garden",
  ],
  "Material": [
    "Wood", "Steel", "Cement", "Plastic", "Sack garden",
  ],
};

// ─── Sample lessons ───────────────────────────────────────────────────────────

const SAMPLE_LESSONS = [
  { id:"s1", title:"Introduction to School Gardening", title_fr:"Introduction au jardinage scolaire", subject:"Agriculture / Agric Science", grade:"Primary 3", track:"garden-soil", garden_type:"Raised bed", is_bilingual:true, teacher:"Mr. Adeyemi", duration:"45 min", tags:["garden","soil","FEW"] },
  { id:"s2", title:"Alphabet Garden — Letters A to E", title_fr:"Jardin alphabet — Lettres A à E", subject:"English Language", grade:"Nursery 2", track:"garden-soil", garden_type:"Alphabet garden", is_bilingual:true, teacher:"Mrs. Osei", duration:"30 min", tags:["alphabet","nursery","shapes"] },
  { id:"s3", title:"Water Conservation at Home and School", title_fr:"Conservation de l'eau", subject:"Environmental Science", grade:"JSS 1", track:"water-systems", garden_type:"Ground bed", is_bilingual:true, teacher:"Mrs. Okonkwo", duration:"60 min", tags:["water","FEW","conservation"] },
  { id:"s4", title:"Composting for Beginners", title_fr:"Le compostage pour débutants", subject:"Agriculture / Agric Science", grade:"Primary 1", track:"garden-soil", garden_type:"Sack garden", is_bilingual:false, teacher:"Mr. Bello", duration:"30 min", tags:["compost","soil","recycling"] },
  { id:"s5", title:"Solar Energy and Food Systems", title_fr:"Énergie solaire et systèmes alimentaires", subject:"Biology", grade:"SSS 1", track:"energy-solar", garden_type:"Rooftop garden", is_bilingual:true, teacher:"Dr. Fasanya", duration:"90 min", tags:["solar","agrivoltaics","energy"] },
  { id:"s6", title:"Pet Bottle Garden — Growing Herbs Indoors", title_fr:"Jardin en bouteille — herbes aromatiques", subject:"Home Economics", grade:"Primary 4", track:"home-growing", garden_type:"Pet bottle garden", is_bilingual:true, teacher:"Mrs. Diallo", duration:"45 min", tags:["bottle","herbs","indoor","recycling"] },
  { id:"s7", title:"Food Heritage and Local Crops of Nigeria", title_fr:"Patrimoine alimentaire et cultures locales", subject:"Home Economics", grade:"JSS 2", track:"food-heritage", garden_type:"Ground bed", is_bilingual:true, teacher:"Mrs. Abubakar", duration:"60 min", tags:["heritage","local","AgriRoots"] },
  { id:"s8", title:"Hydroponic Farming for Secondary Schools", title_fr:"L'agriculture hydroponique pour lycéens", subject:"Agriculture / Agric Science", grade:"SSS 2", track:"stem-agric", garden_type:"Hydroponic", is_bilingual:true, teacher:"Mr. Okafor", duration:"90 min", tags:["hydroponic","STEM","soilless"] },
  { id:"s9", title:"Number Garden — Counting with Plants", title_fr:"Jardin des chiffres — compter avec les plantes", subject:"Mathematics", grade:"Nursery 3", track:"garden-soil", garden_type:"Number garden", is_bilingual:true, teacher:"Mrs. Eze", duration:"25 min", tags:["numbers","nursery","counting"] },
  { id:"s10", title:"Animal Shaped Beds — Biodiversity Lesson", title_fr:"Parterres en forme d'animaux", subject:"Biology", grade:"Primary 5", track:"garden-soil", garden_type:"Animal garden", is_bilingual:true, teacher:"Mr. Dankwa", duration:"50 min", tags:["animals","shapes","biodiversity"] },
  { id:"s11", title:"Raised Bed Construction with Wood", title_fr:"Construction de parterres surélevés en bois", subject:"Agriculture / Agric Science", grade:"JSS 3", track:"garden-soil", garden_type:"Raised bed", is_bilingual:false, teacher:"Mr. Mensah", duration:"75 min", tags:["raised bed","wood","construction"] },
  { id:"s12", title:"Rainwater Harvesting for School Gardens", title_fr:"Récupération des eaux pluviales", subject:"Environmental Science", grade:"Primary 6", track:"water-systems", garden_type:"Ground bed", is_bilingual:true, teacher:"Mrs. Kamara", duration:"55 min", tags:["rainwater","water","FEW"] },
];

const TRACK_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  "garden-soil":   { bg: "#f0f7ec", color: "#2D6A2D", border: "#b8dba8" },
  "water-systems": { bg: "#e6f1fb", color: "#185FA5", border: "#b5d4f4" },
  "energy-solar":  { bg: "#faeeda", color: "#854F0B", border: "#fac775" },
  "food-heritage": { bg: "#eeedfe", color: "#534AB7", border: "#cecbf6" },
  "stem-agric":    { bg: "#e1f5ee", color: "#0F6E56", border: "#5DCAA5" },
  "home-growing":  { bg: "#faece7", color: "#993C1D", border: "#F5C4B3" },
};

type Lesson = {
  id: string;
  title: string;
  title_fr?: string;
  subject: string;
  grade: string;
  track: string;
  garden_type: string;
  is_bilingual: boolean;
  teacher?: string;
  duration?: string;
  tags?: string[];
  content?: string;
  content_fr?: string;
};

const G: Record<string, React.CSSProperties> = {
  page:       { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:     { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const, top: 0, zIndex: 20 },
  topTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#163816" },
  langToggle: { display: "flex", background: "#e8e0cc", borderRadius: 8, overflow: "hidden" },
  langBtn:    { padding: "6px 13px", border: "none", background: "transparent", color: "#666", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  langBtnOn:  { padding: "6px 13px", border: "none", background: "#2D6A2D", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  back:       { fontSize: 13, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0 },
  createBtn:  { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  // Layout
  layout:     { display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "calc(100vh - 56px)" },
  // Sidebar
  sidebar:    { background: "#fff", borderRight: "1px solid #e8e0cc", padding: "20px 0", overflowY: "auto" as const, position: "sticky" as const, top: 56, height: "calc(100vh - 56px)" },
  sbTitle:    { fontFamily: "'DM Serif Display', serif", fontSize: 13, color: "#163816", padding: "0 16px 8px", display: "block" },
  sbSection:  { marginBottom: 4 },
  sbHeader:   { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", cursor: "pointer", userSelect: "none" as const },
  sbHeaderLbl:{ fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.7, color: "#888" },
  sbItem:     { display: "flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 24px", fontSize: 13, color: "#444", cursor: "pointer", transition: "all 0.12s" },
  sbItemOn:   { display: "flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 24px", fontSize: 13, color: "#2D6A2D", cursor: "pointer", background: "#f0f7ec", fontWeight: 500 },
  sbDivider:  { height: 1, background: "#f0ece0", margin: "8px 0" },
  sbClear:    { fontSize: 11, color: "#e05c2a", background: "none", border: "none", cursor: "pointer", padding: "4px 16px", fontFamily: "'DM Sans', sans-serif" },
  // Main
  main:       { padding: 24, overflowY: "auto" as const },
  // Hero strip
  hero:       { background: "#2D6A2D", borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 },
  heroTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff", marginBottom: 4, marginTop: 0 },
  heroSub:    { fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 0 },
  heroStats:  { display: "flex", gap: 12 },
  heroStat:   { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "8px 14px", textAlign: "center" as const },
  heroStatNum:{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff" },
  heroStatLbl:{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: 0.4 },
  // Active filters
  filtersRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" as const, minHeight: 28 },
  filterChip: { display: "flex", alignItems: "center", gap: 4, background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "3px 10px 3px 10px", fontSize: 12, color: "#2D6A2D" },
  filterX:    { background: "none", border: "none", cursor: "pointer", color: "#2D6A2D", fontSize: 14, padding: 0, lineHeight: 1 },
  // Search
  searchWrap: { marginBottom: 16 },
  search:     { width: "100%", padding: "10px 14px", border: "1.5px solid #e0d8c8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", boxSizing: "border-box" as const },
  // Results count
  resultsLbl: { fontSize: 12, color: "#888", marginBottom: 14, display: "block" },
  // Grid
  grid:       { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 },
  // Lesson card
  card:       { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: 18, cursor: "pointer", display: "flex", flexDirection: "column" as const, transition: "box-shadow 0.15s" },
  cardTrack:  { fontSize: 10, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, marginBottom: 6, display: "block" },
  cardTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#163816", marginBottom: 4, marginTop: 0, lineHeight: 1.3 },
  cardTitleFr:{ fontSize: 11, color: "#bbb", marginTop: 0, marginBottom: 10, fontStyle: "italic" },
  cardMeta:   { fontSize: 11, color: "#999", marginBottom: 10 },
  cardBottom: { display: "flex", gap: 5, flexWrap: "wrap" as const, marginTop: "auto", paddingTop: 10 },
  badge:      { fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 500 },
  tagPill:    { fontSize: 10, padding: "2px 7px", borderRadius: 5, background: "#f5f5f5", color: "#777" },
  // Empty
  empty:      { textAlign: "center" as const, padding: "60px 20px" },
  emptyIcon:  { fontSize: 48, marginBottom: 12, display: "block" },
  emptyText:  { fontSize: 14, color: "#888" },
  // Modal
  overlay:    { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 },
  modal:      { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto" as const },
  modalTop:   { borderRadius: "16px 16px 0 0", padding: "24px 28px" },
  modalTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff", marginBottom: 4, marginTop: 0 },
  modalTitleFr:{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginTop: 0 },
  modalMeta:  { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" as const },
  modalPill:  { fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "rgba(255,255,255,0.18)", color: "#fff" },
  modalBody:  { padding: 28 },
  modalLangSwitch: { display: "flex", gap: 4, background: "#e8e0cc", borderRadius: 8, padding: 3, marginBottom: 18, width: "fit-content" },
  modalLangOn:{ padding: "5px 14px", border: "none", background: "#2D6A2D", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#fff", cursor: "pointer", fontWeight: 500 },
  modalLangOff:{ padding: "5px 14px", border: "none", background: "transparent", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", cursor: "pointer" },
  modalContent:{ fontSize: 14, color: "#444", lineHeight: 1.75, whiteSpace: "pre-wrap" as const },
  modalClose: { background: "#f5f5f5", border: "none", borderRadius: 8, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" },
  modalCta:   { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", marginLeft: 8 },
};

export default function LibraryPage() {
  const router = useRouter();
  const [lang, setLang]                       = useState<"en" | "fr">("en");
  const [lessons, setLessons]                 = useState<Lesson[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [search, setSearch]                   = useState("");
  const [selectedGrades, setSelectedGrades]   = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks]   = useState<string[]>([]);
  const [selectedGardenTypes, setSelectedGardenTypes] = useState<string[]>([]);
  const [openSections, setOpenSections]       = useState({ grades: true, tracks: true, gardenTypes: true });
  const [selected, setSelected]               = useState<Lesson | null>(null);
  const [modalLang, setModalLang]             = useState<"en" | "fr">("en");

  useEffect(() => { loadLessons(); }, []);

  async function loadLessons() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    const real = (data || []).map((l: any) => ({ ...l, teacher: "You", grade: l.class_level || "Primary 1", track: l.tags?.[0] || "garden-soil", garden_type: "Raised bed" }));
    setLessons([...real, ...SAMPLE_LESSONS] as Lesson[]);
    setLoading(false);
  }

  function toggleGrade(g: string) {
    setSelectedGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }
  function toggleTrack(t: string) {
    setSelectedTracks(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }
  function toggleGardenType(gt: string) {
    setSelectedGardenTypes(prev => prev.includes(gt) ? prev.filter(x => x !== gt) : [...prev, gt]);
  }
  function clearAll() {
    setSelectedGrades([]); setSelectedTracks([]); setSelectedGardenTypes([]); setSearch("");
  }
  const hasFilters = selectedGrades.length > 0 || selectedTracks.length > 0 || selectedGardenTypes.length > 0 || search.length > 0;

  const filtered = lessons.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.title.toLowerCase().includes(q) || (l.title_fr?.toLowerCase().includes(q)) || l.subject.toLowerCase().includes(q);
    const matchGrade  = selectedGrades.length === 0 || selectedGrades.includes(l.grade);
    const matchTrack  = selectedTracks.length === 0 || selectedTracks.includes(l.track);
    const matchGT     = selectedGardenTypes.length === 0 || selectedGardenTypes.includes(l.garden_type);
    return matchSearch && matchGrade && matchTrack && matchGT;
  });

  const bilingual = lessons.filter(l => l.is_bilingual).length;
  const allFilters = [...selectedGrades, ...selectedTracks.map(t => TRACKS.find(x => x.id === t)?.label || t), ...selectedGardenTypes];

  const t = (en: string, fr: string) => lang === "fr" ? fr : en;

  const SbToggle = ({ open }: { open: boolean }) => (
    <span style={{ fontSize: 12, color: "#aaa" }}>{open ? "▲" : "▼"}</span>
  );

  return (
    <div style={G.page}>
      {/* Topbar */}
      <div style={G.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={G.back} onClick={() => router.push("/dashboard")}>← {t("Dashboard", "Tableau de bord")}</button>
          <span style={{ color: "#ddd" }}>|</span>
          <span style={G.topTitle}>{t("Lesson Library", "Bibliothèque de leçons")}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={G.langToggle}>
            <button style={lang === "en" ? G.langBtnOn : G.langBtn} onClick={() => setLang("en")}>EN</button>
            <button style={lang === "fr" ? G.langBtnOn : G.langBtn} onClick={() => setLang("fr")}>FR</button>
          </div>
          <button style={G.createBtn} onClick={() => router.push("/teacherpreneurship")}>
            + {t("Create lesson", "Créer une leçon")}
          </button>
        </div>
      </div>

      <div style={G.layout}>
        {/* ── Sidebar ── */}
        <aside style={G.sidebar}>
          <span style={G.sbTitle}>{t("Browse lessons", "Parcourir les leçons")}</span>

          {hasFilters && (
            <div style={{ padding: "0 16px 8px" }}>
              <button style={G.sbClear} onClick={clearAll}>✕ {t("Clear all filters", "Effacer les filtres")}</button>
            </div>
          )}

          <div style={G.sbDivider} />

          {/* Grade section */}
          <div style={G.sbSection}>
            <div style={G.sbHeader} onClick={() => setOpenSections(s => ({ ...s, grades: !s.grades }))}>
              <span style={G.sbHeaderLbl}>📚 {t("Class grade", "Niveau scolaire")}</span>
              <SbToggle open={openSections.grades} />
            </div>
            {openSections.grades && Object.entries(GRADES).map(([group, grades]) => (
              <div key={group}>
                <div style={{ fontSize: 10, color: "#bbb", textTransform: "uppercase" as const, letterSpacing: 0.5, padding: "4px 16px 2px 20px" }}>{group}</div>
                {grades.map(g => (
                  <div
                    key={g}
                    style={selectedGrades.includes(g) ? G.sbItemOn : G.sbItem}
                    onClick={() => toggleGrade(g)}
                    onMouseEnter={e => { if (!selectedGrades.includes(g)) (e.currentTarget as HTMLElement).style.background = "#f9f7f0"; }}
                    onMouseLeave={e => { if (!selectedGrades.includes(g)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {selectedGrades.includes(g) && <span style={{ fontSize: 10 }}>✓</span>}
                    <span>{g}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#ccc" }}>
                      {lessons.filter(l => l.grade === g).length}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={G.sbDivider} />

          {/* Track section */}
          <div style={G.sbSection}>
            <div style={G.sbHeader} onClick={() => setOpenSections(s => ({ ...s, tracks: !s.tracks }))}>
              <span style={G.sbHeaderLbl}>🗂 {t("Curriculum track", "Parcours")}</span>
              <SbToggle open={openSections.tracks} />
            </div>
            {openSections.tracks && TRACKS.map(track => {
              const on = selectedTracks.includes(track.id);
              const tc = TRACK_COLORS[track.id];
              return (
                <div
                  key={track.id}
                  style={{ ...G.sbItem, ...(on ? { background: tc.bg, color: tc.color, fontWeight: 500 } : {}) }}
                  onClick={() => toggleTrack(track.id)}
                  onMouseEnter={e => { if (!on) (e.currentTarget as HTMLElement).style.background = "#f9f7f0"; }}
                  onMouseLeave={e => { if (!on) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span>{track.emoji}</span>
                  <span>{track.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#ccc" }}>
                    {lessons.filter(l => l.track === track.id).length}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={G.sbDivider} />

          {/* Garden type section */}
          <div style={G.sbSection}>
            <div style={G.sbHeader} onClick={() => setOpenSections(s => ({ ...s, gardenTypes: !s.gardenTypes }))}>
              <span style={G.sbHeaderLbl}>🌿 {t("Garden type", "Type de jardin")}</span>
              <SbToggle open={openSections.gardenTypes} />
            </div>
            {openSections.gardenTypes && Object.entries(GARDEN_TYPES).map(([group, types]) => (
              <div key={group}>
                <div style={{ fontSize: 10, color: "#bbb", textTransform: "uppercase" as const, letterSpacing: 0.5, padding: "6px 16px 2px 20px" }}>{group}</div>
                {types.map(gt => (
                  <div
                    key={gt}
                    style={selectedGardenTypes.includes(gt) ? G.sbItemOn : G.sbItem}
                    onClick={() => toggleGardenType(gt)}
                    onMouseEnter={e => { if (!selectedGardenTypes.includes(gt)) (e.currentTarget as HTMLElement).style.background = "#f9f7f0"; }}
                    onMouseLeave={e => { if (!selectedGardenTypes.includes(gt)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {selectedGardenTypes.includes(gt) && <span style={{ fontSize: 10 }}>✓</span>}
                    <span>{gt}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#ccc" }}>
                      {lessons.filter(l => l.garden_type === gt).length}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={G.main}>
          {/* Hero */}
          <div style={G.hero}>
            <div>
              <h1 style={G.heroTitle}>{t("AgriShine™ Lesson Library", "Bibliothèque de leçons AgriShine™")}</h1>
              <p style={G.heroSub}>{t("Bilingual lessons across all grades, tracks and garden types", "Leçons bilingues pour tous les niveaux, parcours et types de jardins")}</p>
            </div>
            <div style={G.heroStats}>
              <div style={G.heroStat}><div style={G.heroStatNum}>{lessons.length}</div><div style={G.heroStatLbl}>{t("Lessons", "Leçons")}</div></div>
              <div style={G.heroStat}><div style={G.heroStatNum}>{bilingual}</div><div style={G.heroStatLbl}>{t("Bilingual", "Bilingues")}</div></div>
              <div style={G.heroStat}><div style={G.heroStatNum}>EN+FR</div><div style={G.heroStatLbl}>{t("Languages", "Langues")}</div></div>
            </div>
          </div>

          {/* Search */}
          <div style={G.searchWrap}>
            <input
              style={G.search}
              placeholder={t("Search lessons by title, subject or keyword…", "Rechercher par titre, matière ou mot-clé…")}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Active filter chips */}
          {allFilters.length > 0 && (
            <div style={G.filtersRow}>
              <span style={{ fontSize: 12, color: "#888" }}>{t("Filtered by:", "Filtré par:")}</span>
              {allFilters.map(f => (
                <div key={f} style={G.filterChip}>
                  {f}
                  <button style={G.filterX} onClick={() => {
                    setSelectedGrades(p => p.filter(x => x !== f));
                    setSelectedTracks(p => p.filter(x => TRACKS.find(t => t.label === f)?.id !== x && x !== f));
                    setSelectedGardenTypes(p => p.filter(x => x !== f));
                  }}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Results count */}
          <span style={G.resultsLbl}>
            {filtered.length} {t("lessons found", "leçons trouvées")}
            {hasFilters && ` ${t("(filtered)", "(filtrées)")}`}
          </span>

          {/* Lessons grid */}
          {loading ? (
            <div style={G.empty}><span style={G.emptyIcon}>📖</span><div style={G.emptyText}>{t("Loading lessons…", "Chargement…")}</div></div>
          ) : filtered.length === 0 ? (
            <div style={G.empty}><span style={G.emptyIcon}>🔍</span><div style={G.emptyText}>{t("No lessons match your filters.", "Aucune leçon ne correspond.")}</div></div>
          ) : (
            <div style={G.grid}>
              {filtered.map(l => {
                const tc = TRACK_COLORS[l.track] || TRACK_COLORS["garden-soil"];
                return (
                  <div
                    key={l.id}
                    style={G.card}
                    onClick={() => { setSelected(l); setModalLang(lang); }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(45,106,45,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "#b8dba8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "#e8e0cc"; }}
                  >
                    <span style={{ ...G.cardTrack, color: tc.color }}>{TRACKS.find(t => t.id === l.track)?.emoji} {TRACKS.find(t => t.id === l.track)?.label}</span>
                    <h3 style={G.cardTitle}>{lang === "fr" && l.title_fr ? l.title_fr : l.title}</h3>
                    {l.title_fr && <p style={G.cardTitleFr}>{lang === "fr" ? l.title : l.title_fr}</p>}
                    <div style={G.cardMeta}>
                      📚 {l.grade} · 🌿 {l.garden_type}
                      {l.teacher && ` · 👤 ${l.teacher}`}
                      {l.duration && ` · ⏱ ${l.duration}`}
                    </div>
                    <div style={G.cardBottom}>
                      {l.is_bilingual && <span style={{ ...G.badge, background: "#e6f1fb", color: "#185FA5" }}>🇫🇷 {t("Bilingual", "Bilingue")}</span>}
                      <span style={{ ...G.badge, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{l.subject?.split("/")[0].trim()}</span>
                      {l.tags?.slice(0, 2).map(tag => <span key={tag} style={G.tagPill}>#{tag}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ── Lesson modal ── */}
      {selected && (
        <div style={G.overlay} onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div style={G.modal}>
            {(() => {
              const tc = TRACK_COLORS[selected.track] || TRACK_COLORS["garden-soil"];
              return (
                <>
                  <div style={{ ...G.modalTop, background: tc.color }}>
                    <h2 style={G.modalTitle}>{modalLang === "fr" && selected.title_fr ? selected.title_fr : selected.title}</h2>
                    {selected.title_fr && <p style={G.modalTitleFr}>{modalLang === "fr" ? selected.title : selected.title_fr}</p>}
                    <div style={G.modalMeta}>
                      <span style={G.modalPill}>📚 {selected.grade}</span>
                      <span style={G.modalPill}>🌿 {selected.garden_type}</span>
                      <span style={G.modalPill}>🔬 {selected.subject?.split("/")[0].trim()}</span>
                      {selected.teacher && <span style={G.modalPill}>👤 {selected.teacher}</span>}
                      {selected.duration && <span style={G.modalPill}>⏱ {selected.duration}</span>}
                      {selected.is_bilingual && <span style={G.modalPill}>🇫🇷 Bilingual</span>}
                    </div>
                  </div>
                  <div style={G.modalBody}>
                    {selected.is_bilingual && (
                      <div style={G.modalLangSwitch}>
                        <button style={modalLang === "en" ? G.modalLangOn : G.modalLangOff} onClick={() => setModalLang("en")}>English</button>
                        <button style={modalLang === "fr" ? G.modalLangOn : G.modalLangOff} onClick={() => setModalLang("fr")}>Français</button>
                      </div>
                    )}
                    <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, color: tc.color, marginBottom: 10 }}>
                      {t("Lesson content", "Contenu de la leçon")}
                    </div>
                    <div style={G.modalContent}>
                      {modalLang === "fr" && selected.content_fr
                        ? selected.content_fr
                        : selected.content || t(
                          `This AgriShine™ lesson covers "${selected.title}" for ${selected.grade} students.\n\nGarden type: ${selected.garden_type}\nTrack: ${TRACKS.find(x => x.id === selected.track)?.label}\n\nTopics covered:\n• Introduction and objectives\n• Hands-on garden activities\n• Student observation tasks\n• Take-home activities for parents\n• Assessment questions\n\nFull lesson content is available when teachers publish complete lesson plans through the Teacherpreneurship module.`,
                          `Cette leçon AgriShine™ couvre "${selected.title_fr || selected.title}" pour les élèves de ${selected.grade}.\n\nType de jardin: ${selected.garden_type}\n\nSujets abordés:\n• Introduction et objectifs\n• Activités pratiques au jardin\n• Tâches d'observation des élèves\n• Activités à la maison\n• Questions d'évaluation\n\nLe contenu complet est disponible via le module Teacherpreneurship.`
                        )}
                    </div>
                    {selected.tags && (
                      <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, color: "#999", marginBottom: 8 }}>Tags</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {selected.tags.map(tag => <span key={tag} style={{ ...G.tagPill, padding: "4px 10px", fontSize: 12 }}>#{tag}</span>)}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: 24 }}>
                      <button style={G.modalClose} onClick={() => setSelected(null)}>{t("Close", "Fermer")}</button>
                      <button style={G.modalCta} onClick={() => router.push("/teacherpreneurship")}>
                        {t("Create a similar lesson →", "Créer une leçon similaire →")}
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
