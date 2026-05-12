import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <AuthForm mode="signup" />
    </main>
  );
}
