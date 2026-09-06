-- Award +12 / +15 XP for the 3rd and 5th unhinted correct answers in a
-- row in the same expedition. Other attempt amounts stay 10 / 6 / 2.
-- Session completion bonus stays +20 at 10 saved answers.
--
-- Run this in the Supabase SQL Editor. Do not treat it as already applied.
-- Additive: replaces the award function only. Does not change tables.
-- Keep in sync with lib/gamification.ts.

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
  attempt_student_id uuid;
  attempt_is_correct boolean;
  attempt_hint_used boolean;
  attempt_session_id uuid;
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
  session_size constant integer := 10;
  session_bonus_xp constant integer := 20;
  correct_streak integer := 0;
  prior record;
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

  select
    pa.student_id,
    pa.is_correct,
    pa.hint_used,
    pa.session_id
  into
    attempt_student_id,
    attempt_is_correct,
    attempt_hint_used,
    attempt_session_id
  from public.practice_attempts as pa
  where pa.id = p_attempt_id;

  if not found or attempt_student_id is distinct from uid then
    raise exception 'Attempt not found';
  end if;

  -- XP comes from the saved attempt, never from a client-supplied amount.
  -- Hinted correct: +6 and does not change the unhinted-correct streak.
  -- Incorrect: +2 and resets the unhinted-correct streak.
  -- Unhinted 3rd / 5th in a row in this session: +12 / +15.
  if attempt_is_correct and attempt_hint_used then
    attempt_xp := 6;
  elsif not attempt_is_correct then
    attempt_xp := 2;
  else
    correct_streak := 1;
    if attempt_session_id is not null then
      for prior in
        select pa.is_correct, pa.hint_used
        from public.practice_attempts as pa
        where pa.student_id = uid
          and pa.session_id = attempt_session_id
          and pa.id is distinct from p_attempt_id
        order by pa.answered_at desc nulls last, pa.id desc
      loop
        if prior.is_correct and prior.hint_used then
          continue;
        elsif prior.is_correct and not prior.hint_used then
          correct_streak := correct_streak + 1;
        else
          exit;
        end if;
      end loop;
    end if;

    if correct_streak = 3 then
      attempt_xp := 12;
    elsif correct_streak = 5 then
      attempt_xp := 15;
    else
      attempt_xp := 10;
    end if;
  end if;

  insert into public.gamification_attempt_awards (attempt_id, student_id, xp)
  values (p_attempt_id, uid, attempt_xp)
  on conflict (attempt_id) do nothing;
  get diagnostics inserted_award = row_count;

  if inserted_award = 0 then
    attempt_xp := 0;
  end if;

  if attempt_session_id is not null then
    select count(*) into session_count
    from public.practice_attempts as pa
    where pa.student_id = uid
      and pa.session_id = attempt_session_id;

    if session_count >= session_size then
      insert into public.gamification_session_awards (session_id, student_id, xp)
      values (attempt_session_id, uid, session_bonus_xp)
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

  select sg.streak_days, sg.last_practice_date
    into g_streak, g_last
  from public.student_gamification as sg
  where sg.student_id = uid
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
    update public.student_gamification as sg
    set
      xp = sg.xp + delta_xp,
      streak_days = case
        when inserted_award > 0 then new_streak
        else sg.streak_days
      end,
      last_practice_date = case
        when inserted_award > 0 and (g_last is null or p_practice_date >= g_last)
          then p_practice_date
        else sg.last_practice_date
      end,
      updated_at = now()
    where sg.student_id = uid;
  end if;

  select sg.xp, sg.streak_days
    into total_xp, total_streak
  from public.student_gamification as sg
  where sg.student_id = uid;

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
