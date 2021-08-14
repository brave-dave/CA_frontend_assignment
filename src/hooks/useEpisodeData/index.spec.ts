import { useDispatch, useSelector } from "react-redux";
import useEpisodeData from ".";
import { ReduxState } from "../../redux";
import { mockEpisode, mockReduxState } from "../../redux/testMocks";
import { testHook } from "../../testsUtils";

jest.mock("react-redux");

function mockUseSelector(state: ReduxState = mockReduxState()) {
  (useSelector as jest.Mock).mockImplementation((selector) => selector(state));
}

function mockUseDispatch(dispatch = jest.fn()) {
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  return dispatch;
}

describe("hooks/useEpisodeData", () => {
  describe("while it's loading", () => {
    it("should return loading data", async () => {
      const id = 1;
      mockUseSelector();
      mockUseDispatch(jest.fn(() => new Promise(() => {})));
      const getEpisodeData = await testHook(useEpisodeData, { id });

      expect(getEpisodeData()).toEqual({ id, isFetching: true });
    });
  });

  describe("when episode is not found", () => {
    it("should return error data", async () => {
      const id = 1;
      mockUseSelector(
        mockReduxState({
          episodes: { episodes: { 1: { id, isNotFound: true } } },
        })
      );
      mockUseDispatch();
      const geEpisodeData = await testHook(useEpisodeData, { id });

      expect(geEpisodeData()).toEqual({ id, isNotFound: true });
    });
  });

  describe("when episode has no data", () => {
    it("should return loading data", async () => {
      const id = 1;
      mockUseSelector();
      mockUseDispatch();
      const getEpisodeData = await testHook(useEpisodeData, { id });

      expect(getEpisodeData()).toEqual({ id, isFetching: true });
    });
  });

  describe("when episode has data", () => {
    it("should return success data", async () => {
      const id = 1;
      const episode = mockEpisode({ id });
      mockUseSelector(
        mockReduxState({
          episodes: { episodes: { 1: episode } },
        })
      );
      mockUseDispatch();
      const getEpisodeData = await testHook(useEpisodeData, { id });

      expect(getEpisodeData()).toEqual(episode);
    });
  });
});
