"use server";

import { useCallback, useEffect, useState } from "react";

import { Row } from "@/shared/interfaces/Row";
import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";

import { Pokemon } from "../domain/Pokemon";

function sorting(data: any[]) {
  return data.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    }

    return 0;
  });
}

function useGetPokemons() {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [url, setUrl] = useState<string>("/pokemon?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(`/pokemon?offset=${page * 20 - 20}&limit=20`);
  }, []);

  const handleFetchDetails = useCallback((responseData: ResponseList) => {
    setPokemons([]);

    responseData.results.forEach(async (pokemon: Row) => {
      try {
        const result = await requestWithCache(pokemon.url, "pokemon");

        setPokemons((prevState) => {
          return sorting([...prevState, result]);
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const handleFetchList = useCallback(async () => {
    try {
      const result = await requestWithCache(url, "pokemon");

      setPrevUrl(result?.previous);
      setNextUrl(result?.next);

      handleFetchDetails(result);
    } catch (error) {
      console.error(error);
    }
  }, [handleFetchDetails, url]);

  useEffect(() => {
    handleFetchList();
  }, [handleFetchList]);

  return { pokemons, prevUrl, nextUrl, handleChangePage };
}

export default useGetPokemons;
