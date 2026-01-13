"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/common/json-editor";
import { StatusAlert } from "@/components/common/status-alert";
import { Card, CardContent } from "@/components/ui/card";
import { TreeNode } from "./tree-node";

/**
 * VisualizerPage - JSON Tree Visualizer
 * 
 * Displays JSON data as an interactive tree structure with:
 * - Collapsible nodes for easy navigation
 * - Color-coded data types (strings, numbers, booleans, etc.)
 * - Collection counts for arrays and objects
 * - Auto-expansion of first 2 levels
 * - Side-by-side view of JSON input and tree visualization
 * 
 * Helps users understand complex JSON structures at a glance.
 */
export default function VisualizerPage() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState("");

  /**
   * Parses the JSON input and prepares it for tree visualization
   * Validates JSON syntax before rendering
   */
  const handleVisualize = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setParsedData(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setParsedData(null);
    }
  };

  /**
   * Clears all inputs and results
   */
  const handleClear = () => {
    setInput("");
    setParsedData(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page description */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Visualize JSON data in a tree structure
        </p>
      </div>

      <div className="space-y-4">
        {/* Side-by-side layout: JSON input on left, tree view on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* JSON input editor */}
          <JsonEditor
            label="JSON Input"
            value={input}
            onChange={setInput}
            height="350px"
          />

          {/* Tree visualization panel */}
          <div className="-mt-1">
            <div className="mb-2 text-sm font-medium">Tree Visualization</div>
            <Card className="rounded-none h-87.5 overflow-auto">
              <CardContent className="p-4">
                {parsedData ? (
                  <TreeNode name="root" value={parsedData} />
                ) : (
                  <div className="text-sm text-muted-foreground text-center py-8">
                    Paste JSON and click &quot;Visualize&quot; to see the tree
                    structure
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action buttons and error display */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleVisualize} className="rounded-none">
            Visualize
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
