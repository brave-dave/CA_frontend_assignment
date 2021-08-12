import { Character } from "./types";
import { MappedList } from "../../types";
import {
  CharactersActionType,
  CharacterState,
  UpdateCharactersAction,
} from "./types";

export const charactersInitialState: CharacterState = {
  list: {},
};

type Actions = UpdateCharactersAction;

function reduceCharactersList(
  stateList: MappedList<Character>,
  actionList: ReadonlyArray<Character>
): MappedList<Character> {
  return actionList.reduce(
    (finalList, character) => ({ ...finalList, [character.id]: character }),
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
