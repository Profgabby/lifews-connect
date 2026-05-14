"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const supabase = createClient();

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage("Password reset email sent. Check your inbox for the reset link.");
    } catch {
      setError("Unable to send reset link right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">Forgot password</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border p-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Sending reset link..." : "Send reset link"}
          </Button>
        </form>
        {message ? <p className="text-sm text-green-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Link className="text-sm text-primary underline underline-offset-4" href="/auth">
          Back to login
        </Link>
      </section>
    </main>
  );
}
