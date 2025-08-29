import { CookieBanner } from '@/components/cookie-banner'
import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Maxsoft IT Solutions',
    default: 'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
  },
  description: 'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
  keywords: [
    'IT-Beratung',
    'digitale Transformation',
    'Technologieberatung',
    'Cloud-Lösungen',
    'Cybersicherheit',
    'Maxsoft IT Solutions',
    'innovative IT-Lösungen',
    'IT-Optimierung',
  ],
  authors: [{ name: 'Maxsoft IT Solutions' }],
  creator: 'Maxsoft IT Solutions',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://maxsoft.ch',
    title: 'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
    description:
      'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
    siteName: 'Maxsoft IT Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
    description:
      'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
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
          title="Der Maxsoft IT Solutions Blog"
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
