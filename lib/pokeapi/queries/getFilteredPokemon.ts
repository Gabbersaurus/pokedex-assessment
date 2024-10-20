import gql from "graphql-tag";
import client from "../client";

export const GET_FILTERED_POKEMON_QUERY = gql`
  query GetFilteredPokemon($limit: Int!, $offset: Int!, $searchRegex: String!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _iregex: $searchRegex } }
    ) {
      id
      name
    }
    pokemon_v2_pokemon_aggregate(where: { name: { _iregex: $searchRegex } }) {
      aggregate {
        count
      }
    }
  }
`;

export type GetFilteredPokemonQueryResult = {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
  }[];
  pokemon_v2_pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

type TransformedResult = {
  pokemon: GetFilteredPokemonQueryResult["pokemon_v2_pokemon"];
  total: number;
};

const transformFilteredPokemonQueryData = (
  queryResult?: GetFilteredPokemonQueryResult
): TransformedResult => {
  if (!queryResult) {
    return {
      pokemon: [],
      total: 0,
    };
  }

  return {
    pokemon: queryResult.pokemon_v2_pokemon,
    total: queryResult.pokemon_v2_pokemon_aggregate.aggregate.count,
  };
};

export default async function getFilteredPokemon(
  limit: number,
  page: number,
  search: string | null
) {
  const { data } = await client.query<GetFilteredPokemonQueryResult>({
    query: GET_FILTERED_POKEMON_QUERY,
    variables: {
      limit,
      offset: (page - 1) * limit,
      searchRegex: search ?? ".*",
    },
  });

  return transformFilteredPokemonQueryData(data);
}
