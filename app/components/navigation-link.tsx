import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`p-4 rounded-lg transition ease-in-out hover:bg-stone-700 hover:scale-105 duration-150 ${
        (path !== "/" && pathname.startsWith(path)) ||
        (pathname === "/" && path === "/")
          ? "bg-stone-700"
          : ""
      }`}
    >
      {name}
    </Link>
  );
}
