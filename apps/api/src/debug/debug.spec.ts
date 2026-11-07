import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types.js";
import { afterEach, describe, expect, it } from "vitest";

import { DebugController } from "./debug.controller.js";

async function appWith(testRouteOn: boolean): Promise<INestApplication<App>> {
  const moduleRef = await Test.createTestingModule({
    controllers: [DebugController],
    providers: [{ provide: ConfigService, useValue: { get: () => testRouteOn } }],
  }).compile();
  const app = moduleRef.createNestApplication<INestApplication<App>>({ logger: false });
  await app.init();
  return app;
}

describe("GET /debug/sentry-error", () => {
  let app: INestApplication<App>;

  afterEach(async () => {
    await app.close();
  });

  it("is a plain 404 when the test route is off", async () => {
    app = await appWith(false);
    await request(app.getHttpServer()).get("/debug/sentry-error").expect(404);
  });

  it("fails with a 500 when the test route is on, so Sentry has something to report", async () => {
    app = await appWith(true);
    const res = await request(app.getHttpServer()).get("/debug/sentry-error").expect(500);
    expect(JSON.stringify(res.body)).not.toContain("Sentry test error"); // no internals leak out
  });
});
