import { useEffect } from "react";

const SITE_URL = "https://www.loom-finance.com";

export default function SEO({
  title,
  description,
  path = "/",
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | LOOM`
      : "LOOM – Personal Finance Management";

    document.title = fullTitle;

    const setMeta = (name, content) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    const setCanonical = (url) => {
      let canonical = document.querySelector(
        'link[rel="canonical"]'
      );

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }

      canonical.setAttribute("href", url);
    };

    if (description) {
      setMeta("description", description);
    }

    setMeta(
      "robots",
      "index, follow, max-image-preview:large"
    );

    const normalizedPath =
      path === "/"
        ? "/"
        : `/${path.replace(/^\/+|\/+$/g, "")}`;

    const canonicalUrl =
      normalizedPath === "/"
        ? SITE_URL + "/"
        : SITE_URL + normalizedPath;

    setCanonical(canonicalUrl);

    return () => {
      document.title =
        "LOOM – Personal Finance Management";
    };
  }, [title, description, path]);

  return null;
}