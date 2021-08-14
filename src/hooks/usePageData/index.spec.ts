import { useDispatch, useSelector } from "react-redux";
import usePageData from ".";
import { ReduxState } from "../../redux";
import { mockCharacter, mockReduxState } from "../../redux/testMocks";
import { testHook } from "../../testsUtils";

jest.mock("react-redux");

function mockUseSelector(state: ReduxState = mockReduxState()) {
  (useSelector as jest.Mock).mockImplementation((selector) => selector(state));
}

function mockUseDispatch(dispatch = jest.fn()) {
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  return dispatch;
}

describe("hooks/usePageData", () => {
  describe("while it's loading", () => {
    it("should return loading pageData", async () => {
      mockUseSelector();
      mockUseDispatch(jest.fn(() => new Promise(() => {})));
      const getPageData = await testHook(usePageData, { currentPage: 1 });

      expect(getPageData()).toEqual({ loading: true });
    });
  });

  describe("when page is not found", () => {
    it("should return error pageData", async () => {
      mockUseSelector(
        mockReduxState({
          characters: { pagesStatuses: { 1: { isNotFound: true } } },
        })
      );
      mockUseDispatch();
      const getPageData = await testHook(usePageData, { currentPage: 1 });

      expect(getPageData()).toEqual({ isNotFound: true });
    });
  });

  describe("when page has no data", () => {
    it("should return error pageData", async () => {
      mockUseSelector();
      mockUseDispatch();
      const getPageData = await testHook(usePageData, { currentPage: 1 });

      expect(getPageData()).toEqual({ isNotFound: true });
    });
  });

  describe("when page has data", () => {
    it("should return success pageData", async () => {
      const pages = 50;
      const content = [mockCharacter()];
      const pagesStatuses = { 1: { content } };
      mockUseSelector(
        mockReduxState({
          characters: { pages, pagesStatuses },
        })
      );
      mockUseDispatch();
      const getPageData = await testHook(usePageData, { currentPage: 1 });

      expect(getPageData()).toEqual({ pages, content });
    });
  });
});
