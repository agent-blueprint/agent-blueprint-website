"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqPageSchema } from "@/lib/metadata";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = faqPageSchema.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

function FaqRow({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <h3 className="font-display text-lg text-foreground md:text-xl">
          {faq.question}
        </h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 md:mb-16 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-border">
          {faqs.map((faq, index) => (
            <FaqRow key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
