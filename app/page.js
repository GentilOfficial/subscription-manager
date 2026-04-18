"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../stores/auth";
import ThemeToggle from "./components/ThemeToggle";
import { landing } from "./config/content";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  // If already authenticated, skip the landing page
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>


      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/50 dark:border-white/10 bg-app-surface/50 dark:bg-app-surface-dark/50 backdrop-blur-xl shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-bold tracking-widest uppercase text-app-text-muted">{landing.badge}</span>
        </div>

        <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] leading-[0.85] font-extrabold tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 mix-blend-normal text-app-text dark:text-app-text-dark">
          {landing.headingLine1} <br className="hidden sm:block" />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-4">{landing.headingHighlight}</span>
        </h1>

        <p className="text-xl md:text-2xl text-app-text-muted mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {landing.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Link
            href="/login"
            className="px-10 py-5 bg-app-text dark:bg-app-text-dark hover:bg-primary dark:hover:bg-primary text-app-bg dark:text-app-bg-dark border border-transparent dark:hover:border-transparent font-extrabold tracking-wide rounded-full text-lg transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.3)] hover:-translate-y-2 active:translate-y-0 active:scale-95 group flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            {landing.ctaPrimary}
            <span className="group-hover:translate-x-1 transition-transform opacity-60">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </Link>
          <Link
            href="/login"
            className="px-10 py-5 bg-app-surface/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 hover:bg-app-surface dark:hover:bg-white/10 text-app-text dark:text-app-text-dark font-bold tracking-wide rounded-full text-lg transition-all hover:-translate-y-2 active:translate-y-0 active:scale-95 w-full sm:w-auto text-center"
          >
            {landing.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-[15%] left-[10%] w-24 h-24 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl skew-x-12 animate-in spin-in-12 duration-1000 delay-500 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-full border border-white/50 dark:border-white/10 shadow-2xl -skew-y-12 animate-in spin-in-[-12] duration-1000 delay-700 pointer-events-none hidden lg:block" />
    </main>
  );
}
