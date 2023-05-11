/* eslint-disable arrow-body-style */
import react from "@vitejs/plugin-react";
import { join } from "path";
import { defineConfig } from "vite";
// import svgrPlugin from 'vite-plugin-svgr';

const srcRoot = join(__dirname, "src");

// More config, see: https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      // svgrPlugin()
      react(),
    ],
    resolve: {
      alias: {
        "@": srcRoot,
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      include: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      setupFiles: ["./src/tests/setup.ts"],
    },
  };
});

// skip validation during testing
// otherwise vitest will think the code runs in the client and throws errors
// that the client tries to access server side environment variables
process.env.SKIP_ENV_VALIDATION = "true";
