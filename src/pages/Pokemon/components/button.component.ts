"use client";

import { styled } from "@stitches/react";

const Group = styled("div", {
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});

const Shiny = styled("button", {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const Button = {
  Group: Group,
  Shiny: Shiny,
};

export default Button;
