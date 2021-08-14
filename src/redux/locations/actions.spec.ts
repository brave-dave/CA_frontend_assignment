import { fetchLocation, updateLocation } from "./actions";
import { LocationsActionType, UpdateLocationPayload } from "./types";
import {
  createTestActionCallback,
  mockApiLocation,
  mockLocation,
  mockReduxState,
} from "../testMocks";
import fetchFromApi, {
  ApiDataError,
  ApiEndpoint,
  ApiLocation,
} from "../../api";
import { ReduxThunkDispatch } from "..";

jest.mock("../../api", () => {
  const mockedModule = jest.fn();
  Object.assign(mockedModule, jest.requireActual("../../api"));
  return mockedModule;
});

function mockFetchFromApi(data: ApiLocation | ApiDataError = { error: "" }) {
  (fetchFromApi as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(data)
  );
}

describe("redux/locations/actions", () => {
  describe("updateLocation", () => {
    const payload: UpdateLocationPayload = {
      location: mockApiLocation(),
    };

    it.each`
      prop          | expectedValue
      ${"type"}     | ${LocationsActionType.UPDATE}
      ${"location"} | ${payload.location}
    `(
      "should return the right $prop",
      createTestActionCallback<UpdateLocationPayload>(
        ({ prop, expectedValue }) => {
          const action = updateLocation(payload);

          expect(action[prop]).toEqual(expectedValue);
        }
      )
    );
  });

  describe("fetchLocation", () => {
    let dispatch: ReduxThunkDispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    describe("when redux does not have the data", () => {
      it("should fetch data from the api", async () => {
        const thunkAction = fetchLocation(1);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledTimes(1);
      });

      it("should fetch data from the api with the right endpoint data", async () => {
        const locationId = 1;
        const thunkAction = fetchLocation(locationId);
        mockFetchFromApi();
        await thunkAction(dispatch, mockReduxState);

        expect(fetchFromApi).toHaveBeenCalledWith(
          ApiEndpoint.LOCATION,
          locationId
        );
      });

      it("should dispatch updateLocation with the right data", async () => {
        const locationId = 1;
        const thunkAction = fetchLocation(locationId);
        const data = mockApiLocation();
        mockFetchFromApi(data);
        await thunkAction(dispatch, mockReduxState);

        expect(dispatch).toHaveBeenCalledWith(
          updateLocation({ location: data })
        );
      });

      describe("when data is not found", () => {
        it("should dispatch updateLocation with isNotFound `true`", async () => {
          const locationId = 1;
          const thunkAction = fetchLocation(locationId);
          mockFetchFromApi({ error: "something" });
          await thunkAction(dispatch, mockReduxState);

          expect(dispatch).toHaveBeenCalledWith(
            updateLocation({ location: { id: locationId, isNotFound: true } })
          );
        });
      });
    });

    describe("when redux does have the data", () => {
      const locationId = 1;
      const mockReduxStateWithData = () =>
        mockReduxState({
          locations: {
            locations: {
              1: mockLocation(),
            },
          },
        });
      it("should not fetch data from the api", async () => {
        const thunkAction = fetchLocation(locationId);
        await thunkAction(dispatch, mockReduxStateWithData);

        expect(fetchFromApi).toHaveBeenCalledTimes(0);
      });
    });
  });
});
