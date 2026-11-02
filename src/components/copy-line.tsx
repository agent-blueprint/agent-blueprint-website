"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-primary/25 bg-card p-3 sm:flex-row sm:items-center sm:gap-4 sm:pl-5">
      <code className="min-w-0 flex-1 font-mono text-sm leading-relaxed text-foreground break-words">
        {text}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
