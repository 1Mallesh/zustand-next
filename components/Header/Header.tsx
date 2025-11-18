"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [searchOpen, setSearchOpen] = useState(false); // search input open
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const totalItems = useCartStore((s) =>
    s.cart.reduce((sum, item) => sum + (item.qty ?? 1), 0)
  );

  const links = [
    { name: "about", path: "/about" },
    { name: "Users", path: "/users" },
    { name: "tic-tac-toe", path: "/tic-tac-toe" },
    { name: "service", path: "/service" },
  ];

  // Search index for fuzzy/OCR-like search
  const searchIndex = [
    {
      title: "About Page",
      description: "Information about me, my portfolio and experience",
      url: "/about",
      keywords: "about developer frontend nani gouthami",
    },
    {
      title: "Users Page",
      description: "Full list of registered users",
      url: "/users",
      keywords: "users list profile accounts",
    },
    {
      title: "Tic Tac Toe Game",
      description: "Play tic-tac-toe on the website",
      url: "/tic-tac-toe",
      keywords: "game tic tac toe play js",
    },
    {
      title: "Services",
      description: "My development and design services",
      url: "/service",
      keywords: "services web development ui",
    },
  ];

  const [results, setResults] = useState<any[]>([]);

  // Focus input when open
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // ESC closes search
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Click outside closes search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  };

  const runSearch = (text: string) => {
    const q = text.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }
    const matches = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
    setResults(matches);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    runSearch(query);
    closeSearch();
  };

  return (
    <header className="w-full bg-white sticky top-0 left-0 z-50 shadow-lg">
      <div className="w-full max-w-[4000px] mx-auto flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 lg:px-10">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-semibold text-blue-600">
          Nani
        </Link>
        {/* Mallesh Subbanna. */}

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative text-sm font-medium group 
                ${pathname === link.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
              `}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left transform transition-all duration-300
                  ${pathname === link.path
                    ? "scale-x-100 bg-blue-600"
                    : "scale-x-0 bg-blue-600 group-hover:scale-x-100"}
                `}
              ></span>
            </Link>
          ))}

          {/* SEARCH */}
          <div className="relative" ref={searchContainerRef}>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Search size={18} />
            </button>

            <form
              onSubmit={handleSearchSubmit}
              className={`absolute right-0 top-0 flex items-center overflow-hidden rounded-md bg-white shadow-md transition-all duration-300
                ${searchOpen ? "w-72 opacity-100" : "w-0 opacity-0"}
              `}
              style={{ minHeight: 40 }}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  runSearch(e.target.value);
                }}
                className="w-full px-3 py-2 outline-none text-sm"
                placeholder="Search entire website..."
              />
              <button
                type="submit"
                className="px-3 py-2 border-l text-sm hover:bg-gray-50"
              >
                Go
              </button>
            </form>

            {results.length > 0 && searchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-md border p-3 z-50">
                {results.map((r, i) => (
                  <Link
                    key={i}
                    href={r.url}
                    className="block p-2 rounded hover:bg-gray-100"
                    onClick={closeSearch}
                  >
                    <p className="font-medium text-sm">{r.title}</p>
                    <p className="text-xs text-gray-600">{r.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CART DESKTOP */}
          <Link
            href="/cart"
            className="relative p-2 rounded-md hover:bg-gray-100"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-[1px] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* MOBILE SEARCH + CART + MENU */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Search size={18} />
          </button>

          {/* Cart icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-md hover:bg-gray-100"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-[1px] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu icon */}
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH INPUT */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                runSearch(e.target.value);
              }}
              className="flex-1 px-3 py-2 rounded-lg border outline-none"
              placeholder="Search entire website..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`block text-base font-medium ${
                pathname === link.path ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
