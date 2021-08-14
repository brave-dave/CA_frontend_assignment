import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useCurrentPage from ".";
import { ReduxState } from "../../redux";
import { mockCharacter, mockReduxState } from "../../redux/testMocks";
import { testHook } from "../../testsUtils";
jest.mock("react-router-dom", () => ({ useParams: jest.fn() }));

function mockUseParams(params: Record<string, string>) {
  (useParams as jest.Mock).mockImplementation(() => params);
}

describe("hooks/useCurrentPage", () => {
  describe("if page is not present", () => {
    it("should return 1", async () => {
      mockUseParams({});
      const getCurrentPage = await testHook(useCurrentPage);

      expect(getCurrentPage()).toEqual(1);
    });
  });

  describe("if page is a valid number", () => {
    it("should return the page", async () => {
      mockUseParams({ page: "40" });
      const getCurrentPage = await testHook(useCurrentPage);

      expect(getCurrentPage()).toEqual(40);
    });
  });

  describe("if page is invalid", () => {
    it("should return the page", async () => {
      mockUseParams({ page: "invalid" });
      const getCurrentPage = await testHook(useCurrentPage);

      expect(getCurrentPage()).toEqual(undefined);
    });
  });
});
