"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/**
 * CopyButtonProps - Props for the CopyButton component
 */
interface CopyButtonProps {
  textToCopy: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

/**
 * CopyButton - Reusable copy-to-clipboard button with animated feedback
 * 
 * Features:
 * - Copies text to clipboard on click
 * - Shows animated checkmark and "Copied!" text for 2 seconds
 * - Customizable variant, size, and styling
 * - Uses navigator.clipboard API for reliable copying
 * 
 * Used throughout the app for copying JSON, XML, and other text outputs.
 */
export function CopyButton({ 
  textToCopy, 
  variant = "outline", 
  size = "sm",
  className = "rounded-none transition-all"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Copies text to clipboard and shows success feedback
   * Resets to default state after 2 seconds
   */
  const handleCopy = async () => {
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1 text-green-500" />
          Copied!
        </>
      ) : (
        "Copy"
      )}
    </Button>
  );
}
