import { updateCharacters } from "./actions";
import {
  Character,
  CharactersActionType,
  UpdateCharactersActionPayload,
} from "./types";

describe("redux/characters/actions", () => {
  describe("updateCharacters", () => {
    const mockCharacter: Character = {
      name: "string",
      status: "string",
      species: "string",
      type: "string",
      gender: "string",
      origin: 1,
      location: 3,
      image: "string",
      episode: [5],
    };
    const payload: UpdateCharactersActionPayload = {
      currentPage: 1,
      pages: 53,
      list: [mockCharacter],
    };

    type ItEachProps<K extends keyof UpdateCharactersActionPayload> = {
      prop: K;
      expectedValue: UpdateCharactersActionPayload[K];
    };

    it.each`
      prop             | expectedValue
      ${"type"}        | ${CharactersActionType.UPDATE}
      ${"currentPage"} | ${payload.currentPage}
      ${"pages"}       | ${payload.pages}
      ${"list"}        | ${payload.list}
    `(
      "should return the right $prop",
      <K extends keyof UpdateCharactersActionPayload>({
        prop,
        expectedValue,
      }: ItEachProps<K>) => {
        const action = updateCharacters(payload);

        expect(action[prop]).toEqual(expectedValue);
      }
    );
  });
});
