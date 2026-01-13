import { JsonEditor } from "@/components/common/json-editor";
import { CopyButton } from "@/components/common/copy-button";

/**
 * MinifiedOutputSection - Displays the minified JSON with copy functionality
 * 
 * Shows the result of the minification in a read-only Monaco Editor
 * with an integrated copy button for easy clipboard access.
 * 
 * Features:
 * - Fixed-height label container for layout stability
 * - Copy button with animated feedback
 * - Read-only Monaco Editor
 * - JSON syntax highlighting
 */
export function MinifiedOutputSection({ minified }: { minified: string }) {
  return (
    <div>
      {/* Fixed-height container for label and copy button */}
      <div className="flex items-center justify-between mb-2 h-8">
        <label className="text-sm font-medium">Minified Output</label>
        <CopyButton textToCopy={minified} />
      </div>

      {/* Read-only JSON editor */}
      <JsonEditor
        value={minified}
        onChange={() => {}}
        readOnly
        height="350px"
      />
    </div>
  );
}
