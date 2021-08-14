import { ReduxSelector } from "..";
import { LocationsState } from "./types";
import { createSelector } from "reselect";

export const selectLocationsState: ReduxSelector<LocationsState> = ({
  locations,
}) => locations;

export const selectLocations = createSelector(
  selectLocationsState,
  ({ locations }) => locations
);
