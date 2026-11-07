// The parts of a Sentry event that can carry user data. Written as our own type so this package
// doesn't depend on Sentry: any Sentry event fits it.
export type ScrubbableEvent = {
  request?: {
    data?: unknown;
    cookies?: unknown;
  };
};

/**
 * Removes user data from a Sentry event before it leaves the app. Both apps pass this as
 * `beforeSend` in `Sentry.init`. It's the second guard: the first is turning off body capture.
 */
export function scrubEvent<E extends ScrubbableEvent>(event: E): E {
  // the body would hold the user's location, which is sensitive (ADR 006, issue 3) and the cookies will hold the sign-in session in M2, which is also sensitive
  delete event.request?.data;
  delete event.request?.cookies;
  return event;
}
