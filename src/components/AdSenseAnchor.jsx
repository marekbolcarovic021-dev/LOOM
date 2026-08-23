import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-9227355054250070";

export default function AdSenseAnchor({ enabled }) {
    useEffect(() => {
        if (!enabled) return;

        if (
            document.querySelector(
                'script[data-loom-adsense="true"]'
            )
        ) {
            return;
        }

        const script = document.createElement("script");

        script.async = true;
        script.src =
            `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

        script.crossOrigin = "anonymous";
        script.dataset.loomAdsense = "true";

        document.head.appendChild(script);
    }, [enabled]);

    return null;
}