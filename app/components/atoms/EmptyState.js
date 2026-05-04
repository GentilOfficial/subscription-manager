import React from 'react';

export default function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-app-surface/50 dark:bg-white/5 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-[2.5rem] ${className}`}>
      {Icon && (
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-app-bg dark:bg-app-surface-dark text-app-text-muted dark:text-app-text-dark/50">
          <Icon className="w-8 h-8" />
        </div>
      )}
      {title && <h3 className="text-xl font-bold text-app-text dark:text-app-text-dark mb-2">{title}</h3>}
      {description && <p className="text-app-text-muted mb-6 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
