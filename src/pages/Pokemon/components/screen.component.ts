"use client";

import { styled } from "@stitches/react";

const List = styled("main", {
  margin: "0 auto",
  minHeight: "100vh",
  padding: "32px 20px",
  maxWidth: "1200px",
  background: "linear-gradient(180deg, #f8fbff 0%, #eef3f8 100%)",
});

const Details = styled("main", {
  minHeight: "100vh",
  width: "100%",
  paddingBottom: "48px",
  background: "linear-gradient(180deg, #eef3f8 0%, #f8fbff 100%)",
});

const Screen = {
  List: List,
  Details: Details,
};

export default Screen;
