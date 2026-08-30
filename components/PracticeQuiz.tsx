"use client";

import { savePracticeAttempt } from "@/app/practice/actions";
import { ExpeditionRewardsOverlay } from "@/components/ExpeditionRewardsOverlay";
import { XpAwardFeedback } from "@/components/XpAwardFeedback";
import {
  PRACTICE_SET_SIZE,
  attemptFromQuestion,
  friendlyRevisitNote,
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
  DIFFICULTY_LEVEL_LABEL,
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
  hasCompletedExpeditionOnLocalDate,
} from "@/lib/expeditions";
import type { PracticeFollowUp, PracticeSummary, Question } from "@/lib/types";
import Link from "next/link";
import { useRef, useState } from "react";

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
  mode?: PracticeMode;
};

type ActiveQuizState = {
  status: "active";
  question: Question;
  askedIds: string[];
  sessionTopics: string[];
  selectedChoiceId: string | null;
  revealedHint: boolean;
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

type QuizState = ActiveQuizState | CompleteQuizState;

function beginSet(
  questions: Question[],
  history: LearningAttempt[],
  attemptCount: number,
  mode: PracticeMode,
): QuizState {
  const question = selectNextQuestion({
    bank: questions,
    history,
    askedQuestionIds: [],
    sessionTopicSequence: [],
    lastWasRevisitEvidence: false,
    mode,
  });

  if (!question) {
    return {
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
    };
  }

  return {
    status: "active",
    question,
    askedIds: [question.id],
    sessionTopics: [question.topicId],
    selectedChoiceId: null,
    revealedHint: false,
    submitted: false,
    records: [],
    history,
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
  mode = "normal",
}: PracticeQuizProps) {
  const [state, setState] = useState<QuizState>(() =>
    beginSet(questions, priorAttempts, initialAttemptCount, mode),
  );
  const savingRef = useRef(false);
  const sessionIdRef = useRef(crypto.randomUUID());
  const attemptIdRef = useRef<string | null>(null);
  const sessionXpRef = useRef(0);
  const streakDaysRef = useRef(0);
  const totalXpRef = useRef<number | null>(null);
  const badgeAttemptsRef = useRef(priorBadgeAttempts);
  const baselineXpRef = useRef(initialXp);
  const baselineStreakRef = useRef(initialStreakDays);

  function startNewSession() {
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
    const alreadyCompletedToday = hasCompletedExpeditionOnLocalDate(
      badgeAttemptsRef.current,
      localCalendarDate(),
    );
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
        nextRecords.length >= PRACTICE_SET_SIZE && !alreadyCompletedToday,
    };
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
        onTryAgain={() => {
          startNewSession();
          setState(
            beginSet(questions, state.history, state.attemptCount, mode),
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
        hintUsed: state.revealedHint,
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

    const hintUsed = state.revealedHint;
    const record: AnswerRecord = {
      questionId: question.id,
      selectedChoiceId: state.selectedChoiceId,
      isCorrect: state.selectedChoiceId === question.correctChoiceId,
      hintUsed,
    };
    const attempt = attemptFromQuestion(question, record.isCorrect, hintUsed);
    const nextHistory = [...state.history, attempt];
    const nextRecords = [...state.records, record];
    attemptIdRef.current = null;

    if (isLast) {
      setState(finishSet(nextRecords, nextHistory, state.attemptCount));
      return;
    }

    const nextQuestion = selectNextQuestion({
      bank: questions,
      history: nextHistory,
      askedQuestionIds: state.askedIds,
      sessionTopicSequence: state.sessionTopics,
      lastWasRevisitEvidence: !record.isCorrect || hintUsed,
      mode,
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

  return (
    <section className="rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium text-stone-600">
          Question {state.records.length + 1} of {plannedTotal}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-stone-500">
            You&apos;ve answered {state.attemptCount} questions in total
          </span>
          <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-800">
            {DIFFICULTY_LEVEL_LABEL[question.difficulty]}
          </span>
        </div>
      </div>

      <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
        {question.prompt}
      </h2>

      <div className="mt-6 space-y-2" role="group" aria-label="Answer choices">
        {question.choices.map((choice) => {
          const selected = state.selectedChoiceId === choice.id;
          const correctChoice = choice.id === question.correctChoiceId;
          let choiceClass =
            "border-stone-200 bg-parchment/50 hover:border-teal/40 hover:bg-parchment";

          if (state.submitted && correctChoice) {
            choiceClass = "border-emerald-300 bg-emerald-50 text-emerald-950";
          } else if (state.submitted && selected && !correctChoice) {
            choiceClass = "border-rose-200 bg-rose-50 text-rose-950";
          } else if (!state.submitted && selected) {
            choiceClass = "border-teal bg-teal/10 text-teal-dark";
          }

          return (
            <button
              key={choice.id}
              type="button"
              disabled={state.submitted}
              onClick={() => selectChoice(choice.id)}
              className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-base transition disabled:cursor-default ${choiceClass}`}
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-stone-600">
                {choice.id.toUpperCase()}
              </span>
              <span>{choice.text}</span>
            </button>
          );
        })}
      </div>

      {!state.submitted ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setState({ ...state, revealedHint: true })}
            className="text-sm font-medium text-teal underline-offset-4 hover:underline"
          >
            {state.revealedHint ? "Hint is showing" : "Need a hint?"}
          </button>
          <button
            type="button"
            onClick={checkAnswer}
            disabled={!state.selectedChoiceId || state.submitted}
            className="rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check answer
          </button>
        </div>
      ) : null}

      {state.revealedHint && !state.submitted ? (
        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <span className="font-semibold">Hint: </span>
          {question.hint}
        </p>
      ) : null}

      {state.submitted ? (
        <div className="mt-6 space-y-4" aria-live="polite">
          <p
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
              isCorrect
                ? "bg-emerald-50 text-emerald-900"
                : "bg-sky-50 text-sky-950"
            }`}
          >
            {isCorrect
              ? "That's right — nice exploring."
              : "Good try! Mistakes don't take anything away. Here's the idea:"}
          </p>
          {state.saved && state.xpAward ? (
            <XpAwardFeedback
              attemptXp={state.xpAward.attemptXp}
              sessionBonusXp={state.xpAward.sessionBonusXp}
              isCorrect={isCorrect}
              hintUsed={state.revealedHint}
            />
          ) : null}
          <p className="text-sm leading-relaxed text-stone-700">
            {question.explanation}
          </p>
          {!isCorrect ? (
            <p className="text-sm leading-relaxed text-stone-600">
              <span className="font-semibold text-ink">Hint: </span>
              {question.hint}
            </p>
          ) : null}
          {!state.saved ? (
            <div className="space-y-3">
              {state.saveError ? (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">
                  {state.saveError}
                </p>
              ) : state.saving ? (
                <p className="text-sm text-stone-500">Saving your answer…</p>
              ) : (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={continueToNext}
              disabled={!state.saved}
              className="rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLast ? "See results" : "Next question"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type ResultsCardProps = {
  eventId: string;
  eventName: string;
  summary: PracticeSummary;
  followUp: PracticeFollowUp;
  revisitNote: string | null;
  onTryAgain: () => void;
  sessionXp: number;
  streakDays: number;
  totalXp: number | null;
  newlyEarned: BadgeDefinition[];
  leveledUpTo: number | null;
  streakMilestone: StreakMilestone | null;
  dailyMissionComplete: boolean;
};

function ResultsCard({
  eventId,
  eventName,
  summary,
  followUp,
  revisitNote,
  onTryAgain,
  sessionXp,
  streakDays,
  totalXp,
  newlyEarned,
  leveledUpTo,
  streakMilestone,
  dailyMissionComplete,
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
    <section className="rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)] sm:p-7">
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
        You finished this {eventName} set. No XP was removed.
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
            Daily mission complete
          </p>
        ) : null}
        {newlyEarned.length > 0 ? (
          <p className="mt-2 text-sm font-medium text-ink">
            {newlyEarned.length > 1 ? "New badges unlocked" : "New badge unlocked"}
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
          onClick={onTryAgain}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment hover:bg-teal"
        >
          Try this set again
        </button>
        <Link
          href={`/events/${eventId}`}
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Back to {eventName}
        </Link>
        <Link
          href="/"
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}
