import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(900px 700px at 80% 0%, rgba(232,201,122,0.45), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(27,60,115,0.6), transparent 60%), #0B2545",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#C5A05A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B2545",
              fontWeight: 900,
              fontSize: 28,
            }}
          >
            O
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.4 }}>
              Ownly Web Studio
            </span>
            <span
              style={{
                marginTop: 2,
                fontSize: 12,
                letterSpacing: 3.6,
                textTransform: "uppercase",
                color: "#E8C97A",
                fontWeight: 800,
              }}
            >
              A service of Ownly ONCE LLC
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 800,
              color: "#E8C97A",
            }}
          >
            World-Class Custom Web Development
          </span>
          <span
            style={{
              fontSize: 78,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Custom websites built like product. Shipped like agencies wish they could.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 28,
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>ownly-web-studio.vercel.app</span>
          <span style={{ color: "#E8C97A", fontWeight: 700 }}>Start a Build →</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
