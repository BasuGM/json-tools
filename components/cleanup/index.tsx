"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { CheckboxOption } from "./checkbox-option";
import { StatsCard } from "./stats-card";
import { CleanedOutputSection } from "./cleaned-output-section";
import { CleanupOptionsCard, type CleanupOptions } from "./cleanup-options-card";
import { ActionButtons } from "./action-buttons";

/**
 * CleanupStats - Statistics about the cleanup operation
 */
interface CleanupStats {
  removedItems: number;
  trimmedStrings: number;
}

/**
 * CleanupPage - JSON Cleanup tool
 * 
 * Provides comprehensive JSON data cleaning with configurable options:
 * - Remove null values
 * - Remove empty strings, arrays, and objects
 * - Trim whitespace from strings
 * - Sort object keys alphabetically
 * 
 * Displays statistics showing the number of items removed and strings trimmed.
 */
export default function CleanupPage() {
  const [input, setInput] = useState("");
  const [cleanedJson, setCleanedJson] = useState("");
  const [stats, setStats] = useState<CleanupStats | null>(null);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<CleanupOptions>({
    removeNulls: true,
    removeEmpty: true,
    trimStrings: true,
    sortKeys: false,
  });

  /**
   * Recursively cleans JSON data based on user-selected options
   * Tracks statistics for removed items and trimmed strings
   */
  const cleanupJSON = (obj: any, stats: CleanupStats): any => {
    // Handle null values
    if (obj === null) {
      if (options.removeNulls) {
        stats.removedItems++;
        return undefined;
      }
      return obj;
    }

    // Handle strings: trim whitespace if enabled
    if (typeof obj === "string") {
      if (options.trimStrings && obj !== obj.trim()) {
        stats.trimmedStrings++;
        return obj.trim();
      }
      // Remove empty strings if enabled
      if (options.removeEmpty && obj.trim() === "") {
        stats.removedItems++;
        return undefined;
      }
      return obj;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      const cleaned = obj
        .map((item) => cleanupJSON(item, stats))
        .filter((item) => item !== undefined);

      // Remove empty arrays if enabled
      if (options.removeEmpty && cleaned.length === 0) {
        stats.removedItems++;
        return undefined;
      }

      return cleaned;
    }

    // Handle objects
    if (typeof obj === "object") {
      const result: any = {};
      let keys = Object.keys(obj);

      // Sort keys alphabetically if enabled
      if (options.sortKeys) {
        keys = keys.sort();
      }

      // Clean each property
      for (const key of keys) {
        const cleaned = cleanupJSON(obj[key], stats);
        if (cleaned !== undefined) {
          result[key] = cleaned;
        }
      }

      // Remove empty objects if enabled
      if (options.removeEmpty && Object.keys(result).length === 0) {
        stats.removedItems++;
        return undefined;
      }

      return result;
    }

    return obj;
  };

  /**
   * Executes the cleanup operation on the JSON input
   * Validates JSON, applies cleanup options, and displays results
   */
  const handleCleanup = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const cleanupStats: CleanupStats = { removedItems: 0, trimmedStrings: 0 };

      const cleaned = cleanupJSON(parsed, cleanupStats);
      const cleanedString = JSON.stringify(cleaned, null, 2);

      setCleanedJson(cleanedString);
      setStats(cleanupStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setCleanedJson("");
      setStats(null);
    }
  };

  /**
   * Clears all inputs, options, and results
   */
  const handleClear = () => {
    setInput("");
    setCleanedJson("");
    setStats(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Clean and optimize your JSON data
        </p>
      </div>

      <div className="space-y-4">
        {/* JSON input editor */}
        <JsonEditor
          label="JSON Input"
          value={input}
          onChange={setInput}
          height="350px"
        />

        {/* Cleanup configuration options */}
        <CleanupOptionsCard options={options} setOptions={setOptions} />

        {/* Action buttons and error display */}
        <div className="flex gap-2 items-center">
          <ActionButtons onCleanup={handleCleanup} onClear={handleClear} />
          {error && <StatusAlert variant="error" message={error} />}
        </div>

        {/* Cleanup results */}
        {cleanedJson && (
          <div className="space-y-4">
            {/* Cleanup statistics */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatsCard
                  label="Items Removed"
                  value={stats.removedItems}
                  variant="destructive"
                />
                <StatsCard
                  label="Strings Trimmed"
                  value={stats.trimmedStrings}
                />
              </div>
            )}

            {/* Cleaned JSON display with copy button */}
            <CleanedOutputSection cleanedJson={cleanedJson} />
          </div>
        )}
      </div>
    </div>
  );
}
