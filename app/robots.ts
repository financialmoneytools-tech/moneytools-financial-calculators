import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let baseUrl = configuredUrl ?? 'https://www.moneyatlas.net';
  try {
    const h = headers();
    const host = configuredUrl ? null : (h.get('x-forwarded-host') ?? h.get('host'));
    if (host) {
      const proto = h.get('x-forwarded-proto') ?? 'https';
      baseUrl = `${proto}://${host}`;
    }
  } catch {}

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
