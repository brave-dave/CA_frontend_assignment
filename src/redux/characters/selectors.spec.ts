import { mockReduxState } from "../testMocks";
import { mockCharacter } from "../testMocks";
import { CharactersState } from "./types";
import {
  selectCharactersCurrentPage,
  selectCharactersPagesStatuses,
  selectCharactersPages,
  selectCharactersState,
  selectShouldFetchPageSelector,
} from "./selectors";

describe("redux/characters/selectors", () => {
  describe("selectCharactersState", () => {
    it("should return the charactersState", () => {
      const characterId = 39;
      const character = mockCharacter({ id: characterId });
      const expectedCharacterState: CharactersState = {
        pages: 77,
        currentPage: 2,
        pagesStatuses: { 1: { content: [character] } },
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
    it("should return the pages", () => {
      const pages = 55;

      const reduxState = mockReduxState({
        characters: { pages },
      });

      expect(selectCharactersPages(reduxState)).toEqual(pages);
    });
  });

  describe("selectCharactersPagesStatuses", () => {
    it("should return the pageStatuses", () => {
      const characterId = 23;
      const character = mockCharacter({ id: characterId });
      const pagesStatuses = { 1: { content: [character] } };

      const reduxState = mockReduxState({
        characters: { pagesStatuses },
      });

      expect(selectCharactersPagesStatuses(reduxState)).toEqual(pagesStatuses);
    });
  });

  describe("selectShouldFetchPageSelector", () => {
    it("should return a function", () => {
      const characterId = 23;
      const character = mockCharacter({ id: characterId });
      const pagesStatuses = { 1: { content: [character] } };

      const reduxState = mockReduxState({
        characters: { pagesStatuses },
      });

      expect(typeof selectShouldFetchPageSelector(reduxState)).toBe("function");
    });

    it("should return a function that returns true if the page is empty", () => {
      const characterId = 23;
      const character = mockCharacter({ id: characterId });
      const pagesStatuses = { 1: { content: [character] } };

      const reduxState = mockReduxState({
        characters: { pagesStatuses },
      });

      const shouldFetchPageSelector = selectShouldFetchPageSelector(reduxState);

      expect(shouldFetchPageSelector(2)).toBe(true);
    });

    it("should return a function that returns false if the page has data", () => {
      const characterId = 23;
      const character = mockCharacter({ id: characterId });
      const pagesStatuses = { 1: { content: [character] } };

      const reduxState = mockReduxState({
        characters: { pagesStatuses },
      });

      const shouldFetchPageSelector = selectShouldFetchPageSelector(reduxState);

      expect(shouldFetchPageSelector(1)).toBe(false);
    });
  });
});
