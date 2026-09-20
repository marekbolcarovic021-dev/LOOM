import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";

function NotFound() {
  return (
    <div className="public-page">
      <PublicHeader />

      <main className="public-main">
        <section className="public-page-hero">
          <div className="public-hero">
            <span className="public-eyebrow">
              LOOM
            </span>

            <h1>Page not found</h1>

            <p>
              The page you are looking for doesn't exist or may have been
              moved to another location.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              <a
                href="/"
                className="public-button"
              >
                Back to LOOM
              </a>

              <a
                href="/guides"
                className="public-button public-button-secondary"
              >
                Explore Guides
              </a>
            </div>
          </div>
        </section>

        <section className="public-section">
          <div className="public-text-block">
            <h2 className="public-section-heading">
              Looking for something?
            </h2>

            <p>
              You can return to the LOOM homepage or explore our financial
              education guides.
            </p>

            <ul>
              <li>
                <a href="/">LOOM homepage</a>
              </li>
              <li>
                <a href="/guides">Financial Guides</a>
              </li>
              <li>
                <a href="/about">About LOOM</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

export default NotFound;