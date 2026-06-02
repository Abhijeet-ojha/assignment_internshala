import { createClient } from '@supabase/supabase-js'

// Support both NEXT_PUBLIC and non-prefixed env names for flexibility
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || // anon key works for dev without RLS
  ''

if (!url) {
  throw new Error('Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL in your environment.')
}

if (!key) {
  throw new Error('Missing Supabase key. Set SUPABASE_SERVICE_ROLE_KEY (recommended for server) or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / SUPABASE_ANON_KEY for development.')
}

export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false }
})
