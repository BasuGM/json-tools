"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { SizeCard } from "./size-card";
import { LargestPropertiesCard } from "./largest-properties-card";

/**
 * SizeInfo - JSON file size analysis results
 */
interface SizeInfo {
  totalBytes: number;
  totalKB: number;
  propertyCount: number;
  largestProperties: Array<{
    path: string;
    size: number;
    percentage: number;
  }>;
}

/**
 * AnalyzerPage - JSON Size Analyzer tool
 * 
 * Analyzes JSON files to provide insights on:
 * - Total file size (bytes, KB, MB)
 * - Number of properties
 * - Minified size comparison
 * - Top 10 largest properties with visual breakdown
 * 
 * Helps users optimize JSON payloads by identifying size hotspots.
 */
export default function AnalyzerPage() {
  const [input, setInput] = useState("");
  const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);
  const [error, setError] = useState("");

  /**
   * Recursively calculates the size of each property in the JSON object
   */
  const calculateSize = (obj: any, path = ""): Array<{ path: string; size: number }> => {
    const sizes: Array<{ path: string; size: number }> = [];
    const jsonString = JSON.stringify(obj);
    const size = new Blob([jsonString]).size;
    
    sizes.push({ path: path || "root", size });

    if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        sizes.push(...calculateSize(value, currentPath));
      });
    }

    return sizes;
  };

  /**
   * Analyzes the JSON input and calculates size metrics
   */
  const handleAnalyze = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      
      const totalBytes = new Blob([input]).size;
      const totalKB = totalBytes / 1024;
      
      // Calculate sizes for all properties
      const allSizes = calculateSize(parsed);
      
      // Get largest properties (excluding root)
      const largestProperties = allSizes
        .filter(item => item.path !== "root")
        .sort((a, b) => b.size - a.size)
        .slice(0, 10)
        .map(item => ({
          path: item.path,
          size: item.size,
          percentage: (item.size / totalBytes) * 100,
        }));

      /**
       * Recursively counts all properties in the JSON object
       */
      const countProperties = (obj: any): number => {
        if (typeof obj !== "object" || obj === null) return 0;
        let count = Object.keys(obj).length;
        Object.values(obj).forEach(val => {
          count += countProperties(val);
        });
        return count;
      };

      setSizeInfo({
        totalBytes,
        totalKB,
        propertyCount: countProperties(parsed),
        largestProperties,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setSizeInfo(null);
    }
  };

  /**
   * Clears all input and results
   */
  const handleClear = () => {
    setInput("");
    setSizeInfo(null);
    setError("");
  };

  /**
   * Formats byte count into human-readable format (B, KB, MB)
   */
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Analyze and optimize JSON file size
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

        {/* Action buttons */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleAnalyze} className="rounded-none">
            Analyze
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

        {/* Analysis results */}
        {sizeInfo && (
          <div className="space-y-4">
            {/* Size metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SizeCard
                title="Total Size"
                value={formatBytes(sizeInfo.totalBytes)}
              />
              <SizeCard
                title="Total Properties"
                value={sizeInfo.propertyCount}
              />
              <SizeCard
                title="Minified Size"
                value={formatBytes(new Blob([JSON.stringify(JSON.parse(input))]).size)}
              />
            </div>

            {/* Largest properties breakdown */}
            <LargestPropertiesCard 
              properties={sizeInfo.largestProperties}
              formatBytes={formatBytes}
            />
          </div>
        )}
      </div>
    </div>
  );
}
