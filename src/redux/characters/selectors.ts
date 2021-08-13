import { ReduxSelector } from "..";
import { CharactersState } from "./types";
import { createSelector } from "reselect";

export const selectCharactersState: ReduxSelector<CharactersState> = ({
  characters,
}) => characters;

export const selectCharactersCurrentPage = createSelector(
  selectCharactersState,
  ({ currentPage }) => currentPage
);

export const selectCharactersPages = createSelector(
  selectCharactersState,
  ({ pages }) => pages
);

export const selectCharactersPageContent = createSelector(
  selectCharactersState,
  ({ pagesContent }) => pagesContent
);

export const selectShouldFetchPageSelector = createSelector(
  selectCharactersPageContent,
  (pagesContent) => {
    return (page: number) => !pagesContent[page];
  }
);
