-- Broad app/product feedback submitted from the global navigation.
--
-- Run this migration in Supabase SQL Editor.
-- Do not treat this file as already applied to the live project.

create table if not exists public.general_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  feedback_text text not null,
  created_at timestamptz not null default now()
);

alter table public.general_feedback enable row level security;

drop policy if exists "students_insert_own_general_feedback"
  on public.general_feedback;
create policy "students_insert_own_general_feedback"
  on public.general_feedback
  for insert
  to authenticated
  with check (user_id = auth.uid());

revoke all on table public.general_feedback from public;
revoke all on table public.general_feedback from anon;
revoke all on table public.general_feedback from authenticated;
grant insert (
  user_id,
  feedback_text
) on table public.general_feedback to authenticated;
