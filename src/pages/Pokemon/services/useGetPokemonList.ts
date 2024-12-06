"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { TPokemon } from "@/types/TPokemon";
import { TRow } from "@/types/TRow";
import { TResponseList } from "@/types/TResponseList";

import { request } from "@/services/api";

function useGetPokemonList() {
  const [pokemonList, setPokemonList] = useState<Array<TPokemon>>([]);
  const [url, setUrl] = useState<string>("/pokemon?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(() => `/pokemon?offset=${page * 20 - 20}&limit=20`);
  }, []);

  const handleFetchPokemon = useCallback((responseData: TResponseList) => {
    setPokemonList([]);

    responseData.results.forEach(async (pokemon: TRow) => {
      // Verifica se a resposta já está no cache
      const cache = await caches.open("pokemon");
      const cachedResponse = await cache.match(pokemon.url);

      if (cachedResponse) {
        // Se a resposta estiver no cache, retorna a resposta armazenada
        cachedResponse
          .json()
          .then((response: AxiosResponse<TPokemon>) => {
            setPokemonList((prevState) => {
              const data = [...prevState, response.data];

              const sorted = data.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else if (a.id > b.id) {
                  return 1;
                }

                return 0;
              });

              return sorted;
            });
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      } else {
        await request({ url: pokemon.url })
          .then((response: AxiosResponse<TPokemon>) => {
            setPokemonList((prevState) => {
              const data = [...prevState, response.data];

              const sorted = data.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else if (a.id > b.id) {
                  return 1;
                }

                return 0;
              });

              return sorted;
            });

            // Armazena a resposta no cache
            cache.put(pokemon.url, new Response(JSON.stringify(response)));
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      }
    });
  }, []);

  const handleFetchListPokemon = useCallback(async () => {
    // Verifica se a resposta já está no cache
    const cache = await caches.open("pokemon");
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      // Se a resposta estiver no cache, retorna a resposta armazenada
      cachedResponse
        .json()
        .then(async (response: AxiosResponse) => {
          setPrevUrl(response.data?.previous);
          setNextUrl(response.data?.next);

          handleFetchPokemon(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        }); // Retorna a resposta em formato JSON
    } else {
      // Se não estiver no cache, faz a requisição com Axios
      await request({ url: url })
        .then((response: AxiosResponse) => {
          setPrevUrl(response.data.previous);
          setNextUrl(response.data.next);

          handleFetchPokemon(response.data);

          // Armazena a resposta no cache
          cache.put(url, new Response(JSON.stringify(response)));
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [handleFetchPokemon, url]);

  useEffect(() => {
    handleFetchListPokemon();
  }, [handleFetchListPokemon]);

  return { pokemonList, prevUrl, nextUrl, handleChangePage };
}

export default useGetPokemonList;
