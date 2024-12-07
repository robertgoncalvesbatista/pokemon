"use client";

import { styled } from "@stitches/react";

const WrapperStyled = styled("div", {
  padding: "0 0 2rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  gap: "1rem",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "0.5fr 3fr",
  },
});

export default WrapperStyled;
