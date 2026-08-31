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

Practice live pool = `verified` (omitted counts as verified). Image-required items additionally need non-empty `imageSrc` + `imageAlt`. That is implemented in `isLivePracticeQuestion`. There are **no** teaching SVGs; live images are Wikimedia Commons JPEGs in `public/entomology/`. Per-image visual/license QA: `IMAGE_QA_2027.md`.

---

## Overall results (code, 2026-08-30)

Authoritative counts come from `lib/mock/entomology-questions.ts`, not from an older QA table.

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED (incl. 17 photographed) | **36** | q1–q10, q12, q13, q17, q19, q20, q24, q31–q50 |
| SOURCE NEEDED | **24** | q11, q14–q16, q18, q21–q23, q25–q30, q51–q60 |
| IMAGE SOURCE NEEDED | **0** | Assets exist for all 17 `imageRequired` items. q10/q12/q41 were replaced 2026-08-30 (`IMAGE_QA_2027.md`) |
| HUMAN REVIEW | **0** new | Extra biology on some live image items remains `FACTUAL_SOURCE_NEEDED` in the evidence matrix |
| REMOVE | **0** | — |

Source bank remains **exactly q1–q60**. **Live practice pool = 36** (19 text + 17 image). The 24 text SOURCE NEEDED items stay `needs-review` (not promoted).

**Image QA pass (2026-08-30):** Commons license re-check, visual fitness, and live JPEGs. Photographed items that had been `needs-review` only for missing images were promoted to `verified`. Several visual-id stems/choices were rewritten to match the photos (`IMAGE_QA_2027.md`). No q61+ items. Do not treat a photo as proof of unsourced biology.

Historical note: an earlier QA pass reported 27 verified text items, 9 IMAGE SOURCE NEEDED, and live = 27. That is **obsolete**.

---

## Per-question table

| ID | Topic | QA result | Code status | Official-rules/list support | External source? | Image? | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | --------------------------- | ---------------- | ------ | -------------- | ----------------------- |
| q1 | taxonomy | VERIFIED | verified | Blattodea = cockroaches/termites | no | no | Explanation: Orthoptera/Coleoptera official order names | — |
| q2 | taxonomy | VERIFIED | verified | Collembola = springtails, snow fleas | no | no | sourceNote | — |
| q3 | visual-id | VERIFIED | verified | Ixodidae / Non-Insect Arthropods / hardback ticks | Commons photo | **yes** | — | Photo shows eight legs / fused body; choice D also names ticks. See `IMAGE_QA_2027.md` |
| q4 | taxonomy | VERIFIED | verified | Ephemeroptera = mayflies | no | no | none this cleanup | Star unused |
| q5 | visual-id | VERIFIED | verified | Apidae (bees) listed | Commons photo | **yes** | — | Specimen photo; list names still the official support |
| q6 | visual-id | VERIFIED | verified | Formicidae = ants (name only) | petiole not on list | **yes** | JPEG live | Photo present; extra morphology still not official. `IMAGE_QA_2027.md` PASS |
| q7 | visual-id | VERIFIED | verified | Papilionidae = swallowtails | tails not on list | **yes** | JPEG live | Tails visible. `IMAGE_QA_2027.md` PASS |
| q8 | visual-id | VERIFIED | verified | Notonectidae = backswimmers | orientation | **yes** | JPEG live | Photo shows pose; orientation still `FACTUAL_SOURCE_NEEDED` |
| q9 | visual-id | VERIFIED | verified | Curculionidae = weevils | snout | **yes** | JPEG live | Snout visible; snout still not a list fact |
| q10 | visual-id | VERIFIED | verified | Collembola names/rank | furcula | **yes** | JPEG live | A/B composite: whole animal + forked organ. Furcula still not a list fact |
| q11 | comparison | SOURCE NEEDED | needs-review | Both families listed | swimming orientation | no | none | Orientation is not a list fact |
| q12 | comparison | VERIFIED | verified | Family names listed | antenna/palp split | **yes** | JPEG live | B replaced (no tennis ball). Antenna split still not a list fact |
| q13 | comparison | VERIFIED | verified | Tipulidae/Culicidae listed | piercing/blood-feeding | **yes** | JPEG live | Pairing photo OK; blood-feeding not visible in the image |
| q14 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy **in scope** only | tagmata | no | none | No official structure checklist |
| q15 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | exoskeleton function | no | none | Not a rules fact |
| q16 | external-anatomy | SOURCE NEEDED | needs-review | Anatomy in scope | leg attachment | no | Hint no longer names thorax | Not a rules fact |
| q17 | external-anatomy | VERIFIED | verified | Anatomy in scope | cerci location | **yes** | JPEG live | Circle on rear pair; location still `FACTUAL_SOURCE_NEEDED` |
| q18 | dichotomous-keys | SOURCE NEEDED | needs-review | Keys in scope | orientation couplet | no | sourceNote (may/will, not “required”) | Couplet biology |
| q19 | dichotomous-keys | VERIFIED | verified | Orthoptera family official names | no | no | sourceNote cites RULES_2027_OFFICIAL.md | Name-only key |
| q20 | dichotomous-keys | VERIFIED | verified | Official name groups (diving/water vs grasshoppers/crickets) | no | no | Choice A no longer asserts habitat; Hydrophilidae = water scavenger | — |
| q21 | ecology-habitat | SOURCE NEEDED | needs-review | Trichoptera = caddisflies | larval freshwater habitat | no | none | Habitat not on list |
| q22 | ecology-habitat | SOURCE NEEDED | needs-review | Ephemeroptera = mayflies | naiad habitat | no | none | Habitat not on list |
| q23 | life-cycles | SOURCE NEEDED | needs-review | Taxa listed; life cycles **not named** | metamorphosis/pupa | no | none | Not official domain |
| q24 | behavior-adaptations | VERIFIED | verified | Dytiscidae listed; adaptations **may include** | natatorial | **yes** | JPEG live | Flattened hind leg visible; “natatorial” still not official |
| q25 | behavior-adaptations | SOURCE NEEDED | needs-review | Gryllidae listed; behavior **may include** | stridulation | no | none | Mechanism not on list |
| q26 | human-impact | SOURCE NEEDED | needs-review | Culicidae; public health **may include** | pathogens | no | none | Disease example not a list fact |
| q27 | human-impact | SOURCE NEEDED | needs-review | Apidae = bees; economic **such as** food | honey/pollination | no | Hint no longer names Apidae = bees | Economic example not a list fact |
| q28 | interactions | SOURCE NEEDED | needs-review | Cynipidae = gall wasps; **e.g.** relationships | gall biology | no | Hint no longer names gall wasps | Gall anatomy not on list |
| q29 | internal-anatomy | SOURCE NEEDED | needs-review | Internal anatomy in scope | spiracles/tracheae | no | none | No organ checklist |
| q30 | climate | SOURCE NEEDED | needs-review | Climate **may include** | oxygen/warming | no | none | Mechanism not on list |
| q31 | taxonomy | VERIFIED | verified | Scutelleridae = metallic shield bugs | no | no | Distractor `Stink bugs` (official capitals) | — |
| q32 | taxonomy | VERIFIED | verified | Pentatomidae = Stink bugs | no | no | Prompt quotes “Stink bugs”; sourceNote cites official rules | — |
| q33 | visual-id | VERIFIED | verified | Cicadidae → Hemiptera | Commons photo | **yes** | JPEG live | Specimen photo; list names still official support |
| q34 | taxonomy | VERIFIED | verified | Megaloptera = dobsonflies | no | no | none | — |
| q35 | visual-id | VERIFIED | verified | Coccinellidae official string | Commons photo | **yes** | JPEG live | Lady-bird beetle photo. Family-to-order for Buprestidae remains q50 |
| q36 | taxonomy | VERIFIED | verified | Zopheridae = diabolical ironclad Beetles | no | no | Choice/explanation capital B | — |
| q37 | taxonomy | VERIFIED | verified | Tephritidae → Diptera | no | no | Hint points at list parent, not “fly family” | — |
| q38 | visual-id | VERIFIED | verified | Mantodea = mantids | Commons photo | **yes** | JPEG live | Specimen photo |
| q39 | taxonomy | VERIFIED | verified | Siphonaptera fleas; order, no families | no | no | none | — |
| q40 | comparison | VERIFIED | verified | Bombyliidae vs Apidae names/orders | Commons photos | **yes** | JPEG live | A/B composite; list names still official support |
| q41 | visual-id | VERIFIED | verified | Vespidae full official string | Commons photo | **yes** | JPEG live | Larger side-view photo (1920×1280) |
| q42 | taxonomy | VERIFIED | verified | Saturniidae → Lepidoptera | no | no | Hint no longer groups swallowtails/nymphalids; explanation uses official order strings | — |
| q43 | taxonomy | VERIFIED | verified | Collembola subclass vs Diplura order | no | no | none | — |
| q44 | visual-id | VERIFIED | verified | Membracidae → Hemiptera | Commons photo | **yes** | JPEG live | Specimen photo |
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
| q12 | VERIFIED in code (live JPEG). Official Hydrophilidae string **water scavenger**. Antenna/palp split still unsourced. Panel B replaced 2026-08-30 (`IMAGE_QA_2027.md`). |
| q20 | VERIFIED after rewrite. First split is official-name grouping (diving/water vs grasshoppers/crickets), not “lives in water vs land.” |
| q32 | VERIFIED. Official **Stink bugs**. Prompt now quotes that string. |
| q36 | VERIFIED. Official **diabolical ironclad Beetles**. |
| q50 | VERIFIED. Key uses official Zopheridae string. |
| q8 | Live JPEG. Hydrophilidae choice string corrected. Orientation still not a list fact. |
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

1. Student-facing attribution is in the quiz. Remaining work is factual sources for anatomy/habitat/life-cycle items, not more image infrastructure.
2. Factual sources for anatomy, habitat, metamorphosis, behavior, galls, pathogens, honey/pollination, climate mechanisms — **including** extra claims on some live image items (orientation, snout, furcula, cerci, natatorial, blood-feeding).
3. Official key **style** (not required to keep name-only keys).
4. Star meaning (unused in this bank).
5. Description “insects” vs Entognatha / Ixodidae (q3 asks list grouping; photo is supporting).

---

## MVP Status

This bank is intentionally incomplete. The MVP is **not** a 120–150-question competition packet.

| Measure | Count |
|---|---:|
| Total registered questions | **60** (q1–q60 only) |
| Verified | **36** |
| Needs-review | **24** (all text; none of the 17 image items) |
| Image-required | **17** (all have local JPEG + alt; all live) |
| Current live-practice pool | **36** (`verified`; image items also have `imageSrc` + `imageAlt`) |

Live practice uses the generic verification filter plus the image src/alt gate. There is no Entomology-specific ID allowlist.

**Deferred for later expansion (not required for this MVP):**

- In-app attribution is live for CC BY / CC BY-SA Entomology photos
- Sourced anatomy, habitat, life-cycle, behavior, gall, pathogen, honey/pollination, and climate facts (q11, q14–q16, q18, q21–q23, q25–q30, q51–q60)
- Bank growth toward a full 120–150-question competition set (q61+ and remaining taxa coverage)
- Official key style beyond name-only couplets; star meaning on the 2027 list

---

## Related files

- `RULES_2027_OFFICIAL.md`
- `TAXON_LIST_2027.md`
- `EVIDENCE_MATRIX_2027.md`
- `IMAGE_QA_2027.md`
- `lib/mock/entomology-questions.ts`
