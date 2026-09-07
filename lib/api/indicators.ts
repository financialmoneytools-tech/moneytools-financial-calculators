/**
 * Rates & Indicators.
 *
 * LICENSING DECISION — read before extending this module.
 *
 * We deliberately do NOT source this section from a stock/index market data
 * provider. Equity index prices (S&P 500, Nasdaq, Dow, BIST) are exchange-
 * licensed data. None of the free tiers surveyed (Alpha Vantage, Finnhub,
 * Twelve Data, Financial Modeling Prep, Marketstack, Stooq) grant display
 * rights on an advertising-supported commercial website. Using one would be a
 * licensing violation, not merely a quota problem.
 *
 * Instead this module derives trend indicators from the SAME data we are
 * already licensed to display: the ECB reference rates served by Frankfurter,
 * which permits commercial use. No new provider, no new API key, no new
 * licensing question, and nothing fabricated — every number below is computed
 * from two real published reference-rate tables.
 *
 * If a properly licensed market data provider is contracted later, add it as a
 * separate module and extend `Indicator[]`; the UI already handles a mixed list.
 */

import { fail, ok, logProviderFailure, type Result } from './types';
import { getEurRateTable, deriveRate } from './frankfurter';

/** Indicators move slowly (daily data) — cache for an hour. */
export const INDICATORS_REVALIDATE_SECONDS = 3600;

/** How far back the comparison window reaches. */
const LOOKBACK_DAYS = 30;

export interface Indicator {
  label: string;
  /** Current value, already formatted for display by the component. */
  value: number;
  /** Percentage change over the lookback window. */
  changePercent: number;
  /** 'up' | 'down' | 'flat' — never conveyed by colour alone in the UI. */
  direction: 'up' | 'down' | 'flat';
  unit: number;
}

export interface IndicatorSet {
  indicators: Indicator[];
  /** Publication date of the current reference rates. */
  currentDate: string;
  /** Publication date of the comparison reference rates. */
  comparisonDate: string;
  lookbackDays: number;
}

const TRACKED: ReadonlyArray<{ base: string; quote: string; unit: number }> = [
  { base: 'EUR', quote: 'USD', unit: 1 },
  { base: 'GBP', quote: 'USD', unit: 1 },
  { base: 'USD', quote: 'JPY', unit: 1 },
  { base: 'USD', quote: 'TRY', unit: 1 },
];

/** `YYYY-MM-DD` for N days before today, in UTC. */
function isoDateDaysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function classify(changePercent: number): 'up' | 'down' | 'flat' {
  if (changePercent > 0.05) return 'up';
  if (changePercent < -0.05) return 'down';
  return 'flat';
}

export async function getIndicators(): Promise<Result<IndicatorSet>> {
  const [current, past] = await Promise.all([
    getEurRateTable('latest', INDICATORS_REVALIDATE_SECONDS),
    getEurRateTable(isoDateDaysAgo(LOOKBACK_DAYS), INDICATORS_REVALIDATE_SECONDS),
  ]);

  if (!current.ok) return fail(current.reason);
  if (!past.ok) return fail(past.reason);

  const indicators: Indicator[] = [];

  for (const spec of TRACKED) {
    const now = deriveRate(current.data, spec.base, spec.quote, spec.unit);
    const then = deriveRate(past.data, spec.base, spec.quote, spec.unit);

    if (now === null || then === null || then === 0) continue;

    const changePercent = ((now - then) / then) * 100;

    indicators.push({
      label: `${spec.base}/${spec.quote}`,
      value: now,
      changePercent,
      direction: classify(changePercent),
      unit: spec.unit,
    });
  }

  if (indicators.length === 0) {
    logProviderFailure('indicators', 'invalid_response');
    return fail('invalid_response');
  }

  return ok({
    indicators,
    currentDate: current.data.date,
    comparisonDate: past.data.date,
    lookbackDays: LOOKBACK_DAYS,
  });
}
