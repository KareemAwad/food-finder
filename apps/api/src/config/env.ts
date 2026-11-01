import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().int().positive().default(4000),
});

export type Env = z.infer<typeof envSchema>;

// Runs at startup, so a missing variable stops the app instead of failing on the first request.
export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}
