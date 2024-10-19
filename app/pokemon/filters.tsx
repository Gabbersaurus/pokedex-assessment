"use client";

import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "./searchParams";
import { useEffect, useState } from "react";

export default function Filters() {
  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
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
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
}
