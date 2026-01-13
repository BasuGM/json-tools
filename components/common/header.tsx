"use client";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { usePathname } from "next/navigation";

/**
 * Maps pathname to page title
 * Returns dynamic title based on current route
 */
const getPageTitle = (pathname: string) => {
  const routes: Record<string, string> = {
    "/": "JSON Tools",
    "/formatter": "JSON Formatter / Beautifier",
    "/validator": "JSON Validator",
    "/converter": "JSON ↔ JavaScript Object Converter",
    "/diff": "JSON Diff Tool",
    "/cleanup": "JSON Cleanup Tool",
    "/analyzer": "JSON Size Analyzer",
    "/minifier": "JSON Minifier",
    "/visualizer": "JSON Visualizer",
    "/json-to-xml": "JSON to XML",
  };
  return routes[pathname] || "JSON Tools";
};

/**
 * Header - Sticky application header with dynamic page title
 * 
 * Features:
 * - Sticky positioning at top of viewport
 * - Dynamic title based on current route
 * - Theme toggle button
 * - Backdrop blur effect
 * - Responsive layout
 * - Home link on title
 * 
 * Updates automatically when navigating between pages.
 */
export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-6">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">{title}</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
