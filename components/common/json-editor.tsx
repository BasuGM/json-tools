"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

/**
 * JsonEditorProps - Props for the JsonEditor component
 */
interface JsonEditorProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
  language?: string;
}

/**
 * JsonEditor - Monaco Editor wrapper with theme integration
 * 
 * Features:
 * - Syntax highlighting for JSON and XML
 * - Auto-syncs with app theme (light/dark)
 * - Configurable height and language
 * - Read-only mode support
 * - Line numbers and word wrap enabled
 * - No minimap for cleaner interface
 * - Automatic layout adjustment
 * 
 * Used as the primary code editor throughout all JSON tools.
 */
export function JsonEditor({
  label,
  value,
  onChange,
  readOnly = false,
  height = "350px",
  language = "json",
}: JsonEditorProps) {
  const { theme } = useTheme();

  return (
    <div>
      {label && <Label className="mb-2">{label}</Label>}
      <div className="border rounded-none overflow-hidden">
        <Editor
          height={height}
          defaultLanguage={language}
          value={value}
          onChange={(value) => onChange?.(value || "")}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            readOnly,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
