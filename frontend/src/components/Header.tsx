"use client";
import Link from "next/link";
import { QrCode, Menu, X } from "lucide-react";
import * as React from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <QrCode className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-zinc-800 dark:text-white">
            One-Qr-Gen
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/upi" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            UPI
          </Link>
          <Link href="/upiaccount" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Bank Account
          </Link>
          <Link href="/vcard" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            vCard
          </Link>
          <Link href="/url" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            URL
          </Link>
          <Link href="/unique" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Unique
          </Link>
        </nav>
          {/* {mounted ? (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          ) : (
            <div className="w-10 h-10" /> // Placeholder to prevent layout shift
          )} */}
          <button
            className="md:hidden p-2 rounded-md text-zinc-800 dark:text-zinc-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-zinc-900 shadow-lg absolute top-full left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/upi" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              UPI
            </Link>
            <Link href="/upiaccount" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              Bank Account
            </Link>
            <Link href="/vcard" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              vCard
            </Link>
            <Link href="/url" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              URL
            </Link>
            <Link href="/unique" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              Unique
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
