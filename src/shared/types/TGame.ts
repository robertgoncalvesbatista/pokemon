import { Row } from "../interfaces/Row";

export type TGame = {
  id: number;
  abilities: [];
  main_region: Row;
  moves: Array<Row>;
  name: string;
  names: Array<{
    language: Row;
    name: string;
  }>;
  pokemon_species: Array<Row>;
  types: Array<Row>;
  version_groups: Array<Row>;
};
