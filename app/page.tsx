import Link from "next/link";
import { pillars } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-accent to-slate-50 p-6 lg:p-10">
      <section className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-4">
          <p className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">MVP v0.1</p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">LIFEWS CONNECT</h1>
          <p className="text-lg text-slate-700 max-w-3xl">Connecting schools, teachers, parents, students, and community partners for inclusive food-energy-water education.</p>
          <div className="flex gap-3">
            <Link href="/auth"><Button>Get Started</Button></Link>
            <Link href="/pillars"><Button variant="secondary">Explore Pillars</Button></Link>
          </div>
        </header>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map((pillar) => (
            <article key={pillar.name} className="card p-5">
              <h2 className="font-semibold text-primary">{pillar.name}</h2>
              <p className="text-sm text-slate-600 mt-2">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
