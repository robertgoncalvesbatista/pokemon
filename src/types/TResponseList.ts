import { TRow } from "./TRow";

export type TResponseList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<TRow>;
};
