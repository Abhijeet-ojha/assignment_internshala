# Lumina — Learning Dashboard

> **Frontend Intern Challenge** — Built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-BaaS-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple?logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## Live Demo

> 🚀 **[Add Vercel URL here after deployment]**

---

## Overview

Lumina is a high-fidelity, animated student learning dashboard built as part of a frontend internship challenge. It demonstrates:

- **Real-time data** fetched from Supabase PostgreSQL via Next.js Server Components
- **Hardware-accelerated animations** using Framer Motion with spring physics
- **Zero layout shifts** — all animations use `transform` and `opacity` only
- **Premium dark-mode UI** with a Bento Grid layout, glassmorphism cards, and subtle grain textures

---

## Features

### 📊 Dashboard
- Personalised greeting — "Welcome back, [your name] 👋" pulled from your Supabase auth session
- Daily streak, weekly goal progress, and time-spent metrics
- Featured course with animated SVG ring progress indicator
- GitHub-style activity heatmap (52 × 7 grid)
- Staggered entrance animations on all Bento tiles (Framer Motion)

### 📚 Courses
- Live course list fetched from Supabase with search, sort (progress / A→Z), and filter
- Each card shows: Lucide icon (dynamic from DB), progress bar animated on mount, hours remaining, last active
- Empty state with animated feedback

### 📈 Analytics
- Stats strip: enrolled, average progress, completed, day streak — all from real DB data
- Activity heatmap reused from dashboard
- Weekly study bar chart
- Per-course progress breakdown with status pills

### ⚙️ Settings
- Profile section (avatar, name, email, username, timezone)
- Learning goals: weekly hours slider, daily reminder time
- Notification toggles (email, push, streak reminders)
- Appearance themes (Dark / Dim / AMOLED)

### 🔐 Auth
- Email + password sign-in and sign-up via Supabase Auth
- Middleware-based route protection — unauthenticated users redirected to `/login`
- Auth callback handler for email confirmation flow
- Graceful duplicate-account detection on sign-up

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database / BaaS | Supabase (PostgreSQL + Auth) |
| Styling | Tailwind CSS with custom design tokens |
| Animations | Framer Motion v11 |
| Icons | Lucide React (strict — no other icon library) |
| Language | TypeScript 5 |
| Deployment | Vercel |

---

## Architecture

### Server / Client Component Split

```
app/
├── page.tsx                    ← Server — auth check, redirects to /dashboard or /login
├── dashboard/
│   ├── page.tsx                ← Server — fetches Supabase courses + auth user
│   └── loading.tsx             ← Skeleton that mirrors real layout (animate-pulse)
├── courses/
│   ├── page.tsx                ← Server — fetches courses
│   ├── CoursesContent.tsx      ← Client — search, sort, filter state
│   └── loading.tsx             ← Skeleton
├── analytics/
│   ├── page.tsx                ← Server — computes stats from courses
│   └── loading.tsx             ← Skeleton
├── settings/
│   ├── page.tsx                ← Client — local form state only, no fetch needed
│   └── loading.tsx             ← Skeleton
└── auth/
    ├── actions.ts              ← Server Action — signOut()
    └── callback/route.ts       ← Route Handler — OAuth / email code exchange

components/
├── layout/
│   └── Sidebar.tsx             ← Client — usePathname + layoutId animation + click-toggle
└── dashboard/
    ├── DashboardGrid.tsx       ← Client — Framer Motion stagger container
    ├── HeroCard.tsx            ← Client — entrance + hover spring animations
    ├── CourseCard.tsx          ← Client — Lucide icons, scaleX progress bar
    ├── FeaturedCourse.tsx      ← Client — SVG ring, spring hover
    └── ActivityCard.tsx        ← Client — DOM heatmap (useEffect, avoids hydration mismatch)
```

**Why this split?**
Supabase queries run exclusively in Server Components — environment variables never reach the browser bundle. Client Components receive resolved data as props, keeping the bundle small while enabling rich animations.

### Data Flow

```
Supabase DB
    └─▶ lib/supabase/queries.ts (getCourses)
            └─▶ app/*/page.tsx  [Server Component — async]
                    └─▶ <ClientComponent courses={courses} />
                                └─▶ renders with animations
```

---

## Animations (Framer Motion)

| Requirement | Implementation |
|---|---|
| Staggered entrance | `staggerChildren: 0.08` on `DashboardGrid` container variants |
| Card hover scale | `whileHover={{ scale: 1.015 }}` with spring `stiffness: 300, damping: 20` |
| Border glow on hover | Opacity-animated `ring-1 ring-primary/30` overlay div |
| Sidebar active pill | `layoutId="sidebar-pill"` snaps to active nav item |
| Mobile nav active pill | `layoutId="mobile-pill"` |
| Sidebar expand/collapse | `useState` toggle + `AnimatePresence` for label fade, `ChevronRight` rotates 180° |
| Progress bar fill | `scaleX: 0 → value/100` spring on mount |
| Zero layout shift | All animations use `transform` (`scale`, `translateY`) and `opacity` exclusively |

---

## Design System

- **Colors**: Material Design 3 roles — `primary` (#4edea3 mint green), deep surface layers (`#0A0A0A` background)
- **Typography**: Inter (body) + JetBrains Mono (labels, metrics, tags)
- **Icons**: Lucide React exclusively — `BookOpen`, `Code2`, `Brain`, `Rocket`, `BarChart2` for DB-driven course icons; `LayoutDashboard`, `GraduationCap`, `LineChart`, `Settings`, `Bell`, `User`, etc. for UI chrome
- **Cards**: `.bento-card` utility with grain texture SVG overlay + radial gradient mesh on course cards
- **Responsive**: Desktop (full Bento + sidebar) → Tablet (icon-only sidebar) → Mobile (bottom pill nav + single-column stack)

---

## Database Setup

### Schema

```sql
create table courses (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null default 0,
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz default now()
);
```

### Seed

```bash
npm run seed
```

This runs `scripts/seed.js` which inserts 4 mock courses into your Supabase project.

---

## Environment Variables

```bash
cp .env.example .env.local
# Then fill in your Supabase project values
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (after npm install only)
npm run dev

# After running npm run build, always use:
npm run dev:clean
```

> **Important**: `npm run dev:clean` clears the `.next` cache before starting. Use it after any `npm run build` to avoid webpack artifact conflicts.

---

## Key Engineering Decisions

### 1. TypeScript + Framer Motion v11

`@types/react@19` caused `motion.*` elements to lose `className` inference with Framer Motion. Fixed by pinning `@types/react@18.2.0` to match the runtime.

### 2. Dev vs. Production cache collision

`npm run build` writes production webpack chunks to `.next`; `npm run dev` then misreads them. Added a `dev:clean` script using `node -e "require('fs').rmSync(...)"` for cross-platform reliability without requiring `rimraf`.

### 3. Heatmap hydration

The 52×7 activity heatmap is DOM-built in a `useEffect` (not JSX) to avoid hydration mismatches. Data is a deterministic pseudo-random array generated server-side and passed as a prop — safe for SSR, no `Math.random()` on the server.

### 4. Sidebar collapse without context

Since the sidebar is `position: fixed`, collapsing it doesn't affect the content layout. The toggle state lives entirely inside `Sidebar.tsx` — no context provider, no prop drilling. The content area's `md:ml-16` margin accounts for the fixed collapsed width.

### 5. Auth redirect loop prevention

The root `/` page checks the Supabase session server-side: authenticated users go to `/dashboard`, unauthenticated users go to `/login`. This prevents the double-redirect (`/ → /dashboard → /login`) that would occur with an unconditional redirect.

---

## Evaluation Rubric Coverage

| Criterion | Weight | Coverage |
|---|---|---|
| Data Architecture & Next.js | 30% | Server Components for all data fetching; `@supabase/ssr`; `loading.tsx` on all 4 routes |
| Framer Motion Proficiency | 30% | Spring physics throughout; stagger; layoutId; AnimatePresence; zero layout shifts |
| Code Quality & Types | 20% | Full TypeScript; `LucideIcon` types; typed Supabase payloads; modular components |
| Visual Fidelity & Responsiveness | 20% | Dark mode; Bento grid; grain textures; mobile bottom nav; tablet icon sidebar |
