import { AppShell } from "@/components/layout/app-shell";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <article className="card p-5 space-y-2">
        <h2 className="font-semibold">Settings Module</h2>
        <p className="text-sm text-slate-600">MVP module scaffold for settings with multilingual support and role-based visibility.</p>
      </article>
    </AppShell>
  );
}
