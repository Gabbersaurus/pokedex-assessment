import {
  OrderBy,
  OrderDirection,
} from "@/lib/pokeapi/queries/getFilteredPokemon";
import {
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
  parseAsString,
} from "nuqs/server";

export function stringToOrderBy(input: string) {
  switch (input) {
    case OrderBy.Name:
      return OrderBy.Name;
    case OrderBy.Weight:
      return OrderBy.Weight;
    case OrderBy.Height:
      return OrderBy.Height;
    default:
      return OrderBy.ID;
  }
}

export function stringToOrderDirection(input: string) {
  switch (input) {
    case OrderDirection.Descending:
      return OrderDirection.Descending;
    default:
      return OrderDirection.Ascending;
  }
}

export const searchParamsParsers = {
  search: parseAsString,
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(30),
  orderBy: parseAsStringEnum<OrderBy>(Object.values(OrderBy)).withDefault(
    OrderBy.ID
  ),
  orderDirection: parseAsStringEnum<OrderDirection>(
    Object.values(OrderDirection)
  ).withDefault(OrderDirection.Ascending),
  type: parseAsInteger,
};
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
