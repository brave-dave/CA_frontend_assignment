import React from "react";
import { useParams } from "react-router-dom";
import { PageParams } from "./types";

const characterUrl = "https://rickandmortyapi.com/api/character";

export default function useCharacterUrlAndPage() {
  const { page } = useParams<PageParams>();
  const pageNumber = React.useMemo(() => {
    if (page === undefined) return 1;
    const pageNumberValue = Number(page);
    const pageIsInvalid = isNaN(pageNumberValue) || pageNumberValue < 1;
    return pageIsInvalid ? undefined : pageNumberValue;
  }, [page]);

  const url = React.useMemo(
    () => (pageNumber ? `${characterUrl}?page=${pageNumber}` : undefined),
    [pageNumber]
  );

  return { url, pageNumber };
}
