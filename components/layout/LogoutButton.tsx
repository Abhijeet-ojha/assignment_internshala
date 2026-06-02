"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Zap } from 'lucide-react'
import { signOut } from '../../app/auth/actions'

export default function LogoutButton({ expanded }: { expanded: boolean }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Let animation play for 1.4s before the server action navigates away
    await new Promise((r) => setTimeout(r, 1400))
    await signOut()
  }

  return (
    <>
      {/* ── Button ─────────────────────────────────────────── */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Sign out"
        className="w-full flex items-center gap-4 px-3 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors disabled:opacity-60"
      >
        <motion.div
          animate={isLoggingOut ? { rotate: [0, -15, 15, -10, 0] } : {}}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <LogOut size={20} className="flex-shrink-0" aria-hidden strokeWidth={1.75} />
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="font-mono text-[12px] tracking-widest whitespace-nowrap uppercase"
            >
              {isLoggingOut ? 'Signing out…' : 'Logout'}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Full-screen logout overlay ──────────────────────── */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            key="logout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
            aria-live="assertive"
            aria-label="Signing out"
          >
            {/* Outer glow ring — pulses */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.15, 1], opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full bg-primary/30 blur-2xl"
            />

            {/* Middle glow ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 0.8], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="absolute w-24 h-24 rounded-full border border-primary/40"
            />

            {/* Logo card */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
              className="relative w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(78,222,163,0.25)] mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 6, 0] }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
              >
                <Zap size={28} className="text-primary" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="font-mono text-[13px] text-on-surface-variant uppercase tracking-[0.25em] mb-1"
            >
              Lumina
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-widest"
            >
              Signing out…
            </motion.p>

            {/* Progress bar at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: 'easeInOut', delay: 0.15 }}
              style={{ width: '100%', transformOrigin: '0 50%' }}
            />

            {/* Corner decoration dots */}
            {[
              'top-6 left-6',
              'top-6 right-6',
              'bottom-6 left-6',
              'bottom-6 right-6',
            ].map((pos, i) => (
              <motion.div
                key={pos}
                className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-primary/40`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 300 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
