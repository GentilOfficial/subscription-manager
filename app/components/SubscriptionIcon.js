"use client";

import { useState } from "react";

export default function SubscriptionIcon({ name, color, className = "w-12 h-12 rounded-xl text-lg shrink-0" }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Attempt to build a clean domain name
  const getDomainFrom = (subName) => {
    let domain = subName.toLowerCase().trim();
    domain = domain.replace(/\s+(premium|plus|pro|plan|family|cloud|app)/g, '');
    domain = domain.replace(/\s+/g, '');
    return `${domain}.com`;
  };

  if (imgFailed || !name) {
    return (
      <div className={`flex items-center justify-center text-white font-bold border border-slate-100 dark:border-white/10 shadow-inner ${color} ${className}`}>
        {name ? name[0].toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 overflow-hidden shadow-inner p-1.5 ${className}`}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${getDomainFrom(name)}&sz=128`}
        alt={`${name} logo`}
        className="w-full h-full object-contain rounded-sm"
        onError={() => setImgFailed(true)}
      />
    </div>
  );
}
