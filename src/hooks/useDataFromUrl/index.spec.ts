import React from "react";
import useDataFromUrl from ".";
import { testHook, wait } from "../../testsUtils";

function mockFetch<DATA>(mockData?: DATA) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  ) as any as typeof fetch;

  return global.fetch as jest.Mock;
}

describe("hooks/useDataFromUrl", () => {
  it("should call `fetch` with the API url and relative path", () => {
    const url = "https://rickandmortyapi.com/api/character";
    const mockedFetch = mockFetch();
    testHook(useDataFromUrl, url);

    expect(mockedFetch.mock.calls[0][0]).toEqual(url);
  });

  it("should return the data from fetch", async () => {
    const data = { a: 0, b: 0 };
    const path = "/api/character";
    mockFetch(data);
    const getHookValue = testHook(useDataFromUrl, path);

    await wait(); // Wait for data to be set by fetch

    expect(getHookValue()).toEqual(data);
  });
});
