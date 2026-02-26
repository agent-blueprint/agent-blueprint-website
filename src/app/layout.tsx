import type { Metadata } from "next";
import { instrumentSerif, outfit, jetbrainsMono } from "@/lib/fonts";
import {
  siteMetadata,
  organizationSchema,
  softwareApplicationSchema,
  faqPageSchema,
} from "@/lib/metadata";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema),
          }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
