import getFilteredPokemon, {
  FilteredPokemon,
} from "@/lib/pokeapi/queries/getFilteredPokemon";
import Spinner from "../components/spinner";
import Filters from "./components/filters";
import Grid from "./components/grid";
import Pagination from "./components/pagination";
import { searchParamsCache } from "./searchParams";
import { Suspense } from "react";
import Error from "../components/error";

export default async function PokemonOverview({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, limit, search, orderBy, orderDirection, type } =
    searchParamsCache.parse(searchParams);

  let displayError = false;
  let filteredPokemon: FilteredPokemon = { pokemon: [], total: 0 };

  try {
    filteredPokemon = await getFilteredPokemon(
      limit,
      page,
      search,
      orderBy,
      orderDirection,
      type
    );
  } catch (error) {
    console.error(error);
    displayError = true;
  }

  const totalPages = Math.ceil(filteredPokemon.total / limit);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Pokémon List</h1>

      <Filters />
      <div className="grow">
        {displayError ? (
          <div className="w-full h-full flex justify-center items-center">
            <Error text="Something went wrong while fetching Pokémon. Please try again later." />
          </div>
        ) : filteredPokemon.pokemon.length < 1 ? (
          <div className="w-full h-full flex justify-center items-center">
            No Pokémon found
          </div>
        ) : (
          <Grid filteredPokemon={filteredPokemon} />
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
