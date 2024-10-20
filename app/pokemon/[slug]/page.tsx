import getAllPokemon from "@/lib/pokeapi/queries/getAllPokemon";
import getPokemonDetails from "@/lib/pokeapi/queries/getPokemonDetails";
import { notFound } from "next/navigation";
import PokemonInfo from "./pokemonInfo";
import PokemonFlavorTexts from "./pokemonFlavorTexts";

export async function generateStaticParams() {
  const pokemonList = await getAllPokemon();

  return pokemonList.map((pokemon) => ({
    slug: `${pokemon.id}-${pokemon.name}`,
  }));
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const id = parseInt(params.slug.split("-")[0], 10);
  if (isNaN(id)) {
    notFound();
  }

  const pokemon = await getPokemonDetails(id);
  if (!pokemon) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <PokemonInfo pokemon={pokemon} />
        <PokemonFlavorTexts pokemon={pokemon} />
      </div>
    </div>
  );
}
