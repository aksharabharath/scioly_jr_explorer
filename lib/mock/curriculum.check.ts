/**
 * Generic curriculum + Entomology practice-path checks.
 * Run: npx tsx lib/mock/curriculum.check.ts
 */
import {
  PRACTICE_SET_SIZE,
  selectNextQuestion,
  toLearningAttempts,
  type LearningAttempt,
} from "@/lib/learning/adaptive";
import {
  eventHasPractice,
  getAllQuestions,
  getEventPageData,
  getPracticePageData,
  getQuestionById,
  getQuestionsForEvent,
  isLivePracticeQuestion,
  questionHasPracticeImage,
} from "@/lib/mock/curriculum";
import type { Question } from "@/lib/types";
import {
  ENTOMOLOGY_EVENT_ID,
  ENTOMOLOGY_TOPIC_IDS,
  MOCK_ENTOMOLOGY_QUESTIONS,
} from "@/lib/mock/entomology-questions";
import { MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS } from "@/lib/mock/anatomy-physiology-questions";
import { MOCK_WATER_QUALITY_QUESTIONS } from "@/lib/mock/water-quality-questions";
import { MOCK_CRIME_BUSTERS_QUESTIONS } from "@/lib/mock/crime-busters-questions";
import { MOCK_ECOLOGY_OVERVIEW } from "@/lib/mock/ecology";
import { MOCK_ECOLOGY_QUESTIONS } from "@/lib/mock/ecology-questions";
import {
  BUILD_EVENT_IDS,
  EVENTS_WITH_QUESTION_BANKS,
  MOCK_EVENTS,
  eventStatusLabel,
} from "@/lib/mock/events";
import { calculateEventProgress, calculateOverallProgress } from "@/lib/progress";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const eligibilitySample: Question = {
  id: "eligibility-sample",
  eventId: "entomology",
  topicId: "taxonomy",
  prompt: "Sample prompt",
  choices: [
    { id: "a", text: "A" },
    { id: "b", text: "B" },
    { id: "c", text: "C" },
    { id: "d", text: "D" },
  ],
  correctChoiceId: "a",
  explanation: "Sample explanation",
  hint: "Sample hint",
  difficulty: 1,
};

async function run() {
  const entomology = await getQuestionsForEvent("entomology");
  const astronomy = await getQuestionsForEvent("astronomy");
  const allQuestions = await getAllQuestions();
  const allowedTopics = new Set<string>(ENTOMOLOGY_TOPIC_IDS);
  const fullEntomology = allQuestions.filter(
    (question) => question.eventId === "entomology",
  );

  check("Entomology registered bank has 60 questions", fullEntomology.length === 60);
  check(
    "Entomology source bank has 60 questions",
    MOCK_ENTOMOLOGY_QUESTIONS.length === 60,
  );
  check("Astronomy bank still loads 48 questions", astronomy.length === 48);
  const fullAnatomy = allQuestions.filter(
    (question) => question.eventId === "anatomy-physiology",
  );
  check(
    "A&P registered MVP bank has 45 questions",
    fullAnatomy.length === 45 && MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS.length === 45,
  );
  const fullWater = allQuestions.filter(
    (question) => question.eventId === "water-quality",
  );
  check(
    "Water Quality registered MVP bank has 40 questions",
    fullWater.length === 40 && MOCK_WATER_QUALITY_QUESTIONS.length === 40,
  );
  const fullCrime = allQuestions.filter(
    (question) => question.eventId === "crime-busters",
  );
  check(
    "Crime Busters registered bank has 44 questions",
    fullCrime.length === 44 && MOCK_CRIME_BUSTERS_QUESTIONS.length === 44,
  );
  check(
    "Crime Busters items are verified",
    fullCrime.every(
      (question) => question.verificationStatus === "verified",
    ),
  );
  check(
    "Crime Busters q1–q40 stay text-only",
    fullCrime.slice(0, 40).every((question) => question.imageRequired === false),
  );
  check(
    "Crime Busters q41–q44 are live image items",
    fullCrime.slice(40).every(
      (question) =>
        question.imageRequired === true &&
        questionHasPracticeImage(question) &&
        isLivePracticeQuestion(question),
    ),
  );
  const fullEcology = allQuestions.filter(
    (question) => question.eventId === "ecology",
  );
  check(
    "Ecology registered MVP bank has 40 questions",
    fullEcology.length === 40 && MOCK_ECOLOGY_QUESTIONS.length === 40,
  );
  check(
    "Ecology items are verified and text-only",
    fullEcology.every(
      (question) =>
        question.verificationStatus === "verified" &&
        question.imageRequired === false,
    ),
  );
  check(
    "Water Quality items are verified or needs-review, never draft, and text-only",
    fullWater.every(
      (question) =>
        (question.verificationStatus === "verified" ||
          question.verificationStatus === "needs-review") &&
        question.imageRequired === false,
    ),
  );
  const waterLive = await getQuestionsForEvent("water-quality");
  const waterVerified = fullWater.filter(isLivePracticeQuestion);
  check(
    "live Water Quality practice is the full 40-question verified bank",
    waterLive.length === 40 &&
      waterLive.length === waterVerified.length &&
      waterLive.every(isLivePracticeQuestion) &&
      waterLive.every(
        (question) =>
          question.verificationStatus === "verified" &&
          question.imageRequired !== true,
      ) &&
      waterLive.map((question) => question.id).join(",") ===
        Array.from({ length: 40 }, (_, index) => `wq-q${index + 1}`).join(","),
  );
  const crimeLive = await getQuestionsForEvent("crime-busters");
  check(
    "live Crime Busters filter is the 44-question verified bank",
    crimeLive.length === 44 &&
      crimeLive.every(isLivePracticeQuestion) &&
      crimeLive.map((question) => question.id).join(",") ===
        Array.from({ length: 44 }, (_, index) => `cb-q${index + 1}`).join(","),
  );
  const ecologyLive = await getQuestionsForEvent("ecology");
  check(
    "live Ecology filter is the full 40-question verified bank",
    ecologyLive.length === 40 &&
      ecologyLive.every(isLivePracticeQuestion) &&
      ecologyLive.map((question) => question.id).join(",") ===
        Array.from({ length: 40 }, (_, index) => `eco-q${index + 1}`).join(","),
  );
  check(
    "all registered questions include Entomology, Astronomy, A&P, Water Quality, Crime Busters, and Ecology",
    allQuestions.length ===
      fullEntomology.length +
        astronomy.length +
        fullAnatomy.length +
        fullWater.length +
        fullCrime.length +
        fullEcology.length,
  );
  check(
    "A&P items are verified or needs-review, never draft",
    fullAnatomy.every(
      (question) =>
        (question.verificationStatus === "verified" ||
          question.verificationStatus === "needs-review") &&
        question.imageRequired === false,
    ),
  );
  const anatomyLive = await getQuestionsForEvent("anatomy-physiology");
  const anatomyVerified = fullAnatomy.filter(isLivePracticeQuestion);
  check(
    "live A&P practice is the full 45-question verified bank",
    anatomyLive.length === 45 &&
      anatomyLive.length === anatomyVerified.length &&
      anatomyLive.every(isLivePracticeQuestion) &&
      anatomyLive.every(
        (question) =>
          question.verificationStatus === "verified" &&
          question.imageRequired !== true,
      ),
  );
  const anatomyPractice = await getPracticePageData("anatomy-physiology");
  check(
    "A&P practice page loads the live bank",
    anatomyPractice !== null &&
      anatomyPractice.event.id === "anatomy-physiology" &&
      anatomyPractice.event.unlocked === true &&
      anatomyPractice.questions.length === 45 &&
      anatomyPractice.questions.every(isLivePracticeQuestion),
  );
  const anatomyPage = await getEventPageData("anatomy-physiology");
  check(
    "A&P event page offers practice",
    anatomyPage?.hasPractice === true,
  );
  const imageRequiredCount = fullEntomology.filter(
    (question) => question.imageRequired === true,
  ).length;
  const expectedLive = MOCK_ENTOMOLOGY_QUESTIONS.filter((question) => {
    if (question.verificationStatus !== "verified") {
      return false;
    }
    if (question.imageRequired === true) {
      return Boolean(question.imageSrc && question.imageAlt);
    }
    return true;
  });
  const needsReviewNonImage = fullEntomology.find(
    (question) =>
      question.verificationStatus === "needs-review" &&
      question.imageRequired !== true,
  );
  const liveImageItem = fullEntomology.find(
    (question) =>
      question.imageRequired === true && isLivePracticeQuestion(question),
  );

  check(
    "a verified non-image question is live",
    isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "verified",
      imageRequired: false,
    }),
  );
  check(
    "a verified image-required question without an image is not live",
    !isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "verified",
      imageRequired: true,
    }),
  );
  check(
    "a verified image-required question with src and alt is live",
    isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "verified",
      imageRequired: true,
      imageSrc: "/entomology/ento-q6.jpg",
      imageAlt: "Labeled ant drawing",
    }),
  );
  check(
    "a needs-review non-image question is not live",
    !isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "needs-review",
      imageRequired: false,
    }),
  );
  check(
    "a needs-review image-required question is not live",
    !isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "needs-review",
      imageRequired: true,
    }),
  );
  check(
    "a draft question is not live",
    !isLivePracticeQuestion({
      ...eligibilitySample,
      verificationStatus: "draft",
      imageRequired: false,
    }),
  );
  check(
    "live Entomology practice has 36 verified questions including 17 image items",
    entomology.length === 36 &&
      entomology.length === expectedLive.length &&
      entomology.every(isLivePracticeQuestion) &&
      entomology.filter((question) => question.imageRequired === true)
        .length === 17 &&
      entomology.every(
        (question) => question.verificationStatus === "verified",
      ),
  );
  check(
    "image-required Entomology items stay in the registered bank",
    imageRequiredCount > 0 &&
      fullEntomology.some((question) => question.imageRequired === true),
  );
  check(
    "needs-review Entomology items stay in the registered bank",
    fullEntomology.some(
      (question) => question.verificationStatus === "needs-review",
    ),
  );

  const ids = entomology.map((question) => question.id);
  check("live Entomology ids are unique", new Set(ids).size === ids.length);
  check(
    "live Entomology ids stay in ento-q range",
    entomology.every((question) => /^ento-q\d+$/.test(question.id)),
  );
  check(
    "Entomology questions use eventId entomology",
    entomology.every((question) => question.eventId === ENTOMOLOGY_EVENT_ID),
  );
  check(
    "Entomology questions use catalog topic ids",
    entomology.every((question) => allowedTopics.has(question.topicId)),
  );

  const mapped = await getQuestionById("ento-q1");
  check("generic getQuestionById finds Entomology items", mapped?.eventId === "entomology");
  check(
    "imageRequired is preserved on registered image questions",
    fullEntomology.some((question) => question.imageRequired === true),
  );
  check(
    "mapped prompts do not keep IMAGE REQUIRED author markup",
    fullEntomology.every((question) => !question.prompt.includes("[IMAGE REQUIRED:")),
  );

  let resolvedRegistered = 0;
  for (const source of MOCK_ENTOMOLOGY_QUESTIONS) {
    const found = await getQuestionById(source.id);
    if (found?.id === source.id && found.eventId === "entomology") {
      resolvedRegistered += 1;
    }
  }
  check(
    "historical lookup resolves all registered Entomology questions",
    resolvedRegistered === MOCK_ENTOMOLOGY_QUESTIONS.length,
  );
  check(
    "needs-review non-image questions remain look-up-able",
    needsReviewNonImage !== undefined &&
      (await getQuestionById(needsReviewNonImage.id))?.id ===
        needsReviewNonImage.id,
  );
  check(
    "image-required Entomology items remain look-up-able",
    liveImageItem !== undefined &&
      (await getQuestionById(liveImageItem.id))?.id === liveImageItem.id,
  );

  check("Entomology has practice", eventHasPractice("entomology"));
  check("Astronomy still has practice", eventHasPractice("astronomy"));
  check("Water Quality has practice", eventHasPractice("water-quality"));
  check("Crime Busters bank is registered for live-eligible items", eventHasPractice("crime-busters"));
  check("Ecology bank is registered for live-eligible items", eventHasPractice("ecology"));
  check(
    "Crime Busters is in EVENTS_WITH_QUESTION_BANKS",
    (EVENTS_WITH_QUESTION_BANKS as readonly string[]).includes("crime-busters"),
  );
  check(
    "Ecology is in EVENTS_WITH_QUESTION_BANKS",
    (EVENTS_WITH_QUESTION_BANKS as readonly string[]).includes("ecology"),
  );
  check(
    "EVENTS_WITH_QUESTION_BANKS matches registered banks",
    EVENTS_WITH_QUESTION_BANKS.every((eventId) => eventHasPractice(eventId)),
  );
  check(
    "A&P is in EVENTS_WITH_QUESTION_BANKS",
    (EVENTS_WITH_QUESTION_BANKS as readonly string[]).includes(
      "anatomy-physiology",
    ),
  );
  check(
    "Water Quality is in EVENTS_WITH_QUESTION_BANKS",
    (EVENTS_WITH_QUESTION_BANKS as readonly string[]).includes("water-quality"),
  );

  for (const eventId of BUILD_EVENT_IDS) {
    check(`${eventId} has no quiz practice`, !eventHasPractice(eventId));
    check(
      `${eventId} cannot enter /practice`,
      (await getPracticePageData(eventId)) === null,
    );
  }

  check(
    "locked quiz events cannot enter /practice",
    (await getPracticePageData("codebusters")) === null,
  );

  const entomologyPractice = await getPracticePageData("entomology");
  check(
    "Entomology practice page loads the live bank",
    entomologyPractice?.questions.length === entomology.length &&
      entomologyPractice.event.id === "entomology" &&
      entomologyPractice.questions.every(isLivePracticeQuestion),
  );
  const astronomyPractice = await getPracticePageData("astronomy");
  check(
    "Astronomy practice page still loads",
    astronomyPractice?.questions.length === 48 &&
      astronomyPractice.event.id === "astronomy",
  );

  check(
    "historical lookup resolves all registered Crime Busters questions",
    (await getQuestionById("cb-q1"))?.eventId === "crime-busters" &&
      (await getQuestionById("cb-q40"))?.id === "cb-q40" &&
      (await getQuestionById("cb-q44"))?.id === "cb-q44",
  );
  check(
    "historical lookup resolves all registered Ecology questions",
    (await getQuestionById("eco-q1"))?.eventId === "ecology" &&
      (await getQuestionById("eco-q40"))?.id === "eco-q40",
  );
  const crimePage = await getEventPageData("crime-busters");
  check(
    "Crime Busters event page offers practice",
    crimePage !== null &&
      crimePage.event.unlocked === true &&
      crimePage.hasPractice === true &&
      crimePage.topics.length === 5,
  );
  const crimePractice = await getPracticePageData("crime-busters");
  check(
    "Crime Busters practice page loads the live bank",
    crimePractice !== null &&
      crimePractice.event.id === "crime-busters" &&
      crimePractice.event.unlocked === true &&
      crimePractice.questions.length === 44 &&
      crimePractice.questions.every(isLivePracticeQuestion),
  );
  const ecologyPage = await getEventPageData("ecology");
  check(
    "Ecology event page offers practice",
    ecologyPage !== null &&
      ecologyPage.event.unlocked === true &&
      ecologyPage.hasPractice === true &&
      ecologyPage.overview === MOCK_ECOLOGY_OVERVIEW &&
      ecologyPage.topics.length === 5,
  );
  const ecologyPractice = await getPracticePageData("ecology");
  check(
    "Ecology practice page loads the live bank",
    ecologyPractice !== null &&
      ecologyPractice.event.id === "ecology" &&
      ecologyPractice.event.unlocked === true &&
      ecologyPractice.questions.length === 40 &&
      ecologyPractice.questions.every(isLivePracticeQuestion),
  );
  check(
    "historical lookup resolves all registered Water Quality questions",
    (await getQuestionById("wq-q1"))?.eventId === "water-quality" &&
      (await getQuestionById("wq-q40"))?.id === "wq-q40",
  );
  const waterPractice = await getPracticePageData("water-quality");
  check(
    "Water Quality practice page loads the live bank",
    waterPractice !== null &&
      waterPractice.event.id === "water-quality" &&
      waterPractice.event.unlocked === true &&
      waterPractice.questions.length === 40 &&
      waterPractice.questions.every(isLivePracticeQuestion),
  );
  const waterPage = await getEventPageData("water-quality");
  check("Water Quality still has an event page", waterPage !== null);
  check("Water Quality event page offers practice", waterPage?.hasPractice === true);
  const hoverPage = await getEventPageData("hovercraft");
  check("build events still have an event page", hoverPage?.event.kind === "build");
  check("build event pages do not offer practice", hoverPage?.hasPractice === false);

  const entomologyEvent = MOCK_EVENTS.find((event) => event.id === "entomology");
  const anatomyEvent = MOCK_EVENTS.find(
    (event) => event.id === "anatomy-physiology",
  );
  const hoverEvent = MOCK_EVENTS.find((event) => event.id === "hovercraft");
  const waterEvent = MOCK_EVENTS.find((event) => event.id === "water-quality");
  const ecologyEvent = MOCK_EVENTS.find((event) => event.id === "ecology");
  const crimeEvent = MOCK_EVENTS.find((event) => event.id === "crime-busters");
  check(
    "Entomology card label is Practice",
    entomologyEvent !== undefined && eventStatusLabel(entomologyEvent) === "Practice",
  );
  check(
    "A&P card label is Practice",
    anatomyEvent !== undefined && eventStatusLabel(anatomyEvent) === "Practice",
  );
  check(
    "Water Quality card label is Practice",
    waterEvent !== undefined && eventStatusLabel(waterEvent) === "Practice",
  );
  check(
    "Crime Busters card label is Practice",
    crimeEvent !== undefined && eventStatusLabel(crimeEvent) === "Practice",
  );
  check(
    "Ecology card label is Practice",
    ecologyEvent !== undefined && eventStatusLabel(ecologyEvent) === "Practice",
  );
  check(
    "Hovercraft card label is Coming later",
    hoverEvent !== undefined && eventStatusLabel(hoverEvent) === "Coming later",
  );

  const first = selectNextQuestion({
    bank: entomology,
    history: [],
    askedQuestionIds: [],
    sessionTopicSequence: [],
    lastWasRevisitEvidence: false,
  });
  check("generic adaptive selector can pick an Entomology question", first !== null);
  check(
    "selected Entomology question stays in the Entomology bank",
    first?.eventId === "entomology" && first?.id.startsWith("ento-q") === true,
  );

  const session: string[] = [];
  const history: LearningAttempt[] = [];
  let lastWasRevisitEvidence = false;
  for (let i = 0; i < PRACTICE_SET_SIZE; i += 1) {
    const question = selectNextQuestion({
      bank: entomology,
      history,
      askedQuestionIds: session,
      sessionTopicSequence: history.map((item) => item.topicId),
      lastWasRevisitEvidence,
    });
    if (!question) {
      break;
    }
    session.push(question.id);
    history.push({
      questionId: question.id,
      topicId: question.topicId,
      difficulty: question.difficulty,
      isCorrect: i === 0 ? false : true,
      hintUsed: false,
    });
    lastWasRevisitEvidence = i === 0;
  }
  check("generic selector can fill a 10-question Entomology set", session.length === PRACTICE_SET_SIZE);
  check(
    "Entomology session ids stay unique",
    new Set(session).size === PRACTICE_SET_SIZE,
  );

  const anatomySession: string[] = [];
  const anatomyHistory: LearningAttempt[] = [];
  for (let i = 0; i < PRACTICE_SET_SIZE; i += 1) {
    const question = selectNextQuestion({
      bank: anatomyLive,
      history: anatomyHistory,
      askedQuestionIds: anatomySession,
      sessionTopicSequence: anatomyHistory.map((item) => item.topicId),
      lastWasRevisitEvidence: false,
    });
    if (!question) {
      break;
    }
    anatomySession.push(question.id);
    anatomyHistory.push({
      questionId: question.id,
      topicId: question.topicId,
      difficulty: question.difficulty,
      isCorrect: true,
      hintUsed: false,
    });
  }
  check(
    "generic selector can fill a 10-question A&P set",
    anatomySession.length === PRACTICE_SET_SIZE,
  );
  check(
    "A&P session stays in the live A&P bank",
    anatomySession.every((id) =>
      anatomyLive.some(
        (question) =>
          question.id === id &&
          question.verificationStatus === "verified" &&
          question.imageRequired !== true,
      ),
    ),
  );

  const ecologySession: string[] = [];
  const ecologyHistory: LearningAttempt[] = [];
  for (let i = 0; i < PRACTICE_SET_SIZE; i += 1) {
    const question = selectNextQuestion({
      bank: ecologyLive,
      history: ecologyHistory,
      askedQuestionIds: ecologySession,
      sessionTopicSequence: ecologyHistory.map((item) => item.topicId),
      lastWasRevisitEvidence: false,
    });
    if (!question) {
      break;
    }
    ecologySession.push(question.id);
    ecologyHistory.push({
      questionId: question.id,
      topicId: question.topicId,
      difficulty: question.difficulty,
      isCorrect: true,
      hintUsed: false,
    });
  }
  check(
    "generic selector can fill a 10-question Ecology set",
    ecologySession.length === PRACTICE_SET_SIZE,
  );
  check(
    "Ecology session stays in the live Ecology bank",
    ecologySession.every((id) =>
      ecologyLive.some(
        (question) =>
          question.id === id &&
          question.verificationStatus === "verified" &&
          question.imageRequired !== true,
      ),
    ),
  );

  const missed = entomology.find((question) => question.topicId === "taxonomy");
  const sameTopicCount = entomology.filter(
    (question) => question.topicId === missed?.topicId,
  ).length;
  check("taxonomy has more than one live Entomology question", sameTopicCount > 1);
  if (missed) {
    const weakHistory = toLearningAttempts(
      [{ questionId: missed.id, isCorrect: false, hintUsed: false }],
      entomology,
    );
    const weakNext = selectNextQuestion({
      bank: entomology,
      history: weakHistory,
      askedQuestionIds: [],
      sessionTopicSequence: [],
      lastWasRevisitEvidence: false,
      mode: "weak",
    });
    check(
      "weak points can stay on the missed Entomology topic",
      weakNext?.topicId === missed.topicId,
    );
    check(
      "weak points prefer a different Entomology question when possible",
      weakNext !== null && weakNext.id !== missed.id,
    );
  }

  check(
    "practice selection cannot return a needs-review question",
    first !== null &&
      isLivePracticeQuestion(first) &&
      session.every((id) => {
        const question = entomology.find((item) => item.id === id);
        return (
          question !== undefined &&
          isLivePracticeQuestion(question) &&
          question.verificationStatus === "verified"
        );
      }),
  );
  check(
    "practice selection stays in the live Entomology pool",
    first !== null &&
      isLivePracticeQuestion(first) &&
      session.every((id) => {
        const question = entomology.find((item) => item.id === id);
        return question !== undefined && isLivePracticeQuestion(question);
      }),
  );

  if (needsReviewNonImage) {
    const weakFromNonLive = toLearningAttempts(
      [
        {
          questionId: needsReviewNonImage.id,
          isCorrect: false,
          hintUsed: false,
        },
      ],
      fullEntomology,
    );
    const weakIds: string[] = [];
    const weakHistory: LearningAttempt[] = [...weakFromNonLive];
    for (let i = 0; i < PRACTICE_SET_SIZE; i += 1) {
      const question = selectNextQuestion({
        bank: entomology,
        history: weakHistory,
        askedQuestionIds: weakIds,
        sessionTopicSequence: weakHistory.map((item) => item.topicId),
        lastWasRevisitEvidence: false,
        mode: "weak",
      });
      if (!question) {
        break;
      }
      weakIds.push(question.id);
      weakHistory.push({
        questionId: question.id,
        topicId: question.topicId,
        difficulty: question.difficulty,
        isCorrect: true,
        hintUsed: false,
      });
    }
    check(
      "weak-topic practice cannot return a needs-review question",
      weakIds.length > 0 &&
        weakIds.every((id) => {
          const question = entomology.find((item) => item.id === id);
          return (
            question !== undefined &&
            question.verificationStatus === "verified" &&
            id !== needsReviewNonImage.id
          );
        }),
    );
  }

  const entomologyAttempt = { questionId: "ento-q1", isCorrect: false };
  const overall = calculateOverallProgress([entomologyAttempt], allQuestions);
  check("Entomology attempts count toward overall questions", overall.totalQuestions === 1);
  check("Entomology attempts count as one event practiced", overall.eventsPracticed === 1);
  const eventProgress = calculateEventProgress(
    "entomology",
    [entomologyAttempt],
    allQuestions,
    12,
  );
  check("Entomology event progress maps eventId", eventProgress.eventId === "entomology");
  check("Entomology event progress counts the attempt", eventProgress.totalQuestions === 1);
  check("Entomology event progress records the topic", eventProgress.topicsPracticed === 1);
  if (needsReviewNonImage) {
    const reviewProgress = calculateEventProgress(
      "entomology",
      [{ questionId: needsReviewNonImage.id, isCorrect: true }],
      allQuestions,
      12,
    );
    check(
      "needs-review historical attempts still count toward event progress",
      reviewProgress.totalQuestions === 1 && reviewProgress.totalCorrect === 1,
    );
  }
  const astronomyProgress = calculateEventProgress(
    "astronomy",
    [entomologyAttempt],
    allQuestions,
    4,
  );
  check(
    "Entomology attempts do not count as Astronomy progress",
    astronomyProgress.totalQuestions === 0,
  );

  if (failures.length > 0) {
    throw new Error(`Curriculum checks failed:\n- ${failures.join("\n- ")}`);
  }

  console.log("Curriculum checks passed.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
