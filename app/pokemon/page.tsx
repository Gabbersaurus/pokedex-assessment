import getFilteredPokemon from "@/lib/pokeapi/queries/getFilteredPokemon";
import Spinner from "../components/spinner";
import Filters from "./filters";
import Grid from "./grid";
import Pagination from "./pagination";
import { searchParamsCache } from "./searchParams";
import { Suspense } from "react";

export default async function PokemonOverview({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, limit, search, orderBy, orderDirection, type } =
    searchParamsCache.parse(searchParams);
  const filteredPokemon = await getFilteredPokemon(
    limit,
    page,
    search,
    orderBy,
    orderDirection,
    type
  );
  const totalPages = Math.ceil(filteredPokemon.total / limit);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Pokémon List</h1>

      <Filters />
      <Suspense fallback={<Spinner />}>
        <div className="grow">
          {filteredPokemon.pokemon.length < 1 ? (
            <div className="w-full h-full flex justify-center items-center">
              No Pokémon found
            </div>
          ) : (
            <Grid filteredPokemon={filteredPokemon} />
          )}
        </div>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
