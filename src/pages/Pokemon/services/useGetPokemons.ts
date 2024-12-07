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

  const [search, setSearch] = useState<string>("");
  const [searchTemp, setSearchTemp] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(`/pokemon?offset=${page * 20 - 20}&limit=20`);
  }, []);

  // Pesquisa de pokemon
  const handleSearchPokemon = useCallback(async () => {
    setPokemons([]);

    try {
      const result = await requestWithCache("/pokemon/" + search, "pokemon");

      setPokemons([result]);
    } catch (error) {
      console.error(error);
    }
  }, [search]);

  useEffect(() => {
    if (!!search) {
      handleSearchPokemon();
    }
  }, [search, handleSearchPokemon]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearch(searchTemp);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchTemp, setSearch]);

  // Listagem de pokemon
  const handleFetchPokemon = useCallback((responseData: ResponseList) => {
    setPokemons([]);

    responseData.results.forEach(async (pokemon) => {
      try {
        const result = await requestWithCache(pokemon.url, "pokemon");

        setPokemons((prevState) => {
          return sortDataById([...prevState, result]);
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const handleFetchPokemons = useCallback(async () => {
    try {
      const result = await requestWithCache(url, "pokemon");

      setPrevUrl(result?.previous);
      setNextUrl(result?.next);

      handleFetchPokemon(result);
    } catch (error) {
      console.error(error);
    }
  }, [url, handleFetchPokemon]);

  useEffect(() => {
    if (!searchTemp) {
      handleFetchPokemons();
    }
  }, [searchTemp, handleFetchPokemons]);

  return { pokemons, prevUrl, nextUrl, handleChangePage, setSearchTemp };
}

export default useGetPokemons;
