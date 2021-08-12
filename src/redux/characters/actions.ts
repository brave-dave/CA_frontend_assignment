import { CharactersActionType, UpdateCharactersAction } from "./types";

export function updateCharacters(
  props: Omit<UpdateCharactersAction, "type">
): UpdateCharactersAction {
  return { type: CharactersActionType.UPDATE, ...props };
}
