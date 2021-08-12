import useCharacterUrlAndPage from ".";
import { testHook } from "../../testsUtils";
import { useParams } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

const characterUrl = "https://rickandmortyapi.com/api/character";

function mockUseParams<P extends Record<string, string>>(params: P) {
  const mockedUseParams = useParams as jest.Mock;
  mockedUseParams.mockImplementationOnce(() => params);
}

describe("hooks/useCharacterUrlAndPage", () => {
  describe.each`
    page           | expectedUrl
    ${undefined}   | ${`${characterUrl}?page=1`}
    ${"-1"}        | ${undefined}
    ${"0"}         | ${undefined}
    ${"badNumber"} | ${undefined}
    ${"2"}         | ${`${characterUrl}?page=2`}
  `("when the page is `$page`", ({ page, expectedUrl }) => {
    it(`should return \`${expectedUrl}\``, async () => {
      mockUseParams({ page });
      const getData = await testHook(useCharacterUrlAndPage);

      expect(getData().url).toEqual(expectedUrl);
    });
  });
});
