interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
}

export function CornerBrackets({
  children,
  className = "",
}: CornerBracketsProps) {
  return (
    <div className={`corner-brackets ${className}`}>
      {children}
    </div>
  );
}
