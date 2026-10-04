import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output:"standalone",
  // Retired URLs keep working. The first pair are the original
  // country-matching screens, which now resolve to their career-journey
  // equivalents. The second pair are pages that were folded into a larger
  // guide rather than deleted: the Student visa is now the back half of the
  // entry-requirements page, and "apply through Ignition" the back half of
  // the apply guide, so each redirect lands on the anchor where its content
  // actually starts instead of at the top of a page the reader did not ask
  // for.
  async redirects() {
    return [
      { source: "/discover", destination: "/careers/quiz", permanent: true },
      { source: "/match", destination: "/careers/quiz/results", permanent: true },
      {
        source: "/visa",
        destination: "/apply/entry-requirements#visa-journey",
        permanent: true,
      },
      // The scholarship finder is off for now. Temporary, not permanent: the
      // page and its data are still in the codebase and may come back.
      { source: "/money/scholarships", destination: "/money", permanent: false },
      {
        source: "/apply/with-ignition",
        destination: "/apply#ignition-what",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
