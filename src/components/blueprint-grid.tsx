interface BlueprintGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BlueprintGrid({ children, className = "" }: BlueprintGridProps) {
  return (
    <div className={`blueprint-grid paper-texture relative ${className}`}>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
