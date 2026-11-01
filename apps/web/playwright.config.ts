import { release } from "node:os";

import { defineConfig, devices } from "@playwright/test";

// Set PLAYWRIGHT_BASE_URL to run against a deployed preview/staging URL instead of a local server.
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const isCI = !!process.env.CI;

// Playwright's bundled Chromium doesn't support macOS 13 or older (Darwin < 23),
// so on those Macs use the installed Google Chrome. Override with PW_CHANNEL.
const oldMac = process.platform === "darwin" && Number(release().split(".")[0]) < 23;
const channel = process.env.PW_CHANNEL ?? (oldMac ? "chrome" : undefined);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel } }],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : [
        {
          // Needs Postgres running (`pnpm db:up`) and a migrated database.
          command: "pnpm --filter api start",
          url: "http://localhost:4000/health",
          reuseExistingServer: !isCI,
        },
        {
          // CI tests the production build; locally the dev server is faster to start.
          command: isCI ? "pnpm start" : "pnpm dev",
          url: baseURL,
          reuseExistingServer: !isCI,
        },
      ],
});
