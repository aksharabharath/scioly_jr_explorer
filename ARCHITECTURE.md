# Jr. Explorer — architecture

How the app is structured in this repository, and why. Source code wins if this drifts. Next.js is hosted on Vercel; GitHub is the source / deploy trigger. Persistence is the five-table Supabase model in `DATABASE.md` (not a 13-table curriculum schema).

## High-level flow

```
Browser
  ↓
Next.js App Router (proxy.ts refreshes the Auth cookie)
  ↓
Server Components / Server Actions
  ↓
lib/*  (rules + persistence helpers)
  ↓
Supabase (Auth JWT + Postgres + RLS)
```

Curriculum does **not** go through Supabase:

```
lib/mock/curriculum.ts
  eventId → water-quality | ecology | entomology | anatomy-physiology | crime-busters
            (astronomy registered for checks only)
  ↓
lib/learning/adaptive.ts         (pick next question; generic)
  ↓
PracticeQuiz (client UI state)
  ↓
savePracticeAttempt Server Action
  ↓
insertPracticeAttempt
  (correctness from mock bank; student from session)
  ↓
RPC record_practice_attempt_and_award
  ↓
practice_attempts + XP tables
  ↓
later sessions: getMyRecentPracticeAttempts → adaptive again
```

## Next.js

- **App Router** (`app/`). No `pages/` router.
- **Next.js 16.3.2**. Conventions can differ from older training data (`proxy.ts` instead of `middleware.ts`, typed `LayoutProps`, etc.). Read `node_modules/next/dist/docs/` before adding framework APIs.
- Dashboard, login, and `/events` set `dynamic = "force-dynamic"` so Auth and Supabase reads are not statically cached.

### Routes

| Route | Kind | Notes |
|---|---|---|
| `/` | Server page | `requireUser()` then `requireEventSelection()` |
| `/login`, `/signup` | Server pages + client forms | Public |
| `/auth/callback` | Route handler | Auth code exchange |
| `/onboarding/events` | Server page | `requireUser()` only; redirects to `/` if already selected |
| `/profile/events` | Server page | `requireUser()`; edit selections |
| `/map`, `/log`, `/badges` | Server pages | User + event selection |
| `/events/[eventId]` | Server page | Events layout: user + event selection; unselected IDs redirect home |
| `/events/[eventId]/practice` | Server page | Loads bank + last 40 attempts, renders `PracticeQuiz` |

### Server vs Client Components

Almost everything is a **Server Component** (data fetching, Auth, progress, XP display).

`"use client"` only where the browser must hold interaction:

- `components/PracticeQuiz.tsx`
- `components/ExpeditionRewardsOverlay.tsx`
- `components/DailyMissionCard.tsx`
- `components/RecentAchievements.tsx`
- `components/useLocalCalendarDate.ts`
- `app/login/login-form.tsx`
- `app/signup/signup-form.tsx`
- `components/EventSelectionForm.tsx`

### Server Actions

| File | Actions |
|---|---|
| `app/auth/actions.ts` | `signUp`, `signIn`, `signOut` |
| `app/practice/actions.ts` | `savePracticeAttempt` → `insertPracticeAttempt` |
| `app/events/selection-actions.ts` | `saveSelectedEvents` → `setMySelectedEvents` |

Why: mutations run with the **user session cookie**, not a browser-authored `student_id`. The quiz never writes to Supabase with a service-role key.

## Supabase clients

```
lib/supabase/env.ts     public URL + publishable/anon key only
lib/supabase/server.ts  createServerClient + cookies (RSC / actions)
lib/supabase/proxy.ts   same keys on the request (session refresh)
lib/supabase/client.ts  createBrowserClient — defined, currently unused
```

**Why unused browser client:** login, signup, and practice saves go through Server Actions. Keep `client.ts` for future client Auth helpers; do not put a service-role key there.

No application code reads a service-role secret.

## Auth / session

```
Request
  → proxy.ts → updateSession()
       getClaims() refreshes cookies
       unauthenticated + not public → /login
       authenticated + /login|/signup → /
  → page
       getCurrentUser() / requireUser() via auth.getUser()
```

`getClaims()` in the proxy is the refresh/verify step. Do not insert logic between `createServerClient` and that call (comment in `lib/supabase/proxy.ts`).

Display name: `user.user_metadata.display_name`, else `"Explorer"`.

Email confirm: `signUp` sets `emailRedirectTo` to `/auth/callback`, which `exchangeCodeForSession` then redirects to `/`.

## Data flow (dashboard)

```
requireUser()
  requireEventSelection()         empty → /onboarding/events
  parallel:
    getDashboardData()            full mock catalog + mock recs
    getMySelectedEventIds()       REAL ids from student_events
    getMyPracticeAttempts()
    getAllQuestions()
    getMyGamification()
  resolveSelectedEvents(catalog, selectedIds)  → Your events
  explorerProfileFromGamification(...)
```

**No redirect loop:** onboarding is **not** behind `requireEventSelection`. Empty selections stay on `/onboarding/events`. Non-empty onboarding visits go to `/`.

Event page: still real Explorer Level + mock Event Level/mastery. Events layout also requires a non-empty selection.

## Mock curriculum

`lib/mock/` is the curriculum and dashboard chrome seed.

| Module | What |
|---|---|
| `events.ts` | Nine catalog `ScienceEvent` rows (`kind`: `quiz` or `build`) plus extra Astronomy |
| `curriculum.ts` | Generic getters: `getQuestionsForEvent`, `eventHasPractice`, event/practice page data |
| `astronomy.ts` | Astronomy topics/overview; leftover 4-id helper |
| `astronomy-questions.ts` | **48** Astronomy questions |
| `entomology.ts` | Entomology topics/overview |
| `entomology-questions.ts` | **60** Entomology questions; **36** live (17 Commons photos) |
| `anatomy-physiology-questions.ts` | **45** A&P questions, all live |
| `water-quality-questions.ts` | **40** Water Quality questions, all live |
| `ecology-questions.ts` | **40** Ecology questions, all live |
| `crime-busters-questions.ts` | **44** Crime Busters questions, all live (40 text + 4 fingerprint-family photos) |
| `explorer.ts` | Mock recs / next steps. `MOCK_EXPLORER` leftover; **not** the XP source |

**Why mock:** ship the student loop without a CMS. Getters return the same types the UI already uses so a later database can replace internals.

**Practice set vs leftover ids**

- Live practice: `getPracticePageData` → `getQuestionsForEvent` → that event’s live pool (`verified`; image-required items need `imageSrc` + `imageAlt`), then 10 selected by `selectNextQuestion`.
- `eventHasPractice(eventId)` is true when live questions exist. Build events and locked catalog events cannot open `/practice`.
- `MOCK_ASTRONOMY_PRACTICE_IDS`: four ids, **legacy**. **No `app/` route uses it.**

**Stale comments (do not treat as product truth):** `lib/types.ts` still says types are filled by mock data; `lib/progress.ts` still says stats are “separate from mock Explorer XP.” Explorer XP is real in the running pages. Those application comments were left as-is.

## Practice architecture

`PracticeQuiz` owns **UI state**: current question, selection, hint latch, submitted/saved, session records.

It does **not** own XP rules or correctness against the bank for persistence.

On start: `sessionId = crypto.randomUUID()`. Each Check answer: `attemptId` UUID (reused on save retry). `practiceDate = localCalendarDate()`.

Why wait for `saved` before Next: the 10th save must finish so the session bonus can be awarded before results read `sessionXpRef`.

## Adaptive-learning architecture

Pure functions in `lib/learning/adaptive.ts`. No I/O.

`toLearningAttempts(stored, bank)` drops unknown `question_id`s (old ids not in the bank).

`selectNextQuestion`:

1. Unused questions in the set (weak mode may shrink to weak topics)
2. Rotate away from last topic
3. If a due weak topic has waited ≥ 2 intervening questions, pick from it
4. Else avoid topics still in the spacing window
5. Prefer difficulty near `targetDifficulty`
6. Stable `id` sort as tie-break (deterministic, not random)

**Why topic-first:** one “mastery %” would hide which idea is shaky. **Why miss → 3 corrects:** Tricky Topics should match a rule a child can understand. **Why spacing:** do not hammer the same topic on consecutive questions.

Practice page loads **40** most recent attempts for selection; progress pages load **all** attempts. Different jobs.

## Progress architecture

Pure: `lib/progress.ts`. Maps `question_id` → bank → `eventId` / `topicId`. Counts rows, not unique questions.

UI: `OverallProgressCard`, `EventProgressCard`. Copy states this is activity, not XP, not mastery.

## Gamification architecture

Explorer XP / Level / streak are **real**. Event Level / mastery / event percent are **not**.

```
Check answer (PracticeQuiz)
  → savePracticeAttempt (Server Action)
  → insertPracticeAttempt
       is_correct from mock bank
       student from getCurrentUser()
       practiceDate via resolvePracticeDate
  → RPC record_practice_attempt_and_award   ← XP is ADDED here
       insert practice_attempts (ON CONFLICT id DO NOTHING)
       XP from saved is_correct / hint_used (10 / 6 / 2)
       unique attempt award; unique session award at 10 attempts (+20)
       update student_gamification.xp + streak_days + last_practice_date
  → quiz shows RPC attemptXp / sessionBonusXp; accumulates them for results
  → results: session XP sum, Explorer Level from returned total xp, streakDays

Dashboard / event Explorer Level
  → getMyGamification() SELECT xp, streak_days
  → explorerProfileFromGamification → calculateXpProgress(xp) / xpBarPercent
```

| Question | Answer in current source |
|---|---|
| Where is XP **calculated** for persistence? | SQL function, from the stored attempt row. `calculateAttemptXp` in `lib/gamification.ts` is the TypeScript copy of the same rules (tests + documentation). The UI does not add 10/6/2 itself. `describeXpAward` only labels the **server-returned** amounts. |
| Where is XP **stored**? | `student_gamification.xp`. Per-grant records: `gamification_attempt_awards`, `gamification_session_awards`. |
| How is Explorer Level calculated? | `calculateLevelFromXp` / `calculateXpProgress` from total XP. Thresholds in `LEVEL_MIN_XP`. Not persisted. |
| How do streaks work? | Calendar dates only. SQL compares `p_practice_date` to `last_practice_date` (same day / +1 day / gap / first day). TS `calculateStreak` mirrors that for tests. Client local `YYYY-MM-DD` is accepted only if within one calendar day of UTC today. |
| How do duplicate Check answer clicks not double-award? | UI: `savingRef`, ignore extra clicks after a successful submit, reuse `attemptId` until Next, Check answer disabled/hidden after submit. Database: `ON CONFLICT (id) DO NOTHING` on attempts and unique `gamification_attempt_awards.attempt_id` (duplicate → `attemptXp` 0). Refreshing results does not call the RPC. A later legitimate retry is a new attempt id. |
| When do XP/streak update? | Inside the RPC on a **new** attempt award (and session bonus if this insert made the session reach 10). Opening the dashboard or reloading results is SELECT only. |
| What is persisted? | Attempts (including `session_id`, `hint_used`), running xp/streak/date, award rows. |
| What is still mock? | Unused Event Level / mastery / percent fields on catalog objects. Continue exploring / Next steps components are unused on the dashboard. |

**Why RPC (`SECURITY DEFINER`):** students must not `UPDATE student_gamification.xp`. Award rows + one function make “one XP grant per attempt id” and “one +20 per session id” atomic with the insert.

**Why duplicate 10/6/2/20 in SQL:** Postgres cannot import `lib/gamification.ts`. Keep comments in sync; `lib/gamification.check.ts` covers the TS side.

**Table privileges (live, 2026-09-01):** `practice_attempts` SELECT+INSERT; `student_events` SELECT+INSERT+DELETE; `student_gamification` SELECT only; award tables none for `authenticated`. RLS policies match `DATABASE.md`. Two-account test after the attempts ACL fix: B could not see A’s practice data; save/XP still worked.

**Security limitations:** Cross-student isolation is enforced. This is **not** exam-grade anti-cheat. Students cannot UPDATE `xp` via RLS. They can SELECT their gamification row. Award tables have no authenticated grants. The RPC is `GRANT EXECUTE` to `authenticated` and takes `p_is_correct` from the caller, so a custom client could spoof correctness **for their own account**. Direct `INSERT` on `practice_attempts` is still allowed by RLS and would **not** award XP by itself. No service-role key in the Next app. `lib/supabase/client.ts` is unused.

## Component responsibilities

| Component | Responsibility |
|---|---|
| `SiteHeader` | Brand, name, Map / Log / Badges / My Events, login/logout |
| `EventSelectionForm` | Multi-select catalog; save via Server Action |
| `EventCard` | Equal-weight current-event cards; **Practice →** if open, **🔒 Coming later** if locked |
| `OverallProgressCard` | Real historical totals (questions tried / X of N correct / events tried) |
| `ExplorerProgress` | Real XP / level / bar / streak from `calculateXpProgress` |
| `DailyMissionCard` | 0/1 expedition today; no extra XP |
| `RecentAchievements` | Derived recent badges / streak / daily mission |
| `ExplorerMap` | Selected playable events; unique live questions |
| `ExpeditionLog` | Recent completed sets; reconstructed XP |
| `BadgeShelf` | Earned badges computed from saved attempts |
| `XpAwardFeedback` | Server-reported attempt/session XP after a saved answer |
| `ContinueExploring` / `NextSteps` | Unused mock dashboard widgets |
| `EventHero` | Unused event chrome (mock event stats) |
| `EventProgressCard` | Real event activity (unused on live pages) |
| `EventPracticeProgress` | Event unique / expeditions vs live bank |
| `TopicList` / `MasteryBadge` | Mock topic mastery |
| `PracticeQuiz` | Session UI + results + extras overlay |

## Important transformations

- Stored row `{ questionId, isCorrect, hintUsed }` + bank → `LearningAttempt` (adds topic + difficulty)
- Attempts + bank → `OverallProgress` / `EventProgress`
- `{ xp, streakDays }` + display name → `ExplorerProfile` (level, next threshold)
- Selected choice + question → `is_correct` on the server (`selected.id === question.correctChoiceId`)

## Security boundaries

| Trust | Do not trust |
|---|---|
| `auth.uid()` / `getCurrentUser().id` | `student_id` from the browser |
| Server-computed `is_correct` for the **intended** app path | Client-claimed XP amounts |
| Validated catalog event IDs | Arbitrary strings as event IDs; `student_id` from the browser |
| RLS + definer function | Service role in the Next app |

Limitation (honest): an authenticated client **could** call `record_practice_attempt_and_award` with a spoofed `p_is_correct`, same class of issue as the RLS `INSERT` on `practice_attempts`. That can inflate **their own** XP, not another student’s. The shipped UI does not do that; correctness is computed in `insertPracticeAttempt` first. Students still cannot `UPDATE student_gamification.xp` directly.

## Where logic belongs

| Kind | Place |
|---|---|
| XP / level / streak math (display + tests) | `lib/gamification.ts` |
| XP increment + uniqueness (source of truth) | SQL `record_practice_attempt_and_award` |
| Topic scoring / next question | `lib/learning/adaptive.ts` |
| Activity totals | `lib/progress.ts` |
| Badge unlocks | `lib/badges.ts` |
| Results copy (accuracy headline) | `lib/practice.ts` |
| Event-selection ID rules | `lib/event-selection.ts` |
| Event-selection persistence | `lib/student-events.ts` |
| Curriculum registry | `lib/mock/curriculum.ts` |
| Practice persistence | `lib/practice-attempts.ts` |
| Auth session | `lib/auth/session.ts` |
| Quiz widget state | `PracticeQuiz` |
| Page composition | `app/**/page.tsx` |

Do not put XP `if (correct) +10` in components. Do not query Supabase from random client components. Do not store curriculum correctness only in the browser.
