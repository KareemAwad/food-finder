"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Shown when the root layout itself crashes. Reports the error, then offers a way back.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: "2rem" }}>
        <h1>Something went wrong</h1>
        <p>It&apos;s been reported. Try again in a moment.</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
