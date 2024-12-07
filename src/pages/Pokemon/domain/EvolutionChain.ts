import { Row } from "@/shared/interfaces/Row";

interface EvolutionDetails {
  gender: string | null;
  held_item: string | null;
  item: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: string | null;
  time_of_day: string | null;
  trade_species: string | null;
  trigger: Row;
  turn_upside_down: boolean;
}

export interface EvolvesTo {
  evolution_details?: Array<EvolutionDetails>;
  evolves_to?: Array<EvolvesTo>;
  is_baby: boolean;
  species: Row;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: EvolvesTo;
}
