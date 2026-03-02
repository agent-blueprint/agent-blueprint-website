"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Linkedin } from "lucide-react";
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
import { GeometricConstruction } from "@/components/decorative/geometric-construction";

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

export function ContactSection() {
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

      toast.success("Message sent! We'll be in touch soon.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            Ready to transform your business strategy with AI? Let&apos;s
            discuss how Agent Blueprint can help.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
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
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@company.com"
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
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company"
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
                        <span className="text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
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
                  className="w-full btn-metallic rounded-none text-accent-foreground font-body font-semibold"
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>

          {/* LinkedIn links with decorative background */}
          <div className="relative flex flex-col justify-center">
            {/* Decorative geometric construction */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-30 pointer-events-none" aria-hidden="true">
              <GeometricConstruction className="w-64 h-64" />
            </div>

            <div className="relative">
              <h3 className="font-display text-2xl text-foreground">
                Connect With Us
              </h3>
              <p className="mt-3 font-body text-sm text-muted-foreground">
                Follow our journey and connect with the team on LinkedIn.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {linkedinLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corner-brackets group flex items-center gap-3 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
