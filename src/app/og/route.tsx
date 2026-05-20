import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F1E8",
          color: "#0F1F39",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8B7044",
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "sans-serif",
            fontWeight: 700,
          }}
        >
          <span style={{ display: "block", width: 60, height: 1, background: "#B8965A" }} />
          Ownly Web Studio · Vol. I · No. 01 · MMXXVI
        </div>

        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            marginTop: 48,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Talk it out.</span>
          <span style={{ color: "#B8965A", fontStyle: "italic" }}>
            Ship a site that feels built by a team.
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#5A6B82",
            fontFamily: "sans-serif",
          }}
        >
          <span>From $1,500 · Free 24-hour mockup · No card</span>
          <span style={{ color: "#8B7044", letterSpacing: 4, textTransform: "uppercase", fontSize: 16, fontWeight: 700 }}>
            ownly-web-studio.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
