# Jr. Explorer — changelog

## Current state

Jr. Explorer is a Next.js 16 App Router app with Supabase Auth. A signed-in student can choose **Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime Busters**, run a **10-question adaptive practice** set from each event’s **live pool**, use hints, see immediate feedback and a lasting XP line, and persist each answer to `practice_attempts`. Later sessions reuse that history. **Practice Tricky Topics** uses miss → weak / 3 later corrects → strong (last 40 attempts). **Your Progress** shows real attempt stats (**X of N correct**) and is separate from XP and from **Your Events**. Home also has a daily mission (progress only), recent achievements, and links to **Map**, **Log**, and **Badges**.

Astronomy is not a 2027 student catalog event. The bank remains for checks. Student routes `/events/astronomy` 404.

**2027 catalog (9 events):** five unlocked quiz events (all with live banks) and four locked **Coming later** (Codebusters + three builds). Entomology live practice is **36** of 60 registered items (19 text + 17 Commons photographs with non-spoiling overlays). Crime Busters live practice is **44** of 44 (40 text + 4 Loop / Whorl / Arch photos). CC BY / CC BY-SA photos show a credit line under the figure.

**Gamification v1 is real:** Explorer XP, Explorer Level (derived from XP), and daily streak. Live RPC (2026-09-01) uses session size **10** and +20 once per completed session UUID. Daily mission does not award extra XP.

**Event Selection v1 is real in source:** chosen event IDs live in `student_events`. Only selectable IDs can be saved. Unselected event URLs redirect home. Deselecting an event does not delete attempts or XP.

**Badges are real and computed:** 15 milestones from persisted attempts. No badge table.

**Still unused mock fields:** Event Level, mastery, progress % on catalog objects (not shown on student cards). Continue exploring / Next steps components exist but are not on the dashboard.

**Not in the product:** Trial Mode, lessons, AI, leaderboards, Codebusters practice, quiz practice for build events, password reset. Entomology practice **does** include Commons specimen JPEGs (see `docs/events/entomology/IMAGE_QA_2027.md`).

**Hosted persistence (verified 2026-09-01):** five application tables, RLS own-row policies, RPC `session_size = 10`, `practice_attempts` SELECT+INSERT only. Two test accounts: isolation held; save and XP still worked. Details: `DATABASE.md`.

Git history in this clone may lag the working tree. Product slices below are marked **Undated** when ship dates are unknown.

---

## 2026-09-01 — practice_attempts ACL documentation

Production `authenticated` privileges on `practice_attempts` were tightened to SELECT+INSERT (REVOKE ALL then GRANT). `supabase/migrations/20260901_practice_attempts_authenticated_privileges.sql` records that SQL for other environments; **it was not executed on production** because the dashboard change was already live. RLS policies were not changed.

---

## Undated — five-event MVP + expeditions UX + Tricky Topics rule

Unlocked A&P, Water Quality, Ecology, and Crime Busters for the shared practice engine. Split map / log / badges off the dashboard. Daily mission progress-only. Lasting XP line. Rewards overlay without auto-close. Unique live-question progress. Miss → weak / three later corrects → strong for Tricky Topics (40-attempt cap kept).

---

## Undated — MVP launch prep

Catalog locked/open split, dashboard simplified to XP + Your Events + Your Progress + badges, event pages lead with Start Practice, sessions moved from 8 to 10 questions, image-required Entomology items filtered from live practice, Astronomy removed from student routes, and `20260824_practice_session_size_10.sql` added so hosted +20 matches the 10-question set.

---

## Undated — initial dashboard

Create Next App scaffold plus a Jr. Explorer dashboard shell: header, mock events, **then-mock** Explorer Level/XP, Continue exploring, Next steps, Tailwind theme. Established the rule that Explorer Level, Event Level, and Topic Mastery stay separate fields. (Explorer XP/Level/streak were later replaced by the real gamification slice below; Event Level and mastery stayed mock.)

## Undated — Astronomy curriculum

Mock Astronomy event page: overview, four topics (Sun and Stars, the Moon, solar system, day/night/seasons), and a question bank. Content is original prototype text, not official Science Olympiad items. Question ids are treated as stable.

## Undated — practice flow

`PracticeQuiz`: one question at a time, optional hint, Check answer, explanation, next item, results (answered / correct / accuracy) with Retry, back to event, dashboard. Session size later became 8; results copy still comes from the answers just given.

## Undated — Supabase authentication

Email/password signup (display name in metadata), login, logout, `/auth/callback`, `proxy.ts` session refresh, protected `/` and `/events/*`. Display name is real; it is not taken from mock explorer data. Public env vars only — no service-role key in the app.

## Undated — practice persistence

Table `practice_attempts` (`student_id`, `question_id`, `selected_option_id`, `is_correct`, `answered_at`) with RLS so students insert/select only their rows. Server Action saves after Check answer. Correctness is computed from the mock bank on the server.

Migration: `20260824_practice_attempts.sql`.

## Undated — hint persistence

Column `hint_used` on `practice_attempts` (existing rows default `false`). Quiz sends whether the student opened the hint. Adaptive scoring can treat hint-correct as different from independent correct after reload.

Migration: `20260824_practice_attempts_hint_used.sql`.

## Undated — adaptive learning

`lib/learning/adaptive.ts` replaces a fixed practice list. Topic scores (wrong / hint / independent correct, recency-weighted), topic rotation, spacing before revisit, recent-id avoidance, simple difficulty stepping. Selection uses saved history plus the current set.

## Undated — expanded question bank

Astronomy bank grown to **48** questions (ids `astro-q1` … `astro-q48`), four topics, mixed difficulties. Original ids kept so old attempts still resolve. Practice draws from the **full** bank via `getQuestionsForEvent`. The 4-id `MOCK_ASTRONOMY_PRACTICE_IDS` list remains only as an `eventHasPractice` indicator.

## Undated — Work on Weak Points

`/events/astronomy/practice?mode=weak` uses the same quiz with `mode: "weak"`. Selector prefers topics with revisit score `> 0`. If none, regular adaptive practice plus an explanation.

## Undated — Progress Tracking

`lib/progress.ts` + dashboard/event cards: questions answered, accuracy (hidden when empty), events practiced, topics covered in Astronomy. Reads all saved attempts. This is activity tracking, **not** Explorer XP and **not** mock mastery. (A comment in `lib/progress.ts` still says “mock Explorer XP”; that comment is outdated — XP is real as of the gamification slice. The comment was not edited in the documentation pass.)

## Undated — Gamification v1

Replaces mock Explorer XP/Level on the dashboard (and Explorer Level on the Astronomy hero) with persisted XP, derived level, and daily streak. **Source of displayed XP:** `getMyGamification()` → `student_gamification`, not `MOCK_EXPLORER`. Session UUID on attempts; this slice used +20 at **8** answers. Later `20260824_practice_session_size_10.sql` moved the bonus to **10**; **live RPC (2026-09-01) uses 10**. Results show XP gained this set. Rule copy lives in `lib/gamification.ts`; increments go through `record_practice_attempt_and_award`.

Migration: `20260824_gamification.sql` (on the hosted project as of 2026-09-01). Older attempts are not backfilled into XP.

## Undated — Gamification v1 student-facing display

Keeps the existing XP / Level / streak rules and schema. After a saved answer, students see the RPC-awarded amount (`+10` / `+6` / `+2`, plus `+20` on set complete) instead of a silent save. Results show session XP, Explorer Level from persisted total XP, and streak. Dashboard progress bar uses existing level thresholds; Level 10 does not imply a further level. Event hero shows overall XP and streak next to Explorer Level. Duplicate protection (UI + unique award rows) was verified, not replaced. No new database table.

## Undated — Event Selection v1

Students choose which catalog events to study. IDs persist in `student_events` (RLS: select/insert/delete own rows). Empty selection after login goes to `/onboarding/events`. Dashboard lists selected events only. **My Events** (`/profile/events`) updates the set. Astronomy was the only implemented curriculum at the time of this slice. Deselect does not delete practice or XP. Trial Mode is still not implemented.

Migration: `20260824_student_events.sql` (present on the hosted project as of 2026-09-01).

## Undated — 2027 event catalog + Entomology practice

Replaced the six-event prototype catalog with nine 2027 events. Entomology is the primary quiz-practice event (30-item bank through the generic curriculum registry and existing adaptive selector). Water Quality and Ecology are quiz events without banks. Three build events are listed but cannot open `/practice`. Astronomy’s bank and `/events/astronomy` routes still work; Astronomy is not in the new catalog. No Supabase schema change.
