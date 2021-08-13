import { ApiCharacter } from "../../api";
import { MappedList } from "../../types";

interface CharacterPropsToId {
  origin: number;
  location: number;
  episode: ReadonlyArray<number>;
}

export interface Character
  extends Omit<ApiCharacter, keyof CharacterPropsToId>,
    CharacterPropsToId {}

export interface CharacterPageStatusError {
  content?: undefined;
  isNotFound: true;
}
export interface CharacterPageStatusSuccess {
  content: ReadonlyArray<Character>;
  isNotFound?: undefined;
}

type CharacterPageStatus =
  | CharacterPageStatusSuccess
  | CharacterPageStatusError;

export type CharactersState = {
  currentPage: number;
  pages: number;
  pagesStatuses: MappedList<CharacterPageStatus>;
};

export enum CharactersActionType {
  UPDATE = "characters/update",
  UPDATE_CURRENT_PAGE = "characters/update_current_page",
  UPDATE_PAGE_NOT_FOUND = "characters/update_page_not_found",
}

export interface UpdateCharactersPayload
  extends Omit<Required<CharactersState>, "pagesStatuses"> {
  list: ReadonlyArray<ApiCharacter>;
}

export interface UpdateCharactersAction extends UpdateCharactersPayload {
  type: CharactersActionType.UPDATE;
}

export interface UpdateCharactersCurrentPagePayload
  extends Pick<CharactersState, "currentPage"> {}

export interface UpdateCharactersCurrentPageAction
  extends UpdateCharactersCurrentPagePayload {
  type: CharactersActionType.UPDATE_CURRENT_PAGE;
}

export interface UpdateCharactersPageNotFoundPayload {
  page: number;
}

export interface UpdateCharactersPageNotFoundAction
  extends UpdateCharactersPageNotFoundPayload {
  type: CharactersActionType.UPDATE_PAGE_NOT_FOUND;
}
