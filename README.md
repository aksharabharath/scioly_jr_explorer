# Jr. Explorer

Science Olympiad question-and-answer practice for elementary students. Science learning is the product. Practice, feedback, and returning later matter more than game mechanics.

This is **not** an official Science Olympiad test bank.

## Current MVP

The shippable loop is:

**Sign up / sign in → choose a playable event → 10-question practice → answer → feedback → finish → save attempts → XP / streak → dashboard**

| Event | Status |
|---|---|
| **Entomology** | Playable. 60 registered questions; **27** verified, text-only items enter live practice. Image-required and `needs-review` items stay in the bank for history lookup but are not selected. |
| **Anatomy & Physiology** | Playable. 45 verified, text-only questions enter live practice through the same 10-question engine as Entomology. |
| **Water Quality** | Playable. 40 verified, text-only questions. |
| **Ecology** | Playable. 40 verified, text-only questions. |
| **Crime Busters** | Playable. 40 verified, text-only questions. Image identification is not in this MVP. |
| Other 2027 catalog events | Visible as **Coming later**. Not selectable. |

Do not treat a full competition bank or image questions as MVP work.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- Supabase Auth (email/password). `students.id` is `auth.users.id` — there is no separate student profile table
- Supabase Postgres for attempts, XP, streak, and event selection
- Question banks and event metadata live in TypeScript (`lib/mock/`)

## Local development

```bash
npm install
cp .env.example .env.local
# fill in the two required public Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visits go to `/login`.

## Environment variables

See `.env.example`. Required on local and Vercel:

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable / anon key |

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is an optional fallback if the publishable name is unset.

**Never** put the service-role key in the app, `.env.example`, or client code. The app uses only the public URL + publishable/anon key (`lib/supabase/env.ts`).

## Supabase setup

1. Create a project and enable Email auth.
2. Copy the project URL and publishable (or anon) key into `.env.local` / Vercel.
3. Apply the SQL migrations (next section).
4. Configure Auth URLs (below). Do not hardcode a production domain in the repo.

### Auth URL configuration (manual)

In the Supabase dashboard: **Authentication → URL Configuration**.

| Setting | What to put |
|---|---|
| **Site URL** | The origin students use: `http://localhost:3000` for local, or your Vercel origin in production (for example `https://your-app.vercel.app`) |
| **Redirect URLs** | The same origins plus `/auth/callback`. Include both local and production if you use both, e.g. `http://localhost:3000/auth/callback` and `https://your-app.vercel.app/auth/callback` |

Signup uses the request origin for `emailRedirectTo` (`app/auth/actions.ts`). The handler is `app/auth/callback/route.ts`. If Site URL / redirects do not match the deployed origin, email confirmation will fail.

## Database migrations

There is **no** `students` or `practice_sessions` table. Identity is `auth.users`. A practice set is a client-generated `session_id` on `practice_attempts`.

Apply these files **in order** in the Supabase SQL Editor. Do not assume they are already live.

1. `supabase/migrations/20260824_practice_attempts.sql`
2. `supabase/migrations/20260824_practice_attempts_hint_used.sql`
3. `supabase/migrations/20260824_gamification.sql`
4. `supabase/migrations/20260824_student_events.sql`
5. `supabase/migrations/20260824_practice_session_size_10.sql` — required so the +20 session bonus fires at **10** answers, not 8

Details: `DATABASE.md`.

Without these, a student can sign in and open Entomology practice, but **Check answer cannot save**.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npx tsx lib/mock/entomology-questions.check.ts
npx tsx lib/mock/anatomy-physiology-questions.check.ts
npx tsx lib/mock/curriculum.check.ts
```

Other engine checks: `lib/gamification.check.ts`, `lib/mock/events.check.ts`, `lib/student-events.check.ts`.

## Architecture constraints

- Entomology stays 60 registered / 27 live. Do not add `ento-q61+`.
- A&P stays 45 registered, all verified, unlocked for live practice. Do not add `ap-q46+`.
- Historical attempts resolve through the full question registry (`getQuestionById` / `getAllQuestions`), including held-out Entomology items.
- XP is awarded only inside `record_practice_attempt_and_award`. The UI displays server-returned amounts. Duplicate Check answer uses the same attempt id and does not double-award.
- Question text is not stored in Postgres.

## What is not live yet

- Lessons / topic study pages
- Image-based Entomology items (held out of the live pool)
- Codebusters practice
- Full 120–150 question competition banks
- Password reset / resend confirmation
- Hosted migrations are **not recorded as applied** in this repo — run the SQL files in the Supabase SQL Editor
