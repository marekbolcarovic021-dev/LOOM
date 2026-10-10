
import { useEffect, useRef } from "react";

const ADSTERRA_KEY = "24c6b6f31367b78e890c194535d4f013";
const ADSTERRA_SCRIPT_ID = "loom-adsterra-banner-300x250";

export default function AdsterraBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Prevent duplicate initialization.
    if (container.dataset.initialized === "true") return;

    container.dataset.initialized = "true";

    // Adsterra expects these options before its script loads.
    window.atOptions = {
      key: ADSTERRA_KEY,
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.id = ADSTERRA_SCRIPT_ID;
    script.src = `https://bicea.org/22/${ADSTERRA_KEY}`;
    script.async = true;

    container.appendChild(script);

    return () => {
      container.replaceChildren();
      delete window.atOptions;
    };
  }, []);

  return (
    <aside
      className="loom-adsterra-banner"
      aria-label="Advertisement"
    >
      <div className="loom-adsterra-banner-label">
        Advertisement
      </div>

      <div
        ref={containerRef}
        className="loom-adsterra-banner-content"
      />
    </aside>
  );
}
