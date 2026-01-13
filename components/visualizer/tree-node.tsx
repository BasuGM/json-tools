import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * TreeNodeProps - Props for the TreeNode component
 */
interface TreeNodeProps {
  name: string;
  value: any;
  level?: number;
}

/**
 * TreeNode - Recursive component for visualizing JSON as an interactive tree
 * 
 * Features:
 * - Collapsible nodes with chevron icons
 * - Auto-expand first 2 levels for easy viewing
 * - Color-coded types (string=green, number=blue, boolean=purple, etc.)
 * - Collection counts for arrays and objects
 * - Indentation to show hierarchy
 * - Hover effects for better interaction
 * 
 * Handles all JSON data types:
 * - Objects: Display as expandable nodes with property counts
 * - Arrays: Display as expandable nodes with element counts
 * - Primitives: Display inline with appropriate formatting
 * - Null: Display as "null" in gray
 */
export function TreeNode({ name, value, level = 0 }: TreeNodeProps) {
  // Auto-expand first 2 levels for better UX
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
  const isObject = typeof value === "object" && value !== null;
  const isArray = Array.isArray(value);
  const indent = level * 24; // 24px per level

  /**
   * Determines the data type for color coding
   */
  const getValueType = (val: any): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  /**
   * Returns Tailwind color classes for each data type
   */
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600 dark:text-green-400";
      case "number":
        return "text-blue-600 dark:text-blue-400";
      case "boolean":
        return "text-purple-600 dark:text-purple-400";
      case "null":
        return "text-gray-600 dark:text-gray-400";
      case "array":
        return "text-orange-600 dark:text-orange-400";
      case "object":
        return "text-cyan-600 dark:text-cyan-400";
      default:
        return "";
    }
  };

  /**
   * Formats primitive values for display
   */
  const renderValue = (val: any): string => {
    if (val === null) return "null";
    if (typeof val === "string") return `"${val}"`;
    if (typeof val === "boolean") return val.toString();
    if (typeof val === "number") return val.toString();
    return "";
  };

  /**
   * Shows collection size for arrays and objects
   */
  const getCollectionInfo = (val: any): string => {
    if (Array.isArray(val)) {
      return `[${val.length}]`;
    }
    if (typeof val === "object" && val !== null) {
      return `{${Object.keys(val).length}}`;
    }
    return "";
  };

  // Render objects and arrays as expandable nodes
  if (isObject) {
    const entries = isArray
      ? value.map((item: any, index: number) => [index.toString(), item])
      : Object.entries(value);

    return (
      <div>
        {/* Node header with expand/collapse */}
        <div
          className="flex items-center gap-2 py-1 hover:bg-accent/50 cursor-pointer rounded px-2"
          style={{ paddingLeft: `${indent}px` }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Chevron icon */}
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}

          {/* Property name */}
          <span className="font-mono font-semibold text-sm">{name}</span>

          {/* Type indicator and collection count */}
          <span className={`text-xs ${getTypeColor(getValueType(value))}`}>
            {getValueType(value)}
          </span>
          <span className="text-xs text-muted-foreground">
            {getCollectionInfo(value)}
          </span>
        </div>

        {/* Child nodes (shown when expanded) */}
        {isExpanded && (
          <div>
            {entries.map(([key, val]) => (
              <TreeNode key={key} name={key} value={val} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render primitive values inline
  return (
    <div
      className="flex items-center gap-2 py-1 hover:bg-accent/50 rounded px-2"
      style={{ paddingLeft: `${indent + 24}px` }}
    >
      {/* Property name */}
      <span className="font-mono font-semibold text-sm">{name}</span>

      {/* Type indicator */}
      <span className={`text-xs ${getTypeColor(getValueType(value))}`}>
        {getValueType(value)}
      </span>

      {/* Value */}
      <span className={`text-sm ${getTypeColor(getValueType(value))}`}>
        {renderValue(value)}
      </span>
    </div>
  );
}
