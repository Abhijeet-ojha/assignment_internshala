import Sidebar from '../../components/layout/Sidebar'
import ActivityCard from '../../components/dashboard/ActivityCard'
import { getCourses } from '../../lib/supabase/queries'
import type { Course } from '../../types/course'
import type { LucideIcon } from 'lucide-react'
import {
  Bell, User,
  GraduationCap, TrendingUp, CheckCircle2, Flame,
  BookOpen, Code2, Brain, Rocket, BarChart2, Clock,
} from 'lucide-react'

export const revalidate = 0

const WEEKLY = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 0.8 },
  { day: 'Wed', hours: 2.4 },
  { day: 'Thu', hours: 1.9 },
  { day: 'Fri', hours: 3.2 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 0   },
]
const MAX_HOURS = Math.max(...WEEKLY.map((d) => d.hours))
const TOTAL_HOURS = WEEKLY.reduce((s, d) => s + d.hours, 0)
const TOTAL_SESSIONS = WEEKLY.filter((d) => d.hours > 0).length

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Code:     Code2,
  Brain,
  Rocket,
  BarChart: BarChart2,
  BarChart2,
}

const activityData = Array.from({ length: 52 * 7 }, (_, i) => (12345 + i * 17) % 100)

export default async function AnalyticsPage() {
  let courses: Course[] = []
  try {
    courses = await getCourses()
  } catch (_) {}

  const totalCourses = courses.length
  const avgProgress  = totalCourses > 0
    ? Math.round(courses.reduce((s, c) => s + c.progress, 0) / totalCourses)
    : 0
  const completed  = courses.filter((c) => c.progress >= 100).length
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length

  const stats = [
    { label: 'Enrolled',    value: String(totalCourses), Icon: GraduationCap,  color: 'text-primary'      },
    { label: 'Avg Progress',value: `${avgProgress}%`,    Icon: TrendingUp,     color: 'text-primary'      },
    { label: 'Completed',   value: String(completed),    Icon: CheckCircle2,   color: 'text-primary'      },
    { label: 'Day Streak',  value: '12',                 Icon: Flame,          color: 'text-orange-400'   },
  ]

  return (
    <main id="content" className="min-h-screen flex bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">

        {/* Top bar */}
        <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant sticky top-0 bg-[#0A0A0A] z-40">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Analytics</h1>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">
              <Bell size={20} aria-hidden />
            </button>
            <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <User size={18} className="text-primary" aria-hidden />
            </div>
          </div>
        </header>

        <div className="p-margin flex flex-col gap-gutter max-w-7xl mx-auto">

          {/* Page title */}
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mb-2">
              Your Progress
            </h2>
            <p className="text-on-surface-variant text-sm">A snapshot of your learning activity and course completion.</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {stats.map((s) => (
              <div key={s.label} className="bento-card rounded-xl p-md flex flex-col gap-3">
                <s.Icon size={24} className={s.color} aria-hidden />
                <div>
                  <div className="text-2xl font-bold text-on-surface">{s.value}</div>
                  <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity heatmap */}
          <ActivityCard data={activityData} />

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

            {/* Weekly bar chart */}
            <div className="lg:col-span-5 bento-card rounded-xl p-md flex flex-col gap-6">
              <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
                Weekly Study Hours
              </span>

              {/* Bars */}
              <div className="flex items-end justify-between gap-2 h-32">
                {WEEKLY.map((d) => {
                  const pct = MAX_HOURS > 0 ? (d.hours / MAX_HOURS) * 100 : 0
                  return (
                    <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex items-end justify-center h-24">
                        <div
                          className="w-full max-w-[28px] rounded-t-sm overflow-hidden"
                          style={{ height: `${Math.max(pct, 4)}%`, minHeight: '4px', background: 'rgba(78,222,163,0.15)' }}
                        >
                          {d.hours > 0 && (
                            <div className="w-full bg-primary rounded-t-sm" style={{ height: '100%' }} />
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase">{d.day}</span>
                    </div>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between border-t border-outline-variant pt-4">
                <div>
                  <div className="text-base font-semibold text-on-surface">{TOTAL_HOURS.toFixed(1)}h</div>
                  <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest mt-0.5">This Week</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-on-surface">{TOTAL_SESSIONS}</div>
                  <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest mt-0.5">Sessions</div>
                </div>
              </div>
            </div>

            {/* Course progress breakdown */}
            <div className="lg:col-span-7 bento-card rounded-xl p-md flex flex-col gap-4">
              <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
                Course Breakdown
              </span>

              {courses.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-8 text-center">
                  <div>
                    <BarChart2 size={32} className="text-on-surface-variant mx-auto mb-2" aria-hidden />
                    <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">No course data</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {courses.map((course) => {
                    const CourseIcon = ICON_MAP[course.icon_name] ?? BookOpen
                    return (
                      <div key={course.id} className="flex items-center gap-3">
                        <CourseIcon size={16} className="text-on-surface-variant flex-shrink-0" aria-hidden />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm text-on-surface font-medium truncate pr-3">{course.title}</span>
                            <span className="font-mono text-[11px] text-primary flex-shrink-0">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${course.progress}%`, transition: 'width 0.7s ease' }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Quick summary pills */}
              {courses.length > 0 && (
                <div className="flex gap-3 mt-2 pt-4 border-t border-outline-variant">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <CheckCircle2 size={14} className="text-primary" aria-hidden />
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{completed} Done</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant">
                    <Clock size={14} className="text-on-surface-variant" aria-hidden />
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{inProgress} Active</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
