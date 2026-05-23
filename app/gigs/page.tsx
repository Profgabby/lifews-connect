"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Gig = {
  id: string;
  title: string;
  location: string;
  garden_type: string;
  budget: string;
  skills_needed: string;
  timeline: string;
  description: string;
  status: string;
  gig_category: string;
  created_at: string;
};

type Profile = {
  id: string;
  full_name: string;
  role: string;
  subscription_tier?: string;
};

export default function GigsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => { loadPage(); }, []);

  async function loadPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: prof } = await supabase
      .from("profiles")
      .select("id, full_name, role, subscription_tier")
      .eq("id", user.id)
      .maybeSingle();

    if (!prof) { router.push("/auth"); return; }
    setProfile(prof);

    // Load gigs based on role
    const { data: gigsData } = await supabase
      .from("gigs")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false });

    setGigs(gigsData || []);

    // Load user's existing applications
    const { data: apps } = await supabase
      .from("gig_applications")
      .select("gig_id")
      .eq("artisan_id", user.id);

    setAppliedIds((apps || []).map((a: { gig_id: string }) => a.gig_id));
    setLoading(false);
  }

  async function applyForGig(gigId: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("gig_applications").insert({
      gig_id: gigId,
      artisan_id: user.id,
      message: message,
      status: "pending",
    });

    if (error) {
      setErrorMsg("Failed to apply: " + error.message);
      return;
    }

    setAppliedIds([...appliedIds, gigId]);
    setApplyingId(null);
    setMessage("");
    setSuccessMsg("Application submitted successfully!");
    setTimeout(() => setSuccessMsg(null), 4000);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#F0EFE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔨</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#163816" }}>Loading Gigs...</div>
      </div>
    </div>
  );

  const canApply = profile?.role === "artisan" || profile?.role === "teacher";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F0EFE8; }
        .page-wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px; font-family: 'DM Sans', sans-serif; }
        .page-header { margin-bottom: 32px; }
        .page-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #163816; margin-bottom: 6px; }
        .page-sub { font-size: 15px; color: #666; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #2D6A2D; text-decoration: none; margin-bottom: 24px; }
        .back-link:hover { text-decoration: underline; }
        .gig-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; }
        .gig-card:hover { border-color: #2D6A2D; box-shadow: 0 4px 20px rgba(45,106,45,0.08); }
        .gig-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
        .gig-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: #163816; margin-bottom: 4px; }
        .gig-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .gig-tag { display: inline-flex; align-items: center; gap: 4px; background: #F5F5E8; border: 1px solid #e8e0cc; border-radius: 20px; padding: 4px 10px; font-size: 12px; color: #555; }
        .gig-budget { background: rgba(45,106,45,0.08); border: 1px solid rgba(45,106,45,0.2); color: #2D6A2D; border-radius: 20px; padding: 4px 12px; font-size: 13px; font-weight: 600; }
        .gig-desc { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 16px; }
        .gig-skills { font-size: 13px; color: #888; margin-bottom: 16px; }
        .gig-skills span { font-weight: 500; color: #444; }
        .btn-apply { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 10px 24px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-apply:hover { background: #235223; }
        .btn-applied { background: rgba(45,106,45,0.1); color: #2D6A2D; border: 1px solid rgba(45,106,45,0.3); border-radius: 10px; padding: 10px 24px; font-size: 13px; font-weight: 500; cursor: default; }
        .apply-form { background: #F5F5E8; border: 1px solid #e8e0cc; border-radius: 12px; padding: 16px; margin-top: 16px; }
        .apply-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.65px; color: #2D6A2D; margin-bottom: 8px; display: block; }
        .apply-textarea { width: 100%; padding: 10px 14px; background: #fff; border: 1px solid #e8e0cc; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #333; outline: none; resize: vertical; min-height: 80px; margin-bottom: 12px; }
        .apply-btns { display: flex; gap: 10px; }
        .btn-cancel { background: transparent; color: #888; border: 1px solid #e0d8c8; border-radius: 8px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; }
        .success-bar { background: rgba(45,106,45,0.1); border: 1px solid rgba(45,106,45,0.3); border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #2D6A2D; margin-bottom: 20px; }
        .error-bar { background: rgba(198,40,40,0.08); border: 1px solid rgba(198,40,40,0.2); border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #c62828; margin-bottom: 20px; }
        .empty { text-align: center; padding: 64px 24px; }
        .empty-icon { font-size: 48px; margin-bottom: 16px; }
        .empty-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: #163816; margin-bottom: 8px; }
        .empty-sub { font-size: 14px; color: #888; }
        .tier-notice { background: rgba(255,160,0,0.08); border: 1px solid rgba(255,160,0,0.25); border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #b8860b; margin-bottom: 24px; }
      `}</style>

      <div className="page-wrap">
        <a href="/dashboard" className="back-link">← Back to Dashboard</a>

        <div className="page-header">
          <div className="page-title">🔨 Available Gigs</div>
          <div className="page-sub">
            {profile?.role === "artisan" && "Browse and apply for garden installation gigs near you"}
            {profile?.role === "teacher" && "Browse teaching and training gigs available for educators"}
            {profile?.role !== "artisan" && profile?.role !== "teacher" && "Gigs available on LIFEWS Connect"}
          </div>
        </div>

        {!canApply && (
          <div className="tier-notice">
            ⚠️ Gig applications are available for artisans and teachers only. <a href="/pricing" style={{ color: "#2D6A2D", fontWeight: 500 }}>Upgrade your account</a> to access gigs.
          </div>
        )}

        {successMsg && <div className="success-bar">✅ {successMsg}</div>}
        {errorMsg && <div className="error-bar">❌ {errorMsg}</div>}

        {gigs.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔨</div>
            <div className="empty-title">No gigs available yet</div>
            <div className="empty-sub">Check back soon — new garden gigs are posted regularly</div>
          </div>
        ) : (
          gigs.map(gig => (
            <div key={gig.id} className="gig-card">
              <div className="gig-top">
                <div>
                  <div className="gig-title">{gig.title}</div>
                  <div className="gig-meta">
                    {gig.location && <span className="gig-tag">📍 {gig.location}</span>}
                    {gig.garden_type && <span className="gig-tag">🌱 {gig.garden_type}</span>}
                    {gig.timeline && <span className="gig-tag">⏱ {gig.timeline}</span>}
                  </div>
                </div>
                {gig.budget && <div className="gig-budget">{gig.budget}</div>}
              </div>

              {gig.description && <div className="gig-desc">{gig.description}</div>}
              {gig.skills_needed && (
                <div className="gig-skills">Skills needed: <span>{gig.skills_needed}</span></div>
              )}

              {canApply && (
                <>
                  {appliedIds.includes(gig.id) ? (
                    <div className="btn-applied">✅ Applied</div>
                  ) : applyingId === gig.id ? (
                    <div className="apply-form">
                      <label className="apply-label">Cover Message (optional)</label>
                      <textarea
                        className="apply-textarea"
                        placeholder="Tell the admin why you're a great fit for this gig..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                      />
                      <div className="apply-btns">
                        <button className="btn-apply" onClick={() => applyForGig(gig.id)}>Submit Application</button>
                        <button className="btn-cancel" onClick={() => setApplyingId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button className="btn-apply" onClick={() => setApplyingId(gig.id)}>Apply for this Gig</button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
