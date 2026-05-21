import { AppShell } from "@/components/layout/app-shell";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { createClient } from "@/lib/supabase/server";

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
  student:           "AgriShine™",
  youth:             "AgriNext™",
  artisan:           "AgriRoots™",
  community_partner: "AgriRoots™",
  ngo_organization:  "AgriRoots™",
  researcher:        "AgriNext™",
  admin:             "All pillars",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  // Try to get real user data from Supabase
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
        userName = profile.full_name ?? undefined;
        userRole = profile.role ?? role;
      }
    }
  } catch {
    // Falls back to searchParams values
  }

  const pillar = userRole ? (PILLAR_FOR_ROLE[userRole] ?? "LIFEWS Connect") : "LIFEWS Connect";
  const firstName = userName?.split(" ")[0];
  const greeting = `${getGreeting()}${firstName ? `, ${firstName}` : ""}`;

  const roleLabel = userRole
    ? userRole.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Member";

  return (
    <AppShell
      title={`${roleLabel} Dashboard`}
      role={userRole}
      userName={userName}
    >
      {/* Welcome banner */}
      <div style={{
        background: "#2D6A2D",
        borderRadius: 14,
        padding: "22px 28px",
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff", marginBottom: 6, marginTop: 0 }}>
            {greeting} 🌱
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.55 }}>
            Welcome to <strong style={{ color: "#fff", fontWeight: 500 }}>{pillar}</strong> — your school garden, lessons, and community are all here.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#fff" }}>12</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px" }}>Active students</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#fff" }}>3</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px" }}>Garden beds</div>
          </div>
        </div>
      </div>

      {/* Overview cards — stats, activity, tasks, pillars, garden */}
      <OverviewCards />
    </AppShell>
  );
}
