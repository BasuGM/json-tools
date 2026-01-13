import { Separator } from "@/components/ui/separator";

/**
 * PropertySizeItem - Individual property size display with progress bar
 * 
 * Shows a single JSON property's contribution to total file size with:
 * - Property path in monospace font
 * - Formatted size (bytes/KB/MB)
 * - Percentage of total size
 * - Visual progress bar indicating relative size
 * - Optional separator for list display
 */
export function PropertySizeItem({ 
  path, 
  size, 
  percentage, 
  isLast,
  formatBytes 
}: { 
  path: string; 
  size: number; 
  percentage: number; 
  isLast: boolean;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <div>
      {/* Property information row */}
      <div className="flex items-center justify-between">
        {/* Property path */}
        <code className="text-sm font-mono bg-muted px-2 py-1">
          {path}
        </code>
        
        {/* Size metrics */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formatBytes(size)}
          </span>
          <span className="text-sm font-semibold text-primary">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      
      {/* Progress bar showing percentage of total size */}
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {/* Separator between items (not shown on last item) */}
      {!isLast && <Separator className="mt-3" />}
    </div>
  );
}
