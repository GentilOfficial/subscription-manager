"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useAuthStore } from "../stores/auth";

function AuthInitializer() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return null;
}

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthInitializer />
      {children}
    </ThemeProvider>
  );
}
