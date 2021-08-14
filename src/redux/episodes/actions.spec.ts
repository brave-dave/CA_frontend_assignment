import { fetchEpisode, updateEpisode } from "./actions";
import { EpisodesActionType, UpdateEpisodePayload } from "./types";
import {
  createTestActionCallback,
  mockApiEpisode,
  mockEpisode,
  mockReduxState,
} from "../testMocks";
import fetchFromApi, { ApiDataError, ApiEndpoint, ApiEpisode } from "../../api";
import { ReduxThunkDispatch } from "..";

jest.mock("../../api", () => {
  const mockedModule = jest.fn();
  Object.assign(mockedModule, jest.requireActual("../../api"));
  return mockedModule;
});

function mockFetchFromApi(data: ApiEpisode | ApiDataError = { error: "" }) {
  (fetchFromApi as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(data)
  );
}

describe("redux/episodes/actions", () => {
  describe("updateEpisode", () => {
    const payload: UpdateEpisodePayload = {
      episode: { id: 1, name: "" },
    };

    it.each`
      prop         | expectedValue
      ${"type"}    | ${EpisodesActionType.UPDATE}
      ${"episode"} | ${payload.episode}
    `(
      "should return the right $prop",
      createTestActionCallback<UpdateEpisodePayload>(
        ({ prop, expectedValue }) => {
          const action = updateEpisode(payload);

          expect(action[prop]).toEqual(expectedValue);
        }
      )
    );
  });

  describe("fetchEpisode", () => {
    let dispatch: ReduxThunkDispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    describe("when redux does not have the data", () => {
      it("should fetch data from the api", async () => {
        const thunkAction = fetchEpisode(1);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledTimes(1);
      });

      it("should fetch data from the api with the right endpoint data", async () => {
        const episodeId = 1;
        const thunkAction = fetchEpisode(episodeId);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledWith(
          ApiEndpoint.EPISODE,
          episodeId
        );
      });

      it("should dispatch updateEpisode with the right data", async () => {
        const episodeId = 1;
        const thunkAction = fetchEpisode(episodeId);
        const data = mockApiEpisode();
        mockFetchFromApi(data);
        await thunkAction(dispatch, mockReduxState);

        expect(dispatch).toHaveBeenCalledWith(updateEpisode({ episode: data }));
      });

      describe("when data is not found", () => {
        it("should dispatch updateEpisode with isNotFound `true`", async () => {
          const episodeId = 1;
          const thunkAction = fetchEpisode(episodeId);
          mockFetchFromApi({ error: "something" });
          await thunkAction(dispatch, mockReduxState);

          expect(dispatch).toHaveBeenCalledWith(
            updateEpisode({ episode: { id: episodeId, isNotFound: true } })
          );
        });
      });
    });

    describe("when redux does have the data", () => {
      const episodeId = 1;
      const mockReduxStateWithData = () =>
        mockReduxState({
          episodes: {
            episodes: {
              1: mockEpisode(),
            },
          },
        });
      it("should not fetch data from the api", async () => {
        const thunkAction = fetchEpisode(episodeId);
        await thunkAction(dispatch, mockReduxStateWithData);

        expect(fetchFromApi).toHaveBeenCalledTimes(0);
      });
    });
  });
});
