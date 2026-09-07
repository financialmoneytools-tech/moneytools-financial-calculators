/**
 * Shared types and fetch helpers for external data providers.
 *
 * Design rules (see also each provider module):
 *  - Server-only. Never imported into a client component.
 *  - Never throws. Every failure becomes `{ ok: false, reason }`.
 *  - Always has a timeout so a slow provider cannot hang a render.
 *  - Runtime-validates the response shape before returning it.
 */

export type Result<T> =
  | {
      ok: true;
      data: T;
      /** ISO timestamp of when this response was produced by the server. */
      fetchedAt: string;
    }
  | {
      ok: false;
      /** Short machine-readable code. Never shown raw to the user. */
      reason: FailureReason;
    };

export type FailureReason =
  | 'not_configured'
  | 'timeout'
  | 'network_error'
  | 'bad_status'
  | 'invalid_response'
  | 'unknown';

export const DEFAULT_TIMEOUT_MS = 5000;

export function ok<T>(data: T): Result<T> {
  return { ok: true, data, fetchedAt: new Date().toISOString() };
}

export function fail<T>(reason: FailureReason): Result<T> {
  return { ok: false, reason };
}

/**
 * Server-side diagnostic logging. Only logs the provider name and a reason
 * code — never a URL (which may carry an API key) and never response bodies.
 */
export function logProviderFailure(provider: string, reason: FailureReason): void {
  console.warn(`[moneyatlas] provider "${provider}" unavailable (${reason})`);
}

interface FetchOptions {
  /** Seconds. Passed to the Next.js Data Cache. */
  revalidate: number;
  timeoutMs?: number;
  accept?: string;
}

/**
 * Fetch text with a hard timeout and Next.js revalidation.
 * Returns a failure reason on any error; the caller maps that to a Result.
 */
async function fetchWithTimeout(
  url: string,
  options: FetchOptions
): Promise<{ text: string } | { error: FailureReason }> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        Accept: options.accept ?? 'application/json',
        'User-Agent': 'MoneyAtlas/1.0 (+https://www.moneyatlas.net)',
      },
      next: { revalidate: options.revalidate },
    });

    if (!response.ok) {
      return { error: 'bad_status' };
    }

    return { text: await response.text() };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return { error: 'timeout' };
    }
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: 'timeout' };
    }
    return { error: 'network_error' };
  }
}

/** Fetch and JSON-parse. Any parse failure becomes `invalid_response`. */
export async function fetchJson(
  url: string,
  options: FetchOptions
): Promise<{ json: unknown } | { error: FailureReason }> {
  const result = await fetchWithTimeout(url, options);
  if ('error' in result) return result;

  try {
    return { json: JSON.parse(result.text) as unknown };
  } catch {
    return { error: 'invalid_response' };
  }
}

/* ------------------------------------------------------------------ */
/* Lightweight runtime validation (no Zod — not installed, not needed) */
/* ------------------------------------------------------------------ */

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
