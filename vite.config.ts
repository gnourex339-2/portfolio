import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Served under https://gnourex339-2.github.io/portfolio/ on GitHub Pages,
// so the production base path is "/portfolio/". Dev stays at "/".
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/portfolio/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
