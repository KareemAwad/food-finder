import { describe, expect, it } from "vitest";

import { healthResponseSchema } from "./health.js";

describe("healthResponseSchema", () => {
  it("accepts a healthy response", () => {
    const body = { status: "ok", database: "ok", time: "2026-11-01T00:00:00.000Z" };
    expect(healthResponseSchema.parse(body)).toEqual(body);
  });

  it("rejects an unknown status", () => {
    const body = { status: "fine", database: "ok", time: "2026-11-01T00:00:00.000Z" };
    expect(healthResponseSchema.safeParse(body).success).toBe(false);
  });
});
