import { TRow } from "./TRow";

type TEvolutionDetails = {
  gender: null;
  held_item: null;
  item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: TRow;
  turn_upside_down: boolean;
};

export type TEvolvesTo = {
  evolution_details?: Array<TEvolutionDetails>;
  evolves_to?: Array<TEvolvesTo>;
  is_baby: boolean;
  species: TRow;
};

export type TEvolutionChain = {
  id: number;
  baby_trigger_item: null;
  chain: TEvolvesTo;
};
