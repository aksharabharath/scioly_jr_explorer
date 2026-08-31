# Anatomy and Physiology 2027 — Question Bank QA (MVP)

Content QA of `lib/mock/anatomy-physiology-questions.ts` (**ap-q1–ap-q45 only**). No bank expansion during the QA pass. A&P is now an **unlocked** catalog event on the shared practice route.

**This is an MVP verification pass, not a complete competition bank.** It does not attempt the 135-item blueprint, image slots, deferred diseases, or the remaining 23 muscles.

**Authority:**

1. `RULES_2027.md` — official event scope
2. `EVIDENCE_MATRIX_2027.md` — factual evidence (`SOURCE-VERIFIED` rows and §3 fully evidenced muscle triples)
3. The inspected source named on each matrix row

General medical/anatomical knowledge was **not** treated as enough evidence to mark a question `verified`. Official **scope** does **not** verify a biological answer.

---

## Schema mapping

The implementation supports `verificationStatus: "draft" | "needs-review" | "verified"`. There is **no** `"source-needed"` value.

| QA report status | `verificationStatus` in code | Meaning |
|---|---|---|
| **VERIFIED** | `verified` | In official A&P scope; answer and claims match inspected evidence; exactly one defensible option |
| **SOURCE NEEDED** | `needs-review` | Fact is not established by the matrix/source |
| **HUMAN REVIEW** | `needs-review` | Unresolved `HUMAN-REVIEW` item blocks verification |
| **REMOVE** | — | None this pass |

There are **no `draft` statuses after this pass**.

Practice live pool = `verified` (omitted counts as verified). Image-required items also need `imageSrc` + `imageAlt`. This A&P bank has **no** image-required items, so all 45 verified items are live-eligible. A&P is **unlocked** and listed in `EVENTS_WITH_QUESTION_BANKS`.

---

## Overall results

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED | **45** | ap-q1–ap-q45 |
| SOURCE NEEDED | **0** | — |
| HUMAN REVIEW | **0** | — |
| REMOVE | **0** | — |

Source bank remains **exactly ap-q1–ap-q45**. No q46+ items were added.

A conservative reading of the matrix supported verifying the whole MVP set after small wording trims. That is **not** a claim that the full competition bank is done.

---

## Per-question table

| ID | Topic | QA result | Code status | Evidence | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | -------- | -------------- | ----------------------- |
| ap-q1 | integument-functions | VERIFIED | verified | E-AP-140 | Distractor “hypodermis fat pad” → “hypodermis”; hint tightened | — |
| ap-q2 | integument-functions | VERIFIED | verified | E-AP-144 | “sunlight” → “UV radiation” | — |
| ap-q3 | integument-functions | VERIFIED | verified | E-AP-143 | Choice/explanation/hint now quote evaporative cooling | — |
| ap-q4 | integument-functions | VERIFIED | verified | E-AP-143 | Dropped “extra”/“at once”; hint no longer uses unsourced flushing | — |
| ap-q5 | integument-functions | VERIFIED | verified | E-AP-141 | Stem/hint use “antibiotic properties,” not etymology | — |
| ap-q6 | integument-structure | VERIFIED | verified | E-AP-021 | none (status only) | — |
| ap-q7 | integument-structure | VERIFIED | verified | E-AP-022, E-AP-023 | Hint no longer uses unsourced “clear” | — |
| ap-q8 | integument-structure | VERIFIED | verified | E-AP-142 | none (status only) | — |
| ap-q9 | integument-structure | VERIFIED | verified | E-AP-034 | Removed “watery” and “mainly” | — |
| ap-q10 | integument-structure | VERIFIED | verified | E-AP-034, E-AP-035 | none (status only) | — |
| ap-q11 | integument-structure | VERIFIED | verified | E-AP-146 | Stem/options/hint/explanation limited to collagen and elastin | — |
| ap-q12 | integument-conditions | VERIFIED | verified | E-AP-147 | none (status only) | Does not claim sunscreen prevents cancer |
| ap-q13 | integument-conditions | VERIFIED | verified | E-AP-053, E-AP-054 | none (status only) | — |
| ap-q14 | integument-conditions | VERIFIED | verified | E-AP-044, E-AP-042, E-AP-043 | `cognitiveDemand` recall (stem is melanoma cell type) | — |
| ap-q15 | integument-conditions | VERIFIED | verified | E-AP-051, E-AP-052 | none (status only) | — |
| ap-q16 | bone-tissue | VERIFIED | verified | E-AP-070, E-AP-071, E-AP-072 | Added E-AP-071 for the axial sentence | — |
| ap-q17 | bone-tissue | VERIFIED | verified | E-AP-076 | none (status only) | — |
| ap-q18 | bone-tissue | VERIFIED | verified | E-AP-078, E-AP-073 | none (status only) | — |
| ap-q19 | bone-tissue | VERIFIED | verified | E-AP-079 | none (status only) | Does not use RANKL grain (E-AP-084) |
| ap-q20 | bone-tissue | VERIFIED | verified | E-AP-150 | Dropped unsourced “nutrients and wastes” gloss | — |
| ap-q21 | bone-tissue | VERIFIED | verified | E-AP-151 | none (status only) | — |
| ap-q22 | bone-tissue | VERIFIED | verified | E-AP-152 | none (status only) | — |
| ap-q23 | joints | VERIFIED | verified | E-AP-154 | none (status only) | — |
| ap-q24 | joints | VERIFIED | verified | E-AP-155 | none (status only) | — |
| ap-q25 | joints | VERIFIED | verified | E-AP-087, E-AP-088 | Hint no longer names the textbook in the student hint | — |
| ap-q26 | joints | VERIFIED | verified | E-AP-156, E-AP-088 | Hint no longer uses unsourced “cup” metaphor | — |
| ap-q27 | joints | VERIFIED | verified | E-AP-089 | none (status only) | Does **not** assert ligaments connect bone to bone |
| ap-q28 | skeletal-conditions | VERIFIED | verified | E-AP-096 | none (status only) | OA only; not packed OA vs RA (E-AP-100) |
| ap-q29 | skeletal-conditions | VERIFIED | verified | E-AP-101 | none (status only) | — |
| ap-q30 | skeletal-conditions | VERIFIED | verified | E-AP-145, E-AP-157 | none (status only) | — |
| ap-q31 | skeletal-conditions | VERIFIED | verified | E-AP-093 | none (status only) | Text Type I only; no image; no types VI+ |
| ap-q32 | muscle-physiology | VERIFIED | verified | E-AP-139, E-AP-160 | none (status only) | — |
| ap-q33 | muscle-physiology | VERIFIED | verified | E-AP-164 | none (status only) | — |
| ap-q34 | muscle-physiology | VERIFIED | verified | E-AP-165 | none (status only) | — |
| ap-q35 | muscle-physiology | VERIFIED | verified | E-AP-166 | none (status only) | — |
| ap-q36 | muscle-physiology | VERIFIED | verified | E-AP-167, E-AP-166 | “activated” → “contract” | — |
| ap-q37 | muscle-physiology | VERIFIED | verified | E-AP-121 + matrix §3 biceps/triceps **actions** | none (status only) | Does not test incomplete O/I |
| ap-q38 | muscle-types | VERIFIED | verified | E-AP-161 | none (status only) | — |
| ap-q39 | muscle-types | VERIFIED | verified | E-AP-162, E-AP-161 | none (status only) | Does not invent intercalated-disc “wave” mechanics |
| ap-q40 | muscle-types | VERIFIED | verified | E-AP-163 | none (status only) | — |
| ap-q41 | listed-muscles | VERIFIED | verified | matrix §3 Rectus abdominis O/I/A | Hint uses sourced “sitting up” | — |
| ap-q42 | listed-muscles | VERIFIED | verified | matrix §3 Diaphragm O/I/A | none (status only) | — |
| ap-q43 | listed-muscles | VERIFIED | verified | matrix §3 Trapezius O/I/A | none (status only) | Does **not** test Head/Neck vs thorax grouping |
| ap-q44 | listed-muscles | VERIFIED | verified | matrix §3 Sartorius O/I/A | none (status only) | — |
| ap-q45 | listed-muscles | VERIFIED | verified | matrix §3 Serratus insertion + protraction | `cognitiveDemand` recognition | Does **not** test rib 1–8 vs 1–9 |

---

## Verification-status changes

All **45** items: `draft` → `verified`.

No item was left `needs-review`. No item was removed.

---

## Questions modified this pass (wording / metadata)

Status-only items are listed in the table as “none (status only).” Content or metadata edits:

| ID | What changed |
|---|---|
| ap-q1 | Distractor and hint |
| ap-q2 | Stem UV wording |
| ap-q3 | Correct-choice wording, hint, explanation |
| ap-q4 | Stem and hint |
| ap-q5 | Stem and hint |
| ap-q7 | Hint |
| ap-q9 | Stem (“watery” / “mainly”) |
| ap-q11 | Stem, options, hint, explanation |
| ap-q14 | `cognitiveDemand` recall |
| ap-q16 | Added E-AP-071 |
| ap-q20 | Explanation trim |
| ap-q25 | Hint |
| ap-q26 | Hint |
| ap-q36 | Correct-choice “contract” |
| ap-q41 | Hint |
| ap-q45 | `cognitiveDemand` recognition |

---

## Topic distribution (unchanged)

| Topic | Count |
|---|---:|
| integument-functions | 5 |
| integument-structure | 6 |
| integument-conditions | 4 |
| bone-tissue | 7 |
| joints | 5 |
| skeletal-conditions | 4 |
| muscle-physiology | 6 |
| muscle-types | 3 |
| listed-muscles | 5 |

## Difficulty distribution (unchanged)

**18 Level 1 / 18 Level 2 / 9 Level 3**

## Cognitive-demand distribution (after this pass)

| Demand | Count |
|---|---:|
| recall | 19 |
| recognition | 9 |
| distinction | 8 |
| application | 2 |
| multi-step | 7 |

ap-q14 moved from distinction → recall. ap-q45 moved from application → recognition.

## Primary source distribution (unchanged)

| sourceType | Count |
|---|---:|
| openstax | 39 |
| cdc | 2 |
| nih-niams | 2 |
| nci | 1 |
| ncbi-statpearls | 1 |

MedlinePlus appears as **secondary** evidence on ap-q30 (`E-AP-157`). Listed-muscle items cite matrix §3 (no E-AP IDs on those rows) plus `E-AP-120` for origin/insertion vocabulary.

---

## Evidence gaps that remain (not in this 45)

These stayed out of the MVP bank and are still blocked for a later full-bank pass:

- Burns classification scheme (`HUMAN-REVIEW`)
- Packed OA vs RA (E-AP-100)
- RANKL grain for elementary items (E-AP-084 note)
- Sunscreen preventing skin cancer (E-AP-148)
- Hypodermis as a skin layer (E-AP-020 note)
- Eczema = dermatitis
- Unsourced INT infections; Kaposi; poison ivy/metals; scales/birthmarks
- Tennis/golfer’s elbow; cruciate/meniscus **tears**; septic arthritis
- LEMS, PMR, polymyositis/dermatomyositis, polio, fibromyalgia, CFS
- Incomplete O/I/A for the other 23 listed muscles
- Extensor carpi radialis longus/brevis; Iliopsoas vs iliacus/psoas
- All image-required radiology/histology/diagram slots (`IMAGE-SOURCE-VERIFIED` = 0)

Sourced but unused in this 45 (duplicate-control / cap): psoriasis, Merkel cell carcinoma, hair cycle/nails/calluses, gout, standalone RA, C/T/L vertebrae, curve definitions, sprain vs strain, MG, tetanus, botulism, carpal tunnel, twitch/motor unit/length-tension, and similar leftover physiology rows.

No factual transcription error was found in the evidence matrix this pass. The matrix was **not** edited.

---

## Live-practice readiness

**Content-safe for live practice:** ap-q1–ap-q45.

**Live today:** the whole set, through the shared practice route. `getPracticePageData("anatomy-physiology")` returns the 45 live items. The event card label is “Practice.”

**Questions blocked by unresolved evidence:** none of the current 45. The gaps above are topics **not in this bank**, not holds on these IDs.

**Questions requiring human review:** none of the current 45. Trapezius grouping and Serratus rib-range were not tested.

---

## Confirmation

- Bank remains **exactly `ap-q1`–`ap-q45`**
- **No q46+** were created
- **No images** were added
- **No new biology sources** were fetched for authoring
- A&P **live practice is unlocked** on the shared route
