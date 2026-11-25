"use client";

import { styled } from "@stitches/react";

const ScreenStyled = styled("main", {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #17223b 0%, #26365a 58%, #17223b 100%)",
  display: "flex",
  alignItems: "center",
  padding: "48px 20px 72px",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "420px",
    height: "420px",
    right: "-160px",
    top: "-180px",
    border: "80px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "50%",
  },

  "@media (min-width: 900px)": {
    padding: "64px 32px",
  },
});

export default ScreenStyled;
