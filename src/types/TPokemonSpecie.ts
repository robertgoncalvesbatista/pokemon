import { TRow } from "./TRow";

export type TPokemonSpecie = {
  base_happiness: number;
  capture_rate: number;
  color: TRow;
  egg_groups: Array<TRow>;
  evolution_chain: Omit<TRow, "name">;
  evolves_from_species: TRow;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: TRow;
    version: TRow;
  }>;
  form_descriptions: Array<string>;
  forms_switchable: boolean;
  gender_rate: number;
  genera: Array<{
    genus: string;
    language: TRow;
  }>;
  generation: TRow;
  growth_rate: TRow;
  habitat: TRow;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Array<{
    language: TRow;
    name: string;
  }>;
  order: number;
  pal_park_encounters: Array<{
    area: TRow;
    base_score: number;
    rate: number;
  }>;
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: TRow;
  }>;
  shape: TRow;
  varieties: Array<{
    is_default: boolean;
    pokemon: TRow;
  }>;
};
