"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const COUNTRY_LIST = ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Other"];
const GARDEN_SIZES = ["Small (1-5 beds)", "Medium (6-15 beds)", "Large (16-30 beds)", "Very Large (30+ beds)"];

const G: Record<string, React.CSSProperties> = {
  page:     { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" },
  wrap:     { maxWidth: 680, margin: "0 auto" },
  back:     { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0, fontFamily: "'DM Sans', sans-serif" },
  header:   { marginBottom: 32 },
  tag:      { display: "inline-block", background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "#2D6A2D", textTransform: "uppercase" as const, letterSpacing: 0.6, marginBottom: 12 },
  h1:       { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#163816", marginBottom: 8, marginTop: 0 },
  sub:      { fontSize: 14, color: "#666", lineHeight: 1.6, marginTop: 0 },
  card:     { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 16, padding: 28, marginBottom: 20 },
  cardTitle:{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816", marginBottom: 4, marginTop: 0 },
  cardSub:  { fontSize: 13, color: "#888", marginBottom: 20, marginTop: 0 },
  grid2:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  lbl:      { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
  inp:      { width: "100%", padding: "11px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:      { width: "100%", padding: "11px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const, appearance: "none" as const },
  textarea: { width: "100%", padding: "11px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const, resize: "vertical" as const, minHeight: 80 },
  toggle:   { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  toggleLbl:{ fontSize: 14, color: "#444" },
  checkRow: { display: "flex", alignItems: "center", gap: 8 },
  check:    { width: 18, height: 18, accentColor: "#2D6A2D", cursor: "pointer" },
  btn:      { width: "100%", padding: 14, background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 8 },
  err:      { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  ok:       { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#f0f7ec", border: "1px solid #b8dba8", color: "#1e4d1e" },
  steps:    { display: "flex", gap: 0, marginBottom: 32 },
  stepItem: { flex: 1, textAlign: "center" as const },
  stepNum:  { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, margin: "0 auto 6px" },
  stepLbl:  { fontSize: 11, color: "#888" },
};

export default function SchoolRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);

  // School details
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [teacherCount, setTeacherCount] = useState("");

  // Garden details
  const [hasGarden, setHasGarden] = useState(false);
  const [gardenSize, setGardenSize] = useState(GARDEN_SIZES[0]);
  const [gardenDesc, setGardenDesc] = useState("");

  async function handleSchoolSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in first."); setLoading(false); return; }

    const { data, error } = await supabase.from("schools").insert({
      name: schoolName,
      address, city, state, country,
      phone, email, website,
      student_count: parseInt(studentCount) || 0,
      teacher_count: parseInt(teacherCount) || 0,
      has_garden: hasGarden,
      garden_size: hasGarden ? gardenSize : null,
      garden_description: hasGarden ? gardenDesc : null,
      created_by: user.id,
      status: "active",
    }).select().single();

    if (error) { setError(error.message); setLoading(false); return; }

    // Link school to user profile
    await supabase.from("profiles").update({ school_id: data.id }).eq("id", user.id);
    setSchoolId(data.id);
    setLoading(false);
    setStep(2);
  }

  async function handleTeacherSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !schoolId) { setError("Missing session."); setLoading(false); return; }

    const subjects = (document.getElementById("subjects") as HTMLInputElement)?.value
      .split(",").map(s => s.trim()).filter(Boolean);
    const classLevels = Array.from(document.querySelectorAll<HTMLInputElement>("input[name='class']:checked"))
      .map(el => el.value);

    const { error } = await supabase.from("teacher_profiles").insert({
      user_id: user.id,
      school_id: schoolId,
      subjects,
      class_levels: classLevels,
      bio: (document.getElementById("bio") as HTMLTextAreaElement)?.value,
      years_experience: parseInt((document.getElementById("years") as HTMLInputElement)?.value) || 0,
    });

    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    setStep(3);
  }

  const CLASS_LEVELS = ["Nursery", "Primary 1-3", "Primary 4-6", "JSS 1-3", "SSS 1-3", "University"];

  return (
    <div style={G.page}>
      <div style={G.wrap}>
        <button style={G.back} onClick={() => router.push("/dashboard")}>
          ← Back to dashboard
        </button>

        {/* Header */}
        <div style={G.header}>
          <div style={G.tag}>AgriShine™ Setup</div>
          <h1 style={G.h1}>Register your school</h1>
          <p style={G.sub}>Set up your school profile to start accessing AgriShine garden tools, lesson plans, and student tracking.</p>
        </div>

        {/* Step indicators */}
        <div style={G.steps}>
          {["School details", "Teacher profile", "Done!"].map((label, i) => {
            const num = i + 1;
            const done = step > num;
            const active = step === num;
            return (
              <div key={label} style={G.stepItem}>
                <div style={{ ...G.stepNum, background: done || active ? "#2D6A2D" : "#e8e0cc", color: done || active ? "#fff" : "#888" }}>
                  {done ? "✓" : num}
                </div>
                <div style={{ ...G.stepLbl, color: active ? "#2D6A2D" : "#aaa", fontWeight: active ? 500 : 400 }}>{label}</div>
              </div>
            );
          })}
        </div>

        {/* Step 1: School details */}
        {step === 1 && (
          <form onSubmit={handleSchoolSubmit}>
            <div style={G.card}>
              <h2 style={G.cardTitle}>School information</h2>
              <p style={G.cardSub}>Basic details about your school</p>
              <label style={G.lbl}>School name *</label>
              <input style={G.inp} placeholder="e.g. Greenfield Primary School" value={schoolName} onChange={e => setSchoolName(e.target.value)} required />
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>City</label>
                  <input style={G.inp} placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>State</label>
                  <input style={G.inp} placeholder="State" value={state} onChange={e => setState(e.target.value)} />
                </div>
              </div>
              <label style={G.lbl}>Address</label>
              <input style={G.inp} placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)} />
              <label style={G.lbl}>Country</label>
              <select style={G.sel} value={country} onChange={e => setCountry(e.target.value)}>
                {COUNTRY_LIST.map(c => <option key={c}>{c}</option>)}
              </select>
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Phone</label>
                  <input style={G.inp} placeholder="+234 ..." value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>Email</label>
                  <input style={G.inp} type="email" placeholder="school@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Number of students</label>
                  <input style={G.inp} type="number" placeholder="e.g. 450" value={studentCount} onChange={e => setStudentCount(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>Number of teachers</label>
                  <input style={G.inp} type="number" placeholder="e.g. 24" value={teacherCount} onChange={e => setTeacherCount(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={G.card}>
              <h2 style={G.cardTitle}>Garden status</h2>
              <p style={G.cardSub}>Tell us about your school garden</p>
              <div style={G.toggle}>
                <input type="checkbox" style={G.check} checked={hasGarden} onChange={e => setHasGarden(e.target.checked)} id="hasGarden" />
                <label style={G.toggleLbl} htmlFor="hasGarden">Our school already has a garden</label>
              </div>
              {hasGarden && (<>
                <label style={G.lbl}>Garden size</label>
                <select style={G.sel} value={gardenSize} onChange={e => setGardenSize(e.target.value)}>
                  {GARDEN_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
                <label style={G.lbl}>Describe your garden</label>
                <textarea style={G.textarea} placeholder="What do you grow? How is it used in lessons?" value={gardenDesc} onChange={e => setGardenDesc(e.target.value)} />
              </>)}
            </div>

            {error && <div style={G.err}>{error}</div>}
            <button style={G.btn} type="submit" disabled={loading}>{loading ? "Saving school…" : "Continue to teacher profile →"}</button>
          </form>
        )}

        {/* Step 2: Teacher profile */}
        {step === 2 && (
          <form onSubmit={handleTeacherSubmit}>
            <div style={G.card}>
              <h2 style={G.cardTitle}>Your teacher profile</h2>
              <p style={G.cardSub}>Help students and parents know more about you</p>

              <label style={G.lbl}>Subjects you teach (comma separated)</label>
              <input id="subjects" style={G.inp} placeholder="e.g. Agriculture, Science, Biology" />

              <label style={G.lbl}>Years of teaching experience</label>
              <input id="years" type="number" style={G.inp} placeholder="e.g. 5" />

              <label style={G.lbl}>Class levels you teach</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {CLASS_LEVELS.map(level => (
                  <div key={level} style={G.checkRow}>
                    <input type="checkbox" name="class" value={level} style={G.check} id={level} />
                    <label style={{ fontSize: 13, color: "#444", cursor: "pointer" }} htmlFor={level}>{level}</label>
                  </div>
                ))}
              </div>

              <label style={G.lbl}>Short bio</label>
              <textarea id="bio" style={G.textarea} placeholder="Tell us a little about yourself and your passion for agriculture education..." />
            </div>

            {error && <div style={G.err}>{error}</div>}
            <button style={G.btn} type="submit" disabled={loading}>{loading ? "Saving profile…" : "Complete setup →"}</button>
          </form>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <div style={{ ...G.card, textAlign: "center", padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
            <h2 style={{ ...G.cardTitle, fontSize: 24, textAlign: "center" }}>You're all set!</h2>
            <p style={{ ...G.cardSub, textAlign: "center", fontSize: 15 }}>
              Your school is registered on AgriShine™. You can now access garden tools, lesson plans, and student tracking.
            </p>
            <button style={{ ...G.btn, marginTop: 24 }} onClick={() => router.push("/dashboard")}>
              Go to my dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
