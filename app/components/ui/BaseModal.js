"use client";

import { useEffect } from 'react';

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  showCloseButton = true
}) {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20">
      <div
        className="absolute inset-0 backdrop-blur-2xl animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className={`relative w-full ${maxWidth} max-h-[85vh] flex flex-col bg-app-bg dark:bg-app-surface-dark border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 z-10`}>

        {(title || showCloseButton) && (
          <div className="px-8 py-6 border-b border-slate-200/50 dark:border-white/5 flex justify-between items-center bg-app-surface/50 dark:bg-white/5 shrink-0">
            {title && (
              <h2 className="text-2xl font-extrabold tracking-tight text-app-text dark:text-app-text-dark">
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-app-text-muted hover:text-app-text dark:hover:text-app-text-dark bg-app-bg hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 p-2 rounded-full transition-transform hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
