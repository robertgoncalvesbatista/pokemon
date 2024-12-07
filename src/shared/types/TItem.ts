import { Row } from "../interfaces/Row";

export type TItem = {
  attributes: Array<Row>;
  baby_trigger_for: { url: string } | null;
  category: Row;
  cost: number;
  effect_entries: Array<{
    effect: string;
    language: Row;
    short_effect: string;
  }>;
  flavor_text_entries: Array<{
    language: Row;
    text: string;
    version_group: Row;
  }>;
  fling_effect: Row;
  fling_power: number;
  game_indices: Array<{
    game_index: number;
    generation: Row;
  }>;
  held_by_pokemon: Array<{
    pokemon: Row;
    version_details: Array<{
      rarity: number;
      version: Row;
    }>;
  }>;
  id: number;
  machines: [];
  name: string;
  names: Array<{
    language: Row;
    name: string;
  }>;
  sprites: {
    default: string;
  };
};
