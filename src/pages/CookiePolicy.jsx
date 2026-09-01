import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";

function CookiePolicy() {
  return (
    <div className="public-page">

      <PublicHeader />

      <main className="legal-public-page">

        <div className="legal-public-container">

          <span className="public-eyebrow">
            LOOM
          </span>

          <h1>
            Cookie Policy
          </h1>

          <p className="legal-updated">
            Last updated: 30 August 2026
          </p>


          <section>

            <h2>
              1. What Are Cookies?
            </h2>

            <p>
              Cookies are small files or similar
              technologies that may be stored on
              a device when visiting a website.
            </p>

          </section>


          <section>

            <h2>
              2. How LOOM Uses Cookies
            </h2>

            <p>
              LOOM may use cookies or similar
              technologies where necessary to
              operate the website, maintain
              sessions, remember preferences,
              improve functionality or provide
              analytics.
            </p>

          </section>


          <section>

            <h2>
              3. Essential Technologies
            </h2>

            <p>
              Some technologies may be necessary
              for authentication, security and
              core functionality. These cannot
              necessarily be disabled without
              affecting the operation of the
              Service.
            </p>

          </section>


          <section>

            <h2>
              4. Analytics and Advertising
            </h2>

            <p>
              Where LOOM uses analytics,
              advertising or similar technologies
              that require consent, LOOM will
              request consent where required by
              applicable law.
            </p>

          </section>


          <section>

            <h2>
              5. Managing Cookies
            </h2>

            <p>
              Depending on your browser and the
              consent tools provided by LOOM, you
              may be able to control or withdraw
              certain cookie permissions.
            </p>

          </section>


          <section>

            <h2>
              6. Changes to This Policy
            </h2>

            <p>
              This Cookie Policy may be updated
              when our use of cookies or similar
              technologies changes.
            </p>

          </section>


          <section>

            <h2>
              7. Contact
            </h2>

            <p>
              Questions about cookies or privacy
              can be sent to:
            </p>

            <p>
              <strong>
                contact@loom-finance.com
              </strong>
            </p>

          </section>

        </div>

      </main>

      <PublicFooter />

    </div>
  );
}

export default CookiePolicy;