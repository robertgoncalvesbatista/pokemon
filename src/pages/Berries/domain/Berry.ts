import { Row } from "@/shared/interfaces/Row";

export interface Berry {
  id: number;
  name: string;
  firmness: Row;
  growth_time: number;
  item: Row;
  max_harvest: number;
  natural_gift_power: number;
  natural_gift_type: Row;
  size: number;
  smoothness: number;
  soil_dryness: number;
  flavors: Array<{
    flavor: Row;
    potency: number;
  }>;
}
