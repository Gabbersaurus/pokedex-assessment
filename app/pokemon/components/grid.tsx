import { PokemonType } from "@/lib/pokeapi/pokemonType";
import type { FilteredPokemon } from "@/lib/pokeapi/queries/getFilteredPokemon";
import Image from "next/image";
import Link from "next/link";

function calculateBorderClasses(pokemon: FilteredPokemon["pokemon"][number]) {
  let output = "border-4";

  if (pokemon.types.length >= 1) {
    output += ` border-pokemontype-${PokemonType[
      pokemon.types[0]
    ].toLocaleLowerCase()}`;
  }

  if (pokemon.types.length >= 2) {
    output += ` border-x-pokemontype-${PokemonType[
      pokemon.types[1]
    ].toLocaleLowerCase()}`;
  }

  if (pokemon.types.length >= 3) {
    output += ` border-r-pokemontype-${PokemonType[
      pokemon.types[2]
    ].toLocaleLowerCase()}`;
  }

  if (pokemon.types.length >= 4) {
    output += ` border-b-pokemontype-${PokemonType[
      pokemon.types[3]
    ].toLocaleLowerCase()}`;
  }

  return output;
}

export default async function Grid({
  filteredPokemon,
}: {
  filteredPokemon: FilteredPokemon;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6 lg:gap-6 2xl:gap-x-16">
      {filteredPokemon.pokemon.map((pokemon) => (
        <div
          key={pokemon.name}
          className="mb-2 group transition-transform ease-in-out hover:scale-105 duration-150"
        >
          <Link href={`/pokemon/${pokemon.id}-${pokemon.name}`}>
            <Image
              src={
                pokemon.sprites.showdown ??
                pokemon.sprites.officialArtwork ??
                "/placeholder.svg"
              }
              width={500}
              height={500}
              unoptimized={pokemon.sprites.showdown ? true : false}
              alt={`${pokemon.name} ${
                pokemon.sprites.showdown
                  ? "animated sprite"
                  : "official artwork"
              }`}
              className={`${calculateBorderClasses(
                pokemon
              )} bg-stone-400 shadow-md group-hover:shadow-xl rounded-lg aspect-video object-contain mx-auto p-2 transition-shadow ease-in-out duration-150 flex items-center justify-center`}
            />
            <div className="w-full truncate text-center capitalize">
              {pokemon.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
