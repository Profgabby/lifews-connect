"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <div className="w-full max-w-md space-y-3">
        <AuthForm mode={mode} />
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
