import { mockLocation, mockReduxState } from "../testMocks";
import { LocationsState } from "./types";
import { selectLocations, selectLocationsState } from "./selectors";

describe("redux/locations/selectors", () => {
  describe("selectLocationsState", () => {
    it("should return the locationsState", () => {
      const locationId = 39;
      const location = mockLocation({ id: locationId });
      const expectedLocationsState: LocationsState = {
        locations: { 1: location },
      };

      const reduxState = mockReduxState({
        locations: expectedLocationsState,
      });

      expect(selectLocationsState(reduxState)).toEqual(expectedLocationsState);
    });
  });

  describe("selectLocations", () => {
    it("should return the locations", () => {
      const locationId = 23;
      const location = mockLocation({ id: locationId });
      const locations = { 1: location };

      const reduxState = mockReduxState({
        locations: { locations },
      });

      expect(selectLocations(reduxState)).toEqual(locations);
    });
  });
});
