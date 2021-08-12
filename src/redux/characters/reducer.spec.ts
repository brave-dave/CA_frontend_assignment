import { updateCharacters } from "./actions";
import charactersReducer, { charactersInitialState } from "./reducer";
import { mockCharacter } from "./testMocks";
import { UpdateCharactersPayload } from "./types";

const mockAction: any = {};

describe("redux/characters/reducer", () => {
  it("should return the initial state", () => {
    const state = charactersReducer(undefined, mockAction);

    expect(state).toEqual(charactersInitialState);
  });

  describe("updateCharacters", () => {
    const mockPayload: UpdateCharactersPayload = {
      pages: 53,
      currentPage: 3,
      list: [],
    };

    it("should return the expected currentPage", () => {
      const currentPage = 6;
      const payload = {
        ...mockPayload,
        currentPage,
      };
      const state = charactersReducer(
        charactersInitialState,
        updateCharacters(payload)
      );

      expect(state.currentPage).toEqual(currentPage);
    });

    it("should return the expected pages", () => {
      const pages = 87;
      const payload = {
        ...mockPayload,
        pages,
      };
      const state = charactersReducer(
        charactersInitialState,
        updateCharacters(payload)
      );

      expect(state.pages).toEqual(pages);
    });

    it("should return the expected list", () => {
      const characterIdOne = 32;
      const characterOne = mockCharacter({ id: characterIdOne });
      const characterIdTwo = 65;
      const characterTwo = mockCharacter({ id: characterIdTwo });

      const payload = {
        ...mockPayload,
        list: [characterOne, characterTwo],
      };
      const state = charactersReducer(
        charactersInitialState,
        updateCharacters(payload)
      );

      const expectedList = {
        [characterIdOne]: characterOne,
        [characterIdTwo]: characterTwo,
      };

      expect(state.list).toEqual(expectedList);
    });
  });
});
