"use client";

import Spinner from '@/app/components/atoms/Spinner';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SubscriptionIcon({ name, color, className = "w-12 h-12 rounded-2xl text-lg shrink-0", imgRoundedClassName = "rounded-2xl" }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgFailed(false);
    setIsLoading(true);
  }, [name]);

  if (imgFailed || !name) {
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
          <Spinner size="md" className="text-primary/50 w-1/2 h-1/2" />
        </div>
      )}
      <Image
        key={name}
        src={`/api/favicon?name=${encodeURIComponent(name)}`}
        alt={`${name} logo`}
        fill
        unoptimized
        className={`object-contain p-1.5 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${imgRoundedClassName}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgFailed(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
