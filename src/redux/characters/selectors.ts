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

export const selectCharactersPagesStatuses = createSelector(
  selectCharactersState,
  ({ pagesStatuses }) => pagesStatuses
);

export const selectShouldFetchPageSelector = createSelector(
  selectCharactersPagesStatuses,
  (pagesStatuses) => {
    return (page: number) => !pagesStatuses[page]?.content;
  }
);
