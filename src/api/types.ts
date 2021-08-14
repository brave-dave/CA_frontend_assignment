type ApiDataInfo = {
  pages: number;
};

type ApiDataSuccess<I> = {
  info: ApiDataInfo;
  results: ReadonlyArray<I>;
};

export type ApiDataError = {
  error: string;
};

type ApiData<I> = ApiDataSuccess<I> | ApiDataError;

type ApiOriginAndLocation = Record<"name" | "url", string>;

export type ApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ApiOriginAndLocation;
  location: ApiOriginAndLocation;
  image: string;
  episode: ReadonlyArray<string>;
};
export type ApiCharactersData = ApiData<ApiCharacter>;

export type ApiLocation = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export type ApiEpisode = {
  id: number;
  name: string;
};

export enum ApiEndpoint {
  CHARACTERS = "https://rickandmortyapi.com/api/character?page=",
  LOCATION = "https://rickandmortyapi.com/api/location/",
  EPISODE = "https://rickandmortyapi.com/api/episode/",
}

export type ApiDataMap = {
  [ApiEndpoint.CHARACTERS]: ApiCharactersData;
  [ApiEndpoint.LOCATION]: ApiLocation | ApiDataError;
  [ApiEndpoint.EPISODE]: ApiEpisode | ApiDataError;
};
