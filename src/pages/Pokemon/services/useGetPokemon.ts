"use server";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import requestWithCache from "@/domain/requestWithCache";

import { Pokemon } from "../domain/Pokemon";

function useGetPokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setError("");

    const fetchDetails = async () => {
      try {
        if (!id) {
          throw new Error("Não foi informado um Pokémon para carregar.");
        }

        const result = await requestWithCache("/pokemon/" + id, "pokemon");

        if (isCurrentRequest) setPokemon(result);
      } catch (requestError) {
        console.error(requestError);
        if (isCurrentRequest) {
          setPokemon(undefined);
          setError("Não foi possível carregar os dados deste Pokémon.");
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    fetchDetails();
    return () => {
      isCurrentRequest = false;
    };
  }, [id]);

  return { pokemon, isLoading, error };
}

export default useGetPokemon;
