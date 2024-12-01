"use client";

import { styled } from "@stitches/react";

export const Main = styled("main", {
  margin: "0 auto",
  marginTop: "2rem",
  maxWidth: "1200px",
});

export const Title = styled("h1", {
  color: "#212529",
  textAlign: "center",
  marginBottom: "1rem",
});

export const Flexbox = styled("div", {
  display: "flex",
  justifyContent: "center",

  gap: "1rem",
  flexWrap: "wrap",
});

export const Card = styled("div", {
  backgroundColor: "$$bgColor",

  display: "grid",
  justifyContent: "center",

  flexBasis: "250px",
  gridTemplateColumns: "1fr 1fr",

  padding: "1rem",
  borderRadius: "4px",

  cursor: "pointer",
});

export const ButtonGroup = styled("div", {
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});

export const Image = styled("img", {
  position: "relative",

  transition: ".1s ease-in-out",

  "&:hover": {
    scale: 1.2,
    transition: ".1s ease-in-out",
  },
});
