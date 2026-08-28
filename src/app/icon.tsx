import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "8px",
          border: "1.5px solid rgba(139, 92, 246, 0.8)",
          boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: "17px",
          letterSpacing: "-1px",
        }}
      >
        <span style={{ color: "#38bdf8", marginRight: "1px" }}>A</span>
        <span style={{ color: "#c084fc" }}>H</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
