"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

function SizeCard({ title, value, unit }: { title: string; value: string | number; unit?: string }) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal ml-1 text-muted-foreground">{unit}</span>}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{title}</div>
      </CardContent>
    </Card>
  );
}

function PropertySizeItem({ 
  path, 
  size, 
  percentage, 
  isLast,
  formatBytes 
}: { 
  path: string; 
  size: number; 
  percentage: number; 
  isLast: boolean;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <code className="text-sm font-mono bg-muted px-2 py-1">
          {path}
        </code>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formatBytes(size)}
          </span>
          <span className="text-sm font-semibold text-primary">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {!isLast && <Separator className="mt-3" />}
    </div>
  );
}

function LargestPropertiesCard({ 
  properties, 
  formatBytes 
}: { 
  properties: Array<{ path: string; size: number; percentage: number }>;
  formatBytes: (bytes: number) => string;
}) {
  if (properties.length === 0) return null;

  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Largest Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {properties.map((prop, index) => (
            <PropertySizeItem
              key={index}
              path={prop.path}
              size={prop.size}
              percentage={prop.percentage}
              isLast={index === properties.length - 1}
              formatBytes={formatBytes}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyzerPage() {
  const [input, setInput] = useState("");
  const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);
  const [error, setError] = useState("");

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

  const handleClear = () => {
    setInput("");
    setSizeInfo(null);
    setError("");
  };

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
        <JsonEditor
          label="JSON Input"
          value={input}
          onChange={setInput}
          height="350px"
        />

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

        {sizeInfo && (
          <div className="space-y-4">
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
