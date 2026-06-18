<<<<<<< HEAD
import { fileURLToPath, URL } from "node:url";
=======
>>>>>>> 030a95267f5bacdf8ad559d91779da464f742cf8
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
=======
>>>>>>> 030a95267f5bacdf8ad559d91779da464f742cf8
});
