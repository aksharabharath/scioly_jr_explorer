/** Turn typed phone text into +1XXXXXXXXXX style, or null if it is not a number. */
export function toE164(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  if (
    trimmed.startsWith("+") &&
    digits.length >= 10 &&
    digits.length <= 15
  ) {
    return `+${digits}`;
  }
  return null;
}
