import gql from "graphql-tag";
import client from "../client";
import { PokemonType } from "../pokemonType";

export enum OrderBy {
  ID = "id",
  Name = "name",
  Weight = "weight",
  Height = "height",
}

export enum OrderDirection {
  Ascending = "asc",
  Descending = "desc",
}

export const GET_FILTERED_POKEMON_QUERY = gql`
  query GetFilteredPokemon(
    $limit: Int!
    $offset: Int!
    $searchRegex: String!
    $orderBy: pokemon_v2_pokemon_order_by!
    $types: [Int!]
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _iregex: $searchRegex }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { id: { _in: $types } } }
      }
      order_by: [$orderBy]
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
    pokemon_v2_pokemon_aggregate(
      where: {
        name: { _iregex: $searchRegex }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { id: { _in: $types } } }
      }
    ) {
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
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        id: number;
      };
    }[];
    pokemon_v2_pokemonsprites?: {
      sprites?: {
        other?: {
          showdown?: {
            front_default?: string;
          };
          "official-artwork"?: {
            front_default?: string;
          };
        };
      };
    }[];
  }[];
  pokemon_v2_pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export type FilteredPokemon = {
  pokemon: {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: {
      showdown?: string;
      officialArtwork?: string;
    };
  }[];
  total: number;
};

const transformFilteredPokemonQueryData = (
  queryResult?: GetFilteredPokemonQueryResult
): FilteredPokemon => {
  if (!queryResult) {
    return {
      pokemon: [],
      total: 0,
    };
  }

  return {
    pokemon: queryResult.pokemon_v2_pokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.pokemon_v2_pokemontypes.map(
        (type) => type.pokemon_v2_type.id
      ),
      sprites:
        pokemon.pokemon_v2_pokemonsprites &&
        pokemon.pokemon_v2_pokemonsprites?.length > 0 &&
        pokemon.pokemon_v2_pokemonsprites[0]?.sprites?.other
          ? {
              showdown:
                pokemon.pokemon_v2_pokemonsprites[0].sprites.other.showdown
                  ?.front_default,
              officialArtwork:
                pokemon.pokemon_v2_pokemonsprites[0].sprites.other[
                  "official-artwork"
                ]?.front_default,
            }
          : {},
    })),
    total: queryResult.pokemon_v2_pokemon_aggregate.aggregate.count,
  };
};

export default async function getFilteredPokemon(
  limit: number,
  page: number,
  search: string | null,
  orderBy: OrderBy,
  orderDirection: OrderDirection,
  type: PokemonType | null
) {
  const { data, errors } = await client.query<GetFilteredPokemonQueryResult>({
    query: GET_FILTERED_POKEMON_QUERY,
    variables: {
      limit,
      offset: (page - 1) * limit,
      searchRegex: search ?? ".*",
      orderBy: { [orderBy]: orderDirection },
      types: type
        ? [type]
        : Object.values(PokemonType).filter(
            (value) => typeof value === "number"
          ),
    },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message);
  }

  return transformFilteredPokemonQueryData(data);
}
