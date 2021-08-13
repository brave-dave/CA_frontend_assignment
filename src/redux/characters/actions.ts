import { ReduxThunkAction } from "..";
import fetchFromApi, { ApiEndpoint, isApiDataError } from "../../api";
import { selectShouldFetchPageSelector } from "./selectors";
import {
  CharactersActionType,
  UpdateCharactersAction,
  UpdateCharactersCurrentPageAction,
  UpdateCharactersCurrentPagePayload,
  UpdateCharactersPageNotFoundAction,
  UpdateCharactersPageNotFoundPayload,
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

export function updateCharactersPageNotFound(
  payload: UpdateCharactersPageNotFoundPayload
): UpdateCharactersPageNotFoundAction {
  return { type: CharactersActionType.UPDATE_PAGE_NOT_FOUND, ...payload };
}

export function fetchCharacters(currentPage: number): ReduxThunkAction {
  return async function fetchCharactersThunkAction(dispatch, getState) {
    const shouldFetchPageSelector = selectShouldFetchPageSelector(getState());
    const shouldFetchPage = shouldFetchPageSelector(currentPage);

    if (shouldFetchPage) {
      const response = await fetchFromApi(ApiEndpoint.CHARACTERS, currentPage);
      if (isApiDataError(response)) {
        dispatch(updateCharactersPageNotFound({ page: currentPage }));
        return;
      }
      const { pages, results } = response;
      dispatch(updateCharacters({ currentPage, pages, list: results }));
    } else {
      dispatch(updateCharactersCurrentPage({ currentPage }));
    }
  };
}
