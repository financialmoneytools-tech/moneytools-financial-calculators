import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MoneyTools privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>Last updated: August 2026</p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">What Data We Collect</h2>
        <p>
          MoneyTools is designed to minimize data collection. All financial calculations are performed
          entirely in your web browser. No financial inputs, results, or personal data are transmitted
          to our servers.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Analytics</h2>
        <p>
          We may use anonymized analytics (such as Google Analytics) to understand how our tools are
          used and to improve them. Analytics events never include financial values. Analytics only
          load if you have given consent.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Cookies</h2>
        <p>
          We may use essential cookies to remember your preferences (such as currency selection).
          Analytics cookies are only set with your consent.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Third-Party Services</h2>
        <p>
          We may display advertisements through Google AdSense, which may use cookies to serve
          personalized ads based on your browsing history. You can opt out of personalized advertising
          at any time through your Google ad settings.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Your Rights</h2>
        <p>
          Under applicable data protection laws (including GDPR), you have the right to access,
          correct, or delete any personal data we may hold. Since we collect minimal data, this
          primarily applies to analytics and advertising data managed by third-party providers.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Contact</h2>
        <p>
          For privacy-related inquiries, please use our contact page.
        </p>
      </div>
    </div>
  );
}
