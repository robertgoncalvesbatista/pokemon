import React, { PropsWithChildren } from "react";

import { ChipTextStyled, ChipStyled } from "./styles";

interface ChipProps extends PropsWithChildren {
  variant?: "outlined" | "contained";
  style?:
    | string
    | React.JSX.CSSProperties
    | React.JSX.SignalLike<string | React.JSX.CSSProperties | undefined>
    | undefined;
  color?: string;
}

function Chip({
  children,
  variant = "outlined",
  color = "#000",
  style,
}: ChipProps) {
  return (
    <ChipStyled style={style}>
      <ChipTextStyled variant={variant} css={{ $$color: color }}>
        {children}
      </ChipTextStyled>
    </ChipStyled>
  );
}

export default Chip;
