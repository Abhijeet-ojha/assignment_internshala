"use client"

import { motion } from 'framer-motion'
import type { Course } from '../../types/course'

type Props = { course: Course }

export default function FeaturedCourse({ course }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(course.progress)))
  const remaining = 100 - pct
  const hoursLeft = Math.max(1, Math.round((remaining / 100) * 8))

  // SVG ring math: r=46, circumference = 2π×46 ≈ 289
  const circumference = 289
  const strokeDashoffset = circumference * (1 - pct / 100)

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
        <svg className="w-full h-full" viewBox="0 0 100 100" aria-label={`${pct}% complete`} role="img">
          {/* Track */}
          <circle
            className="stroke-current text-surface-container-high"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            className="stroke-current text-primary-container progress-ring__circle"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display-lg text-display-lg text-on-surface leading-none">
            {pct}<span className="text-2xl">%</span>
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
