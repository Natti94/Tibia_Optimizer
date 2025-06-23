import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Tibia_Optimizer/",
  server: {
    proxy: {
      "/api": {
        target: "https://tibiawiki.dev",
        changeOrigin: true,
      },
    },
  },
});
