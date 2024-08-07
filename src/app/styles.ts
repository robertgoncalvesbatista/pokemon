import { styled } from "@stitches/react";

export const NavbarDashboard = styled("nav", {
  color: "#212529",
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
});

export const MainDashboard = styled("main", {
  margin: "0 auto",
  maxWidth: "1200px",
});

export const FlexboxDashboard = styled("div", {
  display: "flex",
  justifyContent: "center",

  gap: "1rem",
  flexWrap: "wrap",
});

export const CardDashboard = styled("div", {
  backgroundColor: "$$bgColor",

  display: "grid",
  justifyContent: "center",

  flexBasis: "250px",
  gridTemplateColumns: "1fr 1fr",

  padding: "1rem",
  borderRadius: "4px",

  transition: ".1s ease-in-out",

  "&:hover": {
    scale: 1.1,
    transition: ".1s ease-in-out",
  },
});

export const Chip = styled("div", {
  marginBottom: "0.5rem",
});

export const ChipText = styled("span", {
  backgroundColor: "#ffffff30",

  borderRadius: "25px",
  padding: "0.2rem 0.6rem",

  fontSize: "10pt",
  fontWeight: 400,

  textTransform: "capitalize",
});

export const TooltipDashboard = styled("div", {
  padding: "1rem 0",

  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});

export const ButtonDashboard = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "40px",
  height: "40px",

  fontSize: "18pt",

  border: "none",
  borderRadius: "50%",

  backgroundColor: "#6c757d",
  color: "#fff",

  transition: ".3s",

  "&:hover": { backgroundColor: "#adb5bd" },

  "&:disabled": {
    backgroundColor: "#ced4da",
  },
});

export const ImageDashboard = styled("img", {
  position: "relative",
});

export const MainPokemon = styled("main", {
  width: "100vw",
  height: "100vh",
});

export const CardPokemon = styled("div", {
  maxWidth: "1200px",

  margin: "0 auto",
  padding: "2rem",

  backgroundColor: "$$bgColor",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

  borderBottomLeftRadius: "50px",
  borderBottomRightRadius: "50px",
});

export const ContentPokemon = styled("div", {
  maxWidth: "1200px",

  padding: "0 2rem",
  margin: "2rem auto",

  display: "grid",
});

export const AboutPokemon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

export const StatusPokemon = styled("div", {
  maxWidth: "800px",
  width: "100%",
  margin: "0 auto",
});
