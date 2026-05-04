"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { theme as content } from '@/app/config/content'
import Skeleton from '@/app/components/atoms/Skeleton'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Skeleton className="w-9 h-9 rounded-xl" />
    )
  }

  const nextTheme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="p-2 bg-app-bg dark:bg-app-surface-dark text-app-text-muted rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
      aria-label={content.toggleLabel}
      title={content.switchMode(nextTheme)}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : theme === "system" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Monitor className="w-5 h-5" />
      )}
    </button>
  )
}
