import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MoneyTools privacy policy — how we handle data based on the current implementation.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Privacy Policy</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. Introduction</h2>
          <p>
            This Privacy Policy explains how MoneyTools currently handles information on this website.
            It is written to reflect the current codebase implementation as accurately as possible.
          </p>
          <p>
            Where a service or feature is not currently active, this policy states that clearly and also
            explains what would change if that service is enabled in the future.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Information We Collect</h2>
          <p>
            <strong>Currently:</strong> MoneyTools is designed to minimize data collection. The repository
            does not show user account creation, login, contact form submission handling, or backend
            storage for calculator input values.
          </p>
          <p>
            <strong>If features are enabled in the future:</strong> If user accounts, forms, analytics, or
            advertising tools are added, the categories of collected information may expand. This page
            will be updated before or when those changes are made live.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Calculator Inputs and Financial Information</h2>
          <p>
            <strong>Currently:</strong> Calculator inputs are used to perform the calculation you request in
            the application interface. Based on the current repository implementation, calculator financial
            inputs are not sent to a dedicated backend storage system and are not saved as user financial
            profiles.
          </p>
          <p>
            <strong>If this changes in the future:</strong> If any calculator workflow begins submitting or
            storing inputs on a backend service, this policy will be updated to describe what is collected,
            why, and for how long.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Automatically Collected Technical Information</h2>
          <p>
            <strong>Currently:</strong> As with standard web operations, technical information (such as IP
            address, browser user-agent, request timestamps, and request metadata) may be processed by
            hosting/infrastructure layers and by third-party services needed to deliver requested content.
          </p>
          <p>
            <strong>If monitoring tools are enabled in the future:</strong> Additional technical telemetry
            may be collected by those tools, and this section will be updated accordingly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Third-Party Services and Data Sources</h2>
          <p>
            <strong>Currently:</strong> The homepage Live Financial Snapshot retrieves data from the
            following third-party sources:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <code>open.er-api.com</code> for USD-based foreign exchange rates
            </li>
            <li>
              <code>query1.finance.yahoo.com</code> for US market index quotes
            </li>
            <li>
              <code>api.open-meteo.com</code> for Istanbul weather data
            </li>
          </ul>
          <p>
            These services may receive technical request information as part of normal web and API
            traffic needed to provide this data.
          </p>
          <p>
            <strong>If providers or data sources change in the future:</strong> This list will be revised to
            match the active implementation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. External Scripts</h2>
          <p>
            <strong>Currently:</strong> The site loads the following external script:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <code>https://apps.abacus.ai/chatllm/appllm-lib.js</code>
            </li>
          </ul>
          <p>
            External script providers may process technical request data necessary to deliver script
            assets.
          </p>
          <p>
            <strong>If additional scripts are added in the future:</strong> They will be documented in this
            policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Cookies and Local Storage</h2>
          <p>
            <strong>Currently:</strong> The application does not implement an active cookie consent flow or
            an active analytics cookie system in the audited code paths.
          </p>
          <p>
            The repository includes a dormant analytics helper that references browser localStorage for an
            analytics consent flag, but this helper is not currently wired into active analytics collection.
          </p>
          <p>
            <strong>If cookie- or localStorage-based tracking features are enabled in the future:</strong>{' '}
            this section will be updated with the active behavior.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Analytics</h2>
          <p>
            <strong>Currently:</strong> Google Analytics, Google Tag Manager, Meta Pixel, Hotjar, and
            Segment are not active in the current implementation.
          </p>
          <p>
            <strong>If analytics is enabled in the future:</strong> This policy will identify the active
            provider(s), what is measured, and any user controls made available.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">9. Advertising</h2>
          <p>
            <strong>Currently:</strong> Google AdSense and personalized advertising are not active.
          </p>
          <p>
            The repository contains an AdSlot component, but advertising display depends on configuration
            and is not currently active.
          </p>
          <p>
            <strong>If advertising is enabled in the future:</strong> This section will be updated to explain
            the ad provider, whether personalization is used, and any applicable user choices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">10. How Information Is Used</h2>
          <p>
            <strong>Currently:</strong> Information and technical requests are used to:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Deliver calculator functionality requested by users</li>
            <li>Display live currency, market, and weather information on the homepage</li>
            <li>Operate, maintain, and secure website delivery</li>
          </ul>
          <p>
            <strong>If additional systems are enabled in the future:</strong> This section will be expanded to
            describe those specific uses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">11. Data Sharing</h2>
          <p>
            <strong>Currently:</strong> The site relies on third-party providers for specific data feeds and
            external script delivery as listed above. Those providers may process technical request data
            necessary to serve their APIs or scripts.
          </p>
          <p>
            Beyond those implementation dependencies, this policy does not describe active sale of user
            personal data by the application.
          </p>
          <p>
            <strong>If integrations expand in the future:</strong> this section will be updated to reflect
            active sharing pathways.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">12. Data Retention</h2>
          <p>
            <strong>Currently:</strong> The repository does not show a backend process storing user
            calculator inputs as persistent user records.
          </p>
          <p>
            Third-party services listed in this policy may retain request logs under their own policies.
            Please review their privacy terms for details.
          </p>
          <p>
            <strong>If persistent storage is introduced in the future:</strong> retention terms will be added
            here.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">13. User Rights</h2>
          <p>
            Depending on applicable law, you may have rights regarding personal information (for example,
            access, correction, deletion, or objection).
          </p>
          <p>
            <strong>Currently:</strong> because active user-account and form-data collection is limited in the
            current implementation, rights requests may be limited to data processed by relevant
            infrastructure or third-party providers.
          </p>
          <p>
            <strong>If data collection expands in the future:</strong> this section will be updated with
            request handling details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">14. Third-Party Websites and Services</h2>
          <p>
            MoneyTools may rely on or reference third-party services. Their privacy practices are governed
            by their own policies and terms, not this Privacy Policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">15. Children&apos;s Privacy</h2>
          <p>
            MoneyTools is a general-audience financial calculator website and is not designed to
            intentionally collect personal information from children.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">16. Changes to This Privacy Policy</h2>
          <p>
            This policy may be updated when website functionality or third-party integrations change.
            Material implementation changes should be reflected here so this document remains accurate.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">17. Contact</h2>
          <p>
            For privacy-related questions, please use the Contact page. The current Contact page provides
            an email address for inquiries.
          </p>
        </section>
      </div>
    </div>
  );
}
