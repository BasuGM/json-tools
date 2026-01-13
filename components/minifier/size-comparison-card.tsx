import { Card, CardContent } from "@/components/ui/card";

/**
 * SizeComparisonCard - Displays a single size metric in a card
 * 
 * Used to show minification statistics in a visually prominent way.
 * Features:
 * - Large bold value display
 * - Optional color variant for emphasis
 * - Descriptive label in muted text
 * - Compact card layout
 */
export function SizeComparisonCard({
  label,
  size,
  color,
}: {
  label: string;
  size: string;
  color?: string;
}) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        {/* Value display with optional color */}
        <div className={`text-2xl font-bold ${color || ""}`}>
          {size}
        </div>
        
        {/* Metric label */}
        <div className="text-sm text-muted-foreground mt-1">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
