import { styled } from "@stitches/react";

export const ChipStyled = styled("div", {
  marginBottom: "0.5rem",
});

export const ChipTextStyled = styled("span", {
  variants: {
    variant: {
      outlined: {
        border: "1px solid #fff",
      },
      contained: {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  },

  fontSize: "10pt",
  fontWeight: 400,

  textTransform: "capitalize",

  padding: "0.2rem 0.6rem",
  borderRadius: "25px",
});
