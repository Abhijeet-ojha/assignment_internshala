import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client using @supabase/ssr.
 * Stores the session in BOTH localStorage and cookies so the middleware
 * (which reads cookies) can authenticate server-side requests.
 * Requires @supabase/ssr >= 0.6.1 (now installed).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
