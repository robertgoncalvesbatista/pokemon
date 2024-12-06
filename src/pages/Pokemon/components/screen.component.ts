"use client";

import { styled } from "@stitches/react";

const List = styled("main", {
  margin: "0 auto",
  marginTop: "2rem",
  maxWidth: "1200px",
});

const Details = styled("main", {
  width: "100vw",
  height: "100vh",
});

const Screen = {
  List: List,
  Details: Details,
};

export default Screen;
