import type { HealthResponse } from "@app/shared";
import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";

import { HealthService } from "./health.service.js";

// Used by the web app, Render's health check, and uptime monitors.
@Controller("health")
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  async get(@Res({ passthrough: true }) res: Response): Promise<HealthResponse> {
    const result = await this.health.check();
    res.status(result.status === "ok" ? 200 : 503);
    return result;
  }
}
