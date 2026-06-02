import Sidebar from '../../components/layout/Sidebar'
import { getCourses } from '../../lib/supabase/queries'
import CoursesContent from './CoursesContent'
import type { Course } from '../../types/course'

export const revalidate = 0

export default async function CoursesPage() {
  let courses: Course[] = []
  try {
    courses = await getCourses()
  } catch (_) {}

  return (
    <main id="content" className="min-h-screen flex bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">
        <CoursesContent courses={courses} />
      </div>
    </main>
  )
}
