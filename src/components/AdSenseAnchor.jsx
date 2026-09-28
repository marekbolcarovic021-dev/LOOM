import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-9227355054250070";
const ADSENSE_SCRIPT_ID = "loom-adsense-script";

export default function AdSenseAnchor({ enabled = false }) {
  useEffect(() => {
    if (!enabled) return;

    if (document.getElementById(ADSENSE_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");

    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.src =
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);
  }, [enabled]);

  return null;
}