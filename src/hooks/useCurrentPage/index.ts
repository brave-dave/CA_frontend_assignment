import React from "react";
import { useParams } from "react-router-dom";

type Params = {
  page?: string;
};

export default function useCurrentPage() {
  const { page } = useParams<Params>();
  const currentPage = React.useMemo(() => {
    if (!page) return 1;
    const pageNumber = Number(page);
    return pageNumber || undefined;
  }, [page]);

  return currentPage;
}
