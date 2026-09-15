create table if not exists public.student_usernames (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique
    check (username ~ '^[a-z0-9_]{3,24}$'),
  auth_identifier text not null unique,
  created_at timestamptz not null default now()
);

alter table public.student_usernames enable row level security;

revoke all on table public.student_usernames from public;
revoke all on table public.student_usernames from anon;
revoke all on table public.student_usernames from authenticated;

create or replace function public.create_student_username_mapping()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_username text;
begin
  normalized_username := lower(trim(new.raw_user_meta_data ->> 'username'));
  if normalized_username is null or normalized_username = '' then
    return new;
  end if;

  insert into public.student_usernames (
    user_id,
    username,
    auth_identifier
  )
  values (
    new.id,
    normalized_username,
    new.email
  );

  return new;
end;
$$;

revoke all on function public.create_student_username_mapping() from public;
revoke all on function public.create_student_username_mapping() from anon;
revoke all on function public.create_student_username_mapping() from authenticated;

drop trigger if exists on_auth_user_created_username on auth.users;
create trigger on_auth_user_created_username
  after insert on auth.users
  for each row
  execute function public.create_student_username_mapping();
