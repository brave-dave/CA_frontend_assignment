import { Character } from "./types";

export function mockCharacter(
  partialCharacter: Partial<Character> = {}
): Character {
  return {
    id: 19,
    name: "string",
    status: "string",
    species: "string",
    type: "string",
    gender: "string",
    origin: 1,
    location: 3,
    image: "string",
    episode: [5],
    ...partialCharacter,
  };
}
