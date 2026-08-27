# Anatomy and Physiology 2027 — Question Bank Blueprint

**Planning document only.** This is not a question bank, not official Science Olympiad rules, and not an instruction to generate items in this pass.

Do not invent anatomy, histology, origins/insertions, disease signs, treatments, hormone mechanisms, radiology findings, or classification grades. Where the curriculum requires a topic but the rules do not provide the fact, the slot is **`SOURCE NEEDED`**. Do not fill it from general medical knowledge.

There is **no current A&P question bank**. `anatomy-physiology` is a catalog event without practice items. Do not treat Entomology or Astronomy items as A&P coverage.

| In-repo source | Role in this blueprint |
|---|---|
| `RULES_2027.md` | Authoritative 2027 rules (scope, closed lists, muscle list) |
| `SOURCE_INVENTORY_2027.md` | Explicit extraction; evidence labels |
| `CURRICULUM_2027.md` | Systems, 28 major areas, 35 skills, named-entity inventories |

Do not modify those files in this pass. Do not create questions, question IDs, choices, answers, explanations, hints, difficulty ratings, or verification statuses.

---

## 1. Target bank size

| Metric | Value |
|---|---|
| **Planning target** | **135** |
| Minimum acceptable | **120** |
| Maximum acceptable | **150** |

135 is a **planning target**, not a license to invent biology. Land anywhere in 120–150 if `SOURCE NEEDED` slots cannot be filled. A verified 120-item bank is better than 135 with unsourced treatments or origins.

**Why ~135 (not hundreds, not ~60):**

- 28 official muscles + 49 named conditions + three systems with 28 major areas. A 10-question session from a ~48-item bank (Astronomy-sized) would repeat too fast.
- Official skills include labeling, distinction (OA vs RA), classification (burns, Salter-Harris), physiology, and closed-list disease knowledge. That mix needs room without one flashcard per fact.
- **198 knowledge items** in the curriculum are not 198 questions. Many are the same topic at different grains. Duplicate-control (§9) forbids that expansion.

**Honest authoring capacity today**

| Band | Count at 135 | What it is |
|---|---|---|
| **Tier A — can author from rules/list now** | **24** | Muscle-list literacy; closed-list membership; named scope limits; named categories (three systems, three muscle types, named function *examples as in-scope topics*, named imaging *modalities as required formats*) |
| **Tier B/C — planned, `SOURCE NEEDED`** | **111** | Almost all anatomy, physiology, disease biology, treatments, imaging interpretation, origin/insertion/function |
| **Total** | **135** | |

Do **not** write “according to the 2027 rules, which function is listed…” as science practice. Tournament-meta trivia is not Jr. Explorer content. Tier A science is **list literacy and scope**, not rules-citation quizzes.

If reference sources and images never arrive, **stop after the ~24 Tier A items**. Do not pad.

---

## 2. Curriculum allocation

Weighting (not even splits):

- **Skeletal slightly heaviest (48)** because the rules uniquely require bone labeling on diagram/X-ray/CT/MRI, radiological disease features, OA vs RA distinction, and Salter-Harris.
- **Muscular next (47)** because 28 listed muscles need repeated, *varied* practice (not 28 name flashcards).
- **Integumentary (40)** because of a large closed condition list plus required treatments/prevention — most of that is still `SOURCE NEEDED`.

“Authorable now?” means Tier A facts exist **in the rules/list**. It does **not** mean the area’s target can be filled now.

**Current bank coverage = 0 everywhere. Remaining = target.**

### 2.1 Integumentary (40)

| Curriculum area | Rule section | Subareas / concepts | Target | Now | Remaining | Authorable now? |
|---|---|---|---|---|---|---|
| INT-i Functions | 1.i | Six named function examples | **4** | 0 | 4 | **Partial (1).** Names of examples are in-scope. Mechanisms `SOURCE NEEDED` (3). |
| INT-ii Skin layers | 1.ii | Layers; anatomy; histology | **6** | 0 | 6 | **No.** Layer names and histology `SOURCE NEEDED`. |
| INT-iii Components | 1.iii | Hair; nails; glands; receptors; eccrine vs apocrine | **8** | 0 | 8 | **No** for facts. “Eccrine vs apocrine” is a named contrast; distinguishing biology `SOURCE NEEDED`. |
| INT-iv Characteristics | 1.iv | Color; texture; aging | **3** | 0 | 3 | **No.** |
| INT-v Features | 1.v | Six named feature examples | **3** | 0 | 3 | **Partial (1)** for “these names are in-scope examples.” Definitions `SOURCE NEEDED` (2). Cap at 3 so this does not become six flashcards. |
| INT-vi Conditions | 1.vi | Wounds (limited); allergens (e.g.); HPV; 9 infections; 2 inflammatory; 5 cancers; cell-to-person | **12** | 0 | 12 | **Partial (4)** list membership + wounds-limit. Clinical facts `SOURCE NEEDED` (8). |
| INT-vii Treatments / prevention | 1.vii | Required for listed INT conditions; drugs/surgery as examples only | **4** | 0 | 4 | **No.** Requirement is explicit; every specific treatment `SOURCE NEEDED`. |
| **Integumentary total** | | | **40** | **0** | **40** | **~6 Tier A; 34 `SOURCE NEEDED`** |

### 2.2 Skeletal (48)

| Curriculum area | Rule section | Subareas / concepts | Target | Now | Remaining | Authorable now? |
|---|---|---|---|---|---|---|
| SKL-i Axial / appendicular / imaging | b.i | Axial; appendicular; surface anatomy; diagram; X-ray; CT; MRI | **9** | 0 | 9 | **Partial (1)** that those formats/categories are required. Bone names, landmarks, and image interpretation `SOURCE NEEDED`. Most slots **image REQUIRED**. |
| SKL-ii Joints | b.ii | Names, structure, function; muscle/tendon/ligament attachments; ROM; ball-and-socket example | **6** | 0 | 6 | **Partial (1)** ball-and-socket as a named example. Other type names and all structure/ROM facts `SOURCE NEEDED`. Do not invent a closed joint-type catalog from “e.g.” |
| SKL-iii Bone / cartilage biology | b.iii | Bone, marrow, cartilage structure/micro function; storage; osteon; blood cell production | **4** | 0 | 4 | **Partial (1)** that osteon / storage / blood cell production are named examples. Mechanisms `SOURCE NEEDED`. |
| SKL-iv Ca / phosphate | b.iv | Calcium balance; phosphate balance | **2** | 0 | 2 | **No** for mechanisms. |
| SKL-v Hormones | b.v | PTH; vitamin D; estrogen; effect on skeleton | **4** | 0 | 4 | **Partial (1)** that these three are named examples affecting the skeleton. Mechanisms `SOURCE NEEDED`. |
| SKL-vi Cellular / RANKL | b.vi | Cellular composition of bone, marrow, cartilage; RANKL and bone-cell maturation | **3** | 0 | 3 | **Partial (0–1)** RANKL is named. Cell-type names and mechanisms `SOURCE NEEDED`. Do not add osteoblast/osteoclast/etc. from general knowledge. |
| SKL-vii Development | b.vii | Development and maturation; cellular and gross levels | **2** | 0 | 2 | **No.** |
| SKL-viii Vertebrae | b.viii | Types; cervical, thoracic, lumbar as examples | **3** | 0 | 3 | **Partial (1)** the three named examples. Distinguishing anatomy `SOURCE NEEDED`. Do not add sacral/coccygeal. |
| SKL-ix Diseases | b.ix | 13 listed conditions; cell-to-person; radiological features; **distinguish OA vs RA** | **8** | 0 | 8 | **Partial (2)** list membership. OA vs RA distinction **skill** is rules-backed; **criteria** `SOURCE NEEDED`. Radiology `SOURCE NEEDED` + images. |
| SKL-x Exercise / aging | b.x | Effects on skeleton and on listed diseases | **2** | 0 | 2 | **No.** |
| SKL-xi Fractures | b.xi | Fractures; Salter-Harris; causes; treatments | **5** | 0 | 5 | **Partial (1)** that Salter-Harris is the named system. Grades, causes, treatments `SOURCE NEEDED`. |
| **Skeletal total** | | | **48** | **0** | **48** | **~8 Tier A; 40 `SOURCE NEEDED`** |

### 2.3 Muscular (47)

| Curriculum area | Rule section | Subareas / concepts | Target | Now | Remaining | Authorable now? |
|---|---|---|---|---|---|---|
| MUS-i Functions | c.i | Movement; blood circulation; heat production (e.g.) | **2** | 0 | 2 | **Partial (1).** Mechanisms `SOURCE NEEDED`. |
| MUS-ii Skeletal–muscular interaction | c.ii | Movement; posture | **2** | 0 | 2 | **No** for how. |
| MUS-iii Muscle types | c.iii | Skeletal, cardiac, smooth; cellular and gross anatomy | **5** | 0 | 5 | **Partial (1)** three types are named (not e.g.). Anatomy facts `SOURCE NEEDED`. |
| MUS-iv Tension | c.iv | Tension; length-tension; twitches; motor units | **4** | 0 | 4 | **No** for physiology. Named concepts only. |
| MUS-v Contraction / relaxation | c.v | Contraction; relaxation; NMJ; ECC; cross-bridge cycling | **6** | 0 | 6 | **No** for steps. High-value **after** a physiology source. |
| MUS-vi Actions | c.vi | Agonist; antagonist; synergist of **listed** muscles | **5** | 0 | 5 | **No** for pairings. Concepts named; which listed muscles play which role `SOURCE NEEDED`. |
| MUS-vii List: location / ID / origin / insertion / function | c.vii + 2027 list | 28 names; four printed groups | **14** | 0 | 14 | **Partial (6)** names and group headings are `LIST-SUPPORTED`. Origin/insertion/function/location facts `SOURCE NEEDED`. Diagram muscle ID is **not** a rules-stated skill (see curriculum). |
| MUS-viii Exercise / aging | c.viii | Cellular and gross effects | **2** | 0 | 2 | **No.** |
| MUS-ix Injuries | c.ix | Limited to strains and sprains; prevention | **3** | 0 | 3 | **Partial (1)** the limit. Distinguishing facts and prevention methods `SOURCE NEEDED`. |
| MUS-x Diseases | c.x | 11 listed conditions in four limited groups; cell-to-person | **4** | 0 | 4 | **Partial (1)** list/group membership. Clinical facts `SOURCE NEEDED`. Treatments **not** restated for this list. |
| **Muscular total** | | | **47** | **0** | **47** | **~10 Tier A; 37 `SOURCE NEEDED`** |

### 2.4 System totals (must sum to 135)

| System | Target | Share | Now | Remaining | Of which Tier A now | Of which `SOURCE NEEDED` |
|---|---|---|---|---|---|---|
| Integumentary | **40** | 30% | 0 | 40 | 6 | 34 |
| Skeletal | **48** | 36% | 0 | 48 | 8 | 40 |
| Muscular | **47** | 35% | 0 | 47 | 10 | 37 |
| **Total** | **135** | **100%** | **0** | **135** | **24** | **111** |

6+8+10 = 24. 34+40+37 = 111. 40+48+47 = 135.

Event logistics (Google Form, 1-minute display, paper/pencils) are **out of the science bank**. Do not allocate practice items to tournament procedure.

---

## 3. Question-type blueprint

Do **not** assign every type to every concept.

| Type | Role in this event | Approx. share of 135 | Typical homes | External need |
|---|---|---|---|---|
| Direct knowledge / recall | Official names, list groups, closed-list membership, named categories | **22** | MUS-vii groups; INT/SKL/MUS list membership | Tier A for names; Tier B for any “what is X” definition |
| Anatomy identification | Locate / name a structure | **16** | SKL-i landmarks; MUS-vii location | **Tier B + usually Tier C** |
| Diagram interpretation | Label or read a figure | **10** | SKL-i bone diagrams; later muscle/histology if sourced | **Tier C** — no fake placeholders |
| Radiology / image interpretation | Normal X-ray/CT/MRI; radiological disease features | **12** | SKL-i, SKL-ix, some SKL-xi | **Tier C** + disease/radiology source |
| Compare / contrast | Named pairs and closed look-alikes | **18** | OA vs RA (**required**); eccrine vs apocrine; chickenpox vs shingles; tennis vs golfer; MG vs LEMS; strain vs sprain; cervical/thoracic/lumbar | Criteria **Tier B**. OA vs RA skill is rules-backed; facts are not. |
| Clinical application | Cell-to-person, scenario | **14** | INT-vi, SKL-ix, MUS-x | **Tier B**. No invented symptoms. |
| Mechanism / physiology | How a required process works | **16** | MUS-iv, MUS-v, SKL-iv, SKL-v, INT-i | **Tier B** physiology/anatomy references |
| Disease / disorder recognition | Listed condition as the answer | **12** | INT-vi, SKL-ix, MUS-x | Membership **Tier A**; clinical recognition **Tier B** |
| Classification | Burns; Salter-Harris | **7** | INT-vi wounds; SKL-xi | **Tier B** (scheme/grades). Image **USEFUL / often REQUIRED**. |
| Multi-step reasoning | Combine two sourced facts | **12** | Hormone + bone disease; contraction chain; muscle action + joint ROM | **Tier B**; Level 3 only when both facts are sourced |
| Scenario-based | Movement, injury setting, aging/exercise | **10** | MUS-vi/vii, SKL-x, MUS-viii, MUS-ix | **Tier B**. Muscle pairings must be sourced. |
| **Total** | | **135** | | |

22+16+10+12+18+14+16+12+7+12+10 = **149** if treated as exclusive bins — they are **not**. Types overlap (a Salter-Harris item is classification + often image). The table is a **mix target**, not a second 135-count. Exclusive planning bins for reconciliation are difficulty, cognitive demand, system, and major area (§10).

**Types that cannot be authored until sources/images exist**

| Type | Blocker |
|---|---|
| Anatomy identification of bones/landmarks | Bone-anatomy reference; usually a diagram |
| Diagram interpretation | Licensed/original figures; no placeholders |
| Radiology interpretation | Normal and/or pathologic X-ray/CT/MRI with provenance |
| Muscle origin / insertion / function as facts | Authoritative muscle reference aligned to the **28-name** list |
| Agonist/antagonist/synergist of listed muscles | Same, plus relationship source |
| Disease mechanisms, signs, diagnosis | Disease reference; stay inside closed lists |
| Treatments / prevention | Treatment reference for **INT listed conditions** and **fractures** only, unless a later source also covers other systems |
| Hormone / RANKL / contraction mechanisms | Physiology reference |
| Burns classification grades | Named scheme + definitions |
| Salter-Harris types | Classification source; images useful |

**Types that can be authored from rules/list now (narrow)**

- Official muscle **names** and **printed group** (Head and Neck / Upper / Trunk / Lower)
- Closed-list **membership** (listed vs off-list; which grouping)
- Scope **limits** (wounds = burns/classification/sunburn; muscle/tendon injuries = strains/sprains)
- Named **categories** (three systems; three muscle types; PTH/vitamin D/estrogen as named skeletal-hormone examples — not their mechanisms)

---

## 4. Difficulty distribution

Follow 40 / 40 / 20 unless A&P clearly needs otherwise. It does not: the event mixes accessible list facts with labeling, distinction, and physiology. Keep **40 / 40 / 20**.

| Level | Target % | Count at 135 | Meaning **for this event** |
|---|---|---|---|
| **1** | 40% | **54** | Official muscle name/group; closed-list membership; named categories; a single sourced definition or one-step identification with an obvious figure |
| **2** | 40% | **54** | Sourced compare/contrast; apply one mechanism; read a typical radiograph or diagram; match a listed condition to sourced features; origin **or** insertion **or** function (not all three at once) |
| **3** | 20% | **27** | Genuine combination: OA vs RA using sourced criteria; Salter-Harris from a described or imaged fracture; contraction sequence; agonist–antagonist in a movement **using listed muscles only**; hormone effect **plus** a listed bone disease — **only when every fact is sourced** |
| **Total** | 100% | **135** | |

Level 3 is **not** obscure trivia (rare eponyms, unnamed cell markers, off-list muscles, unnamed skin layers presented as official).

If only Tier A exists, most of those 24 items are Level 1. **Do not inflate them to Level 3** by writing trick wording.

By system (reconciles with 54 / 54 / 27):

| System | L1 | L2 | L3 | Total |
|---|---|---|---|---|
| Integumentary | 16 | 16 | 8 | 40 |
| Skeletal | 19 | 19 | 10 | 48 |
| Muscular | 19 | 19 | 9 | 47 |
| **Total** | **54** | **54** | **27** | **135** |

---

## 5. Cognitive-demand distribution

The bank must **not** be recall-dominated. Closed lists and 28 names create recall pressure; cap it.

Existing Entomology author field (reuse the same vocabulary when A&P items are later typed): `recall` · `recognition` · `distinction` · `application` · `multi-step`.

| Demand | Target % | Count at 135 | Role here |
|---|---|---|---|
| `recall` | 22% | **30** | List strings, group headings, named categories — **capped** |
| `recognition` | 20% | **27** | Stem describes or shows a structure/condition → listed name |
| `distinction` | 20% | **27** | OA vs RA; similar infections; similar cancers; strain vs sprain; vertebral types; MG vs LEMS — **criteria must be sourced** except the *requirement* to distinguish OA/RA |
| `application` | 24% | **32** | Function in a setting; prevention/treatment when sourced; hormone effect; movement scenario |
| `multi-step` | 14% | **19** | Classification + anatomy; contraction chain; action + joint; exercise/aging + listed disease |
| **Total** | 100% | **30+27+27+32+19 = 135** | |

Recall + recognition = 57 / 135 ≈ **42%**. Distinction + application + multi-step = **58%**. That is the intended non-flashcard majority.

---

## 6. Source / evidence hierarchy

### Tier A — rules-backed (and list-backed)

May be used **directly**:

- Three systems in scope
- Closed “limited to” / “as listed” **membership**
- Wounds limited to burns and their classification, sunburn
- Muscle/tendon injuries limited to strains and sprains
- Named examples **as named examples** (do not treat `e.g.` as exhaustive)
- **2027 ESO Major Skeletal Muscles List**: 28 names and four group headings
- Named modalities: diagram, X-ray, CT, MRI as required **formats** for bone surface anatomy
- Named classifications **exist**: burns classification (unnamed scheme); Salter-Harris (named, undefined grades)
- Explicit skills **as requirements**: label bone surface anatomy; distinguish OA from RA; location/identification/origin/insertion/function of listed muscles

Tier A does **not** include the missing facts those requirements point to.

### Tier B — source-required

Rules require the topic; rules do not supply the fact. **Do not author the fact until a chosen authoritative reference is recorded** (later evidence matrix / source inventory update — not this pass).

Includes at least:

- Skin-layer names, anatomy, histology
- Hair types/cycle, nail anatomy, gland contrast biology, receptor types
- Color, texture, aging mechanisms
- Dermatological-feature definitions
- Disease characteristics from cell to person
- Treatments and prevention (INT listed conditions; fracture treatments)
- Axial/appendicular **bone names** and surface landmarks
- Joint-type catalog beyond the ball-and-socket example; structure; ROM; attachments
- Bone/marrow/cartilage microstructure; osteon detail; storage/blood-cell-production mechanisms
- Calcium/phosphate mechanisms
- PTH, vitamin D, estrogen mechanisms
- RANKL mechanism; bone/marrow/cartilage **cell names**
- Bone development/maturation sequences
- Vertebral distinguishing anatomy
- Exercise/aging effects
- Fracture types/causes/treatments; **Salter-Harris grades**
- Three muscle types’ cellular/gross anatomy
- Tension, twitch, motor-unit, NMJ, ECC, cross-bridge **steps**
- Origin, insertion, function, location of each listed muscle
- Agonist/antagonist/synergist **pairings**
- Strain vs sprain biology and prevention methods
- Muscular-disease biology (treatments not assumed)

### Tier C — image / reference-dependent

Cannot be live (and should not be authored as `imageRequired`) without real assets:

- Bone surface-anatomy **diagrams**
- Normal **X-ray, CT, MRI**
- Pathologic radiology for listed skeletal diseases
- Salter-Harris (and burns) classification **images**
- Skin **histology** figures
- Muscle anatomy figures (useful; **not** a rules-stated diagram skill)

**No placeholder images. No stock photos used as if they were official specimens.**

Unlabeled general knowledge is **not** a tier. It is out of bounds.

---

## 7. Muscle-list strategy

**Authoritative list: the appended 28 names.** Do not add muscles to make 30. Do not split `Extensor carpi radialis` into longus/brevis. Do not split `Iliopsoas`. Do not complete quadriceps or hamstrings from general knowledge.

### 7.1 Title discrepancy — do not resolve by guessing

| Text in `RULES_2027.md` | Status |
|---|---|
| Competition items vi–vii: **“2025 National Major Skeletal Muscles List”** | Unresolved |
| Appended heading: **“2027 ESO Major Skeletal Muscles List”** | Used as the controlled 28-name list |

This is a **blocker** (§11). Until clarified, author **only** the 28 appended names. Do not import any other year’s muscle list.

### 7.2 Coverage philosophy

**Not** 28 × 6 = 168 questions. **Not** 28 name flashcards.

| Rule | Meaning |
|---|---|
| Every listed muscle appears **at least once** in the eventual bank | Via group literacy, ID, O/I/F, action, or scenario |
| Dedicated MUS-vii slots = **14**, not 28 | Remaining appearances ride in MUS-vi, MUS-ii, scenarios |
| One muscle does not get origin **and** insertion **and** function **and** ID unless the **skill** differs |
| Agonist/antagonist items use **pairs/groups**, not one item per muscle |
| Off-list muscle names as distractors are allowed only as clearly unofficial; never teach them as required |

### 7.3 Planning table (28 muscles)

Codes are **planned eventual roles**, not facts.

- **Grp** = printed group membership (Tier A now)
- **ID** = identification / location (Tier B; image **USEFUL**, not rules-required)
- **O** / **In** / **Fn** = origin / insertion / function (Tier B)
- **A/S** = agonist / antagonist / synergist (Tier B)
- **Sc** = movement/scenario (Tier B)

`P` = planned as a **primary** home (one of the 14 MUS-vii-style items or a MUS-vi pair).  
`s` = secondary appearance (distractor, pair partner, or grouped stem).  
`—` = do not force a dedicated item.

Do **not** fill anatomy in this table.

| Muscle | Group | Grp | ID | O | In | Fn | A/S | Sc |
|---|---|---|---|---|---|---|---|---|
| Frontalis | Head and Neck | P | s | — | — | P | — | s |
| Orbicularis oculi | Head and Neck | P | s | — | — | P | — | — |
| Masseter | Head and Neck | P | s | s | — | P | s | s |
| Sternocleidomastoid | Head and Neck | P | P | s | s | s | s | s |
| Trapezius | Head and Neck *(not Trunk)* | **P** | P | s | s | s | s | s |
| Pectoralis major | Upper | P | P | s | s | P | P | P |
| Latissimus dorsi | Upper | P | P | s | s | P | s | P |
| Deltoid | Upper | P | P | s | s | P | s | s |
| Biceps brachii | Upper | P | P | P | P | P | **P** | P |
| Triceps brachii | Upper | P | P | P | P | P | **P** | P |
| Brachialis | Upper | P | s | s | — | P | s | — |
| Brachioradialis | Upper | P | s | — | s | P | s | s |
| Flexor carpi radialis | Upper | P | s | — | — | P | s | s |
| Extensor carpi radialis | Upper | P | s | — | — | P | s | s |
| Extensor digitorum | Upper | P | s | — | — | P | — | s |
| Rectus abdominis | Trunk | P | P | s | s | P | — | s |
| Diaphragm | Trunk | P | s | — | — | **P** | — | s |
| Serratus anterior | Trunk | P | s | — | — | P | — | — |
| Iliopsoas | Lower | P | P | — | — | P | s | P |
| Sartorius | Lower | P | s | s | s | s | — | s |
| Gluteus maximus | Lower | P | P | s | s | P | s | P |
| Gluteus medius | Lower | P | s | — | — | P | s | s |
| Biceps femoris | Lower | P | P | s | s | P | P | P |
| Rectus femoris | Lower | P | P | s | s | P | P | P |
| Vastus lateralis | Lower | P | s | — | — | P | s | s |
| Tibialis anterior | Lower | P | P | — | — | P | P | P |
| Gastrocnemius | Lower | P | P | s | s | P | P | P |
| Soleus | Lower | P | s | — | — | P | s | s |

**Trapezius group** is a high-value Tier A item: the list places it under Head and Neck, not Trunk. That is list literacy, not invented anatomy.

**Heavier multi-skill muscles** (still `SOURCE NEEDED` for facts): biceps brachii, triceps brachii, deltoid, pectoralis major, latissimus dorsi, gluteus maximus, rectus femoris, biceps femoris, gastrocnemius, tibialis anterior, sternocleidomastoid, diaphragm. These support application without writing the same location stem 12 times.

**Lighter muscles** still must appear (group item and/or one function/ID): frontalis, orbicularis oculi, serratus anterior, extensor digitorum, etc.

---

## 8. Disease / condition strategy

Use closed lists **exactly**. Do not add conditions. Do not treat INT-vi, SKL-ix, and MUS-x as one topic.

Dimensions below are **allowed only if** the rules require that dimension **or** a later source supplies it. Checkmarks in “Rules require dimension?” mean the **topic** is in scope, not that the **facts** exist.

Legend: **R** = rules require the *dimension* (still often `SOURCE NEEDED` for content). **—** = do not assume that dimension. **A** = list membership authorable now.

### 8.1 Integumentary (target 12 in INT-vi + 4 in INT-vii)

| Condition | Recog. (list) | Distinguish | Mechanism | Signs | Dx | Tx/Prev | Imaging | Class. |
|---|---|---|---|---|---|---|---|---|
| Burns | A | vs sunburn (R, facts SN) | SN | SN | — | R / SN (INT-vii) | — | **R / SN** |
| Sunburn | A | vs burns | SN | SN | — | R / SN | — | with burns |
| Poison ivy | A (e.g. allergen) | — | SN | SN | — | R / SN | — | — |
| Metals (allergens) | A (e.g.) | — | SN | SN | — | R / SN | — | — |
| HPV | A | — | SN | SN | — | R / SN | — | — |
| Boils | A | vs carbuncles (only if sourced) | SN | SN | — | R / SN | — | — |
| Carbuncles | A | vs boils | SN | SN | — | R / SN | — | — |
| Athlete's foot | A | — | SN | SN | — | R / SN | — | — |
| Impetigo | A | vs erysipelas/cellulitis if sourced | SN | SN | — | R / SN | — | — |
| Erysipelas | A | same | SN | SN | — | R / SN | — | — |
| Cellulitis | A | same | SN | SN | — | R / SN | — | — |
| Hansen's Disease | A | — | SN | SN | — | R / SN | — | — |
| Chickenpox | A | vs shingles if sourced | SN | SN | — | R / SN | — | — |
| Shingles | A | vs chickenpox | SN | SN | — | R / SN | — | — |
| Psoriasis | A | vs dermatitis if sourced | SN | SN | — | R / SN | — | — |
| Dermatitis | A | vs psoriasis | SN | SN | — | R / SN | — | — |
| Melanoma | A | vs other listed cancers if sourced | SN | SN | — | R / SN | — | — |
| Basal cell carcinoma | A | same | SN | SN | — | R / SN | — | — |
| Squamous cell carcinoma | A | same | SN | SN | — | R / SN | — | — |
| Kaposi's sarcoma | A | same | SN | SN | — | R / SN | — | — |
| Merkel cell carcinoma | A | same | SN | SN | — | R / SN | — | — |

**12 INT-vi slots** cannot be 21 flashcards. Cluster: burns/classification (2–3), allergen examples (1), HPV (1), infection clusters (3–4), inflammatory pair (1–2), cancer distinction (2–3). **INT-vii (4)** is treatments/prevention **only after** a treatment source — all 4 are `SOURCE NEEDED`.

Cell-to-person is a **required grain**, not a license for unsourced pathophysiology essays.

### 8.2 Skeletal (target 8 in SKL-ix + 2 in SKL-x + 5 in SKL-xi)

| Condition | Recog. | Distinguish | Mechanism | Signs | Dx | Tx | Imaging (radiological features **R**) | Class. |
|---|---|---|---|---|---|---|---|---|
| Osteoarthritis | A | **vs RA — skill R; criteria SN** | SN | SN | SN | — (not restated) | R / SN / Tier C | — |
| Rheumatoid arthritis | A | **vs OA** | SN | SN | SN | — | R / SN / Tier C | — |
| Gout | A | — | SN | SN | SN | — | R / SN / Tier C | — |
| Osteoporosis | A | vs osteomalacia/rickets if sourced | SN | SN | SN | — | R / SN / Tier C | — |
| Osteomalacia / rickets | A (slash-joined) | pairing unexplained | SN | SN | SN | — | R / SN / Tier C | — |
| Scoliosis | A | vs kyphosis vs lordosis if sourced | SN | SN | SN | — | R / SN / Tier C | — |
| Kyphosis | A | same | SN | SN | SN | — | R / SN / Tier C | — |
| Lordosis | A | same | SN | SN | SN | — | R / SN / Tier C | — |
| Tennis elbow | A | vs Golfer's elbow if sourced | SN | SN | SN | — | R / SN / Tier C | — |
| Golfer's elbow | A | vs Tennis elbow | SN | SN | SN | — | R / SN / Tier C | — |
| Cruciate ligament tears of the knee | A | vs meniscus if sourced | SN | SN | SN | — | R / SN / Tier C | — |
| Meniscus tears of the knee | A | vs cruciate | SN | SN | SN | — | R / SN / Tier C | — |
| Septic arthritis | A | vs OA/RA/gout if sourced | SN | SN | SN | — | R / SN / Tier C | — |
| Fractures (topic) | A as topic | — | SN | SN | SN | **R / SN** | useful | **Salter-Harris R / SN** |

**Must-have when sourced:** at least **two** OA vs RA distinction items (Level 2–3). **Must-have when sourced:** Salter-Harris interpretation (Level 2–3), some image REQUIRED.

Exercise/aging (SKL-x, 2 items): only with a source tying exercise/aging to the skeleton and/or **listed** diseases. Do not invent.

Skeletal treatments are explicit for **fractures**, not for the SKL-ix disease list. Do not assume disease-drug items for OA/RA/etc. unless a later source is adopted **and** the rules gap is documented.

### 8.3 Muscular / neuromuscular (target 3 MUS-ix + 4 MUS-x)

| Condition | Recog. | Distinguish | Mechanism | Signs | Dx | Tx/Prev | Imaging | Class. |
|---|---|---|---|---|---|---|---|---|
| Strains | A (limited to) | vs sprains **if sourced** | SN | SN | — | **Prevention R / SN** | — | — |
| Sprains | A | vs strains | SN | SN | — | Prevention R / SN | — | — |
| Myasthenia gravis | A | vs LEMS if sourced | SN | SN | SN | **— not restated** | — | — |
| Lambert-Eaton myasthenic syndrome | A | vs MG | SN | SN | SN | — | — | — |
| Polymyalgia rheumatica | A | vs polymyositis/dermatomyositis if sourced | SN | SN | SN | — | — | — |
| Polymyositis | A | vs dermatomyositis | SN | SN | SN | — | — | — |
| Dermatomyositis | A | vs polymyositis | SN | SN | SN | — | — | — |
| Botulism | A | vs tetanus if sourced | SN | SN | SN | — | — | — |
| Tetanus | A | vs botulism | SN | SN | SN | — | — | — |
| Poliomyelitis | A | — | SN | SN | SN | — | — | — |
| Fibromyalgia | A | vs CFS if sourced | SN | SN | SN | — | — | — |
| Chronic fatigue syndrome | A | vs fibromyalgia | SN | SN | SN | — | — | — |
| Carpal Tunnel Syndrome | A | — | SN | SN | SN | — | — | — |

**4 MUS-x slots** cover 11 diseases by **group**, not 11 stems: NMJ pair (1–2), immunologic trio (1), infectious (1), pain (1). Do not invent treatments for this list.

---

## 9. Image strategy

**Do not create placeholder images.**

| Kind | Count at 135 | Share |
|---|---|---|
| **Image REQUIRED** | **24** | 18% |
| **Image USEFUL** (text stem can still be live) | **30** | 22% |
| **Text-only sufficient** | **81** | 60% |
| **Total** | **135** | 100% |

Image-dependent (required + useful) ≈ **40%**. Live-hold should follow **image REQUIRED** only, consistent with Entomology: do not flip `imageRequired` to false to grow the live pool.

### 9.1 Where the rules actually support images

| Category | Rules basis | Assignment |
|---|---|---|
| Bone surface anatomy on a **diagram** | Explicit: label as shown on a diagram | **REQUIRED** (SKL-i) |
| **Normal X-ray, CT, MRI** of bone surface anatomy | Explicit | **REQUIRED** (SKL-i) |
| **Radiological features** of listed bone diseases | Explicit | **REQUIRED** for those items (subset of SKL-ix) |
| Salter-Harris | Named classification; no figure in the rules | **USEFUL**, treat as **REQUIRED** if the item asks the student to classify a depicted fracture |
| Burns classification | Classification required; no figure | **USEFUL**; not required if a sourced text definition is used |
| Skin histology | Anatomy/histology of layers and components | **USEFUL** |
| Muscle anatomy / location | Location and identification required; **diagrams not stated** for muscles | **USEFUL**, not REQUIRED |
| Joint types / ROM | Structure/function; no figure mandate | **USEFUL** |
| Three muscle types histology | Cellular anatomy | **USEFUL** |
| Specimen photos of skin disease | Not stated | Do **not** invent an image requirement |

### 9.2 Planned REQUIRED split (24)

| Home | Count | Notes |
|---|---|---|
| SKL-i diagram labeling | 4 | |
| SKL-i normal X-ray | 3 | |
| SKL-i CT | 2 | |
| SKL-i MRI | 2 | Mix modalities; do not write 9 identical landmark stems |
| SKL-ix radiological features | 4 | Listed diseases only |
| SKL-xi Salter-Harris image | 3 | |
| Buffer / histology if a sourced figure exists | 6 | Reassign to SKL-i/ix/xi if histology assets never arrive; **do not** fill with fake skin photos |
| **Total** | **24** | |

The 6-buffer stays `SOURCE NEEDED` until real figures exist. If they never exist, **drop those 6** (bank 129) rather than authoring fake image items.

### 9.3 USEFUL (30) vs text-only (81)

USEFUL: muscle location (subset of MUS-vii), eccrine/apocrine histology, skin layers, joint cartoons, strain/sprain diagrams, non-image-required disease photos.

Text-only: list literacy, scope limits, sourced mechanism stems, sourced compare/contrast, sourced origin/insertion text, named hormone effects once sourced.

---

## 10. Duplicate-control strategy

1. **One fact, one primary skill.** A second item on the same fact is allowed only if the cognitive task changes (recall name → apply in a movement → distinguish from a listed neighbor).
2. **No 28× location flashcards.** Group-membership items should test **several** muscles or the group heading, not “Where is muscle N?” twenty-eight times.
3. **No choice-order variants.** Shuffling A–D is not a new question.
4. **No paraphrase twins.** Rewording the same stem and the same tested fact is a duplicate.
5. **Recognition ≠ application.** “Which listed cancer is melanoma?” (if that is even worth asking) is not the same as applying sourced melanoma features in a stem.
6. **Closed-list membership is capped.** INT+SKL+MUS list-literacy together ≤ **the 24 Tier A budget**, not 49 extra items.
7. **`e.g.` is not a production line.** Six dermatological features get **3** items total, not six definitions invented from the internet.
8. **Level 3 reserved** for sourced combinations, not harder wording of Level 1 list facts.
9. **Off-list distractors** must not introduce unofficial required anatomy (no “which is the missing 29th muscle”).
10. **Image vs text of the same landmark** count as different skills only if one is labeling a figure and the other is a sourced definition — still cap repeats.

---

## 11. Coverage targets (reconcile)

### 11.1 Target total

**135** (acceptable 120–150). Empty `SOURCE NEEDED` slots preferred over invention.

### 11.2 By system

| System | Count |
|---|---|
| Integumentary | 40 |
| Skeletal | 48 |
| Muscular | 47 |
| **Total** | **135** |

### 11.3 By major curriculum area

| Area | Count | Area | Count | Area | Count |
|---|---|---|---|---|---|
| INT-i | 4 | SKL-i | 9 | MUS-i | 2 |
| INT-ii | 6 | SKL-ii | 6 | MUS-ii | 2 |
| INT-iii | 8 | SKL-iii | 4 | MUS-iii | 5 |
| INT-iv | 3 | SKL-iv | 2 | MUS-iv | 4 |
| INT-v | 3 | SKL-v | 4 | MUS-v | 6 |
| INT-vi | 12 | SKL-vi | 3 | MUS-vi | 5 |
| INT-vii | 4 | SKL-vii | 2 | MUS-vii | 14 |
| | | SKL-viii | 3 | MUS-viii | 2 |
| | | SKL-ix | 8 | MUS-ix | 3 |
| | | SKL-x | 2 | MUS-x | 4 |
| | | SKL-xi | 5 | | |
| **INT** | **40** | **SKL** | **48** | **MUS** | **47** |

40+48+47 = **135**.

### 11.4 By cognitive demand

| Demand | Count |
|---|---|
| Recall | 30 |
| Recognition | 27 |
| Distinction | 27 |
| Application | 32 |
| Multi-step | 19 |
| **Total** | **135** |

### 11.5 By difficulty

| Level | Count |
|---|---|
| 1 | 54 |
| 2 | 54 |
| 3 | 27 |
| **Total** | **135** |

### 11.6 Image-dependent

| Kind | Count |
|---|---|
| Image REQUIRED | 24 |
| Image USEFUL | 30 |
| Text-only | 81 |
| **Total** | **135** |

### 11.7 SOURCE NEEDED vs authorable now

| Band | Count |
|---|---|
| Tier A (rules/list; science list-literacy / scope) | **24** |
| Planned slots still **`SOURCE NEEDED`** | **111** |
| **Total** | **135** |

**Areas that remain `SOURCE NEEDED` for factual authoring** (requirement may already be rules-backed): all 28 major areas for **biology**, except that muscle **names/groups**, closed-list **membership**, and named **limits** can fill the 24. Highest-volume blockers: INT-ii, INT-iii, INT-vii, SKL-i (images + bone list), SKL-ii, SKL-ix (criteria + radiology), SKL-xi, MUS-v, MUS-vi, MUS-vii (O/I/F).

---

## 12. Quality rules

Never:

- Invent anatomy facts, disease symptoms, treatments, origins/insertions, or radiological findings
- Silently expand a closed disease list or add muscles
- Treat `e.g.` as exhaustive
- Treat a rule **requirement** as evidence for the **detailed fact**
- Author image items against placeholders
- Write rules-trivia (“which roman numeral lists HPV?”) as science practice
- Import 2025 or any other year’s muscle list to “fix” the title mismatch

---

## 13. What we can author from the rules alone

Safe **now** (~24 items), if we choose to:

1. Official 28 names and four group headings (including Trapezius under Head and Neck)
2. Closed-list membership for INT / SKL / MUS conditions (listed vs clearly off-list)
3. Wounds limited to burns/classification/sunburn
4. Muscle/tendon injuries limited to strains and sprains
5. Three muscle types are the named set (skeletal / cardiac / smooth)
6. Named in-scope examples as **topics** (not mechanisms): e.g. ball-and-socket exists as a joint-type example; PTH/vitamin D/estrogen are named skeletal-hormone examples; cervical/thoracic/lumbar are named vertebral examples

That set is **list literacy**. It is not an A&P course. Stop there until §14 is unblocked.

---

### BLOCKERS BEFORE QUESTION AUTHORING

**A. Authoritative reference material (Tier B) — required for almost all of the 111 remaining slots**

| Need | Unlocks |
|---|---|
| Bone anatomy reference (axial/appendicular names; basic surface landmarks) | SKL-i text items; labeling keys |
| Joint-type reference (do not invent the catalog) | SKL-ii |
| Histology / skin-layer / gland / receptor reference | INT-ii, INT-iii |
| Disease reference for **listed** conditions only, cell-to-person | INT-vi, SKL-ix, MUS-x |
| Treatment/prevention reference for **INT listed conditions** and **fractures** | INT-vii, SKL-xi treatments |
| Salter-Harris classification source (grades/definitions) | SKL-xi |
| Burns classification source (the rules never name the scheme) | INT-vi burns |
| Muscle origin / insertion / function / location reference **for the 28 listed names only** | MUS-vii, MUS-vi |
| Agonist / antagonist / synergist pairings among listed muscles | MUS-vi |
| Physiology references: contraction/relaxation, tension, NMJ, ECC, cross-bridge, Ca/PO4, PTH/vitamin D/estrogen, RANKL | MUS-iv/v, SKL-iv/v/vi |
| Exercise and aging effects on skeleton, listed skeletal diseases, and muscle structure | SKL-x, MUS-viii |
| Strain vs sprain and prevention | MUS-ix |
| Clarification of **2025 National** vs **2027 ESO** muscle-list wording | Confidence that the 28 names are the contest list |

**B. Images (Tier C) — required for the 24 image-REQUIRED slots; useful for 30 more**

| Need | Unlocks |
|---|---|
| Bone surface-anatomy diagrams | SKL-i diagram labeling |
| Normal X-ray, CT, MRI of bone | SKL-i imaging skill |
| Radiology examples of **listed** skeletal diseases | SKL-ix radiological items |
| Salter-Harris (and optionally burns) classification images | Classification items |
| Optional: skin histology, muscle figures | USEFUL items; not a substitute for missing facts |

**C. Process blockers**

- Choose and record sources (later evidence matrix) before marking any item `verified`
- Do not start a 135-item generation pass in one shot
- First authoring wave, if any: **Tier A list literacy only**, after product sign-off
- Second wave: one sourced domain at a time (e.g. muscle O/I/F for the 28, or OA vs RA, or Salter-Harris)

**Not blockers**

- Event logistics (out of bank)
- Entomology/Astronomy banks (irrelevant)
- Making the muscle list count 30 (forbidden)

Until A and B are addressed, the honest buildable bank is **about 24 text-only list-literacy items**, not 135.
