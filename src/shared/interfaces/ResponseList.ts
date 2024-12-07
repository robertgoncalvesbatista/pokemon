import { Row } from "./Row";

export interface ResponseList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Row>;
}
