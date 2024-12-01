import { styled } from "@stitches/react";

export const Button = styled("button", {
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
