import { AppShell } from "@/components/layout/app-shell";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const GREETINGS = ["Good morning", "Good afternoon", "Good evening"];
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return GREETINGS[0];
  if (h < 18) return GREETINGS[1];
  return GREETINGS[2];
}

const PILLAR_FOR_ROLE: Record<string, string> = {
  teacher:           "AgriShine™",
  school:            "AgriShine™",
  parent:            "AgriAble™",
  family:            "AgriAble™",
  student:           "AgriShine™",
  youth:             "AgriNext™",
  community_partner: "AgriRoots™",
  ngo_organization:  "AgriRoots™",
  researcher:        "AgriNext™",
  volunteer:         "AgriRoots™",
  general:           "LIFEWS Connect",
  admin:             "All pillars",
};

const PLATFORMS = [
  { name: "LIFEWSBooks",    emoji: "📚", desc: "Books, workbooks & teaching materials", href: "https://lifewsbooks.com",    color: "#2D6A2D" },
  { name: "LIFEWSAcademy",  emoji: "🎓", desc: "Courses, training & certifications",    href: "https://lifewsacademy.com",  color: "#185FA5" },
  { name: "GrowHubSystems", emoji: "🌿", desc: "Garden kits, raised beds & irrigation",  href: "https://growhubsystems.com", color: "#854F0B" },
  { name: "LIFEWSWorks",    emoji: "💼", desc: "Jobs, gigs & career pathways",           href: "https://lifewsworks.com",    color: "#534AB7" },
];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  let userName: string | undefined;
  let userRole = role;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile) {
        userName  = profile.full_name ?? undefined;
        userRole  = profile.role ?? role;
      }
    }
  } catch {
    // Falls back to searchParams values
  }

  const pillar    = userRole ? (PILLAR_FOR_ROLE[userRole] ?? "LIFEWS Connect") : "LIFEWS Connect";
  const firstName = userName?.split(" ")[0];
  const greeting  = `${getGreeting()}${firstName ? `, ${firstName}` : ""}`;
  const roleLabel = userRole
    ? userRole.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Member";

  // Pillar-specific welcome message
  const pillarMsg: Record<string, string> = {
    "AgriShine™":    "Your school programs, garden tracker, and lessons are all here.",
    "AgriAble™":     "Your home garden resources, family programs, and learning tools are here.",
    "AgriNext™":     "Your innovation tools, green skills programs, and opportunities are here.",
    "AgriRoots™":    "Your community programs, local partnerships, and resources are here.",
    "All pillars":   "Welcome to the LIFEWS Connect admin panel.",
    "LIFEWS Connect":"Welcome to LIFEWSConnect — explore programs, platforms, and opportunities.",
  };

  return (
    <AppShell
      title="My LIFEWS Dashboard"
      role={userRole}
      userName={userName}
    >
      {/* Home + breadcrumb bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" as const }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 8, fontSize: 13, color: "#2D6A2D", textDecoration: "none", fontWeight: 500 }}>
          🏠 Home
        </Link>
        <Link href="/platforms" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#fff", border: "1px solid #e0d8c8", borderRadius: 8, fontSize: 13, color: "#555", textDecoration: "none" }}>
          🌐 Explore Platforms
        </Link>
        <span style={{ fontSize: 12, color: "#aaa" }}>/ {roleLabel} Dashboard</span>
      </div>

      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, #2D6A2D, #1a4a1a)",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap" as const,
        gap: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
            {pillar}
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff", marginBottom: 6, marginTop: 0 }}>
            {greeting} 🌱
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.55 }}>
            {pillarMsg[pillar] ?? pillarMsg["LIFEWS Connect"]}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          <Link href="/settings" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "9px 16px", fontSize: 12, color: "#fff", textDecoration: "none", fontWeight: 500 }}>
            ⚙️ Settings
          </Link>
          <Link href="/" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "9px 16px", fontSize: 12, color: "#fff", textDecoration: "none", fontWeight: 500 }}>
            🏠 Back to Home
          </Link>
        </div>
      </div>

      {/* Overview cards */}
      <OverviewCards />

      {/* Connected Platforms section */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap" as const, gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, color: "#2D6A2D", marginBottom: 4 }}>LIFEWS Ecosystem</div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#163816", margin: 0 }}>Explore LIFEWS Platforms</h3>
          </div>
          <Link href="/platforms" style={{ fontSize: 13, color: "#2D6A2D", textDecoration: "none", fontWeight: 500 }}>View all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {PLATFORMS.map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: "18px 20px", textDecoration: "none", transition: "box-shadow 0.2s" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{p.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.color, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{p.desc}</div>
              <div style={{ fontSize: 12, color: p.color, marginTop: 10, fontWeight: 500 }}>Visit →</div>
            </a>
          ))}
        </div>
      </div>

    </AppShell>
  );
}

