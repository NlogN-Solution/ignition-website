import { ImageResponse } from "next/og";
import { siteTagline } from "@/lib/seo";

/**
 * The default social-share card for every route on the site. No page defines
 * its own `opengraph-image`, so this one file is what a link to any page —
 * not just the homepage — renders as on WhatsApp, iMessage, Facebook and
 * every other platform that unfurls a link. Before this existed, sharing any
 * page on the site produced no image and no styled preview at all.
 *
 * The wordmark is drawn as styled text rather than `public/images/logo.png`:
 * that file bakes its "ignition" text in navy, which disappears against this
 * card's navy background. Recreating it as text avoids depending on a raster
 * asset that was never designed for a dark background.
 */
export const alt = siteTagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#01166f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 4,
              backgroundColor: "#fc5a07",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            ignition
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            maxWidth: 860,
          }}
        >
          {"Everything you need "}
          <span style={{ color: "#fc5a07" }}>to study in the UK.</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Courses · Universities · Careers · Visas
        </div>
      </div>
    ),
    { ...size },
  );
}
