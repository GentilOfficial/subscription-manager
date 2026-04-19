"use client";

import { useEffect, useRef, useState } from "react";

export default function SubscriptionIcon({ name, color, className = "w-12 h-12 rounded-2xl text-lg shrink-0" }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgFailed(false);
    setIsLoading(true);

    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
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
          <div className="w-1/2 h-1/2 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        key={name}
        src={`/api/favicon?name=${encodeURIComponent(name)}`}
        alt={`${name} logo`}
        className={`w-full h-full object-contain rounded-xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgFailed(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}


