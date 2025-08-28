import { CookieBanner } from '@/components/cookie-banner'
import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Maxsoft AG',
    default: 'Maxsoft AG - Ihr Partner für innovative IT-Lösungen',
  },
  description:
    'Maxsoft AG bietet maßgeschneiderte IT-Lösungen für Unternehmen aller Größen. Anstatt Sie mit komplexen, unverständlichen Technologien allein zu lassen, bieten wir klare, umsetzbare Strategien, die Ihre IT-Prozesse optimieren. Wir verstehen, dass sich die Technologie ständig weiterentwickelt und helfen Ihnen, mit den neuesten Innovationen Schritt zu halten, um Ihre Wettbewerbsfähigkeit zu steigern. Wir bieten Ihnen die Flexibilität, Ihre IT individuell anzupassen.',
  keywords: [
    'IT-Beratung',
    'digitale Transformation',
    'Technologieberatung',
    'Cloud-Lösungen',
    'Cybersicherheit',
    'Maxsoft AG',
    'innovative IT-Lösungen',
    'IT-Optimierung',
  ],
  authors: [{ name: 'Maxsoft AG' }],
  creator: 'Maxsoft AG',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://maxsoft.ch',
    title: 'Maxsoft AG - Ihr Partner für innovative IT-Lösungen',
    description:
      'Maxsoft AG bietet maßgeschneiderte IT-Lösungen für Unternehmen aller Größen. Anstatt Sie mit komplexen, unverständlichen Technologien allein zu lassen, bieten wir klare, umsetzbare Strategien, die Ihre IT-Prozesse optimieren.',
    siteName: 'Maxsoft AG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxsoft AG - Ihr Partner für innovative IT-Lösungen',
    description:
      'Maxsoft AG bietet maßgeschneiderte IT-Lösungen für Unternehmen aller Größen. Anstatt Sie mit komplexen, unverständlichen Technologien allein zu lassen, bieten wir klare, umsetzbare Strategien, die Ihre IT-Prozesse optimieren.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Der Maxsoft AG Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className="pt-20 text-gray-950 antialiased sm:pt-24">
        {children}
        <SanityLive revalidateSyncTags={revalidateSyncTags} />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
