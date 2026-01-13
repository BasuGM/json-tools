import Link from "next/link";
import { Card } from "@/components/ui/card";
import { IconType } from "react-icons";

/**
 * Tool interface representing a single JSON tool item
 */
export interface Tool {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  color: string;
}

/**
 * ToolCard - Individual tool card component with hover effects
 * 
 * Displays a clickable card for each JSON tool with:
 * - Icon with custom color
 * - Tool title
 * - Short description
 * - Hover animations (shadow, translate, color change)
 */
export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Link href={tool.href}>
      <Card className="hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group p-4 rounded-none">
        <div className="flex items-start gap-3">
          {/* Icon container with custom color */}
          <div className={`p-2 bg-muted ${tool.color} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          
          {/* Tool information */}
          <div className="space-y-1">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors leading-tight">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-tight">
              {tool.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
