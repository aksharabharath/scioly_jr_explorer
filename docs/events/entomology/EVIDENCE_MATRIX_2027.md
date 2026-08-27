# Entomology 2027 — Official-Source Evidence Matrix

**Bridge:** official source → curriculum concept → question eligibility.

This file is **not** a question bank and **not** an instruction to write q61+. It does not change `verificationStatus` on q1–q60 unless a later pass edits the bank.

**Authoritative source for this pass:** `docs/events/entomology/RULES_2027_OFFICIAL.md` (2027 Entomology rules text **and** the 2027 ESO Entomology List in the same file). Do **not** require a PDF. Do **not** use 2026 rules or sample tests as official rules.

**How to read**

| Term | Meaning |
|---|---|
| **What the rules establish** | Scope, format, list membership, printed names/ranks |
| **What additional biology is required** | Any fact used to pick the answer that is **not** printed in the official file |
| A topic being **in scope** | Does **not** verify an answer about that topic |

Pipeline: `official source` → `evidence record` → `curriculum concept` → `question draft` → `QA` → `verified` → `live`

Never: `general knowledge` → `generated question` → `verified`

---

## 0. Evidence categories (this pass)

| Category | Meaning | Can support `verified`? |
|---|---|---|
| `OFFICIAL_RULES` | Stated in the rules body (description, parameters, competition, scoring) | **Yes**, for that **stated** fact or **scope** only |
| `OFFICIAL_LIST` | Stated on the ESO Entomology LIST in the same official file | **Yes**, for rank, placement, and the **printed** common-name string |
| `FACTUAL_SOURCE_NEEDED` | Rules/list do not establish the answer’s biology | **No** |
| `IMAGE_SOURCE_NEEDED` | Item needs a specimen/diagram asset or a visual diagnostic | **No** until asset + diagnostic are sourced |
| `AMBIGUOUS_HUMAN_REVIEW` | Wording conflict, undefined marker, or string mismatch | **No** until a human resolves it |

Secondary restatements (`RULES_2027.md`, `TAXON_LIST_2027.md`, curriculum, blueprint, samples) are **not** categories above. They are compared in §8.

---

## 1. Authoritative extraction (`RULES_2027_OFFICIAL.md`)

### 1.1 Format, team, scoring

| Item | Official wording | Category |
|---|---|---|
| Title | `ENTOMOLOGY RULES 2027` | `OFFICIAL_RULES` |
| Team | **A TEAM OF UP TO: 2** | `OFFICIAL_RULES` |
| Time | **APPROXIMATE TIME: 30 minutes** | `OFFICIAL_RULES` |
| Format | Test **will** be conducted **online** in a **multiple choice** format | `OFFICIAL_RULES` |
| Cheat sheet | Each team **can** have **one (1)** cheat sheet, information **in any form and from any source**. Sheet protectors, lamination, tabs, and labels **are allowed**. | `OFFICIAL_RULES` |
| List copy | In addition, each team **may** have **one (1)** copy of the ESO Entomology List **provided** | `OFFICIAL_RULES` (`may`) |
| Scoring | **The high score wins.** | `OFFICIAL_RULES` |
| Tiebreak | **Preselected questions will be used as tiebreakers.** | `OFFICIAL_RULES` |
| Sheet size / point values / question count / division letter | **Not stated** | not established |
| Geography | All specimens **will** be representatives of insects found in the **Contiguous United States** | `OFFICIAL_RULES` |

### 1.2 Identification and list boundary

| Item | Official wording | Qualifier |
|---|---|---|
| ID ranks (description) | identify insects by indicated taxonomy (**order, subclass, or family**) | closed ranks named |
| ID ranks (competition) | identify an insect's **Order, Subclass, Family or common name** | **or** common name |
| Related questions | **and** answer a related question(s) | correlated with ID |
| Topic limit | Questions are **limited to** topics below | closed to named competition topics |
| Taxon limit | insects are **limited to** those listed on the **2027 ESO Entomology List** | **closed list** |
| Genus / species ID | **Not stated** | do not add as a requirement |

### 1.3 Skills (required vs permitted)

| Skill | Where | Official wording | Classification |
|---|---|---|---|
| Identify listed taxa | Description **will**; Competition **will** | identify by order/subclass/family or common name | **Required contest task** (`OFFICIAL_RULES`) |
| Answer related / correlated questions | Description **will**; Competition **will** | related question(s); **For each specimen**, students **will** be asked correlated questions | **Required contest task** (`OFFICIAL_RULES`) |
| Dichotomous key | Description | students **will** be asked to … **use or construct** a dichotomous key | Appears as part of the event description |
| Dichotomous key | Competition §2 | Students **may** be asked to **use or formulate** a **simple** dichotomous key | **Permitted**, not “must on every test” |
| Key type | Competition §2 | **simple** dichotomous key **to identify insects** | `OFFICIAL_RULES` |

**Key requirement conflict:** description uses **will** … use or construct; competition uses **may** … use or formulate a simple key. Treat as `AMBIGUOUS_HUMAN_REVIEW` for “keys are mandatory every time,” and as `OFFICIAL_RULES` that keys **are in scope**.

### 1.4 Images / specimens

| Item | Official wording | Does **not** establish |
|---|---|---|
| Images | **Insect images will be exhibited** so students can see **pertinent features** | Photo count, live vs photo, labeled diagrams, any diagnostic character |
| Specimens | Representatives of insects found in the Contiguous United States | That Entognatha / Ixodidae are “insects” (see §1.7) |

Contest **will** show images. The official file contains **no** specimen images and **no** visual diagnostics. Bank photos remain `IMAGE_SOURCE_NEEDED`.

### 1.5 Correlated content areas (scope, not fact tables)

Competition §3: correlated questions **will** pertain to the insect’s **internal and external anatomy**, **ecology**, **economic characteristics**, or **systematics**.

| Domain | Official text | Qualifier | Biology facts in the file? |
|---|---|---|---|
| Internal anatomy | pertain to … internal … anatomy | topic allowed | **No** organ checklist |
| External anatomy | pertain to … external anatomy | topic allowed | **No** structure checklist |
| Ecology | pertain to … ecology | topic allowed | **No** |
| Economic characteristics | pertain to … economic characteristics | topic allowed | **No** |
| Systematics | pertain to … **or systematics** | topic allowed | **No** extra ranks |
| Habitats | Ecological characteristics **may include** habitats | **may include** | **No** habitat table |
| Adaptations | **may include** adaptations to the environment | **may include** | **No** glossary |
| Behavior | **may include** behavior | **may include** | **No** |
| Relationships | **may include** relationships (**e.g.** symbiosis and competition) with animals, plants, and public health | **e.g.** = examples, not closed | **No** worked examples |
| Climate | **may include** … climate change impacts | **may include** | **No** mechanisms |
| Economic examples | Economic characteristics **may include** beneficial or detrimental aspects … **such as** sources of food, medicine, disease, chemicals, nutrients, and insects as nuisance species | **may include** / **such as** | **No** taxon-level examples |
| **Life cycles / metamorphosis** | **Not named** | not an official domain | — |
| Public health | appears in the ecological **may include** sentence | not a separate closed domain | **No** pathogens |

`may include` / `e.g.` / `such as` establish **permitted topic categories**. They are **not** `must know` checklists and **not** answer keys.

### 1.6 Stars

**14** list lines begin with `*` (see §5). The rules body **does not define** what `*` means. Category: `AMBIGUOUS_HUMAN_REVIEW`. Do not write items that depend on star meaning.

Starred: Ephemeroptera, Odonata, Plecoptera, Cicadidae, Megaloptera, Lampyridae, Coccinellidae, Tenebrionidae, Tipulidae, Culicidae, Calliphoridae, Trichoptera, Papilionidae, Nymphalidae.

### 1.7 Ambiguities in the official file itself

| Issue | Why |
|---|---|
| Description says **insects**; list includes **Class Entognatha** and **Non-Insect Arthropods / Ixodidae** | `AMBIGUOUS_HUMAN_REVIEW` |
| `Blattodea-` missing space before hyphen | transcription vs print; names still `cockroaches/termites` |
| En-dashes vs hyphens on some family lines | string-normalization `AMBIGUOUS_HUMAN_REVIEW` if testing punctuation |
| Public health attached to the relationships clause | grammar is awkward; topic is still named |
| Keys **will** (description) vs **may** (competition) | `AMBIGUOUS_HUMAN_REVIEW` |

---

## 2. Official taxon count and list (`OFFICIAL_LIST`)

**Official named taxa (all printed ranks): 53**

| Rank | Count |
|---|---:|
| Classes | 2 (Entognatha, Insecta) |
| Subclasses | 1 (Collembola) |
| Orders | 17 |
| Insect families | 32 |
| Non-insect families | 1 (Ixodidae) |
| **Total named taxa** | **53** |
| Starred lines | **14** (meaning undefined) |

Scientific-name set matches `TAXON_LIST_2027.md`, which is **aligned** to the official list (53 taxa, official strings, 14 undefined stars).

Exact official common-name strings (preserve punctuation/capitals):

| Rank | Name | Official common name | `*` |
|---|---|---|---|
| Class | Entognatha | *(none)* | no |
| Subclass | Collembola | springtails, snow fleas | no |
| Order | Diplura | diplurans | no |
| Class | Insecta | *(none)* | no |
| Order | Zygentoma | silverfish, firebrats | no |
| Order | Ephemeroptera | mayflies | yes |
| Order | Odonata | dragon/damselflies | yes |
| Order | Blattodea | cockroaches/termites | no |
| Order | Mantodea | mantids | no |
| Order | Plecoptera | stoneflies | yes |
| Order | Orthoptera | grasshoppers & crickets | no |
| Family | Acrididae | short-horned grasshoppers | no |
| Family | Tettigoniidae | katydids | no |
| Family | Gryllidae | crickets/tree crickets | no |
| Order | Hemiptera | true bugs | no |
| Family | Reduviidae | Assassin bugs | no |
| Family | Corixidae | water boatmen | no |
| Family | Notonectidae | backswimmers | no |
| Family | Scutelleridae | metallic shield bugs | no |
| Family | Pentatomidae | Stink bugs | no |
| Family | Cicadidae | cicadas | yes |
| Family | Membracidae | treehoppers | no |
| Family | Aphididae | aphids | no |
| Order | Thysanoptera | thrips | no |
| Order | Megaloptera | dobsonflies | yes |
| Order | Coleoptera | beetles | no |
| Family | Dytiscidae | predaceous diving beetles | no |
| Family | Hydrophilidae | water scavenger | no |
| Family | Scarabaeidae | dung beetles | no |
| Family | Buprestidae | metallic wood-boring/jewel beetles | no |
| Family | Lampyridae | fireflies | yes |
| Family | Coccinellidae | lady-bird beetles(ladybugs) | yes |
| Family | Tenebrionidae | darkling beetles | yes |
| Family | Curculionidae | weevils | no |
| Family | Zopheridae | diabolical ironclad Beetles | no |
| Order | Siphonaptera | fleas | no |
| Order | Diptera | true flies | no |
| Family | Tipulidae | crane flies | yes |
| Family | Culicidae | mosquitoes | yes |
| Family | Bombyliidae | bee flies | no |
| Family | Tephritidae | fruit flies, husk fly | no |
| Family | Calliphoridae | blow flies | yes |
| Order | Trichoptera | caddisflies | yes |
| Order | Lepidoptera | moths and butterflies | no |
| Family | Papilionidae | swallowtails | yes |
| Family | Nymphalidae | brush-footed butterflies | yes |
| Family | Saturniidae | Giant Silkworm moths | no |
| Order | Hymenoptera | bees/ants/wasps. | no |
| Family | Formicidae | ants | no |
| Family | Cynipidae | gall wasps | no |
| Family | Vespidae | paper wasps, hornets, yellowjackets | no |
| Family | Apidae | bees | no |
| Family | Ixodidae | hardback ticks (under **Non-Insect Arthropods**) | no |

Orders/subclass with **no families** listed: Collembola, Diplura, Zygentoma, Ephemeroptera, Odonata, Blattodea, Mantodea, Plecoptera, Thysanoptera, Megaloptera, Siphonaptera, Trichoptera. Do not invent families.

---

## 3. Concept records

**Scope ≠ factual evidence.**

| ID | Concept | What the rules/list establish | Extra biology needed to answer typical items? | Category |
|---|---|---|---|---|
| E-001 | Official rules file | `RULES_2027_OFFICIAL.md` is the project authority | — | `OFFICIAL_RULES` |
| E-002 | Official list | Same file, ESO Entomology LIST; 53 named taxa | — | `OFFICIAL_LIST` |
| E-003 | ID by order / subclass / family / common name | Explicit **will** / ranks named | No, if the item only uses printed strings | `OFFICIAL_RULES` + `OFFICIAL_LIST` |
| E-004 | Closed taxon list | **limited to** 2027 ESO Entomology List | No | `OFFICIAL_RULES` |
| E-005 | Images exhibited | **will** exhibit insect images; pertinent features | Diagnostics and bank assets | `OFFICIAL_RULES` (format); `IMAGE_SOURCE_NEEDED` (assets) |
| E-006 | Dichotomous keys | In scope; **simple**; **may** (competition) vs **will** (description) | Couplet biology if not list strings | `OFFICIAL_RULES` + `AMBIGUOUS_HUMAN_REVIEW` |
| E-007 | Correlated questions | **will**, **for each specimen**; anatomy, ecology, economic, **or** systematics | Any specific fact | `OFFICIAL_RULES` (scope only) |
| E-008 | Internal / external anatomy | Named correlated topics | Tagmata, spiracles, cerci, exoskeleton function, etc. | `FACTUAL_SOURCE_NEEDED` |
| E-009 | Ecology / habitats | **may include** habitats | Per-taxon habitat | `FACTUAL_SOURCE_NEEDED` |
| E-010 | Adaptations / behavior | **may include** | Natatorial, stridulation, fossorial, feeding | `FACTUAL_SOURCE_NEEDED` |
| E-011 | Relationships | **e.g.** symbiosis and competition; animals, plants, public health | Galls, mutualism examples | `FACTUAL_SOURCE_NEEDED` |
| E-012 | Climate-change impacts | **may include** | Mechanisms (oxygen, warming) | `FACTUAL_SOURCE_NEEDED` |
| E-013 | Economic / public health examples | **may include** / **such as** food, medicine, disease, chemicals, nutrients, nuisance | Honey, pathogens, silk, dung/nutrients | `FACTUAL_SOURCE_NEEDED` |
| E-014 | Life cycles / metamorphosis | **Not named** | Complete vs incomplete, pupa | `FACTUAL_SOURCE_NEEDED` (not official domain) |
| E-015 | Star meaning | Stars **present**; **undefined** | — | `AMBIGUOUS_HUMAN_REVIEW` |
| E-016 | “Insects” vs Entognatha / Ixodidae | Description vs list headings | How to teach ticks / springtails | `AMBIGUOUS_HUMAN_REVIEW` |
| E-017 | Cheat sheet / scoring facts above | Explicit | Size and point values still absent | `OFFICIAL_RULES` |
| E-018 | Visual diagnostics (snout, furcula, tails, orientation, antennae) | Not in file | Yes | `IMAGE_SOURCE_NEEDED` and/or `FACTUAL_SOURCE_NEEDED` |
| E-019 | Official sample packet | Not in this file | — | not official rules |
| E-020 | Name-only keys | Keys in scope; couplets may quote **only** official strings | None if strictly list-literal | `OFFICIAL_LIST` + `OFFICIAL_RULES` |

---

## 4. Coverage by practice area

| Area | Official support | Usable for verified items **now** | Blocked |
|---|---|---|---|
| taxonomy | `OFFICIAL_LIST` names, ranks, parents, printed strings | List literacy that matches **official** strings (`TAXON_LIST_2027.md` aligned) | Star meaning; bank items that still quote old TAXON_LIST-ish strings |
| visual-id | Contest **will** show images | **None** without assets | All specimen ID |
| comparison | List can support **name** contrasts | Name-only look-alikes using official strings | Orientation, antenna splits, photos |
| dichotomous-keys | In scope (`may`/`will` conflict) | Follow/write keys that use **only** official names/headings | Biological couplets |
| external-anatomy | Scope only | **None** | All structure facts |
| internal-anatomy | Scope only | **None** | Spiracles/tracheae |
| life-cycles | **Not named** | **None** as rules-backed | All metamorphosis items |
| ecology-habitat | **may include** habitats | **None** for habitat answers | Per-taxon habitat |
| behavior-adaptations | **may include** | **None** | Mechanisms |
| interactions | **e.g.** examples | **None** for gall/symbiosis facts | Worked examples |
| human-impact | **such as** examples | **None** for honey/pathogens | Mechanisms and named diseases |
| climate | **may include** | **None** for mechanisms | q30-class items |

---

## 5. List evidence vs biology evidence

| Official list **does** establish | Official list **does not** establish |
|---|---|
| Hydrophilidae is printed **water scavenger** | That they live in water as a biological habitat fact (beyond the printed words) |
| Notonectidae is printed **backswimmers** | Swimming orientation or a photo |
| Cynipidae is printed **gall wasps** | What a gall is |
| Culicidae is printed **mosquitoes** | Pathogen transmission |
| Apidae is printed **bees** under Hymenoptera | Honey or pollination |
| Orthoptera is printed **grasshoppers & crickets** | Stridulation |
| Dytiscidae is printed **predaceous diving beetles** | Natatorial legs or antenna shape |

---

## 6. Existing question audit (q1–q60)

**No bank edits. No `verificationStatus` changes.** Capitalization/punctuation mismatches are documented here rather than forced status flips.

**Safely supported by official rules/list** = answer is fully determined by printed names, ranks, headings, or a key that only uses those strings.

| Question | Current status | Official support | Extra evidence | Recommended documentation |
|---|---|---|---|---|
| q1 | verified | Blattodea = cockroaches/termites | — | **Supported** (`OFFICIAL_LIST`) |
| q2 | verified | Collembola = springtails, snow fleas; Entognatha | — | **Supported** |
| q3 | verified | Ixodidae under Non-Insect Arthropods; hardback ticks | Description “insects” vs heading | **Supported** as list grouping; `AMBIGUOUS_HUMAN_REVIEW` only if teaching “not an insect” from the description sentence |
| q4 | verified | Ephemeroptera = mayflies | Star unused | **Supported** |
| q5 | verified | Apidae (bees) → Hymenoptera | — | **Supported** |
| q6 | needs-review | Formicidae = ants (name only) | Ant image + petiole/antenna | `IMAGE_SOURCE_NEEDED` |
| q7 | needs-review | Papilionidae = swallowtails | Image + hindwing tails | `IMAGE_SOURCE_NEEDED` |
| q8 | needs-review | Notonectidae = backswimmers | Image + orientation | `IMAGE_SOURCE_NEEDED` + `FACTUAL_SOURCE_NEEDED` |
| q9 | needs-review | Curculionidae = weevils | Image + snout | `IMAGE_SOURCE_NEEDED` |
| q10 | needs-review | Collembola names/rank | Image + furcula | `IMAGE_SOURCE_NEEDED` |
| q11 | needs-review | Both families listed | Dorsal vs ventral swimming | `FACTUAL_SOURCE_NEEDED` |
| q12 | needs-review | Family names listed | Antenna/palp split + image; choice text “water scavenger **beetles**” ≠ official **water scavenger** | `IMAGE_SOURCE_NEEDED` + `AMBIGUOUS_HUMAN_REVIEW` |
| q13 | needs-review | Tipulidae / Culicidae listed | Image + piercing/blood-feeding | `IMAGE_SOURCE_NEEDED` + `FACTUAL_SOURCE_NEEDED` |
| q14 | needs-review | Anatomy **in scope** | Three tagmata | `FACTUAL_SOURCE_NEEDED` |
| q15 | needs-review | Anatomy in scope | Exoskeleton function | `FACTUAL_SOURCE_NEEDED` |
| q16 | needs-review | Anatomy in scope | Leg attachment | `FACTUAL_SOURCE_NEEDED` |
| q17 | needs-review | Anatomy in scope | Cerci + diagram | `IMAGE_SOURCE_NEEDED` + `FACTUAL_SOURCE_NEEDED` |
| q18 | needs-review | Keys in scope | Orientation couplet | `FACTUAL_SOURCE_NEEDED` |
| q19 | verified | Orthoptera family official names only | — | **Supported** (list-literacy key) |
| q20 | verified | Taxa listed; Dytiscidae “predaceous diving beetles”; Hydrophilidae official **water scavenger** | Explanation says “water scavenger **beetles**”; winning split is **lives in water vs land** (habitat inference) | `AMBIGUOUS_HUMAN_REVIEW` |
| q21 | needs-review | Trichoptera = caddisflies | Larval freshwater habitat | `FACTUAL_SOURCE_NEEDED` |
| q22 | needs-review | Ephemeroptera = mayflies | Naiad habitat | `FACTUAL_SOURCE_NEEDED` |
| q23 | needs-review | Lepidoptera listed | Complete metamorphosis / pupa; life cycles **not named** | `FACTUAL_SOURCE_NEEDED` |
| q24 | needs-review | Dytiscidae listed; adaptations **may include** | Natatorial + image | `IMAGE_SOURCE_NEEDED` + `FACTUAL_SOURCE_NEEDED` |
| q25 | needs-review | Gryllidae listed; behavior **may include** | Stridulation | `FACTUAL_SOURCE_NEEDED` |
| q26 | needs-review | Culicidae listed; public health / disease **examples** | Pathogen transmission | `FACTUAL_SOURCE_NEEDED` |
| q27 | needs-review | Apidae = bees; economic **such as** food | Honey / pollination | `FACTUAL_SOURCE_NEEDED` |
| q28 | needs-review | Cynipidae = gall wasps; relationships **e.g.** | Gall anatomy | `FACTUAL_SOURCE_NEEDED` |
| q29 | needs-review | Internal anatomy in scope | Spiracles/tracheae | `FACTUAL_SOURCE_NEEDED` |
| q30 | needs-review | Climate **may include** | Warm-water / oxygen | `FACTUAL_SOURCE_NEEDED` |
| q31 | verified | Scutelleridae = metallic shield bugs | — | **Supported** |
| q32 | verified | Pentatomidae = **Stink bugs** | Stem uses “stink bugs” | `AMBIGUOUS_HUMAN_REVIEW` (capital S) |
| q33 | verified | Cicadidae → Hemiptera | Star unused | **Supported** |
| q34 | verified | Megaloptera = dobsonflies | — | **Supported** |
| q35 | verified | Buprestidae → Coleoptera | Order common name **beetles** now official | **Supported** |
| q36 | verified | Zopheridae = **diabolical ironclad Beetles** | Choices use “beetles” | `AMBIGUOUS_HUMAN_REVIEW` (capital B) |
| q37 | verified | Tephritidae → Diptera; fruit flies, husk fly | — | **Supported** |
| q38 | verified | Mantodea = mantids | — | **Supported** |
| q39 | verified | Siphonaptera = fleas; order, no families | — | **Supported** |
| q40 | verified | Bombyliidae bee flies / Diptera vs Apidae bees / Hymenoptera | — | **Supported** |
| q41 | verified | Vespidae = paper wasps, hornets, yellowjackets | — | **Supported** |
| q42 | verified | Saturniidae Giant Silkworm moths → Lepidoptera | — | **Supported** |
| q43 | verified | Collembola subclass vs Diplura order | — | **Supported** |
| q44 | verified | Membracidae → Hemiptera | — | **Supported** |
| q45 | verified | Non-Insect Arthropods / Insecta / bees / ants | — | **Supported** (list-literacy key) |
| q46 | verified | Hemiptera vs Coleoptera; cicadas / metallic shield bugs | — | **Supported** |
| q47 | verified | thrips / dobsonflies / caddisflies | — | **Supported** |
| q48 | verified | Diptera vs Hymenoptera; mosquitoes / fruit flies | — | **Supported** |
| q49 | verified | Collembola / Blattodea / Ixodidae headings | — | **Supported** |
| q50 | verified | Buprestidae / Zopheridae strings | Couplet uses “diabolical ironclad beetles” | `AMBIGUOUS_HUMAN_REVIEW` (same as q36) |
| q51 | needs-review | Anatomy scope | Tagmata | `FACTUAL_SOURCE_NEEDED` |
| q52 | needs-review | Anatomy scope | Tagmata | `FACTUAL_SOURCE_NEEDED` |
| q53 | needs-review | Anatomy scope | Exoskeleton location | `FACTUAL_SOURCE_NEEDED` |
| q54 | needs-review | Ixodidae grouping is list-ok | Stem asserts insect tagmata | `FACTUAL_SOURCE_NEEDED` |
| q55 | needs-review | Odonata = dragon/damselflies | Pupa / incomplete metamorphosis | `FACTUAL_SOURCE_NEEDED` |
| q56 | needs-review | caddisflies = Trichoptera | Freshwater pond premise | `FACTUAL_SOURCE_NEEDED` (habitat); name match would be list-ok alone |
| q57 | needs-review | Internal anatomy scope | Spiracle definition | `FACTUAL_SOURCE_NEEDED` |
| q58 | needs-review | Gryllidae listed | Stridulation | `FACTUAL_SOURCE_NEEDED` |
| q59 | needs-review | gall wasps listed | Plant-gall relationship fact | `FACTUAL_SOURCE_NEEDED` |
| q60 | needs-review | Culicidae listed | Pathogens | `FACTUAL_SOURCE_NEEDED` |

### Audit totals (documentation only)

| Class | Count | IDs |
|---|---:|---|
| **Supported by official list/rules** (string/rank/name-only key) | **23** | q1–q5, q19, q31, q33–q35, q37–q49 |
| **Ambiguous / human review** (status left `verified`) | **4** | q20, q32, q36, q50 |
| **External factual source** | **24** | q11, q14–q16, q18, q21–q23, q25–q30, q51–q60 |
| **Image and/or visual diagnostic** | **9** | q6–q10, q12, q13, q17, q24 |
| **Statuses changed in code** | **0** | — |

q12 is counted under image (primary blocker) and also has a Hydrophilidae string issue.

---

## 7. Safe expansion (do not author in this pass)

### Eligible now (list/rules only)

List-literacy and **name-only** keys using **official** strings from `RULES_2027_OFFICIAL.md` / aligned `TAXON_LIST_2027.md`.

Existing bank items may still quote pre-alignment strings (q12, q20, q32, q36, q50). Do **not** copy those old strings into new items. Re-QA before treating them as exact-string verified.

### Not eligible

All anatomy facts, habitats, metamorphosis, behavior mechanisms, economic/health examples, climate mechanisms, visual diagnostics, star meaning.

---

## 8. Discrepancies vs other documents

| Document | Status this pass |
|---|---|
| `TAXON_LIST_2027.md` | **Aligned** to official list (53 taxa, 14 stars, official common-name strings including order-level names and Hydrophilidae / Coccinellidae / Zopheridae / Pentatomidae) |
| `RULES_2027.md` | **Updated** to official `may`/`will`/`may include`/`e.g.`/`such as`, cheat-sheet/scoring facts, and aligned list pointer |
| `CURRICULUM_2027.md` | **Factual statements updated** (authority, stars, order names, family strings, keys in scope, life cycles not named) |
| `QUESTION_BANK_BLUEPRINT_2027.md` | Planning notes updated so they no longer say TAXON_LIST is unaligned |
| `SOURCE_INGESTION_2027.md` | Updated to record alignment |
| `QUESTION_BANK_QA_2027.md` | **Unchanged** — still describes pre-alignment QA of q1–q60 |
| `lib/mock/entomology-questions.ts` | **Unchanged** — several items still use pre-alignment wording (q12, q20, q32, q36, q50) |
| Samples | Not official rules | unchanged |

**53 taxa:** scientific-name count **matches**. Secondary list copy now **matches official strings and stars**. Remaining ambiguity: star meaning; keys **may** vs **will**; “insects” vs Entognatha/Ixodidae; bank exact-string items not yet re-QA’d.

---

## 9. Blueprint capacity (see also blueprint header)

The **135** figure is a **product planning ceiling**, not an official question count.

From official evidence alone, verified items can grow in **taxonomy + name-only keys + name-only comparison** only. Correlated biology and visual-id stay empty until `FACTUAL_SOURCE_NEEDED` / `IMAGE_SOURCE_NEEDED` sources exist. **Do not invent** to reach 135.

---

## 10. Readiness

| Metric | Value |
|---|---|
| Official taxon count | **53** |
| Official sources in hand | `RULES_2027_OFFICIAL.md` (`OFFICIAL_RULES` + `OFFICIAL_LIST`) |
| q1–q60 statuses changed | **0** |
| Supported list/key items | **23** |
| Human-review among previously verified | **4** (q20, q32, q36, q50) |
| Factual-source items | **24** |
| Image items | **9** |
| Official life-cycle domain | **No** |
| Star meaning | **Undefined** |

### Recommended next content step

1. **Re-QA q1–q60** against aligned official strings (q12, q20, q32, q36, q50 first). Still do not invent biology. Do not skip this step.
2. Then author **additional list-literacy and name-only keys only**.
3. In parallel, acquire factual sources and licensed images before filling correlated or visual slots.

Do **not** skip the string/QA step. Do **not** treat 135 as a mandate to invent ecology.
