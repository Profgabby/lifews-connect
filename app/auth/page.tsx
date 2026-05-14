"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });

        if (signUpError) {
          setError(`Signup failed: ${signUpError.message}`);
          return;
        }

        setSuccess(
          data.session
            ? "Signup successful. Your account has been created."
            : "Signup successful. Check your email to confirm your account."
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

        if (signInError) {
          setError(`Login failed: ${signInError.message}`);
          return;
        }

        setSuccess("Login successful. Redirecting to dashboard...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : "Authentication error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <div className="w-full max-w-md space-y-3">
        <section className="card w-full p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-primary">{mode === "login" ? "Login" : "Create account"}</h1>
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
              minLength={6}
              required
            />

            {error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
            {success && <p className="rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700">{success}</p>}

            <Button className="w-full" disabled={loading} type="submit">
              {loading ? (mode === "signup" ? "Creating account..." : "Signing in...") : mode === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </section>

        <button
          className="w-full text-sm font-medium text-primary underline underline-offset-4"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          type="button"
        >
          Switch to {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </div>
    </main>
  );
}
