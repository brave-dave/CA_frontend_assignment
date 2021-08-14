import { mockEpisode, mockReduxState } from "../testMocks";
import { EpisodesState } from "./types";
import { selectEpisodes, selectEpisodesState } from "./selectors";

describe("redux/episodes/selectors", () => {
  describe("selectEpisodesState", () => {
    it("should return the episodesState", () => {
      const episodeId = 39;
      const episode = mockEpisode({ id: episodeId });
      const expectedEpisodesState: EpisodesState = {
        episodes: { [episodeId]: episode },
      };

      const reduxState = mockReduxState({
        episodes: expectedEpisodesState,
      });

      expect(selectEpisodesState(reduxState)).toEqual(expectedEpisodesState);
    });
  });

  describe("selectEpisodes", () => {
    it("should return the episodes", () => {
      const episodeId = 39;
      const episode = mockEpisode({ id: episodeId });
      const episodes = { [episodeId]: episode };
      const reduxState = mockReduxState({
        episodes: { episodes },
      });

      expect(selectEpisodes(reduxState)).toEqual(episodes);
    });
  });
});
