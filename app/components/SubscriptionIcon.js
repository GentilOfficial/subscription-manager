"use client";

import { useEffect, useState } from "react";

export default function SubscriptionIcon({ name, color, className = "w-12 h-12 rounded-xl text-lg shrink-0" }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgFailed(false);
    setIsLoading(true);
  }, [name]);

  const getDomainFrom = (subName) => {
    if (!subName) return "";
    let domain = subName.toLowerCase().trim();
    
    domain = domain.replace(/\s+(premium|plus|pro|plan|family|cloud|app|subscription|service)/g, '');
    
    if (domain.includes('.') && !domain.includes(' ')) {
      return domain;
    }
    
    domain = domain.replace(/[^a-z0-9]/g, '');
    
    return `${domain}.com`;
  };

  const domain = getDomainFrom(name);

  if (imgFailed || !name || !domain) {
    return (
      <div className={`flex items-center justify-center text-white font-bold border border-slate-100 dark:border-white/10 shadow-inner ${color} ${className}`}>
        {name ? name[0].toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center bg-app-surface dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 overflow-hidden shadow-inner p-1.5 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/5 bg-app-surface dark:bg-app-surface-dark z-10">
          <div className="w-1/2 h-1/2 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}
      <img
        src={`/api/favicon?domain=${domain}`}
        alt={`${name} logo`}
        className={`w-full h-full object-contain rounded-sm transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgFailed(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}


