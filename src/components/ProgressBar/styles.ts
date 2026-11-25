"use client";

import { styled } from "@stitches/react";

export const ContainerProgreesBar = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(88px, 1fr) 5fr 54px",
  gap: "12px",
  marginBottom: "12px",
  alignItems: "center",
});

export const BarBackProgressBar = styled("div", {
  border: "none",
  backgroundColor: "#edf1f6",
  borderRadius: "25px",
  height: "12px",
  overflow: "hidden",
});

export const BarFrontProgressBar = styled("div", {
  background: "linear-gradient(90deg, #70c8dc, #ef4f4f)",
  borderRadius: "25px",
  width: "$$percentage",
  height: "100%",
  minWidth: "8px",
  transition: "width 600ms cubic-bezier(.2,.8,.2,1)",
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
