"use server";

import { useCallback, useEffect, useState } from "react";

import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";
import sortDataById from "@/domain/sortDataById";

import { Game } from "../domain/Game";

function useGetGames() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [url, setUrl] = useState<string>("/generation?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(() => `/generation?offset=${page * 20 - 20}&limit=20`);
  }, []);

  const handleFetchGame = useCallback((responseData: ResponseList) => {
    setGames([]);

    responseData.results.forEach(async (game) => {
      try {
        const result = await requestWithCache(game.url, "generation");

        setGames((prevState) => {
          return sortDataById([...prevState, result]);
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const handleFetchGames = useCallback(async () => {
    try {
      const result = await requestWithCache(url, "generation");

      setPrevUrl(result?.previous);
      setNextUrl(result?.next);

      handleFetchGame(result);
    } catch (error) {
      console.error(error);
    }
  }, [handleFetchGame, url]);

  useEffect(() => {
    handleFetchGames();
  }, [handleFetchGames]);

  return { games, prevUrl, nextUrl, handleChangePage };
}

export default useGetGames;
