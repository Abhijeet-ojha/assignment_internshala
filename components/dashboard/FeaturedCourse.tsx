"use client"

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import type { Course } from '../../types/course'

type Props = { course: Course }

export default function FeaturedCourse({ course }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(course.progress)))
  const remaining = 100 - pct
  const hoursLeft = Math.max(1, Math.round((remaining / 100) * 8))

  // SVG ring math: r=46, circumference = 2π×46 ≈ 289
  const circumference = 289
  const targetOffset = circumference * (1 - pct / 100)

  // Animated counter: 0 → pct
  const count = useMotionValue(0)
  const displayPct = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    const ctrl = animate(count, pct, {
      type: 'tween',
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    })
    return ctrl.stop
  }, [pct, count])

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bento-card rounded-xl p-md flex flex-col items-center justify-center text-center h-full overflow-visible"
      aria-labelledby={`featured-${course.id}`}
    >
      {/* Label */}
      <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase absolute top-6 left-6">
        Featured Course
      </span>

      {/* SVG Ring */}
      <div className="relative w-48 h-48 my-8">
        {/* -rotate-90 so the ring starts at 12 o'clock */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          aria-label={`${pct}% complete`}
          role="img"
        >
          {/* Track */}
          <circle
            className="stroke-current text-surface-container-high"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeWidth="4"
          />
          {/* Animated progress arc */}
          <motion.circle
            className="stroke-current text-primary-container"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ type: 'tween', duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text — counter animates from 0 → pct */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display-lg text-display-lg text-on-surface leading-none">
            <motion.span>{displayPct}</motion.span>
            <span className="text-2xl">%</span>
          </span>
          <span className="font-mono text-[11px] tracking-widest text-primary mt-1 uppercase">
            Complete
          </span>
        </div>
      </div>

      {/* Title & remaining */}
      <h3
        id={`featured-${course.id}`}
        className="font-metric-md text-metric-md text-on-surface mb-1 leading-snug"
      >
        {course.title}
      </h3>
      <p className="font-mono text-[12px] tracking-wide text-on-surface-variant">
        {hoursLeft} {hoursLeft === 1 ? 'Hour' : 'Hours'} Remaining
      </p>
    </motion.article>
  )
}
