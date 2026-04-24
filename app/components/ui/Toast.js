"use client";

import { AlertTriangle, Check, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = {
  success: (
    <Check className="w-5 h-5 text-emerald-500" />
  ),
  error: (
    <X className="w-5 h-5 text-rose-500" />
  ),
  info: (
    <Info className="w-5 h-5 text-primary" />
  ),
  warning: (
    <AlertTriangle className="w-5 h-5 text-amber-500" />
  ),
};

export default function Toast({ toast, onRemove }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(onRemove, 300);
  };

  return (
    <div
      className={`relative group flex items-center gap-4 p-4 pr-6 w-full sm:min-w-[380px] sm:max-w-md bg-app-surface/60 dark:bg-app-surface-dark/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden ${
        isVisible ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
        toast.type === 'success' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
        toast.type === 'error' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' :
        toast.type === 'warning' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 
        'bg-primary/15 text-primary'
      }`}>
        {icons[toast.type] || icons.info}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-app-text dark:text-app-text-dark tracking-tight leading-tight truncate sm:whitespace-normal">
          {toast.message}
        </p>
      </div>

      <button
        onClick={handleRemove}
        className="p-1.5 rounded-full text-app-text-muted hover:text-app-text dark:hover:text-app-text-dark hover:bg-app-bg dark:hover:bg-white/10 transition-all active:scale-90"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-current opacity-20 w-full overflow-hidden">
        <div 
          className={`h-full ${
            toast.type === 'success' ? 'bg-emerald-500' :
            toast.type === 'error' ? 'bg-rose-500' :
            toast.type === 'warning' ? 'bg-amber-500' : 'bg-primary'
          }`}
          style={{ 
            animation: `toast-progress ${toast.duration || 5000}ms linear forwards` 
          }}
        />
      </div>
    </div>
  );
}
