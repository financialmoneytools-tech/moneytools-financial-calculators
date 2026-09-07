/**
 * Homepage "Live Financial Snapshot" data sources.
 *
 * Both sources are public, free, and require no API key or secret:
 *   - FX rates: open.er-api.com (open access endpoint of ExchangeRate-API)
 *   - Index quotes: stooq.com CSV endpoint (end-of-day / delayed intraday)
 *
 * Every fetch fails closed: on any network, status, or parse error the helper
 * returns an empty list and the UI renders an honest "unavailable" message.
 * No value is ever fabricated, estimated, or carried over from a stale render.
 */

type CurrencyCode = 'EUR' | 'GBP' | 'JPY' | 'TRY';

type CurrencyRatesApi = {
  result?: string;
  time_last_update_unix?: number;
  rates?: Record<string, number>;
};

export type CurrencyRateRow = {
  pair: string;
  rate: number;
};

export type MarketRow = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  asOf: string;
};

export type HomepageWidgetsData = {
  currencyRates: CurrencyRateRow[];
  marketSnapshot: MarketRow[];
};

const REQUEST_HEADERS = {
  'User-Agent': 'MoneyTools/1.0 (+https://moneytools.com)',
  Accept: 'text/plain,application/json;q=0.9,*/*;q=0.8',
};

const WANTED_CURRENCIES: CurrencyCode[] = ['EUR', 'GBP', 'JPY', 'TRY'];

/** Stooq index tickers, in display order. */
const MARKET_SYMBOLS: Array<{ ticker: string; name: string }> = [
  { ticker: '^spx', name: 'S&P 500' },
  { ticker: '^dji', name: 'Dow Jones' },
  { ticker: '^ndq', name: 'Nasdaq Composite' },
];

function toFiniteNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed === 'N/D') return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}

async function fetchCurrencyRates(): Promise<CurrencyRateRow[]> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: REQUEST_HEADERS,
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as CurrencyRatesApi;
    if (data.result !== 'success' || !data.rates) return [];

    return WANTED_CURRENCIES.map((code) => ({
      pair: `USD/${code}`,
      rate: data.rates?.[code] ?? 0,
    })).filter((row) => row.rate > 0);
  } catch {
    return [];
  }
}

/**
 * Stooq returns one CSV row per ticker:
 *   Symbol,Date,Time,Open,High,Low,Close
 *   ^SPX,2026-09-05,22:15:00,6500.12,6521.44,6488.90,6510.31
 *
 * Unavailable fields come back as "N/D" and are dropped rather than guessed.
 * changePct is measured against the session open, which is the only comparison
 * this endpoint actually supports — it is labelled as such in the UI.
 */
function parseStooqCsv(csv: string): MarketRow[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const rows: MarketRow[] = [];

  for (const line of lines.slice(1)) {
    const cells = line.split(',');
    if (cells.length < 7) continue;

    const ticker = cells[0]?.trim().toLowerCase();
    const known = MARKET_SYMBOLS.find((entry) => entry.ticker === ticker);
    if (!known) continue;

    const open = toFiniteNumber(cells[3]);
    const close = toFiniteNumber(cells[6]);
    if (open === null || close === null || open <= 0 || close <= 0) continue;

    const date = cells[1]?.trim();
    const time = cells[2]?.trim();

    rows.push({
      symbol: known.ticker,
      name: known.name,
      price: close,
      changePct: ((close - open) / open) * 100,
      asOf: date && date !== 'N/D' ? `${date}${time && time !== 'N/D' ? ` ${time}` : ''}` : '',
    });
  }

  return MARKET_SYMBOLS.map((entry) => rows.find((row) => row.symbol === entry.ticker)).filter(
    (row): row is MarketRow => Boolean(row)
  );
}

async function fetchMarketSnapshot(): Promise<MarketRow[]> {
  try {
    const tickers = MARKET_SYMBOLS.map((entry) => entry.ticker.replace('^', '%5E')).join('+');
    const response = await fetch(`https://stooq.com/q/l/?s=${tickers}&f=sd2t2ohlc&h&e=csv`, {
      headers: REQUEST_HEADERS,
      next: { revalidate: 900 },
    });

    if (!response.ok) return [];

    return parseStooqCsv(await response.text());
  } catch {
    return [];
  }
}

export async function getHomepageWidgetsData(): Promise<HomepageWidgetsData> {
  const [currencyRates, marketSnapshot] = await Promise.all([
    fetchCurrencyRates(),
    fetchMarketSnapshot(),
  ]);

  return { currencyRates, marketSnapshot };
}
