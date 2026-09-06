# Hint authoring guide

**Source of truth** for writing and reviewing `hint` text on Jr. Explorer live practice questions.

This is not a generic tutoring style sheet. It is the product rule set for the current implementation: one student-facing clue per question, four multiple-choice options, optional reference materials, and a separate “Explain this question” field that is **not** a hint.

---

## 1. What exists today

### Live catalog

Practice draws from five unlocked quiz events. Live items are `verified` questions that pass `isLivePracticeQuestion` in `lib/mock/curriculum.ts` (image items also need a real `imageSrc`).

| Event | Live questions |
| --- | ---: |
| Anatomy & Physiology | 45 |
| Ecology | 40 |
| Water Quality | 40 |
| Crime Busters | 44 |
| Entomology | 36 |
| **Total** | **205** |

Astronomy and `needs-review` items are not in the student catalog.

### Data model

Each `Question` has a required `hint: string` (`lib/types.ts`).

`hint2` exists on the type and in mappers (`optionalSecondHintFields` in `lib/practice.ts`). **Live banks do not author `hint2`.** Do not populate it. Do not design a two-level hint system.

`wordingHelp` is a different field. Practice shows it as **“What this is asking”** before Check answer. It restates the task. It is not a hint, not XP-related, and not a substitute for `hint`.

`promptTerms` (tap-a-word glossary) also does not replace a hint.

### Student UI (`components/PracticeQuiz.tsx`)

- Before Check answer, the student can tap **Need a hint?**
- That reveals the authored `hint` labeled **Clue**.
- Opening a clue does **not** submit the question.
- Opening a clue does **not** award XP by itself.
- If the student never opened a clue and then misses, the same `hint` text can appear in the feedback panel after submit.

An **Another clue** control exists only when a non-empty `hint2` is present. That path is unused in the live catalog. Do not write content for it.

### Scoring and selection (boundaries only)

Gamification and adaptive selection already treat “hint used” as a property of the attempt:

- `hintUsed` is true if the student opened the clue (see `attemptUsedAHint` in `lib/practice.ts`).
- A **correct** answer with `hintUsed` awards less attempt XP than an unhinted correct answer (`XP_CORRECT_WITH_HINT` vs `XP_CORRECT` in `lib/gamification.ts`).
- An **incorrect** answer is the same XP whether or not a hint was opened.
- Adaptive difficulty treats “independent correct” as correct **and** not hinted (`lib/learning/adaptive.ts`).

This guide does **not** redefine those numbers or flows. Authors only need to know: a hint is optional assistance; it is not a penalty button and not a reward button.

### Layers the student already has

Keep these jobs separate:

| Layer | Job |
| --- | --- |
| Stem + choices | The assessment |
| `wordingHelp` | What the question is asking (task restatement) |
| `hint` | What to **do next** (this document) |
| Post-answer `explanation` | Why the keyed choice is right |

If the hint restates the stem, it is competing with `wordingHelp`. If it teaches the fact, it is competing with the explanation.

---

## 2. Central rule

> **A hint should tell the student what to DO next, not tell them what the answer MEANS.**

**Do next** means a solving move: inspect, compare, look up, start a key, keep units consistent, separate two ideas.

**What the answer means** is a definition, synonym, alternate name, formula that *is* the keyed choice, or a classifier that only one choice matches.

A hint is **not** good merely because it makes the question easier.

A hint is good if it makes the **solving process clearer** without giving away the answer.

---

## 3. Purpose of a hint

A finished hint should do all three:

1. **Preserve the challenge.** The student still has to reason, observe, calculate, classify, or look something up.
2. **Reduce uncertainty.** After reading it, they know a concrete next move.
3. **Teach a reusable strategy** when possible (how to use a table, how to start a key, how to compare function vs structure).

Reject:

> “A hint is good if it makes the question easier.”

Use:

> “A hint is good if it makes the solving process clearer without giving away the answer.”

---

## 4. Recurring principle: next step, not destination

> **Give the next step, not the destination.**

The student should receive enough to make progress, but not enough to identify the keyed choice by:

- keyword matching
- synonym matching
- definition matching
- unfair elimination
- being told the lookup result
- being told the diagnostic image label

---

## 5. Answer-leakage standard

Leakage is a **fairness** failure. A hint can be scientifically true and still be invalid.

Semantic equivalence counts. Exact string match is not required.

Inspect **all four choice texts**, including aliases (see §6). Ask:

> Could a student select the keyed choice by matching something in the hint to one option, without doing the intended work?

### 5.0 Choice-match leakage test

A hint fails this test if a student can scan the four choices and match a
distinctive phrase, concept, definition, synonym, parenthetical, classifier,
or other answer-bearing wording in the hint to one choice and identify or
eliminate the answer without doing the intended reasoning.

The test is not merely “Does the hint contain the exact answer?” Ask:

> If I were a student who did not know the answer, could I scan the four choices, find a phrase or concept from the hint that uniquely matches one choice, and get the answer without doing the intended reasoning?

If yes, rewrite the hint. Treat all of these as potentially answer-bearing:

- exact terms, synonyms, and alternate names
- parenthetical text attached to a choice (parentheses are part of the answer-bearing text)
- definitions or distinctive phrases appearing in only one choice
- unique classifiers such as a body part, population concept, process, category, location, or material
- wording that makes one choice fit while making the others obviously wrong
- reference results, image diagnostics, or calculation results that reveal one choice

Keep these failure modes separate:

1. **LEAKAGE:** the hint gives away the answer or a unique match to it.
2. **ELIMINATION:** the hint makes distractors obviously wrong without teaching the intended reasoning.
3. **USELESSNESS:** the hint merely rephrases the question or says “focus on X” without a useful next action.

The core principle is:

> A hint should tell the student **what to do next**, not **what to look for in the answer choices**.

For reference questions, use **RESOURCE + ACTION**: “Use the official
list/reference. Find the relevant entry and compare the printed information
with the choices.” Do not name the exact entry or result the student should
discover. For image questions, describe where or how to inspect the specimen,
not its unique identifying feature. For calculation questions, point to the
relevant relationship, method, or units without giving an answer-specific
result or enough instructions to mechanically select one choice. For
conceptual questions, provide a decision rule or comparison framework, not the
defining property of only the correct choice.

### 5.1 Exact terminology

If a distinctive word or multi-word fragment appears in the keyed choice (and not as a generic word already in the stem), the hint must not use it.

**BAD**

- Choice: `Osteon`
- Hint: `This is also called a Haversian system.`

### 5.2 Synonyms and alternate names

Treat as the same concept:

- textbook name ↔ common name
- abbreviation ↔ expansion
- formula name ↔ formula
- scientific name ↔ official common name
- parenthetical alias (see §6)

**BAD**

- Choice: `Osteon (Haversian system)`
- Hint: `This unit is called a Haversian system.`

The reverse is also a leak (`osteon` in the hint when the choice says `Haversian system`).

### 5.3 Definitions (critical)

A hint must not define the keyed idea in other words.

**BAD**

- Choice: `Hematopoiesis (blood-cell production)`
- Hint: `Red marrow is where new blood cells are made.`

The word “hematopoiesis” never appears, but the hint supplies the parenthetical definition. The student can match meaning, not skill.

Guide the student to a **distinction** (process vs place vs structure vs function vs list heading) without stating the keyed definition.

### 5.4 Unique-choice mapping

A hint can leak without using any answer word.

**BAD** (choices: chemical / living organism / machine / public-awareness campaign)

- Hint: `Look for the living agent.`

That classifier uniquely tags one choice.

> **Do not introduce a classifier that uniquely identifies the correct choice.**

Preserve meaningful uncertainty among remaining options.

### 5.5 Elimination leakage

Do not strike enough options that the keyed choice is the only one left—or the only plausible one.

**BAD**

- `Don't choose the skin, bone, or nerve option.` (when the fourth option is keyed)

**BAD** (softer)

- `Do not pick beetle families or the grasshopper family.` (when that leaves one family)

**Legitimate narrowing:** point at a *kind of work* (use the table; start at couplet 1; compare function) while several choices still fit that work.

**Unfair elimination:** name distractors, or name a property only the keyed choice has.

### 5.6 Stem-aware exception

If the stem already uses a term, repeating it in the hint is not automatically a leak.

Ask: **Did the hint introduce a distinctive answer term the stem did not give?**

If yes, treat it as a potential leak even if the science is fair.

### 5.7 Phrase-level matches

Multi-word fragments shared with the keyed choice are leaks even when the hint never says “the answer is…”.

**BAD**

- Choice: `Stratum corneum`
- Hint: `The outer stratum corneum layer…`

---

## 6. Parenthetical and alias text is part of the answer

> **Parenthetical text in an answer choice is part of the answer concept.**

`Hematopoiesis (blood-cell production)` is one concept. The hint must not give:

- hematopoiesis
- blood-cell production
- a paraphrase of blood-cell production
- a definition that makes the parenthetical obvious

`Osteon (Haversian system)`: neither name belongs in the hint.

Apply the same rule to:

- parentheses
- em dashes
- colons introducing an alias
- explanatory appositives
- slash-separated aliases (`Crayfish/Crawdads`)
- scientific / common-name pairs (`Apidae — bees`)

---

## 7. Helpfulness standard (not just fairness)

A fair hint can still fail.

### LOW / USELESS HINT (question rephrase)

The hint must not merely restate the stem.

**BAD**

- Stem: Which structure controls X?
- Hint: Think about which structure controls X.

**BAD**

- Stem: What happens when X occurs?
- Hint: Think about what happens when X occurs.

**BAD**

- Stem: Which statement is true about Y?
- Hint: Compare the statements about Y.

Those do not answer “What should I do next?”

A hint should add a **move**: a comparison, a resource, a procedure, a distinction—not a paraphrase of the ask. (`wordingHelp` already covers task restatement.)

---

## 8. Competition vs general learning

Jr. Explorer is built from Science Olympiad–style 2027 event material, but students also use it as a study product.

### Competition-specific language

If current in-repo event rules explicitly permit a resource at the event, you may describe it as the official / permitted list, table, or rules text **for that event**. Do not invent what is allowed at a tournament.

### General-learning language

A field guide, textbook, or website may be suggested as a **study** aid.

Do **not** say a general study resource is legal in competition unless the current rules document for that event says so.

**GOOD**

> Have an insect reference handy — the official list or a field guide can help.

That supports both official-list lookup and study use. It does **not** claim the field guide is tournament-legal.

**BAD**

> A field guide is allowed during competition.

(unless the event’s current rules explicitly say that)

---

## 9. Reference-lookup hints (RESOURCE + ACTION)

Used heavily in Entomology, Water Quality, Crime Busters list items, and some Ecology “official names” items.

Preferred shape:

> **RESOURCE + ACTION**

Safe to include:

- which resource (official 2027 list, adult-macroinvertebrate table, rules section, NIST/RHS paragraph as already named in the stem or event materials)
- which section, column, or heading *type* to inspect
- what to search for (names **already in the stem**)
- what to compare
- what action to take (read the heading above the name; start at couplet 1)

Must **not** include:

- the correct classification, row, value, or name if that is the keyed choice
- answer-bearing terminology that appears in only one choice
- the lookup **result**

**GOOD**

> Have an insect reference handy. Find the names already in the question and check which order each is listed under.

**BAD**

> Find cockroaches and termites and check whether they are listed under Blattodea.

The resource/action strategy is good. The endpoint is not.

For dichotomous keys, teach **procedure**, not the terminal taxon (see §11 and §16).

---

## 10. Image hints

Tell the student **where/how to look**, not what the image *is*.

Safe:

- count visible structures (only if counting is not a unique classifier for one choice—always check the options)
- compare shape, arrangement, proportions
- inspect a circled or marked region
- compare two labeled specimens
- follow a key using what is visible

**BAD** if the keyed choice is that pattern or taxon:

> Look for a loop pattern.

**GOOD** (fingerprint-style observation)

> Watch whether ridges come back out on the same side, make a complete circuit, or rise and leave on the other side.

The student still has to interpret what they see.

Do not name the diagnostic feature when that feature uniquely tags one choice (for example “aquatic beetle family” when only one option is an aquatic beetle family).

---

## 11. Dichotomous-key hints

Teach the procedure.

**GOOD**

> Start at couplet 1 and choose the branch that matches the specimen.

**BAD**

> The specimen follows the branch leading to [taxon].

Do not reveal the endpoint. Do not say which couplet letter (1a vs 1b) is correct unless that is not recoverable from the stem and would uniquely name the answer.

For **construct-a-key** items (“best first split”), point at the *kind* of evidence to use (official printed names vs unsourced habits) only if several choices still compete. If only one choice uses list headings, that classifier is a unique-choice leak.

---

## 12. Calculation and formula hints

Hints may say:

- which quantities matter
- what relationship family to use (mass and volume; keep units consistent)
- what conceptual operation to perform

Do **not** paste the keyed expression when the four choices *are* formulas or relationships and only one matches that expression.

Always evaluate the actual choices first. The same sentence can be SAFE on a numeric item and BLOCKER on a “which formula” item.

---

## 13. Conceptual hints

Create a **decision process**, not a definition.

Useful patterns (only if they do not uniquely map to one choice):

- Compare what each choice actually describes.
- Separate structure from function.
- Decide whether the process involves movement, selection, or chance—**only if those three labels do not 1:1 match the four options**.
- Compare where each structure occurs.
- Focus on the function named in the stem, then see which choice is about that function rather than another job.

Avoid vague filler: “Think carefully.” “Use what you know.”

---

## 14. Information budget

Give the smallest next step that reduces genuine confusion.

Stop before the student can finish by matching.

If you need a second sentence, you are often sliding into the explanation. Cut back to one concrete move.

---

## 15. Tone

Hints should be:

- short (usually one or two sentences)
- concrete
- student-friendly for the Jr. Explorer learner
- actionable
- calm
- non-condescending

Avoid:

- textbook lecture
- “obviously” / “clearly”
- exclamation points
- motivational fluff
- introducing extra technical terms not needed for the next move
- long explanations (that is `explanation` after submit)

---

## 16. Question-type patterns

Examples are **patterns**. They are not permission to skip reading the four choices.

### Conceptual / reasoning

| | |
| --- | --- |
| Accomplish | A distinction or comparison the student can apply to every option. |
| Safe | Axes of comparison that several choices still share. |
| Too revealing | The keyed definition, or a 1:1 label for each option. |
| **BAD** | Biological control uses living enemies. |
| **GOOD** | Compare the choices by what kind of tool they describe, not by whether they would “work.” |

### Image identification

| | |
| --- | --- |
| Accomplish | A systematic look at the photo. |
| Safe | Where to look; what to compare; marked region. |
| Too revealing | The taxon, pattern name, or unique diagnostic that only one choice has. |
| **BAD** | This is a swallowtail. / Look for the loop. |
| **GOOD** | Compare the marked region to the choices; do not decide from the everyday name alone. |

### Official-list lookup

| | |
| --- | --- |
| Accomplish | How to use the closed list. |
| Safe | RESOURCE + ACTION; search terms from the stem. |
| Too revealing | The order, family, class heading, or cell that is the answer. |
| **BAD** | It is listed under Blattodea. |
| **GOOD** | Have an insect reference handy — the official list or a field guide can help. Find the names in the question and read the rank printed with them. |

### Field-guide / study reference

| | |
| --- | --- |
| Accomplish | Same as lookup, without claiming tournament legality. |
| Safe | “Official list or a field guide can help.” |
| Too revealing | “A field guide is allowed at the event.” (unless rules say so) |
| **BAD** | Use any website; the answer is the common name bees. |
| **GOOD** | Match the specimen to an official common name on the list, not to a look-alike everyday word. |

### Dichotomous key (follow a printed key)

| | |
| --- | --- |
| Accomplish | Start at the top; follow the matching couplet. |
| Safe | Procedure. |
| Too revealing | The terminal name or “take 1a.” |
| **BAD** | Couplet 1a leads to Acrididae. |
| **GOOD** | Start at couplet 1. Use the printed names, then follow only the couplet that applies. |

### Classification / grouping

| | |
| --- | --- |
| Accomplish | Which *kind* of grouping the question wants (rank, list heading, functional class)—without naming the keyed group. |
| Safe | “Check rank and what is printed under the name.” |
| Too revealing | “See whether any families are listed” when only one choice mentions families listed/none. |
| **BAD** | It is an order with no families. |
| **GOOD** | Find the name on the official list and compare how it is placed relative to the other choices. |

### Anatomy / structure

| | |
| --- | --- |
| Accomplish | Separate layer vs organ vs process; stay in the system named by the stem. |
| Safe | “Stay with a skin layer, not marrow or a joint cavity” **only if that does not name the keyed layer and several skin-layer choices remain**. |
| Too revealing | Alternate names (Haversian), definitions (blood-cell production), “get taller” when only one choice is about length growth. |
| **BAD** | This unit is also called a Haversian system. |
| **GOOD** | The stem already names compact bone. Stay with a compact-bone term, not a muscle or skin term. |

### Ecology / process

| | |
| --- | --- |
| Accomplish | Which process family, without paraphrasing the keyed sentence. |
| Safe | “Ask whether resources stay limited” if both logistic and exponential choices discuss resources. |
| Too revealing | Restating “early maturity and many unattended offspring” when that is the keyed choice. |
| **BAD** | r-selected species mature early and have many young. |
| **GOOD** | Compare timing of maturity and how much care offspring receive—without copying one choice. |

### Source / table lookup (Water Quality and similar)

| | |
| --- | --- |
| Accomplish | Find the printed name; read the heading above it. |
| Safe | Table, column, closed list; spelling as printed in the stem. |
| Too revealing | “Not the Class 5 title” when Class 5 is a choice; naming the keyed class. |
| **BAD** | Air Breathing Snail is Class 4. |
| **GOOD** | Find the printed name on the table and read the heading above that cell. |

### Chemistry / powders and liquids

| | |
| --- | --- |
| Accomplish | Match the name in the stem to the right *kind* of record (formula vs use vs product list). |
| Safe | “Match this chemical name to the printed product list, not to a different kitchen liquid.” |
| Too revealing | The formula itself when choices are formulas; “not water” when H₂O is a choice and three remain—borderline; prefer not naming leftover formulas. |
| **BAD** | Table salt is NaCl. |
| **GOOD** | Match the everyday name in the stem to that compound’s formula, not the formula of a different listed powder. |

### Calculation / formula

| | |
| --- | --- |
| Accomplish | Quantities and unit discipline. |
| Safe | “Use mass and volume together; keep units consistent.” |
| Too revealing | `density = mass ÷ volume` when that string is one of four choices. |
| **BAD** | Use density = mass ÷ volume. |
| **GOOD** | Decide which quantities the stem gives, then which relationship among the choices uses those quantities. |

### Fingerprint / image observation

| | |
| --- | --- |
| Accomplish | How ridges behave, not the family name. |
| Safe | Same-side exit vs complete circuit vs rise-and-leave. |
| Too revealing | “This is a loop.” |
| **BAD** | Look for the loop pattern. |
| **GOOD** | Watch whether ridges come back out on the same side, make a complete circuit, or rise and leave on the other side. |

---

## 17. Quality rating (for audits)

| Rating | Meaning |
| --- | --- |
| **BLOCKER** | The hint effectively gives away the keyed choice (paraphrase, unique classifier, lookup result, or elimination to one option). |
| **HIGH RISK** | Distinctive keyed terminology, synonym, definition, named distractors, or diagnostic that substantially narrows to the answer. |
| **MEDIUM** | Some narrowing; real reasoning or lookup still required. |
| **LOW** | Fair but useless (stem rephrase, empty “think about it”). |
| **SAFE** | Fair **and** useful: a concrete next step that does not identify the answer. |

> A hint should only be considered finished when it is both **SAFE** and **USEFUL**.

MEDIUM is not a ship target. LOW is a fail for helpfulness even when leakage is absent.

---

## 18. BAD → GOOD transformations

Always re-check the **actual four choices** after rewriting. A “GOOD” pattern can still leak on a specific item.

### Direct terminology / alias

**BAD:** This unit is also called a Haversian system.

**GOOD (pattern):** The stem already asks for the repeating unit of compact bone. Stay with a compact-bone unit name, not a muscle or receptor name.

If “repeating unit of compact bone” appears only in one choice, this GOOD example is still a leak. Change the move.

### Definition

**BAD:** Red marrow is where new blood cells are made.

**GOOD (pattern):** Separate the place this happens from the *name of the process* the stem is asking for—without defining that process.

### Unique classifier

**BAD:** Look for the living agent.

**GOOD (pattern):** Compare the choices by what kind of tool they describe.

If the stem already says “living tools” and only one choice is living, do not repeat “living.”

### Elimination

**BAD:** It isn’t A, B, or C. / Do not pick the beetle or grasshopper families.

**GOOD (pattern):** Compare the choices using the feature the question is testing (list heading, photo, couplet), without naming options to drop.

### Reference result

**BAD:** Look up the insect under Blattodea.

**GOOD:** Find the insect in the official list and check which order it is listed under.

### Stem rephrase

**BAD:** Think about which structure controls movement.

**GOOD:** Compare the choices by what each structure actually does, not by which system it sounds like.

---

## 19. Authoring workflow

1. Read the stem.
2. Read **all four** choices (including aliases and parentheticals).
3. Identify the skill (lookup, key, image, distinction, formula, …).
4. Decide the solving strategy you want to teach.
5. Write the **smallest useful next step**.
6. Compare the draft to every choice for exact words, phrases, and synonyms.
7. Check definitions and parentheticals.
8. Check unique classifiers and elimination.
9. Check that the hint is not a restatement of the stem (`wordingHelp` is the restatement slot).
10. Revise until the hint is SAFE and USEFUL.

> **Never write the hint from the stem alone.**
>
> **Never write the hint from the correct answer alone.**
>
> The four choices must be visible while authoring.

---

## 20. AI / Cursor authoring rule

Do **not** generate a hint from only:

- the stem
- the correct answer
- the topic name

Must inspect:

- stem
- all four choices
- which choice is keyed
- event reference context when the item is a list/table/key question

Then ask:

1. Could a student match something in this hint directly to one choice?
2. Am I defining the answer rather than teaching a solving move?
3. Does this hint tell the student what to do next?
4. Did I introduce a term the stem did not give that appears (or is synonymous with text) in only the keyed choice?

If yes to (1), (2), or (4), rewrite. If no to (3), rewrite (avoid LOW / useless).

Do not populate `hint2`. Do not change XP, UI, or adaptive code to “fix” a bad hint.

---

## 21. Review checklist

Run against **every** hint before it ships.

### Answer leakage

- [ ] Hint does not contain the keyed answer text
- [ ] No synonym / alternate name / abbreviation / formula alias for the keyed choice
- [ ] Does not define the keyed idea in other words
- [ ] Does not define parenthetical, dash, slash, or “Name — common name” aliases
- [ ] Does not introduce a classifier that uniquely tags one choice
- [ ] Does not eliminate so many options that the answer is obvious
- [ ] Does not reveal a reference-lookup **result**
- [ ] Does not name a diagnostic image feature that uniquely IDs one choice
- [ ] Does not paste the keyed formula when choices are formulas

### Helpfulness

- [ ] Tells the student what to do next
- [ ] Gives a concrete comparison, procedure, resource, or observation
- [ ] A student would know what to try after reading it

### Originality vs stem

- [ ] Adds a solving move beyond the question wording
- [ ] Is not a rephrase of the stem (and does not duplicate `wordingHelp`)

### Student experience

- [ ] Concise
- [ ] Understandable to the target learner
- [ ] Encouraging without filler
- [ ] Preserves the challenge

---

## 22. MVP boundaries (do not expand in hint work)

- One authored hint per live question.
- `hint2` remains unused; do not start a multi-level clue product.
- Do not add new hint XP events (opening a clue is not an XP grant).
- Opening a hint does not submit the answer.
- Do not redefine gamification; hinted-correct vs unhinted-correct already exists.
- Vocabulary taps and Explain (`wordingHelp`) are not hints.
- Do not change routing, database, or PracticeQuiz to paper over leakage.

---

## 23. All five live events

The same leakage and usefulness rules apply everywhere. The **solving move** changes:

| Event | Typical next step |
| --- | --- |
| Anatomy & Physiology | Stay in the named system; separate structure, process, and location; do not supply textbook aliases. |
| Ecology | Compare process families; do not paraphrase the keyed sentence. |
| Water Quality | Find the printed string; read the heading; do not name the class or list. |
| Crime Busters | Point at the named handbook/table/paragraph; observe prints without naming the pattern family. |
| Entomology | Official list or key procedure; do not name the taxon or unique diagnostic. |

Do not force every hint into one sentence template. Force every hint through the same **fairness + usefulness** gate.

---

## 24. Related files (implementation)

| File | Role |
| --- | --- |
| `lib/types.ts` | `hint`, optional `hint2`, `wordingHelp` |
| `lib/practice.ts` | `attemptUsedAHint`, unused `hint2` helpers |
| `components/PracticeQuiz.tsx` | Need a hint? → Clue |
| `lib/mock/curriculum.ts` | Live question filter |
| `lib/gamification.ts` | Hinted-correct XP (do not redefine here) |
| `lib/learning/adaptive.ts` | Independent correct = unhinted |

Event banks live under `lib/mock/*-questions.ts`. This guide does not replace event evidence matrices; those govern facts. This guide governs **hint fairness**.
