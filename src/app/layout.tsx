import type { Metadata } from "next";
import { cormorantGaramond, outfit, jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { siteMetadata, organizationSchema } from "@/lib/metadata";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-optimized site summary" />
        <link rel="alternate" type="application/feed+json" href="/feed.json" title="Agent Blueprint JSON Feed" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
