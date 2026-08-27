# Jr. Explorer — database

**Source of truth for this document:** migration files under `supabase/migrations/` and the TypeScript that calls Supabase. The live hosted project was **not** inspected here. **Do not claim a migration is applied remotely** unless you verify it in the Supabase dashboard. The gamification migration file itself says to run it in the SQL Editor and not assume it is live.

Never commit or paste secret values. This file lists **variable names only**.

## Environment variables

| Name | Used for |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (browser + server) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable/anon key (preferred) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fallback if the publishable name is unset |

Defined in `.env.example`. Local values live in `.env.local` (not documented here).

**Not used in application code:** service-role keys, database passwords, or personal access tokens.

## Supabase Auth

Students are `auth.users` rows (email/password). The app does not create a separate `students` profile table.

| App concept | Mapping |
|---|---|
| Student | `auth.users.id` |
| Display name | `user.user_metadata.display_name` |
| `student_id` on rows | Always `getCurrentUser().id` or `auth.uid()` inside RPCs |

The browser must not send `student_id`. Server Actions and the definer function ignore any such field.

Session: `@supabase/ssr` cookies, refreshed in `proxy.ts`.

## How writes happen

Intended path for a new answer:

1. Server Action `savePracticeAttempt`
2. `insertPracticeAttempt` loads the question from the **mock bank**, sets `is_correct`, validates UUIDs, sanitizes the practice date
3. `supabase.rpc("record_practice_attempt_and_award", …)` with the **user JWT** (not service role)

Reads (`getMyPracticeAttempts`, `getMyGamification`, etc.) use the same server client and filter `student_id = user.id`.

`anon` has no grants on application tables.

`lib/supabase/client.ts` (browser client) is unused. All documented reads/writes use `lib/supabase/server.ts`.

## What is persisted vs still mock

**Persisted (if the corresponding migration has been applied):**

- Auth users (Supabase Auth)
- `practice_attempts` (answers, correctness, hint flag, session id after gamification migration)
- `student_gamification` (running `xp`, `streak_days`, `last_practice_date`)
- Award rows that make XP idempotent
- `student_events` (which catalog event IDs the student selected)

**Not in the database (still mock TypeScript):**

- Question bank, event catalog **metadata**, Event Level, topic mastery, event `progressPercent`
- Continue exploring / Next steps (components exist; not on the student dashboard)
- Badge rows (badges are computed, not stored)
- Explorer Level (derived in app code from `xp`)
- Trial Mode, lessons, AI (none of these exist in the app either)

## When XP and streak update

They update **only** inside `record_practice_attempt_and_award`, which the app calls from `insertPracticeAttempt` after **Check answer** succeeds in saving.

- New attempt id → attempt XP (10 / 6 / 2 from the **stored** flags) + streak rules using `p_practice_date`
- Tenth saved row with that `session_id` for this student → +20 once (8-question / incomplete sessions do not get this bonus)
- Same attempt id again (refresh, retry, double submit) → `ON CONFLICT` → 0 extra attempt XP
- Opening the dashboard or reloading results → SELECT only; no increment

Dashboard XP is `SELECT xp, streak_days FROM student_gamification`. Missing row or error → UI shows 0 XP / 0 streak (Level 1 in the app). That is real empty state, not `MOCK_EXPLORER`.

The practice UI displays `attemptXp` and `sessionBonusXp` from the RPC return. It must not invent a different number.

## Application tables

### `practice_attempts`

**Purpose:** one row per saved practice answer. Curriculum is not stored here—only `question_id` text.

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK. App usually supplies a client-generated UUID for idempotent retries |
| `student_id` | `uuid` | — | FK `auth.users(id)` ON DELETE CASCADE |
| `question_id` | `text` | — | Mock bank id, e.g. `astro-q1` |
| `selected_option_id` | `text` | — | Choice id, e.g. `a` |
| `is_correct` | `boolean` | — | Set by server from the bank |
| `answered_at` | `timestamptz` | `now()` | |
| `hint_used` | `boolean` | `false` | Added in hint migration |
| `session_id` | `uuid` | `null` | Added in gamification migration; shared by one 10-question set |

**Indexes**

- `practice_attempts_student_id_idx` on `(student_id)`
- `practice_attempts_student_session_idx` on `(student_id, session_id)` (gamification migration)

**RLS:** enabled

| Operation | Policy / grant |
|---|---|
| SELECT | `students_select_own_attempts`: `student_id = auth.uid()`, role `authenticated` |
| INSERT | `students_insert_own_attempts`: `WITH CHECK (student_id = auth.uid())` |
| UPDATE | none |
| DELETE | none |

Grants: `SELECT, INSERT` to `authenticated`. Revoked from `public` and `anon`.

**Security notes:** RLS insert is still allowed, so a custom client could insert rows without going through the Server Action. The current app inserts via the definer RPC (which also awards XP). Direct inserts do not, by themselves, write award tables. Historical rows may have `session_id` null and `hint_used` false (unknown). The RPC is executable by `authenticated`, so a custom client could also call it with a spoofed `p_is_correct`. Students cannot `UPDATE` `xp` on `student_gamification`.

---

### `student_gamification`

**Purpose:** running XP and daily streak per student. Explorer Level is **not** stored; it is derived from `xp` in `lib/gamification.ts`.

| Column | Type | Default | Notes |
|---|---|---|---|
| `student_id` | `uuid` | — | PK, FK `auth.users(id)` ON DELETE CASCADE |
| `xp` | `integer` | `0` | `CHECK (xp >= 0)` |
| `streak_days` | `integer` | `0` | `CHECK (streak_days >= 0)` |
| `last_practice_date` | `date` | `null` | Calendar date of last awarded attempt |
| `updated_at` | `timestamptz` | `now()` | |

**RLS:** enabled

| Operation | Policy / grant |
|---|---|
| SELECT | `students_select_own_gamification`: `student_id = auth.uid()` |
| INSERT | none for `authenticated` |
| UPDATE | none for `authenticated` |
| DELETE | none |

After revoke-all, `authenticated` is granted **SELECT only**. Rows are created/updated inside `record_practice_attempt_and_award`. Missing row → app treats as 0 XP, 0 streak.

---

### `gamification_attempt_awards`

**Purpose:** at most one XP grant per `practice_attempts.id`.

| Column | Type | Default | Notes |
|---|---|---|---|
| `attempt_id` | `uuid` | — | PK, FK `practice_attempts(id)` ON DELETE CASCADE |
| `student_id` | `uuid` | — | FK `auth.users(id)` ON DELETE CASCADE |
| `xp` | `integer` | — | `CHECK (xp >= 0)` amount granted that once |
| `awarded_at` | `timestamptz` | `now()` | |

**RLS:** enabled. **No policies. No grants** to `anon` or `authenticated`. Only the definer function writes here. `ON CONFLICT (attempt_id) DO NOTHING`.

---

### `gamification_session_awards`

**Purpose:** at most one +20 completion bonus per practice `session_id`.

| Column | Type | Default | Notes |
|---|---|---|---|
| `session_id` | `uuid` | — | PK (not an FK; there is no sessions table) |
| `student_id` | `uuid` | — | FK `auth.users(id)` ON DELETE CASCADE |
| `xp` | `integer` | — | `CHECK (xp >= 0)` (20 in the function) |
| `awarded_at` | `timestamptz` | `now()` | |

**RLS:** enabled. **No policies. No grants** to `anon` or `authenticated`. Bonus when `count(*)` of this student’s attempts with that `session_id` is ≥ 10 (`session_size` constant in SQL).

---

### `student_events`

**Purpose:** which catalog event IDs the student chose to study. Not curriculum. Not practice history.

| Column | Type | Default | Notes |
|---|---|---|---|
| `student_id` | `uuid` | — | Part of PK, FK `auth.users(id)` ON DELETE CASCADE |
| `event_id` | `text` | — | Part of PK. Must match a mock **catalog** id (enforced in app code, not a DB FK). Current catalog: `water-quality`, `ecology`, `entomology`, `anatomy-physiology`, `codebusters`, `crime-busters`, `engineering-cad`, `hovercraft`, `rubber-band-catapult`. **MVP selectable:** `entomology`, `anatomy-physiology`. Astronomy is an extra practice event, not a catalog id. |
| `created_at` | `timestamptz` | `now()` | |

**Primary key:** `(student_id, event_id)` — no duplicate selections.

**Index:** `student_events_student_id_idx` on `(student_id)` (PK already supports student lookups).

**RLS:** enabled

| Operation | Policy / grant |
|---|---|
| SELECT | `students_select_own_events`: `student_id = auth.uid()` |
| INSERT | `students_insert_own_events`: `WITH CHECK (student_id = auth.uid())` |
| UPDATE | none |
| DELETE | `students_delete_own_events`: `student_id = auth.uid()` |

Grants: `SELECT, INSERT, DELETE` to `authenticated`. Revoked from `public` and `anon`.

Writes go through `setMySelectedEvents` using `getCurrentUser().id`. The client may submit event IDs; the server validates them against `getCatalogEventIds()` and never takes `student_id` from the browser. Unknown or legacy IDs (including old `astronomy` selections) are dropped on read by `filterKnownEventIds`.

No foreign key to `practice_attempts` or gamification tables. Deleting a `student_events` row does **not** delete learning history. Entomology and Astronomy attempts keep using `question_id`; progress maps through the mock banks. **No migration** was required to add Entomology — `question_id` is already unconstrained text.

---

## Function

### `public.record_practice_attempt_and_award`

```
(p_attempt_id uuid,
 p_session_id uuid,
 p_question_id text,
 p_selected_option_id text,
 p_is_correct boolean,
 p_hint_used boolean,
 p_practice_date date) → jsonb
```

`SECURITY DEFINER`, `search_path = public`. Uses `auth.uid()` as `student_id`.

Behavior sketch: insert attempt `ON CONFLICT (id) DO NOTHING` → load row (must belong to caller) → XP from **stored** `is_correct` / `hint_used` (10 / 6 / 2) → insert attempt award (conflict → 0 attempt XP) → if session has ≥ 10 attempts, insert session award (conflict → 0 bonus) → upsert streak on `p_practice_date` vs `last_practice_date` → add XP.

Returns `{ xp, streakDays, attemptXp, sessionBonusXp }`.

**Execute:** `authenticated` only. Revoked from `public` and `anon`.

**Why definer:** increment XP without granting students `UPDATE` on `xp`.

Amounts are duplicated from `lib/gamification.ts` — keep them aligned.

## Migrations

Do not edit old files that have already been applied. Add new ones.

**Exception:** `20260824_practice_session_size_10.sql` was repaired in place because the original function body was truncated (missing `end; $$;`) and could not have been applied. Use the current file.

| File | What it does |
|---|---|
| `20260824_practice_attempts.sql` | Creates `practice_attempts` (without hint/session), RLS select/insert own, grants |
| `20260824_practice_attempts_hint_used.sql` | `ADD COLUMN hint_used boolean NOT NULL DEFAULT false` |
| `20260824_gamification.sql` | `session_id`, gamification tables, RLS, `record_practice_attempt_and_award` |
| `20260824_student_events.sql` | `student_events` + RLS select/insert/delete own rows |
| `20260824_practice_session_size_10.sql` | Replaces `record_practice_attempt_and_award` so +20 fires at 10 saved answers. Must include `end; $$;` before GRANT/REVOKE. |

The gamification, student_events, and session-size files say to **run them in the Supabase SQL Editor** and not assume they are already on the live project. This repository has no evidence they have been applied remotely. Apply all five files in filename order.

Older `practice_attempts` are **not** backfilled into XP by the migration.

Student-facing XP / Level / streak UI uses this existing schema only. **No new gamification table or XP column was added** for the display polish.

## Not in the database

- Question text, choices, hints, explanations
- Event names, descriptions, Event Level, topic mastery (catalog metadata)
- Explorer Level (derived)
- Recommendations / next steps

Selected **event IDs** are stored in `student_events`. Names are not copied there.
