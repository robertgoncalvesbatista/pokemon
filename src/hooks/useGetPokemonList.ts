"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { TPokemon, TPokemonList } from "../types/TPokemon";
import { TRow } from "../types/TRow";

import { request } from "../services/api";

function useGetPokemonList() {
  const [pokemonList, setPokemonList] = useState<Array<TPokemon>>([]);
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchPokemon = useCallback((responseData: TPokemonList) => {
    setPokemonList([]);

    responseData.results.forEach(async (pokemon: TRow) => {
      await request({ url: pokemon.url })
        .then((res: AxiosResponse<TPokemon>) => {
          setPokemonList((prevState) => [...prevState, res.data]);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    });
  }, []);

  const handleFetchListPokemon = useCallback(async () => {
    setLoading(true);

    await request({ url: url })
      .then((res: AxiosResponse) => {
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);

        handleFetchPokemon(res.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, [handleFetchPokemon, url]);

  useEffect(() => {
    handleFetchListPokemon();
  }, [handleFetchListPokemon]);

  return { pokemonList, loading, prevUrl, nextUrl, setLoading, setUrl };
}

export default useGetPokemonList;
