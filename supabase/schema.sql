-- ============================================================
-- CodeLearn — Supabase schema
--
-- Run this file in the Supabase SQL editor (Dashboard → SQL Editor
-- → New query → paste → Run). It creates:
--
--   1. profiles          one row per auth user
--   2. lesson_progress   one row per completed lesson / exercise score
--   3. Row Level Security policies so users can only see their own data
--   4. A trigger that creates a profile row on sign-up
--
-- Nothing here exposes secrets: it only uses the built-in auth schema.
-- ============================================================

-- ---------- 1. profiles ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data for each CodeLearn user.';

-- ---------- 2. lesson_progress ----------

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  completed_at timestamptz,
  exercise_best_score integer check (exercise_best_score between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

comment on table public.lesson_progress is 'Per-user lesson completion and best exercise scores.';

create index if not exists lesson_progress_user_idx
  on public.lesson_progress (user_id);

-- ---------- 3. Row Level Security ----------

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;

-- Profiles: the owner can do anything with their own row.
drop policy if exists "profiles_select_own" on public.profiles;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Progress: the owner can read and write only their own rows.
drop policy if exists "progress_select_own" on public.lesson_progress;

create policy "progress_select_own"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.lesson_progress;

create policy "progress_insert_own"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.lesson_progress;

create policy "progress_update_own"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.lesson_progress;

create policy "progress_delete_own"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

-- ---------- 4. Auto-create a profile on sign-up ----------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 5. Keep updated_at fresh ----------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists lesson_progress_updated_at on public.lesson_progress;
create trigger lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();
