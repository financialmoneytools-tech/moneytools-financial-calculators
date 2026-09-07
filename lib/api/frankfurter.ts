/**
 * Currency reference rates — Frankfurter API.
 *
 * Provider:      https://frankfurter.dev
 * Endpoint:      https://api.frankfurter.dev/v1/...
 * API key:       none required
 * Commercial:    permitted (ECB reference rates are open data; the Frankfurter
 *                project mirrors them and allows commercial reuse)
 * Rate limits:   no daily/monthly quota; abuse-protection rate limiting only
 * Underlying:    European Central Bank euro foreign exchange reference rates
 *
 * IMPORTANT — these are DAILY REFERENCE RATES, not live market prices.
 * The ECB publishes them once per business day (around 16:00 CET). The UI must
 * present them as "reference rates" with the publication date, never as "live".
 *
 * Implementation note: we deliberately call the unfiltered endpoints
 * (`/v1/latest`, `/v1/{date}`) rather than passing currency filter parameters.
 * The response is ~30 keys either way, and this avoids any dependency on
 * filter parameter naming, which has differed between provider doc versions.
 * All pairs below are derived locally from the EUR-based table.
 */

import {
  fetchJson,
  fail,
  ok,
  isRecord,
  isFiniteNumber,
  isNonEmptyString,
  logProviderFailure,
  type Result,
} from './types';

const BASE_URL = 'https://api.frankfurter.dev/v1';

/** Cache for 15 minutes. The underlying data changes at most once per day. */
export const CURRENCY_REVALIDATE_SECONDS = 900;

export interface EurRateTable {
  /** Publication date of the reference rates, `YYYY-MM-DD`. */
  date: string;
  /** Units of each currency per 1 EUR. */
  rates: Record<string, number>;
}

export interface CurrencyPair {
  /** e.g. "USD/TRY" */
  label: string;
  base: string;
  quote: string;
  /** Units of `quote` per `unit` units of `base`. */
  rate: number;
  /** Usually 1; 100 for low-value currencies such as JPY. */
  unit: number;
}

export interface CurrencyRates {
  date: string;
  pairs: CurrencyPair[];
}

/**
 * The pairs shown in the homepage panel. Global majors first, with the two
 * TRY pairs kept for the initial target audience.
 */
const DISPLAY_PAIRS: ReadonlyArray<{ base: string; quote: string; unit: number }> = [
  { base: 'EUR', quote: 'USD', unit: 1 },
  { base: 'GBP', quote: 'USD', unit: 1 },
  { base: 'USD', quote: 'JPY', unit: 1 },
  { base: 'USD', quote: 'CHF', unit: 1 },
  { base: 'USD', quote: 'TRY', unit: 1 },
  { base: 'EUR', quote: 'TRY', unit: 1 },
];

function parseEurRateTable(json: unknown): EurRateTable | null {
  if (!isRecord(json)) return null;
  if (!isNonEmptyString(json.date)) return null;
  if (!isRecord(json.rates)) return null;

  const rates: Record<string, number> = {};
  for (const [code, value] of Object.entries(json.rates)) {
    if (isFiniteNumber(value) && value > 0) {
      rates[code] = value;
    }
  }

  // The API returns EUR-based rates, so EUR itself is implicit.
  rates.EUR = 1;

  // A valid response always carries a meaningful number of currencies.
  if (Object.keys(rates).length < 5) return null;

  return { date: json.date, rates };
}

/**
 * Fetch the EUR-based reference rate table for a given date.
 * @param date `YYYY-MM-DD`, or `'latest'`.
 */
export async function getEurRateTable(
  date: string = 'latest',
  revalidate: number = CURRENCY_REVALIDATE_SECONDS
): Promise<Result<EurRateTable>> {
  const result = await fetchJson(`${BASE_URL}/${date}`, { revalidate });

  if ('error' in result) {
    logProviderFailure('frankfurter', result.error);
    return fail(result.error);
  }

  const table = parseEurRateTable(result.json);
  if (!table) {
    logProviderFailure('frankfurter', 'invalid_response');
    return fail('invalid_response');
  }

  return ok(table);
}

/**
 * Derive a cross rate from the EUR-based table.
 * Returns null when either leg is missing from the provider response.
 */
export function deriveRate(
  table: EurRateTable,
  base: string,
  quote: string,
  unit: number = 1
): number | null {
  const perEurBase = table.rates[base];
  const perEurQuote = table.rates[quote];

  if (!isFiniteNumber(perEurBase) || !isFiniteNumber(perEurQuote)) return null;
  if (perEurBase <= 0) return null;

  return (perEurQuote / perEurBase) * unit;
}

/** The currency panel data for the homepage. */
export async function getCurrencyRates(): Promise<Result<CurrencyRates>> {
  const table = await getEurRateTable('latest');
  if (!table.ok) return fail(table.reason);

  const pairs: CurrencyPair[] = [];

  for (const spec of DISPLAY_PAIRS) {
    const rate = deriveRate(table.data, spec.base, spec.quote, spec.unit);
    if (rate === null) continue;

    pairs.push({
      label: `${spec.base}/${spec.quote}`,
      base: spec.base,
      quote: spec.quote,
      rate,
      unit: spec.unit,
    });
  }

  // If the provider responded but carried none of our pairs, treat it as a
  // failure rather than rendering an empty panel.
  if (pairs.length === 0) {
    logProviderFailure('frankfurter', 'invalid_response');
    return fail('invalid_response');
  }

  return ok({ date: table.data.date, pairs });
}
