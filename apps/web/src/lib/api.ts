import { healthResponseSchema, type HealthResponse } from "@app/shared";

// Server-side only: API_URL isn't exposed to the browser.
const apiUrl = process.env.API_URL ?? "http://localhost:4000";

// Returns null when the API is unreachable or answers with an unexpected shape.
export async function getHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    const parsed = healthResponseSchema.safeParse(await res.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
