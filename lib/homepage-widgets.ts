type CurrencyCode = 'EUR' | 'GBP' | 'TRY';

type CurrencyRatesApi = {
  result?: string;
  rates?: Record<string, number>;
};

type YahooQuoteApi = {
  quoteResponse?: {
    result?: Array<{
      symbol?: string;
      shortName?: string;
      regularMarketPrice?: number;
      regularMarketChangePercent?: number;
    }>;
  };
};

type OpenMeteoApi = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
};

export type HomepageWidgetsData = {
  currencyRates: Array<{ pair: string; rate: number }>;
  marketSnapshot: Array<{ symbol: string; name: string; price: number; changePct: number }>;
  weather: { city: string; temperatureC: number; windKmh: number; summary: string };
};

const MARKET_SYMBOLS = ['^GSPC', '^DJI', '^IXIC'];
const MARKET_NAME_FALLBACK: Record<string, string> = {
  '^GSPC': 'S&P 500',
  '^DJI': 'Dow Jones',
  '^IXIC': 'Nasdaq',
};

function weatherCodeToText(code: number): string {
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Showers';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Variable';
}

async function fetchCurrencyRates(): Promise<Array<{ pair: string; rate: number }>> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as CurrencyRatesApi;
    if (data.result !== 'success' || !data.rates) return [];

    const wanted: CurrencyCode[] = ['EUR', 'GBP', 'TRY'];
    return wanted
      .map((code) => ({ pair: `USD/${code}`, rate: data.rates?.[code] ?? 0 }))
      .filter((item) => item.rate > 0);
  } catch {
    return [];
  }
}

async function fetchMarketSnapshot(): Promise<Array<{ symbol: string; name: string; price: number; changePct: number }>> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(MARKET_SYMBOLS.join(','))}`,
      { next: { revalidate: 900 } }
    );

    if (!response.ok) return [];

    const data = (await response.json()) as YahooQuoteApi;
    const rows = data.quoteResponse?.result ?? [];

    return rows
      .map((row) => {
        const symbol = row.symbol ?? '';
        const price = row.regularMarketPrice ?? 0;
        const changePct = row.regularMarketChangePercent ?? 0;

        return {
          symbol,
          name: row.shortName || MARKET_NAME_FALLBACK[symbol] || symbol,
          price,
          changePct,
        };
      })
      .filter((row) => row.symbol && row.price > 0);
  } catch {
    return [];
  }
}

async function fetchWeather(): Promise<{ city: string; temperatureC: number; windKmh: number; summary: string } | null> {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto',
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as OpenMeteoApi;
    const current = data.current;
    if (!current) return null;

    const temperatureC = current.temperature_2m ?? 0;
    const windKmh = current.wind_speed_10m ?? 0;
    const code = current.weather_code ?? -1;

    return {
      city: 'Istanbul',
      temperatureC,
      windKmh,
      summary: weatherCodeToText(code),
    };
  } catch {
    return null;
  }
}

export async function getHomepageWidgetsData(): Promise<HomepageWidgetsData> {
  const [currencyRates, marketSnapshot, weather] = await Promise.all([
    fetchCurrencyRates(),
    fetchMarketSnapshot(),
    fetchWeather(),
  ]);

  return {
    currencyRates,
    marketSnapshot,
    weather: weather ?? {
      city: 'Istanbul',
      temperatureC: 0,
      windKmh: 0,
      summary: 'Unavailable',
    },
  };
}
