'use server'

import { createSupabaseServerClient } from '../../lib/supabase/server-auth'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function deleteAccount() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Attempt hard-delete via service role key (requires SUPABASE_SERVICE_ROLE_KEY in .env.local)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey) {
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { persistSession: false } }
    )
    await adminClient.auth.admin.deleteUser(user.id)
  }

  // Always sign out regardless
  await supabase.auth.signOut()
  redirect('/login')
}
