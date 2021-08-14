import { testHook } from "../../testsUtils";
import usePageButtons from "./usePageButtons";

describe("components/Pagination/usePageButtons", () => {
  it.each`
    pages  | currentPage | expectedButtons
    ${2}   | ${1}        | ${["1", "2"]}
    ${5}   | ${1}        | ${["1", "2", "3", "4", "5"]}
    ${7}   | ${2}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${7}   | ${3}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${7}   | ${4}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${7}   | ${5}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${7}   | ${6}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${7}   | ${7}        | ${["1", "2", "3", "4", "5", "6", "7"]}
    ${10}  | ${1}        | ${["1", "2", "3", "4", "5", "...", "10"]}
    ${10}  | ${5}        | ${["1", "...", "4", "5", "6", "...", "10"]}
    ${10}  | ${10}       | ${["1", "...", "6", "7", "8", "9", "10"]}
    ${100} | ${1}        | ${["1", "2", "3", "4", "5", "...", "100"]}
    ${100} | ${30}       | ${["1", "...", "29", "30", "31", "...", "100"]}
    ${100} | ${98}       | ${["1", "...", "96", "97", "98", "99", "100"]}
  `(
    "should return the right array: $expectedButtons",
    async ({ pages, currentPage, expectedButtons }) => {
      const getButtons = await testHook(usePageButtons, { pages, currentPage });

      expect(getButtons()).toEqual(expectedButtons);
    }
  );
});
