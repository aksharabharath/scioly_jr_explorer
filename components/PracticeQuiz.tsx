"use client";

import { savePracticeAttempt } from "@/app/practice/actions";
import { ExpeditionRewardsOverlay } from "@/components/ExpeditionRewardsOverlay";
import { TrickyTopicsEmpty } from "@/components/TrickyTopicsEmpty";
import { PromptWithTerms } from "@/components/PromptWithTerms";
import { XpAwardFeedback } from "@/components/XpAwardFeedback";
import { glossaryForEvent } from "@/lib/mock/glossary";
import {
  PRACTICE_SET_SIZE,
  attemptFromQuestion,
  friendlyRevisitNote,
  hasWeakTopics,
  selectNextQuestion,
  type LearningAttempt,
  type PracticeMode,
} from "@/lib/learning/adaptive";
import {
  definitionsForIds,
  getNewlyEarnedBadgesFromAttempts,
  toSessionBadgeAttempts,
  type BadgeDefinition,
  type BadgeId,
  type BadgeProgressAttempt,
} from "@/lib/badges";
import {
  attemptUsedAHint,
  authoredSecondHint,
  missedAnswerContrast,
  recommendNextStep,
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
  questionsPracticedOnLocalDate,
} from "@/lib/expeditions";
import {
  DEFAULT_DAILY_PRACTICE_GOAL,
  isDailyMissionComplete,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";
import type { PracticeFollowUp, PracticeSummary, Question } from "@/lib/types";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type PracticeQuizProps = {
  eventId: string;
  eventName: string;
  questions: Question[];
  priorAttempts: LearningAttempt[];
  priorBadgeAttempts: BadgeProgressAttempt[];
  allQuestions: Question[];
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
  previouslyAnsweredQuestionIds: string[];
  completedExpeditions: number;
};

type ActiveQuizState = {
  status: "active";
  question: Question;
  askedIds: string[];
  sessionTopics: string[];
  selectedChoiceId: string | null;
  revealedHint: boolean;
  revealedHint2: boolean;
  submitted: boolean;
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
};

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
};

type ClearedWeakQuizState = {
  status: "cleared-weak";
  history: LearningAttempt[];
  attemptCount: number;
};

type QuizState = ActiveQuizState | CompleteQuizState | ClearedWeakQuizState;

function beginSet(
  questions: Question[],
  history: LearningAttempt[],
  attemptCount: number,
  mode: PracticeMode,
  eventId: string,
  expeditionNumber: number,
  previouslyAnsweredQuestionIds: string[],
  resumeSession?: PracticeQuizProps["resumeSession"],
): QuizState {
  const resumedAttempts = resumeSession?.attempts ?? [];
  const byId = new Map(questions.map((item) => [item.id, item]));
  const resumedRecords: AnswerRecord[] = resumedAttempts
    .filter((item) => byId.has(item.questionId))
    .map((item) => ({
      questionId: item.questionId,
      selectedChoiceId: item.selectedChoiceId,
      isCorrect: item.isCorrect,
      hintUsed: item.hintUsed,
    }));
  const resumedHistory = resumedRecords.reduce<LearningAttempt[]>(
    (items, record) => {
      const question = byId.get(record.questionId);
      return question
        ? [...items, attemptFromQuestion(question, record.isCorrect, record.hintUsed)]
        : items;
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
    .map((record) => byId.get(record.questionId)?.topicId)
    .filter((topicId): topicId is string => Boolean(topicId));
  const question = selectNextQuestion({
    bank: questions,
    history,
    askedQuestionIds: askedIds,
    previouslyAnsweredQuestionIds:
      resumeSession ? undefined : previouslyAnsweredQuestionIds,
    sessionTopicSequence: sessionTopics,
    lastWasRevisitEvidence:
      resumedRecords.length > 0
        ? !resumedRecords[resumedRecords.length - 1].isCorrect ||
          resumedRecords[resumedRecords.length - 1].hintUsed
        : false,
    mode,
    eventId,
    expeditionNumber,
  } as Parameters<typeof selectNextQuestion>[0] & {
    previouslyAnsweredQuestionIds?: string[];
    eventId?: string;
    expeditionNumber?: number;
  });

  if (!question) {
    if (mode === "weak") {
      return {
        status: "cleared-weak",
        history,
        attemptCount,
      };
    }
    return {
      status: "complete",
      records: [],
      history: sessionHistory,
      attemptCount,
      sessionXp: 0,
      streakDays: 0,
      totalXp: null,
      newlyEarnedIds: [],
      leveledUpTo: null,
      streakMilestone: null,
      dailyMissionComplete: false,
    };
  }

  return {
    status: "active",
    question,
    askedIds: [...askedIds, question.id],
    sessionTopics: [...sessionTopics, question.topicId],
    selectedChoiceId: null,
    revealedHint: false,
    revealedHint2: false,
    submitted: false,
    records: resumedRecords,
    history: sessionHistory,
    saveError: null,
    saved: false,
    saving: false,
    attemptCount,
    xpAward: null,
  };
}

function newlyEarnedForSession(
  prior: BadgeProgressAttempt[],
  records: AnswerRecord[],
  sessionId: string,
  bank: Question[],
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
  priorAttempts,
  priorBadgeAttempts,
  allQuestions,
  initialAttemptCount,
  initialXp = 0,
  initialStreakDays = 0,
  resumeSession,
  dailyPracticeGoal = DEFAULT_DAILY_PRACTICE_GOAL,
  mode = "normal",
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
  const sessionIdRef = useRef(
    resumeSession?.sessionId ?? crypto.randomUUID(),
  );
  const attemptIdRef = useRef<string | null>(null);
  const sessionXpRef = useRef(resumeSession?.sessionXp ?? 0);
  const streakDaysRef = useRef(0);
  const totalXpRef = useRef<number | null>(null);
  const badgeAttemptsRef = useRef(priorBadgeAttempts);
  const baselineXpRef = useRef(initialXp);
  const baselineStreakRef = useRef(initialStreakDays);
  const clueRegionId = useId();
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
    sessionIdRef.current = crypto.randomUUID();
    attemptIdRef.current = null;
    sessionXpRef.current = 0;
    streakDaysRef.current = 0;
    totalXpRef.current = null;
    sessionModeRef.current = nextMode;
  }

  function finishSet(
    nextRecords: AnswerRecord[],
    nextHistory: LearningAttempt[],
    attemptCount: number,
  ): CompleteQuizState {
    const streakAfter = streakDaysRef.current;
    const newlyEarnedIds = newlyEarnedForSession(
      badgeAttemptsRef.current,
      nextRecords,
      sessionIdRef.current,
      allQuestions,
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
    };
  }

  if (state.status === "cleared-weak") {
    return (
      <TrickyTopicsEmpty eventId={eventId} eventName={eventName} />
    );
  }

  if (state.status === "complete") {
    const summary = summarizePractice(state.records);
    const followUp = recommendNextStep(summary.accuracyPercent, eventName);
    const revisitNote = friendlyRevisitNote(state.history);
    return (
      <ResultsCard
        eventId={eventId}
        eventName={eventName}
        summary={summary}
        followUp={followUp}
        revisitNote={revisitNote}
        hasRemediation={hasWeakTopics(state.history)}
        onMoveOn={() => {
          startNewSession("normal");
          setState(
            beginSet(
              questions,
              state.history,
              state.attemptCount,
              "normal",
              eventId,
              ++expeditionNumberRef.current,
              previouslyAnsweredQuestionIdsRef.current,
            ),
          );
        }}
        onRemediate={() => {
          startNewSession("weak");
          setState(
            beginSet(
              questions,
              state.history,
              state.attemptCount,
              "weak",
              eventId,
              ++expeditionNumberRef.current,
              previouslyAnsweredQuestionIdsRef.current,
            ),
          );
        }}
        sessionXp={state.sessionXp}
        streakDays={state.streakDays}
        totalXp={state.totalXp}
        newlyEarned={definitionsForIds(state.newlyEarnedIds)}
        leveledUpTo={state.leveledUpTo}
        streakMilestone={state.streakMilestone}
        dailyMissionComplete={state.dailyMissionComplete}
      />
    );
  }

  const question = state.question;
  const plannedTotal = Math.min(PRACTICE_SET_SIZE, questions.length);
  const remainingInBank = questions.filter(
    (item) => !state.askedIds.includes(item.id),
  ).length;
  const isLast =
    state.records.length + 1 >= plannedTotal || remainingInBank === 0;
  const isCorrect = state.selectedChoiceId === question.correctChoiceId;

  function selectChoice(choiceId: string) {
    if (state.status !== "active" || state.submitted) {
      return;
    }
    setState({ ...state, selectedChoiceId: choiceId });
  }

  async function checkAnswer() {
    // Duplicate protection (UI): ignore extra Check answer clicks.
    // The server still uses the same attemptId + unique award row.
    if (state.status !== "active" || !state.selectedChoiceId) {
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
    const selectedChoiceId = state.selectedChoiceId;
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
        questionId: question.id,
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

  function continueToNext() {
    if (
      state.status !== "active" ||
      !state.selectedChoiceId ||
      !state.submitted ||
      !state.saved
    ) {
      return;
    }

    const hintUsed = attemptUsedAHint(state.revealedHint, state.revealedHint2);
    const record: AnswerRecord = {
      questionId: question.id,
      selectedChoiceId: state.selectedChoiceId,
      isCorrect: state.selectedChoiceId === question.correctChoiceId,
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

    if (isLast) {
      setState(finishSet(nextRecords, nextHistory, state.attemptCount));
      return;
    }

    const nextQuestion = selectNextQuestion({
      bank: questions,
      history: nextHistory,
      askedQuestionIds: state.askedIds,
      previouslyAnsweredQuestionIds:
        previouslyAnsweredQuestionIdsRef.current,
      sessionTopicSequence: state.sessionTopics,
      lastWasRevisitEvidence: !record.isCorrect || hintUsed,
      mode: sessionModeRef.current,
      eventId,
      expeditionNumber: expeditionNumberRef.current,
    } as Parameters<typeof selectNextQuestion>[0] & {
      previouslyAnsweredQuestionIds?: string[];
      eventId?: string;
      expeditionNumber?: number;
    });

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
      revealedHint: false,
      revealedHint2: false,
      submitted: false,
      records: nextRecords,
      history: nextHistory,
      saveError: null,
      saved: false,
      saving: false,
      attemptCount: state.attemptCount,
      xpAward: null,
    });
  }

  const sessionNumber = state.records.length + 1;
  const progressPercent =
    plannedTotal === 0 ? 0 : Math.round((sessionNumber / plannedTotal) * 100);
  const missContrast =
    !isCorrect && state.selectedChoiceId
      ? missedAnswerContrast(question, state.selectedChoiceId)
      : null;

  const hasImage = Boolean(question.imageSrc);
  const secondHint = authoredSecondHint(question);
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
        </div>

        <div>
          <div
            className={state.submitted ? "space-y-1.5" : "space-y-2"}
            role="group"
            aria-label="Answer choices"
          >
            {question.choices.map((choice) => {
              const selected = state.selectedChoiceId === choice.id;
              const correctChoice = choice.id === question.correctChoiceId;
              let choiceClass =
                "border-stone-200 bg-parchment/50 hover:border-teal/40 hover:bg-parchment";
              let letterClass = "bg-white text-stone-600";

              if (state.submitted && correctChoice) {
                choiceClass =
                  "choice-pulse border-teal bg-teal/10 text-teal-dark disabled:border-teal disabled:bg-teal/10 disabled:text-teal-dark disabled:opacity-100";
              } else if (state.submitted && selected && !correctChoice) {
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
              {!state.revealedHint ||
              (secondHint && !state.revealedHint2) ? (
                <button
                  type="button"
                  aria-expanded={state.revealedHint}
                  aria-controls={clueRegionId}
                  onClick={() =>
                    setState(
                      state.revealedHint
                        ? {
                            ...state,
                            revealedHint: true,
                            revealedHint2: true,
                          }
                        : { ...state, revealedHint: true },
                    )
                  }
                  className="text-sm font-medium text-teal underline-offset-4 hover:underline"
                >
                  {state.revealedHint ? "Another clue" : "Need a hint?"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={checkAnswer}
                disabled={!state.selectedChoiceId || state.submitted}
                className="min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check answer
              </button>
            </div>
          ) : null}

          {state.revealedHint && !state.submitted ? (
            <div
              id={clueRegionId}
              className="mt-2 space-y-2"
              aria-live="polite"
            >
              <p className="rounded-2xl border border-stone-200 bg-amber-50 px-4 py-2.5 text-sm leading-relaxed text-amber-950">
                <span className="font-semibold">Clue </span>
                {question.hint}
              </p>
              {state.revealedHint2 && secondHint ? (
                <p className="rounded-2xl border border-stone-200 bg-amber-50 px-4 py-2.5 text-sm leading-relaxed text-amber-950">
                  <span className="font-semibold">Clue </span>
                  {secondHint}
                </p>
              ) : null}
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
                {question.explanation}
              </p>
              {!isCorrect && !state.revealedHint ? (
                <p className="text-sm leading-snug text-stone-600">
                  <span className="font-semibold text-ink">Hint: </span>
                  {question.hint}
                </p>
              ) : null}
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

type ResultsCardProps = {
  eventId: string;
  eventName: string;
  summary: PracticeSummary;
  followUp: PracticeFollowUp;
  revisitNote: string | null;
  sessionXp: number;
  streakDays: number;
  totalXp: number | null;
  newlyEarned: BadgeDefinition[];
  leveledUpTo: number | null;
  streakMilestone: StreakMilestone | null;
  dailyMissionComplete: boolean;
  hasRemediation: boolean;
  onMoveOn: () => void;
  onRemediate: () => void;
};

function ResultsCard({
  eventId,
  eventName,
  summary,
  followUp,
  revisitNote,
  sessionXp,
  streakDays,
  totalXp,
  newlyEarned,
  leveledUpTo,
  streakMilestone,
  dailyMissionComplete,
  hasRemediation,
  onMoveOn,
  onRemediate,
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
        Expedition complete!
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

      <div className="mt-6 rounded-2xl bg-teal-dark px-5 py-4 text-parchment">
        <p className="font-display text-xl font-semibold">{followUp.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/85">
          {followUp.detail}
        </p>
        {revisitNote ? (
          <p className="mt-3 text-sm font-medium text-parchment">{revisitNote}</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onMoveOn}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment hover:bg-teal"
        >
          Move on to next expedition
        </button>
        {hasRemediation ? (
          <button
            type="button"
            onClick={onRemediate}
            className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
          >
            Try this expedition again — Work on tricky topics
          </button>
        ) : null}
        <Link
          href={`/events/${eventId}`}
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Back to {eventName}
        </Link>
        <Link
          href="/camp"
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Base camp
        </Link>
      </div>
    </section>
  );
}
