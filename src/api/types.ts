type ApiData<I> = {
  pages: number;
  results: ReadonlyArray<I>;
};

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

export type ApiLocation = {};
export type ApiLocationData = ApiData<ApiLocation>;

export type ApiEpisode = {};
export type ApiEpisodeData = ApiData<ApiEpisode>;

export enum ApiEndpoint {
  CHARACTERS = "https://rickandmortyapi.com/api/character?page=",
  LOCATION = "https://rickandmortyapi.com/api/location/",
  EPISODE = "https://rickandmortyapi.com/api/episode/",
}

export type ApiDataMap = {
  [ApiEndpoint.CHARACTERS]: ApiCharactersData;
  [ApiEndpoint.LOCATION]: ApiLocationData;
  [ApiEndpoint.EPISODE]: ApiEpisodeData;
};
