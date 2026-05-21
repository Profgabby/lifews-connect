"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Bed = {
  id: string;
  name: string;
  crop: string;
  planted_date: string;
  expected_harvest: string;
  status: string;
  notes: string;
};

type Log = {
  id: string;
  bed_id: string;
  crop: string;
  quantity: string;
  unit: string;
  harvest_date: string;
  notes: string;
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  growing:   { bg: "#f0f7ec", color: "#2D6A2D" },
  harvested: { bg: "#faeeda", color: "#854F0B" },
  planted:   { bg: "#e6f1fb", color: "#185FA5" },
  resting:   { bg: "#f5f5f5", color: "#888" },
};

const CROPS = ["Tomatoes", "Spinach", "Peppers", "Cassava", "Maize", "Yam", "Okra", "Cucumber", "Lettuce", "Carrots", "Beans", "Pumpkin", "Other"];
const UNITS = ["kg", "g", "bags", "baskets", "bunches", "pieces", "litres"];
const STATUSES = ["planted", "growing", "harvested", "resting"];

const G: Record<string, React.CSSProperties> = {
  page:       { minHeight: "100vh", background: "#F5F5E8", fontFamily: "'DM Sans', sans-serif" },
  topbar:     { background: "#fff", borderBottom: "1px solid #e8e0cc", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" },
  topTitle:   { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#163816" },
  topBtns:    { display: "flex", gap: 10 },
  content:    { maxWidth: 1100, margin: "0 auto", padding: "32px" },
  back:       { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2D6A2D", background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0, fontFamily: "'DM Sans', sans-serif" },
  tag:        { display: "inline-block", background: "#f0f7ec", border: "1px solid #b8dba8", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "#2D6A2D", textTransform: "uppercase" as const, letterSpacing: 0.6, marginBottom: 8 },
  h1:         { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816", marginBottom: 4, marginTop: 0 },
  sub:        { fontSize: 14, color: "#888", marginTop: 0, marginBottom: 0 },
  headerRow:  { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 },
  statsRow:   { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 },
  statCard:   { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 12, padding: "16px 20px" },
  statNum:    { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#163816" },
  statLbl:    { fontSize: 12, color: "#888", marginTop: 2 },
  tabs:       { display: "flex", gap: 4, background: "#e8e0cc", borderRadius: 10, padding: 3, marginBottom: 24, width: "fit-content" },
  tabOn:      { padding: "7px 18px", background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  tabOff:     { padding: "7px 18px", background: "none", color: "#666", border: "none", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" },
  bedsGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 },
  bedCard:    { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.15s" },
  bedName:    { fontSize: 15, fontWeight: 500, color: "#163816", marginBottom: 4 },
  bedCrop:    { fontSize: 13, color: "#666", marginBottom: 12 },
  bedMeta:    { fontSize: 11, color: "#aaa", marginTop: 8 },
  badge:      { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500 },
  logTable:   { background: "#fff", border: "1px solid #e8e0cc", borderRadius: 14, overflow: "hidden" },
  logHead:    { background: "#f9f7f0", borderBottom: "1px solid #e8e0cc", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "10px 20px", gap: 12 },
  logHCell:   { fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.6, color: "#888" },
  logRow:     { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "12px 20px", gap: 12, borderBottom: "1px solid #f5f0e8", alignItems: "center" },
  logCell:    { fontSize: 13, color: "#333" },
  btnPrimary: { background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  btnSecond:  { background: "#fff", color: "#2D6A2D", border: "1.5px solid #2D6A2D", borderRadius: 10, padding: "10px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  overlay:    { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 },
  modal:      { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" as const, padding: 32 },
  modalTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#163816", marginBottom: 4, marginTop: 0 },
  modalSub:   { fontSize: 13, color: "#888", marginBottom: 24, marginTop: 0 },
  lbl:        { display: "block", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.65, color: "#2D6A2D", marginBottom: 6 },
  inp:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  sel:        { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const },
  textarea:   { width: "100%", padding: "10px 14px", border: "1.5px solid #d4cbb8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: "#fff", color: "#333", outline: "none", marginBottom: 16, boxSizing: "border-box" as const, resize: "vertical" as const, minHeight: 70 },
  grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  modalBtns:  { display: "flex", gap: 10, marginTop: 8 },
  btnSave:    { flex: 1, padding: 12, background: "#2D6A2D", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnCancel:  { flex: 1, padding: 12, background: "transparent", color: "#666", border: "1.5px solid #e0d8c8", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer" },
  err:        { borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" },
  empty:      { textAlign: "center" as const, padding: "60px 20px" },
  emptyIcon:  { fontSize: 48, marginBottom: 16, display: "block" },
  emptyText:  { fontSize: 15, color: "#888", marginBottom: 20 },
};

export default function GardenPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"beds" | "logs">("beds");
  const [beds, setBeds] = useState<Bed[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBedModal, setShowBedModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bed form
  const [bedName, setBedName]               = useState("");
  const [bedCrop, setBedCrop]               = useState(CROPS[0]);
  const [plantedDate, setPlantedDate]       = useState("");
  const [expectedHarvest, setExpectedHarvest] = useState("");
  const [bedStatus, setBedStatus]           = useState("planted");
  const [bedNotes, setBedNotes]             = useState("");

  // Log form
  const [logBedId, setLogBedId]       = useState("");
  const [logCrop, setLogCrop]         = useState(CROPS[0]);
  const [logQty, setLogQty]           = useState("");
  const [logUnit, setLogUnit]         = useState(UNITS[0]);
  const [logDate, setLogDate]         = useState(new Date().toISOString().split("T")[0]);
  const [logNotes, setLogNotes]       = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const [{ data: bedsData }, { data: logsData }] = await Promise.all([
      supabase.from("garden_beds").select("*").eq("teacher_id", user.id).order("created_at", { ascending: false }),
      supabase.from("harvest_logs").select("*").eq("teacher_id", user.id).order("harvest_date", { ascending: false }),
    ]);
    setBeds(bedsData || []);
    setLogs(logsData || []);
    setLoading(false);
  }

  async function handleAddBed(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in."); setSaving(false); return; }
    const { error } = await supabase.from("garden_beds").insert({
      name: bedName, crop: bedCrop, planted_date: plantedDate || null,
      expected_harvest: expectedHarvest || null, status: bedStatus,
      notes: bedNotes, teacher_id: user.id,
    });
    if (error) { setError(error.message); setSaving(false); return; }
    setSaving(false); setShowBedModal(false);
    setBedName(""); setBedCrop(CROPS[0]); setPlantedDate(""); setExpectedHarvest(""); setBedStatus("planted"); setBedNotes("");
    loadData();
  }

  async function handleLogHarvest(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Please sign in."); setSaving(false); return; }
    const { error } = await supabase.from("harvest_logs").insert({
      bed_id: logBedId || null, crop: logCrop, quantity: logQty,
      unit: logUnit, harvest_date: logDate, notes: logNotes, teacher_id: user.id,
    });
    if (error) { setError(error.message); setSaving(false); return; }
    // Update bed status to harvested
    if (logBedId) await supabase.from("garden_beds").update({ status: "harvested" }).eq("id", logBedId);
    setSaving(false); setShowLogModal(false);
    setLogBedId(""); setLogCrop(CROPS[0]); setLogQty(""); setLogUnit(UNITS[0]); setLogNotes("");
    loadData();
  }

  const growing   = beds.filter(b => b.status === "growing").length;
  const harvested = beds.filter(b => b.status === "harvested").length;
  const totalKg   = logs.reduce((sum, l) => l.unit === "kg" ? sum + parseFloat(l.quantity || "0") : sum, 0);

  return (
    <div style={G.page}>
      <div style={G.topbar}>
        <span style={G.topTitle}>Garden Tracker</span>
        <div style={G.topBtns}>
          <button style={G.btnSecond} onClick={() => { setError(null); setShowLogModal(true); }}>+ Log harvest</button>
          <button style={G.btnPrimary} onClick={() => { setError(null); setShowBedModal(true); }}>+ Add garden bed</button>
        </div>
      </div>

      <div style={G.content}>
        <button style={G.back} onClick={() => router.push("/dashboard")}>← Back to dashboard</button>

        <div style={G.headerRow}>
          <div>
            <div style={G.tag}>AgriShine™</div>
            <h1 style={G.h1}>My garden</h1>
            <p style={G.sub}>Track your garden beds, crops, and harvests in one place.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={G.statsRow}>
          <div style={G.statCard}>
            <div style={G.statNum}>{beds.length}</div>
            <div style={G.statLbl}>Total beds</div>
          </div>
          <div style={G.statCard}>
            <div style={{ ...G.statNum, color: "#2D6A2D" }}>{growing}</div>
            <div style={G.statLbl}>Currently growing</div>
          </div>
          <div style={G.statCard}>
            <div style={{ ...G.statNum, color: "#854F0B" }}>{harvested}</div>
            <div style={G.statLbl}>Harvested</div>
          </div>
          <div style={G.statCard}>
            <div style={G.statNum}>{logs.length}</div>
            <div style={G.statLbl}>Harvest logs</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={G.tabs}>
          <button style={activeTab === "beds" ? G.tabOn : G.tabOff} onClick={() => setActiveTab("beds")}>Garden beds</button>
          <button style={activeTab === "logs" ? G.tabOn : G.tabOff} onClick={() => setActiveTab("logs")}>Harvest logs</button>
        </div>

        {/* Garden beds */}
        {activeTab === "beds" && (
          <>
            {!loading && beds.length === 0 && (
              <div style={G.empty}>
                <span style={G.emptyIcon}>🌱</span>
                <div style={G.emptyText}>No garden beds yet. Add your first bed!</div>
                <button style={G.btnPrimary} onClick={() => setShowBedModal(true)}>+ Add first garden bed</button>
              </div>
            )}
            <div style={G.bedsGrid}>
              {beds.map(b => {
                const sc = STATUS_COLORS[b.status] || STATUS_COLORS.growing;
                return (
                  <div key={b.id} style={G.bedCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={G.bedName}>{b.name}</div>
                      <span style={{ ...G.badge, ...sc }}>{b.status}</span>
                    </div>
                    <div style={G.bedCrop}>🌿 {b.crop}</div>
                    {b.planted_date && <div style={G.bedMeta}>Planted: {new Date(b.planted_date).toLocaleDateString()}</div>}
                    {b.expected_harvest && <div style={G.bedMeta}>Expected harvest: {new Date(b.expected_harvest).toLocaleDateString()}</div>}
                    {b.notes && <div style={{ ...G.bedMeta, marginTop: 8, color: "#999", fontStyle: "italic" }}>{b.notes}</div>}
                    <button
                      style={{ marginTop: 14, fontSize: 12, color: "#2D6A2D", background: "#f0f7ec", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                      onClick={() => { setLogBedId(b.id); setLogCrop(b.crop); setShowLogModal(true); }}
                    >
                      Log harvest →
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Harvest logs */}
        {activeTab === "logs" && (
          <>
            {!loading && logs.length === 0 && (
              <div style={G.empty}>
                <span style={G.emptyIcon}>📋</span>
                <div style={G.emptyText}>No harvest logs yet.</div>
                <button style={G.btnPrimary} onClick={() => setShowLogModal(true)}>+ Log first harvest</button>
              </div>
            )}
            {logs.length > 0 && (
              <div style={G.logTable}>
                <div style={G.logHead}>
                  <span style={G.logHCell}>Crop</span>
                  <span style={G.logHCell}>Quantity</span>
                  <span style={G.logHCell}>Harvest date</span>
                  <span style={G.logHCell}>Garden bed</span>
                  <span style={G.logHCell}>Notes</span>
                </div>
                {logs.map(l => (
                  <div key={l.id} style={G.logRow}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#163816" }}>🌿 {l.crop}</div>
                    <div style={G.logCell}>{l.quantity} {l.unit}</div>
                    <div style={G.logCell}>{l.harvest_date ? new Date(l.harvest_date).toLocaleDateString() : "—"}</div>
                    <div style={G.logCell}>{beds.find(b => b.id === l.bed_id)?.name || "—"}</div>
                    <div style={{ ...G.logCell, color: "#aaa", fontSize: 12 }}>{l.notes || "—"}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Bed Modal */}
      {showBedModal && (
        <div style={G.overlay} onClick={e => { if (e.target === e.currentTarget) setShowBedModal(false); }}>
          <div style={G.modal}>
            <h2 style={G.modalTitle}>Add garden bed</h2>
            <p style={G.modalSub}>Add a new bed to start tracking crops and harvests</p>
            {error && <div style={G.err}>{error}</div>}
            <form onSubmit={handleAddBed}>
              <label style={G.lbl}>Bed name *</label>
              <input style={G.inp} placeholder="e.g. Bed 1A, Tomato patch" value={bedName} onChange={e => setBedName(e.target.value)} required />
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Crop</label>
                  <select style={G.sel} value={bedCrop} onChange={e => setBedCrop(e.target.value)}>
                    {CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={G.lbl}>Status</label>
                  <select style={G.sel} value={bedStatus} onChange={e => setBedStatus(e.target.value)}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Date planted</label>
                  <input style={G.inp} type="date" value={plantedDate} onChange={e => setPlantedDate(e.target.value)} />
                </div>
                <div>
                  <label style={G.lbl}>Expected harvest</label>
                  <input style={G.inp} type="date" value={expectedHarvest} onChange={e => setExpectedHarvest(e.target.value)} />
                </div>
              </div>
              <label style={G.lbl}>Notes</label>
              <textarea style={G.textarea} placeholder="Any notes about this bed..." value={bedNotes} onChange={e => setBedNotes(e.target.value)} />
              <div style={G.modalBtns}>
                <button type="button" style={G.btnCancel} onClick={() => setShowBedModal(false)}>Cancel</button>
                <button type="submit" style={G.btnSave} disabled={saving}>{saving ? "Saving…" : "Add bed"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Harvest Modal */}
      {showLogModal && (
        <div style={G.overlay} onClick={e => { if (e.target === e.currentTarget) setShowLogModal(false); }}>
          <div style={G.modal}>
            <h2 style={G.modalTitle}>Log a harvest</h2>
            <p style={G.modalSub}>Record what was harvested from your garden today</p>
            {error && <div style={G.err}>{error}</div>}
            <form onSubmit={handleLogHarvest}>
              <label style={G.lbl}>Garden bed (optional)</label>
              <select style={G.sel} value={logBedId} onChange={e => setLogBedId(e.target.value)}>
                <option value="">Select a bed...</option>
                {beds.map(b => <option key={b.id} value={b.id}>{b.name} — {b.crop}</option>)}
              </select>
              <label style={G.lbl}>Crop harvested *</label>
              <select style={G.sel} value={logCrop} onChange={e => setLogCrop(e.target.value)}>
                {CROPS.map(c => <option key={c}>{c}</option>)}
              </select>
              <div style={G.grid2}>
                <div>
                  <label style={G.lbl}>Quantity *</label>
                  <input style={G.inp} type="number" placeholder="e.g. 5" value={logQty} onChange={e => setLogQty(e.target.value)} required />
                </div>
                <div>
                  <label style={G.lbl}>Unit</label>
                  <select style={G.sel} value={logUnit} onChange={e => setLogUnit(e.target.value)}>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <label style={G.lbl}>Harvest date</label>
              <input style={G.inp} type="date" value={logDate} onChange={e => setLogDate(e.target.value)} />
              <label style={G.lbl}>Notes</label>
              <textarea style={G.textarea} placeholder="Any notes about this harvest..." value={logNotes} onChange={e => setLogNotes(e.target.value)} />
              <div style={G.modalBtns}>
                <button type="button" style={G.btnCancel} onClick={() => setShowLogModal(false)}>Cancel</button>
                <button type="submit" style={G.btnSave} disabled={saving}>{saving ? "Saving…" : "Log harvest"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
