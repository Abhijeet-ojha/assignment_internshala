import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '../lib/supabase/server-auth'

export default async function RootPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Authenticated → go to dashboard; unauthenticated → go to login
  if (user) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}
