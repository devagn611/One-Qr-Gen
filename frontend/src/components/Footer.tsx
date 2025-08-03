"use client";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-zinc-600 dark:text-zinc-400 text-center md:text-left">
          © {new Date().getFullYear()} One-Qr-Gen. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/devagn611"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          {/* <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a> */}
        </div>
      </div>
    </footer>
  );
}
