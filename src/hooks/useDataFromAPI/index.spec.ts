import React from "react";
import useDataFromAPI from ".";
import { testHook, wait } from "../../testsUtils";

function mockFetch<DATA>(mockData?: DATA) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  ) as any as typeof fetch;

  return global.fetch as jest.Mock;
}

describe("hooks/useDataFromAPI", () => {
  it("should call `fetch` with the API url and relative path", () => {
    const path = "/api/character";
    const expectedUrl = "https://rickandmortyapi.com/api/character";
    const mockedFetch = mockFetch();
    testHook(useDataFromAPI, path);

    expect(mockedFetch.mock.calls[0][0]).toEqual(expectedUrl);
  });

  it("should return the data from fetch", async () => {
    const data = { a: 0, b: 0 };
    const path = "/api/character";
    mockFetch(data);
    const getHookValue = testHook(useDataFromAPI, path);

    await wait(); // Wait for data to be set by fetch

    expect(getHookValue()).toEqual(data);
  });
});
