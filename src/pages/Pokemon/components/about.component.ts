import { styled } from "@stitches/react";

const AboutStyled = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  padding: "16px",
  borderRadius: "16px",
  background: "#fff",
  border: "1px solid #dde4ec",
  boxShadow: "0 10px 28px rgba(23, 34, 59, 0.08)",
});

export default AboutStyled;
