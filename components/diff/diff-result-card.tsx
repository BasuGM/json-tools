import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiffItemDisplay } from "./diff-item-display";
import { type DiffItem } from "./diff-helpers";

/**
 * DiffResultCard - Card displaying all detected differences
 * 
 * Shows a titled card with a list of all changes found between
 * the two JSON objects. Returns null if no differences detected.
 * 
 * Features:
 * - Header showing total difference count
 * - Scrollable list of difference items
 * - Conditional rendering (only shown when diffs exist)
 */
export function DiffResultCard({ diffs }: { diffs: DiffItem[] }) {
  // Don't render if no differences found
  if (diffs.length === 0) return null;

  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Differences ({diffs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* List of all differences */}
        <div className="space-y-3">
          {diffs.map((diff, index) => (
            <DiffItemDisplay
              key={index}
              diff={diff}
              isLast={index === diffs.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
