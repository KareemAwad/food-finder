import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ThrowButton } from "./ThrowButton";

// Proves error reporting works on a deployed environment. Set SENTRY_TEST_ROUTE=true for that
// Vercel environment, redeploy, use both checks, then turn it off. Otherwise this is a 404.
// The flag is read when the page is built, so changing it needs a redeploy.
export default function SentryErrorPage({ searchParams }: PageProps<"/debug/sentry-error">) {
  if (process.env.SENTRY_TEST_ROUTE !== "true") notFound();

  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Sentry check</h1>
      <p>
        Browser: press the button. Server: open <a href="?side=server">?side=server</a>.
      </p>
      <ThrowButton />
      <Suspense>
        <ServerError searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ServerError({
  searchParams,
}: Pick<PageProps<"/debug/sentry-error">, "searchParams">) {
  const { side } = await searchParams;
  if (side === "server") {
    throw new Error("Sentry test error from the web server (deliberate)");
  }
  return null;
}
