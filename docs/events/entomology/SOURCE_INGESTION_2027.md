# Entomology 2027 — Official Source Ingestion and Reconciliation

**Reconciliation pass.** Authoritative source: `docs/events/entomology/RULES_2027_OFFICIAL.md`. A PDF is **not** required. This file does not rewrite q1–q60, does not add q61+, and does not change app code.

| Role | Path | Status |
|---|---|---|
| **Authoritative 2027 rules + list** | `docs/events/entomology/RULES_2027_OFFICIAL.md` | **Primary for this project** |
| Structured restatement | `RULES_2027.md` | Secondary; **aligned** to official qualifiers this pass |
| List copy | `TAXON_LIST_2027.md` | Secondary; **aligned** to official list (53 taxa, 14 stars, official strings) |
| Evidence | `EVIDENCE_MATRIX_2027.md` | Updated this pass |
| Blueprint | `QUESTION_BANK_BLUEPRINT_2027.md` | Planning/evidence notes updated this pass |

**Historical note:** an earlier pass looked for `docs/events/entomology/sources/RULES_2027_OFFICIAL.pdf` and, when that file was absent, treated the markdown as a working copy only. **This pass supersedes that limitation:** the `.md` is the authoritative 2027 Entomology rules source for Jr. Explorer. Sample tests are still **not** official rules. 2026 Division B/C rules are **not** used.

Full concept records, the 53-row official list, and the q1–q60 table live in `EVIDENCE_MATRIX_2027.md`. Summary below.

---

## 1. Official extraction (qualifiers preserved)

- Team **up to 2**; **~30 minutes**; **online multiple choice**.
- **One** cheat sheet, **any form / any source**; protectors, lamination, tabs, labels allowed. Size **not** stated.
- Teams **may** have **one** provided ESO Entomology List copy.
- ID: Order, Subclass, Family **or** common name; questions **limited to** topics below; insects **limited to** the **2027 ESO Entomology List**.
- Images **will** be exhibited (pertinent features). **No** images in the rules file.
- Description: students **will** be asked to identify, answer questions, **and use or construct** a dichotomous key.
- Competition: students **may** be asked to **use or formulate** a **simple** dichotomous key.
- **For each specimen**, students **will** be asked correlated questions on internal/external anatomy, ecology, economic characteristics, **or** systematics.
- Ecological characteristics **may include** habitats, adaptations, behavior, relationships (**e.g.** symbiosis and competition) with animals, plants, and public health, and climate change impacts.
- Economic characteristics **may include** beneficial or detrimental aspects **such as** food, medicine, disease, chemicals, nutrients, nuisance species.
- High score wins; **preselected** tiebreakers. Point values **not** stated. Division letter **not** stated.
- **Life cycles / metamorphosis: not named.**
- Stars: **14** list lines prefixed `*`; **meaning not defined.**
- Named taxa: **53**. Closed identification list.

`may include` / `e.g.` / `such as` ≠ must-know closed catalogs. `limited to` the year list **is** closed for ID targets.

---

## 2. Secondary-document alignment (this pass)

`TAXON_LIST_2027.md` is now in exact agreement with the official list for 53 taxa, 14 stars, and official common-name strings (including order-level names and Hydrophilidae / Coccinellidae / Zopheridae / Pentatomidae).

`RULES_2027.md` and factual statements in `CURRICULUM_2027.md` were updated so they no longer contradict official `may`/`will`/`may include` wording, stars, or list strings.

**Still open (not list-copy errors):**

- Star **meaning** undefined
- Keys **will** (description) vs **may** (competition)
- Description “insects” vs Entognatha / Ixodidae
- q1–q60 **unchanged**; q12, q20, q32, q36, q50 still use pre-alignment wording in the bank

**53 scientific names: match.** Strings and stars on `TAXON_LIST_2027.md` now match the official file.

---

## 3. q1–q60 (statuses unchanged)

- **23** safely supported by official list/rules (names, ranks, name-only keys): q1–q5, q19, q31, q33–q35, q37–q49.
- **4** human review (left `verified`): q20, q32, q36, q50.
- **24** factual source needed.
- **9** image/source asset needed.

Do not mark VERIFIED because a topic is in scope.

---

## 4. Blueprint

**135 remains a product planning ceiling, not an official quota.** Official evidence does **not** fill anatomy, habitat, life-cycle, behavior, impact, climate, or visual-id facts. Empty `SOURCE NEEDED` slots rather than invent content. Keys stay a major **practice** area because they are in official scope, not because the rules mandate 12 items.

---

## 5. Next step

1. Re-QA q1–q60 against aligned official strings (do not skip).
2. Then author more **list-literacy / name-only keys** only.
3. Factual sources + images before correlated/visual expansion.

Pipeline: `align TAXON_LIST` → `rerun q1–q60 QA` → `list-only expansion` → `factual/image sources` → `then` correlated/visual items.
