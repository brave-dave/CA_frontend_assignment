import useCharacterUrlAndPage from "../useCharacterUrlAndPage";
import useDataFromUrl from "../useDataFromUrl";
import { testHook } from "../../testsUtils";
import usePageData from ".";
import {
  Character,
  CharacterResponseData,
  CharacterResponseDataResult,
  PageData,
} from "./types";
jest.mock("../useCharacterUrlAndPage", () => jest.fn());
jest.mock("../useDataFromUrl", () => jest.fn());

const characterUrl = "https://rickandmortyapi.com/api/character";

function mockUseCharacterUrl<T>(data: T) {
  const mockedUseCharacterUrl = useCharacterUrlAndPage as jest.Mock;
  mockedUseCharacterUrl.mockImplementationOnce(() => data);
}

function mockUseDataFromUrl<T>(data: T) {
  const mockedUseDataFromUrl = useDataFromUrl as jest.Mock;
  mockedUseDataFromUrl.mockImplementationOnce(() => data);
}

describe("hooks/usePageData", () => {
  const currentPage = 1;
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
    loading: true,
  };
  const mockExpectedDataSuccess: PageData = {
    characters: [mockCharacter],
    pages: 34,
    currentPage,
    loading: false,
  };
  const mockExpectedDataError: PageData = {
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
        mockUseCharacterUrl({ url, currentPage });
        mockUseDataFromUrl(dataFromUrl);
        const getPageData = await testHook(usePageData);

        expect(getPageData()).toEqual(expectedData);
      });
    }
  );
});
