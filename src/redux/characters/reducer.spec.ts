import {
  updateCharacters,
  updateCharactersCurrentPage,
  updateCharactersPageNotFound,
} from "./actions";
import charactersReducer, { charactersInitialState } from "./reducer";
import { mockApiCharacter, mockCharacter } from "../testMocks";
import { CharactersState, UpdateCharactersPayload } from "./types";
import { ApiEndpoint } from "../../api";

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

    describe("when returning a list of characters", () => {
      it("should have the common values from the api", () => {
        const characterIdOne = 32;
        const apicharacterOne = mockApiCharacter({ id: characterIdOne });
        const { origin, location, episode, ...characterOneCommonValues } =
          mockCharacter({ id: characterIdOne });

        const payload = {
          ...mockPayload,
          list: [apicharacterOne],
        };
        const { pagesStatuses } = charactersReducer(
          charactersInitialState,
          updateCharacters(payload)
        );
        const [character] =
          pagesStatuses[mockPayload.currentPage]?.content || [];

        expect(character).toEqual(
          expect.objectContaining(characterOneCommonValues)
        );
      });

      it("should have the origin id", () => {
        const originId = 21;
        const originUrl = `${ApiEndpoint.LOCATION}${originId}`;
        const characterIdOne = 32;
        const apicharacterOne = mockApiCharacter({
          id: characterIdOne,
          origin: { name: "string", url: originUrl },
        });
        const payload = {
          ...mockPayload,
          list: [apicharacterOne],
        };
        const { pagesStatuses } = charactersReducer(
          charactersInitialState,
          updateCharacters(payload)
        );
        const [character] =
          pagesStatuses[mockPayload.currentPage]?.content || [];

        expect(character.origin).toEqual(originId);
      });

      it("should have the location id", () => {
        const locationId = 21;
        const locationUrl = `${ApiEndpoint.LOCATION}${locationId}`;
        const characterIdOne = 32;
        const apicharacterOne = mockApiCharacter({
          id: characterIdOne,
          location: { name: "string", url: locationUrl },
        });
        const payload = {
          ...mockPayload,
          list: [apicharacterOne],
        };
        const { pagesStatuses } = charactersReducer(
          charactersInitialState,
          updateCharacters(payload)
        );
        const [character] =
          pagesStatuses[mockPayload.currentPage]?.content || [];

        expect(character.location).toEqual(locationId);
      });

      it("should have the episode id", () => {
        const episodeId = 21;
        const episodeUrl = `${ApiEndpoint.EPISODE}${episodeId}`;
        const characterIdOne = 32;
        const apicharacterOne = mockApiCharacter({
          id: characterIdOne,
          episode: [episodeUrl],
        });
        const payload = {
          ...mockPayload,
          list: [apicharacterOne],
        };
        const { pagesStatuses } = charactersReducer(
          charactersInitialState,
          updateCharacters(payload)
        );
        const [character] =
          pagesStatuses[mockPayload.currentPage]?.content || [];

        expect(character.episode).toEqual([episodeId]);
      });
    });
  });

  describe("updateCharactersCurrentPage", () => {
    it("should return the expected currentPage", () => {
      const currentPage = 6;
      const state = charactersReducer(
        charactersInitialState,
        updateCharactersCurrentPage({ currentPage })
      );

      expect(state.currentPage).toEqual(currentPage);
    });
    it("should return the remainder of the state", () => {
      const expectedRemainderOfState: Omit<CharactersState, "currentPage"> = {
        pages: charactersInitialState.pages,
        pagesStatuses: charactersInitialState.pagesStatuses,
      };
      const { currentPage, ...remainderOfState } = charactersReducer(
        charactersInitialState,
        updateCharactersCurrentPage({ currentPage: 2 })
      );

      expect(remainderOfState).toEqual(expectedRemainderOfState);
    });
  });

  describe("updateCharactersPageNotFound", () => {
    it("should return the expected pageStatus", () => {
      const page = 6;
      const { pagesStatuses } = charactersReducer(
        charactersInitialState,
        updateCharactersPageNotFound({ page })
      );

      const pageStatus = pagesStatuses[page];

      expect(pageStatus).toEqual({ isNotFound: true });
    });

    it("should return the remainder of the state", () => {
      const expectedRemainderOfState: Omit<CharactersState, "pagesStatuses"> = {
        pages: charactersInitialState.pages,
        currentPage: charactersInitialState.currentPage,
      };
      const { pagesStatuses, ...remainderOfState } = charactersReducer(
        charactersInitialState,
        updateCharactersPageNotFound({ page: 2 })
      );

      expect(remainderOfState).toEqual(expectedRemainderOfState);
    });
  });
});
