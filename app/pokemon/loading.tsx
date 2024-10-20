import Spinner from "../components/spinner";
import Filters from "./components/filters";
import Pagination from "./components/pagination";

export default function Loading() {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Pokémon List</h1>

      <Filters />
      <div className="grow w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
      <Pagination totalPages={0} />
    </div>
  );
}
