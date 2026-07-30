import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The product's real sign-in lives on app.arcgenesis.ai — that is where the session cookie
    // belongs, so there is exactly ONE auth implementation. These two legacy website pages were
    // built around the old next-auth Google session (and still advertised a free first assessment
    // that no longer exists); they now hand off to the app. 307s, so nothing is cached permanently
    // if we ever want the pages back. The page files are kept, just unreachable.
    return [
      { source: "/login", destination: "https://app.arcgenesis.ai/login", permanent: false },
      { source: "/account", destination: "https://app.arcgenesis.ai/home.html", permanent: false },
    ];
  },
  async rewrites() {
    // Host-based routing for the private tracer subdomain. Evaluated per-request at the routing
    // layer (unlike middleware, this is not bypassed by the statically-cached landing at "/"),
    // so trace.arcgenesis.ai always serves the password-gated portal.
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "trace.arcgenesis.ai" }],
          destination: "/trace-portal",
        },
      ],
    };
  },
};

export default nextConfig;
