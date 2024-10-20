"use client";

import { useQueryStates } from "nuqs";
import {
  searchParamsParsers,
  stringToOrderBy,
  stringToOrderDirection,
} from "./searchParams";
import { useEffect, useState } from "react";
import {
  OrderBy,
  OrderDirection,
} from "@/lib/pokeapi/queries/getFilteredPokemon";
import { PokemonType } from "@/lib/pokeapi/pokemonType";

export default function Filters() {
  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
    clearOnDefault: true,
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.search ?? "");

  //Debounce setting searchterm onto searchParams
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams({
        search: searchTerm === "" ? null : searchTerm, //Setting null removes it from the URL
        page: 1,
      });
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setSearchParams]);

  return (
    <div className="mb-4 flex flex-col md:flex-row space-y-4 space-x-0 md:space-x-4 md:space-y-0">
      <div>
        <label htmlFor="input-search" className="block mb-1 font-semibold">
          Search
        </label>
        <input
          id="input-search"
          type="text"
          placeholder="Search Pokémon (with Regex)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="p-2 border border-stone-300 rounded-lg w-full md:min-w-64"
        />
      </div>

      <div className="flex flex-row space-x-4">
        <div className="overflow-hidden">
          <label
            htmlFor="input-type"
            className="block mb-1 font-semibold overflow-hidden text-ellipsis text-nowrap"
          >
            Type
          </label>
          <select
            id="input-type"
            value={searchParams.type ?? ""}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                type: e.target.value ? parseInt(e.target.value) : null,
                page: 1,
              })
            }
            className="p-2 border border-stone-300 rounded-lg w-full font-sans overflow-hidden text-ellipsis"
          >
            <option value="">None</option>
            {Object.entries(PokemonType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        <div className="overflow-hidden">
          <label
            htmlFor="input-sort"
            className="block mb-1 font-semibold overflow-hidden text-ellipsis"
          >
            Sort
          </label>
          <select
            id="input-sort"
            value={searchParams.orderBy}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                orderBy: stringToOrderBy(e.target.value),
                page: 1,
              })
            }
            className="p-2 border border-stone-300 rounded-lg w-full font-sans overflow-hidden text-ellipsis"
          >
            {Object.entries(OrderBy).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden">
          <label
            htmlFor="input-sort-direction"
            className="block mb-1 font-semibold overflow-hidden text-ellipsis text-nowrap"
          >
            Direction
          </label>
          <select
            id="input-sort-direction"
            value={searchParams.orderDirection}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                orderDirection: stringToOrderDirection(e.target.value),
                page: 1,
              })
            }
            className="p-2 border border-stone-300 rounded-lg w-full font-sans overflow-hidden text-ellipsis"
          >
            {Object.entries(OrderDirection).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
