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
