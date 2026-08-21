import { useEffect } from "react";

export default function AdSidebar({ side = "right", show = true }) {
  useEffect(() => {
    if (!show) return;

    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [show]);

  if (!show) return null;

  return (
    <aside className={`loom-ad-sidebar loom-ad-${side}`}>
      <div className="loom-ad-label">
        Advertisement
      </div>

      <ins
        className="adsbygoogle loom-ad-unit"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}