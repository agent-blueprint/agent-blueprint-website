interface BlueprintGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export function BlueprintGrid({
  children,
  className = "",
  variant = "light",
}: BlueprintGridProps) {
  const gridClass =
    variant === "dark" ? "blueprint-grid-dark" : "blueprint-grid-light";
  const bgClass = variant === "dark" ? "section-dark" : "";

  return (
    <div
      className={`${gridClass} paper-texture relative ${bgClass} ${className}`}
    >
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
