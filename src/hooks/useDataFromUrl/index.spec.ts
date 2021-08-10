import { waitFor } from "@testing-library/react";
import useDataFromUrl from ".";
import { testHook } from "../../testsUtils";

function mockFetch<DATA>(mockData?: DATA) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  ) as any as typeof fetch;

  return global.fetch as jest.Mock;
}

describe("hooks/useDataFromUrl", () => {
  describe("when it has a `url`", () => {
    it("should call `fetch` with the API url and relative path", async () => {
      const url = "https://rickandmortyapi.com/api/character";
      const mockedFetch = mockFetch();
      await testHook(useDataFromUrl, url);

      expect(mockedFetch.mock.calls[0][0]).toEqual(url);
    });

    it("should return the data from fetch", async () => {
      const data = { a: 0, b: 0 };
      const url = "https://rickandmortyapi.com/api/character";
      mockFetch(data);
      const getHookValue = await testHook(useDataFromUrl, url);

      expect(getHookValue()).toEqual(data);
    });
  });

  describe("when it does not have a `url`", () => {
    it("should not call `fetch`", () => {
      const mockedFetch = mockFetch();
      testHook(useDataFromUrl);

      expect(mockedFetch).toHaveBeenCalledTimes(0);
    });

    it("should return no data from fetch", async () => {
      mockFetch({ a: 0, b: 0 });
      const getHookValue = await testHook(useDataFromUrl);

      expect(getHookValue()).toEqual(undefined);
    });
  });
});
