"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ROLES = [
  { value: "school",            label: "School admin" },
  { value: "teacher",           label: "Teacher" },
  { value: "parent",            label: "Parent" },
  { value: "student",           label: "Student" },
  { value: "youth",             label: "Youth" },
  { value: "artisan",           label: "Artisan" },
  { value: "ngo_organization",  label: "NGO / Partner" },
  { value: "researcher",        label: "Researcher" },
  { value: "community_partner", label: "Community partner" },
  { value: "admin",             label: "Admin" },
];

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Other"];

type Profile = {
  full_name: string;
  email: string;
  role: string;
  phone: string;
  country: string;
  state: string;
  school_name: string;
  organization_name: string;
};

type School = {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  student_count: number;
  teacher_count: number;
  has_garden: boolean;
  garden_size: string;
};

const G: Record<string, React.CSSProperties> = {
  page:       { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:     { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" },
  topTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816" },
  content:    { maxWidth: 900, margin: "0 auto", padding: "32px" },
  back:       { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0, fontFamily: "'DM Sans', sans-serif" },
  // Profile header card
  profileCard:{ background: "#2D6A2D", borderRadius: 16, padding: 28, marginBottom: 24, display: "flex", alignItems: "center", gap: 20 },
  avatar:     { width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 600, color: "#fff", flexShrink: 0, fontFamily: "'DM Serif Display', serif" },
  profileName:{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff", marginBottom: 4 },
  profileRole:{ fontSize: 13, color: "rgba(255,255,255,0.7)" },
  profileEmail:{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 },
  // Tabs
  tabRow:     { display: "flex", gap: 4, background: "#e8e0cc", borderRadius: 10, padding: 3, marginBottom: 24, width: "fit-content" },
  tabOn:      { padding: "7px 20px", background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  tabOff:     { padding: "7px 20px", background: "none", color: "#666", border: "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" },
  // Cards
  card:       { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 28, marginBottom: 20 },
  cardTitle:  { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816", marginBottom: 4, marginTop: 0 },
  cardSub:    { fontSize: 13, color: "#888", marginBottom: 20, marginTop: 0 },
  grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  lbl:        { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
  inp:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  inpDisabled:{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8e0cc", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#f9f7f0", color: "#888", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  btn:        { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnDanger:  { background: "transparent", color: "#c62828", border: "1.5px solid #ffcdd2", borderRadius: 10, padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer" },
  ok:         { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#f0f7ec", border: "1px solid #b8dba8", color: "#1e4d1e" },
  err:        { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  divider:    { height: 1, background: "#f0ece0", margin: "20px 0" },
  dangerZone: { background: "#fff5f5", border: "1px solid #ffcdd2", borderRadius: 14, padding: 24 },
  dangerTitle:{ fontSize: 14, fontWeight: 500, color: "#c62828", marginBottom: 4, marginTop: 0 },
  dangerSub:  { fontSize: 13, color: "#888", marginBottom: 16, marginTop: 0 },
  badge:      { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: "rgba(255,255,255,0.2)", color: "#fff", marginTop: 4 },
};

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"profile" | "school" | "security">("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const [profile, setProfile] = useState<Profile>({
    full_name: "", email: "", role: "teacher", phone: "",
    country: "Nigeria", state: "", school_name: "", organization_name: "",
  });

  const [school, setSchool] = useState<School | null>(null);

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }
    setUserEmail(user.email || "");

    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (p) {
      setProfile({
        full_name: p.full_name || "",
        email: user.email || "",
        role: p.role || "teacher",
        phone: p.phone || "",
        country: p.country || "Nigeria",
        state: p.state || "",
        school_name: p.school_name || "",
        organization_name: p.organization_name || "",
      });

      if (p.school_id) {
        const { data: s } = await supabase.from("schools").select("*").eq("id", p.school_id).maybeSingle();
        if (s) setSchool(s);
      }
    }
    setLoading(false);
  }

  async function handleSaveProfile(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setMessage(null); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Session expired."); setSaving(false); return; }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      role: profile.role,
      phone: profile.phone,
      country: profile.country,
      state: profile.state,
      school_name: profile.school_name,
      organization_name: profile.organization_name,
    });

    if (error) setError(error.message);
    else setMessage("Profile saved successfully!");
    setSaving(false);
  }

  async function handleSaveSchool(e: FormEvent) {
    e.preventDefault();
    if (!school) return;
    setSaving(true); setMessage(null); setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("schools").update({
      name: school.name,
      city: school.city,
      state: school.state,
      country: school.country,
      phone: school.phone,
      email: school.email,
      student_count: school.student_count,
      teacher_count: school.teacher_count,
    }).eq("id", school.id);

    if (error) setError(error.message);
    else setMessage("School info updated!");
    setSaving(false);
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError("Passwords don't match."); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSaving(true); setMessage(null); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setError(error.message);
    else { setMessage("Password updated successfully!"); setNewPassword(""); setConfirmPassword(""); }
    setSaving(false);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  const initials = profile.full_name
    ? profile.full_name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "LC";

  const roleLabel = ROLES.find(r => r.value === profile.role)?.label || profile.role;

  if (loading) return (
    <div style={{ ...G.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: "#888" }}>Loading profile...</div>
    </div>
  );

  return (
    <div style={G.page}>
      <div style={G.topbar}>
        <span style={G.topTitle}>Profile & Settings</span>
        <button style={{ ...G.btn, padding: "8px 16px", fontSize: 13 }} onClick={handleSignOut}>Sign out</button>
      </div>

      <div style={G.content}>
        <button style={G.back} onClick={() => router.push("/dashboard")}>← Back to dashboard</button>

        {/* Profile header */}
        <div style={G.profileCard}>
          <div style={G.avatar}>{initials}</div>
          <div>
            <div style={G.profileName}>{profile.full_name || "Your name"}</div>
            <div style={G.profileRole}>{roleLabel} · LIFEWS Connect</div>
            <div style={G.profileEmail}>{userEmail}</div>
            <span style={G.badge}>AgriShine™</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={G.tabRow}>
          <button style={tab === "profile" ? G.tabOn : G.tabOff} onClick={() => { setTab("profile"); setMessage(null); setError(null); }}>My profile</button>
          <button style={tab === "school" ? G.tabOn : G.tabOff} onClick={() => { setTab("school"); setMessage(null); setError(null); }}>School info</button>
          <button style={tab === "security" ? G.tabOn : G.tabOff} onClick={() => { setTab("security"); setMessage(null); setError(null); }}>Security</button>
        </div>

        {message && <div style={G.ok}>{message}</div>}
        {error   && <div style={G.err}>{error}</div>}

        {/* Profile tab */}
        {tab === "profile" && (
          <form onSubmit={handleSaveProfile}>
            <div style={G.card}>
              <h2 style={G.cardTitle}>Personal information</h2>
              <p style={G.cardSub}>Update your name, role and contact details</p>

              <label style={G.lbl}>Full name</label>
              <input style={G.inp} placeholder="Your full name" value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} />

              <label style={G.lbl}>Email address</label>
              <input style={G.inpDisabled} value={userEmail} disabled />

              <label style={G.lbl}>Role</label>
              <select style={G.sel} value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })}>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>

              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Phone</label>
                  <input style={G.inp} placeholder="+234 ..." value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div>
                  <label style={G.lbl}>Country</label>
                  <select style={G.sel} value={profile.country} onChange={e => setProfile({ ...profile, country: e.target.value })}>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <label style={G.lbl}>State</label>
              <input style={G.inp} placeholder="Your state" value={profile.state} onChange={e => setProfile({ ...profile, state: e.target.value })} />

              {(profile.role === "teacher" || profile.role === "school") && (<>
                <label style={G.lbl}>School name</label>
                <input style={G.inp} placeholder="Your school" value={profile.school_name} onChange={e => setProfile({ ...profile, school_name: e.target.value })} />
              </>)}

              {(profile.role === "ngo_organization" || profile.role === "community_partner" || profile.role === "artisan") && (<>
                <label style={G.lbl}>Organisation name</label>
                <input style={G.inp} placeholder="Your organisation" value={profile.organization_name} onChange={e => setProfile({ ...profile, organization_name: e.target.value })} />
              </>)}
            </div>

            <button style={G.btn} type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
          </form>
        )}

        {/* School tab */}
        {tab === "school" && (
          <>
            {!school ? (
              <div style={G.card}>
                <h2 style={G.cardTitle}>No school registered</h2>
                <p style={G.cardSub}>You haven't registered a school yet. Register your school to access AgriShine garden tools.</p>
                <button style={G.btn} onClick={() => router.push("/schools/register")}>Register your school →</button>
              </div>
            ) : (
              <form onSubmit={handleSaveSchool}>
                <div style={G.card}>
                  <h2 style={G.cardTitle}>School information</h2>
                  <p style={G.cardSub}>Update your school's details</p>

                  <label style={G.lbl}>School name</label>
                  <input style={G.inp} value={school.name} onChange={e => setSchool({ ...school, name: e.target.value })} />

                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>City</label>
                      <input style={G.inp} value={school.city || ""} onChange={e => setSchool({ ...school, city: e.target.value })} />
                    </div>
                    <div>
                      <label style={G.lbl}>State</label>
                      <input style={G.inp} value={school.state || ""} onChange={e => setSchool({ ...school, state: e.target.value })} />
                    </div>
                  </div>

                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>Phone</label>
                      <input style={G.inp} value={school.phone || ""} onChange={e => setSchool({ ...school, phone: e.target.value })} />
                    </div>
                    <div>
                      <label style={G.lbl}>Email</label>
                      <input style={G.inp} type="email" value={school.email || ""} onChange={e => setSchool({ ...school, email: e.target.value })} />
                    </div>
                  </div>

                  <div style={G.grid2}>
                    <div>
                      <label style={G.lbl}>Number of students</label>
                      <input style={G.inp} type="number" value={school.student_count || ""} onChange={e => setSchool({ ...school, student_count: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <label style={G.lbl}>Number of teachers</label>
                      <input style={G.inp} type="number" value={school.teacher_count || ""} onChange={e => setSchool({ ...school, teacher_count: parseInt(e.target.value) })} />
                    </div>
                  </div>
                </div>
                <button style={G.btn} type="submit" disabled={saving}>{saving ? "Saving…" : "Save school info"}</button>
              </form>
            )}
          </>
        )}

        {/* Security tab */}
        {tab === "security" && (
          <>
            <form onSubmit={handleChangePassword}>
              <div style={G.card}>
                <h2 style={G.cardTitle}>Change password</h2>
                <p style={G.cardSub}>Choose a strong password of at least 8 characters</p>

                <label style={G.lbl}>New password</label>
                <input style={G.inp} type="password" placeholder="Min. 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} />

                <label style={G.lbl}>Confirm new password</label>
                <input style={G.inp} type="password" placeholder="Repeat new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

                <button style={G.btn} type="submit" disabled={saving}>{saving ? "Updating…" : "Update password"}</button>
              </div>
            </form>

            <div style={G.divider} />

            <div style={G.dangerZone}>
              <h3 style={G.dangerTitle}>Sign out of all devices</h3>
              <p style={G.dangerSub}>This will sign you out of LIFEWS Connect on all devices.</p>
              <button style={G.btnDanger} onClick={handleSignOut}>Sign out</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
