import {
  parseAsInteger,
  createSearchParamsCache,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  search: parseAsString,
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(30),
};
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
