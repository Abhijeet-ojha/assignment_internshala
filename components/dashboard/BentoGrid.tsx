import type { Course } from '../../types/course'

export default function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-3">
        {/* Hero handled separately in page but keep tile-size */}
      </div>

      {courses.map((course) => (
        <div key={course.id} className="h-36">
          {/* Client CourseCard will be used by page directly if needed; keeping structure for RSC */}
          {/* To avoid forcing client here, consumer can render CourseCard per item */}
        </div>
      ))}
    </div>
  )
}
