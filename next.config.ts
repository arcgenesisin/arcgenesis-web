import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
