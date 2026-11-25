"use client";

import { TypeStatus } from "@/shared/enums/TypeStatus";

import {
  ContainerProgreesBar,
  BarBackProgressBar,
  BarFrontProgressBar,
  ValueProgressBar,
  SpanProgressBar,
} from "./styles";

interface ProgressBarProps {
  name: string;
  value: number;
  max: number;
}

function ProgressBar({ name, value, max }: ProgressBarProps) {
  const status = TypeStatus[name as keyof typeof TypeStatus] ?? name;
  const percentage = Math.min(100, (value * 100) / max);

  return (
    <ContainerProgreesBar role="meter" aria-label={status} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <SpanProgressBar>{status}</SpanProgressBar>

      <BarBackProgressBar>
        <BarFrontProgressBar css={{ $$percentage: `${percentage}%` }} />
      </BarBackProgressBar>

      <ValueProgressBar>{value}/{max}</ValueProgressBar>
    </ContainerProgreesBar>
  );
}

export default ProgressBar;
