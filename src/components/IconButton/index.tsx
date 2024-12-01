import React from "react";
import { IconType } from "react-icons";

import { Button } from "./styles";

interface IconButtonProps {
  icon: IconType;
  disabled?: boolean;
  onClick?: React.JSX.MouseEventHandler<HTMLButtonElement>;
}

function IconButton({ icon, disabled, onClick }: IconButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {React.createElement(icon, { size: 20 })}
    </Button>
  );
}

export default IconButton;
