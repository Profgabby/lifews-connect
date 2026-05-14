"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Password updated successfully. You can now log in with your new password.");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">Reset password</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border p-2"
            placeholder="New password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={6}
          />
          <input
            className="w-full rounded-xl border p-2"
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={6}
          />
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Updating password..." : "Update password"}
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
