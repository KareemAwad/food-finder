import { existsSync } from "node:fs";

import { defineConfig } from "prisma/config";

if (existsSync(".env")) process.loadEnvFile();

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Migrations need a direct connection. `prisma generate` doesn't connect, so an empty value is fine in CI.
  datasource: { url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "" },
});
