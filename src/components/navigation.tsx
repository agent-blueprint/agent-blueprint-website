"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/metadata";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You Get", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/logo.png"
            alt="Agent Blueprint"
            width={40}
            height={40}
            className="h-8 w-8"
            priority
          />
          <span className="font-body font-semibold text-xl text-foreground">
            Agent Blueprint
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href.slice(1))}
                className="cursor-pointer group relative font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )
          )}
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-lg font-body font-semibold text-sm text-white transition-all duration-200 hover:shadow-sm"
            style={{ backgroundColor: "var(--accent)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "oklch(72% 0.18 32)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent)")
            }
          >
            Get Started
          </a>
        </div>

        {/* Mobile nav */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="font-body font-semibold text-lg text-foreground">
              Agent Blueprint
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu
            </SheetDescription>
            <nav className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.href}
                    onClick={() => {
                      scrollToSection(link.href.slice(1));
                      setSheetOpen(false);
                    }}
                    className="cursor-pointer font-body text-base font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="font-body text-base font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="#contact"
                onClick={() => setSheetOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-body font-semibold text-sm text-white transition-colors w-full"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Get Started
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
