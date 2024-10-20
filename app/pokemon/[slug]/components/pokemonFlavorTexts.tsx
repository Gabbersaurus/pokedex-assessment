import type { DetailedPokemon } from "@/lib/pokeapi/queries/getPokemonDetails";

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
              <span>{flavor.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
