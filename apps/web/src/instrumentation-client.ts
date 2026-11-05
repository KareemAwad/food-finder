import * as Sentry from "@sentry/nextjs";

import { sentryOptions } from "@/lib/sentry";

// Runs in the browser before the app starts. Catches uncaught errors and rejected promises.
Sentry.init(sentryOptions);
