import { useEffect, useRef } from "react";

const ADSENSE_CLIENT = "ca-pub-9227355054250070";

export default function AdSenseBanner({
    slot,
    className = "",
}) {
    const adRef = useRef(null);

    useEffect(() => {
        if (!adRef.current) return;

        try {
            window.adsbygoogle =
                window.adsbygoogle || [];

            window.adsbygoogle.push({});
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    return (
        <div className={`loom-ad-container ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: "block",
                    width: "100%",
                }}
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}