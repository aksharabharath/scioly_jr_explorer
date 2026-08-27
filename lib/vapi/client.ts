const VAPI_BASE = "https://api.vapi.ai";

type VapiPhoneNumber = {
  id?: string;
};

export class VapiRequestError extends Error {
  status: number;

  constructor(status: number, message = "vapi-request-failed") {
    super(message);
    this.name = "VapiRequestError";
    this.status = status;
  }
}

export class VapiMissingFromNumberError extends Error {
  constructor() {
    super("vapi-missing-from-number");
    this.name = "VapiMissingFromNumberError";
  }
}

async function vapiFetch(
  apiKey: string,
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const response = await fetch(`${VAPI_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    throw new VapiRequestError(response.status);
  }

  return body;
}

function phoneIdFrom(item: unknown): string | null {
  if (typeof item !== "object" || item === null) {
    return null;
  }
  const id = (item as VapiPhoneNumber).id;
  return typeof id === "string" && id ? id : null;
}

function phoneNumbersFromList(body: unknown): VapiPhoneNumber[] {
  if (Array.isArray(body)) {
    return body as VapiPhoneNumber[];
  }
  if (typeof body === "object" && body !== null) {
    const record = body as { results?: unknown; data?: unknown };
    if (Array.isArray(record.results)) {
      return record.results as VapiPhoneNumber[];
    }
    if (Array.isArray(record.data)) {
      return record.data as VapiPhoneNumber[];
    }
  }
  return [];
}

export async function getOrCreateVapiPhoneNumberId(
  apiKey: string,
  configuredId: string | null,
): Promise<string> {
  if (configuredId) {
    return configuredId;
  }

  const listed = await vapiFetch(apiKey, "/phone-number");
  const firstListed = phoneNumbersFromList(listed)
    .map(phoneIdFrom)
    .find((id): id is string => Boolean(id));
  if (firstListed) {
    return firstListed;
  }

  try {
    const created = await vapiFetch(apiKey, "/phone-number", {
      method: "POST",
      body: JSON.stringify({
        provider: "vapi",
        numberDesiredAreaCode: "415",
      }),
    });
    const createdId = phoneIdFrom(created);
    if (createdId) {
      return createdId;
    }
  } catch (cause) {
    if (cause instanceof VapiRequestError) {
      throw new VapiMissingFromNumberError();
    }
    throw cause;
  }

  throw new VapiMissingFromNumberError();
}

export async function createOutboundCall(input: {
  apiKey: string;
  phoneNumberId: string;
  customerNumber: string;
  assistant: unknown;
}): Promise<{ id: string | null }> {
  const body = (await vapiFetch(input.apiKey, "/call", {
    method: "POST",
    body: JSON.stringify({
      phoneNumberId: input.phoneNumberId,
      customer: { number: input.customerNumber },
      assistant: input.assistant,
    }),
  })) as { id?: string };

  return { id: typeof body?.id === "string" ? body.id : null };
}
