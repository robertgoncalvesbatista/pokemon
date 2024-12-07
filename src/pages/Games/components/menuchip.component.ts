import { styled } from "@stitches/react";

const MenuChipStyled = styled("div", {
  display: "flex",
  maxWidth: "248px",
  overflowX: "auto",
  padding: "0.25rem 0",
  gap: "0.5rem",
  height: "44px",

  "@media (min-width: 600px)": {
    maxWidth: "288px",
  },
});

export default MenuChipStyled;
