-- Event Selection v1: which Science Olympiad events a student wants to study.
--
-- Run this migration in Supabase SQL Editor.
-- Do not treat this file as already applied to the live project.
--
-- Stores event IDs only. Names and descriptions stay in the mock catalog.
-- Deselecting an event must NOT delete practice_attempts or gamification rows
-- (no foreign keys from this table into those).

create table if not exists public.student_events (
  student_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null,
  created_at timestamptz not null default now(),
  primary key (student_id, event_id)
);

create index if not exists student_events_student_id_idx
  on public.student_events (student_id);

alter table public.student_events enable row level security;

drop policy if exists "students_select_own_events" on public.student_events;
create policy "students_select_own_events"
  on public.student_events
  for select
  to authenticated
  using (student_id = auth.uid());

drop policy if exists "students_insert_own_events" on public.student_events;
create policy "students_insert_own_events"
  on public.student_events
  for insert
  to authenticated
  with check (student_id = auth.uid());

drop policy if exists "students_delete_own_events" on public.student_events;
create policy "students_delete_own_events"
  on public.student_events
  for delete
  to authenticated
  using (student_id = auth.uid());

revoke all on table public.student_events from public;
revoke all on table public.student_events from anon;
revoke all on table public.student_events from authenticated;
grant select, insert, delete on table public.student_events to authenticated;
