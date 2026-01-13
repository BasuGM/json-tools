import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * StatusAlertProps - Props for the StatusAlert component
 */
interface StatusAlertProps {
  variant: "success" | "error";
  message: string;
  minWidth?: string;
}

/**
 * StatusAlert - Inline status/error message with icon
 * 
 * Features:
 * - Success variant (green) with checkmark icon
 * - Error variant (red) with alert icon
 * - Configurable minimum width
 * - Compact height for inline display
 * - Dark mode support
 * - Rounded-none styling for consistency
 * 
 * Used to display validation results, error messages, and success confirmations.
 */
export function StatusAlert({ variant, message, minWidth = "min-w-md" }: StatusAlertProps) {
  const isSuccess = variant === "success";

  return (
    <Alert
      variant={isSuccess ? "default" : "destructive"}
      className={`rounded-none flex-row items-center gap-2 py-1.5 px-3 h-9 w-auto ${minWidth} ${
        isSuccess
          ? "border-green-500 text-green-600 dark:border-green-500 dark:text-green-400"
          : ""
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" />
      )}
      <AlertDescription className="m-0">{message}</AlertDescription>
    </Alert>
  );
}
