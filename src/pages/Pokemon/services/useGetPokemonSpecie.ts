"use server";

import { useCallback, useEffect, useState } from "react";

import { Row } from "@/shared/interfaces/Row";

import requestWithCache from "@/domain/requestWithCache";

import { EvolutionChain } from "../domain/EvolutionChain";

interface UseGetPokemonSpecieProps {
  specie: Row;
}

function useGetPokemonSpecie({ specie }: UseGetPokemonSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();

  const handleFetchChain = useCallback(async (evolution_chain: Row) => {
    try {
      const result = await requestWithCache(evolution_chain.url, "pokemon");

      setEvolutionChain(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchSpecie = useCallback(async () => {
    try {
      const result = await requestWithCache(specie.url, "pokemon");

      handleFetchChain(result.evolution_chain);
    } catch (error) {
      console.error(error);
    }
  }, [handleFetchChain, specie.url]);

  useEffect(() => {
    handleFetchSpecie();
  }, [handleFetchSpecie]);

  return { evolutionChain };
}

export default useGetPokemonSpecie;
