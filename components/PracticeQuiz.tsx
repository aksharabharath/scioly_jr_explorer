"use client";

import {
  savePracticeAttempt,
  saveQuestionFeedback,
  type QuestionFeedbackIssue,
} from "@/app/practice/actions";
import { startPracticeExpedition } from "@/app/practice/actions";
import { ExpeditionRewardsOverlay } from "@/components/ExpeditionRewardsOverlay";
import { TrickyTopicsEmpty } from "@/components/TrickyTopicsEmpty";
import { PromptWithTerms } from "@/components/PromptWithTerms";
import { XpAwardFeedback } from "@/components/XpAwardFeedback";
import { glossaryForEvent } from "@/lib/mock/glossary";
import {
  attemptFromQuestion,
  type LearningAttempt,
  type PracticeMode,
} from "@/lib/learning/adaptive";
import {
  BARE_BONES_BADGE_IDS,
  definitionsForIds,
  getNewlyEarnedBadgesFromAttempts,
  toSessionBadgeAttempts,
  type BadgeDefinition,
  type BadgeId,
  type BadgeProgressAttempt,
} from "@/lib/badges";
import {
  attemptUsedAHint,
  missedAnswerContrast,
  summarizePractice,
  type AnswerRecord,
} from "@/lib/practice";
import {
  calculateLevelFromXp,
  formatXpGain,
  localCalendarDate,
  newlyReachedStreakMilestone,
  streakLabel,
  type StreakMilestone,
} from "@/lib/gamification";
import {
  expeditionLogEntries,
  questionsPracticedOnLocalDate,
} from "@/lib/expeditions";
import {
  DEFAULT_DAILY_PRACTICE_GOAL,
  isDailyMissionComplete,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";
import type {
  PracticeSummary,
  PublicPracticeQuestion,
  QuestionReference,
} from "@/lib/types";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type PracticeQuizProps = {
  eventId: string;
  eventName: string;
  questions: PublicPracticeQuestion[];
  sessionId: string;
  priorAttempts: LearningAttempt[];
  priorBadgeAttempts: BadgeProgressAttempt[];
  questionReferences: QuestionReference[];
  initialAttemptCount: number;
  initialXp?: number;
  initialStreakDays?: number;
  resumeSession?: {
    sessionId: string;
    attempts: Array<{
      questionId: string;
      selectedChoiceId: string;
      isCorrect: boolean;
      hintUsed: boolean;
    }>;
    sessionXp: number;
  };
  dailyPracticeGoal?: DailyPracticeGoal;
  mode?: PracticeMode;
  practiceTopicId?: string | null;
  previouslyAnsweredQuestionIds: string[];
  completedExpeditions: number;
};

type ActiveQuizState = {
  status: "active";
  question: PublicPracticeQuestion;
  askedIds: string[];
  sessionTopics: string[];
  selectedChoiceId: string | null;
  typedAnswer: string;
  revealedHint: boolean;
  revealedHint2: boolean;
  submitted: boolean;
  submittedIsCorrect: boolean | null;
  revealedChoiceId: string | null;
  explanation: string | null;
  kidExplanation: string | null;
  records: AnswerRecord[];
  history: LearningAttempt[];
  saveError: string | null;
  saved: boolean;
  saving: boolean;
  attemptCount: number;
  /** Server-reported award for the current answer. Null until save succeeds. */
  xpAward: {
    attemptXp: number;
    sessionBonusXp: number;
  } | null;
  questionFeedback: QuestionFeedbackState;
};

type QuestionFeedbackState = {
  feedback: "positive" | "negative" | null;
  issueCodes: QuestionFeedbackIssue[];
  otherText: string;
  detailSubmitted: boolean;
};

const QUESTION_FEEDBACK_OPTIONS: Array<{
  value: QuestionFeedbackIssue;
  label: string;
}> = [
  { value: "unfamiliar_words", label: "I don’t know a word" },
  {
    value: "correct_answer_may_be_wrong",
    label: "The right answer looks wrong",
  },
  { value: "explanation_confusing", label: "The explanation is confusing" },
  { value: "too_easy", label: "This was too easy" },
  { value: "too_hard", label: "This was too hard" },
  { value: "other", label: "Something else" },
];

type CompleteQuizState = {
  status: "complete";
  records: AnswerRecord[];
  history: LearningAttempt[];
  attemptCount: number;
  sessionXp: number;
  streakDays: number;
  /** Persisted total XP after the last successful save. Null if none. */
  totalXp: number | null;
  newlyEarnedIds: BadgeId[];
  leveledUpTo: number | null;
  streakMilestone: StreakMilestone | null;
  dailyMissionComplete: boolean;
  comparisonMessage: string;
  newPersonalBest: boolean;
};

type ClearedWeakQuizState = {
  status: "cleared-weak";
  history: LearningAttempt[];
  attemptCount: number;
};

type QuizState = ActiveQuizState | CompleteQuizState | ClearedWeakQuizState;

function beginSet(
  questions: PublicPracticeQuestion[],
  history: LearningAttempt[],
  attemptCount: number,
  mode: PracticeMode,
  eventId: string,
  expeditionNumber: number,
  previouslyAnsweredQuestionIds: string[],
  resumeSession?: PracticeQuizProps["resumeSession"],
): QuizState {
  const initialQuestion = questions[0];
  if (!initialQuestion) {
    return mode === "weak"
      ? { status: "cleared-weak", history, attemptCount }
      : {
          status: "complete",
          records: [],
          history,
          attemptCount,
          sessionXp: 0,
          streakDays: 0,
          totalXp: null,
          newlyEarnedIds: [],
          leveledUpTo: null,
          streakMilestone: null,
          dailyMissionComplete: false,
          comparisonMessage: "Another Expedition complete! 🌟",
          newPersonalBest: false,
        };
  }
  const resumedAttempts = resumeSession?.attempts ?? [];
  const resumedRecords: AnswerRecord[] = resumedAttempts
    .filter((item) => item.questionId === initialQuestion.id)
    .map((item) => ({
      questionId: item.questionId,
      selectedChoiceId: item.selectedChoiceId,
      isCorrect: item.isCorrect,
      hintUsed: item.hintUsed,
    }));
  const resumedHistory = resumedRecords.reduce<LearningAttempt[]>(
    (items, record) => {
      return [
        ...items,
        attemptFromQuestion(
          initialQuestion,
          record.isCorrect,
          record.hintUsed,
        ),
      ];
    },
    [],
  );
  const historyAlreadyIncludesSession =
    resumedRecords.length > 0 &&
    resumedRecords.every(
      (record, index) =>
        history[history.length - resumedRecords.length + index]?.questionId ===
        record.questionId,
    );
  const sessionHistory = historyAlreadyIncludesSession
    ? history
    : [...history, ...resumedHistory];
  const askedIds = resumedRecords.map((record) => record.questionId);
  const sessionTopics = resumedRecords
    .map((record) =>
      record.questionId === initialQuestion.id ? initialQuestion.topicId : null,
    )
    .filter((topicId): topicId is string => Boolean(topicId));
  void mode;
  void eventId;
  void expeditionNumber;
  void previouslyAnsweredQuestionIds;

  return {
    status: "active",
    question: initialQuestion,
    askedIds: [...askedIds, initialQuestion.id],
    sessionTopics: [...sessionTopics, initialQuestion.topicId],
    selectedChoiceId: null,
    typedAnswer: "",
    revealedHint: false,
    revealedHint2: false,
    submitted: false,
    submittedIsCorrect: null,
    revealedChoiceId: null,
    explanation: null,
    kidExplanation: null,
    records: resumedRecords,
    history: sessionHistory,
    saveError: null,
    saved: false,
    saving: false,
    attemptCount,
    xpAward: null,
    questionFeedback: {
      feedback: null,
      issueCodes: [],
      otherText: "",
      detailSubmitted: false,
    },
  };
}

function newlyEarnedForSession(
  prior: BadgeProgressAttempt[],
  records: AnswerRecord[],
  sessionId: string,
  bank: QuestionReference[],
  streakDaysBefore: number,
  streakDaysAfter: number,
): BadgeId[] {
  return getNewlyEarnedBadgesFromAttempts(
    prior,
    [...prior, ...toSessionBadgeAttempts(records, sessionId)],
    bank,
    streakDaysBefore,
    streakDaysAfter,
  );
}

export function PracticeQuiz({
  eventId,
  eventName,
  questions,
  sessionId,
  priorAttempts,
  priorBadgeAttempts,
  questionReferences,
  initialAttemptCount,
  initialXp = 0,
  initialStreakDays = 0,
  resumeSession,
  dailyPracticeGoal = DEFAULT_DAILY_PRACTICE_GOAL,
  mode = "normal",
  practiceTopicId = null,
  previouslyAnsweredQuestionIds,
  completedExpeditions,
}: PracticeQuizProps) {
  const expeditionNumberRef = useRef(completedExpeditions + 1);
  const sessionModeRef = useRef(mode);
  const previouslyAnsweredQuestionIdsRef = useRef([
    ...previouslyAnsweredQuestionIds,
  ]);
  const [state, setState] = useState<QuizState>(() =>
    beginSet(
      questions,
      priorAttempts,
      initialAttemptCount,
      mode,
      eventId,
      completedExpeditions + 1,
      previouslyAnsweredQuestionIds,
      resumeSession,
    ),
  );
  const feedbackRef = useRef<HTMLDivElement>(null);
  const savingRef = useRef(false);
  const sessionIdRef = useRef(sessionId);
  const attemptIdRef = useRef<string | null>(null);
  const feedbackSavingRef = useRef(false);
  const sessionXpRef = useRef(resumeSession?.sessionXp ?? 0);
  const streakDaysRef = useRef(0);
  const totalXpRef = useRef<number | null>(null);
  const badgeAttemptsRef = useRef(priorBadgeAttempts);
  const baselineXpRef = useRef(initialXp);
  const baselineStreakRef = useRef(initialStreakDays);
  const wordingHelpRegionId = useId();
  const [wordingHelpQuestionId, setWordingHelpQuestionId] = useState<
    string | null
  >(null);
  const activeQuestionId =
    state.status === "active" ? state.question.id : "";
  const wordingHelpOpen = wordingHelpQuestionId === activeQuestionId;
  const showFeedback = state.status === "active" && state.submitted;

  useEffect(() => {
    if (!showFeedback) {
      return;
    }
    feedbackRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [showFeedback]);

  function startNewSession(nextMode: PracticeMode) {
    if (totalXpRef.current != null) {
      baselineXpRef.current = totalXpRef.current;
    }
    if (streakDaysRef.current > 0) {
      baselineStreakRef.current = streakDaysRef.current;
    }
    attemptIdRef.current = null;
    sessionXpRef.current = 0;
    streakDaysRef.current = 0;
    totalXpRef.current = null;
    sessionModeRef.current = nextMode;
  }

  async function loadNewSession(
    nextMode: PracticeMode,
    history: LearningAttempt[],
    attemptCount: number,
  ) {
    startNewSession(nextMode);
    const nextExpedition = await startPracticeExpedition({
      eventId,
      mode: nextMode,
      history,
      topicId: practiceTopicId,
    });
    if (!nextExpedition) {
      setState(
        nextMode === "weak"
          ? { status: "cleared-weak", history, attemptCount }
          : {
              status: "complete",
              records: [],
              history,
              attemptCount,
              sessionXp: 0,
              streakDays: 0,
              totalXp: null,
              newlyEarnedIds: [],
              leveledUpTo: null,
              streakMilestone: null,
              dailyMissionComplete: false,
              comparisonMessage: "Another Expedition complete! 🌟",
              newPersonalBest: false,
            },
      );
      return;
    }
    sessionIdRef.current = nextExpedition.sessionId;
    setState(
      beginSet(
        nextExpedition.questions,
        history,
        attemptCount,
        nextMode,
        eventId,
        ++expeditionNumberRef.current,
        previouslyAnsweredQuestionIdsRef.current,
      ),
    );
  }

  function finishSet(
    nextRecords: AnswerRecord[],
    nextHistory: LearningAttempt[],
    attemptCount: number,
  ): CompleteQuizState {
    const streakAfter = streakDaysRef.current;
    const summary = summarizePractice(nextRecords);
    const previousEntries = expeditionLogEntries(
      badgeAttemptsRef.current,
      questionReferences,
      { [eventId]: eventName },
      1000,
    ).filter((entry) => entry.eventId === eventId);
    const previousAccuracies = previousEntries
      .slice(0, 3)
      .map((entry) => (entry.correctAnswers / Math.max(1, entry.questionsAnswered)) * 100);
    const currentAccuracy = summary.accuracyPercent ?? 0;
    const recentAverage =
      previousAccuracies.length > 0
        ? previousAccuracies.reduce((total, value) => total + value, 0) /
          previousAccuracies.length
        : currentAccuracy;
    const comparisonMessage =
      currentAccuracy >= recentAverage + 5
        ? "You're getting better! 🚀"
        : currentAccuracy <= recentAverage - 5
          ? "You kept exploring — nice work! 💪"
          : "Another Expedition complete! 🌟";
    const newPersonalBest =
      previousEntries.length === 0 ||
      previousEntries.every(
        (entry) =>
          currentAccuracy >
          (entry.correctAnswers / Math.max(1, entry.questionsAnswered)) * 100,
      );
    const newlyEarnedIds = newlyEarnedForSession(
      badgeAttemptsRef.current,
      nextRecords,
      sessionIdRef.current,
      questionReferences,
      baselineStreakRef.current,
      streakAfter,
    );
    const practiceDate = localCalendarDate();
    const practicedBefore = questionsPracticedOnLocalDate(
      badgeAttemptsRef.current,
      practiceDate,
    );
    const practicedAfter = practicedBefore + nextRecords.length;
    badgeAttemptsRef.current = [
      ...badgeAttemptsRef.current,
      ...toSessionBadgeAttempts(
        nextRecords,
        sessionIdRef.current,
        new Date().toISOString(),
      ),
    ];
    const previousLevel = calculateLevelFromXp(baselineXpRef.current);
    const nextLevel =
      totalXpRef.current == null
        ? previousLevel
        : calculateLevelFromXp(totalXpRef.current);
    return {
      status: "complete",
      records: nextRecords,
      history: nextHistory,
      attemptCount,
      sessionXp: sessionXpRef.current,
      streakDays: streakAfter,
      totalXp: totalXpRef.current,
      newlyEarnedIds,
      leveledUpTo: nextLevel > previousLevel ? nextLevel : null,
      streakMilestone: newlyReachedStreakMilestone(
        baselineStreakRef.current,
        streakAfter,
      ),
      dailyMissionComplete:
        isDailyMissionComplete(practicedAfter, dailyPracticeGoal) &&
        !isDailyMissionComplete(practicedBefore, dailyPracticeGoal),
      comparisonMessage,
      newPersonalBest,
    };
  }

  if (state.status === "cleared-weak") {
    return (
      <TrickyTopicsEmpty eventId={eventId} eventName={eventName} />
    );
  }

  if (state.status === "complete") {
    const summary = summarizePractice(state.records);
    return (
      <ResultsCard
        eventId={eventId}
        eventName={eventName}
        summary={summary}
        onMoveOn={() =>
          void loadNewSession("normal", state.history, state.attemptCount)
        }
        sessionXp={state.sessionXp}
        streakDays={state.streakDays}
        totalXp={state.totalXp}
        newlyEarned={definitionsForIds(
          state.newlyEarnedIds.filter((id) =>
            BARE_BONES_BADGE_IDS.includes(id as (typeof BARE_BONES_BADGE_IDS)[number]),
          ),
        )}
        leveledUpTo={state.leveledUpTo}
        streakMilestone={state.streakMilestone}
        dailyMissionComplete={state.dailyMissionComplete}
        comparisonMessage={state.comparisonMessage}
        newPersonalBest={state.newPersonalBest}
      />
    );
  }

  const question = state.question;
  const plannedTotal = questions.length;
  const isLast = state.records.length + 1 >= plannedTotal;
  const submittedAnswer =
    question.answerMode === "open-ended"
      ? state.typedAnswer
      : state.selectedChoiceId ?? "";
  const isCorrect = state.submittedIsCorrect === true;

  function selectChoice(choiceId: string) {
    if (state.status !== "active" || state.submitted) {
      return;
    }
    setState({ ...state, selectedChoiceId: choiceId });
  }

  function setTypedAnswer(value: string) {
    if (state.status !== "active" || state.submitted) {
      return;
    }
    setState({ ...state, typedAnswer: value });
  }

  async function checkAnswer() {
    // Duplicate protection (UI): ignore extra Check answer clicks.
    // The server still uses the same attemptId + unique award row.
    if (state.status !== "active" || !submittedAnswer.trim()) {
      return;
    }
    if (state.saved) {
      return;
    }
    if (savingRef.current) {
      if (!(state.submitted && !state.saved && !state.saving)) {
        return;
      }
      savingRef.current = false;
    }

    savingRef.current = true;
    const selectedChoiceId = submittedAnswer;
    if (!attemptIdRef.current) {
      attemptIdRef.current = crypto.randomUUID();
    }
    setState({
      ...state,
      submitted: true,
      saveError: null,
      saving: true,
      xpAward: null,
    });

    try {
      const result = await savePracticeAttempt({
        eventId,
        questionId: question.id,
        questionVersionId: question.questionVersionId,
        selectedOptionId: selectedChoiceId,
        hintUsed: attemptUsedAHint(state.revealedHint, state.revealedHint2),
        attemptId: attemptIdRef.current,
        sessionId: sessionIdRef.current,
        practiceDate: localCalendarDate(),
      });

      if (!result.ok) {
        setState((current) =>
          current.status === "active"
            ? { ...current, saveError: result.error, saving: false }
            : current,
        );
      } else {
        const earned = result.attemptXp + result.sessionBonusXp;
        if (earned > 0) {
          sessionXpRef.current += earned;
        }
        streakDaysRef.current = result.streakDays;
        totalXpRef.current = result.xp;
        setState((current) =>
          current.status === "active"
            ? {
                ...current,
                saveError: null,
                saved: true,
                saving: false,
                submittedIsCorrect: result.isCorrect,
                revealedChoiceId: result.revealedChoiceId,
                explanation: result.explanation,
                kidExplanation: result.kidExplanation,
                xpAward: {
                  attemptXp: result.attemptXp,
                  sessionBonusXp: result.sessionBonusXp,
                },
                attemptCount:
                  earned > 0
                    ? current.attemptCount + 1
                    : current.attemptCount,
              }
            : current,
        );
      }
    } catch {
      setState((current) =>
        current.status === "active"
          ? {
              ...current,
              saveError:
                "Your answer was checked, but it could not be saved. Try again later.",
              saving: false,
            }
          : current,
      );
    } finally {
      savingRef.current = false;
      setState((current) =>
        current.status === "active" && current.saving && !current.saved
          ? { ...current, saving: false }
          : current,
      );
    }
  }

  function selectQuestionFeedback(
    feedback: "positive" | "negative",
  ) {
    if (state.status !== "active" || !state.submitted) {
      return;
    }
    setState((current) =>
      current.status === "active"
        ? {
            ...current,
            questionFeedback: {
              ...current.questionFeedback,
              feedback,
            },
          }
        : current,
    );
  }

  function toggleQuestionFeedbackIssue(issue: QuestionFeedbackIssue) {
    if (state.status !== "active" || !state.submitted) {
      return;
    }
    setState((current) => {
      if (current.status !== "active") {
        return current;
      }
      const issueCodes = current.questionFeedback.issueCodes.includes(issue)
        ? current.questionFeedback.issueCodes.filter((item) => item !== issue)
        : [...current.questionFeedback.issueCodes, issue];
      return {
        ...current,
        questionFeedback: {
          ...current.questionFeedback,
          issueCodes,
          detailSubmitted: false,
        },
      };
    });
  }

  function setQuestionFeedbackOtherText(otherText: string) {
    if (state.status !== "active" || !state.submitted) {
      return;
    }
    setState((current) =>
      current.status === "active"
        ? {
            ...current,
            questionFeedback: {
              ...current.questionFeedback,
              otherText,
              detailSubmitted: false,
            },
          }
        : current,
    );
  }

  function submitQuestionFeedbackDetails() {
    if (
      state.status !== "active" ||
      !state.submitted ||
      state.questionFeedback.feedback !== "negative"
    ) {
      return;
    }
    setState((current) =>
      current.status === "active"
        ? {
            ...current,
            questionFeedback: {
              ...current.questionFeedback,
              detailSubmitted: true,
            },
          }
        : current,
    );
  }

  async function continueToNext() {
    if (
      state.status !== "active" ||
      !submittedAnswer.trim() ||
      !state.submitted ||
      !state.saved ||
      feedbackSavingRef.current
    ) {
      return;
    }

    feedbackSavingRef.current = true;
    const questionFeedback = state.questionFeedback;
    try {
      if (questionFeedback.feedback && attemptIdRef.current) {
        await saveQuestionFeedback({
          attemptId: attemptIdRef.current,
          eventId,
          questionId: question.id,
          questionVersionId: question.questionVersionId,
          feedback: questionFeedback.feedback,
          issueCodes: questionFeedback.issueCodes,
          otherText: questionFeedback.otherText,
        });
      }
    } catch {
      // Feedback is optional and must not block the next question.
    }

    const hintUsed = attemptUsedAHint(state.revealedHint, state.revealedHint2);
    const record: AnswerRecord = {
      questionId: question.id,
      selectedChoiceId: submittedAnswer,
      isCorrect,
      hintUsed,
    };
    const attempt = attemptFromQuestion(question, record.isCorrect, hintUsed);
    const nextHistory = [...state.history, attempt];
    const nextRecords = [...state.records, record];
    if (
      !previouslyAnsweredQuestionIdsRef.current.includes(record.questionId)
    ) {
      previouslyAnsweredQuestionIdsRef.current.push(record.questionId);
    }
    attemptIdRef.current = null;
    feedbackSavingRef.current = false;

    if (isLast) {
      setState(finishSet(nextRecords, nextHistory, state.attemptCount));
      return;
    }

    const nextQuestion = questions[nextRecords.length];

    if (!nextQuestion) {
      setState(finishSet(nextRecords, nextHistory, state.attemptCount));
      return;
    }

    setState({
      status: "active",
      question: nextQuestion,
      askedIds: [...state.askedIds, nextQuestion.id],
      sessionTopics: [...state.sessionTopics, nextQuestion.topicId],
      selectedChoiceId: null,
      typedAnswer: "",
      revealedHint: false,
      revealedHint2: false,
      submitted: false,
      submittedIsCorrect: null,
      revealedChoiceId: null,
      explanation: null,
      kidExplanation: null,
      records: nextRecords,
      history: nextHistory,
      saveError: null,
      saved: false,
      saving: false,
      attemptCount: state.attemptCount,
      xpAward: null,
      questionFeedback: {
        feedback: null,
        issueCodes: [],
        otherText: "",
        detailSubmitted: false,
      },
    });
  }

  const sessionNumber = state.records.length + 1;
  const progressPercent =
    plannedTotal === 0 ? 0 : Math.round((sessionNumber / plannedTotal) * 100);
  const missContrast =
    !isCorrect && state.selectedChoiceId && state.revealedChoiceId
      ? missedAnswerContrast(
          { choices: question.choices, correctId: state.revealedChoiceId },
          state.selectedChoiceId,
        )
      : null;

  const hasImage = Boolean(question.imageSrc);
  const hintUsed = attemptUsedAHint(state.revealedHint, state.revealedHint2);
  const wordingHelp = question.wordingHelp?.trim() ?? "";
  const glossary = glossaryForEvent(question.eventId);

  return (
    <section className="journal-panel rounded-3xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-stone-700">
          Question {sessionNumber} of {plannedTotal}
        </p>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={plannedTotal}
        aria-valuenow={sessionNumber}
        aria-label={`Question ${sessionNumber} of ${plannedTotal}`}
      >
        <div
          className="h-full rounded-full bg-teal transition-[width]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div
        className={`mt-4 grid gap-4 lg:items-start lg:gap-6 ${
          hasImage
            ? "lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
            : "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        }`}
      >
        <div>
          <div className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            <PromptWithTerms
              prompt={question.prompt}
              promptTerms={question.promptTerms}
              glossary={glossary}
            />
          </div>
          {question.imageSrc ? (
            <figure className="mt-3 overflow-hidden rounded-2xl border border-stone-200/80 bg-parchment">
              {/* Local public JPEGs (and any other static imageSrc); next/image is not required. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageSrc}
                alt={question.imageAlt ?? ""}
                className="mx-auto max-h-[min(36vh,280px)] w-full object-contain p-2"
              />
              {question.imageCredit ? (
                <figcaption className="px-3 pb-2 text-center text-xs leading-snug text-stone-500">
                  {question.imageCredit}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
          {state.submitted ? (
            <div className="mt-3 max-w-sm">
              <QuestionFeedbackPanel
                feedback={state.questionFeedback}
                onSelectFeedback={selectQuestionFeedback}
                onToggleIssue={toggleQuestionFeedbackIssue}
                onOtherTextChange={setQuestionFeedbackOtherText}
                onSubmitDetails={submitQuestionFeedbackDetails}
              />
            </div>
          ) : null}
        </div>

        <div>
          <div
            className={state.submitted ? "space-y-1.5" : "space-y-2"}
            role="group"
            aria-label={
              question.answerMode === "open-ended"
                ? "Type your answer"
                : "Answer choices"
            }
          >
            {question.answerMode === "open-ended" ? (
              <input
                type="text"
                value={state.typedAnswer}
                onChange={(event) => setTypedAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void checkAnswer();
                  }
                }}
                disabled={state.submitted}
                aria-label="Your answer"
                placeholder="Type your answer"
                className="min-h-12 w-full rounded-2xl border border-stone-200 bg-parchment px-4 py-3 text-base text-ink outline-none transition placeholder:text-stone-400 focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:bg-stone-100"
              />
            ) : question.choices.map((choice) => {
              const selected = state.selectedChoiceId === choice.id;
              const correctChoice =
                state.submitted && choice.id === state.revealedChoiceId;
              let choiceClass =
                "border-stone-200 bg-parchment/50 hover:border-teal/40 hover:bg-parchment";
              let letterClass = "bg-white text-stone-600";

              if (state.submitted && correctChoice) {
                choiceClass =
                  "choice-pulse border-teal bg-teal/10 text-teal-dark disabled:border-teal disabled:bg-teal/10 disabled:text-teal-dark disabled:opacity-100";
              } else if (
                state.submitted &&
                !state.saving &&
                state.submittedIsCorrect !== null &&
                selected &&
                !correctChoice
              ) {
                choiceClass =
                  "border-rose-300 bg-rose-50 text-rose-950 disabled:border-rose-300 disabled:bg-rose-50 disabled:text-rose-950 disabled:opacity-100";
                letterClass = "bg-rose-100 text-rose-900";
              } else if (!state.submitted && selected) {
                choiceClass = "border-teal bg-teal/10 text-teal-dark";
              } else if (state.submitted) {
                choiceClass =
                  "border-stone-200 bg-parchment/50 text-ink disabled:border-stone-200 disabled:bg-parchment/50 disabled:text-ink disabled:opacity-100";
              }

              return (
                <button
                  key={choice.id}
                  type="button"
                  disabled={state.submitted}
                  onClick={() => selectChoice(choice.id)}
                  className={`flex w-full items-start text-left transition disabled:cursor-default ${
                    state.submitted
                      ? "gap-2 rounded-xl border px-3 py-1.5 text-sm"
                      : "min-h-11 gap-3 rounded-2xl border px-4 py-2.5 text-base"
                  } ${choiceClass}`}
                >
                  <span
                    className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full font-semibold ${letterClass} ${
                      state.submitted
                        ? "h-6 w-6 text-xs"
                        : "h-7 w-7 text-sm"
                    }`}
                  >
                    {choice.id.toUpperCase()}
                  </span>
                  <span>{choice.text}</span>
                </button>
              );
            })}
          </div>

          {!state.submitted ? (
            <div className="mt-3 space-y-2">
              {wordingHelp ? (
                <div>
                  <button
                    type="button"
                    aria-expanded={wordingHelpOpen}
                    aria-controls={wordingHelpRegionId}
                    onClick={() =>
                      setWordingHelpQuestionId((current) =>
                        current === activeQuestionId ? null : activeQuestionId,
                      )
                    }
                    className="text-sm font-medium text-teal-dark underline-offset-4 hover:underline"
                  >
                    Explain this question
                  </button>
                  {wordingHelpOpen ? (
                    <div
                      id={wordingHelpRegionId}
                      className="mt-2 rounded-2xl border border-teal/20 bg-teal/5 px-4 py-2.5 text-sm leading-relaxed text-stone-700"
                    >
                      <p className="font-semibold text-ink">
                        What this is asking
                      </p>
                      <p className="mt-1">{wordingHelp}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <button
                type="button"
                onClick={checkAnswer}
                disabled={!submittedAnswer.trim() || state.submitted}
                className="min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check answer
              </button>
            </div>
          ) : null}

          {state.submitted ? (
            <div
              ref={feedbackRef}
              className="mt-3 space-y-2 rounded-2xl border border-stone-200/80 bg-parchment/50 p-3"
              aria-live="polite"
            >
              <p
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  isCorrect
                    ? "border border-teal/30 bg-teal/10 text-teal-dark"
                    : "border border-stone-200 bg-surface text-ink"
                }`}
              >
                {isCorrect
                  ? "Correct."
                  : "Not quite. Explorers miss things. Here is what this was asking."}
              </p>
              {missContrast ? (
                <p className="text-sm leading-snug text-ink">
                  {missContrast}
                </p>
              ) : null}
              <p className="text-sm leading-snug text-stone-700">
                {state.kidExplanation ??
                  state.explanation ??
                  "Reviewing this answer…"}
              </p>
              {state.saved && state.xpAward ? (
                <XpAwardFeedback
                  attemptXp={state.xpAward.attemptXp}
                  sessionBonusXp={state.xpAward.sessionBonusXp}
                  isCorrect={isCorrect}
                  hintUsed={hintUsed}
                  quiet={!isCorrect}
                />
              ) : null}
              {!state.saved ? (
                <div className="space-y-2">
                  {state.saveError ? (
                    <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950">
                      {state.saveError}
                    </p>
                  ) : state.saving ? (
                    <p className="text-sm text-stone-500">Saving your answer…</p>
                  ) : (
                    <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950">
                      Your answer was checked, but it could not be saved. Try
                      saving again to continue.
                    </p>
                  )}
                  {!state.saving ? (
                    <button
                      type="button"
                      onClick={checkAnswer}
                      className="text-sm font-medium text-teal underline-offset-4 hover:underline"
                    >
                      Try saving again
                    </button>
                  ) : null}
                </div>
              ) : null}
              <button
                type="button"
                onClick={continueToNext}
                disabled={!state.saved}
                className="min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLast ? "See results" : "Next question →"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function QuestionFeedbackPanel({
  feedback,
  onSelectFeedback,
  onToggleIssue,
  onOtherTextChange,
  onSubmitDetails,
}: {
  feedback: QuestionFeedbackState;
  onSelectFeedback: (feedback: "positive" | "negative") => void;
  onToggleIssue: (issue: QuestionFeedbackIssue) => void;
  onOtherTextChange: (text: string) => void;
  onSubmitDetails: () => void;
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-surface px-3 py-3">
      <p className="text-sm font-semibold text-ink">How was this question?</p>
      <div
        className="mt-2 flex gap-2"
        role="group"
        aria-label="Question feedback"
      >
        <button
          type="button"
          aria-label="This question was helpful"
          aria-pressed={feedback.feedback === "positive"}
          onClick={() => onSelectFeedback("positive")}
          className={`min-h-11 min-w-14 rounded-xl border px-3 text-lg transition ${
            feedback.feedback === "positive"
              ? "border-teal bg-teal/10"
              : "border-stone-200 bg-parchment hover:border-teal/50"
          }`}
        >
          👍
        </button>
        <button
          type="button"
          aria-label="This question needs feedback"
          aria-pressed={feedback.feedback === "negative"}
          onClick={() => onSelectFeedback("negative")}
          className={`min-h-11 min-w-14 rounded-xl border px-3 text-lg transition ${
            feedback.feedback === "negative"
              ? "border-rose-300 bg-rose-50"
              : "border-stone-200 bg-parchment hover:border-rose-300"
          }`}
        >
          👎
        </button>
      </div>
      {feedback.feedback === "negative" ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm font-semibold text-ink">What seems wrong?</p>
          <div className="space-y-2">
            {QUESTION_FEEDBACK_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex min-h-10 items-center gap-2 rounded-xl border border-stone-200 bg-parchment px-3 py-2 text-sm text-ink"
              >
                <input
                  type="checkbox"
                  checked={feedback.issueCodes.includes(option.value)}
                  onChange={() => onToggleIssue(option.value)}
                  className="h-4 w-4 accent-teal"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {feedback.issueCodes.includes("other") ? (
            <label className="block text-sm text-stone-700">
              <span className="font-medium">
                Anything else you&apos;d like us to know?
              </span>
              <input
                type="text"
                value={feedback.otherText}
                onChange={(event) => onOtherTextChange(event.target.value)}
                className="mt-1 min-h-10 w-full rounded-xl border border-stone-200 bg-parchment px-3 py-2 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </label>
          ) : null}
          <button
            type="button"
            onClick={onSubmitDetails}
            className="min-h-10 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink hover:border-teal hover:bg-parchment"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
}

type ResultsCardProps = {
  eventId: string;
  eventName: string;
  summary: PracticeSummary;
  sessionXp: number;
  streakDays: number;
  totalXp: number | null;
  newlyEarned: BadgeDefinition[];
  leveledUpTo: number | null;
  streakMilestone: StreakMilestone | null;
  dailyMissionComplete: boolean;
  comparisonMessage: string;
  newPersonalBest: boolean;
  onMoveOn: () => void;
};

function ResultsCard({
  eventId,
  eventName,
  summary,
  sessionXp,
  streakDays,
  totalXp,
  newlyEarned,
  leveledUpTo,
  streakMilestone,
  dailyMissionComplete,
  comparisonMessage,
  newPersonalBest,
  onMoveOn,
}: ResultsCardProps) {
  const explorerLevel =
    totalXp == null ? null : calculateLevelFromXp(totalXp);
  const streak = streakLabel(streakDays);
  const hasRewards =
    leveledUpTo != null ||
    streakMilestone != null ||
    dailyMissionComplete ||
    newlyEarned.length > 0;
  const [showCelebration, setShowCelebration] = useState(hasRewards);

  return (
    <section className="journal-panel rounded-3xl p-5 sm:p-7">
      {showCelebration ? (
        <ExpeditionRewardsOverlay
          eventName={eventName}
          sessionXp={sessionXp}
          leveledUpTo={leveledUpTo}
          streakMilestone={streakMilestone}
          dailyMissionComplete={dailyMissionComplete}
          badges={newlyEarned}
          onClose={() => setShowCelebration(false)}
        />
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
        Expedition Complete! 🎉
      </h2>
          <p className="mt-2 text-sm text-stone-600">
            You finished this {eventName} expedition. No XP was removed.
          </p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Questions answered
          </dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {summary.questionsAnswered}
          </dd>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Correct
          </dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {summary.correctAnswers} of {summary.questionsAnswered}
          </dd>
        </div>
      </dl>
      <div className="mt-4 rounded-2xl bg-teal-dark px-5 py-4 text-center text-parchment">
        <p className="font-display text-xl font-semibold">{comparisonMessage}</p>
        {newPersonalBest ? (
          <p className="mt-2 text-sm font-semibold">New personal best! 🏆</p>
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/15 px-5 py-4">
        {sessionXp > 0 ? (
          <p className="font-display text-3xl font-semibold tabular-nums text-ink">
            {formatXpGain(sessionXp)}
          </p>
        ) : (
          <p className="text-sm font-medium text-stone-700">
            Your answers were saved.
          </p>
        )}
        {leveledUpTo != null ? (
          <p className="mt-2 text-sm font-medium text-ink">
            ⭐ Explorer Level {leveledUpTo}
          </p>
        ) : explorerLevel != null ? (
          <p className="mt-2 font-display text-xl font-semibold text-ink">
            Explorer Level {explorerLevel}
          </p>
        ) : null}
        {streakMilestone != null ? (
          <p className="mt-2 text-sm font-medium text-ink">
            🔥 {streakMilestone}-day streak milestone
          </p>
        ) : streak ? (
          <p className="mt-2 text-sm font-medium text-ink">🔥 {streak}</p>
        ) : (
          <p className="mt-2 text-sm text-stone-600">
            Practice today to start a streak.
          </p>
        )}
        {dailyMissionComplete ? (
          <p className="mt-2 text-sm font-medium text-ink">
            Daily expedition complete
          </p>
        ) : null}
        {newlyEarned.length > 0 ? (
          <p className="mt-2 text-sm font-medium text-ink">
            {newlyEarned.length > 1 ? "New discoveries" : "New discovery"}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onMoveOn}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment hover:bg-teal"
        >
          Explore again
        </button>
        <Link
          href={`/events/${eventId}`}
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Back to {eventName}
        </Link>
      </div>
    </section>
  );
}
