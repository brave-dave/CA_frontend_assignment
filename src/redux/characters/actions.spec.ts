import { updateCharacters } from "./actions";
import { CharactersActionType, UpdateCharactersPayload } from "./types";
import { mockCharacter } from "../testMocks";

describe("redux/characters/actions", () => {
  describe("updateCharacters", () => {
    const payload: UpdateCharactersPayload = {
      currentPage: 1,
      pages: 53,
      list: [mockCharacter()],
    };

    type ItEachProps<K extends keyof UpdateCharactersPayload> = {
      prop: K;
      expectedValue: UpdateCharactersPayload[K];
    };

    it.each`
      prop             | expectedValue
      ${"type"}        | ${CharactersActionType.UPDATE}
      ${"currentPage"} | ${payload.currentPage}
      ${"pages"}       | ${payload.pages}
      ${"list"}        | ${payload.list}
    `(
      "should return the right $prop",
      <K extends keyof UpdateCharactersPayload>({
        prop,
        expectedValue,
      }: ItEachProps<K>) => {
        const action = updateCharacters(payload);

        expect(action[prop]).toEqual(expectedValue);
      }
    );
  });
});
