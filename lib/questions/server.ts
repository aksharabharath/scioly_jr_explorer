import "server-only";

import type { LearningAttempt } from "@/lib/learning/adaptive";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type {
  AnswerChoice,
  DifficultyLevel,
  PublicPracticeQuestion,
  Question,
  QuestionReference,
} from "@/lib/types";

const QUESTION_TABLES = {
  entomology: "entomology_questions",
  "anatomy-physiology": "anatomy_physiology_questions",
  ecology: "ecology_questions",
  "water-quality": "water_quality_questions",
  "crime-busters": "crime_busters_questions",
  codebusters: "codebusters_questions",
} as const;

export type QuestionEventId = keyof typeof QUESTION_TABLES;

const QUESTION_COLUMNS = [
  "id",
  "event_id",
  "topic_id",
  "prompt",
  "choices",
  "correct_choice_id",
  "answer_mode",
  "accepted_answers",
  "explanation",
  "hint",
  "hint_2",
  "prompt_terms",
  "wording_help",
  "difficulty",
  "image_required",
  "image_src",
  "image_alt",
  "image_credit",
  "image_brief",
  "verification_status",
  "cognitive_demand",
  "source_type",
  "source_note",
  "evidence_ids",
  "taxonomy_tags",
].join(",");

type QuestionRow = {
  id: unknown;
  event_id: unknown;
  topic_id: unknown;
  prompt: unknown;
  choices: unknown;
  correct_choice_id: unknown;
  answer_mode: unknown;
  accepted_answers: unknown;
  explanation: unknown;
  hint: unknown;
  hint_2: unknown;
  prompt_terms: unknown;
  wording_help: unknown;
  difficulty: unknown;
  image_required: unknown;
  image_src: unknown;
  image_alt: unknown;
  image_credit: unknown;
  image_brief: unknown;
  verification_status: unknown;
  cognitive_demand: unknown;
  source_type: unknown;
  source_note: unknown;
  evidence_ids: unknown;
  taxonomy_tags: unknown;
};

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function choicesValue(value: unknown): AnswerChoice[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((choice) => {
    if (
      typeof choice !== "object" ||
      choice === null ||
      typeof (choice as { id?: unknown }).id !== "string" ||
      typeof (choice as { text?: unknown }).text !== "string"
    ) {
      return [];
    }
    return [
      {
        id: (choice as { id: string }).id,
        text: (choice as { text: string }).text,
      },
    ];
  });
}

function stringArrayValue(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const values = value.filter(
    (item): item is string => typeof item === "string",
  );
  return values.length > 0 ? values : undefined;
}

function difficultyValue(value: unknown): DifficultyLevel {
  return value === 1 || value === 2 || value === 3 ? value : 1;
}

function rowToQuestion(row: QuestionRow): Question {
  const question: Question = {
    id: String(row.id),
    eventId: String(row.event_id),
    topicId: String(row.topic_id),
    prompt: String(row.prompt),
    choices: choicesValue(row.choices),
    correctChoiceId: stringValue(row.correct_choice_id) ?? "",
    answerMode: row.answer_mode === "open-ended" ? "open-ended" : "multiple-choice",
    explanation: String(row.explanation),
    hint: String(row.hint),
    difficulty: difficultyValue(row.difficulty),
  };

  const acceptedAnswers = stringArrayValue(row.accepted_answers);
  if (acceptedAnswers) {
    question.acceptedAnswers = acceptedAnswers;
  }
  const hint2 = stringValue(row.hint_2);
  if (hint2) question.hint2 = hint2;
  const promptTerms = row.prompt_terms;
  if (Array.isArray(promptTerms)) {
    question.promptTerms = promptTerms as Question["promptTerms"];
  }
  const wordingHelp = stringValue(row.wording_help);
  if (wordingHelp) question.wordingHelp = wordingHelp;
  if (typeof row.image_required === "boolean") {
    question.imageRequired = row.image_required;
  }
  const imageSrc = stringValue(row.image_src);
  if (imageSrc) question.imageSrc = imageSrc;
  const imageAlt = stringValue(row.image_alt);
  if (imageAlt) question.imageAlt = imageAlt;
  const imageCredit = stringValue(row.image_credit);
  if (imageCredit) question.imageCredit = imageCredit;
  const imageBrief = stringValue(row.image_brief);
  if (imageBrief) question.imageBrief = imageBrief;
  const cognitiveDemand = stringValue(row.cognitive_demand);
  if (cognitiveDemand) question.cognitiveDemand = cognitiveDemand;
  const sourceType = stringValue(row.source_type);
  if (sourceType) question.sourceType = sourceType;
  const sourceNote = stringValue(row.source_note);
  if (sourceNote) question.sourceNote = sourceNote;
  const evidenceIds = stringArrayValue(row.evidence_ids);
  if (evidenceIds) question.evidenceIds = evidenceIds;
  const taxonomyTags = stringArrayValue(row.taxonomy_tags);
  if (taxonomyTags) question.taxonomyTags = taxonomyTags;
  const verificationStatus = stringValue(row.verification_status);
  if (
    verificationStatus === "draft" ||
    verificationStatus === "needs-review" ||
    verificationStatus === "verified"
  ) {
    question.verificationStatus = verificationStatus;
  }
  return question;
}

export function questionHasPracticeImage(question: Question): boolean {
  return Boolean(
    question.imageSrc?.trim() && question.imageAlt?.trim(),
  );
}

export function isLivePracticeQuestion(question: Question): boolean {
  if ((question.verificationStatus ?? "verified") !== "verified") {
    return false;
  }
  return question.imageRequired === true
    ? questionHasPracticeImage(question)
    : true;
}

function sanitizeQuestion(
  question: Question,
  questionVersionId: string,
): PublicPracticeQuestion {
  const {
    correctChoiceId: _correctChoiceId,
    acceptedAnswers: _acceptedAnswers,
    explanation: _explanation,
    ...safeQuestion
  } = question;
  void _correctChoiceId;
  void _acceptedAnswers;
  void _explanation;
  return {
    ...safeQuestion,
    answerMode: question.answerMode ?? "multiple-choice",
    questionVersionId,
  };
}

async function getQuestionsFromTable(
  eventId: QuestionEventId,
): Promise<Question[]> {
  const table = QUESTION_TABLES[eventId];
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from(table)
    .select(QUESTION_COLUMNS)
    .order("id", { ascending: true });
  if (error) {
    throw new Error(`Could not load ${eventId} questions: ${error.message}`);
  }
  return ((data ?? []) as unknown as QuestionRow[]).map(rowToQuestion);
}

export async function getAllQuestions(): Promise<Question[]> {
  const banks = await Promise.all(
    (Object.keys(QUESTION_TABLES) as QuestionEventId[]).map(
      getQuestionsFromTable,
    ),
  );
  return banks.flat();
}

export async function getQuestionById(
  questionId: string,
): Promise<Question | undefined> {
  const supabase = createServiceRoleClient();
  for (const table of Object.values(QUESTION_TABLES)) {
    const { data, error } = await supabase
      .from(table)
      .select(QUESTION_COLUMNS)
      .eq("id", questionId)
      .maybeSingle();
    if (error) {
      throw new Error(`Could not load question ${questionId}: ${error.message}`);
    }
    if (data) {
      return rowToQuestion(data as unknown as QuestionRow);
    }
  }
  return undefined;
}

export async function getQuestionsForEvent(
  eventId: string,
): Promise<Question[]> {
  if (!(eventId in QUESTION_TABLES)) {
    return [];
  }
  const questions = await getQuestionsFromTable(eventId as QuestionEventId);
  return questions.filter(isLivePracticeQuestion);
}

export async function getQuestionReferences(): Promise<QuestionReference[]> {
  const questions = await getAllQuestions();
  return questions.map(({ id, eventId, topicId, difficulty }) => ({
    id,
    eventId,
    topicId,
    difficulty,
  }));
}

type CreateExpeditionInput = {
  eventId: string;
  userId: string;
  topicIds?: string[] | null;
  history: LearningAttempt[];
};

export type CreatedExpedition = {
  sessionId: string;
  questions: PublicPracticeQuestion[];
};

export async function createExpedition(
  input: CreateExpeditionInput,
): Promise<CreatedExpedition> {
  const supabase = createServiceRoleClient();
  await supabase
    .from("practice_expeditions")
    .delete()
    .eq("user_id", input.userId)
    .lt("expires_at", new Date().toISOString());
  const allLiveQuestions = await getQuestionsForEvent(input.eventId);
  const topicQuestions = input.topicIds?.length
    ? allLiveQuestions.filter((question) =>
        input.topicIds?.includes(question.topicId),
      )
    : allLiveQuestions;
  const bank =
    topicQuestions.length >= 10 ? topicQuestions : allLiveQuestions;
  const orderedQuestions = selectProgressBasedQuestions(bank, input.history);
  if (orderedQuestions.length !== 10) {
    throw new Error("Could not select 10 unique expedition questions.");
  }
  const questionIds = orderedQuestions.map((question) => question.id);

  const { data: versions, error: versionError } = await supabase
    .from("question_versions")
    .insert(orderedQuestions.map(questionVersionInsert))
    .select("id, question_id");
  if (versionError || !versions || versions.length !== 10) {
    throw new Error(versionError?.message ?? "Could not snapshot questions.");
  }
  const versionByQuestionId = new Map(
    versions.map((version) => [String(version.question_id), String(version.id)]),
  );
  const versionIds = orderedQuestions.map((question) => {
    const versionId = versionByQuestionId.get(question.id);
    if (!versionId) throw new Error("Question version is missing.");
    return versionId;
  });
  const { data: expedition, error: expeditionError } = await supabase
    .from("practice_expeditions")
    .insert({
      user_id: input.userId,
      event_id: input.eventId,
      question_ids: questionIds,
      question_version_ids: versionIds,
    })
    .select("id")
    .single();
  if (expeditionError || !expedition) {
    throw new Error(expeditionError?.message ?? "Could not start expedition.");
  }
  return {
    sessionId: String(expedition.id),
    questions: orderedQuestions.map((question, index) =>
      sanitizeQuestion(question, versionIds[index]),
    ),
  };
}

function selectProgressBasedQuestions(
  bank: Question[],
  history: LearningAttempt[],
): Question[] {
  const accuracy =
    history.length === 0
      ? null
      : history.filter((attempt) => attempt.isCorrect).length / history.length;
  const counts =
    history.length < 5 || accuracy == null
      ? { 1: 4, 2: 4, 3: 2 }
      : accuracy < 0.6
        ? { 1: 6, 2: 4, 3: 0 }
        : accuracy < 0.8
          ? { 1: 2, 2: 6, 3: 2 }
          : accuracy < 0.9
            ? { 1: 1, 2: 6, 3: 3 }
            : { 1: 0, 2: 4, 3: 6 };
  const selected: Question[] = [];
  const selectedIds = new Set<string>();
  const shuffled = [...bank].sort(() => Math.random() - 0.5);

  for (const difficulty of [1, 2, 3] as const) {
    for (const question of shuffled) {
      if (
        question.difficulty === difficulty &&
        !selectedIds.has(question.id) &&
        selected.length < counts[1] + counts[2] + counts[3] &&
        selected.filter((item) => item.difficulty === difficulty).length <
          counts[difficulty]
      ) {
        selected.push(question);
        selectedIds.add(question.id);
      }
    }
  }

  for (const question of shuffled) {
    if (selected.length === 10) break;
    if (!selectedIds.has(question.id)) {
      selected.push(question);
      selectedIds.add(question.id);
    }
  }

  return selected;
}

function questionVersionInsert(question: Question) {
  return {
    question_id: question.id,
    event_id: question.eventId,
    topic_id: question.topicId,
    prompt: question.prompt,
    choices: question.choices,
    correct_choice_id: question.correctChoiceId || null,
    answer_mode: question.answerMode ?? "multiple-choice",
    accepted_answers: question.acceptedAnswers ?? null,
    explanation: question.explanation,
    hint: question.hint,
    hint_2: question.hint2 ?? null,
    prompt_terms: question.promptTerms ?? null,
    wording_help: question.wordingHelp ?? null,
    difficulty: question.difficulty,
    image_required: question.imageRequired ?? null,
    image_src: question.imageSrc ?? null,
    image_alt: question.imageAlt ?? null,
    image_credit: question.imageCredit ?? null,
    image_brief: question.imageBrief ?? null,
    verification_status: question.verificationStatus ?? null,
    cognitive_demand: question.cognitiveDemand ?? null,
    source_type: question.sourceType ?? null,
    source_note: question.sourceNote ?? null,
    evidence_ids: question.evidenceIds ?? null,
    taxonomy_tags: question.taxonomyTags ?? null,
  };
}


export const QUESTION_TABLE_BY_EVENT = QUESTION_TABLES;
