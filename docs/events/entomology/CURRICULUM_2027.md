# Entomology 2027 — Curriculum and Skill Map

**This document is Jr. Explorer curriculum design. It is not official Science Olympiad rules, not a question bank, and not a claim that official PDFs were verified in this repository.**

| File | Role |
|---|---|
| `RULES_2027_OFFICIAL.md` | **Authoritative** 2027 rules + ESO list |
| `RULES_2027.md` | Structured restatement of that official text |
| `TAXON_LIST_2027.md` | Aligned copy of the official list (53 taxa, official strings, 14 undefined stars) |
| `SAMPLE_ANALYSIS_2027.md` | Style, topic mix, and sample keys only — **not** automatic biology |
| `CONTENT_SPEC.md` | Product practice areas (`topicId`s) — not official ranks |
| `lib/mock/entomology-questions.ts` | Existing 60-item registered bank — **not** equivalent to a rule |
| `lib/mock/entomology.ts` | Event-page topic labels aligned to those `topicId`s |

The authoritative rules/list are in `RULES_2027_OFFICIAL.md`. `TAXON_LIST_2027.md` is aligned to that list. Official sample-test PDFs are still not in the repo. Licensed Commons practice JPEGs for **17** live items are in `public/entomology/` (`IMAGE_QA_2027.md`). Anything that would require the missing official sample originals is marked `needs-official-verification`.

Do not generate questions from this file until a later bank-authoring pass.

---

## 0. How to read this document

### Authority order

1. Official rules/list in `RULES_2027_OFFICIAL.md` (`direct-rules`, `direct-taxonomy-list`)
2. Aligned list copy `TAXON_LIST_2027.md`
3. Sample-test evidence in `SAMPLE_ANALYSIS_2027.md` (`sample-analysis`)
4. Existing generated / rules-derived items in the 30-question bank (`existing-bank`)
5. Reasonable educational inference that does not add official requirements (`inferred`)

If a statement cannot be established from those sources, it is `needs-official-verification`.

### Source-strength labels

| Label | Meaning |
|---|---|
| `direct-rules` | Stated in `RULES_2027_OFFICIAL.md` (as organized in `RULES_2027.md`) |
| `direct-taxonomy-list` | Scientific name, rank, parent grouping, official common name, or `*` marking in `TAXON_LIST_2027.md` (aligned to the official list) |
| `sample-analysis` | Present in the restated sample tables; biology and missing images still unverified |
| `existing-bank` | Appears in the current 30 items; does **not** make the fact official |
| `inferred` | Product/educational inference consistent with sources, not an added rule |
| `needs-official-verification` | Cannot be finalized from in-repo restatements / missing PDFs or images |

An existing bank item may carry **more than one** label (for example: list names are `direct-taxonomy-list`, while a swimming-orientation diagnostic is `existing-bank` + `needs-official-verification`).

### Knowledge vs skill

- **Knowledge:** a fact the student should know (list common name, three insect body regions).
- **Skill:** what the student **does** with facts (match a common-name clue to an order; follow a key; distinguish two listed families).
- **Higher-level skill:** combining several clues or steps (key use, look-alike comparison, mixed ranks).

Individual taxon facts are **not** separate skills. They live in the taxonomy inventory. The skill is identification / placement / comparison using the list.

### ID stability

- **Major practice areas** reuse the twelve existing `topicId`s so the current bank and adaptive selector stay mappable.
- Nested IDs add precision (`taxonomy-common-names`, `taxonomy-order-identification`) without replacing those `topicId`s.
- Future questions should keep `topicId` as one of the twelve majors and add `skillId` / `subtopicId` when the content model is extended.

---

## 1. Event constraints that bound the curriculum

From `RULES_2027_OFFICIAL.md` unless noted.

| Constraint | In-repo statement | Source strength |
|---|---|---|
| Taxa | Limited to the 2027 ESO Entomology List (**53** named taxa) | `direct-rules` |
| Geography | Insects found in the Contiguous United States | `direct-rules` |
| Identification ranks | Order, subclass, family, **or** common name | `direct-rules` |
| Subclass named on the list | Collembola | `direct-rules`, `direct-taxonomy-list` |
| Specimens | Insect images **will** be exhibited (pertinent features) | `direct-rules` |
| Keys | In scope. Description: **will** use or construct. Competition: **may** use or formulate a **simple** key | `direct-rules` |
| Correlated questions | Internal and external anatomy, ecology, economic characteristics, **or** systematics. Ecology **may include** habitats, adaptations, behavior, relationships (**e.g.** …), public health, climate-change impacts. Economic **may include** … **such as** … | `direct-rules` |
| Format | Online multiple-choice | `direct-rules` |
| Genus / species ID | **Not** stated as a 2027 requirement | do not add |
| Cheat sheet | One sheet, any form/source; lamination/tabs/labels allowed; **size not stated** | `direct-rules` |
| Scoring | High score wins; preselected tiebreakers; **point values not stated** | `direct-rules` / remaining gap |
| Division A/B/C | Not named | do not assume |
| Asterisks on the list | **14** starred entries; **meaning undefined** | `direct-taxonomy-list`; do not invent meaning |
| Life cycles | **Not named** in the official rules body | do not treat as official domain |

Jr. Explorer practice is four-choice (`a`–`d`). Sample Test 1 includes five-option (A–E) keys. That is tournament style, not a product type change in this pass.

---

## 2. Curriculum areas

**Counts in this spec:** 5 grouping parents + 12 major practice areas + 7 nested areas = **24 curriculum areas**.

Grouping parents are organizational (they match official domain clusters). They are not extra official events. Major areas are the practice `topicId`s already used in `lib/mock/entomology.ts` and the 30-item bank.

### 2.1 Grouping parents

#### `identification`

| Field | Content |
|---|---|
| Name | Identification |
| Parent | — |
| Description | Identify listed taxa by order, subclass where applicable, family, and official common name, including from images. |
| Expected knowledge | The ESO list hierarchy and printed common names; which ranks exist on this list. |
| Expected skill | Match a specimen or clue to a listed rank and name; do not invent off-list taxa. |
| Relevant taxa | All 53 named taxa |
| Source evidence | `RULES_2027.md` Identification / Competition Scope |
| Source strength | `direct-rules` |
| Verification status | Scope verified in-repo; image diagnostics not verified (no photos) |

Children: `taxonomy`, `visual-id`, `comparison`. Cross-cutting nested area: `image-specimens`.

#### `anatomy`

| Field | Content |
|---|---|
| Name | Anatomy |
| Parent | — |
| Description | Correlated questions on external and internal anatomy of listed organisms. |
| Expected knowledge | External anatomy is in official scope. Internal anatomy is in official scope. **No official organ-by-organ checklist** is restated. |
| Expected skill | Apply body-plan facts to insects vs listed non-insects; keep internal anatomy shallow until an official checklist exists. |
| Relevant taxa | Primarily Class Insecta; Ixodidae as contrast where the list grouping matters |
| Source evidence | `RULES_2027.md` External Anatomy, Internal Anatomy |
| Source strength | `direct-rules` |
| Verification status | Domain in scope; sample structure lists (mouthparts, tarsi, chitin wording) are **not** an official checklist |

Children: `external-anatomy`, `internal-anatomy`.

#### `ecology-and-life`

| Field | Content |
|---|---|
| Name | Ecology and life |
| Parent | — |
| Description | Habitat/ecology and climate-change impacts as correlated knowledge. Life cycles are a **product/sample** nested area; they are **not named** in the official rules. |
| Expected knowledge | Ecology including habitat is in scope (**may include**). Climate-change impacts **may include**. Life-cycle detail is **not** an official named domain (samples include complete metamorphosis). |
| Expected skill | Connect a listed taxon to habitat or development type without inventing unlisted taxa. |
| Relevant taxa | Especially aquatic orders/families on the list; holometabolous vs hemimetabolous groups when verified |
| Source evidence | `RULES_2027.md` Ecology, Climate change; sample Test 1 Q10, Q21 |
| Source strength | `direct-rules`; life-cycle grain is `sample-analysis` + `inferred` |
| Verification status | Habitat and climate domains official; specific naiad oxygen/temperature mechanisms need verification |

Children: `ecology-habitat`, `life-cycles`, `climate`.

#### `behavior-and-adaptations`

| Field | Content |
|---|---|
| Name | Behavior and adaptations |
| Parent | — |
| Description | Official rules nest **behavior** and **adaptations** under ecological characteristics (**may include**). The current practice `topicId` folds them into `behavior-adaptations`. |
| Expected knowledge | Structure–function (adaptations) and behavior are in scope. The rules restatement does not list required behaviors. |
| Expected skill | Explain a listed behavior or adaptation using listed taxa only. |
| Relevant taxa | Listed Orthoptera, aquatic Coleoptera/Hemiptera, Mantodea, Reduviidae, and others as verified |
| Source evidence | `RULES_2027.md` Adaptations, Behavior |
| Source strength | `direct-rules` |
| Verification status | Domain official; fossorial/natatorial/stridulation/feeding specifics are sample or bank, not a rules checklist |

Child major area: `behavior-adaptations`. Nested: `adaptations`, `behavior`.

#### `relationships-and-impact`

| Field | Content |
|---|---|
| Name | Relationships and human impact |
| Parent | — |
| Description | Species relationships plus public health and economic characteristics. |
| Expected knowledge | Relationships (**e.g.** symbiosis and competition) with animals, plants, and public health **may include**. Economic **may include** beneficial/detrimental aspects **such as** food, medicine, disease, chemicals, nutrients, nuisance species. These are examples, not closed catalogs. |
| Expected skill | Attach a listed economic/health/relationship idea to a listed taxon **only when the fact is verified**. |
| Relevant taxa | Culicidae, Ixodidae, Siphonaptera, Apidae, Scarabaeidae, Cynipidae, and others as verified |
| Source evidence | `RULES_2027.md` Species relationships, Public health, Economic characteristics |
| Source strength | `direct-rules` |
| Verification status | Domain names official; **which facts** students must know for medicine/chemicals/nutrients/etc. are not itemized |

Children: `interactions`, `human-impact`. Nested: `public-health`, `economic-characteristics`.

---

### 2.2 Major practice areas (existing `topicId`s)

These twelve IDs are the product curriculum spine. Adaptive practice currently scores **these strings**, not nested skill IDs.

#### `taxonomy`

| Field | Content |
|---|---|
| Name | Taxonomy |
| Parent | `identification` |
| Description | Match orders, subclass (Collembola), families, and **official** common names on the 2027 list, including list placement (e.g. Ixodidae as non-insect). |
| Expected knowledge | Printed common names; class/subclass/order/family as on the list; Ixodidae is under Non-Insect Arthropods, not Insecta. |
| Expected skill | Identify by name/rank from text clues; place a family under its listed order; distinguish ranks. |
| Relevant taxa | All 53 |
| Source evidence | `RULES_2027.md` ID + Taxonomy/Systematics; `TAXON_LIST_2027.md`; bank `ento-q1`–`q5` |
| Source strength | `direct-rules`, `direct-taxonomy-list`; bank items are `existing-bank` |
| Verification status | List facts are in-repo; do not treat generated explanations as extra official characters |

Nested: `taxonomy-list-hierarchy`, `taxonomy-common-names`.

#### `visual-id`

| Field | Content |
|---|---|
| Name | Visual identification |
| Parent | `identification` |
| Description | Identify listed taxa from specimen images (official scope). Jr. Explorer currently has **17** live Commons practice JPEGs (`IMAGE_QA_2027.md`). |
| Expected knowledge | Diagnostic traits used in a **specific** photo must be true of that specimen; do not guess missing sample photos. |
| Expected skill | Use visible traits to choose a listed family/order/subclass. |
| Relevant taxa | Any listed ID target; current bank: Formicidae, Papilionidae, Notonectidae, Curculionidae, Collembola |
| Source evidence | `RULES_2027.md` image-based specimens; Sample Test 1 majority ID; bank `ento-q6`–`q10` |
| Source strength | `direct-rules` (images in scope); `sample-analysis` (heavy image ID); `existing-bank` (five generated items) |
| Verification status | Photographed visual-id items in the current bank are **live** when `verified` with `imageSrc` + `imageAlt`. Extra morphology in `imageBrief` is still not an official-list fact. |

#### `comparison`

| Field | Content |
|---|---|
| Name | Comparisons |
| Parent | `identification` |
| Description | Tell listed look-alikes apart (same or nearby ranks). |
| Expected knowledge | Only listed pairs/groups; no off-list confusable taxa as ID targets. |
| Expected skill | Choose the diagnostic that separates two listed names. |
| Relevant taxa | Sample-evidenced pairs: Corixidae/Notonectidae; Dytiscidae/Hydrophilidae. Bank also: Tipulidae/Culicidae. Insecta vs Ixodidae is mixed-rank comparison. |
| Source evidence | Sample Test 1 Q14, Q19, Q20; bank `ento-q11`–`q13` |
| Source strength | Pair **existence** is `sample-analysis`; characters are `needs-official-verification` unless taken only from official common names (e.g. “backswimmers”) |
| Verification status | Orientation/antenna diagnostics flagged in the bank as `needs-review` |

#### `dichotomous-keys`

| Field | Content |
|---|---|
| Name | Dichotomous keys |
| Parent | — (official **scope**; competition **may**, description **will**) |
| Description | Students may be asked to use or formulate a **simple** dichotomous key (competition). Description also says they will be asked to use or construct a key. |
| Expected knowledge | Either/or couplets; listed taxa only in the key. |
| Expected skill | Follow couplets to a listed identification; choose a useful first split when writing a key. |
| Relevant taxa | Whatever listed taxa appear in the key (current bank: Notonectidae/Corixidae; Orthoptera families; aquatic beetles vs land Orthoptera) |
| Source evidence | `RULES_2027_OFFICIAL.md` description + competition §2; **absent from samples**; bank `ento-q18`–`q20` |
| Source strength | **Scope** is `direct-rules`; whether keys appear on every test is `AMBIGUOUS` (**may** vs **will**); key text is `existing-bank` |
| Verification status | Keys are in official scope. Sample tests do not show official key style. `ento-q18`/`q19` are `needs-review`. |

#### `external-anatomy`

| Field | Content |
|---|---|
| Name | External anatomy |
| Parent | `anatomy` |
| Description | Outside structures. Official domain is unnamed beyond “external anatomy.” |
| Expected knowledge | **In-repo official:** domain exists. **Sample (not a checklist):** body regions, exoskeleton/chitin, mouthparts, legs (fossorial/natatorial), tarsi, cerci. |
| Expected skill | Name or locate a body-plan feature; contrast insects with Ixodidae where relevant. |
| Relevant taxa | Insecta generally; Diplura as list contrast for cerci/tails in bank notes |
| Source evidence | `RULES_2027.md`; samples Q3–Q5, Test 1 Q4–Q5, Q8, Q23–Q25; bank `ento-q14`–`q17` |
| Source strength | Domain `direct-rules`; structure list `sample-analysis`; current items `existing-bank` / some `inferred` (standard tagmata) |
| Verification status | Do not treat sample chitin/tarsi/mouthpart keys as official required facts. Cerci item is image-required. |

#### `internal-anatomy`

| Field | Content |
|---|---|
| Name | Internal anatomy |
| Parent | `anatomy` |
| Description | Internal anatomy is in official scope. No organ checklist is restated. Keep shallow. |
| Expected knowledge | Unspecified by official restatement. Current bank teaches spiracles/tracheae (`ento-q29`). |
| Expected skill | Answer a shallow internal-anatomy item without an invented organ catalog. |
| Relevant taxa | Insecta |
| Source evidence | `RULES_2027.md` Internal Anatomy; **missing from samples**; `ento-q29` |
| Source strength | Domain `direct-rules`; tracheal item `existing-bank` + `inferred` + `needs-official-verification` (whether this is the expected grain) |
| Verification status | Do not expand organ lists. `ento-q29` is `draft`, not contest-final. |

#### `life-cycles`

| Field | Content |
|---|---|
| Name | Life cycles |
| Parent | `ecology-and-life` |
| Description | Development / metamorphosis as correlated knowledge. Not itemized in the rules restatement. |
| Expected knowledge | Sample Test 1 Q10 is complete metamorphosis (key C; wording unverified). Bank: holometabolous Lepidoptera vs incomplete Hemiptera/Orthoptera/Odonata. |
| Expected skill | Classify listed groups as complete vs incomplete when the biology is verified. |
| Relevant taxa | Bank tags: Lepidoptera, Papilionidae, Hemiptera, Orthoptera, Odonata |
| Source evidence | Sample Test 1 Q10; `ento-q23`; ecology/life inferred from correlated-question list |
| Source strength | `sample-analysis`; `existing-bank`; domain adjacency `inferred` |
| Verification status | Confirm complete-metamorphosis wording against a reference before treating as contest-final. |

#### `ecology-habitat`

| Field | Content |
|---|---|
| Name | Ecology and habitat |
| Parent | `ecology-and-life` |
| Description | Where listed taxa live and how they use habitat. Habitat is named in official ecology. |
| Expected knowledge | Official: habitat is in scope. Bank: Trichoptera larvae freshwater; Ephemeroptera naiads freshwater. Sample Test 1 Q21 mayfly habitat (key B, unverified wording). |
| Expected skill | Assign a listed taxon to a listed-plausible habitat without inventing biomes. |
| Relevant taxa | Trichoptera, Ephemeroptera; other aquatic listed groups as verified |
| Source evidence | `RULES_2027.md` Ecology; Sample Test 1 Q21; `ento-q21`, `ento-q22` |
| Source strength | Domain `direct-rules`; specific habitats `existing-bank` / `sample-analysis` + `needs-official-verification` for sample key wording |
| Verification status | Freshwater caddisfly/mayfly immatures are widely taught; still verify before contest-final. |

#### `behavior-adaptations`

| Field | Content |
|---|---|
| Name | Behavior and adaptations |
| Parent | `behavior-and-adaptations` |
| Description | Current `topicId` combining two official domains. |
| Expected knowledge | See nested `adaptations` and `behavior`. |
| Expected skill | Recognize a named adaptation or explain a listed behavior. |
| Relevant taxa | Dytiscidae (natatorial, bank); Gryllidae (stridulation, bank); Mantodea/Acrididae as distractors; Reduviidae feeding is sample-only so far |
| Source evidence | `RULES_2027.md`; samples stridulation, fossorial, natatorial, Reduviidae feeding; `ento-q24`, `ento-q25` |
| Source strength | Domain `direct-rules`; items `sample-analysis` / `existing-bank` |
| Verification status | `ento-q24` image-required (not live). Fossorial and Reduviidae feeding have **no** current bank item. |

#### `interactions`

| Field | Content |
|---|---|
| Name | Interactions |
| Parent | `relationships-and-impact` |
| Description | Official: symbiosis, competition, relationships with animals, relationships with plants. |
| Expected knowledge | Official domain names only. Bank has plant galls for Cynipidae. Samples: Test 1 Q27 galls (key D). |
| Expected skill | Connect a listed taxon to a verified plant/animal relationship. |
| Relevant taxa | Cynipidae in bank; others unverified |
| Source evidence | `RULES_2027.md` Species relationships; Sample Test 1 Q27; `ento-q28` |
| Source strength | Domain `direct-rules`; galls `existing-bank` / `sample-analysis` |
| Verification status | **Missing bank coverage** for symbiosis, competition, and animal relationships as named official bullets. Do not invent examples. |

#### `human-impact`

| Field | Content |
|---|---|
| Name | Human impact |
| Parent | `relationships-and-impact` |
| Description | Product fold of official public health and economic characteristics. |
| Expected knowledge | See nested `public-health` and `economic-characteristics`. |
| Expected skill | Tie a listed taxon to a verified health or economic role. |
| Relevant taxa | Culicidae, Apidae in bank; Ixodidae/Siphonaptera/Scarabaeidae as contrast in explanations |
| Source evidence | `RULES_2027.md`; `ento-q26`, `ento-q27`; samples barely ID Ixodidae / Coccinellidae / Curculionidae |
| Source strength | Domain `direct-rules`; items `existing-bank` |
| Verification status | `ento-q26` is `needs-review` (do not name a specific disease in stem — still verify contest wording). Medicine, chemicals, nutrients, nuisance, beneficial/detrimental as **named economic bullets** lack dedicated bank items. |

#### `climate`

| Field | Content |
|---|---|
| Name | Climate |
| Parent | `ecology-and-life` |
| Description | Climate-change impacts (official). Absent from samples. |
| Expected knowledge | Impacts are in scope. No official mechanism checklist. Bank: warmer, less-oxygenated water and sensitive mayfly/stonefly naiads. |
| Expected skill | Reason from habitat needs to a climate-related concern for listed aquatic taxa. |
| Relevant taxa | Ephemeroptera, Plecoptera in `ento-q30` |
| Source evidence | `RULES_2027.md` Climate change; `ento-q30` |
| Source strength | Domain `direct-rules`; mechanism `existing-bank` + `needs-official-verification` |
| Verification status | `ento-q30` is `needs-review`. Keep light; do not invent climate facts. |

---

### 2.3 Nested curriculum areas

#### `taxonomy-list-hierarchy`

| Field | Content |
|---|---|
| Name | List hierarchy |
| Parent | `taxonomy` |
| Description | Class → subclass → order → family as printed; Entognatha vs Insecta; Non-Insect Arthropods heading for Ixodidae (no parent class printed). |
| Expected knowledge | 2 classes, 1 subclass, 17 orders (Diplura + 16 Insecta), 32 insect families, 1 non-insect family; ranks with no families listed must not get invented families. |
| Expected skill | Place a name at the correct rank; reject “Ixodidae is an insect order.” |
| Relevant taxa | All 53 |
| Source evidence | `TAXON_LIST_2027.md` inventory |
| Source strength | `direct-taxonomy-list` |
| Verification status | In-repo list copy; confirm against official PDF when available |

#### `taxonomy-common-names`

| Field | Content |
|---|---|
| Name | Official common names |
| Parent | `taxonomy` |
| Description | Use list strings as printed (`hardback ticks`, `Giant Silkworm moths`, `cockroaches/termites`, etc.). |
| Expected knowledge | The common name(s) next to each listed rank. Orthoptera **order** has no separate common name printed; families carry names. |
| Expected skill | Map common-name clue → scientific name (and the reverse). |
| Relevant taxa | All 53 |
| Source evidence | `TAXON_LIST_2027.md` |
| Source strength | `direct-taxonomy-list` |
| Verification status | Preserve spelling; do not “correct” list strings |

#### `image-specimens`

| Field | Content |
|---|---|
| Name | Image-based specimens |
| Parent | `identification` (cross-cutting) |
| Description | Official event uses image specimens. This is a delivery constraint, not a twelfth `topicId`. |
| Expected knowledge | Traits visible in the supplied image. |
| Expected skill | `visual-id-listed-taxon` (and comparisons that require a photo). |
| Relevant taxa | ID targets |
| Source evidence | `RULES_2027.md` Specimens |
| Source strength | `direct-rules` |
| Verification status | **No images in repo.** Live Jr. Explorer practice currently cannot assess this area. |

#### `adaptations`

| Field | Content |
|---|---|
| Name | Adaptations |
| Parent | `behavior-adaptations` |
| Description | Official structure–function domain. Samples: fossorial legs, natatorial legs, aquatic tarsi. |
| Expected knowledge | Domain in scope; no official adaptation glossary. |
| Expected skill | Name a function given a structure (or the reverse) for listed taxa. |
| Relevant taxa | Aquatic listed beetles/bugs; others as verified |
| Source evidence | `RULES_2027.md` Adaptations; samples Q4, Test 1 Q8, Q24; `ento-q24` |
| Source strength | Domain `direct-rules`; examples `sample-analysis` / `existing-bank` |
| Verification status | Fossorial has no bank item. Natatorial bank item is not live. |

#### `behavior`

| Field | Content |
|---|---|
| Name | Behavior |
| Parent | `behavior-adaptations` |
| Description | Official behavior domain. Samples: stridulation; Reduviidae feeding. |
| Expected knowledge | Domain in scope; no official behavior list. |
| Expected skill | Explain how a listed taxon produces a named behavior. |
| Relevant taxa | Gryllidae in bank; Reduviidae sample-only |
| Source evidence | `RULES_2027.md` Behavior; Sample Test 1 Q6, Q22; `ento-q25` |
| Source strength | Domain `direct-rules`; examples `sample-analysis` / `existing-bank` |
| Verification status | Stridulation mechanism/taxon in the **sample** is unverified. Bank specifies Gryllidae. |

#### `public-health`

| Field | Content |
|---|---|
| Name | Public health |
| Parent | `human-impact` |
| Description | Official public health including disease. |
| Expected knowledge | Disease is in scope. No official disease list. Bank: some Culicidae can transmit pathogens (no named disease in stem). |
| Expected skill | Recognize a listed health-relevant family without inventing epidemiology. |
| Relevant taxa | Culicidae; also Ixodidae and Siphonaptera on the list (ID/health adjacency unverified beyond list presence) |
| Source evidence | `RULES_2027.md` Public health; `ento-q26`; samples ID Ixodidae only |
| Source strength | Domain `direct-rules`; mosquito item `existing-bank` + `needs-official-verification` |
| Verification status | `ento-q26` `needs-review`. Culicidae/Siphonaptera **not named** in sample stems. |

#### `economic-characteristics`

| Field | Content |
|---|---|
| Name | Economic characteristics |
| Parent | `human-impact` |
| Description | Official bullets: beneficial, detrimental, food, medicine, disease, chemicals, nutrients, nuisance species. |
| Expected knowledge | Those category names. **No official examples** in the rules restatement. Bank: Apidae / honey and pollination (`food`). |
| Expected skill | Match a verified economic role to a listed family. |
| Relevant taxa | Apidae in bank; Scarabaeidae dung/nutrients is explanation-only, not a dedicated item |
| Source evidence | `RULES_2027.md` Economic characteristics; `ento-q27` |
| Source strength | Category list `direct-rules`; examples `existing-bank` / `inferred` |
| Verification status | medicine, chemicals, nutrients, nuisance, beneficial/detrimental **need verified examples** before questions. Do not invent. |

---

## 3. Skills

**Count: 25 skills.** Knowledge nodes above are not counted as skills.

Each skill is what a future question should **test**. Facts stay in §2 and §4.

| Skill ID | Name | Parent area | Knowledge it uses | What the student does | Relevant taxa | Source evidence | Source strength | Verification status |
|---|---|---|---|---|---|---|---|---|
| `taxonomy-match-common-name` | Match official common names | `taxonomy-common-names` | Printed common names | Given a scientific rank name or common-name string, choose the list pairing | All listed names | List; `ento-q1`, `q2`, `q4` | `direct-taxonomy-list` | In-repo list strings |
| `taxonomy-identify-order` | Identify listed orders | `taxonomy` | Order names and common names | Choose the correct order from clues or names | 17 orders | Rules ID by order; `ento-q1`, `q4` | `direct-rules` | — |
| `taxonomy-identify-subclass` | Identify Collembola as subclass | `taxonomy` | Collembola is the named subclass | Distinguish subclass from insect orders | Collembola, Entognatha | Rules; list; `ento-q2`, `q10` | `direct-rules` | `q10` not live |
| `taxonomy-identify-family` | Identify listed families | `taxonomy` | Family names and common names | Choose family from list clues | 33 families | Rules ID by family | `direct-rules` | Most families have no live ID item |
| `taxonomy-place-family-in-order` | Place family in listed order | `taxonomy-list-hierarchy` | Family sits under a listed order | Given family, choose order | e.g. Apidae → Hymenoptera | List; `ento-q5` | `direct-taxonomy-list` | One live example |
| `taxonomy-distinguish-ranks` | Distinguish ranks / insect vs non-insect | `taxonomy-list-hierarchy` | Ixodidae not Insecta; order vs family | Reject mixed-rank distractors | Ixodidae, Insecta, Diplura vs families | List; Sample Test 1 Q15, Q20; `ento-q3` | `direct-taxonomy-list`; mixed-rank **style** is `sample-analysis` | Sample lettering unverified |
| `visual-id-listed-taxon` | Identify from a specimen image | `visual-id` | Listed names + visible diagnostics | Choose taxon from a photo | Image ID targets | Rules images; samples; `ento-q6`–`q10` | `direct-rules` + `sample-analysis` + `existing-bank` | **Not live.** Needs real images. |
| `visual-id-from-text-description` | Identify from a text description of visible traits | `visual-id` | Same names; traits stated in words | Choose taxon from a prose diagnostic (no photo) | Same as visual ID | **Not** an official “text ID” requirement. Product inference so live practice can cover ID without assets | `inferred` | Do not claim the tournament uses text instead of images |
| `comparison-listed-lookalikes` | Distinguish listed look-alikes | `comparison` | Pair identities; verified characters only | Pick the separating statement | Corixidae/Notonectidae; Dytiscidae/Hydrophilidae; Tipulidae/Culicidae | Samples Q14, Q19; `ento-q11`–`q13` | `sample-analysis` + `existing-bank` | Characters `needs-official-verification`; `q11`–`q13` review/image issues |
| `comparison-insect-vs-noninsect` | Distinguish Insecta from Ixodidae | `comparison` | List grouping | Choose insect vs hardback tick grouping | Insecta, Ixodidae | Sample Test 1 Q20; `ento-q3` (taxonomy-tagged) | `sample-analysis` + `direct-taxonomy-list` | Image for Q20 missing |
| `dichotomous-keys-follow` | Follow a simple key | `dichotomous-keys` | Couplet logic + listed names | Trace 1a/1b to a listed taxon | Key taxa | Rules “use a simple key”; `ento-q18`, `q19` | `direct-rules` + `existing-bank` | Both `needs-review`; no sample keys |
| `dichotomous-keys-write` | Formulate a simple first split | `dichotomous-keys` | Useful contrasting characters that are true of listed taxa | Choose the best first couplet | Mixed listed groups | Rules “formulate a simple key”; `ento-q20` | `direct-rules` + `existing-bank` | One live item; official key style unknown |
| `external-anatomy-name-tagmata` | Name insect body regions | `external-anatomy` | Head, thorax, abdomen | Choose the three regions | Insecta (vs Ixodidae contrast) | Samples body regions / thorax; `ento-q14`, `q16` | `sample-analysis` + `existing-bank` + `inferred` | Standard insect tagmata; sample keys still flagged in analysis |
| `external-anatomy-exoskeleton-function` | Explain exoskeleton function | `external-anatomy` | Support / muscle attachment (bank wording) | Choose the function | Insecta | Sample exoskeleton/chitin; `ento-q15` | `sample-analysis` + `existing-bank` | Chitin sample wording `needs-official-verification`; bank avoids copying chitin item |
| `external-anatomy-locate-structure` | Locate an external structure | `external-anatomy` | Cerci at abdomen tip; legs on thorax | Choose location | Insecta; Diplura contrast in notes | Samples cerci, legs; `ento-q16`, `q17` | `sample-analysis` + `existing-bank` | `q17` not live; tarsi/mouthparts **no bank item** |
| `internal-anatomy-gas-exchange` | Describe insect gas exchange | `internal-anatomy` | Spiracles / tracheal tubes (bank) | Choose how oxygen reaches tissues | Insecta | Domain official; fact `ento-q29` | `direct-rules` (domain) + `existing-bank` + `needs-official-verification` | Keep shallow; do not add organs |
| `life-cycles-classify-metamorphosis` | Classify complete vs incomplete | `life-cycles` | Pupa present vs naiad/nymph | Choose which listed group is holometabolous | Lepidoptera vs Hemiptera/Orthoptera/Odonata in bank | Sample Test 1 Q10; `ento-q23` | `sample-analysis` + `existing-bank` | Verify stages wording |
| `ecology-habitat-assign-taxon` | Assign habitat to a listed taxon | `ecology-habitat` | Verified habitat facts only | Choose habitat | Trichoptera, Ephemeroptera in bank | Rules habitat; samples Q21; `ento-q21`, `q22` | `direct-rules` + `existing-bank` + `sample-analysis` | Sample habitat wording unverified |
| `adaptations-recognize-leg-type` | Recognize leg adaptations | `adaptations` | Natatorial / fossorial **if verified** | Name the adaptation and a listed example | Dytiscidae in bank; fossorial taxon not named in sample descriptor | Samples Q4, Test 1 Q24; `ento-q24` | `sample-analysis` + `existing-bank` | `q24` not live; fossorial missing |
| `behavior-explain-listed-taxon` | Explain a listed behavior | `behavior` | Verified mechanism | Choose how the behavior is produced | Gryllidae stridulation in bank | Sample Q6; `ento-q25` | `sample-analysis` + `existing-bank` | Sample taxon/mechanism unverified |
| `interactions-plant-relationships` | Explain listed plant relationships | `interactions` | Verified plant–insect facts | Choose the relationship | Cynipidae galls in bank | Rules plant relationships; Sample Q27; `ento-q28` | `direct-rules` + `existing-bank` | Gall biology still flagged in sample analysis |
| `interactions-named-official-modes` | Apply symbiosis / competition / animal relationships | `interactions` | Official **category names** only | Answer a verified example in one of those categories | None in current bank | `RULES_2027.md` bullets | `direct-rules` | **No verified examples in repo.** Do not write questions until examples are sourced. |
| `human-impact-public-health` | Apply public-health roles | `public-health` | Verified vector/health facts | Choose the health-relevant listed family | Culicidae in bank | Rules; `ento-q26` | `direct-rules` + `existing-bank` | `needs-review`; no named disease |
| `human-impact-economic-role` | Apply economic roles | `economic-characteristics` | Verified food/beneficial/etc. facts | Choose the listed family for a named economic role | Apidae in bank | Rules economic list; `ento-q27` | `direct-rules` + `existing-bank` | Most economic bullets have no item |
| `climate-reason-from-habitat` | Reason about climate-change impact | `climate` | Verified habitat sensitivity | Choose a habitat-based impact, not a rank change | Ephemeroptera, Plecoptera in bank | Rules climate; `ento-q30` | `direct-rules` + `existing-bank` | `needs-review` |

Higher-level combinations (not extra IDs): following a key that encodes a look-alike split (`dichotomous-keys-follow` + `comparison-listed-lookalikes`); image ID of mixed ranks (`visual-id-listed-taxon` + `taxonomy-distinguish-ranks`).

---

## 4. Taxonomy inventory (53 named taxa)

Ranks and common names are **only** from `TAXON_LIST_2027.md` (aligned to `RULES_2027_OFFICIAL.md`). No morphological characters are invented here. Starred taxa are marked in that file; **star meaning is undefined**.

**Appearance in the 30-item bank** (historical first-pass inventory; the registered bank is now **60** items — use `QUESTION_BANK_QA_2027.md` for current live/verified)

- **Tagged:** in `taxonomyTags` (author metadata).
- **Mentioned:** appears in prompt, choices, hint, or explanation but is not necessarily tagged.
- **Live tagged:** at least one **live** question (`isLivePracticeQuestion`) includes the taxon in `taxonomyTags`.
- **image-only:** historical label when the only ID item was held out pending a photo. **Current live filter:** image-required items with `imageSrc` + `imageAlt` **are** live.

Live practice **does** show photographed items that meet that filter. Older rows in the tables below that say “image ID not live” or list image questions as `draft` / not live are **inventory from an earlier bank**; current statuses are in `QUESTION_BANK_QA_2027.md` and `lib/mock/entomology-questions.ts`.

### 4.1 Classes, subclass, non-insect heading

| Taxon | Rank | Official common name(s) | Parent grouping | Tagged Qs | Mentioned (not only tags) | Live tagged | Additional questions needed |
|---|---|---|---|---|---|---|---|
| Entognatha | Class | *(none printed at class)* | — | q2, q10 | q2, q10 explanations | q2 only | yes (q10 not live); still need non-image ID if desired |
| Insecta | Class | *(none printed at class)* | — | q14–q17, q29 | many insect items | q14–q16, q29 | correlated live; not an ID-from-list item |
| Collembola | Subclass | springtails, snow fleas | Entognatha | q2, q10 | — | q2 | image-only extra ID (`q10`); common-name live via q2 |
| Ixodidae | Family | hardback ticks | Non-Insect Arthropods *(no parent class printed)* | q3 | q14 hint, q20, q26, q30 explanations | q3 | list-placement live; image ID (sample Q11) missing |

### 4.2 Orders (no families on this list)

| Taxon | Rank | Official common name(s) | Parent | Tagged Qs | Mentioned | Live tagged | Additional questions needed |
|---|---|---|---|---|---|---|---|
| Diplura | Order | diplurans | Entognatha | q17 | q2, q10 | no (q17 image) | yes |
| Zygentoma | Order | silverfish, firebrats | Insecta | — | q2, q10 choices | no | yes |
| Ephemeroptera | Order | mayflies | Insecta | q4, q22, q30 | — | q4, q22, q30 | ID live (q4); habitat/climate correlated |
| Odonata | Order | dragon/damselflies | Insecta | q23 | q4, q11 choices | q23 | correlated only (metamorphosis); **ID yes** |
| Blattodea | Order | cockroaches/termites | Insecta | q1 | — | q1 | common-name/order live; sample termite image missing |
| Mantodea | Order | mantids | Insecta | — | q1, q24 choices | no | yes |
| Plecoptera | Order | stoneflies | Insecta | q30 | q4 choice | q30 | correlated only; **ID yes** |
| Thysanoptera | Order | thrips | Insecta | — | q2, q10 choices | no | yes |
| Megaloptera | Order | dobsonflies | Insecta | — | — | no | yes (sample ID/mouthparts; not in bank) |
| Siphonaptera | Order | fleas | Insecta | — | q27 choice | no | yes (health-adjacent list taxon) |
| Trichoptera | Order | caddisflies | Insecta | q21 | q4 choice | q21 | habitat live; **ID yes** |

### 4.3 Orders that have families (order name itself)

| Taxon | Rank | Official common name(s) | Parent | Tagged Qs | Mentioned | Live tagged | Additional questions needed |
|---|---|---|---|---|---|---|---|
| Orthoptera | Order | grasshoppers & crickets | Insecta | q19, q23, q25 | q1 | q19, q23, q25 | order ID yes |
| Hemiptera | Order | true bugs | Insecta | q8, q11, q18, q23 | q3 | q11, q18, q23 | order ID yes |
| Coleoptera | Order | beetles | Insecta | q9, q12, q24 | q1, q3, q5, q11, q18, q30 | no live **order-ID**; families live in q20 | order-level ID yes |
| Diptera | Order | true flies | Insecta | q13, q26 | q5 | q26 | order ID yes |
| Lepidoptera | Order | moths and butterflies | Insecta | q7, q23 | q5 | q23 | order ID yes (image family ID not live) |
| Hymenoptera | Order | bees/ants/wasps. | Insecta | q5, q6, q27, q28 | — | q5, q27, q28 | place-family live; image ant ID not live |

### 4.4 Families

| Taxon | Rank | Official common name(s) | Parent order | Tagged Qs | Mentioned | Live tagged | Additional questions needed |
|---|---|---|---|---|---|---|---|
| Acrididae | Family | short-horned grasshoppers | Orthoptera | q19, q20 | q23, q24 | q19, q20 | key/common-name live |
| Tettigoniidae | Family | katydids | Orthoptera | q19 | q25 hint | q19 | in key; dedicated ID yes |
| Gryllidae | Family | crickets/tree crickets | Orthoptera | q19, q20, q25 | — | q19, q20, q25 | behavior live; ID via key |
| Reduviidae | Family | Assassin bugs | Hemiptera | — | q27 choice | no | yes (sample feeding) |
| Corixidae | Family | water boatmen | Hemiptera | q11, q18 | q8 | q11, q18 | comparison/key live; image ID (samples) missing |
| Notonectidae | Family | backswimmers | Hemiptera | q8, q11, q18 | — | q11, q18 | text comparison live; image `q8` not live |
| Scutelleridae | Family | metallic shield bugs | Hemiptera | — | — | no | yes |
| Pentatomidae | Family | Stink bugs | Hemiptera | — | — | no | yes |
| Cicadidae | Family | cicadas | Hemiptera | — | — | no | yes |
| Membracidae | Family | treehoppers | Hemiptera | — | q19 choice | no | yes |
| Aphididae | Family | aphids | Hemiptera | — | q23 choice | no | yes |
| Dytiscidae | Family | predaceous diving beetles | Coleoptera | q12, q20, q24 | q8, q18 | q20 | key live; image comparison/natatorial not live |
| Hydrophilidae | Family | water scavenger | Coleoptera | q12, q20 | q8 | q20 | key live; image comparison not live |
| Scarabaeidae | Family | dung beetles | Coleoptera | — | q9, q26 explanations | no | yes |
| Buprestidae | Family | metallic wood-boring/jewel beetles | Coleoptera | — | — | no | yes |
| Lampyridae | Family | fireflies | Coleoptera | — | q12, q20, q25 | no | yes |
| Coccinellidae | Family | lady-bird beetles(ladybugs) | Coleoptera | — | q9 | no | yes (sample ID) |
| Tenebrionidae | Family | darkling beetles | Coleoptera | — | q9, q22, q27 | no | yes |
| Curculionidae | Family | weevils | Coleoptera | q9 | q12, q22 | no | **image-only** |
| Zopheridae | Family | diabolical ironclad Beetles | Coleoptera | — | — | no | yes |
| Tipulidae | Family | crane flies | Diptera | q13 | — | no | **image-only** |
| Culicidae | Family | mosquitoes | Diptera | q13, q26 | — | q26 | health live; image comparison not live |
| Bombyliidae | Family | bee flies | Diptera | — | q5 explanation, q13 | no | yes |
| Tephritidae | Family | fruit flies, husk fly | Diptera | — | — | no | yes |
| Calliphoridae | Family | blow flies | Diptera | — | q13 | no | yes |
| Papilionidae | Family | swallowtails | Lepidoptera | q7, q23 | — | q23 | metamorphosis tag only live; **image ID not live** |
| Nymphalidae | Family | brush-footed butterflies | Lepidoptera | — | q7 | no | yes |
| Saturniidae | Family | Giant Silkworm moths | Lepidoptera | — | q7, q28 | no | yes |
| Formicidae | Family | ants | Hymenoptera | q6 | — | no | **image-only** |
| Cynipidae | Family | gall wasps | Hymenoptera | q28 | q6 | q28 | plant-relationship live; image ID (samples) missing |
| Vespidae | Family | paper wasps, hornets, yellowjackets | Hymenoptera | — | q6 | no | yes |
| Apidae | Family | bees | Hymenoptera | q5, q27 | q6, q26, q28 | q5, q27 | family-in-order + economic live |

### 4.5 Inventory summary

| Bucket | Count (approx.) |
|---|---|
| Named taxa on the official list copy | **53** |
| Tagged in at least one of the 30 questions | 30 |
| Never tagged and never mentioned in the 30 | **7** (Scutelleridae, Pentatomidae, Cicadidae, Megaloptera, Buprestidae, Zopheridae, Tephritidae) |
| Image-only tagged ID (no live tagged ID item) | Formicidae, Curculionidae, Tipulidae; Collembola extra visual; Papilionidae visual |
| Live text ID / placement reasonably covered | Blattodea, Collembola (names), Ixodidae (grouping), Ephemeroptera (order), Apidae, Corixidae/Notonectidae (comparison), Acrididae, Trichoptera (habitat, not image ID), Cynipidae (galls), Culicidae (health) |

Do not treat “mentioned as a distractor” as coverage.

---

## 5. Mapping of the existing 30 questions

**Historical inventory of the first-pass bank.** Rows below (including “not live” image items and `draft` statuses) are **not** the current 60-item live pool. Current live/verified counts: `QUESTION_BANK_QA_2027.md`.

This is analysis only. Questions are not rewritten.

**Live** = included in `getQuestionsForEvent("entomology")` via `isLivePracticeQuestion`: `verified`, and if `imageRequired` then `imageSrc` + `imageAlt`. Full bank remains in `getAllQuestions()`.

`verificationStatus` defaults to `draft` when omitted in source.

| Q ID | Current topic | Curriculum area | Skill | Diff | Cognitive demand | Taxonomy tags | Source type | Verification | Image required | Live | Coverage provided |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ento-q1 | taxonomy | `taxonomy-common-names` | `taxonomy-identify-order` | 1 | recall | Blattodea | rules-derived | draft | no | yes | List fact: Blattodea = cockroaches/termites |
| ento-q2 | taxonomy | `taxonomy-common-names` | `taxonomy-identify-subclass` | 1 | recall | Collembola, Entognatha | rules-derived | draft | no | yes | Collembola common names; Entognatha vs Insecta |
| ento-q3 | taxonomy | `taxonomy-list-hierarchy` | `taxonomy-distinguish-ranks` | 1 | recall | Ixodidae | rules-derived | draft | no | yes | Ixodidae = non-insect hardback ticks |
| ento-q4 | taxonomy | `taxonomy-common-names` | `taxonomy-identify-order` | 1 | recall | Ephemeroptera | rules-derived | draft | no | yes | Mayflies = Ephemeroptera |
| ento-q5 | taxonomy | `taxonomy-list-hierarchy` | `taxonomy-place-family-in-order` | 2 | application | Apidae, Hymenoptera | rules-derived | draft | no | yes | Apidae under Hymenoptera |
| ento-q6 | visual-id | `visual-id` | `visual-id-listed-taxon` | 1 | recognition | Formicidae, Hymenoptera | generated | draft | **yes** | **no** | Ant family ID — not live |
| ento-q7 | visual-id | `visual-id` | `visual-id-listed-taxon` | 2 | recognition | Papilionidae, Lepidoptera | generated | draft | **yes** | **no** | Swallowtail visual — not live |
| ento-q8 | visual-id | `visual-id` | `visual-id-listed-taxon` | 2 | recognition | Notonectidae, Hemiptera | generated | **needs-review** | **yes** | **no** | Backswimmer visual — not live; orientation diagnostic flagged |
| ento-q9 | visual-id | `visual-id` | `visual-id-listed-taxon` | 2 | recognition | Curculionidae, Coleoptera | generated | draft | **yes** | **no** | Weevil snout visual — not live |
| ento-q10 | visual-id | `visual-id` | `visual-id-listed-taxon` | 3 | distinction | Collembola, Entognatha | generated | draft | **yes** | **no** | Furcula visual — not live |
| ento-q11 | comparison | `comparison` | `comparison-listed-lookalikes` | 2 | distinction | Corixidae, Notonectidae, Hemiptera | generated | **needs-review** | no | yes | Text orientation split; sample-style pair, new stem |
| ento-q12 | comparison | `comparison` | `comparison-listed-lookalikes` | 3 | distinction | Dytiscidae, Hydrophilidae, Coleoptera | generated | **needs-review** | **yes** | **no** | Aquatic beetle split — not live |
| ento-q13 | comparison | `comparison` | `comparison-listed-lookalikes` | 3 | distinction | Tipulidae, Culicidae, Diptera | generated | **needs-review** | **yes** | **no** | Crane fly vs mosquito — not live |
| ento-q14 | external-anatomy | `external-anatomy` | `external-anatomy-name-tagmata` | 1 | recall | Insecta | generated | draft | no | yes | Three insect tagmata |
| ento-q15 | external-anatomy | `external-anatomy` | `external-anatomy-exoskeleton-function` | 1 | recall | Insecta | generated | draft | no | yes | Exoskeleton support/attachment (not sample chitin clone) |
| ento-q16 | external-anatomy | `external-anatomy` | `external-anatomy-locate-structure` | 1 | recall | Insecta | generated | draft | no | yes | Legs attach on thorax |
| ento-q17 | external-anatomy | `external-anatomy` | `external-anatomy-locate-structure` | 2 | recognition | Insecta, Diplura | generated | draft | **yes** | **no** | Cerci location — not live |
| ento-q18 | dichotomous-keys | `dichotomous-keys` | `dichotomous-keys-follow` | 3 | multi-step | Notonectidae, Corixidae, Hemiptera | generated | **needs-review** | no | yes | Original key; same orientation diagnostic as q11 |
| ento-q19 | dichotomous-keys | `dichotomous-keys` | `dichotomous-keys-follow` | 3 | multi-step | Acrididae, Tettigoniidae, Gryllidae, Orthoptera | rules-derived | **needs-review** | no | yes | Short-horned name from list; katydid ovipositor line flagged |
| ento-q20 | dichotomous-keys | `dichotomous-keys` | `dichotomous-keys-write` | 3 | multi-step | Dytiscidae, Hydrophilidae, Acrididae, Gryllidae | generated | draft | no | yes | First-split construction |
| ento-q21 | ecology-habitat | `ecology-habitat` | `ecology-habitat-assign-taxon` | 1 | recall | Trichoptera | generated | draft | no | yes | Caddisfly larvae freshwater |
| ento-q22 | ecology-habitat | `ecology-habitat` | `ecology-habitat-assign-taxon` | 2 | application | Ephemeroptera | generated | draft | no | yes | Mayfly naiads freshwater; notes sample habitat, new stem |
| ento-q23 | life-cycles | `life-cycles` | `life-cycles-classify-metamorphosis` | 1 | recall | Lepidoptera, Papilionidae, Hemiptera, Orthoptera, Odonata | generated | draft | no | yes | Complete metamorphosis with pupa |
| ento-q24 | behavior-adaptations | `adaptations` | `adaptations-recognize-leg-type` | 2 | application | Dytiscidae, Coleoptera | generated | draft | **yes** | **no** | Natatorial + Dytiscidae — not live |
| ento-q25 | behavior-adaptations | `behavior` | `behavior-explain-listed-taxon` | 2 | application | Gryllidae, Orthoptera | generated | draft | no | yes | Cricket stridulation; notes sample, not a copy |
| ento-q26 | human-impact | `public-health` | `human-impact-public-health` | 2 | application | Culicidae, Diptera | generated | **needs-review** | no | yes | Pathogen transmission; no named disease |
| ento-q27 | human-impact | `economic-characteristics` | `human-impact-economic-role` | 1 | recall | Apidae, Hymenoptera | rules-derived | draft | no | yes | Bees / honey / pollination (`food`) |
| ento-q28 | interactions | `interactions` | `interactions-plant-relationships` | 2 | application | Cynipidae, Hymenoptera | generated | draft | no | yes | Galls; notes sample, new stem |
| ento-q29 | internal-anatomy | `internal-anatomy` | `internal-anatomy-gas-exchange` | 1 | recall | Insecta | generated | draft | no | yes | Spiracles/tracheae; shallow; not sample-supported |
| ento-q30 | climate | `climate` | `climate-reason-from-habitat` | 2 | application | Ephemeroptera, Plecoptera | generated | **needs-review** | no | yes | Warm water / oxygen / sensitive naiads |

### 5.1 Bank-wide counts (source file)

| Metric | Value |
|---|---|
| Items in source | 30 |
| Live | 21 |
| Image-required | 9 |
| `rules-derived` | 7 (q1–q5, q19, q27) |
| `generated` | 23 |
| `sample-derived` | **0** (first pass does not copy samples) |
| `needs-review` | 8 (q8, q11, q12, q13, q18, q19, q26, q30) |
| Difficulty 1 / 2 / 3 | 12 / 12 / 6 |

`sourceType: rules-derived` means the **stem is built from list/rules text**, not that every sentence of the explanation is official.

---

## 6. Curriculum gaps

### 6.1 Covered well *(relative to a 30-item first pass, not to 120–150)*

| Area / skill | Why |
|---|---|
| `taxonomy-match-common-name` + order/subclass placement | Five live list-derived items (q1–q5) |
| `dichotomous-keys-follow` / `dichotomous-keys-write` | Three live items; official **scope** (samples omitted keys) |
| Insect tagmata / leg attachment / exoskeleton function | Three live anatomy items |
| Freshwater habitat for two aquatic orders | q21, q22 live |
| One live item each: metamorphosis, stridulation, galls, bees/food, mosquito health, climate reasoning, aquatic-bug comparison (text) | Thin but present |

“Covered well” does **not** mean verified contest-final or full taxon coverage.

### 6.2 Underrepresented

| Area / skill | Live now | Gap |
|---|---|---|
| `taxonomy-identify-family` | Almost none as dedicated family ID | Most of 33 families untested in live text ID |
| `taxonomy-place-family-in-order` | 1 (Apidae) | Need other listed families |
| `comparison-listed-lookalikes` | 1 text (q11) | Two sample pairs; one live |
| `dichotomous-keys-write` | 1 | Official formulate is **in scope** (**may** / **will** conflict) |
| `ecology-habitat-assign-taxon` | 2 | Many listed taxa have no habitat item |
| `life-cycles-classify-metamorphosis` | 1 | Incomplete vs complete only one way |
| `human-impact-economic-role` | 1 (food/bees) | Other official economic bullets |
| `human-impact-public-health` | 1 | Ixodidae/Siphonaptera not practiced as health |
| `climate-reason-from-habitat` | 1 | Domain official; keep light but not a single flagged item |
| `internal-anatomy-gas-exchange` | 1 | Domain official; grain unverified |

### 6.3 Missing *(in official in-repo scope or sample-evidenced, but no bank item)*

Do not invent science to fill these. They are **curriculum holes**, not a license to fabricate.

| Missing piece | Why it belongs | Evidence |
|---|---|---|
| `interactions-named-official-modes` | Symbiosis, competition, animal relationships are named official bullets | `direct-rules` |
| Economic: medicine, chemicals, nutrients, nuisance, beneficial/detrimental | Named official bullets | `direct-rules` |
| Fossorial legs | Sample anatomy/adaptation | `sample-analysis` only |
| Mouthparts; tarsi; chitin wording; thoracic segment count as sample clones | Sample anatomy | `sample-analysis`; do not copy |
| Reduviidae feeding | Sample Test 1 Q22 | `sample-analysis` |
| Image ID for sample-heavy families (Coccinellidae, Corixidae, Cynipidae, Ixodidae, Trichoptera, Tipulidae, etc.) | Official images + samples | `direct-rules` + `sample-analysis` |
| Megaloptera as ID or mouthparts | Sample Questions 2027 Q2; Test 1 Q1 | `sample-analysis`; **absent from bank** |
| Seven list families/orders with zero bank mention | List completeness | `direct-taxonomy-list` |
| Cheat sheet / scoring as student knowledge | Official but not restated as digits | not a practice skill until specified |

### 6.4 Verification-required

| Topic | Why |
|---|---|
| Any diagnostic taken from a **missing image** | No photos in repo; sample analysis repeats this |
| Corixidae vs Notonectidae characters beyond the common-name “backswimmers” clue | Sample keys + bank `needs-review` |
| Dytiscidae vs Hydrophilidae antenna/habit characters | Sample + `ento-q12` `needs-review` |
| Culicidae blood-feeding vs Tipulidae | `ento-q13` `needs-review` |
| Katydid ovipositor as a key line | `ento-q19` `needs-review` |
| Mosquito public-health contest wording | `ento-q26` `needs-review` |
| Climate / dissolved oxygen mechanism | `ento-q30` `needs-review` |
| Complete metamorphosis sample wording | Sample Test 1 Q10 |
| Chitin, fossorial, natatorial, stridulation, galls, mayfly habitat, Reduviidae feeding, termites vs Blattodea list wording | Sample analysis “verify before production” list |
| Tracheal system as the intended internal-anatomy grain | Official domain, no checklist |
| Sample Test 1 Q30 | Stem unknown; key C only |
| A–E lettering of slash-separated taxon lists | Sample Test 1 Q1, Q15 |
| Whether Jr. Explorer should use four or five choices for ID | Product vs tournament; types unchanged in this pass |

### 6.5 Image-dependent *(cannot be practiced live today)*

| Skill / area | Bank items | Live |
|---|---|---|
| Entire `visual-id` major area | q6–q10 (5) | **0** |
| `comparison-listed-lookalikes` that need photos | q12, q13 | 0 (q11 remains) |
| `external-anatomy-locate-structure` (cerci diagram) | q17 | 0 |
| `adaptations-recognize-leg-type` (natatorial photo) | q24 | 0 |

Until images exist, live visual identification is **empty**. Text-description ID (`visual-id-from-text-description`) is a product workaround, not a substitute for the official image event.

---

## 7. Future question-bank blueprint

No questions are written here.

**Targets:** about **60 usable (live) items** for MVP; about **120–150 verified items** eventually (`CONTENT_SPEC.md`). Mix should follow **official scope** (identification **and** correlated knowledge), not Sample Test 1’s ID-heavy balance.

Usable = appears in the live practice pool (no unresolved `imageRequired`, or images actually supplied).

Existing 21 live drafts may be **kept, revised, or replaced** after verification; they are not 21 contest-final items.

### 7.1 MVP (~60 usable)

Emphasis: (1) list literacy for many taxa in **text**, (2) keys, (3) a thin verified correlated set, (4) visual ID only if assets exist—otherwise text-description ID, clearly labeled as practice, not tournament replica.

| Curriculum area | Skill | Recommended types | Difficulty | Images | Min initial (usable) | Eventual target | Source confidence |
|---|---|---|---|---|---|---|---|
| `taxonomy` | `taxonomy-match-common-name`, `taxonomy-identify-order`, `taxonomy-identify-subclass` | 4-choice recall from list strings | 1 | useful later, not required | 8 | 18 | High (`direct-taxonomy-list`) |
| `taxonomy` | `taxonomy-identify-family`, `taxonomy-place-family-in-order` | Family ↔ common name; family → order | 1–2 | useful later | 8 | 22 | High for names; medium for extra characters |
| `taxonomy` | `taxonomy-distinguish-ranks` | Mixed rank / Ixodidae vs Insecta | 2–3 | useful | 2 | 6 | High for grouping; sample mixed-rank **style** medium |
| `visual-id` | `visual-id-listed-taxon` | Specimen photo + listed distractors | 1–3 | **required** | 0 if no assets; **8** if assets | 25 | High that images are official; low until photos exist |
| `visual-id` | `visual-id-from-text-description` | Prose diagnostics, listed distractors | 2–3 | no | 6 (MVP without photos) | 8 (retire some when images ship) | `inferred` — product only |
| `comparison` | `comparison-listed-lookalikes` | Two listed families; one verified character | 2–3 | useful for aquatic pairs | 4 | 10 | Medium; verify characters |
| `dichotomous-keys` | `dichotomous-keys-follow` | Short original keys, listed taxa | 2–3 | no | 4 | 8 | In official scope; low official key style |
| `dichotomous-keys` | `dichotomous-keys-write` | Choose best first couplet | 3 | no | 2 | 4 | In official scope |
| `external-anatomy` | tagmata, exoskeleton, locate structure | Fact + simple application | 1–2 | diagram useful for cerci/legs | 6 | 14 | Medium (domain official; details sample/inferred) |
| `internal-anatomy` | `internal-anatomy-gas-exchange` plus at most one other **verified** shallow fact | Recall | 1 | no | 2 | 4 | Low grain; do not invent organs |
| `ecology-habitat` | `ecology-habitat-assign-taxon` | Habitat application | 1–2 | no | 4 | 8 | Medium; verify each taxon |
| `life-cycles` | `life-cycles-classify-metamorphosis` | Complete vs incomplete among listed orders | 1–2 | no | 3 | 6 | Medium |
| `behavior-adaptations` | `adaptations-recognize-leg-type`, `behavior-explain-listed-taxon` | Application | 2 | useful for legs | 4 | 8 | Medium; fossorial/Reduviidae need verification first |
| `interactions` | `interactions-plant-relationships` | Galls or other **verified** plant example | 2 | useful | 2 | 4 | Medium |
| `interactions` | `interactions-named-official-modes` | Only after sourced examples | 2 | no | **0** until sourced | 4 | Domain high; examples missing |
| `human-impact` | `human-impact-public-health` | No named disease unless verified | 2 | no | 2 | 4 | Medium |
| `human-impact` | `human-impact-economic-role` | Food/beneficial/etc. with sourced examples | 1–2 | no | 3 | 8 | Categories high; examples low |
| `climate` | `climate-reason-from-habitat` | Light, verified, listed aquatic taxa | 2 | no | 2 | 4 | Domain high; mechanisms `needs-review` |

**MVP usable total:** 8+8+2+6+4+4+2+6+2+4+3+4+2+0+2+3+2 = **62** (treat as ~60; drop 2 from taxonomy or text-visual if needed).

If specimen images **are** available for MVP, move 8 from `visual-id-from-text-description` into `visual-id-listed-taxon` and keep a few text items as scaffolding.

### 7.2 Eventual ~120–150

Grow **family-level ID** across the 33 families (~2 usable items per high-frequency ID target is the `CONTENT_SPEC` rationale, not a rule). Add verified correlated items for official bullets that still lack examples. Add image ID toward roughly 30–40% of the **full** bank once assets exist. Do not pad with unofficial taxa or fake mastery.

---

## 8. Recommended metadata for future Entomology questions

Do **not** implement in application code in this pass. Design only.

| Field | Required | Notes |
|---|---|---|
| `topicId` | yes | One of the twelve major practice IDs (adaptive compatibility) |
| `subtopicId` | recommended | Nested curriculum ID (`taxonomy-common-names`, `public-health`, …) |
| `skillId` | yes for new items | One skill from §3 (primary). Optional `secondarySkillId` later |
| `difficulty` | yes | `1 \| 2 \| 3` as now |
| `cognitiveDemand` | yes | `recall \| recognition \| distinction \| application \| multi-step` as now |
| `taxonomyTags` | yes | Only `ENTOMOLOGY_TAXON_IDS` / list names |
| `sourceType` | yes | Keep `rules-derived \| sample-derived \| generated`; do not set `sample-derived` for copies |
| `sourceNote` | yes | Pointer to list section, rules domain, or “inspired by sample Qn, new stem” |
| `verificationStatus` | yes | Expand later beyond `draft \| needs-review` (e.g. `verified`) if needed |
| `imageRequired` | yes | If true, item is **not live** until `imageSrc` and `imageAlt` are set (and the item is `verified`) |
| `imageBrief` | if `imageRequired` | Diagnostic description; not a substitute for a file |
| `imageAssetId` / URL | later | When types are extended |
| `confusableTaxa` | later | Listed look-alikes only |
| `officialCommonNamesUsed` | optional | Exact list strings cited in the stem |

Still out of the generic `Question` type today: `subtopicId`, `skillId`, source fields, `imageBrief`. The Entomology bank file already stores several of these on `EntomologyQuestion` and strips them for practice.

Quality rules for later authoring: one defensible answer; distractors from this list; elementary voice; no sample clones; flag uncertainty; do not add unofficial ranks.

---

## 9. What cannot be finalized until factual sources / images exist

- Cheat-sheet **size** (one sheet, any form/source, and lamination/tabs are already official)
- Scoring **point values** (high score wins and preselected tiebreakers are official)
- Asterisk **meaning** (14 stars are on the official list; undefined)
- All sample stems, A–E choices, and **every specimen photograph**
- Sample Test 1 question 30
- Whether specific internal organs, mouthparts, tarsal formulas, or climate mechanisms are expected
- Visual diagnostics that only exist in missing photos
- Official dichotomous-key **style** (samples contain none)
- Sourced examples for official relationship/economic **such as** / **e.g.** bullets
- Life-cycle / metamorphosis facts (not named in official rules)

Until then, treat generated bank biology as **draft**, official list/rules as **scope + printed names**, and samples as **style plus unverified keys**.

---

## Related files

- `RULES_2027_OFFICIAL.md`
- `RULES_2027.md`
- `TAXON_LIST_2027.md`
- `SAMPLE_ANALYSIS_2027.md`
- `CONTENT_SPEC.md`
- `lib/mock/entomology-questions.ts`
- `lib/mock/entomology.ts`
