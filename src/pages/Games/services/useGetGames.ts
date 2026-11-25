"use server";

import { useEffect, useState } from "react";

import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";
import sortDataById from "@/domain/sortDataById";

import { Game } from "../domain/Game";

function useGetGames() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setError("");

    const fetchGames = async () => {
      try {
        const response: ResponseList = await requestWithCache("/generation?offset=0&limit=20", "generation");
        const results = await Promise.all(
          response.results.map((game) =>
            requestWithCache(game.url, "generation") as Promise<Game>
          )
        );

        if (isCurrentRequest) {
          setGames(sortDataById(results));
        }
      } catch (requestError) {
        console.error(requestError);
        if (isCurrentRequest) {
          setGames([]);
          setError("Não foi possível carregar as gerações. Tente novamente.");
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    fetchGames();
    return () => {
      isCurrentRequest = false;
    };
  }, []);

  return { games, isLoading, error };
}

export default useGetGames;
