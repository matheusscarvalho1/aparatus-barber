"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface CopyPhoneButtonProps {
  phone: string;
}

export function CopyPhoneButton({ phone }: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      toast.success("Copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  return (
    <Button variant="outline" onClick={handleCopy} className="rounded-full">
      {copied ? "Copiado!" : "Copiar"}
    </Button>
  );
}
