"use client";

import { styled } from "@stitches/react";

const Container = styled("div", {
  padding: "1rem 0",
  width: "100%",
  position: "absolute",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
});

export const Body = styled("div", {
  maxWidth: "280px",
  fontSize: "8pt",

  "@media (min-width: 600px)": {
    maxWidth: "580px",
    fontSize: "10pt",
  },

  "@media (min-width: 900px)": {
    maxWidth: "880px",
    fontSize: "12pt",
  },
});

const Footer = {
  Container: Container,
  Body: Body,
};

export default Footer;
