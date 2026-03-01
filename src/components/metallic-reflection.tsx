"use client";

import { useEffect } from "react";

/**
 * Global event delegation for .btn-metallic cursor-tracking reflection.
 * Sets --mx and --my CSS custom properties (0–100) based on cursor
 * position within the button. Mount once in the layout.
 */
export function MetallicReflection() {
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(".btn-metallic") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--mx", String(x));
      target.style.setProperty("--my", String(y));
    }

    function handleLeave(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(".btn-metallic") as HTMLElement | null;
      if (!target) return;
      // Reset to center on leave for neutral resting state
      target.style.setProperty("--mx", "50");
      target.style.setProperty("--my", "50");
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave, true);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave, true);
    };
  }, []);

  return null;
}
