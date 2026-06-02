"use client"

import { motion } from 'framer-motion'

type ActiveCourse = { title: string; progress: number }

type Props = {
  userName?: string
  streak?: number
  weeklyGoal?: number
  hoursThisWeek?: number
  activeCourse?: ActiveCourse
}

export default function HeroCard({
  userName,
  streak = 12,
  weeklyGoal = 5,
  hoursThisWeek = 3.2,
  activeCourse = { title: 'Next.js Performance Optimization', progress: 94 },
}: Props) {
  // Derive a friendly display name: use part before '@' if it looks like an email
  const displayName = userName
    ? (userName.includes('@') ? userName.split('@')[0] : userName)
    : 'there'
  const weeklyPct = Math.round(Math.min(100, (hoursThisWeek / Math.max(0.001, weeklyGoal)) * 100))

  return (
    <motion.div
      role="region"
      aria-label="Welcome overview"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bento-card rounded-xl p-md flex flex-col justify-between min-h-[300px] overflow-visible"
    >
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs leading-tight">
          Welcome back, <span className="text-primary capitalize">{displayName}</span> 👋
        </h2>
        <p className="font-mono text-[12px] tracking-widest text-on-surface-variant uppercase">
          Learning Overview
        </p>
      </div>

      {/* Metric chips */}
      <div className="grid grid-cols-3 gap-4 my-md">
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase block mb-2">
            Streak
          </span>
          <span className="font-metric-md text-metric-md text-on-surface">
            {streak} Days
          </span>
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase block mb-2">
            Weekly Goal
          </span>
          <span className="font-metric-md text-metric-md text-on-surface">
            {weeklyPct}%
          </span>
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase block mb-2">
            Time Spent
          </span>
          <span className="font-metric-md text-metric-md text-on-surface">
            {hoursThisWeek} Hrs
          </span>
        </div>
      </div>

      {/* Current focus */}
      <div className="mt-auto border-t border-outline-variant pt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
            Current Focus
          </span>
          <p className="font-body-md text-body-md text-primary font-medium mt-1 truncate">
            {activeCourse.title}
          </p>
        </div>
        <button className="flex-shrink-0 bg-primary-container text-on-primary-container px-6 py-2 rounded font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-primary hover:text-on-primary transition-colors">
          Resume
        </button>
      </div>
    </motion.div>
  )
}
