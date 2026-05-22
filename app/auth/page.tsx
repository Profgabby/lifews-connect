"use client";

import { FormEvent, useState } from "react";
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
] as const;

type RoleValue = (typeof ROLES)[number]["value"];

const PILLARS = [
  { name: "AgriShine™",  desc: "School gardens & FEW systems learning" },
  { name: "AgriAble™",   desc: "Inclusion & adaptive learning paths" },
  { name: "AgriNext™",   desc: "STEM innovation & digital agriculture" },
  { name: "AgriRoots™",  desc: "Culture, language & food heritage" },
];

export default function AuthPage() {
  const router = useRouter();

  const [tab, setTab]               = useState<"login" | "signup">("login");
  const [step, setStep]             = useState(1);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [userId, setUserId]         = useState<string | null>(null);
  const [fullName, setFullName]     = useState("");
  const [country, setCountry]       = useState("");
  const [phone, setPhone]           = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [orgName, setOrgName]       = useState("");
  const [role, setRole]             = useState<RoleValue>("teacher");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMsg, setForgotMsg]   = useState<string | null>(null);

  const supabase = createClient();

  /* ── Step 1: create account ── */
  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    if (!data.user) { setError("Could not create account."); setLoading(false); return; }
    // Store user id so we can save profile without needing getUser()
    setUserId(data.user.id);
    // Create empty profile row
    await supabase.from("profiles").upsert({ id: data.user.id, email });
    setLoading(false);
    setStep(2);
  }

  /* ── Step 3: save profile then go to dashboard ── */
  async function handleProfile(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userId) {
      setError("User session missing. Please start over.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName,
      role,
      phone,
      country,
      school_name: schoolName,
      organization_name: orgName,
    });

    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    // Use window.location for a hard redirect so middleware picks up the session
    window.location.href = "/dashboard";
  }

  /* ── Login ── */
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", data.user.id)
      .maybeSingle();
    setLoading(false);
    if (!profile?.full_name || !profile?.role) {
      setUserId(data.user.id);
      setTab("signup");
      setStep(2);
      return;
    }
    window.location.href = "/dashboard";
  }

  /* ── Forgot password ── */
  async function handleForgot(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setForgotMsg("Reset link sent! Check your email.");
  }

  const G: Record<string, React.CSSProperties> = {
    page:     { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
    left:     { background: "#2D6A2D", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 48 },
    deco:     { position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.05)" },
    bName:    { fontFamily: "'DM Serif Display', serif", fontSize: 38, lineHeight: 1.1, color: "#fff", marginBottom: 14 },
    bTag:     { fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: 36 },
    pillars:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    pillar:   { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "14px 16px" },
    pName:    { fontSize: 12, fontWeight: 500, color: "#fff", marginBottom: 4 },
    pDesc:    { fontSize: 11, color: "rgba(255,255,255,0.58)", lineHeight: 1.45 },
    right:    { background: "#F5F5E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 36px", overflowY: "auto" },
    card:     { width: "100%", maxWidth: 420 },
    logoRow:  { display: "flex", alignItems: "center", gap: 10, marginBottom: 36 },
    logoMark: { width: 36, height: 36, background: "#2D6A2D", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
    logoText: { fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#1e4d1e" },
    h1:       { fontFamily: "'DM Serif Display', serif", fontSize: 30, color: "#163816", marginBottom: 6, marginTop: 0 },
    sub:      { fontSize: 14, color: "#777", marginBottom: 28, lineHeight: 1.55, marginTop: 0 },
    tabs:     { display: "flex", background: "#e4dcc8", borderRadius: 10, padding: 3, gap: 3, marginBottom: 28 },
    tabOn:    { flex: 1, padding: 9, border: "none", background: "#2D6A2D", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", cursor: "pointer", fontWeight: 500 },
    tabOff:   { flex: 1, padding: 9, border: "none", background: "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", cursor: "pointer" },
    steps:    { display: "flex", gap: 6, marginBottom: 24 },
    stepOn:   { height: 4, flex: 1, borderRadius: 2, background: "#2D6A2D" },
    stepOff:  { height: 4, flex: 1, borderRadius: 2, background: "#ddd5c0" },
    lbl:      { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
    inp:      { width: "100%", padding: "11px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
    secLbl:   { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#999", marginBottom: 12 },
    roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 },
    chipOff:  { padding: "10px 12px", border: "1.5px solid #d4cbb8", borderRadius: 10, background: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", cursor: "pointer", textAlign: "center" as const },
    chipOn:   { padding: "10px 12px", border: "1.5px solid #2D6A2D", borderRadius: 10, background: "#f0f7ec", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1e4d1e", cursor: "pointer", textAlign: "center" as const, fontWeight: 500 },
    btn:      { width: "100%", padding: 13, background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 },
    btnG:     { width: "100%", padding: 13, background: "transparent", color: "#2D6A2D", border: "1.5px solid #2D6A2D", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 8 },
    err:      { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
    ok:       { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#f0f7ec", border: "1px solid #b8dba8", color: "#1e4d1e" },
    link:     { fontSize: 12, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0 },
  };

  /* ── Forgot password screen ── */
  if (showForgot) return (
    <>
    <style>{`@media (max-width: 768px) { .auth-page { grid-template-columns: 1fr !important; } .auth-left { display: none !important; } .auth-right { padding: 32px 20px !important; } }`}</style>
    <div style={G.page} className="auth-page">
      <div style={G.left} className="auth-left">
        <div style={{ ...G.deco, width: 360, height: 360, top: -120, right: -120 }} />
        <div style={G.bName}>LIFEWS<br />CONNECT™</div>
        <p style={G.bTag}>Connecting schools, teachers, parents, students, and communities.</p>
      </div>
      <div style={G.right} className="auth-right">
        <div style={G.card}>
          <div style={G.logoRow}><div style={G.logoMark}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div><span style={G.logoText}>LIFEWS Connect</span></div>
          <h1 style={G.h1}>Reset password</h1>
          <p style={G.sub}>Enter your email and we'll send a reset link</p>
          <form onSubmit={handleForgot}>
            <label style={G.lbl}>Email address</label>
            <input style={G.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <button style={G.btn} type="submit" disabled={loading}>{loading ? "Sending…" : "Send reset link"}</button>
            {forgotMsg && <div style={G.ok}>{forgotMsg}</div>}
            {error && <div style={G.err}>{error}</div>}
          </form>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button style={G.link} onClick={() => { setShowForgot(false); setError(null); setForgotMsg(null); }}>← Back to sign in</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={G.page}>
      {/* Left */}
      <div style={G.left}>
        <div style={{ ...G.deco, width: 360, height: 360, top: -120, right: -120 }} />
        <div style={{ ...G.deco, width: 200, height: 200, top: "35%", left: -80 }} />
        <div>
          <div style={G.bName}>LIFEWS<br />CONNECT™</div>
          <p style={G.bTag}>Connecting schools, teachers, parents, students,<br />and communities for inclusive food-energy-water education.</p>
          <div style={G.pillars}>
            {PILLARS.map(p => (
              <div key={p.name} style={G.pillar}>
                <div style={G.pName}>{p.name}</div>
                <div style={G.pDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={G.right}>
        <div style={G.card}>
          <div style={G.logoRow}>
            <div style={G.logoMark}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/><path d="M7 12a5 5 0 0 1 5-5"/></svg></div>
            <span style={G.logoText}>LIFEWS Connect</span>
          </div>

          <div style={G.tabs}>
            <button type="button" style={tab === "login" ? G.tabOn : G.tabOff} onClick={() => { setTab("login"); setStep(1); setError(null); }}>Sign in</button>
            <button type="button" style={tab === "signup" ? G.tabOn : G.tabOff} onClick={() => { setTab("signup"); setStep(1); setError(null); }}>Create account</button>
          </div>

          {/* LOGIN */}
          {tab === "login" && (
            <form onSubmit={handleLogin}>
              <h1 style={G.h1}>Welcome back</h1>
              <p style={G.sub}>Sign in to your LIFEWS account to continue</p>
              <label style={G.lbl}>Email address</label>
              <input style={G.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <label style={G.lbl}>Password</label>
              <input style={G.inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              <div style={{ textAlign: "right", marginTop: -10, marginBottom: 16 }}>
                <button type="button" style={G.link} onClick={() => { setShowForgot(true); setError(null); }}>Forgot password?</button>
              </div>
              <button style={G.btn} type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in to LIFEWS Connect"}</button>
              {error && <div style={G.err}>{error}</div>}
            </form>
          )}

          {/* SIGNUP */}
          {tab === "signup" && (
            <div>
              <h1 style={G.h1}>Join LIFEWS</h1>
              <p style={G.sub}>Create your account — it only takes a minute</p>
              <div style={G.steps}>
                <div style={G.stepOn} />
                <div style={step >= 2 ? G.stepOn : G.stepOff} />
                <div style={step >= 3 ? G.stepOn : G.stepOff} />
              </div>

              {step === 1 && (
                <form onSubmit={handleSignup}>
                  <label style={G.lbl}>Email address</label>
                  <input style={G.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  <label style={G.lbl}>Password</label>
                  <input style={G.inp} type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
                  <button style={G.btn} type="submit" disabled={loading}>{loading ? "Creating account…" : "Continue →"}</button>
                  {error && <div style={G.err}>{error}</div>}
                </form>
              )}

              {step === 2 && (
                <div>
                  <span style={G.secLbl}>Choose your role</span>
                  <div style={G.roleGrid}>
                    {ROLES.map(r => (
                      <div key={r.value} style={role === r.value ? G.chipOn : G.chipOff} onClick={() => setRole(r.value)}>{r.label}</div>
                    ))}
                  </div>
                  <button type="button" style={G.btn} onClick={() => setStep(3)}>Continue →</button>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleProfile}>
                  <label style={G.lbl}>Full name</label>
                  <input style={G.inp} type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                  <label style={G.lbl}>Country</label>
                  <input style={G.inp} type="text" placeholder="Your country" value={country} onChange={e => setCountry(e.target.value)} required />
                  <label style={G.lbl}>Phone (optional)</label>
                  <input style={G.inp} type="tel" placeholder="+234 …" value={phone} onChange={e => setPhone(e.target.value)} />
                  {(role === "teacher" || role === "school") && (<>
                    <label style={G.lbl}>School name</label>
                    <input style={G.inp} type="text" placeholder="Your school" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
                  </>)}
                  {(role === "ngo_organization" || role === "community_partner" || role === "artisan") && (<>
                    <label style={G.lbl}>Organisation name</label>
                    <input style={G.inp} type="text" placeholder="Your organisation" value={orgName} onChange={e => setOrgName(e.target.value)} />
                  </>)}
                  <button style={G.btn} type="submit" disabled={loading}>{loading ? "Saving…" : "Complete registration"}</button>
                  <button type="button" style={G.btnG} onClick={() => setStep(2)}>← Back</button>
                  {error && <div style={G.err}>{error}</div>}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
