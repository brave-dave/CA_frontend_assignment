import { ApiLocation } from "../../api";
import { ConditionalObject, MappedList } from "../../types";

export type LocationNotFound = {
  id: number;
  isNotFound: true;
};

export type LocationFetching = {
  id: number;
  isFetching: true;
};

export type Location = ConditionalObject<
  ConditionalObject<ApiLocation, LocationNotFound>,
  LocationFetching
>;

export type LocationsState = {
  locations: MappedList<Location>;
};

export enum LocationsActionType {
  UPDATE = "locations/update",
}

export interface UpdateLocationPayload
  extends Omit<Required<LocationsState>, "locations"> {
  location: Location;
}

export interface UpdateLocationAction extends UpdateLocationPayload {
  type: LocationsActionType.UPDATE;
}
