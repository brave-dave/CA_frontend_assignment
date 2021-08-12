import React from "react";
import useDataFromUrl from "../useDataFromUrl";
import {
  CharacterResponseData,
  PageData,
  CharacterResponseDataResults,
  Characters,
  CharacterResponseDataError,
} from "./types";
import useCharacterUrlAndPage from "../useCharacterUrlAndPage";

const initialPageData: PageData = {
  characters: [],
  pages: 0,
  loading: true,
};

const errorPageData: PageData = {
  ...initialPageData,
  loading: false,
  isNotFound: true,
};

function mapCharactersResults(
  results: CharacterResponseDataResults
): Characters {
  return results.map((character) => ({
    ...character,
    origin: character.origin.url,
    location: character.location.url,
  }));
}

function isResponseDataError(
  data: CharacterResponseData
): data is CharacterResponseDataError {
  return data.hasOwnProperty("error");
}

export default function usePageData(): PageData {
  const url = useCharacterUrlAndPage();
  const data = useDataFromUrl<CharacterResponseData>(url);
  const pageData = React.useMemo<PageData>(() => {
    if (!url) return errorPageData;
    if (!data) return initialPageData;
    if (isResponseDataError(data)) return errorPageData;
    const { results, info } = data;
    const { pages } = info;
    const characters = mapCharactersResults(results);

    return { pages, characters, loading: false };
  }, [url, data]);

  return pageData;
}
