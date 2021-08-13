import { Character, UpdateCharactersCurrentPageAction } from "./types";
import { MappedList } from "../../types";
import {
  CharactersActionType,
  CharactersState,
  UpdateCharactersAction,
} from "./types";
import { ApiCharacter, ApiEndpoint } from "../../api";

export const charactersInitialState: CharactersState = {
  pagesContent: {},
};

type Actions = UpdateCharactersAction | UpdateCharactersCurrentPageAction;

function getIdFromUrl(
  url: string,
  endpoint: Exclude<ApiEndpoint, ApiEndpoint.CHARACTERS>
) {
  const id = url.replace(endpoint, "");
  return Number(id);
}

function reduceCharactersPagesContent(
  pagesContent: ReadonlyArray<ApiCharacter>
): MappedList<Character> {
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
        pagesContent: {
          ...state.pagesContent,
          [currentPage]: reduceCharactersPagesContent(list),
        } as MappedList<ReadonlyArray<Character>>,
      };
    case CharactersActionType.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
}
