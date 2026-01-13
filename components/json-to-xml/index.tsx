"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/common/json-editor";
import { XmlOutputSection } from "./xml-output-section";
import { ActionButtons } from "./action-buttons";

/**
 * JsonToXmlPage - JSON to XML Converter
 * 
 * Converts JSON data to XML format with proper structure:
 * - XML declaration header (version 1.0, UTF-8)
 * - Nested object conversion to XML elements
 * - Array handling (repeated elements)
 * - Null value handling (self-closing tags)
 * - Automatic XML escaping for special characters (&, <, >, ", ')
 * 
 * Output is displayed in Monaco Editor with XML syntax highlighting.
 */
export default function JsonToXmlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  /**
   * Escapes special XML characters to prevent malformed output
   */
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  /**
   * Converts JSON object to XML format
   * Handles nested objects, arrays, primitives, and null values
   */
  const jsonToXml = (obj: any, rootName = "root"): string => {
    /**
     * Recursively converts a value to XML with proper indentation
     */
    const convertValue = (key: string, value: any, indent: string): string => {
      const nextIndent = indent + "  ";

      // Handle null values as self-closing tags
      if (value === null) {
        return `${indent}<${key} />\n`;
      }

      // Handle arrays: repeat element for each item
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

      // Handle objects: nest child elements
      if (typeof value === "object") {
        const children = Object.entries(value)
          .map(([k, v]) => convertValue(k, v, nextIndent))
          .join("");
        return `${indent}<${key}>\n${children}${indent}</${key}>\n`;
      }

      // Handle primitives: wrap in element tags with escaped content
      return `${indent}<${key}>${escapeXml(String(value))}</${key}>\n`;
    };

    // Start with XML declaration
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

    // Convert root object
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

  /**
   * Converts the JSON input to XML and displays the result
   * Validates JSON syntax before conversion
   */
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
          Convert JSON data to XML format
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
        <ActionButtons
          onConvert={handleConvert}
          onClear={handleClear}
          error={error}
        />

        {/* XML output section (shown after successful conversion) */}
        {output && <XmlOutputSection output={output} />}
      </div>
    </div>
  );
}
