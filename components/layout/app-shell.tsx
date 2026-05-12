import { Sidebar } from "./sidebar";

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="p-4 lg:p-6 grid gap-4 lg:grid-cols-[16rem,1fr]">
      <Sidebar />
      <section className="space-y-4">
        <header className="card p-5">
          <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
