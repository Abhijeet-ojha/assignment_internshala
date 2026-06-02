-- ─────────────────────────────────────────────────────────────────────────────
-- Lumina Learning Dashboard — Full Database Setup
-- Run this entire script in the Supabase SQL Editor
-- (Project → SQL Editor → New Query → paste → Run)
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Create the courses table (idempotent)
create table if not exists public.courses (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- 2. Disable RLS so the anon key can read all rows without auth
--    (this is intentional — courses are shared demo data visible to all users)
alter table public.courses disable row level security;

-- 3. Grant public read access via PostgREST
grant select on public.courses to anon;
grant select on public.courses to authenticated;

-- 4. Clear any existing rows and insert fresh demo courses
truncate public.courses;

insert into public.courses (title, progress, icon_name) values
  -- Web / Frontend
  ('Advanced React Patterns & Performance',   72,  'Code'),
  ('TypeScript: From Zero to Expert',         48,  'BookOpen'),
  ('Next.js 15 — Full Stack Mastery',         94,  'Rocket'),
  -- CS Fundamentals
  ('System Design & Scalable Architecture',   20,  'Brain'),
  ('Data Structures & Algorithms Deep Dive',  35,  'BarChart'),
  -- Design & UX
  ('UI/UX Design Principles & Figma',         61,  'BookOpen'),
  -- Bonus tracks
  ('Python for Data Science & ML',             8,  'Code'),
  ('Cloud Infrastructure with AWS',           100, 'Rocket');

-- ─────────────────────────────────────────────────────────────────────────────
-- Verify
-- ─────────────────────────────────────────────────────────────────────────────
select id, title, progress, icon_name from public.courses order by created_at;
