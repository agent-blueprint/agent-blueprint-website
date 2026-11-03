import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 mx-6 mb-6 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="font-body text-sm text-muted-foreground">
            &copy; 2026 Agent Blueprint. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/method"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              The Method
            </Link>
            <Link
              href="/developers"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Developers
            </Link>
            <Link
              href="/security"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </Link>
            <Link
              href="/privacy"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
