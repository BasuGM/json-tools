"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";

/**
 * ValidatorPage - JSON Validator
 * 
 * Validates JSON syntax and structure:
 * - Checks for proper JSON formatting
 * - Displays success message for valid JSON
 * - Shows detailed error messages for invalid JSON (with line/column info)
 * - Simple, focused interface for quick validation
 * 
 * Uses native JSON.parse() for validation, providing accurate error details.
 */
export default function ValidatorPage() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  /**
   * Validates the JSON input using JSON.parse()
   * Sets validation state and error message
   */
  const handleValidate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  /**
   * Clears all inputs and validation results
   */
  const handleClear = () => {
    setInput("");
    setIsValid(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Validate your JSON syntax and structure
        </p>
      </div>

      <div className="space-y-4">
        {/* JSON input editor */}
        <JsonEditor label="JSON to Validate" value={input} onChange={setInput}  />

        {/* Action buttons and validation results */}
        <div className="flex gap-2 items-center flex-wrap">
          <Button onClick={handleValidate} className="rounded-none">
            Validate
          </Button>
          <Button onClick={handleClear} variant="outline" className="rounded-none">
            Clear
          </Button>

          {/* Success message */}
          {isValid === true && <StatusAlert variant="success" message="Valid JSON!" minWidth="min-w-xs" />}

          {/* Error message with details */}
          {isValid === false && <StatusAlert variant="error" message={error} minWidth="min-w-xs" />}
        </div>
      </div>
    </div>
  );
}
