import { updateEpisode } from "./actions";
import episodesReducer, { episodesInitialState } from "./reducer";
import { mockApiEpisode, mockEpisode } from "../testMocks";

const mockAction: any = {};

describe("redux/episodes/reducer", () => {
  it("should return the initial state", () => {
    const state = episodesReducer(undefined, mockAction);

    expect(state).toEqual(episodesInitialState);
  });

  describe("updateEpisode", () => {
    it("should have the episode in the mappedList", () => {
      const episodeId = 32;
      const apiEpisode = mockApiEpisode({ id: episodeId });
      const expectedEpisode = mockEpisode({ id: episodeId });

      const payload = {
        episode: apiEpisode,
      };
      const { episodes } = episodesReducer(
        episodesInitialState,
        updateEpisode(payload)
      );

      expect(episodes[episodeId]).toEqual(expectedEpisode);
    });
  });
});
