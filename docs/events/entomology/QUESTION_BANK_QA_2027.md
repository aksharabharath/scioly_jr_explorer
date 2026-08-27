# Entomology 2027 — Question Bank QA

Content QA of `lib/mock/entomology-questions.ts` (q1–q60 only). No bank expansion. No app, database, XP, or practice-logic changes.

**Authority:** `RULES_2027_OFFICIAL.md` and aligned `TAXON_LIST_2027.md`. Also checked: `CURRICULUM_2027.md`, `EVIDENCE_MATRIX_2027.md`, `QUESTION_BANK_BLUEPRINT_2027.md`.

General biology was **not** treated as enough evidence to mark a question `verified`. Official **scope** (anatomy/ecology/keys **may** appear) does **not** verify a biological answer.

---

## Schema mapping

The implementation supports `verificationStatus: "draft" | "needs-review" | "verified"`. There is **no** `"source-needed"` value.

| QA report status | `verificationStatus` in code | Meaning |
|---|---|---|
| **VERIFIED** | `verified` | Official list/rules fully support the answer **and** the MCQ is well constructed |
| **SOURCE NEEDED** | `needs-review` | Biological (or other) fact is not established by the official file |
| **IMAGE SOURCE NEEDED** | `needs-review` | Licensed specimen/diagram + diagnostic still missing |
| **HUMAN REVIEW** | `needs-review` | Unresolved official-text ambiguity blocks verification |
| **REMOVE** | — | None this pass |

Practice live pool = `verified` **and** `imageRequired !== true`.

---

## Overall results

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED | **27** | q1–q5, q19, q20, q31–q50 |
| SOURCE NEEDED | **24** | q11, q14–q16, q18, q21–q23, q25–q30, q51–q60 |
| IMAGE SOURCE NEEDED | **9** | q6–q10, q12, q13, q17, q24 |
| HUMAN REVIEW | **0** | — |
| REMOVE | **0** | — |

Source bank remains **exactly q1–q60**. Nine image-required items stay held out of live practice.

This document records the **final MVP cleanup** of that bank. **`verificationStatus` changes this pass: none.** The verified core (q1–q5, q19, q20, q31–q50) stayed verified. Image-required and source-dependent items stayed `needs-review`. No q61+ items were added.

---

## Per-question table

| ID | Topic | QA result | Code status | Official-rules/list support | External source? | Image? | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | --------------------------- | ---------------- | ------ | -------------- | ----------------------- |
| q1 | taxonomy | VERIFIED | verified | Blattodea = cockroaches/termites | no | no | Explanation: Orthoptera/Coleoptera official order names | — |
| q2 | taxonomy | VERIFIED | verified | Collembola = springtails, snow fleas | no | no | sourceNote | — |
| q3 | taxonomy | VERIFIED | verified | Ixodidae / Non-Insect Arthropods / hardback ticks | no | no | Hint no longer names the Non-Insect heading | List grouping is official; description “insects” vs ticks is a packet ambiguity, not this stem |
| q4 | taxonomy | VERIFIED | verified | Ephemeroptera = mayflies | no | no | none this cleanup | Star unused |
| q5 | taxonomy | VERIFIED | verified | Apidae (bees) → Hymenoptera | no | no | Hint no longer lists other Hymenoptera families | — |
| q6 | visual-id | IMAGE SOURCE NEEDED | needs-review | Formicidae = ants (name only) | diagnostics | **yes** | Hint no longer names ants | No photo; petiole/antenna not on list |
| q7 | visual-id | IMAGE SOURCE NEEDED | needs-review | Papilionidae = swallowtails | hindwing tails | **yes** | Hint no longer names swallowtails | No photo; tails not on list |
| q8 | visual-id | IMAGE SOURCE NEEDED | needs-review | Notonectidae = backswimmers | orientation | **yes** | Hint no longer maps common name to orientation | Photo + orientation fact |
| q9 | visual-id | IMAGE SOURCE NEEDED | needs-review | Curculionidae = weevils | snout | **yes** | Hint no longer names weevils | Photo + snout diagnostic |
| q10 | visual-id | IMAGE SOURCE NEEDED | needs-review | Collembola names/rank | furcula | **yes** | none | Photo + furcula |
| q11 | comparison | SOURCE NEEDED | needs-review | Both families listed | swimming orientation | no | none | Orientation is not a list fact |
| q12 | comparison | IMAGE SOURCE NEEDED | needs-review | Family names listed | antenna/palp split | **yes** | Hydrophilidae = water scavenger; hint/explanation | Photo + unsourced antenna split |
| q13 | comparison | IMAGE SOURCE NEEDED | needs-review | Tipulidae/Culicidae listed | piercing/blood-feeding | **yes** | none | Photo + mouthpart/blood fact |
| q14 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy **in scope** only | tagmata | no | none | No official structure checklist |
| q15 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | exoskeleton function | no | none | Not a rules fact |
| q16 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | leg attachment | no | Hint no longer names thorax | Not a rules fact |
| q17 | external-anatomy | IMAGE SOURCE NEEDED | needs-review | Anatomy in scope | cerci location | **yes** | Hint no longer names abdomen rear | Diagram + unsourced location |
| q18 | dichotomous-keys | SOURCE NEEDED | needs-review | Keys in scope | orientation couplet | no | sourceNote (may/will, not “required”) | Couplet biology |
| q19 | dichotomous-keys | VERIFIED | verified | Orthoptera family official names | no | no | sourceNote cites RULES_2027_OFFICIAL.md | Name-only key |
| q20 | dichotomous-keys | VERIFIED | verified | Official name groups (diving/water vs grasshoppers/crickets) | no | no | Choice A no longer asserts habitat; Hydrophilidae = water scavenger | — |
| q21 | ecology-habitat | SOURCE NEEDED | needs-review | Trichoptera = caddisflies | larval freshwater habitat | no | none | Habitat not on list |
| q22 | ecology-habitat | SOURCE NEEDED | needs-review | Ephemeroptera = mayflies | naiad habitat | no | none | Habitat not on list |
| q23 | life-cycles | SOURCE NEEDED | needs-review | Taxa listed; life cycles **not named** | metamorphosis/pupa | no | none | Not official domain |
| q24 | behavior-adaptations | IMAGE SOURCE NEEDED | needs-review | Dytiscidae listed; adaptations **may include** | natatorial | **yes** | none | Image + glossary not official |
| q25 | behavior-adaptations | SOURCE NEEDED | needs-review | Gryllidae listed; behavior **may include** | stridulation | no | none | Mechanism not on list |
| q26 | human-impact | SOURCE NEEDED | needs-review | Culicidae; public health **may include** | pathogens | no | none | Disease example not a list fact |
| q27 | human-impact | SOURCE NEEDED | needs-review | Apidae = bees; economic **such as** food | honey/pollination | no | Hint no longer names Apidae = bees | Economic example not a list fact |
| q28 | interactions | SOURCE NEEDED | needs-review | Cynipidae = gall wasps; **e.g.** relationships | gall biology | no | Hint no longer names gall wasps | Gall anatomy not on list |
| q29 | internal-anatomy | SOURCE NEEDED | needs-review | Internal anatomy in scope | spiracles/tracheae | no | none | No organ checklist |
| q30 | climate | SOURCE NEEDED | needs-review | Climate **may include** | oxygen/warming | no | none | Mechanism not on list |
| q31 | taxonomy | VERIFIED | verified | Scutelleridae = metallic shield bugs | no | no | Distractor `Stink bugs` (official capitals) | — |
| q32 | taxonomy | VERIFIED | verified | Pentatomidae = Stink bugs | no | no | Prompt quotes “Stink bugs”; sourceNote cites official rules | — |
| q33 | taxonomy | VERIFIED | verified | Cicadidae → Hemiptera | no | no | Hint no longer says “true-bug order” | — |
| q34 | taxonomy | VERIFIED | verified | Megaloptera = dobsonflies | no | no | none | — |
| q35 | taxonomy | VERIFIED | verified | Buprestidae → Coleoptera | no | no | Hint points at list parent, not “beetles” | — |
| q36 | taxonomy | VERIFIED | verified | Zopheridae = diabolical ironclad Beetles | no | no | Choice/explanation capital B | — |
| q37 | taxonomy | VERIFIED | verified | Tephritidae → Diptera | no | no | Hint points at list parent, not “fly family” | — |
| q38 | taxonomy | VERIFIED | verified | Mantodea = mantids | no | no | none | — |
| q39 | taxonomy | VERIFIED | verified | Siphonaptera fleas; order, no families | no | no | none | — |
| q40 | taxonomy | VERIFIED | verified | Bombyliidae vs Apidae names/orders | no | no | none | — |
| q41 | taxonomy | VERIFIED | verified | Vespidae full official string | no | no | none | — |
| q42 | taxonomy | VERIFIED | verified | Saturniidae → Lepidoptera | no | no | Hint no longer groups swallowtails/nymphalids; explanation uses official order strings | — |
| q43 | taxonomy | VERIFIED | verified | Collembola subclass vs Diplura order | no | no | none | — |
| q44 | taxonomy | VERIFIED | verified | Membracidae → Hemiptera | no | no | Hint no longer names Hemiptera | — |
| q45 | dichotomous-keys | VERIFIED | verified | Non-Insect / Insecta / bees / ants | no | no | none | Name/heading key |
| q46 | dichotomous-keys | VERIFIED | verified | Hemiptera names cicadas / metallic shield bugs | no | no | Explanation Stink bugs | — |
| q47 | dichotomous-keys | VERIFIED | verified | thrips / dobsonflies / caddisflies | no | no | none | — |
| q48 | dichotomous-keys | VERIFIED | verified | Diptera mosquitoes / fruit flies, husk fly | no | no | none | — |
| q49 | dichotomous-keys | VERIFIED | verified | Entognatha / Insecta / Non-Insect headings | no | no | none | — |
| q50 | dichotomous-keys | VERIFIED | verified | Buprestidae / Zopheridae official strings | no | no | Key couplet capital Beetles | — |
| q51 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | tagmata (middle) | no | none | Same unsupported fact as q14 |
| q52 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | tagmata (rear) | no | none | Same as q14 |
| q53 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | exoskeleton location | no | none | Same as q15 |
| q54 | external-anatomy | SOURCE NEEDED | needs-review | Ixodidae grouping is list-ok | stem asserts insect tagmata | no | none | Tagmata clause blocks verification |
| q55 | life-cycles | SOURCE NEEDED | needs-review | Odonata listed | pupa / incomplete | no | none | Life cycles not named |
| q56 | ecology-habitat | SOURCE NEEDED | needs-review | caddisflies = Trichoptera | freshwater pond premise | no | none | Habitat clause |
| q57 | internal-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | spiracle definition | no | none | Same as q29 |
| q58 | behavior-adaptations | SOURCE NEEDED | needs-review | Gryllidae listed | stridulation | no | Hint no longer names cricket families | Same as q25 |
| q59 | interactions | SOURCE NEEDED | needs-review | gall wasps listed | plant-gall relationship | no | none | Same as q28 |
| q60 | human-impact | SOURCE NEEDED | needs-review | Culicidae listed | pathogens | no | Hint no longer names mosquitoes | Same as q26 |

---

## Flagged items (extra scrutiny)

| ID | Outcome |
|---|---|
| q12 | IMAGE SOURCE NEEDED. Official Hydrophilidae string **water scavenger** now used. Antenna/palp split still unsourced. |
| q20 | VERIFIED after rewrite. First split is official-name grouping (diving/water vs grasshoppers/crickets), not “lives in water vs land.” |
| q32 | VERIFIED. Official **Stink bugs**. Prompt now quotes that string. |
| q36 | VERIFIED. Official **diabolical ironclad Beetles**. |
| q50 | VERIFIED. Key uses official Zopheridae string. |
| q8 | IMAGE SOURCE NEEDED. Hydrophilidae choice string corrected. |
| q11 / q18 | SOURCE NEEDED. Orientation still unsourced. |
| q23 / q55 | SOURCE NEEDED. Life cycles not in official rules. |
| q26 / q60 | SOURCE NEEDED. Public health is **may include**; pathogen fact is not listed. |
| q54 | SOURCE NEEDED. Ixodidae grouping is official; tagmata assertion is not. |

---

## Construction notes (inside SOURCE NEEDED / IMAGE items)

Do not promote without sources **and** distractor work:

- q11, q21: several distractors remain easy to reject.
- q15: some distractors are far from the same conceptual category.
- q54: list grouping of Ixodidae is solid; the tagmata clause is the blocker.

No item was removed. No item was redesigned into a new question.

---

## Duplicate / redundancy

Unchanged from the prior QA: tagmata (q14/q51/q52), exoskeleton (q15/q53), metamorphosis (q23/q55), caddisfly habitat (q21/q56), stridulation (q25/q58), mosquitoes (q26/q60), galls (q28/q59), spiracles (q29/q57). Different operations, same unsourced facts.

---

## Remaining evidence gaps

1. Licensed specimen images and visual diagnostics.
2. Factual sources for anatomy, habitat, metamorphosis, behavior, galls, pathogens, honey/pollination, climate mechanisms.
3. Official key **style** (not required to keep name-only keys).
4. Star meaning (unused in this bank).
5. Description “insects” vs Entognatha / Ixodidae (q3 asks list grouping only).

---

## MVP Status

This bank is intentionally incomplete. The MVP is **not** a 120–150-question competition packet.

| Measure | Count |
|---|---:|
| Total registered questions | **60** (q1–q60 only) |
| Verified | **27** (q1–q5, q19, q20, q31–q50) |
| Needs-review | **33** |
| Image-required | **9** (q6–q10, q12, q13, q17, q24) |
| Current live-practice pool | **27** (`verified` and not image-required) |

Live practice uses the generic verification filter. There is no Entomology-specific ID allowlist.

**Deferred for later expansion (not required for this MVP):**

- Licensed specimen/diagram images for the nine image-required items
- Sourced anatomy, habitat, life-cycle, behavior, gall, pathogen, honey/pollination, and climate facts (q11, q14–q16, q18, q21–q23, q25–q30, q51–q60)
- Bank growth toward a full 120–150-question competition set (q61+ and remaining taxa coverage)
- Official key style beyond name-only couplets; star meaning on the 2027 list

---

## Related files

- `RULES_2027_OFFICIAL.md`
- `TAXON_LIST_2027.md`
- `EVIDENCE_MATRIX_2027.md`
- `lib/mock/entomology-questions.ts`
