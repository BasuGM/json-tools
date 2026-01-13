"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function CopyButton({ 
  textToCopy, 
  variant = "outline", 
  size = "sm",
  className = "rounded-none transition-all"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

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
