"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { ToastProvider } from "@/app/context/ToastContext";
import ToastContainer from "@/app/components/ui/ToastContainer";
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
    <ToastProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthInitializer />
        {children}
        <ToastContainer />
      </ThemeProvider>
    </ToastProvider>
  );
}
