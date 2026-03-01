"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Lock,
  Brain,
  Server,
  CheckCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { CornerBrackets } from "@/components/decorative/corner-brackets";
import { BlueprintGrid } from "@/components/blueprint-grid";

const securityPractices = [
  {
    number: "01",
    icon: Shield,
    title: "Authentication & Access Control",
    body: "Enterprise-grade identity management via Auth0 with multi-tenant isolation. Role-based access control with partner scoping ensures users only access data they're authorized to see.",
  },
  {
    number: "02",
    icon: Lock,
    title: "Data Protection",
    body: "All data is stored in Supabase (PostgreSQL) with encryption at rest and in transit. PII patterns are redacted from stored reasoning traces. Tenant data is isolated at the application and database level.",
  },
  {
    number: "03",
    icon: Brain,
    title: "AI & LLM Security",
    body: "LLM outputs are validated against structured schemas before storage. No tool use or code execution by the model. All inputs are authentication-gated, and outputs are constrained to advisory content only.",
  },
  {
    number: "04",
    icon: Server,
    title: "Infrastructure",
    body: "Hosted on Vercel with HTTPS everywhere and edge-level DDoS protection. CSRF protection on all mutating endpoints. Application-level rate limiting on API routes. No self-hosted infrastructure to patch or maintain.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Input Validation",
    body: "All user inputs are validated through Zod schemas at the API boundary. Length constraints on user-facing fields prevent abuse. Inputs are sanitized before processing.",
  },
  {
    number: "06",
    icon: Users,
    title: "Responsible AI",
    body: "All platform outputs are advisory. Humans review and approve every recommendation before action. No autonomous actions are taken. Customer data is never used for model training.",
  },
];

function SecurityCard({
  practice,
  index,
}: {
  practice: (typeof securityPractices)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = practice.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <CornerBrackets className="h-full">
        <div className="h-full border-t-2 border-t-primary border border-border bg-background/80 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium tracking-wider text-blueprint-annotation">
              {practice.number}
            </span>
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="mt-3 font-display text-xl text-foreground">
            {practice.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
            {practice.body}
          </p>
        </div>
      </CornerBrackets>
    </motion.div>
  );
}

export function SecuritySection() {
  return (
    <>
      <BlueprintGrid>
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
                Security Practices
              </span>
              <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Built for Enterprise Trust
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
                Agent Blueprint is designed with security at every layer. From
                authentication to AI output validation, we apply the safeguards
                that enterprise teams expect.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {securityPractices.map((practice, index) => (
                <SecurityCard
                  key={practice.number}
                  practice={practice}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </BlueprintGrid>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-2xl text-foreground">
            Questions about our security practices?
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            We&apos;re happy to discuss our security posture in detail.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-block font-body text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
