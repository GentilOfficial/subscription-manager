"use client";

import React from 'react';

const statusVariants = {
  Active: "bg-primary-muted text-primary border-primary/20 shadow-[0_4px_10px_rgba(234,88,12,0.1)]",
  Paused: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  Cancelled: "bg-app-bg dark:bg-app-surface-dark/80 text-app-text-muted dark:text-app-text-dark/50 border-slate-200 dark:border-slate-700/50",
  default: "bg-app-bg dark:bg-app-surface-dark/80 text-app-text-muted dark:text-app-text-dark/50 border-slate-200 dark:border-slate-700/50"
};

export default function Badge({ 
  children, 
  variant = 'default',
  showDot = false,
  className = '' 
}) {
  const dynamicVariant = statusVariants[children] || statusVariants[variant] || statusVariants.default;
  
  return (
    <div className={`flex px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest items-center gap-2 border transition-all ${dynamicVariant} ${className}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant === 'Active' || children === 'Active' ? 'bg-primary animate-pulse' : 'bg-current opacity-40'}`}></span>
      )}
      {children}
    </div>
  );
}
