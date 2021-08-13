import { ApiDataError, ApiDataMap, ApiEndpoint } from "./types";

export * from "./types";

export default function fetchFromApi<E extends ApiEndpoint>(
  endpoint: E,
  pageOrId: number
): Promise<ApiDataMap[E]> {
  return fetch(`${endpoint}${pageOrId}`).then((res) => res.json());
}

export function isApiDataError<E extends ApiEndpoint>(
  response: ApiDataMap[E]
): response is ApiDataError {
  return response.hasOwnProperty("error");
}
