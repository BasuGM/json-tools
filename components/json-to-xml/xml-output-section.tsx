import { Label } from "@/components/ui/label";
import { JsonEditor } from "@/components/common/json-editor";
import { CopyButton } from "@/components/common/copy-button";

/**
 * XmlOutputSection - Displays the converted XML with copy functionality
 * 
 * Shows the XML result in a Monaco Editor with XML syntax highlighting.
 * Features:
 * - Fixed-height label container for layout stability
 * - Copy button for clipboard access
 * - Read-only Monaco Editor with XML language mode
 * - Syntax highlighting for XML elements, attributes, and values
 */
export function XmlOutputSection({ output }: { output: string }) {
  return (
    <div>
      {/* Fixed-height container for label and copy button */}
      <div className="flex items-center justify-between mb-2 h-8">
        <Label>XML Output</Label>
        <CopyButton textToCopy={output} />
      </div>

      {/* Monaco Editor with XML syntax highlighting */}
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
