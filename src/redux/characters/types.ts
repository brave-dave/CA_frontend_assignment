import { MappedList } from "../../types";

export type CharacterState = {
  currentPage?: number;
  pages?: number;
  list: MappedList<Character>;
};

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: number;
  location: number;
  image: string;
  episode: ReadonlyArray<number>;
}

export enum CharactersActionType {
  UPDATE = "characters/update",
  UPDATE_CURRENT_PAGE = "characters/update_current_page",
}

export interface UpdateCharactersPayload extends Required<CharacterState> {
  list: ReadonlyArray<Character>;
}

export interface UpdateCharactersAction extends UpdateCharactersPayload {
  type: CharactersActionType.UPDATE;
}

export interface UpdateCharactersCurrentPagePayload
  extends Pick<CharacterState, "currentPage"> {}

export interface UpdateCharactersCurrentPageAction
  extends UpdateCharactersCurrentPagePayload {
  type: CharactersActionType.UPDATE_CURRENT_PAGE;
}
