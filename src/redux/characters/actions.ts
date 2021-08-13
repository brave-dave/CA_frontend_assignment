import { ReduxThunkAction } from "..";
import fetchFromApi, { ApiEndpoint } from "../../api";
import { selectShouldFetchPageSelector } from "./selectors";
import {
  CharactersActionType,
  UpdateCharactersAction,
  UpdateCharactersCurrentPageAction,
  UpdateCharactersCurrentPagePayload,
  UpdateCharactersPayload,
} from "./types";

export function updateCharacters(
  payload: UpdateCharactersPayload
): UpdateCharactersAction {
  return { type: CharactersActionType.UPDATE, ...payload };
}

export function updateCharactersCurrentPage(
  payload: UpdateCharactersCurrentPagePayload
): UpdateCharactersCurrentPageAction {
  return { type: CharactersActionType.UPDATE_CURRENT_PAGE, ...payload };
}

export function fetchCharacters(currentPage: number): ReduxThunkAction {
  return async function fetchCharactersThunkAction(dispatch, getState) {
    const shouldFetchPageSelector = selectShouldFetchPageSelector(getState());
    const shouldFetchPage = shouldFetchPageSelector(currentPage);

    if (shouldFetchPage) {
      const { pages, results } = await fetchFromApi(
        ApiEndpoint.CHARACTERS,
        currentPage
      );
      dispatch(updateCharacters({ currentPage, pages, list: results }));
    } else {
      dispatch(updateCharactersCurrentPage({ currentPage }));
    }
  };
}
