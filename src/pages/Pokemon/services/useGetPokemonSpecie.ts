"use server";

import { useEffect, useState } from "react";

import { Row } from "@/shared/interfaces/Row";

import requestWithCache from "@/domain/requestWithCache";

import { EvolutionChain } from "../domain/EvolutionChain";

interface PokemonSpeciesData {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: Row;
  }>;
  habitat: Row | null;
  generation: Row;
  capture_rate: number;
  base_happiness: number;
  egg_groups: Array<Row>;
}

interface UseGetPokemonSpecieProps {
  specie: Row;
}

function useGetPokemonSpecie({ specie }: UseGetPokemonSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCurrentRequest = true;
    setEvolutionChain(undefined);
    setSpeciesData(undefined);
    setIsLoading(true);
    setError("");

    const fetchSpecies = async () => {
      try {
        const result = await requestWithCache(specie.url, "pokemon");
        if (!isCurrentRequest) return;

        setSpeciesData(result);
        const chain = await requestWithCache(result.evolution_chain.url, "pokemon");
        if (isCurrentRequest) setEvolutionChain(chain);
      } catch (error) {
        console.error(error);
        if (isCurrentRequest) setError("Não foi possível carregar todos os dados da espécie.");
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    fetchSpecies();
    return () => {
      isCurrentRequest = false;
    };
  }, [specie.url]);

  return { evolutionChain, speciesData, isLoading, error };
}

export default useGetPokemonSpecie;
