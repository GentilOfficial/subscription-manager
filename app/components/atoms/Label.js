"use client";

import React from 'react';

export default function Label({ children, className = '', ...props }) {
  return (
    <label
      className={`block text-sm font-bold tracking-wide text-app-text-muted mb-2 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
