import {
  Character,
  UpdateCharactersCurrentPageAction,
  UpdateCharactersPageNotFoundAction,
} from "./types";
import {
  CharactersActionType,
  CharactersState,
  UpdateCharactersAction,
} from "./types";
import { ApiCharacter, ApiEndpoint } from "../../api";

export const charactersInitialState: CharactersState = {
  pagesStatuses: {},
};

type Actions =
  | UpdateCharactersAction
  | UpdateCharactersCurrentPageAction
  | UpdateCharactersPageNotFoundAction;

function getIdFromUrl(
  url: string,
  endpoint: Exclude<ApiEndpoint, ApiEndpoint.CHARACTERS>
) {
  const id = url.replace(endpoint, "");
  return Number(id);
}

function reduceCharactersPagesContent(
  pagesContent: ReadonlyArray<ApiCharacter>
): ReadonlyArray<Character> {
  return pagesContent.map((character) => ({
    ...character,
    origin: getIdFromUrl(character.origin.url, ApiEndpoint.LOCATION),
    location: getIdFromUrl(character.location.url, ApiEndpoint.LOCATION),
    episode: character.episode.map((episode) =>
      getIdFromUrl(episode, ApiEndpoint.EPISODE)
    ),
  }));
}

export default function charactersReducer(
  state = charactersInitialState,
  action: Actions
): CharactersState {
  switch (action.type) {
    case CharactersActionType.UPDATE:
      const { currentPage, pages, list } = action;
      return {
        currentPage,
        pages,
        pagesStatuses: {
          ...state.pagesStatuses,
          [currentPage]: { content: reduceCharactersPagesContent(list) },
        },
      };
    case CharactersActionType.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case CharactersActionType.UPDATE_PAGE_NOT_FOUND:
      return {
        ...state,
        pagesStatuses: {
          ...state.pagesStatuses,
          [action.page]: { isNotFound: true },
        },
      };
    default:
      return state;
  }
}
