import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Same machine, different spellings of "this computer" (localhost vs 127.0.0.1).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  outputFileTracingIncludes: {
    "/events/[eventId]/rules": ["./docs/events/**/RULES_2027.md"],
  },
  async redirects() {
    return [
      {
        source: "/events/:eventId/overview",
        destination: "/events/:eventId/rules",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
