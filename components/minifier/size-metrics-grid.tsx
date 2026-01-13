import { SizeComparisonCard } from "./size-comparison-card";

/**
 * MinifyResult - Results from the minification operation
 */
export interface MinifyResult {
  minified: string;
  originalSize: number;
  minifiedSize: number;
  savedBytes: number;
  savedPercentage: number;
}

/**
 * SizeMetricsGrid - Grid of size comparison metrics
 * 
 * Displays 4 key minification statistics in a responsive grid:
 * - Original Size: Input JSON size
 * - Minified Size: Output JSON size (green, indicates improvement)
 * - Saved: Bytes saved (blue)
 * - Reduction: Percentage reduction (purple)
 * 
 * Each metric is color-coded to highlight the benefits of minification.
 */
export function SizeMetricsGrid({
  result,
  formatBytes,
}: {
  result: MinifyResult;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Original size (neutral color) */}
      <SizeComparisonCard
        label="Original Size"
        size={formatBytes(result.originalSize)}
      />

      {/* Minified size (green - success) */}
      <SizeComparisonCard
        label="Minified Size"
        size={formatBytes(result.minifiedSize)}
        color="text-green-500"
      />

      {/* Bytes saved (blue - info) */}
      <SizeComparisonCard
        label="Saved"
        size={formatBytes(result.savedBytes)}
        color="text-blue-500"
      />

      {/* Percentage reduction (purple - accent) */}
      <SizeComparisonCard
        label="Reduction"
        size={`${result.savedPercentage.toFixed(1)}%`}
        color="text-purple-500"
      />
    </div>
  );
}
