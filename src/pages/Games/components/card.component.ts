import { styled } from "@stitches/react";

const CardStyled = styled("div", {
  backgroundColor: "#a2d2ff",
  minWidth: "280px",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "4px",

  "@media (min-width: 600px)": {
    minWidth: "320px",
  },
});

export default CardStyled;
