"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { CopyButton } from "@/components/common/copy-button";

/**
 * FormatterPage - JSON Formatter / Beautifier
 * 
 * Formats JSON data with proper indentation and structure:
 * - Validates JSON syntax before formatting
 * - Applies 2-space indentation for readability
 * - Side-by-side view of input and formatted output
 * - Copy button for easy clipboard access
 * 
 * Ideal for making minified or poorly formatted JSON human-readable.
 */
export default function FormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  /**
   * Formats the JSON input with 2-space indentation
   * Validates JSON syntax before formatting
   */
  const handleFormat = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      // Format with 2-space indentation
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  /**
   * Clears all inputs and results
   */
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Format and beautify your JSON with proper indentation
        </p>
      </div>

      <div className="space-y-4">
        {/* Side-by-side layout: Input on left, output on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input JSON editor */}
          <div>
            <div className="flex items-center justify-between mb-2 h-8">
              <label className="text-sm font-medium">Input JSON</label>
            </div>
            <JsonEditor value={input} onChange={setInput} />
          </div>

          {/* Formatted output editor */}
          <div>
            <div className="flex items-center justify-between mb-2 h-8">
              <label className="text-sm font-medium">Formatted JSON</label>
              {output && <CopyButton textToCopy={output} />}
            </div>
            <JsonEditor value={output} onChange={() => {}} readOnly />
          </div>
        </div>

        {/* Action buttons and error display */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleFormat} className="rounded-none">
            Format
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
      </div>
    </div>
  );
}
