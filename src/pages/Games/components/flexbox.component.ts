import { styled } from "@stitches/react";

const FlexboxStyled = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  padding: "0 1rem",
  gap: "16px",
});

export default FlexboxStyled;
