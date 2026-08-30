# Jr. Explorer — product spec

Behavior as implemented in the current source. The code is authoritative if this file drifts.

Legend:

- **IMPLEMENTED** — students can use this in the app (assuming env + migrations)
- **PLANNED** — mentioned in code comments as a later replacement, not shipped
- **NOT YET IMPLEMENTED** — not in the product

There is **no** separate product roadmap file in this repository.

---

## IMPLEMENTED

### Account creation

`/signup`. Required: display name (min 2 characters), email, password (min 6 characters).

Creates a Supabase Auth user and stores `display_name` in user metadata. If the project requires email confirmation, the student sees a “check your email” message and must confirm, then log in. If a session is returned immediately, they go to event onboarding or the dashboard.

Friendly errors for duplicate email, weak password, and similar Auth failures.

### Login / logout

`/login`: email + password. Success → dashboard (or onboarding if no events). Logged-in students hitting `/login` or `/signup` are redirected home.

Header shows the display name (fallback **Explorer**). When signed in: **Map**, **Log**, **Badges**, **My Events**, and **Log out** (returns to `/login`).

Unconfirmed email and failed confirmation (`/login?error=confirm`) are explained in plain language.

### Protected app

Without a session, `/`, `/events/*`, `/map`, `/log`, `/badges`, onboarding, and profile redirect to `/login`. Public: login, signup, auth callback.

Logged in with **no event selections:** `/` and `/events/*` redirect to `/onboarding/events`. Students who already have selections skip onboarding.

Direct URLs for catalog events **not** on the student’s list redirect to `/`.

### Event selection

**IMPLEMENTED.** Students pick which catalog events they want to study.

- After signup/login, `/` checks `student_events`. Empty (or only leftover locked/Astronomy IDs) → `/onboarding/events`.
- Onboarding shows all nine catalog events. **Selectable (unlocked):** Water Quality, Ecology, Entomology, Anatomy & Physiology, Crime Busters. Locked events show **🔒 Coming later** and are not clickable. At least one unlocked event is required.
- Continue saves IDs to Supabase (validated against **selectable** IDs) and goes to `/`.
- Header **My Events** opens `/profile/events` with current choices. Save requires at least one unlocked event, then returns to the dashboard.
- Deselecting an event does **not** delete attempts, progress, XP, streak, or badges.

There is **no Trial Mode**.

### Dashboard (`/`)

After login:

1. Greeting with the student’s **real** display name (`user.user_metadata.display_name`)
2. **Explorer Level / XP / streak** — **real** gamification from `getMyGamification()` (`student_gamification`), then `explorerProfileFromGamification`. **Not** `MOCK_EXPLORER`.
3. **Daily mission** — progress only (0/1 complete a 10-question expedition today). **No extra XP.**
4. **Your Events** — **current** `student_events` only, equal **Practice →** cards with unique-question / expedition snippets. Mock Event Level / mastery / percent are **not shown**.
5. **Your Progress** — real historical practice: questions tried (including repeats), **X of N correct**, events tried. This can include events later removed from the current list.
6. **Recent achievements** — derived (new badges vs last complete set, streak milestone if practiced today, daily mission). Full shelf is on `/badges`.

Progress Tracking and gamification stay separate. XP is not called “learning progress.” Continue exploring / Next steps are **not** on the dashboard.

`getDashboardData()` still includes `explorer: MOCK_EXPLORER` for historical shape; `app/page.tsx` does not use that field.

### Event list

The mock catalog has **nine** 2027 Science Olympiad-style events. Students **select** a subset. The dashboard no longer lists the full catalog.

**Quiz / knowledge (open, live practice):** Water Quality, Ecology, Entomology, Anatomy & Physiology, Crime Busters.

**Quiz / knowledge (locked):** Codebusters.

**Build / engineering (locked):** Engineering CAD, Hovercraft, Rubber Band Catapult. These are not quiz-practice events and are not selectable.

All five open events use the **same** practice route and selector. Live practice = `verificationStatus === "verified"` (omitted counts as verified) **and** `imageRequired !== true`.

Astronomy is not in this catalog. `/events/astronomy` **404s**. The Astronomy bank remains registered for checks.

Locked catalog events are visible during selection as **🔒 Coming later**. They are not selectable. Direct URLs to locked catalog events show Coming later, not a quiz.

Mock Event Level / mastery / percent fields still exist on catalog objects but are **not shown** to students.

### Event page (`/events/[eventId]`)

Catalog events render a short event page. Extra Astronomy **404s**. Unselected catalog IDs redirect home.

- Short child-friendly overview
- **Start Practice** and **Practice Tricky Topics** when a live bank exists
- Unique live-question progress + expeditions completed
- **Worth revisiting** lists topics that are still weak (miss not yet cleared by three later corrects), using the last 40 attempts
- Locked events: **🔒 Coming later** (not a practice quiz)

There is no topic-card grid and no fake mastery on this page.

### Explorer Map, log, badges

| Route | Role |
|---|---|
| `/map` | Selected playable events only; unique live questions tried vs live bank size |
| `/log` | Recent completed 10-question sets; XP reconstructed from published +10/+6/+2 and +20-for-10 |
| `/badges` | All 15 derived badges (earned vs locked) |

### Practice

**Ten questions per set** (`PRACTICE_SET_SIZE = 10`), one at a time, chosen from the **event’s live practice pool** (`getPracticePageData` → `getQuestionsForEvent`). Image-required items are excluded. Astronomy remains 48 in the registry for checks. Order is adaptive, not a fixed list. The same `selectNextQuestion` runs for every live bank.

`MOCK_ASTRONOMY_PRACTICE_IDS` is **not** the practice set. It is a leftover 4-id list.

There are **no lessons** and **no AI** in this flow.

Flow:

1. Choose an option
2. Optional **Need a hint?** (hint stays visible; answering is still required)
3. **Check answer** — locks the choice, shows right/wrong copy, a lasting **+N XP** line (after save), explanation, and (if wrong) the hint
4. Save to Supabase; XP amounts come from the server (`+10` / `+6` / `+2`). Next / See results stays disabled until save succeeds
5. If save fails: message + **Try saving again** (same attempt id)
6. Repeat until 10, or the bank has no unused questions

Leaving early: answered questions that saved keep their attempt XP. The +20 completion bonus is **not** awarded unless 10 attempts share that session id.

**Try this set again** starts a **new** session (new session id). Adaptive history includes prior answers.

Results keep: questions answered, **X of N correct**, follow-up copy, Retry, Back to the event, plus XP earned this set, Explorer Level, streak. An extras overlay (level-up, new badge, streak milestone, first expedition of the day) sits on top of results when those extras happened; it does not auto-close.

### Questions

Registered MVP banks (not official Science Olympiad items):

| Event | Registered | Live (text, verified, no image required) |
|---|---|---|
| Entomology | 60 (`ento-q1`–`ento-q60`) | **27** |
| Anatomy & Physiology | 45 (`ap-q1`–`ap-q45`) | 45 |
| Water Quality | 40 (`wq-q1`–`wq-q40`) | 40 |
| Ecology | 40 (`eco-q1`–`eco-q40`) | 40 |
| Crime Busters | 40 (`cb-q1`–`cb-q40`) | 40 |
| Astronomy (checks only) | 48 | 48 (not a student catalog route) |

Multiple choice (`a`–`d`), difficulties 1 / 2 / 3, hint + explanation on every live item. `needs-review` and `imageRequired` items stay in the bank for history lookup and are **not** shown in live practice. The quiz does **not** tell a child that a specimen image is missing.

IDs are stable because saved attempts store `question_id`.

### Hints

Optional before checking. Once revealed, `hint_used` is saved as true for that attempt, even if the answer is correct. XP for hint-correct is +6, not +10.

### Answer feedback

Immediate. Correct: encouraging copy + explanation. Incorrect: no XP penalty messaging; explanation + hint. XP is never reduced.

### Adaptive learning

The next question is chosen from history (last **40** saved attempts plus this session), not a static list.

Intended behavior:

- A **miss** marks that topic as weak / tricky
- **Three later correct answers** on that same topic (hinted or not) mark it strong again
- A new miss on that topic resets the count
- Hint-correct with no miss does not mark the topic weak
- Prefer a **different topic** than the last question when possible
- Wait about **two** other questions before revisiting a weak topic
- Avoid repeating a question id recently seen in the set / last 10 history items when another item exists
- Difficulty eases after two trailing misses; rises after three trailing independent corrects

Results may note that some topics are worth revisiting.

### Practice Tricky Topics

Same quiz, `mode=weak`. Selection prefers topics that are still weak (unrecovered miss). If nothing is weak yet, the student still gets a 10-set, with a notice that this session is regular adaptive practice.

### Progress Tracking

From saved `practice_attempts` joined to the mock bank (for event/topic ids).

**Dashboard:** questions tried (including repeats), **X of N correct**, distinct events tried (historical). Separate from **Your Events** (current `student_events`).

Repeats count. Hint-correct still counts as correct. Empty state does not show 100% accuracy.

Independent of XP and of mock mastery.

### Gamification

**IMPLEMENTED** in application source. Motivation, not competition. Rewards practicing, answering, finishing a set, and returning. Does **not** award XP merely for clicking Check answer — only after a saved attempt.

Daily mission does **not** award extra XP.

This is a **different system** from Progress Tracking and from mock Event Level / mastery.

#### Where numbers come from (behavior)

- The quiz does not decide “+10”. It sends the answer; the server scores it against the mock bank; Postgres awards XP from the saved row.
- Totals the student sees on the dashboard are read from `student_gamification` (`xp`, `streak_days`).
- Explorer Level is computed in the app from that `xp` when rendering. It is not stored as a writable level column.
- After each saved answer, the quiz shows the RPC `attemptXp` (and `sessionBonusXp` on the 10th question). It does **not** compute +10/+6/+2 in the browser.
- Results-screen “+N XP” is the sum of XP the RPC reported as newly awarded in this set (attempt XP + at most one session bonus). Explorer Level on results uses the RPC’s running `xp`. Zero awards are not shown as a fake `+0 XP` reward.

If `student_gamification` has no row yet, the UI shows 0 XP / Level 1 / no streak — not fake starter XP from `MOCK_EXPLORER`.

#### XP

| Result | XP |
|---|---|
| Correct, no hint | +10 |
| Correct, hint used | +6 |
| Incorrect | +2 |
| Ten saved answers in one session | +20 once |

Incorrect answers still earn a little XP so mistakes are not punished.

A new student starts at **0 XP**, not fake starter XP.

#### Levels (Explorer Level)

Derived from total XP (not stored as its own source of truth):

| Level | XP range |
|---|---|
| 1 | 0–99 |
| 2 | 100–249 |
| 3 | 250–449 |
| 4 | 450–699 |
| 5 | 700–999 |
| 6 | 1000–1349 |
| 7 | 1350–1749 |
| 8 | 1750–2199 |
| 9 | 2200–2699 |
| 10 | 2700+ |

Dashboard shows `current XP / next-level threshold` and a bar from `calculateXpProgress` / `xpBarPercent`. Level 10 shows total XP only (no bar toward a fake Level 11).

#### Streaks

A day counts if the student **saves at least one practice question** that day.

- First practice day → 1
- Same calendar day → unchanged
- Next calendar day → +1
- Miss a calendar day → reset to 1 on the next practice day

Uses calendar dates (`YYYY-MM-DD`), not clock timestamps. The client sends the local date; the server only accepts it if it is within one calendar day of UTC today.

No streak freezes, repairs, or reminders. Empty streak copy: **Practice today to start a streak.**

#### Session completion

Each practice set has a UUID `session_id` shared by its answers. The +20 applies when this student has **10** saved attempts with that id, **once**. Nine answers: attempt XP only.

Refreshing results does not grant XP again. Extra **Check answer** clicks use the same attempt id (UI lock + unique award row), so they cannot double the XP. Answering the same question in a later session is a new attempt.

#### Returning the next day

Log in → dashboard (real XP/level/streak + real progress + recent achievements) → practice again. Adaptive selection uses persisted attempts. Streak increments only if the new practice date is the next calendar day after `last_practice_date`.

### Badges

**IMPLEMENTED.** Fifteen milestones computed from saved attempts and streak (`lib/badges.ts`). No badge table. Unlocks are not awarded from mock mastery. Full shelf is on `/badges`.

Includes First Try, First Expedition, Event Explorer (2 events), Explorer (3 events), Tricky Topic Tamer (miss then a later **independent** correct on that topic — still one recovery, not the 3-correct strong rule), Practice Regular (5 sets), Question Crusher (50), Curious Mind (100), event-set badges (5 expeditions on Water Quality / Entomology / A&P / Ecology / Crime Busters), Consistent Explorer (7-day streak), Dedicated Explorer (30-day streak).

---

## PLANNED

Not scheduled in a roadmap doc. Source comments say, later:

- Replace mock events / topics / questions with a real data layer **without** changing UI shapes
- Derive event progress percent from attempts instead of hand-written numbers
- Reimplement `getDashboardData()` when recommendations are real
- Live images on image-required items (Entomology first)
- Password reset / resend confirmation email

Until then, treat catalog metadata as mock TypeScript.

---

## NOT YET IMPLEMENTED

- Trial Mode (no guest/trial product; no trial routes or flags)
- Lessons, videos, or an AI tutor
- Password reset / resend email
- Practice bank for **Codebusters**
- Quiz practice for Engineering CAD, Hovercraft, Rubber Band Catapult
- Entomology specimen images in live practice
- Full 120–150 question competition banks
- Real Event Level, topic mastery, or event `progressPercent`
- Clickable “Continue exploring” / computed next steps
- Leaderboards, notifications, social features
- XP for speed, extra guesses, grinding the same click, or daily mission
- Parent/teacher accounts, class codes, or admin UI
- Official Science Olympiad content
