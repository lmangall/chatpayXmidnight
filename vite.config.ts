/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {configDefaults} from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    // Removed vite-plugin-checker as it's not needed without ESLint or TypeScript checking
  ],
  esbuild: {
    target: "esnext", // Use the latest supported environment for top-level await
  },
  test: {
    globals: true,
    environment: "node", // Default environment
    environmentMatchGlobs: [
      // Use jsdom for tests in the 'components' directory
      ["src/components/**/*.test.tsx", "jsdom"],
    ],
    exclude: [
      ...configDefaults.exclude,
      "dist/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
    ],
  },
});
