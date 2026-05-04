"use client";

import { ChevronDown } from 'lucide-react';
import React, { forwardRef } from 'react';

const Select = forwardRef(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={`w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none font-medium cursor-pointer text-center sm:text-left pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-app-text-muted">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
