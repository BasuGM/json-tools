import { Card, CardContent } from "@/components/ui/card";

/**
 * StatsCard - Displays a single statistic in a card
 * 
 * Used to show metrics about the cleanup operation (e.g., removed items count).
 * Features:
 * - Large bold value with optional color variant
 * - Descriptive label in muted text
 * - Compact card layout
 */
export function StatsCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number;
  variant?: "default" | "destructive";
}) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        {/* Value display with conditional color */}
        <div
          className={`text-2xl font-bold ${
            variant === "destructive" ? "text-destructive" : ""
          }`}
        >
          {value}
        </div>
        
        {/* Metric label */}
        <div className="text-sm text-muted-foreground mt-1">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
