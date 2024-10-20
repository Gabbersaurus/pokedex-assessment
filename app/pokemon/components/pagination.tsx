"use client";

import { useQueryState } from "nuqs";
import ChevronLeftIcon from "../../components/icons/chevron-left";
import ChevronRightIcon from "../../components/icons/chevron-right";
import { searchParamsParsers } from "../searchParams";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useQueryState("page", {
    ...searchParamsParsers.page,
    shallow: false,
  });

  return (
    <div className="w-64 mx-auto flex justify-between mt-4">
      <button
        aria-label="Previous page"
        onClick={() => setPage(page - 1)}
        className={page <= 1 ? "pointer-events-none text-stone-300" : ""}
      >
        <ChevronLeftIcon />
      </button>
      <span>
        page {page} of {Math.max(totalPages, 1)}
      </span>
      <button
        aria-label="Next page"
        onClick={() => setPage(page + 1)}
        className={
          page >= totalPages ? "pointer-events-none text-stone-300" : ""
        }
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
