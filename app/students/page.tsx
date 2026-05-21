"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const CLASS_LEVELS = ["Nursery", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6", "JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];

type Student = {
  id: string;
  full_name: string;
  student_id: string;
  class_level: string;
  age: number;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  garden_bed: string;
  status: string;
  has_special_needs: boolean;
};

const G: Record<string, React.CSSProperties> = {
  page:      { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:    { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" },
  topTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816" },
  content:   { maxWidth: 1100, margin: "0 auto", padding: "32px 32px" },
  back:      { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0, fontFamily: "'DM Sans', sans-serif" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  tag:       { display: "inline-block", background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "#2D6A2D", textTransform: "uppercase" as const, letterSpacing: 0.6, marginBottom: 8 },
  h1:        { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 4, marginTop: 0 },
  sub:       { fontSize: 14, color: "#888", marginTop: 0 },
  btnPrimary:{ background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  // Stats
  statsRow:  { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 },
  statCard:  { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: "16px 20px" },
  statNum:   { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816" },
  statLbl:   { fontSize: 12, color: "#888", marginTop: 2 },
  // Table
  tableWrap: { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, overflow: "hidden" },
  tableHead: { background: "#f9f7f0", borderBottom: "1px solid #e8e0cc", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 80px", padding: "10px 20px", gap: 12 },
  tableHCell:{ fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, color: "#888" },
  tableRow:  { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 80px", padding: "14px 20px", gap: 12, borderBottom: "1px solid #f5f0e8", alignItems: "center" },
  tableCell: { fontSize: 13, color: "#333" },
  badge:     { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500 },
  // Modal overlay
  overlay:   { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 },
  modal:     { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" as const, padding: 32 },
  modalTitle:{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 4, marginTop: 0 },
  modalSub:  { fontSize: 13, color: "#888", marginBottom: 24, marginTop: 0 },
  grid2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  lbl:       { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
  inp:       { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:       { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sectionLbl:{ fontSize: 12, fontWeight: 500, color: "#163816", background: "#f9f7f0", padding: "8px 0", marginBottom: 12, marginTop: 8, borderTop: "1px solid #f0ece0", display: "block" },
  checkRow:  { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 },
  check:     { width: 16, height: 16, accentColor: "#2D6A2D" },
  modalBtns: { display: "flex", gap: 10, marginTop: 8 },
  btnSave:   { flex: 1, padding: 12, background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnCancel: { flex: 1, padding: 12, background: "transparent", color: "#666", border: "1.5px solid #e0d8c8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer" },
  err:       { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  empty:     { textAlign: "center" as const, padding: "60px 20px", color: "#aaa" },
  emptyIcon: { fontSize: 48, marginBottom: 16, display: "block" },
  emptyText: { fontSize: 15, color: "#888", marginBottom: 20 },
  searchRow: { display: "flex", gap: 12, marginBottom: 20, alignItems: "center" },
  search:    { flex: 1, padding: "10px 14px", border: "1.5px solid #e0d8c8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none" },
};

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [schoolId, setSchoolId] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName]       = useState("");
  const [studentIdNo, setStudentIdNo] = useState("");
  const [classLevel, setClassLevel]   = useState(CLASS_LEVELS[0]);
  const [age, setAge]                 = useState("");
  const [parentName, setParentName]   = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [gardenBed, setGardenBed]     = useState("");
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [specialNeedsNotes, setSpecialNeedsNotes] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    // Get school_id from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("school_id")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.school_id) setSchoolId(profile.school_id);

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("teacher_id", user.id)
      .order("full_name");

    setStudents(data || []);
    setLoading(false);
  }

  function resetForm() {
    setFullName(""); setStudentIdNo(""); setClassLevel(CLASS_LEVELS[0]);
    setAge(""); setParentName(""); setParentPhone(""); setParentEmail("");
    setGardenBed(""); setSpecialNeeds(false); setSpecialNeedsNotes("");
    setError(null);
  }

  async function handleAddStudent(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in."); setSaving(false); return; }

    const { error } = await supabase.from("students").insert({
      full_name: fullName,
      student_id: studentIdNo,
      class_level: classLevel,
      age: parseInt(age) || null,
      parent_name: parentName,
      parent_phone: parentPhone,
      parent_email: parentEmail,
      garden_bed: gardenBed,
      has_special_needs: specialNeeds,
      special_needs_notes: specialNeedsNotes,
      teacher_id: user.id,
      school_id: schoolId,
      status: "active",
    });

    if (error) { setError(error.message); setSaving(false); return; }
    setSaving(false);
    setShowModal(false);
    resetForm();
    loadStudents();
  }

  async function handleRemove(id: string) {
    if (!confirm("Remove this student?")) return;
    const supabase = createClient();
    await supabase.from("students").delete().eq("id", id);
    loadStudents();
  }

  const filtered = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.class_level?.toLowerCase().includes(search.toLowerCase())
  );

  const active = students.filter(s => s.status === "active").length;
  const levels = [...new Set(students.map(s => s.class_level).filter(Boolean))].length;
  const withParents = students.filter(s => s.parent_phone || s.parent_email).length;

  return (
    <div style={G.page}>
      {/* Topbar */}
      <div style={G.topbar}>
        <span style={G.topTitle}>Student Management</span>
        <button style={G.btnPrimary} onClick={() => { resetForm(); setShowModal(true); }}>
          + Add student
        </button>
      </div>

      <div style={G.content}>
        <button style={G.back} onClick={() => router.push("/dashboard")}>← Back to dashboard</button>

        <div style={G.header}>
          <div>
            <div style={G.tag}>AgriShine™</div>
            <h1 style={G.h1}>My students</h1>
            <p style={G.sub}>Add, manage and track your students' garden participation and progress.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={G.statsRow}>
          <div style={G.statCard}>
            <div style={G.statNum}>{students.length}</div>
            <div style={G.statLbl}>Total students</div>
          </div>
          <div style={G.statCard}>
            <div style={G.statNum}>{active}</div>
            <div style={G.statLbl}>Active</div>
          </div>
          <div style={G.statCard}>
            <div style={G.statNum}>{levels}</div>
            <div style={G.statLbl}>Class levels</div>
          </div>
          <div style={G.statCard}>
            <div style={G.statNum}>{withParents}</div>
            <div style={G.statLbl}>Parents connected</div>
          </div>
        </div>

        {/* Search */}
        <div style={G.searchRow}>
          <input
            style={G.search}
            placeholder="Search students by name or class..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div style={G.tableWrap}>
          <div style={G.tableHead}>
            <span style={G.tableHCell}>Student name</span>
            <span style={G.tableHCell}>Class</span>
            <span style={G.tableHCell}>Garden bed</span>
            <span style={G.tableHCell}>Parent contact</span>
            <span style={G.tableHCell}>Status</span>
            <span style={G.tableHCell}>Action</span>
          </div>

          {loading && (
            <div style={G.empty}>
              <span style={G.emptyIcon}>⏳</span>
              <div style={G.emptyText}>Loading students...</div>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={G.empty}>
              <span style={G.emptyIcon}>👩‍🎓</span>
              <div style={G.emptyText}>{search ? "No students match your search." : "No students yet. Add your first student!"}</div>
              {!search && (
                <button style={G.btnPrimary} onClick={() => { resetForm(); setShowModal(true); }}>
                  + Add first student
                </button>
              )}
            </div>
          )}

          {filtered.map(s => (
            <div key={s.id} style={G.tableRow}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>{s.full_name}</div>
                {s.student_id && <div style={{ fontSize: 11, color: "#aaa" }}>ID: {s.student_id}</div>}
                {s.has_special_needs && <span style={{ ...G.badge, background: "#e6f1fb", color: "#185FA5", fontSize: 10 }}>Special needs</span>}
              </div>
              <div style={G.tableCell}>{s.class_level || "—"}</div>
              <div style={G.tableCell}>{s.garden_bed || "—"}</div>
              <div>
                {s.parent_name && <div style={{ fontSize: 12, color: "#444" }}>{s.parent_name}</div>}
                {s.parent_phone && <div style={{ fontSize: 11, color: "#888" }}>{s.parent_phone}</div>}
                {!s.parent_name && !s.parent_phone && <span style={{ fontSize: 12, color: "#ccc" }}>Not set</span>}
              </div>
              <div>
                <span style={{ ...G.badge, background: s.status === "active" ? "#f0f7ec" : "#f5f5f5", color: s.status === "active" ? "#2D6A2D" : "#888" }}>
                  {s.status}
                </span>
              </div>
              <button
                onClick={() => handleRemove(s.id)}
                style={{ fontSize: 12, color: "#e05c2a", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div style={G.overlay} onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); resetForm(); } }}>
          <div style={G.modal}>
            <h2 style={G.modalTitle}>Add new student</h2>
            <p style={G.modalSub}>Fill in the student's details to add them to your class</p>

            {error && <div style={G.err}>{error}</div>}

            <form onSubmit={handleAddStudent}>
              <span style={G.sectionLbl}>Student details</span>
              <label style={G.lbl}>Full name *</label>
              <input style={G.inp} placeholder="Student's full name" value={fullName} onChange={e => setFullName(e.target.value)} required />

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Student ID</label>
                  <input style={G.inp} placeholder="e.g. STU001" value={studentIdNo} onChange={e => setStudentIdNo(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>Age</label>
                  <input style={G.inp} type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                </div>
              </div>

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Class level</label>
                  <select style={G.sel} value={classLevel} onChange={e => setClassLevel(e.target.value)}>
                    {CLASS_LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label style={G.lbl}>Garden bed assigned</label>
                  <input style={G.inp} placeholder="e.g. Bed 3A" value={gardenBed} onChange={e => setGardenBed(e.target.value)} />
                </div>
              </div>

              <span style={G.sectionLbl}>Parent / Guardian details</span>
              <label style={G.lbl}>Parent / Guardian name</label>
              <input style={G.inp} placeholder="Parent's full name" value={parentName} onChange={e => setParentName(e.target.value)} />

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Parent phone</label>
                  <input style={G.inp} placeholder="+234 ..." value={parentPhone} onChange={e => setParentPhone(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>Parent email</label>
                  <input style={G.inp} type="email" placeholder="parent@email.com" value={parentEmail} onChange={e => setParentEmail(e.target.value)} />
                </div>
              </div>

              <span style={G.sectionLbl}>Additional needs</span>
              <div style={G.checkRow}>
                <input type="checkbox" style={G.check} id="specialNeeds" checked={specialNeeds} onChange={e => setSpecialNeeds(e.target.checked)} />
                <label htmlFor="specialNeeds" style={{ fontSize: 13, color: "#444", cursor: "pointer" }}>This student has special educational needs</label>
              </div>
              {specialNeeds && (
                <>
                  <label style={G.lbl}>Notes on special needs</label>
                  <input style={G.inp} placeholder="Brief description of support needed" value={specialNeedsNotes} onChange={e => setSpecialNeedsNotes(e.target.value)} />
                </>
              )}

              <div style={G.modalBtns}>
                <button type="button" style={G.btnCancel} onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                <button type="submit" style={G.btnSave} disabled={saving}>{saving ? "Saving…" : "Add student"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
