import {
  EpisodesActionType,
  EpisodesState,
  UpdateEpisodeAction,
} from "./types";

export const episodesInitialState: EpisodesState = {
  episodes: {},
};

type Actions = UpdateEpisodeAction;

export default function episodesReducer(
  state = episodesInitialState,
  action: Actions
): EpisodesState {
  switch (action.type) {
    case EpisodesActionType.UPDATE:
      const { episode } = action;
      return {
        episodes: {
          ...state.episodes,
          [episode.id]: episode,
        },
      };
    default:
      return state;
  }
}
