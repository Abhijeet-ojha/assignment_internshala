"use client"

import { motion } from 'framer-motion'
import { BookOpen, Code, Brain, Rocket, BarChart2, type LucideIcon } from 'lucide-react'
import type { Course } from '../../types/course'

// ── Lucide icon map (matches seed.js icon_name values) ────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Brain,
  Rocket,
  BarChart: BarChart2,
  BarChart2,
}

// Subtle SVG grain texture data URI
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

type Props = { course?: Course }

export default function CourseCard({ course }: Props) {
  // Skeleton
  if (!course) {
    return (
      <div className="bento-card rounded-xl p-6 flex flex-col animate-pulse" aria-hidden>
        <div className="w-10 h-10 rounded-lg bg-surface-container-high mb-4" />
        <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2" />
        <div className="mt-auto h-1 bg-surface-container-high rounded-full w-full" />
      </div>
    )
  }

  const Icon = ICON_MAP[course.icon_name] ?? BookOpen

  return (
    <motion.article
      layout
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      tabIndex={0}
      aria-labelledby={`course-${course.id}-title`}
      className="relative bento-card rounded-xl p-6 flex flex-col cursor-pointer group overflow-visible"
      style={{ willChange: 'transform' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
        aria-hidden
      />

      {/* Subtle top-left gradient mesh */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(78,222,163,0.05) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      {/* Border glow on hover — opacity only, no layout shift */}
      <motion.div
        className="absolute inset-0 rounded-xl ring-1 ring-primary/30 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      />

      {/* Icon */}
      <div className="relative w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center mb-4 flex-shrink-0">
        <Icon
          size={18}
          className="text-on-surface-variant group-hover:text-primary transition-colors"
          aria-hidden
        />
      </div>

      {/* Title */}
      <h3
        id={`course-${course.id}-title`}
        className="relative font-body-md text-body-md font-semibold text-on-surface leading-snug line-clamp-2 mb-auto"
      >
        {course.title}
      </h3>

      {/* Progress */}
      <div className="relative mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
            Progress
          </span>
          <span className="font-mono text-[11px] text-on-surface">{course.progress}%</span>
        </div>
        <div
          className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={course.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ type: 'tween', duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-full bg-primary rounded-full origin-left"
            style={{ transformOrigin: '0 50%' }}
          />
        </div>
      </div>
    </motion.article>
  )
}
