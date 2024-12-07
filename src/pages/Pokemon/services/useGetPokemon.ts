"use server";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import requestWithCache from "@/domain/requestWithCache";

import { Pokemon } from "../domain/Pokemon";

function useGetPokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>();

  const handleFetchDetails = useCallback(async () => {
    try {
      if (!id) {
        throw new Error("Erro: Consulta sem sucesso");
      }

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
