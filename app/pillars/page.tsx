import { AppShell } from "@/components/layout/app-shell";

export default function PillarsPage() {
  return (
    <AppShell title="Pillars">
      <article className="card p-5 space-y-2">
        <h2 className="font-semibold">Pillars Module</h2>
        <p className="text-sm text-slate-600">MVP module scaffold for pillars with multilingual support and role-based visibility.</p>
      </article>
    </AppShell>
  );
}
