import { ReduxState } from ".";
import { ApiCharacter, ApiEndpoint, ApiEpisode, ApiLocation } from "../api";
import { Character } from "./characters";
import { Episode } from "./episodes";
import { Location } from "./locations";

type PartialReduxState = {
  [K in keyof ReduxState]?: Partial<ReduxState[K]>;
};

export function mockReduxState({
  characters,
  locations,
  episodes,
}: PartialReduxState = {}): ReduxState {
  return {
    characters: {
      pages: 65,
      currentPage: 1,
      pagesStatuses: {},
      ...characters,
    },
    locations: {
      locations: {},
      ...locations,
    },
    episodes: {
      episodes: {},
      ...episodes,
    },
  };
}

export function mockApiCharacter(
  partialCharacter: Partial<ApiCharacter> = {}
): ApiCharacter {
  return {
    id: 1,
    name: "string",
    status: "string",
    species: "string",
    type: "string",
    gender: "string",
    origin: { name: "string", url: `${ApiEndpoint.LOCATION}1` },
    location: { name: "string", url: `${ApiEndpoint.LOCATION}2` },
    image: "string",
    episode: [`${ApiEndpoint.EPISODE}3`],
    ...partialCharacter,
  };
}

export function mockCharacter(
  partialCharacter: Partial<Character> = {}
): Character {
  return {
    ...mockApiCharacter(),
    origin: 1,
    location: 2,
    episode: [3],
    ...partialCharacter,
  };
}

export function mockApiLocation(
  partialApiLocation: Partial<ApiLocation> = {}
): ApiLocation {
  return {
    id: 1,
    name: "string",
    type: "string",
    dimension: "string",
    ...partialApiLocation,
  };
}

export function mockLocation(
  partialLocation: Partial<Location> = {}
): Location {
  return mockApiLocation(partialLocation);
}

export function mockApiEpisode(
  partialApiEpisode: Partial<ApiEpisode> = {}
): ApiEpisode {
  return {
    id: 1,
    name: "string",
    ...partialApiEpisode,
  };
}

export function mockEpisode(partialApiEpisode: Partial<Episode> = {}): Episode {
  return mockApiEpisode(partialApiEpisode);
}

type TestActionCallbackProps<K, V> = {
  prop: K;
  expectedValue: V;
};

type TestActionCallback<K, V> = (props: TestActionCallbackProps<K, V>) => void;

export function createTestActionCallback<PAYLOAD>(
  callback: TestActionCallback<keyof PAYLOAD, PAYLOAD[keyof PAYLOAD]>
) {
  return <K extends keyof PAYLOAD>(
    props: TestActionCallbackProps<K, PAYLOAD[K]>
  ) => callback(props);
}
