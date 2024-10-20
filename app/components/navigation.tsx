"use client";

import NavigationLink from "./navigation-link";
import { useState } from "react";
import HamburgerIcon from "./icons/hamburger";
import Link from "next/link";

const pages = [
  { name: "Home", path: "/" },
  { name: "Pokémon list", path: "/pokemon" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top bar */}
      <div className="z-10 bg-stone-800 text-white p-4 flex justify-between items-center shadow-xl">
        <Link href="/" className="text-4xl font-bold">
          Pokédex
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <NavigationLink key={page.path} path={page.path} name={page.name} />
          ))}
        </nav>

        {/* Button to open the sidebar on mobile */}
        <button onClick={toggleNavigation} className="text-white md:hidden">
          <HamburgerIcon />
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed min-h-screen z-30 w-64 bg-stone-800 shadow-xl text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="mt-4 mx-4 flex flex-col space-y-2">
          {pages.map((page) => (
            <NavigationLink key={page.path} path={page.path} name={page.name} />
          ))}
        </nav>
      </div>

      {/* Overlay behind mobile sidebar */}
      <button
        className={`fixed z-20 w-screen h-screen bg-stone-950 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out md:hidden`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
