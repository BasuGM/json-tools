"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

function XmlOutputSection({ output }: { output: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>XML Output</Label>
        <CopyButton textToCopy={output} />
      </div>
      <JsonEditor
        value={output}
        onChange={() => {}}
        readOnly
        height="350px"
        language="xml"
      />
    </div>
  );
}

function ActionButtons({
  onConvert,
  onClear,
  error,
}: {
  onConvert: () => void;
  onClear: () => void;
  error: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Button onClick={onConvert} className="rounded-none">
        Convert to XML
      </Button>
      <Button onClick={onClear} variant="outline" className="rounded-none">
        Clear
      </Button>

      {error && <StatusAlert variant="error" message={error} />}
    </div>
  );
}

export default function JsonToXmlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const jsonToXml = (obj: any, rootName = "root"): string => {
    const convertValue = (key: string, value: any, indent: string): string => {
      const nextIndent = indent + "  ";

      if (value === null) {
        return `${indent}<${key} />\n`;
      }

      if (Array.isArray(value)) {
        return value
          .map((item) => {
            if (typeof item === "object" && item !== null) {
              return convertValue(key, item, indent);
            } else {
              return `${indent}<${key}>${escapeXml(String(item))}</${key}>\n`;
            }
          })
          .join("");
      }

      if (typeof value === "object") {
        const children = Object.entries(value)
          .map(([k, v]) => convertValue(k, v, nextIndent))
          .join("");
        return `${indent}<${key}>\n${children}${indent}</${key}>\n`;
      }

      return `${indent}<${key}>${escapeXml(String(value))}</${key}>\n`;
    };

    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

    if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
      const children = Object.entries(obj)
        .map(([key, value]) => convertValue(key, value, "  "))
        .join("");
      xml += `<${rootName}>\n${children}</${rootName}>`;
    } else {
      xml += convertValue(rootName, obj, "");
    }

    return xml;
  };

  const handleConvert = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const xml = jsonToXml(parsed);
      setOutput(xml);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-4">
        <p className="text-muted-foreground">
          Convert JSON data to XML format
        </p>
      </div>

      <div className="space-y-4">
        <JsonEditor
          label="JSON Input"
          value={input}
          onChange={setInput}
          height="350px"
        />

        <ActionButtons
          onConvert={handleConvert}
          onClear={handleClear}
          error={error}
        />

        {output && <XmlOutputSection output={output} />}
      </div>
    </div>
  );
}
