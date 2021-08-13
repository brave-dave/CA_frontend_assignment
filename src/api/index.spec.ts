import fetchFromApi from ".";
import { ApiEndpoint } from "./types";

function mockFetch<DATA>(mockData?: Promise<DATA>) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => mockData,
    })
  ) as any as typeof fetch;

  return global.fetch as jest.Mock;
}

describe("api", () => {
  it("should call fetch", () => {
    const mockedFetch = mockFetch();
    fetchFromApi(ApiEndpoint.CHARACTERS, 1);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  it("should be called with the endpoint value and pageOrId", () => {
    const mockedFetch = mockFetch();
    fetchFromApi(ApiEndpoint.CHARACTERS, 1);

    expect(mockedFetch).toHaveBeenCalledWith(`${ApiEndpoint.CHARACTERS}1`);
  });

  it("should asynchronously fetch data", async () => {
    const expectedData = { data: "data" };
    mockFetch(Promise.resolve(expectedData));
    const data = await fetchFromApi(ApiEndpoint.CHARACTERS, 1);

    expect(data).toEqual(expectedData);
  });

  it("should return an error object when throwing", async () => {
    const errorMessage = "this is an error";
    mockFetch(Promise.reject(new Error(errorMessage)));
    const data = await fetchFromApi(ApiEndpoint.CHARACTERS, 1);

    const expectedErrorData = { error: errorMessage };

    expect(data).toEqual(expectedErrorData);
  });
});
