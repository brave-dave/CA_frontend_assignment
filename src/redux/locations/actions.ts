import { ReduxThunkAction } from "..";
import fetchFromApi, { ApiEndpoint, isApiDataError } from "../../api";
import { selectLocations } from "./selectors";
import {
  LocationsActionType,
  UpdateLocationAction,
  UpdateLocationPayload,
} from "./types";

export function updateLocation(
  payload: UpdateLocationPayload
): UpdateLocationAction {
  return { type: LocationsActionType.UPDATE, ...payload };
}

export function fetchLocation(id: number): ReduxThunkAction {
  return async function fetchLocationThunkAction(dispatch, getState) {
    const locations = selectLocations(getState());

    if (!locations[id]) {
      dispatch(updateLocation({ location: { id, isFetching: true } }));
      const location = await fetchFromApi(ApiEndpoint.LOCATION, id);
      if (isApiDataError(location)) {
        dispatch(updateLocation({ location: { id, isNotFound: true } }));
        return;
      }

      dispatch(updateLocation({ location }));
    }
  };
}
