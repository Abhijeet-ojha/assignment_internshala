import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Supabase auth code-exchange callback.
 * IMPORTANT: Must create the redirect response FIRST, then attach cookies to it,
 * so that exchangeCodeForSession's session cookies actually travel with the redirect.
 */
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const code  = searchParams.get('code')
  const error = searchParams.get('error')
  const next  = searchParams.get('next') ?? '/dashboard'

  // Supabase sent an error directly (e.g. expired link)
  if (error) {
    const desc = searchParams.get('error_description') ?? 'Link expired or invalid'
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback_failed&desc=${encodeURIComponent(desc)}`
    )
  }

  if (code) {
    // Create the response BEFORE calling exchangeCodeForSession so we can
    // attach the session cookies to the same response object.
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            // Write each cookie directly onto the redirect response
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return response // Session cookies are now attached ✓
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
