"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, AlertTriangle } from 'lucide-react'
import { deleteAccount } from '../../app/auth/actions'

export default function DeleteAccountButton() {
  const [phase, setPhase] = useState<'idle' | 'confirm' | 'deleting'>('idle')

  const handleClick = () => {
    if (phase === 'idle') {
      setPhase('confirm')
      return
    }
  }

  const handleConfirm = async () => {
    setPhase('deleting')
    await new Promise((r) => setTimeout(r, 1600))
    await deleteAccount()
  }

  const handleCancel = () => setPhase('idle')

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            className="font-mono text-[11px] text-on-surface-variant hover:text-error uppercase tracking-widest transition-colors"
          >
            Delete Account
          </motion.button>
        )}

        {phase === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[11px] text-error uppercase tracking-widest">
              Are you sure?
            </span>
            <button
              onClick={handleConfirm}
              className="font-mono text-[11px] bg-error/15 text-error border border-error/30 px-3 py-1.5 rounded-lg hover:bg-error/25 transition-colors uppercase tracking-widest"
            >
              Yes, delete
            </button>
            <button
              onClick={handleCancel}
              className="font-mono text-[11px] text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-screen deletion overlay ───────────────────── */}
      <AnimatePresence>
        {phase === 'deleting' && (
          <motion.div
            key="delete-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
            aria-live="assertive"
            aria-label="Deleting account"
          >
            {/* Outer pulse ring — red */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.35, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full bg-red-500/20 blur-2xl"
            />

            {/* Middle ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 0.8], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute w-24 h-24 rounded-full border border-red-500/30"
            />

            {/* Icon card — red themed */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
              className="relative w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.2)] mb-8"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -5, 0] }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
              >
                <Trash2 size={26} className="text-red-400" />
              </motion.div>
            </motion.div>

            {/* Warning icon that fades in after icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.25 }}
              className="absolute top-1/3 -translate-y-12"
            >
              <AlertTriangle size={14} className="text-red-500/40" />
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="font-mono text-[13px] text-red-400/80 uppercase tracking-[0.25em] mb-1"
            >
              Deleting Account
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="font-mono text-[11px] text-on-surface-variant/40 uppercase tracking-widest"
            >
              This cannot be undone…
            </motion.p>

            {/* Red progress bar at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-red-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ width: '100%', transformOrigin: '0 50%' }}
            />

            {/* Corner dots — red */}
            {[
              'top-6 left-6',
              'top-6 right-6',
              'bottom-6 left-6',
              'bottom-6 right-6',
            ].map((pos, i) => (
              <motion.div
                key={pos}
                className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-red-500/40`}
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
