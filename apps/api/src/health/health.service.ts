import type { HealthResponse } from "@app/shared";
import { Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthResponse> {
    const time = new Date().toISOString();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ok", database: "ok", time };
    } catch (error: unknown) {
      this.logger.error("Database check failed", error instanceof Error ? error.stack : undefined);
      return { status: "error", database: "error", time };
    }
  }
}
