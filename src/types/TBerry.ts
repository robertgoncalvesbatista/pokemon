import { TRow } from "./TRow";

export type TBerry = {
  id: number;
  name: string;
  firmness: TRow;
  growth_time: number;
  item: TRow;
  max_harvest: number;
  natural_gift_power: number;
  natural_gift_type: TRow;
  size: number;
  smoothness: number;
  soil_dryness: number;
  flavors: [
    {
      flavor: TRow;
      potency: number;
    }
  ];
};
