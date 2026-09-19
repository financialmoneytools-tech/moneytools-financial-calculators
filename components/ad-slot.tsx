'use client';

/**
 * AdSlot — renders a Google AdSense unit.
 * Renders only if NEXT_PUBLIC_ADSENSE_CLIENT_ID is set; otherwise nothing is output.
 */

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  format: 'leaderboard' | 'rectangle' | 'mobile-banner';
  /** AdSense ad unit id (data-ad-slot). Defaults to the site's display unit. */
  slot?: string;
  className?: string;
}

const dimensions = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  'mobile-banner': { width: 320, height: 50 },
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/** The site's responsive display unit, used by every placement unless one is passed in. */
const DEFAULT_AD_SLOT = '4160588853';

export function AdSlot({ format, slot, className }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || pushed.current) return;
    pushed.current = true;

    try {
      const w = window as typeof window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle ?? [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense script blocked or unavailable — leave the reserved space empty.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) return null;

  const dim = dimensions[format] ?? dimensions.rectangle;

  return (
    <div
      className={`mx-auto ${className ?? ''}`}
      style={{ width: dim.width, minHeight: dim.height, maxWidth: '100%' }}
      role="complementary"
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: dim.height }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot ?? DEFAULT_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
