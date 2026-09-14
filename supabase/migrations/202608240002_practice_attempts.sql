-- Minimal persistence for Jr. Explorer practice answers.
-- Curriculum stays in mock data; this table only stores student activity.

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null,
  selected_option_id text not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);

create index if not exists practice_attempts_student_id_idx
  on public.practice_attempts (student_id);

alter table public.practice_attempts enable row level security;

drop policy if exists "students_insert_own_attempts" on public.practice_attempts;
create policy "students_insert_own_attempts"
  on public.practice_attempts
  for insert
  to authenticated
  with check (student_id = auth.uid());

drop policy if exists "students_select_own_attempts" on public.practice_attempts;
create policy "students_select_own_attempts"
  on public.practice_attempts
  for select
  to authenticated
  using (student_id = auth.uid());

revoke all on table public.practice_attempts from public;
revoke all on table public.practice_attempts from anon;
grant select, insert on table public.practice_attempts to authenticated;
