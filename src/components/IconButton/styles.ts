import { styled } from "@stitches/react";

export const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "40px",
  height: "40px",

  fontSize: "18pt",

  border: "none",
  borderRadius: "12px",

  backgroundColor: "#17223b",
  color: "#fff",

  cursor: "pointer",
  transition: "180ms ease",
  boxShadow: "0 8px 18px rgba(23,34,59,.16)",

  "&:hover": { backgroundColor: "#ef4f4f", transform: "translateY(-2px)" },

  "&:disabled": {
    backgroundColor: "#ced4da",
  },
});
