"use client";

interface StatCard {
  icon: string;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
}

const STAT_CARDS: StatCard[] = [
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
  { done: true,  text: "Water the tomato beds",         badge: "Done",      badgeStyle: { background: "#f0f7ec", color: "#2D6A2D" } },
  { done: false, text: "Submit weekly harvest log",     badge: "Due today", badgeStyle: { background: "#faeeda", color: "#854F0B" } },
  { done: false, text: "Review AgriShine lesson 3",    badge: "Learning",  badgeStyle: { background: "#e6f1fb", color: "#185FA5" } },
  { done: false, text: "Invite parents to garden day", badge: "Pending",   badgeStyle: { background: "#f5f5e8", color: "#888" } },
];

const CROPS = [
  { name: "Tomatoes", pct: 78, color: "#2D6A2D" },
  { name: "Spinach",  pct: 45, color: "#854F0B" },
  { name: "Peppers",  pct: 62, color: "#185FA5" },
];

const QUICK_ACTIONS = [
  { icon: "ti-plus",      label: "Log harvest" },
  { icon: "ti-file-text", label: "New lesson" },
  { icon: "ti-camera",    label: "Upload photo" },
  { icon: "ti-send",      label: "Post update" },
];

const PILLARS = [
  { icon: "ti-sun",    bg: "#f0f7ec", color: "#2D6A2D", name: "AgriShine™",  desc: "School gardens & FEW systems",  href: "/pillars/agrishine" },
  { icon: "ti-heart",  bg: "#faeeda", color: "#854F0B", name: "AgriAble™",   desc: "Inclusion & adaptive learning", href: "/pillars/agriable" },
  { icon: "ti-rocket", bg: "#e6f1fb", color: "#185FA5", name: "AgriNext™",   desc: "STEM & youth green skills",     href: "/pillars/agrinext" },
  { icon: "ti-world",  bg: "#eeedfe", color: "#534AB7", name: "AgriRoots™",  desc: "Culture, language & heritage",  href: "/pillars/agriroots" },
];

export function OverviewCards() {
  return (
    <>
      <style>{`
        .oc-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .oc-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 12px; padding: 16px; }
        .oc-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .oc-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .oc-right-col { display: flex; flex-direction: column; gap: 16px; }
        .oc-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .oc-card-title { font-size: 13px; font-weight: 500; color: #163816; font-family: 'DM Sans', sans-serif; }
        .oc-card-action { font-size: 11px; color: #2D6A2D; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .oc-stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 10px; }
        .oc-stat-val { font-family: 'DM Serif Display', serif; font-size: 26px; color: #163816; margin-bottom: 2px; }
        .oc-stat-label { font-size: 12px; color: #888; font-family: 'DM Sans', sans-serif; }
        .oc-stat-trend { font-size: 11px; margin-top: 4px; font-family: 'DM Sans', sans-serif; }
        .oc-act-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f5f0e8; }
        .oc-act-item:last-child { border-bottom: none; }
        .oc-act-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .oc-act-text { font-size: 12px; color: #444; line-height: 1.45; font-family: 'DM Sans', sans-serif; }
        .oc-act-time { font-size: 10px; color: #bbb; margin-top: 2px; font-family: 'DM Sans', sans-serif; }
        .oc-task-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f0e8; }
        .oc-task-item:last-child { border-bottom: none; }
        .oc-task-check { width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid #ccc; flex-shrink: 0; }
        .oc-task-text { font-size: 12px; color: #444; flex: 1; font-family: 'DM Sans', sans-serif; }
        .oc-task-text.done { text-decoration: line-through; color: #bbb; }
        .oc-badge { font-size: 10px; padding: 2px 8px; border-radius: 5px; font-weight: 500; font-family: 'DM Sans', sans-serif; white-space: nowrap; }
        .oc-pillar-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f5f0e8; cursor: pointer; text-decoration: none; transition: background 0.15s; }
        .oc-pillar-item:last-child { border-bottom: none; }
        .oc-pillar-item:hover { background: #fafaf5; border-radius: 6px; padding-left: 4px; }
        .oc-pillar-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .oc-pillar-name { font-size: 13px; font-weight: 500; color: #222; font-family: 'DM Sans', sans-serif; }
        .oc-pillar-desc { font-size: 11px; color: #888; margin-top: 1px; font-family: 'DM Sans', sans-serif; }
        .oc-prog-item { margin-bottom: 12px; }
        .oc-prog-item:last-child { margin-bottom: 0; }
        .oc-prog-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .oc-prog-label { font-size: 12px; color: #444; font-family: 'DM Sans', sans-serif; }
        .oc-prog-val { font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif; }
        .oc-prog-bar { height: 6px; background: #f0ece0; border-radius: 3px; overflow: hidden; }
        .oc-prog-fill { height: 100%; border-radius: 3px; }
        .oc-qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .oc-qa-btn { background: #F5F5E8; border: 1px solid #e0d8c8; border-radius: 10px; padding: 12px 8px; text-align: center; cursor: pointer; transition: all 0.15s; }
        .oc-qa-btn:hover { background: #e8f0e0; border-color: #b8dba8; }
        .oc-qa-icon { font-size: 20px; color: #2D6A2D; margin-bottom: 4px; }
        .oc-qa-label { font-size: 11px; color: #444; font-weight: 500; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 900px) {
          .oc-stats { grid-template-columns: repeat(2, 1fr); }
          .oc-two { grid-template-columns: 1fr; }
          .oc-bottom { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .oc-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Stat cards */}
      <div className="oc-stats">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="oc-card">
            <div className="oc-stat-icon" style={{ background: s.iconBg }}>
              <i className={`ti ${s.icon}`} style={{ color: s.iconColor }} aria-hidden="true" />
            </div>
            <div className="oc-stat-val">{s.value}</div>
            <div className="oc-stat-label">{s.label}</div>
            <div className="oc-stat-trend" style={{ color: s.trendUp ? "#2D6A2D" : "#aaa" }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Activity + Tasks */}
      <div className="oc-two">
        <div className="oc-card">
          <div className="oc-card-header">
            <span className="oc-card-title">Recent activity</span>
            <a href="/announcements" className="oc-card-action">View all →</a>
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="oc-act-item">
              <div className="oc-act-dot" style={{ background: a.color }} />
              <div>
                <div className="oc-act-text">{a.text}</div>
                <div className="oc-act-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="oc-card">
          <div className="oc-card-header">
            <span className="oc-card-title">Today's tasks</span>
            <span className="oc-card-action">Add task</span>
          </div>
          {TASKS.map((t, i) => (
            <div key={i} className="oc-task-item">
              <div
                className="oc-task-check"
                style={t.done ? { background: "#2D6A2D", borderColor: "#2D6A2D" } : {}}
              />
              <span className={`oc-task-text${t.done ? " done" : ""}`}>{t.text}</span>
              <span className="oc-badge" style={t.badgeStyle}>{t.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars + Garden progress + Quick actions */}
      <div className="oc-bottom">
        <div className="oc-card">
          <div className="oc-card-header">
            <span className="oc-card-title">Pillar modules</span>
          </div>
          {PILLARS.map((p) => (
            <a key={p.name} href={p.href} className="oc-pillar-item">
              <div className="oc-pillar-icon" style={{ background: p.bg }}>
                <i className={`ti ${p.icon}`} style={{ color: p.color }} aria-hidden="true" />
              </div>
              <div>
                <div className="oc-pillar-name">{p.name}</div>
                <div className="oc-pillar-desc">{p.desc}</div>
              </div>
              <i className="ti ti-chevron-right" style={{ marginLeft: "auto", color: "#ccc", fontSize: 14 }} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="oc-right-col">
          <div className="oc-card">
            <div className="oc-card-header">
              <span className="oc-card-title">Garden progress</span>
              <a href="/garden" className="oc-card-action">View garden →</a>
            </div>
            {CROPS.map((c) => (
              <div key={c.name} className="oc-prog-item">
                <div className="oc-prog-header">
                  <span className="oc-prog-label">{c.name}</span>
                  <span className="oc-prog-val" style={{ color: c.color }}>{c.pct}%</span>
                </div>
                <div className="oc-prog-bar">
                  <div className="oc-prog-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="oc-card">
            <div className="oc-card-header">
              <span className="oc-card-title">Quick actions</span>
            </div>
            <div className="oc-qa-grid">
              {QUICK_ACTIONS.map((q) => (
                <div key={q.label} className="oc-qa-btn">
                  <div className="oc-qa-icon"><i className={`ti ${q.icon}`} aria-hidden="true" /></div>
                  <div className="oc-qa-label">{q.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
