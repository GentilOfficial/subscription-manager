"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuthStore } from "../../stores/auth"
import ThemeToggle from "../components/ThemeToggle"
import { login } from "../config/content"
import Input from "../components/ui/Input"
import Label from "../components/ui/Label"

export default function LoginPage() {
  const router = useRouter()
  const { signIn, user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard")
    }
  }, [user, isLoading, router])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(login.defaultError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="min-h-screen flex items-center justify-center p-6 relative overflow-x-hidden bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
        <div className="relative z-10 w-full max-w-lg mb-20">
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6"
            >
              {login.brand}
            </Link>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">
              {login.heading}
            </h2>
            <p className="text-lg text-app-text-muted font-medium">
              {login.subtitle}
            </p>
          </div>
          <div className="bg-app-surface/70 dark:bg-app-surface-dark/60 backdrop-blur-3xl border border-black/5 dark:border-white/5 p-10 sm:p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="px-5 py-4 bg-accent-muted border border-accent/20 rounded-2xl text-sm font-semibold text-accent-dark dark:text-accent animate-in fade-in duration-300">
                  {error}
                </div>
              )}
              <div>
                <Label htmlFor="email" className="mb-3">
                  {login.emailLabel}
                </Label>
                <Input
                  id="email"
                  type="email"
                  size="lg"
                  variant="elevated"
                  className="shadow-inner"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={login.emailPlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="password" className="mb-3">
                  {login.passwordLabel}
                </Label>
                <Input
                  id="password"
                  type="password"
                  size="lg"
                  variant="elevated"
                  className="shadow-inner"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={login.passwordPlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-5 px-6 border border-brand-400/30 rounded-[2rem] text-lg font-bold tracking-wide text-white bg-primary hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_15px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5 shrink-0"
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
                    {login.submittingButton}
                  </>
                ) : (
                  login.submitButton
                )}
              </button>
            </form>
            <div className="flex flex-col gap-4 mt-8 relative z-10">
              <p className="text-center text-sm text-app-text-muted font-medium">
                {login.noAccount}{" "}
                <Link
                  href="/signup"
                  className="font-bold text-primary dark:text-primary-light hover:text-primary-light transition-colors"
                >
                  {login.signUpLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
