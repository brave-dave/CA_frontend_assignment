import React from "react";
import createArray from "../../utils/createArray";
import { PageButtonsProps } from "./types";

const maxButtons = 7;
const firstHalfMaxLength = Math.floor(maxButtons / 2);
const secondHalfMaxLength = firstHalfMaxLength + 1;

function getMiddlePageNumber({ currentPage, pages }: PageButtonsProps) {
  const greatestMiddlePage = pages - firstHalfMaxLength;
  if (currentPage > greatestMiddlePage) return greatestMiddlePage;
  if (currentPage < secondHalfMaxLength) return secondHalfMaxLength;
  return currentPage;
}

interface PagesGetterProps extends PageButtonsProps {
  middlePage: number;
}

function getFirstHalf({ pages, middlePage }: PagesGetterProps) {
  const buttons = Math.min(pages, firstHalfMaxLength);
  return createArray(buttons, (index) => {
    switch (index) {
      case 0:
        return "1";
      case 1:
        return middlePage > secondHalfMaxLength ? "..." : "2";
      default:
        return middlePage > secondHalfMaxLength ? `${middlePage - 1}` : "3";
    }
  });
}

function getSecondHalf({ currentPage, pages, middlePage }: PagesGetterProps) {
  const buttons = Math.min(pages - firstHalfMaxLength, secondHalfMaxLength);
  const greatestMiddlePage = pages - firstHalfMaxLength;
  return createArray(buttons, (index) => {
    switch (index) {
      case 0:
        return `${middlePage}`;
      case 1:
        return currentPage < greatestMiddlePage
          ? `${middlePage + 1}`
          : `${pages - 2}`;
      case 2:
        return middlePage < greatestMiddlePage ? "..." : `${pages - 1}`;
      default:
        return `${pages}`;
    }
  });
}

export default function usePageButtons({
  pages,
  currentPage,
}: PageButtonsProps) {
  const [pageButtons, setPageButtons] = React.useState<ReadonlyArray<string>>(
    []
  );
  const pagesGetterProps = React.useMemo(
    () => ({
      pages,
      currentPage,
      middlePage: getMiddlePageNumber({ pages, currentPage }),
    }),
    [pages, currentPage]
  );

  React.useEffect(() => {
    const firstHalf = getFirstHalf(pagesGetterProps);

    if (pages < secondHalfMaxLength) {
      setPageButtons(firstHalf);
    } else {
      const secondHalf = getSecondHalf(pagesGetterProps);
      setPageButtons([...firstHalf, ...secondHalf]);
    }
  }, [pages, pagesGetterProps]);

  return pageButtons;
}
