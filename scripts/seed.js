// Node-based seeder that uses Supabase client and .env.local
// Usage: npm run seed
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  console.error('Missing Supabase URL or key. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (recommended) or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

async function seed() {
  try {
    const rows = [
      { title: 'Advanced React Patterns', progress: 72, icon_name: 'Code' },
      { title: 'TypeScript Mastery', progress: 48, icon_name: 'BookOpen' },
      { title: 'System Design Basics', progress: 20, icon_name: 'Brain' },
      { title: 'Next.js Performance', progress: 94, icon_name: 'Rocket' },
    ]

    // Attempt bulk insert; if table doesn't exist this will error.
    const { data, error } = await supabase.from('courses').insert(rows).select()
    if (error) {
      console.error('Insert error:', error.message || error)
      console.error('If the `courses` table does not exist yet, run db/seed.sql via Supabase SQL Editor or psql.')
      process.exit(1)
    }

    console.log('Seed completed. Inserted rows:')
    console.table(data)
  } catch (err) {
    console.error('Unexpected error while seeding:', err)
    process.exit(1)
  }
}

seed()
