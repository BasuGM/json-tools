import { Button } from "@/components/ui/button";
import { StatusAlert } from "@/components/common/status-alert";

/**
 * ActionButtons - Convert and Clear action buttons with error display
 * 
 * Provides the main action controls for the JSON to XML converter:
 * - Convert button: Triggers the conversion process
 * - Clear button: Resets all inputs and results
 * - Inline error display when conversion fails
 */
export function ActionButtons({
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
      {/* Primary action: Convert JSON to XML */}
      <Button onClick={onConvert} className="rounded-none">
        Convert to XML
      </Button>

      {/* Secondary action: Clear all */}
      <Button onClick={onClear} variant="outline" className="rounded-none">
        Clear
      </Button>

      {/* Error message display */}
      {error && <StatusAlert variant="error" message={error} />}
    </div>
  );
}
