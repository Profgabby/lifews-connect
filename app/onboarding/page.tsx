"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const roles = ["admin","teacher","parent","student","school","community_partner","artisan","ngo_organization","researcher","volunteer"] as const;

type Role = (typeof roles)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("teacher");
  const [organizationName, setOrganizationName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return router.push("/login");
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", auth.user.id).maybeSingle();
      if (profile?.onboarding_completed) router.push(`/dashboard?role=${profile.role || ""}`);
      if (profile) {
        setFullName(profile.full_name || "");
        setRole((profile.role as Role) || "teacher");
        setOrganizationName(profile.organization_name || "");
        setSchoolName(profile.school_name || "");
        setPhone(profile.phone || "");
        setCountry(profile.country || "");
        setState(profile.state || "");
      }
    })();
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return setError("Please sign in again.");

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: auth.user.id,
      email: auth.user.email,
      full_name: fullName,
      role,
      organization_name: organizationName,
      school_name: schoolName,
      phone,
      country,
      state,
      onboarding_completed: true
    });

    setLoading(false);
    if (upsertError) return setError(upsertError.message);
    router.push(`/dashboard?role=${encodeURIComponent(role)}`);
    router.refresh();
  }

  return <main className="min-h-screen grid place-items-center p-4 bg-slate-50"><section className="card w-full max-w-md p-6 space-y-3"><h1 className="text-2xl font-semibold text-primary">Complete onboarding</h1><form className="space-y-3" onSubmit={onSubmit}><input className="w-full rounded-xl border p-2" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /><select className="w-full rounded-xl border p-2" value={role} onChange={(e) => setRole(e.target.value as Role)}>{roles.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select><input className="w-full rounded-xl border p-2" placeholder="Organization name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} /><input className="w-full rounded-xl border p-2" placeholder="School name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} /><input className="w-full rounded-xl border p-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><input className="w-full rounded-xl border p-2" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} /><input className="w-full rounded-xl border p-2" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} /><Button className="w-full" disabled={loading} type="submit">{loading ? "Saving..." : "Finish onboarding"}</Button></form>{error ? <p className="text-sm text-red-600">{error}</p> : null}</section></main>;
}
