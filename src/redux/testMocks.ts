import { ReduxState } from ".";
import { Character } from "./characters";

type PartialReduxState = {
  [K in keyof ReduxState]?: Partial<ReduxState[K]>;
};

export function mockReduxState({
  characters,
}: PartialReduxState = {}): ReduxState {
  return {
    characters: {
      pages: 65,
      currentPage: 1,
      list: {},
      ...characters,
    },
  };
}

export function mockCharacter(
  partialCharacter: Partial<Character> = {}
): Character {
  return {
    id: 19,
    name: "string",
    status: "string",
    species: "string",
    type: "string",
    gender: "string",
    origin: 1,
    location: 3,
    image: "string",
    episode: [5],
    ...partialCharacter,
  };
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
