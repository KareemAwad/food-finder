"use client";

import { Button } from "@/components/ui/button";

export function ThrowButton() {
  return (
    <Button
      onClick={() => {
        throw new Error("Sentry test error from the browser (deliberate)");
      }}
    >
      Throw a browser error
    </Button>
  );
}
