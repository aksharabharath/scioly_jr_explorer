# Jr. Explorer — Product Decision Register

> **Status:** Active  
> **Purpose:** Authoritative product decision record  
> **Audience:** Product decisions, UX decisions, future development, Cursor/AI agents  
> **Last updated:** September 2026

This document records intentional product decisions for Jr. Explorer. It is not a backlog and it is not a list of suggestions. Decisions marked LOCKED should not be casually revisited. Decisions marked DEFERRED are intentionally out of scope unless explicitly reopened.

**D-001 through D-011 define product direction only.** They do not, by themselves, authorize implementing a new mastery system, redesigning Base Camp, implementing the Event Hub, changing XP, changing the database, or changing the current UI. Event Hub implementation is a separate task.

---

## Currently Settled

The following areas have been explicitly reviewed and approved. Treat them as the **current product baseline** for future design and implementation work:

1. **Progress hierarchy** (D-001)
2. **Student-facing mastery concept** (D-002)
3. **Tricky Topics purpose** (D-003)
4. **Base Camp purpose** (D-004)
5. **Field-explorer product identity** (D-005)
6. **Pilot scope** (D-006)
7. **Event Hub vs Base Camp** (D-007)
8. **Event Hub topic catalog** (D-008)
9. **Event Hub omits recent activity** (D-009)
10. **Event Hub tricky topics** (D-010)
11. **Event Hub practice progress** (D-011)

When an older register row overlaps one of these, the D-series decision is the canonical wording. Related P-/UX-/A- rows exist to keep historical IDs and to point at that baseline.

---

## Not yet decided

These remain **REVISIT** items, not failures to decide:

1. Exact mastery thresholds and algorithm (see D-002)
2. Whether the Map provides enough value to justify its surface (UX-004)
3. Whether Badges materially improve the core loop (UX-006)
4. Exact Base Camp visual layout (D-004 locks purpose, not layout)
5. Exact student-facing wording for mastery states (D-002 locks the three concepts; copy is open)
6. Whether XP values should eventually change based on pilot evidence (P-010 is locked for the pilot; post-pilot change requires evidence and reopening)
7. Exact Event Hub visual layout (D-007–D-011 lock role and content rules, not pixels)
8. Whether event-scoped accuracy is ever shown on the Event Hub (not locked; see D-011)

---

## Decision status system

### LOCKED

A deliberate decision that should be treated as a product constraint.

### DECIDED

The current product direction has been chosen, but the decision may be revisited if pilot evidence strongly contradicts it.

### REVISIT

An area where the current direction is not considered permanently settled and should be evaluated using evidence.

### DEFERRED

Explicitly out of scope for the current product/pilot. Do not implement unless the decision is reopened.

### KNOWN RISK

A known imperfection or tradeoff that is accepted for now and is not automatically a reason to redesign the system.

---

## Product Decision Hierarchy

When two decisions or features conflict, prioritize them in this order:

1. **Safety / data integrity** — Student data stays isolated, persisted correctly, and is not silently lost or mixed. Integrity outranks convenience.
2. **Learning outcome** — Whether the student gets better at Science Olympiad (D-001: learning improvement first) outranks looking busy or scoring points.
3. **Core practice loop** — Choose event → practice → feedback → improve → return. Features that weaken this loop lose to features that strengthen it.
4. **Student clarity / UX** — The student should know what to do next (D-004) and, on a Field Site, what they can do in that event (D-007). Confusing chrome loses to a clear next action.
5. **Motivation / gamification** — XP, streaks, badges, and expeditions support return and effort. They do not define academic success (D-001, D-005).
6. **Visual polish / extra features** — Appearance and secondary surfaces (Map chrome, extra badges, extra dashboards) come last.

Jr. Explorer optimizes for students becoming better at Science Olympiad, not for students accumulating the most XP.

XP, streaks, badges, and expeditions are supporting motivational systems rather than the definition of learning success.

Product identity (D-005): keep the field-explorer/game metaphor. The metaphor explains the experience; it does not replace academic meaning.

---

## Priority levels

### P0 — Foundational

Decisions that define the identity, learning goal, scope, or fundamental architecture of the product.

### P1 — Important

Decisions that materially affect the pilot experience but do not redefine the product.

### P2 — Supporting

Lower-priority UX, polish, or secondary systems.

---

## Formal decision register

| ID | Area | Decision | Status | Priority | Rationale |
| --- | --- | --- | --- | --- | --- |
| D-001 | Progress / Learning | Progress ranks as: (1) learning improvement (accuracy and improvement on topics), (2) practice progress (meaningful activity such as questions explored and expeditions completed), (3) gamification (XP, Explorer Level, streaks, badges). Students can accumulate XP without becoming better at Science Olympiad; XP is not the primary definition of learning progress. | LOCKED | P0 | Resolves competing definitions of “progress.” Learning signal outranks reward signal. Canonical for P-004, P-005, UX-003. |
| D-002 | Mastery | Student-facing learning uses three conceptual states—Needs Practice, Improving, Strong—computed from practice-attempt evidence, not a precise-looking mastery percentage and not a persisted mastery score. Exact thresholds and algorithm remain a future REVISIT, to be validated with pilot data. This row does not authorize implementing a new mastery system. | DECIDED | P0 | Three understandable states without false precision; fits five-table architecture. Canonical for P-008 and UX-011. |
| D-003 | Tricky Topics / Improvement | Tricky Topics is an improvement mechanism, not a statistics dashboard. Identifying a tricky topic should lead toward practicing that topic. Intended loop: practice → identify weakness → practice the weak topic → improve → see improvement. This row does not authorize implementation changes. | LOCKED | P0 | Clearest bridge from the practice loop to learning improvement. Canonical for P-009. |
| D-004 | Base Camp / Information Architecture | Base Camp’s primary job is “What should I do next?” Preferred hierarchy: (1) continue or start useful practice, (2) work on a tricky topic when appropriate, (3) explore another event, (4) supporting progress information (learning progress, questions explored, XP, streak, badges). Supporting stats must not compete with that next-action hierarchy. | LOCKED | P0 | Gives Base Camp a purpose; avoids a statistics dashboard. Canonical for UX-001 and UX-003. Does not lock visual layout. |
| D-005 | Product Identity / UX | Retain the field-explorer/game metaphor (Base Camp, Field Sites, Expeditions, Journal, Explorer Level, Badges). The metaphor explains the experience; it does not replace academic meaning. Expedition = 10-question session; Tricky Topic = needs more practice; Explorer Level = motivational; XP = activity reward. A higher game level must not imply academic mastery unless learning evidence supports that. | LOCKED | P0 | Keep valuable identity without letting game level stand in for learning. |
| D-006 | Product Scope | For the pilot, Jr. Explorer is a focused gamified adaptive practice companion. It is not a NotebookLM replacement, full lesson/textbook platform, teacher LMS, classroom management system, competition simulator, massive question bank, general AI tutor, complete Science Olympiad curriculum platform, or credential/certification system. Core product: practice → understand mistakes → identify weak areas → improve them → return. Lessons, teachers, CMS, AI tutor, competition mode, and other major expansions stay deferred unless reopened. | LOCKED | P0 | A narrow, validated practice product beats several half-built products. Canonical for P-007 and Explicitly Deferred. |
| D-007 | Event Hub vs Base Camp | Base Camp’s primary next-action CTA skips the Event Hub and goes directly to the existing practice flow when the student should practice. That is intentional locked pilot behavior, not a workaround. The Event Hub is reached through Field Site / Explore and is the event-specific discovery and practice home. Base Camp answers “What should I do next?” Event Hub answers “What can I do in this event?” The hub is not a required step before every expedition. Explore means “show me this event.” Do not change D-004 to force students through the hub. Global next-action belongs to Base Camp; event exploration belongs to the Event Hub. This row does not authorize implementing the Event Hub. | LOCKED | P0 | Resolves UX-007. Canonical for Event Hub vs Base Camp. D-004 remains LOCKED. |
| D-008 | Event Hub topic catalog | The Event Hub shows this event’s topic catalog as lightweight orientation: student-facing name, short description, and D-002 learning state when there is enough practice evidence. It is not a lesson system or textbook. Do not display fake mastery percentages, `progressPercent`, mock `topicMastery`, or Event Level as academic mastery. Topic practice uses existing practice infrastructure. For the pilot, weak/tricky topics may expose “Practice this topic”; do not add a new practice mode only so strong/unclassified topics can be practiced arbitrarily; do not add a new topic route unless separately decided. Curriculum remains repository-owned TypeScript. Purpose: “What can I explore/practice in this event?” not “Here are lessons to read.” | LOCKED | P0 | Orientation without a CMS or textbook. Consistent with A-001, D-002, D-006. |
| D-009 | Event Hub recent activity | The Event Hub does not include a dedicated recent-activity or session-history section during the pilot. Results already close the expedition; Journal/Log owns historical activity. Duplicating session history on the hub would add dashboard noise. This does not remove or weaken the Journal/Log. A future decision may reopen hub recap if students need stronger return-to-event context. | LOCKED | P0 | Keeps the hub from becoming a second log. Canonical vs UX-005. |
| D-010 | Event Hub Tricky Topics | The Event Hub may show event-specific tricky topics as improvement actions. Each actionable topic leads to the existing flow `/events/[eventId]/practice?mode=weak&topic=…`. Prefer precise per-topic actions. If several tricky topics exist, one secondary action may practice all tricky topics for that event. Hierarchy: (1) Practice this topic, (2) Practice all tricky topics (must stay secondary). Do not create a second quiz engine, a new persistent weak-topic store, or a statistics dashboard. Consistent with D-003. This row does not authorize implementing the Event Hub. | LOCKED | P0 | Event-scoped D-003 without duplicating Base Camp’s global next-action role. |
| D-011 | Event Hub practice progress | The Event Hub may show quiet, event-scoped practice progress: unique questions explored and expeditions completed. That is practice activity (D-001 tier 2), not academic mastery. “Ground covered” may remain if it does not look like XP or imply mastery; prefer concise text over a prominent XP-like bar. The hub must not show global Explorer Level, global XP, streak, badges, or daily goal (those stay on Base Camp, Profile, and results). Do not add event-specific XP. Event-scoped accuracy is not locked here and needs a separate decision if ever shown. | LOCKED | P0 | Event-scoped tier 2 only; no second gamification dashboard. |
| P-001 | Target user | Jr. Explorer is a practice companion for elementary Science Olympiad students. The pilot is not designed as a teacher platform, classroom management system, or general-purpose study platform. See D-006. | LOCKED | P0 | Scope and identity. Teacher/classroom needs would change authorization and UX. |
| P-002 | Core product | Jr. Explorer is practice-first. The core loop is choose event → practice → feedback → improve → return. See D-003 and D-006. | LOCKED | P0 | Lessons and study hubs are not the product for the pilot. |
| P-003 | Pilot success | Pilot success is primarily whether students repeatedly complete meaningful practice and improve weak areas, rather than simply accumulating XP. See D-001 and D-006. | DECIDED | P0 | Prevents optimizing the product around points instead of learning. |
| P-004 | Learning outcome | Follow D-001: learning improvement outranks practice-progress metrics, which outrank gamification. XP is not the primary indicator of student progress. | LOCKED | P0 | Subordinate to D-001; previously DECIDED wording is replaced so it does not compete with D-001. |
| P-005 | Progress hierarchy | Follow D-001 (three tiers). Nested detail: learning improvement includes accuracy and topic improvement; practice progress includes questions explored and expeditions completed; gamification includes XP, Explorer Level, streaks, and badges. Do not treat the older five-item flat list as a second competing hierarchy. | LOCKED | P0 | Reconciled with D-001. Same intent as the prior five-item list, grouped so XP cannot sit beside accuracy as equal “progress.” |
| P-006 | Gamification | Gamification is a supporting motivational layer, not the academic authority. It is tier 3 in D-001. See also D-005. | DECIDED | P1 | XP and related systems may encourage return; they do not certify mastery. |
| P-007 | Lessons | A full lesson/textbook platform is deferred for the pilot (D-006). Explanations, feedback, and weak-topic practice are sufficient for the current learning loop. | DEFERRED | P1 | Building lessons now would expand scope before the practice loop is validated. |
| P-008 | Mastery | Meaningful mastery is attempt-derived learning evidence (D-002), not the mock Event Level/topicMastery catalog fields, and not a stored “% mastery” score. Student-facing concept: Needs Practice / Improving / Strong. | DECIDED | P0 | Mock catalog mastery is not student-facing academic truth. Implementation of a new system is not authorized by this register update. |
| P-009 | Weak Topics | Purpose is D-003 (LOCKED): Tricky Topics is an action toward topic-specific practice. Event Hub presentation of those actions is D-010. The current weak-topic numeric thresholds remain acceptable for the pilot but are hypotheses to evaluate with student behavior. | DECIDED | P0 | Purpose locked in D-003; algorithm not sacred. |
| P-010 | XP | Keep the current pilot XP rules: +10 correct, +6 correct with hint, +2 incorrect, +20 session completion. | LOCKED | P1 | Rules are live and aligned with persistence; changing them mid-pilot without evidence creates confusion. Post-pilot values are Not yet decided. |
| P-011 | XP meaning | XP must never visually imply that accumulating points is equivalent to mastering content. See D-001 and D-005. | DECIDED | P0 | Protects learning outcome against motivational chrome. |
| P-012 | Expedition length | A standard expedition contains 10 questions. See D-005. | LOCKED | P1 | Session size is a product constraint shared by practice UI and persistence rules. |
| P-013 | Adaptive practice | Practice remains adaptive/topic-aware rather than becoming a purely linear question sequence. | LOCKED | P1 | Adaptive selection is part of how practice and Tricky Topics work. |
| P-014 | Events | Keep the current five playable quiz events for the pilot. Do not expand the event catalog before evaluating the pilot. See D-006 (not a massive question bank / complete curriculum platform). | LOCKED | P0 | Content breadth is not the bottleneck; the loop is. |
| P-015 | Codebusters | Codebusters practice is explicitly out of scope. The existing crime-busters event must remain untouched and must not be treated as a Codebusters bank. | LOCKED | P0 | Separate events; mixing them would corrupt content and routing. |
| UX-001 | Base Camp | Follow D-004: Base Camp answers “What should I do next?” rather than displaying every statistic equally. | LOCKED | P0 | Home is a next-action surface, not a full stats board. Status aligned with D-004. |
| UX-002 | Primary CTA | The primary action should be continuing or starting useful practice. On Base Camp that CTA may skip the Event Hub (D-007). Tricky Topics/improvement is the secondary learning path when appropriate. Matches D-004 items 1–2. | DECIDED | P0 | Matches the core loop; improvement is essential but not the default first click. |
| UX-003 | Progress display | Follow D-001 and D-004: learning/improvement signals and the next-action hierarchy come first; XP and other gamification are supporting information and must not compete with them. | LOCKED | P0 | Implements D-001 on Base Camp under D-004. |
| UX-004 | Map | The Map must justify its existence through the field-explorer metaphor (D-005) or eventually be simplified/removed. Do not expand it with features merely because the route exists. Map is not listed as a required identity surface in D-005. | REVISIT | P1 | Route exists; product value is not settled. |
| UX-005 | Log | Keep Log for the pilot, but treat it as supporting infrastructure rather than a primary destination. Journal is part of identity (D-005); Log is not Base Camp (D-004). Session history stays here, not on the Event Hub (D-009). | REVISIT | P2 | Journal of expeditions is useful; it is not the home. |
| UX-006 | Badges | Keep the existing badge system, but do not expand badges before validating the core practice loop. Badges are identity (D-005) and gamification tier 3 (D-001). | REVISIT | P2 | Collection is decorative-to-supporting until the loop is proven. |
| UX-007 | Hub vs Continue | Superseded by D-007 (authoritative). Base Camp Start/Continue goes to existing practice and may skip the hub. The Event Hub is the Field Site / Explore home (“What can I do in this event?”), not a required gate before every expedition. Explore means show this event, not “the only way to start practice.” | LOCKED | P1 | Reconciled with D-007 and D-004. Older wording that the hub is the start point for every expedition is withdrawn. |
| UX-008 | Daily goal | The daily goal is measured in questions, not expeditions. | DECIDED | P1 | Matches account settings and Today’s goal; expeditions remain 10-question sessions (D-005). |
| UX-009 | Expedition terminology | "Expedition" describes a 10-question practice session. It should not replace the clearer concept of a daily question goal. See D-005. | DECIDED | P1 | Prevents mixing session length with habit goal. |
| UX-010 | Logout | Logout remains on Profile rather than being duplicated in the global header. | DECIDED | P2 | Header is navigation; account exit lives with settings. |
| UX-011 | Student-facing mastery | Conceptual states are D-002 (Needs Practice, Improving, Strong). Exact wording and thresholds remain REVISIT. Do not add gamification that competes with those states before they are understandable to students. | REVISIT | P0 | Concept decided in D-002; copy/algorithm still open. |
| UX-012 | Results | Results should close the learning loop: performance → feedback → XP → what to improve → next action. Compatible with D-001 (XP after learning signal) and D-003 (path to improvement). | DECIDED | P1 | Results are the end of a session, not only a scoreboard. |
| A-001 | Curriculum ownership | Curriculum remains repository-owned TypeScript for the current product. See D-006 (no CMS, no massive bank-as-product). | LOCKED | P0 | Banks, topics, and questions are code-owned until an editor workflow exists. |
| A-002 | Persistence model | Keep the current five-table Supabase persistence model. Do not implement the previous 13-table curriculum schema merely for completeness. Compatible with D-002 (computed mastery states, not a mastery table). | LOCKED | P0 | Persistence matches practice + selection + XP, not a CMS. |
| A-003 | Computed state | Badges, Explorer Level, expeditions, weak topics, aggregate progress, and D-002 mastery states remain computed unless a concrete scale or product requirement justifies persistence. | DECIDED | P1 | Avoids schema growth without a product need. |
| A-004 | XP authority | Persisted XP is authoritative. Client-side XP calculations are display/support logic only. XP remains gamification (D-001), not learning proof. | DECIDED | P0 | Wallet/RPC totals are the student’s XP, not reconstructed UI math. |
| A-005 | Attempt authority | practice_attempts is the historical source of truth for student practice attempts. D-002 states are derived from this history. | DECIDED | P0 | History, adaptive inputs, and derived logs start from stored attempts. |
| A-006 | Error handling | Route-level error/loading states and stronger save-failure UX should be addressed before substantial expansion. | REVISIT | P1 | Reliability of the loop outranks new surfaces; timing is before expansion, not a new product identity. |
| A-007 | Question CMS | Do not introduce a CMS until multiple content editors or frequent non-code content updates create a real need. See D-006. | DEFERRED | P1 | CMS is an ops/product change, not completeness of the stack. |
| A-008 | Teacher architecture | Teacher/classroom functionality is deferred and would require a separate authorization model. See D-006. | DEFERRED | P0 | Student RLS is not a classroom product. |

---

## Explicitly Deferred

The following are out of scope for the current product/pilot (D-006 and related rows):

- 13-table curriculum database
- Question CMS
- Teacher dashboard / teacher LMS
- Classroom/roster system
- Google/OAuth login
- Exam-grade anti-cheat
- Codebusters practice
- Build-event quizzes
- Full lesson / textbook platform
- NotebookLM replacement or general AI tutor
- Competition simulator / competition mode
- Massive question bank as a product goal
- Complete Science Olympiad curriculum platform
- Credential / certification system
- Additional gamification systems
- More events solely to increase catalog size
- Large-scale analytics infrastructure
- `practice_sessions` table without a concrete product requirement
- Large progress-dashboard expansion before simplifying the current hierarchy (D-001, D-004)
- Event Hub as a required gate before practice (forbidden by D-007)
- Event Hub session-history / recent-activity section (D-009)
- New topic routes or a second quiz engine (D-008, D-010)
- Event-specific XP (D-011)
- Mounting quarantined mastery/Event Level UI (`TopicCard`, `MasteryBadge`, `EventHero`, `ContinueExploring`, `NextSteps`, `EventProgressCard`, mock Event Level/`topicMastery`/`progressPercent`, `MOCK_EXPLORER`) as the Event Hub

Deferred does not mean never. It means the feature should not be implemented during the current pilot unless this decision is explicitly reopened.

---

## Pilot measurement register

Product decisions after the pilot should be evidence-driven. The following are intended to inform future REVISIT (and, if warranted, DECIDED) choices. They do not automatically trigger feature additions.

1. Expedition completion rate
2. Tricky Topics usage
3. Accuracy improvement on previously weak topics
4. Student understanding of XP
5. Whether XP distracts from learning
6. Understanding of event vs expedition vs daily goal vs Tricky Topics
7. Whether students know what to do from Base Camp
8. Whether Map is actually useful
9. Frustration caused by repeated questions
10. Voluntary return usage

---

## Rules for Future Product Decisions

1. Do not add a feature merely because it is technically possible.
2. Do not add a new progress metric without deciding which existing metric it outranks (D-001).
3. Do not add gamification that competes with learning signals.
4. Do not create persistent database structures without a demonstrated product requirement.
5. Do not expand scope before validating the core practice loop (D-006).
6. Do not treat deferred features as missing implementation.
7. Do not casually reopen LOCKED decisions.
8. If pilot evidence conflicts with a DECIDED choice, document the evidence before changing the decision.
9. When proposing a new feature, explain which level of the product hierarchy it serves.
10. Every major feature should strengthen the core loop or have an explicitly documented reason for existing.

---

## Decision reopening process

### To reopen a decision:

1. Identify the decision ID.
2. Explain the new evidence or requirement.
3. Explain what currently breaks or is insufficient.
4. Propose the replacement decision.
5. Explain downstream UX/product/architecture effects.
6. Update this register.
7. Only then implement the change.

Do not silently override a decision in code.

---

## Product North Star

> Jr. Explorer optimizes for students becoming better at Science Olympiad, not for students accumulating the most XP. XP, streaks, badges, and expeditions exist to support that goal.

The product should make it easy for a student to practice, understand mistakes, identify weak areas, improve them, and return for another useful practice session.

---

## Event Hub North Star

> The Event Hub is the student’s field-site home for one Science Olympiad event: understand what this site is, see how they are doing here, and choose a 10-question expedition or a topic to practice.

The Event Hub is not a second Base Camp, not a textbook, not a global gamification dashboard, and not a required gate before practice (D-007).

### Locked Event Hub hierarchy (product direction)

This is direction for a future Event Hub implementation. It is not an implementation spec and does not authorize building the hub in a documentation-only change.

```text
Event identity
        ↓
Start expedition
        ↓
Learning in this event
        ↓
Tricky topics → practice this topic
        ↓
Practice progress for this event
        ↓
Lightweight topic catalog / orientation
```

Recent activity is omitted for the pilot (D-009).

### Quarantined Event Hub-related UI

Do not mount the following on the Event Hub as they exist today; they conflict with D-001, D-002, and D-011. Do not delete them in a product-decision update:

- `TopicCard`
- `MasteryBadge`
- `EventHero`
- `ContinueExploring`
- `NextSteps`
- `EventProgressCard`
- mock Event Level / `topicMastery` / `progressPercent` catalog fields
- `MOCK_EXPLORER` as student-facing hub identity

These decisions do not authorize lessons, a CMS, AI tutoring, teacher or classroom features, competition mode, new database tables, persisted mastery, a new quiz engine, new topic routes, Codebusters work, changes to `crime-busters`, Supabase changes, or a Base Camp architecture rewrite.
