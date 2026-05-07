"use client";

import ThemeToggle from '@/app/components/molecules/ThemeToggle';

export default function PoliciesLayout({ children }) {
  return (
    <>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-1 flex flex-col items-center p-6 sm:p-12 relative overflow-hidden text-app-text dark:text-app-text-dark bg-app-bg dark:bg-app-bg-dark selection:bg-primary-muted selection:text-primary">
        <div className="w-full max-w-7xl z-10 relative mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {children}
        </div>
      </main>
    </>
  );
}
