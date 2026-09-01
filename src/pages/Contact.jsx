import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="public-page">

      <PublicHeader />

      <main className="public-main">

        <section className="public-page-hero">

          <span className="public-eyebrow">
            LOOM
          </span>

          <h1>
            {t("contact") || "Contact"}
          </h1>

          <p>
            {t("contactDescription") ||
              "Have a question, found an issue or want to get in touch with LOOM?"}
          </p>

        </section>


        <section className="public-section">

          <div className="contact-card">

            <div className="contact-icon">
              @
            </div>

            <h2>
              {t("getInTouch") ||
                "Get in touch"}
            </h2>

            <p>
              {t("contactEmailDescription") ||
                "For questions, feedback, technical issues or other enquiries, contact us by email."}
            </p>

            <a
              href="mailto:contact@loom-finance.com"
              className="public-primary-button"
            >
              contact@loom-finance.com
            </a>

          </div>

        </section>


        <section className="public-disclaimer">

          <strong>
            {t("beforeContacting") ||
              "Before contacting us"}
          </strong>

          <p>
            {t("contactPrivacyNotice") ||
              "Please do not send passwords, authentication codes, payment-card numbers or other highly sensitive information by email."}
          </p>

        </section>

      </main>

      <PublicFooter />

    </div>
  );
}

export default Contact;