"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

const linkedinLinks = [
  {
    name: "Chris Faulkner",
    url: "https://www.linkedin.com/in/cifaulkner",
  },
  {
    name: "Amy Glencross",
    url: "https://www.linkedin.com/in/amyglencross",
  },
  {
    name: "Agent Blueprint",
    url: "https://www.linkedin.com/company/agentblueprint",
  },
];

type ContactSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
};

export function ContactSection({
  eyebrow = "Free, 30 minutes",
  heading = "Request a call",
  intro = "Tell us where you are: still exploring, piloting, or already running agents. We'll reply with times for a 30-minute call and tell you plainly whether we can help.",
  messagePlaceholder = "Which agent, and is it planned or running? Any renewal date?",
  submitLabel = "Request a call",
}: ContactSectionProps = {}) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
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

      toast.success("Message sent! We'll be in touch soon.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 md:mb-16 text-center">
          {eyebrow && (
            <span className="mb-4 block font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            {intro}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          {/* Contact form with underline-style inputs */}
          <div>
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
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="font-body rounded-md border border-border bg-card px-3 shadow-none focus-visible:border-primary focus-visible:ring-0"
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
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          className="font-body rounded-md border border-border bg-card px-3 shadow-none focus-visible:border-primary focus-visible:ring-0"
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
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company"
                          className="font-body rounded-md border border-border bg-card px-3 shadow-none focus-visible:border-primary focus-visible:ring-0"
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
                        <span className="text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={messagePlaceholder}
                          className="font-body min-h-[120px] rounded-md border border-border bg-card px-3 shadow-none focus-visible:border-primary focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Spam trap: hidden from people and screen readers, left empty by them. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...form.register("website")}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 w-full rounded-md bg-primary text-base text-primary-foreground hover:bg-primary/90 font-body font-semibold"
                >
                  {form.formState.isSubmitting ? "Sending..." : `${submitLabel} →`}
                </Button>
                <p className="text-center font-body text-sm text-muted-foreground">
                  We reply within one business day with times for the call.
                </p>
              </form>
            </Form>
          </div>

          {/* Direct contact */}
          <div className="flex flex-col justify-start md:pt-1">
            <h3 className="font-display text-2xl font-bold text-foreground">Prefer email?</h3>
            <p className="mt-3 font-body text-muted-foreground">
              Write to{" "}
              <a href="mailto:info@agentblueprint.ai" className="font-semibold text-primary underline underline-offset-4">
                info@agentblueprint.ai
              </a>
              . Or message{" "}
              {linkedinLinks.slice(0, 2).map((link, i) => (
                <span key={link.name}>
                  {i > 0 && " or "}
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                    {link.name}
                  </a>
                </span>
              ))}{" "}
              on LinkedIn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
