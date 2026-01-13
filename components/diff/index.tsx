"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { DiffResultCard } from "./diff-result-card";
import { type DiffItem, type DiffType } from "./diff-helpers";

/**
 * DiffPage - JSON Diff Tool
 * 
 * Compares two JSON objects and identifies all differences:
 * - Added properties (exist in JSON 2 but not JSON 1)
 * - Removed properties (exist in JSON 1 but not JSON 2)
 * - Changed values (same property, different value)
 * - Type changes (same property, different data type)
 * 
 * Provides a visual breakdown of all differences with color-coded badges.
 */
export default function DiffPage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [differences, setDifferences] = useState<DiffItem[]>([]);
  const [isIdentical, setIsIdentical] = useState(false);
  const [error, setError] = useState("");

  /**
   * Recursively finds all differences between two JSON objects
   * Traverses nested objects and arrays to detect all changes
   */
  const findDifferences = (obj1: any, obj2: any, path = ""): DiffItem[] => {
    const diffs: DiffItem[] = [];

    // Get all unique keys from both objects
    const allKeys = new Set([
      ...Object.keys(obj1 || {}),
      ...Object.keys(obj2 || {}),
    ]);

    allKeys.forEach((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1?.[key];
      const val2 = obj2?.[key];

      // Property added in JSON 2
      if (!(key in obj1)) {
        diffs.push({
          path: currentPath,
          type: "added" as DiffType,
          newValue: val2,
        });
      }
      // Property removed in JSON 2
      else if (!(key in obj2)) {
        diffs.push({
          path: currentPath,
          type: "removed" as DiffType,
          oldValue: val1,
        });
      }
      // Value type changed
      else if (typeof val1 !== typeof val2) {
        diffs.push({
          path: currentPath,
          type: "type-changed" as DiffType,
          oldValue: val1,
          newValue: val2,
        });
      }
      // Nested object/array - recurse
      else if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
      ) {
        const nestedDiffs = findDifferences(val1, val2, currentPath);
        diffs.push(...nestedDiffs);
      }
      // Primitive value changed
      else if (val1 !== val2) {
        diffs.push({
          path: currentPath,
          type: "changed" as DiffType,
          oldValue: val1,
          newValue: val2,
        });
      }
    });

    return diffs;
  };

  /**
   * Compares the two JSON inputs and finds all differences
   * Validates JSON syntax before comparison
   */
  const handleCompare = () => {
    try {
      setError("");
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);

      // Check if objects are identical
      if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        setIsIdentical(true);
        setDifferences([]);
      } else {
        setIsIdentical(false);
        const diffs = findDifferences(obj1, obj2);
        setDifferences(diffs);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setDifferences([]);
      setIsIdentical(false);
    }
  };

  /**
   * Clears all inputs and results
   */
  const handleClear = () => {
    setJson1("");
    setJson2("");
    setDifferences([]);
    setIsIdentical(false);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Compare two JSON objects and find differences
        </p>
      </div>

      <div className="space-y-4">
        {/* Side-by-side JSON inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JsonEditor label="JSON 1" value={json1} onChange={setJson1} />
          <JsonEditor label="JSON 2" value={json2} onChange={setJson2} />
        </div>

        {/* Action buttons and error display */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleCompare} className="rounded-none">
            Compare
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="rounded-none"
          >
            Clear
          </Button>

          {error && (
            <StatusAlert variant="error" message={error} minWidth="min-w-xs" />
          )}
        </div>

        {/* Identical objects message */}
        {isIdentical && (
          <StatusAlert
            variant="success"
            message="Objects are identical"
            minWidth="min-w-xs"
          />
        )}

        {/* Differences display */}
        {differences.length > 0 && <DiffResultCard diffs={differences} />}
      </div>
    </div>
  );
}
