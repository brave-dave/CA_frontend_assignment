import React from "react";
import { useParams } from "react-router-dom";
import { PageParams } from "./types";

const characterUrl = "https://rickandmortyapi.com/api/character";

export default function useCharacterUrl() {
  const { page } = useParams<PageParams>();
  const url = React.useMemo(() => {
    if (page === undefined) return characterUrl;
    const pageNumber = Number(page);
    const pageIsInvalid = isNaN(pageNumber) || pageNumber < 1;
    return pageIsInvalid ? undefined : `${characterUrl}?page=${pageNumber}`;
  }, [page]);

  return url;
}
