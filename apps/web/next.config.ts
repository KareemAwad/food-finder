import type { NextConfig } from "next";

// The browser only ever talks to this app. /api/* is forwarded to NestJS, so there's no CORS
// and sign-in cookies stay first-party. Read at build time, so set API_URL on the host too.
const apiUrl = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
