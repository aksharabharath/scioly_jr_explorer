/**
 * Server-only Vapi settings. Never import this from a client component.
 */
export function getVapiApiKey(): string | null {
  const key = process.env.VAPI_API_KEY?.trim();
  return key ? key : null;
}

export function getVapiPhoneNumberId(): string | null {
  const id = process.env.VAPI_PHONE_NUMBER_ID?.trim();
  return id ? id : null;
}

/** Optional test destination. Server-only. Never expose as NEXT_PUBLIC_. */
export function getVapiCustomerNumber(): string | null {
  const number = process.env.VAPI_CUSTOMER_NUMBER?.trim();
  return number ? number : null;
}
