import { Separator } from "@/components/ui/separator";
import { type DiffItem } from "./diff-helpers";
import { getStatusColor, getStatusLabel } from "./diff-helpers";

/**
 * DiffItemDisplay - Displays a single difference with before/after values
 * 
 * Shows:
 * - Property path in monospace font
 * - Color-coded badge indicating change type
 * - Old value (for removed/changed items)
 * - New value (for added/changed items)
 * - Separator between items (except last)
 */
export function DiffItemDisplay({
  diff,
  isLast,
}: {
  diff: DiffItem;
  isLast: boolean;
}) {
  return (
    <div>
      {/* Property path and status badge */}
      <div className="flex items-center justify-between">
        <code className="text-sm font-mono bg-muted px-2 py-1">
          {diff.path}
        </code>
        <span
          className={`text-xs px-2 py-1 rounded-sm ${getStatusColor(
            diff.type
          )}`}
        >
          {getStatusLabel(diff.type)}
        </span>
      </div>

      {/* Value changes display */}
      <div className="mt-2 text-sm space-y-1">
        {/* Old value (for removed and changed types) */}
        {(diff.type === "removed" || diff.type === "changed" || diff.type === "type-changed") && (
          <div className="text-muted-foreground">
            <span className="font-semibold">Old:</span>{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              {JSON.stringify(diff.oldValue)}
            </code>
          </div>
        )}

        {/* New value (for added and changed types) */}
        {(diff.type === "added" || diff.type === "changed" || diff.type === "type-changed") && (
          <div className="text-muted-foreground">
            <span className="font-semibold">New:</span>{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              {JSON.stringify(diff.newValue)}
            </code>
          </div>
        )}
      </div>

      {/* Separator between items */}
      {!isLast && <Separator className="mt-3" />}
    </div>
  );
}
