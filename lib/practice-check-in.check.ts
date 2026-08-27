/**
 * Practice-today notebook checks.
 * Run: npx tsx lib/practice-check-in.check.ts
 */
import { practicedOnDate, practicedTodayUtc } from "./practice-check-in";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check(
  "empty notebook: no practice",
  practicedOnDate([], "2026-08-26") === false,
);
check(
  "same UTC day counts",
  practicedOnDate(
    [{ answeredAt: "2026-08-26T18:01:00.000Z" }],
    "2026-08-26",
  ) === true,
);
check(
  "other day does not count",
  practicedOnDate(
    [{ answeredAt: "2026-08-25T23:59:00.000Z" }],
    "2026-08-26",
  ) === false,
);
check(
  "missing timestamp does not count",
  practicedOnDate([{ answeredAt: null }], "2026-08-26") === false,
);
check(
  "practicedTodayUtc uses UTC calendar day",
  practicedTodayUtc(
    [{ answeredAt: new Date("2026-08-26T00:30:00.000Z").toISOString() }],
    new Date("2026-08-26T12:00:00.000Z"),
  ) === true,
);

if (failures.length) {
  console.error("FAIL", failures);
  process.exit(1);
}
console.log("ok");
