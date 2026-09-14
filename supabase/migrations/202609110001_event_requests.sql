-- Student requests for events that are not currently available.
--
-- Run this migration in Supabase SQL Editor.
-- Do not treat this file as already applied to the live project.

create table if not exists public.event_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_name text not null check (length(btrim(event_name)) > 0),
  message text,
  created_at timestamptz not null default now(),
  status text not null default 'new'
);

create unique index if not exists event_requests_user_event_name_idx
  on public.event_requests (user_id, lower(btrim(event_name)));

create index if not exists event_requests_user_id_idx
  on public.event_requests (user_id);

alter table public.event_requests enable row level security;

drop policy if exists "students_insert_own_event_requests"
  on public.event_requests;
create policy "students_insert_own_event_requests"
  on public.event_requests
  for insert
  to authenticated
  with check (user_id = auth.uid());

revoke all on table public.event_requests from public;
revoke all on table public.event_requests from anon;
revoke all on table public.event_requests from authenticated;
grant insert (user_id, event_name, message) on table public.event_requests
  to authenticated;
