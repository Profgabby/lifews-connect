"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ROLES = [
  { value: "school",            label: "School" },
  { value: "teacher",           label: "Teacher" },
  { value: "parent",            label: "Parent" },
  { value: "student",           label: "Student" },
  { value: "family",            label: "Family / Home User" },
  { value: "youth",             label: "Youth" },
  { value: "community_partner", label: "Community Partner" },
  { value: "ngo_organization",  label: "NGO / Organization" },
  { value: "researcher",        label: "Researcher" },
  { value: "volunteer",         label: "Volunteer" },
  { value: "general",           label: "General User" },
] as const;

type RoleValue = (typeof ROLES)[number]["value"];

const PILLARS = [
  { name: "AgriShine™",  desc: "School gardens & FEW systems learning" },
  { name: "AgriAble™",   desc: "Families, home gardens & adaptive learning" },
  { name: "AgriNext™",   desc: "Youth innovation & digital agriculture" },
  { name: "AgriRoots™",  desc: "Community food security & local heritage" },
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
  const [role, setRole]             = useState<RoleValue>("general");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMsg, setForgotMsg]   = useState<string | null>(null);

  const supabase = createClient();

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    if (!data.user) { setError("Could not create account."); setLoading(false); return; }
    setUserId(data.user.id);
    await supabase.from("profiles").upsert({ id: data.user.id, email });
    setLoading(false);
    setStep(2);
  }

  async function handleProfile(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!userId) { setError("User session missing. Please start over."); setLoading(false); return; }
    const { error } = await supabase.from("profiles").upsert({
      id: userId, email, full_name: fullName, role, phone, country,
      school_name: schoolName, organization_name: orgName,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    window.location.href = "/dashboard";
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", data.user.id).maybeSingle();
    setLoading(false);
    if (!profile?.full_name || !profile?.role) { setUserId(data.user.id); setTab("signup"); setStep(2); return; }
    window.location.href = "/dashboard";
  }

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

  const S = {
    inp:    { width: "100%", padding: "11px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
    lbl:    { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
    btn:    { width: "100%", padding: 13, background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 },
    btnG:   { width: "100%", padding: 13, background: "transparent", color: "#2D6A2D", border: "1.5px solid #2D6A2D", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 8 },
    err:    { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
    ok:     { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginTop: 14, background: "#f0f7ec", border: "1px solid #b8dba8", color: "#1e4d1e" },
    link:   { fontSize: 12, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0 },
    chipOff:{ padding: "10px 12px", border: "1.5px solid #d4cbb8", borderRadius: 10, background: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", cursor: "pointer", textAlign: "center" as const },
    chipOn: { padding: "10px 12px", border: "1.5px solid #2D6A2D", borderRadius: 10, background: "#f0f7ec", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1e4d1e", cursor: "pointer", textAlign: "center" as const, fontWeight: 500 },
  };

  const formContent = (
    <div style={{ width: "100%", maxWidth: 420 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{ width: 36, height: 36, background: "#2D6A2D", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌱</div>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#1e4d1e" }}>LIFEWS Connect</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#e4dcc8", borderRadius: 10, padding: 3, gap: 3, marginBottom: 28 }}>
        <button type="button" onClick={() => { setTab("login"); setStep(1); setError(null); }}
          style={{ flex: 1, padding: 9, border: "none", background: tab === "login" ? "#2D6A2D" : "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: tab === "login" ? "#fff" : "#666", cursor: "pointer", fontWeight: tab === "login" ? 500 : 400 }}>
          Sign in
        </button>
        <button type="button" onClick={() => { setTab("signup"); setStep(1); setError(null); }}
          style={{ flex: 1, padding: 9, border: "none", background: tab === "signup" ? "#2D6A2D" : "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: tab === "signup" ? "#fff" : "#666", cursor: "pointer", fontWeight: tab === "signup" ? 500 : 400 }}>
          Create account
        </button>
      </div>

      {/* LOGIN */}
      {tab === "login" && !showForgot && (
        <form onSubmit={handleLogin}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 6, marginTop: 0 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 24, marginTop: 0 }}>Sign in to your LIFEWSConnect account</p>
          <label style={S.lbl}>Email address</label>
          <input style={S.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={S.lbl}>Password</label>
          <input style={S.inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          <div style={{ textAlign: "right", marginTop: -10, marginBottom: 16 }}>
            <button type="button" style={S.link} onClick={() => { setShowForgot(true); setError(null); }}>Forgot password?</button>
          </div>
          <button style={S.btn} type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in to LIFEWSConnect"}</button>
          {error && <div style={S.err}>{error}</div>}
        </form>
      )}

      {/* FORGOT PASSWORD */}
      {tab === "login" && showForgot && (
        <form onSubmit={handleForgot}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 6, marginTop: 0 }}>Reset password</h1>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 24, marginTop: 0 }}>Enter your email and we&apos;ll send a reset link</p>
          <label style={S.lbl}>Email address</label>
          <input style={S.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <button style={S.btn} type="submit" disabled={loading}>{loading ? "Sending…" : "Send reset link"}</button>
          {forgotMsg && <div style={S.ok}>{forgotMsg}</div>}
          {error && <div style={S.err}>{error}</div>}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button style={S.link} type="button" onClick={() => { setShowForgot(false); setError(null); setForgotMsg(null); }}>← Back to sign in</button>
          </div>
        </form>
      )}

      {/* SIGNUP */}
      {tab === "signup" && (
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 6, marginTop: 0 }}>Register for LIFEWSConnect</h1>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 20, marginTop: 0 }}>Create your account to access LIFEWS programs, gardens, training, and connected platforms.</p>
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[1,2,3].map(n => (
              <div key={n} style={{ height: 4, flex: 1, borderRadius: 2, background: step >= n ? "#2D6A2D" : "#ddd5c0" }} />
            ))}
          </div>

          {/* Step 1 — Email & password */}
          {step === 1 && (
            <form onSubmit={handleSignup}>
              <label style={S.lbl}>Email address</label>
              <input style={S.inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <label style={S.lbl}>Password</label>
              <input style={S.inp} type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
              <button style={S.btn} type="submit" disabled={loading}>{loading ? "Creating account…" : "Continue →"}</button>
              {error && <div style={S.err}>{error}</div>}
            </form>
          )}

          {/* Step 2 — Role selection */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#999", marginBottom: 6 }}>I am joining as a</div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Choose the option that best describes you</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {ROLES.map(r => (
                  <div key={r.value} style={role === r.value ? S.chipOn : S.chipOff} onClick={() => setRole(r.value)}>{r.label}</div>
                ))}
              </div>
              <button type="button" style={S.btn} onClick={() => setStep(3)}>Continue →</button>
              <button type="button" style={S.btnG} onClick={() => setStep(1)}>← Back</button>
            </div>
          )}

          {/* Step 3 — Profile details */}
          {step === 3 && (
            <form onSubmit={handleProfile}>
              <label style={S.lbl}>Full name</label>
              <input style={S.inp} type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
              <label style={S.lbl}>Country</label>
              <input style={S.inp} type="text" placeholder="Your country" value={country} onChange={e => setCountry(e.target.value)} required />
              <label style={S.lbl}>Phone (optional)</label>
              <input style={S.inp} type="tel" placeholder="+234 …" value={phone} onChange={e => setPhone(e.target.value)} />

              {/* School name — only for school or teacher */}
              {(role === "teacher" || role === "school") && (
                <>
                  <label style={S.lbl}>School name</label>
                  <input style={S.inp} type="text" placeholder="Name of your school" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
                </>
              )}

              {/* Organisation name — for NGOs, community partners, researchers */}
              {(role === "ngo_organization" || role === "community_partner" || role === "researcher" || role === "volunteer") && (
                <>
                  <label style={S.lbl}>Organisation name</label>
                  <input style={S.inp} type="text" placeholder="Your organisation" value={orgName} onChange={e => setOrgName(e.target.value)} />
                </>
              )}

              <button style={S.btn} type="submit" disabled={loading}>{loading ? "Saving…" : "Create Account"}</button>
              <button type="button" style={S.btnG} onClick={() => setStep(2)}>← Back</button>
              {error && <div style={S.err}>{error}</div>}
            </form>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; font-family: 'DM Sans', sans-serif; }
        .auth-left { background: #2D6A2D; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 48px; }
        .auth-right { background: #F5F5E8; display: flex; align-items: center; justify-content: center; padding: 48px 36px; overflow-y: auto; }
        .auth-deco { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.05); }
        .pillars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 32px 20px; align-items: flex-start; padding-top: 40px; }
        }
      `}</style>
      <div className="auth-page">
        {/* Left panel */}
        <div className="auth-left">
          <div className="auth-deco" style={{ width: 360, height: 360, top: -120, right: -120 }} />
          <div className="auth-deco" style={{ width: 200, height: 200, top: "35%", left: -80 }} />
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, lineHeight: 1.1, color: "#fff", marginBottom: 14 }}>LIFEWS<br />CONNECT™</div>
            <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: 36 }}>
              Connecting schools, families, communities, learners, and partners to food, energy, water, learning, and sustainability solutions.
            </p>
            <div className="pillars-grid">
              {PILLARS.map(p => (
                <div key={p.name} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.58)", lineHeight: 1.45 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right panel */}
        <div className="auth-right">
          {formContent}
        </div>
      </div>
    </>
  );
}

