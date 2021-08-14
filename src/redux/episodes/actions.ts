import { ReduxThunkAction } from "..";
import fetchFromApi, { ApiEndpoint, isApiDataError } from "../../api";
import { selectEpisodes } from "./selectors";
import {
  EpisodesActionType,
  UpdateEpisodeAction,
  UpdateEpisodePayload,
} from "./types";

export function updateEpisode(
  payload: UpdateEpisodePayload
): UpdateEpisodeAction {
  return { type: EpisodesActionType.UPDATE, ...payload };
}

export function fetchEpisode(id: number): ReduxThunkAction {
  return async function fetchEpisodeThunkAction(dispatch, getState) {
    const episodes = selectEpisodes(getState());

    if (!episodes[id]) {
      dispatch(updateEpisode({ episode: { id, isFetching: true } }));
      const episode = await fetchFromApi(ApiEndpoint.EPISODE, id);
      if (isApiDataError(episode)) {
        dispatch(updateEpisode({ episode: { id, isNotFound: true } }));
        return;
      }

      dispatch(updateEpisode({ episode: episode }));
    }
  };
}
