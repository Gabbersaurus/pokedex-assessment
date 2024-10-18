"use client";

import NavigationLink from "./navigation-link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import HamburgerIcon from "./icons/hamburger";

const pages = [
  { name: "Home", path: "/" },
  { name: "Pokémon list", path: "/list" },
  { name: "Pokémon comparator", path: "/compare" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-stone-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Pokédex</div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <NavigationLink path={page.path} name={page.name} />
          ))}
        </nav>

        {/* Button to open the sidebar on mobile */}
        <button onClick={toggleNavigation} className="text-white md:hidden">
          <HamburgerIcon />
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed min-h-screen z-30 w-64 bg-stone-800 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="mt-4 mx-4 flex flex-col space-y-2">
          {pages.map((page) => (
            <NavigationLink path={page.path} name={page.name} />
          ))}
        </nav>
      </div>

      {/* Overlay behind mobile sidebar */}
      {isOpen && (
        <div
          className="fixed w-screen h-screen bg-stone-950 opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
