"use client";

import { useState } from "react";
import Link from "next/link";

type Billing = "monthly" | "quarterly" | "annual";
type UserType = "school" | "teacher" | "artisan";

const SCHOOL_PLANS = [
  {
    name: "Starter",
    emoji: "🌱",
    color: "#2D6A2D",
    bg: "#f0f7ec",
    border: "#b8dba8",
    monthly: 0, quarterly: 0, annual: 0,
    tag: "Free forever",
    desc: "Perfect for public schools and those wanting to explore LIFEWS",
    features: [
      { text: "1 teacher account", included: true },
      { text: "Basic garden tracker (view only)", included: true },
      { text: "School profile page", included: true },
      { text: "AgriShine pillar access", included: true },
      { text: "2 PDF book previews/month", included: true },
      { text: "1 free starter course", included: true },
      { text: "1 demo game", included: true },
      { text: "LifewsBooks classroom chat", included: false },
      { text: "Garden ordering", included: false },
      { text: "Certificates", included: false },
    ],
  },
  {
    name: "Silver",
    emoji: "🥈",
    color: "#185FA5",
    bg: "#e6f1fb",
    border: "#b5d4f4",
    monthly: 20000, quarterly: 54000, annual: 192000,
    tag: "Most accessible",
    desc: "For individual teachers and small private schools up to 100 students",
    features: [
      { text: "3 teacher accounts", included: true },
      { text: "Full garden tracker", included: true },
      { text: "2 pillars (AgriShine + AgriAble)", included: true },
      { text: "Unlimited PDF books — 2 age groups", included: true },
      { text: "5 audio book streams/month", included: true },
      { text: "1 classroom chat (LifewsBooks)", included: true },
      { text: "Access to 1 learning path (~25 courses)", included: true },
      { text: "15% discount on extra courses", included: true },
      { text: "Full AgriShine game + leaderboard", included: true },
      { text: "Video books", included: false },
      { text: "Garden ordering", included: false },
      { text: "Certificates", included: false },
    ],
  },
  {
    name: "Gold",
    emoji: "🥇",
    color: "#854F0B",
    bg: "#faeeda",
    border: "#fac775",
    monthly: 45000, quarterly: 121000, annual: 432000,
    tag: "⭐ Most Popular",
    desc: "For growing private schools up to 500 students — the complete experience",
    popular: true,
    features: [
      { text: "10 teacher accounts", included: true },
      { text: "All 4 pillars", included: true },
      { text: "Unlimited PDF + audio books (all age groups)", included: true },
      { text: "10 video book streams/month", included: true },
      { text: "5 classroom chats (LifewsBooks)", included: true },
      { text: "Bilingual books (English + French)", included: true },
      { text: "Access to 3 learning paths (~75 courses)", included: true },
      { text: "Digital certificates included", included: true },
      { text: "Standard garden ordering", included: true },
      { text: "National competition eligibility", included: true },
      { text: "Monthly impact report", included: true },
      { text: "Priority garden ordering", included: false },
    ],
  },
  {
    name: "Platinum",
    emoji: "💎",
    color: "#534AB7",
    bg: "#eeedfe",
    border: "#cecbf6",
    monthly: 85000, quarterly: 229000, annual: 816000,
    tag: "For institutions",
    desc: "For large schools, school networks, NGOs and government partners",
    features: [
      { text: "Unlimited teacher accounts", included: true },
      { text: "All 4 pillars + multi-school management", included: true },
      { text: "Unlimited PDF + audio + video books", included: true },
      { text: "All age groups + French + local languages", included: true },
      { text: "Unlimited classroom chats + offline access", included: true },
      { text: "Full access to all 190+ courses", included: true },
      { text: "Printed certificates posted to school", included: true },
      { text: "Priority garden ordering + free consultation", included: true },
      { text: "Live artisan tracking", included: true },
      { text: "Host inter-school competitions", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom school branding on reports", included: true },
    ],
  },
];

const TEACHER_PLANS = [
  {
    name: "Guest",
    emoji: "👋",
    color: "#2D6A2D",
    monthly: 0, quarterly: 0, annual: 0,
    tag: "Start here",
    desc: "Apply to teach, get approved, start earning",
    features: [
      { text: "1 course live at a time", included: true },
      { text: "Earn 40% per student enrolled", included: true },
      { text: "Basic teacher profile", included: true },
      { text: "Monthly payouts", included: true },
      { text: "LIFEWS course promotion", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Bilingual course tools", included: false },
    ],
  },
  {
    name: "Educator",
    emoji: "📚",
    color: "#185FA5",
    monthly: 5000, quarterly: 13500, annual: 48000,
    tag: "For active teachers",
    desc: "Build your course library and earn consistently",
    features: [
      { text: "5 courses live simultaneously", included: true },
      { text: "Earn 55% per student enrolled", included: true },
      { text: "LIFEWS promotes to Silver+ schools", included: true },
      { text: "Course creation tools + templates", included: true },
      { text: "Weekly payouts", included: true },
      { text: "20% discount on extra courses", included: true },
      { text: "Bilingual tools", included: false },
      { text: "Live class feature", included: false },
    ],
  },
  {
    name: "Senior Educator",
    emoji: "🎓",
    color: "#854F0B",
    monthly: 12000, quarterly: 32000, annual: 115000,
    tag: "⭐ Most Popular",
    popular: true,
    desc: "For professional teachers earning seriously from their expertise",
    features: [
      { text: "20 courses live simultaneously", included: true },
      { text: "Earn 65% per student enrolled", included: true },
      { text: "Featured in school recommendations", included: true },
      { text: "Live class + webinar feature", included: true },
      { text: "Bilingual course tools (EN + FR)", included: true },
      { text: "Issue LIFEWS-branded certificates", included: true },
      { text: "Weekly payouts", included: true },
      { text: "Full analytics dashboard", included: true },
    ],
  },
  {
    name: "Master Educator",
    emoji: "🏆",
    color: "#534AB7",
    monthly: 25000, quarterly: 67000, annual: 240000,
    tag: "For top educators",
    desc: "Africa's top educators — unlimited courses, maximum earnings",
    features: [
      { text: "Unlimited courses published", included: true },
      { text: "Earn 75% per student enrolled", included: true },
      { text: "Homepage + school dashboard featured", included: true },
      { text: "Full bilingual tools (EN + FR + local)", included: true },
      { text: "Create full certification programs", included: true },
      { text: "Daily payouts available", included: true },
      { text: "Monthly live LIFEWS webinars as speaker", included: true },
      { text: "Co-brand courses with LIFEWS", included: true },
    ],
  },
];

const ARTISAN_PLANS = [
  {
    name: "Basic",
    emoji: "🔧",
    color: "#2D6A2D",
    monthly: 0, quarterly: 0, annual: 0,
    tag: "Get started",
    desc: "Create your profile and start exploring available gigs",
    features: [
      { text: "Artisan profile + 3 skills", included: true },
      { text: "Browse gigs (view only)", included: true },
      { text: "Apply for 1 gig/month", included: true },
      { text: "Basic directory listing", included: true },
      { text: "15% commission per gig", included: true },
      { text: "Gig notifications", included: false },
      { text: "Portfolio upload", included: false },
      { text: "Verification badge", included: false },
    ],
  },
  {
    name: "Tradesman",
    emoji: "🔨",
    color: "#185FA5",
    monthly: 5000, quarterly: 13500, annual: 48000,
    tag: "Active artisans",
    desc: "For artisans starting their LIFEWS journey",
    features: [
      { text: "Unlimited skills listed", included: true },
      { text: "All gigs in your state", included: true },
      { text: "8 gig applications/month", included: true },
      { text: "10 portfolio photos", included: true },
      { text: "WhatsApp + SMS gig alerts", included: true },
      { text: "Skill verification badge", included: true },
      { text: "10 LifewsAcademy courses", included: true },
      { text: "12% commission per gig", included: true },
    ],
  },
  {
    name: "Craftsman",
    emoji: "⚒️",
    color: "#854F0B",
    monthly: 12000, quarterly: 32000, annual: 115000,
    tag: "⭐ Most Popular",
    popular: true,
    desc: "For active artisans building steady income across Nigeria",
    features: [
      { text: "National gig access (all states)", included: true },
      { text: "Unlimited gig applications", included: true },
      { text: "30 photos + 3 videos portfolio", included: true },
      { text: "Priority listing in directory", included: true },
      { text: "Featured on school search results", included: true },
      { text: "40 LifewsAcademy courses", included: true },
      { text: "Build team of 3 sub-artisans", included: true },
      { text: "10% commission per gig", included: true },
    ],
  },
  {
    name: "Master Artisan",
    emoji: "🏗️",
    color: "#534AB7",
    monthly: 25000, quarterly: 67000, annual: 240000,
    tag: "For contractors",
    desc: "For professional contractors and teams handling large projects",
    features: [
      { text: "48hr head start on ALL new gigs", included: true },
      { text: "Unlimited portfolio", included: true },
      { text: "Homepage featured profile", included: true },
      { text: "Full access to 190+ courses", included: true },
      { text: "Master Artisan Certificate (printed)", included: true },
      { text: "Team of up to 15 sub-artisans", included: true },
      { text: "Bid on NGO + government contracts", included: true },
      { text: "8% commission per gig (best rate)", included: true },
    ],
  },
];

function formatPrice(amount: number) {
  if (amount === 0) return "Free";
  return `₦${amount.toLocaleString()}`;
}

function PlanCard({ plan, billing, userType }: { plan: any; billing: Billing; userType: UserType }) {
  const price = billing === "monthly" ? plan.monthly : billing === "quarterly" ? plan.quarterly : plan.annual;
  const period = billing === "monthly" ? "/mo" : billing === "quarterly" ? "/qtr" : "/yr";
  const savings = billing === "annual" ? "Save 20%" : billing === "quarterly" ? "Save 10%" : null;

  return (
    <div style={{
      background: plan.popular ? "#fff" : "#fff",
      border: plan.popular ? `2px solid ${plan.color}` : "1px solid #e8e0cc",
      borderRadius: 20,
      padding: 28,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      transform: plan.popular ? "scale(1.02)" : "scale(1)",
      boxShadow: plan.popular ? `0 8px 40px ${plan.color}22` : "0 2px 12px rgba(0,0,0,0.06)",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}>
      {plan.popular && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: plan.color, color: "#fff", fontSize: 11, fontWeight: 600,
          padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap",
          letterSpacing: 0.5,
        }}>
          ⭐ MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>{plan.emoji}</span>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#163816" }}>{plan.name}</div>
            <div style={{ fontSize: 11, color: plan.color, fontWeight: 500, background: `${plan.color}15`, padding: "2px 8px", borderRadius: 10, display: "inline-block" }}>{plan.tag}</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginTop: 8 }}>{plan.desc}</p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #f0ece0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: price === 0 ? 36 : 32, color: "#163816" }}>
            {formatPrice(price)}
          </span>
          {price > 0 && <span style={{ fontSize: 13, color: "#888" }}>{period}</span>}
        </div>
        {savings && price > 0 && (
          <div style={{ fontSize: 11, color: "#2D6A2D", fontWeight: 500, marginTop: 4 }}>🎉 {savings}</div>
        )}
      </div>

      {/* Features */}
      <div style={{ flex: 1, marginBottom: 24 }}>
        {plan.features.map((f: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 14, color: f.included ? plan.color : "#ccc", flexShrink: 0, marginTop: 1 }}>
              {f.included ? "✓" : "✗"}
            </span>
            <span style={{ fontSize: 13, color: f.included ? "#444" : "#bbb", lineHeight: 1.4 }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link href="/auth" style={{
        display: "block", textAlign: "center", padding: "13px 24px",
        background: plan.popular ? plan.color : "transparent",
        color: plan.popular ? "#fff" : plan.color,
        border: `1.5px solid ${plan.color}`,
        borderRadius: 10, fontSize: 14, fontWeight: 500,
        textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.2s",
      }}>
        {price === 0 ? "Get started free →" : `Start ${plan.name} →`}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [userType, setUserType] = useState<UserType>("school");

  const plans = userType === "school" ? SCHOOL_PLANS : userType === "teacher" ? TEACHER_PLANS : ARTISAN_PLANS;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F5E8; }
        .pricing-page { background: #F5F5E8; min-height: 100vh; font-family: 'DM Sans', sans-serif; }
        .plans-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .compare-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; }
        @media (max-width: 1100px) { .plans-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { 
          .plans-grid { grid-template-columns: 1fr; }
          .faq-grid { grid-template-columns: 1fr; }
          .compare-grid { grid-template-columns: 1fr; }
        }
        .plan-card-hover:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
        .type-btn { padding: 10px 24px; border: 1.5px solid #d4cbb8; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #555; cursor: pointer; transition: all 0.2s; }
        .type-btn.active { background: #2D6A2D; color: #fff; border-color: #2D6A2D; font-weight: 500; }
        .billing-btn { padding: 8px 20px; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.2s; }
        .billing-btn.active { background: #2D6A2D; color: #fff; font-weight: 500; }
        .billing-btn.inactive { background: transparent; color: #666; }
      `}</style>

      <div className="pricing-page">

        {/* Nav */}
        <nav style={{ background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, background: "#2D6A2D", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌱</div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#163816" }}>LIFEWS Connect</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/auth" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>Sign in</Link>
            <Link href="/auth" style={{ background: "#2D6A2D", color: "#fff", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>Get started free</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "64px 24px 48px", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 500, color: "#2D6A2D", marginBottom: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>
            🌍 Africa&apos;s First Education & Green Skills Gig Platform
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "#163816", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, fontWeight: 300 }}>
            Whether you&apos;re a school, teacher, or artisan — LIFEWS has a plan that grows with you. Start free, upgrade when ready.
          </p>
        </div>

        {/* User Type Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 32, flexWrap: "wrap", padding: "0 24px" }}>
          {[
            { id: "school" as UserType, label: "🏫 Schools", desc: "Subscribe for your school" },
            { id: "teacher" as UserType, label: "📚 Teachers", desc: "Teach & earn on LifewsAcademy" },
            { id: "artisan" as UserType, label: "🔨 Artisans", desc: "Take garden gigs & earn" },
          ].map(t => (
            <button key={t.id} className={`type-btn ${userType === t.id ? "active" : ""}`} onClick={() => setUserType(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Billing Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <div style={{ background: "#e8e0cc", borderRadius: 12, padding: 4, display: "flex", gap: 4, position: "relative" }}>
            {[
              { id: "monthly" as Billing, label: "Monthly" },
              { id: "quarterly" as Billing, label: "Quarterly", badge: "Save 10%" },
              { id: "annual" as Billing, label: "Annual", badge: "Save 20%" },
            ].map(b => (
              <button key={b.id} className={`billing-btn ${billing === b.id ? "active" : "inactive"}`} onClick={() => setBilling(b.id)}>
                {b.label}
                {b.badge && billing !== b.id && (
                  <span style={{ marginLeft: 6, fontSize: 10, background: "#2D6A2D", color: "#fff", padding: "1px 6px", borderRadius: 8 }}>{b.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 64px" }}>
          <div className="plans-grid">
            {plans.map((plan: any) => (
              <PlanCard key={plan.name} plan={plan} billing={billing} userType={userType} />
            ))}
          </div>

          {/* A la carte */}
          <div style={{ background: "#fff", border: "1px solid #e8e0cc", borderRadius: 20, padding: 40, marginTop: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 8 }}>
                🛒 À La Carte — Pay Per Item
              </div>
              <p style={{ fontSize: 14, color: "#666", fontWeight: 300 }}>
                Not ready to subscribe? Buy exactly what you need, when you need it.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { item: "PDF Book", price: "₦500", icon: "📄" },
                { item: "Audio Book", price: "₦500", icon: "🎧" },
                { item: "Video Book", price: "₦500", icon: "🎬" },
                { item: "Full Book Bundle", price: "₦1,200", icon: "📚" },
                { item: "Individual Course", price: "₦7,500", icon: "🎓" },
                { item: "Digital Certificate", price: "₦1,500", icon: "📜" },
                { item: "Printed Certificate", price: "₦2,500", icon: "🏅" },
                { item: "Extra Teacher Seat", price: "₦5,000/mo", icon: "👩‍🏫" },
              ].map(i => (
                <div key={i.item} style={{ background: "#f9f7f0", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{i.icon}</span>
                    <span style={{ fontSize: 13, color: "#444" }}>{i.item}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2D6A2D" }}>{i.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#163816", textAlign: "center", marginBottom: 8 }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: 14, color: "#666", textAlign: "center", marginBottom: 40, fontWeight: 300 }}>
              Everything you need to know about LIFEWS pricing
            </p>
            <div className="faq-grid">
              {[
                { q: "Can I change my plan anytime?", a: "Yes! Upgrade or downgrade anytime. Changes take effect immediately and we prorate any payments." },
                { q: "How do teacher payouts work?", a: "Teachers are paid weekly every Friday via Paystack. A daily cashout option is also available for a small processing fee." },
                { q: "What is the 72-hour approval?", a: "Teacher and artisan applications are reviewed by the LIFEWS team within 72 hours. You'll get an email with the decision." },
                { q: "Do artisans pay commission?", a: "Yes — commission ranges from 8% (Master Artisan) to 15% (Basic). Higher subscriptions mean lower commission rates." },
                { q: "Is there a free trial?", a: "Every plan starts with a free Starter tier — no credit card needed. Upgrade when you're ready to unlock more features." },
                { q: "What payment methods are accepted?", a: "We accept all Nigerian bank cards, bank transfers, and mobile money via Paystack. Francophone Africa via Flutterwave coming soon." },
                { q: "Can I access all three platforms with one subscription?", a: "Yes! One LIFEWS subscription unlocks access to LIFEWS Connect, LifewsBooks, and LifewsAcademy based on your plan level." },
                { q: "Are French books and courses included?", a: "Yes — French content is included from the Silver plan onwards. Francophone schools get full bilingual access on Gold and above." },
              ].map((faq, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 24 }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#163816", marginBottom: 10 }}>{faq.q}</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div style={{ background: "linear-gradient(135deg, #1e4d1e 0%, #2D6A2D 100%)", borderRadius: 24, padding: "56px 48px", textAlign: "center", marginTop: 64 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#fff", marginBottom: 14, letterSpacing: -0.5 }}>
              Ready to grow with LIFEWS?
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 32, fontWeight: 300, maxWidth: 480, margin: "0 auto 32px" }}>
              Join schools, teachers and artisans across Nigeria building Africa&apos;s green education ecosystem — one garden at a time.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth" style={{ background: "#fff", color: "#2D6A2D", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                Get started free →
              </Link>
              <Link href="/auth" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                Talk to us
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer style={{ background: "#fff", borderTop: "1px solid #e8e0cc", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: "#2D6A2D" }}>LIFEWS Connect™</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>© 2026 LIFEWS Green System Ltd · Nigeria · All rights reserved</div>
        </footer>

      </div>
    </>
  );
}
