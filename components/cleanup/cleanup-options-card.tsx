import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckboxOption } from "./checkbox-option";

/**
 * CleanupOptions - User-configurable cleanup options
 */
interface CleanupOptions {
  removeNulls: boolean;
  removeEmpty: boolean;
  trimStrings: boolean;
  sortKeys: boolean;
}

/**
 * CleanupOptionsCard - Card containing all cleanup configuration options
 * 
 * Provides a grouped interface for users to select which cleanup operations
 * to apply to their JSON data. Each option is displayed as a checkbox
 * with a descriptive label and explanation.
 */
export function CleanupOptionsCard({
  options,
  setOptions,
}: {
  options: CleanupOptions;
  setOptions: React.Dispatch<React.SetStateAction<CleanupOptions>>;
}) {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Cleanup Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Remove null values option */}
        <CheckboxOption
          id="removeNulls"
          label="Remove null values"
          description="Remove all properties with null values"
          checked={options.removeNulls}
          onChange={(checked) =>
            setOptions((prev) => ({ ...prev, removeNulls: checked }))
          }
        />

        {/* Remove empty strings/arrays/objects option */}
        <CheckboxOption
          id="removeEmpty"
          label="Remove empty values"
          description="Remove empty strings, arrays, and objects"
          checked={options.removeEmpty}
          onChange={(checked) =>
            setOptions((prev) => ({ ...prev, removeEmpty: checked }))
          }
        />

        {/* Trim string whitespace option */}
        <CheckboxOption
          id="trimStrings"
          label="Trim strings"
          description="Remove leading and trailing whitespace from strings"
          checked={options.trimStrings}
          onChange={(checked) =>
            setOptions((prev) => ({ ...prev, trimStrings: checked }))
          }
        />

        {/* Sort object keys alphabetically option */}
        <CheckboxOption
          id="sortKeys"
          label="Sort keys"
          description="Sort object keys alphabetically"
          checked={options.sortKeys}
          onChange={(checked) =>
            setOptions((prev) => ({ ...prev, sortKeys: checked }))
          }
        />
      </CardContent>
    </Card>
  );
}

export type { CleanupOptions };
