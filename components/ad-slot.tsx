/**
 * AdSlot stub component — reserves space for ads but renders nothing visible in V1.
 * Renders only if NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 */

interface AdSlotProps {
  format: 'leaderboard' | 'rectangle' | 'mobile-banner';
  className?: string;
}

const dimensions = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  'mobile-banner': { width: 320, height: 50 },
};

export function AdSlot({ format, className }: AdSlotProps) {
  // No ads in V1
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) return null;

  const dim = dimensions[format] ?? dimensions.rectangle;
  return (
    <div
      className={`mx-auto ${className ?? ''}`}
      style={{ width: dim.width, height: dim.height, maxWidth: '100%' }}
      aria-hidden="true"
    />
  );
}
