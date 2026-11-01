import type { HealthResponse } from "@app/shared";

type Props = {
  health: HealthResponse | null;
};

export function ApiStatus({ health }: Props) {
  if (!health) return <p role="status">API: unreachable</p>;
  return (
    <p role="status">
      API: {health.status} · Database: {health.database}
    </p>
  );
}
