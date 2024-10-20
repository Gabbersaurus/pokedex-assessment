import Image from "next/image";
import Link from "next/link";
import getFilteredPokemon from "@/lib/pokeapi/queries/getFilteredPokemon";
import Spinner from "../components/spinner";
import Filters from "./filters";
import Pagination from "./pagination";
import { searchParamsCache } from "./searchParams";
import { Suspense } from "react";

export default async function List({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, limit, search } = searchParamsCache.parse(searchParams);
  const filteredPokemon = await getFilteredPokemon(limit, page, search);
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6 lg:gap-6 2xl:gap-x-16">
              {filteredPokemon.pokemon.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className="mb-2 group transition-transform ease-in-out hover:scale-105 duration-150"
                >
                  <Link href={`/pokemon/${pokemon.id}-${pokemon.name}`}>
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
                      width={500}
                      height={500}
                      unoptimized
                      alt={`${pokemon.name} animated sprite`}
                      className="bg-stone-400 shadow-md group-hover:shadow-xl rounded-lg aspect-video object-contain mx-auto p-2 transition-shadow ease-in-out duration-150"
                    />
                    <div className="w-full truncate text-center capitalize">
                      {pokemon.name}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
