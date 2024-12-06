"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { TRow } from "@/types/TRow";
import { TPokemonSpecie } from "@/types/TPokemonSpecie";
import { TEvolutionChain } from "@/types/TEvolutionChain";

import { request } from "@/services/api";

interface UseGetPokemonSpecieProps {
  specie: { name: string; url: string };
}

function useGetPokemonSpecie({ specie }: UseGetPokemonSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<TEvolutionChain>();

  const handleFetchChain = useCallback(
    async (evolution_chain: Omit<TRow, "name">) => {
      // Verifica se a resposta já está no cache
      const cache = await caches.open("pokemon");
      const cachedResponse = await cache.match(evolution_chain.url);

      if (cachedResponse) {
        // Se a resposta estiver no cache, retorna a resposta armazenada
        cachedResponse
          .json()
          .then((response: AxiosResponse<TEvolutionChain>) => {
            setEvolutionChain(response.data);
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      } else {
        await request({ url: evolution_chain.url })
          .then((response: AxiosResponse<TEvolutionChain>) => {
            setEvolutionChain(response.data);

            // Armazena a resposta no cache
            cache.put(
              evolution_chain.url,
              new Response(JSON.stringify(response))
            );
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      }
    },
    []
  );

  const handleFetchSpecie = useCallback(async () => {
    // Verifica se a resposta já está no cache
    const cache = await caches.open("pokemon");
    const cachedResponse = await cache.match(specie.url);

    if (cachedResponse) {
      // Se a resposta estiver no cache, retorna a resposta armazenada
      cachedResponse
        .json()
        .then((response: AxiosResponse<TPokemonSpecie>) => {
          handleFetchChain(response.data.evolution_chain);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    } else {
      await request({ url: specie.url })
        .then((response: AxiosResponse<TPokemonSpecie>) => {
          handleFetchChain(response.data.evolution_chain);

          console.log(response.data);

          // Armazena a resposta no cache
          cache.put(specie.url, new Response(JSON.stringify(response)));
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [handleFetchChain, specie.url]);

  useEffect(() => {
    handleFetchSpecie();
  }, [handleFetchSpecie]);

  return { evolutionChain };
}

export default useGetPokemonSpecie;
