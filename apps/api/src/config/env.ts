import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().int().positive().default(4000),
  // Sentry is off when SENTRY_DSN is missing, so local dev and CI need no account.
  SENTRY_DSN: z.url().optional(),
  SENTRY_ENVIRONMENT: z.enum(["development", "staging", "production"]).default("development"),
  // Turns on GET /debug/sentry-error. Off by default, so strangers can't spend the error quota.
  SENTRY_TEST_ROUTE: z.stringbool().default(false),
});

export type Env = z.infer<typeof envSchema>;

// Runs at startup, so a missing variable stops the app instead of failing on the first request.
export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}
