import { MappedList } from "../../types";

export type CharacterState = {
  currentPage?: number;
  pages?: number;
  list: MappedList<Character>;
};

export interface Character {
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

export interface UpdateCharactersActionPayload extends Required<CharacterState> {}

export interface UpdateCharactersAction extends UpdateCharactersActionPayload {
  type: CharactersActionType.UPDATE;
}
