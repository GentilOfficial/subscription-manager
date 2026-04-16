"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth";
import { signup } from "../config/content";

export default function SignUpPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary/20 dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-accent/20 dark:bg-accent/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mb-20">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6"
          >
            {signup.brand}
          </Link>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">
            {signup.heading}
          </h2>
          <p className="text-lg text-app-text-muted font-medium">
            {signup.subtitle}
          </p>
        </div>

        <div className="bg-app-surface/70 dark:bg-app-surface-dark/60 backdrop-blur-3xl border border-white/50 dark:border-white/5 p-10 sm:p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="px-5 py-4 bg-accent-muted border border-accent/20 rounded-2xl text-sm font-semibold text-accent-dark dark:text-accent">
                {signup.defaultError}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold tracking-wide text-app-text-muted mb-3 opacity-50"
                >
                  {signup.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  className="w-full px-6 py-5 bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-[2rem] text-app-text dark:text-app-text-dark placeholder:text-app-text-muted/50 font-bold shadow-inner opacity-50 cursor-not-allowed"
                  placeholder={signup.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold tracking-wide text-app-text-muted mb-3 opacity-50"
                >
                  {signup.passwordLabel}
                </label>
                <input
                  id="password"
                  type="password"
                  disabled
                  className="w-full px-6 py-5 bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-[2rem] text-app-text dark:text-app-text-dark placeholder:text-app-text-muted/50 font-bold shadow-inner opacity-50 cursor-not-allowed"
                  placeholder={signup.passwordPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-bold tracking-wide text-app-text-muted mb-3 opacity-50"
                >
                  {signup.confirmPasswordLabel}
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  disabled
                  className="w-full px-6 py-5 bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-[2rem] text-app-text dark:text-app-text-dark placeholder:text-app-text-muted/50 font-bold shadow-inner opacity-50 cursor-not-allowed"
                  placeholder={signup.confirmPasswordPlaceholder}
                />
              </div>

              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-3 py-5 px-6 border border-brand-400/30 rounded-[2rem] text-lg font-bold tracking-wide text-white bg-primary opacity-60 cursor-not-allowed"
              >
                {signup.submitButton}
              </button>
            </div>

          {/* Link to login */}
          <p className="text-center mt-8 text-sm text-app-text-muted font-medium relative z-10">
            {signup.hasAccount}{" "}
            <Link
              href="/login"
              className="font-bold text-primary dark:text-primary-light hover:text-primary-light transition-colors"
            >
              {signup.signInLink}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
