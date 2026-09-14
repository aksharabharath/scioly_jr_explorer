-- Restrict authenticated table privileges on practice_attempts to SELECT + INSERT.
--
-- 20260824_practice_attempts.sql granted SELECT, INSERT without first
-- revoking default privileges, so authenticated kept UPDATE/DELETE/TRUNCATE/
-- REFERENCES/TRIGGER (arwdDxtm). This file matches the REVOKE/GRANT already
-- applied on the live project. Re-running is idempotent.
--
-- Does not change RLS policies, columns, indexes, or the award RPC.

revoke all on table public.practice_attempts from public;
revoke all on table public.practice_attempts from anon;
revoke all on table public.practice_attempts from authenticated;

grant select, insert on table public.practice_attempts to authenticated;
