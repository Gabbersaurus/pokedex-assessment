import type { DetailedPokemon } from "@/lib/pokeapi/queries/getPokemonDetails";

/**
 * Replaces whitespaces that touch other non-whitespace characters (so in between words) with spaces.
 * Other whitespaces are removed completely.
 */
function removeWhitespaces(flavorText: string) {
  let output = flavorText.replace(/(?<=\S)\n|\f(?=\S)/g, " ");
  output = output.replace(/\s*\n|\f\s*/g, "");

  return output;
}

export default function PokemonFlavorTexts({
  pokemon,
}: {
  pokemon: DetailedPokemon;
}) {
  return (
    <div className="bg-stone-200 rounded-lg shadow-md grow p-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-4">Flavor Texts</h1>
      {pokemon.flavorText.length < 1 ? (
        <div>No game flavor texts found...</div>
      ) : (
        <ul className="list-none divide-y-2 divide-stone-300 space-y-2">
          {pokemon.flavorText.map((flavor) => (
            <li key={flavor.game} className="pt-2 first:pt-0 last:pt-0">
              <strong className="block capitalize">{flavor.game}</strong>
              <span>{removeWhitespaces(flavor.text)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
