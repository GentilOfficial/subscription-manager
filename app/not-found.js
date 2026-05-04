import Link from "next/link";
import ThemeToggle from '@/app/components/molecules/ThemeToggle';
import { notFound as content } from '@/app/config/content';

export const metadata = {
  title: content.title,
};

export default function NotFound() {
  return (
    <>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden text-app-text dark:text-app-text-dark">

        <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-[10rem] sm:text-[14rem] md:text-[18rem] leading-none font-extrabold tracking-tighter select-none animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {content.heading}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-app-text-muted font-medium leading-relaxed mb-4 -mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {content.subtitle}
          </p>
          <p className="text-base text-app-text-muted/60 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {content.description}
          </p>

          <Link
            href="/"
              className="px-10 py-5 bg-app-surface/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 hover:bg-app-surface dark:hover:bg-white/10 text-app-text dark:text-app-text-dark font-bold tracking-wide rounded-full text-lg transition-all hover:-translate-y-2 active:translate-y-0 active:scale-95 w-full sm:w-auto text-center"
            >
            {content.backHome}
          </Link>
        </div>

        <div className="absolute top-[15%] left-[10%] w-20 h-20 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl skew-x-12 animate-in spin-in-12 duration-1000 delay-500 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-[20%] right-[12%] w-28 h-28 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-full border border-black/5 dark:border-white/10 shadow-2xl -skew-y-12 animate-in spin-in-[-12] duration-1000 delay-700 pointer-events-none hidden lg:block" />
        <div className="absolute top-[60%] left-[5%] w-14 h-14 bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-white/5 shadow-xl rotate-45 animate-in spin-in-6 duration-1000 delay-900 pointer-events-none hidden lg:block" />
      </main>
    </>
  );
}
