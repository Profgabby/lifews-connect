"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const roles = [
  "admin",
  "teacher",
  "parent",
  "student",
  "school",
  "community_partner",
  "artisan",
  "ngo_organization",
  "researcher",
  "volunteer"
] as const;

type Role = (typeof roles)[number];

type Profile = {
  full_name: string;
  role: Role;
  organization_name: string;
  school_name: string;
  phone: string;
  country: string;
  state: string;
};

const emptyProfile: Profile = {
  full_name: "",
  role: "teacher",
  organization_name: "",
  school_name: "",
  phone: "",
  country: "",
  state: ""
};

const getDashboardRoute = (role?: string | null) => {
  if (!role) return "/dashboard";
  return `/dashboard?role=${encodeURIComponent(role)}`;
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heading = useMemo(() => (needsOnboarding ? "Complete your profile" : mode === "login" ? "Login" : "Sign Up"), [mode, needsOnboarding]);

  useEffect(() => {
    const checkProfile = async () => {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data: existing } = await supabase.from("profiles").select("*").eq("id", auth.user.id).maybeSingle();
      if (existing && existing.full_name && existing.role) {
        router.push(getDashboardRoute(existing.role));
      } else if (existing) {
        setProfile((prev) => ({ ...prev, ...existing, role: (existing.role as Role) || prev.role }));
        setNeedsOnboarding(true);
      }
    };
    void checkProfile();
  }, [router]);

  async function onAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) return setError(signUpError.message);
        if (!data.user) return setError("Signup succeeded but user record was unavailable.");

        await supabase.from("profiles").upsert({
          id: data.user.id,
          email,
          full_name: profile.full_name || null,
          role: profile.role || null,
          organization_name: profile.organization_name || null,
          school_name: profile.school_name || null,
          phone: profile.phone || null,
          country: profile.country || null,
          state: profile.state || null
        });

        setMessage("Signup successful. Complete your profile to continue.");
        setNeedsOnboarding(true);
        return;
      }

      const {
        data: signInData,
        error: signInError
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (signInError) return setError(signInError.message);
      if (!signInData.user) return setError("Login succeeded but no user was returned.");

      const { data: existing } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signInData.user.id)
        .maybeSingle();
      const incomplete = !existing || !existing.full_name || !existing.role;
      if (incomplete) {
        setNeedsOnboarding(true);
        setMessage("Login successful. Please complete onboarding.");
        if (existing) setProfile((prev) => ({ ...prev, ...existing, role: (existing.role as Role) || prev.role }));
        return;
      }

      router.push(getDashboardRoute(existing.role));
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onOnboardingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    const supabase = createClient();

    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return setError("Please log in again to complete onboarding.");

      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: auth.user.id,
        email: auth.user.email,
        ...profile
      });
      if (upsertError) return setError(upsertError.message);

      setMessage("Onboarding complete. Redirecting...");
      router.push(getDashboardRoute(profile.role));
      router.refresh();
    } catch {
      setError("Could not save your profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">{heading}</h1>

        {!needsOnboarding ? (
          <form className="space-y-3" onSubmit={onAuthSubmit}>
            <input className="w-full rounded-xl border p-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="w-full rounded-xl border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button className="w-full" disabled={loading} type="submit">{loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}</Button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={onOnboardingSubmit}>
            <input className="w-full rounded-xl border p-2" placeholder="Full name" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} required />
            <select className="w-full rounded-xl border p-2" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value as Role })} required>
              {roles.map((role) => <option key={role} value={role}>{role.replaceAll("_", " ")}</option>)}
            </select>
            <input className="w-full rounded-xl border p-2" placeholder="Organization name" value={profile.organization_name} onChange={(e) => setProfile({ ...profile, organization_name: e.target.value })} />
            <input className="w-full rounded-xl border p-2" placeholder="School name" value={profile.school_name} onChange={(e) => setProfile({ ...profile, school_name: e.target.value })} />
            <input className="w-full rounded-xl border p-2" placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <input className="w-full rounded-xl border p-2" placeholder="Country" value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} />
            <input className="w-full rounded-xl border p-2" placeholder="State" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
            <Button className="w-full" disabled={loading} type="submit">{loading ? "Saving profile..." : "Complete onboarding"}</Button>
          </form>
        )}

        {message ? <p className="text-sm text-green-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!needsOnboarding && (
          <button className="text-sm text-primary" onClick={() => setMode(mode === "login" ? "signup" : "login")} type="button">
            Switch to {mode === "login" ? "Sign Up" : "Login"}
          </button>
        )}
      </section>
    </main>
  );
}
