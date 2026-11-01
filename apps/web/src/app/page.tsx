import { connection } from "next/server";
import { Suspense } from "react";

import { ApiStatus } from "@/components/ApiStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealth } from "@/lib/api";

async function LiveApiStatus() {
  // Opts out of prerendering so this checks the API on every request (Cache Components is on).
  await connection();
  return <ApiStatus health={await getHealth()} />;
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-semibold">Food Finder</h1>
          </CardTitle>
          <CardDescription>
            Walking skeleton is live. Replace this page with the first slice of the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          <Suspense fallback={<p>Checking the API…</p>}>
            <LiveApiStatus />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
