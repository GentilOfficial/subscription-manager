"use client"

import { LayoutDashboard, List, LogOut, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/app/components/molecules/ThemeToggle'
import Spinner from '@/app/components/atoms/Spinner'
import { navbar } from '@/app/config/content'

function LogoutButton() {
  const router = useRouter()
  const { signOut, user } = useAuthStore()

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <div className="flex items-center gap-1">
      {user?.email && (
        <span className="hidden lg:block text-xs font-semibold text-app-text-muted dark:text-app-text-dark/50 max-w-[140px] truncate px-2">
          {user.email}
        </span>
      )}
      <button
        onClick={handleLogout}
        title="Sign out"
        className="flex items-center justify-center sm:gap-1.5 p-2 sm:px-3 sm:py-2 text-sm font-bold tracking-wide rounded-full text-app-text-muted dark:text-app-text-dark/70 hover:text-accent-dark dark:hover:text-accent hover:bg-accent-muted transition-all active:scale-95"
      >
        <LogOut className="w-5 h-5 sm:w-4 sm:h-4" />
        <span className="hidden lg:block">{navbar.logout}</span>
      </button>
    </div>
  )
}

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  const getLinkClass = (path) => {
    const isActive = pathname === path
    const baseClass = "group flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight rounded-full transition-all active:scale-95 whitespace-nowrap"
    const activeClass = "bg-app-text text-app-bg dark:bg-app-text-dark dark:text-app-bg-dark shadow-md"
    const inactiveClass = "text-app-text-muted dark:text-app-text-dark/70 hover:text-app-text dark:hover:text-app-text-dark hover:bg-app-bg dark:hover:bg-white/10"
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-bg dark:bg-app-bg-dark">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" className="text-primary" />
          <p className="text-sm font-semibold text-app-text-muted">
            {navbar.loading}
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark font-sans selection:bg-primary-muted selection:text-primary">
      <div className="fixed top-4 md:top-6 left-0 right-0 z-[60] flex justify-center px-2 sm:px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 bg-app-surface/70 dark:bg-app-surface-dark/70 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-full overflow-hidden">
          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 ml-0.5 mr-1 shrink-0 transition-transform active:scale-95"
          >
            <Image
              src="/icon.svg"
              alt={navbar.logoLabel}
              width={1024}
              height={1024}
              className="w-full h-full rounded-full"
              priority
            />
          </Link>

          <div className="w-px h-6 bg-app-text-muted/10 dark:bg-white/10 mx-0.5" />

          <Link
            href="/dashboard"
            className={getLinkClass("/dashboard")}
          >
            <LayoutDashboard className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">{navbar.links.overview}</span>
          </Link>

          <Link
            href="/dashboard/subscriptions"
            className={getLinkClass("/dashboard/subscriptions")}
          >
            <List className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">
              {navbar.links.subscriptions}
            </span>
          </Link>

          <Link
            href="/dashboard/settings"
            className={getLinkClass("/dashboard/settings")}
          >
            <Settings className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">
              {navbar.links.settings}
            </span>
          </Link>

          <div className="w-px h-6 bg-app-text-muted/10 dark:bg-white/10 mx-0.5" />

          <div className="flex items-center gap-1 sm:gap-2 mr-0.5">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </nav>
      </div>

      <main className="flex-1 w-full pt-32 pb-16 px-4 md:px-8 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
