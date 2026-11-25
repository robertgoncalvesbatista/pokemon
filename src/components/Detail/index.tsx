"use client";

interface DetailProps {
  type: string;
  value: string;
  name: string;
}

function Detail({ type, value, name }: DetailProps) {
  return (
    <div style={{ textAlign: "center", borderRight: name === "Base experience" ? "none" : "1px solid #dde4ec" }}>
      <span style={{ fontWeight: "800", fontSize: "16pt", color: "#17223b", fontFamily: "'JetBrains Mono', monospace" }}>
        {value + type}
      </span>

      <br />

      <small style={{ color: "#69758a", marginTop: "4px", display: "block" }}>{name}</small>
    </div>
  );
}

export default Detail;
