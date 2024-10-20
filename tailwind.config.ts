import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pokemontype-normal": "#A8A77A",
        "pokemontype-fighting": "#C22E28",
        "pokemontype-flying": "#A98FF3",
        "pokemontype-poison": "#A33EA1",
        "pokemontype-ground": "#E2BF65",
        "pokemontype-rock": "#B6A136",
        "pokemontype-bug": "#A6B91A",
        "pokemontype-ghost": "#735797",
        "pokemontype-steel": "#B7B7CE",
        "pokemontype-fire": "#EE8130",
        "pokemontype-water": "#6390F0",
        "pokemontype-grass": "#7AC74C",
        "pokemontype-electric": "#F7D02C",
        "pokemontype-psychic": "#F95587",
        "pokemontype-ice": "#96D9D6",
        "pokemontype-dragon": "#6F35FC",
        "pokemontype-dark": "#705746",
        "pokemontype-fairy": "#D685AD",
        "pokemontype-stellar": "#40B5A5",
        "pokemontype-unknown": "#68A090",
        "pokemontype-shadow": "#735797",
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border(-[xytblr])?)-pokemontype-.*/,
    },
  ],
};
export default config;
