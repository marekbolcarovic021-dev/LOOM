
import { useEffect } from "react";

const ADSTERRA_SCRIPT_ID = "loom-adsterra-social-bar";
const ADSTERRA_SCRIPT_SRC =
  "https://bicea.org/14/00c2ce0e0f972abf1f893ff5d9afa568";

export default function AdsterraSocialBar({ enabled = false }) {
  useEffect(() => {
    if (!enabled) return;

    // Avoid loading the same script more than once.
    if (document.getElementById(ADSTERRA_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = ADSTERRA_SCRIPT_ID;
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = ADSTERRA_SCRIPT_SRC;

    document.body.appendChild(script);

    return () => {
      // Do not remove the script here:
      // the advertising provider may manage its own elements.
    };
  }, [enabled]);

  return null;
}
