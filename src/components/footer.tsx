import Link from "next/link";
import { Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/metadata";

const linkedinLinks = [
  {
    name: "Chris Faulkner",
    url: "https://www.linkedin.com/in/chrisfaulkner-ai/",
  },
  {
    name: "Amy Glencross",
    url: "https://www.linkedin.com/in/amy-glencross/",
  },
  {
    name: "Agent Blueprint",
    url: "https://www.linkedin.com/company/agent-blueprint",
  },
];

export function Footer() {
  return (
    <footer className="py-12 mx-6 mb-6 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="font-body text-sm text-muted-foreground">
            &copy; 2026 Agent Blueprint. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {linkedinLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`${link.name} on LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              ))}
            </div>

            <Link
              href="/security"
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </Link>

            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
