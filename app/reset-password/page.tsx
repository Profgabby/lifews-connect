"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully. You can now log in.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="card w-full max-w-md p-6 space-y-4 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-semibold text-green-700">Reset Password</h1>

        {!ready && (
          <p className="text-sm text-red-600">
            Recovery session not detected. Please request a new reset link and open it in this same browser.
          </p>
        )}

        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border p-2"
            placeholder="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border p-2"
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button className="w-full" disabled={loading || !ready} type="submit">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>

        {message && <p className="text-sm text-green-700">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Link className="text-sm text-green-700" href="/auth">
          Back to Login
        </Link>
      </section>
    </main>
  );
}