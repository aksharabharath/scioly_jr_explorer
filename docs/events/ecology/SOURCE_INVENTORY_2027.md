# Ecology 2027 — Source Inventory

**This document extracts `docs/events/ecology/RULES_2027.md`. It is not a question bank, not an ecology textbook, and not permission to author questions yet.**

| File | Role |
|---|---|
| `RULES_2027.md` | **Primary source.** Official 2027 Ecology event-scope authority for this project. |
| This file | Explicit extraction only. No textbook facts. No older Science Olympiad years. No Water Quality or Entomology rules. |

Do not generate questions from this file.

---

## 0. How to read this inventory

### Authority

Only statements in `docs/events/ecology/RULES_2027.md` are treated as official for this pass.

If a field is absent from that file, it is recorded as **`NOT STATED`**. Gaps are not filled from general knowledge, from the Jr. Explorer catalog blurb, or from any other event.

### What this inventory must not import

| Source | Why it is not Ecology 2027 official text |
|---|---|
| `docs/events/water_quality/RULES_2027.md` | Different event. Its Freshwater Ecology heading is Water Quality scope. |
| `docs/events/entomology/RULES_2027_OFFICIAL.md` | Different event. Insect “ecology” is Entomology correlated content. |
| Another year’s Ecology Expert (or similar) | Different year. Pipeline forbids filling 2027 gaps from another year. |
| `lib/mock/events.ts` catalog copy | Product metadata. Not competition rules. |

### Evidence labels (scope vs fact)

| Label | Meaning |
|---|---|
| `RULES-SCOPE` | The rules say this topic, skill, list, or format **can or will be tested**. Does **not** by itself verify a scientific answer. |
| `SOURCE-VERIFIED` | The answer text is fully supplied by the rules file (a printed name, sequence, logistics sentence). |
| `SOURCE-NEEDED` | In scope, but the rules do not supply the factual detail needed to verify a question. |
| `IMAGE-SOURCE-NEEDED` | Visual or data-asset interpretation is in scope (or implied), but this repo has no usable asset cited in the rules. |
| `HUMAN-REVIEW` | Official wording is ambiguous, oddly spelled, or combinable in more than one reasonable way. |

A row may carry both a **scope** label and a **fact** label.

**Scope is not evidence of biology.** Naming “10% rule,” “IUCN Red List,” or “eutrophication” puts those **names** in scope. It does not define the mechanism, categories, or numbers.

### Open vs closed wording

| Rules wording | How this inventory treats it |
|---|---|
| Named sequence / pair with no `e.g.` / `ex.` / `etc.` / `such as` | Printed names are in scope. Treat as **closed for those printed strings** unless noted as `HUMAN-REVIEW`. Do not add siblings. |
| **e.g.** / **ex.** / **such as** / **etc.** / **e.t.c** | Open-ended examples. Named items are in scope as names. **Not** a complete catalog. Do **not** invent missing items as if they were official. |
| **including** | Named inclusion is in scope (e.g. acid rain under acid deposition). |
| **will** | Stated requirement (format, question count, materials ban, scoring, emphasized skills). |
| **may** | Optional (further tiebreaker by submit time). |

Preserve official spellings (`v.s.`, `e.t.c`, `savannah`, `Conservationist`).

---

## 1. Official source identity

| Field | Extraction | Stated? | Evidence |
|---|---|---|---|
| Document title | **ECOLOGY RULES 2027** | Stated | `SOURCE-VERIFIED` |
| Event name | Body never restates a longer official title | Stated as **ECOLOGY** in the title | `SOURCE-VERIFIED` |
| Season / year | Title 2027 | Stated in title | `SOURCE-VERIFIED` as document year only |
| Publisher / tournament (ESO, state, national) | — | **NOT STATED** | — |
| Division (A/B/C) | — | **NOT STATED** | — |
| Exact file | `docs/events/ecology/RULES_2027.md` | Path used | — |

**Project event ID (not a rule):** `ecology`.

---

## 2. Event logistics

| Topic | Extraction (exact sense of `RULES_2027.md`) | Stated? | Evidence |
|---|---|---|---|
| Number of participants | “A TEAM OF UP TO: 2” | Stated | `SOURCE-VERIFIED` |
| Approximate time | “APPROXIMATE TIME: 30 minutes” | Stated | `SOURCE-VERIFIED` |
| Competition format | “This test will occur **online** and consist of **thirty questions**.” | Stated | `SOURCE-VERIFIED` |
| Item type (MCQ vs other) | — | **NOT STATED** | Do not assume multiple choice |
| Allowed materials | “External materials will not be allowed.” | Stated: **none** | `SOURCE-VERIFIED` |
| Cheat sheet / notes / calculator | — | **NOT STATED** (ban on external materials is the only materials rule) | — |
| Collaboration / room / devices | — | **NOT STATED** | — |
| Description | “Students will answer questions involving **content knowledge** and **process skills** in the area of **ecology and adaptations** in **featured North American biomes**.” | Stated | `RULES-SCOPE` |
| Scoring | “Highest score wins.” | Stated | `SOURCE-VERIFIED` |
| Point values | — | **NOT STATED** | — |
| Tiebreakers | “Selected questions will be used to break ties.” | Stated as a method | `SOURCE-VERIFIED`; **which** questions **NOT STATED** |
| Further tiebreaker | “Time that the test was submitted **may** be taken into account as a further tiebreaker.” | Stated as **may** | `RULES-SCOPE` |

**HUMAN-REVIEW:** “featured North American biomes” vs the later **open** major-biome example list (includes rainforests, taiga, etc.). The rules do not name which biomes are “featured,” nor whether every example biome must be treated as North American.

---

## 3. Official topic / content scope

The competition body is a nested outline under **THE COMPETITION**. It also **will emphasize** four process skills.

### 3.1 Process skills (event-wide)

Exact: “The event **will emphasize** these process skills as they apply to ecology: **defining variables**; **analyzing data from graphs and tables**; **forming hypotheses**; **making predictions**.”

| Scope statement | Closed? | Evidence |
|---|---|---|
| Four named process skills **will** be emphasized | Closed as those **four skill names** | `RULES-SCOPE` + `SOURCE-VERIFIED` (names) |
| How to define a variable, form a hypothesis, or make a prediction | Not defined | `SOURCE-NEEDED` |
| Graphs and tables to analyze | Contest **will emphasize** analyzing data from graphs and tables | `RULES-SCOPE` + `IMAGE-SOURCE-NEEDED` (no graphs/tables in the rules file) |

### 3.2 Three top-level content headings

As printed (hyphen bullets in the source):

1. **General Principles of Ecology**
2. **Terrestrial Ecosystems**
3. **Human Impact on Ecosystems**

| Scope statement | Closed? | Evidence |
|---|---|---|
| These three headings structure the competition content | Closed as the three printed headings | `RULES-SCOPE` + `SOURCE-VERIFIED` (headings) |
| Nested bullets under each heading | In scope as printed | See §4–§6. Nested `e.g.` / `etc.` lists are **open** at that level |

Aquatic/marine ecosystems as a fourth heading: **NOT STATED** (description is terrestrial biomes + general ecology + human impact). Do not import Water Quality freshwater content.

---

## 4. General Principles of Ecology — nested extraction

Parent line: “Food webs and trophic pyramids, nutrient cycling, community interactions”

Then nested items (exact sense):

### 4.1 Levels of ecological organization

Exact: “Levels of ecological organization: Individual → Population → Community → Ecosystem → Biome → Biosphere”

| Property | Record |
|---|---|
| Printed levels (6) | Individual; Population; Community; Ecosystem; Biome; Biosphere |
| Closed? | **Yes** for this sequence as printed (arrows; no `e.g.`) |
| Definitions of each level | **NOT STATED** → names `SOURCE-VERIFIED`; meanings `SOURCE-NEEDED` |
| Whether order is required | Sequence is printed with arrows; pedagogical meaning of the arrows `SOURCE-NEEDED` |

### 4.2 Energy and nutrient transfer (`e.g.`)

Exact: “Rules of energy and nutrient transfer in ecosystems (e.g., 10% rule, Pyramids of number, biomass, and energy, Biogeochemical cycles)”

| Named example | Closed catalog? |
|---|---|
| 10% rule | **No** (`e.g.`) — name in scope |
| Pyramids of number, biomass, and energy | **No** (`e.g.`) — three pyramid **names** in scope |
| Biogeochemical cycles | **No** (`e.g.`) — topic name in scope; **which** cycles **NOT STATED** |

Facts (what 10% means, pyramid shapes, which cycles, equations): `SOURCE-NEEDED`.

### 4.3 Ecological succession

Exact: “Types of ecological succession (Primary v.s. Secondary, Climax communities, Seral stages)”

| Property | Record |
|---|---|
| Printed strings | Primary; Secondary; Climax communities; Seral stages |
| `e.g.`? | **No** |
| Grouping | `HUMAN-REVIEW`: primary vs secondary are “types”; climax and seral stages are related succession terms, not clearly the same kind of “type” |
| Spelling | **v.s.** as printed |
| Definitions | `SOURCE-NEEDED` |

### 4.4 Community interactions

Exact: “Community Interactions: Symbiosis, Competition (Intraspecific vs. Interspecific, etc.), Predation and herbivory dynamics”

| Named item | Closed? |
|---|---|
| Symbiosis | Named; subtypes (mutualism, etc.) **NOT STATED** |
| Competition: Intraspecific vs. Interspecific | Pair named; **etc.** makes further competition types **open** |
| Predation and herbivory dynamics | Named; mechanisms **NOT STATED** |

All underlying interaction biology: `SOURCE-NEEDED`.

### 4.5 Population dynamics

| Printed line | Open vs closed | Facts in rules? |
|---|---|---|
| Carrying capacity (*K*): Overshoot, Dieback, **etc.** | *K* named; overshoot/dieback examples **open** (`etc.`) | Meanings `SOURCE-NEEDED` |
| Limiting factors: Density-dependent vs. Density-independent | Two named classes; examples of each **NOT STATED** | Class **names** `SOURCE-VERIFIED`; examples `SOURCE-NEEDED` |
| Dispersion patterns | Named topic | Pattern names (clumped, etc.) **NOT STATED** → `SOURCE-NEEDED` |
| Life tables | Named topic | How to read one `SOURCE-NEEDED`; tables themselves `IMAGE-SOURCE-NEEDED` if used as data |
| Survivorship curves | Named topic | Types I/II/III **NOT STATED** → `SOURCE-NEEDED` |
| Life history strategies (*r*-selected vs. *K*-selected) | Two named strategies | Names `SOURCE-VERIFIED`; trait lists `SOURCE-NEEDED` |
| Growth models (Logistic, Exponential, Doubling time) | Three names in parentheses; no `e.g.` | **Names** appear closed; **equations / doubling-time formula** `NOT STATED` → `SOURCE-NEEDED` |

### 4.6 Extinction, selection, and migration

| Printed line | Open vs closed | Facts in rules? |
|---|---|---|
| Immigration and Emigration: Gene flow, Open vs. closed populations | Named | Definitions `SOURCE-NEEDED` |
| Types of selection (Directional, stabilizing, disruptive, sexual) | Four names; no `e.g.` | **Names** appear closed; definitions `SOURCE-NEEDED` |
| Adaptations (Morphological, physiological, behavioral) | Three names; no `e.g.` | **Names** appear closed; examples `SOURCE-NEEDED` |
| Speciation (Allopatric vs. Sympatric) | Two names; no `e.g.` | **Names** appear closed; do **not** add other speciation modes as official |
| Adaptive radiation | Named | `SOURCE-NEEDED` |
| Convergent vs. divergent evolution | Named pair | `SOURCE-NEEDED` |
| Mass extinction events | Named topic | Which events, dates, causes **NOT STATED** → `SOURCE-NEEDED` |
| Genetic Drift | Named | `SOURCE-NEEDED` |

---

## 5. Terrestrial Ecosystems — nested extraction

### 5.1 Climate and biome distribution (`etc.`)

Exact: “Climate and Biome Distribution (Coriolis effect, Rain shadow effect, etc.)”

Coriolis effect and rain shadow effect are **named examples**. List is **open** (`etc.`). Mechanisms `SOURCE-NEEDED`.

### 5.2 Major terrestrial biomes (`ex.` / `e.t.c`)

Exact: “Major terrestrial biomes (ex. Rainforests, taiga, tundra, desert, boreal forest, savannah, e.t.c)”

| Named example | Notes |
|---|---|
| Rainforests | Spelling **Rainforests** |
| taiga | — |
| tundra | — |
| desert | — |
| boreal forest | Overlap with taiga is `HUMAN-REVIEW` (both printed) |
| savannah | Spelling **savannah** as printed |

List is **open** (`ex.` and `e.t.c`). Do not invent additional biome names as official. Grasslands appear in the **next** bold line, not in this example list.

**HUMAN-REVIEW:** description says **featured North American biomes**; this example list is not labeled North American and includes rainforests.

### 5.3 Ecology of Deserts and Grasslands (bold)

Exact: “**Ecology of Deserts and Grasslands** (e.g., Desert/Grassland types, Adaptations of plants and animals)”

| Property | Record |
|---|---|
| Emphasis | **Bold** in the source (only content heading printed bold besides section labels) |
| Examples | Desert/Grassland **types**; plant and animal **adaptations** — **open** (`e.g.`) |
| Which desert/grassland types | **NOT STATED** |
| Which adaptations | **NOT STATED** → `SOURCE-NEEDED` |
| Relation to “featured North American biomes” | `HUMAN-REVIEW` (likely emphasis; not explicitly equated) |

### 5.4 Biodiversity concepts (`e.g.`)

Exact: “Understand basic concepts of biodiversity (e.g., importance, different types)”

**Open** examples: importance; different types. Type names (genetic, species, ecosystem, etc.) **NOT STATED**. Facts `SOURCE-NEEDED`.

### 5.5 Ecosystem services

Exact: “Importance and Ecosystem Services (Provisioning, Regulating, Supporting, Cultural)”

| Property | Record |
|---|---|
| Four printed names | Provisioning; Regulating; Supporting; Cultural |
| Closed? | **Yes** as those four **names** (no `e.g.`) |
| Definitions / examples of each | **NOT STATED** → `SOURCE-NEEDED` |

---

## 6. Human Impact on Ecosystems — nested extraction

### 6.1 Climate change (`e.g.`)

Exact: “Climate change (e.g., Greenhouse gases, Ocean acidification)”

Named examples **open**. Which gases, mechanisms, chemistry of acidification: `SOURCE-NEEDED`.

### 6.2 Habitat destruction and fragmentation

Exact: “Habitat destruction & Fragmentation (Deforestation, Urbanization, Wetland drainage, Agricultural expansion)”

Four named processes; no `e.g.` / `such as`.

| Property | Record |
|---|---|
| Named processes | Deforestation; Urbanization; Wetland drainage; Agricultural expansion |
| Exhaustive? | `HUMAN-REVIEW` (no `e.g.`, but not labeled “limited to”) |
| Safe use | Those four **names** are in scope. Do not add extra process names as if official. Mechanisms `SOURCE-NEEDED` |

### 6.3 Invasive species

Exact: “Invasive species: Characteristics (Life history strategy, diet, tolerance, predator presence), Impact mechanisms (e.g., Competitive exclusion, habitat alteration, pathogen vectoring), Control methods (Biological, Chemical, Mechanical, Cultural)”

| Part | Closed? | Printed names |
|---|---|---|
| Characteristics | Four names; no `e.g.` — treat **names** as closed | Life history strategy; diet; tolerance; predator presence |
| Impact mechanisms | **Open** (`e.g.`) | Competitive exclusion; habitat alteration; pathogen vectoring |
| Control methods | Four names; no `e.g.` — treat **names** as closed | Biological; Chemical; Mechanical; Cultural |

All biological detail, named example species, and how each control method works: `SOURCE-NEEDED`. No official invasive-species list.

### 6.4 Overexploitation (`such as`)

Exact: “Overexploitation such as overfishing, hunting, and resource depletion”

**Open** (`such as`). Three named examples in scope. Do not treat as a complete catalog.

### 6.5 Acid deposition, chemical contamination, related processes

Exact parent: “Acid deposition (including acid rain) and chemical contamination (pollution)”

Nested:

- Biomagnification
- Bioaccumulation
- Eutrophication (e.g., Stages, Causes)

| Item | Notes |
|---|---|
| Acid rain | Explicitly **including** acid deposition |
| Biomagnification / bioaccumulation | Named; definitions and distinction `SOURCE-NEEDED` |
| Eutrophication stages and causes | **Open** (`e.g.`); actual stages/causes **NOT STATED** |

### 6.6 Soil erosion

Exact: “Soil erosion: Water/wind erosion, desertification, loss of topsoil, salinization”

Named processes; no `e.g.` Treat **names** as in scope. Definitions `SOURCE-NEEDED`.

### 6.7 Alternative energy

Exact: “The pros and cons of using alternative energy and its effect on the environment” plus “Solar, hydroelectric, wind, geothermal, biomass, and nuclear energy”

| Property | Record |
|---|---|
| Six printed types | Solar; hydroelectric; wind; geothermal; biomass; nuclear |
| Closed? | **Yes** as those six **names** for this bullet (no `e.g.`) |
| Pros, cons, environmental effects | Required in scope; **NOT STATED** in the rules → `SOURCE-NEEDED` |

### 6.8 Conservation biology and IUCN Red List

Exact: “Understand the goals of conservation biology and the IUCN Red List for conservation status”

Nested:

- Conservationist strategies
- Habitat restoration
- Wildlife preservation
- Captive breeding programs
- Endangered and threatened species
- Reclamation vs. Reintroduction

| Property | Record |
|---|---|
| IUCN Red List | **Named**; status category names (CR, EN, VU, …) **NOT STATED** → `SOURCE-NEEDED` |
| “Conservationist” vs conservation | Preserve **Conservationist** as printed; `HUMAN-REVIEW` if normalizing |
| Reclamation vs. Reintroduction | Pair named; definitions `SOURCE-NEEDED` |
| Goals of conservation biology | Required in scope; actual goals text **NOT STATED** → `SOURCE-NEEDED` |

No official species list of endangered/threatened taxa.

---

## 7. Named lists (summary)

### Appears closed (printed names only; facts still `SOURCE-NEEDED` unless the name itself is the answer)

1. Four process skills (will emphasize)
2. Three top-level content headings
3. Six organizational levels (arrow sequence)
4. Density-dependent vs density-independent (class **names**)
5. *r*-selected vs *K*-selected (strategy **names**)
6. Logistic, Exponential, Doubling time (model **names**)
7. Four selection types
8. Three adaptation categories
9. Allopatric vs. Sympatric
10. Four ecosystem service names
11. Four invasive-species characteristic names
12. Four control-method names
13. Six alternative-energy type names

### Explicitly open (`e.g.` / `ex.` / `such as` / `etc.` / `e.t.c`)

Energy-transfer examples; *K* overshoot/dieback **etc.**; competition **etc.**; climate/biome **etc.**; major biomes **ex.**/**e.t.c**; desert/grassland types; biodiversity importance/types; climate-change examples; invasive **impact** mechanisms; overexploitation **such as**; eutrophication stages/causes.

### Not present

No taxon table, no official biome map, no IUCN category table, no chemical formula sheet, no sample graph.

---

## 8. Named substances / organisms / measurements

| Kind | What the rules name | Extra detail in rules? |
|---|---|---|
| Organisms | None as a closed species list. “Endangered and threatened species” as a topic. Plants/animals under desert/grassland adaptations (unnamed). | No species names |
| Substances | Greenhouse gases (as an `e.g.` under climate change); “chemical contamination (pollution)” | Which gases, which chemicals **NOT STATED** |
| Measurements / models | 10% rule (example name); doubling time (model name); *K* | No equations, units, or numeric thresholds |
| Places / biomes | Featured North American biomes (unnamed set); example biome names in §5.2; deserts and grasslands (bold) | No map |

IUCN is named as a **list for conservation status**, not reproduced.

---

## 9. Numerical / formula requirements

Preserve exact wording. **Do not invent.**

| Item | In `RULES_2027.md`? |
|---|---|
| Team size | “up to: 2” |
| Time | “30 minutes” (approximate) |
| Question count | “thirty questions” |
| “10% rule” | Named as an **e.g.** under energy/nutrient transfer; **not defined** |
| Doubling time | Named as a growth-model item; **formula NOT STATED** |
| Logistic / exponential | Named; **equations NOT STATED** |
| Other formulas | **NOT STATED** |
| Numeric standards / IUCN criteria numbers | **NOT STATED** |
| Scoring point values | **NOT STATED** |

Any percentage, equation, or cutoff used in a future question is **`SOURCE-NEEDED`** until an inspected source supplies it — including the usual meaning of the 10% rule.

---

## 10. Image / data / diagram requirements

| Medium | Rules language | Contest vs assets in this repo |
|---|---|---|
| Graphs | Process skills **will emphasize** “analyzing data from **graphs** and tables” | In scope as a skill. **No graph assets** in the rules. `IMAGE-SOURCE-NEEDED` |
| Tables | Same sentence, “tables” | Same. Life tables also named under population dynamics. `IMAGE-SOURCE-NEEDED` if a table must be read |
| Sample data | **NOT STATED** as a separate phrase (unlike Water Quality) | Implied by graph/table analysis |
| Maps (biome distribution) | Climate and biome distribution in scope | No map supplied. `IMAGE-SOURCE-NEEDED` if a map is required |
| Photos of organisms / biomes | **NOT STATED** | Desert/grassland adaptations could be text-first |
| Required labeled diagrams (pyramids, webs, cycles) | Food webs and trophic pyramids named as topics | Diagrams not supplied. `IMAGE-SOURCE-NEEDED` if the item is visual |
| IUCN list pages | Red List named | No status table in the rules. Category facts `SOURCE-NEEDED` |

**We currently possess a usable Ecology graph/table/map asset in this rules file:** **No.**

---

## 11. Sample-test references

**NOT STATED.** No sample test, station, or packet is named.

---

## 12. Explicit source / reference requirements

**NOT STATED** except that students must understand **IUCN Red List** for conservation status — the Red List itself is not printed. Allowed materials: external materials **will not** be allowed, so a contest-day IUCN printout is **not** an official allowance in this file.

---

## 13. Ambiguities (`HUMAN-REVIEW`)

| Item | Issue |
|---|---|
| Featured North American biomes | Set never listed; may or may not limit the open biome `ex.` list |
| taiga vs boreal forest | Both printed as biome examples |
| Rainforests vs North American focus | Example list vs description |
| Succession parenthetical | Types vs climax/seral grouping; **v.s.** spelling |
| Habitat destruction four names | Exhaustive vs examples without `e.g.` |
| Conservationist | Official spelling vs “conservation” |
| savannah | Official spelling vs “savanna” |
| Item type | Whole-test format **NOT STATED** (not MCQ in this file) |
| Bold deserts/grasslands | Featured emphasis vs equal to other biomes |

Do not silently “correct” spellings in a future bank without a decision.

---

## 14. Source gaps (cannot safely author from the rules alone)

| Gap | Why it matters | What would resolve it (once inspected) |
|---|---|---|
| Definitions of almost every named concept | Rules are an outline of **names** | Authoritative ecology sources (e.g. OpenStax, EPA, USGS, IUCN about pages) **after inspection** |
| 10% rule, pyramids, biogeochemical cycles | Named only as `e.g.` | Same; do not invent which cycles |
| Graph/table items | Skill **will** be emphasized | Real graphs/tables with provenance, or defer |
| IUCN categories and example species | Red List named, not reproduced | Official IUCN category definitions; species only if separately sourced and in scope |
| Desert/grassland types and adaptations | Bold + `e.g.` | Sourced biome/adaptation facts; keep North American `HUMAN-REVIEW` |
| Alternative energy pros/cons | Required; none stated | Sourced energy/environment references |
| Mass extinction events | Topic named; no events listed | Do not pick events from memory |
| Invasive example species | No list | Do not invent a “usual” invasive list |
| Formulas (growth, doubling time) | Models named | Do not invent equations |

Do **not** treat OpenStax/EPA/IUCN as evidence until those sources are actually inspected in Phase 2.

---

## 15. MVP recommendation (authorability, not a quota)

This is **not** a 135-item target. No questions in this pass.

| Bucket | Estimate from **this file only** |
|---|---|
| **Immediately authorable from rules alone** | Thin: logistics sentences; the six-level sequence **as printed**; matching printed **names** to headings (e.g. which heading contains “IUCN Red List”); closed **name** pairs (allopatric vs sympatric; four service names; six energy types; four control methods). On the order of **~10–20** careful text items if limited to name-recognition of the outline. **Not** enough for a 40-item verified bank. |
| **Likely authorable after external factual sources** | Most of the outline: definitions, distinctions, simple applications. Size depends on sources, **not** on a quota. Target later remains ~35–50 text-first if evidence quality holds. |
| **Blocked until graphs/tables/maps exist** | Process-skill items that require reading a graph or table; biome-map distribution items. |
| **Blocked pending human review** | North American “featured” biome set; taiga/boreal; rainforest examples; succession grouping; spellings. |

**Recommendation:** keep the first bank **text-first**. Do **not** invent biome lists, IUCN categories, formulas, or graph stems. A smaller verified set is preferable to an unsupported ~40.

**Exact next step after this pass:** Phase 2 — `EVIDENCE_MATRIX_2027.md` mapping each named requirement to rules-scope vs factual sources. Still **no questions**. Ecology stays **locked**.

---

## 16. Related files

- `docs/events/ecology/RULES_2027.md` — sole official source for this inventory
- `docs/events/ecology/CURRICULUM_2027.md` — knowledge/skill extraction from the same file
