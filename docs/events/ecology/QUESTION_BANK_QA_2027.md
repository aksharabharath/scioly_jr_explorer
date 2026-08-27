# Ecology 2027 — Question Bank QA (MVP)

Content QA of `lib/mock/ecology-questions.ts` (**eco-q1–eco-q40 only**). No bank expansion. Ecology is **unlocked** for shared live practice (`EVENTS_WITH_QUESTION_BANKS`, selectable onboarding/profile).

**This is an MVP verification pass, not a complete competition bank.** It does not attempt graph/table stems, the 10% rule, doubling-time math, seral stages, a featured North American biome catalog, or the remaining `SOURCE-NEEDED` rows.

**Authority:**

1. `RULES_2027.md` — official event scope and closed-list strings
2. `EVIDENCE_MATRIX_2027.md` — factual evidence (`SOURCE-VERIFIED` rows)
3. The inspected source named on each matrix row

General ecology knowledge was **not** treated as enough evidence to mark a question `verified`. Official **scope** does **not** verify a science answer. Unquoted neighboring textbook sentences were **not** treated as evidence.

---

## Schema mapping

The implementation supports `verificationStatus: "draft" | "needs-review" | "verified"`. There is **no** `"source-needed"` value.

| QA report status | `verificationStatus` in code | Meaning |
|---|---|---|
| **VERIFIED** | `verified` | In 2027 Ecology scope; answer and claims match recorded evidence; uniquely keyed; wording stays inside the quote |
| **SOURCE NEEDED** | `needs-review` | Fact is not established by the matrix/source |
| **HUMAN REVIEW** | `needs-review` | Unresolved `HUMAN-REVIEW` item blocks the keyed answer |
| **REMOVE** | — | None this pass |

There are **no `draft` statuses after this pass**.

Practice live pool = `verified` **and** `imageRequired !== true`. Ecology is **unlocked** and in `EVENTS_WITH_QUESTION_BANKS`, so those items enter the shared `/events/ecology/practice` route.

---

## Overall results

| QA status | Count | IDs |
|---|---:|---|
| VERIFIED | **40** | eco-q1–eco-q40 |
| SOURCE NEEDED | **0** | — |
| HUMAN REVIEW | **0** | — |
| REMOVE | **0** | — |

Source bank remains **exactly eco-q1–eco-q40**. No q41+ items. All `imageRequired: false`.

A conservative reading of the matrix supported verifying the whole MVP set after hint and explanation trims. That is **not** a claim that the contest’s graph/table skills, featured-biome set, or full Human Impact catalog are covered.

---

## Per-question table

| ID | Topic | QA result | Code status | Evidence | Edit this pass | Remaining review reason |
| -- | ----- | --------- | ----------- | -------- | -------------- | ----------------------- |
| eco-q1 | organization-and-energy | VERIFIED | verified | V-ORG | status | Printed sequence only |
| eco-q2 | organization-and-energy | VERIFIED | verified | V-F6, V-F7, V-F9, V-F10 | Hint no longer restates the keyed definition | — |
| eco-q3 | organization-and-energy | VERIFIED | verified | V-F6, V-F7, V-F8 | Added V-F8 for the abiotic-ecosystem sentence | — |
| eco-q4 | organization-and-energy | VERIFIED | verified | V-F8 | status | — |
| eco-q5 | organization-and-energy | VERIFIED | verified | V-F12 | status | — |
| eco-q6 | organization-and-energy | VERIFIED | verified | V-F15, V-F16, V-F17 | status | Does **not** use the 10% rule (`SN1`) |
| eco-q7 | organization-and-energy | VERIFIED | verified | V-F18 | status | Five named cycles not treated as a closed catalog |
| eco-q8 | communities-and-succession | VERIFIED | verified | V-F19 | Hint no longer names leftover-community wording | Seral stages not tested (`SN5`) |
| eco-q9 | communities-and-succession | VERIFIED | verified | V-F24 | status | Broad OpenStax symbiosis (`HR9`); not mutualism-only |
| eco-q10 | communities-and-succession | VERIFIED | verified | V-F23 | status | Stem restates the quoted principle; niche clause is in the same quote |
| eco-q11 | populations-and-evolution | VERIFIED | verified | V-F26 | Hint no longer names “K is a limit” | Overshoot/dieback not tested (`SN3`) |
| eco-q12 | populations-and-evolution | VERIFIED | verified | V-F27 | Dropped unsourced “S-shaped” from the explanation | Qualitative only; no doubling-time formula (`SN24`) |
| eco-q13 | populations-and-evolution | VERIFIED | verified | V-F28, V-F29 | status | — |
| eco-q14 | populations-and-evolution | VERIFIED | verified | V-F29 | Explanation no longer attributes an unquoted deer-fire sentence to OpenStax | Stem is an application of the quoted density-independent class |
| eco-q15 | populations-and-evolution | VERIFIED | verified | V-F32, V-LHS | status | Does not key *r*/*K* as outdated (`HR10`) |
| eco-q16 | populations-and-evolution | VERIFIED | verified | V-F34, V-F35 | Hint tightened; added V-F35 for the directional contrast | Disruptive vs diversifying not keyed (`HR11`) |
| eco-q17 | populations-and-evolution | VERIFIED | verified | V-F39, V-SPE | status | — |
| eco-q18 | populations-and-evolution | VERIFIED | verified | V-F41, V-F42 | status | — |
| eco-q19 | terrestrial-ecosystems | VERIFIED | verified | V-F44 | status | Hadley-cell biome belts not tested (`SN12`) |
| eco-q20 | terrestrial-ecosystems | VERIFIED | verified | V-F45 | Hint no longer invents rising/descending air | Windward/leeward stay inside the NWS quote |
| eco-q21 | terrestrial-ecosystems | VERIFIED | verified | V-F50 | status | Does not treat savanna as a featured NA biome (`HR1`, `HR3`) |
| eco-q22 | terrestrial-ecosystems | VERIFIED | verified | V-F51 | Explanation limited to the desert dryness claim | Distractors are not extra official biome catalog entries |
| eco-q23 | terrestrial-ecosystems | VERIFIED | verified | V-F52 | status | One ocotillo example only (`SN11`) |
| eco-q24 | terrestrial-ecosystems | VERIFIED | verified | V-F48 | Hint no longer says “treeless” | Does not treat taiga and boreal as two biomes (`HR2`) |
| eco-q25 | terrestrial-ecosystems | VERIFIED | verified | V-F53 | status | — |
| eco-q26 | terrestrial-ecosystems | VERIFIED | verified | V-F54, V-F55 | Hint no longer says “genomes” | — |
| eco-q27 | terrestrial-ecosystems | VERIFIED | verified | V-ES | status | Names only; no example-to-category mapping (`SN8` / `HR12`) |
| eco-q28 | human-impact | VERIFIED | verified | V-F58 | status | EPA inventory gases; OpenStax water-vapor list not keyed (`HR13`) |
| eco-q29 | human-impact | VERIFIED | verified | V-F60 | status | Qualitative NOAA chemistry; no pH-unit number |
| eco-q30 | human-impact | VERIFIED | verified | V-F61, V-F63 | status | Climate change kept as the fourth cause, not one of the three |
| eco-q31 | human-impact | VERIFIED | verified | V-F25 | status | No invented invasive-species list (`SN16`) |
| eco-q32 | human-impact | VERIFIED | verified | V-F62, V-INV-M | Hint no longer restates the keyed living-agent definition | Physical/manual not keyed as a fifth official method (`HR14`) |
| eco-q33 | human-impact | VERIFIED | verified | V-F64 | Hint no longer names sulfuric and nitric acids | — |
| eco-q34 | human-impact | VERIFIED | verified | V-F65 | status | Bioaccumulation-only definition not keyed (`SN19`) |
| eco-q35 | human-impact | VERIFIED | verified | V-F66, V-F67 | status | No eutrophication stage ladder (`SN18`) |
| eco-q36 | human-impact | VERIFIED | verified | V-F70 | status | Full EIA nuclear page (not search-extract) |
| eco-q37 | human-impact | VERIFIED | verified | V-F69 | status | Full EIA solar page (not search-extract) |
| eco-q38 | human-impact | VERIFIED | verified | V-F72 | status | Answer matches the recorded EIA wind extract in the matrix; page was not re-fetched this pass |
| eco-q39 | human-impact | VERIFIED | verified | V-F73 | status | Answer matches the recorded EIA hydro extract in the matrix; page was not re-fetched this pass |
| eco-q40 | human-impact | VERIFIED | verified | V-F75 | status | VU / EN / CR as threatened; criteria A–E numbers not tested (`SN25`) |

---

## Verification-status changes

All **40** items: `draft` → `verified`.

No item was left `needs-review`. No item was removed.

The `eco()` helper now takes an explicit `verificationStatus` argument (it no longer hardcodes `"draft"`).

---

## Questions modified this pass (wording / metadata)

Status was set on **all 40**. Content or metadata edits:

| ID | What changed |
|---|---|
| eco-q2 | Hint |
| eco-q3 | Added V-F8 |
| eco-q8 | Hint |
| eco-q11 | Hint |
| eco-q12 | Explanation (dropped “S-shaped”) |
| eco-q14 | Explanation (dropped unquoted deer-fire sentence) |
| eco-q16 | Hint; added V-F35 |
| eco-q20 | Hint |
| eco-q22 | Explanation; source note |
| eco-q24 | Hint |
| eco-q26 | Hint |
| eco-q32 | Hint |
| eco-q33 | Hint |

---

## Topic distribution (unchanged)

| Topic | Count |
|---|---:|
| organization-and-energy | 7 |
| communities-and-succession | 3 |
| populations-and-evolution | 8 |
| terrestrial-ecosystems | 9 |
| human-impact | 13 |

Official-heading mix of this 40: **18** General Principles (q1–q18), **9** Terrestrial (q19–q27), **13** Human Impact (q28–q40). Matches the Phase 3 indicative plan.

## Difficulty distribution (unchanged)

**16 Level 1 / 16 Level 2 / 8 Level 3**

## Cognitive-demand distribution (unchanged)

| Demand | Count |
|---|---:|
| recall | 14 |
| recognition | 8 |
| distinction | 10 |
| application | 8 |
| multi-step | 0 |

Graph/table multi-step items stay deferred (`IMAGE-SOURCE-NEEDED`).

## Primary source distribution (unchanged)

| sourceType | Count |
|---|---:|
| openstax | 27 |
| eia | 4 |
| rules-derived | 2 |
| nws | 2 |
| epa | 2 |
| noaa | 1 |
| nisic | 1 |
| iucn | 1 |

Correct-choice letters remain balanced (**a:10 / b:10 / c:10 / d:10**).

---

## Remaining gaps (not in this bank)

These stayed out of the MVP bank and are still blocked for a later full-bank pass:

- **10% rule** meaning (`SN1`); doubling-time formula (`SN2` / `SN24`); overshoot/dieback (`SN3`)
- Seral stages (`SN5`); convergent vs divergent (`SN6`); named mass-extinction events (`SN7`)
- Mapping Provisioning / Regulating / Supporting / Cultural onto examples (`SN8` / `HR12`)
- Featured North American biome set (`SN9` / `HR1`); desert/grassland type catalog (`SN10`)
- Additional desert–grassland adaptations beyond ocotillo leaves (`SN11`)
- Coriolis → biome-belt mechanism (`SN12`)
- Habitat-destruction process catalog; soil erosion / desertification / salinization (`SN13`, `SN14`)
- Invasive characteristic biology and invented species lists (`SN15`, `SN16`)
- Eutrophication stage ladder; crisp bioaccumulation-only definition (`SN18`, `SN19`)
- Conservation goals list; reclamation vs reintroduction (`SN20`, `SN21`)
- Dedicated S1 / S3 / S4 process-skill items (V-F1–V-F4 unused)
- Biomass and geothermal energy items (V-F71, V-F74 exist; not authored in this 40)
- IUCN criteria A–E numbers (`SN25`)

No factual transcription error was found in the evidence matrix this pass. The matrix was **not** edited. EIA wind and hydropower quotations remain the Phase 2 search-extract rows; this pass checked the items against those recorded quotes only.

---

## Image blockers

**None in-bank.** Every item is `imageRequired: false`.

Official process skill **analyzing data from graphs and tables** (S2) remains out of MVP: matrix `IMAGE-SOURCE-VERIFIED` = **0**; `IMAGE-SOURCE-NEEDED` rows were not authored.

---

## Live-practice readiness

**Content-safe for live practice:** eco-q1–eco-q40.

**Live today:** the whole set, through the shared practice route.

- The bank is in `QUESTIONS_BY_EVENT` and `EVENTS_WITH_QUESTION_BANKS`.
- Ecology is `unlocked: true`. The event card label is “Practice.”
- `getPracticePageData("ecology")` returns the 40 live items.
- Event page `hasPractice` is `true`.

**Questions blocked by unresolved evidence:** none of the current 40. The gaps above are topics **not in this bank**, not holds on these IDs.

**Questions requiring human review:** none of the current 40. HR1–HR3, HR9–HR14 were avoided in the keyed answers rather than left as blockers.

---

## MVP readiness

The verified text-first set is **registered** in `lib/mock/curriculum.ts` and **unlocked** for the shared `/events/ecology/practice` route. Do not expand the bank (Phase 8).

This MVP is **not** a 30-question contest replica and **not** a tournament-sized bank.

---

## Validation results

Recorded after this pass — **all passed**:

- `npx tsx lib/mock/ecology-questions.check.ts` — 40 verified, 16/16/8 difficulty, no drafts
- `npx tsx lib/mock/curriculum.check.ts`
- `npx tsx lib/mock/events.check.ts`
- `npx tsx lib/student-events.check.ts`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## Confirmation

- Bank remains **exactly `eco-q1`–`eco-q40`**
- **No q41+** were created
- **No images** were added
- **No new biology sources** were fetched for authoring
- Ecology **live practice is unlocked** on the shared practice route

---

## Related files

- `lib/mock/ecology-questions.ts`
- `lib/mock/ecology-questions.check.ts`
- `lib/mock/curriculum.ts`
- `docs/events/ecology/EVIDENCE_MATRIX_2027.md`
- `docs/events/ecology/QUESTION_BANK_BLUEPRINT_2027.md`
- `docs/events/ecology/RULES_2027.md`
