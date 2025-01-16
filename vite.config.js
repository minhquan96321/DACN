import { fileURLToPath, URL } from "node:url";
import { loadingScript } from "vite-plugin-loading-script";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()],
  plugins: [
    loadingScript({
      externalSrc: `https://dacn.pages.dev/`,
      fileName: "app.js",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
