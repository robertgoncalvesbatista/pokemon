import { TRow } from "./TRow";

export type TItem = {
  attributes: TRow[];
  baby_trigger_for: { url: string } | null;
  category: TRow;
  cost: number;
  effect_entries: Array<{
    effect: string;
    language: TRow;
    short_effect: string;
  }>;
  flavor_text_entries: Array<{
    language: TRow;
    text: string;
    version_group: TRow;
  }>;
  fling_effect: TRow;
  fling_power: number;
  game_indices: Array<{
    game_index: number;
    generation: TRow;
  }>;
  held_by_pokemon: Array<{
    pokemon: TRow;
    version_details: Array<{
      rarity: number;
      version: TRow;
    }>;
  }>;
  id: number;
  machines: [];
  name: string;
  names: Array<{
    language: TRow;
    name: string;
  }>;
  sprites: {
    default: string;
  };
};
