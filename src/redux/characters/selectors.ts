import { ReduxSelector } from "..";
import { CharacterState } from "./types";
import { createSelector } from "reselect";

export const selectCharactersState: ReduxSelector<CharacterState> = ({
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

export const selectCharactersList = createSelector(
  selectCharactersState,
  ({ list }) => list
);
