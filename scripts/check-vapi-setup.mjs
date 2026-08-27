/**
 * Prints whether Vapi can see a FROM number.
 * Does not print the API key.
 *
 * Run: node --env-file=.env.local scripts/check-vapi-setup.mjs
 */
const key = process.env.VAPI_API_KEY?.trim();
const configuredFrom = Boolean(process.env.VAPI_PHONE_NUMBER_ID?.trim());
const configuredTo = Boolean(process.env.VAPI_CUSTOMER_NUMBER?.trim());

if (!key) {
  console.log("hasApiKey: no");
  console.log("Ask a grown-up to set VAPI_API_KEY in .env.local");
  process.exit(1);
}

console.log("hasApiKey: yes");
console.log("hasConfiguredFromId:", configuredFrom);
console.log("hasConfiguredToNumber:", configuredTo);

const response = await fetch("https://api.vapi.ai/phone-number", {
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
});

console.log("phoneListStatus:", response.status);

if (!response.ok) {
  process.exit(1);
}

const body = await response.json();
const list = Array.isArray(body)
  ? body
  : Array.isArray(body?.results)
    ? body.results
    : Array.isArray(body?.data)
      ? body.data
      : [];

console.log("phoneNumberCount:", list.length);
console.log("canCallFromAccountNumber:", list.length > 0 || configuredFrom);
