"use client"

import { motion } from 'framer-motion'

/**
 * Animated progress bar — shared smooth easeOutExpo transition.
 * Use this in Server Components (analytics page etc.) since the
 * animation requires a client boundary.
 */
export default function AnimatedBar({
  value,
  delay = 0,
}: {
  value: number
  delay?: number
}) {
  return (
    <div
      className="h-1.5 bg-surface-container-high rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ type: 'tween', duration: 1.5, ease: [0.16, 1, 0.3, 1], delay }}
        className="h-full bg-primary rounded-full"
        style={{ transformOrigin: '0 50%' }}
      />
    </div>
  )
}
