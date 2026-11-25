import { styled } from "@stitches/react";

const CardStyled = styled("div", {
  background: "linear-gradient(145deg, #fff 0%, #eef4ff 100%)",
  minWidth: 0,
  gap: "16px",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #dde4ec",
  boxShadow: "0 10px 28px rgba(23, 34, 59, 0.08)",
  animation: "enter-up 420ms ease both",
  transition: "transform 180ms ease, box-shadow 180ms ease",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 34px rgba(23, 34, 59, 0.14)",
  },
});

export default CardStyled;
