import { styled } from "@stitches/react";

export const ChipStyled = styled("div", {
  marginBottom: "6px",
});

export const ChipTextStyled = styled("span", {
  variants: {
    variant: {
      outlined: {
        border: "1px solid $$color",
      },
      contained: {
        backgroundColor: "#fff",
      },
    },
  },

  color: "$$color",

  fontSize: "9pt",
  fontWeight: 700,

  display: "inline-block",
  /* ou defina um valor específico de largura */
  maxWidth: "100%",
  /* impede quebra de linha */
  whiteSpace: "nowrap",
  /* oculta o excesso de texto */
  overflow: "hidden",
  /* adiciona "..." no final do texto que ultrapassar o limite */
  textOverflow: "ellipsis",

  textTransform: "capitalize",

  padding: "0.2rem 0.6rem",
  borderRadius: "25px",
});
