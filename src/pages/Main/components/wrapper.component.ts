"use client";

import { styled } from "@stitches/react";

const WrapperStyled = styled("div", {
  padding: "32px",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  gap: "24px",
  background: "rgba(255, 255, 255, 0.96)",
  border: "1px solid rgba(255, 255, 255, 0.82)",
  borderRadius: "24px",
  boxShadow: "0 20px 50px rgba(113, 78, 12, 0.16)",
  backdropFilter: "blur(12px)",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "220px 1fr",
    padding: "40px",
  },

  "@media (min-width: 900px)": {
    gridTemplateColumns: "280px 1fr",
    padding: "48px",
  },
});

export default WrapperStyled;
