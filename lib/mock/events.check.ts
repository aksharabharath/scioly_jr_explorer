/**
 * Event catalog checks.
 * Run: npx tsx lib/mock/events.check.ts
 */
import {
  BUILD_EVENT_IDS,
  EXTRA_EVENTS,
  MOCK_EVENTS,
  QUIZ_EVENT_IDS,
  eventStatusLabel,
  getCatalogEventIds,
  getEvent,
  getKnownEvent,
  getSelectableEventIds,
  isPlayablePracticeEvent,
  isStudentCatalogEventId,
} from "@/lib/mock/events";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const catalog = getCatalogEventIds();
const expected = [
  "water-quality",
  "ecology",
  "entomology",
  "anatomy-physiology",
  "codebusters",
  "crime-busters",
  "engineering-cad",
  "hovercraft",
  "rubber-band-catapult",
];

check("catalog contains exactly nine events", catalog.length === 9);
check("catalog ids match MOCK_EVENTS order", catalog.join(",") === expected.join(","));
check("catalog ids are unique", new Set(catalog).size === catalog.length);
check(
  "astronomy is not in the catalog",
  !catalog.includes("astronomy") && EXTRA_EVENTS.some((event) => event.id === "astronomy"),
);
check("entomology is in the catalog", catalog.includes("entomology"));
check(
  "Water Quality, Ecology, Entomology, A&P, and Crime Busters are selectable for MVP practice",
  getSelectableEventIds().join(",") ===
    "water-quality,ecology,entomology,anatomy-physiology,crime-busters",
);
check(
  "four catalog events are locked",
  MOCK_EVENTS.filter((event) => !event.unlocked).length === 4,
);
check(
  "astronomy is not a student catalog event",
  !isStudentCatalogEventId("astronomy"),
);
check(
  "selectable Entomology is labeled Practice",
  eventStatusLabel(
    MOCK_EVENTS.find((event) => event.id === "entomology") ?? MOCK_EVENTS[0],
  ) === "Practice" &&
    MOCK_EVENTS.some((event) => event.id === "entomology"),
);
check(
  "Water Quality is unlocked and labeled Practice",
  (() => {
    const water = MOCK_EVENTS.find((event) => event.id === "water-quality");
    return (
      water !== undefined &&
      water.unlocked === true &&
      eventStatusLabel(water) === "Practice" &&
      isPlayablePracticeEvent(water)
    );
  })(),
);
check(
  "Crime Busters is unlocked and labeled Practice",
  (() => {
    const crime = MOCK_EVENTS.find((event) => event.id === "crime-busters");
    return (
      crime !== undefined &&
      crime.unlocked === true &&
      eventStatusLabel(crime) === "Practice" &&
      isPlayablePracticeEvent(crime)
    );
  })(),
);
check(
  "Ecology is unlocked and labeled Practice",
  (() => {
    const ecology = MOCK_EVENTS.find((event) => event.id === "ecology");
    return (
      ecology !== undefined &&
      ecology.unlocked === true &&
      eventStatusLabel(ecology) === "Practice" &&
      isPlayablePracticeEvent(ecology)
    );
  })(),
);
check(
  "A&P is unlocked and labeled Practice",
  (() => {
    const anatomy = MOCK_EVENTS.find(
      (event) => event.id === "anatomy-physiology",
    );
    return (
      anatomy !== undefined &&
      anatomy.unlocked === true &&
      eventStatusLabel(anatomy) === "Practice" &&
      isPlayablePracticeEvent(anatomy)
    );
  })(),
);
check(
  "locked Hovercraft is labeled Coming later",
  eventStatusLabel(
    MOCK_EVENTS.find((event) => event.id === "hovercraft") ?? MOCK_EVENTS[0],
  ) === "Coming later" &&
    MOCK_EVENTS.some((event) => event.id === "hovercraft"),
);
check(
  "quiz events are the six knowledge events",
  QUIZ_EVENT_IDS.join(",") ===
    "water-quality,ecology,entomology,anatomy-physiology,codebusters,crime-busters",
);
check(
  "build events are the three engineering events",
  BUILD_EVENT_IDS.join(",") === "engineering-cad,hovercraft,rubber-band-catapult",
);

for (const event of MOCK_EVENTS) {
  check(`${event.id} has a kind`, event.kind === "quiz" || event.kind === "build");
}

check(
  "Water Quality, Ecology, Entomology, A&P, and Crime Busters are the playable catalog events",
  MOCK_EVENTS.filter(isPlayablePracticeEvent)
    .map((event) => event.id)
    .join(",") ===
    "water-quality,ecology,entomology,anatomy-physiology,crime-busters",
);

async function run() {
  const astronomy = await getEvent("astronomy");
  check("astronomy remains a known extra event", astronomy?.id === "astronomy");
  check("astronomy extra event is a quiz event", astronomy?.kind === "quiz");
  check(
    "getKnownEvent finds catalog entomology",
    getKnownEvent("entomology")?.name === "Entomology",
  );

  if (failures.length > 0) {
    throw new Error(`Event catalog checks failed:\n- ${failures.join("\n- ")}`);
  }

  console.log("Event catalog checks passed.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
