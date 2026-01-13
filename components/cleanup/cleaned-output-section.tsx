import { JsonEditor } from "@/components/common/json-editor";
import { CopyButton } from "@/components/common/copy-button";

/**
 * CleanedOutputSection - Displays the cleaned JSON with copy functionality
 * 
 * Shows the result of the cleanup operation in a read-only Monaco Editor
 * with an integrated copy button for easy clipboard access.
 */
export function CleanedOutputSection({ cleanedJson }: { cleanedJson: string }) {
  return (
    <div>
      {/* Fixed-height container for label and copy button */}
      <div className="flex items-center justify-between mb-2 h-8">
        <label className="text-sm font-medium">Cleaned JSON</label>
        <CopyButton textToCopy={cleanedJson} />
      </div>

      {/* Read-only JSON editor */}
      <JsonEditor value={cleanedJson} onChange={() => {}} readOnly />
    </div>
  );
}
