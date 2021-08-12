import { updateCharacters, updateCharactersCurrentPage } from "./actions";
import {
  CharactersActionType,
  UpdateCharactersCurrentPagePayload,
  UpdateCharactersPayload,
} from "./types";
import { createTestActionCallback, mockCharacter } from "../testMocks";

describe("redux/characters/actions", () => {
  describe("updateCharacters", () => {
    const payload: UpdateCharactersPayload = {
      currentPage: 1,
      pages: 53,
      list: [mockCharacter()],
    };

    it.each`
      prop             | expectedValue
      ${"type"}        | ${CharactersActionType.UPDATE}
      ${"currentPage"} | ${payload.currentPage}
      ${"pages"}       | ${payload.pages}
      ${"list"}        | ${payload.list}
    `(
      "should return the right $prop",
      createTestActionCallback<UpdateCharactersPayload>(
        ({ prop, expectedValue }) => {
          const action = updateCharacters(payload);

          expect(action[prop]).toEqual(expectedValue);
        }
      )
    );
  });

  describe("updateCharactersCurrentPage", () => {
    const payload: UpdateCharactersCurrentPagePayload = {
      currentPage: 1,
    };

    it.each`
      prop             | expectedValue
      ${"type"}        | ${CharactersActionType.UPDATE_CURRENT_PAGE}
      ${"currentPage"} | ${payload.currentPage}
    `(
      "should return the right $prop",
      createTestActionCallback<UpdateCharactersCurrentPagePayload>(
        ({ prop, expectedValue }) => {
          const action = updateCharactersCurrentPage(payload);

          expect(action[prop]).toEqual(expectedValue);
        }
      )
    );
  });
});
