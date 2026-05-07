import GlassCard from "@/app/components/atoms/GlassCard";
import MarkedText from "@/app/components/molecules/MarkedText";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PolicySection({ policy }) {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 text-app-text-muted hover:text-primary transition-colors font-semibold active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        {policy.backHome}
      </Link>

      <GlassCard className="p-8 sm:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter pb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {policy.title}
          </h1>
          <p className="text-sm font-semibold text-app-text-muted uppercase tracking-widest">
            {policy.lastUpdated}
          </p>
        </header>

        <div className="space-y-8 text-base md:text-lg leading-relaxed text-app-text/90 dark:text-app-text-dark/90">
          {policy.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-bold mb-3 text-app-text dark:text-app-text-dark">
                {section.heading}
              </h2>
              <MarkedText text={section.content} />
            </section>
          ))}
        </div>
      </GlassCard>
    </>
  );
}