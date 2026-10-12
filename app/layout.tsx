import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google"
import { PageCurtain } from "@/components/page-curtain"
import { faqs, site } from "@/lib/data"
import "./globals.css"

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" })
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: { type: "website", title: site.title, description: site.description, url: site.url },
}

export const viewport: Viewport = { themeColor: "#F8F7F4" }

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: `${site.name}, ${site.role}`,
      description: site.description,
      email: site.email,
      url: site.url,
      serviceType: ["SEO", "Paid advertising", "Email marketing", "Analytics"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <PageCurtain />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2.5 focus:text-background"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
