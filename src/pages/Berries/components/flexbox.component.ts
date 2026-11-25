import { styled } from "@stitches/react";

const FlexboxStyled = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
});

export default FlexboxStyled;
