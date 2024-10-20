# Pokédex Assessment

This assessment was made to demonstrate my frontend webdevelopment and API integration skills, following Blue Flamingos' assessment description. I used a self-hosted version of the [GraphQL PokeAPI](https://pokeapi.co/docs/graphql) to fetch and display the Pokémon.
The project is hosted by Vercel and can be found at [pokedex-assessment.vercel.app](https://pokedex-assessment.vercel.app).

## Getting Started

First, run the development server:

```bash
pnpm  dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .ENV

As stated before, I self-hosted the GraphQL PokeAPI for this. I will likeley not keep it running forever.
Because of this, I moved the API url to the env, so I can later switch it back to the official API.
Copy `.env.local.example` to `.env.local` to fill in the API url for local development.
