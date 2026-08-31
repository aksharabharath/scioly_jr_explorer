# Entomology 2027 — Question Bank Blueprint

**Planning document only.** This is not a question bank, not official Science Olympiad rules, and not an instruction to generate items in this pass.

Do not invent official facts, diagnostic characters, measurements, relationships, economic impacts, or specimen features that are not supported by in-repo sources. Where the curriculum has a gap and sources are insufficient, the slot is **`SOURCE NEEDED`**. Do not fill it from general biology knowledge.

The current **60** items in `lib/mock/entomology-questions.ts` (`ento-q1`–`ento-q60`) are a **draft bank**, not contest-final. Keep, revise, or replace them after verification. Do not treat `generated` as verified. Do not author q61+ in this pass.

**Authoritative rules (this project):** `docs/events/entomology/RULES_2027_OFFICIAL.md` — rules body **and** 2027 ESO list. A PDF is not required. Evidence: `EVIDENCE_MATRIX_2027.md`.

| In-repo source | Role in this blueprint |
|---|---|
| `RULES_2027_OFFICIAL.md` | Official **scope**, format, scoring facts that are printed, and **official list strings** |
| `CURRICULUM_2027.md` | Curriculum map, 25 skills, 53-taxon inventory, gaps |
| `RULES_2027.md` | Structured restatement of `RULES_2027_OFFICIAL.md` |
| `TAXON_LIST_2027.md` | Aligned official list: 53 taxa, official common-name strings, 14 starred entries (meaning undefined) |
| `SAMPLE_ANALYSIS_2027.md` | Style only — **not** official rules |
| `CONTENT_SPEC.md` | Product distribution guidance (not official percentages) |
| `lib/mock/entomology-questions.ts` | Draft 60; author metadata |
| `lib/types.ts` | Live `Question` shape (do not change in this pass) |

Official **sample** PDFs are **not** in this repository. Licensed Commons JPEGs for **17** live practice items are in `public/entomology/` (`IMAGE_QA_2027.md`). The 2027 rules/list **are** in `RULES_2027_OFFICIAL.md`.

### Authoritative-rules implications (planning only)

- **135 is a product ceiling**, not an official question count. If `SOURCE NEEDED` slots cannot be filled from real factual/image sources, **leave them empty**.
- Identification is **limited to** the 2027 list (**53** named taxa). Use **official** common-name strings (e.g. Hydrophilidae = `water scavenger`, not `water scavenger beetles`).
- Contest **will** exhibit images. Practice currently has **17** Commons JPEGs; extra morphology is still `FACTUAL_SOURCE_NEEDED` (`IMAGE_QA_2027.md`).
- Dichotomous keys are **in scope**. Competition says students **may** be asked to use or formulate a **simple** key; the description says they **will** be asked to use or construct a key. Do **not** treat “12 key items” as an official quota. Keep keys as a major practice area.
- Ecological/economic lists are **`may include` / `e.g.` / `such as`**, not closed fact catalogs.
- **Life cycles are not named** in the official rules. The `life-cycles` target is **product/sample planning**, not official domain. Do not fill it from general biology.
- **14** list lines are starred; meaning is **undefined**. Do not write items about stars.
- Correlated anatomy/ecology/economic/systematics are **scope**. Answers still need **`FACTUAL_SOURCE_NEEDED`** evidence.

---

## 1. Target bank size

| Metric | Value |
|---|---|
| **Planning target** | **135** |
| Minimum acceptable | **120** |
| Maximum acceptable | **150** |

135 is a **planning target**, not a hard requirement and **not** an official rules quota. Land **below** 120–150 if verification or `SOURCE NEEDED` slots force it.

**Why ~135 was chosen (aligned with `CONTENT_SPEC.md` ~120–150):**

- 53 named taxa. A 10-question session from a tiny bank repeats too fast (`PRACTICE_SET_SIZE = 10`).
- Official scope is identification **and** correlated questions, not Sample Test 1’s ID-heavy mix.
- Image items stay **held out of live practice until assets exist**, so the **source** bank can be larger than **live**. **Now:** 17 Commons JPEGs exist and those items are live; remaining `needs-review` text items stay held out.

**What official evidence can actually fill:** list literacy, family→order placement, heading contrasts, and **name-only** keys/comparisons. That is **far fewer than 135**. Anatomy, habitat, life-cycle, behavior, impact, climate **facts**, and visual-id stay empty until sourced. **Do not invent content to hit 135.**

If `SOURCE NEEDED` slots cannot be filled, **leave them empty**. A verified ~50–70 list/key bank is better than an invented 135.

**Phased live totals (same source bank):**

| Phase | Source items | Typical live pool | Notes |
|---|---|---|---|
| Now | 60 | 36 verified (19 text + 17 Commons photos) | Remaining `needs-review` text items still held out |
| Text expansion (official list strings only) | grow taxonomy + name-only keys | live = verified non-image | Use `TAXON_LIST_2027.md` / `RULES_2027_OFFICIAL.md`; re-QA old bank strings first |
| Correlated / visual | only with factual or image sources | — | Do not pad |

---

## 2. Distribution at a glance (planning target = 135)

These are planning splits. They **do not** scale the current 60 proportionally. They correct product weaknesses (no live visual-id, thin family coverage, thin comparison). Keys stay large because they are **in official scope**, not because the rules mandate a 12-item quota.

### 2.1 Twelve major practice areas

See §3 for min/max, gaps, and image rules. Planning counts:

| `topicId` | Target | Share of 135 |
|---|---|---|
| taxonomy | 28 | 21% |
| visual-id | 24 | 18% |
| comparison | 12 | 9% |
| dichotomous-keys | 12 | 9% |
| external-anatomy | 14 | 10% |
| internal-anatomy | 4 | 3% |
| life-cycles | 6 | 4% |
| ecology-habitat | 9 | 7% |
| behavior-adaptations | 9 | 7% |
| interactions | 5 | 4% |
| human-impact | 8 | 6% |
| climate | 4 | 3% |
| **Total** | **135** | **100%** |

Identification cluster (`taxonomy` + `visual-id` + `comparison`) = **64 / 135 ≈ 47%**. That is closer to official “ID plus correlated” than Sample Test 1 (~60% named ID), and slightly above `CONTENT_SPEC.md`’s 45% ID band because list literacy for 53 taxa needs room.

Correlated + keys = **71 / 135 ≈ 53%**.

### 2.2 Taxonomy / list literacy vs correlated biology

| Kind | Planning count | Notes |
|---|---|---|
| List literacy (common name, rank, parent order, list membership) | ~34 | Mostly `taxonomy`; some keys/comparisons use list facts |
| Identification skill (visual, text-description, look-alikes) | ~36 | `visual-id` + `comparison`; many image-held |
| Keys | 12 | Official **scope** (competition **may** / description **will**); not an official count |
| Correlated biology (anatomy, habitat, life, behavior, impact, climate) | ~53 | **Do not invent.** Life-cycle slots are **not** official-rules domain. Most of this band stays `SOURCE NEEDED` |

### 2.3 Knowledge vs skills

Use `CURRICULUM_2027.md`: facts are not skills.

| Mix | Planning share | What it means |
|---|---|---|
| Knowledge-forward | ~30% | Official common name, rank, three tagmata, list grouping |
| Skill-forward | ~55% | Identify, distinguish, follow/write a key, apply habitat/life cycle |
| Combined (knowledge used inside a skill) | ~15% | e.g. key that encodes a list common-name split |

Do **not** turn the bank into 135 common-name flashcards. Cap near-duplicate common-name recall (see §11).

### 2.4 Cognitive demand (author field)

Existing values: `recall` · `recognition` · `distinction` · `application` · `multi-step`.

| Demand | Target % | Count at 135 | Role |
|---|---|---|---|
| `recall` | 26% | **35** | List strings, body-plan names — not the whole bank |
| `recognition` | 22% | **30** | Specimen or described trait → listed name |
| `distinction` | 18% | **24** | Look-alikes, mixed ranks, close distractors |
| `application` | 24% | **32** | Habitat, health, metamorphosis, structure–function **when verified** |
| `multi-step` | 10% | **14** | Follow or write a key; combine supplied couplets |
| **Total** | 100% | **135** | |

Hard items should use **provided or verified** information (a key on the page, two listed names, an official common-name clue), not obscure trivia.

### 2.5 Difficulty (`1` / `2` / `3`)

Aligned with `CONTENT_SPEC.md` 40 / 40 / 20, applied to 135:

| Level | Target % | Count | Meaning in this bank |
|---|---|---|---|
| 1 | 40% | **54** | Accessible list facts, straightforward body plan, simple habitat |
| 2 | 40% | **54** | Family ID, comparison, application |
| 3 | 20% | **27** | Multi-step keys, close alternatives, mixed ranks — **not** “gotcha facts” |
| **Total** | 100% | **135** | |

Difficulty 3 ≠ obscure. Prefer: follow a two-couplet key; distinguish two listed aquatic families using a **verified** character; combine rank + common name.

Difficulty should match `cognitiveDemand` (level 3 usually `distinction` or `multi-step`, not `recall` of a rare synonym).

### 2.6 Image vs text

| Kind | Target of **source** bank | Count at 135 |
|---|---|---|
| Image-required (`imageRequired: true`) | **32–38%** | **44–51** (plan **47**) |
| Text-only | 62–68% | **88–91** (plan **88**) |

`CONTENT_SPEC.md` suggested 30–40% image specimen ID. This blueprint uses **~35% image-required** across ID **and** diagrams (cerci, swimming legs), not photos on every anatomy fact.

**Until `imageSrc` + `imageAlt` exist:** image-required items stay **out of live practice**. Do not flip `imageRequired` to false just to grow the live pool. Do not skip `verified`.

---

## 3. Area allocation (12 `topicId`s)

Current source/live counts from the curriculum audit (30 / 21) are **historical**. Entomology live practice is **36** of 60 as of the 2026-08-30 image QA (`IMAGE_QA_2027.md`).

Priority: **P0** must grow for a usable event prep bank; **P1** official **scope** but facts usually `SOURCE NEEDED`; **P2** keep light; **P3** thin evidence or **not named** in official rules (life cycles).

| Area | Target | Min | Max | Priority | Source now | Live now | Major gaps | Source requirement | Images |
|---|---|---|---|---|---|---|---|---|
| `taxonomy` | **28** | 24 | 32 | **P0** | 19 | 19 | Many taxa still lack a dedicated official-string item; some existing items still use pre-alignment wording | Official strings from `RULES_2027_OFFICIAL.md` / `TAXON_LIST_2027.md` | Useful later; **not required** for list literacy |
| `visual-id` | **24** | 18 | 30 | **P0** | 12 photographed in-bank | **12 live** (MVP) | Grow toward 24; replace q10 | Photos + provenance + diagnostics (`IMAGE_QA_2027.md`) | **Required** for specimen ID; do not flip `imageRequired` off to pad live |
| `comparison` | **12** | 8 | 16 | **P0** | 3 | 1 | Name-only pairs can use official strings; diagnostic pairs blocked | Name-only now; visual diagnostics **`SOURCE NEEDED`** | Useful for aquatic pairs; do not live-convert without assets |
| `dichotomous-keys` | **12** | 10 | 14 | **P0** | 8 | 8 | In official **scope** (`may`/`will` conflict); samples have **zero** keys | Original keys using **official** names only until splits are sourced | No |
| `external-anatomy` | **14** | 10 | 18 | **P1** | 4 | 0 verified | Tagmata / exoskeleton items exist as `needs-review` | Domain is official **scope**; every structure fact = **`FACTUAL SOURCE NEEDED`** | Diagrams useful; not a rules checklist |
| `internal-anatomy` | **4** | 2 | 6 | **P2** | 1 | 0 verified | No official organ checklist | Keep shallow; **`FACTUAL SOURCE NEEDED`** | No |
| `life-cycles` | **6** | 0 | 8 | **P3** | 2 | 0 verified | **Not named** in official rules | Product/sample only; **`FACTUAL SOURCE NEEDED`**; do not treat as official quota | No |
| `ecology-habitat` | **9** | 6 | 12 | **P1** | 2 | 0 verified | **may include** habitats; no habitat table | Habitat only when sourced | No unless a sourced habitat figure exists |
| `behavior-adaptations` | **9** | 6 | 12 | **P1** | 2 | 0 verified | **may include** behavior/adaptations | Fossorial / feeding / stridulation / natatorial = **`SOURCE NEEDED`** | Useful for leg types; hold out until assets |
| `interactions` | **5** | 2 | 8 | **P3** | 1 | 0 verified | **e.g.** relationship types, not a closed list | Extra slots **`SOURCE NEEDED`** | Optional gall image later |
| `human-impact` | **8** | 4 | 12 | **P2** | 2 | 0 verified | **such as** economic examples | medicine, chemicals, nutrients, nuisance, honey, pathogens = **`SOURCE NEEDED`** | No |
| `climate` | **4** | 3 | 6 | **P2** | 1 | 0 verified | **may include** climate-change impacts | Mechanisms **`SOURCE NEEDED`** | No |

**Intentional corrections vs scaling the 30:**

- `visual-id` stays **24** as a product target because the contest **will** show images; live coverage is zero until assets exist.
- `taxonomy` **28** because 53 official names cannot be practiced with a handful of stems — use **official** strings.
- `comparison` **12** is product coverage, not a rules quota.
- `dichotomous-keys` stays a **major** practice area (12) because keys are in official scope, **not** because 12 is required.
- `life-cycles` **6** is **not** an official-rules allocation; leave empty rather than invent metamorphosis.
- Anatomy / ecology / impact grow **only** with sourced facts — unused max is not a license to invent.
- `interactions` / extra `human-impact` **do not** grow by plausible stories.

---

## 4. Taxonomy coverage matrix (53 named taxa)

**Goal:** not one question per taxon. Every named taxon should appear in the **eventual** bank at least as:

1. **List literacy** (official common name and/or parent rank) — allowed **now** from `RULES_2027_OFFICIAL.md` / aligned `TAXON_LIST_2027.md`, or
2. A **tagged** participant in a key/comparison/correlated item that still tests a different skill.

Do **not** invent diagnostics to force image ID. If the only safe item is common-name recall, that is enough until images/sources exist.

**Coverage codes (current 60):** `none` · `mention` (distractor/explanation only) · `tagged` · `live-tagged` · `image-only-tagged`.

**Diagnostic/character source status:** `list-ok` (names/ranks only) · `sample-unverified` · `bank-draft` · `SOURCE NEEDED`.

**Target coverage** is a *plan*, not a promise of extra biology.

### 4.1 Classes, subclass, non-insect family

| Taxon | Official common name(s) | Rank | Current | Target types | Image | Diagnostic source | Notes |
|---|---|---|---|---|---|---|---|
| Entognatha | *(none at class)* | Class | tagged live (q2) | recall (class of Collembola/Diplura); distinction vs Insecta | no | `list-ok` | |
| Insecta | *(none at class)* | Class | live anatomy tags | rank distinction vs Ixodidae; anatomy host | no | `list-ok` | Not an ID-from-photo target by itself |
| Collembola | springtails, snow fleas | Subclass | live q2; image q10 | recall names; subclass vs orders; image ID later | image later | names `list-ok`; furcula `bank-draft` / **SOURCE NEEDED** | Official subclass |
| Ixodidae | hardback ticks | Family | live q3 | list grouping; mixed-rank; image ID later | image later | grouping `list-ok`; specimen **SOURCE NEEDED** | No parent class printed |

### 4.2 Orders with no families on the list

| Taxon | Official common name(s) | Rank | Current | Target types | Image | Diagnostic source | Notes |
|---|---|---|---|---|---|---|---|
| Diplura | diplurans | Order | image q17 tag | recall name; mixed-rank vs families (sample **style** only) | optional | names `list-ok`; cerci contrast `bank-draft` | |
| Zygentoma | silverfish, firebrats | Order | mention | recall names | later | `list-ok` | |
| Ephemeroptera | mayflies | Order | live ID + habitat + climate | recall; habitat **if verified**; climate **if verified** | later | names `list-ok`; habitat/climate `bank-draft` / **SOURCE NEEDED** | |
| Odonata | dragon/damselflies | Order | live metamorphosis tag | recall names; incomplete metamorphosis **if verified** | later | names `list-ok`; life cycle **SOURCE NEEDED** verify | |
| Blattodea | cockroaches/termites | Order | live q1 | recall list string (preserve slash name) | later | `list-ok` | Sample “termites” vs list wording: do not rewrite list |
| Mantodea | mantids | Order | mention | recall name; raptorial legs **SOURCE NEEDED** | later | names `list-ok` | Bank uses as distractor only |
| Plecoptera | stoneflies | Order | live climate tag | recall; climate pair **if verified** | later | names `list-ok` | |
| Thysanoptera | thrips | Order | mention | recall name | later | `list-ok` | |
| Megaloptera | dobsonflies | Order | **none** | recall name; mouthparts **SOURCE NEEDED** (sample Q2) | later | names `list-ok`; mouthparts **SOURCE NEEDED** | |
| Siphonaptera | fleas | Order | mention | recall name; public health **SOURCE NEEDED** | no | names `list-ok` | |
| Trichoptera | caddisflies | Order | live habitat | recall; habitat **if verified**; image ID later | later | names `list-ok`; habitat `bank-draft` | |

### 4.3 Orders that have families (order as taxon)

| Taxon | Official common name(s) | Rank | Current | Target types | Image | Diagnostic source | Notes |
|---|---|---|---|---|---|---|---|
| Orthoptera | grasshoppers & crickets | Order | live keys/behavior | order name + place families | later | official string | |
| Hemiptera | **true bugs** | Order | live comparison/keys | place families; aquatic true bugs | later | official string | |
| Coleoptera | **beetles** | Order | image-only tags | place families | later | official string | |
| Diptera | **true flies** | Order | live health tag | place families; vs Hymenoptera bees | later | official string | |
| Lepidoptera | **moths and butterflies** | Order | live metamorphosis tag | family ID; metamorphosis **if sourced** (not official domain) | later | official string | |
| Hymenoptera | **bees/ants/wasps.** (trailing period as printed) | Order | live q5, q27, q28 | place Apidae/Formicidae/etc. | later | official string | |

### 4.4 Families

| Taxon | Official common name(s) | Rank | Current | Target types | Image | Diagnostic source | Notes |
|---|---|---|---|---|---|---|---|
| Acrididae | short-horned grasshoppers | Family | live key | recall “short-horned”; key follow | no | `list-ok` | |
| Tettigoniidae | katydids | Family | live key | recall name; ovipositor line **SOURCE NEEDED** | no | names `list-ok` | `ento-q19` review |
| Gryllidae | crickets/tree crickets | Family | live key + stridulation | recall names; stridulation **verify** | no | names `list-ok`; behavior `bank-draft` / **SOURCE NEEDED** | |
| Reduviidae | Assassin bugs | Family | mention | recall name; feeding **SOURCE NEEDED** | later | names `list-ok` | Sample Test 1 Q22 |
| Corixidae | water boatmen | Family | live comparison | distinction vs Notonectidae **if character verified**; image later | later | names `list-ok`; orientation `bank-draft` / **SOURCE NEEDED** | |
| Notonectidae | backswimmers | Family | live comparison; image q8 | common-name clue; same pair | later | names `list-ok` | “backswimmers” is list-ok; extra morphology not |
| Scutelleridae | metallic shield bugs | Family | live q31, q46 | recall names | later | `list-ok` | No in-repo visual diagnostic |
| Pentatomidae | Stink bugs | Family | live q32 | recall exact official string (bank still says “stink bugs”) | later | official string | |
| Cicadidae | cicadas | Family | live q33, q46 | recall name; parent Hemiptera | later | `list-ok` | starred on official list; meaning undefined |
| Membracidae | treehoppers | Family | mention | recall name | later | `list-ok` | |
| Aphididae | aphids | Family | mention | recall name | later | `list-ok` | |
| Dytiscidae | predaceous diving beetles | Family | live key; image comparison/natatorial | key; distinction vs Hydrophilidae **SOURCE NEEDED** chars; natatorial **SOURCE NEEDED** | later | names `list-ok` | |
| Hydrophilidae | water scavenger | Family | live key; image q12 | same pair; bank/explanation may still say “beetles” | later | official string | |
| Scarabaeidae | dung beetles | Family | mention | recall name; nutrients **SOURCE NEEDED** | later | `list-ok` | |
| Buprestidae | metallic wood-boring/jewel beetles | Family | live q35, q50 | recall names; parent Coleoptera | later | `list-ok` | |
| Lampyridae | fireflies | Family | mention | recall name; light vs stridulation **SOURCE NEEDED** | later | `list-ok` | |
| Coccinellidae | lady-bird beetles(ladybugs) | Family | mention | recall names; image ID **SOURCE NEEDED** | later | official punctuation | Preserve official spelling |
| Tenebrionidae | darkling beetles | Family | mention | recall name | later | `list-ok` | |
| Curculionidae | weevils | Family | image-only | recall name; snout ID **bank-draft** / **SOURCE NEEDED** | required for visual | names `list-ok` | |
| Zopheridae | diabolical ironclad Beetles | Family | live q36, q50 | recall exact official string (bank still uses lowercase b) | later | official string | |
| Tipulidae | crane flies | Family | image-only | recall name; vs Culicidae **SOURCE NEEDED** chars | later | `list-ok` | |
| Culicidae | mosquitoes | Family | live health; image q13 | recall name; public health **verify wording**; vs Tipulidae **SOURCE NEEDED** | later | names `list-ok` | No named disease unless sourced |
| Bombyliidae | bee flies | Family | mention | recall name; vs Apidae names only (do not invent look-alike chars) | later | `list-ok` | |
| Tephritidae | fruit flies, husk fly | Family | **none** | recall names (preserve comma string) | later | `list-ok` | |
| Calliphoridae | blow flies | Family | mention | recall name | later | `list-ok` | |
| Papilionidae | swallowtails | Family | image q7; live metamorphosis tag | recall name; image tails **bank-draft** / **SOURCE NEEDED** | required for visual | names `list-ok` | |
| Nymphalidae | brush-footed butterflies | Family | mention | recall name | later | `list-ok` | |
| Saturniidae | Giant Silkworm moths | Family | mention | recall name (preserve capitals); silk **SOURCE NEEDED** | later | `list-ok` | |
| Formicidae | ants | Family | image-only | recall name; image **SOURCE NEEDED** | required for visual | `list-ok` names | |
| Cynipidae | gall wasps | Family | live galls | recall name; plant galls **verify**; image later | later | names `list-ok`; galls `bank-draft` | |
| Vespidae | paper wasps, hornets, yellowjackets | Family | mention | recall names | later | `list-ok` | |
| Apidae | bees | Family | live q5, q27 | family→order; food/pollination **verify contest wording** | later | names `list-ok`; economic `bank-draft` | |

**Insufficient to safely construct beyond list literacy (flag):** any taxon whose only extra content would be an invented visual diagnostic, habitat, feeding mode, or economic role. That is most of the seven never-mentioned taxa plus Mantodea raptorial, Reduviidae feeding, Megaloptera mouthparts, Scarabaeidae nutrients, Saturniidae silk, Siphonaptera disease, etc.

**High-frequency ID (text + image when assets exist):** Collembola, Ixodidae, Ephemeroptera, Blattodea, Corixidae, Notonectidae, Dytiscidae, Hydrophilidae, Curculionidae, Culicidae, Tipulidae, Trichoptera, Papilionidae, Formicidae, Cynipidae, Apidae, Coccinellidae (sample ID). Still no invented characters — image slots wait on assets.

---

## 5. Knowledge vs skills (how items should be written)

| Knowledge (do not explode into 53 skills) | Skills (what the stem asks the student to **do**) |
|---|---|
| Official common name | Identify a taxon from a description |
| Taxonomic rank / parent order | Follow a dichotomous key |
| List membership (on-list vs off-list distractor — off-list distractors must still be **listed** names) | Distinguish two similar listed taxa |
| Three insect tagmata (if kept after verification) | Interpret an anatomical location **when sourced** |
| | Connect an organism to habitat or life cycle **when sourced** |
| | Reason from a **supplied** trait to a listed name or function |

Healthy mix: see §2.3. Repeated common-name recall is knowledge; a key that uses those names is a skill.

---

## 6. Cognitive-demand and difficulty (detail)

Already specified in §2.4–2.5.

**Primary `skillId` planning mix** (one primary skill per item; sums to 135). Expand `interactions-named-official-modes` and extra economic skills **only** with sources (counts move from the empty slots, not from invented items).

| Skill ID | Primary count | Notes |
|---|---|---|
| `taxonomy-match-common-name` | 8 | Cap duplicates (§10) |
| `taxonomy-identify-order` | 5 | |
| `taxonomy-identify-subclass` | 2 | |
| `taxonomy-identify-family` | 7 | |
| `taxonomy-place-family-in-order` | 4 | |
| `taxonomy-distinguish-ranks` | 2 | Taxonomy skills **28** = area target |
| `visual-id-listed-taxon` | 18 | Held out until images |
| `visual-id-from-text-description` | 6 | Live without photos; visual-id **24** |
| `comparison-listed-lookalikes` | 10 | |
| `comparison-insect-vs-noninsect` | 2 | Comparison **12** |
| `dichotomous-keys-follow` | 8 | |
| `dichotomous-keys-write` | 4 | Keys **12** |
| `external-anatomy-name-tagmata` | 3 | |
| `external-anatomy-exoskeleton-function` | 3 | |
| `external-anatomy-locate-structure` | 8 | Mouthparts/tarsi only if sourced |
| `internal-anatomy-gas-exchange` | 2 | Area target 4; **2 slots SOURCE NEEDED** |
| `life-cycles-classify-metamorphosis` | 6 | **Not an official-rules domain.** Fill only with a factual source; otherwise leave empty |
| `ecology-habitat-assign-taxon` | 9 | Only with sourced habitats |
| `adaptations-recognize-leg-type` | 4 | Fossorial **SOURCE NEEDED** |
| `behavior-explain-listed-taxon` | 5 | Behavior-adaptations **9** |
| `interactions-plant-relationships` | 2 | |
| `interactions-named-official-modes` | **0** | Up to **3** when sourced (area target 5) |
| `human-impact-public-health` | 3 | |
| `human-impact-economic-role` | 3 | Area target 8; **2 slots SOURCE NEEDED** |
| `climate-reason-from-habitat` | 4 | |
| **Filled without invented biology** | **128** | |
| **SOURCE NEEDED empty slots** | **7** | 2 internal + 3 interactions + 2 human-impact |
| **Planning total** | **135** | Fill empty slots only with sources |

If locate-structure or adaptations cannot be verified, do not invent; shift leftover count into `taxonomy` or `dichotomous-keys` still inside those areas’ max.

---

## 7. Image strategy

**Today:** 60 source, 36 `verified` (19 text + 17 image-required), **12** live `visual-id`.

### 7.1 Targets

- **~47** image-required items in a 135 source bank (~35%).
- Of those, **~18–24** are `topicId: visual-id` specimen ID; the rest are comparison photos, anatomy diagrams, adaptation close-ups.
- **Text-description ID** (6): `topicId: visual-id`, `imageRequired: false`, `skillId: visual-id-from-text-description`. Product workaround so adaptive practice can score `visual-id` **without** claiming the tournament is text-based.

### 7.2 Where images belong

| Area | Images |
|---|---|
| `visual-id` | Specimen photos — **required** for `visual-id-listed-taxon` |
| `comparison` | Side-by-side listed look-alikes when diagnostics are visual |
| `external-anatomy` | Simple diagrams (cerci, body regions) if sourced |
| `behavior-adaptations` | Leg-type close-ups if sourced |
| `taxonomy`, keys, most correlated | Text first |

### 7.3 Asset types (when they exist)

- Dorsal / lateral / ventral specimen photos of **listed** taxa
- Aquatic orientation photos **only** if the diagnostic is verified
- Labeled diagrams (not decorative)
- No AI-invented specimens presented as real

### 7.4 Metadata (author-only; future schema)

`imageRequired`, `imageBrief` (already on Entomology drafts), plus later: `imageAssetId`, provenance, license, photographer/source, diagnostic features visible, confusable listed taxa, review status.

### 7.5 Contest-useful image items

- The photo **shows** the trait the explanation names
- Distractors are **listed** look-alikes, not off-list animals
- Stem does not give away the name that the image is supposed to test
- One defensible ID given the image + list

### 7.6 Live holdout

`isLivePracticeQuestion` requires `verified` (omitted counts as verified). Image-required items additionally need non-empty `imageSrc` and `imageAlt`. **Keep that gate.** Do not mark image items live with empty assets. Do not invent URLs. Do not drop `verified` to grow the pool.

---

## 8. Source and verification policy

### 8.1 Allowed `sourceType` (existing)

| Value | Meaning | Verified? |
|---|---|---|
| `rules-derived` | Stem built from restated rules or **official list strings** | Names/ranks yes; extra biology in the explanation still needs review |
| `sample-derived` | Inspired by sample **structure** (pair, rank mix, image-ID style). **Never copy wording, choices, or keys.** | **No** — sample keys are unverified biology |
| `generated` | New stem from curriculum facts | **No** until verification traces to list/rules or an approved reference |

`generated` ≠ production-ready.

### 8.2 Workflow

```text
source evidence → draft → review → verified → live
```

| Stage | Meaning |
|---|---|
| source | `sourceNote` points at list section, rules domain, or “inspired by sample Qn, new stem” |
| draft | In the bank file or authoring sheet; `verificationStatus: draft` |
| review | Human checks facts, ambiguity, duplicates, metadata, images |
| verified | `verificationStatus` promoted (today only `draft` \| `needs-review` exist — **future schema**) |
| live | `verified`, and if `imageRequired` then `imageSrc` + `imageAlt`; included in `getQuestionsForEvent` |

Remaining `needs-review` items stay out of live practice. Current IDs are in `QUESTION_BANK_QA_2027.md` (24 text items). Photographed items that were promoted to `verified` (including former examples **ento-q8, q12, q13**) are live.

Historical planning note: an earlier draft of this section listed `ento-q8, q11, q12, q13, q18, q19, q26, q30` as still `needs-review`. That list is **obsolete** as a current-state claim (`q8`, `q12`, `q13`, and `q19` are verified in the bank).

### 8.3 Traceability

Every generated item must cite a **verifiable** fact: an official common-name string, a list parent, or a reviewed scientific statement. If the citation would be “everyone knows,” it is **`SOURCE NEEDED`**.

---

## 9. Question-quality requirements

Every future item:

- Exactly one defensible correct answer
- Four choices `a`–`d` (no “all of the above” / “none of the above”)
- Plausible **listed** distractors
- No accidental giveaways in stem wording
- Explanation teaches (not “because B is right”)
- Hint points without naming the answer
- `difficulty` matches `cognitiveDemand`
- `topicId` is the real primary area
- `taxonomyTags` are accurate list names
- `sourceNote` is auditable
- No unsupported biology
- Official list wording preserved (`hardback ticks`, `Giant Silkworm moths`, `cockroaches/termites`, …)
- Identification stems include **enough** diagnostic information (text or image) to choose among the four
- No unnecessary trivia (genus/species, unlisted measurements)

---

## 10. Anti-duplication rules

| Rule | Example |
|---|---|
| Same fact + same cognitive operation = duplicate | Two stems both “Blattodea common names are cockroaches/termites” recall |
| Same taxon, different skill = allowed | Apidae family→order **and** Apidae food role |
| Cap common-name recall | Roughly **one** dedicated recall item per taxon; extra appearances via keys/comparisons |
| Look-alike pairs | Same pair allowed again only if the **decision** differs (orientation vs habitat vs key couplet) |
| Keys | Vary couplet path, taxa set, or use vs formulate — not the same 1a/2a twice |

**Future near-duplicate audit (manual + light automation):**

1. Group by `taxonomyTags` + `skillId` + `cognitiveDemand`
2. Normalize stems (lowercase, strip punctuation) and flag high token overlap
3. Flag identical `correctChoiceId` text across items
4. Human review of each flagged group before release

---

## 11. Adaptive-practice coverage

The app selects by **`topicId` only** (`lib/learning/adaptive.ts`). Session size **10**. Recently asked IDs are avoided when another unused item exists. Weak mode prefers topics that are still weak (unrecovered miss; three later corrects on that topic clear it).

**Do not change the algorithm in this pass.**

| Need | Implication |
|---|---|
| Normal rotation | Each `topicId` needs unused items after a 10-question set |
| Weak-topic session | Ideally **≥ 10 live** items in that topic so `mode=weak` can fill without falling back to the whole bank |
| Spaced revisits | Extra items so the same `questionId` is not immediately recycled |
| Repeated sessions | Large pools for P0 topics |

| `topicId` | Target source | Especially large pool? | Weak-mode note |
|---|---|---|---|
| taxonomy | 28 | **Yes** | Can support weak sets |
| visual-id | 24 | **Yes**, but live = 0 until images or text-description items | Add 6 live text-description items before claiming weak visual-id |
| comparison | 12 | Yes | Borderline for a full weak set |
| dichotomous-keys | 12 | Yes | Same |
| external-anatomy | 14 | Yes | |
| ecology-habitat | 9 | Medium | Weak set will mix fallback sooner |
| behavior-adaptations | 9 | Medium | |
| human-impact | 8 | Medium | |
| life-cycles | 6 | Small | Undersized for a pure 10-item weak set |
| interactions | 5 | Small | Do not invent to fatten the pool |
| climate | 4 | Small | Same |
| internal-anatomy | 4 | Small | Same |

Topics below 10 live will **work** (selector falls back) but will recycle faster. Prefer growing P0 pools first. Do **not** pad climate/interactions with unsourced items to hit 10.

---

## 12. Future authoring metadata

**Do not modify `lib/types.ts` in this pass.** Live practice still uses `Question`. Entomology drafts already extra fields on `EntomologyQuestion`.

### 12.1 Keep (already used or on `Question`)

```text
id
eventId
topicId
prompt
choices
correctChoiceId
explanation
hint
difficulty
imageRequired
taxonomyTags
cognitiveDemand
sourceType
sourceNote
verificationStatus
imageBrief
```

### 12.2 Proposed author-only fields (**future schema work**)

| Field | Purpose |
|---|---|
| `skillId` | Primary skill from `CURRICULUM_2027.md` |
| `subtopicId` / `curriculumAreaId` | Nested area (`taxonomy-common-names`, `public-health`, …) |
| `sourceReference` | File + heading (e.g. `TAXON_LIST_2027.md` Blattodea) |
| `reviewedBy` | Human reviewer |
| `reviewNote` | Why `needs-review` or verified |
| `confusableTaxa` | Listed look-alikes |
| `imageProvenance` | Asset source, license, date |
| `duplicateGroupId` | Cluster for anti-duplication audit |
| `blueprintSlotId` | Maps to a row in this document’s checklist |

Students never see author-only fields (same as today’s `verificationStatus`).

---

## 13. Question-generation pipeline (60 → planning ceiling ~135)

| Stage | Who | Automate? |
|---|---|---|
| 1. Curriculum requirement | Author | Partial (checklist) |
| 2. Source evidence | Author | No — must cite list/rules/sample/review |
| 3. Blueprint slot | Author | Checklist IDs |
| 4. Draft question | Author | No |
| 5. Factual verification | Human / content review | **No** for biology; yes for “tag ∈ list” |
| 6. Ambiguity review | Human | No |
| 7. Duplicate review | Human + script | **Partial** (overlap flags) |
| 8. Metadata review | Human + checks | **Partial** (`entomology-questions.check.ts` style) |
| 9. Image review | Human | No (diagnostics, provenance) |
| 10. Final verification | Human | No |
| 11. Add to bank | Author | — |
| 12. Automated checks | CI / `npx tsx lib/mock/entomology-questions.check.ts` | **Yes** — counts, unique IDs, 4 choices, tags on list, topic IDs |
| 13. Release to live | Policy | Live = `verified` (omitted counts as verified); if `imageRequired`, also `imageSrc` + `imageAlt` |

Do not skip 5–7 for `generated` items. Do not copy sample wording at stage 4.

**Reuse of the current 60:** run stages 5–10 on each draft against `RULES_2027_OFFICIAL.md`; retire or rewrite fails; the **17** photographed items are live (do not treat “image nine stay held out” as current). Remaining `needs-review` text items stay held out. Do not add q61+ until q1–q60 string re-QA.

---

## 14. Coverage checklist (use while building)

Copy and tick. Planning target 135 / range 120–150.

### 14.1 Twelve areas

- [ ] taxonomy (target 28, min 24)
- [ ] visual-id (target 24; live specimen ID only with assets)
- [ ] comparison (target 12)
- [ ] dichotomous-keys (target 12)
- [ ] external-anatomy (target 14)
- [ ] internal-anatomy (target 4)
- [ ] life-cycles (target 6)
- [ ] ecology-habitat (target 9)
- [ ] behavior-adaptations (target 9)
- [ ] interactions (target 5; extra only if sourced)
- [ ] human-impact (target 8; extra economic only if sourced)
- [ ] climate (target 4)

### 14.2 53 taxa — list literacy at least once

Tick when the taxon is a **correct-answer target** or **primary tag** on a verified/draft-accepted item (not merely a distractor).

**Classes / subclass / non-insect:** Entognatha · Insecta · Collembola · Ixodidae

**Orders (no families):** Diplura · Zygentoma · Ephemeroptera · Odonata · Blattodea · Mantodea · Plecoptera · Thysanoptera · Megaloptera · Siphonaptera · Trichoptera

**Orders with families:** Orthoptera · Hemiptera · Coleoptera · Diptera · Lepidoptera · Hymenoptera

**Families:** Acrididae · Tettigoniidae · Gryllidae · Reduviidae · Corixidae · Notonectidae · Scutelleridae · Pentatomidae · Cicadidae · Membracidae · Aphididae · Dytiscidae · Hydrophilidae · Scarabaeidae · Buprestidae · Lampyridae · Coccinellidae · Tenebrionidae · Curculionidae · Zopheridae · Tipulidae · Culicidae · Bombyliidae · Tephritidae · Calliphoridae · Papilionidae · Nymphalidae · Saturniidae · Formicidae · Cynipidae · Vespidae · Apidae

### 14.3 25 skills

Tick primary-skill counts against §6 table. Especially:

- [ ] `visual-id-listed-taxon` (planning target for the 135-item bank; **17** live Commons photos already exist — see `IMAGE_QA_2027.md`)
- [ ] `visual-id-from-text-description` (live without photos)
- [ ] `interactions-named-official-modes` remains **0** until `SOURCE NEEDED` cleared

### 14.4 Balance and process

- [ ] Cognitive demand ≈ 35 / 30 / 24 / 32 / 14
- [ ] Difficulty ≈ 54 / 54 / 27
- [ ] Image-required ≈ 47 and **none live without assets**
- [ ] `sourceType` mix documented; `generated` not auto-live
- [ ] `verificationStatus` reviewed (`needs-review` cleared or justified)
- [ ] Duplicate audit run
- [ ] Weak-topic pools: P0 topics ≥ 10 live when possible; do not invent to pad P3

---

## SOURCE NEEDED BEFORE PRODUCTION

Do not silently fill from general knowledge.

**In hand:** `RULES_2027_OFFICIAL.md` (scope + 53-taxon list). Cheat-sheet **size** and **point values** are still unstated. Asterisk **meaning** is undefined.

| Blocker | Blocks |
|---|---|
| q1–q60 exact-string re-QA | Bank items that still quote pre-alignment Hydrophilidae / Pentatomidae / Zopheridae wording |
| Specimen images + provenance | All `visual-id-listed-taxon` live items; many comparisons |
| Visual diagnostic confirmation | Snout, furcula, tails, swimming orientation, beetle antennae, etc. |
| Anatomy facts (tagmata, exoskeleton, spiracles, cerci, mouthparts) | External/internal anatomy items |
| Life-cycle / metamorphosis facts | `life-cycles` area (not named in official rules) |
| Per-taxon habitats | `ecology-habitat` |
| Fossorial / natatorial / stridulation / feeding | Adaptation/behavior items |
| Relationship examples: symbiosis, competition, gall biology | `interactions` growth |
| Economic/health examples: honey, pathogens, medicine, chemicals, nutrients, nuisance | `human-impact` growth |
| Climate mechanisms (oxygen, temperature) | Promoting `ento-q30` to verified |
| Official sample-test PDFs | Sample-derived wording only — **not** a substitute for rules |

**Allowed from official rules/list now:** questions whose entire payload is official common names, ranks, and parent groupings as printed in `RULES_2027_OFFICIAL.md`, plus original keys that only use those names.

---

## Related files

- `RULES_2027_OFFICIAL.md` (authoritative)
- `EVIDENCE_MATRIX_2027.md`
- `CURRICULUM_2027.md`
- `CONTENT_SPEC.md`
- `RULES_2027.md`
- `TAXON_LIST_2027.md`
- `SAMPLE_ANALYSIS_2027.md`
- `lib/mock/entomology-questions.ts`
