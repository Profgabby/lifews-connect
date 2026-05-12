"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">{mode === "login" ? "Login" : "Sign Up"}</h1>
        <form className="space-y-3">
          <input className="w-full rounded-xl border p-2" placeholder="Email" type="email" />
          <input className="w-full rounded-xl border p-2" placeholder="Password" type="password" />
          {mode === "signup" && <input className="w-full rounded-xl border p-2" placeholder="Role" />}
          <Button className="w-full">{mode === "login" ? "Sign In" : "Create Account"}</Button>
        </form>
        <button className="text-sm text-primary" onClick={() => setMode(mode === "login" ? "signup" : "login")}>Switch to {mode === "login" ? "Sign Up" : "Login"}</button>
      </section>
    </main>
  );
}
