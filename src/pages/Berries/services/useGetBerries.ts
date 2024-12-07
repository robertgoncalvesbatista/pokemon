"use server";

import { useCallback, useEffect, useState } from "react";

import { ResponseList } from "@/shared/interfaces/ResponseList";

import requestWithCache from "@/domain/requestWithCache";
import sortDataById from "@/domain/sortDataById";

import { Berry } from "../domain/Berry";

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

    responseData.results.forEach(async (berry) => {
      try {
        const result = await requestWithCache(berry.url, "berry");

        setBerries((prevState) => {
          return sortDataById([...prevState, result]);
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const handleFetchBerries = useCallback(async () => {
    try {
      const result = await requestWithCache(url, "berry");

      setPrevUrl(result?.previous);
      setNextUrl(result?.next);

      handleFetchBerry(result);
    } catch (error) {
      console.error(error);
    }
  }, [handleFetchBerry, url]);

  useEffect(() => {
    handleFetchBerries();
  }, [handleFetchBerries]);

  return { berries, prevUrl, nextUrl, handleChangePage };
}

export default useGetBerries;
