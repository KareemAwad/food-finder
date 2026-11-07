import { describe, expect, it } from "vitest";

import { scrubEvent, sentryDataCollection } from "./sentry.js";

// A search request as Sentry would describe it, if it were allowed to attach the body.
function searchEvent() {
  return {
    message: "Search failed",
    request: {
      url: "https://food-finder.example/api/search",
      method: "POST",
      data: { lat: 43.6532, lng: -79.3832, type: "food" },
      cookies: { session: "secret-session-token" },
    },
  };
}

describe("scrubEvent", () => {
  it("removes the request body, which holds the user's location (ADR 006, issue 3)", () => {
    expect(scrubEvent(searchEvent()).request?.data).toBeUndefined();
  });

  it("removes cookies, which will hold the sign-in session in M2", () => {
    expect(scrubEvent(searchEvent()).request?.cookies).toBeUndefined();
  });

  it("keeps the URL and method, so the error report still says what failed", () => {
    expect(scrubEvent(searchEvent()).request).toMatchObject({
      url: "https://food-finder.example/api/search",
      method: "POST",
    });
  });

  it("leaves events without a request alone", () => {
    const event = { message: "Startup failed" };
    expect(scrubEvent(event)).toEqual({ message: "Startup failed" });
  });
});

describe("sentryDataCollection", () => {
  // Exact match on purpose: loosening or misspelling any setting should fail here, not leak data.
  it("keeps bodies, query strings, cookies, user info, IPs and local variables out of Sentry", () => {
    expect(sentryDataCollection).toEqual({
      httpBodies: [],
      urlQueryParams: false,
      cookies: false,
      userInfo: false,
      stackFrameVariables: false,
      httpHeaders: { allow: ["user-agent", "content-type"] },
    });
  });
});
