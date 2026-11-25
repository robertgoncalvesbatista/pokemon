"use server";

import { useCallback, useEffect, useState } from "react";

import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";
import sortDataById from "@/domain/sortDataById";

import { Pokemon } from "../domain/Pokemon";

function useGetPokemons() {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [url, setUrl] = useState<string>("/pokemon?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const [searchTemp, setSearchTemp] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(`/pokemon?offset=${Math.max(0, page * 20 - 20)}&limit=20`);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearch(searchTemp.trim().toLowerCase());
    }, 350);

    return () => clearTimeout(debounce);
  }, [searchTemp]);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchPokemons = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (search) {
          const searchTerm = /^\d+$/.test(search) ? String(Number(search)) : search;
          const result = await requestWithCache(`/pokemon/${searchTerm}`, "pokemon");
          if (isCurrentRequest) {
            setPokemons([result]);
            setCount(1);
            setPrevUrl("");
            setNextUrl("");
          }
          return;
        }

        const response: ResponseList = await requestWithCache(url, "pokemon");
        const results = await Promise.all(
          response.results.map((pokemon) =>
            requestWithCache(pokemon.url, "pokemon") as Promise<Pokemon>
          )
        );

        if (isCurrentRequest) {
          setPokemons(sortDataById(results));
          setCount(response.count);
          setPrevUrl(response.previous ?? "");
          setNextUrl(response.next ?? "");
        }
      } catch (requestError) {
        console.error(requestError);
        if (isCurrentRequest) {
          setPokemons([]);
          setError(search ? "Nenhum Pokémon encontrado. Confira o nome ou número." : "Não foi possível carregar os Pokémon. Tente novamente.");
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    fetchPokemons();
    return () => {
      isCurrentRequest = false;
    };
  }, [search, url]);

  return {
    pokemons,
    prevUrl,
    nextUrl,
    count,
    isLoading,
    error,
    handleChangePage,
    setSearchTemp,
  };
}

export default useGetPokemons;
