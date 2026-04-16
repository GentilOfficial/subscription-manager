"use client";

import React from 'react';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-app-surface/70 dark:bg-app-surface-dark/60 backdrop-blur-3xl border border-white/50 dark:border-white/5 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.15)] shadow-[inset_0_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden group transition-all duration-500 ${className}`}
      {...props}
    >
      {/* Subtle background glow that reacts to hover if the card has 'group' (which it does) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-[2s]"></div>

      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
