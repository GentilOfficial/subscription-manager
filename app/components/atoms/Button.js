"use client";

import React from 'react';

const variants = {
  primary: "bg-primary hover:bg-primary-light text-white shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_30px_rgba(234,88,12,0.4)] border-brand-400/50",
  secondary: "bg-app-text dark:bg-app-text-dark hover:bg-primary dark:hover:bg-primary text-white dark:text-app-bg-dark shadow-xl dark:shadow-[0_10px_20px_rgba(255,255,255,0.05)]",
  ghost: "bg-app-surface/70 dark:bg-app-surface-dark/5 backdrop-blur-md hover:bg-app-surface dark:hover:bg-app-surface-dark/10 text-app-text/70 dark:text-app-text-dark/70 hover:text-app-text dark:hover:text-app-text-dark border-slate-200/50 dark:border-white/10 shadow-sm",
  danger: "bg-accent-muted hover:bg-accent/20 dark:bg-accent-muted dark:hover:bg-accent/20 text-accent-dark dark:text-accent",
  subtle: "bg-slate-100 hover:bg-slate-200 dark:bg-app-surface-dark/5 dark:hover:bg-app-surface-dark/10 text-app-text-muted dark:text-app-text-dark/50 hover:text-app-text dark:hover:text-app-text-dark"
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base"
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-full transition-all active:scale-95 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
