import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import PaginationArrow from "./PaginationArrow";
import PaginationButton from "./PaginationButton";
import { PageButtonsProps } from "./types";
import usePageButtons from "./usePageButtons";

const useStyles = makeStyles((theme) => ({
  paginationPages: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: `${theme.spacing(3)}px 0`,
  },
}));

function getPagePath(page: string) {
  const pageNumber = Number(page);
  if (pageNumber) return `/page-${pageNumber}`;
}

function getPreviousPagePath(currentPage: number) {
  if (currentPage > 1) return getPagePath(`${currentPage - 1}`);
}

function getNextPagePath(currentPage: number, pages: number) {
  if (currentPage < pages) return getPagePath(`${currentPage + 1}`);
}

const PaginationPages = React.memo<PageButtonsProps>(
  ({ currentPage, pages }) => {
    const classes = useStyles();
    const pageButtons = usePageButtons({ currentPage, pages });
    const previousPagePath = React.useMemo(
      () => getPreviousPagePath(currentPage),
      [currentPage]
    );
    const nextPagePath = React.useMemo(
      () => getNextPagePath(currentPage, pages),
      [currentPage, pages]
    );

    return (
      <Box className={classes.paginationPages}>
        <PaginationArrow direction="back" path={previousPagePath} />
        {pageButtons.map((page, index) => (
          <PaginationButton
            key={`${page}-${index}`}
            active={page === `${currentPage}`}
            path={getPagePath(page)}
          >
            {page}
          </PaginationButton>
        ))}
        <PaginationArrow direction="forward" path={nextPagePath} />
      </Box>
    );
  }
);

type PaginationProps = React.PropsWithChildren<PageButtonsProps>;

export function Pagination({ children, ...props }: PaginationProps) {
  return (
    <>
      <PaginationPages {...props} />
      {children}
      <PaginationPages {...props} />
    </>
  );
}
