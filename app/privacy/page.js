"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ThemeToggle from '@/app/components/molecules/ThemeToggle';
import GlassCard from '@/app/components/atoms/GlassCard';
import { privacyPolicy } from '@/app/config/content';

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-1 flex flex-col items-center p-6 sm:p-12 relative overflow-hidden text-app-text dark:text-app-text-dark bg-app-bg dark:bg-app-bg-dark selection:bg-primary-muted selection:text-primary">
        <div className="w-full max-w-3xl z-10 relative mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-app-text-muted hover:text-primary transition-colors font-semibold active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            {privacyPolicy.backHome}
          </Link>

          <GlassCard className="p-8 sm:p-12">
            <header className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter pb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {privacyPolicy.title}
              </h1>
              <p className="text-sm font-semibold text-app-text-muted uppercase tracking-widest">
                {privacyPolicy.lastUpdated}
              </p>
            </header>

            <div className="space-y-8 text-base md:text-lg leading-relaxed text-app-text/90 dark:text-app-text-dark/90">
              {privacyPolicy.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-bold mb-3 text-app-text dark:text-app-text-dark">
                    {section.heading}
                  </h2>
                  <p>{section.content}</p>
                </section>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </>
  );
}
