"use client";

import { styled } from "@stitches/react";

const ImageStyled = styled("img", {
  position: "relative",

  transition: ".1s ease-in-out",

  "&:hover": {
    scale: 1.2,
    transition: ".1s ease-in-out",
  },
});

export default ImageStyled;
