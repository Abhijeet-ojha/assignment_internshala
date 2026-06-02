"use client"

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Loader2 } from 'lucide-react'

type Mode = 'signin' | 'signup'

// ── Inner form — uses useSearchParams, must be inside <Suspense> ──────────
function LoginForm() {
  const params  = useSearchParams()

  const [mode,    setMode]    = useState<Mode>('signin')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState(
    params.get('error') ? 'Authentication failed. Please try again.' : ''
  )
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const supabase = createSupabaseBrowserClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
        if (error) throw error
        window.location.href = '/dashboard'   // full reload — middleware sees cookie
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
        if (error) throw error

        if (data.session) {
          window.location.href = '/dashboard'
        } else if (data.user && (data.user.identities?.length ?? 0) === 0) {
          // Ghost duplicate — user exists; try signing in with same creds
          const { error: siErr } = await supabase.auth.signInWithPassword({ email, password: pass })
          if (siErr) {
            setError('Account already exists — use the Sign In tab.')
          } else {
            window.location.href = '/dashboard'
          }
        } else if (!data.session && data.user) {
          // Created but no session — auto sign-in fallback
          const { error: siErr } = await supabase.auth.signInWithPassword({ email, password: pass })
          if (siErr) {
            setSuccess('Account created! Check your email to confirm, then sign in.')
          } else {
            window.location.href = '/dashboard'
          }
        } else {
          setSuccess('Check your email for a confirmation link.')
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)   // only reset loading on error; on success we're navigating away
    }
  }


  return (
    <div className="bento-card rounded-2xl p-8">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant mb-8">
        {(['signin', 'signup'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(''); setSuccess('') }}
            className={`flex-1 py-2 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-colors ${
              mode === m
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {m === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            required
            minLength={6}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          />
          {mode === 'signup' && (
            <span className="font-mono text-[10px] text-on-surface-variant">
              Minimum 6 characters
            </span>
          )}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="font-mono text-[11px] text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !email || !pass}
          className="mt-2 w-full py-3 rounded-xl bg-primary text-on-primary font-mono text-[12px] uppercase tracking-widest font-bold transition-all hover:bg-primary-fixed disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
            </>
          ) : mode === 'signin' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  )
}

// ── Outer page — wraps LoginForm in Suspense ──────────────────────────────
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="w-full max-w-sm"
      >
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(78,222,163,0.3)]">
            <Zap size={20} className="text-on-primary" fill="currentColor" aria-hidden />
          </div>
          <h1 className="text-lg font-bold text-on-surface tracking-tight">Lumina</h1>
          <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
            Learning Platform
          </p>
        </div>

        {/* Suspense required because LoginForm uses useSearchParams() */}
        <Suspense
          fallback={
            <div className="bento-card rounded-2xl p-8 animate-pulse">
              <div className="h-10 bg-surface-container-high rounded-xl mb-8" />
              <div className="flex flex-col gap-4">
                <div className="h-12 bg-surface-container-high rounded-lg" />
                <div className="h-12 bg-surface-container-high rounded-lg" />
                <div className="h-12 bg-primary/20 rounded-xl mt-2" />
              </div>
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="font-mono text-[10px] text-on-surface-variant text-center mt-6 uppercase tracking-widest">
          Lumina · Learning Platform
        </p>
      </motion.div>
    </main>
  )
}
