import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

export default async function GigsPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth");

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, role, subscription_tier")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) redirect("/auth");

    const { data: gigs } = await supabase
      .from("gigs")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false });

    const canApply = profile.role === "artisan" || profile.role === "teacher";

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #F0EFE8; }
          .page-wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px; font-family: 'DM Sans', sans-serif; }
          .page-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #163816; margin-bottom: 6px; }
          .page-sub { font-size: 15px; color: #666; margin-bottom: 32px; }
          .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #2D6A2D; text-decoration: none; margin-bottom: 24px; }
          .gig-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; }
          .gig-card:hover { border-color: #2D6A2D; box-shadow: 0 4px 20px rgba(45,106,45,0.08); }
          .gig-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: #163816; margin-bottom: 8px; }
          .gig-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
          .gig-tag { background: #F5F5E8; border: 1px solid #e8e0cc; border-radius: 20px; padding: 4px 10px; font-size: 12px; color: #555; }
          .gig-budget { background: rgba(45,106,45,0.08); border: 1px solid rgba(45,106,45,0.2); color: #2D6A2D; border-radius: 20px; padding: 4px 12px; font-size: 13px; font-weight: 600; }
          .gig-desc { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 12px; }
          .gig-skills { font-size: 13px; color: #888; margin-bottom: 16px; }
          .gig-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 8px; }
          .btn-apply { display: inline-block; background: #2D6A2D; color: #fff; border-radius: 10px; padding: 10px 24px; font-size: 13px; font-weight: 500; text-decoration: none; }
          .tier-notice { background: rgba(255,160,0,0.08); border: 1px solid rgba(255,160,0,0.25); border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #b8860b; margin-bottom: 24px; }
          .empty { text-align: center; padding: 64px 24px; }
          .empty-icon { font-size: 48px; margin-bottom: 16px; }
          .empty-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: #163816; margin-bottom: 8px; }
          .empty-sub { font-size: 14px; color: #888; }
        `}</style>

        <div className="page-wrap">
          <Link href="/dashboard" className="back-link">← Back to Dashboard</Link>
          <div className="page-title">🔨 Available Gigs</div>
          <div className="page-sub">
            {profile.role === "artisan" && "Browse and apply for garden installation gigs near you"}
            {profile.role === "teacher" && "Browse teaching and training gigs available for educators"}
            {profile.role !== "artisan" && profile.role !== "teacher" && "Gigs available on LIFEWS Connect"}
          </div>

          {!canApply && (
            <div className="tier-notice">
              ⚠️ Gig applications are available for artisans and teachers only.{" "}
              <Link href="/pricing" style={{ color: "#2D6A2D", fontWeight: 500 }}>Upgrade your account</Link> to access gigs.
            </div>
          )}

          {!gigs || gigs.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🔨</div>
              <div className="empty-title">No gigs available yet</div>
              <div className="empty-sub">Check back soon — new gigs are posted regularly</div>
            </div>
          ) : (
            gigs.map((gig: Gig) => (
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
                  <div className="gig-skills">Skills needed: <strong>{gig.skills_needed}</strong></div>
                )}
                {canApply && (
                  <a href={`/gigs/${gig.id}`} className="btn-apply">Apply for this Gig →</a>
                )}
              </div>
            ))
          )}
        </div>
      </>
    );
  } catch {
    redirect("/auth");
  }
}