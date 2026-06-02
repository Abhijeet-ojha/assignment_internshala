"use client"

import { motion } from 'framer-motion'

type Props = { value: number; size?: 'sm' | 'md' }

export default function ProgressBar({ value, size = 'sm' }: Props) {
  const trackClass = size === 'md' ? 'h-1.5' : 'h-1'

  return (
    <div
      className={`w-full bg-surface-container-high ${trackClass} rounded-full overflow-hidden`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label={`Progress ${value}%`}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
        className="origin-left h-full rounded-full bg-primary"
        style={{ transformOrigin: '0 50%' }}
      />
      <span className="sr-only">{value}% complete</span>
    </div>
  )
}
