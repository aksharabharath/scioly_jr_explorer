-- Temporary expedition selections and immutable question snapshots.

create table if not exists public.question_versions (
  id uuid primary key default gen_random_uuid(),
  question_id text not null,
  event_id text not null,
  topic_id text not null,
  prompt text not null,
  choices jsonb,
  correct_choice_id text,
  answer_mode text not null default 'multiple-choice',
  accepted_answers jsonb,
  explanation text not null,
  hint text not null,
  hint_2 text,
  prompt_terms jsonb,
  wording_help text,
  difficulty integer not null check (difficulty between 1 and 3),
  image_required boolean,
  image_src text,
  image_alt text,
  image_credit text,
  image_brief text,
  verification_status text,
  cognitive_demand text,
  source_type text,
  source_note text,
  evidence_ids jsonb,
  taxonomy_tags jsonb,
  created_at timestamptz not null default now(),
  constraint question_versions_answer_mode_check
    check (answer_mode in ('multiple-choice', 'open-ended')),
  constraint question_versions_verification_status_check
    check (
      verification_status is null
      or verification_status in ('draft', 'needs-review', 'verified')
    )
);

create index if not exists question_versions_question_id_idx
  on public.question_versions (question_id);

create table if not exists public.practice_expeditions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null,
  question_ids jsonb not null,
  question_version_ids jsonb not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '2 hours'),
  finished_at timestamptz
);

create index if not exists practice_expeditions_user_id_idx
  on public.practice_expeditions (user_id, created_at desc);

alter table public.question_versions enable row level security;
alter table public.practice_expeditions enable row level security;

revoke all on table public.question_versions from public, anon, authenticated;
revoke all on table public.practice_expeditions from public, anon, authenticated;
grant select, insert on table public.question_versions to service_role;
grant select, insert, update on table public.practice_expeditions to service_role;

alter table public.question_feedback
  add column if not exists question_version_id uuid
  references public.question_versions (id);

alter table public.question_feedback
  add column if not exists review_status text not null default 'unreviewed';

alter table public.question_feedback
  add column if not exists review_notes text;

alter table public.question_feedback
  add column if not exists resolved_at timestamptz;

alter table public.question_feedback
  add column if not exists resolved_by uuid references auth.users (id);

alter table public.question_feedback
  drop constraint if exists question_feedback_negative_issues_check;

alter table public.question_feedback
  add constraint question_feedback_negative_issues_check check (
    feedback = 'positive'
    or issue_codes <@ array[
      'unfamiliar_words',
      'correct_answer_may_be_wrong',
      'explanation_confusing',
      'too_easy',
      'too_hard',
      'wording_gives_answer',
      'hint_gives_answer',
      'explanation_gives_answer',
      'choices_too_obvious',
      'ambiguous_question',
      'factual_error',
      'wrong_answer_key',
      'image_problem',
      'other'
    ]::text[]
  );

grant insert (
  attempt_id,
  user_id,
  event_id,
  question_id,
  question_version_id,
  feedback,
  issue_codes,
  other_text
) on table public.question_feedback to authenticated;

alter table public.practice_attempts
  add column if not exists event_id text;

alter table public.practice_attempts
  add column if not exists question_version_id uuid
  references public.question_versions (id);

alter table public.practice_attempts
  add column if not exists hint_used boolean not null default false;

alter table public.practice_attempts
  add column if not exists session_id uuid;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'astronomy_questions',
    'entomology_questions',
    'anatomy_physiology_questions',
    'ecology_questions',
    'water_quality_questions',
    'crime_busters_questions',
    'codebusters_questions'
  ]
  loop
    execute format(
      'alter table public.%I add column if not exists difficulty_llm integer',
      table_name
    );
    execute format(
      'alter table public.%I add column if not exists difficulty_student integer',
      table_name
    );
    execute format(
      'alter table public.%I add column if not exists difficulty_updated timestamptz',
      table_name
    );
  end loop;
end
$$;

create or replace function public.select_expedition_question_ids(
  p_event_id text,
  p_topic_ids text[] default null
)
returns table(question_id text)
language plpgsql
security definer
set search_path = public
as $$
declare
  table_name text;
  available_count integer;
begin
  table_name := case p_event_id
    when 'astronomy' then 'astronomy_questions'
    when 'entomology' then 'entomology_questions'
    when 'anatomy-physiology' then 'anatomy_physiology_questions'
    when 'ecology' then 'ecology_questions'
    when 'water-quality' then 'water_quality_questions'
    when 'crime-busters' then 'crime_busters_questions'
    when 'codebusters' then 'codebusters_questions'
    else null
  end;

  if table_name is null then
    raise exception 'Unknown question event: %', p_event_id;
  end if;

  execute format(
    'select count(*)
       from public.%I
      where coalesce(verification_status, ''verified'') = ''verified''
        and (
          image_required is not true
          or (image_src is not null and image_alt is not null)
        )
        and ($1 is null or topic_id = any($1))',
    table_name
  )
  into available_count
  using p_topic_ids;

  if available_count < 10 then
    raise exception 'Not enough playable questions for event %', p_event_id;
  end if;

  return query execute format(
    'select id
       from public.%I
      where coalesce(verification_status, ''verified'') = ''verified''
        and (
          image_required is not true
          or (image_src is not null and image_alt is not null)
        )
        and ($1 is null or topic_id = any($1))
      order by random()
      limit 10',
    table_name
  )
  using p_topic_ids;
end;
$$;

revoke all on function public.select_expedition_question_ids(text, text[]) from public;
revoke all on function public.select_expedition_question_ids(text, text[]) from anon;
revoke all on function public.select_expedition_question_ids(text, text[]) from authenticated;
grant execute on function public.select_expedition_question_ids(text, text[]) to service_role;
