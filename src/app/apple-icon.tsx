import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #090d16 0%, #15102a 50%, #200b3b 100%)",
          borderRadius: "40px",
          border: "4px solid rgba(139, 92, 246, 0.8)",
          boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: "92px",
          letterSpacing: "-4px",
        }}
      >
        <span style={{ color: "#38bdf8", marginRight: "4px" }}>A</span>
        <span style={{ color: "#c084fc" }}>H</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
