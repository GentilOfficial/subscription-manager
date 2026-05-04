"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/app/components/molecules/ThemeToggle'
import GlassCard from '@/app/components/atoms/GlassCard'
import Input from '@/app/components/atoms/Input'
import Label from '@/app/components/atoms/Label'
import Spinner from '@/app/components/atoms/Spinner'
import { login } from '@/app/config/content'

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
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-x-hidden bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark selection:bg-primary-muted selection:text-primary">
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
          <GlassCard className="p-10 sm:p-12 animate-in slide-in-from-bottom-8 duration-700">
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
                    <Spinner size="sm" />
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
          </GlassCard>
        </div>
      </main>
    </>
  )
}
