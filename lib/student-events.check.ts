/**
 * Event Selection v1 checks.
 * Run: npx tsx lib/student-events.check.ts
 */
import { MOCK_EVENTS, getCatalogEventIds, getSelectableEventIds } from "@/lib/mock/events";
import {
  filterKnownEventIds,
  isCatalogEventId,
  normalizeEventSelection,
  resolveSelectedEvents,
} from "@/lib/event-selection";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const catalog = getCatalogEventIds();

check("catalog has the nine dashboard events", catalog.length === 9);
check(
  "catalog ids match MOCK_EVENTS",
  catalog.join(",") === MOCK_EVENTS.map((event) => event.id).join(","),
);
check(
  "entomology is in the catalog",
  isCatalogEventId("entomology", catalog) && catalog.includes("entomology"),
);
check(
  "astronomy is not a selectable catalog id",
  !isCatalogEventId("astronomy", catalog),
);
check(
  "made-up id is not in the catalog",
  !isCatalogEventId("not-a-real-event", catalog),
);

const valid = normalizeEventSelection(["entomology", "ecology"], catalog);
check("valid ids are accepted", valid.ok);
if (valid.ok) {
  check("valid ids keep two events", valid.eventIds.length === 2);
  check(
    "normalized order follows catalog",
    valid.eventIds.join(",") === "ecology,entomology",
  );
}

const entomologyOnly = normalizeEventSelection(["entomology"], catalog);
check("selecting Entomology alone persists", entomologyOnly.ok);
if (entomologyOnly.ok) {
  check(
    "Entomology remains the stored id",
    entomologyOnly.eventIds.join(",") === "entomology",
  );
}

const invalid = normalizeEventSelection(["entomology", "hack-the-planet"], catalog);
check("invalid ids are rejected", !invalid.ok && invalid.error === "invalid");

const empty = normalizeEventSelection([], catalog);
check("empty selection is rejected", !empty.ok && empty.error === "empty");

const blanks = normalizeEventSelection(["", "  "], catalog);
check("blank-only selection is rejected", !blanks.ok && blanks.error === "empty");

const duplicates = normalizeEventSelection(
  ["entomology", "entomology", "ecology", "entomology"],
  catalog,
);
check("duplicate ids collapse to unique rows", duplicates.ok);
if (duplicates.ok) {
  check(
    "duplicates do not create extra ids",
    duplicates.eventIds.length === 2 &&
      duplicates.eventIds.includes("entomology") &&
      duplicates.eventIds.includes("ecology"),
  );
}

const mixedCaseUnknown = normalizeEventSelection(["Entomology"], catalog);
check(
  "ids are exact catalog strings, not fuzzy names",
  !mixedCaseUnknown.ok && mixedCaseUnknown.error === "invalid",
);

const resolved = resolveSelectedEvents(MOCK_EVENTS, ["entomology", "ecology"]);
check("dashboard resolve returns only selected events", resolved.length === 2);
check(
  "dashboard resolve keeps catalog order",
  resolved.map((event) => event.id).join(",") === "ecology,entomology",
);
check(
  "unknown selected ids are ignored at display time",
  resolveSelectedEvents(MOCK_EVENTS, ["entomology", "ghost-event"]).length === 1,
);
check(
  "reads keep valid ids when a stored id is unknown",
  filterKnownEventIds(["entomology", "ghost-event"], catalog).join(",") ===
    "entomology",
);
check(
  "legacy astronomy selections drop out of the catalog filter",
  filterKnownEventIds(["astronomy", "entomology"], catalog).join(",") ===
    "entomology",
);

const selectable = getSelectableEventIds();
check(
  "selectable ids are Water Quality, Ecology, Entomology, A&P, and Crime Busters",
  selectable.join(",") ===
    "water-quality,ecology,entomology,anatomy-physiology,crime-busters",
);
const lockedSave = normalizeEventSelection(["hovercraft"], selectable);
check(
  "locked build events cannot be saved",
  !lockedSave.ok && lockedSave.error === "invalid",
);
const lockedQuiz = normalizeEventSelection(
  ["codebusters", "entomology"],
  selectable,
);
check(
  "locked quiz events cannot be saved",
  !lockedQuiz.ok && lockedQuiz.error === "invalid",
);
const unavailableBanks = normalizeEventSelection(
  ["codebusters"],
  selectable,
);
check(
  "locked quiz events cannot be saved on their own",
  !unavailableBanks.ok,
);
const ecologyOnly = normalizeEventSelection(["ecology"], selectable);
check("Ecology can be saved alone", ecologyOnly.ok);
const waterQualityOnly = normalizeEventSelection(
  ["water-quality"],
  selectable,
);
check("Water Quality can be saved alone", waterQualityOnly.ok);
const entomologyOnlySelectable = normalizeEventSelection(
  ["entomology"],
  selectable,
);
check("Entomology can be saved alone", entomologyOnlySelectable.ok);
if (entomologyOnlySelectable.ok) {
  check(
    "saved Entomology-only selection is Entomology",
    entomologyOnlySelectable.eventIds.join(",") === "entomology",
  );
}
const anatomyOnlySelectable = normalizeEventSelection(
  ["anatomy-physiology"],
  selectable,
);
check("A&P can be saved alone", anatomyOnlySelectable.ok);
const crimeBustersOnly = normalizeEventSelection(
  ["crime-busters"],
  selectable,
);
check("Crime Busters can be saved alone", crimeBustersOnly.ok);
const fivePlayable = normalizeEventSelection(
  [
    "crime-busters",
    "anatomy-physiology",
    "water-quality",
    "ecology",
    "entomology",
  ],
  selectable,
);
check(
  "Water Quality, Ecology, Entomology, A&P, and Crime Busters can be saved together",
  fivePlayable.ok,
);
if (fivePlayable.ok) {
  check(
    "saved playable events keep catalog order",
    fivePlayable.eventIds.join(",") ===
      "water-quality,ecology,entomology,anatomy-physiology,crime-busters",
  );
}

if (failures.length > 0) {
  throw new Error(`Event selection checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Event selection checks passed.");
