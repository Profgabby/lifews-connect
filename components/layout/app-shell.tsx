import { Sidebar } from "./sidebar";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/logout-button";

export async function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();


export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="p-4 lg:p-6 grid gap-4 lg:grid-cols-[16rem,1fr]">
      <Sidebar />
      <section className="space-y-4">
        <header className="card p-5 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold text-primary">{title}</h1>
            <p className="text-sm text-slate-600">{user?.email}</p>
          </div>
          <LogoutButton />
        <header className="card p-5">
          <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
