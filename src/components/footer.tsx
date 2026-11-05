import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 mx-6 mb-6 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="font-body text-sm text-muted-foreground">
            &copy; 2026 Agent Blueprint, Inc. Agent Blueprint&reg; is a registered trademark of Christopher Faulkner.
            <span className="mt-1 block text-xs">
              ServiceNow is a trademark of ServiceNow, Inc. We aren&apos;t affiliated with or endorsed by ServiceNow.
            </span>
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/consulting-firms"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              For consulting firms
            </Link>
            <Link
              href="/servicenow"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ServiceNow
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
