# Jr. Explorer — MVP readiness audit

**This file is a snapshot from 2026-08-26.** Catalog, banks, and dashboard have moved on. Treat **`README.md`**, **`PRODUCT_SPEC.md`**, and **`PROJECT_CONTEXT.md`** as current product truth.

**Current MVP (code, 2026-08-29):** five playable text events (Water Quality, Ecology, Entomology 27 live, A&P 45, Crime Busters 40), shared 10-question engine, XP/streak, 15 derived badges, map/log/badges pages, Tricky Topics = miss → 3 later corrects. Codebusters and builds remain Coming later. Entomology images are still held out. Hosted migration apply is still **not** recorded here.

---

**Original date:** 2026-08-26  
**Scope:** Product MVP readiness, not competition-complete content.  
**Method:** Inspected `app/`, `lib/`, `components/`, `supabase/migrations/`, and docs against running TypeScript. No application behavior, question content, statuses, schema, XP rules, or deploy config were changed.

**Commands run (all passed):**

| Command | Result |
|---|---|
| `npm run lint` | Pass |
| `npx tsc --noEmit` | Pass (also re-run inside `next build`) |
| `npm run build` | Pass — Next.js 16.3.2, all app routes dynamic |

This is **not** a claim that hosted Supabase has the migrations applied. The live project was not inspected.

---

## 1. Executive summary

The **student product loop is implemented and shippable for Entomology**, provided production has Auth + the SQL migrations. The app is an authenticated practice product, not a public marketing site and not a full Science Olympiad test packet.

**What works today (in code):**

- Email/password Auth via Supabase (`app/auth/actions.ts`, `proxy.ts`)
- Event selection persisted in `student_events`
- Entomology live practice: **27 verified, non-image questions** from a registered bank of 60
- 10-question adaptive sessions, hints, explanations, server-side correctness
- Persisted attempts, XP, streak, derived badges, dashboard stats
- A&P **45 verified** questions registered but **intentionally locked** out of `/practice`

**What is not the MVP:**

- Lessons / “learn” pages / choose-a-topic study flow
- Water Quality and Ecology question banks
- A&P live practice (locked on purpose)
- Image-based Entomology items (9 `imageRequired`, all `needs-review`)
- Full 120–150 item competition banks

**Verdict:** Treat this as an **Entomology practice MVP**. Do not wait for A&P unlock or bank expansion. The remaining blockers are **operational** (env + migrations) and a few **P1 UX** issues (students can pick events that have no quiz).

---

## 2. Current implemented MVP surface

### Routes that exist (`app/`)

| Route | Role | Auth |
|---|---|---|
| `/login`, `/signup` | Public Auth | Public (`proxy.ts` `isPublicPath`) |
| `/auth/callback` | Email-confirm code exchange | Public |
| `/` | Dashboard | `requireUser` + `requireEventSelection` |
| `/onboarding/events` | First event picker | `requireUser` only |
| `/profile/events` | Change events | Logged-in; header “My Events” |
| `/events/[eventId]` | Event hub | Events layout: user + selection |
| `/events/[eventId]/practice` | Quiz | Same; `notFound()` if no live bank / locked / build |

There is **no** public landing page other than login/signup. Unauthenticated `/` redirects to `/login`.

There are **no** `/topics/*` or `/learn/*` routes.

### Implemented vs mocked vs dead

| Area | Status | Where |
|---|---|---|
| Auth (email/password) | **REAL** | `lib/supabase/server.ts`, `app/auth/actions.ts` |
| Event catalog metadata | **MOCK** | `lib/mock/events.ts` |
| Question banks | **MOCK files**, live-filtered | `lib/mock/curriculum.ts` |
| Event selection | **REAL** | `student_events` + `lib/student-events.ts` |
| Practice attempts | **REAL** (if migrations applied) | `lib/practice-attempts.ts` |
| XP / streak / session bonus | **REAL** (RPC) | `lib/gamification.ts` + `supabase/migrations/20260824_gamification.sql` |
| Explorer Level | **REAL derived** from XP | `calculateLevelFromXp` — not a DB column |
| Badges | **REAL derived** | `lib/badges.ts` — no badge table |
| Topic mastery / Event Level / `progressPercent` | **MOCK leftovers** | On `ScienceEvent` / `Topic`; **not shown** on dashboard cards |
| Lessons / topic study | **NOT IMPLEMENTED** | — |
| `MOCK_EXPLORER`, `MOCK_RECOMMENDED`, `MOCK_NEXT_STEPS` | **DEAD data** | `lib/mock/explorer.ts` — dashboard ignores explorer/recs/next steps |
| `EventHero`, `TopicCard`/`TopicList`, `NextSteps`, `ContinueExploring`, `EventProgressCard`, `MasteryBadge` | **DEAD UI** | Not imported by any `app/` page |
| Browser Supabase client | **UNUSED** | `lib/supabase/client.ts` |
| Astronomy bank | **REGISTERED extra** | Unreachable via catalog routes (`isStudentCatalogEventId` is false) |

### Entomology vs A&P architecture

Both banks map into the same generic `Question` type and `QUESTIONS_BY_EVENT` in `lib/mock/curriculum.ts`. Practice selection is **not** event-specific.

| | Entomology | A&P |
|---|---|---|
| Registered | 60 (`ento-q1`–`ento-q60`) | 45 (`ap-q1`–`ap-q45`) |
| Extra author fields | taxonomy tags, `imageBrief`, `sourceType` | `cognitiveDemand`, `evidenceIds`, `sourceType` |
| Mapper strips extras | `entomologyQuestionToPracticeQuestion` | `anatomyPhysiologyQuestionToPracticeQuestion` |
| Live filter | `verified` **and** `imageRequired !== true` | same (`isLivePracticeQuestion`) |
| Catalog `unlocked` | `true` | `false` |
| `/practice` | Open if event selected | **Blocked** (`getPracticePageData` returns null) |

`EVENTS_WITH_QUESTION_BANKS` in `lib/mock/events.ts` is **`["astronomy", "entomology"]` only**. The comment says keep it in sync with `QUESTIONS_BY_EVENT`, but A&P is registered and omitted. Harmless while A&P stays locked; it is **constant drift**, not a selector bug that drops A&P items.

---

## 3. End-to-end student journey

Intended audit journey vs code:

| Step | Status | Notes |
|---|---|---|
| Landing page | **PARTIAL** | No marketing home. `/` → `/login` if logged out (`proxy.ts`) |
| Sign up / sign in | **WORKS** (if env set) | `signUp` / `signIn` Server Actions. Missing env → friendly error on submit |
| Onboarding | **WORKS** | `/onboarding/events`; empty `student_events` redirects dashboard/events here |
| Choose event | **WORKS** | Selectable: Water Quality, Ecology, Entomology. Locked tiles cannot be saved |
| Event page | **WORKS** | Entomology: practice CTAs. WQ/Ecology: “will be here soon.” A&P (catalog URL): “Coming later” |
| Choose topic | **MISSING** | Topics exist in mock modules; event page does not render them |
| Learn | **MISSING** | No lessons. Product context already says no Trial Mode / lessons / AI |
| Practice | **WORKS** for Entomology | `getPracticePageData` → `PracticeQuiz` |
| Answer + feedback | **WORKS** | Client UI; correctness also recomputed on server at save |
| Earn XP | **WORKS** (if RPC exists) | Next/results wait until save succeeds |
| Topic mastery | **NOT IMPLEMENTED** | Adaptive scores topics internally; UI does not show mastery |
| Event progress | **PARTIAL / REAL counts** | Questions tried + accuracy (`EventPracticeProgress`), not mock Event Level |
| Return to dashboard | **WORKS** | Results → Dashboard / event; XP from `getMyGamification` |
| Continue practicing | **WORKS** | Try again uses in-session history; later visits use last 40 saved attempts |

**First point a real student gets blocked**

1. **No `NEXT_PUBLIC_SUPABASE_*` on the host** — cannot create a session. `getSupabasePublicEnv()` null → proxy sends protected routes to `/login`. **Operational P0.**
2. **Env set but SQL not applied** — can sign in and open Entomology practice; **Check answer fails**. **Operational P0.**
3. **Configured correctly but student only selected Water Quality or Ecology** — dead-end event page, no quiz. **P1 UX.** Entomology is still available via My Events.

If the student selects **Entomology** and the database is applied, the loop is not blocked in code.

---

## 4. Question-bank architecture status

### Shared schema (`lib/types.ts` `Question`)

Live practice uses: `id`, `eventId`, `topicId`, `prompt`, `choices`, `correctChoiceId`, `explanation`, `hint`, `difficulty` (1|2|3), optional `imageRequired`, optional `verificationStatus`.

Author-only fields (cognitive demand, sources, evidence IDs, taxon tags) stay on event-specific types and are not used by the adaptive selector.

### Entomology (`lib/mock/entomology-questions.ts`)

| Check | Result |
|---|---|
| IDs `ento-q1`–`ento-q60` registered | Yes — `QUESTIONS_BY_EVENT.entomology` |
| Live practice | `getQuestionsForEvent` → `isLivePracticeQuestion` |
| Verified + non-image | **27** live (q1–q5, q19, q20, q31–q50) |
| Held out | **33** `needs-review`, including **9** `imageRequired` |
| Image items in live pool | No |
| Historical lookup | `getQuestionById` / `getAllQuestions` include held-out IDs; event-page `toLearningAttempts` uses the **full** entomology slice |
| Selector dropping live items | No extra Entomology filter beyond verified + non-image |

Live Entomology is **narrow by topic**, not by a bug: almost all live items are `taxonomy` and `dichotomous-keys`. Visual ID, anatomy, ecology, and similar topics remain held out. That is content QA, not an engine failure.

### A&P (`lib/mock/anatomy-physiology-questions.ts`)

| Check | Result |
|---|---|
| IDs `ap-q1`–`ap-q45` registered | Yes |
| All `verified` | Yes |
| `imageRequired` | All `false` |
| Accidentally excluded by selector | **No.** They **are** live-eligible in the registry |
| Student practice | **Blocked on purpose** — `unlocked: false` → `getPracticePageData` null |
| Catalog | Locked; not in `getSelectableEventIds()` |

Unlocking A&P later would expose all 45 to `/practice` without further bank work. That is a product switch, not a missing mapper.

### Astronomy

48 questions, no `verificationStatus` (treated as verified). Extra event, not in the nine-event catalog. `/events/astronomy` is `notFound()`. Fine for MVP.

---

## 5. Practice engine status

**Path:** `getPracticePageData` → `PracticeQuiz` (`components/PracticeQuiz.tsx`) → `selectNextQuestion` (`lib/learning/adaptive.ts`) → `savePracticeAttempt` (`app/practice/actions.ts`) → `insertPracticeAttempt` (`lib/practice-attempts.ts`) → RPC `record_practice_attempt_and_award`.

| Concern | Status |
|---|---|
| Session creation | Client `crypto.randomUUID()` per set (`sessionIdRef`) |
| Set size | `PRACTICE_SET_SIZE = 10` |
| Selection | Topic-first adaptive; avoids in-session repeats; prefers rotating topics |
| Randomization | Not a full bank shuffle; difficulty targeting + due topics |
| Answer submit | Must save before Next / Results |
| Correctness | UI compares to `correctChoiceId`; **server** recomputes from mock bank |
| Duplicate Check | Same `attemptId`; DB unique award row → 0 extra XP |
| Retry / Try again | New session UUID; history includes this session’s attempts |
| Weak / tricky | `?mode=weak`; falls back to normal if no weak topics |
| Empty bank | `getPracticePageData` null → `notFound()` |
| Held-out / image | Not in `data.questions` passed to the quiz |
| Malformed IDs | Save returns “could not be saved” if question/choice missing |
| Event-specific engine | **None** — same selector for any live bank |

`lastWasRevisitEvidence` is accepted then ignored in `selectNextQuestion` (rotation uses history). Not an MVP blocker.

**XP vs session length (repo):** `lib/gamification.ts` uses session size **10**. Original RPC in `20260824_gamification.sql` uses **8**. Follow-up `20260824_practice_session_size_10.sql` is **syntactically incomplete** (no `end; $$;` before `revoke`). Applying it as written would fail in SQL Editor. If only the first gamification migration is live, **+20 fires on the 8th saved answer** of a 10-question UI set. Product still functions.

---

## 6. Progression / gamification status

| Feature | Classification | Evidence |
|---|---|---|
| XP per answer (10 / 6 / 2) | **REAL** | RPC + `lib/gamification.ts`; UI shows RPC amounts (`XpAwardFeedback`) |
| Session completion +20 | **PARTIAL** | Intended real; size 8 vs 10 until a valid SQL replace is applied |
| Explorer Level | **REAL** | Derived from total XP in UI |
| Daily streak | **REAL** | `student_gamification.streak_days` via RPC + local calendar date |
| Dashboard stats | **REAL** | `calculateOverallProgress` over saved attempts |
| Event question counts | **REAL** | `calculateEventProgress` |
| Topic mastery on cards | **NOT IMPLEMENTED** | Mock fields unused on dashboard |
| Event Level | **MOCK / UNUSED** in student UI | Catalog field; `EventHero` is dead |
| Event unlocks | **MOCK flags** | `unlocked` on catalog; A&P hardcoded locked |
| Badges | **REAL derived** | 7 definitions in `lib/badges.ts` |
| Event Explorer badge (2 events) | **PARTIAL** | Logic real; **unearn-able** while only Entomology has a live bank |
| World / map progression | **NOT IMPLEMENTED** | — |

Mistakes do not subtract XP (by design).

---

## 7. Auth / persistence status

| Question | Answer |
|---|---|
| Auth functional in code? | Yes — email/password, cookie session, `getUser()` on server |
| Users persisted? | Yes — `auth.users` |
| Separate student profile table? | **No** — display name in `user_metadata.display_name` |
| Progress persisted? | Attempt counts / accuracy from `practice_attempts` |
| Question history persisted? | Yes — `question_id`, `is_correct`, `hint_used`, `session_id` |
| XP transactions persisted? | Yes — award tables + running totals |
| RLS present in git? | Yes |
| Tables on hosted DB? | **Unknown** — only git migrations were inspected |
| Server/client split? | Server Actions + `lib/supabase/server.ts`. Browser client unused |
| Env handling? | Public URL + publishable/anon key only. No service-role in app code |
| Fresh user? | No `student_events` → onboarding. No gamification row → UI zeros until first successful save |

**Migrations in repo:**

1. `20260824_practice_attempts.sql` — table + RLS insert/select own
2. `20260824_practice_attempts_hint_used.sql` — `hint_used`
3. `20260824_gamification.sql` — XP tables, RLS (no client UPDATE on XP), RPC (session size **8**)
4. `20260824_student_events.sql` — selections + RLS
5. `20260824_practice_session_size_10.sql` — **broken function body** (missing `end; $$;`)

`.env.example` lists the two public vars.

**Integrity note (P2):** `insertPracticeAttempt` will persist any ID found in `getQuestionById`, including locked A&P or Astronomy, if a crafted client called the action. The student UI never sends those.

---

## 8. UI / UX status

**Usable:** Login/signup, onboarding with locked tiles, Entomology event page (Start Practice / Tricky Topics), quiz (hint, check, explanation, save retry), results (accuracy, XP, streak, badges), dashboard XP + badges + event cards.

**MVP-relevant problems:**

- Dashboard `EventCard` CTA is always **“Practice →”** (`app/page.tsx`) even for Water Quality / Ecology, which then say practice is not ready (`app/events/[eventId]/page.tsx`).
- Onboarding does **not** require Entomology. A student can continue with only WQ or Ecology.
- `eventStatusLabel` returns `"Practice"` for every unlocked catalog event (`lib/mock/events.ts`), including empty-bank quizzes.
- Results follow-up can say “pick a new topic” (`lib/practice.ts` `recommendNextStep`) though no topic picker exists.
- Dead components are unused leftover, not broken student buttons.

A&P “Coming later” on selection is **accurate**. Entomology is the only honest practice target among selectable events.

---

## 9. Vercel / production-readiness status

| Check | Result |
|---|---|
| `npm run build` | **Pass** |
| Lint / tsc | **Pass** |
| Next on Vercel | Compatible (App Router, `proxy.ts`) |
| Hardcoded production secrets | **None found** |
| `localhost` | Fallback origin only in `signUp` if `Origin`/`Host` missing |
| Service role | Not in app |
| Runtime env | **Required** for Auth; missing env is not a compile failure |
| Auth Site URL / redirect | Must include production origin + `/auth/callback` (ops, not in repo) |
| README | Still **create-next-app boilerplate** |
| Static vs dynamic | All app routes dynamic — correct for Auth |

**What would block a *useful* Vercel deploy** (the Next build itself is clean):

1. Forgetting Vercel env vars
2. Forgetting to run SQL on the linked Supabase project
3. Auth email confirm with wrong Site URL / redirect allow-list
4. Optionally: applying the broken session-size SQL file (the Next app would still build)

---

## 10. P0 — Must fix before MVP

These are **ship gates**, mostly operational. No in-repo UI rewrite is required to start Entomology practice.

1. **Set production env vars** on Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Code: `lib/supabase/env.ts`.
2. **Apply working migrations** on hosted Supabase: practice_attempts, hint_used, gamification (RPC), student_events. Without these, Check answer cannot persist.
3. **Configure Supabase Auth for the production URL** (Site URL, redirect to `/auth/callback`). Handler: `app/auth/callback/route.ts`.

Do **not** treat “A&P not live” or “only 27 Entomology questions” as P0.

---

## 11. P1 — Should fix before MVP

1. **Steer students to a practiceable event.** Onboarding/dashboard can imply every open event is a quiz. Empty banks: Water Quality, Ecology. Files: `app/onboarding/events/page.tsx`, `app/page.tsx`, `components/EventCard.tsx`.
2. **Repair or replace `20260824_practice_session_size_10.sql`** (add `end; $$;` like the original gamification file) and apply it so +20 XP matches 10-question sets.
3. **Document deploy** (env + migration order). `README.md` is still the Next default; real notes live in `DATABASE.md`.
4. **Soften “Practice →”** on dashboard cards for events without a live bank.

---

## 12. P2 / deferred work

- Unlock A&P or grow A&P past 45
- Entomology 120–150 bank, image items, remaining `needs-review` topics
- Water Quality / Ecology banks
- Lessons, topic pages, wiring `TopicCard` / `EventHero`
- Event Explorer badge becoming earnable via a second live event
- Adding A&P to `EVENTS_WITH_QUESTION_BANKS`
- Delete or wire dead mock recs / leftover components
- Browser Supabase client
- Blocking crafted saves of locked-event question IDs
- Advanced gamification, maps, Event Level as a real system
- Refreshing stale docs (`ARCHITECTURE.md` still mentions 8-question sets and ~30 Entomology items)
- Competition-complete disease/muscle coverage

---

## 13. Recommended MVP build sequence

1. Confirm Vercel env + Auth URLs + migrations 1–4 applied; smoke: signup → pick **Entomology** → 10 questions → XP on dashboard.
2. Fix session-size SQL if +20 must land on question 10.
3. P1 copy: which events actually have practice.
4. Ship Entomology MVP.
5. **Later:** unlock A&P (45 already verified) or expand Entomology — separately, not as a ship gate.

---

## 14. Explicit DO NOT BUILD YET

Do not spend MVP time on:

- Full Entomology or A&P competition banks
- Image specimen workflows
- Remaining Entomology `needs-review` topics (visual ID, anatomy, ecology, …)
- Every listed A&P disease / the other 23 muscles
- Unlocking A&P just to “use” the 45 verified items
- Lessons / learn path / topic grid
- Water Quality and Ecology content
- New badge tables, Event Level, mastery percents
- CMS / moving banks into Postgres
- Service-role keys in the app
- Redesigning the adaptive selector
- Public marketing landing
- Astronomy as a student catalog event

---

## Appendix — live Entomology vs held-out

Live (verified, text): **ento-q1–q5, q19, q20, q31–q50** (27).  
Held out: **q6–q18, q21–q30, q51–q60** (33), including image-required visual items.

A&P: **ap-q1–ap-q45** all verified, all text, **locked**.

No q61+ or ap-q46+ exist. This audit did not add any.
