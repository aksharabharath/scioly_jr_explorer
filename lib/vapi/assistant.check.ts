/**
 * Coach-script checks.
 * Run: npx tsx lib/vapi/assistant.check.ts
 */
import { buildPracticeCoachAssistant } from "./assistant";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const yesCall = buildPracticeCoachAssistant({
  studentName: "Alex",
  practicedToday: true,
  eventNames: "Entomology",
  streakDays: 3,
});
const noCall = buildPracticeCoachAssistant({
  studentName: "Alex",
  practicedToday: false,
  eventNames: "Entomology",
  streakDays: 0,
});

check(
  "asks about practice first",
  yesCall.firstMessage.includes("Did you get to practice"),
);
check(
  "yes notebook is in the script",
  yesCall.model.messages[0].content.includes("DID answer"),
);
check(
  "no notebook is in the script",
  noCall.model.messages[0].content.includes("have NOT answered"),
);
check("call stays short", yesCall.maxDurationSeconds === 180);

if (failures.length) {
  console.error("FAIL", failures);
  process.exit(1);
}
console.log("ok");
