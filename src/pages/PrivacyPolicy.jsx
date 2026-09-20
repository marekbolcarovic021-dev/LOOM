import { useTranslation } from "react-i18next";
import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="public-page">
      <PublicHeader />

      <main className="public-main">

        {/* HERO */}
        <section className="public-page-hero">
          <div className="public-hero">
            <span className="public-eyebrow">
              LOOM
            </span>

            <h1>
              {t("privacy.title", "Privacy Policy")}
            </h1>

            <p>
              {t(
                "privacy.intro",
                "This Privacy Policy explains how LOOM collects, uses, stores and protects personal information when you use our website, application and services."
              )}
            </p>

            <p className="legal-updated">
              {t(
                "privacy.updated",
                "Last updated: 20 September 2026"
              )}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div className="public-section">

          {/* 1 */}
          <section>
            <h2 className="public-section-heading">
              1. Introduction
            </h2>

            <div className="public-text-block">
              <p>
                LOOM ("LOOM", "we", "us" or "our") respects your privacy
                and is committed to protecting your personal information.
                This Privacy Policy explains what information we collect,
                why we collect it, how we use it, when it may be shared,
                and the choices and rights available to you.
              </p>

              <p>
                This Privacy Policy applies to the LOOM website, web
                application, financial management tools, financial education
                content, AI-powered features, subscription services and
                related services.
              </p>

              <p>
                By using LOOM, you acknowledge that you have read this
                Privacy Policy. Where applicable law requires your consent,
                we will request consent separately.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="public-section-heading">
              2. Data Controller
            </h2>

            <div className="public-text-block">
              <p>
                LOOM is responsible for the processing of personal data
                described in this Privacy Policy.
              </p>

              <p>
                For privacy-related questions, requests or concerns, you
                can contact us at:
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:loomapp.support@gmail.com">
                  loomapp.support@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="public-section-heading">
              3. Personal Data We Collect
            </h2>

            <div className="public-text-block">
              <p>
                Depending on how you use LOOM, we may collect or process
                the following categories of information:
              </p>

              <ul>
                <li>
                  account and authentication information;
                </li>
                <li>
                  email address and profile information;
                </li>
                <li>
                  financial information that you voluntarily enter into LOOM;
                </li>
                <li>
                  income, expenses, transactions, budgets, goals and balances;
                </li>
                <li>
                  information contained in receipts or documents submitted
                  to LOOM features;
                </li>
                <li>
                  information generated through your use of LOOM's AI tools;
                </li>
                <li>
                  subscription and purchase information;
                </li>
                <li>
                  technical information such as IP address, browser type,
                  device information and operating system;
                </li>
                <li>
                  information about how you interact with our website and
                  application;
                </li>
                <li>
                  cookie, local storage and similar technology information;
                </li>
                <li>
                  information required to prevent fraud, abuse and invalid
                  activity.
                </li>
              </ul>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="public-section-heading">
              4. Financial Information
            </h2>

            <div className="public-text-block">
              <p>
                LOOM is designed to help users manage their personal
                finances. You may voluntarily provide information such as
                income, expenses, transactions, budgets, savings goals,
                investments, debts and account balances.
              </p>

              <p>
                This information is processed to provide the financial
                management and advisory-related functionality requested
                by you.
              </p>

              <p>
                LOOM does not require you to connect a bank account in
                order to use the basic financial management functionality,
                unless a particular feature explicitly requires such
                connection.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="public-section-heading">
              5. Account and Authentication Information
            </h2>

            <div className="public-text-block">
              <p>
                When you create or use a LOOM account, we may process
                information necessary to authenticate your account and
                maintain your profile.
              </p>

              <p>
                This may include your email address, authentication
                identifiers, account preferences, selected language,
                currency and country.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="public-section-heading">
              6. How We Use Personal Data
            </h2>

            <div className="public-text-block">
              <p>
                We may use personal information to:
              </p>

              <ul>
                <li>create and maintain your LOOM account;</li>
                <li>provide financial management functionality;</li>
                <li>store and display your transactions and financial data;</li>
                <li>provide budgeting and financial goal functionality;</li>
                <li>provide LOOM Academy and educational content;</li>
                <li>provide AI-powered features requested by you;</li>
                <li>process subscriptions and purchases;</li>
                <li>provide customer support;</li>
                <li>maintain and improve LOOM;</li>
                <li>detect fraud, abuse and security incidents;</li>
                <li>comply with applicable legal obligations;</li>
                <li>serve and measure advertising where applicable.</li>
              </ul>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="public-section-heading">
              7. Legal Bases for Processing
            </h2>

            <div className="public-text-block">
              <p>
                Where the General Data Protection Regulation (GDPR)
                applies, we process personal data on one or more lawful
                bases depending on the particular processing activity.
              </p>

              <ul>
                <li>
                  <strong>Contract:</strong> where processing is necessary
                  to provide the LOOM service you requested.
                </li>
                <li>
                  <strong>Consent:</strong> where you have provided consent,
                  including where consent is required for certain cookies,
                  advertising or marketing activities.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> where processing
                  is necessary for security, fraud prevention, service
                  improvement or other legitimate business purposes and
                  those interests are not overridden by your rights.
                </li>
                <li>
                  <strong>Legal obligation:</strong> where processing is
                  necessary to comply with applicable law.
                </li>
              </ul>
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="public-section-heading">
              8. Information You Choose to Provide
            </h2>

            <div className="public-text-block">
              <p>
                You control much of the information you provide to LOOM.
                You should not submit information that you do not want
                LOOM to process.
              </p>

              <p>
                Some information is necessary to create an account,
                provide particular services or process purchases. If you
                do not provide required information, some features may
                not be available.
              </p>
            </div>
          </section>

          {/* 9 */}
          <section>
            <h2 className="public-section-heading">
              9. AI Features
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may provide AI-powered features, including financial
                assistance, transaction interpretation, receipt processing
                and other automated features.
              </p>

              <p>
                Information submitted to an AI feature may be processed
                by the technology providers that operate that feature.
                Such providers may process information according to their
                own privacy terms and contractual arrangements with LOOM.
              </p>

              <p>
                AI-generated information is provided for informational and
                educational purposes and should not be treated as a
                guarantee of financial results or as individualized
                professional financial, tax or legal advice.
              </p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="public-section-heading">
              10. Automated Processing and Profiling
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may use automated processing to categorize transactions,
                analyze information submitted by you, generate suggestions
                and provide personalized functionality within the service.
              </p>

              <p>
                These features are intended to assist users and may contain
                errors. You remain responsible for decisions made using
                information provided by LOOM.
              </p>
            </div>
          </section>

          {/* 11 */}
          <section>
            <h2 className="public-section-heading">
              11. Payments, Subscriptions and Purchases
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may offer paid subscriptions and purchases such as
                premium features or digital tokens.
              </p>

              <p>
                Payment transactions may be processed by third-party
                payment service providers. LOOM does not need to store
                your complete payment card number in order to provide
                these services.
              </p>

              <p>
                Payment providers may process information such as payment
                details, billing information, transaction identifiers and
                purchase status in accordance with their own privacy
                policies.
              </p>
            </div>
          </section>

          {/* 12 */}
          <section>
            <h2 className="public-section-heading">
              12. Cookies and Similar Technologies
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may use cookies, local storage, session storage,
                pixels, web beacons, scripts and similar technologies.
              </p>

              <p>
                These technologies may be used for purposes including:
              </p>

              <ul>
                <li>authentication and account functionality;</li>
                <li>security and fraud prevention;</li>
                <li>remembering preferences;</li>
                <li>analytics and service improvement;</li>
                <li>advertising and advertising measurement;</li>
                <li>personalization where permitted and consented to.</li>
              </ul>

              <p>
                Some technologies are necessary for the operation of LOOM,
                while others may require your consent depending on the
                applicable law and the purpose for which they are used.
              </p>
            </div>
          </section>

          {/* 13 - ADSENSE */}
          <section>
            <h2 className="public-section-heading">
              13. Advertising and Google AdSense
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may use Google AdSense and other advertising services
                to display advertisements on the website.
              </p>

              <p>
                Google and its advertising partners may use cookies, web
                beacons, IP addresses, device information, advertising
                identifiers and similar technologies in connection with
                the delivery, measurement and personalization of
                advertisements.
              </p>

              <p>
                Third-party vendors, including Google and advertising
                partners, may place and read cookies on users' browsers
                or use web beacons, IP addresses or similar technologies
                to collect information as a result of advertising being
                served on LOOM.
              </p>

              <p>
                Advertising technologies may be used to measure
                advertisements, limit repeated advertisements, detect
                invalid traffic and, where permitted and consented to,
                personalize advertisements.
              </p>

              <p>
                LOOM does not intentionally use the private financial
                information that you enter into the financial management
                features, such as your income, expenses, transaction
                history, debts, balances or financial goals, to create
                advertising audiences or directly select personalized
                advertisements.
              </p>

              <p>
                However, advertising and analytics providers may process
                technical, device, browser, cookie and interaction
                information according to their own policies and the
                configuration of the advertising services used by LOOM.
              </p>

              <p>
                More information about how Google uses data when you use
                partner websites and applications is available here:
              </p>

              <p>
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How Google uses information from sites or apps that use
                  our services
                </a>
              </p>
            </div>
          </section>

          {/* 14 */}
          <section>
            <h2 className="public-section-heading">
              14. Consent Management and European Users
            </h2>

            <div className="public-text-block">
              <p>
                For users in the European Economic Area (EEA), the United
                Kingdom and Switzerland, LOOM may be required to obtain
                consent before certain cookies, local storage technologies
                or advertising-related processing takes place.
              </p>

              <p>
                Where required, users will be provided with information
                about the relevant purposes and advertising technology
                providers and will be given appropriate choices regarding
                consent.
              </p>

              <p>
                Where advertising services require a consent management
                platform, LOOM may use Google's Privacy & Messaging
                solution or another consent management platform that
                satisfies the applicable requirements.
              </p>

              <p>
                Users may change or withdraw consent where the applicable
                consent mechanism provides such functionality.
              </p>
            </div>
          </section>

          {/* 15 */}
          <section>
            <h2 className="public-section-heading">
              15. Service Providers and Data Recipients
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may use third-party service providers to operate and
                maintain the service. Depending on the features you use,
                these providers may include services for:
              </p>

              <ul>
                <li>authentication;</li>
                <li>database and cloud infrastructure;</li>
                <li>AI processing;</li>
                <li>payment processing;</li>
                <li>hosting and deployment;</li>
                <li>analytics;</li>
                <li>security and fraud prevention;</li>
                <li>advertising.</li>
              </ul>

              <p>
                These providers may process information on LOOM's behalf
                or independently where they act as separate controllers.
                We seek to use appropriate contractual and technical
                safeguards where required by applicable law.
              </p>
            </div>
          </section>

          {/* 16 */}
          <section>
            <h2 className="public-section-heading">
              16. Advertising Data and Financial Information
            </h2>

            <div className="public-text-block">
              <p>
                LOOM is designed to separate financial management data
                from advertising personalization.
              </p>

              <p>
                Financial information entered into LOOM's financial
                management functionality is not intentionally provided to
                advertising partners for the purpose of creating
                advertising audiences.
              </p>

              <p>
                Advertising providers may nevertheless process technical
                and interaction information associated with visits to the
                website as described in this Privacy Policy and their own
                privacy documentation.
              </p>
            </div>
          </section>

          {/* 17 */}
          <section>
            <h2 className="public-section-heading">
              17. International Data Transfers
            </h2>

            <div className="public-text-block">
              <p>
                Some LOOM service providers may process information in
                countries outside the country in which you live.
              </p>

              <p>
                Where personal data is transferred outside the European
                Economic Area or another jurisdiction with transfer
                restrictions, appropriate safeguards will be used where
                required by applicable data protection law.
              </p>
            </div>
          </section>

          {/* 18 */}
          <section>
            <h2 className="public-section-heading">
              18. Data Security
            </h2>

            <div className="public-text-block">
              <p>
                LOOM uses reasonable technical and organizational measures
                designed to protect personal information against
                unauthorized access, alteration, disclosure or destruction.
              </p>

              <p>
                However, no internet transmission, electronic storage system
                or online service can be guaranteed to be completely
                secure.
              </p>
            </div>
          </section>

          {/* 19 */}
          <section>
            <h2 className="public-section-heading">
              19. Data Retention
            </h2>

            <div className="public-text-block">
              <p>
                Personal information is retained for as long as reasonably
                necessary to provide the service, maintain legitimate
                business records, comply with legal obligations, resolve
                disputes, enforce agreements and prevent fraud or abuse.
              </p>

              <p>
                Retention periods may differ depending on the type of
                information and the reason it was collected.
              </p>
            </div>
          </section>

          {/* 20 */}
          <section>
            <h2 className="public-section-heading">
              20. Account Deletion
            </h2>

            <div className="public-text-block">
              <p>
                You may request deletion of your LOOM account and associated
                personal information, subject to information that we may
                be required or permitted to retain under applicable law.
              </p>

              <p>
                Deleting an account may result in the permanent loss of
                financial records, goals, transactions and other information
                associated with that account.
              </p>
            </div>
          </section>

          {/* 21 */}
          <section>
            <h2 className="public-section-heading">
              21. Your Data Protection Rights
            </h2>

            <div className="public-text-block">
              <p>
                Where applicable under GDPR or other data protection laws,
                you may have rights including:
              </p>

              <ul>
                <li>the right to access your personal data;</li>
                <li>the right to correct inaccurate information;</li>
                <li>the right to request deletion;</li>
                <li>the right to restrict certain processing;</li>
                <li>the right to object to certain processing;</li>
                <li>the right to data portability;</li>
                <li>
                  the right to withdraw consent where processing is based
                  on consent.
                </li>
              </ul>

              <p>
                These rights are subject to the conditions and limitations
                established by applicable law.
              </p>
            </div>
          </section>

          {/* 22 */}
          <section>
            <h2 className="public-section-heading">
              22. How to Exercise Your Rights
            </h2>

            <div className="public-text-block">
              <p>
                To submit a privacy or data protection request, contact us
                at:
              </p>

              <p>
                <a href="mailto:loomapp.support@gmail.com">
                  loomapp.support@gmail.com
                </a>
              </p>

              <p>
                Please provide sufficient information for us to understand
                your request and verify your identity where reasonably
                necessary.
              </p>
            </div>
          </section>

          {/* 23 */}
          <section>
            <h2 className="public-section-heading">
              23. Right to Lodge a Complaint
            </h2>

            <div className="public-text-block">
              <p>
                If you believe that your personal data has been processed
                in a way that violates applicable data protection law,
                you may have the right to lodge a complaint with the
                competent data protection supervisory authority.
              </p>
            </div>
          </section>

          {/* 24 */}
          <section>
            <h2 className="public-section-heading">
              24. Children's Privacy
            </h2>

            <div className="public-text-block">
              <p>
                LOOM is not intended for children who are below the minimum
                age required to use online services under applicable law.
              </p>

              <p>
                We do not knowingly collect personal information from
                children in violation of applicable legal requirements.
              </p>
            </div>
          </section>

          {/* 25 */}
          <section>
            <h2 className="public-section-heading">
              25. Data Breaches and Security Incidents
            </h2>

            <div className="public-text-block">
              <p>
                If LOOM becomes aware of a personal data breach, we will
                assess the incident and take the actions required by
                applicable law, including notification to authorities or
                affected individuals where legally required.
              </p>
            </div>
          </section>

          {/* 26 */}
          <section>
            <h2 className="public-section-heading">
              26. Third-Party Websites and Services
            </h2>

            <div className="public-text-block">
              <p>
                LOOM may contain links to third-party websites or services.
                Third-party services operate independently and may have
                their own privacy policies and terms.
              </p>

              <p>
                We recommend reviewing the privacy policies of third-party
                services before providing them with personal information.
              </p>
            </div>
          </section>

          {/* 27 */}
          <section>
            <h2 className="public-section-heading">
              27. Marketing Communications
            </h2>

            <div className="public-text-block">
              <p>
                Where permitted by law, LOOM may send service-related
                communications necessary to operate your account.
              </p>

              <p>
                Marketing communications will be sent where permitted by
                applicable law and, where required, based on your consent.
              </p>
            </div>
          </section>

          {/* 28 */}
          <section>
            <h2 className="public-section-heading">
              28. No Sale of Financial Information
            </h2>

            <div className="public-text-block">
              <p>
                LOOM does not sell your personal financial information,
                such as your income, expenses, transaction history,
                financial goals, debts or balances, to advertising
                companies.
              </p>

              <p>
                This does not prevent the use of service providers that
                process information on our behalf where necessary to
                provide LOOM's services.
              </p>
            </div>
          </section>

          {/* 29 */}
          <section>
            <h2 className="public-section-heading">
              29. Changes to This Privacy Policy
            </h2>

            <div className="public-text-block">
              <p>
                We may update this Privacy Policy from time to time to
                reflect changes to LOOM, applicable law, technology or
                third-party services.
              </p>

              <p>
                The updated version will be published on this page with
                a revised "Last updated" date.
              </p>
            </div>
          </section>

          {/* 30 */}
          <section>
            <h2 className="public-section-heading">
              30. Contact
            </h2>

            <div className="public-text-block">
              <p>
                If you have questions about this Privacy Policy, your
                personal data or privacy at LOOM, contact:
              </p>

              <p>
                <strong>LOOM Support</strong>
              </p>

              <p>
                <a href="mailto:loomapp.support@gmail.com">
                  loomapp.support@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* DISCLAIMER */}
          <div className="public-disclaimer">
            <strong>Important notice</strong>

            <p>
              LOOM provides financial management tools, educational
              information and automated assistance for informational
              purposes. LOOM does not guarantee investment returns and
              does not replace qualified financial, tax or legal advice.
            </p>

            <p>
              You are responsible for reviewing information provided by
              LOOM and for decisions you make based on that information.
            </p>
          </div>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default PrivacyPolicy;