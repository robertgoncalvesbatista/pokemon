import React from "react";
import { IconType } from "react-icons";

import { Button } from "./styles";

interface IconButtonProps {
  icon: IconType;
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: React.JSX.MouseEventHandler<HTMLButtonElement>;
  style?:
    | string
    | React.JSX.CSSProperties
    | React.JSX.SignalLike<string | React.JSX.CSSProperties | undefined>
    | undefined;
}

function IconButton({ icon, disabled, onClick, style, "aria-label": ariaLabel }: IconButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick} style={style} aria-label={ariaLabel}>
      {React.createElement(icon, { size: 20 })}
    </Button>
  );
}

export default IconButton;
