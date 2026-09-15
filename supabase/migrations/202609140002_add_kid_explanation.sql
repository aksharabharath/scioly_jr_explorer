alter table public.entomology_questions
  add column if not exists kid_explanation text;

alter table public.anatomy_physiology_questions
  add column if not exists kid_explanation text;

alter table public.ecology_questions
  add column if not exists kid_explanation text;

alter table public.water_quality_questions
  add column if not exists kid_explanation text;

alter table public.crime_busters_questions
  add column if not exists kid_explanation text;

alter table public.codebusters_questions
  add column if not exists kid_explanation text;

alter table public.question_versions
  add column if not exists kid_explanation text;
