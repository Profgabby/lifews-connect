import Link from "next/link";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Pillars", "/pillars"],
  ["Learning Library", "/library"],
  ["Garden Activities", "/garden"],
  ["Announcements", "/announcements"],
  ["Messages", "/messages"],
  ["Profile & Settings", "/settings"]
];

export function Sidebar() {
  return (
    <aside className="w-full lg:w-64 card p-4 lg:min-h-[calc(100vh-2rem)]">
      <h2 className="text-xl font-bold text-primary mb-6">LIFEWS CONNECT</h2>
      <nav className="space-y-1">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
