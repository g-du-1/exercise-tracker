import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      all: true,
      include: ["app/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "**/*.test.*",
        "node_modules/",
        "**/types.ts",
        "**/theme.ts",
        "**/layout.tsx",
        "**/constants.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
  },
});
