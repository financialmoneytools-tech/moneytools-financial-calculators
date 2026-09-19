import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How MoneyAtlas handles your information, including cookies, Google AdSense advertising, and your privacy rights under GDPR, KVKK, and CCPA/CPRA.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Privacy Policy</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: September 19, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. Introduction</h2>
          <p>
            MoneyAtlas is operated by <strong>AVC TRADE LLC</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            or &ldquo;our&rdquo;), which provides free financial calculators at{' '}
            <strong>www.moneyatlas.net</strong>. This Privacy Policy explains what information we and our
            partners collect when you visit the website, how that information is used, and the choices and
            rights available to you.
          </p>
          <p>
            By using MoneyAtlas, you agree to the practices described in this policy. If you do not agree,
            please discontinue use of the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Information We Collect</h2>
          <p>
            MoneyAtlas does not offer user accounts, and we do not ask you to register, sign in, or submit
            personal details in order to use our calculators. We collect the following categories of
            information:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Technical and usage information.</strong> When you request a page, our hosting
              provider and content delivery network process standard technical data such as your IP
              address, browser type and version, device and operating system, referring page, requested
              URL, and the date and time of the request. This data is used to deliver the website, keep it
              secure, and diagnose faults.
            </li>
            <li>
              <strong>Information collected by advertising partners.</strong> Google and its advertising
              partners collect information through cookies and similar technologies in order to serve and
              measure ads. See section 5 for details.
            </li>
            <li>
              <strong>Information you send us voluntarily.</strong> If you email us using the address on
              our{' '}
              <Link href="/contact" className="font-medium text-[#3182ce] underline underline-offset-2">
                Contact
              </Link>{' '}
              page, we receive your email address and whatever you choose to include in your message.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Calculator Inputs</h2>
          <p>
            The numbers you enter into our calculators &mdash; loan amounts, interest rates, salaries,
            savings targets, business figures, and similar values &mdash; are processed in your browser to
            produce the result shown on screen.
          </p>
          <p>
            We do not transmit these values to a MoneyAtlas server, we do not store them in a database, and
            we do not build financial profiles about you from them. Closing or reloading the page discards
            them.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Cookies and Similar Technologies</h2>
          <p>
            Cookies are small files placed on your device by a website or by a third party whose content is
            embedded in that website. MoneyAtlas itself does not set tracking cookies and does not require
            cookies for the calculators to work.
          </p>
          <p>
            However, <strong>Google and its advertising partners do set cookies</strong> on this site in
            connection with the advertising described in section 5. These may include cookies used to
            select ads, limit how often you see the same ad, remember ad interactions, and detect invalid
            traffic or fraud.
          </p>
          <p>
            Most browsers let you view, block, or delete cookies through their settings. Blocking
            advertising cookies does not prevent you from using our calculators, though you may see ads
            that are less relevant to you.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Advertising and Google AdSense</h2>
          <p>
            MoneyAtlas is supported by advertising. We use <strong>Google AdSense</strong>, a third-party
            advertising service operated by Google, to display ads on this website. In connection with this:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on your prior visits to
              MoneyAtlas or to other websites.
            </li>
            <li>
              Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you
              based on your visit to this site and/or other sites on the Internet.
            </li>
            <li>
              Google may use a cookie or similar identifier (historically referred to as the DoubleClick
              cookie) and the Google Advertising ID to enable ad selection, frequency capping, conversion
              tracking, and ad performance measurement.
            </li>
            <li>
              Other third-party advertising vendors or ad networks participating in Google&rsquo;s
              programmatic ecosystem may also serve ads or measure their performance on this site, using
              their own cookies and technologies under their own privacy policies.
            </li>
            <li>
              Advertising partners may process technical data such as your IP address, device and browser
              information, approximate location derived from your IP address, and your interactions with
              ads.
            </li>
          </ul>
          <p>
            <strong>Personalized versus non-personalized ads.</strong> Ads on MoneyAtlas may be
            personalized, meaning they are selected using information about your inferred interests or
            prior browsing, or non-personalized, meaning they are based only on general context such as the
            page content and your approximate location. In regions where consent is legally required before
            personalized advertising, Google presents a consent message and serves personalized ads only
            where a valid legal basis exists. You can change your preference at any time using the controls
            below.
          </p>
          <p>
            You may opt out of personalized advertising by Google by visiting{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3182ce] underline underline-offset-2"
            >
              Google Ads Settings
            </a>
            . You can opt out of personalized advertising from many other participating vendors at{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3182ce] underline underline-offset-2"
            >
              aboutads.info/choices
            </a>{' '}
            or{' '}
            <a
              href="https://www.youronlinechoices.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3182ce] underline underline-offset-2"
            >
              youronlinechoices.eu
            </a>
            .
          </p>
          <p>
            For details on how Google collects and uses data when you use its partners&rsquo; sites, see{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3182ce] underline underline-offset-2"
            >
              How Google uses information from sites or apps that use our services
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Third-Party Services We Rely On</h2>
          <p>Beyond advertising, MoneyAtlas depends on the following third parties:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Hosting and delivery.</strong> Our hosting provider processes request data as
              described in section 2 in order to serve pages and protect the service.
            </li>
            <li>
              <strong>Google Fonts.</strong> Web fonts are bundled and served from our own domain, so your
              browser does not make requests to Google&rsquo;s font servers when loading our pages.
            </li>
            <li>
              <strong>Frankfurter (frankfurter.dev).</strong> Reference exchange rates published by the
              European Central Bank are fetched by our servers, not by your browser, and cached and shared
              across all visitors. This provider therefore does not receive your IP address or any other
              information about you.
            </li>
          </ul>
          <p>
            We do not currently operate Google Analytics, Google Tag Manager, Meta Pixel, Hotjar, or
            similar analytics products on this website. If we introduce one, we will update this policy
            before doing so.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. How We Use Information</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>To deliver the calculators, pages, and reference data you request</li>
            <li>To operate, maintain, secure, and troubleshoot the website</li>
            <li>To display advertising that funds the free availability of this website</li>
            <li>To detect and prevent fraud, abuse, and invalid ad traffic</li>
            <li>To respond to messages you send us by email</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>
            We do not sell or rent your personal information, and we do not share it with third parties for
            their own independent marketing purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Legal Bases for Processing (EEA and UK)</h2>
          <p>
            If you are in the European Economic Area or the United Kingdom, we process personal data on the
            following legal bases under the GDPR and UK GDPR:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Legitimate interests</strong> &mdash; for operating, securing, and maintaining the
              website, and for showing non-personalized advertising.
            </li>
            <li>
              <strong>Consent</strong> &mdash; for personalized advertising and for any non-essential
              cookies and similar technologies. You may withdraw your consent at any time, and withdrawal
              does not affect processing that took place before withdrawal.
            </li>
            <li>
              <strong>Legal obligation</strong> &mdash; where we must retain or disclose information to
              comply with the law.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">9. Your Rights in the EEA and UK (GDPR)</h2>
          <p>Subject to the conditions and exceptions in the GDPR and UK GDPR, you have the right to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request erasure of your personal data</li>
            <li>Request restriction of processing</li>
            <li>Object to processing carried out on the basis of legitimate interests</li>
            <li>Request portability of data you have provided to us</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
            <li>
              Lodge a complaint with your national data protection authority, or with the Information
              Commissioner&rsquo;s Office in the United Kingdom
            </li>
          </ul>
          <p>
            Because we do not operate accounts and do not store your calculator inputs, we usually hold
            very little information that can identify you. Where data is held by a third party such as
            Google, you may need to exercise your rights directly with that provider under its own privacy
            policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">
            10. Your Rights in Türkiye (KVKK / Law No. 6698)
          </h2>
          <p>
            If you are in Türkiye, the Personal Data Protection Law No. 6698 (&ldquo;KVKK&rdquo;) applies.
            Under Article 11 of the KVKK you have the right to:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Learn whether your personal data is being processed</li>
            <li>Request information about processing if your data has been processed</li>
            <li>
              Learn the purpose of processing and whether the data is used in accordance with that purpose
            </li>
            <li>
              Know the third parties to whom your personal data is transferred, in Türkiye or abroad
            </li>
            <li>Request correction of incomplete or inaccurate personal data</li>
            <li>
              Request deletion or destruction of your personal data where the reasons for processing no
              longer exist
            </li>
            <li>
              Request that corrections, deletions, or destructions be notified to third parties to whom the
              data was transferred
            </li>
            <li>
              Object to a result produced solely through automated analysis that works to your detriment
            </li>
            <li>Claim compensation for damage arising from unlawful processing of your personal data</li>
          </ul>
          <p>
            You may exercise these rights by contacting us at the email address on our{' '}
            <Link href="/contact" className="font-medium text-[#3182ce] underline underline-offset-2">
              Contact
            </Link>{' '}
            page. You also have the right to complain to the Turkish Personal Data Protection Authority
            (KVKK Kurumu).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">
            11. Your Rights in California (CCPA / CPRA)
          </h2>
          <p>
            If you are a California resident, the California Consumer Privacy Act as amended by the
            California Privacy Rights Act gives you the right to:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Know what categories of personal information are collected, the purposes for collection, and
              the categories of third parties with whom it is shared
            </li>
            <li>Request access to the specific pieces of personal information collected about you</li>
            <li>Request deletion of personal information collected from you</li>
            <li>Request correction of inaccurate personal information</li>
            <li>
              Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information for
              cross-context behavioral advertising
            </li>
            <li>Limit the use and disclosure of sensitive personal information</li>
            <li>Not be discriminated against for exercising any of these rights</li>
          </ul>
          <p>
            We do not sell personal information for money. However, the use of advertising cookies for
            personalized advertising may be treated as &ldquo;sharing&rdquo; for cross-context behavioral
            advertising under the CPRA. You can opt out by disabling personalized ads in{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3182ce] underline underline-offset-2"
            >
              Google Ads Settings
            </a>
            , by using the opt-out tools listed in section 5, by sending a Global Privacy Control signal
            from your browser, which our advertising partner treats as an opt-out request in California, or
            by contacting us. We do not knowingly collect or process sensitive personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">12. International Data Transfers</h2>
          <p>
            MoneyAtlas is delivered through globally distributed infrastructure, and our advertising
            partner Google operates internationally. As a result, information described in this policy may
            be processed on servers located outside your country of residence, including in the United
            States, where data protection laws may differ from those in your jurisdiction.
          </p>
          <p>
            Where personal data of EEA, UK, or Turkish users is transferred abroad, our providers rely on
            legally recognized transfer mechanisms such as the European Commission&rsquo;s Standard
            Contractual Clauses, adequacy decisions, or equivalent safeguards required by applicable law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">13. Data Retention</h2>
          <p>
            We do not maintain a user database and do not retain your calculator inputs. Server and
            security logs generated by our hosting provider are retained for a limited period under that
            provider&rsquo;s standard practices and then deleted or aggregated. Email correspondence is
            kept only as long as needed to handle your request. Advertising partners retain data according
            to their own published retention policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">14. Security</h2>
          <p>
            The website is served over encrypted HTTPS connections, and we apply reasonable technical and
            organizational measures to protect the limited information we handle. No method of transmission
            or storage over the Internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">15. Children&rsquo;s Privacy</h2>
          <p>
            MoneyAtlas is a general-audience website intended for adults and is not directed to children
            under the age of 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly
            collect personal information from children. If you believe a child has provided us with
            personal information, please contact us and we will delete it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">16. Third-Party Websites</h2>
          <p>
            Our pages may contain advertisements or links that lead to websites we do not operate. We are
            not responsible for the content or privacy practices of those websites. We encourage you to
            read the privacy policy of every website you visit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">17. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in our practices, the services we use, or
            applicable law. The &ldquo;Last updated&rdquo; date at the top of this page shows when the most
            recent revision took effect. Please review this page periodically.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">18. Contact Us</h2>
          <p>
            This website is operated by AVC TRADE LLC, which is responsible for the personal data
            described in this policy:
          </p>
          <p>
            <strong>AVC TRADE LLC</strong>
            <br />
            30 N Gould St, Ste 82801, Sheridan, WY
            <br />
            contact@moneyatlas.net
          </p>
          <p>
            For questions about this Privacy Policy, or to exercise any of the rights described above,
            you can email us at the address above or use our{' '}
            <Link href="/contact" className="font-medium text-[#3182ce] underline underline-offset-2">
              Contact
            </Link>{' '}
            page. We aim to respond to privacy requests within the time limits set by applicable law.
          </p>
        </section>
      </div>
    </div>
  );
}
