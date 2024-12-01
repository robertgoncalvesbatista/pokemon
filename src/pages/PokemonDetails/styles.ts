"use client";

import { styled } from "@stitches/react";

export const ButtonShiny = styled("button", {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const MainStyled = styled("main", {
  width: "100vw",
  height: "100vh",
});

export const CardStyled = styled("div", {
  maxWidth: "1200px",

  margin: "0 auto",
  padding: "2rem",

  backgroundColor: "$$bgColor",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

  borderBottomLeftRadius: "50px",
  borderBottomRightRadius: "50px",
});

export const ContentStyled = styled("div", {
  maxWidth: "1200px",

  padding: "0 2rem",
  margin: "2rem auto",

  display: "grid",
});

export const AboutStyled = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

export const StatusStyled = styled("div", {
  maxWidth: "800px",
  width: "100%",
  margin: "0 auto",
});
