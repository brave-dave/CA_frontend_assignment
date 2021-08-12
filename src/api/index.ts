import { ApiDataMap, ApiEndpoint } from "./types";

export * from "./types";

export default function fetchFromApi<E extends ApiEndpoint>(
  endpoint: E,
  pageOrId: number
): Promise<ApiDataMap[E]> {
  return fetch(`${endpoint}${pageOrId}`).then((res) => res.json());
}
