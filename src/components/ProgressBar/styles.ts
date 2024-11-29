"use client";

import { styled } from "@stitches/react";

export const ContainerProgreesBar = styled("div", {
  display: "grid",
  gridTemplateColumns: "0.6fr 5fr 0.5fr",
  marginBottom: "0.5rem",
  alignItems: "center",
});

export const BarBackProgressBar = styled("div", {
  border: "2px solid #e5e5e5",
  backgroundColor: "#e5e5e5",
  borderRadius: "25px",
  height: "15px",
});

export const BarFrontProgressBar = styled("div", {
  backgroundColor: "#2a9d8f",
  borderRadius: "25px",
  width: "$$percentage",
  height: "100%",
  padding: "0.2rem 0.6rem",
});

export const ValueProgressBar = styled("p", {
  display: "flex",
  justifyContent: "flex-end",

  color: "#000",

  fontSize: "10pt",
  fontWeight: "500",
});

export const SpanProgressBar = styled("span", {
  fontWeight: "500",
});
