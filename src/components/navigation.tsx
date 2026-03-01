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
  { label: "For Business", href: "/" },
  { label: "For Partners", href: "/partners" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
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
          ? "bg-background/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      {/* Dimension-line bottom border when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center px-6" aria-hidden="true">
          <div className="h-2 w-px bg-primary/20" />
          <div className="h-px flex-1 bg-primary/20" />
          <div className="h-2 w-px bg-primary/20" />
        </div>
      )}

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo with title block cartouche border */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 border border-primary/15 px-3 py-1.5 transition-colors hover:border-primary/30"
        >
          <Image
            src="/images/logo.png"
            alt="Agent Blueprint"
            width={40}
            height={40}
            className="h-8 w-8"
            priority
          />
          <span className="font-display text-xl text-primary">
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
                className="group relative font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
          <Button
            asChild
            className="btn-metallic rounded-none text-accent-foreground font-body font-semibold "
          >
            <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </Button>
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
            <SheetTitle className="font-display text-lg text-primary">
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
                    className="font-body text-base font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
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
              <Button
                asChild
                className="btn-metallic rounded-none text-accent-foreground font-body font-semibold w-full "
              >
                <a
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
