import { PropsWithChildren } from "react";

import { ChipTextStyled, ChipStyled } from "./styles";

interface ChipProps extends PropsWithChildren {
  variant?: "outlined" | "contained";
}

function Chip({ children, variant = "outlined" }: ChipProps) {
  return (
    <ChipStyled>
      <ChipTextStyled variant={variant}>{children}</ChipTextStyled>
    </ChipStyled>
  );
}

export default Chip;
