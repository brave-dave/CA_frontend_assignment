import { updateLocation } from "./actions";
import locationsReducer, { locationsInitialState } from "./reducer";
import { mockApiLocation, mockLocation } from "../testMocks";

const mockAction: any = {};

describe("redux/locations/reducer", () => {
  it("should return the initial state", () => {
    const state = locationsReducer(undefined, mockAction);

    expect(state).toEqual(locationsInitialState);
  });

  describe("updateLocation", () => {
    it("should have the location in the mappedList", () => {
      const locationId = 32;
      const apiLocation = mockApiLocation({ id: locationId });
      const expectedLocation = mockLocation({ id: locationId });

      const payload = {
        location: apiLocation,
      };
      const { locations } = locationsReducer(
        locationsInitialState,
        updateLocation(payload)
      );

      expect(locations[locationId]).toEqual(expectedLocation);
    });
  });
});
