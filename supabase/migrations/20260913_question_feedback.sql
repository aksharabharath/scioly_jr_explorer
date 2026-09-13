-- Student feedback for one submitted question attempt.
--
-- Run this migration in Supabase SQL Editor.
-- Do not treat this file as already applied to the live project.

create table if not exists public.question_feedback (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null,
  question_id text not null,
  feedback text not null check (feedback in ('positive', 'negative')),
  issue_codes text[] not null default '{}',
  other_text text,
  created_at timestamptz not null default now(),
  constraint question_feedback_negative_issues_check check (
    feedback = 'positive'
    or issue_codes <@ array[
      'unfamiliar_words',
      'correct_answer_may_be_wrong',
      'explanation_confusing',
      'too_easy',
      'too_hard',
      'other'
    ]::text[]
  ),
  constraint question_feedback_positive_issues_check check (
    feedback = 'negative' or cardinality(issue_codes) = 0
  )
);

create unique index if not exists question_feedback_user_attempt_idx
  on public.question_feedback (user_id, attempt_id);

create index if not exists question_feedback_question_id_idx
  on public.question_feedback (question_id);

alter table public.question_feedback enable row level security;

drop policy if exists "students_insert_own_question_feedback"
  on public.question_feedback;
create policy "students_insert_own_question_feedback"
  on public.question_feedback
  for insert
  to authenticated
  with check (user_id = auth.uid());

revoke all on table public.question_feedback from public;
revoke all on table public.question_feedback from anon;
revoke all on table public.question_feedback from authenticated;
grant insert (
  attempt_id,
  user_id,
  event_id,
  question_id,
  feedback,
  issue_codes,
  other_text
) on table public.question_feedback to authenticated;
