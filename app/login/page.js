"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth";
import { login } from "../config/content";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, isLoading } = useAuthStore();

  // Se già autenticato, vai subito alla dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message ?? login.defaultError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-x-hidden bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
      {/* Background gradients */}
      <div className="absolute top-[10%] right-[20%] w-[600px] h-[600px] bg-primary/20 dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-accent/20 dark:bg-accent/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mb-20">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6"
          >
            {login.brand}
          </Link>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">
            {login.heading}
          </h2>
          <p className="text-lg text-app-text-muted font-medium">
            {login.subtitle}
          </p>
        </div>

        <div className="bg-app-surface/70 dark:bg-app-surface-dark/60 backdrop-blur-3xl border border-white/50 dark:border-white/5 p-10 sm:p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Error banner */}
            {error && (
              <div className="px-5 py-4 bg-accent-muted border border-accent/20 rounded-2xl text-sm font-semibold text-accent-dark dark:text-accent animate-in fade-in duration-300">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold tracking-wide text-app-text-muted mb-3"
              >
                {login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-[2rem] text-app-text dark:text-app-text-dark focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-app-text-muted/50 font-bold shadow-inner"
                placeholder={login.emailPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold tracking-wide text-app-text-muted mb-3"
              >
                {login.passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-[2rem] text-app-text dark:text-app-text-dark focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-app-text-muted/50 font-bold shadow-inner"
                placeholder={login.passwordPlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-5 px-6 border border-brand-400/30 rounded-[2rem] text-lg font-bold tracking-wide text-white bg-primary hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_15px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {login.submittingButton}
                </>
              ) : (
                login.submitButton
              )}
            </button>
          </form>

          {/* Link to signup */}
          <p className="text-center mt-8 text-sm text-app-text-muted font-medium relative z-10">
            {login.noAccount}{" "}
            <Link
              href="/signup"
              className="font-bold text-primary dark:text-primary-light hover:text-primary-light transition-colors"
            >
              {login.signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
