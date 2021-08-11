import useCharacterUrl from "../useCharacterUrl";
import useDataFromUrl from "../useDataFromUrl";
import { testHook } from "../../testsUtils";
import usePageData from ".";
import {
  Character,
  CharacterResponseData,
  CharacterResponseDataResult,
  PageData,
} from "./types";
jest.mock("../useCharacterUrl", () => jest.fn());
jest.mock("../useDataFromUrl", () => jest.fn());

const characterUrl = "https://rickandmortyapi.com/api/character";

function mockUseCharacterUrl(url?: string) {
  const mockedUseCharacterUrl = useCharacterUrl as jest.Mock;
  mockedUseCharacterUrl.mockImplementationOnce(() => url);
}

function mockUseDataFromUrl<T>(data: T) {
  const mockedUseDataFromUrl = useDataFromUrl as jest.Mock;
  mockedUseDataFromUrl.mockImplementationOnce(() => data);
}

describe("hooks/usePageData", () => {
  const mockCharacterResponse: CharacterResponseDataResult = {
    name: "string",
    status: "string",
    species: "string",
    type: "string",
    gender: "string",
    origin: { url: "string" },
    location: { url: "string" },
    image: "string",
    episode: [],
  };
  const mockCharacter: Character = {
    name: "string",
    status: "string",
    species: "string",
    type: "string",
    gender: "string",
    origin: "string",
    location: "string",
    image: "string",
    episode: [],
  };
  const mockDataSuccess: CharacterResponseData = {
    info: { pages: 34 },
    results: [mockCharacterResponse],
  };
  const mockDataError: CharacterResponseData = {
    error: "There is nothing here",
  };
  const mockExpectedDataInitial: PageData = {
    characters: [],
    pages: 0,
    loading: true,
  };
  const mockExpectedDataSuccess: PageData = {
    characters: [mockCharacter],
    pages: 34,
    loading: false,
  };
  const mockExpectedDataError: PageData = {
    characters: [],
    pages: 0,
    loading: false,
    isNotFound: true,
  };

  describe.each`
    url             | dataFromUrl        | expectedData
    ${characterUrl} | ${undefined}       | ${mockExpectedDataInitial}
    ${undefined}    | ${undefined}       | ${mockExpectedDataError}
    ${undefined}    | ${mockDataSuccess} | ${mockExpectedDataError}
    ${characterUrl} | ${mockDataError}   | ${mockExpectedDataError}
    ${characterUrl} | ${mockDataSuccess} | ${mockExpectedDataSuccess}
  `(
    "when the url is `$url` and the fetched data is `$dataFromUrl`",
    ({ url, dataFromUrl, expectedData }) => {
      it(`should return \`${expectedData}\``, async () => {
        mockUseCharacterUrl(url);
        mockUseDataFromUrl(dataFromUrl);
        const getPageData = await testHook(usePageData);

        expect(getPageData()).toEqual(expectedData);
      });
    }
  );
});
