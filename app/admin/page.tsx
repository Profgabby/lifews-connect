"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Stats = {
  totalUsers: number;
  totalSchools: number;
  totalTeachers: number;
  totalArtisans: number;
  pendingApprovals: number;
  activeGigs: number;
  monthlyRevenue: number;
  totalSubscribers: number;
};

type User = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  status?: string;
};

type Tab = "dashboard" | "users" | "approvals" | "gigs" | "payments" | "content" | "communications";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0, totalSchools: 0, totalTeachers: 0, totalArtisans: 0,
    pendingApprovals: 0, activeGigs: 0, monthlyRevenue: 0, totalSubscribers: 0,
  });
  const [gigTitle, setGigTitle] = useState("");
  const [gigLocation, setGigLocation] = useState("");
  const [gigType, setGigType] = useState("");
  const [gigBudget, setGigBudget] = useState("");
  const [gigSkills, setGigSkills] = useState("");
  const [gigTimeline, setGigTimeline] = useState("");
  const [gigDesc, setGigDesc] = useState("");
  const [gigMsg, setGigMsg] = useState<string | null>(null);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSubject, setBroadcastSubject] = useState("");

  useEffect(() => { checkAdmin(); }, []);

  async function checkAdmin() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (profile?.role !== "admin") { router.push("/dashboard"); return; }
    setAuthorized(true);
    await loadData();
    setLoading(false);
  }

  async function loadData() {
    const supabase = createClient();
    const { data: allUsers } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    const users = allUsers || [];
    setUsers(users);
    const pending = users.filter((u: User) => u.status === "pending");
    setPendingUsers(pending);
    setStats({
      totalUsers: users.length,
      totalSchools: users.filter((u: User) => u.role === "school").length,
      totalTeachers: users.filter((u: User) => u.role === "teacher").length,
      totalArtisans: users.filter((u: User) => u.role === "artisan").length,
      pendingApprovals: pending.length,
      activeGigs: 0, monthlyRevenue: 0, totalSubscribers: 0,
    });
  }

  async function approveUser(userId: string) {
    const supabase = createClient();
    await supabase.from("profiles").update({ status: "approved" }).eq("id", userId);
    await loadData();
  }

  async function rejectUser(userId: string) {
    const supabase = createClient();
    await supabase.from("profiles").update({ status: "rejected" }).eq("id", userId);
    await loadData();
  }

  async function postGig() {
    const supabase = createClient();
    const { error } = await supabase.from("gigs").insert({
      title: gigTitle, location: gigLocation, garden_type: gigType,
      budget: gigBudget, skills_needed: gigSkills, timeline: gigTimeline,
      description: gigDesc, status: "open",
    });
    if (error) { setGigMsg("Error: " + error.message); return; }
    setGigMsg("Gig posted successfully!");
    setGigTitle(""); setGigLocation(""); setGigType(""); setGigBudget(""); setGigSkills(""); setGigTimeline(""); setGigDesc("");
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f1a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#fff" }}>Loading LIFEWS Admin...</div>
      </div>
    </div>
  );

  if (!authorized) return null;

  const NAV_ITEMS: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "All Users", icon: "👥", badge: stats.totalUsers },
    { id: "approvals", label: "Approvals", icon: "✅", badge: stats.pendingApprovals },
    { id: "gigs", label: "Garden Gigs", icon: "🔨", badge: stats.activeGigs },
    { id: "payments", label: "Payments", icon: "💰" },
    { id: "content", label: "Content", icon: "📚" },
    { id: "communications", label: "Communications", icon: "📣" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f1a0f; }
        .admin-wrap { display: flex; min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #0f1a0f; }
        .sidebar { width: 240px; background: #0f1a0f; border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; position: fixed; height: 100vh; z-index: 50; }
        .sidebar-logo { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .sidebar-mark { width: 32px; height: 32px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .sidebar-name { font-family: 'DM Serif Display', serif; font-size: 14px; color: #fff; }
        .sidebar-tag { font-size: 9px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; }
        .nav-items { padding: 16px 0; flex: 1; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; border-left: 3px solid transparent; }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .nav-item.active { background: rgba(45,106,45,0.2); border-left-color: #2D6A2D; }
        .nav-icon { font-size: 18px; flex-shrink: 0; }
        .nav-label { font-size: 13px; color: rgba(255,255,255,0.7); }
        .nav-item.active .nav-label { color: #fff; font-weight: 500; }
        .nav-badge { background: #2D6A2D; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-left: auto; }
        .sidebar-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 8px; }
        .admin-pill { background: rgba(45,106,45,0.3); border: 1px solid rgba(45,106,45,0.5); border-radius: 20px; padding: 6px 12px; font-size: 11px; color: #7dc97d; text-align: center; }
        .sidebar-link { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; font-size: 12px; color: rgba(255,255,255,0.5); text-decoration: none; transition: all 0.2s; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
        .sidebar-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .logout-btn { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; font-size: 12px; color: rgba(239,154,154,0.8); background: rgba(198,40,40,0.08); border: 1px solid rgba(198,40,40,0.15); cursor: pointer; width: 100%; font-family: 'DM Sans', sans-serif; }
        .logout-btn:hover { background: rgba(198,40,40,0.15); }
        .main { margin-left: 240px; flex: 1; min-height: 100vh; background: #111d11; }
        .topbar { background: #0f1a0f; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 32px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
        .page-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: #fff; }
        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .topbar-time { font-size: 12px; color: rgba(255,255,255,0.4); }
        .topbar-link { font-size: 12px; color: rgba(255,255,255,0.5); text-decoration: none; padding: 5px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); }
        .topbar-link:hover { color: #fff; }
        .admin-badge { background: #2D6A2D; color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 500; }
        .content { padding: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: #0f1a0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; }
        .stat-icon { font-size: 24px; margin-bottom: 12px; display: block; }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 32px; color: #fff; margin-bottom: 4px; }
        .stat-label { font-size: 12px; color: rgba(255,255,255,0.4); }
        .stat-card.green { border-color: rgba(45,106,45,0.4); background: rgba(45,106,45,0.1); }
        .stat-card.amber { border-color: rgba(255,160,0,0.3); background: rgba(255,160,0,0.05); }
        .stat-card.blue { border-color: rgba(24,95,165,0.3); background: rgba(24,95,165,0.05); }
        .table-wrap { background: #0f1a0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; margin-bottom: 24px; }
        .table-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; }
        .table-title { font-size: 14px; font-weight: 500; color: #fff; }
        .table-sub { font-size: 12px; color: rgba(255,255,255,0.4); }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 10px 20px; text-align: left; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.6px; color: rgba(255,255,255,0.3); border-bottom: 1px solid rgba(255,255,255,0.06); }
        td { padding: 14px 20px; font-size: 13px; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.04); }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        .role-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
        .role-school { background: rgba(45,106,45,0.2); color: #7dc97d; }
        .role-teacher { background: rgba(24,95,165,0.2); color: #7ab3e8; }
        .role-artisan { background: rgba(133,79,11,0.2); color: #f0a942; }
        .role-admin { background: rgba(83,74,183,0.2); color: #a89ef5; }
        .role-parent { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }
        .status-pending { background: rgba(255,160,0,0.15); color: #ffa500; padding: 3px 8px; border-radius: 6px; font-size: 11px; }
        .status-approved { background: rgba(45,106,45,0.2); color: #7dc97d; padding: 3px 8px; border-radius: 6px; font-size: 11px; }
        .status-rejected { background: rgba(198,40,40,0.2); color: #ef9a9a; padding: 3px 8px; border-radius: 6px; font-size: 11px; }
        .btn-green { background: #2D6A2D; color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; }
        .btn-red { background: rgba(198,40,40,0.2); color: #ef9a9a; border: 1px solid rgba(198,40,40,0.3); border-radius: 8px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; }
        .btn-ghost { background: transparent; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; }
        .form-card { background: #0f1a0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; margin-bottom: 24px; }
        .form-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; margin-bottom: 4px; }
        .form-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-lbl { display: block; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.65px; color: #7dc97d; margin-bottom: 6px; }
        .form-inp { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #fff; outline: none; }
        .form-inp::placeholder { color: rgba(255,255,255,0.2); }
        .form-textarea { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #fff; outline: none; resize: vertical; min-height: 80px; }
        .ok-msg { background: rgba(45,106,45,0.2); border: 1px solid rgba(45,106,45,0.4); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #7dc97d; margin-top: 12px; }
        .err-msg { background: rgba(198,40,40,0.2); border: 1px solid rgba(198,40,40,0.3); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #ef9a9a; margin-top: 12px; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: #fff; margin-bottom: 6px; }
        .section-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
        .empty { text-align: center; padding: 48px; color: rgba(255,255,255,0.3); }
        .empty-icon { font-size: 40px; margin-bottom: 12px; }
        .empty-text { font-size: 14px; }
        .quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
        .quick-card { background: #0f1a0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .quick-card:hover { border-color: #2D6A2D; background: rgba(45,106,45,0.1); }
        .quick-icon { font-size: 28px; margin-bottom: 8px; display: block; }
        .quick-label { font-size: 12px; color: rgba(255,255,255,0.6); }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .form-grid { grid-template-columns: 1fr; }
          .quick-grid { grid-template-columns: 1fr 1fr; }
          .sidebar { width: 64px; }
          .sidebar-name, .sidebar-tag, .nav-label, .nav-badge, .admin-pill, .sidebar-link span { display: none; }
          .main { margin-left: 64px; }
          .topbar-time, .topbar-link { display: none; }
        }
      `}</style>

      <div className="admin-wrap">
        <aside className="sidebar">
          <Link href="/" className="sidebar-logo">
            <div className="sidebar-mark">🌱</div>
            <div>
              <div className="sidebar-name">LIFEWS Admin</div>
              <div className="sidebar-tag">Control Panel</div>
            </div>
          </Link>
          <nav className="nav-items">
            {NAV_ITEMS.map(item => (
              <div key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="admin-pill">🔐 Admin Access</div>
            <Link href="/" className="sidebar-link">🏠 <span>Live Site</span></Link>
            <Link href="/pricing" className="sidebar-link">💎 <span>Pricing Page</span></Link>
            <Link href="/dashboard" className="sidebar-link">📋 <span>User Dashboard</span></Link>
            <button className="logout-btn" onClick={handleLogout}>🚪 <span>Sign out</span></button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="page-title">{NAV_ITEMS.find(n => n.id === activeTab)?.icon} {NAV_ITEMS.find(n => n.id === activeTab)?.label}</div>
            <div className="topbar-right">
              <span className="topbar-time">{new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              <Link href="/" className="topbar-link">🏠 Live Site</Link>
              <Link href="/pricing" className="topbar-link">💎 Pricing</Link>
              <span className="admin-badge">LIFEWS Admin</span>
            </div>
          </div>

          <div className="content">
            {activeTab === "dashboard" && (
              <div>
                <div className="section-title">Welcome back, Prof Gabby 👋</div>
                <div className="section-sub">Here&apos;s what&apos;s happening on LIFEWS today.</div>
                <div className="stats-grid">
                  <div className="stat-card green"><span className="stat-icon">👥</span><div className="stat-num">{stats.totalUsers}</div><div className="stat-label">Total Users</div></div>
                  <div className="stat-card"><span className="stat-icon">🏫</span><div className="stat-num">{stats.totalSchools}</div><div className="stat-label">Schools</div></div>
                  <div className="stat-card blue"><span className="stat-icon">📚</span><div className="stat-num">{stats.totalTeachers}</div><div className="stat-label">Teachers</div></div>
                  <div className="stat-card amber"><span className="stat-icon">🔨</span><div className="stat-num">{stats.totalArtisans}</div><div className="stat-label">Artisans</div></div>
                  <div className="stat-card amber"><span className="stat-icon">⏳</span><div className="stat-num">{stats.pendingApprovals}</div><div className="stat-label">Pending Approvals</div></div>
                  <div className="stat-card"><span className="stat-icon">🔨</span><div className="stat-num">{stats.activeGigs}</div><div className="stat-label">Active Gigs</div></div>
                  <div className="stat-card green"><span className="stat-icon">💰</span><div className="stat-num">₦{stats.monthlyRevenue.toLocaleString()}</div><div className="stat-label">Monthly Revenue</div></div>
                  <div className="stat-card"><span className="stat-icon">⭐</span><div className="stat-num">{stats.totalSubscribers}</div><div className="stat-label">Paid Subscribers</div></div>
                </div>
                <div style={{ marginBottom: 16, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.7px" }}>Quick Actions</div>
                <div className="quick-grid">
                  {[
                    { icon: "✅", label: "Review Approvals", tab: "approvals" as Tab },
                    { icon: "🔨", label: "Post Garden Gig", tab: "gigs" as Tab },
                    { icon: "💰", label: "Release Payments", tab: "payments" as Tab },
                    { icon: "👥", label: "View All Users", tab: "users" as Tab },
                    { icon: "📣", label: "Send Announcement", tab: "communications" as Tab },
                    { icon: "📚", label: "Manage Content", tab: "content" as Tab },
                  ].map(q => (
                    <div key={q.label} className="quick-card" onClick={() => setActiveTab(q.tab)}>
                      <span className="quick-icon">{q.icon}</span>
                      <div className="quick-label">{q.label}</div>
                    </div>
                  ))}
                </div>
                <div className="table-wrap">
                  <div className="table-header">
                    <div><div className="table-title">Recent Signups</div><div className="table-sub">Latest users to join LIFEWS</div></div>
                    <button className="btn-ghost" onClick={() => setActiveTab("users")}>View all</button>
                  </div>
                  <table>
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th></tr></thead>
                    <tbody>
                      {users.slice(0, 5).map(u => (
                        <tr key={u.id}>
                          <td>{u.full_name || "—"}</td>
                          <td>{u.email}</td>
                          <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                          <td>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td><span className={`status-${u.status || "approved"}`}>{u.status || "active"}</span></td>
                        </tr>
                      ))}
                      {users.length === 0 && <tr><td colSpan={5}><div className="empty"><div className="empty-icon">👥</div><div className="empty-text">No users yet</div></div></td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <div className="section-title">All Users</div>
                <div className="section-sub">{users.length} total users on LIFEWS Connect</div>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Full Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th></tr></thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td>{u.full_name || "—"}</td>
                          <td style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{u.email}</td>
                          <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                          <td style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td><span className={`status-${u.status || "approved"}`}>{u.status || "active"}</span></td>
                        </tr>
                      ))}
                      {users.length === 0 && <tr><td colSpan={5}><div className="empty"><div className="empty-icon">👥</div><div className="empty-text">No users yet</div></div></td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "approvals" && (
              <div>
                <div className="section-title">Pending Approvals</div>
                <div className="section-sub">Teachers and artisans awaiting review — 72hr SLA</div>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Applied</th><th>Actions</th></tr></thead>
                    <tbody>
                      {pendingUsers.map(u => (
                        <tr key={u.id}>
                          <td>{u.full_name || "—"}</td>
                          <td style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{u.email}</td>
                          <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                          <td style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="btn-green" onClick={() => approveUser(u.id)}>✓ Approve</button>
                              <button className="btn-red" onClick={() => rejectUser(u.id)}>✗ Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {pendingUsers.length === 0 && <tr><td colSpan={5}><div className="empty"><div className="empty-icon">✅</div><div className="empty-text">No pending approvals — you&apos;re all caught up!</div></div></td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "gigs" && (
              <div>
                <div className="section-title">Garden Gigs</div>
                <div className="section-sub">Post installation jobs for artisans to accept</div>
                <div className="form-card">
                  <div className="form-title">Post a New Garden Gig</div>
                  <div className="form-sub">This gig will be visible to all approved artisans on their dashboard</div>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-lbl">Gig Title</label><input className="form-inp" placeholder="e.g. Raised Bed Garden Installation" value={gigTitle} onChange={e => setGigTitle(e.target.value)} /></div>
                    <div className="form-group"><label className="form-lbl">Location</label><input className="form-inp" placeholder="e.g. Lekki, Lagos" value={gigLocation} onChange={e => setGigLocation(e.target.value)} /></div>
                    <div className="form-group"><label className="form-lbl">Garden Type</label><input className="form-inp" placeholder="e.g. Agrivoltaic, Raised Bed, FEW System" value={gigType} onChange={e => setGigType(e.target.value)} /></div>
                    <div className="form-group"><label className="form-lbl">Budget (₦)</label><input className="form-inp" placeholder="e.g. ₦150,000" value={gigBudget} onChange={e => setGigBudget(e.target.value)} /></div>
                    <div className="form-group"><label className="form-lbl">Skills Needed</label><input className="form-inp" placeholder="e.g. Carpentry, Plumbing, Electrical" value={gigSkills} onChange={e => setGigSkills(e.target.value)} /></div>
                    <div className="form-group"><label className="form-lbl">Timeline</label><input className="form-inp" placeholder="e.g. 3 days, 1 week" value={gigTimeline} onChange={e => setGigTimeline(e.target.value)} /></div>
                  </div>
                  <div className="form-group"><label className="form-lbl">Description</label><textarea className="form-textarea" placeholder="Describe the job in detail..." value={gigDesc} onChange={e => setGigDesc(e.target.value)} /></div>
                  <button className="btn-green" onClick={postGig} style={{ padding: "11px 24px", fontSize: 13 }}>🔨 Post Gig to Artisans</button>
                  {gigMsg && <div className={gigMsg.startsWith("Error") ? "err-msg" : "ok-msg"}>{gigMsg}</div>}
                </div>
                <div className="table-wrap">
                  <div className="table-header"><div><div className="table-title">Active Gigs</div><div className="table-sub">Currently open garden installation jobs</div></div></div>
                  <div className="empty"><div className="empty-icon">🔨</div><div className="empty-text">No active gigs yet — post your first one above!</div></div>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <div className="section-title">Payments & Payouts</div>
                <div className="section-sub">Manage weekly payouts and daily cashout requests</div>
                <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                  {[
                    { icon: "💰", label: "Total Revenue", value: "₦0", color: "green" },
                    { icon: "⏳", label: "Pending Payouts", value: "₦0", color: "amber" },
                    { icon: "✅", label: "Paid This Week", value: "₦0", color: "" },
                  ].map(s => (
                    <div key={s.label} className={`stat-card ${s.color}`}>
                      <span className="stat-icon">{s.icon}</span>
                      <div className="stat-num">{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="table-wrap">
                  <div className="table-header"><div className="table-title">Payout Queue</div></div>
                  <div className="empty"><div className="empty-icon">💰</div><div className="empty-text">No pending payouts — connect Paystack to enable payments</div></div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div>
                <div className="section-title">Content Management</div>
                <div className="section-sub">Manage courses, books, and game scores across LIFEWS platforms</div>
                <div className="quick-grid">
                  {[
                    { icon: "🎓", label: "LifewsAcademy Courses", count: "190 courses" },
                    { icon: "📚", label: "LifewsBooks Library", count: "100+ books" },
                    { icon: "🌿", label: "GrowHub Gardens", count: "Garden catalogue" },
                    { icon: "🎮", label: "Games & Competitions", count: "Coming soon" },
                    { icon: "🇫🇷", label: "French Content", count: "Books + courses" },
                    { icon: "🏆", label: "Leaderboards", count: "Coming soon" },
                  ].map(c => (
                    <div key={c.label} className="quick-card">
                      <span className="quick-icon">{c.icon}</span>
                      <div className="quick-label" style={{ fontWeight: 500, color: "#fff", marginBottom: 4 }}>{c.label}</div>
                      <div className="quick-label">{c.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "communications" && (
              <div>
                <div className="section-title">Communications</div>
                <div className="section-sub">Send announcements, emails and WhatsApp blasts to your users</div>
                <div className="form-card">
                  <div className="form-title">Send Announcement</div>
                  <div className="form-sub">This will be posted to all users&apos; dashboards</div>
                  <div className="form-group"><label className="form-lbl">Subject</label><input className="form-inp" placeholder="e.g. New feature launched!" value={broadcastSubject} onChange={e => setBroadcastSubject(e.target.value)} /></div>
                  <div className="form-group"><label className="form-lbl">Message</label><textarea className="form-textarea" style={{ minHeight: 120 }} placeholder="Write your announcement here..." value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} /></div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-green" style={{ padding: "11px 24px", fontSize: 13 }}>📣 Send to All Users</button>
                    <button className="btn-ghost" style={{ padding: "11px 24px", fontSize: 13 }}>🏫 Schools Only</button>
                    <button className="btn-ghost" style={{ padding: "11px 24px", fontSize: 13 }}>🔨 Artisans Only</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
