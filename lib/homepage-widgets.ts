/**
 * Homepage "Financial Snapshot" composition layer.
 *
 * Single upstream provider: Frankfurter (European Central Bank reference
 * rates). No API key, no secret, commercial use permitted. See
 * lib/api/frankfurter.ts and lib/api/indicators.ts for the licensing notes —
 * in particular why this page shows no equity index prices.
 *
 * Both sections fail closed: on any network, status, timeout or parse error
 * the value is null and the UI renders an honest "unavailable" message. No
 * number is ever fabricated, estimated, or carried over from a stale render.
 */

import { getCurrencyRates, type CurrencyRates } from '@/lib/api/frankfurter';
import { getIndicators, type IndicatorSet } from '@/lib/api/indicators';

export type HomepageWidgetsData = {
  currency: CurrencyRates | null;
  indicators: IndicatorSet | null;
};

export async function getHomepageWidgetsData(): Promise<HomepageWidgetsData> {
  const [currency, indicators] = await Promise.all([getCurrencyRates(), getIndicators()]);

  return {
    currency: currency.ok ? currency.data : null,
    indicators: indicators.ok ? indicators.data : null,
  };
}
