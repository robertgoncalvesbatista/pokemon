"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { TGame } from "@/shared/types/TGame";
import { Row } from "@/shared/interfaces/Row";
import { ResponseList } from "@/shared/interfaces/ResponseList";

import request from "@/infrastructure/api/request";

function useGetGamesList() {
  const [gameList, setGameList] = useState<Array<TGame>>([]);
  const [url, setUrl] = useState<string>("/generation?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(() => `/generation?offset=${page * 20 - 20}&limit=20`);
  }, []);

  const handleFetchgame = useCallback((responseData: ResponseList) => {
    setGameList([]);

    responseData.results.forEach(async (game: Row) => {
      // Verifica se a resposta já está no cache
      const cache = await caches.open("generation");
      const cachedResponse = await cache.match(game.url);

      if (cachedResponse) {
        // Se a resposta estiver no cache, retorna a resposta armazenada
        cachedResponse
          .json()
          .then((response: AxiosResponse<TGame>) => {
            setGameList((prevState) => {
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
        await request({ url: game.url })
          .then((response: AxiosResponse<TGame>) => {
            setGameList((prevState) => {
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
            cache.put(game.url, new Response(JSON.stringify(response)));
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      }
    });
  }, []);

  const handleFetchListGame = useCallback(async () => {
    // Verifica se a resposta já está no cache
    const cache = await caches.open("generation");
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      // Se a resposta estiver no cache, retorna a resposta armazenada
      cachedResponse
        .json()
        .then(async (response: AxiosResponse) => {
          setPrevUrl(response.data?.previous);
          setNextUrl(response.data?.next);

          handleFetchgame(response.data);
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

          handleFetchgame(response.data);

          // Armazena a resposta no cache
          cache.put(url, new Response(JSON.stringify(response)));
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [handleFetchgame, url]);

  useEffect(() => {
    handleFetchListGame();
  }, [handleFetchListGame]);

  return { gameList, prevUrl, nextUrl, handleChangePage };
}

export default useGetGamesList;
