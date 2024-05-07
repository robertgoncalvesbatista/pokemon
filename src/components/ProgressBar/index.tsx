import { TypeStatus } from "../../enums/TypeStatus";

import {
  ContainerProgreesBar,
  BarBackProgressBar,
  BarFrontProgressBar,
  ValueProgressBar,
  SpanProgressBar,
} from "./styles";

interface IProps {
  name: string;
  value: number;
  max: number;
}

export default function ProgressBar({ name, value, max }: IProps) {
  // @ts-ignore
  const status = TypeStatus[name];
  const percentage = (value * 100) / max;

  return (
    <ContainerProgreesBar>
      <SpanProgressBar>{status}</SpanProgressBar>

      <BarBackProgressBar>
        <BarFrontProgressBar css={{ $$percentage: `${percentage}%` }} />
      </BarBackProgressBar>

      <ValueProgressBar>{value}/300</ValueProgressBar>
    </ContainerProgreesBar>
  );
}
