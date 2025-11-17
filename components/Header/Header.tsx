"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Users", path: "/users" },
    { name: "tic-tac-toe", path: "/tic-tac-toe" },
  ];

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50 mb-[90px]">
      <div
        className="
          w-full 
          max-w-[4000px] 
          mx-auto 
          flex items-center justify-between 
          h-16 
          px-3 sm:px-4 md:px-6 lg:px-10
        "
      >
        {/* LOGO */}
        <Link href="/" className="text-2xl font-semibold text-blue-600">
          Nani
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {links.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium ${
                pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4">
          {links.map(link => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`block text-base font-medium ${
                pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
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
