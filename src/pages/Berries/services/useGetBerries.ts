"use server";

import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";

import { Berry } from "@/shared/types/Berry";

import { Row } from "@/shared/interfaces/Row";
import { ResponseList } from "@/shared/interfaces/ResponseList";

import request from "@/infrastructure/api/request";

function useGetBerries() {
  const [berries, setBerries] = useState<Array<Berry>>([]);
  const [url, setUrl] = useState<string>("/berry?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleChangePage = useCallback((page: number = 1) => {
    setUrl(() => `/berry?offset=${page * 20 - 20}&limit=20`);
  }, []);

  const handleFetchBerry = useCallback((responseData: ResponseList) => {
    setBerries([]);

    responseData.results.forEach(async (berry: Row) => {
      // Verifica se a resposta já está no cache
      const cache = await caches.open("berry");
      const cachedResponse = await cache.match(berry.url);

      if (cachedResponse) {
        // Se a resposta estiver no cache, retorna a resposta armazenada
        cachedResponse
          .json()
          .then((response: AxiosResponse<Berry>) => {
            setBerries((prevState) => {
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
        await request({ url: berry.url })
          .then((response: AxiosResponse<Berry>) => {
            setBerries((prevState) => {
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
            cache.put(berry.url, new Response(JSON.stringify(response)));
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      }
    });
  }, []);

  const handleFetchListBerry = useCallback(async () => {
    // Verifica se a resposta já está no cache
    const cache = await caches.open("berry");
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      // Se a resposta estiver no cache, retorna a resposta armazenada
      cachedResponse
        .json()
        .then(async (response: AxiosResponse) => {
          setPrevUrl(response.data?.previous);
          setNextUrl(response.data?.next);

          handleFetchBerry(response.data);
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

          handleFetchBerry(response.data);

          // Armazena a resposta no cache
          cache.put(url, new Response(JSON.stringify(response)));
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [handleFetchBerry, url]);

  useEffect(() => {
    handleFetchListBerry();
  }, [handleFetchListBerry]);

  return { berries, prevUrl, nextUrl, handleChangePage };
}

export default useGetBerries;
