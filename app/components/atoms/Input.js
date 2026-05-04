"use client";

import React, { forwardRef } from 'react';

const sizes = {
  md: "px-5 py-4 rounded-2xl text-base focus:ring-2 focus:ring-primary font-medium",
  lg: "px-6 py-5 rounded-[2rem] focus:ring-4 focus:ring-primary/20 font-bold shadow-inner"
};

const variants = {
  default: "bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10",
  elevated: "bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10",
  bgInput: "bg-app-bg dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 shadow-inner"
};

const Input = forwardRef(({
  className = '',
  size = 'md',
  variant = 'default',
  leftIcon,
  ...props
}, ref) => {
  const baseStyles = "w-full text-app-text dark:text-app-text-dark focus:outline-none focus:border-primary transition-all placeholder:text-app-text-muted/50";
  const paddingAdjustment = leftIcon ? "pl-9 pr-5" : "";

  return (
    <div className="relative w-full">
      {leftIcon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-app-text-muted/50 font-bold">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${paddingAdjustment} ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
