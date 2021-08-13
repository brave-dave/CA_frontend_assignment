import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Character,
  fetchCharacters,
  selectCharactersPagesStatuses,
  selectCharactersPages,
} from "../../redux/characters";
import useEffectOnce from "../useEffectOnce";

type UsePageDataConfig = { currentPage: number };

interface PageDataSuccess {
  content: ReadonlyArray<Character>;
  pages?: number;
}

interface PageDataLoading {
  loading: true;
}

interface PageDataError {
  isNotFound: true;
}

type PageData = PageDataSuccess | PageDataError | PageDataLoading;

export default function usePageData({
  currentPage,
}: UsePageDataConfig): PageData {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const pages = useSelector(selectCharactersPages);
  const pageStatuses = useSelector(selectCharactersPagesStatuses);

  const pageStatus = React.useMemo(
    () => pageStatuses[currentPage] || { isNotFound: true, content: undefined },
    [pageStatuses, currentPage]
  );

  useEffectOnce(() => {
    (async () => {
      await dispatch(fetchCharacters(currentPage));
      setLoading(false);
    })();
  });

  if (loading) return { loading };

  const { isNotFound, content = [] } = pageStatus;
  if (isNotFound) return { isNotFound };

  return { content, pages };
}
