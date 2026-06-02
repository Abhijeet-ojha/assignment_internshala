import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: courses } = await supabase.from('courses').select('id,title,progress')

  return (
    <ul>
      {courses?.map((c: any) => (
        <li key={c.id}>{c.title} — {c.progress}%</li>
      ))}
    </ul>
  )
}
