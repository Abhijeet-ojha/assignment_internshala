import Sidebar from '../../components/layout/Sidebar'
import DashboardGrid from '../../components/dashboard/DashboardGrid'
import { getCourses } from '../../lib/supabase/queries'
import { createSupabaseServerClient } from '../../lib/supabase/server-auth'
import type { Course } from '../../types/course'
import { Bell } from 'lucide-react'

export const revalidate = 0

export default async function DashboardPage() {
  let courses: Course[] = []
  let userEmail = 'Student'

  try {
    courses = await getCourses()
  } catch (_) {}

  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) userEmail = user.email
  } catch (_) {}

  const activityData: number[] = Array.from(
    { length: 52 * 7 },
    (_, i) => (12345 + i * 17) % 100
  )

  return (
    <main id="content" className="min-h-screen flex bg-[#0A0A0A]">
      <Sidebar />

      <div className="flex-1 md:ml-16 p-margin flex flex-col gap-gutter min-w-0">
        {/* Top bar */}
        <header className="flex justify-between items-center mb-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Lumina Learning
          </h1>
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full"
            >
              <Bell size={22} aria-hidden />
            </button>
            <div
              title={userEmail}
              className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center cursor-default"
            >
              <span
                className="font-mono text-[11px] text-primary font-bold uppercase"
                aria-label={`Logged in as ${userEmail}`}
              >
                {userEmail.charAt(0)}
              </span>
            </div>
          </div>
        </header>

        {/* Staggered bento grid — client component */}
        <DashboardGrid courses={courses} activityData={activityData} userName={userEmail} />
      </div>
    </main>
  )
}
