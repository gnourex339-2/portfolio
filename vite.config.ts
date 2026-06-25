import { execSync } from "node:child_process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Short commit SHA at build time — powers the footer "live infra" line. */
function gitSha(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "local";
  }
}

// https://vite.dev/config/
// Served under https://gnourex339-2.github.io/portfolio/ on GitHub Pages,
// so the production base path is "/portfolio/". Dev stays at "/".
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/portfolio/" : "/",
  define: {
    __BUILD_SHA__: JSON.stringify(gitSha()),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
