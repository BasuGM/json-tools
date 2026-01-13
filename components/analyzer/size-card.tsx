import { Card, CardContent } from "@/components/ui/card";

/**
 * SizeCard - Displays a metric card with a large value and label
 * 
 * Used to show JSON file size statistics in a visually prominent way.
 * Features:
 * - Large bold value display
 * - Optional unit suffix in muted color
 * - Descriptive label below the value
 */
export function SizeCard({ 
  title, 
  value, 
  unit 
}: { 
  title: string; 
  value: string | number; 
  unit?: string;
}) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        {/* Large value display with optional unit */}
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal ml-1 text-muted-foreground">{unit}</span>}
        </div>
        {/* Metric label */}
        <div className="text-sm text-muted-foreground mt-1">{title}</div>
      </CardContent>
    </Card>
  );
}
