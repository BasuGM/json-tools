"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * ThemeProvider - Wrapper for next-themes provider
 * 
 * Provides theme context to the entire application.
 * Enables light/dark mode switching with system preference support.
 * 
 * Must be used at the root layout level to provide theme to all components.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
