// The parts of a Sentry event that can carry user data. Written as our own type so this package
// doesn't depend on Sentry: any Sentry event fits it.
export type ScrubbableEvent = {
  request?: {
    data?: unknown;
    cookies?: unknown;
  };
};

/**
 * What Sentry may collect, used by both apps as `dataCollection` in `Sentry.init`. Sentry 11
 * collects all of these by default. This is the first guard; `scrubEvent` is the second.
 */
export const sentryDataCollection = {
  httpBodies: [], // the search body holds the user's location (ADR 006)
  urlQueryParams: false, // so does any query string someone adds later
  cookies: false,
  userInfo: false, // includes the IP address, which is a rough location too
  stackFrameVariables: false, // local variables like lat and lng
  httpHeaders: { allow: ["user-agent", "content-type"] },
};

/**
 * Removes user data from a Sentry event before it leaves the app. Both apps pass this as
 * `beforeSend` in `Sentry.init`. It's the second guard, behind `sentryDataCollection`.
 */
export function scrubEvent<E extends ScrubbableEvent>(event: E): E {
  // the body would hold the user's location, which is sensitive (ADR 006, issue 3) and the cookies will hold the sign-in session in M2, which is also sensitive
  delete event.request?.data;
  delete event.request?.cookies;
  return event;
}
