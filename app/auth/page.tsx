"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heading = useMemo(() => (mode === "login" ? "Welcome back" : "Create your account"), [mode]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        setMessage("Sign up successful. Check your email to verify your account, then sign in.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }

      setMessage("Login successful. Redirecting to dashboard...");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">{heading}</h1>

        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border p-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border p-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {message ? <p className="text-sm text-green-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          className="text-sm text-primary"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage(null);
            setError(null);
          }}
          type="button"
        >
          Switch to {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </section>
    </main>
  );
}
