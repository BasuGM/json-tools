import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertySizeItem } from "./property-size-item";

/**
 * LargestPropertiesCard - Displays top 10 largest JSON properties
 * 
 * Shows a ranked list of the largest properties in the JSON object,
 * helping users identify which parts of their JSON consume the most space.
 * 
 * Features:
 * - Card layout with header showing count
 * - List of properties with size bars
 * - Returns null if no properties (conditional rendering)
 */
export function LargestPropertiesCard({ 
  properties, 
  formatBytes 
}: { 
  properties: Array<{ path: string; size: number; percentage: number }>;
  formatBytes: (bytes: number) => string;
}) {
  // Don't render if no properties to show
  if (properties.length === 0) return null;

  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Largest Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* List of properties with size information */}
        <div className="space-y-3">
          {properties.map((prop, index) => (
            <PropertySizeItem
              key={index}
              path={prop.path}
              size={prop.size}
              percentage={prop.percentage}
              isLast={index === properties.length - 1}
              formatBytes={formatBytes}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
