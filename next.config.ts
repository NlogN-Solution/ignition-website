import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // The original country-matching URLs now resolve to their career-journey
  // equivalents, so existing links keep working.
  async redirects() {
    return [
      { source: "/discover", destination: "/careers/quiz", permanent: true },
      { source: "/match", destination: "/careers/quiz/results", permanent: true },
    ];
  },
};

export default nextConfig;
