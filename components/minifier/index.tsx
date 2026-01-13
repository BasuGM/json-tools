"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { SizeMetricsGrid, type MinifyResult } from "./size-metrics-grid";
import { MinifiedOutputSection } from "./minified-output-section";

/**
 * MinifierPage - JSON Minifier tool
 * 
 * Compresses JSON data by removing all unnecessary whitespace:
 * - Removes spaces, tabs, newlines
 * - Preserves all data and structure
 * - Displays size comparison metrics (original, minified, saved, reduction %)
 * - Calculates exact byte savings
 * 
 * Useful for reducing JSON payload sizes for network transmission.
 */
export default function MinifierPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<MinifyResult | null>(null);
  const [error, setError] = useState("");

  /**
   * Formats byte count into human-readable format (B, KB, MB)
   */
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  /**
   * Minifies the JSON input and calculates size metrics
   * Validates JSON syntax before minification
   */
  const handleMinify = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      // Calculate size metrics
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const savedBytes = originalSize - minifiedSize;
      const savedPercentage = (savedBytes / originalSize) * 100;

      setResult({
        minified,
        originalSize,
        minifiedSize,
        savedBytes,
        savedPercentage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setResult(null);
    }
  };

  /**
   * Clears all inputs and results
   */
  const handleClear = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Minify and compress JSON data by removing whitespace
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

        {/* Action buttons and error display */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleMinify} className="rounded-none">
            Minify
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="rounded-none"
          >
            Clear
          </Button>

          {error && <StatusAlert variant="error" message={error} />}
        </div>

        {/* Minification results */}
        {result && (
          <div className="space-y-4">
            {/* Size comparison metrics */}
            <SizeMetricsGrid result={result} formatBytes={formatBytes} />
            
            {/* Minified JSON output */}
            <MinifiedOutputSection minified={result.minified} />
          </div>
        )}
      </div>
    </div>
  );
}
