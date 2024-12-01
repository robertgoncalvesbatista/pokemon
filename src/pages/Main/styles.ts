"use client";

import { styled } from "@stitches/react";

export const MainStyled = styled("main", {
  backgroundColor: "rgb(234, 182, 70)",
  minHeight: "100vh",
});

export const BotaoStyled = styled("button", {
  padding: "0.5rem",
  border: "1px solid #000",
  borderRadius: "8px",
  color: "#000",
  background: "#fff",
  minWidth: "80px",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  flexDirection: "column",
});
