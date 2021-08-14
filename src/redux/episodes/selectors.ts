import { ReduxSelector } from "..";
import { EpisodesState } from "./types";
import { createSelector } from "reselect";

export const selectEpisodesState: ReduxSelector<EpisodesState> = ({
  episodes,
}) => episodes;

export const selectEpisodes = createSelector(
  selectEpisodesState,
  ({ episodes }) => episodes
);
