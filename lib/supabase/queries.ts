import { supabaseAdmin } from './server'
import type { Course } from '../../types/course'

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('id,title,progress,icon_name,created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []) as Course[]
}
