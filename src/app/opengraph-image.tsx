import { ImageResponse } from "next/og";

// Share card for every page (LinkedIn, Slack, X and others). Generated at
// build time. Colors are the site's cream, navy and accent.
export const alt = "Agent Blueprint: know whether each AI agent is worth it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundColor: "#faf8f4",
          backgroundImage:
            "linear-gradient(rgba(31,58,95,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#1b1b1b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 600, color: "#1f3a5f" }}>
          Agent Blueprint
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 980 }}>
            Know whether each AI agent is worth it.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4a4540", maxWidth: 1060 }}>
            Its real cost and results, measured against a number set in advance.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {["Keep", "Fix", "Stop"].map((word) => (
              <div
                key={word}
                style={{
                  display: "flex",
                  padding: "8px 22px",
                  border: "2px solid #1f3a5f",
                  borderRadius: 8,
                  color: "#1f3a5f",
                  fontWeight: 600,
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#c4452c", fontWeight: 600 }}>agentblueprint.ai</div>
        </div>
      </div>
    ),
    size,
  );
}
