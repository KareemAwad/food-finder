import { describe, expect, it } from "vitest";

import { validateEnv } from "./env.js";

describe("validateEnv", () => {
  it("fails fast when DATABASE_URL is missing", () => {
    expect(() => validateEnv({})).toThrow();
  });

  it("defaults PORT to 4000", () => {
    expect(validateEnv({ DATABASE_URL: "postgresql://localhost/app" }).PORT).toBe(4000);
  });
});
