import useCharacterUrl from ".";
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

describe("hooks/useCharacterUrl", () => {
  describe.each`
    page           | expectedUrl
    ${undefined}   | ${characterUrl}
    ${"-1"}        | ${undefined}
    ${"0"}         | ${undefined}
    ${"badNumber"} | ${undefined}
    ${"1"}         | ${`${characterUrl}?page=1`}
  `("when the page is `$page`", ({ page, expectedUrl }) => {
    it(`should return \`${expectedUrl}\``, async () => {
      mockUseParams({ page });
      const getUrl = await testHook(useCharacterUrl);

      expect(getUrl()).toEqual(expectedUrl);
    });
  });
});
