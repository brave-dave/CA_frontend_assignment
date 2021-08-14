import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Character,
  fetchCharacters,
  selectCharactersPagesStatuses,
  selectCharactersPages,
} from "../../redux/characters";
import useEffectOnce from "../useEffectOnce";

type UsePageDataConfig = { page?: number };

interface PageDataSuccess {
  content: ReadonlyArray<Character>;
  pages?: number;
  currentPage: number;
}

interface PageDataLoading {
  loading: true;
}

interface PageDataError {
  isNotFound: true;
}

type PageData = PageDataSuccess | PageDataError | PageDataLoading;

export default function usePageData({
  page: currentPage,
}: UsePageDataConfig): PageData {
  const dispatch = useDispatch();
  const pages = useSelector(selectCharactersPages);
  const pageStatuses = useSelector(selectCharactersPagesStatuses);

  const pageStatus = React.useMemo(
    () => currentPage && pageStatuses[currentPage],
    [pageStatuses, currentPage]
  );

  React.useEffect(() => {
    currentPage && dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  if (!pageStatus) return { loading: true };

  const { isNotFound, content = [] } = pageStatus;
  if (isNotFound || !currentPage) return { isNotFound: true };

  return { content, pages, currentPage };
}

export function isPageDataLoading(
  pageData: PageData
): pageData is PageDataLoading {
  return pageData.hasOwnProperty("loading");
}

export function isPageDataNotFound(
  pageData: PageData
): pageData is PageDataError {
  return pageData.hasOwnProperty("isNotFound");
}
