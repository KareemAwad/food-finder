import { z } from "zod";

// One definition of the /health response, checked at runtime by the web app and returned by the API.
export const healthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  database: z.enum(["ok", "error"]),
  time: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
