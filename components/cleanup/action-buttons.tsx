import { Button } from "@/components/ui/button";

/**
 * ActionButtons - Cleanup and Clear action buttons
 * 
 * Provides the main action controls for the cleanup tool:
 * - Cleanup button: Triggers the JSON cleanup operation
 * - Clear button: Resets all inputs and results
 */
export function ActionButtons({
  onCleanup,
  onClear,
}: {
  onCleanup: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex gap-2">
      {/* Primary action: Run cleanup */}
      <Button onClick={onCleanup} className="rounded-none">
        Cleanup
      </Button>
      
      {/* Secondary action: Clear all */}
      <Button onClick={onClear} variant="outline" className="rounded-none">
        Clear
      </Button>
    </div>
  );
}
