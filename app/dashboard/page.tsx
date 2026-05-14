import { AppShell } from "@/components/layout/app-shell";
import { OverviewCards } from "@/components/dashboard/overview-cards";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  return (
    <AppShell title={role ? `${role.replaceAll("_", " ")} Dashboard` : "Role-based Dashboard"}>
      <OverviewCards />
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card p-5"><h2 className="font-semibold">Activity Feed</h2><p className="text-sm mt-2 text-slate-600">Recent garden updates, resource uploads, and school engagement events.</p></article>
        <article className="card p-5"><h2 className="font-semibold">Announcements Snapshot</h2><p className="text-sm mt-2 text-slate-600">Quick updates for teachers, parents, and community partners.</p></article>
      </section>
    </AppShell>
  );
}
