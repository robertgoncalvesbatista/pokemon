import { styled } from "@stitches/react";

export const ScreenStyled = styled("main", {
  margin: "0 auto",
  marginTop: "2rem",
  maxWidth: "1200px",
});

export const CardStyled = styled("div", {
  backgroundColor: "#a2d2ff",
  minWidth: "280px",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "4px",

  "@media (min-width: 600px)": {
    minWidth: "320px",
  },
});

export const FlexboxStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "0 1rem",

  gap: "1rem",
  flexWrap: "wrap",
});

export const ButtonGroupStyled = styled("div", {
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});
