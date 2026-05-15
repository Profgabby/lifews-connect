import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

type Role =
  | "admin"
  | "teacher"
  | "parent"
  | "student"
  | "school"
  | "community_partner"
  | "artisan"
  | "ngo_organization"
  | "researcher"
  | "volunteer";

const roleLabels: Record<Role, string> = {
  admin: "Admin",
  teacher: "Teacher",
  parent: "Parent",
  student: "Student",
  school: "School",
  community_partner: "Community Partner",
  artisan: "Artisan",
  ngo_organization: "NGO/Organization",
  researcher: "Researcher",
  volunteer: "Volunteer"
};

const baseModules = [
  { title: "Learning Library", href: "/library", description: "Access lessons, resources, and practical guides." },
  { title: "Garden Projects", href: "/garden", description: "Track garden-based learning and sustainability projects." },
  { title: "Announcements", href: "/announcements", description: "Stay updated with school and community-wide notices." },
  { title: "Messages", href: "/messages", description: "Collaborate with teachers, families, and partners." },
  { title: "Profile & Settings", href: "/settings", description: "Manage your profile, preferences, and account." }
];

const roleCards: Record<Role, Array<{ title: string; description: string }>> = {
  admin: [
    { title: "Platform Oversight", description: "Review program performance, engagement, and impact across all modules." },
    { title: "Community Coordination", description: "Coordinate schools, partners, and volunteer efforts." }
  ],
  teacher: [
    { title: "Classes", description: "Manage class learning goals, schedules, and assignments." },
    { title: "Garden Activities", description: "Plan and track class-led garden activities and outcomes." },
    { title: "Learning Materials", description: "Share curriculum content and practical guides with students." },
    { title: "Student Participation", description: "Monitor attendance, participation, and project contributions." }
  ],
  parent: [
    { title: "Child Progress", description: "Follow student learning progress and garden participation." },
    { title: "Home Support", description: "Access activities and tips for home-based support." }
  ],
  student: [
    { title: "My Learning", description: "View assigned content and practical learning tasks." },
    { title: "My Projects", description: "Track your contributions to school and community projects." }
  ],
  school: [
    { title: "Teachers", description: "Manage teacher engagement, classroom activity, and support." },
    { title: "Students", description: "Monitor student participation and learning outcomes." },
    { title: "Gardens", description: "Track school garden projects, resources, and maintenance." },
    { title: "Announcements", description: "Publish school-wide updates and communications." },
    { title: "Reports", description: "Generate reports on activity, performance, and impact." }
  ],
  community_partner: [
    { title: "Partnership Opportunities", description: "Find collaboration opportunities with schools and communities." },
    { title: "Program Support", description: "Contribute resources, expertise, and mentorship." }
  ],
  artisan: [
    { title: "Skills", description: "Share traditional and modern practical skills for learners." },
    { title: "Workshops", description: "Plan and host hands-on workshops for schools and communities." },
    { title: "Practical Training", description: "Deliver applied training aligned with real-world livelihoods." },
    { title: "Circular Economy Projects", description: "Lead reuse, repair, and sustainability-focused initiatives." },
    { title: "School Support Services", description: "Provide technical and practical services for school programs." }
  ],
  ngo_organization: [
    { title: "Program Delivery", description: "Coordinate outreach, impact campaigns, and support services." },
    { title: "Monitoring & Evaluation", description: "Track indicators, outcomes, and reporting requirements." }
  ],
  researcher: [
    { title: "Research Insights", description: "Analyze educational and sustainability activity trends." },
    { title: "Data Collaboration", description: "Work with schools and partners on evidence-based improvements." }
  ],
  volunteer: [
    { title: "Volunteer Activities", description: "Join community sessions, events, and school support tasks." },
    { title: "Contribution Tracking", description: "Track your hours, impact, and ongoing commitments." }
  ]
};

function isRole(value?: string): value is Role {
  return !!value && value in roleLabels;
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role: roleFromQuery } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  let roleFromProfile: string | undefined;
  if (auth.user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", auth.user.id).maybeSingle();
    roleFromProfile = profile?.role ?? undefined;
  }

  const resolvedRole = isRole(roleFromQuery) ? roleFromQuery : isRole(roleFromProfile) ? roleFromProfile : "teacher";

  return (
    <AppShell title={`${roleLabels[resolvedRole]} Dashboard`}>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {baseModules.map((module) => (
          <Link key={module.title} href={module.href} className="card p-4 hover:border-primary/40 border border-transparent transition">
            <h2 className="font-semibold text-primary">{module.title}</h2>
            <p className="text-sm mt-2 text-slate-600">{module.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleCards[resolvedRole].map((card) => (
          <article key={card.title} className="card p-5 bg-emerald-50/40 border border-emerald-100">
            <h3 className="font-semibold text-primary">{card.title}</h3>
            <p className="text-sm mt-2 text-slate-700">{card.description}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
