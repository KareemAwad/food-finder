import { All, Controller, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { Env } from "../config/env.js";

// Proves error reporting works on a deployed environment: set SENTRY_TEST_ROUTE=true, call this,
// check Sentry, then turn the flag off again. Otherwise it's a plain 404.
@Controller("debug")
export class DebugController {
  constructor(private readonly config: ConfigService<Env, true>) {}

  // Any method, so a POST with a fake location body can confirm the body never reaches Sentry.
  @All("sentry-error")
  sentryError(): never {
    if (!this.config.get("SENTRY_TEST_ROUTE", { infer: true })) {
      throw new NotFoundException();
    }
    throw new Error("Sentry test error from the API (deliberate)");
  }
}
