/**
 * Phone number shape checks.
 * Run: npx tsx lib/vapi/phone.check.ts
 */
import { toE164 } from "./phone";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check("10 digits become +1", toE164("5551234567") === "+15551234567");
check("dashes ok", toE164("555-123-4567") === "+15551234567");
check("already +1", toE164("+15551234567") === "+15551234567");
check("leading 1", toE164("15551234567") === "+15551234567");
check("empty is null", toE164("") === null);
check("too short is null", toE164("5551234") === null);

if (failures.length) {
  console.error("FAIL", failures);
  process.exit(1);
}
console.log("ok");
