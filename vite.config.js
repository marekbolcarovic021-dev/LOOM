import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isAppBuild = mode === "app";

  return {
    plugins: [react()],

    build: {
      outDir: isAppBuild ? "dist-app" : "dist",
      emptyOutDir: true,
    },

    define: {
      "import.meta.env.VITE_APP_BUILD": JSON.stringify(
        isAppBuild
      ),
    },
  };
});