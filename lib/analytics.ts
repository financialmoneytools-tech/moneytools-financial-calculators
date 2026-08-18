/**
 * Analytics abstraction — privacy-first, GA4-ready
 * No financial values are ever included in events.
 */

type EventName =
  | 'calculator_view'
  | 'calculator_completed'
  | 'calculator_export'
  | 'calculator_related_tool_click'
  | 'calculator_error';

interface EventProperties {
  calculator_slug?: string;
  category?: string;
  action?: string;
  [key: string]: string | number | boolean | undefined;
}

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('analytics_consent') === 'granted';
  } catch {
    return false;
  }
}

export function trackEvent(name: EventName, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;
  if (!hasConsent()) return;

  // GA4 via gtag
  const w = window as any;
  if (typeof w?.gtag === 'function') {
    w.gtag('event', name, properties ?? {});
  }
}

export function grantConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('analytics_consent', 'granted');
  } catch {}
}

export function revokeConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('analytics_consent', 'denied');
  } catch {}
}
