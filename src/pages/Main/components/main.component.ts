"use client";

import { styled } from "@stitches/react";

const MainStyled = styled("div", {
  margin: "0 auto",
  maxWidth: "280px",

  "@media (min-width: 600px)": {
    maxWidth: "580px",
  },

  "@media (min-width: 900px)": {
    maxWidth: "880px",
  },
});

export default MainStyled;
