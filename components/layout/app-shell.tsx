"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_MAIN = [
  { icon: "ti-layout-dashboard", label: "Dashboard",   href: "/dashboard" },
  { icon: "ti-book-2",           label: "Learn",       href: "/library" },
  { icon: "ti-plant-2",          label: "Gardens",     href: "/garden" },
  { icon: "ti-users",            label: "Community",   href: "/community" },
  { icon: "ti-shopping-bag",     label: "Marketplace", href: "/market" },
];

const NAV_SCHOOL = [
  { icon: "ti-school",           label: "My school",   href: "/schools" },
  { icon: "ti-certificate",      label: "Certificates",href: "/certificates" },
  { icon: "ti-calendar-event",   label: "Events",      href: "/events" },
  { icon: "ti-speakerphone",     label: "Announcements",href: "/announcements" },
  { icon: "ti-message",          label: "Messages",    href: "/messages" },
];

const NAV_ACCOUNT = [
  { icon: "ti-user",             label: "Profile",     href: "/profile" },
  { icon: "ti-settings",         label: "Settings",    href: "/settings" },
];

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

  const pillarForRole: Record<string, string> = {
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

  const pillar = role ? (pillarForRole[role] ?? "LIFEWS Connect") : "LIFEWS Connect";

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

  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.15)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ti ti-leaf" style={{ fontSize: 17, color: "#fff" }} aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#fff", letterSpacing: -0.2 }}>LIFEWS Connect</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>MVP v0.1</div>
          </div>
        </div>
      </div>

      {/* User badge */}
      <div style={{ margin: "12px 12px 4px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#4a9a4a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "#fff", flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {userName ?? "Welcome"}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{roleLabel} · {pillar}</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingTop: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.4)", padding: "10px 18px 5px" }}>Main</div>
        {NAV_MAIN.map((item) => <NavItem key={item.href} {...item} />)}

        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.4)", padding: "14px 18px 5px" }}>School & community</div>
        {NAV_SCHOOL.map((item) => <NavItem key={item.href} {...item} />)}

        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.4)", padding: "14px 18px 5px" }}>Account</div>
        {NAV_ACCOUNT.map((item) => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Sign out */}
      <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={handleSignOut}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", fontSize: 12, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer", borderRadius: 6, width: "100%", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
        >
          <i className="ti ti-logout" style={{ fontSize: 14 }} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');
        html, body { margin: 0; padding: 0; background: #F0EFE8; font-family: 'DM Sans', sans-serif; }
        .lc-shell { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
        .lc-sidebar { background: #2D6A2D; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .lc-main { display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; }
        .lc-topbar { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 28px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
        .lc-content { padding: 24px 28px; flex: 1; }
        .lc-topbar-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: #163816; }
        .lc-icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e0d8c8; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; font-size: 16px; position: relative; transition: all 0.15s; }
        .lc-icon-btn:hover { background: #f5f5e8; border-color: #c0d0b0; }
        .lc-notif-dot { width: 7px; height: 7px; background: #e05c2a; border-radius: 50%; position: absolute; top: 6px; right: 6px; }
        .lc-search { display: flex; align-items: center; gap: 8px; background: #F5F5E8; border: 1px solid #e0d8c8; border-radius: 8px; padding: 6px 12px; font-size: 13px; color: #aaa; width: 200px; font-family: 'DM Sans', sans-serif; }
        .lc-mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .lc-shell { grid-template-columns: 1fr; }
          .lc-sidebar { display: none; position: fixed; top: 0; left: 0; width: 260px; height: 100vh; z-index: 100; }
          .lc-sidebar.open { display: flex; flex-direction: column; }
          .lc-mobile-toggle { display: flex; }
          .lc-content { padding: 16px; }
        }
      `}</style>

      <div className="lc-shell">
        {/* Sidebar */}
        <aside className={`lc-sidebar${mobileOpen ? " open" : ""}`}>
          {sidebarContent}
        </aside>

        {/* Main */}
        <div className="lc-main">
          {/* Topbar */}
          <header className="lc-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="lc-icon-btn lc-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                <i className="ti ti-menu-2" aria-hidden="true" />
              </button>
              <span className="lc-topbar-title">{title ?? "Dashboard"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="lc-search">
                <i className="ti ti-search" style={{ fontSize: 14 }} aria-hidden="true" />
                Search…
              </div>
              <div className="lc-icon-btn">
                <i className="ti ti-bell" aria-hidden="true" />
                <div className="lc-notif-dot" />
              </div>
              <div className="lc-icon-btn">
                <i className="ti ti-message" aria-hidden="true" />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="lc-content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
{ icon: "ti-users", label: "My students", href: "/students" },