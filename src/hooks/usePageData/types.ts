export interface Character {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  episode: ReadonlyArray<string>;
}

export type Characters = ReadonlyArray<Character>;

interface CharacterResponseDataInfo {
  pages: number;
}

export interface CharacterResponseDataResult
  extends Omit<Character, "origin" | "location"> {
  origin: Record<"url", string>;
  location: Record<"url", string>;
}

export type CharacterResponseDataResults =
  ReadonlyArray<CharacterResponseDataResult>;

interface CharacterResponseDataSuccess {
  info: CharacterResponseDataInfo;
  results: CharacterResponseDataResults;
}

export interface CharacterResponseDataError {
  error: string;
}

export type CharacterResponseData =
  | CharacterResponseDataSuccess
  | CharacterResponseDataError;

export interface PageData {
  characters: Characters;
  pages: number;
  loading: boolean;
  isNotFound?: boolean;
}
