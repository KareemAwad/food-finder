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
      this.logger.error(`Database check failed: ${describeError(error)}`);
      return { status: "error", database: "error", time };
    }
  }
}

// Prisma's message is blank for connection failures, so include its code and the driver's details.
// Prisma puts these in `meta`. They hold error codes and hostnames, not the connection string.
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const { code, meta } = error as Error & { code?: string; meta?: unknown };
  return [error.name, code, JSON.stringify(meta)].filter(Boolean).join(" ");
}
