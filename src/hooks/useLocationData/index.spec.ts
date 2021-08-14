import { useDispatch, useSelector } from "react-redux";
import useLocationData from ".";
import { ReduxState } from "../../redux";
import { mockLocation, mockReduxState } from "../../redux/testMocks";
import { testHook } from "../../testsUtils";

jest.mock("react-redux");

function mockUseSelector(state: ReduxState = mockReduxState()) {
  (useSelector as jest.Mock).mockImplementation((selector) => selector(state));
}

function mockUseDispatch(dispatch = jest.fn()) {
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  return dispatch;
}

describe("hooks/useLocationData", () => {
  describe("while it's loading", () => {
    it("should return loading data", async () => {
      const id = 1;
      mockUseSelector();
      mockUseDispatch(jest.fn(() => new Promise(() => {})));
      const getLocationData = await testHook(useLocationData, { id });

      expect(getLocationData()).toEqual({ id, isFetching: true });
    });
  });

  describe("when location is not found", () => {
    it("should return error data", async () => {
      const id = 1;
      mockUseSelector(
        mockReduxState({
          locations: { locations: { 1: { id, isNotFound: true } } },
        })
      );
      mockUseDispatch();
      const getLocationData = await testHook(useLocationData, { id });

      expect(getLocationData()).toEqual({ id, isNotFound: true });
    });
  });

  describe("when location has no data", () => {
    it("should return loading data", async () => {
      const id = 1;
      mockUseSelector();
      mockUseDispatch();
      const getLocationData = await testHook(useLocationData, { id });

      expect(getLocationData()).toEqual({ id, isFetching: true });
    });
  });

  describe("when location has data", () => {
    it("should return success data", async () => {
      const id = 1;
      const location = mockLocation({ id });
      mockUseSelector(
        mockReduxState({
          locations: { locations: { 1: location } },
        })
      );
      mockUseDispatch();
      const getLocationData = await testHook(useLocationData, { id });

      expect(getLocationData()).toEqual(location);
    });
  });
});
