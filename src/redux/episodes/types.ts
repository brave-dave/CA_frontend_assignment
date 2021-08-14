import { ApiEpisode } from "../../api";
import { ConditionalObject, MappedList } from "../../types";

export type EpisodeNotFound = {
  id: number;
  isNotFound: true;
};

export type EpisodeFetching = {
  id: number;
  isFetching: true;
};

export type Episode = ConditionalObject<
  ConditionalObject<ApiEpisode, EpisodeNotFound>,
  EpisodeFetching
>;

export type EpisodesState = {
  episodes: MappedList<Episode>;
};

export enum EpisodesActionType {
  UPDATE = "episodes/update",
}

export interface UpdateEpisodePayload {
  episode: Episode;
}

export interface UpdateEpisodeAction extends UpdateEpisodePayload {
  type: EpisodesActionType.UPDATE;
}
