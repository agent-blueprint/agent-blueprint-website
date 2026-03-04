import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 mx-6 mb-6 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="font-body text-sm text-muted-foreground">
            &copy; 2026 Agent Blueprint. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/security"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
