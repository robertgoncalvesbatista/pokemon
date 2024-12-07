"use client";

import { styled } from "@stitches/react";

export const ScreenStyled = styled("main", {
  minHeight: "100vh",

  backgroundColor: "#eab646",

  display: "flex",
  alignItems: "center",
});

export const BotaoStyled = styled("button", {
  padding: "0.5rem",

  border: "1px solid #212529",
  borderRadius: "8px",

  background: "#f8f9fa",
  color: "#212529",

  minWidth: "80px",

  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  flexDirection: "column",

  cursor: "pointer",

  transition: ".1s ease-in-out",

  "&:hover": {
    transform: "translateY(-4px)",
    transition: ".1s ease-in-out",
  },

  variants: {
    disabled: {
      true: {
        background: "#e9ecef",
        color: "#6c757d",
        border: "1px solid #6c757d",
        cursor: "default",

        transition: "initial",

        "&:hover": {
          transform: "initial",
          transition: "initial",
        },
      },
    },
  },
});

export const ButtonGroupStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",

  borderRadius: "8px",

  padding: "0.75rem 0",
  margin: "2rem auto 0",
});

export const MainStyled = styled("div", {
  margin: "0 auto",
  maxWidth: "280px",

  "@media (min-width: 600px)": {
    maxWidth: "580px",
  },

  "@media (min-width: 900px)": {
    maxWidth: "880px",
  },
});

export const FooterStyled = styled("div", {
  padding: "1rem 0",
  width: "100%",
  position: "absolute",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
});

export const WrapperStyled = styled("div", {
  padding: "0 0 2rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  gap: "1rem",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "0.5fr 3fr",
  },
});

export const FooterBody = styled("div", {
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
