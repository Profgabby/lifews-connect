"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_MAIN = [
  { icon: "ti-layout-dashboard", label: "Dashboard",        href: "/dashboard" },
  { icon: "ti-book-2",           label: "Lesson Library",   href: "/library" },
  { icon: "ti-plant-2",          label: "Garden Tracker",   href: "/garden" },
  { icon: "ti-home",             label: "Home Garden",      href: "/home-garden" },
  { icon: "ti-users",            label: "My Students",      href: "/students" },
  { icon: "ti-hammer",           label: "Gigs",             href: "/gigs" },
];

const NAV_TEACHER = [
  { icon: "ti-star",           label: "Teacherpreneurship", href: "/teacherpreneurship" },
  { icon: "ti-school",         label: "My School",          href: "/schools/register" },
  { icon: "ti-certificate",    label: "Certificates",       href: "/certificates" },
  { icon: "ti-calendar-event", label: "Events",             href: "/events" },
  { icon: "ti-speakerphone",   label: "Announcements",      href: "/announcements" },
  { icon: "ti-message",        label: "Messages",           href: "/messages" },
];

const NAV_ACCOUNT = [
  { icon: "ti-user", label: "Profile & Settings", href: "/settings" },
];

const PILLARS = [
  { label: "AgriShine™", href: "/library?track=garden-soil" },
  { label: "AgriAble™",  href: "/home-garden" },
  { label: "AgriNext™",  href: "/library?track=stem-agric" },
  { label: "AgriRoots™", href: "/library?track=food-heritage" },
];

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

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  role?: string;
  userName?: string;
}

export function AppShell({ children, title, role, userName }: AppShellProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = userName
    ? userName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "LC";

  const roleLabel = role
    ? role.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Member";

  const pillar = role ? (PILLAR_FOR_ROLE[role] ?? "LIFEWS Connect") : "LIFEWS Connect";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  }

  function NavItem({ icon, label, href }: { icon: string; label: string; href: string }) {
    const active = typeof window !== "undefined" && window.location.pathname === href;
    return (
      <a
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 18px",
          fontSize: 13,
          color: active ? "#fff" : "rgba(255,255,255,0.72)",
          background: active ? "rgba(255,255,255,0.15)" : "transparent",
          fontWeight: active ? 500 : 400,
          textDecoration: "none",
          transition: "all 0.15s",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          borderLeft: active ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent",
        }}
        onMouseEnter={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        <i className={`ti ${icon}`} style={{ fontSize: 16, opacity: active ? 1 : 0.8 }} aria-hidden="true" />
        {label}
      </a>
    );
  }

  function NavSection({ label }: { label: string }) {
    return (
      <div style={{
        fontSize: 9,
        fontWeight: 500,
        textTransform: "uppercase" as const,
        letterSpacing: "0.8px",
        color: "rgba(255,255,255,0.35)",
        padding: "14px 18px 5px",
      }}>
        {label}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        background: "#2D6A2D",
        position: "sticky" as const,
        top: 0,
        height: "100vh",
        overflowY: "auto" as const,
        display: "flex",
        flexDirection: "column" as const,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.15)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-leaf" style={{ fontSize: 17, color: "#fff" }} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#fff", letterSpacing: -0.2 }}>LIFEWS Connect</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>MVP v0.1</div>
            </div>
          </a>
        </div>

        {/* User badge */}
        <a
          href="/settings"
          style={{
            margin: "12px 12px 4px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            padding: "9px 12px",
            display: "flex",
            alignItems: "center",
            gap: 9,
            textDecoration: "none",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.16)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
        >
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#4a9a4a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "#fff", flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {userName ?? "Welcome"}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{roleLabel} · {pillar}</div>
          </div>
          <i className="ti ti-chevron-right" style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.35)" }} aria-hidden="true" />
        </a>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: 8, overflowY: "auto" as const }}>
          <NavSection label="Main" />
          {NAV_MAIN.map((item) => <NavItem key={item.href} {...item} />)}

          <NavSection label="Teaching & School" />
          {NAV_TEACHER.map((item) => <NavItem key={item.href} {...item} />)}

          <NavSection label="Account" />
          {NAV_ACCOUNT.map((item) => <NavItem key={item.href} {...item} />)}
        </nav>

        {/* Pillar quick links */}
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.8px", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Pillars</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {PILLARS.map(p => (
              <a
                key={p.label}
                href={p.href}
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 6,
                  padding: "5px 8px",
                  textDecoration: "none",
                  textAlign: "center" as const,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div style={{ padding: 12 }}>
          <button
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 6,
              width: "100%",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
          >
            <i className="ti ti-logout" style={{ fontSize: 14 }} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{ display: "flex", flexDirection: "column" as const, minHeight: "100vh", background: "#F0EFE8" }}>
        {/* Topbar */}
        <header style={{
          background: "#fff",
          borderBottom: "1px solid #e8e0cc",
          padding: "0 28px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky" as const,
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #e0d8c8", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", fontSize: 16 }}
            >
              <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816" }}>{title ?? "Dashboard"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5E8", border: "1px solid #e0d8c8", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#aaa", width: 200 }}>
              <i className="ti ti-search" style={{ fontSize: 14 }} aria-hidden="true" />
              Search…
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #e0d8c8", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", fontSize: 16, position: "relative" as const }}>
              <i className="ti ti-bell" aria-hidden="true" />
              <div style={{ width: 7, height: 7, background: "#e05c2a", borderRadius: "50%", position: "absolute" as const, top: 6, right: 6 }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #e0d8c8", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", fontSize: 16 }}>
              <i className="ti ti-message" aria-hidden="true" />
            </div>
            <a
              href="/settings"
              style={{ width: 32, height: 32, borderRadius: "50%", background: "#2D6A2D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", textDecoration: "none" }}
            >
              {initials}
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: "24px 28px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
