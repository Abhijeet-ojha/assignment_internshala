-- Create courses table and insert sample rows for development
create extension if not exists pgcrypto;

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress int not null,
  icon_name text,
  created_at timestamptz default now()
);

insert into courses (title, progress, icon_name)
values
('Advanced React Patterns', 72, 'Code'),
('TypeScript Mastery', 48, 'BookOpen'),
('System Design Basics', 20, 'Brain'),
('Next.js Performance', 94, 'Rocket')
on conflict do nothing;
