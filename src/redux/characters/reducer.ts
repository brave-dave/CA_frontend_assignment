import { Character } from "./types";
import { MappedList } from "../../types";
import {
  CharactersActionType,
  CharacterState,
  UpdateCharactersAction,
} from "./types";
import { ApiCharacter, ApiEndpoint } from "../../api";

export const charactersInitialState: CharacterState = {
  list: {},
};

type Actions = UpdateCharactersAction;

function getIdFromUrl(
  url: string,
  endpoint: Exclude<ApiEndpoint, ApiEndpoint.CHARACTERS>
) {
  const id = url.replace(endpoint, "");
  return Number(id);
}

function reduceCharactersList(
  stateList: MappedList<Character>,
  actionList: ReadonlyArray<ApiCharacter>
): MappedList<Character> {
  return actionList.reduce(
    (finalList, character) => ({
      ...finalList,
      [character.id]: {
        ...character,
        origin: getIdFromUrl(character.origin.url, ApiEndpoint.LOCATION),
        location: getIdFromUrl(character.location.url, ApiEndpoint.LOCATION),
        episode: character.episode.map((episode) =>
          getIdFromUrl(episode, ApiEndpoint.EPISODE)
        ),
      },
    }),
    stateList
  );
}

export default function charactersReducer(
  state = charactersInitialState,
  action: Actions
) {
  switch (action.type) {
    case CharactersActionType.UPDATE:
      const { currentPage, pages, list } = action;
      return {
        currentPage,
        pages,
        list: reduceCharactersList(state.list, list),
      };
    default:
      return state;
  }
}
