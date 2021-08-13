import { mockReduxState } from "../testMocks";
import { mockCharacter } from "../testMocks";
import { CharactersState } from "./types";
import {
  selectCharactersCurrentPage,
  selectCharactersList,
  selectCharactersPages,
  selectCharactersState,
} from "./selectors";

describe("redux/characters/selectors", () => {
  describe("selectCharactersState", () => {
    it("should return the charactersState", () => {
      const characterId = 39;
      const character = mockCharacter({ id: characterId });
      const expectedCharacterState: CharactersState = {
        pages: 77,
        currentPage: 2,
        list: { [characterId]: character },
      };

      const reduxState = mockReduxState({
        characters: expectedCharacterState,
      });

      expect(selectCharactersState(reduxState)).toEqual(expectedCharacterState);
    });
  });

  describe("selectCharactersCurrentPage", () => {
    it("should return the currentPage", () => {
      const currentPage = 2;

      const reduxState = mockReduxState({
        characters: { currentPage },
      });

      expect(selectCharactersCurrentPage(reduxState)).toEqual(currentPage);
    });
  });

  describe("selectCharactersPages", () => {
    it("should return the charactersState", () => {
      const pages = 55;

      const reduxState = mockReduxState({
        characters: { pages },
      });

      expect(selectCharactersPages(reduxState)).toEqual(pages);
    });
  });

  describe("selectCharactersList", () => {
    it("should return the charactersState", () => {
      const characterId = 23;
      const character = mockCharacter({ id: characterId });
      const list = { [characterId]: character };

      const reduxState = mockReduxState({
        characters: { list },
      });

      expect(selectCharactersList(reduxState)).toEqual(list);
    });
  });
});
