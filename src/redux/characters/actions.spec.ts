import {
  fetchCharacters,
  updateCharacters,
  updateCharactersCurrentPage,
  updateCharactersPageNotFound,
} from "./actions";
import {
  CharactersActionType,
  UpdateCharactersCurrentPagePayload,
  UpdateCharactersPageNotFoundPayload,
  UpdateCharactersPayload,
} from "./types";
import {
  createTestActionCallback,
  mockApiCharacter,
  mockCharacter,
  mockReduxState,
} from "../testMocks";
import fetchFromApi, { ApiCharactersData, ApiEndpoint } from "../../api";
import { ReduxThunkDispatch } from "..";

jest.mock("../../api", () => {
  const mockedModule = jest.fn();
  Object.assign(mockedModule, jest.requireActual("../../api"));
  return mockedModule;
});

function mockFetchFromApi(data: ApiCharactersData = { results: [], pages: 1 }) {
  (fetchFromApi as jest.Mock).mockImplementationOnce(
    () => new Promise((resolve) => resolve(data))
  );
}

describe("redux/characters/actions", () => {
  describe("updateCharacters", () => {
    const payload: UpdateCharactersPayload = {
      currentPage: 1,
      pages: 53,
      list: [mockApiCharacter()],
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

  describe("updateCharactersPageNotFound", () => {
    const payload: UpdateCharactersPageNotFoundPayload = {
      page: 1,
    };

    it.each`
      prop      | expectedValue
      ${"type"} | ${CharactersActionType.UPDATE_PAGE_NOT_FOUND}
      ${"page"} | ${payload.page}
    `(
      "should return the right $prop",
      createTestActionCallback<UpdateCharactersPageNotFoundPayload>(
        ({ prop, expectedValue }) => {
          const action = updateCharactersPageNotFound(payload);

          expect(action[prop]).toEqual(expectedValue);
        }
      )
    );
  });

  describe("fetchCharacters", () => {
    let dispatch: ReduxThunkDispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    describe("when redux does not have the data", () => {
      it("should fetch data from the api", async () => {
        const thunkAction = fetchCharacters(1);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledTimes(1);
      });

      it("should fetch data from the api with the right endpoint data", async () => {
        const currentPage = 1;
        const thunkAction = fetchCharacters(currentPage);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledWith(
          ApiEndpoint.CHARACTERS,
          currentPage
        );
      });

      it("should dispatch updateCharacters with the right data", async () => {
        const currentPage = 1;
        const thunkAction = fetchCharacters(currentPage);
        const pages = 64;
        const results = [mockApiCharacter()];
        const data = { pages, results };
        mockFetchFromApi(data);
        await thunkAction(dispatch, mockReduxState);

        expect(dispatch).toHaveBeenCalledWith(
          updateCharacters({ list: results, pages, currentPage })
        );
      });

      describe("when data is not found", () => {
        it("should dispatch updateCharactersPageNotFound", async () => {
          const currentPage = 1;
          const thunkAction = fetchCharacters(currentPage);
          mockFetchFromApi({ error: "something" });
          await thunkAction(dispatch, mockReduxState);

          expect(dispatch).toHaveBeenCalledWith(
            updateCharactersPageNotFound({ page: currentPage })
          );
        });
      });
    });

    describe("when redux does have the data", () => {
      const currentPage = 1;
      const mockReduxStateWithData = () =>
        mockReduxState({
          characters: {
            currentPage: 5,
            pagesStatuses: {
              1: { content: [mockCharacter()] },
            },
          },
        });
      it("should not fetch data from the api", async () => {
        const thunkAction = fetchCharacters(currentPage);
        await thunkAction(dispatch, mockReduxStateWithData);

        expect(fetchFromApi).toHaveBeenCalledTimes(0);
      });

      it("should dispatch updateCharactersCurrentPage with the given currentPage", async () => {
        const thunkAction = fetchCharacters(currentPage);
        await thunkAction(dispatch, mockReduxStateWithData);

        expect(dispatch).toHaveBeenCalledWith(
          updateCharactersCurrentPage({ currentPage })
        );
      });
    });
  });
});
