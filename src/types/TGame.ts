import { TRow } from "./TRow";

export type TGame = {
  id: number;
  abilities: [];
  main_region: TRow;
  moves: Array<TRow>;
  name: string;
  names: Array<{
    language: TRow;
    name: string;
  }>;
  pokemon_species: Array<TRow>;
  types: Array<TRow>;
  version_groups: Array<TRow>;
};
