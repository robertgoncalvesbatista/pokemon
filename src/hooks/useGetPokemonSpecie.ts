"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { TRow } from "../types/TRow";
import { TPokemonSpecie } from "../types/TPokemonSpecie";
import { TEvolutionChain } from "../types/TEvolutionChain";

import { request } from "../services/api";

interface UseGetPokemonSpecieProps {
  specie: { name: string; url: string };
}

function useGetPokemonSpecie({ specie }: UseGetPokemonSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<TEvolutionChain>();

  const handleFetchChain = useCallback(
    async (evolution_chain: Omit<TRow, "name">) => {
      await request({ url: evolution_chain.url })
        .then((res: AxiosResponse<TEvolutionChain>) => {
          setEvolutionChain(res.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    },
    []
  );

  const handleFetchSpecie = useCallback(async () => {
    await request({ url: specie.url })
      .then((res: AxiosResponse<TPokemonSpecie>) => {
        handleFetchChain(res.data.evolution_chain);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }, [handleFetchChain, specie.url]);

  useEffect(() => {
    handleFetchSpecie();
  }, [handleFetchSpecie]);

  return { evolutionChain };
}

export default useGetPokemonSpecie;
