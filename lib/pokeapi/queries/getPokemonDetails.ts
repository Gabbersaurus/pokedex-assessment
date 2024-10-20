import gql from "graphql-tag";
import client from "../client";
import { PokemonType } from "../pokemonType";
import { PokemonStat } from "../pokemonStat";

export const GET_POKEMON_DETAILS_QUERY = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      weight
      height
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          id
        }
      }
      pokemon_v2_pokemongameindices {
        pokemon_v2_version {
          name
          pokemon_v2_pokemonspeciesflavortexts(
            where: { pokemon_species_id: { _eq: $id }, language_id: { _eq: 9 } }
          ) {
            flavor_text
          }
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export type GetPokemonDetailsQueryResult = {
  pokemon_v2_pokemon_by_pk: {
    id: number;
    name: string;
    weight: number; //hectogram
    height: number; //decimeters
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        id: number;
      };
    }[];
    pokemon_v2_pokemonstats: {
      base_stat: number;
      pokemon_v2_stat: {
        id: number;
      };
    }[];
    pokemon_v2_pokemongameindices: {
      pokemon_v2_version: {
        name: string;
        pokemon_v2_pokemonspeciesflavortexts: {
          flavor_text: string;
        }[];
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
  };
};

/**
 * Transformed result
 */
export type DetailedPokemon = {
  id: number;
  name: string;
  weight: number; //kilogram
  height: number; //centimeters
  types: PokemonType[];
  stats: {
    [key in keyof typeof PokemonStat]?: number;
  };
  flavorText: {
    game: string;
    text: string;
  }[];
  sprites: {
    showdown?: string;
    officialArtwork?: string;
  };
};

const transformPokemonDetailsQueryData = (
  queryResult?: GetPokemonDetailsQueryResult
): DetailedPokemon | null => {
  if (!queryResult) {
    return null;
  }

  return {
    id: queryResult.pokemon_v2_pokemon_by_pk.id,
    name: queryResult.pokemon_v2_pokemon_by_pk.name,
    weight: queryResult.pokemon_v2_pokemon_by_pk.weight * 0.1,
    height: queryResult.pokemon_v2_pokemon_by_pk.height * 10,
    types: queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.id
    ),
    stats: Object.fromEntries(
      queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats.map(
        (stat) => [PokemonStat[stat.pokemon_v2_stat.id], stat.base_stat]
      )
    ),
    flavorText:
      queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemongameindices
        .filter(
          (game) =>
            game.pokemon_v2_version.pokemon_v2_pokemonspeciesflavortexts
              .length > 0
        )
        .map((game) => ({
          game: game.pokemon_v2_version.name,
          text: game.pokemon_v2_version.pokemon_v2_pokemonspeciesflavortexts[0]
            .flavor_text,
        })),
    sprites:
      queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites &&
      queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites?.length >
        0 &&
      queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]?.sprites
        ?.other
        ? {
            showdown:
              queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]
                .sprites.other.showdown?.front_default,
            officialArtwork:
              queryResult.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]
                .sprites.other["official-artwork"]?.front_default,
          }
        : {},
  };
};

export default async function getPokemonDetails(id: number) {
  const { data, errors } = await client.query<GetPokemonDetailsQueryResult>({
    query: GET_POKEMON_DETAILS_QUERY,
    variables: {
      id,
    },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message);
  }

  return transformPokemonDetailsQueryData(data);
}
