# Crime Busters 2027 — IM4 image QA

**Pass date:** 2026-08-30. **Slice only:** `cb-q41`–`cb-q44`. `cb-q1`–`cb-q40` were not rewritten.

Authored as `needs-review`, then verified after this inspection. Live filter: `verified` and (`imageRequired` false **or** real `imageSrc` + `imageAlt`).

## Counts

| Set | Count |
|---|---:|
| Registered Crime Busters | **44** |
| Text MVP (`cb-q1`–`cb-q40`) | 40 verified, `imageRequired` false |
| IM4 image slice | **4** verified, `imageRequired` true |
| Live | **44** |

## Per-question

| ID | Family keyed | File exists | Alt leak? | Credit leak? | diagnosticVisible | imageQuestionFit | Status |
|---|---|---|---|---|---|---|---|
| cb-q41 | Loop | yes | no | no | yes | essential | verified |
| cb-q42 | Loop | yes | no | no | yes | essential | verified |
| cb-q43 | Whorl | yes | no | no | yes | essential | verified |
| cb-q44 | Arch | yes | no | no | yes | essential | verified |

**cb-q41 / cb-q42:** FBI handbook line drawings. Small (~200 px) but the same-side recurve and single opposite delta are readable. Figure numbers 61 / 62 do not name the family.

**cb-q43:** Resized Commons photo. Concentric circuit and two lower deltas are visible.

**cb-q44:** Resized Commons photo. Ridges rise and continue to the opposite side; no complete circuit. Stem keys **Arch**, not tented vs plain.

## QA gate

Each item:

1. Official family is in the 2027 rules (`V-P1`–`V-P3`).
2. The picture actually shows the diagnostic in `imageBrief`.
3. The keyed answer is that family only.
4. Distractors are the other families plus a non-family word (Minutiae / Skin layer).
5. Hint does not name the keyed family.
6. Alt and credit do not name Loop / Whorl / Arch.

No Central Pocket item. No ulnar/radial item.

## Still out of bank

IM1, IM2, IM3, IM5–IM8. Extra FBI sheet crops failed isolation.

## Validation

Recorded after this pass — **all passed**:

- `npx tsx lib/mock/crime-busters-questions.check.ts` — 44 verified, 4 image
- `npx tsx lib/mock/curriculum.check.ts`
- `npm run lint`
- `npx tsc --noEmit`
