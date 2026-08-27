import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Same machine, different spellings of "this computer" (localhost vs 127.0.0.1).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
