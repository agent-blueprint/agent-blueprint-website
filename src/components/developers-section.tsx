"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Plug, Download } from "lucide-react";
import { BlueprintGrid } from "@/components/blueprint-grid";

const ease = [0.25, 0.4, 0.25, 1] as const;

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded border border-border bg-[var(--navy)]/[0.03] p-4 font-mono text-sm leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

function SectionBlock({
  number,
  icon: Icon,
  title,
  children,
  index,
}: {
  number: string;
  icon: typeof Terminal;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease }}
      className="border-t-2 border-t-primary border border-border bg-background/80 backdrop-blur-sm p-6 md:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground">
          {number}
        </span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h2 className="mt-3 font-display text-2xl text-foreground md:text-3xl">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

export function DevelopersSection() {
  return (
    <>
      <BlueprintGrid>
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-4xl px-6">
            {/* Header */}
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Developer Tools
              </span>
              <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Bring Blueprints Into Your Workflow
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
                Every blueprint exports as an{" "}
                <strong className="text-foreground">Agent Skills</strong>{" "}
                directory — an open standard for giving coding agents structured
                context. Supported by Claude Code, Codex, Cursor, and 18+ tools.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                Install via npm:{" "}
                <strong className="font-mono text-foreground">
                  npm install -g agentblueprint
                </strong>
                . The agentblueprint package includes both the CLI and a built-in
                MCP server for AI coding agents.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {/* CLI */}
              <SectionBlock
                number="01"
                icon={Terminal}
                title="CLI"
                index={0}
              >
                <CodeBlock>
                  {`npm install -g agentblueprint
agentblueprint login
agentblueprint list
agentblueprint download <blueprint-id>`}
                </CodeBlock>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  Downloads the full Implementation Spec as an Agent Skills
                  directory. Any coding agent that supports Agent Skills
                  auto-discovers the <code className="font-mono text-foreground">SKILL.md</code> file.
                </p>
              </SectionBlock>

              {/* MCP Server */}
              <SectionBlock
                number="02"
                icon={Plug}
                title="MCP Server"
                index={1}
              >
                <CodeBlock>
                  {`{
  "mcpServers": {
    "agent-blueprint": {
      "command": "npx",
      "args": ["-y", "agentblueprint", "serve"]
    }
  }
}`}
                </CodeBlock>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  Add this to your Claude Code, Cursor, or Codex MCP config.
                  Your coding agent gets direct access to your blueprints
                  without leaving the editor.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "list_blueprints",
                    "get_blueprint",
                    "download_blueprint",
                    "get_use_case",
                    "get_business_case",
                    "get_implementation_plan",
                    "get_implementation_spec",
                    "get_business_profile",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="inline-block rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </SectionBlock>

              {/* Export */}
              <SectionBlock
                number="03"
                icon={Download}
                title="Export from the App"
                index={2}
              >
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  Click <strong className="text-foreground">&ldquo;Export Implementation Spec&rdquo;</strong> on
                  any blueprint page to download a ZIP containing the full Agent
                  Skills directory:{" "}
                  <code className="font-mono text-foreground">SKILL.md</code> +
                  8 reference files + validation script.
                </p>
              </SectionBlock>
            </div>
          </div>
        </section>
      </BlueprintGrid>
    </>
  );
}
