"use server";

import { useCallback, useEffect, useState } from "react";

import requestWithCache from "@/domain/requestWithCache";

import { Pokemon } from "../domain/Pokemon";

function useGetPokemon(id?: string | number) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const handleFetchDetails = useCallback(async () => {
    try {
      const result = await requestWithCache("/pokemon/" + id, "pokemon");

      setPokemon(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleFetchDetails();
  }, [handleFetchDetails]);

  return { pokemon };
}

export default useGetPokemon;
