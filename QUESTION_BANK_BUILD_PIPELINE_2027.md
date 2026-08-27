# Question Bank Build Pipeline — 2027 MVP

## Purpose

This document is the reusable Cursor workflow for adding a new Science Olympiad event question bank to Jr. Explorer.

After the official rules are placed at:

`docs/events/<event>/RULES_2027.md`

Cursor should follow these phases in order.

The goal is an **MVP-quality, evidence-grounded text-first bank**, not a complete 120–150+ question competition bank.

---

# Phase 0 — Event setup

## Input

Official 2027 rules copied into:

`docs/events/<event>/RULES_2027.md`

Use the project's existing event ID and directory naming conventions.

## Rules

- Treat `RULES_2027.md` as the authoritative scope source.
- Do not invent missing rules.
- Do not silently import requirements from another year or division.
- Do not begin writing questions.
- Do not modify app behavior.

If the rules are incomplete, ambiguous, or appear to reference another official document, record that as a source gap rather than guessing.

---

# Phase 1 — Source ingestion

Create:

- `docs/events/<event>/SOURCE_INVENTORY_2027.md`
- `docs/events/<event>/CURRICULUM_2027.md`

## Source inventory

Record:

- official source identity
- exact file/path used
- event logistics
- competition format
- explicit topic areas
- named lists
- closed vs open-ended lists
- stated skills
- image/data requirements
- formulas, thresholds, units, or scoring information if explicitly present
- ambiguities
- source gaps
- claims that require external factual sources

Important:

**Scope is not evidence of biology.**

For example, if the rules name an organism, disease, structure, or parameter, that establishes that it is in scope. It does not automatically establish facts about it.

## Curriculum

Convert the official rules into a structured curriculum.

Separate:

- major areas
- subareas
- knowledge requirements
- skills
- closed lists
- examples
- `e.g.` / `such as` material
- `may include` material
- explicitly required material

Do not turn examples into closed requirements unless the rules clearly do so.

Run:

- `npm run lint`
- `npx tsc --noEmit`

Do not write questions.

---

# Phase 2 — Evidence acquisition and evidence matrix

Create:

`docs/events/<event>/EVIDENCE_MATRIX_2027.md`

## Goal

Map every meaningful curriculum requirement to actual evidence.

Use this hierarchy:

### A — Official rules/list evidence

Use the rules for:

- scope
- official names
- closed lists
- stated competition skills
- explicit requirements

### B — Authoritative factual sources

Use appropriate high-quality sources for factual claims, such as:

- OpenStax
- NIH / NLM / MedlinePlus
- CDC
- NCI
- EPA
- USGS
- NOAA
- NCBI
- other authoritative primary/educational sources appropriate to the event

Do not assume a source is evidence merely because it was named in a plan. Inspect it and extract the relevant claim.

### C — Image/data evidence

For questions requiring:

- specimen identification
- diagrams
- radiographs
- maps
- charts
- graphs
- sample data
- other visual stimuli

record a real source or mark the item `IMAGE-SOURCE-NEEDED`.

Do not use a text description as a substitute for a required visual.

### D — Human review

Use `HUMAN-REVIEW` when:

- official wording is ambiguous
- two legitimate interpretations exist
- two sources disagree
- terminology needs an event-specific decision
- a list boundary is unclear
- a source's licensing/use needs review

## Evidence rules

For every factual claim used to support a future question:

- record the source
- record the relevant page/section when possible
- record a short quotation or precise evidence note
- distinguish direct evidence from inference

Never mark a claim `SOURCE-VERIFIED` merely because it sounds scientifically correct.

---

# Phase 3 — MVP blueprint

Create:

`docs/events/<event>/QUESTION_BANK_BLUEPRINT_2027.md`

## Target

Default target:

**~40 text-first questions**

Acceptable range:

**~35–50**

Do not force the bank to reach 40 or 50 if evidence quality would suffer.

The target is an MVP ceiling/planning number, not an official competition requirement.

## Blueprint should specify

- target question count
- topic allocation
- difficulty distribution
- cognitive-demand distribution
- source/evidence coverage
- text-only vs image-required items
- deferred topics
- known evidence blockers

## MVP principle

Prefer:

**40 trustworthy questions**

over:

**50 questions padded with unsupported facts.**

## Images

For the MVP, default to text-first.

Do not create placeholder image questions.

Image-required questions should remain deferred unless real, usable image evidence/assets are available.

---

# Phase 4 — Author the MVP question bank

Create the event bank using the project's existing conventions.

Typical location:

`lib/mock/<event>-questions.ts`

Also create the corresponding bank check if the event pattern requires one.

## Default target

Write approximately **40 questions**.

Never invent content just to reach the target.

## Every question must

- have a unique ID
- fit the official 2027 scope
- be answerable from recorded evidence
- have exactly one defensible correct answer
- have four plausible options
- avoid duplicate/equivalent answers
- use the event's official terminology
- avoid unsupported claims
- have an answer-neutral hint
- include evidence/source metadata consistent with the project
- initially use:

`verificationStatus: "draft"`

## Do not

- write questions from memory when evidence is missing
- turn `e.g.` into an exhaustive list
- treat a named organism as evidence of its biology
- invent numerical thresholds
- invent formulas
- invent image interpretation
- create questions solely to satisfy a quota

## MVP content strategy

Favor:

1. explicit closed-list knowledge
2. directly sourced definitions
3. directly sourced distinctions
4. simple sourced applications
5. limited multi-step questions only when evidence supports them

Defer:

- unsupported ecology/biology
- detailed mechanisms without sources
- obscure trivia
- visual identification without assets
- chart/data interpretation without real data
- numeric standards without authoritative evidence

Run the event bank check, lint, and typecheck.

---

# Phase 5 — Question-bank QA and verification

Create/update:

`docs/events/<event>/QUESTION_BANK_QA_2027.md`

Review **every question individually**.

## Verification gate

A question may become:

`verificationStatus: "verified"`

only when:

1. its scope is supported by the official rules;
2. its answer is supported by recorded evidence;
3. every necessary factual claim is supported;
4. the keyed answer is uniquely correct;
5. every distractor is defensible as incorrect;
6. wording does not add unsupported assumptions;
7. hints do not reveal the answer;
8. explanations do not claim unsupported facts.

Otherwise use:

`verificationStatus: "needs-review"`

Do not mark something verified just because it is probably true.

## Minimal corrections

Small wording/metadata fixes are allowed when existing evidence supports the corrected version.

Do not turn QA into a second authoring pass.

If a question requires new evidence, leave it `needs-review` and record why.

## Final QA report

Include:

- total reviewed
- verified
- needs-review
- removed
- IDs by status
- modified questions
- evidence/source breakdown
- remaining gaps
- image blockers
- MVP readiness
- validation results

Run:

- event bank check
- curriculum check
- events check
- relevant student-events check
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

# Phase 6 — Register the bank

Register the event bank in the shared curriculum/registry architecture.

Do not create an event-specific practice system.

The bank should flow through the existing architecture:

`event → registered question bank → getQuestionsForEvent() → isLivePracticeQuestion() → shared practice route`

Confirm:

- all questions remain registered
- only verified, non-image-required questions are live-eligible
- historical question lookup still works
- the event has the expected topic/overview metadata
- no special selector was created

At this phase, the event can remain locked.

---

# Phase 7 — MVP unlock

Only unlock an event after QA establishes that it has a useful verified bank.

For a normal MVP event:

- set `unlocked: true`
- add it to `EVENTS_WITH_QUESTION_BANKS`
- make it selectable in onboarding/profile
- update dashboard/event copy
- use the existing shared practice route

Do not:

- create a special practice engine
- change XP amounts
- create event-specific gamification
- modify database schema
- create event-specific adaptive logic
- add image infrastructure just for one event

Run the full validation suite again.

---

# Phase 8 — Stop condition

Once an event has a solid MVP bank and works in the shared practice system:

**STOP CONTENT EXPANSION.**

Do not immediately build the full competition bank.

Move on to product validation:

- onboarding
- event selection
- practice
- answer submission
- feedback
- attempt persistence
- XP
- streaks
- dashboard
- history
- repeated sessions

Only return to content expansion later if the MVP requires it.

---

# Reusable decision rules

## If official rules are available

Proceed.

## If only a secondary restatement is available

Use it for planning only and clearly label it secondary.

Do not treat it as official verification.

## If a fact is not in the rules

Find an authoritative factual source before using it.

## If no authoritative source can be found

Mark it `SOURCE-NEEDED` and do not use it to justify a verified question.

## If a question requires an image

Find a real usable image source or defer it.

Never invent an image.

## If two sources conflict

Do not silently choose one.

Mark `HUMAN-REVIEW` and record the conflict.

## If the bank reaches ~40 good questions

Stop.

Do not manufacture additional questions just to reach a round number.

## If fewer than ~40 are supportable

Ship the smaller verified bank if it provides a meaningful MVP, or defer the event if the verified subset is too weak.

---

# What Cursor should NEVER do automatically

- Do not build a full 120–150 question bank unless explicitly asked.
- Do not unlock an event during authoring.
- Do not change XP.
- Do not change badges.
- Do not change Supabase schema.
- Do not create migrations for question content.
- Do not change the adaptive-selection algorithm.
- Do not create event-specific practice logic.
- Do not invent biology.
- Do not fabricate sources.
- Do not treat search snippets as evidence.
- Do not use another year's rules to fill gaps.
- Do not add placeholder images.
- Do not pad question counts.
- Do not modify another event's bank while working on the current event.
- Do not change existing verified questions from another event unless explicitly instructed.

---

# Standard command prompt

When beginning work on a new event, tell Cursor:

> Follow `docs/QUESTION_BANK_BUILD_PIPELINE_2027.md` for this event.
>
> The official rules are at `docs/events/<event>/RULES_2027.md`.
>
> Start at the earliest incomplete phase and perform only that phase. Do not skip ahead. Do not write questions until the pipeline explicitly reaches Phase 4. Do not modify other events or app behavior unless the current phase explicitly requires registration/unlocking.
>
> At the end, report what phase was completed, files changed, evidence/source gaps, and validation results.

If the event already has some pipeline files, inspect them first and continue from the earliest incomplete phase rather than recreating work.

---

# Definition of MVP complete

An event is MVP-complete when:

- official rules are ingested
- curriculum is structured
- evidence matrix exists
- blueprint exists
- approximately 35–50 high-quality text-first questions exist
- questions have passed individual evidence QA
- verified questions are registered
- the event uses the shared practice architecture
- the event can be unlocked without special-case code
- lint/typecheck/build pass
- the real student loop has been tested

A complete competition bank is **not** required for MVP completion.