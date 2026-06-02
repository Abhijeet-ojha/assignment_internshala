"use client"

import { motion } from 'framer-motion'
import type { Course } from '../../types/course'
import HeroCard from './HeroCard'
import FeaturedCourse from './FeaturedCourse'
import ActivityCard from './ActivityCard'
import CourseCard from './CourseCard'

// ── Stagger variants ──────────────────────────────────────────────────────
const CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const TILE = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
  },
}

type Props = {
  courses: Course[]
  activityData: number[]
  userName?: string
}

export default function DashboardGrid({ courses, activityData, userName }: Props) {
  const featured =
    courses.length > 0
      ? courses.reduce((a, b) => (a.progress >= b.progress ? a : b), courses[0])
      : null
  const others = featured ? courses.filter((c) => c.id !== featured.id) : courses

  return (
    <motion.div
      variants={CONTAINER}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter"
    >
      {/* Hero — 8 cols */}
      <motion.div variants={TILE} className="lg:col-span-8">
        <HeroCard
          userName={userName}
          activeCourse={
            featured
              ? { title: featured.title, progress: featured.progress }
              : undefined
          }
        />
      </motion.div>

      {/* Featured course — 4 cols */}
      {featured && (
        <motion.div variants={TILE} className="lg:col-span-4">
          <FeaturedCourse course={featured} />
        </motion.div>
      )}

      {/* Activity heatmap — full width */}
      <motion.div variants={TILE} className="lg:col-span-12">
        <ActivityCard data={activityData} />
      </motion.div>

      {/* Course cards — 3-up row */}
      {others.length > 0 && (
        <motion.div
          variants={TILE}
          className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-gutter"
        >
          {others.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      )}

      {/* Overflow row */}
      {others.length > 3 && (
        <motion.div
          variants={TILE}
          className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-gutter"
        >
          {others.slice(3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
