# Jr. Explorer Hint Authoring Guide

**Definitive specification for the single student-facing hint on every live
question.**

## 1. Purpose

Jr. Explorer uses one static hint per multiple-choice question. A hint is
optional scaffolding for a stuck K–8 learner. It should make the next useful
move clear while preserving the work that makes the question educational.

The central rule is:

> A good single hint helps the student identify or perform the next useful
> cognitive action while leaving the final retrieval, inference, comparison,
> calculation, or decision to the student.

A hint is not merely a true fact, a safer restatement, an explanation of the
answer, or a test-taking trick. It is a small scaffold that gets a learner
moving without completing the target task.

This guide applies to all 205 live questions. `hint2` is not part of the MVP:
do not author or populate it.

## 2. Hint versus explanation

### Hint

Helps the student solve the current question. It supplies a next action,
retrieval cue, comparison setup, observation target, reference-navigation
step, calculation setup, or first subgoal.

### Post-answer explanation

Explains why the keyed answer is correct and teaches the underlying concept.

A hint does not need to teach the entire concept. Its job is to preserve useful
problem-solving effort. Do not turn a hint into a mini textbook explanation.

## 3. The specificity sweet spot

Specificity should apply to the **process**, not the **conclusion**.

| Level | What it looks like | Decision |
| --- | --- | --- |
| Too vague | “Think carefully.” “Use what you know.” “Read the choices.” | Reject: no actionable help |
| Optimal | “Compare the latitude and climate of the two regions.” | Prefer: concrete method, conclusion remains open |
| Too specific | States the answer, requested relationship, unique property, lookup result, calculation result, or enough information to make one option obvious | Reject: leakage |

The author should be able to answer:

> What can the student do after reading this hint that they could not identify
> before?

If the answer is “nothing concrete,” revise it. A short hint is good only when
it is useful; brevity alone is not a quality standard.

## 4. Preserve the cognitive work

The student must still perform the operation the question is testing.

| Question tests | The student must still |
| --- | --- |
| Recall | Retrieve the fact |
| Comparison | Perform the comparison |
| Classification | Classify using the relevant criteria |
| Sequence | Reconstruct or determine the missing position |
| Direction or rule | Retrieve and apply the governing rule |
| Calculation | Perform the calculation |
| Image identification | Interpret visual evidence |
| Reference lookup | Interpret the reference result |
| Multi-step reasoning | Complete the important inference |

The hint may support that operation, but must not perform it.

## 5. Question quality comes before hint quality

Run two separate gates:

1. **Is the question itself sound?**
2. **If it is sound, is the hint sound?**

A hint cannot repair a fundamentally answer-revealing question. If the stem,
choices, image, or displayed reference already reveals the answer, flag a
**QUESTION DESIGN FAILURE** instead of trying to compensate with a clever
hint.

Example:

**Bad item:** `Individual → Population → Community → Ecosystem → Biome →
Biosphere. Which level comes immediately after Community?`

The answer is visibly present. A better item is:

`Individual → Population → Community → ______ → Biome → Biosphere.`

Only after the item is sound should its hint be authored.

## 6. Choice-space preservation

Jr. Explorer uses four-option multiple choice. Evaluate every hint against
**all four choices**, not only the keyed answer.

A hint fails if a student can scan the choices and match a distinctive phrase,
concept, definition, synonym, classifier, relationship, numerical clue,
reference result, or other cue to one option without performing the intended
task.

Ask:

> Could a student match the hint to one option without actually knowing the
> underlying concept?

If yes, reject the hint. Parentheses, em dashes, aliases, and explanatory text
attached to a choice are part of its answer-bearing text.

Also ask whether the hint collapses the answer space by making one or more
distractors obviously wrong without teaching the intended reasoning. Helpful
process guidance is allowed; answer-specific elimination is not.

## 7. Complete leakage taxonomy

Lexical matching is only one form of leakage. Reject any of the following:

1. **Direct answer term:** repeats the keyed choice.
2. **Synonym / alternate name:** gives a textbook name, common name,
   abbreviation, formula name, or alias for the keyed choice.
3. **Definition leakage:** defines the keyed idea in different words.
4. **Parenthetical / explanatory leakage:** supplies text attached to the
   keyed choice, including parentheses, dashes, or appositives.
5. **Unique-property leakage:** gives a property only one option has.
6. **Distractor elimination:** names or characterizes distractors so the answer
   is left by elimination rather than reasoning.
7. **Target-relation leakage:** states the relationship the student is asked
   to determine.
8. **Sequence-position leakage:** supplies the missing order or next item.
9. **Category/classification isolation:** introduces a category that uniquely
   identifies one choice.
10. **Visual diagnostic leakage:** names a unique image feature or taxon.
11. **Reference-result leakage:** gives the row, column, cell, heading, value,
   or classification the student is supposed to look up.
12. **Numerical/intermediate-result leakage:** gives the answer, an
   answer-specific number, or an intermediate that selects one option.
13. **Syllogistic collapse:** gives premises that allow the keyed choice to be
   deduced without the intended subject knowledge.
14. **Distinctive-phrase matching:** repeats a phrase that appears in only one
   choice, even if it is not the answer term.
15. **Answer-space collapse:** any combination of cues reduces four choices to
   one (or makes the keyed option unmistakably plausible).

The deeper test is:

> Does the hint allow the student to identify the correct option without
> performing the intended cognitive task?

If yes, it fails regardless of how educational, concise, or scientifically
true it otherwise is.

## 8. Target-relation leakage

Do not directly provide the relationship the question asks the student to
determine. This includes:

- north/south, above/below, inside/outside, adjacent/non-adjacent
- before/after, earlier/later
- greater/less, more/less, faster/slower, closer/farther
- increase/decrease, cause/effect
- upstream/downstream
- any other spatial, temporal, quantitative, causal, or relational result

**Bad:** “Use the north-of-boreal-forest location in the Arctic.”

**Better:** “Compare the latitude and climate of the two biomes.”

The better hint specifies the comparison process; the student still determines
the spatial relationship.

## 9. One cognitive job

Each hint should primarily provide one kind of support:

- schema or principle retrieval
- retrieval cue
- observational focus
- comparison setup
- subgoal setup
- procedural next step
- reference navigation
- calculation setup

Do not force every hint into a question. A direct instruction can be excellent.
Avoid generic Socratic prompts for novice learners when a concrete action is
clearer.

## 10. Hint strategy by question type

### Concept or definition

Prompt retrieval of the role, mechanism, or real-world manifestation. Do not
provide the formal definition or a unique defining property.

**Bad:** “Think about the maximum population size an environment can support.”

**Better:** “Think about what happens to population growth as food, water, and
space become limiting.”

Check the four choices: even the better pattern must be revised if it uniquely
matches one option.

### Comparison

Specify dimensions to compare, without stating the result.

**Good pattern:** “Compare the latitude and climate of the two regions.”

### Sequence or order

Prompt reconstruction of the ordering rule or the first useful step. Do not
give the missing item or its position. If the complete sequence is displayed
and the question asks for a displayed item, flag the question.

### Direction or rule

Prompt retrieval of the governing rule and its application. Do not state the
directional result.

### Classification

Tell the student which characteristics or criteria to compare with the
categories. Do not name the category that is the answer.

### Reference or lookup

Use **RESOURCE + ACTION**:

> “Use the official list/reference. Find the relevant entry and compare the
> printed information with the choices.”

The resource may be an official event list, table, rules section, handbook,
source paragraph, or permitted reference already relevant to the question.
Do not provide the answer row, column, cell, value, heading, or lookup result.

### Image or specimen

Direct attention to where and how to inspect: a marked region, arrangement,
shape, count, proportion, or comparison. Do not name a diagnostic feature that
uniquely identifies one choice.

### Calculation

Point toward the governing relationship, formula family, units, or first step.
Do not perform arithmetic, substitute values, provide an intermediate result,
or reproduce an answer-specific formula choice.

### Multi-step reasoning

Give the first useful subgoal or tell the student what process to trace. Do not
provide the complete causal chain or final inference.

## 11. Retrieval, difficulty, and help-seeking

Hints should support retrieval practice rather than replace it. Let the learner
attempt the question first; the hint should provide contingent assistance when
they are stuck, not a second explanation that removes the challenge.

This is a desirable difficulty: the student receives enough structure to make
progress, but still retrieves, compares, interprets, or decides. Scaffolding
should be smaller than the target task and should preserve active sense-making.

Use metacognitive prompts only when they name a concrete action:

**Good:** “First identify what each choice is measuring, then compare it with
the named quantity.”

**Bad:** “Think about the concept.”

## 12. Age and readability

Hints should be:

- concise and concrete
- readable by K–8 learners
- one idea at a time
- free of unnecessary jargon
- grammatically simple
- calm and non-condescending

Aim for roughly 8–20 words when possible. Twenty-five words is a practical
ceiling unless a longer hint is genuinely necessary for clarity. Do not
sacrifice educational quality to meet an arbitrary word count.

## 13. Single-hint constraint

The MVP has one authored hint. There is no Hint 1 → Hint 2 → bottom-out
sequence. Do not add:

- a second-stage answer
- a solution walkthrough
- “if you are still stuck” answer content
- a hidden conclusion
- `hint2`

The one hint should be useful enough to unstick the learner while preserving
the target cognitive work.

## 14. Bad-hint patterns

Reject:

- “Think carefully.”
- “Use what you know.”
- “Focus on the question.”
- “Read the choices carefully.”
- “Focus on [the exact thing asked].”
- a declarative restatement of the stem
- a mini explanation of the science
- a named distractor list
- an answer-specific lookup result
- a unique image diagnostic
- a requested relationship stated as a clue

Question rephrasing is a distinct failure:

**Question:** “What does biodiversity measure?”
**Hint:** “Focus on what biodiversity measures.”

**Result:** FAIL. It adds no retrieval, comparison, lookup, or reasoning step.

## 15. Canonical Jr. Explorer examples

### Example 1: the question gives away the answer

**Bad:** `Individual → Population → Community → Ecosystem → Biome →
Biosphere. Which level comes immediately after Community?`

**Diagnosis:** QUESTION DESIGN FAILURE. The answer is displayed.

**Better item:** `Individual → Population → Community → ______ → Biome →
Biosphere.`

The eventual hint may support the ordering rule, but must not name the missing
level.

### Example 2: Coriolis

**Question:** “In the Northern Hemisphere, toward which side is moving air
deflected?”

**Bad:** “Northern and Southern Hemispheres deflect opposite ways.”

**Diagnosis:** Safe from a direct answer term, but too weak and insufficiently
actionable.

A better hint should direct the student to retrieve and apply the
hemisphere-specific Coriolis rule without stating the direction.

### Example 3: carrying capacity

**Bad:** “This quantity is an environmental limit on population size...”

**Diagnosis:** ANSWER-SPACE COLLAPSE / DISTINCTIVE-PHRASE LEAKAGE. The correct
choice contains the distinctive population-limit idea.

A better hint should direct the learner to think about what happens to
population growth as environmental resources become limiting, after checking
that the wording does not uniquely match one option.

### Example 4: Arctic tundra

**Bad:** “Use the north-of-boreal-forest location in the Arctic...”

**Diagnosis:** TARGET-RELATION LEAKAGE. The requested spatial relationship is
supplied.

A better hint should direct the learner to compare latitude and climate without
stating their relationship.

## 16. Gold-standard authoring algorithm

For every question:

1. Read the stem, all four choices, keyed answer, existing explanation,
   existing hint, and relevant source/reference.
2. Identify what the question actually tests.
3. Check whether the question itself is flawed or answer-revealing.
4. Identify the operation: retrieve, compare, classify, sequence, apply a rule,
   inspect, calculate, look up, or reason through a subgoal.
5. Choose one hint strategy from this guide.
6. Write one concise hint directing the next useful action.
7. Compare the draft against all four choices.
8. Run every leakage test, including target relation and answer-space collapse.
9. Ask: “If the student follows this hint, do they still have to know or
   reason their way to the answer?” If no, rewrite.
10. Ask: “Would removing this hint remove a useful next step?” If no, rewrite
    or remove the hint.
11. Check age-appropriateness, readability, and one-cognitive-job focus.
12. Accept only when every hard gate passes.

## 17. Final QA checklist

### Question integrity

- [ ] The stem does not reveal the answer.
- [ ] The choices do not structurally reveal the answer.
- [ ] There is one intended answer.
- [ ] Any question defect is flagged separately from hint quality.

### Actionability

- [ ] The hint tells the student what to do next.
- [ ] The action is concrete and appropriate to the question type.
- [ ] The hint is more than “think,” “focus,” or a stem rephrase.

### Cognitive preservation

- [ ] The student still retrieves, reasons, compares, classifies, calculates,
      interprets, or looks up the result.
- [ ] The hint does not complete the important inference or subgoal chain.

### Leakage and choice-space preservation

- [ ] No direct answer term, synonym, alias, or parenthetical answer text.
- [ ] No definition or distinctive phrase matching one choice.
- [ ] No unique property, category, classifier, or distractor elimination.
- [ ] No target relation or sequence position.
- [ ] No visual diagnostic that uniquely identifies an option.
- [ ] No reference result, numerical result, or answer-specific formula.
- [ ] The hint does not collapse four choices into one or make one choice
      uniquely recognizable.

### Student experience

- [ ] One clear cognitive-support function.
- [ ] Concise, concrete, and K–8 readable.
- [ ] No unnecessary jargon or textbook lecture.
- [ ] No second-stage answer or `hint2`.

If any leakage test fails, the hint is rejected regardless of its other
strengths.

## 18. Final pass/fail rubric

Leakage is a hard gate; it cannot be averaged away.

### GOLD / PASS

Specific, actionable, educationally useful, preserves the target cognitive
work, and contains no meaningful leakage.

### PASS

Useful and safe, but broader or less elegant than ideal.

### REVISE

Safe but too vague, generic, or insufficiently actionable.

### FAIL

Meaningful answer-space reduction, target-relation leakage, distinctive
matching cue, unfair elimination, or another structural leakage.

### FATAL FAIL

Direct answer, definition, solution, exact lookup result, or unmistakable
equivalent.

Only GOLD / PASS or PASS should ship. A safe but useless hint is not finished.

## 19. Final AI agent specification

When authoring or reviewing a live hint, follow this guide as the source of
truth. Never author from the stem, topic, or correct answer alone. Always
inspect all four choices and relevant evidence, preserve the tested cognitive
operation, write one process-specific next action, and reject any hint that
lets a learner select an option by matching the hint instead of solving.
