interface DimensionLineProps {
  className?: string;
}

export function DimensionLine({ className = "" }: DimensionLineProps) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      <div className="h-3 w-px bg-border" />
      <div className="h-px flex-1 bg-border" />
      <div className="h-3 w-px bg-border" />
    </div>
  );
}
