"use client";

import { styled } from "@stitches/react";

export const NavbarDashboard = styled("nav", {
  color: "#212529",
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
});

export const MainDashboard = styled("main", {
  margin: "0 auto",
  maxWidth: "1200px",
});

export const FlexboxDashboard = styled("div", {
  display: "flex",
  justifyContent: "center",

  gap: "1rem",
  flexWrap: "wrap",
});

export const CardDashboard = styled("div", {
  backgroundColor: "$$bgColor",

  display: "grid",
  justifyContent: "center",

  flexBasis: "250px",
  gridTemplateColumns: "1fr 1fr",

  padding: "1rem",
  borderRadius: "4px",

  cursor: "pointer",
});

export const Chip = styled("div", {
  marginBottom: "0.5rem",
});

export const ChipText = styled("span", {
  border: "1px solid white",

  borderRadius: "25px",
  padding: "0.2rem 0.6rem",

  fontSize: "10pt",
  fontWeight: 400,

  textTransform: "capitalize",
});

export const TooltipDashboard = styled("div", {
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});

export const ButtonDashboard = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "40px",
  height: "40px",

  fontSize: "18pt",

  border: "none",
  borderRadius: "50%",

  backgroundColor: "#6c757d",
  color: "#fff",

  transition: ".3s",

  "&:hover": { backgroundColor: "#adb5bd" },

  "&:disabled": {
    backgroundColor: "#ced4da",
  },
});

export const ImageDashboard = styled("img", {
  position: "relative",

  transition: ".1s ease-in-out",

  "&:hover": {
    scale: 1.2,
    transition: ".1s ease-in-out",
  },
});
