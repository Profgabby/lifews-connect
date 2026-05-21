"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SUBJECTS = [
  "Agriculture / Agric Science",
  "French Language",
  "Yoruba Language",
  "Igbo Language",
  "Hausa Language",
  "English Language",
  "Biology",
  "Chemistry",
  "Environmental Science",
  "Home Economics",
  "Other",
];

const CLASS_LEVELS = ["Nursery", "Primary 1-3", "Primary 4-6", "JSS 1-3", "SSS 1-3"];

const SAMPLE_CPD = [
  { id: 1, title: "Introduction to School Garden Management", title_fr: "Introduction à la gestion des jardins scolaires", duration: "45 min", level: "Beginner", badge: "Garden Starter" },
  { id: 2, title: "FEW Systems in the Classroom", title_fr: "Systèmes AEA en classe", duration: "60 min", level: "Intermediate", badge: "FEW Champion" },
  { id: 3, title: "Agrivoltaics for Teachers", title_fr: "Agrivoltaïque pour enseignants", duration: "90 min", level: "Advanced", badge: "Solar Grower" },
  { id: 4, title: "Bilingual Garden Storytelling", title_fr: "Narration bilingue au jardin", duration: "30 min", level: "Beginner", badge: "Story Gardener" },
];

type Lesson = {
  id: string;
  title: string;
  title_fr: string;
  subject: string;
  class_level: string;
  is_published: boolean;
  is_bilingual: boolean;
  created_at: string;
};

const G: Record<string, React.CSSProperties> = {
  page:       { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:     { background: "#2D6A2D", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" },
  topLogo:    { fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#fff", letterSpacing: -0.3 },
  topTag:     { fontSize: 11, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)" },
  topRight:   { display: "flex", alignItems: "center", gap: 12 },
  langToggle: { display: "flex", background: "rgba(255,255,255,0.12)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" },
  langBtn:    { padding: "6px 14px", border: "none", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  langBtnOn:  { padding: "6px 14px", border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  backBtn:    { fontSize: 12, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  // Profile banner
  banner:     { background: "linear-gradient(135deg, #1e4d1e 0%, #2D6A2D 100%)", padding: "32px 40px", display: "flex", alignItems: "center", gap: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" },
  avatar:     { width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "'DM Serif Display', serif", color: "#fff", flexShrink: 0, border: "2px solid rgba(255,255,255,0.25)" },
  bannerName: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff", marginBottom: 4 },
  bannerSub:  { fontSize: 13, color: "rgba(255,255,255,0.65)" },
  bannerBadges: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" as const },
  pill:       { fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" },
  // Tabs
  tabBar:     { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 40px", display: "flex", gap: 0 },
  tabOn:      { padding: "16px 20px", borderBottom: "2px solid #2D6A2D", color: "#2D6A2D", fontSize: 14, fontWeight: 500, cursor: "pointer", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif" },
  tabOff:     { padding: "16px 20px", color: "#888", fontSize: 14, cursor: "pointer", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif" },
  content:    { maxWidth: 1000, margin: "0 auto", padding: "32px 40px" },
  // Cards
  card:       { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 24, marginBottom: 16 },
  cardTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816", marginBottom: 4, marginTop: 0 },
  cardSub:    { fontSize: 13, color: "#888", marginBottom: 20, marginTop: 0 },
  // CPD cards
  cpd:        { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: 20, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  cpdLeft:    { flex: 1 },
  cpdTitle:   { fontSize: 14, fontWeight: 500, color: "#163816", marginBottom: 4 },
  cpdMeta:    { fontSize: 12, color: "#888" },
  cpdBadge:   { fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "#f0f7ec", color: "#2D6A2D", fontWeight: 500, marginTop: 6, display: "inline-block" },
  cpdBtn:     { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer", flexShrink: 0, marginLeft: 16 },
  // Lesson table
  lessonsWrap:{ background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, overflow: "hidden", marginBottom: 20 },
  tableHead:  { background: "#f9f7f0", borderBottom: "1px solid #e8e0cc", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 80px", padding: "10px 20px", gap: 12 },
  tableHCell: { fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, color: "#888" },
  tableRow:   { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 80px", padding: "14px 20px", gap: 12, borderBottom: "1px solid #f5f0e8", alignItems: "center" },
  badge:      { display: "inline-block", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 500 },
  // Earn
  earnGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
  earnCard:   { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 24 },
  earnIcon:   { fontSize: 32, marginBottom: 12, display: "block" },
  earnTitle:  { fontSize: 15, fontWeight: 500, color: "#163816", marginBottom: 6, marginTop: 0 },
  earnDesc:   { fontSize: 13, color: "#666", lineHeight: 1.6, marginTop: 0 },
  // Form
  grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  lbl:        { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
  inp:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  textarea:   { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const, resize: "vertical" as const, minHeight: 100 },
  btn:        { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnGhost:   { background: "transparent", color: "#2D6A2D", border: "1.5px solid #2D6A2D", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", marginRight: 10 },
  ok:         { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#f0f7ec", border: "1px solid #b8dba8", color: "#1e4d1e" },
  err:        { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  // Setup prompt
  setupCard:  { background: "#fff", border: "2px dashed #e0d8c8", borderRadius: 14, padding: 40, textAlign: "center" as const, marginBottom: 20 },
};

export default function TeacherpreneurshipPage() {
  const router = useRouter();
  const [tab, setTab]               = useState<"learn" | "teach" | "earn" | "setup">("learn");
  const [lang, setLang]             = useState<"en" | "fr">("en");
  const [lessons, setLessons]       = useState<Lesson[]>([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [message, setMessage]       = useState<string | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  // Teacher profile
  const [teacherName, setTeacherName]         = useState("");
  const [subject, setSubject]                 = useState(SUBJECTS[0]);
  const [teachingLang, setTeachingLang]       = useState("english");
  const [bio, setBio]                         = useState("");

  // Lesson form
  const [lessonTitle, setLessonTitle]         = useState("");
  const [lessonTitleFr, setLessonTitleFr]     = useState("");
  const [lessonContent, setLessonContent]     = useState("");
  const [lessonContentFr, setLessonContentFr] = useState("");
  const [lessonSubject, setLessonSubject]     = useState(SUBJECTS[0]);
  const [lessonLevel, setLessonLevel]         = useState(CLASS_LEVELS[0]);
  const [isBilingual, setIsBilingual]         = useState(false);
  const [publishNow, setPublishNow]           = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, subject_identity, teaching_language, bio")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      setTeacherName(profile.full_name || "");
      setSubject(profile.subject_identity || SUBJECTS[0]);
      setTeachingLang(profile.teaching_language || "english");
      setBio(profile.bio || "");
      setProfileComplete(!!(profile.full_name && profile.subject_identity));
      if (!profile.subject_identity) setTab("setup");
    }

    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("*")
      .eq("teacher_id", user.id)
      .order("created_at", { ascending: false });

    setLessons(lessonsData || []);
    setLoading(false);
  }

  async function handleSetup(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Session expired."); setSaving(false); return; }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: teacherName,
      subject_identity: subject,
      teaching_language: teachingLang,
      bio,
    });

    if (error) { setError(error.message); setSaving(false); return; }
    setProfileComplete(true);
    setSaving(false);
    setMessage("Teacherpreneur profile set up!");
    setTab("learn");
  }

  async function handleCreateLesson(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Session expired."); setSaving(false); return; }

    const { error } = await supabase.from("lessons").insert({
      teacher_id: user.id,
      title: lessonTitle,
      title_fr: lessonTitleFr || null,
      content: lessonContent,
      content_fr: lessonContentFr || null,
      subject: lessonSubject,
      class_level: lessonLevel,
      is_bilingual: isBilingual,
      is_published: publishNow,
      pillar: "agrishine",
      language: teachingLang,
    });

    if (error) { setError(error.message); setSaving(false); return; }
    setSaving(false);
    setShowLessonForm(false);
    setLessonTitle(""); setLessonTitleFr(""); setLessonContent(""); setLessonContentFr("");
    setIsBilingual(false); setPublishNow(false);
    setMessage("Lesson created successfully!");
    loadData();
  }

  const initials = teacherName
    ? teacherName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "TC";

  return (
    <div style={G.page}>
      {/* Topbar */}
      <div style={G.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={G.backBtn} onClick={() => router.push("/dashboard")}>← Dashboard</button>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={G.topLogo}>LIFEWS Teacherpreneurship™</span>
          <span style={G.topTag}>AgriShine™</span>
        </div>
        <div style={G.topRight}>
          <div style={G.langToggle}>
            <button style={lang === "en" ? G.langBtnOn : G.langBtn} onClick={() => setLang("en")}>EN</button>
            <button style={lang === "fr" ? G.langBtnOn : G.langBtn} onClick={() => setLang("fr")}>FR</button>
          </div>
        </div>
      </div>

      {/* Teacher banner */}
      <div style={G.banner}>
        <div style={G.avatar}>{initials}</div>
        <div>
          <div style={G.bannerName}>{teacherName || "Your name"}</div>
          <div style={G.bannerSub}>
            {subject} · {teachingLang === "french" ? "Teaches in French & English" : "Teaches in English"}
          </div>
          <div style={G.bannerBadges}>
            <span style={G.pill}>🌱 AgriShine teacher</span>
            <span style={G.pill}>📚 {subject.split("/")[0].trim()}</span>
            {teachingLang === "french" || teachingLang === "bilingual"
              ? <span style={G.pill}>🇫🇷 Bilingual</span>
              : <span style={G.pill}>🇬🇧 English</span>}
            <span style={G.pill}>✨ {lessons.length} lessons created</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={G.tabBar}>
        {!profileComplete && (
          <button style={tab === "setup" ? G.tabOn : G.tabOff} onClick={() => setTab("setup")}>
            ⚠️ Complete setup
          </button>
        )}
        <button style={tab === "learn" ? G.tabOn : G.tabOff} onClick={() => setTab("learn")}>
          📖 {lang === "fr" ? "Apprendre" : "Learn"}
        </button>
        <button style={tab === "teach" ? G.tabOn : G.tabOff} onClick={() => setTab("teach")}>
          🌿 {lang === "fr" ? "Enseigner" : "Teach"}
        </button>
        <button style={tab === "earn" ? G.tabOn : G.tabOff} onClick={() => setTab("earn")}>
          💰 {lang === "fr" ? "Gagner" : "Earn"}
        </button>
      </div>

      <div style={G.content}>
        {message && <div style={G.ok}>{message}</div>}
        {error   && <div style={G.err}>{error}</div>}

        {/* ── SETUP TAB ── */}
        {tab === "setup" && (
          <form onSubmit={handleSetup}>
            <div style={G.card}>
              <h2 style={G.cardTitle}>
                {lang === "fr" ? "Configurez votre profil d'enseignant" : "Set up your teacherpreneur profile"}
              </h2>
              <p style={G.cardSub}>
                {lang === "fr"
                  ? "Dites-nous qui vous êtes et dans quelle langue vous enseignez"
                  : "Tell us who you are and what language you teach in"}
              </p>

              <label style={G.lbl}>{lang === "fr" ? "Votre nom complet" : "Your full name"}</label>
              <input style={G.inp} placeholder={lang === "fr" ? "Votre nom" : "Your full name"} value={teacherName} onChange={e => setTeacherName(e.target.value)} required />

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>{lang === "fr" ? "Matière principale" : "Primary subject"}</label>
                  <select style={G.sel} value={subject} onChange={e => setSubject(e.target.value)}>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={G.lbl}>{lang === "fr" ? "Langue d'enseignement" : "Teaching language"}</label>
                  <select style={G.sel} value={teachingLang} onChange={e => setTeachingLang(e.target.value)}>
                    <option value="english">English only</option>
                    <option value="french">French only</option>
                    <option value="bilingual">Bilingual (English + French)</option>
                  </select>
                </div>
              </div>

              <label style={G.lbl}>{lang === "fr" ? "Biographie courte" : "Short bio"}</label>
              <textarea style={G.textarea}
                placeholder={lang === "fr"
                  ? "Parlez-nous de votre passion pour l'enseignement agricole..."
                  : "Tell us about your passion for agriculture teaching..."}
                value={bio} onChange={e => setBio(e.target.value)} />
            </div>
            <button style={G.btn} type="submit" disabled={saving}>
              {saving ? (lang === "fr" ? "Enregistrement..." : "Saving...") : (lang === "fr" ? "Enregistrer le profil →" : "Save profile →")}
            </button>
          </form>
        )}

        {/* ── LEARN TAB ── */}
        {tab === "learn" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#163816", marginBottom: 6, marginTop: 0 }}>
                {lang === "fr" ? "Développement professionnel" : "Professional development"}
              </h2>
              <p style={{ fontSize: 14, color: "#666", marginTop: 0 }}>
                {lang === "fr"
                  ? "Cours bilingues pour faire évoluer votre carrière d'enseignant en agriculture"
                  : "Bilingual courses to grow your agri-teaching career"}
              </p>
            </div>

            {SAMPLE_CPD.map(course => (
              <div key={course.id} style={G.cpd}>
                <div style={G.cpdLeft}>
                  <div style={G.cpdTitle}>
                    {lang === "fr" ? course.title_fr : course.title}
                  </div>
                  <div style={G.cpdMeta}>
                    ⏱ {course.duration} · {course.level}
                    {lang === "fr" && <span style={{ marginLeft: 8, fontSize: 10, color: "#2D6A2D" }}>🇫🇷 Disponible en français</span>}
                  </div>
                  <span style={G.cpdBadge}>🏅 {lang === "fr" ? "Badge : " : "Earns badge: "}{course.badge}</span>
                </div>
                <button style={G.cpdBtn}>
                  {lang === "fr" ? "Commencer →" : "Start →"}
                </button>
              </div>
            ))}

            <div style={{ ...G.card, background: "#f0f7ec", border: "1px solid #b8dba8", marginTop: 24 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#163816", marginTop: 0, marginBottom: 6 }}>
                {lang === "fr" ? "🌍 Contenu multilingue bientôt disponible" : "🌍 More languages coming soon"}
              </h3>
              <p style={{ fontSize: 13, color: "#555", marginTop: 0 }}>
                {lang === "fr"
                  ? "Le contenu en yoruba, igbo et hausa sera disponible dans la version 0.2."
                  : "Yoruba, Igbo and Hausa content will be available in v0.2. English and French are our bilingual core."}
              </p>
            </div>
          </div>
        )}

        {/* ── TEACH TAB ── */}
        {tab === "teach" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#163816", marginBottom: 6, marginTop: 0 }}>
                  {lang === "fr" ? "Mes leçons" : "My lessons"}
                </h2>
                <p style={{ fontSize: 14, color: "#666", marginTop: 0 }}>
                  {lang === "fr" ? "Créez et partagez des leçons bilingues" : "Create and share bilingual lessons with your school"}
                </p>
              </div>
              <button style={G.btn} onClick={() => setShowLessonForm(!showLessonForm)}>
                {showLessonForm ? "Cancel" : (lang === "fr" ? "+ Nouvelle leçon" : "+ New lesson")}
              </button>
            </div>

            {/* Lesson creation form */}
            {showLessonForm && (
              <form onSubmit={handleCreateLesson}>
                <div style={G.card}>
                  <h3 style={{ ...G.cardTitle, fontSize: 16 }}>
                    {lang === "fr" ? "Créer une nouvelle leçon" : "Create a new lesson"}
                  </h3>

                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>Title (English)</label>
                      <input style={G.inp} placeholder="Lesson title in English" value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} required />
                    </div>
                    <div>
                      <label style={G.lbl}>Titre (Français)</label>
                      <input style={G.inp} placeholder="Titre de la leçon en français" value={lessonTitleFr} onChange={e => setLessonTitleFr(e.target.value)} />
                    </div>
                  </div>

                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>Subject</label>
                      <select style={G.sel} value={lessonSubject} onChange={e => setLessonSubject(e.target.value)}>
                        {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={G.lbl}>Class level</label>
                      <select style={G.sel} value={lessonLevel} onChange={e => setLessonLevel(e.target.value)}>
                        {CLASS_LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <label style={G.lbl}>Lesson content (English)</label>
                  <textarea style={G.textarea} placeholder="Write your lesson content in English..." value={lessonContent} onChange={e => setLessonContent(e.target.value)} />

                  <label style={G.lbl}>Contenu de la leçon (Français)</label>
                  <textarea style={G.textarea} placeholder="Rédigez le contenu de votre leçon en français..." value={lessonContentFr} onChange={e => setLessonContentFr(e.target.value)} />

                  <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444", cursor: "pointer" }}>
                      <input type="checkbox" checked={isBilingual} onChange={e => setIsBilingual(e.target.checked)} style={{ accentColor: "#2D6A2D" }} />
                      This is a bilingual lesson
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444", cursor: "pointer" }}>
                      <input type="checkbox" checked={publishNow} onChange={e => setPublishNow(e.target.checked)} style={{ accentColor: "#2D6A2D" }} />
                      Publish now (visible to school)
                    </label>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" style={G.btnGhost} onClick={() => setShowLessonForm(false)}>Cancel</button>
                  <button type="submit" style={G.btn} disabled={saving}>{saving ? "Saving…" : "Save lesson"}</button>
                </div>
              </form>
            )}

            {/* Lessons table */}
            {lessons.length === 0 && !showLessonForm && (
              <div style={G.setupCard}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📖</div>
                <div style={{ fontSize: 15, color: "#888", marginBottom: 16 }}>
                  {lang === "fr" ? "Aucune leçon créée. Créez votre première leçon!" : "No lessons yet. Create your first lesson!"}
                </div>
                <button style={G.btn} onClick={() => setShowLessonForm(true)}>
                  {lang === "fr" ? "+ Créer une leçon" : "+ Create first lesson"}
                </button>
              </div>
            )}

            {lessons.length > 0 && !showLessonForm && (
              <div style={G.lessonsWrap}>
                <div style={G.tableHead}>
                  <span style={G.tableHCell}>Title</span>
                  <span style={G.tableHCell}>Subject</span>
                  <span style={G.tableHCell}>Level</span>
                  <span style={G.tableHCell}>Bilingual</span>
                  <span style={G.tableHCell}>Status</span>
                </div>
                {lessons.map(l => (
                  <div key={l.id} style={G.tableRow}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>
                        {lang === "fr" && l.title_fr ? l.title_fr : l.title}
                      </div>
                      {lang === "fr" && l.title_fr && (
                        <div style={{ fontSize: 11, color: "#aaa" }}>{l.title}</div>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "#555" }}>{l.subject?.split("/")[0].trim()}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>{l.class_level}</div>
                    <div>
                      {l.is_bilingual
                        ? <span style={{ ...G.badge, background: "#e6f1fb", color: "#185FA5" }}>🇫🇷 Bilingual</span>
                        : <span style={{ ...G.badge, background: "#f5f5f5", color: "#888" }}>EN only</span>}
                    </div>
                    <div>
                      {l.is_published
                        ? <span style={{ ...G.badge, background: "#f0f7ec", color: "#2D6A2D" }}>Published</span>
                        : <span style={{ ...G.badge, background: "#faeeda", color: "#854F0B" }}>Draft</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── EARN TAB ── */}
        {tab === "earn" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#163816", marginBottom: 6, marginTop: 0 }}>
                {lang === "fr" ? "Opportunités de revenus" : "Earn opportunities"}
              </h2>
              <p style={{ fontSize: 14, color: "#666", marginTop: 0 }}>
                {lang === "fr"
                  ? "Monétisez votre expertise et connectez-vous avec des écoles"
                  : "Monetise your expertise and connect with schools that need your skills"}
              </p>
            </div>

            <div style={G.earnGrid}>
              <div style={G.earnCard}>
                <span style={G.earnIcon}>📚</span>
                <h3 style={G.earnTitle}>{lang === "fr" ? "Vendre des leçons" : "Sell lesson plans"}</h3>
                <p style={G.earnDesc}>
                  {lang === "fr"
                    ? "Publiez vos leçons bilingues et gagnez chaque fois qu'une école les télécharge."
                    : "Publish your bilingual lesson plans and earn every time a school downloads them."}
                </p>
                <button style={{ ...G.btn, marginTop: 16, fontSize: 13 }}>
                  {lang === "fr" ? "Commencer à vendre" : "Start selling"} →
                </button>
              </div>

              <div style={G.earnCard}>
                <span style={G.earnIcon}>🏫</span>
                <h3 style={G.earnTitle}>{lang === "fr" ? "Connexions avec les écoles" : "School connections"}</h3>
                <p style={G.earnDesc}>
                  {lang === "fr"
                    ? "Connectez-vous avec des écoles qui ont besoin d'enseignants d'agriculture bilingues."
                    : "Connect with schools that need bilingual agri-teachers for workshops and training."}
                </p>
                <button style={{ ...G.btn, marginTop: 16, fontSize: 13 }}>
                  {lang === "fr" ? "Voir les demandes" : "View requests"} →
                </button>
              </div>

              <div style={G.earnCard}>
                <span style={G.earnIcon}>🎓</span>
                <h3 style={G.earnTitle}>{lang === "fr" ? "Certifications" : "Earn certificates"}</h3>
                <p style={G.earnDesc}>
                  {lang === "fr"
                    ? "Complétez les modules CPD pour obtenir des certificats LIFEWS reconnus."
                    : "Complete CPD modules to earn LIFEWS-recognised certificates that boost your profile."}
                </p>
                <button style={{ ...G.btn, marginTop: 16, fontSize: 13 }}>
                  {lang === "fr" ? "Voir les certifications" : "View certificates"} →
                </button>
              </div>

              <div style={G.earnCard}>
                <span style={G.earnIcon}>🌍</span>
                <h3 style={G.earnTitle}>{lang === "fr" ? "Traduction de contenu" : "Content translation"}</h3>
                <p style={G.earnDesc}>
                  {lang === "fr"
                    ? "Gagnez en traduisant du contenu LIFEWS en français, yoruba, igbo ou hausa."
                    : "Earn by translating LIFEWS content into French, Yoruba, Igbo or Hausa."}
                </p>
                <button style={{ ...G.btn, marginTop: 16, fontSize: 13 }}>
                  {lang === "fr" ? "Proposer une traduction" : "Offer translation"} →
                </button>
              </div>
            </div>

            <div style={{ ...G.card, background: "#f0f7ec", border: "1px solid #b8dba8" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#163816", marginTop: 0, marginBottom: 8 }}>
                {lang === "fr" ? "Votre profil de teacherpreneur" : "Your teacherpreneur profile"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {[
                  { label: lang === "fr" ? "Leçons créées" : "Lessons created", value: lessons.length },
                  { label: lang === "fr" ? "Leçons publiées" : "Lessons published", value: lessons.filter(l => l.is_published).length },
                  { label: lang === "fr" ? "Leçons bilingues" : "Bilingual lessons", value: lessons.filter(l => l.is_bilingual).length },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#2D6A2D" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
