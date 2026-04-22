"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "../../stores/auth"
import ThemeToggle from "../components/ThemeToggle"
import { navbar } from "../config/content"

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
        <svg
          className="w-5 h-5 sm:w-4 sm:h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        <span className="hidden lg:block">{navbar.logout}</span>
      </button>
    </div>
  )
}

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-bg dark:bg-app-bg-dark">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
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
            className="group flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight rounded-full text-app-text-muted dark:text-app-text-dark/70 hover:text-app-text dark:hover:text-app-text-dark hover:bg-app-bg dark:hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5 md:mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="hidden md:inline">{navbar.links.overview}</span>
          </Link>

          <Link
            href="/dashboard/subscriptions"
            className="group flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight rounded-full text-app-text-muted dark:text-app-text-dark/70 hover:text-app-text dark:hover:text-app-text-dark hover:bg-app-bg dark:hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5 md:mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="hidden md:inline">
              {navbar.links.subscriptions}
            </span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="group flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight rounded-full text-app-text-muted dark:text-app-text-dark/70 hover:text-app-text dark:hover:text-app-text-dark hover:bg-app-bg dark:hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5 md:mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
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
