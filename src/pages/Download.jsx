import { useEffect } from "react";
import { Download as DownloadIcon, Smartphone, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./Download.css";

export default function Download() {
      useEffect(() => {
    const container = document.getElementById("loom-adsterra-slot");

    if (!container || container.dataset.loaded === "true") {
      return;
    }

    container.dataset.loaded = "true";

    const optionsScript = document.createElement("script");
    optionsScript.text = `
      atOptions = {
        'key': 'e3f972403d1a4d2c5686c404ede7da28',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    const adScript = document.createElement("script");
    adScript.src =
      "https://bicea.org/22/e3f972403d1a4d2c5686c404ede7da28";
    adScript.async = true;

    container.appendChild(optionsScript);
    container.appendChild(adScript);

    return () => {
      // Do not remove the external script here; React Strict Mode
      // may run effect cleanup and setup again during development.
    };
  }, []);
  return (
    <main className="download-page">
      <header className="download-header">
        <Link to="/about" className="download-brand" aria-label="LOOM homepage">
          <img
  src="/loom-splash-symbol.png"
  alt="LOOM"
  className="download-brand-image"
/>
          <span>LOOM</span>
        </Link>

        <Link to="/about" className="download-back">
          <ArrowLeft size={16} />
          <span>Back to LOOM</span>
        </Link>
      </header>

      <section className="download-hero">
        <span className="download-eyebrow">LOOM FOR ANDROID</span>
        <h1>Your finances.<br /><span>In your hands.</span></h1>
        <p>
          Take control of your money with LOOM. Track your spending,
          manage budgets and keep your financial goals close.
        </p>
      </section>

      <section className="download-ad-section" aria-label="Advertisement">
  <span className="download-ad-label">ADVERTISEMENT</span>

  <div className="download-ad-slot">
    <div id="loom-adsterra-slot" />
  </div>
</section>

      <section className="download-card">
        <img
  src="/loom-splash-symbol.png"
  alt="LOOM app icon"
  className="download-app-image"
/>

        <div className="download-card-content">
          <span className="download-platform">ANDROID APP</span>
          <h2>LOOM for Android</h2>
          <p>Install the Android application on your device.</p>

          <div className="download-details">
            <span><Smartphone size={15} /> Android APK</span>
            <span><ShieldCheck size={15} /> Official LOOM download</span>
          </div>

          <a
            className="download-button"
            href="/downloads/loom-android.apk"
            download="loom-android.apk"
          >
            <DownloadIcon size={19} />
            Download for Android
          </a>

          <p className="download-note">
            Download the APK, open it on your Android device and follow
            the installation instructions. Android may ask you to allow
            installation from your browser.
          </p>
        </div>
      </section>

      <section className="download-requirements">
        <h2>Before you install</h2>
        <ul>
          <li>Use an Android device.</li>
          <li>Download the APK directly from this LOOM website.</li>
          <li>Only install the file if you trust its source.</li>
        </ul>
      </section>

      <footer className="download-footer">
        <span>© {new Date().getFullYear()} LOOM</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
