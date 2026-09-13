# Crime Busters 2027 — Question Bank QA (MVP)

Content QA of `lib/mock/crime-busters-questions.ts` (**cb-q1–cb-q50**). Questions `cb-q46`–`cb-q50` are intentionally held out until real image/data stimuli are sourced and reviewed. Crime Busters remains on the shared route; only verified questions are live.

All 50 Crime Busters items use the existing multiple-choice answer mode. The
shared open-ended matcher remains available for Codebusters; Crime Busters
does not use `acceptedAnswers`.

**Authority:**

1. `RULES_2027.md` — official event scope and closed lists
2. `EVIDENCE_MATRIX_2027.md` — inspected quotations
3. `QUESTION_BANK_BLUEPRINT_2027.md` — text-first MVP plan

General forensics/chemistry knowledge was **not** treated as enough evidence to mark a question `verified`. Official **scope** does **not** verify a lab outcome or pH number.

---

## Schema mapping

| QA report status | `verificationStatus` in code | Meaning |
|---|---|---|
| **VERIFIED** | `verified` | In 2027 scope; answer and claims match recorded evidence; uniquely keyed; hints do not name the answer |
| **SOURCE NEEDED** | `needs-review` | Fact not in the matrix |
| **HUMAN REVIEW** | `needs-review` | Unresolved `HR*` blocks the keyed answer |
| **REMOVE** | — | None this pass |

There are **no `draft` statuses after this pass**.

Practice live pool = `verified` (omitted counts as verified). Image-required items are live only when `imageSrc` and `imageAlt` are set (`isLivePracticeQuestion`). Current bank: **50** registered / **45** live (41 verified text items, including `cb-q45`, plus IM4 `cb-q41`–`cb-q44`). Five image-dependent items remain `needs-review`.

---

## Overall results

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED | **45** | cb-q1–cb-q45 plus cb-q41–cb-q44 |
| SOURCE NEEDED / IMAGE SOURCE NEEDED | **5** | cb-q46–cb-q50 |
| HUMAN REVIEW | **0** | — |
| REMOVE | **0** | — |

The evidence-supported text pass covers `cb-q1`–`cb-q45`; the four reviewed IM4 family images are `cb-q41`–`cb-q44`. The five held-out items explicitly represent missing image/data stimuli rather than placeholder assets.

A conservative reading of the matrix supported verifying the whole MVP set after hint and stem trims. That is **not** a claim that the hands-on contest (prints, micrographs, unknown powders, pH, crime stories) is covered.

## Final distribution

- Topics: fingerprints 18; hair/fiber 10; soil 8; chemical 12; safety 1; overall analysis 1.
- Difficulty: level 1 = 24; level 2 = 20; level 3 = 6.
- Cognitive demand: recall 17; recognition 9; distinction 6; application 15; multi-step 3.
- Answer positions: a = 19; b = 11; c = 10; d = 10.
- Images: 9 image-required items; 4 verified with assets; 5 held out.
- Answer mode: 0 open-ended; 50 multiple-choice.

---

## Per-question table

| ID | Topic | QA result | Code status | Evidence | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | -------- | -------------- | ----------------------- |
| cb-q1 | fingerprints | VERIFIED | verified | V-P1–V-P3 | status | List literacy |
| cb-q2 | fingerprints | VERIFIED | verified | V-P4–V-P6 | status | Central Pocket kept under Loops (`HR8`) |
| cb-q3 | fingerprints | VERIFIED | verified | V-P7–V-P9 | status | — |
| cb-q4 | fingerprints | VERIFIED | verified | V-P10, V-P11 | status | — |
| cb-q5 | fingerprints | VERIFIED | verified | RS3 | Added explicit suspect/crime-scene comparison scope item | Actual print comparison remains image-dependent |
| cb-q6 | fingerprints | VERIFIED | verified | E-CB-004 | Hint no longer names little-finger side | — |
| cb-q7 | fingerprints | VERIFIED | verified | E-CB-004 | Hint no longer names forearm | — |
| cb-q8 | fingerprints | VERIFIED | verified | E-CB-002, E-CB-005 | Hint no longer contrasts arch exit | — |
| cb-q9 | fingerprints | VERIFIED | verified | E-CB-005 | Hint no longer describes the keyed arch | — |
| cb-q10 | fingerprints | VERIFIED | verified | E-CB-006 | status | — |
| cb-q11 | fingerprints | VERIFIED | verified | E-CB-013, E-CB-014 | Replaced repeated whorl item with minutiae coverage | Visual minutiae callout remains held out |
| cb-q12 | fingerprints | VERIFIED | verified | E-CB-017, E-CB-016 | Hint no longer names papillae | — |
| cb-q13 | hair-fiber | VERIFIED | verified | V-H1–V-H5 | Stem is name-list only (no “microscopic images”) | Image ID still deferred |
| cb-q14 | hair-fiber | VERIFIED | verified | E-CB-019 | status | — |
| cb-q15 | hair-fiber | VERIFIED | verified | E-CB-020 | status | Not a species key |
| cb-q16 | hair-fiber | VERIFIED | verified | E-CB-021 | Hint no longer quotes imbricate/flattened | — |
| cb-q17 | hair-fiber | VERIFIED | verified | V-F4–V-F9 | status | — |
| cb-q18 | hair-fiber | VERIFIED | verified | V-F1–V-F3 | status | Does not map rayon to a class (`HR-FIB`) |
| cb-q19 | hair-fiber | VERIFIED | verified | V-F4–V-F9 | status | — |
| cb-q20 | hair-fiber | VERIFIED | verified | E-CB-024 | Hint no longer names plant-cell-wall carbohydrate | Not a class key |
| cb-q21 | soil | VERIFIED | verified | V-S1–V-S6 | status | — |
| cb-q22 | soil | VERIFIED | verified | V-S2, E-CB-029 | Replaced repeated peat recall with loamy-property application | Sample identification remains image-dependent |
| cb-q23 | soil | VERIFIED | verified | E-CB-026 | status | — |
| cb-q24 | soil | VERIFIED | verified | E-CB-027 | status | — |
| cb-q25 | soil | VERIFIED | verified | E-CB-030, V-S1 | status | — |
| cb-q26 | soil | VERIFIED | verified | E-CB-031, V-S5 | status | Not the powder Chalk |
| cb-q27 | soil | VERIFIED | verified | V-S5, V-W7 | Hint no longer says two headings | `HR4` as the teaching point |
| cb-q28 | chemical | VERIFIED | verified | E-CB-034, V-W1 | Hint no longer says 1:1 NaCl | — |
| cb-q29 | chemical | VERIFIED | verified | E-CB-035, V-W2 | Hint no longer says disaccharide | Sucrose / table sugar only (`HR-SUGAR`) |
| cb-q30 | chemical | VERIFIED | verified | E-CB-036, V-W5 | Hint no longer says hydrogen carbonate | — |
| cb-q31 | chemical | VERIFIED | verified | E-CB-037, V-W7 | Hint no longer names calcium carbonate salt | — |
| cb-q32 | chemical | VERIFIED | verified | E-CB-042, V-L3 | status | Does not verify 3% assay |
| cb-q33 | chemical | VERIFIED | verified | E-CB-036 | status | Not a full uses table |
| cb-q34 | chemical | VERIFIED | verified | E-CB-038 | Hint no longer says stomach-acid medicine | — |
| cb-q35 | chemical | VERIFIED | verified | E-CB-041 | status | Not flour vs cornstarch |
| cb-q36 | chemical | VERIFIED | verified | E-CB-039, E-CB-040 | Hint no longer names CO2 | Not soda vs chalk ID |
| cb-q37 | chemical | VERIFIED | verified | RS11 | status | Three named reagents only |
| cb-q38 | chemical | VERIFIED | verified | E-CB-043, V-L2 | Hint no longer says first-aid bottle | Mixture (`HR6`) acknowledged |
| cb-q39 | chemical | VERIFIED | verified | E-CB-045, V-L4 | Hint no longer names bleach/Clorox | Mixture (`HR6`) acknowledged |
| cb-q40 | safety | VERIFIED | verified | V-G6 | status | — |
| cb-q45 | overall-analysis | VERIFIED | verified | RS14 | Added required paragraph-elements item | Full crime-story reasoning remains unavailable |
| cb-q46 | fingerprints | SOURCE NEEDED | needs-review | RS3 | Added held-out comparison item | IM1 crime-scene/suspect prints missing |
| cb-q47 | fingerprints | IMAGE SOURCE NEEDED | needs-review | E-CB-014 | Added held-out minutiae-image item | IM2 marked print missing |
| cb-q48 | hair-fiber | IMAGE SOURCE NEEDED | needs-review | E-CB-020 | Added held-out hair-image item | IM5 micrograph missing |
| cb-q49 | hair-fiber | IMAGE SOURCE NEEDED | needs-review | RS8 | Added held-out fiber-image item | IM6 micrograph and HR-FIB unresolved |
| cb-q50 | soil | IMAGE SOURCE NEEDED | needs-review | RS9 | Added held-out sample-identification item | IM7 sample/image missing |

---

## Modified questions this pass

Hint and/or stem trims on: **cb-q6, q7, q8, q9, q11, q12, q13, q16, q20, q22, q27, q28, q29, q30, q31, q34, q36, q38, q39**. Added verified scope/application coverage in `cb-q5` and `cb-q45`, plus five held-out image-dependent items. No placeholder assets were added.

---

## Evidence / source breakdown

| sourceType | Count |
|---|---:|
| rules-derived | 17 |
| pubchem | 9 |
| nist | 5 |
| rhs-soil | 5 |
| doj-hair | 4 |
| libretexts | 3 |
| fbi-handbook | 4 |
| openstax | 1 |
| commons | 2 |

---

## Remaining gaps (not in this bank)

- Hair/fiber/soil **image or sample ID** (IM5–IM7). Fingerprint comparison and minutiae markup remain held out as `cb-q46`–`cb-q47`; IM4 family exemplars are in `IMAGE_QA_2027.md`.
- Species hair keys; fiber class mapping (`HR-FIB`)
- Full iodine/HCl/water unknown tables; pH numbers; mixture protocols
- Yeast/gelatin/flour formulas; crime stories; chromatography

**Image blockers:** IM4 family exemplars are live (`cb-q41`–`cb-q44`). Official hair / fiber / soil stimuli and the held-out fingerprint comparison/minutiae images remain out.

---

## MVP readiness

The verified text-first set (`cb-q1`–`cb-q45`) plus the IM4 slice (`cb-q41`–`cb-q44`) is registered in `lib/mock/curriculum.ts`. The shared route exposes 45 live questions; `cb-q46`–`cb-q50` remain held out by verification/image gates.

---

## Validation results

Recorded after this pass — **all passed**:

- `npx tsx lib/mock/crime-busters-questions.check.ts` — 50 registered, 45 verified, 5 needs-review; passed
- `npx tsx lib/mock/curriculum.check.ts`
- `npx tsx lib/mock/events.check.ts`
- `npx tsx lib/student-events.check.ts`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## Related files

- `lib/mock/crime-busters-questions.ts`
- `docs/events/crime_busters/EVIDENCE_MATRIX_2027.md`
- `docs/events/crime_busters/QUESTION_BANK_BLUEPRINT_2027.md`
