"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/copy-button";

interface CleanupOptions {
  removeNull: boolean;
  removeEmpty: boolean;
  trimStrings: boolean;
  sortKeys: boolean;
}

interface CleanupStats {
  removedNulls: number;
  removedEmpty: number;
  trimmedStrings: number;
  originalSize: number;
  cleanedSize: number;
}

function CheckboxOption({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="rounded-none"
      />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}

function StatsCard({
  stats,
  formatBytes,
}: {
  stats: CleanupStats;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Cleanup Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Null values removed:</span>
            <span className="ml-2 font-semibold">{stats.removedNulls}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Empty values removed:</span>
            <span className="ml-2 font-semibold">{stats.removedEmpty}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Strings trimmed:</span>
            <span className="ml-2 font-semibold">{stats.trimmedStrings}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Size reduction:</span>
            <span className="ml-2 font-semibold text-green-500">
              {formatBytes(stats.originalSize - stats.cleanedSize)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CleanedOutputSection({
  output,
}: {
  output: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>Cleaned Output</Label>
        <CopyButton textToCopy={output} />
      </div>
      <JsonEditor value={output} onChange={() => {}} readOnly height="350px" />
    </div>
  );
}

function CleanupOptionsCard({
  options,
  onChange,
}: {
  options: CleanupOptions;
  onChange: (options: CleanupOptions) => void;
}) {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-base">Cleanup Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CheckboxOption
            id="removeNull"
            label="Remove null values"
            checked={options.removeNull}
            onChange={(checked) => onChange({ ...options, removeNull: checked })}
          />
          <CheckboxOption
            id="removeEmpty"
            label="Remove empty objects/arrays"
            checked={options.removeEmpty}
            onChange={(checked) =>
              onChange({ ...options, removeEmpty: checked })
            }
          />
          <CheckboxOption
            id="trimStrings"
            label="Trim string whitespace"
            checked={options.trimStrings}
            onChange={(checked) =>
              onChange({ ...options, trimStrings: checked })
            }
          />
          <CheckboxOption
            id="sortKeys"
            label="Sort keys alphabetically"
            checked={options.sortKeys}
            onChange={(checked) => onChange({ ...options, sortKeys: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButtons({
  onCleanup,
  onClear,
  error,
}: {
  onCleanup: () => void;
  onClear: () => void;
  error: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Button onClick={onCleanup} className="rounded-none">
        Cleanup
      </Button>
      <Button onClick={onClear} variant="outline" className="rounded-none">
        Clear
      </Button>

      {error && <StatusAlert variant="error" message={error} />}
    </div>
  );
}

export default function CleanupPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<CleanupStats | null>(null);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<CleanupOptions>({
    removeNull: true,
    removeEmpty: true,
    trimStrings: true,
    sortKeys: false,
  });

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const cleanupJSON = (
    obj: any,
    stats: CleanupStats,
    opts: CleanupOptions
  ): any => {
    if (obj === null || obj === undefined) {
      if (opts.removeNull) {
        stats.removedNulls++;
        return undefined;
      }
      return obj;
    }

    if (typeof obj === "string") {
      if (opts.trimStrings) {
        const trimmed = obj.trim();
        if (trimmed !== obj) {
          stats.trimmedStrings++;
        }
        return trimmed;
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      const cleaned = obj
        .map((item) => cleanupJSON(item, stats, opts))
        .filter((item) => item !== undefined);

      if (opts.removeEmpty && cleaned.length === 0) {
        stats.removedEmpty++;
        return undefined;
      }
      return cleaned;
    }

    if (typeof obj === "object") {
      const cleaned: any = {};
      const keys = opts.sortKeys ? Object.keys(obj).sort() : Object.keys(obj);

      for (const key of keys) {
        const value = cleanupJSON(obj[key], stats, opts);
        if (value !== undefined) {
          cleaned[key] = value;
        }
      }

      if (opts.removeEmpty && Object.keys(cleaned).length === 0) {
        stats.removedEmpty++;
        return undefined;
      }
      return cleaned;
    }

    return obj;
  };

  const handleCleanup = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);

      const stats: CleanupStats = {
        removedNulls: 0,
        removedEmpty: 0,
        trimmedStrings: 0,
        originalSize: new Blob([input]).size,
        cleanedSize: 0,
      };

      const cleaned = cleanupJSON(parsed, stats, options);
      const cleanedString = JSON.stringify(cleaned, null, 2);
      stats.cleanedSize = new Blob([cleanedString]).size;

      setOutput(cleanedString);
      setStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
      setStats(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Clean and optimize your JSON data by removing unwanted values
        </p>
      </div>

      <div className="space-y-4">
        <JsonEditor
          label="JSON Input"
          value={input}
          onChange={setInput}
          height="350px"
        />

        <CleanupOptionsCard options={options} onChange={setOptions} />

        <ActionButtons
          onCleanup={handleCleanup}
          onClear={handleClear}
          error={error}
        />

        {output && stats && (
          <div className="space-y-4">
            <StatsCard stats={stats} formatBytes={formatBytes} />
            <CleanedOutputSection output={output} />
          </div>
        )}
      </div>
    </div>
  );
}
