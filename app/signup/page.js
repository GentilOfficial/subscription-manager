"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-x-hidden bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
      <div className="relative z-10 w-full max-w-lg mb-20">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
            {signup.brand}
          </Link>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">{signup.disabledHeading}</h2>
          <p className="text-lg text-app-text-muted font-medium">{signup.disabledSubtitle}</p>
        </div>
        <div className="bg-app-surface/70 dark:bg-app-surface-dark/60 backdrop-blur-3xl border border-white/50 dark:border-white/5 p-10 sm:p-12 rounded-[3.5rem] shadow-2xl animate-in fade-in duration-700">
           <div className="text-center space-y-6">
              <p className="text-app-text-muted">{signup.contactMessage}</p>
              <Link href="/login" className="w-full flex items-center justify-center gap-3 py-5 px-6 border border-brand-400/30 rounded-[2rem] text-lg font-bold tracking-wide text-white bg-primary hover:bg-primary-light transition-all shadow-lg active:scale-95">
                 {signup.backToLogin}
              </Link>
           </div>
        </div>
      </div>
    </main>
  );
}
