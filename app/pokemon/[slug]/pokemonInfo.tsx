import { PokemonType } from "@/lib/pokeapi/pokemonType";
import type { DetailedPokemon } from "@/lib/pokeapi/queries/getPokemonDetails";
import Image from "next/image";

function typeToBackgroundClass(type: PokemonType) {
  return `bg-pokemontype-${PokemonType[type].toLocaleLowerCase()}`;
}

export default function PokemonInfo({ pokemon }: { pokemon: DetailedPokemon }) {
  return (
    <div>
      <div className="bg-stone-200 rounded-lg shadow-md p-4 md:w-96 flex flex-col space-y-4">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          width={500}
          height={500}
          alt={`${pokemon.name} official artwork`}
          className="bg-stone-400 shadow-md rounded-lg aspect-square object-contain w-full p-2"
        />

        <div className="flex rounded-lg  overflow-hidden">
          {pokemon.types.map((type) => (
            <div
              key={type}
              className={`${typeToBackgroundClass(
                type
              )} grow text-white text-center capitalize font-bold text-sm text-ellipsis overflow-hidden p-2`}
            >
              {PokemonType[type]}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto text-left w-full">
            <thead>
              <tr className="bg-stone-300">
                <th className="px-4 py-2">Stat</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pokemon.stats)
                .filter(([, value]) => value)
                .map(([stat, value]) => (
                  <tr key={stat}>
                    <td className="border px-4 py-2 capitalize">{stat}</td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
