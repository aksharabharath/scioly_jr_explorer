-- Gamification v1: XP, daily streak, and one-time session completion bonus.
--
-- Run this migration in Supabase SQL Editor.
-- Do not treat this file as already applied to the live project.
--
-- Why a SECURITY DEFINER function?
-- Students must not UPDATE their own xp (that would make the browser
-- authoritative). Award rows plus this function increment XP atomically
-- from saved attempts, once per attempt_id and once per session_id.

alter table public.practice_attempts
  add column if not exists session_id uuid;

create index if not exists practice_attempts_student_session_idx
  on public.practice_attempts (student_id, session_id);

create table if not exists public.student_gamification (
  student_id uuid primary key references auth.users (id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  streak_days integer not null default 0 check (streak_days >= 0),
  last_practice_date date,
  updated_at timestamptz not null default now()
);

create table if not exists public.gamification_attempt_awards (
  attempt_id uuid primary key references public.practice_attempts (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  xp integer not null check (xp >= 0),
  awarded_at timestamptz not null default now()
);

create table if not exists public.gamification_session_awards (
  session_id uuid primary key,
  student_id uuid not null references auth.users (id) on delete cascade,
  xp integer not null check (xp >= 0),
  awarded_at timestamptz not null default now()
);

alter table public.student_gamification enable row level security;
alter table public.gamification_attempt_awards enable row level security;
alter table public.gamification_session_awards enable row level security;

drop policy if exists "students_select_own_gamification" on public.student_gamification;
create policy "students_select_own_gamification"
  on public.student_gamification
  for select
  to authenticated
  using (student_id = auth.uid());

revoke all on table public.student_gamification from public;
revoke all on table public.student_gamification from anon;
revoke all on table public.student_gamification from authenticated;
grant select on table public.student_gamification to authenticated;

revoke all on table public.gamification_attempt_awards from public;
revoke all on table public.gamification_attempt_awards from anon;
revoke all on table public.gamification_attempt_awards from authenticated;

revoke all on table public.gamification_session_awards from public;
revoke all on table public.gamification_session_awards from anon;
revoke all on table public.gamification_session_awards from authenticated;

create or replace function public.record_practice_attempt_and_award(
  p_attempt_id uuid,
  p_session_id uuid,
  p_question_id text,
  p_selected_option_id text,
  p_is_correct boolean,
  p_hint_used boolean,
  p_practice_date date
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  att public.practice_attempts%rowtype;
  attempt_xp integer := 0;
  session_bonus integer := 0;
  inserted_award integer := 0;
  inserted_session integer := 0;
  session_count integer := 0;
  g_streak integer := 0;
  g_last date;
  new_streak integer := 0;
  delta_xp integer := 0;
  total_xp integer := 0;
  total_streak integer := 0;
  session_size constant integer := 8;
  session_bonus_xp constant integer := 20;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if p_attempt_id is null or p_session_id is null then
    raise exception 'Missing attempt or session id';
  end if;

  if p_question_id is null or length(trim(p_question_id)) = 0
     or p_selected_option_id is null or length(trim(p_selected_option_id)) = 0 then
    raise exception 'Missing question or answer';
  end if;

  if p_practice_date is null then
    raise exception 'Missing practice date';
  end if;

  insert into public.practice_attempts (
    id,
    student_id,
    question_id,
    selected_option_id,
    is_correct,
    hint_used,
    session_id
  )
  values (
    p_attempt_id,
    uid,
    p_question_id,
    p_selected_option_id,
    p_is_correct,
    coalesce(p_hint_used, false),
    p_session_id
  )
  on conflict (id) do nothing;

  select * into att
  from public.practice_attempts
  where id = p_attempt_id;

  if not found or att.student_id <> uid then
    raise exception 'Attempt not found';
  end if;

  -- XP comes from the saved attempt, never from a client-supplied amount.
  -- Keep in sync with lib/gamification.ts
  if att.is_correct and not att.hint_used then
    attempt_xp := 10;
  elsif att.is_correct and att.hint_used then
    attempt_xp := 6;
  else
    attempt_xp := 2;
  end if;

  insert into public.gamification_attempt_awards (attempt_id, student_id, xp)
  values (p_attempt_id, uid, attempt_xp)
  on conflict (attempt_id) do nothing;
  get diagnostics inserted_award = row_count;

  if inserted_award = 0 then
    attempt_xp := 0;
  end if;

  if att.session_id is not null then
    select count(*) into session_count
    from public.practice_attempts
    where student_id = uid
      and session_id = att.session_id;

    if session_count >= session_size then
      insert into public.gamification_session_awards (session_id, student_id, xp)
      values (att.session_id, uid, session_bonus_xp)
      on conflict (session_id) do nothing;
      get diagnostics inserted_session = row_count;
      if inserted_session > 0 then
        session_bonus := session_bonus_xp;
      end if;
    end if;
  end if;

  insert into public.student_gamification (student_id, xp, streak_days, last_practice_date)
  values (uid, 0, 0, null)
  on conflict (student_id) do nothing;

  select streak_days, last_practice_date
    into g_streak, g_last
  from public.student_gamification
  where student_id = uid
  for update;

  new_streak := g_streak;
  if inserted_award > 0 then
    if g_last is null then
      new_streak := 1;
    elsif p_practice_date = g_last then
      new_streak := greatest(g_streak, 1);
    elsif p_practice_date = g_last + 1 then
      new_streak := g_streak + 1;
    elsif p_practice_date < g_last then
      new_streak := greatest(g_streak, 1);
    else
      new_streak := 1;
    end if;
  end if;

  delta_xp := attempt_xp + session_bonus;

  if delta_xp > 0 or inserted_award > 0 then
    update public.student_gamification
    set
      xp = xp + delta_xp,
      streak_days = case
        when inserted_award > 0 then new_streak
        else streak_days
      end,
      last_practice_date = case
        when inserted_award > 0 and (g_last is null or p_practice_date >= g_last)
          then p_practice_date
        else last_practice_date
      end,
      updated_at = now()
    where student_id = uid;
  end if;

  select xp, streak_days
    into total_xp, total_streak
  from public.student_gamification
  where student_id = uid;

  return jsonb_build_object(
    'xp', total_xp,
    'streakDays', total_streak,
    'attemptXp', attempt_xp,
    'sessionBonusXp', session_bonus
  );
end;
$$;

revoke all on function public.record_practice_attempt_and_award(uuid, uuid, text, text, boolean, boolean, date) from public;
revoke all on function public.record_practice_attempt_and_award(uuid, uuid, text, text, boolean, boolean, date) from anon;
grant execute on function public.record_practice_attempt_and_award(uuid, uuid, text, text, boolean, boolean, date) to authenticated;
