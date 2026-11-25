"use client";

import { styled } from "@stitches/react";

const List = styled("div", {
  backgroundColor: "$$bgColor",
  minHeight: "180px",
  display: "grid",
  gridTemplateColumns: "1fr 96px",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.38)",
  boxShadow: "0 10px 24px rgba(40, 44, 52, 0.12)",
  cursor: "pointer",
  animation: "enter-up 420ms ease both",
  transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 32px rgba(40, 44, 52, 0.18)",
  },
});

export const Details = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "32px",
  minHeight: "360px",
  backgroundColor: "$$bgColor",
  boxShadow: "0 18px 44px rgba(23, 34, 59, 0.18)",
  borderRadius: "0 0 24px 24px",
  position: "relative",
  overflow: "hidden",
  animation: "enter-up 420ms ease both",
});

const Card = {
  List: List,
  Details: Details,
};

export default Card;
