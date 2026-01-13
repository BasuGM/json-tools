/**
 * DiffType - Types of differences that can be detected
 */
export type DiffType = "added" | "removed" | "changed" | "type-changed";

/**
 * DiffItem - Represents a single difference between two JSON objects
 */
export interface DiffItem {
  path: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
}

/**
 * getStatusColor - Returns Tailwind color classes for each diff type
 * 
 * Used to visually distinguish different types of changes:
 * - Added: green (new properties)
 * - Removed: red (deleted properties)
 * - Changed: blue (modified values)
 * - Type Changed: yellow (value type changed)
 */
export function getStatusColor(type: DiffType): string {
  switch (type) {
    case "added":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "removed":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "changed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "type-changed":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  }
}

/**
 * getStatusLabel - Returns display label for each diff type
 */
export function getStatusLabel(type: DiffType): string {
  switch (type) {
    case "added":
      return "Added";
    case "removed":
      return "Removed";
    case "changed":
      return "Changed";
    case "type-changed":
      return "Type Changed";
  }
}
