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
  border: "1px solid rgba(23, 34, 59, 0.10)",
  borderRadius: "12px",
  background: "#fff",
  color: "#202124",
  width: "min(100%, 180px)",
  minHeight: "56px",
  paddingInline: "16px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "0 auto",
  fontWeight: 700,
  boxShadow: "0 8px 20px rgba(113, 78, 12, 0.10)",
  transition: "transform 180ms ease, box-shadow 180ms ease",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 14px 26px rgba(113, 78, 12, 0.16)",
  },

  "&:active": {
    transform: "translateY(-1px)",
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
