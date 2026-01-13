import { ToolCard } from "./tool-card";
import { tools } from "./tools-data";

/**
 * HomePage - Main landing page component
 * 
 * Displays a grid of all available JSON tools with:
 * - Centered header with title and subtitle
 * - 2-column responsive grid (1 column on mobile, 2 on desktop)
 * - Dynamically rendered tool cards from tools data
 */
export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">JSON Tools</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive suite of tools for working with JSON data
        </p>
      </div>

      {/* Tools grid - responsive 1 or 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </div>
  );
}
