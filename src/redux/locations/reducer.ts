import {
  LocationsActionType,
  LocationsState,
  UpdateLocationAction,
} from "./types";

export const locationsInitialState: LocationsState = {
  locations: {},
};

type Actions = UpdateLocationAction;

export default function locationsReducer(
  state = locationsInitialState,
  action: Actions
): LocationsState {
  switch (action.type) {
    case LocationsActionType.UPDATE:
      const { location } = action;
      return {
        locations: {
          ...state.locations,
          [location.id]: location,
        },
      };
    default:
      return state;
  }
}
