# Entomology Content Specification

**This document is Jr. Explorer product design. It is not official Science Olympiad rules.**

| Official | Product |
|---|---|
| `RULES_2027.md` | This file |
| `TAXON_LIST_2027.md` | Practice `topicId`s below |
| `SAMPLE_ANALYSIS_2027.md` | Style hints only; verify biology before shipping |

---

## 1. Goal

Jr. Explorer should prepare students for **2027 Entomology** through **adaptive multiple-choice practice** (10-question sessions).

The live product already has: question → feedback → persistence → adaptive revisit → weak points → progress → XP/Level/streak.

A **30-item first-pass bank** now lives in `lib/mock/entomology-questions.ts` and is the app’s primary catalog practice event. That bank is **not** the 120–150 verified target in §3. There are **no Entomology lessons**.

---

## 2. Recommended Content Areas

Practice taxonomy (not official ranks):

| Area ID | Area | Basis |
|---|---|---|
| `taxonomy` | Order / subclass / family / common name | Official ID requirements |
| `visual-id` | Image specimen ID | Official images; majority of Sample Test 1 |
| `comparison` | Listed look-alikes | Sample: Corixidae/Notonectidae; Dytiscidae/Hydrophilidae |
| `dichotomous-keys` | Use and write a simple key | Official; **missing from samples** |
| `external-anatomy` | Body regions, exoskeleton, mouthparts, legs, cerci, tarsi | Official + samples |
| `internal-anatomy` | Internal anatomy | Official; **missing from samples** — keep shallow |
| `life-cycles` | Metamorphosis | Official ecology/life; Sample Test 1 Q10 |
| `ecology-habitat` | Habitat, aquatic life | Official; Sample: mayfly habitat |
| `behavior-adaptations` | Behavior, fossorial/natatorial, feeding | Official; samples: stridulation, legs, Reduviidae feeding |
| `interactions` | Symbiosis, competition, plant/animal relationships | Official; sample: Cynipidae galls only |
| `human-impact` | Public health, disease, economic, beneficial/detrimental, food, medicine, chemicals, nutrients, nuisance | Official; samples barely ID Ixodidae / ladybugs / weevils |
| `climate` | Climate-change impacts | Official; **missing from samples** — still include, verified and light |

---

## 3. Question Bank Strategy

**Keep 120–150 verified items** for Entomology v1.

Why (unchanged, confirmed by the full sample mix):

- 53 named taxa, ~50 ID targets. A 10-question set repeats too fast if the bank is 48 (Astronomy size).
- Sample Test 1 is identification-heavy; the **official** event also requires keys, climate, internal anatomy, economic/health. The bank must cover official scope, not only the sample mix.
- ~2 ID items per target ≈ 100, plus ~20–50 conceptual/application/key items = **120–150**.
- Five-option sample items (A–E) are a **tournament style**. Jr. Explorer `Question` today uses four choices (`a`–`d`). **Do not change TypeScript in this task.** Author 4-choice items unless/until the type is extended.

Do not generate the bank in this documentation task.

---

## 4. Difficulty Framework

Same `1 | 2 | 3` as `Question.difficulty`.

| Level | Entomology meaning | Sample analogues |
|---|---|---|
| 1 | Terminology, body plan, straightforward fact | Thoracic segments; chitin; complete metamorphosis |
| 2 | ID, comparison, application | Family ID; Corixidae vs Notonectidae; fossorial/natatorial; habitat/feeding |
| 3 | Subtle ID, mixed ranks, multi-step, keys | Mixed Diplura vs families; dichotomous-key construction |

---

## 5. Recommended Distribution

For a **130-item** midpoint bank. Official rules weigh identification **and** correlated knowledge; samples over-weight ID. The product mix should be **closer to the rules than to the samples**, while still teaching what the samples drill.

### Difficulty

| Level | Share | Count |
|---|---|---|
| 1 | 40% | ~50–55 |
| 2 | 40% | ~50–55 |
| 3 | 20% | ~25–30 |

### Identification vs conceptual

| Kind | Share | Notes |
|---|---|---|
| Identification (incl. visual ID) | 45% | Official core; samples were higher (~60% of named Test 1 items) |
| Conceptual / correlated | 55% | Anatomy, ecology, behavior, economic/health, climate, keys |

### Images

| Kind | Share |
|---|---|
| Image specimen ID | **30–40%** of the bank |
| Text-only | 60–70% |

Official event uses image specimens. Samples appear even more image-heavy. Jr. Explorer should not make *every* item an image (anatomy facts do not need one). Do not add images until Phase 3.

### By primary area (130 items)

| Primary area | Share | Approx. | Rationale |
|---|---|---|---|
| Taxonomy + visual ID | 35% | ~45 | Core skill; not 60%+ like Sample Test 1 |
| Comparison | 10% | ~13 | Sample pattern; listed look-alikes only |
| External anatomy | 12% | ~16 | Samples + official |
| Dichotomous keys | 8% | ~10 | Official; samples omitted |
| Ecology / habitat / life cycles | 10% | ~13 | Official ecology/habitat |
| Behavior / adaptations | 7% | ~9 | Legs, feeding, stridulation |
| Human-impact | 8% | ~10 | Official economic + public health + nuisance |
| Interactions | 4% | ~5 | Official symbiosis/competition/plants/animals |
| Internal anatomy | 3% | ~4 | Official; light |
| Climate | 3% | ~4 | Official; light and verified |

---

## 6. Image Questions

Do not add assets now.

Future metadata: image, taxon, diagnostic features, stem, choices, correct answer, explanation, confusable **listed** taxa, source, verification status.

Current `Question` type (`id`, `eventId`, `topicId`, `prompt`, `choices`, `correctChoiceId`, `explanation`, `hint`, `difficulty`) can hold a text stem that *mentions* an image but **cannot** store URL, diagnostics, or confusable taxa. **Extend later.** Do not change types in this task.

Missing sample photos: `Image required; supplied image not available in current source text.` Do not guess the specimen.

---

## 7. Factual Verification

1. Official rules = scope (`RULES_2027.md`).
2. ESO list = allowed taxa and **official common names** (`TAXON_LIST_2027.md`).
3. Sample tests = style and keys only. Preserve keys in `SAMPLE_ANALYSIS_2027.md`. They are **not** automatically correct biology.
4. Verify facts before production.
5. Do not invent science or extra taxa.
6. Flag `Supplied sample claim — verify before using in production content.`
7. Do not silently rewrite a sample answer.

Preserve list strings such as `hardback ticks`, `dung beetles`, `Giant Silkworm moths` unless a later official list changes them.

---

## 8. Question Quality Standard

- One defensible answer
- Distractors from **this** list
- No trick wording; elementary voice
- Official scope only
- Explanation teaches
- No redundant clones
- Mix `a`–`d` positions
- Images when ID is genuinely visual
- Distinguish related listed taxa where the event does

---

## 9. Future Bank Phases

Not implemented in this task.

1. Verified factual + ID-in-text (scientific + official common names)
2. Comparisons and application (habitat, feeding, metamorphosis, economic/health)
3. Image ID + type extension
4. Dichotomous-key items
5. Audit vs §5 (especially climate, keys, internal anatomy)

---

## 10. Out of scope

Trial Mode, lessons, AI, event-specific XP, shipping unverified items as contest-final, inventing specimen images, changing Astronomy’s question bank.
