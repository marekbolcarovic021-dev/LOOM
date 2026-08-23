import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-9227355054250070";

export default function AdSenseAnchor({ enabled }) {
    useEffect(() => {
        if (!enabled) return;

        // Don't load AdSense more than once.
        if (document.querySelector(
            `script[src*="adsbygoogle.js?client=${ADSENSE_CLIENT}"]`
        )) {
            return;
        }

        const script = document.createElement("script");

        script.async = true;
        script.src =
            `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

        script.crossOrigin = "anonymous";

        document.head.appendChild(script);

        return () => {
            // Intentionally don't remove the AdSense script.
            // AdSense should only be loaded once per page.
        };
    }, [enabled]);

    return null;
}