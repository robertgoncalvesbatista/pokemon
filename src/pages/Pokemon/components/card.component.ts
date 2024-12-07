"use client";

import { styled } from "@stitches/react";

const List = styled("div", {
  backgroundColor: "$$bgColor",

  display: "grid",
  justifyContent: "center",

  flexBasis: "250px",
  gridTemplateColumns: "1fr 1fr",

  padding: "1rem",
  borderRadius: "4px",

  cursor: "pointer",
});

export const Details = styled("div", {
  maxWidth: "1200px",

  margin: "2rem auto 0",
  padding: "2rem",

  backgroundColor: "$$bgColor",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

  borderRadius: "25px",
});

const Card = {
  List: List,
  Details: Details,
};

export default Card;
