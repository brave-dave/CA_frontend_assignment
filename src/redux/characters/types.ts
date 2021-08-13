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

export type CharactersState = {
  currentPage?: number;
  pages?: number;
  pagesContent: MappedList<ReadonlyArray<Character>>;
};

export enum CharactersActionType {
  UPDATE = "characters/update",
  UPDATE_CURRENT_PAGE = "characters/update_current_page",
}

export interface UpdateCharactersPayload
  extends Omit<Required<CharactersState>, "pagesContent"> {
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
