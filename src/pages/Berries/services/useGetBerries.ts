"use server";

import { useEffect, useState } from "react";

import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";
import sortDataById from "@/domain/sortDataById";

import { Berry } from "../domain/Berry";

function useGetBerries() {
  const [berries, setBerries] = useState<Array<Berry>>([]);
  const [url, setUrl] = useState<string>("/berry?offset=0&limit=20");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleChangePage = (page: number = 1) => {
    setUrl(`/berry?offset=${Math.max(0, page * 20 - 20)}&limit=20`);
  };

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setError("");

    const fetchBerries = async () => {
      try {
        const response: ResponseList = await requestWithCache(url, "berry");
        const results = await Promise.all(
          response.results.map((berry) =>
            requestWithCache(berry.url, "berry") as Promise<Berry>
          )
        );

        if (isCurrentRequest) {
          setBerries(sortDataById(results));
          setCount(response.count);
          setPrevUrl(response.previous ?? "");
          setNextUrl(response.next ?? "");
        }
      } catch (requestError) {
        console.error(requestError);
        if (isCurrentRequest) {
          setBerries([]);
          setError("Não foi possível carregar as berries. Tente novamente.");
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    fetchBerries();
    return () => {
      isCurrentRequest = false;
    };
  }, [url]);

  return { berries, prevUrl, nextUrl, count, isLoading, error, handleChangePage };
}

export default useGetBerries;
