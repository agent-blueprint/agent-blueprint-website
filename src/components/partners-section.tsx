"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import {
  Clock,
  Target,
  Users,
  Trophy,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { CornerBrackets } from "@/components/decorative/corner-brackets";
import { DimensionLine } from "@/components/dimension-line";

const ease = [0.25, 0.4, 0.25, 1] as const;

const painPoints = [
  {
    icon: Clock,
    title: "Expensive Sales Cycles",
    body: "Senior Architects burn hours on manual discovery and diagrams, just to win the deal.",
  },
  {
    icon: Target,
    title: "Scope Creep",
    body: "Vague client requirements lead to blown budgets and stalled implementations.",
  },
  {
    icon: Users,
    title: "Talent Scarcity & Cost",
    body: "Reliance on expensive senior talent creates delivery bottlenecks and drives up rates or erodes your margins.",
  },
];

const solutions = [
  {
    icon: Trophy,
    title: "Win More Deals",
    body: "Generate visual, data-backed agent architectures in the proposal phase to prove competence and lock in scope instantly.",
  },
  {
    icon: Shield,
    title: "Compete with GSIs",
    body: "Deliver Tier 1 advisory services and win high-value strategy deals using our automated frameworks, no specialized consulting bench required.",
  },
  {
    icon: Zap,
    title: "Protect Margins & Accelerate Delivery",
    body: "We automatically generate the agent scaffolding and build the user stories, enabling mid-level resources to execute the build phase faster and with greater precision.",
  },
  {
    icon: TrendingUp,
    title: "Drive Recurring Revenue",
    body: "Don't just deploy and leave. Use our Monitor module to offer high-margin AI optimization managed services.",
  },
];

const partnerSteps = [
  {
    number: "01",
    label: "RAPID DISCOVERY",
    body: "Input client goals and data, connect and automatically analyze a customer's instance. The platform identifies the highest value AI use cases aligned to your client's business needs and current deployment.",
  },
  {
    number: "02",
    label: "AUTOMATED ARCHITECTURE",
    body: "Generate technical specs, user stories, and ROI model instantly. Get client sign-off on a visual blueprint, eliminating scope ambiguity.",
  },
  {
    number: "03",
    label: "ACCELERATED BUILD",
    body: "Convert the blueprint into agent designs and automatically build the agent shells. Drastically reduce the grunt work of setting up agents.",
  },
  {
    number: "04",
    label: "MANAGED OPTIMIZATION",
    body: "Monitor agent drift and performance metrics to drive quarterly business reviews (QBRs) and upsell new agents.",
  },
];

function AnimatedCard({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PartnersSection() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      toast.success("Demo request sent! We'll be in touch soon.");
      form.reset();
    } catch {
      toast.error("Failed to send request. Please try again.");
    }
  }

  return (
    <>
      {/* Hero */}
      <BlueprintGrid>
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
                className="font-mono text-sm font-medium uppercase tracking-widest text-blueprint-annotation"
              >
                For ServiceNow Partners
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease }}
                className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl md:leading-tight"
              >
                Scale Your AI Practice.{" "}
                <span className="italic text-primary">
                  Standardize Client Delivery.
                </span>{" "}
                Boost Your Margins.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease }}
                className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground"
              >
                An AI Strategy &amp; Delivery platform that helps ServiceNow
                Partners streamline AI advisory services, automate agent design,
                accelerate build, and secure recurring managed services revenue.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                className="mt-10"
              >
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_20px_var(--accent-glow)] font-body font-semibold text-base px-8 transition-all duration-300"
                  onClick={() => {
                    document
                      .getElementById("partner-contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request a Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </BlueprintGrid>

      {/* Pain Points — dark section */}
      <BlueprintGrid variant="dark">
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-dark-surface-foreground/50">
                The Challenge
              </span>
              <h2 className="mt-4 font-display text-3xl text-dark-surface-foreground md:text-4xl">
                ServiceNow Partners Across the Ecosystem Are Struggling With:
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <AnimatedCard key={point.title} index={index}>
                    <CornerBrackets className="h-full">
                      <div className="h-full bg-white/5 border border-white/10 p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_var(--accent-glow)]">
                        <Icon className="h-6 w-6 text-accent" />
                        <h3 className="mt-4 font-display text-xl text-dark-surface-foreground">
                          {point.title}
                        </h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-dark-surface-foreground/70">
                          {point.body}
                        </p>
                      </div>
                    </CornerBrackets>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>
      </BlueprintGrid>

      {/* Solution */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
              The Solution
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
              Agent Blueprint for Partners
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <AnimatedCard key={solution.title} index={index}>
                  <CornerBrackets className="h-full">
                    <div className="h-full border border-border bg-background/80 backdrop-blur-sm p-6 transition-colors duration-300 hover:border-accent/30 hover:shadow-[0_0_15px_var(--accent-glow)]">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="mt-4 font-display text-xl text-foreground">
                        {solution.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                        {solution.body}
                      </p>
                    </div>
                  </CornerBrackets>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works for Partners — dark section */}
      <BlueprintGrid variant="dark">
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-dark-surface-foreground/50">
                Our Process
              </span>
              <h2 className="mt-4 font-display text-3xl text-dark-surface-foreground md:text-4xl">
                How It Works
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {partnerSteps.map((step, index) => (
                <AnimatedCard key={step.number} index={index}>
                  <CornerBrackets className="h-full">
                    <div className="bg-white/5 border border-white/10 p-6">
                      <span className="font-mono text-xs font-medium tracking-wider text-dark-surface-foreground/50">
                        [{step.number}] {step.label}
                      </span>
                      <p className="mt-3 font-body text-sm leading-relaxed text-dark-surface-foreground/70">
                        {step.body}
                      </p>
                    </div>
                  </CornerBrackets>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </BlueprintGrid>

      {/* Contact / Demo Request */}
      <section id="partner-contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <DimensionLine label="CONTACT" animate className="mb-16" />
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
              Get Started
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
              Ready to Scale Your AI Practice?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
              Contact us today for a demo and see how Agent Blueprint can
              transform your ServiceNow practice.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Contact info */}
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl text-foreground">
                Get in Touch
              </h3>
              <div className="mt-8 space-y-4">
                <div className="corner-brackets flex items-center gap-3 p-4">
                  <span className="font-body text-sm font-medium text-foreground">
                    Email
                  </span>
                  <a
                    href="mailto:info@agentblueprint.ai"
                    className="font-body text-sm text-primary transition-colors hover:text-primary/80"
                  >
                    info@agentblueprint.ai
                  </a>
                </div>
                <div className="corner-brackets flex items-center gap-3 p-4">
                  <span className="font-body text-sm font-medium text-foreground">
                    Website
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    agentblueprint.ai
                  </span>
                </div>
              </div>
            </div>

            {/* Demo request form */}
            <div>
              <h3 className="mb-6 font-display text-2xl text-foreground">
                Request a Demo
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-sm font-medium">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="font-body rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-sm font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@company.com"
                            className="font-body rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-sm font-medium">
                          Company / Partner Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Company"
                            className="font-body rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-sm font-medium">
                          Message{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your partnership goals..."
                            className="font-body min-h-[120px] rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_20px_var(--accent-glow)] font-body font-semibold transition-all duration-300"
                  >
                    {form.formState.isSubmitting
                      ? "Sending..."
                      : "Request Demo"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
