import gql from "graphql-tag";
import client from "../client";

export const GET_ALL_POKEMON_QUERY = gql`
  query GetAllPokemon {
    pokemon_v2_pokemon {
      id
      name
    }
  }
`;

export type GetAllPokemonQueryResult = {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
  }[];
};

type TransformedResult = GetAllPokemonQueryResult["pokemon_v2_pokemon"];

const transformAllPokemonQueryData = (
  queryResult?: GetAllPokemonQueryResult
): TransformedResult => {
  if (!queryResult) {
    return [];
  }

  return queryResult.pokemon_v2_pokemon;
};

export default async function getAllPokemon() {
  const { data, errors } = await client.query<GetAllPokemonQueryResult>({
    query: GET_ALL_POKEMON_QUERY,
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message);
  }

  return transformAllPokemonQueryData(data);
}
