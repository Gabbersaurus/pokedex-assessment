import getAllPokemon from "@/lib/pokeapi/queries/getAllPokemon";
import getPokemonDetails from "@/lib/pokeapi/queries/getPokemonDetails";
import type { DetailedPokemon } from "@/lib/pokeapi/queries/getPokemonDetails";
import { notFound } from "next/navigation";
import PokemonInfo from "./components/pokemonInfo";
import PokemonFlavorTexts from "./components/pokemonFlavorTexts";
import Error from "../../components/error";
import type { Metadata } from "next";
import ucFirst from "@/lib/ucFirst";

type Props = { params: { slug: string } };

function getIdFromSlug(slug: string) {
  return parseInt(slug.split("-")[0], 10);
}

export async function generateStaticParams() {
  const pokemonList = await getAllPokemon();

  return pokemonList.map((pokemon) => ({
    slug: `${pokemon.id}-${pokemon.name}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = getIdFromSlug(params.slug);
  const output: Metadata = { title: "Unknown Pokémon" };

  try {
    const pokemon = await getPokemonDetails(id);
    if (pokemon) {
      output.title = ucFirst(pokemon.name);
      output.openGraph = {
        images: Object.values(pokemon.sprites).filter((image) => image),
      };
      if (pokemon.flavorText.length > 0) {
        output.description = pokemon.flavorText[0].text;
      }
    }
  } catch (error) {
    console.error(error);
  }

  return output;
}

export default async function Detail({ params }: Props) {
  const id = getIdFromSlug(params.slug);
  if (isNaN(id)) {
    notFound();
  }

  let pokemon: DetailedPokemon | null = null;

  try {
    pokemon = await getPokemonDetails(id);
  } catch (error) {
    console.error(error);
    return (
      <div className="grow flex justify-center items-center">
        <Error text="Failed to load Pokémon" />
      </div>
    );
  }

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
