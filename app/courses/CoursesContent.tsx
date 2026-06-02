"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Course } from '../../types/course'
import type { LucideIcon } from 'lucide-react'
import {
  Bell, User, Search, Clock, History, SearchX,
  GraduationCap, TrendingUp,
  BookOpen, Code2, Brain, Rocket, BarChart2,
} from 'lucide-react'

// ── Helpers ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Code:     Code2,
  Brain,
  Rocket,
  BarChart: BarChart2,
  BarChart2,
}

const LAST_ACTIVE = [
  'Today', 'Yesterday', '2 days ago', '3 days ago', '5 days ago', '1 week ago',
]

/** Hours remaining based on progress (12 h per course total) */
function hoursLeft(progress: number): number {
  return Math.max(1, Math.round(((100 - progress) / 100) * 12))
}

type SortKey = 'progress-desc' | 'progress-asc' | 'name'

// ── Component ──────────────────────────────────────────────────────────────
export default function CoursesContent({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState<SortKey>('progress-desc')

  // Derived stats
  const total    = courses.length
  const avgPct   = total > 0 ? Math.round(courses.reduce((s, c) => s + c.progress, 0) / total) : 0
  const totalHrs = courses.reduce((s, c) => s + hoursLeft(c.progress), 0)

  // Filter + sort
  const visible = [...courses]
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === 'progress-desc' ? b.progress - a.progress :
      sort === 'progress-asc'  ? a.progress - b.progress :
      a.title.localeCompare(b.title)
    )

  const STATS: { label: string; value: string; Icon: LucideIcon; sub: string }[] = [
    { label: 'Total Courses',    value: String(total),  Icon: GraduationCap, sub: 'enrolled'                                                    },
    { label: 'Average Progress', value: `${avgPct}%`,   Icon: TrendingUp,    sub: `${courses.filter(c => c.progress >= 100).length} completed`    },
    { label: 'Hours Remaining',  value: `${totalHrs}h`, Icon: Clock,         sub: 'est. to finish all'                                            },
  ]

  return (
    <>
      {/* ── Sticky top bar ─────────────────────────────── */}
      <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant sticky top-0 bg-[#0A0A0A] z-40">
        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant"
          />
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">
            <Bell size={20} aria-hidden />
          </button>
          <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
            <User size={18} className="text-primary" aria-hidden />
          </div>
        </div>
      </header>

      {/* ── Canvas ─────────────────────────────────────── */}
      <div className="p-margin flex flex-col gap-gutter max-w-7xl mx-auto">

        {/* Page heading */}
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mb-1">
            Courses
          </h1>
          <p className="text-on-surface-variant text-sm">
            Track your active learning paths and progress.
          </p>
        </div>

        {/* ── Stats strip ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
          {STATS.map((s) => (
            <div key={s.label} className="bento-card rounded-xl p-md flex flex-col gap-3">
              <s.Icon size={22} className="text-primary" aria-hidden />
              <div>
                <div className="text-2xl font-bold text-on-surface leading-tight">{s.value}</div>
                <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">{s.label}</div>
                <div className="font-mono text-[10px] text-on-surface-variant/60 mt-0.5">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Sort row ────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
            {visible.length} {visible.length === 1 ? 'Course' : 'Courses'}
          </span>
          <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant">
            {([
              ['progress-desc', 'Highest First'],
              ['progress-asc',  'Lowest First' ],
              ['name',          'A → Z'        ],
            ] as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-3 py-1 rounded font-mono text-[10px] tracking-widest uppercase transition-colors ${
                  sort === key
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Course cards grid ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {visible.map((course, i) => {
            const CourseIcon = ICON_MAP[course.icon_name] ?? BookOpen
            const hours    = hoursLeft(course.progress)
            const lastSeen = LAST_ACTIVE[i % LAST_ACTIVE.length]
            const isDone   = course.progress >= 100

            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: i * 0.05 }}
                tabIndex={0}
                className="bento-card rounded-xl p-md flex flex-col gap-4 cursor-pointer group focus-visible:border-primary"
                aria-labelledby={`course-${course.id}-title`}
              >
                {/* Icon + title row */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CourseIcon size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden />
                  </div>
                  <h2
                    id={`course-${course.id}-title`}
                    className="font-body-md text-body-md font-semibold text-on-surface leading-snug line-clamp-2"
                  >
                    {course.title}
                  </h2>
                </div>

                {/* Progress label + bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                      {isDone ? '✓ Complete' : `${course.progress}% Complete`}
                    </span>
                    <span className={`font-mono text-[12px] font-bold ${isDone ? 'text-primary' : 'text-on-surface'}`}>
                      {course.progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 bg-surface-container-high rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: course.progress / 100 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 + i * 0.05 }}
                      className={`h-full rounded-full origin-left ${isDone ? 'bg-primary' : 'bg-primary'}`}
                      style={{ transformOrigin: '0 50%' }}
                    />
                  </div>
                </div>

                {/* Footer: hours + last active */}
                <div className="flex items-center justify-between pt-1 border-t border-outline-variant">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-on-surface-variant" aria-hidden />
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {isDone ? 'Finished' : `${hours}h remaining`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <History size={14} className="text-on-surface-variant" aria-hidden />
                    <span className="font-mono text-[10px] text-on-surface-variant">{lastSeen}</span>
                  </div>
                </div>
              </motion.article>
            )
          })}

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="col-span-full bento-card rounded-xl flex flex-col items-center justify-center py-20 text-center gap-3">
              <SearchX size={36} className="text-on-surface-variant" aria-hidden />
              <div>
                <p className="text-on-surface font-medium">No courses found</p>
                <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">
                  Try a different search term
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  )
}
