import { healthResponseSchema } from "@app/shared";
import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PrismaService } from "../prisma/prisma.service.js";
import { HealthController } from "./health.controller.js";
import { HealthService } from "./health.service.js";

async function appWith(queryRaw: () => Promise<unknown>): Promise<INestApplication<App>> {
  const moduleRef = await Test.createTestingModule({
    controllers: [HealthController],
    providers: [HealthService, { provide: PrismaService, useValue: { $queryRaw: queryRaw } }],
  }).compile();
  const app = moduleRef.createNestApplication<INestApplication<App>>({ logger: false });
  await app.init();
  return app;
}

describe("GET /health", () => {
  let app: INestApplication<App>;

  afterEach(async () => {
    await app.close();
  });

  it("returns 200 and a valid body when the database responds", async () => {
    app = await appWith(vi.fn().mockResolvedValue([1]));
    const res = await request(app.getHttpServer()).get("/health").expect(200);
    expect(healthResponseSchema.parse(res.body)).toMatchObject({ status: "ok", database: "ok" });
  });

  it("returns 503 when the database is down", async () => {
    app = await appWith(vi.fn().mockRejectedValue(new Error("connection refused")));
    const res = await request(app.getHttpServer()).get("/health").expect(503);
    expect(res.body).toMatchObject({ status: "error", database: "error" });
  });
});
