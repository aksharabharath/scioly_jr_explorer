-- Add hint usage to existing practice attempts.
-- Existing rows stay put and default to false (unknown historical hint use).

alter table public.practice_attempts
  add column if not exists hint_used boolean not null default false;
