# Entomology 2027 — Live image QA

**Pass date:** 2026-08-30 (replacements, credits, and visual-ID rewrites). **Read of code/files is authoritative.**

This pass **did** rewrite several photographed items from taxonomy-recall stems into visual-identification stems (and reordered some choices / `correctChoiceId` values to match). Items that received a live JPEG were promoted to `verified` when they had been `needs-review` only for missing images. Do not treat a photo as proof of unsourced biology.

Practice live filter (`isLivePracticeQuestion` in `lib/mock/curriculum.ts`):

1. `verificationStatus` is `"verified"` (omitted counts as verified).
2. If `imageRequired === true`, `imageSrc` and `imageAlt` must be non-empty.

A JPEG displaying in the quiz does **not** prove taxonomy, license clearance for redistribution without credit, or that the photo shows the trait in `imageBrief`.

**Bank counts (this pass):** 60 registered · 36 `verified` · 24 `needs-review` · 17 `imageRequired` (all verified + local JPEG + alt) · **36 live** (19 text + 17 image). The 24 text `needs-review` items stay held out.

**Assets:** local static JPEGs under `public/entomology/`, served as `/entomology/…`. Companion `*-photo.jpg` files are Commons downloads used to build quiz JPEGs; they are not `imageSrc`. Mapping is hardcoded on each question in `lib/mock/entomology-questions.ts` (deterministic 1:1).

**License check:** Wikimedia Commons `imageinfo` / `extmetadata`. Quiz JPEGs with circles, A/B letters, crops, or composites are **adaptations**. CC BY / CC BY-SA still require **attribution**. The practice quiz shows those credits under the figure (`Question.imageCredit` from `lib/mock/entomology-image-credits.ts`). Public-domain and CC0 items (q7, q9, q17) have no student credit line.

**Share-alike:** any quiz file that includes a CC BY-SA source (including q10, q12, q13, q40 composites and several single-source overlays) should be treated as BY-SA for redistribution of the derivative.

**Evidence:** a photo of a listed-looking specimen supports **matching the picture to a printed list name**. It does **not** turn orientation, snout, furcula, cerci location, natatorial, or blood-feeding into official-list facts. Those remain `FACTUAL_SOURCE_NEEDED` in `EVIDENCE_MATRIX_2027.md`.

---

## Inventory (17 live image questions)

All 17 referenced quiz JPEGs exist. Every quiz JPEG in `public/entomology/` (files whose names do not contain `photo`) is referenced by the bank. Companion photos exist as listed in `public/entomology/README.md`.

| ID | Path | File exists | Alt | Status | Live | imageBrief (abbrev.) | Diagnostic expected | Source/license in repo |
|---|---|---|---|---|---|---|---|---|
| ento-q3 | `/entomology/ento-q3.jpg` | yes | yes | verified | yes | Eight legs, fused body | Tick vs insect grouping | README + Commons |
| ento-q5 | `/entomology/ento-q5.jpg` | yes | yes | verified | yes | Honey bee on flowers | Listed bee family vs bee fly / wasp / ant | README + Commons |
| ento-q6 | `/entomology/ento-q6.jpg` | yes | yes | verified | yes | Worker ant side view | Listed ant family vs other Hymenoptera | README + Commons |
| ento-q7 | `/entomology/ento-q7.jpg` | yes | yes | verified | yes | Hindwing tails | Swallowtail family vs other listed Lepidoptera | README + Commons |
| ento-q8 | `/entomology/ento-q8.jpg` | yes | yes | verified | yes | Belly-up at surface | Backswimmer family vs boatman / beetles | README + Commons |
| ento-q9 | `/entomology/ento-q9.jpg` | yes | yes | verified | yes | Distinct snout | Weevil family vs other beetles | README + Commons |
| ento-q10 | `/entomology/ento-q10.jpg` | yes | yes | verified | yes | Furcula under abdomen | Collembola vs silverfish / dipluran / thrips | README + Commons |
| ento-q12 | `/entomology/ento-q12.jpg` | yes | yes | verified | yes | Threadlike vs clubbed antennae | Dytiscidae vs Hydrophilidae pairing | README + Commons (2 files) |
| ento-q13 | `/entomology/ento-q13.jpg` | yes | yes | verified | yes | Crane fly vs mosquito forms | Listed families; piercing/blood clause is extra | README + Commons (2 files) |
| ento-q17 | `/entomology/ento-q17.jpg` | yes | yes | verified | yes | Rear pair at abdomen tip | Where the circled structures sit | README + Commons |
| ento-q24 | `/entomology/ento-q24.jpg` | yes | yes | verified | yes | Flattened oar-like hind leg | Adaptation name + Dytiscidae | README + Commons |
| ento-q33 | `/entomology/ento-q33.jpg` | yes | yes | verified | yes | Roof-like clear wings | Cicada family vs look-alikes | README + Commons |
| ento-q35 | `/entomology/ento-q35.jpg` | yes | yes | verified | yes | Round spotted elytra | Lady-bird beetle family | README + Commons |
| ento-q38 | `/entomology/ento-q38.jpg` | yes | yes | verified | yes | Triangular head, grasping forelegs | Mantodea vs other orders | README + Commons |
| ento-q40 | `/entomology/ento-q40.jpg` | yes | yes | verified | yes | Bee fly vs bee | Bombyliidae/Diptera vs Apidae/Hymenoptera | README + Commons (2 files) |
| ento-q41 | `/entomology/ento-q41.jpg` | yes | yes | verified | yes | Yellow-black, narrow waist | Vespidae vs other Hymenoptera | README + Commons |
| ento-q44 | `/entomology/ento-q44.jpg` | yes | yes | verified | yes | Peaked dorsal shield | Treehopper family | README + Commons |

---

## Visual fitness

Inspected the **quiz** JPEGs (not “it loaded in the browser”). Fit classes: **essential** (student needs the picture for the stem as written after `[IMAGE REQUIRED]` is stripped) · **supporting** (text/choices can carry the answer) · **insufficient** (intended diagnostic is not visible enough).

| ID | diagnosticVisible | imageQuestionFit | needsReplacement | Reason |
|---|---|---|---|---|
| q3 | yes | supporting | no | Eight legs and a fused body are visible. Choice D also names hardback ticks, so the photo is not the only path. |
| q5 | yes | essential | no | Hairy flower visitor with hymenopteran bee gestalt; not a long rigid bee-fly beak. |
| q6 | yes | essential | no | Pinned worker-ant profile: head, petiole, gaster, elbowed antennae. |
| q7 | yes | essential | no | At least one hindwing tail is visible. Yellow circle sits on the hindwing margin (somewhat off the longest tail) but the tails are still in the photo. |
| q8 | yes | essential | no | Insect at the surface, venter toward the viewer, long oar hind legs. Photographer watermark is visible; it does not name the family. Orientation is **shown**, not an official-list fact. |
| q9 | yes | essential | no | Long rostrum is obvious. Snout is **shown**, not an official-list fact. |
| q10 | yes | essential | no | A: lateral six-legged wingless hexapod. B: close-up of the forked jumping organ. Composite 2026-08-30. |
| q12 | yes | essential | no | A: diving beetle with threadlike antennae. B: scavenger beetle with short clubbed antennae and long palps on white (no tennis ball). |
| q13 | yes (forms); **no** (blood-feeding) | essential (pairing) | no | A: long-legged crane-fly form. B: mosquito form with a forward piercing beak. **Blood-feeding in many species cannot be read from the photo.** |
| q17 | yes | essential | no | Yellow circle on the rear pincer pair. Location of cerci is **shown**, not an official structure checklist. |
| q24 | yes | essential | no | Yellow circle on a flattened hind leg of an aquatic beetle. “Natatorial” remains a glossary word, not a list string. |
| q33 | yes | essential | no | Broad head, membranous wings folded over the back. |
| q35 | yes | essential | no | Round spotted beetles (mating pose is extra, not a spoiler in alt). |
| q38 | yes | essential | no | Triangular head and folded spiny forelegs. |
| q40 | yes | essential | no | A: long rigid mouthpart, bee-fly gestalt. B: same bee photo family as q5. A/B labels only. |
| q41 | yes | essential | no | Side view of a yellow-and-black wasp with a distinct waist; 1920×1280 (replaced 569×569 still). |
| q44 | yes | essential | no | Enlarged peaked pronotum in side view. |

**Visually sufficient for the intended task:** 17.  
**Recommend replacement:** 0 after the 2026-08-30 q10 / q12 / q41 replacements.

---

## One row per live image (source + QA)

Checked 2026-08-30 against Commons file-page metadata.

| Question ID | Asset | Source URL | Author | License | Diagnostic feature | Diagnostic visible? | Attribution required? | Composite? | QA status |
|---|---|---|---|---|---|---|---|---|---|
| ento-q3 | `ento-q3.jpg` | https://commons.wikimedia.org/wiki/File:Ixodes_ricinus_on_dry_grass.jpg | W.alter | CC BY-SA 4.0 | Eight legs, fused body | yes | yes | no (overlay/re-encode) | PASS · LICENSE-VERIFIED |
| ento-q5 | `ento-q5.jpg` | https://commons.wikimedia.org/wiki/File:Apis_mellifera_2_Luc_Viatour.JPG | Luc Viatour | CC BY-SA 3.0 | Bee gestalt / two wing pairs | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q6 | `ento-q6.jpg` | https://commons.wikimedia.org/wiki/File:Formica_neoclara_casent0102157_profile_1.jpg | April Nobile (AntWeb.org) | CC BY 4.0 | Ant profile / petiole | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q7 | `ento-q7.jpg` | https://commons.wikimedia.org/wiki/File:Papilio_machaon.jpg | Adrian198cm | Public domain | Hindwing tails | yes | no | no (circle overlay) | PASS · LICENSE-VERIFIED |
| ento-q8 | `ento-q8.jpg` | https://commons.wikimedia.org/wiki/File:Backswimmer_Notonectidae.jpg | Olaf Nelson | CC BY-SA 4.0 | Surface, venter-up | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q9 | `ento-q9.jpg` | https://commons.wikimedia.org/wiki/File:Kaldari_Curculio_occidentis_01.jpg | Ryan Kaldari | CC0 | Rostrum | yes | no | no | PASS · LICENSE-VERIFIED |
| ento-q10 | `ento-q10.jpg` | A: https://commons.wikimedia.org/wiki/File:Orchesella_villosa_lateral_Bytom.jpg · B: https://commons.wikimedia.org/wiki/File:Isotoma_anglicana%3F_Furcula_-_2_teeth_on_manubrium%3F_(40075005644).jpg | Adrian Tync · AJC1 | CC BY-SA 4.0 · CC BY-SA 2.0 | Whole animal + forked jumping organ | yes | yes | **yes** | PASS · LICENSE-VERIFIED |
| ento-q12 | `ento-q12.jpg` | A: https://commons.wikimedia.org/wiki/File:Dytiscus_marginalis_01_by-dpckk.jpg · B: https://commons.wikimedia.org/wiki/File:Hydrophilus_piceus_(Linné,_1758)_female_(4035156238).jpg | A: David Perez / B kimmel · B: Udo Schmidt | A: CC BY 3.0 · B: CC BY-SA 2.0 | Filiform vs clubbed antennae | yes | yes (BY-SA half) | **yes** | PASS · LICENSE-VERIFIED |
| ento-q13 | `ento-q13.jpg` | A: https://commons.wikimedia.org/wiki/File:Tipula_paludosa.jpg · B: https://commons.wikimedia.org/wiki/File:Culex_pipiens.jpg | neurovelho · Jedesto | CC BY-SA 3.0 · CC BY-SA 4.0 | Crane-fly vs mosquito form; not blood-feeding | yes / no | yes | **yes** | PASS (pairing) · LICENSE-VERIFIED |
| ento-q17 | `ento-q17.jpg` | https://commons.wikimedia.org/wiki/File:F-auricularia_M_large_cerci_-_Sittard20090722_505.jpg | Pudding4brains | Public domain | Rear pair (cerci) | yes | no | no (circle overlay) | PASS · LICENSE-VERIFIED |
| ento-q24 | `ento-q24.jpg` | https://commons.wikimedia.org/wiki/File:Great_Diving_Beetle_(Dytiscus_marginalis)_(8332211239).jpg | Bernard DUPONT | CC BY-SA 2.0 | Flattened hind leg | yes | yes | no (circle overlay) | PASS · LICENSE-VERIFIED |
| ento-q33 | `ento-q33.jpg` | https://commons.wikimedia.org/wiki/File:Neotibicen_linnei.jpg | Bruce Marlin | CC BY-SA 2.5 | Cicada gestalt | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q35 | `ento-q35.jpg` | https://commons.wikimedia.org/wiki/File:Coccinella_septempunctata.jpg | Jean-Jacques MILAN | CC BY-SA 3.0 | Round spotted beetles | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q38 | `ento-q38.jpg` | https://commons.wikimedia.org/wiki/File:Mantis_religiosa.jpg | GüntherR | CC BY 2.5 | Mantid head / raptorial legs | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q40 | `ento-q40.jpg` | A: https://commons.wikimedia.org/wiki/File:Bombylius_major.jpg · B: same as q5 | Michael Apel · Luc Viatour | CC BY 2.5 · CC BY-SA 3.0 | Bee fly vs bee | yes | yes | **yes** | PASS · LICENSE-VERIFIED |
| ento-q41 | `ento-q41.jpg` | https://commons.wikimedia.org/wiki/File:Vespula_germanica_Horizontalview_Richard_Bartz.jpg | Richard Bartz | CC BY-SA 2.5 | Yellowjacket gestalt | yes | yes | no | PASS · LICENSE-VERIFIED |
| ento-q44 | `ento-q44.jpg` | https://commons.wikimedia.org/wiki/File:Stictocephala_bisonia.jpg | Thorsten Denhard | CC BY-SA 3.0 | Peaked pronotum | yes | yes | no | PASS · LICENSE-VERIFIED |

**LICENSE-UNVERIFIED:** 0 source file pages (this check).  
**Student-facing attribution:** CC BY / CC BY-SA quiz photos show author + license + “Wikimedia Commons” under the figure. PD/CC0 items have no credit line.

---

## Rendering

`PracticeQuiz` renders `question.imageSrc` with `<img alt={imageAlt}>`, `max-h-72 w-full object-contain`. CC BY / CC BY-SA items show `imageCredit` in a `<figcaption>` under the photo. No `onError`, no zoom.

---

## Replacement pass (2026-08-30)

Replaced q10, q12 panel B, and q41. Added student-visible credits. Did **not** verify the 24 text `needs-review` questions or treat photos as official evidence for extra biology.
