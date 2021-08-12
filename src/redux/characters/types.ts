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
}

export interface UpdateCharactersPayload
  extends Required<CharacterState> {
  list: ReadonlyArray<Character>;
}

export interface UpdateCharactersAction extends UpdateCharactersPayload {
  type: CharactersActionType.UPDATE;
}
