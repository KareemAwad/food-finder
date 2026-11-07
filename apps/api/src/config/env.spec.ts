import { describe, expect, it } from "vitest";

import { validateEnv } from "./env.js";

describe("validateEnv", () => {
  it("fails fast when DATABASE_URL is missing", () => {
    expect(() => validateEnv({})).toThrow();
  });

  it("defaults PORT to 4000", () => {
    expect(validateEnv({ DATABASE_URL: "postgresql://localhost/app" }).PORT).toBe(4000);
  });

  it("keeps Sentry and its test route off unless they're configured", () => {
    const env = validateEnv({ DATABASE_URL: "postgresql://localhost/app" });
    expect(env).toMatchObject({ SENTRY_ENVIRONMENT: "development", SENTRY_TEST_ROUTE: false });
    expect(env.SENTRY_DSN).toBeUndefined();
  });

  it("reads SENTRY_TEST_ROUTE=false as off, not as a truthy string", () => {
    const env = validateEnv({
      DATABASE_URL: "postgresql://localhost/app",
      SENTRY_TEST_ROUTE: "false",
    });
    expect(env.SENTRY_TEST_ROUTE).toBe(false);
  });
});
