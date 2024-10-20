import Link from "next/link";
import ExternalLink from "./components/external-link";

export default function Home() {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">
        Pokédex Assessment
        <span className="block text-2xl">for Blue Flamingos</span>
      </h1>

      <div className="p-4 bg-white rounded-lg shadow-md mt-10 max-w-xl">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <p>
          This assesment was made by{" "}
          <ExternalLink
            path="https://www.linkedin.com/in/pascal-bouwhuis/"
            text="Pascal Bouwhuis"
          />{" "}
          to demonstrate my frontend webdevelopment and API integration skills,
          following Blue Flamingos&apos; assesment description. I used a
          self-hosted version of the{" "}
          <ExternalLink
            path="https://pokeapi.co/docs/graphql"
            text="GraphQL PokeAPI"
          />{" "}
          to fetch and display the Pokémon.
        </p>
        <p>
          Head over to the{" "}
          <Link href={"/pokemon"} className="text-blue-600 hover:underline">
            /pokemon
          </Link>{" "}
          page to explore the Pokémon collection!
        </p>
        <p>
          The source code for this assesment can be found on{" "}
          <ExternalLink
            path="https://github.com/Gabbersaurus/pokedex-assessment"
            text="Github"
          />
          .
        </p>
      </div>
    </div>
  );
}
