"use client";

import { styled } from "@stitches/react";

const Item = styled("button", {
  variants: {
    disabled: {
      true: {
        background: "#e9ecef",
        color: "#6c757d",
        border: "1px solid #6c757d",
        cursor: "default",
        transition: "initial",

        "&:hover": {
          transform: "initial",
          transition: "initial",
        },
      },
    },
  },

  padding: "0.5rem",
  border: "1px solid #212529",
  borderRadius: "8px",
  background: "#f8f9fa",
  color: "#212529",
  width: "120px",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  cursor: "pointer",
  margin: "0 auto",
  transition: ".1s ease-in-out",

  "&:hover": {
    transform: "translateY(-4px)",
    transition: ".1s ease-in-out",
  },

  "@media (min-width: 600px)": {
    margin: 0,
  },
});

const Group = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "0.5rem",
  flexDirection: "column",
  borderRadius: "8px",
  padding: "0.75rem 0",
  margin: "1rem auto 0",

  "@media (min-width: 600px)": {
    margin: "2rem auto 0",
    gap: "1rem",
    flexDirection: "row",
  },
});

const Button = {
  Group: Group,
  Item: Item,
};

export default Button;
