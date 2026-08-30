# Crime Busters 2027 — Question Bank QA (MVP)

Content QA of `lib/mock/crime-busters-questions.ts` (**cb-q1–cb-q40 only**). No bank expansion. Crime Busters is **unlocked** for shared live practice (`EVENTS_WITH_QUESTION_BANKS`, selectable onboarding/profile).

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

Practice live pool = `verified` **and** `imageRequired !== true`. Crime Busters is **unlocked** and in `EVENTS_WITH_QUESTION_BANKS`; those items enter `/practice` through the shared route.

---

## Overall results

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED | **40** | cb-q1–cb-q40 |
| SOURCE NEEDED | **0** | — |
| HUMAN REVIEW | **0** | — |
| REMOVE | **0** | — |

Source bank remains **exactly cb-q1–cb-q40**. No q41+ items. All `imageRequired: false`.

A conservative reading of the matrix supported verifying the whole MVP set after hint and stem trims. That is **not** a claim that the hands-on contest (prints, micrographs, unknown powders, pH, crime stories) is covered.

---

## Per-question table

| ID | Topic | QA result | Code status | Evidence | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | -------- | -------------- | ----------------------- |
| cb-q1 | fingerprints | VERIFIED | verified | V-P1–V-P3 | status | List literacy |
| cb-q2 | fingerprints | VERIFIED | verified | V-P4–V-P6 | status | Central Pocket kept under Loops (`HR8`) |
| cb-q3 | fingerprints | VERIFIED | verified | V-P7–V-P9 | status | — |
| cb-q4 | fingerprints | VERIFIED | verified | V-P10, V-P11 | status | — |
| cb-q5 | fingerprints | VERIFIED | verified | E-CB-001 | status | NIST three types |
| cb-q6 | fingerprints | VERIFIED | verified | E-CB-004 | Hint no longer names little-finger side | — |
| cb-q7 | fingerprints | VERIFIED | verified | E-CB-004 | Hint no longer names forearm | — |
| cb-q8 | fingerprints | VERIFIED | verified | E-CB-002, E-CB-005 | Hint no longer contrasts arch exit | — |
| cb-q9 | fingerprints | VERIFIED | verified | E-CB-005 | Hint no longer describes the keyed arch | — |
| cb-q10 | fingerprints | VERIFIED | verified | E-CB-006 | status | — |
| cb-q11 | fingerprints | VERIFIED | verified | E-CB-008 | Hint limited to plain-whorl wording | Does not key Central Pocket as a whorl |
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
| cb-q22 | soil | VERIFIED | verified | V-S1, E-CB-030 | Stem now names RHS peat soils + official adjective | — |
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

---

## Modified questions this pass

Hint and/or stem trims on: **cb-q6, q7, q8, q9, q11, q12, q13, q16, q20, q22, q27, q28, q29, q30, q31, q34, q36, q38, q39**. Status set on **all 40**. No items removed. No new science added.

---

## Evidence / source breakdown

| sourceType | Count |
|---|---:|
| rules-derived | 13 |
| pubchem | 9 |
| nist | 5 |
| rhs-soil | 4 |
| doj-hair | 3 |
| libretexts | 3 |
| fbi-handbook | 2 |
| openstax | 1 |

---

## Remaining gaps (not in this bank)

- Fingerprint/hair/fiber/soil **image or sample ID** (IM1–IM7)
- Species hair keys; fiber class mapping (`HR-FIB`)
- Full iodine/HCl/water unknown tables; pH numbers
- Yeast/gelatin/flour formulas; crime stories; chromatography; Overall Analysis

**Image blockers:** none in-bank (`imageRequired` stays false). Official ID skills remain out of MVP.

---

## MVP readiness

The verified text-first set is **registered** in `lib/mock/curriculum.ts` and **unlocked** for the shared `/events/crime-busters/practice` route. Do not expand the bank (Phase 8).

---

## Validation results

Recorded after this pass — **all passed**:

- `npx tsx lib/mock/crime-busters-questions.check.ts` — 40 verified
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
