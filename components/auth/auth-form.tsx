"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const roles = ["admin", "teacher", "parent", "school", "community_partner"];

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError("Missing Supabase environment variables.");
        return;
      }

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: { full_name: fullName, role },
          },
        });

        if (signUpError) {
          setError(`Signup failed: ${signUpError.message}`);
          return;
        }

        if (data.user) {
          const { data: roleRow } = await supabase
            .from("roles")
            .select("id")
            .eq("name", role)
            .single();

          await supabase.from("users").upsert({
            id: data.user.id,
            email,
            full_name: fullName,
            role_id: roleRow?.id ?? null,
            role_name: role,
          });

          setSuccess(
            data.session
              ? "Signup successful. You are now signed in."
              : "Signup successful. Check your email to confirm your account."
          );

          if (data.session) {
            router.push("/dashboard");
            router.refresh();
          }
        } else {
          setError("Signup returned no user. Please try again.");
        }
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(`Login failed: ${loginError.message}`);
          return;
        }

        setSuccess("Login successful. Redirecting...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const linkHref = mode === "login" ? "/signup" : "/login";
  const linkLabel = mode === "login" ? "Sign up" : "Login";
  const promptText = mode === "login" ? "Need an account?" : "Already have an account?";

  return (
    <section className="card w-full max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-primary">
        {mode === "login" ? "Login" : "Create account"}
      </h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border p-2"
            placeholder="Full name"
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border p-2"
          placeholder="Email"
          type="email"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border p-2"
          placeholder="Password"
          type="password"
          required
          minLength={6}
        />

        {mode === "signup" && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border p-2"
            required
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {item.replace("_", " ")}
              </option>
            ))}
          </select>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>
        )}
        {success && (
          <p className="rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700">{success}</p>
        )}

        <Button className="w-full" disabled={loading} type="submit">
          {loading
            ? mode === "signup" ? "Creating account..." : "Signing in..."
            : mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <p className="text-sm text-slate-600">
        {promptText}{" "}
        <Link href={linkHref} className="text-primary font-medium">
          {linkLabel}
        </Link>
      </p>
    </section>
  );
}
