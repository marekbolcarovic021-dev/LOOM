import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="public-page">

      <PublicHeader />

      <main className="public-main">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="public-page-hero">

          <span className="public-eyebrow">
            LOOM
          </span>

          <h1>
            {t("contact", "Contact")}
          </h1>

          <p>
            {t(
              "contactDescription",
              "Have a question, found an issue or want to get in touch with LOOM?"
            )}
          </p>

        </section>


        {/* ==================================================
            CONTACT
        ================================================== */}

        <section
          className="public-section"
          aria-labelledby="contact-heading"
        >

          <div className="contact-card">

            <div
              className="contact-icon"
              aria-hidden="true"
            >
              @
            </div>

            <h2 id="contact-heading">
              {t("getInTouch", "Get in touch")}
            </h2>

            <p>
              {t(
                "contactEmailDescription",
                "For questions, feedback, technical issues, privacy requests or other enquiries, contact us by email."
              )}
            </p>

            <a
              href="mailto:contact@loom-finance.com"
              className="public-primary-button"
              aria-label="Email LOOM at contact@loom-finance.com"
            >
              contact@loom-finance.com
            </a>

          </div>

        </section>


        {/* ==================================================
            PRIVACY NOTICE
        ================================================== */}

        <section
          className="public-disclaimer"
          aria-labelledby="contact-privacy-heading"
        >

          <strong id="contact-privacy-heading">
            {t(
              "beforeContacting",
              "Before contacting us"
            )}
          </strong>

          <p>
            {t(
              "contactPrivacyNotice",
              "Please do not send passwords, authentication codes, payment-card numbers, bank login credentials or other highly sensitive information by email."
            )}
          </p>

          <p>
            {t(
              "contactPersonalDataNotice",
              "If your request concerns personal data or privacy rights, please include only the information necessary for us to identify and process your request."
            )}
          </p>

        </section>


        {/* ==================================================
            SUPPORT INFORMATION
        ================================================== */}

        <section
          className="public-section"
          aria-labelledby="contact-support-heading"
        >

          <div className="contact-card">

            <h2 id="contact-support-heading">
              {t(
                "contactSupport",
                "What can you contact us about?"
              )}
            </h2>

            <ul>
              <li>
                {t(
                  "contactSupportQuestions",
                  "General questions about LOOM"
                )}
              </li>

              <li>
                {t(
                  "contactSupportTechnical",
                  "Technical problems or bugs"
                )}
              </li>

              <li>
                {t(
                  "contactSupportAccount",
                  "Account or subscription issues"
                )}
              </li>

              <li>
                {t(
                  "contactSupportPrivacy",
                  "Privacy and personal-data requests"
                )}
              </li>

              <li>
                {t(
                  "contactSupportFeedback",
                  "Feedback and suggestions"
                )}
              </li>
            </ul>

          </div>

        </section>


        {/* ==================================================
            PRIVACY POLICY REFERENCE
        ================================================== */}

        <section className="public-disclaimer">

          <strong>
            {t(
              "privacyQuestions",
              "Privacy questions"
            )}
          </strong>

          <p>
            {t(
              "privacyQuestionsDescription",
              "For information about how LOOM processes personal data, please review our Privacy Policy."
            )}
          </p>

        </section>

      </main>

      <PublicFooter />

    </div>
  );
}

export default Contact;