import { MetadataRoute } from 'next';
import { calculators, categories } from '@/data/registry';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moneytools.com';
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    if (host) {
      const proto = h.get('x-forwarded-proto') ?? 'https';
      baseUrl = `${proto}://${host}`;
    }
  } catch {}

  const staticPages = [
    '', '/about', '/methodology', '/editorial-policy',
    '/disclaimer', '/privacy', '/terms', '/contact',
  ];

  const categoryPages = (categories ?? []).map((c) => `/${c.slug}`);
  const calcPages = (calculators ?? []).map((c) => c.route);

  const allPages = [...staticPages, ...categoryPages, ...calcPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly' as any,
    priority: path === '' ? 1 : path.includes('/') && calcPages.includes(path) ? 0.8 : 0.6,
  }));
}
