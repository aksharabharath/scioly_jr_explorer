> This document describes the current state of Jr. Explorer. Read it before making substantial changes. The actual source code is authoritative if this document becomes outdated.

# Jr. Explorer — project context

## What it is

Jr. Explorer is a Science Olympiad question-and-answer learning app for elementary students. Science learning is the product. Practice, feedback, and returning later matter more than game mechanics.

This is **not** an official Science Olympiad test bank.

## Current product goal

Ship a small, working student loop: sign in, choose from **five playable events**, run a **10-question** adaptive set, get immediate feedback, persist attempts, adapt the next questions, show real activity stats, award Explorer XP, and unlock derived badges.

Astronomy remains a registered bank for checks. Students do not see Astronomy in selection, the dashboard, or `/events/astronomy`.

## Current MVP scope

Working today (in source):

- Email/password accounts via Supabase Auth; logged-in `/login` and `/signup` redirect home
- Event Selection v1: persist chosen event IDs; onboarding if none; My Events to change them; unselected event URLs redirect home
- Protected dashboard, event, map, log, and badge routes
- 2027 catalog of **nine** events. **Selectable:** Water Quality, Ecology, Entomology, Anatomy & Physiology, Crime Busters. **Locked (visible, not selectable):** Codebusters, Engineering CAD, Hovercraft, Rubber Band Catapult
- Live text practice for all five selectable events (same engine). Entomology live pool is **27** of 60 registered (image-required / needs-review held out). Astronomy remains for checks only
- 10-question adaptive sessions
- Hints, explanations, saved attempts (including `hint_used`)
- Cross-session adaptive selection and **Practice Tricky Topics** (miss → weak; 3 later corrects on that topic → strong; last 40 attempts)
- Progress Tracking from saved attempts (separate from current event selection); dashboard shows **X of N correct**
- Gamification v1: XP, Explorer Level, daily streak, session completion bonus; daily mission is progress-only
- 15 derived badges; map / expedition log / badge shelf on their own pages; recent achievements on home

Still mock (not from saved attempts): event **metadata** (names, descriptions, unused Event Level / mastery / `progressPercent` fields on catalog objects). Those mock numbers are **not shown** on student cards. There is no Trial Mode, no lessons, and no AI.

## Target user

An elementary student (with a grown-up for email/password). Copy is friendly. Mistakes do not remove XP.

## Core student journey

```
Sign up / log in
  → Choose events (if none saved yet)  →  /onboarding/events
  → Dashboard (selected events only)
    → Event page (if that event is selected)
      → Practice (or Tricky Topics)
        → Answer → optional hint → Check answer
          → Immediate feedback (save + XP line)
            → Next question (10 total)
              → Results (X of N correct + XP + streak; extras overlay if needed)
                → Return later; adaptive history persists
```

Logged-in students can change events later via **My Events** (`/profile/events`). Deselecting an event does not delete practice, XP, or streak.

## Tech stack

| Layer | Choice |
|---|---|
| App | Next.js **16.3.2** App Router, React **19**, TypeScript |
| Styling | Tailwind CSS v4 |
| Auth / DB | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Curriculum | In-repo mock TypeScript modules |
| Checks | `npx tsx lib/*.check.ts` (not a test runner) |

Next.js in this repo may differ from older App Router docs. Prefer `node_modules/next/dist/docs/` over training data. Session refresh lives in `proxy.ts`, not `middleware.ts`.

## Architectural layers

1. **Routes / UI** — `app/`, `components/`
2. **Domain logic** — `lib/learning/`, `lib/progress.ts`, `lib/gamification.ts`, `lib/practice.ts`, `lib/expeditions.ts`, `lib/badges.ts`
3. **Persistence** — `lib/practice-attempts.ts` + Supabase
4. **Curriculum mock** — `lib/mock/`
5. **Auth** — `lib/auth/`, `lib/supabase/`, `app/auth/`

## Important directories and files

| Path | Role |
|---|---|
| `app/page.tsx` | Dashboard (auth + event selection required) |
| `app/map/page.tsx`, `app/log/page.tsx`, `app/badges/page.tsx` | Explorer map, journal, badge shelf |
| `app/events/[eventId]/` | Event + practice pages |
| `app/practice/actions.ts` | Server Action: save attempt |
| `app/onboarding/events/page.tsx` | First-time event picker |
| `app/profile/events/page.tsx` | Change selected events |
| `lib/event-selection.ts` | Catalog ID validation (pure) |
| `lib/student-events.ts` | `student_events` reads/writes; `requireSelectedEvent` |
| `app/auth/actions.ts` | Sign up / in / out |
| `proxy.ts` | Session refresh + route gates |
| `components/PracticeQuiz.tsx` | Client quiz UI |
| `lib/learning/adaptive.ts` | Question selection + weak/strong topics |
| `lib/practice-attempts.ts` | Supabase reads/writes (recent window = 40) |
| `lib/progress.ts` | Activity stats |
| `lib/gamification.ts` | XP / level / streak rules + student-facing award labels |
| `lib/badges.ts` | Real milestone unlocks from saved attempts |
| `lib/expeditions.ts` | Derived expeditions, unique live questions, journal XP |
| `components/XpAwardFeedback.tsx` | Shows server-reported XP after a saved answer |
| `lib/mock/events.ts` | 2027 catalog (9 events) plus extra Astronomy event |
| `lib/mock/curriculum.ts` | Generic event → bank → `Question[]` registry used by practice |
| `lib/mock/*-questions.ts` | Per-event banks |
| `lib/mock/explorer.ts` | Mock recs/next steps; `MOCK_EXPLORER` is leftover and **not** used for XP |
| `supabase/migrations/` | Schema as defined in git — not proof the live project has applied them |

## Authentication

Supabase Auth (email + password). Display name is stored in `user.user_metadata.display_name`.

- Public: `/login`, `/signup`, `/auth/*`
- Logged in with **no** `student_events` rows: `/` and `/events/*` redirect to `/onboarding/events`
- `/onboarding/events` does **not** redirect back to `/` when empty (avoids a loop). If they already have selections, it sends them to `/`
- Server uses `getCurrentUser()` / `auth.getUser()`. **Never trust a client-supplied `student_id`.**
- No service-role key in app code. Public env only: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (fallback `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Event selection

Catalog IDs (from `MOCK_EVENTS`): `water-quality`, `ecology`, `entomology`, `anatomy-physiology`, `codebusters`, `crime-busters`, `engineering-cad`, `hovercraft`, `rubber-band-catapult`.

Astronomy (`astronomy`) is an extra known event, not a catalog ID. Reads validate against **selectable** IDs (the five unlocked quiz events). Locked leftover rows and old `astronomy` rows are dropped on read. A later save can delete those leftover preference rows. Practice history is not deleted.

The database stores those **IDs only**. Names/descriptions stay in the mock catalog.

- Zero selectable rows → `/onboarding/events` (at least one **unlocked** event, then Continue)
- Onboarding/My Events show all nine catalog events; locked tiles are **🔒 Coming later** and cannot be selected
- Dashboard `Your Events` = `resolveSelectedEvents(catalog, getMySelectedEventIds())`
- Header **My Events** → `/profile/events` (preselected, at least one unlocked event, Save → `/`)
- Invalid / locked IDs rejected on save. Unique `(student_id, event_id)`.
- Deselect does **not** touch `practice_attempts` or gamification.

**Uncertain:** whether `20260824_student_events.sql` is applied on hosted Supabase. Run it in the SQL Editor; this repo does not record a live apply.

## Practice

`PracticeQuiz` runs a **10-question** set (`PRACTICE_SET_SIZE = 10` in `lib/learning/adaptive.ts`). The practice page loads the **live practice pool** for that event via `getPracticePageData` → `getQuestionsForEvent` in `lib/mock/curriculum.ts`. Live practice excludes `imageRequired` items. Adaptive selection orders the event’s live pool; it does **not** use a fixed 10-item list.

`eventHasPractice(eventId)` is true when that event has live (non-image-required) questions. Build events and locked catalog events never get a practice route (`getPracticePageData` returns null when `kind === "build"` or `unlocked === false`). Extra Astronomy remains unlocked in the registry so checks can still load it.

`MOCK_ASTRONOMY_PRACTICE_IDS` is a leftover 4-id array. **Nothing in `app/` calls it.**

Entomology items with `imageRequired` stay in `lib/mock/entomology-questions.ts` for later. They are **not** shown in live practice and the quiz does **not** tell a child that a specimen image is missing.

On **Check answer** the quiz calls `savePracticeAttempt` with `attemptId`, `sessionId`, `hintUsed`, and the student’s local calendar date. Next / results wait until the save succeeds. Feedback and explanations are shown immediately.

Correctness is computed **on the server** from the mock bank, not from the client’s opinion.

## Adaptive learning

`lib/learning/adaptive.ts` scores **topics**, not a single mastery percent.

A miss marks the topic weak. Three later correct answers on that topic (hinted or not) mark it strong. A new miss resets the count. Hint-correct with no miss is not weak.

Then it picks a topic (prefer due weak topics, rotate consecutive topics, wait 2 intervening questions before revisiting), then a question (avoid recent IDs, match target difficulty). Weak mode (`?mode=weak`) prefers still-weak topics.

History for selection: last 40 saved attempts plus this session.

## Progress

`lib/progress.ts` counts **every saved attempt** (repeats included). Dashboard **Your Progress**: questions tried, **X of N correct**, events tried. This is historical practice, including events later removed from `student_events`. **Your Events** is only the current selection. Accuracy is `null` when there are no attempts — never a fake 100%.

Progress is **not** XP and **not** mastery.

## Badges

`lib/badges.ts` computes **15** unlocks from saved attempts (and persisted streak days). There is **no** badge table. Unlocks are not stored; they are derived from `practice_attempts` + `getAllQuestions()` + streak. Image-required Entomology items can still count if old rows exist, because `getAllQuestions()` includes the full registered banks.

## Gamification (real in source)

Explorer XP, Explorer Level, and daily streak are **real application systems**, not mock dashboard numbers.

**Do not use `MOCK_EXPLORER` for XP.** `app/page.tsx` loads `getMyGamification()` from `student_gamification` and builds the profile with `explorerProfileFromGamification(displayName, gamification)`. `getDashboardData()` still *returns* `MOCK_EXPLORER`, but the dashboard **destructures it away** and never passes it to `ExplorerProgress`. `getEventPageData()` also still attaches `MOCK_EXPLORER`; the event page ignores that field.

| Concern | Where it lives |
|---|---|
| Rule amounts (10 / 6 / 2 / 20) and level thresholds | `lib/gamification.ts` (pure functions; also used by checks and UI level display) |
| Amount actually added to the student | SQL `record_practice_attempt_and_award` (duplicated 10/6/2/20; awards from the **saved** `is_correct` / `hint_used` row, not from a client XP field) |
| Stored totals | `student_gamification.xp`, `streak_days`, `last_practice_date` |
| Idempotency | `gamification_attempt_awards` (per attempt id), `gamification_session_awards` (per session UUID) |
| Explorer Level | **Not a DB column.** `calculateLevelFromXp` / `explorerProfileFromGamification` from total XP |
| When it updates | Each successful `savePracticeAttempt` → RPC. Not on page refresh. Not on Check answer unless the attempt is saved. |
| What the student sees | After save: `+N XP` from the RPC `attemptXp` / `sessionBonusXp` (not client math). Results: session XP sum, Explorer Level from returned total `xp`, persisted streak. Dashboard: `getMyGamification()`. |

New student / missing row / read error: `EMPTY_GAMIFICATION` → 0 XP, Level 1, 0 streak. If the gamification migration is not applied, the dashboard still shows zeros; **saves fail** because the RPC is missing.

**Uncertain:** whether `20260824_gamification.sql`, `20260824_student_events.sql`, and `20260824_practice_session_size_10.sql` have been applied to the hosted Supabase project. The files tell you to run them in the SQL Editor; this repo does not record a live apply. Until the session-size migration runs, hosted +20 still fires at 8 saved answers while the UI runs 10-question sets.

Comments in `lib/types.ts` (“types are filled by mock data”) and `lib/progress.ts` (“Separate from mock Explorer XP”) are **stale**. Current behavior: Explorer XP is real; Event Level / mastery / event percent remain mock.

## Database

Application tables (from migrations):

- `practice_attempts`
- `student_gamification`
- `gamification_attempt_awards`
- `gamification_session_awards`
- `student_events` (selected event IDs; metadata stays mock)

Plus Supabase Auth (`auth.users`). Curriculum is **not** in the database.

See `DATABASE.md`.

## Mock vs real

| Real (from Auth / `practice_attempts` / `student_gamification` / `student_events`) | Still mock (in-repo seed; not computed from attempts) |
|---|---|
| Auth session + display name | Event **catalog** (`lib/mock/events.ts`): names, copy, Event Level, mastery, `progressPercent`, `kind` |
| **Selected event IDs** (`student_events`) | Question text/topics (all registered banks) |
| Saved attempts + hint flags | Unused mock Event Level / mastery / `progressPercent` fields |
| Progress Tracking (counts, correct of total, events tried) | Continue exploring / Next steps components (not on the dashboard) |
| **Explorer XP, Explorer Level, daily streak** | |
| Adaptive next-question selection | |
| Badge unlocks (computed from attempts) | |

Nine events exist in the catalog. Students may **save** the five unlocked quiz events. Locked events stay visible on the selection screen as **🔒 Coming later**. The dashboard lists **selected** events only, equally, with **Practice →**.

Astronomy is not in that catalog. `/events/astronomy` **404s** for students. The Astronomy bank remains registered for checks.

`lib/supabase/client.ts` (`createBrowserClient`) exists and is **unused**; Auth, practice, and event-selection writes use Server Actions + `lib/supabase/server.ts`.

## Security principles

- Authenticated user id is the student. Do not accept `student_id` from the browser.
- Do not put a service-role key in client or these helpers.
- Students must not be able to `UPDATE` their own `xp` (no UPDATE policy on `student_gamification`).
- Award XP from **saved** attempts, not from clicking Check answer.
- RLS on application tables; `anon` has no table access.
- Prefer server-side mutations (Server Actions + RPC).
- Limitation: `authenticated` can still `INSERT` `practice_attempts` via RLS, and can `EXECUTE` the award RPC, so a custom client could pass a spoofed `p_is_correct`. The shipped UI computes correctness in `insertPracticeAttempt` first. Students cannot set `xp` with a direct table update.

## Development principles

- Incremental slices. Do not rebuild the app.
- Do not fold Explorer Level, Event Level, and Topic Mastery into one number.
- Keep XP rules in `lib/gamification.ts`, not in UI `if`s. Display helpers (`describeXpAward`, `xpBarPercent`) label server amounts; they are not a second XP system.
- Additive migrations only; do not edit old migration files.
- After a new migration, tell the human to run it in the Supabase SQL Editor. Do not claim it is live.
- Check scripts: `lib/progress.check.ts`, `lib/learning/adaptive.check.ts`, `lib/learning/weak-points.check.ts`, `lib/gamification.check.ts`, `lib/badges.check.ts`, `lib/expeditions.check.ts`, `lib/recent-achievements.check.ts`, `lib/mock/astronomy-questions.check.ts`, `lib/mock/entomology-questions.check.ts`, `lib/mock/anatomy-physiology-questions.check.ts`, `lib/mock/water-quality-questions.check.ts`, `lib/mock/ecology-questions.check.ts`, `lib/mock/crime-busters-questions.check.ts`, `lib/mock/events.check.ts`, `lib/mock/curriculum.check.ts`, `lib/student-events.check.ts`

## Explicitly not implemented

- Trial Mode
- Lessons / course content / AI tutor
- Password reset / resend confirmation
- Practice bank for Codebusters
- Quiz practice for build events (Engineering CAD, Hovercraft, Rubber Band Catapult)
- Specimen images for Entomology image-required items (held out of live practice)
- Real Event Level or topic mastery
- Leaderboards, notifications, social features
- Streak freezes/repairs
- Official Science Olympiad items
- Service-role or admin tooling in this app
