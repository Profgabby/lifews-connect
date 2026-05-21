"use client";

const STAT_CARDS = [
  { icon: "ti-book-open",   iconBg: "#f0f7ec", iconColor: "#2D6A2D", value: "8",  label: "Lessons this month",   trend: "↑ 2 from last month", trendUp: true },
  { icon: "ti-plant",       iconBg: "#faeeda", iconColor: "#854F0B", value: "24", label: "Crops tracked",         trend: "↑ 6 new this week",   trendUp: true },
  { icon: "ti-users",       iconBg: "#e6f1fb", iconColor: "#185FA5", value: "12", label: "Student participants",  trend: "Same as last week",   trendUp: false },
  { icon: "ti-certificate", iconBg: "#eeedfe", iconColor: "#534AB7", value: "4",  label: "Badges earned",         trend: "↑ 1 this week",       trendUp: true },
];

const ACTIVITY = [
  { color: "#2D6A2D", text: "Amara uploaded garden harvest photos",       time: "10 min ago" },
  { color: "#854F0B", text: "New lesson: Agrivoltaics Basics is live",    time: "2 hrs ago" },
  { color: "#185FA5", text: "Kofi completed the Water Systems quiz",      time: "Yesterday" },
  { color: "#534AB7", text: "Your school earned the Green Garden badge",  time: "2 days ago" },
];

const TASKS = [
  { done: true,  text: "Water the tomato beds",         badge: "Done",      badgeBg: "#f0f7ec", badgeColor: "#2D6A2D" },
  { done: false, text: "Submit weekly harvest log",     badge: "Due today", badgeBg: "#faeeda", badgeColor: "#854F0B" },
  { done: false, text: "Review AgriShine lesson 3",    badge: "Learning",  badgeBg: "#e6f1fb", badgeColor: "#185FA5" },
  { done: false, text: "Invite parents to garden day", badge: "Pending",   badgeBg: "#f5f5f8", badgeColor: "#888" },
];

const CROPS = [
  { name: "Tomatoes", pct: 78, color: "#2D6A2D" },
  { name: "Spinach",  pct: 45, color: "#854F0B" },
  { name: "Peppers",  pct: 62, color: "#185FA5" },
];

const QUICK_ACTIONS = [
  { icon: "ti-plus",      label: "Log harvest",  href: "/garden" },
  { icon: "ti-file-text", label: "New lesson",   href: "/teacherpreneurship" },
  { icon: "ti-camera",    label: "Upload photo", href: "/garden" },
  { icon: "ti-send",      label: "Post update",  href: "/announcements" },
];

const PILLARS = [
  { icon: "ti-sun",    bg: "#f0f7ec", color: "#2D6A2D", name: "AgriShine™",  desc: "School gardens & FEW systems",  href: "/library?track=garden-soil" },
  { icon: "ti-heart",  bg: "#faeeda", color: "#854F0B", name: "AgriAble™",   desc: "Inclusion & adaptive learning", href: "/home-garden" },
  { icon: "ti-rocket", bg: "#e6f1fb", color: "#185FA5", name: "AgriNext™",   desc: "STEM & youth green skills",     href: "/library?track=stem-agric" },
  { icon: "ti-world",  bg: "#eeedfe", color: "#534AB7", name: "AgriRoots™",  desc: "Culture, language & heritage",  href: "/library?track=food-heritage" },
];

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e8e0cc",
  borderRadius: 12,
  padding: 18,
};

export function OverviewCards() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {STAT_CARDS.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10 }}>
              <i className={`ti ${s.icon}`} style={{ color: s.iconColor }} aria-hidden="true" />
            </div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#163816", marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
            <div style={{ fontSize: 11, marginTop: 4, color: s.trendUp ? "#2D6A2D" : "#aaa" }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* ── Activity + Tasks ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Activity */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>Recent activity</span>
            <a href="/announcements" style={{ fontSize: 11, color: "#2D6A2D", textDecoration: "none" }}>View all →</a>
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid #f5f0e8" : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 4, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: "#444", lineHeight: 1.45 }}>{a.text}</div>
                <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>Today's tasks</span>
            <span style={{ fontSize: 11, color: "#2D6A2D", cursor: "pointer" }}>Add task</span>
          </div>
          {TASKS.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < TASKS.length - 1 ? "1px solid #f5f0e8" : "none" }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, border: t.done ? "none" : "1.5px solid #ccc", background: t.done ? "#2D6A2D" : "transparent", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: t.done ? "#bbb" : "#444", flex: 1, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 5, fontWeight: 500, background: t.badgeBg, color: t.badgeColor, whiteSpace: "nowrap" as const }}>{t.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pillars + Garden progress + Quick actions ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Pillars */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>Pillar modules</span>
          </div>
          {PILLARS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f5f0e8", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fafaf5"; (e.currentTarget as HTMLElement).style.borderRadius = "6px"; (e.currentTarget as HTMLElement).style.paddingLeft = "4px"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                <i className={`ti ${p.icon}`} style={{ color: p.color }} aria-hidden="true" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{p.desc}</div>
              </div>
              <i className="ti ti-chevron-right" style={{ marginLeft: "auto", color: "#ccc", fontSize: 14 }} aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Garden progress */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>Garden progress</span>
              <a href="/garden" style={{ fontSize: 11, color: "#2D6A2D", textDecoration: "none" }}>View garden →</a>
            </div>
            {CROPS.map((c) => (
              <div key={c.name} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: "#444" }}>{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: c.color }}>{c.pct}%</span>
                </div>
                <div style={{ height: 6, background: "#f0ece0", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={card}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>Quick actions</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {QUICK_ACTIONS.map((q) => (
                <a
                  key={q.label}
                  href={q.href}
                  style={{ background: "#F5F5E8", border: "1px solid #e0d8c8", borderRadius: 10, padding: 12, textAlign: "center" as const, cursor: "pointer", textDecoration: "none", display: "block" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e8f0e0"; (e.currentTarget as HTMLElement).style.borderColor = "#b8dba8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F5F5E8"; (e.currentTarget as HTMLElement).style.borderColor = "#e0d8c8"; }}
                >
                  <div style={{ fontSize: 20, color: "#2D6A2D", marginBottom: 4 }}>
                    <i className={`ti ${q.icon}`} aria-hidden="true" />
                  </div>
                  <div style={{ fontSize: 11, color: "#444", fontWeight: 500 }}>{q.label}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
