import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * CheckboxOption - Individual cleanup option with checkbox
 * 
 * Reusable checkbox component for JSON cleanup options.
 * Features:
 * - Shadcn Checkbox with custom styling (rounded-none)
 * - Accessible label with description
 * - Flexbox layout with gap spacing
 */
export function CheckboxOption({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start space-x-3">
      {/* Checkbox input */}
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="rounded-none mt-1"
      />
      
      {/* Label and description */}
      <div className="flex-1">
        <Label htmlFor={id} className="cursor-pointer font-medium">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
