-- Question banks are server-only source data.
-- The application server uses SUPABASE_SERVICE_ROLE_KEY for trusted reads.
-- Students must never be able to select answer keys with the public client.

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
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from public', table_name);
    execute format('revoke all on table public.%I from anon', table_name);
    execute format('revoke all on table public.%I from authenticated', table_name);
    execute format('grant select on table public.%I to service_role', table_name);
  end loop;
end
$$;
