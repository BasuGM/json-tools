"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";

interface MinifyResult {
  minified: string;
  originalSize: number;
  minifiedSize: number;
  savedBytes: number;
  savedPercentage: number;
}

function SizeComparisonCard({
  label,
  size,
  color,
}: {
  label: string;
  size: string;
  color?: string;
}) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        <div className={`text-2xl font-bold ${color || ""}`}>{size}</div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

function SizeMetricsGrid({
  result,
  formatBytes,
}: {
  result: MinifyResult;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SizeComparisonCard
        label="Original Size"
        size={formatBytes(result.originalSize)}
      />
      <SizeComparisonCard
        label="Minified Size"
        size={formatBytes(result.minifiedSize)}
        color="text-green-500"
      />
      <SizeComparisonCard
        label="Saved"
        size={formatBytes(result.savedBytes)}
        color="text-blue-500"
      />
      <SizeComparisonCard
        label="Reduction"
        size={`${result.savedPercentage.toFixed(1)}%`}
        color="text-purple-500"
      />
    </div>
  );
}

function MinifiedOutputSection({
  minified,
}: {
  minified: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">Minified Output</label>
        <CopyButton textToCopy={minified} />
      </div>
      <JsonEditor
        value={minified}
        onChange={() => {}}
        readOnly
        height="350px"
      />
    </div>
  );
}

export default function MinifierPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<MinifyResult | null>(null);
  const [error, setError] = useState("");

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleMinify = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

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

  const handleClear = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Minify and compress JSON data by removing whitespace
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

        {result && (
          <div className="space-y-4">
            <SizeMetricsGrid result={result} formatBytes={formatBytes} />
            <MinifiedOutputSection minified={result.minified} />
          </div>
        )}
      </div>
    </div>
  );
}
